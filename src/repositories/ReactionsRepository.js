import { FetchOptions } from "../components/utils/FetchOptions";

export const getReactions = () => {
  return fetch("http://localhost:8000/reactions", FetchOptions())
    .then(res => res.json())
};

export const getReactionById = id => {
  return fetch(`http://localhost:8000/reactions/${id}`, FetchOptions())
    .then(res => res.json())
};

export const createReaction = (postId, object) => {
  return fetch(`http://localhost:8000/posts/${postId}/react`, FetchOptions("POST", object))
    .then(res => res.json())
}
export const updateReaction = (postId, object) => {
  return fetch(`http://localhost:8000/posts/${postId}/react`, FetchOptions("PUT", object))
    .then(res => res.json())
}
export const deleteReaction = (postId) => {
  return fetch(`http://localhost:8000/posts/${postId}/unreact`, FetchOptions("DELETE"))
}