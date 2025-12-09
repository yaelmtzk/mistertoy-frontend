// const { useState, useEffect, useRef } = React
import { useEffect, useRef, useState } from "react"
import { useSelector } from 'react-redux'
import { utilService } from "../services/util.service.js"
import { LabelSelector } from './LabelSelect.jsx'
import { ToySort } from './ToySort.jsx'


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    const labels = useSelector(storeState => storeState.toyModule.labels)

    useEffect(() => {
       debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onLabelChange(selectedLabels) {
		setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: selectedLabels }))
	}

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="vendor">Name:</label>
                <input type="text"
                    id="vendor"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />
            </form>

            <LabelSelector labels={labels} onLabelChange={onLabelChange} />

            <ToySort filterBy={filterBy} onSetFilter={onSetFilter}/>
        </section>
    )
}