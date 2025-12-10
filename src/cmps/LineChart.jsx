
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export function LineChart({ toys }) {

    const dates = toys
        .map(toy => toy.createdAt)
        .sort((a, b) => a - b)
        .map(ts => new Date(ts).toLocaleDateString("en-US", {
                month: "short", year: "numeric",
            })
        )

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    }

    const labels = [...new Set(dates)]
    const data = {
        labels,
        datasets: [
            {
                label: "Date",
                data: labels.map(lbl =>
                    dates.filter(dt => dt === lbl).length),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    }

    return (
        <section className="line-chart chart">
            <h2>Toys added by date</h2>
            <Line options={options} data={data} />
        </section>
    )
}