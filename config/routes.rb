Rails.application.routes.draw do
  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
