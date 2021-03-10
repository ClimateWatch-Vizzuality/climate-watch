ActiveAdmin.register Notification do
  config.sort_order = 'updated_at_desc'

  permit_params :description

  form do |f|
    f.inputs do
      f.input :date, as: :datepicker
      f.input :description, as: :trix_editor
    end
    f.actions
  end

  show do
    attributes_table do
      row(:description) { |n| n.description.html_safe }
      row :date
      row :created_at
      row :updated_at
    end
  end

  index download_links: false do
    column(:description) { |n| n.description.html_safe }
    column :date
    column :created_at
    column :updated_at
    actions
  end
end
