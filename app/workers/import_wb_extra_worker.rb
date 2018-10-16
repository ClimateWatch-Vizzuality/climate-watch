class ImportWbExtraWorker < DataUploader::BaseImportWorker
  private

  def import_data
    ImportWbExtra.new.call
  end
end
