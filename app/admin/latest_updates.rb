ActiveAdmin.register Update do
  config.filters = false
  config.sort_order = 'updated_at_desc'
  permit_params :category, :description, :link

  controller do
    before_action { @page_title = "Latest Updates" }
  end

  form do |f|
    f.inputs do
      f.input :category
      f.input :description
      f.input :link
    end
    f.actions
  end

  index download_links: false do
    column :category
    column :description
    column :link
    column :created_at
    column :updated_at
    actions
  end
end
