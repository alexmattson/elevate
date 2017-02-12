class PollsController < ApplicationController

  def create
    token = Poll.generate_token
    @poll = Poll.new({
      name: params[:name],
      poll_type: params[:poll_type],
      description: params[:description],
      token: token
    })
    if @poll.save
        render json: @poll
    else
        render json: 'error saving poll', status: 410
    end
  end

  def show
    token_id = params[:token_id]
    @poll = Poll.find_by(token: token_id)
    render json: @poll
  end

end
