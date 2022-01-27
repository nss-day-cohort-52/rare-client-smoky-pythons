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
   

    const delete_post = (id) => {
        fetch(`http://localhost:8088/posts/${id}`, { method: 'DELETE'})
            .then(res => res.json())
            .then(() => {
                history.push("/posts")
            })
        }
        

    
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
                        const foundUser = users.find(user => user.id === post.user_id)
                        const foundCategory = categories.find(category => category.id === post.category_id)

                        return <div><Post
                            key={post.id}
                            postId={post.id}
                            title={post.title}
                            content={post.content}
                            publicationDate={post.publication_date}
                            user={foundUser}
                            category={foundCategory?.label}
                            syncPosts={syncPosts}
                            
                        /> <button onClick={() => {if (confirm('Are you sure you want to delete this post?') == true) delete_post(post.id)}}>Delete</button></div>
                    })
                } 
            </table>
        </>
    )
}
 