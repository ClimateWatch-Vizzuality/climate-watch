Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :countries, only: [:index], controller: :countries, param: :code
      resources :emissions, only: [:index], controller: :historical_emissions

      resources :ndcs, param: :code, only: [:index, :show] do
        get :full, on: :member, controller: :ndc_full_texts, action: :show
        get :full, on: :collection, controller: :ndc_full_texts, action: :index
        get :sdgs, on: :member, controller: :ndc_sdgs, action: :show
      end
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
 end
