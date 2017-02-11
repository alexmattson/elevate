Rails.application.routes.draw do
    get '/', to: 'pages#index'
    post '/polls', to: 'polls#new'
end
