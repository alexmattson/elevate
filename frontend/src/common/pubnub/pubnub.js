import PubNub from 'pubnub';
import { receiveData, receiveMessage } from './actions';

const PUBLISH_KEY = 'pub-c-0644c683-0882-4d28-b6ac-81acf63ba847';
const SUBDCRIBE_KEY = 'sub-c-6cbc7d16-f09c-11e6-9283-02ee2ddab7fe';

const pubnub =  new PubNub({
  publishKey : PUBLISH_KEY,
  subscribeKey : SUBDCRIBE_KEY
});

const channel = 'voting-channel'

export function sub() {
  return (dispatch, store) => {

    function publishSampleMessage() {
        console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
        var publishConfig = {
            channel,
            'poll-id': 'pollId-1',
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
        message: function(data) {
            if (data.channel === channel) {
              dispatch(receiveMessage(data));
            } else {
              dispatch(receiveData(data));
            }
            console.log("New Message!!", data);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })
    console.log("Subscribing..");
    debugger;
    pubnub.subscribe({
        channels: [channel, `pollId-1-result`]
    });
  }
}

// export function pub() {
//   return (dispatch, store, channel, pollId, vote) => {
//
//     pubnub.publish() {
//       channel: channel,
//       poll_id: pollId,
//       message: {
//         poll_id: pollId,
//         vote: vote
//       }
//     }
//
//   }
// }
