class ArtworksController < ApplicationController
    def index
        # artworks = Artwork.where(artist_id: params[:user_id])
        # debugger
        user = User.find_by(id: params[:user_id])
        artworks = user.artworks + user.shared_artworks
        render json: artworks
    end

    def create
        artwork = Artwork.new(artwork_params)

        if artwork.save
            render json: artwork
        else
            render json: artwork.errors.full_messages, status: 422
        end
    end
    
    def show
        render json: Artwork.find_by(id: params[:id])
    end
    
    def destroy
        artwork = Artwork.find_by(id: params[:id])
        artwork.destroy
        render json: artwork
    end
    
    def update
        artwork = Artwork.find_by(id: params[:id])
        if artwork.update(artwork_params)
            render json: artwork
        else
            render json: artwork.errors.full_messages, status: 422
        end
    end
    
    private
    def artwork_params
        params.require(:artwork).permit(:title, :image_url, :artist_id)
    end
end