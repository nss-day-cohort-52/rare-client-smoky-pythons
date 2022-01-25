import { Settings } from "../components/utils/Settings"

export const PostsRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/posts`)
        return await res.json()
    }
}