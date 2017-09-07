module Slug
  def self.create(name)
    name.downcase.strip.tr(' ', '_').gsub(/\W/, '')
  end
end
