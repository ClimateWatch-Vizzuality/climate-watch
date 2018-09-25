ActiveAdmin.register_page 'Download Cw Documents' do
  menu parent: 'Climate Watch Global', priority: 2

  content do
    render partial: 'admin/download_form', locals: {
      download_path: admin_download_cw_documents_download_path
    }
  end

  page_action :download, method: :post do
    documents = Document.where(platform_name: 'global_country_platform')

    zipped_download = Api::V1::Data::ZippedDownload.new('cw-documents')

    # TODO: Fix downloading zipped files
    documents.each do |document|
      files = document.uploads.attachments
      files.each do |file|
        zipped_download.add_file_content(
          file,
          file.filename.to_s
        )
      end
    end

    download = zipped_download.call

    send_data(download,
              type: 'application/zip',
              filename: 'cw-documents-zipped.zip',
              disposition: 'attachment')
  end
end
