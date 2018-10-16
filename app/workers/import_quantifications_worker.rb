class ImportQuantificationsWorker < DataUploader::BaseImportWorker
  private

  def import_data
    ImportQuantifications.new.call
  end
end
