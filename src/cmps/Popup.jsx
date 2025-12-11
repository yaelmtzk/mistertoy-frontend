import { useTranslation } from "react-i18next"

export function Popup({ heading, children, footing, onClose }) {
    const { t, i18n } = useTranslation()
    
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={ev => ev.stopPropagation()}>
                {heading && <header className="popup-header">{heading}</header>}
                <main className="popup-main">{children}</main>
                {footing && <footer className="popup-footer">{footing}</footer>}
            </div>
        </div>
    )
}
