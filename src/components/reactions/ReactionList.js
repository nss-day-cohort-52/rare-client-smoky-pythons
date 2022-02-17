import { useEffect, useState } from "react"
import { createReaction, getReactions } from "../../repositories/ReactionsRepository"
import "./Reactions.css"

export const ReactionList = ({ postId, reactionCount, syncPosts }) => {
    const [reactions, modifyReactions] = useState([])

    useEffect(
        () => {
            getReactions()
                .then(modifyReactions)
        },
        []
    )

    const changePostReactionState = (reactionId) => {
        const reaction = {
            userId: parseInt(localStorage.getItem('token')),
            postId: parseInt(postId),
            reactionId: parseInt(reactionId)
        }
        createReaction(postId, reaction).
            then(syncPosts)
    }
    3
    return (
        <>
            <div className="feed">
                <a className="like-btn">
                    <div>
                        {
                            reactions.map(
                                (reaction) => {
                                    for (const count of reactionCount) {
                                        if (count.label === reaction.label) {
                                            return <div onClick={() => changePostReactionState(reaction.id)} value={reaction.id} key={`reaction__${reaction.id}`} ><img style={{ width: "10%" }} src={reaction.image_url} className="reaction-icon" />{count.count}</div>
                                        }
                                    }
                                }
                            )
                        }
                    </div>
                </a>
            </div>
        </>
    )
}