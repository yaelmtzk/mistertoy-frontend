import { useEffect, useState } from "react"

export function ToySort({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        // Notify parent immediately
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let value = target.value

        if (target.type === 'number' || target.type === 'range') {
            value = +value || ''
        } else if (target.type === 'checkbox') {
            value = target.checked
        }

        setFilterByToEdit(prev => ({ ...prev, sortBy: value }))
    }

    return (
        <div className="sort-container">
            <select
                value={filterByToEdit.sortBy}
                onChange={handleChange}
                id="sort"
>
                <option value="">Sort By</option>
                <option value="txt">Text</option>
                <option value="price">Max Price</option>
                <option value="created">Created At</option>
            </select>
        </div>
    )
}
