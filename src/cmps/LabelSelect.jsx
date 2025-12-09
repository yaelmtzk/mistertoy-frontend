import { useEffect, useState } from "react"

export function LabelSelector({ labels, onLabelChange }) {

  const [selectedLabel, setSelectedLabel] = useState('')

  useEffect(() => {
    onLabelChange(selectedLabel)
  }, [selectedLabel])

  function handleLabelChange(ev) {
    const newLbl = ev.target.value
    setSelectedLabel(newLbl)
  }

  return (
    <label>Label
      <select value={selectedLabel} onChange={(ev) => handleLabelChange(ev)}
        id="toy-labels">
        <option value="" >Select</option>
        {labels.map(label =>
          <option key={label} value={label}>{label}</option>)}
      </select>
    </label>
  )
}
