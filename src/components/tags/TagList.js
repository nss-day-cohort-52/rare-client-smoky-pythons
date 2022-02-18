import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getTags } from "../../repositories/TagsRepository";
import { TagForm } from "./TagForm";


export const TagList = () => {
    const history = useHistory()
    const [tags, setTags] = useState([])
    const syncTags = () => {
        getTags()
            .then(setTags)
    }

    useEffect(() => {
        syncTags()
    },
        [])

    const DeleteTag = (id) => {
        fetch(`http://localhost:8000/tags/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(syncTags)
    }

    return (
        <>
            <div className="is-flex is-align-content-space-evenly">
                <div className="section">
                    {
                        tags.map(tag => {
                            return <div key={tag.id}>
                                <p className="subtitle is-size-5-desktop" >{tag.label}</p>
                                <div>
                                    <button
                                        style={{ marginRight: "15px" }}
                                        className="button"
                                        onClick={
                                            () => {
                                                history.push(`/tags/edit/${tag.id}`)
                                            }
                                        }
                                    >Edit</button>
                                    <button
                                        className="button"
                                        onClick={
                                            () => {
                                                DeleteTag(parseInt(tag.id))
                                            }
                                        }
                                    >Delete</button>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="section" >
                    <TagForm syncTags={syncTags} />
                </div>
            </div>
        </>
    )
}