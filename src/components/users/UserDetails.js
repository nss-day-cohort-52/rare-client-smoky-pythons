import React, { useState, useEffect } from "react"
import { getCurrentUser, getSingleUser, subscribe, unSubscribe } from "../../repositories/UserRepository"
import { useParams } from "react-router-dom"

export const UserDetails = () => {
    const { userId } = useParams()
    const [selectedUser, setSelectedUser] = useState({})
    const [currentUser, setCurrentUser] = useState({})


    const syncUser = () => {
        getSingleUser(userId)
            .then(setSelectedUser)
        }
        
        useEffect(() => {
        getCurrentUser().then(setCurrentUser)
        syncUser()
    }, [])

    const handleSubscribeEvent = () => {
        const subObj = {
            follower: currentUser.id,
            author: selectedUser.id
        }
        if (selectedUser.is_followed) {
            unSubscribe(userId)
                .then(syncUser)
        }
        else {
            subscribe(userId, subObj)
                .then(syncUser)
        }
    }

    const generateSubscribeButton = () => {
        if (currentUser.user?.id !== selectedUser.user?.id) {
            if (selectedUser.is_followed) {
                return <button onClick={handleSubscribeEvent} className="button">Unsubscribe</button>
            }
            else {
                return <button onClick={handleSubscribeEvent} className="button">Subscribe</button>
            }
        }
        else {
            return ""
        }
    }
    const displaySubscribeButton = generateSubscribeButton()

    return (
        <section className="user">
            <div className="user__name">{selectedUser.user?.first_name} {selectedUser.user?.last_name}</div>
            <h3 className="user__username">{`@${selectedUser.user?.username}`}</h3>
            <div className="user__date">Joined: {selectedUser.created_on}</div>
            <div className="user__bio">Bio: {selectedUser.bio}</div>
            <div className="user__sub-count"># of subscribers: {selectedUser.subscriber_count}</div>
            {displaySubscribeButton}
        </section>
    )
}