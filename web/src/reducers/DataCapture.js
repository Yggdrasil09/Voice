import * as actionTypes from '../actions/actionType';

const initialState={
    campaignId : '',
}

const dataCapture = (state = initialState,action)=>{
    const newData = {...state};
    switch(action.type)
    {
        case actionTypes.ADD_CAMPAIGN:
        return [
            newData,
            Object.assign({}, action.campaign)
        ]
        default:
        return newData
    }
}

export default dataCapture;