import { Link } from "react-router-dom"
import { Post } from "./Post"

export const MyPosts = ({ posts, syncPosts }) => {

    return (
        <>
            <div>
                <center> <Link to="/newPost" className="navbar-item">New Post</Link></center>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Tags</th>

                    </tr>
                </thead>
                {
                    posts.map(post => {
                        return (
                            post.is_owner
                                ? 
                                    <Post
                                        key={post.id}
                                        postId={post.id}
                                        title={post.title}
                                        content={post.content}
                                        publicationDate={post.publication_date}
                                        user={post.user.user}
                                        category={post.category}
                                        syncPosts={syncPosts}
                                        tags={post.tags}
                                        isOwner={post.is_owner}
                                    />
                                : null
                        )
                    })
                }
            </table>
        </>
    )
}

