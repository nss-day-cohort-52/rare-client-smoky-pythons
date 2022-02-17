import { FetchOptions } from "../components/utils/FetchOptions";

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


