import { useEffect, useState } from "react"
import { getCategories } from "../../repositories/CategoriesRepository"

export const Category_Dropdown = () => {
    const [posts, setPosts] = useState([])
    const [course, setCourse] = useState(0)

    


    useEffect(
        () => {
            getCategories()
            .then(setCategories)
        },
        []
    )

    return (
       <>
          <select className="dropdown" value={0}>
            <option value={0}>Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
       </>
    )
}