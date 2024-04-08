import React, { Component } from 'react';
import CustomTable from '../components/CustomTable';
import CustomSection from '../components/CustomSection';
import CustomFilter from '../components/CustomFilter';
import { Autocomplete, Group, InputLabel, Select } from '@mantine/core';
import Layout from '../components/Layout';



function Curso() {

    return(
        <div>
       <CustomSection className = 'absolute ' title = "Cursos en Progreso">
        
            <CustomFilter>
                <Group>
                    <InputLabel className='text-system-label-blue' size={20} fw={550}>
                    Curso
                    </InputLabel>
                    <Select
                        data={['GRU01','IND01','VAV01','TRP01']}
                        />
                </Group>
                <Group>
                    <InputLabel className='text-system-label-blue' size={20} fw={550}>
                    Horario
                    </InputLabel>
                    <Select
                        data={['GRU01','IND01','VAV01','TRP01']}
                        />
                </Group>
                <Group>
                    <InputLabel className='text-system-label-blue' size={20} fw={550}>
                    Profesor
                    </InputLabel>
                    <Autocomplete
                        data={['Cesar','Laura','Michelle']}
                        />
                </Group>
            </CustomFilter>
            <CustomTable/>
        </CustomSection>
         </div>
    );
}


export default Curso