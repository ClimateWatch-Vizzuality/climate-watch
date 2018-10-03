class ImportSocioeconomicsWorker < BaseImportWorker
  private

  def import_data
    ImportSocioeconomics.new.call
  end
end
