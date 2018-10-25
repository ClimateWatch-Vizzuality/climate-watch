ActiveAdmin.setup do |config|
  config.site_title = 'Climate Watch'
  config.authentication_method = :authenticate_admin_user!

  config.current_user_method = :current_admin_user

  config.logout_link_path = :destroy_admin_user_session_path
  config.comments = false

  config.batch_actions = true

  config.localize_format = :long

  config.namespace :admin do |admin|
    admin.build_menu do |menu|
      menu.add label: 'Dashboard', priority: 1
    end
  end
end
