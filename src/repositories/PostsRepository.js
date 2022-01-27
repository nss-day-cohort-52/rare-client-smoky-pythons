import { Settings } from "../components/utils/Settings"

export const PostsRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/posts`)
        return await res.json()
    },
    async add(post) {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        }
        const res = await fetch(`${Settings.remoteURL}/posts`, fetchOptions)
        return await res.json()
    }
}