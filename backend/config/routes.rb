Rails.application.routes.draw do
    # get '/', to: 'pages#index'
    post '/polls', to: 'polls#create'
    get '/polls/:token_id', to: 'polls#show'
    # get '*other', to: 'pages#index'
end
