class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show]

  def index
    @users = User.all
  end

  def show
  end

  def create
    @user = User.new(user_params)
    
    if @user.save
      signin(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def set_user
    @user = User.find_by(slug: params[:slug])
  end

  def user_params
    params.require(:user).permit(:email, :slug, :username, :password)
  end
end
