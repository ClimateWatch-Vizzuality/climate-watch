module Api
  module V1
    class LseLawsAndPoliciesController < ApiController
      LSE_API = 'http://www.lse.ac.uk/GranthamInstitute/wp-json/wri/v1/targets'.freeze

      def show
        Rails.cache.fetch([LSE_API, params.permit(:id)], expires: 7.days) do
          laws_and_policies = SingleRecordFetcher.new(LSE_API, params[:id]).call
          render json: laws_and_policies
        end
      end
    end
  end
end
