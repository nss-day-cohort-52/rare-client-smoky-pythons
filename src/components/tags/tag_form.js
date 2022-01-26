import { useState } from "react"

export const TagForm = ({syncTags}) => {
    const [tag, modifyTag] = useState({
        label: ""
    })

    const SubmitTag = () => {
        const newTag = {
            label: tag.label
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTag)
        }
        return fetch(`http://localhost:8088/tags`, fetchOption)
        .then(syncTags)
        .then(modifyTag(newTag))
    }

    // const emptyLabel = {label: ""}

    return (
        <>
        <div>
            <h1>New Tag</h1>
            <div className="description">
                    <label>Tag Name: </label>
                    <input
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
                <button type="submit" className="form__submit"
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