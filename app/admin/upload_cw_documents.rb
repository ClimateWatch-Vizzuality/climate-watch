ActiveAdmin.register_page 'Upload Cw Documents' do
  menu parent: 'Climate Watch Global', priority: 2

  content do
    render partial: 'admin/upload_form', locals: {
      upload_path: admin_upload_cw_documents_upload_path
    }
  end

  page_action :upload, method: :post do
    documents = Document.where(platform_name: 'global_country_platform')
    documents.each do |document|
      files = document.uploads.attachments
      files.each do |file|
        S3Uploader.instance.call(
          file,
          'test'
        )
      end
    end

    notice = 'Uploaded succesfully!'
    redirect_to admin_cw_documents_path, notice: notice
  end
end
