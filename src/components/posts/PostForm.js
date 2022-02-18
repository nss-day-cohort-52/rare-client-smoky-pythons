import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getCategories } from "../../repositories/CategoriesRepository"
import { PostsRepository } from "../../repositories/PostsRepository"
import { getTags } from "../../repositories/TagsRepository"
import { FetchOptions } from "../utils/FetchOptions"
import "./PostEntry.css"

// 'user', 'category', 'title', 'image_url', 'content', 'tags'


export const PostForm = ({ syncPosts }) => {
    const [categories, updateCategories] = useState([])
    const [tags, setTags] = useState([])
    const [post, updatePost] = useState({ // Declaring State variable
        category: 0,
        title: "",
        image_url: "",
        content: "",
        tags: []
    })

    useEffect(() => {
        getTags().then(setTags)
    }, [])

    const history = useHistory()

    const savePost = (evt) => {
        evt.preventDefault() //a preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
        PostsRepository.add(post)
            .then(syncPosts)
            .then(() => history.push("/posts"))
    }

    useEffect(
        () => {
            fetch(`http://localhost:8000/categories`, FetchOptions())
                .then(res => res.json())
                .then((data) => {
                    updateCategories(data)
                })
        }, []
    )

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

    return (
        <form className="requestForm">

            <h2 className="requestForm__title">New Post</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="postTitle">Title:</label>
                    <input className="input" type="text" placeholder="Enter your title here"
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.title = evt.target.value
                                updatePost(copy)
                            }
                        }></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea className="textarea" placeholder="Enter Content Here"
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.content = evt.target.value
                                updatePost(copy)
                            }
                        }></textarea>

                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image_url">Image URL:</label>
                    <input className="input" placeholder="Enter Image URL here"
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.image_url = evt.target.value
                                updatePost(copy)
                            }
                        } />

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
                                <option key={c.id} value={c.id}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    {
                        tags.map(tag => {
                            return (
                                <label key={tag.id} className="checkbox">
                                    <input value={tag.id} onChange={checkboxOnChange} type="checkbox" />
                                    {tag.label}
                                </label>
                            )
                        })
                    }
                </div>
            </fieldset>
            <button onClick={savePost} className="btn btn-primary" >
                Submit Post!
            </button>
        </form>
    )
}












