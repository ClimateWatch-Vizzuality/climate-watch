Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :countries, only: [:index], controller: :countries
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
 end
