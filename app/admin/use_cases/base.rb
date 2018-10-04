module Admin
  module UseCase
    class Base
      attr_reader :repository, :s3_folder_path

      def initialize(repo, s3_folder_path)
        @repository = repo
        @s3_folder_path = s3_folder_path
      end
    end
  end
end
