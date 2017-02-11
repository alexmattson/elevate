class PollsController < ApplicationController

    def new
        name = params[:name]
        description = params[:description]
        type = params[:type]
        @poll = Poll.new(name, description, type)
        if @poll.save
            render json:
    end
end
