import { ActionIcon, Group, Modal, Pagination, Table } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconBellRinging, IconPhone, IconPhoto } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import snachesOrcasLogo from '../assets/snachesOrcasLogo.png'
import { useNavigation } from 'react-router-dom';
function CustomTable(props) {
    const [opened, { toggle }] = useDisclosure(false);
    const navigate = useNavigation()
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
        if (cell === "en curso" || cell === "APROBADA") return "text-green-600 font-semibold"
        else if (cell === "inactivo" || cell === "RECHAZADA") return "text-red-800 font-semibold"
        else if (cell === "por empezar" || cell === "PENDIENTE") return "text-yellow-600 font-semibold"
        else return ""
    }

    return (
        <div>
            <Modal
                opened={opened}
                onClose={toggle}
                size={'40rem'}
                className='flex justify-center items-center'
                styles={{ body: { padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' } }}
            >
                <img src={snachesOrcasLogo} alt="a" loading='lazy' height={300} width={300} />
            </Modal>
            <Table.ScrollContainer className='absolute mt-6' >
                <Table striped highlightOnHover classNames={{
                    th: "text-center  justify-center"
                }}>
                    <Table.Thead>
                        <Table.Tr>
                            {props.headers?.map((header, index) => {
                                return (
                                    <Table.Th key={header}>
                                        {camelToSentence(header)}
                                    </Table.Th>
                                );
                            })}
                            {props.notification &&
                                <Table.Th>
                                    Notificar
                                </Table.Th>
                            }
                            {props.voucher &&
                                <Table.Th>
                                    Comprobante
                                </Table.Th>
                            }
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {props.data?.map((element, index) => {
                            let values = Object.values(element)
                            let keys = Object.keys(element)
                            return <Table.Tr key={element.id} onClick={e => {
                                props.store?.setSelectedItem(element)
                                console.log(element)
                                localStorage.setItem('selectedItem', JSON.stringify(element))

                                window.location.href = '/actualizar'
                            }}>
                                {props.getters?.map(value => {
                                    return <Table.Td className={cellColor(element[value])} key={element[value]} >
                                        {element[value]}
                                    </Table.Td>
                                }
                                )}
                                {props.notification &&
                                    <Table.Td>
                                        <ActionIcon bg={"transparent"} onClick={e => {
                                            e.stopPropagation()
                                        }}>
                                            <IconBellRinging color='black' bg="black" />
                                        </ActionIcon>
                                    </Table.Td>
                                }
                                {props.voucher &&
                                    <Table.Td>
                                        <ActionIcon bg={"transparent"}
                                            onClick={e => {
                                                e.stopPropagation()
                                                toggle()
                                            }}>
                                            <IconPhoto color='black' bg="black" />
                                        </ActionIcon>
                                    </Table.Td>
                                }
                            </Table.Tr>
                        })}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <Group justify='center'>
                <Pagination
                    total={props.store?.totalPages || 1}
                    value={props.filter?.currentPage}
                    onChange={props.filter?.setCurrentPage}
                    siblings={0}
                    color='#2C3E50'
                />
            </Group>
        </div>
    )
}

export default CustomTable