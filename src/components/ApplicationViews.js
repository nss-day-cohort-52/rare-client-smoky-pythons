import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { PostsRepository } from "../repositories/PostsRepository"
import { HomePage } from "./home/HomePage"
import { CategoryRoutes } from "./routes/CategoryRoutes"
import { PostRoutes } from "./routes/PostRoutes"
import { ReactionRoutes } from "./routes/ReactionRoutes"
import { TagRoutes } from "./routes/TagRoutes"
import { UserRoutes } from "./routes/UserRoutes"
import { CommentRoutes } from "./routes/CommentRoutes"



export const ApplicationViews = ({ isStaff }) => {
  const [posts, setPosts] = useState([])

  const syncPosts = () => {
    PostsRepository.getAll().then(setPosts)
  }

  useEffect(() => {
    syncPosts()
  }, [])

  return (
    <>

      <Route exact path="/">
        <HomePage posts={posts} syncPosts={syncPosts} />
      </Route>

      <PostRoutes posts={posts} syncPosts={syncPosts} isStaff={isStaff} />

      <UserRoutes />

      <TagRoutes />

      <ReactionRoutes />

      <CommentRoutes posts={posts} syncPosts={syncPosts} />

      <CategoryRoutes />
    </>
  )
}
