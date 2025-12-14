import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"

export function SelectSmall({ inputLbl, options, onChange }) {
    const [selectedOpt, setSelectedOpt] = useState("")
    const { t } = useTranslation()

    function handleChange(ev) {
        const newOpt = ev.target.value
        setSelectedOpt(newOpt)
        onChange(newOpt)
    }

    return (
        <form className="select-wrapper">
            <label htmlFor={`${inputLbl}-select`}>
                {inputLbl.charAt(0).toUpperCase() + inputLbl.slice(1)}
            </label>

            <select
                id={`${inputLbl}-select`}
                className="select-small"
                value={selectedOpt}
                onChange={handleChange}
            >
                <option value="">{t("select.none", "None")}</option>

                {Object.entries(options).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}
            </select>
        </form>
    );
}


// export function SelectSmall({ options, onChange, inputLbl }) {
//   const [open, setOpen] = useState(false)
//   const [selected, setSelected] = useState("")
//   const wrapperRef = useRef(null)

//   function handleSelect(value) {
//     setSelected(value)
//     setOpen(false)
//     onChange(value)
//   }

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setOpen(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [])

//   return (
//     <div className="select-wrapper" ref={wrapperRef}>
//       <div
//         className={`select-display ${open ? "open" : ""}`}
//         onClick={() => setOpen(!open)}
//       >
//         {selected ? options[selected] : 'None'}
//         <span className="arrow">▾</span>
//       </div>

//       {open && (
//         <ul className="select-dropdown">
//           {Object.entries(options).map(([key, label]) => (
//             <li
//               key={key}
//               className="option"
//               onClick={() => handleSelect(key)}
//             >
//               {label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
