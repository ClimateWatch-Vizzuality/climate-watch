class ImportAdaptationWorker < DataUploader::BaseImportWorker
  private

  def import_data
    ImportAdaptation.new.call
  end
end
