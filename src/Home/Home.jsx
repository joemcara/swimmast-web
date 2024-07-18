import React, { lazy, useEffect, useState } from 'react'
import CustomTable from '../components/CustomTable'
import { Checkbox, Group, Input, InputLabel, Select, Stack } from '@mantine/core'
import CustomSection from '../components/CustomSection'
import CustomFilter from '../components/CustomFilter'
import axios from 'axios'
import useHomeStore from './HomeStore'
import useHomeFilterStore from './HomeFilterStore'
import { IconSearch, IconUser } from '@tabler/icons-react'
import { CustomCheckbox } from '../components/CustomInputs'

function Home() {
    const homeStore = useHomeStore();
    const homeFilterStore = useHomeFilterStore();
    // fill filter selects
    useEffect(() => {
        axios.get("enrollment_status/").then(function (response) {
            const enrollmentStatuses = response.data?.map((status) => ({ value: status.id.toString(), label: status.name }))
            homeStore.setEnrollmentStatuses(enrollmentStatuses)
        }).catch(function (error) { console.log(error) })

        axios.get('course/').then(function (response) {
            const courses = response.data?.map((course) => ({ value: course.id.toString(), label: course.name }))
            homeStore.setCourses(courses)
        }).catch(function (error) { console.log(error) })

        axios.get("payment_status/").then(function (response) {
            const paymentStatuses = response.data?.map((status) => ({ value: status.id.toString(), label: status.name }))
            homeStore.setPaymentStatuses(paymentStatuses)
        }).catch(function (error) { console.log(error) })
    }, [])

    useEffect(() => {
        let url = `http://localhost:8000/api/v2/administration/registered_students/enrollment_status/1/course/1/payment_status/1/page/${homeFilterStore.currentPage}/`
        axios.get(url).then(function (response) {
            homeStore.setStudents(response.data?.data)
            homeStore.setTotalPages(response.data?.pagesTotales)
        }).catch(function (error) { console.log(error) })
    }, [homeFilterStore])
    return (
        <CustomSection
            title="Nadadores registrados"
            icon={<IconUser size={35} />}
            searchBar={<Input
                placeholder='Buscar nadador'
                className='w-2/6'
                radius={"sm"}
                rightSection={<IconSearch />}
            >

            </Input>
            }

        >
            <CustomFilter filter={homeFilterStore}>
                <Stack>
                    <InputLabel className='text-black' size={18} fw={700}>Estado de inscripción</InputLabel>
                    <Group >
                        <CustomCheckbox label="Pendiente" />
                        <CustomCheckbox label="Aprobada" />
                        <CustomCheckbox label="Rechazada" />
                    </Group>
                </Stack>
                <Stack>
                    <InputLabel className='text-black' size={18} fw={700}>Estado de pago</InputLabel>
                    <Group >
                        <CustomCheckbox label="Pendiente" />
                        <CustomCheckbox label="Aprobada" />
                        <CustomCheckbox label="Rechazada" />
                    </Group>
                </Stack>
            </CustomFilter>
            <CustomTable
                headers={["id", "estadoDeSolicitud", 'nombres', 'apellidos', 'celular', 'curso', 'inicioInscripcion', 'finInscripcion', 'estadoDePago']}
                getters={['id', 'enrollment_status', 'first_name', 'last_name', 'cell_phone', 'course', 'enrollment_start_date', 'enrollment_due_date', 'payment_status']}
                data={homeStore.students}
                notification
                voucher
                store={homeStore}
                filter={homeFilterStore}
            />
        </CustomSection>
    )
}

export default Home