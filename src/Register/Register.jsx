import * as React from 'react';
import CustomTable from '../components/CustomTable'
import { ActionIcon, Group, Input, InputLabel, Select, Table, Button, TextInput, NumberInput, InputWrapper, ButtonGroup } from '@mantine/core'
import { IconBellFilled, IconBellRinging, IconBellRingingFilled, IconFilter, IconFilterCancel, IconPhoto, IconCash, IconClock } from '@tabler/icons-react'
import CustomSection from '../components/CustomSection'
import CustomFilter from '../components/CustomFilter'
import { useState } from 'react';

import { DateInput, TimeInput } from '@mantine/dates';
import { IconAt, } from '@tabler/icons-react';
import { Tabs, rem } from '@mantine/core';
import dayjs from 'dayjs';
import { DatePickerInput } from '@mantine/dates';

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

const RegisterMiembroForm = () => {
    const paquetes = ["GRUPAL/PFG", "INDIVIDUAL", "USO", "TERAPIA"];
    const estadospagos = ["Pagado", "No Pagado", "Abono", "Stand-By"];
    const estadosinscripcion = ["Aceptado", "Negado"];
    const vinculo = ["Mama", "Papa", "Abuelo"];
    const instructor = ["Ricardo Alcivar", "Joseph Carabajo", "Andres Borbor", "Paulina", "Katherine"];

    const [birthdate, setBirthdate] = useState(null);
    const [age, setAge] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const calculateAge = (birthdate) => {
        if (!birthdate) return;
        const birthdateYear = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
        const calculatedAge = currentYear - birthdateYear;
        setAge(calculatedAge.toString());
    };

    const [valuedate, setValuedate] = useState([]);

    const [selectedDays, setSelectedDays] = useState([]);

    const daysOfWeek = ['L', 'M', 'X', 'J'];

    const toggleDaySelection = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };
    return (
        <form>
            <div class="border-b border-gray-900/10 pb-12">
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-2 sm:col-start-1">
                        <TextInput
                            label="Nombres y Apellidos"
                            withAsterisk
                            placeholder="Ingrese Nombres y Apellidos"
                        />
                    </div>

                    <div class="sm:col-span-2 sm:col-start-3">
                        <DateInput
                            label="Fecha de nacimiento"
                            withAsterisk
                            placeholder="00/00/0000"
                            value={birthdate}
                            onChange={(birthdate) => {
                                setBirthdate(birthdate);
                                calculateAge(birthdate);
                            }}
                        />
                    </div>

                    <div class="sm:col-span-1">
                        <TextInput
                            label="Edad: "
                            placeholder="Edad"
                            value={age} // Aquí se pasa el estado de la edad como el valor del campo de texto
                            readOnly // Para asegurarse de que el campo de texto sea de solo lectura
                        />
                    </div>

                    <div class="sm:col-span-1">
                        <TextInput
                            label="#Comprobante "
                            placeholder="Ingrese número de comprobante"
                        />
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                        <TextInput
                            leftSectionPointerEvents="none"

                            withAsterisk
                            label="Correo Electrónico: "
                            placeholder="nombre@dominio.com"
                        />
                    </div>

                    <div class="sm:col-span-2">
                        <TextInput
                            leftSectionPointerEvents="none"
                            withAsterisk
                            label="Teléfono: "
                            placeholder="Ingrese telefono"
                        />
                    </div>

                    <div class="sm:col-span-2">
                        <TextInput
                            leftSectionPointerEvents="none"
                            withAsterisk
                            label="Dirección"
                            placeholder="Ingrese dirección"
                        />
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                        <InputWrapper
                            id="input-demo"
                            required
                            label="Representante"
                        >
                            <Input id="input-demo" placeholder="Nombre del Representante" />
                        </InputWrapper>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-3">
                        <Select
                            label="Vínculo:"
                            placeholder="Elegir Vínculo"
                            withAsterisk
                            data={vinculo}
                        />
                    </div>

                    <div class="sm:col-span-2 sm:col-start-5">
                        <Select
                            label="Instructor: "
                            placeholder="Elegir Instructor: "
                            withAsterisk
                            data={instructor}
                        />

                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                        <Select
                            label="Cursos Inscritos:"
                            placeholder="Elegir Paquete "
                            withAsterisk
                            data={paquetes}
                        />
                    </div>

                    <div class="sm:col-span-1">
                        <TextInput
                            leftSectionPointerEvents="none"
                            withAsterisk
                            label="# De Clases: "
                            placeholder="Ingrese # de Clases"
                        />
                    </div>
                    <div class="sm:col-span-1 ">
                        <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Dias de clases: </label>
                        <ActionIcon.Group>
                            {daysOfWeek.map((day) => (
                                <ActionIcon
                                    key={day}
                                    variant="default"
                                    size="lg"
                                    aria-label={day}
                                    onClick={() => toggleDaySelection(day)}
                                    style={{ backgroundColor: selectedDays.includes(day) ? 'green' : 'transparent' }}
                                >
                                    {day}
                                </ActionIcon>
                            ))}
                        </ActionIcon.Group>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-5">
                        <Select
                            label="Inscripción: "
                            placeholder="Elegir estado de inscripción "
                            withAsterisk
                            data={estadosinscripcion}
                        />

                    </div>
                    <div class="sm:col-span-2 sm:col-start-1">
                        <DatePickerInput
                            type="range"
                            label="Inicio-Fin de Inscripción:"
                            placeholder="Inicio-Fin de Inscripción:"
                            value={valuedate}
                            onChange={setValuedate}
                        />
                    </div>

                    <div class="sm:col-span-2 sm:col-start-3">
                        <Select
                            label="Estado de pago"
                            placeholder="Elegir estado de pago"
                            withAsterisk
                            data={estadospagos}
                        />

                    </div>

                    <div class="sm:col-span-3 sm:col-start-5">
                        <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Forma de pago: </label>

                        <ActionIcon.Group>
                            <ActionIcon
                                variant="default"
                                size="lg"
                                aria-label="Gallery"
                                onClick={() => setSelectedOption('transferencia')}
                                style={{ backgroundColor: selectedOption === 'transferencia' ? 'green' : 'transparent' }}
                            >
                                <IconPhoto style={{ width: '50px' }} stroke={1.5} />
                            </ActionIcon>

                            <ActionIcon
                                variant="default"
                                size="lg"
                                aria-label="Settings"
                                onClick={() => setSelectedOption('money')}
                                style={{ backgroundColor: selectedOption === 'money' ? 'green' : 'transparent' }}
                            >
                                <IconCash style={{ width: '50px' }} stroke={1.5} />
                            </ActionIcon>
                        </ActionIcon.Group>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-5">
                        <NumberInput
                            label="Saldo Abonado: $"
                            defaultValue={0.00}
                            precision={2}
                            min={-1}
                            step={0.05}
                        />

                    </div>

                </div>
            </div>
            <br />
            <Group justify="center">
                <Button variant="filled">Guardar</Button>
            </Group>
        </form>
    );
};


