import { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { PostsRepository } from "../repositories/PostsRepository"
import { MyPostList } from "./posts/MyPost"
import { PostCommentForm } from "./posts/PostCommentForm"
import { PostComments } from "./posts/PostComments"
import { PostDetails } from "./posts/PostDetails"
import { PostForm } from "./posts/PostEntry"
import { PostList } from "./posts/PostList"

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
            <Route exact path="/posts">
                <PostList posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path="/posts/:postId(\d+)">
                <PostDetails posts={posts} syncPosts={syncPosts} />
            </Route>
            <Route exact path="/posts/:postId(\d+)/comments">
                <PostComments posts={posts} syncPosts={syncPosts} />
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
        </>
    )
}