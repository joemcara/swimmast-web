import React, { useEffect, useRef } from 'react'
import CustomSection from '../components/CustomSection';
import { ActionIcon, Group, Radio, rem } from '@mantine/core';
import { IconBellSchool, IconClock, IconPlus, IconSchool, IconSchoolBell, IconSchoolOff } from '@tabler/icons-react';
import { CustomButton, CustomDatePickerInput, CustomNumberInput, CustomSelect, CustomTextInput } from '../components/CustomInputs';
import { TimeInput } from '@mantine/dates';
import useCourseFormStore from './CourseFormStore';
import axios from 'axios';
import useRegisterStore from './RegisterStore';

function RegisterCourse() {
    const courseFormStore = useCourseFormStore();
    const registerStore = useRegisterStore();
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

    useEffect(() => {
        axios.get("course_type/").then(function (response) {
            let courseTypes = response.data?.map(cT => {
                return {
                    label: cT.name,
                    value: cT.id.toString()
                }
            })
            registerStore.setCourseTypes(courseTypes)
        })

        axios.get("instructor/").then(function (response) {
            let instructors = response.data?.map(instructor => {
                return {
                    label: `${instructor.first_name} ${instructor.last_name}`,
                    value: instructor.id.toString()
                }
            })
            registerStore.setInstructors(instructors)
        })

        axios.get("course_status/").then(function (response) {
            let courseStatus = response.data?.map(status => {
                if (status.name === 'ACTIVO') {
                    courseFormStore.setCourseState(status.id.toString())
                }
                return {
                    label: status.name,
                    value: status.id.toString()
                }
            })
            registerStore.setCourseStatuses(courseStatus)
        })

    }, [])

    useEffect(() => {
        console.log(courseFormStore)
    }, [courseFormStore])

    const createCourse = () => {
        axios.post("course/create_course/", {
            start_date: courseFormStore.enrollmentDuration[0]?.toISOString().split('T')[0],
            due_date: courseFormStore.enrollmentDuration[1]?.toISOString().split('T')[0],
            start_time: courseFormStore.startTime,
            end_time: courseFormStore.endTime,
            instructor: courseFormStore.instructor,
            name: courseFormStore.courseName,
            price: courseFormStore.coursePrice,
            description: courseFormStore.description,
            course_status: courseFormStore.courseState,
            course_type: courseFormStore.courseType,
        }).then(function (response) {
            console.log(response.data)
            courseFormStore.reset()
        })
    }
    return (
        <CustomSection title='Registrar curso' icon={<div className=' relative pr-2'>
            <IconSchool size={40} />
            <IconPlus size={17} stroke={4} className='absolute right-0 bottom-0' />
        </div>}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

                <CustomTextInput
                    label="Nombre del curso"
                    withAsterisk
                    placeholder="Ingrese el nombre del curso"
                    value={courseFormStore.courseName}
                    onChange={e => courseFormStore.setCourseName(e.currentTarget?.value)}
                />
                <CustomSelect
                    label="Instructor: "
                    placeholder="Elegir Instructor: "
                    withAsterisk
                    data={registerStore.instructors}
                    value={courseFormStore.instructor}
                    onChange={courseFormStore.setInstructor}
                />
                <Radio.Group label="Tipo de curso" className='col-span-2' value={courseFormStore.courseType} onChange={courseFormStore.setCourseType}>
                    <Group mt={6}>
                        {registerStore.courseTypes?.map((type) => (
                            <Radio
                                key={type.key + type.value}
                                value={type.value}
                                color="blue"
                                label={type.label?.charAt(0).toUpperCase() + type.label?.slice(1).toLowerCase()}
                            />
                        ))}
                    </Group>
                </Radio.Group>

                <Radio.Group label="Estado del curso" className='col-span-2' value={
                    courseFormStore.courseState
                } onChange={courseFormStore.setCourseState}>
                    <Group mt={6}>
                        {registerStore.courseStatuses?.map((status) => {
                            return <Radio
                                key={status.key + status.value}
                                value={status.value}
                                color="blue"
                                label={status.label?.charAt(0).toUpperCase() + status.label?.slice(1).toLowerCase()}
                            />
                        })}
                    </Group>
                </Radio.Group>
                <CustomDatePickerInput
                    label="Inicio-Fin de Curso:"
                    placeholder="Inicio-Fin de Curso:"
                    valueFormat="DD MMM YYYY"
                    value={courseFormStore.enrollmentDuration}
                    onChange={courseFormStore.setEnrollmentDuration}
                />
                <TimeInput
                    label="Hora Inicio:"
                    maxTime={courseFormStore.endTime}
                    rightSection={startPickerControl}
                    ref={startTimeRef}
                    value={courseFormStore.startTime}
                    onChange={e => courseFormStore.setStartTime(e.currentTarget?.value)}
                />

                <TimeInput
                    label="Hora Fin:"
                    rightSection={finishPickerControl}
                    ref={finishTimeRef}
                    minTime={courseFormStore.startTime}
                    value={courseFormStore.endTime}
                    onChange={e => courseFormStore.setEndTime(e.currentTarget?.value)}
                />
                <CustomNumberInput
                    label="Precio: $"
                    defaultValue={0.00}
                    precision={2}
                    min={-1}
                    step={0.05}
                    value={courseFormStore.coursePrice}
                    onChange={courseFormStore.setCoursePrice}
                />

            </div>
            <br />
            <Group justify="center">
                <CustomButton text='Guardar' bgColor={'#15192F'} onClick={createCourse} />

            </Group>
        </CustomSection>
    );
}

export default RegisterCourse