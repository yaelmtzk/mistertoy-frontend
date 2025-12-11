import { useState } from "react"
import { userService } from "../services/user.service.js"
import { useTranslation } from "react-i18next"

export function LoginForm({ onLogin, isSignup }) {
  const { t } = useTranslation()
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

  function handleChange({ target }) {
    setCredentials(prev => ({ ...prev, [target.name]: target.value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    onLogin(credentials)
  }

  return (
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

      {isSignup && (
        <input
          type="text"
          name="fullname"
          value={credentials.fullname}
          placeholder={t("loginForm.fullname", "Full name")}
          onChange={handleChange}
          required
        />
      )}

      <button>
        {isSignup
          ? t("loginForm.signup", "Signup")
          : t("loginForm.login", "Login")}
      </button>
    </form>
  )
}
