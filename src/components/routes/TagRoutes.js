import { Route } from "react-router-dom"
import { EditTags } from "../tags/EditTags"
import { TagList } from "../tags/TagList"

export const TagRoutes = () => {
    return (
        <>
            <Route exact path="/tags">
                <TagList />
            </Route>
            <Route exact path="/tags/edit/:TagId(\d+)">
                <EditTags />
            </Route>
        </>
    )
}