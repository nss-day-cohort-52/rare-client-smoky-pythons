import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getTagById } from "../../repositories/TagsRepository"
import { FetchOptions } from "../utils/FetchOptions"

export const EditTags = () => {
    const {TagId} = useParams()
    const history = useHistory()
    const [tag, modifyTag] = useState({
        label: ""
    })

    useEffect(
        () => {
            getTagById(TagId)
            .then(tag => modifyTag(tag))
        },
        [TagId]
    )

    const changeTagState = (event) => {
        const copy = {...tag}
        const key = event.target.name
        const value = event.target.value
        copy[key] = value
        modifyTag(copy)
    }

    const updatedTag = (event) => {
        event.preventDefault()
        const updatedTag = {
            label: tag.label
        }
        fetch(`http://localhost:8000/tags/${TagId}`, FetchOptions("PUT", updatedTag))
        .then(
            () => {
                history.push(`/tags`)
            }
        )
    }

    return (
        <form>
            <div>
                <input
                type="text"
                required autoFocus
                name="label"
                value={tag.label}
                onChange={changeTagState}
                />
            </div>
            <button onClick = {
                    (evt) => {
                        updatedTag(evt)
                    }
                }>
                Save
            </button>
        </form>
    )
}