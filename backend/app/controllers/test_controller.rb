class TestController < ApplicationController
    def new
        pubnub = Pubnub.new(
        subscribe_key: 'sub-c-6cbc7d16-f09c-11e6-9283-02ee2ddab7fe',
        publish_key: 'pub-c-0644c683-0882-4d28-b6ac-81acf63ba847'
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
