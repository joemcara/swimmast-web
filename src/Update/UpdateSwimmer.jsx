import React, { useEffect } from 'react'
import useRegisterStore from '../Register/RegisterStore';
import { CustomButton, CustomSelect, CustomTextInput } from '../components/CustomInputs';
import useSwimmerFormStore from '../Register/SwimmerFormStore';
import { Group, InputWrapper, Input } from '@mantine/core';
import axios from 'axios';
import CustomSection from '../components/CustomSection';
import { IconUserEdit } from '@tabler/icons-react';

function UpdateSwimmer() {
    const registerStore = useRegisterStore();
    const swimmerFormStore = useSwimmerFormStore();
    const getSelectData = () => {
        axios.get('course_type/').then(function (response) {
            const courseTypes = response.data?.map((courseType) => ({ label: courseType.name, value: courseType.id.toString() }))
            registerStore.setCourseTypes(courseTypes)
        })

        axios.get('enrollment_status/').then(function (response) {
            const enrollmentStatuses = response.data?.map((enrollmentStatus) => ({ label: enrollmentStatus.name, value: enrollmentStatus.id.toString() }))
            swimmerFormStore.setEnrollmentStatus(enrollmentStatuses[1].value)
            registerStore.setEnrollmentStatuses(enrollmentStatuses)
        })

        axios.get('payment_status/').then(function (response) {
            const paymentStatuses = response.data?.map((paymentStatus) => ({ label: paymentStatus.name, value: paymentStatus.id.toString() }))
            registerStore.setPaymentStatuses(paymentStatuses)
        })

        axios.get('course/').then(function (response) {
            const courses = response.data?.map((course) => ({ label: course.name, value: course.id.toString(), course: course }))
            registerStore.setCourses(courses)
        })

        axios.get('role/').then(function (response) {
            let filteredRoles = response.data?.filter(role => role.name !== 'ADMINISTRADOR')
            const roles = filteredRoles?.map(role => ({ label: role.name, value: role.id.toString(), role: role }))
            registerStore.setRoles(roles)
        })
    }
    //FILL SELECTS WITH DATA



    const calculateAge = (birthdate) => {
        if (!birthdate) return 0;
        const birthdateYear = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
        const calculatedAge = currentYear - birthdateYear;
        return calculatedAge.toString();
    };

    const getInstructorData = () => {
        return {
            first_name: swimmerFormStore.names,
            last_name: swimmerFormStore.lastNames,
            email: swimmerFormStore.email,
            role: swimmerFormStore.role,
            password: '12345678',
            confirm_password: '12345678',
        }
    }

    const getSwimmerData = () => {
        if (swimmerFormStore.age < 18) {
            if (swimmerFormStore.representative === '') {
                return showErrorNotification({ message: 'Debe ingresar el nombre del representante' })
            } else if (swimmerFormStore.relationship === '') {
                return showErrorNotification({ message: 'Debe ingresar el vinculo del representante' })
            }
        }

        return {
            first_name: swimmerFormStore.names,
            last_name: swimmerFormStore.lastNames,
            email: swimmerFormStore.email,
            role: swimmerFormStore.role,
            password: '12345678',
            confirm_password: '12345678',
            date_of_birth: swimmerFormStore.birthDate?.toISOString().split('T')[0],
            age: swimmerFormStore.age,
            address: swimmerFormStore.address,
            cell_phone: swimmerFormStore.cellphoneNumber,
            representative_name: swimmerFormStore.representative,
            representative_relationship: swimmerFormStore.relationship,
        }
    }

    const editUser = async () => {
        let data = swimmerFormStore.isInstructor ? getInstructorData() : getSwimmerData();
        let url = 'member/';
        if (swimmerFormStore.role === 'INSTRUCTOR') {
            url = 'instructor/'
        } else if (swimmerFormStore.role === 'DEPORTISTA') {
            url = 'athlete/'
        }
        swimmerFormStore.setRole(null)
        swimmerFormStore.reset();

        axios.put(url, data)
            .then(function (response) {
                getSelectData();
                console.log(response)
            }).catch(function (error) {
                console.log(error)
            })
    }

    useEffect(() => {
        getSelectData();
    }, []);

    return (
        <CustomSection title="Actualizar nadador" icon={<IconUserEdit size={40} />}>
            <form>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 pb-4">
                    <CustomTextInput
                        label=" Nombres"
                        withAsterisk
                        placeholder="Ingrese sus nombres"
                        className='sm:col-span-2'
                        value={swimmerFormStore.names}
                        onChange={e => swimmerFormStore.setNames(e.currentTarget.value)}
                    />
                    <CustomTextInput
                        label="Apellidos"
                        withAsterisk
                        placeholder="Ingrese sus apellidos"
                        className="sm:col-span-2"
                        value={swimmerFormStore.lastNames}
                        onChange={e => swimmerFormStore.setLastNames(e.currentTarget.value)}
                    />

                    {!swimmerFormStore.isInstructor && <div className="sm:col-span-2 grid grid-cols-4 gap-x-3">
                        {/* <CustomDateInput
                        label="Fecha de nacimiento"
                        withAsterisk
                        placeholder="00/00/0000"
                        valueFormat="DD/MM/YYYY"
                        className='sm:col-span-3'
                        value={store.birthDate || new Date()}
                        onChange={(birthdate) => {
                            store.setBirthDate(birthdate);
                            store.setAge(calculateAge(birthdate))
                        }}
                    /> */}
                        <InputWrapper label='Edad:'>
                            <Input value={swimmerFormStore.age || 0} readOnly />
                        </InputWrapper>

                    </div>
                    }
                    <div className='sm:col-span-2 grid sm:grid-cols-7 gap-x-3'>
                        <CustomSelect
                            label="Rol"
                            data={registerStore.roles}
                            className={swimmerFormStore.isInstructor ? 'sm:col-span-7' : 'sm:col-span-4'}
                            value={
                                registerStore.roles?.filter(role => role.label === swimmerFormStore.role)[0]?.value
                                || '0'}
                            onChange={v => {
                                swimmerFormStore.setRole(v)
                                console.log(v)
                                const isInstructor = registerStore.roles?.filter(role => role.value === v)[0]?.label === 'INSTRUCTOR'
                                swimmerFormStore.setIsInstructor(isInstructor)
                            }}
                        />
                        {/* {!store.isInstructor && <CustomTextInput
                        label="#Comprobante "
                        placeholder="Ingrese número de comprobante"
                        className='sm:col-span-3'
                        value={store.voucherNumber}
                        onChange={e => store.setVoucherNumber(e.currentTarget.value)}
                    />} */}

                    </div>
                    <CustomTextInput
                        leftSectionPointerEvents="none"
                        className="sm:col-span-2 "
                        withAsterisk
                        label="Correo Electrónico: "
                        placeholder="nombre@dominio.com"
                        value={swimmerFormStore.email}
                        onChange={e => swimmerFormStore.setEmail(e.currentTarget?.value)}
                    />

                    {!swimmerFormStore.isInstructor && <>
                        <CustomTextInput
                            leftSectionPointerEvents="none"
                            withAsterisk
                            label="Dirección"
                            placeholder="Ingrese dirección"
                            className="sm:col-span-2"
                            value={swimmerFormStore.address}
                            onChange={e => swimmerFormStore.setAddress(e.currentTarget?.value)}
                        />

                        {/* <CustomTextInput
                        leftSectionPointerEvents="none"
                        withAsterisk={store.age < 18}
                        label="Representante: "
                        placeholder="Ingrese el nombre del representante"
                        className="sm:col-span-2"
                        value={store.representantive}
                        onChange={e => store.setRepresentative(e.currentTarget?.value)}
                    /> */}
                        <div className='sm:col-span-2 grid sm:grid-cols-7 gap-x-3'>
                            {/* <CustomTextInput
                            label="Vínculo:"
                            placeholder="Escriba el vínculo"
                            withAsterisk={store.age < 18}
                            className="sm:col-span-4"
                            value={store.relationship}
                            onChange={e => store.setRelationship(e.currentTarget?.value)}
                        /> */}

                            <CustomTextInput
                                leftSectionPointerEvents="none"
                                withAsterisk
                                label="Teléfono: "
                                placeholder="Ingrese telefono"
                                className="sm:col-span-3"
                                value={swimmerFormStore.cellphoneNumber}
                                onChange={e => swimmerFormStore.setCellphoneNumber(e.currentTarget?.value)}
                            />
                        </div>

                    </>}
                </div>
                <Group justify="center">
                    <CustomButton onClick={editUser} text={"Guardar"} bgColor={'#15192F'} />
                </Group>
            </form>
        </CustomSection>
    )
}

export default UpdateSwimmer