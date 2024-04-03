import React from 'react'
import CustomTable from '../components/CustomTable'
import { ActionIcon, Group, Input, InputLabel, Select, Table } from '@mantine/core'
import { IconBellFilled, IconBellRinging, IconBellRingingFilled, IconFilter, IconFilterCancel, IconPhoto } from '@tabler/icons-react'
import CustomSection from '../components/CustomSection'
import CustomFilter from '../components/CustomFilter'

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
        id: 2,
        solicitudInscripcion: "rechazada",
        nombres: "Andres David",
        apellidos: "Borbor Guerrero",
        correo: "adborbor@espol.edu.ec",
        curso: "1",
        inicioInscripcion: "21-11-2023",
        finInscripcion: "21-11-2023",
        estadoPago: "PAGADO",
    }]
    const exampleHeaders = Object.keys(exampleData[0]).concat("notificar", "comprobante")

    return (
        <CustomSection title="Estudiantes registrados">
            <CustomFilter>
                <Group >
                    <InputLabel className='text-system-label-blue' size={18} fw={700}>Solicitud</InputLabel>
                    <Select
                        data={["ACEPTADA", "PENDIENTE", "NEGADA"]}
                    />
                </Group>
                <Group >
                    <InputLabel className='text-system-label-blue' size={18} fw={700}>Curso</InputLabel>
                    <Select
                        data={["C01", "C02"]}
                    />
                </Group>
                <Group >
                    <InputLabel className='text-system-label-blue' size={18} fw={700}>Estado de pago</InputLabel>
                    <Select
                        data={["PAGADO", "ABONADO", "NO PAGADO"]}
                    />
                </Group>
            </CustomFilter>
            <CustomTable
                headers={exampleHeaders}
                data={exampleData.concat(exampleData, exampleData, exampleData, exampleData)}
                notification
                voucher
            />
        </CustomSection>
    )
}

export default Home