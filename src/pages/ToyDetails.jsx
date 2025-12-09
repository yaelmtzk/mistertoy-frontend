import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Popup } from '../cmps/Popup'
import { Chat } from '../cmps/Chat'

// const { useEffect, useState } = React

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        window.addEventListener('keyup', handleIsOpen)
        return () => {
            window.removeEventListener('keyup', handleIsOpen)
        }
    }, [])

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function handleIsOpen({ key }) {
        if (key === 'Escape') setIsOpen(false)
    }


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

            {!!toy.labels?.length && (
                <p>Labels: <span>{toy.labels.join(', ')}</span></p>
            )}

            <p className={toy.inStock ? 'green' : 'red'}>
                {toy.inStock ? 'In stock' : 'Not in stock'}
            </p>

            <p>{utilService.makeLorem(30)}</p>

            <div>
                <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                <button><Link to={`/toy`}>Back</Link></button>
            </div>

            <button className="btn" onClick={() => { setIsOpen(true) }} >
                Chat
            </button>

            {/* <p>
                <Link to="/toy/nJ5L4">Next Toy</Link>
            </p> */}

            {isOpen && (
                <Popup
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    heading="Lets chat!"
                    footing={<button className="btn" onClick={() => setIsOpen(false)}>Close</button>}
                >
                    <Chat />
                </Popup>
            )}
        </section>
    )
}