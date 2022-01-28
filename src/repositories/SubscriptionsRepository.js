




export const getUserSubs = (id) =>{
       return fetch(`http://localhost:8088/subscriptions/${id}`)
      .then(res => res.json())}

export const addToSubList = (subObj) => {
      return fetch(`http://localhost:8088/subscriptions`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subObj)
    })
}
  export const deleteSubscription = subId => {
    return fetch(`http://localhost:8088/subscriptions/${subId}`, {
      method: "DELETE"
    })
  };