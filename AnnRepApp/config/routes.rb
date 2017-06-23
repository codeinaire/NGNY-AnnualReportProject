Rails.application.routes.draw do

  devise_for :users

  root 'reports#index'

  resources :users do
    resources :reports do
      resources :parts, :sections
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
