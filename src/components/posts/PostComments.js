import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { CommentsRepository } from "../../repositories/CommentsRepository"
import { get_all_users } from "../../repositories/UserRepository"
import { Settings } from "../utils/Settings"

export const PostComments = () => {
    const history = useHistory()
    const [comments, setComments] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        get_all_users().then(setUsers)
    }, [])

    const syncComments = () => {
        CommentsRepository.getAll().then(setComments)
    }

    useEffect(() => {
        syncComments()
    }, [])

    const handleDeleteComment = (id) => {
        CommentsRepository.delete(id).then(syncComments)
    }

    return (
        <>
            <button onClick={() => history.push(`comments/add`)} className="button">Add comment</button>
            {
                comments?.map(comment => {
                    const foundUser = users.find(user => user.id === comment.author_id)
                    const userFullName = `${foundUser?.first_name} ${foundUser?.last_name}`
                    return (
                        <div key={comment.id}>
                            <div>{comment.content}</div>
                            <div>Commented by: {userFullName}</div>
                            <div><button onClick={() => handleDeleteComment(comment.id)} className="button">Delete</button></div>
                            --------------------------------------
                        </div>
                    )
                })
            }
        </>
    )
}