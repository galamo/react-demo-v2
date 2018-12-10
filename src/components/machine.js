import React, { Component } from "react";


export default class Machine extends Component {
    constructor(props) {
        super(props)
    }




    render() {
        return (
            <div style={{ border: "solid black 2px", marginTop: "25px" }} onClick={(e) => {
                this.props.handleServer(this.props, "online")
            }} >
                <span> ip </span><span>{this.props.ip}</span>
                <br />
                <span> type </span><span>{this.props.type}</span>
                <br />
                <span> status </span><span>{this.props.status}</span>
            </div>
        )
    }
}