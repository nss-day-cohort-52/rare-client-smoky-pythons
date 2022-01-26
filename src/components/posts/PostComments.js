import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { CommentsRepository } from "../../repositories/CommentsRepository"

export const PostComments = () => {
    const history = useHistory()
    const [comments, setComments] = useState([])

    const syncComments = () => {
        CommentsRepository.getAll().then(setComments)
    }

    useEffect(() => {
        syncComments()
    }, [])

    return (
        <>
        <button onClick={() => history.push(`comments/add`)} className="button">Add comment</button>
        {
            comments.map(comment => {
                return (
                    <div>
                        <div>{comment.content}</div>
                        <div></div>
                    </div>
                )
            })
        }
        </>
    )
}