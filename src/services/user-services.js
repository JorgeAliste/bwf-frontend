export function auth(credentials) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/authenticate/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(resp => resp.json())
        .catch(e => console.log(e))
}

export function register(userData) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(resp => resp.json())
        .catch(e => console.log(e))
}

export function uploadAvatar(profileId, data) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/profiles/${profileId}/`, {
        method: 'PUT',
        body: data
    }).then(resp => resp.json())
        .catch(e => console.log(e))
}