class ImportLocationMembersWorker < DataUploader::BaseImportWorker
  private

  def import_data
    ImportLocationMembers.new.call
  end
end
