import { ActionIcon, Group, Input, Select, Button, TextInput, NumberInput, FileInput, Text, InputWrapper, InputLabel, MultiSelect } from '@mantine/core'
import { IconPhoto, IconCash, IconClock } from '@tabler/icons-react'
import CustomSection from '../components/CustomSection'
import { useEffect, useRef, useState } from 'react';
import { DateInput, TimeInput } from '@mantine/dates';
import { Tabs, rem } from '@mantine/core';
import axios from 'axios';
import { CustomButton, CustomDateInput, CustomDatePickerInput, CustomMultiSelect, CustomNumberInput, CustomSelect, CustomTextInput, SelectPaymentMethod } from '../components/CustomInputs';
import useCourseFormStore from '../Register/CourseFormStore';
import useRegisterStore from '../Register/RegisterStore';
import { showDefaultNotificaion, showErrorNotification, showLoadingNotification, updateErrorLoadingNotification, updateSuccessLoadingNotification } from '../util/CustomNotifications';
import useSwimmerFormStore from '../Register/UserFormStore';
import useHomeStore from '../Home/HomeStore';

const RegisterMemberForm = ({ store }) => {
    const registerStore = useRegisterStore();

    const getSelectData = () => {
        axios.get('course_type/').then(function (response) {
            const courseTypes = response.data?.map((courseType) => ({ label: courseType.name, value: courseType.id.toString() }))
            registerStore.setCourseTypes(courseTypes)
        })

        axios.get('enrollment_status/').then(function (response) {
            const enrollmentStatuses = response.data?.map((enrollmentStatus) => ({ label: enrollmentStatus.name, value: enrollmentStatus.id.toString() }))
            store.setEnrollmentStatus(enrollmentStatuses[1].value)
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
            const roles = filteredRoles?.map(role => ({ label: role.name, value: role.id.toString() }))
            registerStore.setRoles(roles)
        })
    }
    //FILL SELECTS WITH DATA
    useEffect(() => {
        getSelectData();
    }, []);


    const calculateAge = (birthdate) => {
        if (!birthdate) return 0;
        const birthdateYear = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
        const calculatedAge = currentYear - birthdateYear;
        return calculatedAge.toString();
    };

    const getInstructorData = () => {
        return {
            first_name: store.names,
            last_name: store.lastNames,
            email: store.email,
            role: store.role,
            password: '12345678',
            confirm_password: '12345678',
        }
    }

    const getSwimmerData = () => {
        if (store.age < 18) {
            if (store.representative === '') {
                return showErrorNotification({ message: 'Debe ingresar el nombre del representante' })
            } else if (store.relationship === '') {
                return showErrorNotification({ message: 'Debe ingresar el vinculo del representante' })
            }
        }

        return {
            first_name: store.names,
            last_name: store.lastNames,
            email: store.email,
            role: store.role,
            password: '12345678',
            confirm_password: '12345678',
            date_of_birth: store.birthDate?.toISOString().split('T')[0],
            age: store.age,
            address: store.address,
            cell_phone: store.cellphoneNumber,
            representative_name: store.representative,
            representative_relationship: store.relationship,
        }
    }

    const saveUser = async () => {
        const notificationId = showLoadingNotification({ message: 'Creando registro de usuario' })
        let data = store.isInstructor ? getInstructorData() : getSwimmerData();
        let url = 'register/';
        axios.post(url, data)
            .then(function (response) {
                if (!store.isInstructor) {
                    return enrollSwimmer(response.data.id, 1)
                }
                store.reset();
                getSelectData();
                return updateSuccessLoadingNotification(notificationId)
            }).catch(function (error) {
                return updateErrorLoadingNotification(notificationId)

            })
    }

    const enrollSwimmer = (swimmerId, notificationId) => {
        let url = 'enrollment/generate_enrollment/';
        axios.post(url, {
            applicant: swimmerId,
            course: store.course,
            status: store.enrollmentStatus,
        }).then(function (response) {
            const enrollmentId = response.data.id
            return generatePaymentReceipt(enrollmentId, notificationId)
        }).catch(function (error) {
            // DELETE USER IF ENROLLMENT CREATION FAILS
            console.log(error)
            return updateErrorLoadingNotification(notificationId)

        })
    }
    const generatePaymentReceipt = (enrollmentId, notificationId) => {
        let course = registerStore.courses?.find(course => course.value === store.course)?.course
        console.log("payment_value", store.credit)
        if (!course) {
            return updateErrorLoadingNotification(notificationId)
        }
        let url = 'paymentreceipt/create/';
        axios.post(url, {
            receipt_number: store.voucherNumber,
            payment_status: store.paymentStatus,
            enrollment: enrollmentId,
            course: store.course,
            balance: course?.price,
            payment_date: new Date().toISOString().split('T')[0],
            payment_value: store.credit,
            financial_institution: 'Banco Pichincha',
            description: `Pago por registro de nadador en ${course.name}`
        }).then(function (response) {
            console.log("RECEIPT CREADO")
            return updateSuccessLoadingNotification(notificationId)
        }).catch(function (error) {
            console.log(error)
            return updateErrorLoadingNotification(notificationId)
        })
    }

    return (
        <form>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 pb-4">
                <CustomTextInput
                    label=" Nombres"
                    withAsterisk
                    placeholder="Ingrese sus nombres"
                    className='sm:col-span-2'
                    value={store.names}
                    onChange={e => store.setNames(e.currentTarget.value)}
                />
                <CustomTextInput
                    label="Apellidos"
                    withAsterisk
                    placeholder="Ingrese sus apellidos"
                    className="sm:col-span-2"
                    value={store.lastNames}
                    onChange={e => store.setLastNames(e.currentTarget.value)}
                />

                {!store.isInstructor && <div className="sm:col-span-2 grid grid-cols-4 gap-x-3">
                    <CustomDateInput
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
                    />
                    <InputWrapper label='Edad:'>
                        <Input value={store.age || 0} readOnly />
                    </InputWrapper>

                </div>
                }
                <div className='sm:col-span-2 grid sm:grid-cols-7 gap-x-3'>
                    <CustomSelect
                        label="Rol"
                        data={registerStore.roles}
                        className={store.isInstructor ? 'sm:col-span-7' : 'sm:col-span-4'}
                        value={store.role}
                        onChange={v => {
                            store.setRole(v)
                            const isInstructor = registerStore.roles?.filter(role => role.value === v)[0]?.label === 'INSTRUCTOR'
                            store.setIsInstructor(isInstructor)
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
                    value={store.email}
                    onChange={e => store.setEmail(e.currentTarget?.value)}
                />

                {!store.isInstructor && <> <CustomTextInput
                    leftSectionPointerEvents="none"
                    withAsterisk
                    label="Dirección"
                    placeholder="Ingrese dirección"
                    className="sm:col-span-2"
                    value={store.address}
                    onChange={e => store.setAddress(e.currentTarget?.value)}
                />

                    <CustomTextInput
                        leftSectionPointerEvents="none"
                        withAsterisk={store.age < 18}
                        label="Representante: "
                        placeholder="Ingrese el nombre del representante"
                        className="sm:col-span-2"
                        value={store.representantive}
                        onChange={e => store.setRepresentative(e.currentTarget?.value)}
                    />
                    <div className='sm:col-span-2 grid sm:grid-cols-7 gap-x-3'>
                        <CustomTextInput
                            label="Vínculo:"
                            placeholder="Escriba el vínculo"
                            withAsterisk={store.age < 18}
                            className="sm:col-span-4"
                            value={store.relationship}
                            onChange={e => store.setRelationship(e.currentTarget?.value)}
                        />

                        <CustomTextInput
                            leftSectionPointerEvents="none"
                            withAsterisk
                            label="Teléfono: "
                            placeholder="Ingrese telefono"
                            className="sm:col-span-3"
                            value={store.cellphoneNumber}
                            onChange={e => store.setCellphoneNumber(e.currentTarget?.value)}
                        />
                    </div>

                </>}
            </div>
            <Group justify="center">
                <CustomButton onClick={saveUser} text={"Guardar"} bgColor={'#15192F'} />
            </Group>
        </form>
    );
};

const RegisterCourseForm = ({ store }) => {
    const instructor = ["Ricardo Alcivar", "Joseph Carabajo", "Andres Borbor", "Paulina", "Katherine"];

    const startTimeRef = useRef(null);
    const finishTimeRef = useRef(null);

    const startPickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => startTimeRef.current?.showPicker()}>
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    );
    const finishPickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => finishTimeRef.current?.showPicker()}>
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    )

    return (
        <form>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

                <CustomTextInput
                    label="Nombre del curso"
                    withAsterisk
                    placeholder="Ingrese Curso"
                    value={store.courseName}
                    onChange={e => store.setCourseName(e.currentTarget?.value)}
                />
                <CustomSelect
                    label="Instructor: "
                    placeholder="Elegir Instructor: "
                    withAsterisk
                    data={instructor}
                    value={store.instructor}
                    onChange={store.setInstructor}
                />

                <CustomSelect
                    label="Tipo de clase"
                    data={["GRUPAL", "INDIVIDUAL"]}
                    value={store.courseType}
                    onChange={store.setCourseType}
                />

                <CustomDatePickerInput
                    label="Inicio-Fin de Curso:"
                    placeholder="Inicio-Fin de Curso:"
                    value={store.enrollmentDuration}
                    onChange={store.setEnrollmentDuration}
                />
                <CustomSelect
                    label="Estado"
                    data={["estado clase"]}
                />
                <CustomNumberInput
                    label="Precio: $"
                    defaultValue={0.00}
                    precision={2}
                    min={-1}
                    step={0.05}
                />
                <TimeInput
                    label="Hora Inicio:"
                    maxTime={store.endTime}
                    rightSection={startPickerControl}
                    ref={startTimeRef}
                    value={store.startTime}
                    onChange={e => store.setStartTime(e.currentTarget?.value)}
                />

                <TimeInput
                    label="Hora Fin:"
                    rightSection={finishPickerControl}
                    ref={finishTimeRef}
                    minTime={store.startTime}
                    value={store.endTime}
                    onChange={e => store.setEndTime(e.currentTarget?.value)}
                />

            </div>
            <br />
            <Group justify="center">
                <CustomButton text='Guardar' bgColor={'#15192F'} />

            </Group>
        </form>
    );
}
function Update() {
    const [activeTab, setActiveTab] = useState("Actualizar usuario");
    const swimmerFormStore = useSwimmerFormStore();
    const courseFormStore = useCourseFormStore();

    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    const tabStyles = {
        backgroundColor: "#15192F",
        color: "white",
        fontSize: '1.6rem',
    };

    const inactiveTabStyles = {
        backgroundColor: "inherit",
        color: "#15192F",
        fontSize: '1.6rem',
    };


    const renderContent = () => {
        if (activeTab === "Actualizar usuario") {
            return <RegisterMemberForm store={swimmerFormStore} />;
        } else if (activeTab === "Actualizar Curso") {
            return <RegisterCourseForm store={courseFormStore} />;
        }
        return null;
    };

    return (
        <CustomSection title="Actualizar" >
            <Tabs variant="unstyled" defaultValue="Actualizar usuario" position="relative" >
                <Tabs.List grow>
                    <Tabs.Tab
                        value="Actualizar usuario"
                        style={activeTab === "Actualizar usuario" ? tabStyles : inactiveTabStyles}
                        onClick={() => handleTabChange("Actualizar usuario")}
                    >
                        Actualizar usuario
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="Actualizar Curso"
                        style={activeTab === "Actualizar Curso" ? tabStyles : inactiveTabStyles}
                        onClick={() => handleTabChange("Actualizar Curso")}
                    >
                        Actualizar Curso
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
            {renderContent()}
        </CustomSection>
    );
}


export default Update