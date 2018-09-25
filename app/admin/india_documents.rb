ActiveAdmin.register Document, as: 'India Documents' do
    menu parent: "India Platform"
    permit_params :uploads
  
    form html: { multipart: true } do |f|
      f.inputs "Uploads" do
        f.input :uploads, as: :file, input_html: { multiple: true }
      end
      f.actions
    end
  
    index do
      render partial: 'admin/form', locals: {
        documents: Document.india_country_platform
      }
    end
  
    controller do
      def create
        document = Document.create(platform_name: 'india_country_platform')
        document.uploads.attach(params[:document][:uploads])
  
        redirect_to admin_india_documents_path
      end
    end
  end
  