
class OauthController < ApplicationController
    include HTTParty
    def index
        poll_id = params[:poll_id]
        redirect_to ('https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=' +
            '9886b2e7-684b-4370-b515-f54accde5490&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Ftoken&response_type=code&state=1234&scope=User.read'
        )
        session[:poll_id] = poll_id
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

        user_info = self.class.get(
            'https://graph.microsoft.com/v1.0/me',
            {
                :headers => {'Authorization' => "Bearer #{token}"}
            }
        ).parsed_response
        #<HTTParty::Response:0x7f94fbfc4d00 parsed_response={"@odata.context"=>"https://graph.microsoft.com/v1.0/$metadata#users/$entity", "givenName"=>"Paul", "surname"=>"Oliva", "displayName"=>"Paul Oliva", "id"=>"45251513397218f8", "userPrincipalName"=>"pmoliv@gmail.com", "businessPhones"=>[], "jobTitle"=>nil, "mail"=>nil, "mobilePhone"=>nil, "officeLocation"=>nil, "preferredLanguage"=>nil}, @response=#<Net::HTTPOK 200 OK readbody=true>, @headers={"cache-control"=>["private"], "transfer-encoding"=>["chunked"], "content-type"=>["application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false;charset=utf-8"], "request-id"=>["419bfbdc-f6f5-4433-ac9a-66113b83a678"], "client-request-id"=>["419bfbdc-f6f5-4433-ac9a-66113b83a678"], "x-ms-ags-diagnostic"=>["{\"ServerInfo\":{\"DataCenter\":\"West US\",\"Slice\":\"SliceA\",\"ScaleUnit\":\"001\",\"Host\":\"AGSFE_IN_3\",\"ADSiteName\":\"WST\"}}"], "odata-version"=>["4.0"], "duration"=>["450.7095"], "date"=>["Sun, 12 Feb 2017 01:33:11 GMT"], "connection"=>["close"]}>
        @user = User.find_by(microsoft_id: user_info["id"])
        if !@user
            @user = User.new
            @user.name = user_info["displayName"]
            @user.microsoft_id = user_info["id"]
            @user.email = user_info["userPrincipalName"]
            @user.oauth_token = token
            @user.save!
        end
        puts @user
        redirect_to('/')
    end

    def docusign

    end
end
