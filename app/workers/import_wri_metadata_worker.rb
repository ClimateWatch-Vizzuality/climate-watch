class ImportWriMetadataWorker < DataUploader::BaseImportWorker
  private

  def import_data
    ImportWriMetadata.new.call
  end
end
