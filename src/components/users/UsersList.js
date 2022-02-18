import { useState,useEffect } from "react"
import {getAllUsers} from "../../repositories/UserRepository"
import {Link} from "react-router-dom"

export const UsersList = () => {
    const [users, setUsers] = useState([])

    const syncUsers = () => { 
        getAllUsers().then(setUsers)
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
                                   <h3>{user.user?.first_name} {user.user?.last_name} ({user.user?.username})</h3>
                                </Link>
                        </section>
                    })
                }
            </article>
        </div>
    )
}