const setToken = (token) => {
    console.log(token, "setToken called");
    localStorage.setItem('token', JSON.stringify(token));
}

const getToken = () => {
    // Get the token from localStorage
    console.log("getToken called");
    const tokenString = localStorage.getItem('token');
    // Return the parsed token string
    return JSON.parse(tokenString);
}

const removeToken = () => {
    // Clear localStorage
    console.log("removeToken called")
    localStorage.clear();
}

const isLoggedIn = () => {
    // Check if there is a token in localStorage
    console.log("isLoggedIn called");
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