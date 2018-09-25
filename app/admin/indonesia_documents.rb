ActiveAdmin.register Document, as: 'Indonesia Documents' do
  menu parent: 'Indonesia Platform'

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
      documents: Document.indonesia_country_platform
    }
  end

  controller do
    def create
      document = Document.create(platform_name: 'indonesia_country_platform')
      document.uploads.attach(params[:document][:uploads])

      redirect_to admin_indonesia_documents_path
    end
  end
end
