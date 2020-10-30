Rails.application.routes.draw do
  resources :users, only: [:create, :destroy, :index, :show, :update] do
    resources :artworks, only: :index
  end

  resources :artworks, only: [:create, :destroy, :show, :update]
  
  resources :artwork_shares, only: [:create, :destroy]

  resources :comments, only: [:index, :create, :destroy]
end
