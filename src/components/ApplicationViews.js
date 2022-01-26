import { PostList } from "./posts/PostList"
import React from "react"
import { Route } from "react-router-dom"
import { PostForm} from "./posts/PostEntry"
import { CategoryList } from "./categories/category_list"
import { PostDetails } from "./posts/PostDetails"
import { PostRoutes } from "./PostRoutes"

export const ApplicationViews = () => {
  return (
    <>
    <Route exact path ="/categories">
      <CategoryList/>
    </Route>
    <PostRoutes />
    </>
  )
}
