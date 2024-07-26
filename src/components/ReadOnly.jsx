import { InputLabel, Text } from '@mantine/core'
import React from 'react'

function ReadOnly(props) {
    return (
        <div className='bg-[#F1F3F5]'>
            <InputLabel >{props.label}</InputLabel>
            <p >{props.text}</p>
        </div>
    )
}

export default ReadOnly