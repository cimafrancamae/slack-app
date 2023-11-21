import useFetch from "../utils/hooks/useFetch";

const url = 'http://206.189.91.54/api/v1';
const headers = {
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

    const { data, error, load } = useFetch(apiUrl, options);

    return { data, error, load };
};

export const fetchUserChannels = () => {
    options = {
        method: 'GET',
        headers: headers
    };

    apiUrl = `${url}/channels`;

    // return { apiUrl, options };

    const { data, error, load } = useFetch(apiUrl, options);

    return { data, error, load };
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

    // const response = useFetch()
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