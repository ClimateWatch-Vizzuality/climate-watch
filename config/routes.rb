Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :locations do
        resources :countries, only: [:index], controller: :countries
        resources :regions, only: [:index], controller: :regions
      end

      namespace :my_cw do
        get 'user', to: 'users#current'
        resources :users, only: :create
        resources :visualizations, except: [:new, :edit]
        resources :user_stories,   except: [:new, :edit]
      end

      get 'auth/login', to: 'auth#login'
      get 'auth/logout', to: 'auth#logout'

      resources :wb_extra, param: :code, only: [:index, :show], controller: 'wb_extra_country_data'

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
        get :linkages_dataset, on: :collection, controller: :ndc_sdgs,
          action: :linkages_dataset, defaults: { format: :csv }
      end

      resources :adaptations, only: [:index]
      resources :quantifications, only: [:index]

      resources :locations, param: :code, only: [] do
        resources :socioeconomics, only: [:index] do
          get :latest, on: :collection
        end
      end

      resources :metadata, param: :slug, only: [:index, :show] do
        get :acronyms, on: :collection, controller: :metadata, action: :acronyms
      end
      resources :timeline, param: :code, only: [:index, :show]

      resources :stories, only: [:index]

      get :login, to: 'auth#login'

      get '(*endpoint)', controller: :api, action: :route_not_found
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
