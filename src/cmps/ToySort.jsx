
export function ToySort({ filterBy, onSetFilter }) {
    function handleChange({ target }) {
        let value = target.value
        onSetFilter(prev => ({ ...prev, sortBy: value }))
    }

    return (
        <div className="sort-container">
            <label>Sort 
                <select
                    value={filterBy.sortBy}
                    onChange={handleChange}
                    id="sort"
    >
                    <option value="">Sort By</option>
                    <option value="txt">Text</option>
                    <option value="price">Price</option>
                    <option value="created">Created At</option>
                </select>                
            </label>
        </div>
    )
}
