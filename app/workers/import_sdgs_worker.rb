class ImportSdgsWorker < DataUploader::BaseImportWorker
  private

  def import_data
    ImportSdgs.new.call
  end
end
