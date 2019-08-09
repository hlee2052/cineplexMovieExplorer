import React from 'react';
import { connect } from 'react-redux';
import { clearMessage } from '../actions';
import { addMessage } from '../actions';
import { updateTextBox } from '../actions';
import { sortMessageByAlphabet } from '../actions';
import { sortMessageByDate } from '../actions';
import {sortOption1} from '../actions'
import {addMessageToServer} from '../actions'

import {addMessageError} from '../actions'
import {loadingItemsError} from '../actions'


class InputText extends React.Component {
    sortArray = (res) => {
        if (res==="date") {
            this.props.sortMessageByDate()
        } else if (res==="alphabet") {
            this.props.sortMessageByAlphabet()
        }
    }

    clickAdd = ()  => {

        this.props.addMessageError(false)
        this.props.loadingItemsError(false)

        if (this.props.text==='') {
            alert("Please enter a message");
            return
        }

        //this.props.addMessage(this.props.text)

        let url = '/addMessage'
        let body = {name: this.props.text}
        console.log("WHY IS THIS EVEN CALLED WHEN ITS INPUT TXT?")
        //this.props.addMessageToServer(url, body)


    };

    clearAllMessage = () => {
        for (let object of this.props.list) {
            if (object['type']==='important') {
                let response =
                    window.confirm("The list contains at least one important message, " +
                        "do you still want to clear the list?");

                return (response)? this.props.clearMessage('/clearList'):null
            }
        }
        return this.props.clearMessage('/clearList')
    }



    changedText  = (event) =>  {
        this.props.updateTextBox(event.target.value)
    };

    changedSortOption = (event) => {
        this.props.sortOption1(event.target.value)
    }

    render() {
        let clearButtonDisabled = !this.props.list.length;
        let clearButtonID = clearButtonDisabled ? "clearButtonDisabled":"clearButton"
        let sortButtonID = clearButtonDisabled ? "clearButtonDisabled":"sortButtonID"
        return (<div className ="center">
            <form>
                <input type={"textarea"} id={"inputBox"}  name="textName" onChange={this.changedText}/>
                <br/>
                <button type="button" className="button"
                        id="addButton" onClick={this.clickAdd}>
                    Add Message</button>
                <button type="button" className="button" id={clearButtonID} disabled={clearButtonDisabled}  onClick= {this.clearAllMessage}
                       >Clear Message</button>
                { (this.props.list.length!==0)?   <div>
                    <br/>
                    <br/>
                    <div>Sort By Ascending Order</div>
                    <select className={"selectSort"} onChange={this.changedSortOption}>
                        <option value="date">Date</option>
                        <option value="alphabet">Alphabet</option>
                    </select>

                    <button type="button" className="button " id={sortButtonID} disabled={clearButtonDisabled}
                            onClick={() => this.sortArray(this.props.optionValue)}
                    >Sort
                    </button>
                </div> : null
                }
            </form>
        </div>)
    }
}

const mapStateToProps = (state) => { //name is by convention
    //state has entire state of app!!
    return {
              text: state.text,
              optionValue:state.optionValue,
              list:state.listReducer
    };
};

export default connect(mapStateToProps, {clearMessage, addMessage,
    updateTextBox,sortMessageByAlphabet,sortMessageByDate,
    sortOption1 ,addMessageToServer, addMessageError, loadingItemsError }) (InputText);