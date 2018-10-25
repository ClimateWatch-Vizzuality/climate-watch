class ImportQuantificationsWorker < BaseImportWorker
  private

  def import_data
    ImportQuantifications.new.call
  end
end
