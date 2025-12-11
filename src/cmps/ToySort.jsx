import { SelectSmall } from './Select.jsx'
import { useTranslation } from "react-i18next"

export function ToySort({ onSetFilter }) {
    const { t, i18n } = useTranslation()

    function handleChange(value) {
        onSetFilter(prev => ({ ...prev, sortBy: value }))
    }

    const options = { txt: 'Text', price: 'Price', created: 'Created At' }

    return (
        <SelectSmall
            inputLbl={t("toySort.sort", "Sort")}
            options={options}
            onChange={handleChange} />
    )
}
