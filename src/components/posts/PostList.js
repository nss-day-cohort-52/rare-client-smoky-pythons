import { useEffect, useState } from "react"
import { Post } from "./Post"
import { Link } from "react-router-dom"
import { get_all_users } from "../../repositories/UserRepository"
import { getCategories } from "../../repositories/CategoriesRepository"
import { PostTagsRepository } from "../../repositories/PostTagsRepository"


export const PostList = ({ posts, syncPosts }) => {
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])
    const [postTags, setPostTags] = useState([])

    
    useEffect(() => {
        get_all_users().then(setUsers)
        getCategories().then(setCategories)
        PostTagsRepository.getAll().then(setCategories)
    }, [])
    return (
        <>
              <div>
                <center> <Link to="/newPost" className="navbar-item">New Post</Link></center>
              </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                {
                    posts.map(post => {
                        //! We still need to fetch users and categories from the server
                        const foundUser = users.find(user => user.id === post.user_id)
                        const foundCategory = categories.find(category => category.id === post.category_id)

                        return <Post
                            key={post.id}
                            postId={post.id}
                            title={post.title}
                            content={post.content}
                            publicationDate={post.publication_date}
                            user={foundUser}
                            category={foundCategory?.label}
                            syncPosts={syncPosts}
                        />
                    })
                }
            </table>
        </>
    )
}
