import { Route } from "react-router-dom"
import { CategoryList } from "../categories/CategoryList"
import { EditCategory } from "../categories/EditCategory"

export const CategoryRoutes = () => {
    return (
        <>
            <Route exact path="/categories">
                <CategoryList />
            </Route>
            <Route exact path="/categories/edit/:CategoryId(\d+)">
                <EditCategory />
            </Route>
        </>
    )

}