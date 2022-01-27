import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export const MyPostList = () => {
    const [posts, setPosts] = useState([])
    const [myPosts, setMyPosts] = useState([])
    const [categories, setCategories] = useState([])
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

    const getMyPosts = () => {
        let myPosts = []
        const user = parseInt(localStorage.getItem("token"))
        for (const post of posts) {
            if (parseInt(post.user_id) === user) {
                myPosts.push(post)
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
                    getMyPosts().map(post => {
                        const foundCategory = categories.find(category => category.id === post.categoryId)
                        return <div key={post.id} className='my_post'>
                            <div>{post.title}</div>
                            <div>{post.publication_date}</div>
                            <div>{post.content}</div>
                            <div>{post.user_id?.name}</div>
                            <div>{foundCategory}</div>


                            <button onClick={() => { if (confirm('Are you sure you want to delete this post?') == true) delete_post(post.id) }}>Delete</button></div>
                    })
                }
            </table>
        </>
    )
}

// We still need to fetch users and categories from the server
// const foundUser = users.find(user => user.id === post.userId)
// const foundCategory = categories.find(category => category.id === post.categoryId)
// post.user_id === parseInt(localStorage.getItem("token").map(foundPost)