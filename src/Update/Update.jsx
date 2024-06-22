import React from 'react'
import { Input, Select, Tabs, Button, Space, NumberInput, TextInput, Group } from '@mantine/core';
import { IconCreditCard, IconCurrencyDollar } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';
import CustomSection from '../components/CustomSection';
import { CustomButton, CustomDateInput, CustomNumberInput, CustomSelect, CustomTextInput, SelectPaymentMethod } from '../components/CustomInputs';

function Update() {
    const [valueDate, setValueDate] = useState(new Date());
    const [age, setAge] = useState(0);

    /*function to calculate age from date of birth*/
    const calculateAge = (valueDate) => {
        const birthDate = new Date(valueDate);
        const currentDate = new Date();
        let age = new Date().getFullYear() - birthDate.getFullYear();

        const currentMonth = currentDate.getMonth();
        const birthMonth = valueDate.getMonth();

        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    const handleBirthDateChange = (date) => {
        setValueDate(date);
        setAge(calculateAge(date));
    };

    const exampleData = {
        name: "John Doe",
        email: "john@example.com",
        phoneNumber: "1234 567890",
        location: "456 Park Avenue, New York, NY 10022",
        representative: "Jane Smith",
        numberTicket: "258866",
        balance: 10.20,
        coach: "Lucas Mont"
    }

    const styleLabels = {
        fontSize: '16px',
        fontWeight: 'normal'
    }


    return (
        <CustomSection title='Actualizar Datos'>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 pb-4' >
                <CustomTextInput
                    label='Nombres'
                    placeholder='Ingrese sus nombres'
                />
                <CustomTextInput
                    label='Apellidos'
                    placeholder='Ingrese sus apellidos'
                />
                <CustomDateInput
                    value={valueDate}
                    defaultValue={new Date()}
                    withAsterisk
                    onChange={handleBirthDateChange}
                    valueFormat="DD/MM/YYYY"
                    label="Fecha de Nacimiento"

                />
                <NumberInput
                    allowDecimal={false}
                    withAsterisk
                    value={age}
                    label="Edad"
                    hideControls
                    size='sm'
                    className='w-16'
                    labelProps={{ style: { fontSize: '16px', fontWeight: 'normal' } }}
                />
                <CustomTextInput
                    label='# Comprobante'
                />
                <CustomTextInput
                    label='Correo electrónico'
                    placeholder='Ingrese correo electrónico'
                />

                <CustomTextInput
                    label='Teléfono'
                />
                <CustomTextInput
                    label='Dirección'
                    placeholder='Ingrese dirección de domicilio' />

                <CustomSelect label='Representante' data={["Mamá", "Papá", "Abuela", "Abuelo", "Tía", "Tío"]} />
                <CustomSelect label='Cursos inscritos' data={['Entrenamiento', 'Vacacional']} />
                <CustomSelect label='Estado de inscripción' placeholder="Seleccionar estado de la inscripción" data={['Aceptar', 'Negar']} />
                <CustomSelect label='Estado de pago' placeholder="Seleccionar estado de pago" data={['Abono', 'Pagado', 'Stand-By', 'No Pagado']} />
                <SelectPaymentMethod store={null} />
                <CustomNumberInput
                    label='Saldo Abonado'
                    leftSection={<IconCurrencyDollar />}
                    defaultValue={0.00}
                    allowDecimal={true}
                    decimalSeparator="."
                    decimalScale={2}
                    required
                    hideControls
                    value={exampleData.balance}
                />
            </div>
            <Group justify='center' >
                <CustomButton text='Editar' bgColor={'#15192F'} />
            </Group>

        </CustomSection>


    )
}

export default Update