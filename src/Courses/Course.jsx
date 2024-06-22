import React, { useEffect } from 'react';
import CustomTable from '../components/CustomTable';
import CustomSection from '../components/CustomSection';
import CustomFilter from '../components/CustomFilter';
import { Autocomplete, Group, InputLabel, Select } from '@mantine/core';
import axios from 'axios';
import useCourseStore from './CourseStore';
import useCoursesFilterStore from './CoursesFilterStore';
function Curso() {
    const course = useCourseStore();
    const courseFilterStore = useCoursesFilterStore();
    // LLENAR FILTROS
    useEffect(() => {
        axios.get("tipos-clase/").then(function (response) {
            let courseTypes = response.data?.map(cT => {
                return {
                    label: cT.nombre,
                    value: cT.id.toString()
                }
            })
            course.setCourseTypes(courseTypes)
        })

        axios.get("instructor/").then(function (response) {
            let trainers = response.data?.map(trainer => {
                return {
                    label: trainer.nombres,
                    value: trainer.id.toString()
                }
            })
            course.setTrainers(trainers)
        })

        axios.get("administrador/horarios/").then(function (response) {
            course.setSchedules(response.data)
        })
    }, [])
    useEffect(() => {
        axios.get(`administrador/Courses/course_type/1/instructor/4/schedule/1/page/1/`)
            .then(function (response) {
                console.log(response.data.data)
                course.setCourses(response.data.data)
            })
    }, [courseFilterStore])
    return (
        <div>
            <CustomSection className='absolute ' title="Clases">

                <CustomFilter filter={courseFilterStore}>
                    <Group>
                        <InputLabel className='text-system-label-blue' size={20} fw={550}>
                            Instructor
                        </InputLabel>
                        <Select
                            searchable
                            // data={course.trainers}
                            onChange={courseFilterStore.setTrainer}
                        />
                    </Group>
                    <Group>
                        <InputLabel className='text-system-label-blue' size={20} fw={550}>
                            Tipo de clase
                        </InputLabel>
                        <Select
                            // data={course.courseTypes}
                            onChange={courseFilterStore.setCourseType}
                        />
                    </Group>
                    <Group>
                        <InputLabel className='text-system-label-blue' size={20} fw={550}>
                            Horario
                        </InputLabel>
                        <Select
                            // data={course.schedules}
                            onChange={courseFilterStore.setSchedule}
                        />
                    </Group>
                </CustomFilter>
                <CustomTable
                    headers={["id", "instructor", "tipoDeClase", "horaInicio", "horaFin", "fechaInicio", "fechaFin"]}
                    getters={['id', 'instructor', 'course_type', 'start_time', 'end_time', 'start_date', 'due_date']}
                    data={course.courses}
                />
            </CustomSection>
        </div>
    );
}


export default Curso