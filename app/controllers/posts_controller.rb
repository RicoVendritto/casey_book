class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    # @posts = Post.all
    @posts = current_user.posts
    json_response(@posts)
  end

  # POST /posts
  def create
    # @post = Post.create!(post_params)
    @post = current_user.posts.create!(post_params)
    json_response(@post, :created)
  end

  # GET /posts/:id
  def show
    json_response(@post)
  end

  # PUT /posts/:id
  def update
    @post.update(post_params)
    json_response(status: 'SUCCESS', message: 'updated the post', data: @post.title)
  end

  # DELETE /posts/:id
  def destroy
    @post.destroy
    json_response(status: 'SUCCESS', message: 'deleted the post', data: @post.title)

  end

  private

  def post_params
    # whitelist params
    params.permit(:title)
  end

  def set_post
    @post = Post.find(params[:id])
  end
end
