class DatasetRepository
  def filter_by_section(section_id)
    Admin::Dataset.where(section_id: section_id)
  end

  def filter_by_section_and_platform(section_name, platform_name)
    Admin::Dataset.joins(:section).
      where(sections: {name: section_name}).
      where(sections: {platform_id: Admin::Platform.find_by(name: platform_name).id})
  end

  def find(dataset_id)
    Admin::Dataset.find(dataset_id)
  end
end
