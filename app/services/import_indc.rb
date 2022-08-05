# rubocop:disable ClassLength
class ImportIndc
  DATA_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_data.csv".freeze
  SINGLE_VERSION_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_single_version.csv".freeze
  LEGEND_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_legend.csv".freeze
  DATA_LTS_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_LTS_data.csv".freeze
  DATA_LTS_SECTORAL_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_LTS_data_sectoral.csv".freeze
  DATA_WB_SECTORAL_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_WB_data_sectoral_all.csv".freeze
  SUBMISSIONS_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_submission.csv".freeze
  METADATA_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_metadata.csv".freeze
  DOCUMENTS_FILEPATH =
    "#{CW_FILES_PREFIX}indc/NDC_documents.csv".freeze
  PLEDGES_DATA_FILEPATH = "#{CW_FILES_PREFIX}indc/pledges_data.csv".freeze
  COMPARISON_FILEPATH = "#{CW_FILES_PREFIX}indc/comparison_matrix.csv".freeze

  ACTION_INDICATOR = 'ad_sec_action'
  OTHER_ACTION_INDICATORS = %w[
    A_Sc_Pol
    A_Sc_Tar
    A_Sc_UncAct
    A_Sc_ConAct
  ].freeze

  def call
    ActiveRecord::Base.transaction do
      cleanup

      load_csvs
      load_locations

      import_documents
      import_sources
      import_category_types
      import_categories
      import_indicators
      import_indicators_categories
      import_labels
      import_values_ndc

      import_sectors_lts
      import_values_lts
      import_sector_values_lts

      import_sectors_wb
      import_values_wb

      import_values_pledges

      reject_map_indicators_without_values_or_labels

      import_submissions
      import_comparison_slugs
    end

    generate_subsectors_map_data
    Indc::SearchableValue.refresh
    sync_indc_indicators
  end

  def generate_subsectors_map_data
    source = Indc::Source.find_by(name: 'WB')&.id
    map_type = Indc::CategoryType.find_by(name: 'map')&.id
    if !source || !map_type
      Rails.logger.error '[ABORTING TASK] Underlying data doesn\'t seem to be present. Please make sure you ran "bundle exec rails indc:import", before running this task'
      return
    end
    count = Indc::Value.count
    puts "We had #{count} indc values before creating subsector indicators and values"
    locations = Location.
      where(id: Indc::Value.select(:location_id).distinct.pluck(:location_id)).
      order(:wri_standard_name)
    values = []
    [['sectoral_mitigation_measures', 'm'], ['sectoral_adaptation_measures', 'a']].each do |slug, prefix|
      sectoral_cat = Indc::Category.find_by(category_type_id: map_type, slug: slug)

      order = sectoral_cat.indicators.maximum(:order) || 0
      sectors = Indc::Sector.
        joins(values: :indicator).
        where.not(parent_id: nil).
        where('indc_indicators.slug ilike ?', "#{prefix.upcase}_%").
        distinct

      measure_specified = Indc::Value.
        joins(:indicator, :location, :document).
        where(sector_id: sectors.ids).
        where.not("value ilike 'Not Available'").
        where('indc_indicators.slug ilike ?', "#{prefix.upcase}_%").
        where(indc_documents: {is_ndc: true}).
        group(:sector_id, :location_id, :document_id).
        pluck(:sector_id, :location_id, :document_id).
        group_by(&:first).
        transform_values { |v| v.group_by(&:second).transform_values { |vv| vv.group_by(&:third) } }
      ndc_submissions = Indc::Submission.
        group(:location_id, :document_id).
        pluck(:location_id, :document_id).
        group_by(&:first).
        transform_values { |v| v.group_by(&:second) }

      sectors.each do |sector|
        sector_name = sector.name == sector.parent.name ? "#{sector.name} Subsector" : sector.name
        ind_slug = [prefix, sector_name.parameterize.gsub('-', '_'), 'auto'].join('_')
        next if Indc::Indicator.find_by(slug: ind_slug, source_id: source)

        order += 1
        indicator = Indc::Indicator.create!(source_id: source,
                                            slug: ind_slug,
                                            name: sector_name,
                                            description: 'Created automatically',
                                            order: order,
                                            multiple_versions: true)
        indicator.categories << sectoral_cat

        label_yes = Indc::Label.create!(indicator_id: indicator.id,
                                        index: 1,
                                        value: 'Sectoral Measure Specified')
        label_no = Indc::Label.create!(indicator_id: indicator.id,
                                       index: 2,
                                       value: 'No Sectoral Measure Specified')

        documents = Indc::Document.where(is_ndc: true)
        locations.each do |loc|
          documents.each do |doc|
            next unless ndc_submissions.dig(loc.id, doc.id).present?

            if measure_specified.dig(sector.id, loc.id, doc.id).present?
              values << Indc::Value.new(location_id: loc.id,
                                        label_id: label_yes.id,
                                        value: 'Sectoral Measure Specified',
                                        document_id: doc.id,
                                        indicator_id: indicator.id,
                                        sector_id: sector.id)
            else
              values << Indc::Value.new(location_id: loc.id,
                                        label_id: label_no.id,
                                        value: 'No Sectoral Measure Specified',
                                        document_id: doc.id,
                                        indicator_id: indicator.id,
                                        sector_id: sector.id)
            end
          end
        end
      end
    end

    Indc::Value.import! values
    puts "We added #{Indc::Value.count - count} new values for subsector indicators"
  end

  private

  def cleanup
    Indc::AdaptationAction.delete_all
    Indc::Value.delete_all
    Indc::Category.delete_all
    Indc::CategoryType.delete_all
    Indc::Sector.delete_all
    Indc::Label.delete_all
    Indc::Indicator.delete_all
    Indc::Source.delete_all
    Indc::Submission.delete_all
    Indc::Document.delete_all
  end

  def load_csvs
    # relaxed symbol converter that lets through '-'
    symbol_converter = lambda { |h|
      h.downcase.gsub(/[^\s\w-]+/, '').strip.gsub(/\s+/, '_').to_sym
    }
    @documents = S3CSVReader.read(DOCUMENTS_FILEPATH, [symbol_converter]).map(&:to_h)
    @ndc_data = S3CSVReader.read(DATA_FILEPATH, [symbol_converter]).map(&:to_h)
    @single_version_data = S3CSVReader.read(SINGLE_VERSION_FILEPATH, [symbol_converter]).map(&:to_h)
    @labels = S3CSVReader.read(LEGEND_FILEPATH).map(&:to_h)
    @lts_data = S3CSVReader.read(
      DATA_LTS_FILEPATH, [symbol_converter]
    ).map(&:to_h)
    @lts_sectoral_data = S3CSVReader.read(DATA_LTS_SECTORAL_FILEPATH).map(&:to_h)
    @wb_sectoral_data = S3CSVReader.read(DATA_WB_SECTORAL_FILEPATH).map(&:to_h)
    @metadata = S3CSVReader.read(METADATA_FILEPATH).map(&:to_h)
    @submissions = S3CSVReader.read(SUBMISSIONS_FILEPATH).map(&:to_h)
    @pledges_data = S3CSVReader.read(PLEDGES_DATA_FILEPATH).map(&:to_h)
    @comparison_indicators = S3CSVReader.read(COMPARISON_FILEPATH).map(&:to_h)
  end

  def load_locations
    @locations_by_iso3 = Location.all.
      group_by(&:iso_code3).
      map { |key, value| [key, value.first] }.
      to_h

    @locations_by_iso2 = Location.all.
      group_by(&:iso_code2).
      map { |key, value| [key, value.first] }.
      to_h
  end

  def category_attributes(name, category_type, index)
    {
      name: name,
      slug: Slug.create(name),
      category_type: category_type,
      order: index * 10
    }
  end

  def indicator_attributes(indicator, index)
    {
      name: indicator[:long_name],
      slug: indicator[:column_name],
      description: indicator[:definition],
      source: @sources_index[indicator[:source]],
      group_indicator_slug: indicator[:group_indicator],
      order: index * 10,
      multiple_versions: indicator[:multiple_version]
    }
  end

  # for datasets that don't have multiple files we can pass the doc_slug
  # as a param, for example for LTS
  def value_ndc_attributes(row, location, indicator, doc_slug = nil)
    doc_slug ||= row[:document]&.parameterize&.gsub('-', '_')
    {
      location: location,
      indicator: indicator,
      label_id: Indc::Label.where(
        value: row[:"#{indicator.slug.downcase}_label"],
        indicator: indicator
      ).pluck(:id).first,
      value: row[:"#{indicator.slug.downcase}"],
      document_id: @documents_cache[doc_slug]&.id
    }
  end

  # for datasets that don't have multiple files we can pass the doc_slug
  # as a param, for example for LTS
  def value_wb_attributes(row, location, indicator, doc_slug = nil, group_index = 1)
    doc_slug ||= row[:document]&.parameterize&.gsub('-', '_')
    sector_key = [row[:sector], row[:subsector]].join('_')
    {
      location: location,
      indicator: indicator,
      sector: @sectors_index[sector_key],
      value: row[:responsetext],
      group_index: group_index,
      document_id: @documents_cache[doc_slug]&.id
    }
  end

  def document_attributes(doc)
    doc_slug = doc[:slug]&.parameterize&.gsub('-', '_')
    {
      ordering: doc[:order_number],
      slug: doc_slug,
      long_name: doc[:long_name],
      description: doc[:description],
      is_ndc: doc[:is_ndc]
    }
  end

  def submission_attributes(location, submission)
    doc_slug = submission[:type]&.parameterize&.gsub('-', '_')
    {
      location: location,
      submission_type: submission[:type],
      language: submission[:language],
      submission_date: submission[:date_of_submission],
      url: submission[:url],
      document_id: @documents_cache[doc_slug]&.id
    }
  end

  def import_sources
    @sources_index = @metadata.
      map { |r| r[:source] }.
      uniq.
      each_with_object({}) do |source, memo|
        memo[source] = Indc::Source.create!(name: source)
      end
  end

  def import_category_types
    @category_types_index = @metadata.first.keys.
      select { |key| key.match(/_category$/) }.
      map { |c| c.to_s.gsub(/_category$/, '') }.
      each_with_object({}) do |category_type, memo|
        memo[category_type] = Indc::CategoryType.create!(name: category_type)
      end
  end

  def import_categories
    @global_categories_index = {}

    category_indexes = {
      map: 0,
      overview: 0
    }

    global_category_type = Indc::CategoryType.find_by(name: ::Indc::CategoryType::GLOBAL)
    overview_category_type = Indc::CategoryType.find_by(name: ::Indc::CategoryType::OVERVIEW)
    map_category_type = Indc::CategoryType.find_by(name: ::Indc::CategoryType::MAP)

    @metadata.each do |m|
      global_category_name = m[:global_category]
      overview_category_name = m[:overview_category]
      map_category_name = m[:map_category]

      global_category = @global_categories_index[global_category_name] ||= Indc::Category.create(
        category_attributes(
          global_category_name,
          global_category_type,
          @global_categories_index.keys.size
        )
      )

      if overview_category_name &&
          !Indc::Category.find_by(
            name: overview_category_name,
            parent_id: global_category.id,
            category_type: overview_category_type
          )
        Indc::Category.create!(
          category_attributes(
            overview_category_name,
            overview_category_type,
            category_indexes[:overview]
          ).merge(
            parent_id: global_category.id
          )
        )
        category_indexes[:overview] += 1
      end

      if map_category_name &&
          !Indc::Category.find_by(
            name: map_category_name,
            category_type: map_category_type
          )
        Indc::Category.create!(
          category_attributes(
            map_category_name,
            map_category_type,
            category_indexes[:map]
          )
        )
        category_indexes[:map] += 1
      end
    end
  end

  def import_indicators
    indicators = @metadata.
      map { |r| [[r[:column_name], r[:source]], r] }.
      uniq(&:first).
      map(&:second).
      map.
      with_index do |indicator, index|
        indicator = Indc::Indicator.new(indicator_attributes(indicator, index))
        indicator.validate!
        indicator
      end
    Indc::Indicator.import!(indicators)
  end

  def import_indicators_categories
    @metadata.each do |r|
      indicator = Indc::Indicator.
        includes(:categories).
        find_by!(
          slug: r[:column_name],
          source: @sources_index[r[:source]]
        )

      categories = r.keys.
        select { |key| key.match(/_category$/) }.
        map { |c| c.to_s.gsub(/_category$/, '') }.
        map do |category_type|
          next if r[:"#{category_type}_category"].nil?

          parent = @global_categories_index[r[:global_category]] if category_type == 'overview'

          Indc::Category.find_by!(
            name: r[:"#{category_type}_category"],
            category_type: @category_types_index[category_type],
            parent_id: parent&.id
          )
        end

      categories = categories.
        select(&:itself).
        reject do |category|
          indicator.categories.include?(category)
        end

      indicator.categories << categories
    end
  end

  def import_labels
    indicators = @labels.group_by { |l| l[:indicator_name] }.
      map { |k, v| [k, v.map { |i| {label: i[:legend_item], slug: i[:slug]} }] }.
      to_h

    labels_to_create = []
    indicators.each do |indicator_name, labels|
      indicator = Indc::Indicator.find_by(slug: indicator_name)
      next unless indicator

      no_document_submitted = 'No Document Submitted'
      nds_label_obj = labels.detect { |obj| obj[:label] == no_document_submitted }
      labels.reject! { |obj| obj[:label] == no_document_submitted }
      labels.each_with_index do |label_obj, index|
        label = Indc::Label.new(
          indicator: indicator,
          value: label_obj[:label],
          slug: label_obj[:slug],
          index: index + 1
        )
        label.validate!
        labels_to_create << label
      end
      next unless nds_label_obj.present?

      # fixed index for the No Document Submitted label
      label = Indc::Label.new(
        indicator: indicator,
        value: nds_label_obj[:label],
        slug: nds_label_obj[:slug],
        index: -2
      )
      label.validate!
      labels_to_create << label
    end
    Indc::Label.import!(labels_to_create)
  end

  def import_values_ndc
    valid_sources = [@sources_index['CAIT'], @sources_index['NDC Explorer'],
                     @sources_index['WB'], @sources_index['Net_Zero']]
    values = []
    Indc::Indicator.
      where(source: valid_sources).
      each do |indicator|
      (@single_version_data + @ndc_data).each do |r|
        location = @locations_by_iso3[r[:iso]]
        unless location
          Rails.logger.error "location #{r[:country]} not found. Skipping."
          next
        end

        next unless r[:"#{indicator.slug.downcase}"].present?

        values << Indc::Value.new(
          value_ndc_attributes(r, location, indicator)
        )
      end
    end

    Indc::Value.import!(values)
  end

  def import_values_lts
    values = []
    Indc::Indicator.
      where(source: @sources_index['LTS']).each do |indicator|
      @lts_data.each do |r|
        location = @locations_by_iso3[r[:iso]]
        unless location
          Rails.logger.error "location #{r[:country]} not found. Skipping."
          next
        end

        next unless r[:"#{indicator.slug.downcase}"].present?

        values << Indc::Value.new(
          value_ndc_attributes(r, location, indicator, 'lts')
        )
      end
    end
    Indc::Value.import!(values)
  end

  def import_values_pledges
    values = []
    Indc::Indicator.
      where(source: @sources_index['Pledges']).each do |indicator|
      @pledges_data.each do |r|
        location = @locations_by_iso3[r[:iso]]
        unless location
          Rails.logger.error "location #{r[:country]} not found. Skipping."
          next
        end

        next unless r[:"#{indicator.slug.downcase}"].present?

        values << Indc::Value.new(
          value_ndc_attributes(r, location, indicator, 'pledges')
        )
      end
    end
    Indc::Value.import!(values)
  end

  def import_sectors_lts
    sectors = @lts_sectoral_data.map do |d|
      d.slice(:sector, :subsector)
    end

    @sectors_index = {}
    sectors.uniq.each do |d|
      parent = Indc::Sector.find_or_create_by(
        name: d[:sector],
        sector_type: 'lts'
      )
      sector = Indc::Sector.find_or_create_by(
        name: d[:subsector],
        parent: parent,
        sector_type: 'lts'
      )

      key = [d[:sector], d[:subsector]].join('_')
      @sectors_index[key] = sector
    end
  end

  def import_sector_values_lts
    indicator_index = indicators_hash_by_source('LTS')
    values = []
    @lts_sectoral_data.each do |r|
      location = @locations_by_iso3[r[:countrycode]]
      unless location
        Rails.logger.error "location #{r[:countrycode]} not found. Skipping."
        next
      end

      indicator = indicator_index[r[:questioncode]]
      unless indicator
        Rails.logger.error "indicator #{r[:questioncode]} not found. Skipping."
        next
      end

      next unless r[:responsetext]

      values << Indc::Value.new(
        value_wb_attributes(r, location, indicator, 'lts')
      )
    end
    Indc::Value.import!(values)
  end

  def import_sectors_wb
    sectors = @wb_sectoral_data.map do |d|
      d.slice(:sector, :subsector)
    end

    @sectors_index = {}
    sectors.uniq.each do |d|
      parent = Indc::Sector.find_or_create_by(
        name: d[:sector],
        sector_type: 'wb'
      )
      sector = Indc::Sector.find_or_create_by(
        name: d[:subsector],
        parent: parent,
        sector_type: 'wb'
      )

      key = [d[:sector], d[:subsector]].join('_')
      @sectors_index[key] = sector
    end
  end

  def import_values_wb
    indicator_index = indicators_hash_by_source('WB')
    values = []
    @value_group_index = {}
    @actions_index = {}
    @current_action = nil
    @current_adapt_sector = nil

    @wb_sectoral_data.each do |r|
      location = @locations_by_iso2[r[:country]]
      unless location
        Rails.logger.error "location #{r[:country]} not found. Skipping."
        next
      end

      indicator = indicator_index[r[:questioncode]]
      unless indicator
        Rails.logger.error "indicator #{r[:questioncode]} not found. Skipping."
        next
      end

      next unless r[:responsetext]

      parse_adaptation_actions(r, location)
      group_index = values_apply_group_index(r, indicator)

      values << Indc::Value.new(
        value_wb_attributes(r, location, indicator, nil, group_index)
      )
    end

    import_adaptation_actions!
    Indc::Value.import!(values)
  end

  def import_adaptation_actions!
    if @current_action.present? && @current_adapt_sector.present?
      add_sector_to_action(@current_action, @current_adapt_sector.id)
    end

    Indc::AdaptationAction.import!(@actions_index.values, recursive: true)
  end

  def parse_adaptation_actions(row, location)
    return parse_new_adaptation_action(row, location) if OTHER_ACTION_INDICATORS.include?(row[:questioncode])
    return if row[:responsetext].downcase == 'not available'

    if row[:questioncode].downcase.start_with?('gca_sector')
      @current_adapt_sector = Indc::Sector.find_or_create_by!(
        name: row[:responsetext], sector_type: 'adapt_now'
      )
    elsif row[:questioncode].downcase.start_with?('gca_subsector')
      @current_adapt_sector = Indc::Sector.find_or_create_by!(
        name: row[:responsetext], parent_id: @current_adapt_sector.id, sector_type: 'adapt_now'
      )
    end

    if @current_action.present? && @current_adapt_sector.present? &&
        !row[:questioncode].downcase.start_with?('gca_sector')
      add_sector_to_action(@current_action, @current_adapt_sector.id)
      @current_adapt_sector = nil
    end

    return unless row[:questioncode] == ACTION_INDICATOR

    @current_action = parse_new_adaptation_action(row, location)
  end

  def parse_new_adaptation_action(row, location)
    doc_slug ||= row[:document]&.parameterize&.gsub('-', '_')
    action_key = [
      doc_slug,
      location.id,
      row[:responsetext]
    ].join('_')
    @actions_index[action_key] ||= Indc::AdaptationAction.new(
      title: row[:responsetext],
      document_id: @documents_cache[doc_slug].id,
      location: location
    )
    action = @actions_index[action_key]
    sector_key = [row[:sector], row[:subsector]].join('_')
    sector_id = @sectors_index[sector_key].id
    add_sector_to_action(action, sector_id)
    action
  end

  def add_sector_to_action(action, sector_id)
    return if action.adaptation_action_sectors.map(&:sector_id).include?(sector_id)

    action.adaptation_action_sectors.build(sector_id: sector_id)
  end

  def values_apply_group_index(row, indicator)
    group_indicator = indicator.group_indicator_slug || indicator.slug
    group_key = row.slice(:country, :document, :sector, :subsector).
      values.
      push(group_indicator).
      join('_')
    @value_group_index ||= {}
    @value_group_index[group_key] ||= 0
    @value_group_index[group_key] += 1 if group_indicator == indicator.slug
    @value_group_index[group_key]
  end

  def import_documents
    @documents.each do |doc|
      Indc::Document.create!(document_attributes(doc))
    end
    @documents_cache = Indc::Document.all.map { |d| [d.slug, d] }.to_h
  end

  def import_submissions
    @submissions.each do |sub|
      location = Location.find_by(iso_code3: sub[:iso])
      next unless location
      begin
        Indc::Submission.create!(submission_attributes(location, sub))
      rescue
        puts "This row failed #{sub}"
      end
    end
  end

  # comparison slugs are for compare pages
  # to be able to compare values for different indicators
  def import_comparison_slugs
    @comparison_indicators.each do |ind|
      slugs = [ind[:pledges_slug], ind[:ndc_slug], ind[:lts_slug], ind[:lse_slug]]
      Indc::Indicator.where(slug: slugs).update_all(normalized_label: ind[:normalized_label],
                                                    normalized_slug: ind[:normalized_slug])
    end
  end

  def reject_map_indicators_without_values_or_labels
    map_indicators = Indc::Category.
      joins(:category_type).
      where('indc_category_types.name' => 'map').
      includes(:indicators).map(&:indicators).flatten
    map_indicators.each do |indicator|
      if indicator.values.empty?
        Rails.logger.debug "Rejecting indicator without values: #{indicator.slug}"
        indicator.destroy
        next
      end
      if indicator.labels.empty?
        Rails.logger.debug "Rejecting indicator without labels: #{indicator.slug}"
        indicator.destroy
      end
    end
  end

  def indicators_hash_by_source(source)
    Indc::Indicator.
      where(source: @sources_index[source]).
      group_by(&:slug).
      map { |k, v| [k, v.first] }.
      to_h
  end

  def sync_indc_indicators
    CountryProfile::Indicator.sync_indc_indicators
  end
end
# rubocop:enable ClassLength
