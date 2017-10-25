class ImportGlobalIndc

  GLOBAL_METADATA_FILEPATH =
    "#{CW_FILES_PREFIX}global_indc/CW_NDC_metadata_combined.csv".freeze

  def call
    cleanup

    load_csvs

    import_categories
    import_indicators
  end

  private

  def load_csvs
    @metadata = S3CSVReader.read(GLOBAL_METADATA_FILEPATH).map(&:to_h)
    @categories_index = {}
  end

  def cleanup
    GlobalIndc::Category.delete_all
    GlobalIndc::Indicator.delete_all
  end

  def import_categories
    categories.map(&:first).uniq.each do |category|
      @categories_index[category] = GlobalIndc::Category.create!(
        name: category,
        slug: Slug.create(category)
      )
    end

    categories.map.uniq(&:second).each do |category|
      next if category.second.nil?
      @categories_index[category.second] = GlobalIndc::Category.create!(
        name: category.second,
        slug: Slug.create(category.second),
        parent: @categories_index[category.first]
      )
    end
  end

  def import_indicators
    @metadata.each do |row|
      next if row[:column_name].nil? || row[:source].nil? ||
        row[:category_2] == 'NULL'

      indicator = GlobalIndc::Indicator.find_or_create_by!(
        indicator(row[:column_name], row[:source])
      )

      indicator.categories << (row[:category_2].nil? ?
        @categories_index[row[:category]] :
        @categories_index[row[:category_2]])
    end
  end

  def categories
    categories = @metadata.map do |row|
      [row[:category], row[:category_2]]
    end

    categories = categories.reject do |category|
      category.second == 'NULL'
    end

    categories.uniq
  end

  def indicator(code, source)
    if source.upcase == 'CAIT'
      {cait_indicator: CaitIndc::Indicator.find_by(slug: code)}
    elsif source.upcase == 'WB'
      {wb_indicator: WbIndc::Indicator.find_by(code: code)}
    end
  end
end

