import React, { useEffect, useState } from "react";
import CustomSection from "../components/CustomSection";
import useRegisterStore from "./RegisterStore";
import {
    CustomButton,
    CustomDateInput,
    CustomDatePickerInput,
    CustomNumberInput,
    CustomSelect,
    CustomTextInput,
    SelectPaymentMethod,
} from "../components/CustomInputs";
import { Group, Input, InputWrapper } from "@mantine/core";
import axios from "axios";
import useSwimmerFormStore from "./SwimmerFormStore";
import {
    showErrorNotification,
    showLoadingNotification,
    updateErrorLoadingNotification,
    updateSuccessLoadingNotification,
} from "../util/CustomNotifications";
import { IconUserCheck, IconUserCircle, IconUserEdit, IconUserFilled, IconUserPlus, IconUsersPlus, IconUserUp } from "@tabler/icons-react";
function RegisterSwimmer() {
    const registerStore = useRegisterStore();
    const swimmerFormStore = useSwimmerFormStore();
    const [selectedDays, setSelectedDays] = useState([]);
    //FILL SELECTS WITH DATA
    useEffect(() => {
        getInstructors();
        axios.get("enrollment_status/").then(function (response) {
            const enrollmentStatuses = response.data?.map(
                (enrollmentStatus) => ({
                    label: enrollmentStatus.name,
                    value: enrollmentStatus.id.toString(),
                })
            );
            swimmerFormStore.setEnrollmentStatus(enrollmentStatuses[1].value);
            registerStore.setEnrollmentStatuses(enrollmentStatuses);
        });

        axios.get("payment_status/").then(function (response) {
            const paymentStatuses = response.data?.map((paymentStatus) => ({
                label: paymentStatus.name,
                value: paymentStatus.id.toString(),
            }));
            registerStore.setPaymentStatuses(paymentStatuses);
        });

        axios.get("role/").then(function (response) {
            let filteredRoles = response.data?.filter(
                (role) => role.name !== "ADMINISTRADOR"
            );
            const roles = filteredRoles?.map((role) => ({
                label: role.name,
                value: role.id.toString(),
            }));
            registerStore.setRoles(roles);
        });
    }, []);

    useEffect(() => {
        getCourses();
    }, [swimmerFormStore.instructor]);

    useEffect(() => {
        if (
            !swimmerFormStore.names ||
            !swimmerFormStore.lastNames ||
            !swimmerFormStore.role ||
            !swimmerFormStore.birthdate
        )
            return;
        axios
            .post("administration/usernames/", {
                first_name: swimmerFormStore.names,
                last_name: swimmerFormStore.lastNames,
                role: swimmerFormStore.role,
                birthdate: swimmerFormStore.birthdate,
            })
            .then(function (response) {
                registerStore.setUsernames(response.data);
                swimmerFormStore.setUsername(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [
        swimmerFormStore.names,
        swimmerFormStore.lastNames,
        swimmerFormStore.role,
        swimmerFormStore.birthdate,
    ]);

    const getInstructors = () => {
        axios.get("instructor/").then(function (response) {
            const instructors = response.data?.map((instructor) => ({
                label: instructor.first_name,
                value: instructor.id.toString(),
            }));
            registerStore.setInstructors(instructors);
        });
    };

    const getCourses = () => {
        let url = "administration/courses/type_grouped/";
        let params = new URLSearchParams();
        if (swimmerFormStore.instructor) {
            params.append("instructor", swimmerFormStore.instructor);
        }
        url += "?" + params.toString();
        axios.get(url).then(function (response) {
            const coursesGroups = response.data?.map((courseGroup) => ({
                group: courseGroup.course_type,
                items: courseGroup.courses.map((course) => ({
                    label: course.name,
                    value: course.id.toString(),
                    course: course,
                })),
            }));
            registerStore.setCourses(coursesGroups);
        });
    };

    const calculateAge = (birthdate) => {
        if (!birthdate) return 0;
        const birthdateYear = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
        const calculatedAge = currentYear - birthdateYear;
        return calculatedAge.toString();
    };

    const getInstructorData = () => {
        return {
            first_name: swimmerFormStore.names,
            last_name: swimmerFormStore.lastNames,
            email: swimmerFormStore.email,
            role: swimmerFormStore.role,
            password: "12345678",
            confirm_password: "12345678",
        };
    };

    const getSwimmerData = () => {
        if (swimmerFormStore.age < 18) {
            if (swimmerFormStore.representative === "") {
                showErrorNotification({
                    message: "Debe ingresar el nombre del representante",
                });
                return null;
            } else if (swimmerFormStore.relationship === "") {
                showErrorNotification({
                    message: "Debe ingresar el vinculo del representante",
                });
                return null;
            }
        }
        return {
            first_name: swimmerFormStore.names,
            last_name: swimmerFormStore.lastNames,
            email: swimmerFormStore.email,
            role: swimmerFormStore.role,
            password: "12345678",
            confirm_password: "12345678",
            birthdate: swimmerFormStore.birthdate,
            age: swimmerFormStore.age,
            address: swimmerFormStore.address,
            phone_number: swimmerFormStore.phoneNumber,
            representative_name: swimmerFormStore.representative,
            representative_relationship: swimmerFormStore.relationship,
        };
    };

    const getEnrollmentData = () => {
        return {
            course: swimmerFormStore.course,
            status: swimmerFormStore.enrollmentStatus,
            receipt_number: swimmerFormStore.voucherNumber,
            payment_value: swimmerFormStore.credit,
            payment_status: swimmerFormStore.paymentStatus,
        };
    };
    const saveUser = async () => {
        let data = getSwimmerData();
        if (!data) return;
        data["username"] = swimmerFormStore.username;
        data = { ...data, ...getEnrollmentData() };
        axios
            .post(`administration/web_register_enrollment/`, data)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const enrollSwimmer = (swimmerId, notificationId) => {
        let url = "enrollment/generate_enrollment/";
        axios
            .post(url, {
                applicant: swimmerId,
                course: swimmerFormStore.course,
                status: swimmerFormStore.enrollmentStatus,
                receipt_number: swimmerFormStore.voucherNumber,
            })
            .then(function (response) {
                const enrollmentId = response.data.enrollment;
                const voucherNumber = response.data.payment_receipt;
                return generatePayment(
                    enrollmentId,
                    notificationId,
                    voucherNumber
                );
            })
            .catch(function (error) {
                // DELETE USER IF ENROLLMENT CREATION FAILS
                console.log(error);
                return updateErrorLoadingNotification(notificationId);
            });
    };
    const generatePayment = (enrollmentId, notificationId, voucherNumber) => {
        let course = registerStore.courses?.find(
            (course) => course.value === swimmerFormStore.course
        )?.course;
        if (!course) {
            return updateErrorLoadingNotification(notificationId);
        }
        let url = "payment/create/";
        axios
            .post(url, {
                receipt_number: swimmerFormStore.voucherNumber,
                payment_status: swimmerFormStore.paymentStatus,
                enrollment: enrollmentId,
                course: swimmerFormStore.course,
                balance: course?.price,
                payment_date: new Date().toISOString().split("T")[0],
                payment_value: swimmerFormStore.credit,
                financial_institution: "Banco Pichincha",
                description: `Pago por registro de nadador en ${course.name}`,
            })
            .then(function (response) {
                console.log("RECEIPT CREADO");
                return updateSuccessLoadingNotification(notificationId);
            })
            .catch(function (error) {
                console.log(error);
                return updateErrorLoadingNotification(notificationId);
            });
    };

    return (
        <CustomSection title="Registrar nadador" icon={<IconUserPlus size={40} />}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 pb-4">
                <CustomTextInput
                    label=" Nombres"
                    withAsterisk
                    placeholder="Ingrese sus nombres"
                    className="sm:col-span-2"
                    value={swimmerFormStore.names}
                    onChange={(e) =>
                        swimmerFormStore.setNames(e.currentTarget.value)
                    }
                />
                <CustomTextInput
                    label="Apellidos"
                    withAsterisk
                    placeholder="Ingrese sus apellidos"
                    className="sm:col-span-2"
                    value={swimmerFormStore.lastNames}
                    onChange={(e) =>
                        swimmerFormStore.setLastNames(e.currentTarget.value)
                    }
                />

                {!swimmerFormStore.isInstructor && (
                    <>
                        <div className="sm:col-span-2 grid grid-cols-4 gap-x-3">
                            <CustomDateInput
                                label="Fecha de nacimiento"
                                withAsterisk
                                placeholder="día/mes/año"
                                valueFormat="DD MMMM YYYY"
                                className="sm:col-span-3"
                                value={swimmerFormStore.birthDate}
                                onChange={(birthdate) => {
                                    swimmerFormStore.setBirthDate(
                                        birthdate.toLocaleString("en-CA", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })
                                    );
                                    swimmerFormStore.setAge(
                                        calculateAge(birthdate)
                                    );
                                }}
                            />
                            <InputWrapper label="Edad:">
                                <Input
                                    value={swimmerFormStore.age || 0}
                                    readOnly
                                />
                            </InputWrapper>
                        </div>
                    </>
                )}
                <div className="sm:col-span-2 grid sm:grid-cols-7 gap-x-3">
                    <CustomSelect
                        label="Rol"
                        data={registerStore.roles}
                        className={
                            swimmerFormStore.isInstructor
                                ? "sm:col-span-7"
                                : "sm:col-span-4"
                        }
                        value={swimmerFormStore.role}
                        onChange={(v) => {
                            swimmerFormStore.setRole(v);
                            const isInstructor =
                                registerStore.roles?.filter(
                                    (role) => role.value === v
                                )[0]?.label === "INSTRUCTOR";
                            swimmerFormStore.setIsInstructor(isInstructor);
                        }}
                    />
                    {!swimmerFormStore.isInstructor && (
                        <CustomTextInput
                            label="#Comprobante"
                            placeholder="Ingrese número de comprobante"
                            className="sm:col-span-3"
                            value={swimmerFormStore.voucherNumber}
                            onChange={(e) =>
                                swimmerFormStore.setVoucherNumber(
                                    e.currentTarget.value
                                )
                            }
                        />
                    )}
                </div>
                <CustomSelect
                    label="Usuario"
                    data={registerStore.usernames}
                    value={swimmerFormStore.username}
                    onChange={swimmerFormStore.setUsername}
                />
                <CustomTextInput
                    leftSectionPointerEvents="none"
                    className="sm:col-span-2 "
                    withAsterisk
                    label="Correo Electrónico: "
                    placeholder="nombre@dominio.com"
                    value={swimmerFormStore.email}
                    onChange={(e) =>
                        swimmerFormStore.setEmail(e.currentTarget?.value)
                    }
                />

                {!swimmerFormStore.isInstructor && (
                    <>
                        <CustomTextInput
                            leftSectionPointerEvents="none"
                            withAsterisk={swimmerFormStore.age < 18}
                            label="Representante: "
                            placeholder="Ingrese el nombre del representante"
                            className="sm:col-span-2"
                            value={swimmerFormStore.representantive}
                            onChange={(e) =>
                                swimmerFormStore.setRepresentative(
                                    e.currentTarget?.value
                                )
                            }
                        />
                        <div className="sm:col-span-2 grid sm:grid-cols-7 gap-x-3">
                            <CustomTextInput
                                label="Vínculo:"
                                placeholder="Escriba el vínculo"
                                withAsterisk={swimmerFormStore.age < 18}
                                className="sm:col-span-4"
                                value={swimmerFormStore.relationship}
                                onChange={(e) =>
                                    swimmerFormStore.setRelationship(
                                        e.currentTarget?.value
                                    )
                                }
                            />

                            <CustomTextInput
                                leftSectionPointerEvents="none"
                                withAsterisk
                                label="Teléfono: "
                                placeholder="Ingrese telefono"
                                className="sm:col-span-3"
                                value={swimmerFormStore.phoneNumber}
                                onChange={(e) =>
                                    swimmerFormStore.setPhoneNumber(
                                        e.currentTarget?.value
                                    )
                                }
                            />
                        </div>

                        <CustomSelect
                            label="Instructor: "
                            placeholder="Elegir Instructor: "
                            withAsterisk
                            data={registerStore.instructors}
                            className="sm:col-span-2"
                            value={swimmerFormStore.instructor}
                            onChange={swimmerFormStore.setInstructor}
                        />

                        {/* <CustomSelect
                            label="Tipo de clase:"
                            placeholder="Elegir Paquete "
                            withAsterisk
                            data={registerStore.courseTypes}
                            className="sm:col-span-2"
                            value={swimmerFormStore.courseType}
                            onChange={swimmerFormStore.setCourseType}
                        /> */}
                        <div className="sm:col-span-2 grid sm:grid-cols-4 gap-x-3">
                            <CustomSelect
                                label="Curso"
                                className={
                                    swimmerFormStore.isInstructor
                                        ? "sm:col-span-4"
                                        : "sm:col-span-3"
                                }
                                data={registerStore.courses}
                                value={swimmerFormStore.course}
                                onChange={swimmerFormStore.setCourse}
                            />
                            <InputWrapper label="Precio">
                                <Input
                                    value={
                                        registerStore.courses?.find(
                                            (course) =>
                                                course.value ===
                                                swimmerFormStore.course
                                        )?.course?.price || 0
                                    }
                                    readOnly
                                />
                            </InputWrapper>
                        </div>
                    </>
                )}

                {!swimmerFormStore.isInstructor && (
                    <>
                        {" "}
                        <div className="sm:col-span-2 grid sm:grid-cols-7 gap-x-3">
                            <SelectPaymentMethod store={swimmerFormStore} />

                            <CustomNumberInput
                                label="Valor a pagar"
                                defaultValue={0.0}
                                precision={2}
                                min={-1}
                                step={0.05}
                                className="sm:col-span-3"
                                value={swimmerFormStore.credit}
                                onChange={(value) => {
                                    console.log(value);
                                    swimmerFormStore.setCredit(value);
                                    let coursePrice =
                                        registerStore.courses?.find(
                                            (course) =>
                                                course.value ===
                                                swimmerFormStore.course
                                        )?.course?.price;
                                    let paymentStatus = "0";
                                    if (value === coursePrice) {
                                        paymentStatus = "1";
                                    } else if (value > coursePrice) {
                                        paymentStatus = "2";
                                    }
                                    console.log(paymentStatus);
                                    console.log(coursePrice);
                                    swimmerFormStore.setPaymentState(
                                        paymentStatus
                                    );
                                }}
                            />
                        </div>
                        <CustomSelect
                            label="Estado de pago"
                            placeholder="Elegir estado de pago"
                            withAsterisk
                            data={registerStore.paymentStatuses}
                            className="sm:col-span-2"
                            value={swimmerFormStore.paymentStatus}
                            onChange={swimmerFormStore.setPaymentStatus}
                        />
                        <CustomSelect
                            label="Estado de inscripción: "
                            placeholder="Elegir estado de inscripción "
                            withAsterisk
                            data={registerStore.enrollmentStatuses}
                            value={swimmerFormStore.enrollmentStatus}
                            onChange={swimmerFormStore.setEnrollmentStatus}
                        />
                        <CustomDatePickerInput
                            type="range"
                            label="Inicio-Fin de Inscripción:"
                            placeholder="Inicio-Fin de Inscripción:"
                            valueFormat="DD MMMM YYYY"
                            locale="es"
                            value={swimmerFormStore.applicationDuration}
                            onChange={swimmerFormStore.setApplicationDuration}
                        />
                    </>
                )}
            </div>
            <Group justify="center">
                <CustomButton
                    onClick={saveUser}
                    text={"Guardar"}
                    bgColor={"#15192F"}
                />
            </Group>
        </CustomSection>
    );
}

export default RegisterSwimmer;
