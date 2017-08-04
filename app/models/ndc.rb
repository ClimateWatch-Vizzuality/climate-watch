class Ndc < ApplicationRecord
  include PgSearch

  belongs_to :location

  pg_search_scope :search_for, against: :content, using: {
    tsearch: {
      dictionary: 'English',
      tsvector_column: :content_tsv,
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

  def self.refresh_content_tsv
    update_all('content_tsv = to_tsvector(content)')
  end
end
