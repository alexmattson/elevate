Rails.application.routes.draw do
  post '/polls', to: 'polls#create'
  get 'polls/:token_id', to: 'polls#show'
end
