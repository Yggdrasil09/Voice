import * as actionTypes from './actionType';

export const addCampaign = (campaign) => {
    return{
        type : actionTypes.ADD_CAMPAIGN,
        campaign : campaign
    }
};

