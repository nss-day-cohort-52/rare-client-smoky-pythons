import { useState, useEffect } from "react"
import { getUserSubs } from "../../repositories/SubscriptionsRepository"
import { Post } from "../posts/Post"

export const Subscriptions = ({ posts, syncPosts }) => {
    const [userSubs, setUserSubs] = useState([])

    useEffect(() => {
        getUserSubs()
            .then(setUserSubs)
    }, [])

    const message = "Subscribe to authors to curate your personal homepage"
    
    if (userSubs.length !== 0) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                {posts.map((post) => {
                    if (post.subscribed) {
                        return <Post
                            key={post.id}
                            postId={post.id}
                            title={post.title}
                            content={post.content}
                            publicationDate={post.publication_date}
                            user={post.user.user}
                            category={post.category}
                            syncPosts={syncPosts}
                            reactionCount={post.reactions}
                        />
                    }
                })}
            </table>
        )
    }
    else {
        return message
    }
}