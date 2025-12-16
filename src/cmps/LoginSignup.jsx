import { NavLink } from 'react-router-dom'
import { useTranslation } from "react-i18next"

export function LoginSignup() {
  const { t } = useTranslation()
  

  return (
    <div className="login-container">
      <NavLink to={'/signup'}>
          {t("loginSignup.new_user", "New user? Signup")}
      </NavLink>

      <NavLink to={'/login'}>
          {t("loginSignup.already_member", "Already a member? Login")}
      </NavLink>
    </div>
  )
}

