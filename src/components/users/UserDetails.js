import React, { useState,useEffect } from "react"
import {get_all_users,get_single_user} from "../../repositories/UserRepository"
import {useParams, useHistory } from "react-router-dom"
import {Link} from "react-router-dom"

export const UserDetails = () => {
    const [user, setUser] = useState({})
    const { user_id } = useParams()
    const history = useHistory()
    
    useEffect(() => {
        get_single_user(user_id)
            .then(setUser)
    }, [])

    return (
        <section className="user">
            <h3 className="user__username">{user.username}</h3>
            <div className="user__firstname">{user.first_name} {user.last_name}</div>
            <div className="user__date">Joined: {user.created_on}</div>
            <div className="user__bio">Bio: {user.bio}</div>
        </section>
    )
}