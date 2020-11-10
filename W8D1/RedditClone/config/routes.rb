Rails.application.routes.draw do

  resources :users, only: [:new, :create, :index, :show]
  
  resources :posts, except: [:index] do
    resources :comments, only: [:new]
  end
  
  resource :session, only: [:new, :create, :destroy]
  
  resources :subs, except: [:destroy]

  resources :comments, only: [:create]
end
