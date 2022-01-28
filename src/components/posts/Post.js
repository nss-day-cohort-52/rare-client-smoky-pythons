import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { PostTagsRepository } from "../../repositories/PostTagsRepository"
import { getTags } from "../../repositories/TagsRepository"
import "./Post.css"

export const Post = (props) => {
    const history = useHistory()
    const [postTags, setPostTags] = useState([])
    const [tags, setTags] = useState([])

    useEffect(() => {
        PostTagsRepository.getAll().then(setPostTags)
        getTags().then(setTags)
    }, [])

    const getTagsForCurrentPost = () => {
        let arr = []
        for (const tag of tags) {
            for (const postTag of postTags) {
                if (tag.id === postTag.tag_id && props.postId === postTag.post_id) {
                    arr.push(tag)
                }
            }
        }
        return arr
    }

    const delete_post = (id) => {
        fetch(`http://localhost:8088/posts/${id}`, { method: 'DELETE' })
            // .then(res => res.json())
            .then(() => {
                history.push("/posts")
            })
            .then(() => props.syncPosts())
    }

    const tagsForCurrentPost = getTagsForCurrentPost()

    return (
        <>
            <tbody>
                <tr>
                    <td id="titleLink" onClick={() => history.push(`/posts/${props.postId}`)}>{props.title}</td>
                    <td>{props.user?.first_name} {props.user?.last_name}</td>
                    <td>{props.publicationDate}</td>
                    <td>{props.category?.label}</td>
                    <td>
                        {
                            tagsForCurrentPost.map(tag => {
                                return (
                                    <div key={tag.id}>{tag.label}</div>
                                )
                            })
                        }
                    </td>
                    <td><button onClick={() => { if (confirm('Are you sure you want to delete this post?') == true) delete_post(props.postId) }}>Delete</button></td>
                    <button onClick={() => { history.push(`/editPost/${props.postId}`) }}>edit</button>
                </tr>
            </tbody>
        </>
    )
}

