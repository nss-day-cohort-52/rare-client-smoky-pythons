import { useState } from "react"
import { Post } from "./Post"
import { Link } from "react-router-dom"


export const PostList = ({ posts, syncPosts }) => {
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])

    return (
        <>
            <table className="table">
              <div>
                <center> <Link to="/newPost" className="navbar-item">New Post</Link></center>
              </div>
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
                        // We still need to fetch users and categories from the server
                        const foundUser = users.find(user => user.id === post.userId)
                        const foundCategory = categories.find(category => category.id === post.categoryId)

                        return <Post
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            publicationDate={post.publicationDate}
                            user={foundUser}
                            category={foundCategory}
                            syncPosts={syncPosts}
                        />
                    })
                }
            </table>
        </>
    )
}
