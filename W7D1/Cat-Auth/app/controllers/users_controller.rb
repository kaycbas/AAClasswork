class UsersController < ApplicationController
  before_action :already_logged_in, only: [:new, :create]

  def new
    render :new
  end

  def create
    @user = User.new(user_params)
    @user.ensure_session_token
    # debugger
    if @user.save 
      login_user!
      redirect_to cats_url
    else
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:user_name, :password)
  end
end


