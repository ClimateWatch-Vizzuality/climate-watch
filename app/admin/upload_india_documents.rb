ActiveAdmin.register_page 'Upload India Documents' do
  menu parent: 'India Platform', priority: 2

  content do
    render partial: 'admin/upload_form', locals: {
      upload_path: admin_upload_india_documents_upload_path
    }
  end

  page_action :upload, method: :post do
    documents = Document.where(platform_name: 'india_country_platform')
    documents.each do |document|
      files = document.uploads.attachments
      files.each do |file|
        S3Uploader.instance.call(
          file,
          'india_test'
        )
      end
    end

    notice = 'Uploaded succesfully!'
    redirect_to admin_india_documents_path, notice: notice
  end
end
