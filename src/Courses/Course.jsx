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
        axios.get("course_type/").then(function (response) {
            let courseTypes = response.data?.map(cT => {
                return {
                    label: cT.name,
                    value: cT.id.toString()
                }
            })
            course.setCourseTypes(courseTypes)
        })

        axios.get("instructor/").then(function (response) {
            let instructors = response.data?.map(instructor => {
                return {
                    label: instructor.first_name,
                    value: instructor.id.toString()
                }
            })
            course.setInstructors(instructors)
        })

        axios.get("administrador/schedules/").then(function (response) {
            course.setSchedules(response.data)
        })
    }, [])
    useEffect(() => {
        axios.get(`administrador/Courses/course_type/${courseFilterStore.courseType || 'todos'}/instructor/${courseFilterStore.instructor || 'todos'}/schedule/${courseFilterStore.schedule || '00:00:00'}/page/${courseFilterStore.currentPage}/`)
            .then(function (response) {
                course.setCourses(response.data.data)
            })
    }, [courseFilterStore])

    return (
        <div>
            <CustomSection className='absolute ' title="Clases">

                <CustomFilter filter={courseFilterStore}>
                    <Group>
                        <InputLabel className='text-system-label-blue' size={20} fw={700}>
                            Instructor
                        </InputLabel>
                        <Select
                            searchable
                            data={course.instructors}
                            value={courseFilterStore.instructor}
                            onChange={courseFilterStore.setInstructor}
                        />
                    </Group>
                    <Group>
                        <InputLabel className='text-system-label-blue' size={20} fw={700}>
                            Tipo de clase
                        </InputLabel>
                        <Select
                            data={course.courseTypes}
                            value={courseFilterStore.courseType}
                            onChange={courseFilterStore.setCourseType}
                        />
                    </Group>
                    <Group>
                        <InputLabel className='text-system-label-blue' size={20} fw={700}>
                            Horario
                        </InputLabel>
                        <Select
                            data={course.schedules}
                            value={courseFilterStore.schedule}
                            onChange={courseFilterStore.setSchedule}
                        />
                    </Group>
                </CustomFilter>
                <CustomTable
                    headers={["id", "instructor", "tipoDeClase", "horaInicio", "horaFin", "fechaInicio", "fechaFin"]}
                    getters={['id', 'instructor', 'course_type', 'start_time', 'end_time', 'start_date', 'due_date']}
                    data={course.courses}
                    store={course}
                />
            </CustomSection>
        </div>
    );
}


export default Curso