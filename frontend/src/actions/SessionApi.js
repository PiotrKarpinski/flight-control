import axios from "axios";

export const authenticate = (callback) => {
    axios.get('http://localhost:3001/logged_in',
        {withCredentials: true})
        .then(response => {
            callback(response.data)
        })
        .catch(error => console.log('api errors:', error))
};

export const signup = (user, callback) => {

    axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
        .then(response => {
            callback(response)
        })
        .catch(error => console.log('api errors:', error))
};

export const logout = (callback) => {
    axios.post('http://localhost:3001/logout',null,{withCredentials: true})
        .then(response => {
            callback(response.data)
        })
        .catch(error => console.log('api errors:', error))
};

export const login = (user, callback) => {
    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
        .then(response => {
            callback(response)
        })
        .catch(error => console.log('api errors:', error))
};

