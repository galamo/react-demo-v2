import React, { Component } from "react"

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { Mui } from "../components/utils/materialsUi";


import Button from '@material-ui/core/Button';
import Capital from "./capital";


export default class Countries extends Component {

    constructor(props) {
        super(props)

        this.state = { capitals: [], searchCapital: "", searchCountry: "", errorMessage: "" }
        this.handleInput = this.handleInput.bind(this)
        this.handleSearchAction = this.handleSearchAction.bind(this);
    }



    handleInput(e) {
        let key = e.currentTarget.name;
        if (!e.currentTarget.value) {
            this.setState({
                [key]: e.currentTarget.value,
                errorMessage: "Missing parameters"

            })
        } else {
            this.setState({
                [key]: e.currentTarget.value,
                errorMessage: ""

            })
        }

    }
    handleSearchAction() {
        // const { searchCapital, searchCountry } = this.state;

        if (this.state.searchCapital && this.state.searchCountry) {
            fetch(`https://restcountries.eu/rest/v2/capital/${this.state.searchCapital}`).then((success) => {
                return success.json()
            }).then((data) => {
                this.setState({
                    capitals: data
                })
            })

        } else {
            this.setState({
                errorMessage: "missing parameters"
            })
        }
    }

    genCapitals(capital, index) {
        return <Capital style={{ display: "inline" }} data={capital} key={`capital_${index}`} />

    }


    render() {
        return (
            <div>
                <h1>
                    Countries

                </h1>

                <form noValidate autoComplete="off">
                    <TextField
                        id="standard-name"
                        label="searchCapital"
                        name="searchCapital"
                        value={this.state.searchCapital}
                        onChange={
                            this.handleInput
                        }
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="searchCountry"
                        name="searchCountry"
                        value={this.state.searchCountry}
                        onChange={
                            this.handleInput
                        }
                        margin="normal"
                    />
                    <br />
                    <span style={{ color: "red" }}> {this.state.errorMessage} </span>
                    <br />
                    <Button onClick={this.handleSearchAction}> Click to search </Button>
                </form>
                <div>
                    {
                        this.state.capitals.map(this.genCapitals)
                    }

                </div>

            </div>
        )
    }

}






