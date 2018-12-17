import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { Mui } from "../utils/materialsUi";

import Button from "@material-ui/core/Button";
import { CardContent } from "@material-ui/core/CardContent";

export default class Cars extends Component {
  constructor(props) {
    super(props);

    this.state = { cars: [] };
  }

  componentDidMount() {
    fetch("http://localhost:3500/cars")
      .then(result => {
        return result.json();
      })
      .then(result => {
        this.setState({
          cars: [...result]
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Cars</h1>
        {this.state.cars.length > 0 &&
          this.state.cars.map(CardContent => {
            return (
              <Mui.Card>
                <Mui.CardContent>
                  <Mui.Typography>{CardContent.model}</Mui.Typography>

                  <Mui.Typography>{CardContent.manufacturer}</Mui.Typography>
                  <Mui.Typography component="p">
                    {CardContent.price}
                    <br />
                    <iframe height="200" width="200" src={CardContent.wiki} />
                  </Mui.Typography>
                </Mui.CardContent>
              </Mui.Card>
            );
          })}
      </div>
    );
  }
}
