import { ActionIcon, Table } from '@mantine/core'
import { IconBellRinging, IconPhone, IconPhoto } from '@tabler/icons-react'
import React, { useEffect } from 'react'

function CustomTable(props) {

    function camelToSentence(text) {
        // Split the camel case string into words
        const words = text.split(/([A-Z][a-z]+)/);

        // Capitalize the first word and lowercase the rest
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
        for (let i = 1; i < words.length; i++) {
            words[i] = words[i].toLowerCase();
        }

        // Join the words back with spaces
        return words.join(' ');
    }

    const cellColor = (cell) => {
        if (cell === "en curso" || cell === "aceptada") return "text-green-600 font-semibold"
        else if (cell === "inactivo" || cell === "rechazada") return "text-red-800 font-semibold"
        else if (cell === "por empezar" || cell === "pendiente") return "text-yellow-600 font-semibold"
        else return ""
    }

    return (
        <Table.ScrollContainer className='mt-6' >
            <Table striped highlightOnHover classNames={{
                th: "text-center  justify-center"
            }}>
                <Table.Thead>
                    <Table.Tr>
                        {props.headers?.map(header => {
                            return (
                                <Table.Th>
                                    {camelToSentence(header)}
                                </Table.Th>
                            );
                        })}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {props.data?.map((element) => {
                        let cells = Object.values(element)
                        return <Table.Tr>
                            {cells.map(cell =>
                                <Table.Td className={cellColor(cell)}>
                                    {cell}
                                </Table.Td>)}
                            {props.notification &&
                                <Table.Td>
                                    <ActionIcon bg={"transparent"}>
                                        <IconBellRinging color='black' bg="black" />
                                    </ActionIcon>
                                </Table.Td>
                            }
                            {props.voucher &&
                                <Table.Td>
                                    <ActionIcon bg={"transparent"}>
                                        <IconPhoto color='black' bg="black" />
                                    </ActionIcon>
                                </Table.Td>
                            }
                        </Table.Tr>
                    })}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}

export default CustomTable