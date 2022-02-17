import { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { PostsRepository } from "../repositories/PostsRepository"
import { EditCategory } from "./categories/edit_category"
import { EditComment } from "./posts/EditComment"
import { MyPostList } from "./posts/MyPost"
import { PostCommentForm } from "./posts/PostCommentForm"
import { PostComments } from "./posts/PostComments"
import { PostDetails } from "./posts/PostDetails"
import { EditPost } from "./posts/PostEdit"
import { PostForm } from "./posts/PostEntry"
import { PostList } from "./posts/PostList"
import { ReactionForm } from "./reactions/ReactionForm"
import { Subscriptions } from "./subscriptions/Subscriptions"
import { EditTags } from "./tags/EditTags"


export const PostRoutes = () => {
    const [posts, setPosts] = useState([])

    const syncPosts = () => {
        PostsRepository.getAll().then(setPosts)
    }

    useEffect(() => {
        syncPosts()
    }, [])
    
    return (
        <>
            <Route exact path={["/posts"]}>
                <PostList posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path="/posts/:postId(\d+)">
                <PostDetails posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path="/posts/:postId(\d+)/comments">
                <PostComments posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path="/posts/:postId(\d+)/comments/:commentId(\d+)/edit">
                <EditComment posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path="/posts/:postId(\d+)/comments/add">
                <PostCommentForm />
            </Route>
            <Route exact path="/newPost">
                <PostForm posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route path = "/my-post">
                <MyPostList posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path = "/">
                <Subscriptions posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path = "/editPost/:postId(\d+)">
                <EditPost posts={posts} syncPosts={syncPosts}/>
            </Route>
            <Route exact path = "/categories/edit/:CategoryId(\d+)">
                <EditCategory/>
            </Route>
            <Route exact path = "/tags/edit/:TagId(\d+)">
                <EditTags/>
            </Route>
            <Route exact path = "/newReaction">
                <ReactionForm/>
            </Route>
        </>
    )
}