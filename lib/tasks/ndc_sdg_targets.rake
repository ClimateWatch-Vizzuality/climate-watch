namespace :ndc_sdg_targets do
  desc 'Import NDC - SDG target linkages'
  task import: :environment do
    TimedLogger.log('import ndc-sdg linkages data') do
      ImportNdcSdgTargets.new.call
    end
  end
end
