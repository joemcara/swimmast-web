import { ActionIcon, Group, Input, Select, Button, TextInput, NumberInput, FileInput, Text } from '@mantine/core'
import { IconPhoto, IconCash, IconClock } from '@tabler/icons-react'
import CustomSection from '../components/CustomSection'
import { useRef, useState } from 'react';
import { DateInput, TimeInput } from '@mantine/dates';
import { Tabs, rem } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import useMemberFormStore from './MemberFormStore';
import { CustomButton, CustomDateInput, CustomDatePickerInput, CustomNumberInput, CustomSelect, CustomTextInput, SelectPaymentMethod } from '../components/CustomInputs';
import useCourseFormStore from './CourseFormStore';

const RegisterMiembroForm = ({ store }) => {
    const paquetes = ["GRUPAL/PFG", "INDIVIDUAL", "USO", "TERAPIA"];
    const estadospagos = ["Pagado", "No Pagado", "Abono", "Stand-By"];
    const estadosinscripcion = ["Aceptado", "Negado"];
    const vinculo = ["Mama", "Papa", "Abuelo"];
    const instructor = ["Ricardo Alcivar", "Joseph Carabajo", "Andres Borbor", "Paulina", "Katherine"];

    const calculateAge = (birthdate) => {
        if (!birthdate) return 0;
        const birthdateYear = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
        const calculatedAge = currentYear - birthdateYear;
        return calculatedAge.toString();
    };

    const [selectedDays, setSelectedDays] = useState([]);

    const daysOfWeek = ['L', 'M', 'X', 'J'];

    const toggleDaySelection = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const createSwimmer = () => {
        console.log(store)
        let url = 'register/';
        axios.post(url, {
            first_name: "first_name"
        }).then(function (response) {
            console.log(response)
        })
    }

    return (
        <form>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 pb-4">
                <TextInput
                    label=" Nombres"
                    withAsterisk
                    placeholder="Ingrese sus nombres"
                    className='sm:col-span-2'
                    value={store.names}
                    onChange={e => store.setNames(e.currentTarget.value)}
                />
                <TextInput
                    label="Apellidos"
                    withAsterisk
                    placeholder="Ingrese sus apellidos"
                    className="sm:col-span-2 "
                    value={store.lastNames}
                    onChange={e => store.setLastNames(e.currentTarget.value)}
                />
                <CustomDateInput
                    label="Fecha de nacimiento"
                    withAsterisk
                    placeholder="00/00/0000"
                    value={store.birthDate || new Date()}
                    onChange={(birthdate) => {
                        store.setBirthDate(birthdate);
                        store.setAge(calculateAge(birthdate))
                    }}
                />

                <div className="sm:col-span-2 grid grid-cols-2 gap-x-6">
                    <TextInput
                        label="Edad: "
                        placeholder="Edad"
                        value={store.age} // Aquí se pasa el estado de la edad como el valor del campo de texto
                        className='sm:col-span-1'
                        readOnly
                    />
                    <TextInput
                        label="#Comprobante "
                        placeholder="Ingrese número de comprobante"
                        className='sm:col-span-1'
                        value={store.voucherNumber}
                        onChange={e => store.setVoucherNumber(e.currentTarget.value)}
                    />
                </div>


                <TextInput
                    leftSectionPointerEvents="none"
                    className="sm:col-span-2 "
                    withAsterisk
                    label="Correo Electrónico: "
                    placeholder="nombre@dominio.com"
                    value={store.email}
                    onChange={e => store.setEmail(e.currentTarget?.value)}
                />

                <TextInput
                    leftSectionPointerEvents="none"
                    withAsterisk
                    label="Dirección"
                    placeholder="Ingrese dirección"
                    className="sm:col-span-2"
                    value={store.address}
                    onChange={e => store.setAddress(e.currentTarget?.value)}
                />

                <TextInput
                    leftSectionPointerEvents="none"
                    withAsterisk={store.age < 18}
                    label="Representante: "
                    placeholder="Ingrese el nombre del representante"
                    className="sm:col-span-2"
                    value={store.representantive}
                    onChange={e => store.setRepresentative(e.currentTarget?.value)}
                />
                <Select
                    label="Vínculo:"
                    placeholder="Elegir Vínculo"
                    withAsterisk={store.age < 18}
                    data={vinculo}
                    className="sm:col-span-1"
                    value={store.familyBond}
                    onChange={store.setFamilyBond}
                />

                <TextInput
                    leftSectionPointerEvents="none"
                    withAsterisk
                    label="Teléfono: "
                    placeholder="Ingrese telefono"
                    className="sm:col-span-1"
                    value={store.cellphoneNumber}
                    onChange={e => store.setCellphoneNumber(e.currentTarget?.value)}
                />

                <Select
                    label="Instructor: "
                    placeholder="Elegir Instructor: "
                    withAsterisk
                    data={instructor}
                    className="sm:col-span-2"
                    value={store.trainer}
                    onChange={store.setTrainer}
                />

                <Select
                    label="Tipo de clase:"
                    placeholder="Elegir Paquete "
                    withAsterisk
                    data={paquetes}
                    className="sm:col-span-2"
                    value={store.courseType}
                    onChange={store.setCourseType}
                />
                {
                    store.courseType !== "INDIVIDUAL" && <Select label="Curso" className='col-span-2' />
                }
                {store.courseType === "INDIVIDUAL" && <div className="sm:col-span-2 grid grid-cols-2 gap-x-6">
                    <TextInput
                        leftSectionPointerEvents="none"
                        withAsterisk
                        label="# De Clases: "
                        placeholder="Ingrese # de Clases"
                        className='sm:col-span-1'
                        value={store.numberOfDays}
                        onChange={e => {
                            store.setNumberOfDays(e.currentTarget.value)
                            console.log(e)
                        }}
                    />
                    <div className="sm:col-span-1 ">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Dias de clases: </label>
                        <ActionIcon.Group>
                            {daysOfWeek.map((day) => (
                                <ActionIcon
                                    key={day}
                                    variant="default"
                                    size={30}
                                    aria-label={day}
                                    onClick={() => toggleDaySelection(day)}
                                    style={{ backgroundColor: selectedDays.includes(day) ? 'green' : 'transparent' }}
                                    className='mt-1'
                                >
                                    {day}
                                </ActionIcon>
                            ))}
                        </ActionIcon.Group>
                    </div>
                </div>}


                <div className="sm:col-span-2">
                    <Select
                        label="Estado de inscripción: "
                        placeholder="Elegir estado de inscripción "
                        withAsterisk
                        data={estadosinscripcion}
                        value={store.applicationState}
                        onChange={store.setApplicationState}
                    />

                </div>
                <CustomDatePickerInput
                    type="range"
                    label="Inicio-Fin de Inscripción:"
                    placeholder="Inicio-Fin de Inscripción:"
                    value={store.applicationDuration}
                    onChange={store.setApplicationDuration}
                />

                <Select
                    label="Estado de pago"
                    placeholder="Elegir estado de pago"
                    withAsterisk
                    data={estadospagos}
                    className="sm:col-span-2"
                    value={store.paymentState}
                    onChange={store.setPaymentState}
                />

                <SelectPaymentMethod store={store} />

                <NumberInput
                    label="Dinero cancelado: $"
                    defaultValue={0.00}
                    precision={2}
                    min={-1}
                    step={0.05}
                    className="sm:col-span-2"
                    value={store.credit}
                    onChange={store.setCredit}
                />

            </div>
            <Group justify="center">
                <CustomButton onClick={createSwimmer} text={"Guardar"} bgColor={'#15192F'} />
            </Group>
        </form>
    );
};


const RegisterCursoForm = ({ store }) => {
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
function Register() {
    const [activeTab, setActiveTab] = useState("Registrar Miembro");
    const memberFormStore = useMemberFormStore();
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
        if (activeTab === "Registrar Miembro") {
            return <RegisterMiembroForm store={memberFormStore} />;
        } else if (activeTab === "Registrar Curso") {
            return <RegisterCursoForm store={courseFormStore} />;
        }
        return null;
    };

    return (
        <CustomSection title="Registrar" >
            <Tabs variant="unstyled" defaultValue="Registrar Miembro" position="relative" >
                <Tabs.List grow>
                    <Tabs.Tab
                        value="Registrar Miembro"
                        style={activeTab === "Registrar Miembro" ? tabStyles : inactiveTabStyles}
                        onClick={() => handleTabChange("Registrar Miembro")}
                    >
                        Registrar Miembro
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="Registrar Curso"
                        style={activeTab === "Registrar Curso" ? tabStyles : inactiveTabStyles}
                        onClick={() => handleTabChange("Registrar Curso")}
                    >
                        Registrar Curso
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
            {renderContent()}
        </CustomSection>
    );
}


export default Register