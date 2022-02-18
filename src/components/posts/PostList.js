import { useEffect, useState } from "react"
import { Post } from "./Post"
import { Link } from "react-router-dom"
import { getAllUsers, getCurrentUser } from "../../repositories/UserRepository"
import { getCategories } from "../../repositories/CategoriesRepository"
import { getTags } from "../../repositories/TagsRepository"
import "./PostList.css"
import { searchByTitle } from "../../repositories/PostsRepository"

export const PostList = ({ posts, syncPosts, isStaff, titleFilter, setTitleFilter }) => {
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [categoryFilter, setCategoryFilter] = useState(0)
    const [tagFilter, setTagFilter] = useState([])
    const [authorFilter, setAuthorFilter] = useState(0)

    useEffect(() => {
        getCategories().then(setCategories)
        getAllUsers().then(setUsers)
        getCategories().then(setCategories)
        getTags().then(setTags)
    }, [])

    const checkboxOnChange = () => {
        const checkboxes = document.querySelectorAll('input[type=checkbox]')
        let tagsArr = []
        for (const box of checkboxes) {
            if (box.checked) {
                tagsArr.push(parseInt(box.value))
            }
        }
        setTagFilter(tagsArr)
    }

    const handleSearchInput = (evt) => {
        setTitleFilter(evt.target.value)
    }


    return (
        <>
            <div>
                <center> <Link to="/newPost" className="navbar-item button m-3">New Post</Link></center>
                {
                    isStaff
                        ?
                        <center> <Link to="/newReaction" className="navbar-item button m-3">New Reaction</Link></center>
                        : ""
                }
            </div>
            <div className="filterSelect">
                <h4 style={{ marginBottom: "10px" }} >Filtering options: </h4>
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
                    <option key="author--0" value={0}>All authors</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.user?.first_name} {user.user?.last_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filterSelect">
                <input id="title" onChange={handleSearchInput}
                    name="label"
                    placeholder="Search by title.."
                    type="text"
                    className="labelFilterInput"
                />
            </div>
            {tags.map((tag, i) => (
                <div className="w-full sm:w-auto" key={i}>
                    <label className="flex content-center p-3">
                        <input type="checkbox" name={tag.label} value={tag.id} onChange={checkboxOnChange} />
                        <span className="ml-3">{tag.label}</span>
                    </label>
                </div>
            ))}
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
                                        isOwner={post.is_owner}
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
                                        isOwner={post.is_owner}
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