const RegisterCursoForm = () => {
    const instructor = ["Ricardo Alcivar", "Joseph Carabajo", "Andres Borbor", "Paulina", "Katherine"];
    const [selectedOption, setSelectedOption] = useState(null);
    const [valuedate, setValuedate] = useState([]);

    const [selectedRange, setSelectedRange] = useState(null);

    const handleRangeChange = (range) => {
        setSelectedRange(range);
    };

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    );


    return (
        <form>
            <div class="border-b border-gray-900/10 pb-12">
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3 sm:col-start-1">
                        <TextInput
                            label="Curso"
                            withAsterisk
                            placeholder="Ingrese Curso"
                        />
                    </div>
                    <div class="sm:col-span-3">
                        <Select
                            label="Instructor: "
                            placeholder="Elegir Instructor: "
                            withAsterisk
                            data={instructor}
                        />
                    </div>
                    <div class="sm:col-span-2">
                        <DatePickerInput
                            type="range"
                            label="Inicio-Fin de Curso:"
                            placeholder="Inicio-Fin de Curso:"
                            value={valuedate}
                            onChange={setValuedate}
                        />
                    </div>

                    <div class="sm:col-span-2">
                        <TimeInput
                            label="Hora Inicio:"
                            rightSection={pickerControl} />

                    </div>
                    <div class="sm:col-span-2">
                        <TimeInput
                            label="Hora Fin:"
                            rightSection={pickerControl} />
                    </div>

                </div>
            </div>
            <br />
            <Group justify="center">
                <Button variant="filled">Guardar</Button>
            </Group>
        </form>
    );
}
function Register() {
    const [activeTab, setActiveTab] = useState("Registrar Miembro");

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
            return <RegisterMiembroForm />;
        } else if (activeTab === "Registrar Curso") {
            return <RegisterCursoForm />;
        }
        return null;
    };

    return (
        <CustomSection title="Registrar" >
            <Tabs variant="unstyled" defaultValue="Registrar Miembro" position="relative" borderRadius="rem(4px) 0 0 rem(4px)">
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