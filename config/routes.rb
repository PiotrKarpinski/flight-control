Rails.application.routes.draw do
  resources :bookings
  resources :seats
  resources :flights
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    post '/login',    to: 'sessions#create'
    post '/logout',   to: 'sessions#destroy'
    get '/logged_in', to: 'sessions#is_logged_in?'

    resources :routes
    resources :locations
    resources :participants, only: [:create, :show]
    resources :stops, only: [:create, :show, :index, :destroy]
    resources :users, only: [:create, :show, :index]
  #
end
