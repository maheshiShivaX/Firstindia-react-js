const handleLogin = async (username, password) => {
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
                expiresInMins: 30, // optional, defaults to 60
            })
        });
        const data = await response.json();
        console.log('Login response:', data);

        // Store token in localStorage or state
        localStorage.setItem('token', data.token); // Assuming the token is in data.token

        return data; // Return data in case you need to handle it further
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Failed to log in');
    }
};

const getCurrentUser = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    try {
        const response = await fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Include token in Authorization header
            },
        });
        const data = await response.json();
        console.log('Current user:', data);
        return data; // Return data if needed
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw new Error('Failed to fetch current user');
    }
};



const refreshSession = async (refreshToken) => {
    try {
        const response = await fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken,
                expiresInMins: 30, // optional, defaults to 60
            }),
        });
        const data = await response.json();
        console.log('Refresh session response:', data);

        // Update token in localStorage or state
        localStorage.setItem('token', data.token); // Assuming the token is in data.token

        return data; // Return data if needed
    } catch (error) {
        console.error('Error refreshing session:', error);
        throw new Error('Failed to refresh session');
    }
};
