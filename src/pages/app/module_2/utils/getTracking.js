import axios from 'axios';
import { GET_INTERVIEW_TRACKING_MODE, GET_QUOTA_TABLE_TRACKING_MODE } from '../api/get';

export const getQuotaTableTrackingMode = async (projectId) => {
    try {
        return await axios.get(`${GET_QUOTA_TABLE_TRACKING_MODE(projectId)}`);
    } catch (error) {
        console.log('Error while getting quota in mode: Tracking', error);
    }
}

export const getInterviewTrackingMode = async (projectId) => {
    try {
        return await axios.get(`${GET_INTERVIEW_TRACKING_MODE(projectId)}`);
    } catch (error) {
        console.log("Error while getting interview in mode: Tracking", error);
    }
}