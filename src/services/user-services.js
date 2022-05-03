export function auth(credentials) {
    return fetch('http://127.0.0.1:8000/bwfapi/authenticate/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(resp => resp.json())
        .catch(e => console.log(e))
}

export function register(userData) {
    return fetch('http://127.0.0.1:8000/bwfapi/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(resp => resp.json())
        .catch(e => console.log(e))
}