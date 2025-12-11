import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function ToyPreview({ toy }) {
  const { t } = useTranslation()

  return (
    <article>
      <h4>{toy.name}</h4>

      <h1><i className="fa-solid fa-puzzle-piece"></i></h1>

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
