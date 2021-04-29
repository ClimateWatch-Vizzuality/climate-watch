module Api
  module V1
    class NewslettersController < ApiController
      NewsletterError = Class.new(StandardError)

      # making this server side as Salesforce pardot is not CORS friendly
      def create
        res = Net::HTTP.post_form URI(ENV['USER_NEWSLETTER_URL']), form_params

        # response is HTML page and if no redirect was set the success will show Cannot find success page message
        # ofc would be better with proper API
        raise NewsletterError, "#{res.code} - #{res.message}" unless res.is_a?(Net::HTTPSuccess)
        raise NewsletterError, res.body unless res.body.include?('Cannot find success page')

        render json: {code: 200, status: 'Successfully signed up for the newsletter'}
      rescue NewsletterError => e
        Appsignal.set_error(e)
        render json: {
          code: 422,
          status: 'Newsletter error: ' + e.message
        }, status: :unprocessable_entity
      end

      private

      def form_params
        params.permit(:email, :first_name, :last_name, :organization, :country).to_h
      end
    end
  end
end
