import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import { servers } from "./components/data";
import ServerList from './components/server-list';
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
        {this.state.lists.map((listItem, index) => {
          return <ServerList handleServer={this.handleServer} key={index} header={listItem} serversList={this.state.servers.filter((currentServer) => {
            return currentServer.status == listItem
          })} />
        })}
      </div>
    );
  }
}

export default App;
