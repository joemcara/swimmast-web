import React from 'react';
import CustomTable from '../components/CustomTable';
import CustomSection from '../components/CustomSection';
import CustomFilter from '../components/CustomFilter';
import { Autocomplete, Group, InputLabel, Select } from '@mantine/core';

function Curso() {

    return (
        <div>
            <CustomSection className='absolute ' title="Cursos en Progreso">

                <CustomFilter>
                    <Group>
                        <InputLabel className='text-system-label-blue' size={20} fw={550}>
                            Curso
                        </InputLabel>
                        <Select
                            data={['GRUPAL', 'INDIVIDUAL', 'VACACIONAL', 'TERAPIA']}
                        />
                    </Group>
                    <Group>
                        <InputLabel className='text-system-label-blue' size={20} fw={550}>
                            Horario
                        </InputLabel>
                        <Autocomplete
                            data={['7:00', '7:30', '8:00', '9:30']}
                        />
                    </Group>
                    <Group>
                        <InputLabel className='text-system-label-blue' size={20} fw={550}>
                            Profesor
                        </InputLabel>
                        <Autocomplete
                            data={['Cesar', 'Laura', 'Michelle']}
                        />
                    </Group>
                </CustomFilter>
                <CustomTable />
            </CustomSection>
        </div>
    );
}


export default Curso