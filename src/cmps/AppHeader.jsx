import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useTranslation } from "react-i18next"

export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const { t, i18n } = useTranslation()

    function onLogout() {
        logout()
            .then(() => showSuccessMsg(t("messages.success", "Success")))
            .catch(() => showErrorMsg(t("messages.error", "Error")))
    }

    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">

                <h1>{t("app.title", "Toys Store App")}</h1>

                <button onClick={() => i18n.changeLanguage("en")}>English</button>
                <button onClick={() => i18n.changeLanguage("he")}>עברית</button>

                <nav className="app-nav">
                    <NavLink to="/">{t("app.home", "Home")}</NavLink>
                    <NavLink to="/about">{t("app.about", "About")}</NavLink>
                    <NavLink to="/toy">{t("app.toys", "Toys")}</NavLink>
                    <NavLink to="/dashboard">{t("app.dashboard", "Dashboard")}</NavLink>

                    <a href="#" onClick={onToggleCart}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        {t("app.cart", "Cart")}
                    </a>
                </nav>
            </section>

            {user ? (
                <section>
                    <NavLink to={`/user/${user._id}`} >
                        {t("app.hello_user", "Hello")} {user.fullname + ' '}
                        <span>${user.credits.toLocaleString()}</span>
                    </NavLink>

                    <button onClick={onLogout}>{t("app.logout", "Logout")}</button>
                </section>
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}

            <UserMsg />
        </header>
    )
}
