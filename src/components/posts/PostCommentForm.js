import { useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { CommentsRepository } from "../../repositories/CommentsRepository"

export const PostCommentForm = () => {
    const history = useHistory()
    const { postId } = useParams()
    const [comment, updateComment] = useState({
        authorId: 0,
        postId: 0,
        content: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        comment.authorId = parseInt(localStorage.getItem("token"))
        comment.postId = parseInt(postId)
        CommentsRepository.add(comment)
            .then(() => history.push(`/posts/${postId}/comments`))
    }

    return (
        <>
            <textarea className="textarea" placeholder="Type your comment here!"
                onChange={(event) => {
                    const copy = { ...comment }
                    copy.content = event.target.value
                    updateComment(copy)
                }}></textarea>
            <button className="button" onClick={handleSubmit}>Submit</button>
        </>
    )
}