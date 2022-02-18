import React, { useState } from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem('token'))
  const [isStaff, setIsStaff] = useState(localStorage.getItem('isStaff'))

  const setToken = (newToken) => {
    localStorage.setItem('token', newToken)
    setTokenState(newToken)
  }
  const setStaffOption = (value) => {
    localStorage.setItem('isStaff', value)
    setIsStaff(value)
  }

  return <>
    {
      token
        ?
        <Route>
          <NavBar token={token} setToken={setToken} />
          <ApplicationViews />
        </Route>
        :
        <Redirect to="/login" />
    }

    <Route exact path="/login" >
      <NavBar token={token} setToken={setToken} />
      <Login setStaffOption={setStaffOption} token={token} setToken={setToken} />
    </Route>

    <Route path="/register" exact>
      <NavBar setStaffOption={setStaffOption} token={token} setToken={setToken} />
      <Register token={token} setToken={setToken} />
    </Route>
  </>
}
