class Ndc < ApplicationRecord
  include PgSearch

  belongs_to :location

  pg_search_scope :search_for, against: :full_text, using: {
    tsearch: {
      dictionary: 'English',
      tsvector_column: :full_text_tsv,
      highlight: {
        StartSel: '<mark>',
        StopSel: '</mark>',
        MaxWords: 123,
        MinWords: 456,
        ShortWord: 4,
        HighlightAll: true,
        MaxFragments: 3,
        FragmentDelimiter: '&hellip;'
      }
    }
  }

  def self.refresh_full_text_tsv
    update_all('full_text_tsv = to_tsvector(full_text)')
  end
end
