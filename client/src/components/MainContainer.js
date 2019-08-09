import React from 'react';
import { connect } from 'react-redux';
import IndividualItem from "./IndividualItem";
import {
    addMessageToServer,
    addTopMovies,
    getLastNComments,
    getMessages,
    loadingItemsError,
    toggleRefresh
} from '../actions';
import './style.css'
import Pagination from "material-ui-flat-pagination";
let proxy = 'https://damp-hollows-78813.herokuapp.com/'
let url = 'https://www.cineplex.com/api/v1/movies?language=en-us&marketLanguageCodeFilter=true&movieType=1&showTimeType=0&showtimeStatus=0&skip=0&take=160';


//const theme = createMuiTheme();
const controller = new AbortController();
const signal = controller.signal;

class MainContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { offset: 0 , itemPerPage:5, refresh:false, stateArrayLength:0, idToSearch:{}};
    }

    handleClick(offset) {
        this.setState({ offset });
    }

     componentDidMount() {
        // to bypass CORS policy
        // https://www.npmjs.com/package/cors-anywhere
        /*let proxy = 'https://damp-hollows-78813.herokuapp.com/'*/
        //let url = 'https://www.cineplex.com/api/v1/movies?language=en-us&marketLanguageCodeFilter=true&movieType=1&showTimeType=0&showtimeStatus=0&skip=0&take=160';
        /*const timeoutId = setTimeout(() => controller.abort(), 10000);*/
        fetch(proxy+url)
              .then(response => response.json())
              .then((jsonData) => {
                    let url = '/addMessage'
                    let arr1 = []
                    for (let i=0; i<jsonData['data'].length; i++) {
                        let object= jsonData['data'][i]
                        object.comments = [{rating:-1, comment:'yay new movie'}]
                        arr1.push(object)
                    }

                    this.props.addMessageToServer(url, arr1)
                    this.props.addTopMovies(arr1);

                    let idToSearch = []
                    for (let i=0; i<this.props.topMovies.length; i++) {
                        let idVal = this.props.topMovies[i]["_id"]
                        idToSearch.push(idVal)
                    }
                    let newObj = {idToSearch}
                    this.setState({idToSearch:newObj})
                    this.props.getMessages('/root', newObj);
                    console.log('successfully call cineplex')
            }).then(()=> {
                console.log('well that was loaded...')
                this.setState({stateArrayLength:1})
                console.log("the length of array is:" + this.props.listReducer.length)
        }).then ( () => {
                this.props.getLastNComments("/loadLatestComments/3")
                console.log('load latest comments')
                //console.log(this.props.latestCommentReducer)
            }).then(() => {
            console.log('load latest comments')
            //console.log(this.props.latestCommentReducer.length)
        }).catch((error) => {
                // handle your errors here
                console.log("Issue with fetching cineplex contents with error: " + error)
            })
    }

    componentDidUpdate(prevProps) {
        if (this.props.toggleRefresh !== prevProps.toggleRefresh) {
            this.props.getMessages('/root', this.state.idToSearch);
        }
    }

    tryAgain = () => {
        this.props.loadingItemsError(false)
        this.props.getMessages('/root');
    }

    render() {
        let itemList = [];
        for (let i=0; i<this.props.listReducer.length; i++) {
            let item = this.props.listReducer[i];
            let individualItem = <IndividualItem class="relativePosition" key={uuidGenerator()}
                                                 eachItem={item} arrayIndex={i} id={item["_id"]}/>;
            itemList.push(individualItem)
        }

        if (this.props.addMessageError) {
            return (<div className={'center'}> Failed to add an item</div>)
        }

        if (this.props.loadingListError) {
            return (
                <div className={'center'}> <p>Failed To Load movies</p>
                    <button onClick={this.tryAgain}>Try again</button>
                </div>
            )
        }
        if (this.props.isLoading) {
           // css loader: based on: https://www.w3schools.com/howto/howto_css_loader.asp
            return (
                <div className="center spinner"> </div>
            );
        } else if (this.props.listReducer.length===0) {
            return (<div className={"center"}>
                <div>
                    <br/>
                    <p className={"beginAdd"}>
                        Loading data...
                    </p>
                </div>

            </div>)
        } else return (
            <div>
                <div>{itemList.slice(this.state.offset, this.state.offset+this.state.itemPerPage)}</div>
                {this.props.isPopUp?null:
                    <div className={"center"}>
                    <Pagination
                        limit={this.state.itemPerPage}
                        offset={this.state.offset}
                        total={itemList.length}
                        onClick={(e, offset) => this.handleClick(offset)}
                        size={"large"}
                    />
                </div>}
            </div>

        )
    }
}

// UUID generator:
//credit: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidGenerator() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
        return v.toString(16);
    });
}

const mapStateToProps = (state) => { //name is by convention
    return {
        toggleRefresh: state.toggleRefresh,
        listReducer: state.listReducer,
        isLoading: state.itemsIsLoading,
        loadingListError: state.loadingListError,
        addItemError: state.addItemError,
        addMessageError:state.addMessageError,
        isPopUp: state.isPopUp,
        topMovies: state.topMovies,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMessages: (url, body) => dispatch(getMessages(url, body)),
        loadingItemsError: (bool)=>dispatch(loadingItemsError(bool)),
        addMessageToServer: (url, obj) => dispatch(addMessageToServer(url, obj)),
        addTopMovies: (items) => dispatch(addTopMovies(items)),
        refreshAction: () => dispatch(toggleRefresh()),
        getLastNComments: (url) => dispatch(getLastNComments(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (MainContainer);