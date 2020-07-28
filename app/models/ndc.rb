class Ndc < ApplicationRecord
  include PgSearch

  belongs_to :location
  has_many :ndc_targets, class_name: 'NdcSdg::NdcTarget', dependent: :destroy

  attr_accessor :linkages

  PG_SEARCH_HIGHLIGHT_START = '<span class="highlight">'.freeze
  PG_SEARCH_HIGHLIGHT_END = '</span>'.freeze
  PG_SEARCH_HIGHLIGHT_FRAGMENT_DELIMITER = '[[FRAGMENT DELIMITER]]'.freeze
  PG_SEARCH_TSEARCH_DICTIONARY = 'simple'.freeze
  PG_SEARCH_TSEARCH_OPTIONS = {
    dictionary: PG_SEARCH_TSEARCH_DICTIONARY,
    tsvector_column: :full_text_tsv,
    normalization: 4,
    highlight: {
      MaxWords: 30,
      MinWords: 10,
      ShortWord: 3,
      HighlightAll: false,
      MaxFragments: 100,
      StartSel: PG_SEARCH_HIGHLIGHT_START,
      StopSel: PG_SEARCH_HIGHLIGHT_END,
      FragmentDelimiter: PG_SEARCH_HIGHLIGHT_FRAGMENT_DELIMITER
    }
  }.freeze

  # this scope to be used to return results with matches highlighted in
  # fragments
  pg_search_scope :with_highlights_in_fragments, against: :full_text, using: {
    tsearch: PG_SEARCH_TSEARCH_OPTIONS
  }

  # this scope to be used to return results with matches highlighted in
  # full document
  pg_search_scope :with_highlights_in_full, against: :full_text, using: {
    tsearch: PG_SEARCH_TSEARCH_OPTIONS.deep_merge(
      highlight: {
        HighlightAll: true,
        MaxFragments: 0
      }
    )
  }

  def self.refresh_full_text_tsv
    sql = <<~EOT
      full_text_tsv = to_tsvector(
        '#{PG_SEARCH_TSEARCH_DICTIONARY}',
        REGEXP_REPLACE(
          COALESCE(full_text, ''),
          '<sub>(\\d+?)</sub>',
          E'\\\\1',
          'g'
        )
      )
    EOT
    update_all(sql)
  end

  def self.linkages(params, ndc = nil)
    query_params = {}

    filters = {
      target: [:ndc_sdg_targets, :number, params[:target]],
      sector: [:ndc_sdg_ndc_target_sectors, :sector_id, params[:sector]],
      goal: [:ndc_sdg_goals, :number, params[:goal]],
      code: [:locations, :iso_code3, params[:code]&.upcase]
    }

    filters.each do |k, v|
      next unless params[k]
      query_params[v.first] = {
        v.second => v.third
      }
    end

    targets = ::NdcSdg::NdcTarget.includes(
      target: [:goal],
      ndc_target_sectors: [:sector],
      ndc: [:location]
    ).where(query_params)

    targets = targets.where(ndc_id: ndc.id) if ndc

    targets.
      reject { |n| n.starts_at.nil? }.
      uniq(&:indc_text).
      sort_by(&:starts_at)
  end

  def self.linkages_for(iso_code3, document_type = nil, language = nil)
    ndc = Ndc.
      includes(
        :location,
        ndc_targets: [
          :sectors,
          target: :goal
        ]
      ).
      references(
        :locations,
        ndc_targets: [
          ndc_target_sectors: :sectors,
          targets: :goals
        ]
      )

    # rubocop:disable Style/IfUnlessModifier
    if document_type && language
      ndc = ndc.where(document_type: document_type, language: language)
    end
    # rubocop:enable Style/IfUnlessModifier

    ndc.where(
      locations: {
        iso_code3: iso_code3.upcase
      }
    )
  end
end
