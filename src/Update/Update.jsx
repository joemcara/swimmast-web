import React from 'react'
import { Input, Select, Tabs, Button, Space, NumberInput} from '@mantine/core';
import { IconCreditCard, IconCurrencyDollar } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';

function Update() {
    const [valueDate, setValueDate] = useState(new Date());
    const [age, setAge] = useState(0);

    /*function to calculate age from date of birth*/
    const calculateAge=(valueDate)=>{
        const birthDate=new Date(valueDate);
        const currentDate = new Date();
        let age = new Date().getFullYear() -birthDate.getFullYear();

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

    console.log(age);
    
   
    return (
        <div className='bg-background-secundary left-10 items-center ml-64 my-24 mr-8 pr-3 pt-7 pl-3 pb-7'>
            <p className='font-bold ml-3'>Actualizar Datos</p>

            <div className='flex flex-row gap-10 ml-3 my-3' >
                    <Input.Wrapper label='Nombres y Apellidos' className='w-60' labelProps={{ style: { fontSize: '12px', fontWeight: 'normal' } }} >
                        <Input size='xs'/>
                    </Input.Wrapper>

                    <DateInput
                        value={valueDate}
                        onChange={handleBirthDateChange}
                        valueFormat="DD/MM/YYYY"
                        label="Fecha de Nacimiento"
                        size='xs'
                        labelProps={{ style: { fontSize: '12px', fontWeight: 'normal' } }}
                    />

                    <NumberInput allowDecimal={false} value={age} label="Edad" hideControls size='xs' className='w-16' labelProps={{ style: { fontSize: '12px', fontWeight: 'normal' } }}/>
                    
                    <Input.Wrapper label='# Comprobante' className='w-32' labelProps={{ style: { fontSize: '12px', fontWeight: 'normal' } }}>
                        <Input size='xs'/>
                    </Input.Wrapper>
            </div>

            <div className='flex flex-row gap-10 ml-3 my-3' >
                    <Input.Wrapper label='Correo' className='w-60' labelProps={{ style: { fontSize: '12px', fontWeight: 'normal' } }}>
                        <Input size='xs'/>
                    </Input.Wrapper>
                    <Input.Wrapper label='Teléfono' labelProps={{ style: { fontSize: '12px', fontWeight: 'normal' } }}>
                        <Input size='xs'/>
                    </Input.Wrapper>
                    <Input.Wrapper label='Dirección' className='w-56' labelProps={{ style: { fontSize: '12px', fontWeight: 'normal' } }}>
                        <Input size='xs'/>
                    </Input.Wrapper>
            </div>

            <div className='flex flex-row gap-16 ml-3 my-3' >
                    <Input.Wrapper label='Representante' labelProps={{ style: { fontSize: '12px', fontWeight: 'normal' } }}>
                        <Input size='xs'/>
                    </Input.Wrapper>
                    <Input.Wrapper label='Vínculo' labelProps={{ style: { fontSize: '12px', fontWeight: 'normal' } }}>
                        <Input size='xs'/>
                    </Input.Wrapper>
                    <Input.Wrapper label='Instructor' className='w-64' labelProps={{ style: { fontSize: '12px', fontWeight: 'normal' } }}>
                        <Input size='xs'/>
                    </Input.Wrapper>
            </div>

            <div className='flex flex-row gap-40 ml-3 my-3'>
                <div className='flex flex-row gap-1.5'>
                    <p className='text-xs'>Cursos Inscritos</p>
                    < Select size='xs' placeholder="Pick value" data={['Entrenamiento', 'Vacacional']}/>
                </div>

                <div className='flex flex-row gap-10'>
                    <p className='text-xs'>Inscripción</p>
                    < Select size='xs' className='w-44' placeholder="Pick value" data={['Aceptar', 'Negar']}/>
                </div>
            </div >

            <div className='flex flex-row gap-40 ml-3 my-3'>
                <div className='flex flex-row gap-1.5'>
                    <p className='text-xs'>Estado de Pago</p>
                    < Select size='xs' placeholder="Pick value" data={['Abono', 'Pagado', 'Stand-By', 'No Pagado']}/>
                </div>
                <div className='flex flex-row gap-5'>
                    <p className='text-xs'>Forma de Pago</p>
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

            <div className='ml-96 flex flex-row gap-4 pl-14'>
                <p className='text-xs'> Saldo  Abonado</p>
                <NumberInput 
                    size='xs' 
                    leftSection={<IconCurrencyDollar/>} 
                    defaultValue={0.00} 
                    allowDecimal={true}
                    decimalSeparator="."
                    decimalScale={2}
                    required
                    hideControls
                    className='w-24'>
                </NumberInput>
            </div>

            <Space h="xl" />
            
            <div className='flex justify-center mt-3 mb-3' >
            <Button variant='filled' color='#0730BE' radius="lg">Editar</Button>
            </div>
    
        </div>
        
        
        
    )
}

export default Update