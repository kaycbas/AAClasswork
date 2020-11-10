class CommentsController < ApplicationController
  def new
    @comment = Comment.new
    render :new
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      redirect_to post_url(@comment.post)
    else
      flash.now[:errors] = @comment.errors.full_messages
      render :new 
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :author_id, :post_id)
  end
end
