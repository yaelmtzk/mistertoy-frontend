import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'
import { useTranslation } from "react-i18next"

export function LoginSignup() {
  const { t } = useTranslation()
  const [isSignup, setIsSignup] = useState(false)

  function onLogin(credentials) {
    isSignup ? doSignup(credentials) : doLogin(credentials)
  }

  function doLogin(credentials) {
    login(credentials)
      .then(() => showSuccessMsg(t("loginSignup.login_success", "Logged in successfully")))
      .catch(() => showErrorMsg(t("loginSignup.error", "Oops, try again")))
  }

  function doSignup(credentials) {
    signup(credentials)
      .then(() => showSuccessMsg(t("loginSignup.signup_success", "Signed in successfully")))
      .catch(() => showErrorMsg(t("loginSignup.error", "Oops, try again")))
  }

  return (
    <div className="login-container">
      <LoginForm onLogin={onLogin} isSignup={isSignup} />

      <div className="btns">
        <a href="#" onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? t("loginSignup.already_member", "Already a member? Login")
            : t("loginSignup.new_user", "New user? Signup here")}
        </a>
      </div>
    </div>
  )
}
