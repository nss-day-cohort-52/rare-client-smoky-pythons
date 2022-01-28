import { useEffect, useState } from "react"
import { Post } from "./Post"
import { Link } from "react-router-dom"
import { getCategories } from "../../repositories/CategoriesRepository"
import { PostTagsRepository } from "../../repositories/PostTagsRepository"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"


export const EditPost = () => {

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [postTags, setPostTags] = useState([])
    const { postId } = useParams()
    const [post, setPost] = useState({})

    const getSinglePost = (id) => {
        return fetch(`http://localhost:8088/posts/${id}`)
            .then(res => res.json())
    }
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

    useEffect(() => {
        getCategories()
            .then(setCategories)
    },
        []
    )
    const get_all_tags = () => {
        return fetch("http://localhost:8088/tags")
            .then(res => res.json())
    }

    useEffect(() => {
        let postTags = []
        if (post.tags?.length > 0) {
            for (const tagId of post.tags) {
                postTags.push(tagId)
            }
            setPostTags(postTags)

        }
    }, [post])

    const checkTag = (event) => {
        let tag_id = parseInt(event.target.value)
        let copy = [...postTags]
        let selectedTag = copy.find((tag) => tag === tag_id)
        if (selectedTag) {
            let newCopy = copy.filter((id) => id !== tag_id)
            setPostTags(newCopy)
        } else {
            copy.push(tag_id)
            setPostTags(copy)
        }
    }

    useEffect(() => {
        get_all_tags().then(setTags)
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
                <button className="saveEdit-btn" onClick={updatePost}>Save</button>
            </div>

        </div >
    )
}
