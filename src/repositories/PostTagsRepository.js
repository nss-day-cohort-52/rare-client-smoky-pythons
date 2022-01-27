import { Settings } from "../components/utils/Settings"

export const PostTagsRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/posttags`)
        return await res.json()
    }
}