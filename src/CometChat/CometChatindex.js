import React from 'react';
import Chat from './Chat';

export default class Home extends React.Component  {
  
  constructor(props) {
    super(props);
    this.state = {
      libraryImported: false
    };
  } 

  componentDidMount(){
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    CometChat = require("@cometchat/chat-sdk-javascript").CometChat;
    this.setState({libraryImported: true});
  }

  return()
}