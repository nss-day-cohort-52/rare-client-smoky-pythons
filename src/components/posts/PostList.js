import { useEffect, useState } from "react"
import { Post } from "./Post"
import { Link } from "react-router-dom"
import { PostsRepository } from "../../repositories/PostsRepository"
import { get_all_users } from "../../repositories/UserRepository"
import { getCategories } from "../../repositories/CategoriesRepository"
import { PostTagsRepository } from "../../repositories/PostTagsRepository"


export const PostList = ({ posts, syncPosts }) => {
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])
    const [filPosts, FilterPosts] = useState([])
    const [categoryFilter, setCategoryFilter] = useState(0)
    const [postTags, setPostTags] = useState([])



    useEffect(() => {
        PostsRepository.getAll()
            .then((postArray) => {
                FilterPosts(postArray)
            })
    },
        []
    )

    useEffect(() => {
        getCategories()
            .then(setCategories)
    },
        []
    )


    useEffect(() => {
        get_all_users().then(setUsers)
        getCategories().then(setCategories)
        PostTagsRepository.getAll().then(setPostTags)
    }, [])
    
    return (
        <>
            <div>
                <center> <Link to="/newPost" className="navbar-item">New Post</Link></center>
            </div>
                <div className="filterSelect">
                    <select id="category" onChange={(event) => {
                        setCategoryFilter(parseInt(event.target.value))
                    }}
                        defaultValue=""
                        name="category"
                        className="categoryFilterDropdown"
                    >
                        <option key="category--0" value={0}>Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.label}
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
                            const foundUser = users.find(user => user.id === post.user_id)
                            const foundCategory = categories.find(category => category.id === post.category_id)

                            if (post.category_id === categoryFilter) {
                                return <Post
                                    key={post.id}
                                    postId={post.id}
                                    title={post.title}
                                    content={post.content}
                                    publicationDate={post.publication_date}
                                    user={foundUser}
                                    category={foundCategory}
                                    syncPosts={syncPosts}
                                />
                            } else if (categoryFilter === 0) {
                                return <Post
                                    key={post.id}
                                    postId={post.id}
                                    title={post.title}
                                    content={post.content}
                                    publicationDate={post.publication_date}
                                    user={foundUser}
                                    category={foundCategory}
                                    syncPosts={syncPosts}

                                />

                            }
                        }

                    )
                }
            </table>
        </>
    )
}
