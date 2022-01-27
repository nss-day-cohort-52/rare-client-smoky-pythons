import { useEffect, useState } from "react"
import { Post } from "./Post"
import { Link } from "react-router-dom"
import { PostsRepository } from "../../repositories/PostsRepository"
import { getCategories } from "../../repositories/CategoriesRepository"


export const PostList = ({ posts, syncPosts }) => {
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])
    const [filPosts, FilterPosts] = useState([])
    const [categoryFilter, setCategoryFilter] = useState(0)



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

    const delete_post = (id) => {
        fetch(`http://localhost:8088/posts/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => {
                history.push("/posts")
            })
    }


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
                            <div className="filterSelect">
                                <select id="category" onChange={(event) => {
                                    setCategoryFilter(parseInt(event.target.value))
                                }}
                                    defaultValue=""
                                    name="category"
                                    className="categoryFilterDropdown"
                                >
                                    <option key="category--0" value="">Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            </tr>

                            <div className={"siteList__div"}>
                                {
                                    posts.map(
                                        (post) => {
                                            const foundUser = users.find(user => user.id === post.userId)
                                            const foundCategory = categories.find(category => category.id === post.categoryId)
                                            if (post.category_id === categoryFilter) {
                                                return <p className={'posts'} key={`category--${post.id}`}>
                                                    <div><Post
                                                        key={post.id}
                                                        id={post.id}
                                                        title={post.title}
                                                        content={post.content}
                                                        publicationDate={post.publicationDate}
                                                        user={foundUser}
                                                        category={foundCategory}
                                                        syncPosts={syncPosts}

                                                    /> <button onClick={() => { if (confirm('Are you sure you want to delete this post?') == true) delete_post(post.id) }}>Delete</button></div>
                                                </p>
                                            } else if (categoryFilter === 0) {
                                                return <p className={'posts'} key={`category--${post.id}`}>
                                                    <div><Post
                                                        key={post.id}
                                                        id={post.id}
                                                        title={post.title}
                                                        content={post.content}
                                                        publicationDate={post.publicationDate}
                                                        user={foundUser}
                                                        category={foundCategory}
                                                        syncPosts={syncPosts}

                                                    /> <button onClick={() => { if (confirm('Are you sure you want to delete this post?') == true) delete_post(post.id) }}>Delete</button></div>
                                                </p>
                                            }
                                        }

                                    )
                                }
                            </div>
                </thead>
            </table>
        </>
    )
}
