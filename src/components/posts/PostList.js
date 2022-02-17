import { useEffect, useState } from "react"
import { Post } from "./Post"
import { Link } from "react-router-dom"
import { getAllUsers } from "../../repositories/UserRepository"
import { getCategories } from "../../repositories/CategoriesRepository"


export const PostList = ({ posts, syncPosts }) => {
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryFilter, setCategoryFilter] = useState(0)
    const [authorFilter, setAuthorFilter] = useState(0)

    useEffect(() => {
        getCategories().then(setCategories)
        getAllUsers().then(setUsers)
        getCategories().then(setCategories)
    }, [])

    return (
        <>
            <div>
                <center> <Link to="/newPost" className="navbar-item button m-3">New Post</Link></center>
                <center> <Link to="/newReaction" className="navbar-item button m-3">New Reaction</Link></center>
            </div>
            <div className="filterSelect">
                <select id="category" onChange={(event) => {
                    setCategoryFilter(parseInt(event.target.value))
                }}
                    defaultValue=""
                    name="category"
                    className="categoryFilterDropdown"
                >
                    <option key="category--0" value={0}>All categories</option>
                    {categories.map((category) => (
                        <option className="dropdown-item" key={category.id} value={category.id}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filterSelect">
                <select id="author" onChange={(event) => {
                    setAuthorFilter(parseInt(event.target.value))
                }}
                    defaultValue=""
                    name="author"
                    className="authorFilterDropdown"
                >
                    <option key="author--0" value={0}>Author</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.user?.first_name} {user.user?.last_name}
                        </option>
                    ))}
                </select>
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
                    posts.map(
                        (post) => {
                            if (categoryFilter !== 0 && authorFilter !== 0) {
                                if (post.category.id === categoryFilter && post.user.id === authorFilter) {
                                    return <Post
                                        key={post.id}
                                        postId={post.id}
                                        title={post.title}
                                        content={post.content}
                                        publicationDate={post.publication_date}
                                        user={post.user.user}
                                        category={post.category}
                                        syncPosts={syncPosts}
                                        tags={post.tags}
                                        reactionCount={post.reactions}
                                    />
                                }
                            } else {
                                if (post.category.id === categoryFilter || post.user.id === authorFilter) {
                                    return <Post
                                        key={post.id}
                                        postId={post.id}
                                        title={post.title}
                                        content={post.content}
                                        publicationDate={post.publication_date}
                                        user={post.user.user}
                                        category={post.category}
                                        syncPosts={syncPosts}
                                        tags={post.tags}
                                        reactionCount={post.reactions}
                                    />
                                } else if (categoryFilter === 0 && authorFilter === 0) {
                                    return <Post
                                        key={post.id}
                                        postId={post.id}
                                        title={post.title}
                                        content={post.content}
                                        publicationDate={post.publication_date}
                                        user={post.user.user}
                                        category={post.category}
                                        syncPosts={syncPosts}
                                        tags={post.tags}
                                        reactionCount={post.reactions}
                                    />

                                }
                            }
                        }

                    )
                }
            </table>
        </>
    )
}
