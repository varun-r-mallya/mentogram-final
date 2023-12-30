const setToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
}

const getToken = () => {
    // Get the token from localStorage
    const tokenString = localStorage.getItem('token');
    // Return the parsed token string
    return JSON.parse(tokenString);
}

const removeToken = () => {
    // Clear localStorage
      localStorage.clear();
}

const isLoggedIn = () => {
    // Check if there is a token in localStorage
      const token = getToken();
    // Return true/false depending on if the token exists
    return !!token;
}

export{
    setToken,
    getToken,
    removeToken,
    isLoggedIn
}