class TestController < ApplicationController
    def new
        pubnub = Pubnub.new(
        subscribe_key: 'sub-c-0e9bcb60-edae-11e6-8919-0619f8945a4f',
        publish_key: 'pub-c-0992c83c-b4e7-48bc-a0e2-97dc9499ce73'
        )

        callback = Pubnub::SubscribeCallback.new(
        message:  ->(envelope) {
            puts "MESSAGE: #{envelope.result[:data]}"
        },
        presence: ->(envelope) {
            puts "PRESENCE: #{envelope.result[:data]}"
        },
        status:   lambda do |envelope|
            puts "\n\n\n#{envelope.status}\n\n\n"

            if envelope.error?
                puts "ERROR! #{envelope.status[:category]}"
            else
                puts 'Connected!' if envelope.status[:last_timetoken] == 0 # Connected!
                pubnub.publish(
                channel: 'test',
                message: 'Connected!'
                )
            end
        end
        )

        pubnub.add_listener(callback: callback)

        pubnub.subscribe(channels: ['test'])

        puts 'publishing'
        pubnub.publish(
        channel: 'test',
        message: {
            data: [1,2,3,4,5]
        }
        )
    end
end
