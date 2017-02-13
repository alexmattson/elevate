import React, {Component} from 'react';
import GSAP from 'react-gsap-enhancer';
import {TimelineMax} from "gsap";


function myAnimation({target}) {   
        var tl = new TimelineMax({repeat:0, repeatDelay:1});
        tl
        .fromTo('#poll2', .33, {transformOrigin: '50% 50%', rotation:"30", left: 100}, {rotation:"0", left: 0})
        .fromTo('#poll3', .33, {transformOrigin: '50% 50%', rotation:"30", left: 100}, {rotation:"0", left: 0}, "-=0.20")
        .fromTo('#poll4', .33, {transformOrigin: '50% 50%', rotation:"30", left: 100}, {rotation:"0", left: 0}, "-=0.20")
        .to('#poll2', .33, {transform: 'translate3d(1rem, 1rem, 0)'})
        .to('#poll3', .33, {transform: 'translate3d(2rem, 2rem, 0)'})
        .to('#poll4', .33, {transform: 'translate3d(3rem, 3rem, 0)'})

        .to('#option1 circle', .35, {stroke: '#5fc198'})
        .to('#option1 text', .35, {fill: '#5fc198'}, '-=.35')

        .to('#option1 circle', .33, {stroke: '#aaa'})
        .to('#option1 text', .33, {fill: '#aaa'}, '-=.33')

        .to('#option2 circle', .35, {stroke: '#5fc198'})
        .to('#option2 text', .35, {fill: '#5fc198'}, '-=.35')

        .to('#option2 circle', .33, {stroke: '#aaa'})
        .to('#option2 text', .33, {fill: '#aaa'}, '-=.33')

        .to('#option3 circle', .35, {stroke: '#5fc198'})
        .to('#option3 text', .35, {fill: '#5fc198'}, '-=.35')
        .addCallback(() => {
            document.getElementById('check').classList.add('drawn');
            console.log('here');
        });

        return tl;
}

