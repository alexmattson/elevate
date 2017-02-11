Rails.application.routes.draw do
  post '/polls', to: 'polls#create'
end
