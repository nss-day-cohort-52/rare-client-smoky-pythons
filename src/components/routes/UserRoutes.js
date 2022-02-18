import { Route } from "react-router-dom"
import { UserDetails } from "../users/UserDetails"
import { UsersList } from "../users/UsersList"

export const UserRoutes = () => {
    return (
        <>
            <Route exact path="/users">
                <UsersList />
            </Route>

            <Route path="/users/:userId(\d+)">
                <UserDetails />
            </Route>
        </>
    )
}