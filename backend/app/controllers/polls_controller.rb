class PollsController < ApplicationController
    def new
        @poll = Poll.new
        @poll.name = params[:name]
        @poll.description = params[:description]
        @poll.type = params[:type]
        @poll.set_token
        if @poll.save
            render json: @poll
        else
            render json: 'error saving poll', status: 410
        end
    end
end
