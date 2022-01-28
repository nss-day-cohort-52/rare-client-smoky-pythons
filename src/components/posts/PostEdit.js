import { useEffect, useState } from "react"
import { Post } from "./Post"
import { Link } from "react-router-dom"
import { getCategories } from "../../repositories/CategoriesRepository"
import { PostTagsRepository } from "../../repositories/PostTagsRepository"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getSinglePost } from "../../repositories/PostsRepository"
import { getTags } from "../../repositories/TagsRepository"


export const EditPost = () => {

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [postTags, setPostTags] = useState([])
    const { postId } = useParams()
    const [post, setPost] = useState({})

    
    const updatePost = (evt) => {

        const updatedPost = {
            userId: parseInt(localStorage.getItem("token")),
            title: post.title,
            content: post.content,
            publicationDate: post.publication_date,
            category: post.category_id,



        }
        return fetch(`http://localhost:8088/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        })
            .then(() => {
                history.push("/posts")
            })
    }

    useEffect(() => {
        getSinglePost(postId).then(setPost)
    }, [postId])


    // useEffect(() => {
    //     let postTags = []
    //     if (post.tags?.length > 0) {
    //         for (const tagId of post.tags) {
    //             postTags.push(tagId)
    //         }
    //         setPostTags(postTags)

    //     }
    // }, [post])

    // const checkTag = (event) => {
    //     let tag_id = parseInt(event.target.value)
    //     let copy = [...postTags]
    //         
    //     }
    

    useEffect(() => {
        getTags().then(setTags)
        getCategories().then(setCategories)
        PostTagsRepository.getAll().then(setPostTags)
    }, [])


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
            <div className="field">
                <button className="save-button" onClick={updatePost}>Save</button>
            </div>

        </div >
    )
}
