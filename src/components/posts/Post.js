import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Post.css"
import { PostsRepository } from "../../repositories/PostsRepository.js"
import { ReactionList } from "../reactions/ReactionList.js"
export const Post = (props) => {
    const history = useHistory()

    const deletePost = (id) => {
        PostsRepository.delete(id)
            .then(() => history.push("/posts"))
            .then(props.syncPosts)
    }

    return (
        <>
            <tbody >
                <tr className="container is-widescreen mt-3">
                    <td id="titleLink" onClick={() => history.push(`/posts/${props.postId}`)}>{props.title}</td>
                    <td>{props.user?.first_name} {props.user?.last_name}</td>
                    <td>{props.publicationDate}</td>
                    <td>{props.category?.label}</td>
                    <td>
                        {
                            props.tags?.map(tag => {
                                return (
                                    <div key={tag.id}>{tag.label}</div>
                                )
                            })
                        }
                    </td>
                    <td>
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this post?') == true)
                                    deletePost(props.postId)
                            }
                            }>Delete</button>
                    </td>
                    <td>
                        <button
                            onClick={() => {
                                history.push(`/editPost/${props.postId}`)
                            }}>Edit</button>
                    </td>
                </tr>
            </tbody>
        </>
    )
}

