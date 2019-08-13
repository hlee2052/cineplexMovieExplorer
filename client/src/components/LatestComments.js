import React from 'react';
import {connect} from 'react-redux';
import {getLastNComments} from '../actions';
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Refresh from '@material-ui/icons/Refresh';


class LatestComments extends React.Component {
    // Refresh latest comment if user manually clicks refresh button
    refresh = () => {
        this.props.getLastNComments("/loadLatestComments/3")
    }

    render() {
        return (<div style={{textAlign: 'center'}}>
            <div>Latest Comments
                <Refresh onClick={this.refresh}>Refresh </Refresh>
            </div>
            <div style={{display: "inline-block", textAlign: "left"}}>
                {this.props.latestCommentReducer.map(item => (
                    <Paper>
                        <Card>
                            <div>
                                <div>{item['title']}</div>
                                <div>Rating: {item['rating']}  </div>
                                <div>Comment: {item['comment']}</div>
                            </div>
                        </Card>
                    </Paper>
                ))}
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