import { Settings } from "../components/utils/HumanDate"

export const PostsRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/posts`)
    }
}