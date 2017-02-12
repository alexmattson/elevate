
class OauthController < ApplicationController
    include HTTParty
    def index
        poll_id = params[:poll_id]
        redirect_to ('https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=' +
            '9886b2e7-684b-4370-b515-f54accde5490&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Ftoken&response_type=code&state=1234&scope=User.read'
        )
    end

    def token
        code = params[:code]
        options = {
            "client_id": "9886b2e7-684b-4370-b515-f54accde5490",
            "client_secret": "ZbG2MvqJqy33zq3j3qPUQ7c",
            "code": code,
            "redirect_uri": "http://localhost:3000/oauth/token",
            "grant_type": "authorization_code",
            "scope": "User.read"
        }
        resp = self.class.post(
            'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            {
              :body => options,
              :headers => { 'Content-Type' => 'application/x-www-form-urlencoded', 'Accept' => 'application/json'}
            }
        )
        token = resp.parsed_response["access_token"]
        session[:token] = token
        redirect_to 'http://localhost:3000/oauth/docusign'
    end

    def docusign

    end
end
