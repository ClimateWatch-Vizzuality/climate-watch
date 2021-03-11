class NewsletterController < ApplicationController
  skip_before_action :verify_authenticity_token

  def sign_up
    res = Net::HTTP.post_form URI(ENV['USER_NEWSLETTER_URL']), form_params

    raise "Newsletter error: #{res.code} - #{res.message}" unless res.is_a?(Net::HTTPSuccess)

    head :ok
  end

  private

  def form_params
    params.permit(:email, :first_name, :last_name, :organization, :country).to_h
  end
end
