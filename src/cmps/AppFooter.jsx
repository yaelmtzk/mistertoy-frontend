import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next"

export function AppFooter() {

  const { t } = useTranslation()

  const isCartShown = useSelector(s => s.toyModule.isCartShown)
  const toysLength = useSelector(s => s.toyModule.toys.length)


  return (
    <footer className='app-footer full'>
      <div className='footer-container subgrid'>
        <h5>
          {t("footer.at_the_moment", "Currently")} {toysLength} {t("footer.toys_count", "toys in the shop")}
        </h5>

        <small>&copy; Coffeerights to all</small>

        <ShoppingCart isCartShown={isCartShown} />
        
        <UserMsg />

      </div>
    </footer>
  )
}
