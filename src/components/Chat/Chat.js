import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import './Chat.css';
import axios from 'axios';
import moment from 'moment';
// import jwt_decode from 'jwt-decode';
import {ApiUrl} from '../../config';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chat: [],
            chatButtonDisable: true
        };

        // this.endpoint = ApiUrl;
        this.chatSubmit = this
            .chatSubmit
            .bind(this);
        // this.token = sessionStorage.getItem('main.token');
        // this.decoded = jwt_decode(this.token);
    }

    chatSubmit() {
        const socket = socketIOClient(this.endpoint);
        socket.emit("clientMsg", {
            text: this.chatInputText.value,
            name: this.decoded.name,
            date: moment().format('llll')
        });
        this.chatInputText.value = "";
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.chatSubmit();
        }
    }

    componentWillMount() {
        const socket = socketIOClient(this.endpoint);
        socket.on("FromAPI", (res) => {
            console.log(res);
        });

        socket.emit('join', {
            room: 'roomA'
        }, (callback) => {
            console.log('callback', callback);
        });

        socket.on('ack', (data) => {
            console.log('ack', data);
            let ack = {
                ...data
            };
            this
                .state
                .chat
                .push(ack);
            this.setState({
                chat: this.state.chat
            }, () => {
                console.log('this.state.chat', this.state.chat);
            });
        });

        axios({
            method: 'post',
            url: ApiUrl + '/api/chat',
            data: null,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('main.token')}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then((res) => {
            console.log(res);
            if (res.data.auth) {
                this
                    .state
                    .chat
                    .push(...res.data.data);
                this.setState({chat: this.state.chat});
            } else {
                this
                    .props
                    .history
                    .replace('/');
            }
        }).catch((err) => {
            console.log(err);
        });

    }

    render() {
        return (
            <div className='chatbody'>
                <div className='chatUl row'>
                    {this.state.chat.length > 0
                        ? this
                            .state
                            .chat
                            .map(d => d.name === this.decoded.name
                                ? (
                                    <div
                                        key={Math.random()}
                                        className='col m5 s10 card-panel first'
                                        style={{
                                        float: 'right',
                                        marginRight: '5px',
                                        clear: 'both',
                                        'overflowWrap': 'break-word'
                                    }}>
                                        <div
                                            className="blue-text text-darken-2"
                                            style={{
                                            float: 'left'
                                        }}>
                                            <b>{'Me'}</b>
                                        </div>
                                        <div
                                            className="blue-text text-darken-2"
                                            style={{
                                            float: 'right'
                                        }}>{d.date}</div>
                                        <div
                                            className="blue-text text-darken-2"
                                            style={{
                                            clear: 'both'
                                        }}>{d.message}</div>
                                    </div>
                                )
                                : (
                                    <div
                                        key={Math.random()}
                                        className='col m5 s10 card-panel first'
                                        style={{
                                        float: 'left',
                                        marginLeft: '5px',
                                        backgroundColor: 'black',
                                        clear: 'both',
                                        'overflowWrap': 'break-word'
                                    }}>
                                        <div
                                            className="blue-text text-darken-2"
                                            style={{
                                            float: 'left'
                                        }}>
                                            <b>{d.name}</b>
                                        </div>
                                        <div
                                            className="blue-text text-darken-2"
                                            style={{
                                            float: 'right'
                                        }}>{d.date}</div>
                                        <div
                                            className="blue-text text-darken-2"
                                            style={{
                                            clear: 'both'
                                        }}>{d.message}</div>
                                    </div>
                                ))
                        : null}
                </div>
                <div className='chatFooter'>
                    <div className='row'>
                        <div className='col m9 s8'>
                            <input
                                type='text'
                                id='chatInput'
                                ref={el => this.chatInputText = el}
                                onKeyPress={this._handleKeyPress}/>
                        </div>
                        <div
                            className='col m1 s1'
                            style={{
                            'marginTop': '24px'
                        }}>
                            <button onClick={this.chatSubmit} className='btn'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;