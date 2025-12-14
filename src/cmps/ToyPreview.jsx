import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getToyImage } from '../services/image.service.js'

export function ToyPreview({ toy }) {
  const { t } = useTranslation()

  return (
    <article>
      <h3>{toy.name}</h3>

      <div className="img-container">
        <img
          src={getToyImage(toy.imgUrl)}
          alt={toy.name}
        />
      </div>

      <p>
        {t("toyPreview.price", "Price:")}{" "}
        <span>${toy.price.toLocaleString()}</span>
      </p>

      {toy.creator && (
        <p>
          {t("toyPreview.creator", "Creator:")}{" "}
          <Link to={`/user/${toy.creator._id}`}>
            {toy.creator.fullname}
          </Link>
        </p>
      )}

      <hr />
    </article>
  )
}
