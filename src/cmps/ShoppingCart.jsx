import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { checkout } from '../store/actions/user.actions.js'
import { REMOVE_TOY_FROM_CART } from '../store/reducers/toy.reducer.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useTranslation } from "react-i18next"

export function ShoppingCart({ isCartShown }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const shoppingCart = useSelector(s => s.toyModule.shoppingCart)
  const user = useSelector(s => s.userModule.loggedInUser)

  function removeFromCart(toyId) {
    dispatch({ type: REMOVE_TOY_FROM_CART, toyId })
  }

  function getCartTotal() {
    return shoppingCart.reduce((acc, toy) => acc + toy.price, 0)
  }

  function onCheckout() {
    const amount = getCartTotal()

    checkout(amount)
      .then(() => {
        showSuccessMsg(`${t("cart.checkout_success", "Charged: ")} $${amount}`)
      })
      .catch(() => {
        showErrorMsg(t("cart.checkout_error", "There was a problem checking out!"))
      })
  }

  if (!isCartShown) return <span></span>

  const total = getCartTotal()

  return (
    <section className="cart">

      <button
        className='close-cart'
        onClick={(ev) => {
          ev.preventDefault()
          dispatch({ type: TOGGLE_CART_IS_SHOWN })
        }}>
        X
      </button>

      <h5>{t("cart.your_cart", "Your Cart")}</h5>

      <ul>
        {shoppingCart.map((toy) => (
          <li key={toy._id}>
            <button onClick={() => removeFromCart(toy._id)}>
              {t("cart.remove", "Remove")}
            </button>
            {toy.name} | ${toy.price}
          </li>
        ))}
      </ul>

      <p>
        {t("cart.total", "Total: $")} {total}
      </p>

      <button disabled={!user || !total} onClick={onCheckout}>
        {t("cart.checkout", "Checkout")}
      </button>
    </section>
  )
}
