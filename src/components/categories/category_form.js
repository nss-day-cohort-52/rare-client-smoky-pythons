import { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const CategoryForm = ({setCategories}) => {
    const [category, modifyCategory] = useState({
        label: ""
    })

    const SubmitCategory = () => {
        const newCategory = {
            label: category.label
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategory)
        }
        return fetch(`http://localhost:8088/categories`, fetchOption)
        .then(setCategories)
    }

    return (
        <>
        <div>
            <h1>New Category</h1>
            <div className="description">
                    <label>Category Name: </label>
                    <textarea
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
                    ></textarea>
                </div>
                <button type="submit" className="form__submit"
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