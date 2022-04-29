export function getGroups() {
    return fetch(`http://127.0.0.1:8000/bwfapi/groups/`)
        .then(resp => resp.json())
        .catch((e) => console.log(e))
}

export function getGroup(id) {
    return fetch(`http://127.0.0.1:8000/bwfapi/groups/${id}/`)
        .then(resp => resp.json())
        .catch((e) => console.log(e))
}