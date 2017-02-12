require 'open-uri'
require "base64"

class OauthController < ApplicationController
    include HTTParty
    def index
        endpoint = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?'
        poll_id = params[:poll_id]
        options = URI.encode_www_form({
            "client_id" => APP_CONFIG['microsoft_client_id'],
            "redirect_uri" => APP_CONFIG['root_url'] + '/oauth/token',
            "response_type" => 'code',
            "state" => poll_id,
            "scope" => 'Files.Read'
        })
        redirect_to (endpoint + options)
        session[:poll_id] = poll_id
    end

    def token
        code = params[:code]
        options = {
            "client_id": APP_CONFIG['microsoft_client_id'],
            "client_secret": APP_CONFIG['microsoft_secret'],
            "code": code,
            "redirect_uri": APP_CONFIG['root_url'] + "/oauth/token",
            "grant_type": "authorization_code",
            "scope": "Files.Read"
        }
        resp = self.class.post(
            'https://login.microsoftonline.com/common/oauth2/v2.0/token?',
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
        else
            session[:token] = @user.oauth_token
        end
        puts @user
        redirect_to('/')
    end

    def docusign

        if params[:code]
            @user = current_user

            options = {
                "code": params[:code],
                "grant_type": "authorization_code",
            }

            auth_header = "Basic " + Base64.encode64(APP_CONFIG['docusign_integrator_key'] + ":" + APP_CONFIG['docusign_secret']).rstrip
            resp = self.class.post(
                'https://account-d.docusign.com/oauth/token',
                {
                  :body => options,
                  :headers => {
                      'Content-Type' => 'application/x-www-form-urlencoded',
                      'Authorization' => auth_header
                  }
                }
            )
            resp = resp.parsed_response

            oauth_token = resp['access_token']
            @user.docusign_oauth_token = oauth_token

            user_info = self.class.get(
                'https://account-d.docusign.com/oauth/userinfo',
                {
                    :headers => {'Authorization' => "Bearer #{APP_CONFIG['docusign_oauth_token']}"}
                }
            ).parsed_response
            account = user_info["accounts"].first
            @user.docusign_id = account["account_id"]
            @user.save
            redirect_to('/')
        else
            secret_key = APP_CONFIG['docusign_secret']
            integrator_key = APP_CONFIG['docusign_integrator_key']
            endpoint = 'https://account-d.docusign.com/oauth/auth?'
            options = URI.encode_www_form({
                "client_id" => integrator_key,
                "redirect_uri" => APP_CONFIG['root_url'] + '/oauth/docusign',
                "response_type" => 'code',
                "scope" => 'signature'
            })
            redirect_to(endpoint + options)
        end
    end

    def get_files

        token = current_user.oauth_token
        byebug
        if token
            resp = self.class.get(
                "https://graph.microsoft.com/v1.0/me/drive/root/search(q='signature')",
                {
                    :headers => {'Authorization' => "Bearer #{token}"}
                }
            ).parsed_response
        else
            resp = ''
        end
        result = resp['value'].first
        download_url = result["@microsoft.graph.downloadUrl"]
        file = result["file"]
        mime_type = file["mimeType"]

        file_data = self.class.get(
            download_url
        ).parsed_response

        accountId = current_user.docusign_id
        docusign_endpoint = "https://demo.docusign.net/restapi/v2/accounts/#{APP_CONFIG['docusign_id']}/envelopes"
        byebug
        docusign_resp = self.class.post(
            docusign_endpoint,
            {
                :headers => {
                    'Content-Type' => 'application/json',
                    'Authorization' => "Bearer #{APP_CONFIG['docusign_oauth_token']}"
                },
                :body => '{
                    "status":	"created",
                    "emailSubject":	"Elevate Signature Required",
                    "documents":	[],
                    "recipients":	["paulmoliva@gmail.com"]
                }'
            }
        )

        render json: docusign_resp.as_json
    end

end
