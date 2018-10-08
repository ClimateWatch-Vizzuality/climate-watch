module Admin
  module UseCase
    class UploadDatafile < Admin::UseCase::Base
      def call(params, callbacks)
        validate_if_file_chosen params
        validate_content_type_against_csv params

        dataset = repository.find(params[:dataset_id])

        validate_filename(dataset, params)

        dataset.datafile.attach(params[:datafile])

        Admin::S3Uploader.call(
          dataset.datafile.attachment,
          s3_folder_path
        )

        callbacks[:success].call
      end

      private

      def validate_if_file_chosen(params)
        params[:datafile].nil? && callbacks[:datafile_not_chosen].call
      end

      def validate_content_type_against_csv(params)
        params[:datafile].content_type != 'text/csv' &&
          callbacks[:datafile_wrong_content_type].call
      end

      def validate_filename(dataset, params)
        expected_filename = "#{dataset.name}.csv"

        params[:datafile].original_filename =
          Admin::CheckFilenamesMatch.call(
            params[:datafile].original_filename,
            expected_filename
          )
      end
    end
  end
end
