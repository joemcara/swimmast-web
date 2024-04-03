import React from 'react'
import Section from '../components/Section'
import CustomTable from '../components/CustomTable'
import { ActionIcon, Table } from '@mantine/core'
import { IconBellFilled, IconBellRinging, IconBellRingingFilled, IconPhoto } from '@tabler/icons-react'

function Home() {
    const exampleData = [{
        id: 1,
        solicitudInscripcion: "aceptada",
        nombres: "Andres David",
        apellidos: "Borbor Guerrero",
        correo: "adborbor@espol.edu.ec",
        curso: "1",
        inicioInscripcion: "21-11-2023",
        finInscripcion: "21-11-2023",
        estadoPago: "PAGADO",
    },
    {
        id: 1,
        solicitudInscripcion: "rechazada",
        nombres: "Andres David",
        apellidos: "Borbor Guerrero",
        curso: "1",
        correo: "adborbor@espol.edu.ec",
        inicioInscripcion: "21-11-2023",
        finInscripcion: "21-11-2023",
        estadoPago: "PAGADO",
    }]

    const inscriptionRequestColor = (element) => {
        switch (element) {
            case "aceptada":
                return "text-green-600"
            case "rechazada":
                return "text-red-800"
            case "pendiente":
                return "text-yellow-200"
            default:
                return "text-blue-200"
        }
    }

    return (
        <Section title="Estudiantes registrados">
            <CustomTable
                headers={["ID", "Solicitud inscripción", "Nombres y Apellidos", "Correo", "Curso", "Inicio inscripción", "Fin inscripción", "Estado de pago", "Notificar", "Comprobante"]}
            >
                {exampleData?.map(element =>
                    <Table.Tr>
                        <Table.Td>
                            {element.id}
                        </Table.Td>
                        <Table.Td className={inscriptionRequestColor(element.solicitudInscripcion)}>
                            {element.solicitudInscripcion}
                        </Table.Td>
                        <Table.Td>
                            {element.nombres + " " + element.apellidos}
                        </Table.Td>
                        <Table.Td>
                            {element.correo}
                        </Table.Td>
                        <Table.Td>
                            {element.curso}
                        </Table.Td>
                        <Table.Td>
                            {element.inicioInscripcion}
                        </Table.Td>
                        <Table.Td>
                            {element.finInscripcion}
                        </Table.Td>
                        <Table.Td>
                            {element.estadoPago}
                        </Table.Td>
                        <Table.Td>
                            <ActionIcon bg={"transparent"}>
                                <IconBellRinging color='black' bg="black" />
                            </ActionIcon>
                        </Table.Td>
                        <Table.Td>
                            <ActionIcon bg={"transparent"}>
                                <IconPhoto color='black' />
                            </ActionIcon>
                        </Table.Td>
                    </Table.Tr>)}
            </CustomTable>
        </Section>
    )
}

export default Home