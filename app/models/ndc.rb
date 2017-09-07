class Ndc < ApplicationRecord
  include PgSearch

  belongs_to :location
  has_many :ndc_targets, class_name: 'NdcSdg::NdcTarget', dependent: :destroy

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
      full_text_tsv = to_tsvector('#{PG_SEARCH_TSEARCH_DICTIONARY}', COALESCE(full_text, ''))
    EOT
    update_all(sql)
  end
end
