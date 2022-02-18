import { FetchOptions } from "../components/utils/FetchOptions";
import { Settings } from "../components/utils/Settings";

export const getAllUsers = () => {
    return fetch("http://localhost:8000/rareusers", FetchOptions())
        .then(res => res.json())
};

export const getSingleUser = (id) => {
    return fetch(`http://localhost:8000/rareusers/${id}`, FetchOptions())
        .then(res => res.json())
}

export const getCurrentUser = () => {
    return fetch(`http://localhost:8000/rareusers/currentuser`, FetchOptions())
        .then(res => res.json())
}

export const subscribe = (id, subObj) => {
    return fetch(`${Settings.remoteURL}/rareusers/${id}/subscribe`, FetchOptions("POST", subObj))
        .then(res => res.json())
}
export const unSubscribe = (id) => {
    return fetch(`${Settings.remoteURL}/rareusers/${id}/unsubscribe`, FetchOptions("DELETE"))
        
}
