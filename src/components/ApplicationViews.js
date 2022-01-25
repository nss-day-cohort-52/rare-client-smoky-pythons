import { PostList } from "./posts/PostList"
import React from "react"
import { Route } from "react-router-dom"
import { PostForm} from "./posts/PostEntry"
import { CategoryList } from "./categories/category_list"

export const ApplicationViews = () => {
  return (
    <>
    <h1 >Welcome to Rare Publishing</h1>
    <Route exact path = "/categories">
      <CategoryList/>
    </Route>
    <Route exact path="/posts">
        <PostList />
    </Route>
    <Route exact path="/newPost">
        <PostForm />
    </Route>
    </>
  )
}
