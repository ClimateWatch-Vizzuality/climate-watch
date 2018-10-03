class ImportHistoricalEmissionsWorker < BaseImportWorker
  private

  def import_data
    ImportHistoricalEmissions.new.call
  end
end
