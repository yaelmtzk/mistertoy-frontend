import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { signup } from '../store/actions/user.actions.js'
import { userService } from "../services/user.service.js"
import { TOGGLE_USER_IS_SHOWN } from '../store/reducers/user.reducer.js'
import { useTranslation } from "react-i18next"
import { useNavigate } from 'react-router-dom'

export function Signup() {
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
        doSignup(credentials)
    }

    function doSignup(credentials) {
        signup(credentials)
            .then(() => showSuccessMsg(t("loginSignup.signup_success", "Signed up successfully")))
            .catch(() => showErrorMsg(t("loginSignup.error", "Oops, try again")))
            .finally(() => {
                hideUserBox()
                navigate('/toy')
            })
    }

    return (
        <div className="signup-container">

            <form className="signup-form" onSubmit={handleSubmit}>
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

                <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder={t("loginForm.fullname", "Full name")}
                    onChange={handleChange}
                    required
                />

                <button
                    onClick={() => doSignup(credentials)}
                    title="Signup">
                    {t("loginForm.signup", "Signup")}
                </button>
            </form>

        </div>
    )
}
