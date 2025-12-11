import { useState } from 'react'
import { useTranslation } from "react-i18next"

export function Chat() {
  const { t } = useTranslation()
  const [msgs, setMsgs] = useState([])
  const [msgToSend, setMsgToSend] = useState('')

  function sendMsg(ev) {
    ev.preventDefault()
    if (!msgToSend.trim()) return

    const userMsg = { text: msgToSend, sender: 'user' }
    setMsgs(prev => [...prev, userMsg])
    setMsgToSend('')

    setTimeout(() => {
      const botMsg = { 
        text: t("chat.bot_reply", "Bot: Sure, no problems"),
        sender: 'bot'
      }
      setMsgs(prev => [...prev, botMsg])
    }, 1000)
  }

  return (
    <section className="chat-container">
      <div className="chat-msgs">
        {msgs.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <form onSubmit={sendMsg}>
          <input
            type="text"
            value={msgToSend}
            onChange={ev => setMsgToSend(ev.target.value)}
            placeholder={t("chat.placeholder", "Type a message...")}
            autoComplete="off"
          />
          <button className="btn">{t("chat.send", "Send")}</button>
        </form>
      </div>
    </section>
  )
}
