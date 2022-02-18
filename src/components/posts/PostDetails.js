import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams, Link } from "react-router-dom"
import { PostsRepository } from "../../repositories/PostsRepository"
import { ReactionList } from "../reactions/ReactionList"
import "./PostDetails.css"

export const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const history = useHistory()

    const syncPost = () => {
        PostsRepository.getOne(postId)
            .then(setPost)
    }

    useEffect(() => {
        syncPost()
    }, [postId])

    const fullName = `${post.user?.user?.first_name} ${post.user?.user?.last_name}`
    const username = `@${post.user?.user?.username}`
    return (
        <div className="post-detail-container">
            <div className="post-category">{post.category?.label}</div>
            <h2 className="subtitle post-title">{post.title}</h2>
            <div className="author-and-tags">
                <div><Link to={`/users/${post.user?.id}`}>{fullName}</Link></div>
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
            <div className="post-detail-btn-container">
                <ReactionList postId={postId} post={post} reactionCount={post.reactions} syncPost={syncPost} />
                {
                    post.is_owner
                        ?
                        <button onClick={() => history.push(`/editPost/${postId}`)} className="button">Manage tags</button>
                        : null
                }
                <button onClick={() => history.push(`${postId}/comments`)} className="button">View comments</button>
            </div>
        </div>
    )
}