class PollsSvg extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.addAnimation(myAnimation);
    }


    render() {
        return(
            <div className="img-large">

                <svg id="polls" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 331.5 367.5"><g id="poll4"><path fill="#FFF" stroke="#EFEFEF" strokeMiterlimit="10" d="M263.8 305.2H59.4c-2.8 0-5.1-2.4-5.1-5.3V50.1c0-2.9 2.3-5.3 5.1-5.3h204.4c2.8 0 5.1 2.4 5.1 5.3v249.8c0 2.9-2.3 5.3-5.1 5.3z"/><g id="option4"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="244.7" r="7.7"/><text transform="translate(115.579 247.72)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">Dallas Cowboys</text></g><g id="option3"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="209.8" r="7.7"/><text transform="translate(115.579 212.883)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">New England Patriots</text></g><g id="option2"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="175" r="7.7"/><text transform="translate(115.579 178.046)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">New York Giants</text></g><g id="option1"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="140.1" r="7.7"/><text transform="translate(115.579 143.21)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">Washington Redskins</text></g><path fill="#987DB9" d="M269.6 100.5h-216V50.6c0-3.5 2.9-6.4 6.4-6.4h203.2c3.5 0 6.4 2.9 6.4 6.4v49.9z"/><path fill="none" d="M88.1 59.2H248v32.4H88.1z"/><text transform="translate(88.12 69.815)"><tspan x="0" y="0" fill="#FFF" fontFamily="'MyriadPro-Regular'" fontSize="15">What is you favrotite NFL </tspan><tspan x="0" y="18" fill="#FFF" fontFamily="'MyriadPro-Regular'" fontSize="15">Sports Team?</tspan></text></g><g id="poll3"><path fill="#FFF" stroke="#EFEFEF" strokeMiterlimit="10" d="M263.8 305.2H59.4c-2.8 0-5.1-2.4-5.1-5.3V50.1c0-2.9 2.3-5.3 5.1-5.3h204.4c2.8 0 5.1 2.4 5.1 5.3v249.8c0 2.9-2.3 5.3-5.1 5.3z"/><g id="option4"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="244.7" r="7.7"/><text transform="translate(115.579 247.72)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">Dallas Cowboys</text></g><g id="option3"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="209.8" r="7.7"/><text transform="translate(115.579 212.883)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">New England Patriots</text></g><g id="option2"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="175" r="7.7"/><text transform="translate(115.579 178.046)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">New York Giants</text></g><g id="option1"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="140.1" r="7.7"/><text transform="translate(115.579 143.21)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">Washington Redskins</text></g><path fill="#4AB0A1" d="M269.6 100.5h-216V50.6c0-3.5 2.9-6.4 6.4-6.4h203.2c3.5 0 6.4 2.9 6.4 6.4v49.9z"/><path fill="none" d="M88.1 59.2H248v32.4H88.1z"/><text transform="translate(88.12 69.815)"><tspan x="0" y="0" fill="#FFF" fontFamily="'MyriadPro-Regular'" fontSize="15">What is you favrotite NFL </tspan><tspan x="0" y="18" fill="#FFF" fontFamily="'MyriadPro-Regular'" fontSize="15">Sports Team?</tspan></text></g><g id="poll2"><path fill="#FFF" stroke="#EFEFEF" strokeMiterlimit="10" d="M263.8 305.2H59.4c-2.8 0-5.1-2.4-5.1-5.3V50.1c0-2.9 2.3-5.3 5.1-5.3h204.4c2.8 0 5.1 2.4 5.1 5.3v249.8c0 2.9-2.3 5.3-5.1 5.3z"/><g id="option4"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="244.7" r="7.7"/><text transform="translate(115.579 247.72)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">Dallas Cowboys</text></g><g id="option3"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="209.8" r="7.7"/><text transform="translate(115.579 212.883)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">New England Patriots</text></g><g id="option2"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="175" r="7.7"/><text transform="translate(115.579 178.046)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">New York Giants</text></g><g id="option1"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="140.1" r="7.7"/><text transform="translate(115.579 143.21)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">Washington Redskins</text></g><path fill="#66BDD4" d="M269.6 100.5h-216V50.6c0-3.5 2.9-6.4 6.4-6.4h203.2c3.5 0 6.4 2.9 6.4 6.4v49.9z"/><path fill="none" d="M88.1 59.2H248v32.4H88.1z"/><text transform="translate(88.12 69.815)"><tspan x="0" y="0" fill="#FFF" fontFamily="'MyriadPro-Regular'" fontSize="15">What is you favrotite NFL </tspan><tspan x="0" y="18" fill="#FFF" fontFamily="'MyriadPro-Regular'" fontSize="15">Sports Team?</tspan></text></g><g id="poll1"><path fill="#FFF" stroke="#EFEFEF" strokeMiterlimit="10" d="M263.8 305.2H59.4c-2.8 0-5.1-2.4-5.1-5.3V50.1c0-2.9 2.3-5.3 5.1-5.3h204.4c2.8 0 5.1 2.4 5.1 5.3v249.8c0 2.9-2.3 5.3-5.1 5.3z"/><g id="option4"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="244.7" r="7.7"/><text transform="translate(115.579 247.72)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">Dallas Cowboys</text></g><g id="option3"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="209.8" r="7.7"/><text transform="translate(115.579 212.883)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">New England Patriots</text></g><g id="option2"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="175" r="7.7"/><text transform="translate(115.579 178.046)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">New York Giants</text></g><g id="option1"><circle fill="#FFF" stroke="#E0E0E0" strokeMiterlimit="10" cx="97.3" cy="140.1" r="7.7"/><text transform="translate(115.579 143.21)" fill="#686868" fontFamily="'MyriadPro-Regular'" fontSize="12">Washington Redskins</text></g><path fill="#4C69B1" d="M269.6 100.5h-216V50.6c0-3.5 2.9-6.4 6.4-6.4h203.2c3.5 0 6.4 2.9 6.4 6.4v49.9z"/><path fill="none" d="M88.1 59.2H248v32.4H88.1z"/><text transform="translate(88.12 69.815)"><tspan x="0" y="0" fill="#FFF" fontFamily="'MyriadPro-Regular'" fontSize="15">What is you favrotite NFL </tspan><tspan x="0" y="18" fill="#FFF" fontFamily="'MyriadPro-Regular'" fontSize="15">Sports Team?</tspan></text></g><path id="check" className="check" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="#60C199" strokeWidth="3" strokeMiterlimit="10" d="M107.4 201.8L97.2 212l-5.2-5.2"/></svg>
            
            </div>
        );
    }
}

export default GSAP()(PollsSvg);

