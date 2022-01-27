import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getTags } from "../../repositories/TagsRepository"
import "./PostDetails.css"

export const PostDetails = ({ posts, syncPosts }) => {
    const { postId } = useParams()
    const history = useHistory()


    const foundPost = posts.find(p => p.id === parseInt(postId))
    return (
        <div className="post-detail-container">
            <div className="post-category">category goes here</div>
            <h2 className="subtitle post-title">{foundPost?.title}</h2>
            <div className="author-and-tags">
                <div>Author goes here</div>
                <button onClick={() => history.push(`${postId}/comments`)} className="button">View comments</button>
                <div className="tags-container">
                    {
                    //   tags.map
                    }
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