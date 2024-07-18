import { ActionIcon, Button, Group, Stack } from '@mantine/core'
import { IconFilterCancel } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import { CustomButton } from './CustomInputs'

function CustomFilter(props) {
    return (
        <Group justify='space-between' >
            {props.children}
            <Stack gap={12}>
                <CustomButton
                    mt={0}
                    text='Aplicar filtros'
                    bgColor='#2C3E50'
                    onClick={props.filter?.closeFilter}
                    w={150}
                />
                <CustomButton
                    w={150}
                    mt={0}
                    text='Limpiar filtros'
                    bgColor='#A03333'
                    onClick={props.filter?.closeFilter}
                />
            </Stack>
        </Group>
    )
}

export default CustomFilter