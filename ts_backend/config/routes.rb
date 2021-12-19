Rails.application.routes.draw do
  namespace :api, defaults: {format: :json } do
      resource :user, only: [:create]
      resource :session, only: [:create, :destroy]
      resource :tick, only: [:create, :show, :destroy]
      resource :simulation, only: [:create, :show, :destroy]
      resources :simulation_summary, only: [:create, :index]
  end
  # Set the homepage
  get 'static_pages/root'
  root 'static_pages#root'
  get '/stock_symbols', :to => redirect('/stock_symbols.txt')
end
