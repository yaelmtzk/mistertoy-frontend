import { useEffect, useState } from "react"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useTranslation } from "react-i18next"

export function SelectSmall({ inputLbl, options, onChange }) {
    const { t, i18n } = useTranslation()
    const [selectedOpt, setSelectedOpt] = useState('')

    useEffect(() => {
        onChange(selectedOpt)
    }, [selectedOpt])

    function handleChange(ev) {
        const newOpt = ev.target.value
        setSelectedOpt(newOpt)
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 100 }} size="small">
            <InputLabel id={`${inputLbl} select-small-label`}>
                {inputLbl.charAt(0).toUpperCase() + inputLbl.slice(1)}
            </InputLabel>
            <Select
                className="select-small"
                labelId={`${inputLbl} select-small-label`}
                id={`${inputLbl} select-small`}
                value={selectedOpt}
                label={inputLbl}
                onChange={(ev) => handleChange(ev)}
                
            >
                <MenuItem
                    value="">
                    <em>{t("select.none", "None")}</em>
                </MenuItem>
                {Object.entries(options).map(([key, value]) =>
                    <MenuItem
                        key={key}
                        value={key}>
                        <em>{value}</em>
                    </MenuItem>)
                }
            </Select>
        </FormControl>
    )
}