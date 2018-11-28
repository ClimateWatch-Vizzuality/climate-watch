ActiveAdmin.register_page 'Dashboard' do
  menu priority: 1, label: proc { I18n.t('active_admin.dashboard') }

  content title: proc { I18n.t('active_admin.dashboard') } do
    render partial: 'data_uploader/admin/dashboard', locals: {
      platform_name: 'Climate Watch Global'
    }
  end
end
