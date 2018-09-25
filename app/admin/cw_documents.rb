ActiveAdmin.register Document, as: 'CW Documents' do
  menu parent: 'Climate Watch Global'

  config.filters = false

  permit_params :uploads

  form html: {multipart: true} do |f|
    f.inputs 'Uploads' do
      f.input :uploads, as: :file, input_html: {multiple: true}
    end
    f.actions
  end

  index do
    render partial: 'admin/form', locals: {
      documents: Document.global_country_platform
    }
  end

  controller do
    def create
      document = Document.create(platform_name: 'global_country_platform')
      document.uploads.attach(params[:document][:uploads])

      redirect_to admin_cw_documents_path
    end
  end
end
