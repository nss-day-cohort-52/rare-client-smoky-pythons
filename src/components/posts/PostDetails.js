import { useParams, Link } from "react-router-dom"
import { useState,useEffect } from "react"
import {get_all_users} from "../../repositories/UserRepository"
import "./PostDetails.css"
export const PostDetails = ({ posts, syncPosts }) => {
    const { postId } = useParams()
    const [users,setUsers] = useState([])

    const foundPost = posts.find(p => p.id === parseInt(postId))
    const foundUser= users.find(u => u.id === foundPost?.user_id )
   
    const syncUsers = () => { 
        get_all_users().then(setUsers)
    }

    useEffect(() => {
        syncUsers()
    }, [])

    return (
        <div className="post-detail-container">
            <div className="post-category">category goes here</div>
            <h2 className="subtitle post-title">{foundPost?.title}</h2>
            <div className="author-and-tags">
                <div><Link to={`/users/${foundUser?.id}`}>{foundUser?.username}</Link></div>
                <button className="button">View comments</button>
                <div className="tags-container">
                    {/* Here we can map over all the tags tied to this specific post */}
                    <div>Tags go here</div>
                    <div>Tags go here</div>
                    <div>Tags go here</div>
                </div>
            </div>
            <div>{foundPost?.publication_date}</div>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        {foundPost?.content}
                    </div>
                </div>
            </div>
        </div>
    )
}