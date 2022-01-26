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
            {
                tags.map(tag => {
                   return <p key={tag.id}>{tag.label}</p>
                })
            }
            <TagForm syncTags={syncTags}/>
        </>
    )
}