import React from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./categories/CategoryList"
import { UsersList } from "./users/UsersList"
import { UserDetails } from "./users/UserDetails"
import { PostRoutes } from "./PostRoutes"
import { TagList } from "./tags/TagList"



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

    <Route path = "/users/:userId(\d+)">
      <UserDetails/>
    </Route>


    <PostRoutes />

    </>
  )
}
