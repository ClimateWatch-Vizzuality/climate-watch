require 'rails_helper'

describe Api::V1::NotificationsController, type: :controller do
  context do
    let_it_be(:old_notification) { create(:notification, date: 15.days.ago) }
    let_it_be(:notifications) { create_list(:notification, 10, date: 10.days.ago) }
    let_it_be(:future_notification) { create(:notification, date: 2.days.from_now) }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_successful
      end

      it 'does not return future notifications' do
        get :index
        parsed_body = JSON.parse(response.body)
        ids = parsed_body.map { |n| n['id'].to_i }
        expect(ids).not_to include(future_notification.id)
      end
    end
  end
end
