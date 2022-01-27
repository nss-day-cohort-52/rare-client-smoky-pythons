export const get_all_users = () => {
    return fetch("http://localhost:8088/users")
      .then(res => res.json())
  };

export const get_single_user = (id) => {
    return fetch(`http://localhost:8088/users/${id}`)
    .then(res => res.json())
}