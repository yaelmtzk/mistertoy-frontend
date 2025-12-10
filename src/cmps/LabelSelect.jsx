import {SelectSmall} from './Select.jsx'

export function LabelSelector({ labels, onLabelChange }) {

  const formattedLbls =  Object.fromEntries(labels.map(lbl => [lbl, lbl]))

  return (
      <SelectSmall 
      inputLbl={'labels'} 
      options={formattedLbls}
      onChange={onLabelChange}/>
  )
}
