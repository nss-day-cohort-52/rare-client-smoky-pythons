import { Settings } from "../components/utils/Settings"

export const CommentsRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/comments`)
        return await res.json()
    },
    async add(comment) {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        }
        const res = await fetch(`${Settings.remoteURL}/comments`, fetchOptions)
        return await res.json()
    },
    async delete(id) {
        await fetch(`${Settings.remoteURL}/comments/${id}`, { method: "DELETE" })
        
    }
}