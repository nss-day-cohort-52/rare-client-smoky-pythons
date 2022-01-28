import React, { useEffect, useState } from "react";
import { getCategories } from "../../repositories/CategoriesRepository";
import { CategoryForm } from "./category_form";
import "./category.css"

export const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const syncCategories = () => {
        getCategories()
            .then(setCategories)
    }

    useEffect(() => {
        syncCategories()
    },
        [])

    return (
        <>
        <div className="is-flex is-align-content-space-evenly">
        <div className="section">
            {
                categories.map(category => {
                   return <p  className="subtitle is-size-5-desktop" key={category.id}>{category.label}</p>
                })
            }
            </div>
            <div className="section">
            <CategoryForm syncCategories={syncCategories}/>
            </div>
            </div>
        </>
    )
}