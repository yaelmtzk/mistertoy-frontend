import { useTranslation } from "react-i18next"
import {SelectSmall} from './Select.jsx'

export function LabelSelector({ labels, onLabelChange }) {
  const { t, i18n } = useTranslation()
  const formattedLbls =  Object.fromEntries(labels.map(lbl => [lbl, lbl]))

  return (
    <SelectSmall
      inputLbl= {t("toyFilter.labels", "labels")}
      options={formattedLbls}
      onChange={onLabelChange}
    />
  )
}
