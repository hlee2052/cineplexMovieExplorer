import React from 'react';
import {connect} from 'react-redux';
import {getMessageById, popUpItem, popUpIndex} from '../actions';
import './style.css'
import PopUpScreen from "./PopUpScreen";
import StarRatings from 'react-star-ratings';
import Card from "@material-ui/core/Card";
import {compose} from "redux";
import {blue, grey, red} from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => {
    return ({
            root: {
                position: 'absolute',
                left: '5%',
                right: '5%',
                marginTop: 30,
                marginBottom: 30
            },
            paper: {
                padding: theme.spacing(1),
                textAlign: 'center',
                backgroundColor: grey[200]
            },

            filterPaper: {
                padding: theme.spacing(1),
                textAlign: 'center',
            },

            titleFont: {
                color: blue[400],
                fontSize: '32px',
                fontWeight: 'fontWeightMedium'

            },

            padding: {
                paddingTop: 50,
                paddingBottom: 25
            },

            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },

            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: 60,
                fontSize: 10
            },

            selectEmpty: {
                marginTop: theme.spacing(2),
            },

            rootSearchBar: {
                padding: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '60%',
            },
            iconButton: {
                padding: 10,
            },
            divider: {
                width: 1,
                height: 28,
                margin: 4,
            },
            input: {
                marginLeft: 8,
                flex: 1,
                width: '70%',
            },

            cardColor: {
                margin: 10,
                '&:hover': {
                    backgroundColor: red[50]
                }
            }
        }
    );
};


class IndividualItem extends React.Component {

    popUpSingle = () => {
        let url = '/message/' + this.props.id
        this.props.getMessageById(url)
        this.props.popUpIndex(this.props.arrayIndex)
    };

    getAverageRating = () => {
        if (this.props.eachItem['comments'].length === 1) {
            return 0;
        }
        return (this.props.eachItem['comments'].reduce((sum, {rating}) => sum + rating, 0) + 1)
            / (this.props.eachItem['comments'].length - 1)
    }

    render() {
        const {classes} = this.props;
        return (
            <div id={"ItemBox"} className={'boxColor'}>
                <Card className={classes.cardColor}>
                    <div className={"center row1"}>
                        <div className={"column1"}>
                            <p>
                                <img src={this.props.eachItem['smallPosterImageUrl']} alt={''}/>
                            </p>
                        </div>
                        <div className={"column2"}>
                            <div className="center itemBoxText" onClick={() => this.popUpSingle()}>
                                <div>
                                <span>
                                    <div style={{fontSize: 50}}>{this.props.eachItem['name']}</div>
                                    {this.props.eachItem['mpaaRating'] !== null ?
                                        <img src={this.props.eachItem['mpaaRating']['imageUrl']} alt={""}/> : null}
                                </span>
                                </div>
                                {!this.props.isPopUp ? <div className={"center individualStarStyle"}>
                                    Rating:
                                    <StarRatings
                                        rating={this.getAverageRating()}
                                        starDimension="30px"
                                        starSpacing="8px"
                                        starRatedColor="purple"
                                    />
                                </div> : null}
                                <div>
                                    comments: {this.props.eachItem['comments'].length - 1}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                {
                    (this.props.popUpValue === this.props.arrayIndex) ?
                        <PopUpScreen key={this.props.id}
                                     arrayIndex={this.props.arrayIndex} id={this.props.id}
                        />
                        : null
                }
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        popUpValue: state.popUpValue,
        listReducer: state.listReducer,
        isPopUp: state.isPopUp,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMessageById: (url) => dispatch(getMessageById(url)),
        popUpItem: (str) => dispatch(popUpItem(str)),
        popUpIndex: (str) => dispatch(popUpIndex(str)),

    };
};
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(IndividualItem)