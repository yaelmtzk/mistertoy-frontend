import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { ToyPreview } from "./ToyPreview.jsx"
import { useTranslation } from "react-i18next"

export function ToyList({ toys, onRemoveToy, addToCart }) {
  const { t } = useTranslation()
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  return (
    <ul className="toy-list">
      {toys.map(toy =>
        <li className="toy-preview" key={toy._id}>

          <ToyPreview toy={toy} />

          <div className="preview-btns">

            {user && user.isAdmin &&
              (<section>
                  <button title={t("toyList.remove", "Remove")}
                    onClick={() => onRemoveToy(toy._id)}
                  >
                    <i className="fa-solid fa-trash pulse-hover"></i>
                  </button>

                  <button title={t("toyList.edit", "Edit")}>
                    <Link to={`/toy/edit/${toy._id}`}>
                      <i className="fa-solid fa-pen-to-square pulse-hover"></i>
                    </Link>
                  </button>
                </section>)
            }

            <button title={t("toyList.details", "Details")}>
              <Link to={`/toy/${toy._id}`}>
                <i className="fa-solid fa-info pulse-hover"></i>
              </Link>
            </button>

            <button
              title={t("toyList.add_to_cart", "Add to cart")}
              className="buy"
              onClick={() => addToCart(toy)}>
              <i className="fa-solid fa-cart-plus pulse-hover"></i>
            </button>

          </div>
        </li>
      )}
    </ul>
  )
}
