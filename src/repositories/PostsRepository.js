import { FetchOptions } from "../components/utils/FetchOptions"
import { Settings } from "../components/utils/Settings"

export const PostsRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/posts`, FetchOptions())
        return await res.json()
    },
    async getOne(id) {
        const res = await fetch(`${Settings.remoteURL}/posts/${id}`, FetchOptions())
        return await res.json()
    },
    async add(post) {
        const res = await fetch(`${Settings.remoteURL}/posts`, FetchOptions("POST", post))
        return await res.json()
    },
    async update(id, post) {
        const res = await fetch(`${Settings.remoteURL}/posts/${id}`, FetchOptions("PUT", post))
        return res
    },
    async delete(id) {
        await fetch(`${Settings.remoteURL}/posts/${id}`, FetchOptions("DELETE"))
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

export const searchByTitle = (search_text) => {
    return fetch(`http://localhost:8000/posts?q=${search_text}`, FetchOptions())
        .then(res => res.json())
}