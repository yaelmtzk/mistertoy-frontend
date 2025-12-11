import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useOnlineStatus } from "../hooks/useOnlineStatus.js"
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"
import { useTranslation } from "react-i18next"

export function ToyEdit() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()

  const isOnline = useOnlineStatus()
  const setHasUnsavedChanges = useConfirmTabClose()

  useEffect(() => {
    if (toyId) loadToy()
  }, [])

  function loadToy() {
    toyService.getById(toyId)
      .then(toy => setToyToEdit(toy))
      .catch(err => {
        console.log('Had issues in toy edit', err)
        navigate('/toy')
      })
  }

  function handleChange({ target }) {
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    setHasUnsavedChanges(true)
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    if (!toyToEdit.price) toyToEdit.price = 100
    saveToy(toyToEdit)
      .then(() => {
        showSuccessMsg(t('toyEdit.saved_success', 'Toy Saved!'))
        navigate('/toy')
      })
      .catch(err => {
        console.log('Had issues in toy details', err)
        showErrorMsg(t('toyEdit.save_error', 'Had issues in toy details'))
      })
  }

  return (
    <section className="toy-edit">
      <h2>
        {toyToEdit._id
          ? t('toyEdit.title_edit', 'Edit Toy')
          : t('toyEdit.title_add', 'Add Toy')}
      </h2>

      <form onSubmit={onSaveToy} >
        <label htmlFor="name">
          {t('toyEdit.name_label', 'Toy Name: ')}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder={t('toyEdit.name_placeholder', 'Enter toy name...')}
          value={toyToEdit.name}
          onChange={handleChange}
        />

        <label htmlFor="price">
          {t('toyEdit.price_label', 'Price: ')}
        </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder={t('toyEdit.price_placeholder', 'Enter price')}
          value={toyToEdit.price}
          onChange={handleChange}
        />

        <div>
          <button>
            {toyToEdit._id
              ? t('toyEdit.save', 'Save')
              : t('toyEdit.add', 'Add')}
          </button>
          <Link to="/toy">
            {t('toyEdit.cancel', 'Cancel')}
          </Link>
        </div>

        <section>
          <h1>
            {isOnline
              ? `✅ ${t('toyEdit.online', 'Online')}`
              : `❌ ${t('toyEdit.offline', 'Disconnected')}`}
          </h1>
        </section>
      </form>
    </section>
  )
}
