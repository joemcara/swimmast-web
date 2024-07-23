import { ActionIcon, Group, rem } from '@mantine/core';
import { IconClock, IconPencil, IconPencilCode, IconSchool } from '@tabler/icons-react';
import React, { useEffect, useRef } from 'react'
import { CustomButton, CustomDatePickerInput, CustomNumberInput, CustomSelect, CustomTextInput } from '../components/CustomInputs';
import useCourseFormStore from '../Register/CourseFormStore';
import { TimeInput } from '@mantine/dates';
import CustomSection from '../components/CustomSection';
import useRegisterStore from '../Register/RegisterStore';
import axios from 'axios';

function UpdateCourse() {
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
                return {
                    label: status.name,
                    value: status.id.toString()
                }
            })
            registerStore.setCourseStatuses(courseStatus)
        })
    }, [])

    useEffect(() => {
        courseFormStore.setCourseName("Curso de natación")
        courseFormStore.setInstructor("Ricardo Alcivar")
        courseFormStore.setCourseType("GRUPAL")
        courseFormStore.setEnrollmentDuration([new Date(), new Date()])
        courseFormStore.setStartTime("08:00")
        courseFormStore.setEndTime("09:00")
    }, [])

    return (
        <CustomSection title='Actualizar curso' icon={<div className='relative pr-2'>
            <IconSchool size={40} />
            <IconPencil size={17} stroke={3} className='absolute right-0 bottom-0' />
        </div>}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

                <CustomTextInput
                    label="Nombre del curso"
                    withAsterisk
                    placeholder="Ingrese Curso"
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

                <CustomSelect
                    label="Tipo de clase"
                    data={registerStore.courseTypes}
                    value={courseFormStore.courseType}
                    onChange={courseFormStore.setCourseType}
                />

                <CustomDatePickerInput
                    label="Inicio-Fin de Curso:"
                    placeholder="Inicio-Fin de Curso:"
                    value={courseFormStore.enrollmentDuration}
                    onChange={courseFormStore.setEnrollmentDuration}
                />
                <CustomSelect
                    label="Estado"
                    data={registerStore.courseStatuses}
                />
                <CustomNumberInput
                    label="Precio: $"
                    defaultValue={0.00}
                    precision={2}
                    min={-1}
                    step={0.05}
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

            </div>
            <br />
            <Group justify="center">
                <CustomButton text='Guardar' bgColor={'#15192F'} />

            </Group>
        </CustomSection>
    );
}

export default UpdateCourse