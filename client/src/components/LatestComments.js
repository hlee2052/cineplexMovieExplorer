import React from 'react';
import { connect } from 'react-redux';
import {clearMessage, getLastNComments} from '../actions';
import { addMessage } from '../actions';
import { updateTextBox } from '../actions';
import { sortMessageByAlphabet } from '../actions';
import { sortMessageByDate } from '../actions';
import {sortOption1} from '../actions'
import {addMessageToServer} from '../actions'

import {addMessageError} from '../actions'
import {loadingItemsError} from '../actions'
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";


import Refresh from '@material-ui/icons/Refresh';


class LatestComments extends React.Component {

    componentDidMount() {
        /*    ip.v4()
                .then((ip) => {
                    console.log(ip)
                })
                .catch((error) => {
                    console.log(error)
                });*/
    }

    refresh = () => {
        console.log('clicked refresh')
        this.props.getLastNComments("/loadLatestComments/3")
    }




    render() {
        return (<div style={{textAlign:'center'}}>

            <div>Latest Comments
                <Refresh onClick={this.refresh}>Refresh </Refresh>
            </div>


            <div style={{display: "inline-block", textAlign:"left"} } >
                {this.props.latestCommentReducer.map(item => (
                    <Paper>
                    <Card>
                    <div>
                        <div>{item['title']}</div>
                        <div>Rating: {item['rating']}  </div>
                        <div>Comment: {item['comment']}</div>
                        {/*{JSON.stringify(item)}*/}


                    </div>
                    </Card>
                    </Paper>

                ))}
            </div>

        </div>)
    }
}

const mapStateToProps = (state) => { //name is by convention
    //state has entire state of app!!
    return {
        text: state.text,
        optionValue:state.optionValue,
        list:state.listReducer,
        latestCommentReducer: state.latestCommentReducer
    };
};

export default connect(mapStateToProps, {getLastNComments }) (LatestComments);