import React, { useState, useEffect } from "react"
import { getCurrentUser, getSingleUser } from "../../repositories/UserRepository"
import { getUserSubs, addToSubList, deleteSubscription } from "../../repositories/SubscriptionsRepository"
import { useParams, useHistory } from "react-router-dom"

export const UserDetails = () => {
    const { userId } = useParams()
    const history = useHistory()
    const [selectedUser, setSelectedUser] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [subs, setSubs] = useState([])
    
    
    useEffect(() => {
        getCurrentUser().then(setCurrentUser)
        getSingleUser(userId)
            .then(setSelectedUser)
        getUserSubs()
            .then(setSubs)
    }, [])

    const subObj = {
        follower_id: currentUser.user?.id,
        author_id: selectedUser.user?.id,
    }

    const findSub = () => {
        const foundSub = subs.find(s => s.author == selectedUser)
        return foundSub
    }
    const foundSub = findSub()
    console.log(foundSub)
    return (
        <section className="user">
            <h3 className="user__username">{selectedUser.user?.username}</h3>
            <div className="user__name">{selectedUser.user?.first_name} {selectedUser.user?.last_name}</div>
            <div className="user__date">Joined: {selectedUser.created_on}</div>
            <div className="user__bio">Bio: {selectedUser.bio}</div>
            <div className="user__sub">{`${currentUser}` != `${selectedUser}` ? `${foundSub?.follower?.id}` == `${currentUser}` ? null : <button className="btn-sub" onClick={() => addToSubList(subObj).then(() => history.push("/"))}>Subscribe</button> : null}</div>
            <div className="user__sub"> {`${currentUser}` == `${foundSub?.follower}` ? <button className="btn-sub" onClick={() => deleteSubscription(foundSub?.id).then(() => history.push("/"))}>Unsubscribe</button> : null}</div>
        </section>
    )
}