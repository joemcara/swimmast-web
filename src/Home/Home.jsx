import React, { useEffect, useState } from 'react'
import CustomTable from '../components/CustomTable'
import { Group, InputLabel, Select } from '@mantine/core'
import CustomSection from '../components/CustomSection'
import CustomFilter from '../components/CustomFilter'
import axios from 'axios'

function Home() {
    const exampleData = [{
        id: 1,
        solicitudInscripcion: "aceptada",
        nombres: "David",
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
        nombres: "Andres",
        apellidos: "Guerrero",
        correo: "adborbor@espol.edu.ec",
        curso: "1",
        inicioInscripcion: "21-11-2023",
        finInscripcion: "21-11-2023",
        estadoPago: "PAGADO",
    }]
    const [data, setData] = useState([])
    const exampleHeaders = Object.keys(exampleData[0]).concat("notificar", "comprobante")
    useEffect(() => {
        axios.get("administrador/estudiantes-registrados/solicitud/1/curso/1/estado-pago/1/pagina/1/").then(function (response) {
            setData(response.data)

        }).catch(function (error) { console.log(error) })
    }, [])
    return (
        <CustomSection title="Estudiantes registrados">
            <CustomFilter>
                <Group >
                    <InputLabel className='text-system-label-blue' size={18} fw={700}>Solicitud</InputLabel>
                    <Select
                        data={["aceptada", "Inactivo", "Reservado"]}
                        defaultValue={"x"}
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
                headers={["id", "solicitudInscripcion", 'nombres', 'apellidos', 'celular', 'curso', 'inicioInscripcion', 'finInscripcion', 'estadoPago']}
                data={data.data}
                notification
                voucher
            />
        </CustomSection>
    )
}

export default Home