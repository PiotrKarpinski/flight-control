Rails.application.routes.draw do

  resources :bookings
  resources :seats
  resources :flights, defaults: { format: :json }
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
end
