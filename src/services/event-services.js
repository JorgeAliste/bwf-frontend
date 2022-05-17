import {status} from "../utils";

export function getEvent(token, id) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/events/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        }
    })
        .then(status)
        .catch((e) => console.log(e))
}

export function createEvent(token, data) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/events/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(data)
    })
        .then(status)
        .catch((e) => console.log(e))
}

export function placeBet(token, item) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/bets/place_bet/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(item)
    })
        .then(status)
        .catch((e) => console.log(e))
}

export function setResults(token, item) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/events/${item.event}/set_result/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(item)
    })
        .then(status)
        .catch((e) => console.log(e))
}

