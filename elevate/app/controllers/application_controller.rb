class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  def current_user
      User.find_by(oauth_token: session[:token])
  end

  helper_method :current_user
end
