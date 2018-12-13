import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



export default class Drugs extends Component {

    constructor(props) {
        super(props)

        this.state = {
            drugList: [{ name: "Weed", price: 20 }, { name: "LSD", price: 30 }, { name: "MD", price: 99 }],
            drugListObj: { "Weed": { name: "Weed", price: 20 }, "LSD": { name: "LSD", price: 30 }, "MD": { name: "MD", price: 99 } },
            selected: "",
            quantity: 0,
            price: 0,
            totalPrice: 0,
            selectedDrugObj: {},
            cart: [],
            errormsg: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.calcTotalSum = this.calcTotalSum.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.genDrugs = this.genDrugs.bind(this)





    }
    handleChange(e) {
        // let current = this.state.drugList.find((drug) => {
        //     return drug.name == e.target.value;
        // })
        let current = this.state.drugListObj[e.target.value];
        this.setState({
            selected: e.target.value,
            price: current.price,
            selectedDrugObj: current,
            errormsg: ""
        })
        this.calcTotalSum(current.price, this.state.quantity);
    }

    calcTotalSum(price, quantity) {
        let sum = 0;
        if (Number.isInteger(price) && this.state.selected && Number.isInteger(parseInt(quantity))) {
            sum = price * quantity;
            this.setState({
                totalPrice: sum
            })
        }
    }




    handleInputChange(e) {

        this.setState({
            [e.target.name]: e.target.value,
            errormsg: ""

        })
        if (e.target.name == "quantity") {
            this.calcTotalSum(this.state.price, e.target.value);
        }


    }
    handleClick() {
        let newItem = { name: this.state.selected, q: this.state.quantity, totalPrice: this.state.totalPrice }
        if (!this.state.selected || !this.state.quantity) {
            this.setState({
                errormsg: "no drug selected or quantity missing"
            })
        } else {
            this.setState({
                cart: [...this.state.cart, newItem]
            })
        }

    }

    genDrugs() {
        let arr = [];
        for (let d in this.state.drugListObj) {
            arr.push(<div><span>{this.state.drugListObj[d].name}</span><span>{this.state.drugListObj[d].price}</span></div>);
        }
        return arr;
    }


    render() {
        return (
            <div>
                <h1> Drags </h1>
                <form>
                    <FormControl variant="outlined" >
                        <InputLabel

                            htmlFor="outlined-age-simple"
                        >
                            Drug Name
          </InputLabel>
                        <Select style={{ width: "200px" }}
                            value={this.state.selected}
                            onChange={this.handleChange}
                            input={
                                <OutlinedInput
                                    labelWidth={90}
                                    name="price"
                                    id="outlined-age-simple"
                                />
                            }
                        >

                            {this.state.drugList.map((d) => {
                                return <MenuItem value={d.name}>{d.name}</MenuItem>
                            })}


                        </Select>

                        <TextField
                            id="standard-name"
                            label="Quantity"
                            name="quantity"
                            value={this.state.quantity}
                            onChange={this.handleInputChange}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            disabled
                            id="standard-name"
                            label="price"
                            name="price"
                            value={this.state.price}
                            onChange={this.handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            disabled
                            id="standard-name"
                            label="total sum"
                            name="price"
                            value={this.state.totalPrice}
                            onChange={this.handleInputChange}
                            margin="normal"
                        />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errormsg}</span>
                        <br />

                        <Button onClick={this.handleClick} variant="contained" className={"primary"}>
                            Add to cart
                        </Button>

                    </FormControl>
                </form>
                <div>
                    <List>
                        {this.state.cart.map((addedDrug) => {
                            return <ListItem>

                                {addedDrug.name}
                                <ListItemText primary={'quantity:'} secondary={addedDrug.q} />
                                <ListItemText primary={'total Price:'} secondary={addedDrug.totalPrice} />
                            </ListItem>
                        })}

                    </List>

                    {/* <div>
                        
                        {this.genDrugs()}
                    </div> */}
                </div>
            </div >
        )
    }
}