import { PieChart } from "../cmps/PieChart.jsx"
import { BarChart } from "../cmps/BarChart.jsx"
import { LineChart } from "../cmps/LineChart.jsx"
import { toyService } from "../services/toy.service.js"
import { loadToys } from "../store/actions/toy.actions.js"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export function Dashboard() {
  const { t } = useTranslation()
  const toys = useSelector(storeState => storeState.toyModule.toys);

  useEffect(() => {
    loadToys()
  }, [])

  const toyLabels = toyService.getLabels(toys);

  return (
    <section className="toy-stats">
      <h1>{t("dashboard.title", "Toys Store Statistics")}</h1>

      <BarChart toys={toys} labels={toyLabels} />
      <PieChart toys={toys} labels={toyLabels} />
      <LineChart toys={toys} />
    </section>
  )
}
