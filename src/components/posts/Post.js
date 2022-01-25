import { useState } from "react"

export const Post = (props) => {
    const [posts, setPosts] = useState([])

    return (
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    {props.title}
                </p>
            </header>
            <div className="card-content">
                <div className="content">
                    {props.content}
                </div>
            </div>
            <footer className="card-footer">
                <a href="#" className="card-footer-item">Edit</a>
                <a href="#" className="card-footer-item">Delete</a>
            </footer>
        </div>
    )
}