import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Post.css"

export const Post = (props) => {
    const history = useHistory()

    const delete_post = (id) => {
        fetch(`http://localhost:8000/posts/${id}`, { method: 'DELETE' })
            // .then(res => res.json())
            .then(() => {
                history.push("/posts")
            })
            .then(() => props.syncPosts())
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
                            props.tags.map(tag => {
                                return (
                                    <div key={tag.id}>{tag.label}</div>
                                )
                            })
                        }
                    </td>
                    <td><button onClick={() => { if (confirm('Are you sure you want to delete this post?') == true) delete_post(props.postId) }}>Delete</button></td>
                    <td><button onClick={() => { history.push(`/editPost/${props.postId}`) }}>Edit</button></td>
                </tr>
            </tbody>
        </>
    )
}

