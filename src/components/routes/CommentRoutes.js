import { Route } from "react-router-dom"
import { CommentForm } from "../comments/CommentForm"
import { CommentList } from "../comments/CommentList"
import { EditComment } from "../comments/EditComment"

export const CommentRoutes = ({ posts, syncPosts }) => {
    return (
        <>
            <Route exact path="/posts/:postId(\d+)/comments">
                <CommentList posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path="/posts/:postId(\d+)/comments/:commentId(\d+)/edit">
                <EditComment posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path="/posts/:postId(\d+)/comments/add">
                <CommentForm />
            </Route>
        </>
    )
}