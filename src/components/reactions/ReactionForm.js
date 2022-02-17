import { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FetchOptions } from "../utils/FetchOptions";

export const ReactionForm = () => {
    const history = useHistory()
    const [reaction, modifyReaction] = useState({
        label: "",
        image_url: ""
    })

    const SubmitReaction = () => {
        const newReaction = {
            label: reaction.label,
            image_url: reaction.image_url
        }
        return fetch(`http://localhost:8000/reactions`, FetchOptions("POST", newReaction))
        .then(modifyReaction(newReaction))
    }

    return (
        <>
        <div className="card">
            <h1 className="label is-medium">New Reaction</h1>
            <div className="description">
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...reaction }
                                copy.label = evt.target.value
                                modifyReaction(copy)
                            }
                        }
                        placeholder="Name of Reaction"
                        type="text"
                        required autoFocus
                        className="input"
                    ></input>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...reaction }
                                copy.image_url = evt.target.value
                                modifyReaction(copy)
                            }
                        }
                        placeholder="Image URL"
                        type="url"
                        required autoFocus
                        className="input"
                    ></input>
                </div>
                <button type="submit" className="button"
                    onClick={
                        () => {
                            SubmitReaction()
                            .then(history.push("/posts"))
                        }
                    }>
                    Submit
                </button>
        </div>
        </>
    )
}