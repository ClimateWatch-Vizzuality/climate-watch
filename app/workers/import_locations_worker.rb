class ImportLocationsWorker < DataUploader::BaseImportWorker
  private

  def import_data
    ImportLocations.new.call
  end
end
