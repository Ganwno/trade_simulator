Rails.application.routes.draw do
  namespace :api, defaults: {format: :json } do
      resource :user, only: [:create]
      resource :session, only: [:create, :destroy]
      resource :tick, only: [:create, :show, :destroy]
  end
  # Set the homepage
  get 'static_pages/root'
  root 'static_pages#root'
end
