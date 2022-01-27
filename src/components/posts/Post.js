import { useEffect, useState } from "react"
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

    const tagsForCurrentPost = getTagsForCurrentPost()

    return (
        <tbody>
            <tr>
                <td id="titleLink" onClick={() => history.push(`/posts/${props.postId}`)}>{props.title}</td>
                <td>{props.user?.first_name} {props.user?.last_name}</td>
                <td>{props.publicationDate}</td>
                <td>{props.category}</td>
                <td>
                    {
                        tagsForCurrentPost.map(tag => {
                            return(
                                <div key={tag.id}>{tag.label}</div>
                            )
                        })
                    }
                </td>
            </tr>
        </tbody>
    )
}