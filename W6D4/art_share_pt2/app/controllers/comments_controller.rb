class CommentsController < ApplicationController
    def index
        author_id = params[:comment][:author_id]
        artwork_id = params[:comment][:artwork_id]
        
        if author_id
            comments = Comment.where(author_id: author_id)
        elsif artwork_id
            comments = Comment.where(artwork_id: artwork_id)
        else
            comments = Comment.all
        end

        render json: comments
    end 

    def create
        comment = Comment.new(comment_params)

        if comment.save
            render json: comment
        else
            render json: comment.errors.full_messages, status: 422
        end
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        comment.destroy
        render json: comment
    end

    private
    def comment_params
        params.require(:comment).permit(:body, :author_id, :artwork_id)
    end
end