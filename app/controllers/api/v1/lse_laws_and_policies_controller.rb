module Api
  module V1
    class LseLawsAndPoliciesController < ApiController
      LSE_API = 'https://climate-laws.org/cclow/api/targets'.freeze

      def show
        laws_and_policies = SingleRecordFetcher.new(LSE_API, params[:id]).call
        render json: laws_and_policies
      end
    end
  end
end
