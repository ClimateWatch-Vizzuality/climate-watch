Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :locations do
        resources :countries, only: [:index], controller: :countries
        resources :regions, only: [:index], controller: :regions
      end

      resources :emissions, only: [:index], controller: :historical_emissions do
        get :meta, on: :collection
      end

      resources :ndcs, param: :code, only: [:index, :show] do
        get :text, on: :member, controller: :ndc_texts, action: :show
        get :text, on: :collection, controller: :ndc_texts, action: :index
        get :sdgs, on: :member, controller: :ndc_sdgs, action: :show_by_location
      end
      resources :adaptations, only: [:index]
      resources :metadata, only: [:index, :show]

      get '(*endpoint)', controller: :api, action: :not_found
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
