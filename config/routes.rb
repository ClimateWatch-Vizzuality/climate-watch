Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :ndcs, param: :code, only: [:index, :show] do
    get :full, on: :member, controller: :ndc_full_texts, action: :show
  end
  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
