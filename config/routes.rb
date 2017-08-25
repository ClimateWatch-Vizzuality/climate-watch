Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :countries, only: [:index], controller: :countries
      resources :ndcs, param: :code, only: [:index, :show] do
        get :full, on: :member, controller: :ndc_full_texts, action: :show
      end
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
 end
