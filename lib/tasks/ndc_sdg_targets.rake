namespace :ndc_sdg_targets do
  desc 'Import NDC - SDG target linkages'
  task import: :environment do
    ImportNdcSdgTargets.new.call
  end
end
