class ImportLocationsWorker < BaseImportWorker
  private

  def import_data
    ImportLocations.new.call
  end
end
