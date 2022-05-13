const NONBODY_METHODS = ['GET', 'DELETE'];

const url = process.env.REACT_APP_API_URL;

export interface RequestBody { [key: string]: any }

const request = (path: string, method: string, body?: RequestBody) => {
    return fetch(`${url}${path}`, {
        method,
        headers: NONBODY_METHODS.includes(method) ? {} : { 'Content-Type': 'application/json' },
        credentials: 'include',
        mode: 'cors',
        body: NONBODY_METHODS.includes(method) ? null : JSON.stringify(body)
    })
        .then(res => Promise.all([res.ok, res.json()]))
        .then(([ok, json]) => {
            if (!ok) throw json;
            return json;
        });
};

export const post = (path: string, body: RequestBody) => request(path, 'POST', body);
export const put = (path: string, body: RequestBody) => request(path, 'PUT', body);
export const get = (path: string) => request(path, 'GET');
export const del = (path: string) => request(path, 'DELETE');