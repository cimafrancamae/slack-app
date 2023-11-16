import { useNavigate } from "react-router-dom";

const url = 'http://206.189.91.54/api/v1';

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
            const data = await response.json();
            const accessToken = response.headers.get("access-token");
            console.log('Login Successful:', response.headers);

            if(data && accessToken){
                localStorage.setItem('accessToken', accessToken);
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
}