import { useState,useEffect } from "react"
import {get_all_users,get_single_user} from "../../repositories/UserRepository"
import { useHistory } from "react-router-dom"
import {Link} from "react-router-dom"

export const UsersList = () => {
    const [users, setUsers] = useState([])
    const history = useHistory()

    const syncUsers = () => { 
        get_all_users().then(setUsers)
    }

    useEffect(() => {
        syncUsers()
    }, [])

  return (
        <div className="card">
            <h1 className="label is-large">Users</h1>
            <article className="users">
                {
                    users.map(user => {
                        return <section className="user is-size-5-desktop" key={user.id}>
                                <Link to={`/users/${user.id}`} >
                                   <h3>{user.first_name} {user.last_name} ({user.username})</h3>
                                </Link>
                        </section>
                    })
                }
            </article>
        </div>
    )
}