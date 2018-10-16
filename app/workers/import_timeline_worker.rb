class ImportTimelineWorker < DataUploader::BaseImportWorker
  private

  def import_data
    ImportTimeline.new.call
  end
end
