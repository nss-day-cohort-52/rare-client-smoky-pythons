import { FetchOptions } from "../components/utils/FetchOptions"
import { Settings } from "../components/utils/Settings"

export const CommentsRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/comments`, FetchOptions())
        return await res.json()
    },
    async getOne(id) {
        const res = await fetch(`${Settings.remoteURL}/comments/${id}`, FetchOptions())
        return await res.json()
    },
    async add(comment) {
        const res = await fetch(`${Settings.remoteURL}/comments`, FetchOptions("POST", comment))
        return await res.json()
    },
    async update(id, comment) {
        const res = await fetch(`${Settings.remoteURL}/comments/${id}`, FetchOptions("PUT", comment))
        return await res
    },
    async delete(id) {
        await fetch(`${Settings.remoteURL}/comments/${id}`, FetchOptions("DELETE"))
    }
}