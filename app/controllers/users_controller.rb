class UsersController < ApplicationController

  skip_before_action :authorize_request, only: :create

  # POST /signup
  # return authenticated token upon signup

  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = {message: Message.account_created, auth_token: auth_token, user: user_params}
    json_response(response, :created)
  end

  def login
    @user = User.find_by_email(params[:email])
    if @user.authenticate(params[:password])
      token = encode(id @user.id, name: @user.name)
      response = {auth_token: token, user: @user}
      json_response(response)
    else
      response = {message: "Unauthorized!"}
      json_response(response)
    end
  end

  private

  def user_params
    params.permit(
        :name,
        :email,
        :password,
        :password_confirmation
    )
  end

end