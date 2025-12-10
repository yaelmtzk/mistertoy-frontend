import { PieChart } from '../cmps/PieChart.jsx'
import { BarChart } from '../cmps/BarChart.jsx'
import { LineChart } from '../cmps/LineChart.jsx'
import { toyService } from '../services/toy.service.js'
import { loadToys } from '../store/actions/toy.actions.js'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export function Dashboard() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    
    useEffect(() => {
        loadToys()
    }, [])
    
    const toyLabels = toyService.getLabels(toys)

    return (
        <section className='toy-stats'>
            <h1>Toys Store Statistics</h1>
            <BarChart toys={toys} labels={toyLabels} />
            <PieChart toys={toys} labels={toyLabels} />
            <LineChart toys={toys} />
        </section>

    )
}