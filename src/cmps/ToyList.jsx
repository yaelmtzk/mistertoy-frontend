import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview.jsx"
import { useTranslation } from "react-i18next"

export function ToyList({ toys, onRemoveToy, addToCart }) {
  const { t } = useTranslation()

  return (
    <ul className="toy-list">
      {toys.map(toy =>
        <li className="toy-preview" key={toy._id}>

          <ToyPreview toy={toy} />

          <div>
            <button onClick={() => onRemoveToy(toy._id)}>
              {t("toyList.remove", "Remove")}
            </button>

            <button>
              <Link to={`/toy/edit/${toy._id}`}>
                {t("toyList.edit", "Edit")}
              </Link>
            </button>

            <button>
              <Link to={`/toy/${toy._id}`}>
                {t("toyList.details", "Details")}
              </Link>
            </button>
          </div>

          <button className="buy" onClick={() => addToCart(toy)}>
            {t("toyList.add_to_cart", "Add to cart")}
          </button>

        </li>
      )}
    </ul>
  )
}
