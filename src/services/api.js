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
    const headers = {
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        expiry: localStorage.getItem('expiry'),
        uid: localStorage.getItem('uid'),
      };
    
      const options = {
        method: 'GET',
        headers: headers,
      };

      const apiUrl = `${url}/users`;
    
      return { apiUrl, options }
  };