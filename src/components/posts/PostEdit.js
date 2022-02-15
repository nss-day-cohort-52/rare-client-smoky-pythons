import { useEffect, useState } from "react"
import { getCategories } from "../../repositories/CategoriesRepository"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getSinglePost } from "../../repositories/PostsRepository"
import { getTags } from "../../repositories/TagsRepository"


export const EditPost = ({ posts, syncPosts }) => {

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [newPost, setNewPost] = useState({
        user_id: post.user_id,
        category_id: post.category_id,
        title: post.title,
        publication_date: post.publication_date,
        content: post.content,
        tags: []
    })
    const history = useHistory()

    const updatePost = (id, updatedPost) => {
        return fetch(`http://localhost:8000/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        })
    }

    useEffect(() => {
        getSinglePost(postId).then(setPost)
    }, [postId])

    const save_update = () => {
        const updatedPost = Object.assign({}, post)
        updatePost(postId, updatedPost)
            .then(() => { syncPosts() })
            .then(() => history.push(`/posts/${postId}`))

    }


    useEffect(() => {
        getTags().then(setTags)
        getCategories().then(setCategories)
    }, [])


    const generateCheckboxes = () => {
        const checkboxes = document.querySelectorAll('input[type=checkbox]')
        for (const tag of post.tags) {
            for (const box of checkboxes) {
                if (tag.id === parseInt(box.value)) {
                    box.checked = true
                }
            }
        }

        return (
            <div className="field">
                <div className="tag-options">
                    {
                        tags.map((tag) => {
                            return <div key={tag.id} className="option">
                                <input className="checkbox" type="checkbox" id={tag.id} name="tags" value={tag.id}
                                    onChange={setPost}>
                                </input>
                                <label className="checkbox-label" htmlFor={tag.id}>{tag.label}</label>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }

    // const displayCheckboxes = generateCheckboxes()

    return (
        <div className="edit-form">
            <b>Edit Post</b>
            <div className="field">Title:</div>
            <input id="title" value={post.title} onChange={
                (evt) => {
                    //creates a copy of post state
                    const copy = { ...post }
                    copy.title = evt.target.value
                    setPost(copy)
                }
            } required autoFocus
                type="text"
                className="form-control" >
            </input>

            <div className="field">Content:</div>
            <textarea id="edit__content" value={post.content} onChange={
                (evt) => {
                    const copy = { ...post }
                    copy.content = evt.target.value
                    setPost(copy)
                }
            } required autoFocus
                type="text"
                className="form-control" >
            </textarea>
            <div className="field">
                <div className="select">
                    <select className="select" name="category_id" id="category_id" value={post.category_id} onChange={(evt) => {
                        const copy = { ...post }
                        copy.category_id = evt.target.value
                        setPost(copy)
                    }}>
                        {
                            categories.map((category) => {
                                return <option key={category.id} value={category.id}>{category.label}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            {/* {displayCheckboxes} */}
            <div className="field">
                <button className="save-button" onClick={save_update}>Save</button>
            </div>

        </div >
    )
}
