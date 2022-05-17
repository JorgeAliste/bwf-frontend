import {toast} from 'react-toastify';

export function status(resp) {
    if (resp.status >= 200 && resp.status < 300) {
        return resp.json();
    }
    resp.json().then(data => toast.error(data['message']));
    throw new Error(resp.statusText);

}
