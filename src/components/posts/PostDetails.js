import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams, Link } from "react-router-dom"
import { PostsRepository } from "../../repositories/PostsRepository"
import "./PostDetails.css"

export const PostDetails = ({ posts, syncPosts }) => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const history = useHistory()

useEffect(() => {
    PostsRepository.getOne(postId).then(setPost)
}, [postId])

const username = post.user?.user?.username

return (
    <div className="post-detail-container">
        <div className="post-category">{post.category?.label}</div>
        <h2 className="subtitle post-title">{post.title}</h2>
        <div className="author-and-tags">
            <div><Link to={`/users/${post.user?.id}`}>{username}</Link></div>
            <div className="tags-container">
                {
                    post.tags?.map(tag => {
                        return <div key={tag.id}>{tag.label}</div>
                    })
                }
            </div>
        </div>
        <div>{post.publication_date}</div>
        <div className="card">
            <div className="card-content">
                <div className="content">
                    {post.content}
                </div>
            </div>
        </div>
        <button onClick={() => history.push(`${postId}/comments`)} className="button">View comments</button>
        <button onClick={() => history.push(`${postId}/tags/manage`)} className="button">Manage tags</button>
    </div>
)
}