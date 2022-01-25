import React, { useEffect, useState } from "react";
import { CategoryForm } from "./category_form";
import { getCategories } from "./category_manager";

export const CategoryList = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
            .then(setCategories)
    },
        [])

    return (
        <>
            {
                categories.map(category => {
                   return <p key={category.id}>{category.label}</p>
                })
            }
            <CategoryForm setCategories={setCategories}/>
        </>
    )
}