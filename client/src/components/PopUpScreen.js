import React from 'react';
import {connect} from 'react-redux';
import {getMessageById, popUpIndex, popUpItem} from '../actions';
import {updateMessage} from '../actions'
import {updatePopUpTextBox} from '../actions'
import {closePopUpIndex} from '../actions'
import {setSingleItemPopUp} from '../actions'
import {getSingleItemError} from '../actions'
import {toggleRefresh} from '../actions'
import Dialog from "@material-ui/core/Dialog";
import {withStyles} from "@material-ui/core";
import CloseButton from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import StarRatings from 'react-star-ratings';
import './style.css'
import {compose} from "redux";

const url = "/message/"
const styles = () => {
    return ({
            dialogPaper: {
                minHeight: '80vh',
                maxHeight: '80vh',
                minWidth: '80vh',
                maxWidth: '80vh'
            },
        }
    );
};


class PopUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // socket endpoints
            endpoint: "localhost:4001",
            currentWindowId: this.props.id,
            currentRating: 1,
            currentComment: "",
            inputWarning: false
        };
    }

    closeButton = () => {
        this.props.closePopUpIndex(this.props.arrayIndex)
        this.props.setSingleItemPopUp(false)
    };

    changeRating = (newRating, name) => {
        this.setState({currentRating: newRating})
    }

    changeComment = (e) => {
        let val = e.target.value;
        this.setState({currentComment: val})

    }

    submitRating = () => {
        if (this.state.currentComment.length <= 0) {
            this.setState({inputWarning: true})
            return;
        }
        this.setState({inputWarning: false})
        let updatedURL = url + this.props.id
        let object = {rating: this.state.currentRating, comment: this.state.currentComment, title: 'default'}
        object.title = this.props.getSingleItem['name']
        this.props.updateMessage(updatedURL, object);
        this.props.getMessageById(url + this.props.id)

    }

    getAverageRating = () => {
        if (this.props.isPopUp) {
            if (this.props.getSingleItem['comments'].length === 1) {
                return 0;
            }
            return (this.props.getSingleItem['comments'].reduce((sum, {rating}) => sum + rating, 0) + 1)
                / (this.props.getSingleItem['comments'].length - 1)
        }
        return 0
    }

    render() {
        /*
        Logic:
        1. by default, singleItemError is false
                      isPopUp is false
        2. after async, Only one of singleItemError OR isPopUp is set to true
        3. before async is finished, none of error or regular message will pop up
         */
        const {classes} = this.props;

        if (this.props.singleItemError) {
            // reset this state for future
            return (<div>
                    <Dialog
                        onClose={this.closeButton}
                        open={true}
                        classes={{paper: classes.dialogPaper}}>
                        <CloseButton className={"closeMe"} onClick={() => this.closeButton()}/>
                        <h1>
                            Problem with database connection!
                        </h1>
                    </Dialog>
                </div>
            )
        } else if (this.props.isPopUp) {
            return (<div>
                <Dialog
                    onClose={this.closeButton}
                    open={true}
                    classes={{paper: classes.dialogPaper}}
                >
                    <CloseButton className={"closeMe"} onClick={() => this.closeButton('normal')}>X</CloseButton>
                    <div className={"alignLeft"}>
                        <h1 className={"popupText"}>{this.props.getSingleItem['name']}</h1>
                        <img src={this.props.getSingleItem['mediumPosterImageUrl']} alt={'movieImage'}/>
                        <div> Average Rating: <StarRatings
                            rating={this.getAverageRating()}
                            starDimension="20px"
                            starSpacing="5px"
                            starRatedColor="purple"/>
                        </div>
                        <div>Release date : {this.props.getSingleItem['releaseDate'].toString().split("T")[0]}</div>
                        <div>Duration: {this.props.getSingleItem['duration']}</div>
                        {this.props.getSingleItem['isNowPlaying'] ?
                            <div>
                                Now Playing
                            </div>
                            : <div>
                                Coming Soon
                            </div>
                        }
                        <div>Formats: {this.props.getSingleItem['formats'].toString()}</div>
                        {this.props.getSingleItem['isAvailableInStore'] ? <div>Available in store</div> : null}
                        <br/>
                        <br/>
                        <div>
                            <div>Rate this movie</div>
                            <StarRatings
                                rating={this.state.currentRating}
                                starRatedColor="purple"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating'
                            />
                            <div>
                                {this.state.inputWarning ? <div>
                                    Please type a comment before submitting!
                                </div> : null}
                                <input type={"textarea"} id={"inputBox"} name="textName" onChange={this.changeComment}
                                       maxLength={"150"}/>
                                <div><Button variant="contained" onClick={this.submitRating}> Rate</Button></div>
                            </div>
                            <br/>
                            <br/>
                            <div> Reviews:</div>
                            <div className={'commentArea'}>
                                {this.props.getSingleItem['comments'].slice(0).reverse().map((item, key) => (
                                    <div>
                                        <div key={key}>
                                            {item.rating !== -1 ?
                                                <div>
                                                    <StarRatings
                                                        rating={item.rating}
                                                        starDimension="20px"
                                                        starSpacing="5px"
                                                        starRatedColor="purple"
                                                    />
                                                    {item.comment}
                                                </div> :
                                                <div>Begin by rating a movie</div>
                                            }
                                        </div>
                                    </div>))
                                }
                            </div>
                            <br/>
                            <br/>
                        </div>
                        <div className={"center"}>
                        </div>
                    </div>
                </Dialog>
            </div>)
        } else {
            return (<div>
                <Dialog
                    onClose={this.closeButton}
                    open={true}
                    classes={{paper: classes.dialogPaper}}
                >
                    <div className={"alignLeft"}>
                        ... Loading ...
                    </div>
                </Dialog>
            </div>)
        }
    }
}

const mapStateToProps = (state) => { //name is by convention
    //state has entire state of app!!
    return {
        textPopUp: state.textPopUp,
        getSingleItem: state.getSingleItem,
        singleItemError: state.getSingleItemError,
        popUpValue: state.popUpValue,
        isPopUp: state.isPopUp,
        listReducer: state.listReducer
    }; //now it will appear as props
};


const mapDispatchToProps = (dispatch) => {
    return {
        getMessageById: (url) => dispatch(getMessageById(url)),
        popUpIndex: (str) => dispatch(popUpIndex(str)),
        popUpItem: (str) => dispatch(popUpItem(str)),
        updateMessage: (str, body) => dispatch(updateMessage(str, body)),
        updatePopUpTextBox: (str) => dispatch(updatePopUpTextBox(str)),
        closePopUpIndex: (str) => dispatch(closePopUpIndex(str)),
        setSingleItemPopUp: (bool) => dispatch(setSingleItemPopUp(bool)),
        toggleRefresh: () => dispatch(toggleRefresh()),
        getSingleItemError: (bool) => dispatch(getSingleItemError(bool))

    };
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(PopUpScreen);