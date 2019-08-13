import React from 'react';
import './style.css'
import MainContainer from "./MainContainer";
import Chat from "./Chat";
import Button from "@material-ui/core/Button";
import LatestComments from "./LatestComments";


class mainStructures extends React.Component {

    constructor(props) {
        super(props);
        this.state = {currentPage: 'MainContainer'};
    }

    changePage = (page) => {
        this.setState({currentPage: page})
    }

    render() {
        return (
            <div>
                <div className={"center"}>
                    <span>
                         <Button color="primary" variant="outlined" onClick={() => this.changePage('MainContainer')}>
                              Movies
                        </Button>
                         <Button color="primary" variant="outlined" onClick={() => this.changePage('Chat')}>
                              Live Chat
                        </Button>
                    </span>
                </div>
                <LatestComments/>
                {this.state.currentPage === "MainContainer" ? <MainContainer/> : null}
                {this.state.currentPage === "Chat" ? <Chat/> : null}
            </div>
        )
    }
}

export default mainStructures

