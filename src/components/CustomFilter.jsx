import { ActionIcon, Button, Group, InputLabel, Stack } from '@mantine/core'
import { IconFilterCancel } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { CustomButton, CustomCheckbox } from './CustomInputs'
import { randomId, useListState } from '@mantine/hooks'
import axios from 'axios'

function CustomFilter(props) {

    return (
        <Group justify='space-between' >
            {props.children}
            <Stack gap={12}>
                <CustomButton
                    mt={0}
                    text='Aplicar filtros'
                    bgColor='#2C3E50'
                    onClick={props.getData}
                    w={150}
                />
                <CustomButton
                    w={150}
                    mt={0}
                    text='Limpiar filtros'
                    bgColor='#A03333'
                    onClick={props.filter?.resetFilters}
                />
            </Stack>
        </Group>
    )
}

export default CustomFilter