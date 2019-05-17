const initialState={
    username:'',
    userId:'',
    taskId:'',
}

const dataCapture = (state = initialState,action)=>{
    const newData = {...state};
    return newData;
}

export default dataCapture;