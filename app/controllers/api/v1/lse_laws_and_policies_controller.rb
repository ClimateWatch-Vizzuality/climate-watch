require 'httparty'

module Api
  module V1
    class LseLawsAndPoliciesController < ApiController
      LSE_API = 'http://www.lse.ac.uk/GranthamInstitute/wp-json/wri/v1/targets'.freeze

      def index
        laws_and_policies = HTTParty.get(LSE_API)
        render json: laws_and_policies.parsed_response
      end

      def show
        Rails.cache.fetch([LSE_API, params.permit(:id)], expires: 1.hour) do
          laws_and_policies = HTTParty.get("#{LSE_API}/#{params[:id]}")
          render json: laws_and_policies.parsed_response
        end
      end
    end
  end
end
