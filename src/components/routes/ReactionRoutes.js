import { Route } from "react-router-dom"
import { ReactionForm } from "../reactions/ReactionForm"

export const ReactionRoutes = () => {
    return (
        <Route exact path="/newReaction">
            <ReactionForm />
        </Route>
    )
}