class ImportIndcWorker < BaseImportWorker
  private

  def import_data
    ImportIndc.new.call
  end
end
