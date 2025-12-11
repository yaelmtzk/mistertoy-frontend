import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend
)

export function LineChart({ toys }) {
  const { t } = useTranslation()

  const dates = toys
    .map(toy => toy.createdAt)
    .sort((a, b) => a - b)
    .map(ts => new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }))

  const labels = [...new Set(dates)]

  const data = {
    labels,
    datasets: [
      {
        label: t("dashboard.amount", "Amount"),
        data: labels.map(lbl => dates.filter(dt => dt === lbl).length),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } }
  }

  return (
    <section className="line-chart chart">
      <h2>{t("dashboard.line_chart_title", "Toys added by date")}</h2>
      <Line options={options} data={data} />
    </section>
  )
}
