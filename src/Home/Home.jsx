import React, { lazy, useEffect, useState } from 'react'
import CustomTable from '../components/CustomTable'
import { Group, InputLabel, Select } from '@mantine/core'
import CustomSection from '../components/CustomSection'
import CustomFilter from '../components/CustomFilter'
import axios from 'axios'
import useHomeStore from './HomeStore'
import useHomeFilterStore from './HomeFilterStore'

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
        console.log(`administrador/registered-students/applicants/${homeFilterStore.enrollmentStatus || 'todos'}/curso/${homeFilterStore.course || 'todos'}/estado-pago/${homeFilterStore.paymentStatus || 'todos'}/pagina/${homeFilterStore.currentPage}/`)
        axios.get(`administrador/registered-students/applicants/${homeFilterStore.enrollmentStatus || 'todos'}/curso/${homeFilterStore.course || 'todos'}/estado-pago/${homeFilterStore.paymentStatus || 'todos'}/pagina/${homeFilterStore.currentPage}/`).then(function (response) {
            homeStore.setStudents(response.data?.data)
            homeStore.setTotalPages(response.data?.pagesTotales)
        }).catch(function (error) { console.log(error) })
    }, [homeFilterStore])
    return (
        <CustomSection title="Estudiantes registrados">
            <CustomFilter filter={homeFilterStore}>
                <Group >
                    <InputLabel className='text-system-label-blue' size={18} fw={700}>Solicitud</InputLabel>
                    <Select
                        data={homeStore.enrollmentStatuses}
                        value={homeFilterStore.enrollmentStatus}
                        onChange={homeFilterStore.setEnrollmentStatus}
                    />
                </Group>
                <Group >
                    <InputLabel className='text-system-label-blue' size={18} fw={700}>Curso</InputLabel>
                    <Select
                        data={homeStore.courses}
                        value={homeFilterStore.course}
                        onChange={homeFilterStore.setCourse}
                    />
                </Group>
                <Group >
                    <InputLabel className='text-system-label-blue' size={18} fw={700}>Estado de pago</InputLabel>
                    <Select
                        data={homeStore.paymentStatuses}
                        value={homeFilterStore.paymentStatus}
                        onChange={homeFilterStore.setPaymentStatus}
                    />
                </Group>
            </CustomFilter>
            <CustomTable
                headers={["id", "solicitudInscripcion", 'nombres', 'apellidos', 'celular', 'curso', 'inicioInscripcion', 'finInscripcion', 'estadoPago']}
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