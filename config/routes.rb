Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self) rescue ActiveAdmin::DatabaseHitDuringLoad

  authenticate :admin_user do
    require 'sidekiq/web'
    mount Sidekiq::Web => '/sidekiq'
  end

  namespace :api do
    namespace :v1 do
      namespace :locations do
        resources :countries, only: [:index], controller: :countries
        resources :regions, only: [:index], controller: :regions
      end

      namespace :my_cw do
        get 'user', to: 'users#current'
        resources :users, only: [:create, :update]
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
      resources :lse_laws_and_policies, only: [:show]

      namespace :data do
        resources :historical_emissions, only: [:index] do
          get :download, on: :collection, defaults: { format: 'zip' }
          get :meta, on: :collection
        end
        namespace :historical_emissions do
          resources :data_sources, only: [:index]
          resources :gwps, only: [:index]
          resources :gases, only: [:index]
          resources :sectors, only: [:index]
        end
        resources :ndc_sdg, only: [:index] do
          get :download, on: :collection, defaults: { format: 'zip' }
          get :meta, on: :collection
        end
        namespace :ndc_sdg do
          resources :goals, only: [:index]
          resources :targets, only: [:index]
          resources :sectors, only: [:index]
        end
        resources :ndc_content, only: [:index] do
          get :download, on: :collection, defaults: { format: 'zip' }
          get :meta, on: :collection
        end
        namespace :ndc_content do
          resources :indicators, only: [:index]
          resources :data_sources, only: [:index]
          resources :categories, only: [:index]
          resources :labels, only: [:index]
          resources :sectors, only: [:index]
        end
        namespace :agriculture_profile, only: [:index] do
          resources :emissions, only: [:index]
          resources :country_contexts, only: [:index]
          resources :areas, only: [:index]
          resources :meat_consumptions, only: [:index]
          resources :meat_productions, only: [:index]
          resources :meat_trades, only: [:index]
        end
      end

      get :login, to: 'auth#login'

      get '(*endpoint)', controller: :api, action: :route_not_found
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
