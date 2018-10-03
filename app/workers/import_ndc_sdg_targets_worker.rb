class ImportNdcSdgTargetsWorker < BaseImportWorker
  private

  def import_data
    ImportNdcSdgTargets.new.call
  end
end
