





export const get_all_users = () => {
    return fetch("http://localhost:8088/users")
      .then(res => res.json())
  };