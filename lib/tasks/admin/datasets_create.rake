namespace :db do
  desc 'Creates datasets for sections for admin panel'
  task datasets_create: :environment do
    section_datasets.each do |section_dataset|
      section = section_dataset[:section]
      section_dataset[:datasets].each do |dataset|
        Admin::Dataset.create(name: dataset, section: section)
        puts "Dataset #{dataset} for section #{section.name} created."
      end
      puts "All datasets for section #{section.name}
        from platform #{section.platform.name} created."
    end
    puts 'Datasets for admin panel created'
  end
end

def cw_platform
  Admin::Platform.find_by(name: 'global_cw_platform')
end

def india_platform
  Admin::Platform.find_by(name: 'india_platform')
end

def indonesia_platform
  Admin::Platform.find_by(name: 'indonesia_platform')
end

def section_datasets
  [
    cw_historical_emissions,
    cw_adaptation,
    cw_indc,
    cw_locations,
    cw_locations_members,
    cw_quantifications,
    cw_sdgs,
    cw_socioeconomics,
    cw_timeline,
    cw_wb_extra,
    cw_wri_metadata,
    cw_ndc_texts
  ]
end

def cw_historical_emissions
  {
    section: cw_platform.sections.find_by(name: 'historical_emissions'),
    datasets: %w(
      CW_HistoricalEmissions_metadata_sectors
      CW_HistoricalEmissions_CAIT
      CW_HistoricalEmissions_PIK
      CW_HistoricalEmissions_UNFCCC
    )
  }
end

def cw_adaptation
  {
    section: cw_platform.sections.find_by(name: 'adaptation'),
    datasets: %w(
      adaptation
      adaptation_metadata
    )
  }
end

def cw_indc
  {
    section: cw_platform.sections.find_by(name: 'indc'),
    datasets: %w(
      NDC_CAIT_data
      NDC_CAIT_legend
      NDC_WB_data_wide
      NDC_WB_data_sectoral
      NDC_submission
      NDC_metadata
    )
  }
end

def cw_locations
  {
    section: cw_platform.sections.find_by(name: 'locations'),
    datasets: %w(
      locations
    )
  }
end

def cw_locations_members
  {
    section: cw_platform.sections.find_by(name: 'locations_members'),
    datasets: %w(
      locations_groupings
    )
  }
end

def cw_quantifications
  {
    section: cw_platform.sections.find_by(name: 'quantifications'),
    datasets: %w(
      CW_NDC_quantification_commas
    )
  }
end

def cw_sdgs
  {
    section: cw_platform.sections.find_by(name: 'sdgs'),
    datasets: %w(
      sdgs
      sdg_targets
    )
  }
end

def cw_socioeconomics
  {
    section: cw_platform.sections.find_by(name: 'socioeconomics'),
    datasets: %w(
      indicators_gdp
      indicators_gdp_per_capita
      indicators_population
      indicators_population_growth
    )
  }
end

def cw_timeline
  {
    section: cw_platform.sections.find_by(name: 'timeline'),
    datasets: %w(
      BR
      BUR
      GHG18_A1
      LTS
      NAP
      NC_A1
      NC_NA1
      NDC_INDC
      SA
      cancun
    )
  }
end

def cw_wb_extra
  {
    section: cw_platform.sections.find_by(name: 'wb_extra'),
    datasets: %w(
      population
      gdp
    )
  }
end

def cw_wri_metadata
  {
    section: cw_platform.sections.find_by(name: 'wri_metadata'),
    datasets: %w(
      Acronyms
      metadata_sources
      metadata_sources_descriptions
    )
  }
end

def cw_ndc_texts
  {
    section: cw_platform.sections.find_by(name: 'ndc_texts'),
    datasets: %w(
      ndc_texts
    )
  }
end
