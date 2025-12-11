import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Popup } from '../cmps/Popup'
import { Chat } from '../cmps/Chat'
import { useTranslation } from "react-i18next"

export function ToyDetails() {
    const { t, i18n } = useTranslation()
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
    if (!toy) return <div>{t('toyDetails.loading', 'Loading...')}</div>

    return (
        <section className="toy-details">
            <h1>{t("toyDetails.toy", "Toy: ")} {toy.name}</h1>

            <h5>{t("toyDetails.price", "Price: ")} ${toy.price}</h5>

            {!!toy.labels?.length && (
                <p>
                    {t("toyDetails.labels", "Labels: ")} <span>{toy.labels.join(", ")}</span>
                </p>
            )}

            <p className={toy.inStock ? "green" : "red"}>
                {toy.inStock
                    ? t("toyDetails.in_stock", "In stock")
                    : t("toyDetails.out_of_stock", "Not in stock")}
            </p>

            <p>{utilService.makeLorem(30)}</p>

            <div>
                <button>
                    <Link to={`/toy/edit/${toy._id}`}>
                        {t("toyDetails.edit", "Edit")}
                    </Link>
                </button>
                <button>
                    <Link to="/toy">{t("toyDetails.back", "Back")}</Link>
                </button>
            </div>

            <button className="btn" onClick={() => { setIsOpen(true) }} >
                {t('toyDetails.chat', 'Chat')}
            </button>

            {isOpen && (
                <Popup
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    heading={t('toyDetails.chat_heading', 'Lets chat!')}
                    footing={
                        <button className="btn" onClick={() => setIsOpen(false)}>
                            {t('toyDetails.close', 'Close')}
                        </button>
                    }
                >
                    <Chat />
                </Popup>
            )}
        </section>
    )
}