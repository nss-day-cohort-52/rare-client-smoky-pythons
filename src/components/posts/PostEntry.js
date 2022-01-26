import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

export const PostForm = () => {
    const [category, updateCategories] = useState([])
    const [post, createPost] = useState({ // Declaring State variable
        user_id: "",
        category_id: 0,
        title: "",
        publication_date: "",
        content: "",
    })


    const history = useHistory()

    const savePost = (evt) => {
        evt.preventDefault() //a preventDefault is called on the event when submitting the form to prevent a browser reload/refresh

        const newPost = {
            user_id: parseInt(localStorage.getItem("token")),
            category_id: parseInt(post.category_id),
            title: post.title,
            publication_date: post.timestamp,
            content: post.content,
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        }

        return fetch("http://localhost:8088/posts", fetchOption)
            .then(() => {
                history.push("/posts") //history.push will navigate the user to the posts route/page
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/categories`)
                .then(res => res.json())
                .then((data) => {
                    updateCategories(data)
                })
        }, []
    )


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
                                createPost(copy)
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
                                createPost(copy)
                            }
                        }></textarea>

                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category Select:</label>
                    <div className="select">
                    <select name="moodId"
                                    proptype="int"
                                    value={post.category_id}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...post }
                                            copy.category_id = evt.target.value
                                            createPost(copy)
                                        }
                                    }>

                                    <option value="0">Select a category</option>
                                    {category.map(c => (
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
                    <input
                        type="checkbox"
                        className="form-control"
                    /> <option value="Test Tag">Test Tag</option>
                </div>
            </fieldset>


            <button onClick={savePost} className="btn btn-primary" >
                Submit Post!
            </button>
        </form>
    )
}












