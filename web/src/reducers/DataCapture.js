const initialState={
    campaignId : NaN,
    userId : NaN,
    task : "",
}

const dataCapture = (state = initialState,action)=>{
    const newData = {...state};
    switch(action.type)
    {
        case 'ADD_CAMPAIGN':
            newData.campaignId = action.Id
            break;
        case 'ADD_USER':
            newData.userId = action.userId
            break;
        case 'ADD_TASK':
            newData.task = action.addTask
            break;
        default:
        return newData
    }
    return newData
}

export default dataCapture;