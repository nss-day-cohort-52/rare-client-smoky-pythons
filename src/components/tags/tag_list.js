import React, { useEffect, useState } from "react";
import { getTags } from "../../repositories/TagsRepository";
import { TagForm } from "./tag_form";


export const TagList = () => {
    const [tags, setTags] = useState([])
    const syncTags = () => {
        getTags()
            .then(setTags)
    }

    useEffect(() => {
        syncTags()
    },
        [])

    return (
        <>
        <div className="is-flex is-align-content-space-evenly">
            <div className="section">
            {
                tags.map(tag => {
                   return <p className="subtitle is-size-5-desktop" key={tag.id}>{tag.label}</p>
                })
            }
            </div>
            <div className="section" >
            <TagForm syncTags={syncTags}/>
            </div>
            </div>
        </>
    )
}