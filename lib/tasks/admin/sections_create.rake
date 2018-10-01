namespace :db do
  desc 'Creates sections for admin panel'
  task sections_create: :environment do
    platform_names = %w(
      global_cw_platform
      indonesia_platform
      india_platform
    )

    platform_names.each do |platform_name|
      next unless Admin::Platform.find_by(name: platform_name)

      section_names_for(platform_name).each do |section_name|
        Admin::Section.create(name: section_name, platform:
          Admin::Platform.find_by(name: platform_name))
      end
    end

    puts 'Platforms and sections for admin panel created'
  end
end

def section_names_for(platform)
  case platform
  when 'global_cw_platform'
    section_names_for_cw_platform
  when 'indonesia_platform'
    section_names_for_indonesia_platform
  when 'india_platform'
    section_names_for_india_platform
  else
    "No section names for #{platform}"
  end
end

def section_names_for_cw_platform
  %w(
    adaptation
    historical_emissions
    indc
    locations
    locations_members
    ndc_texts
    quantifications
    sdgs
    socioeconomics
    timeline
    wb_extra
    wri_metadata
  )
end

def section_names_for_india_platform
  %w(
    locations
    historical_emissions
  )
end

def section_names_for_indonesia_platform
  %w(
    historical_emissions
    timeline
  )
end
