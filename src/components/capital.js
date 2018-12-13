import React, { Component } from "react"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// const MyButton = styled(Button)({
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
// });
const styles = {
    card: {
        minWidth: 275,
        maxWidth: 300,
        display: "inline-block"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Capital extends Component {

    constructor(props) {
        super(props)


        this.state = { moreInfo: null, borders: [] }
        this.getMoreInfo = this.getMoreInfo.bind(this);
    }

    getMoreInfo() {
        fetch(`https://restcountries.eu/rest/v2/alpha/${this.props.data.alpha3Code}`).then((success) => {
            return success.json()
        }).then((data) => {
            console.log(data);
            this.setState({
                moreInfo: data,
                borders: data.borders || []
            })
        })
    }


    render() {

        return (
            <Card className={this.props.classes.card}>
                <CardContent>
                    <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                        {this.props.data.name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {this.props.data.alpha3Code}
                    </Typography>
                    <Typography className={this.props.classes.pos} color="textSecondary">
                        {this.props.data.topLevelDomain}
                    </Typography>
                    <Typography component="p">
                        {this.props.data.capital}
                        <br />
                    </Typography>
                    <div style={{ overflow: "auto", maxHeight: "100px" }}>
                        <h2> Borders </h2>
                        <ul>
                            {this.state.borders.map((border) => {
                                return <li> {border} </li>
                            })}
                        </ul>
                    </div>
                </CardContent>
                <CardActions>

                    <Button onClick={this.getMoreInfo} size="small">Get Borders</Button>
                </CardActions>
            </Card >
        )
    }

}

Capital.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Capital);






