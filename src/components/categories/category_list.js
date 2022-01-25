import React, { useEffect, useState } from "react";
import { getCategories } from "../../repositories/CategoriesRepository";
import { CategoryForm } from "./category_form";

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
            {
                categories.map(category => {
                   return <p key={category.id}>{category.label}</p>
                })
            }
            <CategoryForm syncCategories={syncCategories}/>
        </>
    )
}