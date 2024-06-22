import { ActionIcon, Group } from '@mantine/core'
import { IconFilterCancel } from '@tabler/icons-react'
import React, { useEffect } from 'react'

function CustomFilter(props) {
    return (
        <Group gap={12}>
            {props.children}
            <ActionIcon bg={"transparent"} onClick={props.filter?.restablecer}>
                <IconFilterCancel color='black' />
            </ActionIcon>
        </Group>
    )
}

export default CustomFilter