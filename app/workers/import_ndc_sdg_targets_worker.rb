class ImportNdcSdgTargetsWorker < DataUploader::BaseImportWorker
  private

  def import_data
    ImportNdcSdgTargets.new.call
  end
end
