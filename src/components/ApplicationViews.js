import React from "react"
import { Route } from "react-router-dom"
import { PostList } from "./posts/PostList"
import { PostForm} from "./posts/PostEntry"

export const ApplicationViews = () => {
  return (
    <>
    <Route exact path="/posts">
        <PostList />
    </Route>
    <Route exact path="/newPost">
        <PostForm />
    </Route>
    </>
  )
}
