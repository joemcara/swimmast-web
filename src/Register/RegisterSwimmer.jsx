import React, { useEffect, useState } from "react";
import CustomSection from "../components/CustomSection";
import useRegisterStore from "./RegisterStore";
import {
    CustomButton,
    CustomDateInput,
    CustomDatePickerInput,
    CustomNumberInput,
    CustomRadioGroup,
    CustomSelect,
    CustomTextInput,
    SelectPaymentMethod,
} from "../components/CustomInputs";
import { Group, Input, InputLabel, InputWrapper, Radio } from "@mantine/core";
import axios from "axios";
import useSwimmerFormStore from "./SwimmerFormStore";
import {
    showErrorNotification,
    showLoadingNotification,
    updateErrorLoadingNotification,
    updateSuccessLoadingNotification,
} from "../util/CustomNotifications";
import { IconUserCheck, IconUserCircle, IconUserEdit, IconUserFilled, IconUserPlus, IconUsersPlus, IconUserUp } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import ReadOnly from "../components/ReadOnly";
function RegisterSwimmer() {
    const registerStore = useRegisterStore();
    const swimmerFormStore = useSwimmerFormStore();
    const [queryUsernames, setQueryUsernames] = useState(false);
    const navigate = useNavigate();
    //FILL SELECTS WITH DATA
    useEffect(() => {
        console.log(swimmerFormStore)
        swimmerFormStore.reset();
        getInstructors();
        axios.get("enrollment_status/").then(function (response) {
            const enrollmentStatuses = response.data?.map((enrollmentStatus) => {
                if (enrollmentStatus.name === "PENDIENTE") {
                    swimmerFormStore.setEnrollmentStatus(enrollmentStatus?.id.toString());
                }
                return {
                    label: enrollmentStatus.name,
                    value: enrollmentStatus.id.toString(),
                }
            });
            registerStore.setEnrollmentStatuses(enrollmentStatuses);
        });

        axios.get("payment_status/").then(function (response) {
            const paymentStatuses = response.data?.map((paymentStatus) => {
                if (paymentStatus.name === "NO PAGADA") {
                    swimmerFormStore.setPaymentStatus(paymentStatus.id.toString());
                }
                return {
                    label: paymentStatus.name,
                    value: paymentStatus.id.toString(),
                }
            });
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

        axios.get("payment_receipt/").then(function (response) {
            let maxReceiptNumber = response.data?.reduce((max, current) => {
                return parseInt(current.receipt_number) > parseInt(max.receipt_number) ? current : max;
            }).receipt_number
            console.log(maxReceiptNumber)
            swimmerFormStore.setReceiptNumber(parseInt(maxReceiptNumber) + 1);
        });

        setQueryUsernames(true);

    }, []);

    useEffect(() => {
        if (queryUsernames) getUsernames();
    }, [
        swimmerFormStore.firstName,
        swimmerFormStore.lastName,
        swimmerFormStore.role,
        swimmerFormStore.birthdate,
    ]);

    const [coursePrice, setCoursePrice] = useState(0);
    useEffect(() => {
        registerStore.courses?.map((course) => {
            course.items?.map((item) => {
                if (item.value === swimmerFormStore.course) setCoursePrice(item.course.price);
            });
        })
    }, [swimmerFormStore.course]);

    useEffect(() => {
        getCourses();
    }, [swimmerFormStore.instructor]);

    const getUsernames = () => {
        if (
            !swimmerFormStore.firstName ||
            !swimmerFormStore.lastName ||
            !swimmerFormStore.role ||
            !swimmerFormStore.birthdate
        )
            return;
        let date = swimmerFormStore.birthdate?.toLocaleString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        axios
            .post("administration/usernames/", {
                first_name: swimmerFormStore.firstName,
                last_name: swimmerFormStore.lastName,
                role: swimmerFormStore.role,
                birthdate: date,
            })
            .then(function (response) {
                registerStore.setUsernames(response.data);
                swimmerFormStore.setUsername(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


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
                    label: `${course.name} - $${course.price}`,
                    value: course.id.toString(),
                    course: course,
                })),
            }));
            registerStore.setCourses(coursesGroups);
        });
    };

    const calculateAge = (birthdate) => {
        if (!birthdate) return 0;
        // Calculate the difference in milliseconds between the current date and the provided date of birth
        let diff_ms = Date.now() - birthdate.getTime();
        // Create a new Date object representing the difference in milliseconds and store it in the variable age_dt (age Date object)
        let age_dt = new Date(diff_ms);

        // Calculate the absolute value of the difference in years between the age Date object and the year 1970 (UNIX epoch)
        console.log(Math.abs(age_dt.getUTCFullYear() - 1970));
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    const getInstructorData = () => {
        return {
            first_name: swimmerFormStore.firstName,
            last_name: swimmerFormStore.lastName,
            email: swimmerFormStore.email,
            role: swimmerFormStore.role,
            password: "12345678",
            confirm_password: "12345678",
        };
    };

    const getSwimmerData = () => {
        if (!swimmerFormStore.isInstructor && swimmerFormStore.age < 18) {
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
        console.log(swimmerFormStore.birthdate)
        return {
            first_name: swimmerFormStore.firstName,
            last_name: swimmerFormStore.lastName,
            email: swimmerFormStore.email,
            role: swimmerFormStore.role,
            password: "12345678",
            confirm_password: "12345678",
            birthdate: swimmerFormStore.birthdate?.toISOString().split("T")[0],
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
            receipt_number: swimmerFormStore.receiptNumber,
            payment_value: swimmerFormStore.credit,
            payment_status: swimmerFormStore.paymentStatus,
        };
    };
    const saveUser = () => {
        let data = getSwimmerData();
        if (!data) return;
        data["username"] = swimmerFormStore.username;
        data = { ...data, ...getEnrollmentData() };
        let notificationId = showLoadingNotification({ message: "Registrando nadador..." });
        axios
            .post(`administration/web_register_user_enrollment/`, data)
            .then(function (response) {
                if (response.status === 201) {
                    updateSuccessLoadingNotification(notificationId, response.data?.message);
                    swimmerFormStore.reset();
                    navigate("/")
                } else updateErrorLoadingNotification(notificationId, error.response?.data?.error);
            })
            .catch(function (error) {
                console.log(error);
                updateErrorLoadingNotification(notificationId, error.response?.data?.error);
            });
    };

    const generatePayment = (enrollmentId, notificationId, receiptNumber) => {
        let course = registerStore.courses?.find(
            (course) => course.value === swimmerFormStore.course
        )?.course;
        if (!course) {
            return updateErrorLoadingNotification(notificationId);
        }
        let url = "payment/create/";
        axios
            .post(url, {
                receipt_number: swimmerFormStore.receiptNumber,
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
        <CustomSection title="Registrar nadador" icon={<IconUserPlus size={35} />}>
            <div className="grid grid-cols-10 gap-y-4 bg-[#F1F3F5] p-6 rounded-md my-8 gap-x-3">
                <h2 className="text-lg col-span-10 font-semibold">Datos del nadador</h2>
                <CustomTextInput
                    label=" Nombres"
                    withAsterisk
                    placeholder="Ingrese sus nombres"
                    className="sm:col-span-2"
                    value={swimmerFormStore.firstName}
                    onChange={(e) =>
                        swimmerFormStore.setFirstName(e.currentTarget.value)
                    }
                />
                <CustomTextInput
                    label="Apellidos"
                    withAsterisk
                    placeholder="Ingrese sus apellidos"
                    className="sm:col-span-2"
                    value={swimmerFormStore.lastName}
                    onChange={(e) =>
                        swimmerFormStore.setLastName(e.currentTarget.value)
                    }
                />

                <div className="sm:col-span-2 grid grid-cols-4 gap-x-2">
                    <CustomDateInput
                        label="Fecha de nacimiento"
                        withAsterisk
                        placeholder="día mes año"
                        valueFormat="DD MMMM YYYY"
                        className="sm:col-span-3"
                        // value={swimmerFormStore.birthdate}
                        onChange={(birthdate) => {
                            swimmerFormStore.setBirthdate(
                                birthdate);
                            swimmerFormStore.setAge(
                                calculateAge(birthdate)
                            );
                        }}
                    />
                    <InputWrapper label="Edad:" className="pointer-events-none">
                        <Input
                            value={swimmerFormStore.age || 0}
                            readOnly
                            variant="filled"
                        />
                    </InputWrapper>
                </div>
                <CustomRadioGroup
                    label="Rol"
                    className="sm:col-span-4"
                    data={registerStore.roles}
                    value={swimmerFormStore.role}
                    onChange={value => {
                        let role = registerStore.roles?.find(role => role.value === value).label === "INSTRUCTOR" ? swimmerFormStore.setIsInstructor(true) : swimmerFormStore.setIsInstructor(false)
                        swimmerFormStore.setRole(value)
                    }}
                />
                <CustomSelect
                    label="Usuario"
                    data={registerStore.usernames}
                    value={swimmerFormStore.username}
                    onChange={swimmerFormStore.setUsername}
                />
                <CustomTextInput
                    leftSectionPointerEvents="none"
                    className="sm:col-span-2"
                    withAsterisk
                    label="Correo Electrónico: "
                    placeholder="nombre@dominio.com"
                    value={swimmerFormStore.email}
                    onChange={(e) =>
                        swimmerFormStore.setEmail(e.currentTarget?.value)
                    }
                />
                <CustomTextInput
                    leftSectionPointerEvents="none"
                    withAsterisk
                    label="Teléfono: "
                    placeholder="Ingrese telefono"
                    className="sm:col-span-2    "
                    value={swimmerFormStore.phoneNumber}
                    onChange={(e) =>
                        swimmerFormStore.setPhoneNumber(
                            e.currentTarget?.value
                        )
                    }
                />

                {!swimmerFormStore.isInstructor && <div className="sm:col-span-4 grid sm:grid-cols-4 gap-x-3">
                    <CustomTextInput
                        leftSectionPointerEvents="none"
                        withAsterisk={swimmerFormStore.age < 18}
                        label="Representante: "
                        placeholder="Ingrese el nombre"
                        className="sm:col-span-2"
                        value={swimmerFormStore.representantive}
                        onChange={(e) =>
                            swimmerFormStore.setRepresentative(
                                e.currentTarget?.value
                            )
                        }
                    />
                    <CustomTextInput
                        label="Vínculo:"
                        placeholder="Vínculo"
                        withAsterisk={swimmerFormStore.age < 18}
                        className="sm:col-span-1"
                        value={swimmerFormStore.relationship}
                        onChange={(e) =>
                            swimmerFormStore.setRelationship(
                                e.currentTarget?.value
                            )
                        }
                    />


                </div>}
            </div>
            {!swimmerFormStore.isInstructor && <div className=" grid grid-cols-12 bg-[#F1F3F5] p-6 rounded-md gap-x-3 gap-y-4">
                <h2 className="col-span-12 font-semibold ">Datos de inscripción</h2>

                <CustomTextInput
                    label="# Ingreso"
                    placeholder="Número comprobante"
                    className="sm:col-span-1 pointer-events-none"
                    variant="filled"
                    readOnly
                    value={swimmerFormStore.receiptNumber}
                    onChange={(e) =>
                        swimmerFormStore.setReceiptNumber(
                            e.currentTarget.value
                        )
                    }
                />
                <CustomSelect
                    label="Instructor: "
                    placeholder="Elegir Instructor: "
                    withAsterisk
                    data={registerStore.instructors}
                    className="sm:col-span-2"
                    value={swimmerFormStore.instructor}
                    onChange={swimmerFormStore.setInstructor}
                />
                {/* <div className="sm:col-span-2 grid sm:grid-cols-6 gap-x-3"> */}
                <CustomSelect
                    label="Curso"
                    className="col-span-2"
                    data={registerStore.courses}
                    value={swimmerFormStore.course}
                    onChange={value => {
                        swimmerFormStore.setCourse(value);
                        registerStore.courses.find(courseGroup => {
                            courseGroup.items.find(course => {
                                if (course.value === value) {
                                    swimmerFormStore.setEnrollmentDuration([new Date(course.course.start_date), new Date(course.course.due_date)])
                                }
                            })
                        }
                        )
                    }}
                />
                {/* <InputWrapper label="Precio" className="pointer-events-none col-span-2">
                        <Input variant="filled" value={`${coursePrice}$`} />
                    </InputWrapper> */}
                {/* </div> */}


                <CustomDatePickerInput
                    type="range"
                    label="Inicio-Fin de Inscripción:"
                    className="pointer-events-non col-span-3"
                    placeholder="Inicio-Fin de Inscripción:"
                    valueFormat="DD MMMM YYYY"
                    locale="es"
                    readOnly
                    variant={"filled"}
                    value={swimmerFormStore.enrollmentDuration}
                    onChange={swimmerFormStore.setEnrollmentDuration}
                />
                <CustomRadioGroup
                    label="Estado de inscripción"
                    className="sm:col-span-4"
                    data={registerStore.enrollmentStatuses}
                    value={swimmerFormStore.enrollmentStatus}
                    onChange={swimmerFormStore.setEnrollmentStatus}
                />
                <div className="col-span-3 grid grid-cols-10 gap-x-3">
                    <CustomNumberInput
                        label="Valor a pagar"
                        max={coursePrice}
                        className="col-span-4"
                        value={swimmerFormStore.credit}
                        onChange={(value) => {
                            swimmerFormStore.setCredit(value);
                            let paymentStatus = "3";
                            if (value === parseFloat(coursePrice)) {
                                paymentStatus = "1";
                            } else if (value > 0 && value < parseFloat(coursePrice)) {
                                paymentStatus = "2"
                            } else {
                                paymentStatus = "3"
                            }
                            swimmerFormStore.setPaymentStatus(
                                paymentStatus
                            );
                        }}
                    />
                    <SelectPaymentMethod store={swimmerFormStore} className="col-span-6" />
                </div>

                <CustomRadioGroup
                    label="Estado de pago"
                    className="sm:col-span-4"
                    data={registerStore.paymentStatuses}
                    value={swimmerFormStore.paymentStatus}
                    onChange={swimmerFormStore.setPaymentStatus}
                />
            </div>}

            <Group justify="center" mt={32}>
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
