Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :ndcs, param: :code, only: :show
  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
