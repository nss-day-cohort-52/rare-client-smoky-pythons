import { useState,useEffect } from "react"
import {get_all_users,get_single_user} from "../../repositories/UserRepository"
import {getUserSubs,addToSubList,deleteSubscription} from "../../repositories/SubscriptionsRepository"
import {useParams, useHistory } from "react-router-dom"
import { Post } from "../posts/Post"
import { PostsRepository } from "../../repositories/PostsRepository"
import { getCategories } from "../../repositories/CategoriesRepository"

export const Subscriptions = ({ posts, syncPosts }) => {
    const  {user_id}  = useParams()
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("token"))
    const [subs, setSubs] = useState([])
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getUserSubs(currentUser)
            .then(setSubs)  
    }, [])
        useEffect(() => {
        getCategories()
            .then(setCategories)
        get_all_users().then(setUsers)
    },
        []
    )

// const message = subs.length > 0 ? postList : "Subscribe to authors to curate your personal homepage"

return <div>
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
                            const foundUser = users.find(user => user.id === post.user_id)
                            const foundCategory = categories.find(category => category.id === post.category_id)
                            // const foundSubPosts = subs.filter(sub => sub.author_id === post.user_id)
                            for (const sub of subs) {
                                if (sub.author_id === post.user_id) {
                                    return <Post
                                            key={post.id}
                                            postId={post.id}
                                            title={post.title}
                                            content={post.content}
                                            publicationDate={post.publication_date}
                                            user={foundUser}
                                            category={foundCategory}
                                            syncPosts={syncPosts}/>
                                }
                        // else { return "Subscribe to authors to curate your personal homepage"}
                            } 
                
                    }
                )
            }
            </table>
        </div>
}