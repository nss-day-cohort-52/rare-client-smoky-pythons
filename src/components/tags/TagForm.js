import { useState } from "react"
import { FetchOptions } from "../utils/FetchOptions";

export const TagForm = ({ syncTags }) => {
    const [tag, modifyTag] = useState({
        label: ""
    })

    const SubmitTag = () => {
        const newTag = {
            label: tag.label
        }
        return fetch(`http://localhost:8000/tags`, FetchOptions("POST", newTag))
            .then(syncTags)
            // .then(modifyTag(newTag))
            .then(modifyTag({ label: "" }))
    }

    // const emptyLabel = {label: ""}

    return (
        <>
            <div className="card">
                <h1 className="label is-medium">New Tag</h1>
                <div className="description">
                    <input
                        value={tag.label}
                        onChange={
                            (evt) => {
                                const copy = { ...tag }
                                copy.label = evt.target.value
                                modifyTag(copy)
                            }
                        }
                        placeholder="Name of Tag"
                        type="text"
                        required autoFocus
                        className="input"
                    ></input>
                </div>
                <button type="submit" className="button"
                    onClick={
                        () => {
                            SubmitTag()
                        }
                    }>
                    Submit
                </button>
            </div>
        </>
    )
}