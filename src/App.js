import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import { servers } from "./components/data";
import ServerList from './components/server-list';
import Countries from './components/countries';


import { Switch, Route } from 'react-router-dom'
import Drugs from './components/forms/Drugs';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { servers, lists: ["online", "offline"] };


    this.handleServer = this.handleServer.bind(this);
  }

  componentDidMount() {
    console.log(this.state.servers);
  }

  handleServer(c, newStatus) {
    let newServers = [...this.state.servers];
    let result = this.search(c, newServers);
    newServers.splice(result, 1);

    let current = { ...c }
    current.status = newStatus;
    this.setState({
      servers: [...newServers, current]
    })
  }

  search(c, newServers) {

    for (let index = 0; index < newServers.length; index++) {
      if (newServers[index].ip == c.ip) {
        return index;
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Drugs/>
      </div>
    );
  }
}

export default App;
