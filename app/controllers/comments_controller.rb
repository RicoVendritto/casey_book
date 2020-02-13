class CommentsController < ApplicationController
  before_action :set_post
  before_action :set_post_item, only: [:show, :update, :destroy]

  # GET /posts/:post_id/comments
  def index
    json_response(@post.items)
  end

  # GET /posts/:post_id/comment/:id
  def show
    json_response(@comment)
  end

  # POST /posts/:post_id/items
  def create
    @todo.items.create!(item_params)
    # json_response(@todo, :created)
    json_response(status: "SUCCESS", message: 'item created successfully.', data: @item.name)

  end

  # PUT /todos/:todo_id/items/:id
  def update
    @item.update(item_params)
    json_response(status: 'SUCCESS', message: 'item updated successfully.', data: @item.name)
  end

  # DELETE /todos/:todo_id/items/:id
  def destroy
    @item.destroy
    json_response(status: 'SUCCESS', message: 'item deleted successfully.', data: @item.name)
  end

  private

  def item_params
    params.permit(:name, :done)
  end

  def set_todo
    @todo = Todo.find(params[:todo_id])
  end

  def set_todo_item
    @item = @todo.items.find_by!(id: params[:id]) if @todo
  end
end
