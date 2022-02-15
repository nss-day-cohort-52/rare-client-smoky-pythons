import { FetchOptions } from "../components/utils/FetchOptions";

export const getCategories = () => {
    return fetch("http://localhost:8000/categories", FetchOptions())
      .then(res => res.json())
  };
  
  export const getCategoryById = id => {
    return fetch(`http://localhost:8000/categories/${id}`, FetchOptions())
      .then(res => res.json())
  };