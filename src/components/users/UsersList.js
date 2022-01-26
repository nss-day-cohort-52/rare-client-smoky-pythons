import React, { useState,useEffect } from "react"
import {get_all_users} from "../../repositories/UserRepository"
import { useHistory } from "react-router-dom"

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
        <div>
            <h1>Users</h1>
            <article className="users">
                {
                    users.map(user => {
                        return <section className="user" key={user.id}>
                                <h3>{user.username}</h3>
                        </section>
                    })
                }
            </article>
        </div>
    )
}