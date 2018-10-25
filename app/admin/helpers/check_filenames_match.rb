module Admin
  class CheckFilenamesMatch
    attr_reader :original_filename, :expected_filename

    def initialize(original_filename, expected_filename)
      @original_filename = original_filename
      @expected_filename = expected_filename
    end

    class << self
      def call(original_filename, expected_filename)
        new(original_filename, expected_filename).call
      end
    end

    def call
      filenames_match ? original_filename : expected_filename
    end

    private

    def filenames_match
      File.basename(original_filename) == expected_filename
    end
  end
end
