import {status} from '../utils'

export function auth(credentials) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/authenticate/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(status)
        .catch(e => console.log(e))
}

export function register(userData) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(status)
        .catch(e => console.log(e))
}

export function changePassword(newPasswordData, userId) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/users/${userId}/change_password/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPasswordData)
    }).then(status)
        .catch(e => console.log(e))
}

export function uploadAvatar(profileId, data) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/profiles/${profileId}/`, {
        method: 'PUT',
        body: data
    }).then(status)
        .catch(e => console.log(e))
}
