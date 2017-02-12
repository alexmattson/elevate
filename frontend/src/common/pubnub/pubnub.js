import PubNub from 'pubnub';

const PUBLISH_KEY = 'pub-c-0644c683-0882-4d28-b6ac-81acf63ba847';
const SUBDCRIBE_KEY = 'sub-c-6cbc7d16-f09c-11e6-9283-02ee2ddab7fe';

export function sub(channel) {

    let pubnub = new PubNub({
        publishKey : 'pub-c-0644c683-0882-4d28-b6ac-81acf63ba847',
        subscribeKey : 'sub-c-6cbc7d16-f09c-11e6-9283-02ee2ddab7fe'
    })

    function publishSampleMessage() {
        console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
        var publishConfig = {
            channel : channel,
            message : "Let's vote!"
        }
        pubnub.publish(publishConfig, function(status, response) {
            console.log(status, response);
        })
    }

    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                publishSampleMessage();
            }
        },
        message: function(message) {
            console.log("New Message!!", message);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: [channel, `${channel}-result`]
    });
};
