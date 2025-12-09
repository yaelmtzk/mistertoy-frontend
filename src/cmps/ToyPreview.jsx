import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <h1><i className="fa-solid fa-puzzle-piece"></i></h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.creator && <p>Creator: <Link to={`/user/${toy.creator._id}`}>{toy.creator.fullname}</Link></p>}
            <hr />

        </article>
    )
}