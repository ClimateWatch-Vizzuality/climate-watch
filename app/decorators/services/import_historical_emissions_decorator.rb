ImportHistoricalEmissions.class_eval do
  def call
    super
    HistoricalEmissions::NormalisedRecord.refresh
    HistoricalEmissions::SearchableRecord.refresh
  end
end
