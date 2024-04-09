import { ActionIcon, Group } from '@mantine/core'
import { IconFilterCancel } from '@tabler/icons-react'
import React from 'react'

function CustomFilter(props) {
    return (
        <Group gap={12}>
            {props.children}
            <ActionIcon bg={"transparent"} onClick={() => console.log("reset filters")}>
                <IconFilterCancel color='black' />
            </ActionIcon>
        </Group>
    )
}

export default CustomFilter