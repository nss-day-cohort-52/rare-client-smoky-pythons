import { useEffect, useState } from "react"
import { PostsRepository } from "../../repositories/PostsRepository"
import { Post } from "./Post"
import {Link} from "react-router-dom"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])

    const syncPosts = () => {
        PostsRepository.getAll().then(setPosts)
    }

    useEffect(() => {
        syncPosts()
    }, [])

    return (
        posts.map(post => {
            // We still need to fetch users and categories from the 
            const foundUser = users.find(user => user.id === post.userId)
            const foundCategory = categories.find(category => category.id === post.categoryId)

            return <Post
            key={post.id}
            title={post.title}
            content={post.content}
            publicationDate={post.publicationDate}
            user={foundUser}
            category={foundCategory}
            />
        })
    )
}