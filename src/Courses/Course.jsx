import React, { useEffect, useState } from 'react';
import CustomTable from '../components/CustomTable';
import CustomSection from '../components/CustomSection';
import CustomFilter from '../components/CustomFilter';
import { Autocomplete, Group, InputLabel, Select, Input, Stack } from '@mantine/core';
import axios from 'axios';
import useCourseStore from './CourseStore';
import useCoursesFilterStore from './CoursesFilterStore';
import { IconSchool, IconSearch, IconSwimming } from '@tabler/icons-react';
import { CustomCheckbox } from '../components/CustomInputs';
function Curso() {
    const courseStore = useCourseStore();
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
            courseStore.setCourseTypes(courseTypes)
        })
    }, [])

    const getCourses = () => {
        let url = `administration/courses/page/${courseFilterStore.currentPage}/`
        let params = new URLSearchParams();
        if (courseFilterStore.courseType) params.append("course_type", courseFilterStore.courseType)
        if (courseFilterStore.search) params.append("search", courseFilterStore.search)
        url += `?${params.toString()}`
        axios.get(url, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then(function (response) {
            courseStore.setCourses(response.data.data)
            courseStore.setTotalPages(response.data?.pagesTotales)

        }).catch(function (error) { console.log(error) })
    }

    useEffect(() => {
        getCourses()
    }, [])

    useEffect(() => {
        if (!courseFilterStore.search) getCourses();
    }, [courseFilterStore.search])

    return (
        <div>
            <CustomSection
                icon={<IconSchool size={35} />}
                title="Cursos"
                searchBar="Buscar curso"
                getData={getCourses}
                filter={courseFilterStore}
            >

                <CustomFilter filter={courseFilterStore} getData={getCourses}>
                    <Stack>
                        <InputLabel className='text-black' size={16} fw={700}>Tipo de curso</InputLabel>
                        <Group>
                            {courseStore.courseTypes?.map((type) => (
                                <CustomCheckbox
                                    key={type.key + type.value}
                                    label={type.label?.charAt(0).toUpperCase() + type.label?.slice(1).toLowerCase()}
                                    checked={courseFilterStore.courseType.includes(type.value)}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            courseFilterStore.setCourseType([...courseFilterStore.courseType, type.value])
                                        } else {
                                            courseFilterStore.setCourseType(courseFilterStore.courseType.filter((item) => item !== type.value))
                                        }
                                    }}
                                />
                            ))}
                        </Group>
                    </Stack>
                </CustomFilter>

                <CustomTable
                    type='curso'
                    headers={["nombre", "instructor", "tipoDeClase", "horaInicio", "horaFin", "fechaInicio", "fechaFin"]}
                    getters={['name', 'instructor_name', 'course_type_name', 'start_time', 'end_time', 'start_date', 'due_date']}
                    data={courseStore.courses}
                    store={courseStore}
                />
            </CustomSection>
        </div>
    );
}


export default Curso