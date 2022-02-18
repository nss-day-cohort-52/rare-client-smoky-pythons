import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCategories } from "../../repositories/CategoriesRepository";
import { CategoryForm } from "./CategoryForm";


export const CategoryList = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const syncCategories = () => {
        getCategories()
            .then(setCategories)
    }

    useEffect(() => {
        syncCategories()
    },
        [])

    const DeleteCategory = (id) => {
        fetch(`http://localhost:8000/categories/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(syncCategories)
    }

    return (
        <>
            <div className="is-flex is-align-content-space-evenly">
                <div className="section">
                    {
                        categories.map(category => {
                            return <div key={category.id}>
                                <p className="subtitle is-size-5-desktop" >{category.label}</p>
                                <div>
                                    <button
                                        style={{marginRight: "15px"}}
                                        className="button"
                                        onClick={
                                            () => {
                                                history.push(`/categories/edit/${category.id}`)
                                            }
                                        }
                                    >Edit</button>
                                    <button
                                        className="button"
                                        onClick={
                                            () => {
                                                DeleteCategory(parseInt(category.id))
                                            }
                                        }
                                    >Delete</button>
                                </div>
                            </div>

                        })
                    }

                </div>
                <div className="section">
                    <CategoryForm syncCategories={syncCategories} />
                </div>
            </div>
        </>
    )
}