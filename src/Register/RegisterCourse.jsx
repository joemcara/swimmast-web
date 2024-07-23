import React, { useRef } from 'react'
import CustomSection from '../components/CustomSection';
import { ActionIcon, Group, rem } from '@mantine/core';
import { IconBellSchool, IconClock, IconPlus, IconSchool, IconSchoolBell, IconSchoolOff } from '@tabler/icons-react';
import { CustomButton, CustomDatePickerInput, CustomNumberInput, CustomSelect, CustomTextInput } from '../components/CustomInputs';
import { TimeInput } from '@mantine/dates';
import useCourseFormStore from './CourseFormStore';
import { IconScriptPlus } from '@tabler/icons-react';

function RegisterCourse() {
    const courseFormStore = useCourseFormStore();
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

    return (
        <CustomSection title='Registrar curso' icon={<div className=' relative pr-2'>
            <IconSchool size={40} />
            <IconPlus size={17} stroke={4} className='absolute right-0 bottom-0' />
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
                    data={instructor}
                    value={courseFormStore.instructor}
                    onChange={courseFormStore.setInstructor}
                />

                <CustomSelect
                    label="Tipo de clase"
                    data={["GRUPAL", "INDIVIDUAL"]}
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
                    data={["estado clase"]}
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

export default RegisterCourse