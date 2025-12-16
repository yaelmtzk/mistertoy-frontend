import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function ToyIndex() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  useEffect(() => {
    loadToys()
      .catch(() => {
        showErrorMsg(t('messages.cannot_load', 'Cannot load toys!'))
      })
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onRemoveToy(toyId) {
    removeToyOptimistic(toyId)
      .then(() => {
        showSuccessMsg(t('toyIndex.remove_success', 'toy removed'))
      })
      .catch(err => {
        showErrorMsg(t('toyIndex.remove_error', 'Cannot remove toy'))
      })
  }

  function onAddToy() {
    const toyToSave = toyService.getRandomToy()
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(
          `${t('toyIndex.add_success', 'toy added')} (id: ${savedToy._id})`
        )
      })
      .catch(err => {
        showErrorMsg(t('toyIndex.add_error', 'Cannot add toy'))
      })
  }

  function onEditToy(toy) {
    const price = +prompt('New price?')
    const toyToSave = { ...toy, price }

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(
          `${t('toyIndex.update_success', 'toy updated to price: ')}$${savedToy.price}`
        )
      })
      .catch(err => {
        showErrorMsg(t('toyIndex.update_error', 'Cannot update toy'))
      })
  }

  function addToCart(toy) {
    console.log(`Adding ${toy.name} to cart`)
    dispatch({ type: ADD_TOY_TO_CART, toy })
    showSuccessMsg(t('cart.add_to_cart', 'Added to cart'))
  }

  return (
    <section className="index-section">

      {user && user.isAdmin &&
        (<div className='add-toy-section'>
          <button>
            <Link to="/toy/edit">
              {t('toyIndex.add_toy', 'Add Toy')}
            </Link>
          </button>

          <button
            className='add-btn'
            onClick={onAddToy}
          >{t('toyIndex.add_random', 'Add Random Toy')}</button>
        </div>)
      }



      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

      {!isLoading
        ? (
          <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            onEditToy={onEditToy}
            addToCart={addToCart}
          />
        )
        : <div>{t('toyIndex.loading', 'Loading...')}</div>
      }

      <hr />
    </section>
  )
}
