import { fetchMessage } from "../services/api";

export function flattenArray(arr) {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), [])
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase().concat(string.slice(1));
}

export function getLastTenUsers(users) {

    if(!users) return;

    const lastTenUsers = users.data.slice(-10);

    return lastTenUsers.map((user) => user.id);
}