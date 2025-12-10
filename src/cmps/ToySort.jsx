import { SelectSmall } from './Select.jsx'

export function ToySort({ onSetFilter }) {

    function handleChange(value) {
        onSetFilter(prev => ({ ...prev, sortBy: value }))
    }

    const options = { txt: 'Text', price: 'Price', created: 'Created At' }

    return (
        <SelectSmall
            inputLbl={'sort'}
            options={options}
            onChange={handleChange} />
    )
}
