import React, { Component } from "react";
import Machine from "./machine";


export default class ServerList extends Component {
    constructor(props) {
        super(props);


    }


    render() {
        return (
            <div>
                <h2> serverList: {this.props.header}</h2>
                <div>
                    {this.props.serversList.map((server, index) => {
                        return <Machine handleServer={this.props.handleServer} key={index} ip={server.ip} type={server.type} status={server.status} />
                    })}
                </div>
            </div>
        )
    }
}