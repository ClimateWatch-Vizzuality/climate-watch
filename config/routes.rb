Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :locations do
        resources :countries, only: [:index], controller: :countries
        resources :regions, only: [:index], controller: :regions
      end
      resources :wb_extra, param: :iso, only: [:index, :show], controller: 'wb_extra_country_data'

      resources :emissions, only: [:index], controller: :historical_emissions do
        get :meta, on: :collection
      end

      resources :ndcs, param: :code, only: [:index] do
        get :text, on: :collection, controller: :ndc_texts, action: :index
        get :text, on: :member, controller: :ndc_texts, action: :show
        get :sdgs, on: :collection, controller: :ndc_sdgs, action: :index
        get :sdgs, on: :member, controller: :ndc_sdgs, action: :show
        get :sdgs_overview, on: :collection, controller: :ndc_sdgs,
          action: :sdgs_overview
        get :content_overview, on: :member, controller: :ndcs,
          action: :content_overview
      end
      resources :adaptations, only: [:index]
      resources :quantifications, only: [:index]
      get 'socioeconomics/:location', to: 'socioeconomics#index'
      resources :metadata, param: :slug, only: [:index, :show] do
        get :acronyms, on: :collection, controller: :metadata, action: :acronyms
      end
      resources :timeline, param: :code, only: [:index, :show]

      resources :stories, only: [:index]

      get '(*endpoint)', controller: :api, action: :route_not_found
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
