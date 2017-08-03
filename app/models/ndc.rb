class Ndc < ApplicationRecord
  include PgSearch

  belongs_to :location

  pg_search_scope :search_for, against: :content, using: {
    tsearch: {dictionary: 'english', tsvector_column: :content_tsv}
  }

  def self.refresh_content_tsv
    update_all('content_tsv = to_tsvector(content)')
  end
end
