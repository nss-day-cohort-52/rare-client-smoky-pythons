import { FetchOptions } from "../components/utils/FetchOptions";

export const getCategories = () => {
    return fetch("http://localhost:8000/categories", FetchOptions())
      .then(res => res.json())
  };
  
  export const getCategoryById = id => {
    return fetch(`http://localhost:8000/categories/${id}`, FetchOptions())
      .then(res => res.json())
  };

//   export const searchEntries = (searchTerm) => {
//     return fetch(`http://localhost:8088/entries?q=${searchTerm}`)
//       .then(res => res.json())
//   };
  
//   export const addEntry = Entry => {
//     return fetch("http://localhost:8088/entries", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(Entry)
//     }).then(getEntries);
//   };
  
//   export const deleteEntry = entryId => {
//     return fetch(`http://localhost:8088/entries/${entryId}`, {
//       method: "DELETE"
//     })
//   };
  
//   export const updateEntry = entry => {
//     return fetch(`http://localhost:8088/entries/${entry.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(entry)
//     })
//   };