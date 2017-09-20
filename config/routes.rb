Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :locations do
        resources :countries, only: [:index], controller: :countries
        resources :regions, only: [:index], controller: :regions
      end

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
