import { FetchOptions } from "../components/utils/FetchOptions";

export const get_all_users = () => {
    return fetch("http://localhost:8000/rareusers", FetchOptions())
      .then(res => res.json())
  };

export const get_single_user = (id) => {
    return fetch(`http://localhost:8000/rareusers/${id}`, FetchOptions())
    .then(res => res.json())
}

