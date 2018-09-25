ActiveAdmin.register_page 'Upload Indonesia Documents' do
  menu parent: 'Indonesia Platform', priority: 2

  content do
    render partial: 'admin/upload_form', locals: {
      upload_path: admin_upload_indonesia_documents_upload_path
    }
  end

  page_action :upload, method: :post do
    documents = Document.where(platform_name: 'indonesia_country_platform')
    documents.each do |document|
      files = document.uploads.attachments
      files.each do |file|
        S3Uploader.instance.call(
          file,
          'indonesia_test'
        )
      end
    end

    notice = 'Uploaded succesfully!'
    redirect_to admin_indonesia_documents_path, notice: notice
  end
end
