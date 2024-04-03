import { Table } from '@mantine/core'
import React from 'react'

function CustomTable(props) {
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
                                    {header}
                                </Table.Th>
                            );
                        })}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {/* {props.data?.map(element => {
                    return (
                        <Table.Tr>
                            <Table.Td>
                                {element.}
                            </Table.Td>
                        </Table.Tr>
                    );
                })} */}
                    {props.children}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}

export default CustomTable