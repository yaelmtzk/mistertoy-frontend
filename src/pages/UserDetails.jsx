import { useEffect, useState } from "react"
import { userService } from "../services/user.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ToyList } from "../cmps/ToyList.jsx"

export function UserDetails() {
  const { t } = useTranslation()
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (userId) loadUser()
  }, [userId])

  function loadUser() {
    userService.getById(userId)
      .then(user => {
        setUser(user)
      })
      .catch(err => {
        console.log('Had issues in user details', err)
        navigate('/')
      })
  }

  if (!user) return <div>{t('userDetails.loading', 'Loading...')}</div>

  const loggedInUser = userService.getLoggedinUser()
  const isMyProfile = loggedInUser._id === userId

  return (
    <section className="user-details">
      <h1>
        {t('userDetails.fullname', 'Fullname: ')}
        {user.fullname}
      </h1>

      <h5>
        {t('userDetails.credits', 'Credits: ')}
        {`$${user.credits}`}
      </h5>

      {isMyProfile && (
        <section>
          <h2>{t('userDetails.my_stuff', 'My Stuff!')}</h2>
        </section>
      )}

      {/* <ToyList /> */}

      <p>
        User is so lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem,
        placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti
        perspiciatis repellat, enim quibusdam!
      </p>

      <Link to="/">
        {t('userDetails.home', 'Home')}
      </Link>
    </section>
  )
}
