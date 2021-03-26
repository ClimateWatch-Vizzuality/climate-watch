require 'rails_helper'

RSpec.describe Admin::NotificationsController, type: :controller do
  render_views

  let_it_be(:admin) { create(:admin_user) }
  let_it_be(:notification) { create(:notification) }

  let(:valid_attributes) { attributes_for(:notification) }

  before { sign_in admin }

  describe 'GET index' do
    subject { get :index }

    it { is_expected.to be_successful }
  end

  describe 'GET show' do
    subject { get :show, params: {id: notification.id} }

    it { is_expected.to be_successful }
  end

  describe 'GET new' do
    subject { get :new }

    it { is_expected.to be_successful }
  end

  describe 'GET edit' do
    subject { get :edit, params: {id: notification.id} }

    it { is_expected.to be_successful }
  end

  describe 'POST create' do
    context 'with valid params' do
      subject { post :create, params: {notification: valid_attributes} }

      it 'creates a new Notification' do
        expect { subject }.to change(Notification, :count).by(1)
      end

      it 'redirects to the created record' do
        expect(subject).to redirect_to(admin_notification_path(Notification.order(:created_at).last))
      end
    end

    context 'without description' do
      subject { post :create, params: {notification: valid_attributes.merge(description: nil)} }

      it { is_expected.to be_successful }

      it 'does not create an Notification' do
        expect { subject }.not_to change(Notification, :count)
      end
    end
  end

  describe 'PATCH update' do
    let!(:notification_to_update) { create(:notification, description: 'description', date: '2021-01-01') }

    subject { patch :update, params: {id: notification_to_update.id, notification: {description: 'new description', date: '2021-02-02'}} }

    it 'does not create another record' do
      expect { subject }.not_to change(Notification, :count)
    end

    it 'updates existing Notification' do
      expect { subject }
        .to change { notification_to_update.reload.description }.from('description').to('new description')
        .and change { notification_to_update.date }.from(Date.parse('2021-01-01')).to(Date.parse('2021-02-02'))
    end

    it 'redirects to the last updated Notification' do
      expect(subject).to redirect_to(admin_notification_path(Notification.order(:updated_at).last))
    end
  end
end
