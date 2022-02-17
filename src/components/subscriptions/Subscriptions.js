import { useState, useEffect } from "react"
import { getAllUsers, getCurrentUser } from "../../repositories/UserRepository"
import { getUserSubs, addToSubList, deleteSubscription } from "../../repositories/SubscriptionsRepository"
import { useParams, useHistory } from "react-router-dom"
import { Post } from "../posts/Post"
import { getCategories } from "../../repositories/CategoriesRepository"

export const Subscriptions = ({ posts, syncPosts }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [userSubs, setUserSubs] = useState([])

    useEffect(() => {
        getCurrentUser()
            .then(setCurrentUser)
        getUserSubs()
            .then(setUserSubs)
    }, [])

    // const message = subs.length > 0 ? postList : "Subscribe to authors to curate your personal homepage"
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
                            user={currentUser}
                            category={post.category}
                            syncPosts={syncPosts} />
                    }
                })}
            </table>
        )
    } 
    else {
        return message
    }
}