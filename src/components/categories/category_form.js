import { useState } from "react"
import { FetchOptions } from "../utils/FetchOptions";

export const CategoryForm = ({syncCategories}) => {
    const [category, modifyCategory] = useState({
        label: ""
    })

    const SubmitCategory = () => {
        const newCategory = {
            label: category.label
        }
        return fetch(`http://localhost:8000/categories`, FetchOptions("POST", newCategory))
        .then(syncCategories)
        .then(modifyCategory(newCategory))
    }

    // const emptyLabel = {label: ""}

    return (
        <>
        <div className="card">
            <h1 className="label is-medium">New Category</h1>
            <div className="description">
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...category }
                                copy.label = evt.target.value
                                modifyCategory(copy)
                            }
                        }
                        placeholder="Name of Category"
                        type="text"
                        required autoFocus
                        className="input"
                    ></input>
                </div>
                <button type="submit" className="button"
                    onClick={
                        () => {
                            SubmitCategory()
                        }
                    }>
                    Submit
                </button>
        </div>
        </>
    )
}