class NewsletterController < ApplicationController
  def sign_up
    res = Net::HTTP.post_form URI(ENV['USER_NEWSLETTER_URL']), form_params

    raise "Newsletter error: #{res.code} - #{res.message}" unless res.is_a?(Net::HTTPSuccess)
    raise "Newsletter error: #{res.body}" unless res.body.include?('Cannot find success page')

    head :ok
  end

  private

  def form_params
    params.permit(:email, :first_name, :last_name, :organization, :country).to_h
  end
end
