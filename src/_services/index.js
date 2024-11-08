// src/services/eventService.js
import axios from 'axios';
import { baseAPIURL, API_URL } from '../_config';


export const registerEvent = async (values) => {
    try {
        const response = await axios.post(
            `${baseAPIURL}${API_URL.SaveFestRegistration}`,
            values,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

// Function to get the application list
export const getUserList = async () => {
    try {
        const response = await axios.get(`${baseAPIURL}${API_URL?.GetFestRegistration}`);

        if (response.status === 200) {
            if (response.data.isSuccess === 200 && response.data.data.length > 0) {
                return response.data.data; // Return the data if successful
            } else {
                console.log('Data not found');
                return [];
            }
        } else {
            console.log('Data fetch error');
            return [];
        }
    } catch (error) {
        console.error("Error fetching application list:", error);
        throw new Error("Failed to fetch applications");
    }
};

export const updateStatusFestRegistrationById = async (regId) => {
    try {
        const response = await axios.get(`${baseAPIURL}${API_URL.UpdateStatusFestRegistrationById}?pRegId=${regId}`);

        if (response.status === 200 && response.data.isSuccess === 200) {
            return response.data;
        } else {
            throw new Error('Failed to update the status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        throw error;
    }
};

// Function to get the application list
export const getUserDetail = async (regId) => {
    try {
        const response = await axios.get(`${baseAPIURL}${API_URL?.GetFestRegistrationByRegId}?pRegId=${regId}`);

        if (response.status === 200) {
            if (response.data.isSuccess === 200 && response.data.data.length > 0) {
                return response.data.data; 
            } else {
                console.log('Data not found');
                return [];
            }
        } else {
            console.log('Data fetch error');
            return [];
        }
    } catch (error) {
        console.error("Error fetching application list:", error);
        throw new Error("Failed to fetch applications");
    }
};