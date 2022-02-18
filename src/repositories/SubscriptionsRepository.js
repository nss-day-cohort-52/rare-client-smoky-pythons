import { FetchOptions } from "../components/utils/FetchOptions";
import { Settings } from "../components/utils/Settings";

export const getUserSubs = () => {
  return fetch(`http://localhost:8000/subscriptions/usersubs`, FetchOptions())
    .then(res => res.json())
}
export const addToSubList = (subObj) => {
  return fetch(`http://localhost:8000/subscriptions`, FetchOptions("POST", subObj))
}
export const deleteSubscription = subId => {
  return fetch(`http://localhost:8000/subscriptions/${subId}`, FetchOptions("DELETE"))
}
