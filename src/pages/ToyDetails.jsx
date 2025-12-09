import { useEffect, useState } from "react"
// import { toyService } from "../services/toy.service.js"
import { toyService } from "../services/toy.service-local.js"
import { utilService } from "../services/util.service.js"
import { Link, useParams, useNavigate  } from "react-router-dom"

// const { useEffect, useState } = React

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p><i className="fa-solid fa-puzzle-piece"></i></p>
            <p>{utilService.makeLorem(30)}</p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            {/* <p>
                <Link to="/toy/nJ5L4">Next Toy</Link>
            </p> */}
        </section>
    )
}