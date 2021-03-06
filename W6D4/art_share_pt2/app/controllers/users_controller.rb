class UsersController < ApplicationController
    def index
        p params
        if params[:query]
            users = User.where(username: params[:query])
        else
            users = User.all
        end
        render json: users
    end

    def create
        user = User.new(user_params)

        if user.save
            render json: user
        else
            render json: user.errors.full_messages, status: 422
        end
    end
    
    def show
        render json: User.find_by(id: params[:id])
    end
    
    def destroys
        user = User.find_by(id: params[:id])
        user.destroy
        render json: user
    end
    
    def update
        user = User.find_by(id: params[:id])
        if user.update(user_params)
            render json: user
        else
            render json: user.errors.full_messages, status: 422
        end
    end
    
    private
    def user_params
        params.require(:user).permit(:username)
    end
end