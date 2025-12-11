import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next"

export function AppFooter() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const isCartShown = useSelector(s => s.toyModule.isCartShown)
  const count = useSelector(s => s.userModule.count)
  const toysLength = useSelector(s => s.toyModule.toys.length)
  const shoppingCartLength = useSelector(s => s.toyModule.shoppingCart.length)

  return (
    <footer className='app-footer'>
      <h5>
        {t("footer.at_the_moment", "Currently")} {toysLength} {t("footer.toys_count", "toys in the shop")}
      </h5>

      <p>@Coffeerights to all</p>

      <h5>
        <span>{shoppingCartLength}</span>
        {t(" footer.products_in_cart", " Products in your cart")}
        {" "}
        <a href="#" onClick={(ev) => {
          ev.preventDefault()
          dispatch({ type: TOGGLE_CART_IS_SHOWN })
        }}>
          ({isCartShown ? t("footer.hide", "hide") : t("footer.show", "show")})
        </a>
      </h5>

      <ShoppingCart isCartShown={isCartShown} />
      <UserMsg />
    </footer>
  )
}
