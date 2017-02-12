class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  def current_user
      if session[:token]
          User.find_by(oauth_token: session[:token])
      end
  end

  helper_method :current_user
end
