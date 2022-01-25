import React from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./categories/category_list"

export const ApplicationViews = () => {
  return (
    <>
    <h1 >Welcome to Rare Publishing</h1>
    <Route exact path = "/categories">
      <CategoryList/>
    </Route>
    </>
  )
}
