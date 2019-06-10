const initialState = {
  campaignId: 0,
  userId: NaN,
  task: "",
  otpLoginId: "",
  falselogged: 0
};

const dataCapture = (state = initialState, action) => {
  const newData = { ...state };
  switch (action.type) {
    case "ADD_CAMPAIGN":
      newData.campaignId = action.Id;
      break;
    case "ADD_USER":
      newData.userId = action.userId;
      break;
    case "ADD_TASK":
      newData.task = action.addTask;
      break;
    case "ADD_OTPID":
      newData.otpLoginId = action.otpId;
      break;
    case "ADD_LOGIN":
      newData.falselogged = action.falselogged;
      break;
    default:
      return newData;
  }
  return newData;
};

export default dataCapture;
