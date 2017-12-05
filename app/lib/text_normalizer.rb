module TextNormalizer
  def self.normalize(string)
    operations = [
      ->(s) { s.gsub(160.chr('UTF-8'), 32.chr) },
      ->(s) { s.squish }
    ]

    operations.reduce(string) do |s, operation|
      operation.call(s)
    end
  end
end
