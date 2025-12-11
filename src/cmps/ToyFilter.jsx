import { useEffect, useRef, useState } from "react"
import { useSelector } from 'react-redux'
import { utilService } from "../services/util.service.js"
import { LabelSelector } from './LabelSelect.jsx'
import { ToySort } from './ToySort.jsx'
import { SelectSmall } from './Select.jsx'
import { useTranslation } from "react-i18next"

export function ToyFilter({ filterBy, onSetFilter }) {
  const { t } = useTranslation()

  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))
  const labels = useSelector(s => s.toyModule.labels)

  useEffect(() => {
    debouncedOnSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = type === 'number' ? +value : value
    setFilterByToEdit(prev => ({ ...prev, [field]: value }))
  }

  function onLabelChange(selected) {
    setFilterByToEdit(prev => ({ ...prev, labels: selected }))
  }

  function onStockChange(selected) {
    setFilterByToEdit(prev => ({ ...prev, stock: selected }))
  }

  return (
    <section className="toy-filter full main-layout">
      <h2>{t("toyFilter.title", "Toys Filter")}</h2>

      <form>
        <label htmlFor="vendor">{t("toyFilter.name", "Name:")}</label>
        <input
          type="text"
          id="vendor"
          name="txt"
          placeholder={t("toyFilter.name_placeholder", "By name")}
          value={filterByToEdit.txt}
          onChange={handleChange}
        />

        <label htmlFor="maxPrice">{t("toyFilter.max_price", "Max price:")}</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder={t("toyFilter.max_price_placeholder", "By max price")}
          value={filterByToEdit.maxPrice || ''}
          onChange={handleChange}
        />
      </form>

      <LabelSelector labels={labels} onLabelChange={onLabelChange} />

      <ToySort onSetFilter={setFilterByToEdit} />

      <SelectSmall
        inputLbl= {t("toyFilter.stock", "stock")}
        options={{
          true: t("toyFilter.stock_true", "In Stock"),
          false: t("toyFilter.stock_false", "Out of Stock")
        }}
        onChange={onStockChange}
      />
    </section>
  )
}
