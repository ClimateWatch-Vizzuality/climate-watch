ActiveAdmin.register AdminUser do
  permit_params :email, :password, :password_confirmation, :role

  config.action_items[0] = ActiveAdmin::ActionItem.new only: :index do
    link_to 'Add new Admin User', new_admin_admin_user_path if current_admin_user.superuser?
  end

  controller do
    before_action :check_admin_role, only: [:new]

    def check_admin_role
      !current_admin_user.superuser? &&
        redirect_to(admin_admin_users_path)
    end

    def update_resource(object, attributes)
      update_method =
        if attributes.first[:password].present?
          :update_attributes
        else
          :update_without_password
        end
      object.send(update_method, *attributes)
    end
  end

  index download_links: false, new_link: false do
    selectable_column
    id_column
    column :email
    column :role
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    actions
  end

  filter :email
  filter :role
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.inputs do
      f.input :email
      f.input :role, as: :select, collection: %w(superuser admin),
                     selected: 'admin', include_blank: false
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end
end
