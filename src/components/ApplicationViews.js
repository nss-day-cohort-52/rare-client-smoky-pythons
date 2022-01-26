import React from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./categories/category_list"

import { UsersList } from "./users/UsersList"
import { PostRoutes } from "./PostRoutes"
import { TagList } from "./tags/tag_list"


export const ApplicationViews = () => {
  return (
    <>
    <Route exact path ="/categories">
      <CategoryList/>
    </Route>

    <Route exact path = "/users">
      <UsersList/>
    </Route>

    <PostRoutes />

    </>
  )
}
