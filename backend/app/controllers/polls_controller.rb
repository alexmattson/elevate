class PollsController < ApplicationController
    def new
        body = JSON.parse(request.body.read)
        byebug
        @poll = Poll.new(body)
        if @poll.save
            render json: @poll
        else
            render json: 'error saving poll', status: 410
        end
    end

    def show
        byebug
        token_id = params[:token_id]
        @poll = Poll.find_by(token: token_id)
        render json: @poll
    end
end
