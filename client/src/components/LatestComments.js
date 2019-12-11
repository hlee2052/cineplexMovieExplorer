import React from 'react';
import {connect} from 'react-redux';
import {getLastNComments} from '../actions';
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Refresh from '@material-ui/icons/Refresh';
import Typography from "@material-ui/core/Typography";
import purple from '@material-ui/core/colors/purple';
import {blue} from "@material-ui/core/colors";


class LatestComments extends React.Component {
    // Refresh latest comment if user manually clicks refresh button
    refresh = () => {
        this.props.getLastNComments("/loadLatestComments/3")
    }

    render() {
        return (<div style={{textAlign: 'center'}}>
            <div>
                <Typography variant="h4" component="h5" >Latest Comments</Typography>

                <Refresh onClick={this.refresh}>Refresh </Refresh>
            </div>
            <div style={{display: "inline-block", textAlign: "left", width:'75%'}}>
               <Paper>
                   <div style={{padding:15}}>
                {this.props.latestCommentReducer.map(item => (
                        <Card>
                            <div>
                                <div>
                                    <Typography variant="h4" component="h5" >{item['title']}</Typography>
                                </div>
                                <div><b>Rating: </b> {item['rating']} </div>
                                <div><b>Comment: </b> {item['comment']}</div>
                            </div>
                        </Card>
                ))}
                   </div>
            </Paper>

            </div>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        text: state.text,
        optionValue: state.optionValue,
        list: state.listReducer,
        latestCommentReducer: state.latestCommentReducer
    };
};

export default connect(mapStateToProps, {getLastNComments})(LatestComments);