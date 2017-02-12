Rails.application.routes.draw do
  post '/api/polls', to: 'polls#create'
  get '/api/polls/:token_id', to: 'polls#show'
  get '/', to: 'pages#index'
  get '/oauth', to: 'oauth#index'
  get '/oauth/token', to: 'oauth#token'
  get '/oauth/docusign', to: 'oauth#docusign'

  get '/data/recent_docs', to: 'oauth#get_files'

  get '*path', to: 'pages#index'
end
