import { ActionIcon, Group, Radio, rem } from '@mantine/core';
import { IconClock, IconPencil, IconPencilCode, IconSchool } from '@tabler/icons-react';
import React, { useEffect, useRef } from 'react'
import { CustomButton, CustomCheckbox, CustomCheckboxGroup, CustomDatePickerInput, CustomNumberInput, CustomRadioGroup, CustomSelect, CustomTextArea, CustomTextInput } from '../components/CustomInputs';
import useCourseFormStore from '../Register/CourseFormStore';
import { TimeInput } from '@mantine/dates';
import CustomSection from '../components/CustomSection';
import useRegisterStore from '../Register/RegisterStore';
import axios from 'axios';
import useCourseStore from '../Courses/CourseStore';
import { useNavigate } from 'react-router-dom';
import { showLoadingNotification, updateErrorLoadingNotification, updateSuccessLoadingNotification } from '../util/CustomNotifications';

function UpdateCourse() {
    const courseFormStore = useCourseFormStore();
    const registerStore = useRegisterStore();
    const courseStore = useCourseStore();

    const startTimeRef = useRef(null);
    const finishTimeRef = useRef(null);
    const navigate = useNavigate();
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

        axios.get("weekday/").then(function (response) {
            let weekdays = response.data?.map(day => {
                return {
                    label: day.name,
                    value: day.id.toString()
                }
            })
            registerStore.setWeekdays(weekdays)
        })
    }, [])

    useEffect(() => {
        if (courseStore.selectedItem) courseFormStore.edit(courseStore.selectedItem)
    }, [])

    const updateCourse = () => {
        let notificationId = showLoadingNotification("Actualizando curso")
        axios.put(`administration/web_update_course/`, {
            course_id: courseFormStore.id,
            name: courseFormStore.courseName,
            instructor: courseFormStore.instructor,
            course_type: courseFormStore.courseType,
            start_date: courseFormStore?.enrollmentDuration[0]?.toISOString().split('T')[0],
            due_date: courseFormStore?.enrollmentDuration[1]?.toISOString().split('T')[0],
            course_status: courseFormStore.courseStatus,
            price: courseFormStore.coursePrice,
            start_time: courseFormStore.startTime,
            end_time: courseFormStore.endTime,
            description: courseFormStore.description,
            weekdays: courseFormStore.weekdays,
            available: courseFormStore.available
        }).then(function (response) {
            if (response.status === 200) {
                updateSuccessLoadingNotification(notificationId, "Curso actualizado", 'Curso actualizado exitosamente')
                courseFormStore.reset()
                navigate("/cursos")
            }
        }).catch(function (error) {
            updateErrorLoadingNotification(notificationId, "Error", 'Error al actualizar el curso')
            console.log(error)
        })
    }


    return (
        <CustomSection title='Actualizar curso' icon={<div className='relative pr-2'>
            <IconSchool size={35} />
            <IconPencil size={15} stroke={3} className='absolute right-0 bottom-0' />
        </div>}>
            <div className="mt-10 grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-10">

                <CustomTextInput
                    label="Nombre del curso"
                    withAsterisk
                    className="col-span-2"
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
                <CustomRadioGroup
                    data={registerStore.courseTypes}
                    label="Tipo de curso"
                    className="col-span-2"
                    value={courseFormStore.courseType}
                    onChange={courseFormStore.setCourseType}
                />
                <CustomRadioGroup
                    data={registerStore.courseStatuses}
                    label="Estado del curso"
                    className="col-span-2"
                    value={courseFormStore.courseStatus}
                    onChange={courseFormStore.setCourseStatus}
                />
                <CustomNumberInput
                    label="Precio:"
                    value={courseFormStore.coursePrice}
                    onChange={courseFormStore.setCoursePrice}
                />
                <CustomCheckbox
                    className="mt-8"
                    label="Disponible"
                    checked={courseFormStore.available}
                    onChange={e => courseFormStore.setAvailable(e.currentTarget.checked)}
                />
                <CustomDatePickerInput
                    label="Inicio-Fin de Curso:"
                    placeholder="Inicio-Fin de Curso:"
                    valueFormat="DD MMMM YYYY"
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
                <CustomCheckboxGroup
                    label="Días de clase"
                    className="col-span-6"
                    fontWeight={400}
                    value={courseFormStore.weekdays}
                    setFormList={courseFormStore.setWeekdays}
                    data={registerStore.weekdays}
                />
                <CustomTextArea
                    label="Descripción"
                    className="col-span-4"
                    value={courseFormStore.description}
                    onChange={e => courseFormStore.setDescription(e.currentTarget?.value)}
                />


            </div>
            <br />
            <Group justify="center">
                <CustomButton text='Guardar' bgColor={'#15192F'} onClick={updateCourse} />

            </Group>
        </CustomSection>
    );
}

export default UpdateCourse