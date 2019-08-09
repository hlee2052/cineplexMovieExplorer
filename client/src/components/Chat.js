import React from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";
import './style.css'
import Button from "@material-ui/core/Button";


import { GoogleLogin } from 'react-google-login';

const uuidv1 = require('uuid/v1');

class Chat extends React.Component {

    // Credit: https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
    /*    ip.v4()
            .then((ip) => {
                console.log(ip)
            })
            .catch((error) => {
                console.log(error)
            });*/


       // const socket = socketIOClient(this.state.endpoint)
        //let string = 'nameless-coast-13432.herokuapp.com/:4001'
            const socket = io()

        socket.on('liveChatMessage', (msg) => {
            let messageFromServer = JSON.parse(msg)
            let objectKeys = Object.keys(messageFromServer)
            let uuid = objectKeys[0]

            messageFromServer["myMessage"] = uuid === this.state.inputUUID;

            this.setState({liveChatMessage:msg})
            this.setState({
                chatArray: [...this.state.chatArray, messageFromServer]
            })
        })
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    constructor(props) {
        super(props);

        this.state = {
            // socket.io is running in this port
            endpoint: "http://nameless-coast-13432.herokuapp.com/5000",
            ///
            liveChatMessage: 'white',
            currentWindowId: this.props.id,
            /*chatArray: [{id:this.props.id, array: ['initial', 'chat', this.props.id]}]*/
            chatArray: [{uuid1:'This is a live chat, open 2 browsers and try it', name:"Live Chat"}],
            currentInput: "",
            inputUUID: "default",
            userName: "anonymous(pls enter your name)"
        };
    }


  handleSubmitMessage = (e) => {

      let messageUUID = uuidv1()

      this.setState({inputUUID:messageUUID})
      console.log('enter press here! ')

      const socket = io();
      let object = {[messageUUID]: this.state.currentInput, name: this.state.userName}
      socket.emit('liveChatMessage', JSON.stringify(object))


      this.setState({
          currentInput: '',
      });
  }

    handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.handleSubmitMessage()
        }
    }


    updateInput = (e) => {
        let val = e.target.value
        this.setState({currentInput:val})
        //console.log(this.state.currentInput)
    }

    updateUserName = (e) => {
        let val = e.target.value
        this.setState({userName: val})
    }


    jsonStringToString = (jsonString) => {

        let object = JSON.parse(jsonString)
        let keys = Object.keys(object)
        let name = object[keys[1]]
        let message = object[keys[0]]
        let isMyMessage = object[keys[2]]
        let fullMessage = name+": " + message
        if (isMyMessage) {
            return <div className={'myMessage' }><span className={'myMessageStyle'}>{message}</span></div>
        }
        return <div className={'regularMessage'}><span className={'regularMessageStyle'}> {fullMessage}</span> </div>
    }


    responseGoogle = (response) => {
        console.log(response);
    }

    render() {

        return (

                <div className={'chatBoxTopContainer'} >

                    <GoogleLogin
                        clientId="1056358074723-ge6pncu7ifjsj1i2f27tfb0ugseiothc.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />,

                    <div className={"center"}>Online Live Chat </div>
                    {/*<div>{this.state.liveChatMessage}</div>
                    <div>{this.props.id}</div>*/}
                        <div className={'chatBox'}>
                            {this.state.chatArray.map( (item, key)=> (
                                    <div key ={key}>   {this.jsonStringToString(JSON.stringify(item)) }</div>
                                )
                            )}
                          { <div style={{ float:"left", clear: "both"}}
                                 ref={(el) => {this.messagesEnd = el}}>
                            </div>}
                        </div>

                        <div className={'chatBoxInput'}>
                            <div>
                            <span>
                            User Name &nbsp;&nbsp;
                                <input
                                    type ="text"
                                    placeholder="Name"
                                    className="form-textarea typing-area"
                                    onChange={this.updateUserName}
                                    style={{width:"15%", height:"30px"}}
                                />
                            </span>

                            </div>
                            <input
                                type ="text"
                                value={this.state.currentInput}
                                placeholder="Text"
                                rows="1"
                                className="form-textarea typing-area"
                                onChange={this.updateInput}
                                onKeyPress={this.handleKeyPress}
                                style={{width:"80%", height:"30px"}}
                            />
                            <Button variant="contained" color='primary' className={''} onClick={this.handleSubmitMessage}>
                                Enter
                            </Button>
                        </div>
                    </div>
               )

    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, {}) (Chat);