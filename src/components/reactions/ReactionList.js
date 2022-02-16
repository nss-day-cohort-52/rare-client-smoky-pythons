import { useEffect, useState } from "react"
import { getReactions } from "../../repositories/ReactionsRepository"
import "./Reactions.css"

export const ReactionList = () => {
    const [reactions, modifyReactions] = useState([])

    useEffect(
        () => {
            getReactions()
            .then(modifyReactions)
        },
        []
    )

    return (
        <>
            <div className="feed">
                <a className="like-btn">
                    <div className="reaction-box">
                        {
                            reactions.map(
                                (reaction) => {
                                    return <div className="reaction-icon">
                                        <label>{reaction.label}</label>
                                    </div>
                                }
                            )
                        }
                    </div>
                </a>
            </div>
        </>
    )
}