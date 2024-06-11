import React from 'react'
import { Input, Select, Tabs, Button, Space, NumberInput } from '@mantine/core';
import { IconCreditCard, IconCurrencyDollar } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';
import CustomSection from '../components/CustomSection';

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

            <div className='flex flex-row gap-14 ml-3 my-3' >
                <Input.Wrapper label='Nombres y Apellidos' withAsterisk className='w-60' labelProps={{ style: { fontSize: '16px', fontWeight: 'normal' } }} >
                    <Input size='sm' placeholder='Ingrese nombres y apellidos' value={exampleData.name} />
                </Input.Wrapper>

                <DateInput
                    value={valueDate}
                    defaultValue={new Date()}
                    withAsterisk
                    onChange={handleBirthDateChange}
                    valueFormat="DD/MM/YYYY"
                    label="Fecha de Nacimiento"
                    size='sm'
                    labelProps={{ style: styleLabels }}
                />

                <NumberInput allowDecimal={false} withAsterisk value={age} label="Edad" hideControls size='sm' className='w-16' labelProps={{ style: { fontSize: '16px', fontWeight: 'normal' } }} />

                <Input.Wrapper withAsterisk label='# Comprobante' className='w-60' labelProps={{ style: styleLabels }}>
                    <Input size='sm' placeholder='Ingrese número de comprobante' value={exampleData.numberTicket} />
                </Input.Wrapper>
            </div>

            <div className='flex flex-row gap-14 ml-3 my-3' >
                <Input.Wrapper withAsterisk label='Correo' className='w-60' labelProps={{ style: styleLabels }}>
                    <Input size='sm' placeholder='Ingrese correo electrónico' value={exampleData.email} />
                </Input.Wrapper>
                <Input.Wrapper withAsterisk label='Teléfono' labelProps={{ style: styleLabels }}>
                    <Input size='sm' placeholder='Ingrese número de teléfono' value={exampleData.phoneNumber} />
                </Input.Wrapper>
                <Input.Wrapper label='Dirección' className='w-80' labelProps={{ style: styleLabels }}>
                    <Input size='sm' placeholder='Ingrese dirección de domicilio' value={exampleData.location} />
                </Input.Wrapper>
            </div>

            <div className='flex flex-row gap-14 ml-3 my-3' >
                <Input.Wrapper label='Representante' className='w-60' labelProps={{ style: styleLabels }}>
                    <Input size='sm' placeholder='Ingrese nombre del representante' value={exampleData.representative} />
                </Input.Wrapper>
                <Select label='Vínculo' className="w-64" placeholder="Ingrese vínculo del representante" size='sm' data={["Mamá", "Papá", "Abuela", "Abuelo", "Tía", "Tío"]} labelProps={{ style: styleLabels }} />
                <Input.Wrapper withAsterisk label='Instructor' className='w-64' labelProps={{ style: styleLabels }}>
                    <Input size='sm' placeholder='Ingrese nombre del instructor' value={exampleData.coach} />
                </Input.Wrapper>
            </div>

            <div className='flex flex-row gap-28 ml-3 my-3'>
                <div className='flex flex-row gap-7'>
                    <p className='text-base'>Cursos Inscritos</p>
                    < Select size='sm' className='w-56' placeholder="Seleccionar curso" data={['Entrenamiento', 'Vacacional']} />
                </div>

                <div className='flex flex-row gap-6'>
                    <p className='text-base'>Inscripción</p>
                    < Select size='sm' className='w-72' placeholder="Seleccionar estado de la inscripción" data={['Aceptar', 'Negar']} />
                </div>
            </div >

            <div className='flex flex-row gap-24 ml-3 my-3'>
                <div className='flex flex-row gap-7'>
                    <p className='text-base'>Estado de Pago</p>
                    < Select size='sm' className='w-56' placeholder="Seleccionar estado de pago" data={['Abono', 'Pagado', 'Stand-By', 'No Pagado']} />
                </div>
                <div className='flex flex-row gap-3'>
                    <p className='text-base'>Forma de Pago</p>
                    <div>
                        <Tabs bg={'white'} className='h-9' defaultValue="first">
                            <Tabs.List grow>
                                <Tabs.Tab value="first" className='h-9'>
                                    <IconCreditCard></IconCreditCard>
                                </Tabs.Tab>
                                <Tabs.Tab value="second" className='h-9'>
                                    <IconCurrencyDollar></IconCurrencyDollar>
                                </Tabs.Tab>
                            </Tabs.List>
                        </Tabs>
                    </div>
                </div>

            </div>

            <div className='ml-96 flex flex-row gap-3 pl-20'>
                <p className='text-base'> Saldo  Abonado</p>
                <NumberInput
                    size='sm'
                    leftSection={<IconCurrencyDollar />}
                    defaultValue={0.00}
                    allowDecimal={true}
                    decimalSeparator="."
                    decimalScale={2}
                    required
                    hideControls
                    className='w-28'
                    value={exampleData.balance}>
                </NumberInput>
            </div>


            <div className='flex justify-center mt-3 mb-3' >
                <Button variant='filled' color='#0730BE' size="lg" radius="xl">Editar</Button>
            </div>

        </CustomSection>


    )
}

export default Update