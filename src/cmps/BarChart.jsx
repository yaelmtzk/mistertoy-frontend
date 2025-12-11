import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2"
import { useTranslation } from "react-i18next"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function BarChart({ labels, toys }) {
  const { t } = useTranslation()

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" }
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: t("dashboard.average", "Average"),
        data: labels.map(lbl => {
          const filtered = toys.filter(toy => toy.inStock && toy.labels.includes(lbl))
          return filtered.length
            ? Math.floor(filtered.reduce((acc, toy) => acc + toy.price, 0) / filtered.length)
            : 0
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  return (
    <section className="bar-chart chart">
      <h2>{t("dashboard.bar_chart_title", "Average prices per label")}</h2>
      <Bar options={options} data={data} />
    </section>
  )
}
