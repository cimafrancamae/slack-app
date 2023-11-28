import useFetch from "../utils/hooks/useFetch";
import { getChannelMembers, getLastTenUsers } from "../utils/helper";
import { useEffect, useState } from "react";

export const url = 'http://206.189.91.54/api/v1';
export const headers = {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    expiry: localStorage.getItem('expiry'),
    uid: localStorage.getItem('uid'),
};

let options = {};
let apiUrl = '';

export const loginUser = async (userData) => {

    try {
        const response = await fetch(`${url}/auth/sign_in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if(response.ok){
            console.log('Login Successful:', response.headers);

            const data = await response.json();
            const accessToken = response.headers.get("access-token");
            const client = response.headers.get("client");
            const expiry = response.headers.get("expiry");
            const uid = response.headers.get("uid");

            if(data && accessToken){
                localStorage.setItem('access-token', accessToken);
                localStorage.setItem('client', client);
                localStorage.setItem('expiry', expiry);
                localStorage.setItem('uid', uid);
                return data;
            } else {
                throw new Error('Login Failed. Token not found in response.');
            }
        } else {
            throw new Error('Login Failed. Invalid Credentials.');
        }
    } catch (error) {
        console.error('Login error:', error.message);
        throw new Error('Login Failed. Please try again.');
    }
}

export const createUser = async (userData) => {
    console.log(userData);
    try {
        const response = await fetch(`${url}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })

        if(response.ok) {
            console.log('Registration Successful', response)
            const data = await response.json();
            return data;
        } else {
            throw new Error('Registration Unsuccessful!', response);
        }
    } catch (error) {
        throw new Error('Registration Unsuccessful!', error.message);
    }
}

export const fetchAllUsers = () => {
    const options = {
        method: 'GET',
        headers: headers,
    };

    const apiUrl = `${url}/users`;

    return { apiUrl, options };
};

export const fetchUserChannels = () => {
    options = {
        method: 'GET',
        headers: headers
    };

    apiUrl = `${url}/channels`;

    return { apiUrl, options };
}

export const fetchMessage = (receiverId, receiverClass) => {

    options = {
        method: 'GET',
        headers: headers
    };
    
    apiUrl = `${url}/messages?receiver_id=${receiverId}&receiver_class=${receiverClass}`;

    return { apiUrl, options };
};

export const sendMessage = (requestBody) => {
    options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    };

    apiUrl = `${url}/messages`;

    return { apiUrl, options };
};

export const createChannel = (requestBody) => {
    options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    };

    apiUrl = `${url}/channels`;

    return { apiUrl, options };
};

export const fetchChannel = (channelId) => {
    options = {
        method: 'GET',
        headers: headers
    };

    apiUrl = `${url}/channels/${channelId}`;

    return { apiUrl, options };
};

export const addChannelMember = (requestBody) => {
    options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    };

    apiUrl = `${url}/channel/add_member`;

    return { apiUrl, options };
}

export async function fetchAllUserChannelDetails(channels) {

    let channelData = [];
    
    if(channels){
        const requests = channels.data.map(async (channel) => {
            try {
                const { apiUrl, options } = fetchChannel(channel.id);
                const response = await fetch(apiUrl,options);

                if(!response.ok){
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                return result;

            } catch (error){
                console.log('Failed to fetch channel detail',error)
                return null;
            }
        });

        channelData = await Promise.all(requests);
    }

    return channelData;
}

export async function fetchDirectMessages(users) {

    let messages = [];

    if(users){
        const requests = users.map(async (user) => {
            try {
                const { apiUrl, options } = fetchMessage(user.id, 'User');
                const response = await fetch(apiUrl, options);

                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                return result;

            } catch (error) {
                console.error('Failed to retrieve direct messages', error);
                return null;
            }
            
        });

        messages = await Promise.all(requests);
    }

    const directMessages = messages.filter(message => message.data && message.data.length > 0);
    
    return directMessages;
}

export const fetchDataForLastTenUsers = async (users) => {
            
    const userIds = getLastTenUsers(users);

    if(userIds){
        const options = {
            method: 'GET',
            headers: headers
        };

       const requests = await userIds.map(id =>
            fetch(`${url}/messages?receiver_id=${id}&receiver_class=User`, options)
               .then((response) => {
                   if(!response.ok){
                       throw new Error('Network response was not ok');
                   }
                   return response.json();
               })
               .catch((error) => {
                   console.error('Error fetching messages', id, error);
                   return { error };
               })
        );

        try {
            const messagesData = await Promise.all(requests);
            return messagesData;
        } catch (error) {
            console.log('Error fetching messages', error);
        }
    }
}