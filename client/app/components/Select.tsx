'use client'

import Select, { SingleValue } from 'react-select'

type option = {
    value: string
    label: string
}

interface Props {
    defaultVal?: option
    value?: option
    options: option[]
    isDisabled?: boolean
    handleValue: (val: string) => void
}

function SelectComp({ defaultVal, value, options, isDisabled, handleValue }: Props) {

    const handleChange = (val: SingleValue<option>) => {
        handleValue(val!.value)
    }

    return (
        <div className='py-4'>
            <Select
                isDisabled={isDisabled}
                value={value}
                options={options}
                defaultValue={defaultVal}
                placeholder='Select'
                onChange={(val) => handleChange(val)}
                isSearchable
                noOptionsMessage={() => 'No year found'}
            />
        </div>
    )
}

export default SelectComp