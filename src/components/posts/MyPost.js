import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import {Post} from "./Post"

export const MyPostList = ({posts, syncPosts}) => {
    const [post, setPosts] = useState([])
    const [myPosts, setMyPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const history = useHistory()

    useEffect((
        () => {
            fetch(`http://localhost:8088/posts`)
                .then(res => res.json())
                .then((data) => {
                    setPosts(data)
                })
        }
    ), [])
    useEffect((
        () => {
            fetch(`http://localhost:8088/users`)
                .then(res => res.json())
                .then((data) => {
                    setUsers(data)
                })
        }
    ), [])
    useEffect((
        () => {
            fetch(`http://localhost:8088/categories`)
                .then(res => res.json())
                .then((data) => {
                    setCategories(data)
                })
        }
    ), [])

    const getMyPosts = () => {
        let myPosts = []
        const user = parseInt(localStorage.getItem("token"))
        for (const myPost of post) {
            if (parseInt(myPost.user_id) === user) {
                myPosts.push(myPost)
            }
        }
        return myPosts
    }


    const delete_post = (id) => {
        fetch(`http://localhost:8088/posts/${id}`, { method: 'DELETE' })
            .then(res => res.json())
           
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
                        <th>Category</th>
                        <th>Tags</th>
                      
                    </tr>
                </thead>
                {
                    getMyPosts().map(post => {
                        const foundUser = users.find(user => user.id === post.userId)
                        const foundCategory = categories.find(category => category.id === post.categoryId)
                        
                        return (
                            <>
                            <Post
                                key={post.id} 
                                postId={post.id} 
                                title={post.title}
                                content={post.content}
                                publicationDate={post.publication_date}
                                user={foundUser}
                                category={foundCategory}
                                syncPosts={syncPosts}
                                
                                />
                     {/* <button>Edit</button>
                     <button onClick={() => { if (confirm('Are you sure you want to delete this post?') == true) delete_post(post.id) }}>Delete</button></div> */}
                            </>
                     ) })
                    }
            </table>
        </>
    )
}

