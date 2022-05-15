import {status} from "../utils";

export function getGroups() {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/groups/`)
        .then(status)
        .catch((e) => console.log(e))
}

export function getGroup(id) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/groups/${id}/`)
        .then(status)
        .catch((e) => console.log(e))
}

export function joinGroup(data) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/members/join/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(status)
        .catch((e) => console.log(e))
}

export function leaveGroup(data) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/members/leave/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(status)
        .catch((e) => console.log(e))
}

export function postComment(token, description, group, user) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/comments/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({description, group, user}),
    })
        .then(status)
        .catch((e) => console.log(e))
}
