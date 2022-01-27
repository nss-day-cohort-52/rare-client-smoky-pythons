import { Settings } from "../components/utils/Settings"

export const PostsRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/posts`)
        return await res.json()
    }
}

export const getPostsByUser = (id) => {
    return fetch(`http://localhost:8088/posts?user_id=${id}`)
    .then(res => res.json())
}

export const getPostsByCategory = (id) => {
    return fetch(`http://localhost:8088/posts?category_id=${id}`)
    .then(res => res.json())
}