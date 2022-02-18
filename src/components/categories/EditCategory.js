import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getCategoryById } from "../../repositories/CategoriesRepository"
import { FetchOptions } from "../utils/FetchOptions"

export const EditCategory = () => {
    const {CategoryId} = useParams()
    const history = useHistory()
    const [category, modifyCategory] = useState({
        label: ""
    })

    useEffect(
        () => {
            getCategoryById(CategoryId)
            .then(category => modifyCategory(category))
        },
        [CategoryId]
    )

    const changeCategoryState = (event) => {
        const copy = {...category}
        const key = event.target.name
        const value = event.target.value
        copy[key] = value
        modifyCategory(copy)
    }

    const updatedCategory = (event) => {
        event.preventDefault()
        const updatedCategory = {
            label: category.label
        }
        fetch(`http://localhost:8000/categories/${CategoryId}`, FetchOptions("PUT", updatedCategory))
        .then(
            () => {
                history.push(`/categories`)
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
                value={category.label}
                onChange={changeCategoryState}
                />
            </div>
            <button onClick = {
                    (evt) => {
                        updatedCategory(evt)
                    }
                }>
                Save
            </button>
        </form>
    )
}