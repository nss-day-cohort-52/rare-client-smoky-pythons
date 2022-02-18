import { useEffect, useState } from "react"
import { getCategories } from "../../repositories/CategoriesRepository"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getSinglePost, PostsRepository } from "../../repositories/PostsRepository"
import { getTags } from "../../repositories/TagsRepository"


export const PostEdit = ({ posts, syncPosts }) => {

    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const { postId } = useParams()
    const [post, updatePost] = useState({
        category: 0,
        title: "",
        image_url: "",
        content: "",
        tags: []
    })

    useEffect(() => {
        getTags().then(setTags)
        getCategories().then(setCategories)
        getSinglePost(postId).then(post => {
            updatePost({
                category: post.category,
                title: post.title,
                image_url: post.image_url,
                content: post.content,
                tags: post.tags
            })
        })
    }, [postId])

    const SubmitEdit = (event) => {
        event.preventDefault()

        PostsRepository.update(postId, post)
            .then(syncPosts)
            .then(() => history.push(`/posts`))

    }


    const checkboxOnChange = () => {
        const checkboxes = document.querySelectorAll('input[type=checkbox]')
        const copy = { ...post }
        let tagsArr = []
        for (const box of checkboxes) {
            if (box.checked) {
                tagsArr.push(parseInt(box.value))
            }
        }
        copy.tags = tagsArr
        updatePost(copy)
    }

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
                                    onChange={checkboxOnChange}>
                                </input>
                                <label className="checkbox-label" htmlFor={tag.id}>{tag.label}</label>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }

    const displayCheckboxes = generateCheckboxes()

    return (
        <form className="requestForm">

            <h2 className="requestForm__title">New Post</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="postTitle">Title:</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter your title here"
                        value={post.title}
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.title = evt.target.value
                                updatePost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        className="textarea"
                        placeholder="Enter Content Here"
                        value={post.content}
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.content = evt.target.value
                                updatePost(copy)
                            }}>
                    </textarea>

                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image_url">Image URL:</label>
                    <input
                        className="input"
                        placeholder="Enter Image URL here"
                        value={post.image_url}
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.image_url = evt.target.value
                                updatePost(copy)
                            }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="select">
                        <select name="category"
                            proptype="int"
                            value={post.category}
                            onChange={
                                (evt) => {
                                    const copy = { ...post }
                                    copy.category = parseInt(evt.target.value)
                                    updatePost(copy)
                                }
                            }>

                            <option value="0">Select a category</option>
                            {categories.map(c => (
                                <option key={c.id} value={post.category}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    {displayCheckboxes}
                </div>
            </fieldset>
            <button onClick={SubmitEdit} className="btn btn-primary" >
                Submit Post!
            </button>
        </form>
    )
}
