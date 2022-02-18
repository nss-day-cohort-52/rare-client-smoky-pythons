import { PostList } from "../posts/PostList"
import { PostDetails } from "../posts/PostDetails"
import { PostForm } from "../posts/PostForm"
import { MyPosts } from "../posts/MyPosts"
import { PostEdit } from "../posts/PostEdit"
import { Route } from "react-router-dom"


export const PostRoutes = ({ posts, syncPosts, isStaff }) => {
    return (
        <>
            <Route exact path={["/posts"]}>
                <PostList isStaff={isStaff} posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path="/posts/:postId(\d+)">
                <PostDetails posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path="/newPost">
                <PostForm posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route path="/my-post">
                <MyPosts posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path="/editPost/:postId(\d+)">
                <PostEdit posts={posts} syncPosts={syncPosts} />
            </Route>
        </>
    )
}