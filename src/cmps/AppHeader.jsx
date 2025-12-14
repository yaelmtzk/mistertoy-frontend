import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { TOGGLE_USER_IS_SHOWN } from '../store/reducers/user.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"


export function AppHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const shoppingCartLength = useSelector(storeState => storeState.toyModule.shoppingCart.length)
    const isUserShown = useSelector(storeState => storeState.userModule.isUserShown)

    const { t, i18n } = useTranslation()

    function onLogout() {
        logout()
            .then(() => showSuccessMsg(t("messages.success", "Success")))
            .catch(() => showErrorMsg(t("messages.error", "Error")))
            .finally(() => {
                dispatch({ type: TOGGLE_USER_IS_SHOWN })
                navigate('/toy')
            }

            )

    }

    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    function onToggleUser(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_USER_IS_SHOWN })
        navigate('/toy')
    }

    return (
        <header className="app-header full">
            <section className="header-container subgrid">
                <div className='lang-btns'>
                    <button title='English' onClick={() => i18n.changeLanguage("en")}>En</button>
                    <button title='עברית' onClick={() => i18n.changeLanguage("he")}>ע</button>
                </div>

                <div className='header-main'>
                    <h1>Toys Store App</h1>

                    <div 
                    className='user-container'>
                        <a onClick={onToggleUser}>
                            <i title="User" className="fa-solid fa-user pulse-hover"></i>
                        </a>

                        {user ?
                            (isUserShown ?
                                (<section className='user-login-container'>
                                    <div className='hello-box'>
                                        <p>{t("app.hello_user", "Hello")} <strong>{user.fullname + ' '}</strong> </p>

                                        <a><NavLink to={`/user/${user._id}`}>
                                        Profile
                                        <i className="fa-solid fa-circle-arrow-right"></i>
                                        </NavLink></a>

                                        <p>Credits: ${user.credits.toLocaleString()}</p>

                                    </div>

                                    <button title={t("app.logout", "Logout")}
                                        onClick={onLogout}>
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    </button>
                                </section>) : ''
                            ) :
                            (isUserShown ? (<section className='user-login-container'><LoginSignup /></section>) : '')
                        }
                    </div>

                </div>

                <div className='nav-container full'>
                    <div className="nav-container-inner nav-container-subgrid">
                        <nav className="app-nav">
                            <div><NavLink to="/">{t("app.home", "Home")}</NavLink></div>
                            <div><NavLink to="/about">{t("app.about", "About")}</NavLink></div>
                            <div><NavLink to="/toy">{t("app.toys", "Toys")}</NavLink></div>
                            <div><NavLink to="/dashboard">{t("app.dashboard", "Dashboard")}</NavLink></div>
                        </nav>

                        <div className="cart-container">
                            <div className='cart-count badge'>{shoppingCartLength}</div>
                            <a onClick={onToggleCart}>
                                <i
                                    title={t("app.cart", "Cart")}
                                    className="fa-solid fa-cart-shopping pulse-hover">
                                </i>
                            </a>

                        </div>
                    </div>

                </div>




            </section>
            <UserMsg />
        </header >
    )
}
