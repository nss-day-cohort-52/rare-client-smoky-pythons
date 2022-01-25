import {Link} from "react-router-dom"

export const PostList = () => {
    return (
        <h1>This is where we will iterate through all the posts and display them to the DOM
            <Link to="/newPost" className="navbar-item">New Post</Link>
        </h1>
        
    )
}