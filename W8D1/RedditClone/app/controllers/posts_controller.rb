class PostsController < ApplicationController
    before_action :require_logged_in, only: [:new, :create, :edit]

    def new
        @post = Post.new
        render :new
    end

    def create
        @post = Post.new(post_params)
        @post.author_id = current_user.id
        # @post = current_user.posts.new(post_params)
        if @post.save
            redirect_to post_url(@post)
        else
            flash.now[:errors] = @post.errors.full_messages
            render :new
        end
    end

    def edit
        @post = Post.find_by(id: params[:id])
        if @post && @post.author == current_user
            render :edit
        else
            render json: "Post not found", status: 404
        end
    end

    def update
        @post = Post.find_by(id: params[:id])
        if @post.update(post_params)
            redirect_to post_url(@post)
        else
            flash.now[:errors] = @post.errors.full_messages
            render :edit
        end
    end

    def show
        @post = Post.find(params[:id])
        render :show
    end

    def destroy
        @post = Post.find(params[:id])
        @post.destroy if @post.author == current_user
        redirect_to sub_url(@post.sub)
    end

    private
    def post_params
        params.require(:post).permit(:title, :url, :content, sub_ids: [])
    end
end
