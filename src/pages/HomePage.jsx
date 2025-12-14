import { loadToys } from "../store/actions/toy.actions.js"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { getToyImage } from '../services/image.service.js'
import { Link } from 'react-router-dom'

export function HomePage() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const toysToDisplay = toys.filter((toy, idx) => idx <= 2)

  useEffect(() => {
    loadToys()
  }, [])

  return (
    <section className="home-page">

      <section className="hero">
        <div className="hero-content">
          <h1>Discover the Magic of Play</h1>
          <p>High-quality toys that spark imagination and joy.</p>
          <button className="btn">
            <Link to="/toy">Shop Now</Link>
          </button>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Featured Toys</h2>

        <div className="products">
          {toysToDisplay.map((toy) => {
            return < div key={toy._id} className="product-card" >
              <div className="img-container">
                <img src={getToyImage(toy.imgUrl)} alt={toy.name} />
              </div>

              <h3>{toy.name}</h3>
              <p>${toy.price}</p>
            </div>
          }

          )}
        </div>
      </section>
    </section >
  )
}
