class ImportHistoricalEmissionsWorker < DataUploader::BaseImportWorker
  private

  def import_data
    ImportHistoricalEmissions.new.call
  end
end
