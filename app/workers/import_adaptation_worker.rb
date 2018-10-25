class ImportAdaptationWorker < BaseImportWorker
  private

  def import_data
    ImportAdaptation.new.call
  end
end
