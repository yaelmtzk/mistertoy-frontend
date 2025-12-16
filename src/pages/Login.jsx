import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { TOGGLE_USER_IS_SHOWN } from '../store/reducers/user.reducer.js'
import { userService } from "../services/user.service.js"
import { useTranslation } from "react-i18next"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login } from '../store/actions/user.actions.js'
import { useNavigate } from 'react-router-dom'

export function Login() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const isUserShown = useSelector(storeState => storeState.userModule.isUserShown)

    useEffect(() => {
        if (isUserShown) {
            hideUserBox()
        }
    }, [])


    function hideUserBox() {
        if (isUserShown) dispatch({ type: TOGGLE_USER_IS_SHOWN })
    }

    function handleChange({ target }) {
        setCredentials(prev => ({ ...prev, [target.name]: target.value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        doLogin(credentials)
    }

    function doLogin(credentials) {
        login(credentials)
            .then(() => showSuccessMsg(t("loginSignup.login_success", "Logged in successfully")))
            .catch(() => showErrorMsg(t("loginSignup.error", "Oops, try again")))
            .finally(() => {
                hideUserBox()
                navigate('/toy')
            })
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder={t("loginForm.username", "Username")}
                    onChange={handleChange}
                    required
                    autoFocus
                />

                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder={t("loginForm.password", "Password")}
                    onChange={handleChange}
                    required
                />

                <button
                    onClick={() => doLogin(credentials)}
                    title={t("loginForm.login", "Login")}>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </button>
            </form>
        </div>

    )
}
