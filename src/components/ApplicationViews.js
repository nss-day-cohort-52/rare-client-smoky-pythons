import React from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./categories/category_list"
import { UsersList } from "./users/UsersList"
import { UserDetails } from "./users/UserDetails"
import { PostRoutes } from "./PostRoutes"
import { TagList } from "./tags/tag_list"
import { MyPostList } from "./posts/MyPost"


export const ApplicationViews = () => {
  return (
    <>
    <Route exact path ="/categories">
      <CategoryList/>
    </Route>

    <Route exact path ="/tags">
      <TagList />
    </Route>
    
    <Route exact path = "/users">
      <UsersList/>
    </Route>
    <Route path = "/users/:user_id(\d+)">
      <UserDetails/>
    </Route>
  


    <PostRoutes />

    </>
  )
}
