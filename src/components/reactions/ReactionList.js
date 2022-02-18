import { useEffect, useState } from "react"
import { createReaction, deleteReaction, getReactions, updateReaction } from "../../repositories/ReactionsRepository"
import "./Reactions.css"

export const ReactionList = ({ post, postId, reactionCount, syncPost }) => {
    const [reactions, modifyReactions] = useState([])

    useEffect(
        () => {
            getReactions()
                .then(modifyReactions)
        },
        []
    )

    const handlePostReaction = (reactionId) => {
        const reaction = {
            reaction: parseInt(reactionId)
        }
        if (post.reacted) {
            if (post.reacted === reactionId) {
                deleteReaction(postId)
                    .then(syncPost)
            }
            else {
                updateReaction(postId, reaction)
                    .then(syncPost)
            }
        }
        else {
            createReaction(postId, reaction)
                .then(syncPost)
        }
    }
    3
    return (
        <>
            <div className="feed">
                <a className="like-btn">
                    <div>
                        {
                            reactionCount ?
                                reactions.map(
                                    (reaction) => {
                                        for (const count of reactionCount) {
                                            if (count.label === reaction.label) {
                                                if (reaction.id !== post.reacted) {
                                                    return (
                                                        <span
                                                            onClick={() => handlePostReaction(reaction.id)}
                                                            value={reaction.id} key={`reaction__${reaction.id}`}
                                                            style={{ marginRight: "10px" }}
                                                        >
                                                            <img style={{ borderRadius: "15px", width: "40px", }}
                                                                src={reaction.image_url}
                                                                className="reaction-icon"
                                                            />{count.count}
                                                        </span>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <span
                                                            onClick={() => handlePostReaction(reaction.id)}
                                                            value={reaction.id} key={`reaction__${reaction.id}`}
                                                            style={{ marginRight: "10px" }}
                                                        >
                                                            <img style={{ borderRadius: "15px", backgroundColor: "lightblue", width: "40px", }}
                                                                src={reaction.image_url}
                                                                className="reaction-icon"
                                                            />{count.count}
                                                        </span>
                                                    )
                                                }
                                            }
                                        }
                                    }
                                )
                                : null
                        }
                    </div>
                </a>
            </div >
        </>
    )
}