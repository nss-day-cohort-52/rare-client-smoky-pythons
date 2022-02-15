import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCategories } from "../../repositories/CategoriesRepository"
import { get_all_users } from "../../repositories/UserRepository"
import {Post} from "./Post"

export const MyPostList = ({posts, syncPosts}) => {
    const [post, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])

    useEffect((
        () => {
            fetch(`http://localhost:8088/posts`)
                .then(res => res.json())
                .then((data) => {
                    setPosts(data)
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

    
    useEffect(() => {
        get_all_users().then(setUsers)
        getCategories().then(setCategories)
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
                    getMyPosts().map(post => {
                        const foundUser = users.find(user => user.id === post.user_id)
                        const foundCategory = categories.find(category => category.id === post.category_id)
                        
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
                     
                            </>
                     ) })
                    }
            </table>
        </>
    )
}

