export const addMessage = (item)=> {
    return {
        type: 'ADD_MESSAGE',
        payload: item,
    }
}

export const popUpItem = (index) => {
    return {
        type: 'TOGGLE_POPUP',
        indexPayload: index,
    }
}

export const updateTextBox = (text) => {
    return {
        type: 'UPDATE_TEXT_BOX',
        payloadString: text,
    }
}

export const updatePopUpTextBox = (text) => {
    return {
        type: 'UPDATE_POP_UP_TEXT_BOX',
        payloadString: text,
    }
}

export const sortMessageByAlphabet = () => {
    return {
        type: 'SORT_BY_ALPHABET',
    }
}

export const sortMessageByDate = () => {
    return {
        type: 'SORT_BY_DATE',
    }
}

export const sortOption1 = (text) => {
    return {
        type: 'SORT_OPTION',
        payload: text
    }
}

export const popUpIndex = (index) => {
    return {
        type: 'POP_UP_INDEX',
        payload:index
    }

}

export const closePopUpIndex = (index) => {
    return {
        type: 'CLOSE_POP_UP_INDEX',
        payload:index
    }

}

export const loadingItemsError= (bool) => {
    return {
        type: 'LOADING_LIST_ERROR',
        hasErrored: bool
    };
}
export const loadingItems= (bool) => {
    return {
        type: 'LOADING_LIST',
        isLoading: bool
    };
}
// array
export const loadListSuccess =(items) => {
    return {
        type: 'LOAD_LIST_SUCCESS',
        payload:items
    };
}

export const loadLatestComments =(items) => {
    return {
        type: 'LOAD_COMMENTS_SUCCESS',
        payload:items
    };
}



export const getMessages = (url ,body) => {
    return (dispatch) => {
        dispatch(loadingItems(true));
        fetch(url,
            {method:'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }


        )
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(loadingItems(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(loadListSuccess(items)))
           /* .catch(() => {dispatch(loadingItemsError(true))});*/
    };
};

export const getSingleItem= (item) => {
    return {
        type: 'GET_SINGLE_ITEM',
        payload:item
    };
};



export const addTopMovies= (item) => {
    return {
        type: 'ADD_TOP_MOVIES',
        payload:item
    };
};

export const setSingleItemPopUp = (bool) => {
    return {
        type: 'SET_SINGLE_ITEM_POPUP',
        payload:bool
    }
};

export const getSingleItemError = (bool) => {
    return {
        type: 'GET_SINGLE_ITEM_ERROR',
        payload: bool
    };
};

export const getMessageById = (url, body) => {
    return (dispatch) => {
        fetch(url,
            {method:'get'
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((item)=>dispatch(getSingleItem(item)))
            .then(()=>dispatch(setSingleItemPopUp(true)))
            .catch(()=>dispatch(getSingleItemError(true)))
    };
};

export const toggleRefresh = () => {
    return {
        type: 'TOGGLE_REFRESH',
    }
};

export const addMessageToServer = (url, body) => {
    console.log('action called')
    return (dispatch) => {
        fetch(url,
            {method:'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),

            })
            .then((response) => {
                console.log('print responses' + JSON.stringify(response))
                if (!response.ok) {
                    console.log('action fail')
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then(()=>dispatch(toggleRefresh()))
            .catch(()=>{
                dispatch(addMessageError(true))
                console.log('add message failed?!')

            })

    };
};


export const getLastNComments = (url, body) => {
    return (dispatch) => {
        dispatch(loadingItems(true));
        fetch(url,
            {method:'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(loadingItems(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(loadLatestComments(items)))
    };

}




export const addMessageError = (bool) => {
    return {
        type: 'ADD_MESSAGE_ERROR',
        payload: bool
    };
};


export const deleteMessage = (url)=> {

    return (dispatch) => {
        fetch(url,
            {method:'delete',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response;
            })
            .then((response) => response.json())
            .then(()=>dispatch(toggleRefresh()))
            .catch(() => {
                alert('failed to delete message')
                dispatch(toggleRefresh())
            })
    };
};

export const clearMessage = (url)=> {

    return (dispatch) => {
        fetch(url,
            {method:'delete',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response;
            })
            .then((response) => response.json())
            .then(()=>dispatch(toggleRefresh()))
            .catch((err) => {
                alert('failed to clear message!')
                dispatch(toggleRefresh())
            })
    };
};

export const updateMessage= (url, body) => {
    return (dispatch) => {
        fetch(url,
            {method:'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),

            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then(()=>dispatch(toggleRefresh()))
            .catch((err) => {
                alert('failed to update message!')
                dispatch(toggleRefresh())
            })

    };
};

export const clearList = () => {
    return {
        type: 'CLEAR_LIST',
    };
};
