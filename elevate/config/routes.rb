Rails.application.routes.draw do
  post '/api/polls', to: 'polls#create'
  get '/api/polls/:token_id', to: 'polls#show'
end
