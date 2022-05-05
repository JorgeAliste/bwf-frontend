export function getGroups() {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/groups/`)
        .then(resp => resp.json())
        .catch((e) => console.log(e))
}

export function getGroup(id) {
    return fetch(`${process.env.REACT_APP_API_URL}/bwfapi/groups/${id}/`)
        .then(resp => resp.json())
        .catch((e) => console.log(e))
}