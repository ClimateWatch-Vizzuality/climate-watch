module Admin
  class Ability
    include Singleton

    attr_reader :platform

    def initialize
      @platform = ENV['APP_NAME']
    end

    class << self
      def can_view?(platform_name)
        instance.can_view?(platform_name)
      end
    end

    def can_view?(platform_name)
      platform_name == platform
    end
  end
end
