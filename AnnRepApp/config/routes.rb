Rails.application.routes.draw do

  devise_for :users
  root to: "reports#index"

  resources :reports do
    resources :parts
    resources :sections
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
