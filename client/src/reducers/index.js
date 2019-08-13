import {combineReducers} from 'redux';
import Util from '../components/Util.js'

const sortOption = (str = 'date', action) => {
    if (action.type === 'SORT_OPTION') {
        return action.payload
    }
    return str
}

const textBoxReducer = (str = '', action) => {
    if (action.type === Util.UPDATE_TEXT_BOX) {
        return action.payloadString
    }
    return str
};

const textBoxPopUpReducer = (str = '', action) => {
    if (action.type === "UPDATE_POP_UP_TEXT_BOX") {
        return action.payloadString
    }
    return str
};

const popUpIndexReducer = (str = '', action) => {
    if (action.type === "POP_UP_INDEX") {
        return action.payload
    }

    if (action.type === "CLOSE_POP_UP_INDEX") {
        return ''
    }
    return str
};

export function loadingListError(state = false, action) {
    switch (action.type) {
        case 'LOADING_LIST_ERROR':
            return action.hasErrored;
        default:
            return state;
    }
}

export function loadingList(state = false, action) {
    switch (action.type) {
        case 'LOADING_LIST':
            return action.isLoading;
        default:
            return state;
    }
}

const latestCommentReducer = (arr = [], action) => {
    if (action.type === 'LOAD_COMMENTS_SUCCESS') {
        return action.payload
    }

    return arr
}

const listReducer = (arr = [], action) => {

    if (action.type === 'LOAD_LIST_SUCCESS') {
        return action.payload;
    }

    if (action.type === 'CLEAR_LIST') {
        return arr = [];
    }

    if (action.type === "SORT_BY_ALPHABET") {
        let newArray = arr.slice();
        newArray.sort((a, b) => {
            return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
        })
        return newArray
    }

    if (action.type === "SORT_BY_DATE") {
        let newArray = arr.slice();
        newArray.sort((a, b) => {
            return (a.date > b.date) ? 1 : (a.date < b.date) ? -1 : 0
        })
        return newArray
    }

    return arr
}

const getSingleItem = (state = '', action) => {
    switch (action.type) {
        case 'GET_SINGLE_ITEM':
            return action.payload;
        default:
            return state;
    }
}


export function getSingleItemError(state = false, action) {
    switch (action.type) {
        case 'GET_SINGLE_ITEM_ERROR':
            return action.payload;
        default:
            return state;
    }
}

export function setSingleItemPopUp(state = false, action) {
    switch (action.type) {
        case 'SET_SINGLE_ITEM_POPUP':
            return action.payload;
        default:
            return state;
    }
}


export function toggleRefresh(bool = false, action) {
    switch (action.type) {
        case 'TOGGLE_REFRESH':
            return !bool
        default:
            return bool;
    }
}

export function addMessageError(bool = false, action) {
    switch (action.type) {
        case 'ADD_MESSAGE_ERROR':
            return action.payload
        default:
            return bool;
    }
}

export function topMovies(arr = [], action) {
    switch (action.type) {
        case 'ADD_TOP_MOVIES':
            let tempArr = []
            for (let i = 0; i < action.payload.length; i++) {
                let object = {_id: action.payload[i]['id']}
                tempArr = [...tempArr, object]
            }
            return tempArr
        default:
            return arr;
    }
}


export default combineReducers({
    text: textBoxReducer,
    textPopUp: textBoxPopUpReducer,
    optionValue: sortOption,
    popUpValue: popUpIndexReducer,
    toggleRefresh: toggleRefresh,
    getSingleItem: getSingleItem,
    getSingleItemError: getSingleItemError,
    isPopUp: setSingleItemPopUp,
    listReducer: listReducer,
    loadingListError: loadingListError,
    itemsIsLoading: loadingList,
    addMessageError: addMessageError,
    topMovies: topMovies,
    latestCommentReducer: latestCommentReducer
});
