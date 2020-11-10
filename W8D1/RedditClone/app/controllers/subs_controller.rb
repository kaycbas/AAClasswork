class SubsController < ApplicationController
  before_action :require_logged_in, only: [:new, :create, :edit]


  def edit
    @sub = Sub.find_by(id: params[:id])

    if @sub
      render :edit
    else
      render json: "Not Found", status: 404
    end
  end

  def update
    @sub = Sub.find_by(id: params[:id])

    if @sub.update(sub_params)
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :edit
    end
  end

  def index
    @subs = Sub.all
    render :index
  end

  def show
    @sub = Sub.find_by(id: params[:id])
    render :show
  end

  def new
    @sub = Sub.new
    render :new
  end

  def create
    @sub = Sub.new(sub_params)
    @sub.moderator_id = current_user.id

    if @sub.save
      redirect_to subs_url
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new
    end
  end

  private
  def sub_params
    params.require(:sub).permit(:title, :description)
  end
end
