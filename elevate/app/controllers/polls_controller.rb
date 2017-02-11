class PollsController < ApplicationController

  def create
      @poll = Poll.new({
        name: params[:name],
        poll_type: params[:poll_type],
        description: params[:description],
        token: '12345'
      })
      if @poll.save
          render json: @poll
      else
          render json: 'error saving poll', status: 410
      end
  end

  def show
      # byebug
      token_id = params[:token_id]
      @poll = Poll.find_by(token: token_id)
      render json: @poll
  end

end
