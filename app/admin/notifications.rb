ActiveAdmin.register Notification do
  config.sort_order = 'updated_at_desc'

  permit_params :description, :date

  filter :description
  filter :date

  form do |f|
    f.inputs do
      f.input :date, as: :datepicker, hint: 'Notification will not be shown until this date'
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
    id_column
    column(:description) { |n| n.description.html_safe }
    column :date
    actions
  end
end
