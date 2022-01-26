import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const Post = (props) => {
    const history = useHistory()
    return (
        <tbody>
            <tr>
                <td onClick={() => history.push(`/posts/${props.id}`)}>{props.title}</td>
                <td>{props.user?.firstName} {props.user?.lastName}</td>
                <td>{props.publicationDate}</td>
                <td>{props.category}</td>
                <td>tags go here</td>
            </tr>
        </tbody>
    )
}