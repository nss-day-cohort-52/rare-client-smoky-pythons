import { FetchOptions } from "../components/utils/FetchOptions"
import { Settings } from "../components/utils/Settings"

export const PostsRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/posts`, FetchOptions())
        return await res.json()
    },
    async add(post) {
        const res = await fetch(`${Settings.remoteURL}/posts`, FetchOptions("POST", post))
        return await res.json()
    }
}

export const getPostsByUser = (id) => {
    return fetch(`http://localhost:8000/posts?user_id=${id}`, FetchOptions())
    .then(res => res.json())
}

export const getPostsByCategory = (id) => {
    return fetch(`http://localhost:8000/posts?category_id=${id}`, FetchOptions())
    .then(res => res.json())
}

export const getSinglePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, FetchOptions())
        .then(res => res.json())
}