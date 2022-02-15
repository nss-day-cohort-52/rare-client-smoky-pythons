import { FetchOptions } from "../components/utils/FetchOptions";

export const getTags = () => {
    return fetch("http://localhost:8000/tags", FetchOptions())
      .then(res => res.json())
  };
  
  export const getTagById = id => {
    return fetch(`http://localhost:8000/tags/${id}`, FetchOptions())
      .then(res => res.json())
  };
