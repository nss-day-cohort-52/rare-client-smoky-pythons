import React, { useState,useEffect } from "react"
import {get_all_users,get_single_user} from "../../repositories/UserRepository"
import {getUserSubs,addToSubList,deleteSubscription} from "../../repositories/SubscriptionsRepository"
import {useParams, useHistory } from "react-router-dom"
import {Link} from "react-router-dom"

export const UserDetails = () => {
    const [user, setUser] = useState({})
    const  {user_id}  = useParams()
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("token"))
    const [subs, setSubs] = useState({})
    
    
    useEffect(() => {
        get_single_user(user_id)
            .then(setUser)
            getUserSubs(currentUser).then(setSubs)
    }, [])

    const subObj = {
        followerId: currentUser,
        authorId: user.id,
        createdOn: Date.now()
    }
    

    return (
        <section className="user">
            <h3 className="user__username">{user.username}</h3>
            <div className="user__name">{user.first_name} {user.last_name}</div>
            <div className="user__date">Joined: {user.created_on}</div>
            <div className="user__bio">Bio: {user.bio}</div>
            <div className="user__sub"> {`${subs.author_id}` == `${parseInt(user_id)}` ? <button className="btn-sub" onClick={() => addToSubList(subObj).then(() => history.push("/"))}>Subscribe</button> : null } </div>
            <div className="user__sub"> {`${currentUser}` == `${subs.follower_id}` ? <button className="btn-sub" onClick={() => deleteSubscription().then(() => history.push("/"))}>Unsubscribe</button> : null } </div>
        </section>
    )
}