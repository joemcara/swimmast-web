import React, { useEffect, useState } from "react";
import useRegisterStore from "../Register/RegisterStore";
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
import useSwimmerFormStore from "../Register/SwimmerFormStore";
import { Group, InputWrapper, Input, Radio } from "@mantine/core";
import axios from "axios";
import CustomSection from "../components/CustomSection";
import { IconUserEdit } from "@tabler/icons-react";
import useHomeStore from "../Home/HomeStore";
import ReadOnly from "../components/ReadOnly";
import useUpdateStore from "./UpdateStore";
import { useNavigate } from "react-router-dom";
import { showLoadingNotification, updateErrorLoadingNotification, updateSuccessLoadingNotification } from "../util/CustomNotifications";

function UpdateSwimmer() {
    const registerStore = useRegisterStore();
    const swimmerFormStore = useSwimmerFormStore();
    const homeStore = useHomeStore();
    const updateStore = useUpdateStore();
    const navigate = useNavigate();
    const getSelectData = () => {
        axios.get("enrollment_status/").then(function (response) {
            const enrollmentStatuses = response.data?.map(
                (enrollmentStatus) => ({
                    label: enrollmentStatus.name,
                    value: enrollmentStatus.id.toString(),
                })
            );
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
                (role) => role.name !== "ADMINISTRADOR" //&& role.name !== "INSTRUCTOR"
            );
            const roles = filteredRoles?.map((role) => ({
                label: role.name,
                value: role.id.toString(),
                role: role,
            }));
            registerStore.setRoles(roles);
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
    //FILL SELECTS WITH DATA
    const coursePrice = 100000;
    const calculateAge = (birthdate) => {
        if (!birthdate) return 0;
        const birthdateYear = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
        const calculatedAge = currentYear - birthdateYear;
        return calculatedAge.toString();
    };

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
        return {
            first_name: swimmerFormStore.firstName,
            last_name: swimmerFormStore.lastName,
            email: swimmerFormStore.email,
            role: swimmerFormStore.role,
            // password: '12345678',
            // confirm_password: '12345678',
            // birthdate: swimmerFormStore.birthdate?.toISOString().split('T')[0],
            birthdate: swimmerFormStore.birthdate,
            // age: swimmerFormStore.age,
            // address: swimmerFormStore.address,
            // cell_phone: swimmerFormStore.cellphoneNumber,
            // representative_name: swimmerFormStore.representative,
            // representative_relationship: swimmerFormStore.relationship,
        };
    };

    const editUser = async () => {
        let data = swimmerFormStore.isInstructor
            ? getInstructorData()
            : getSwimmerData();
        let url = `member/edit/${homeStore.selectedItem?.id}/`;
        if (swimmerFormStore.role === "INSTRUCTOR") {
            url = "instructor/";
        } else if (swimmerFormStore.role === "DEPORTISTA") {
            url = "athlete/";
        }
        axios
            .patch(url, data)
            .then(function (response) {
                getSelectData();
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getUsers = () => {
        axios
            .get("administration/web_swimmast_users/")
            .then(function (response) {
                // console.log(response.data)
                let users = response.data?.map((user) => ({
                    label:
                        user?.swimmast_user?.first_name +
                        " " +
                        user.swimmast_user?.last_name,
                    value: user.swimmast_user.id.toString(),
                    user: user.swimmast_user,
                }));
                updateStore.setStudents(users);
            });
    };
    const [pendingValue, setPendingValue] = useState(0);
    useEffect(() => {
        getUsers();
        getSelectData();
        console.log("selected item", homeStore.selectedItem);
        axios.get(`payment_receipt/outstanding_balance/${homeStore?.selectedItem?.id}`).then((response) => {
            console.log(response.data);
            setPendingValue(response.data?.outstanding_balance);
        });

        if (homeStore.selectedItem) {
            swimmerFormStore.edit(homeStore.selectedItem);
            homeStore.setSelectedItem(
                homeStore.students?.find(
                    (student) =>
                        student.value === homeStore.selectedItem?.id?.toString()
                )?.user
            );
        }
    }, []);

    const updateUser = () => {
        let data = {
            first_name: swimmerFormStore.firstName,
            last_name: swimmerFormStore.lastName,
            birthdate: swimmerFormStore.birthdate?.toISOString().split("T")[0],
            phone_number: swimmerFormStore.phoneNumber,
            representative_name: swimmerFormStore.representative,
            representative_relationship: swimmerFormStore.relationship,
            enrollment_id: swimmerFormStore.enrollmentId,
            enrollment_status: swimmerFormStore.enrollmentStatus,
            swimmast_user_id: swimmerFormStore.id,
            role_id: swimmerFormStore.role,
        }
        const idNotification = showLoadingNotification("Actualizando usuario");
        axios.put(`administration/web_update_user_enrollment/`, data).then((response) => {
            console.log(response);
            if (response.status === 200) {
                updateSuccessLoadingNotification(idNotification, "Éxito", "El usuario ha sido actualizado con éxito");
                console.log(response.status)
                navigate("/");
            }
        }).catch((error) => {
            updateErrorLoadingNotification(idNotification, "Error", "El usuario no ha podido ser actualizado");
            console.log(error);
        });
    };

    return (
        <CustomSection
            title="Actualizar usuario"
            icon={<IconUserEdit size={35} />}
            update={
                <CustomSelect
                    label="Seleccionar usuario"
                    data={updateStore.students}
                    // CORREGIR LOS DATOS QUE DEVUELVE EN LA TABLA DE USUARIOS REGISTRADOS
                    value={swimmerFormStore.id}
                    onChange={(value) => {
                        homeStore.setSelectedItem(
                            updateStore.students.find(
                                (student) => student.value === value
                            )?.user
                        );
                    }}
                />
            }
        >
            <form>
                <div className="grid grid-cols-10 gap-y-4 bg-[#F1F3F5] p-6 rounded-md my-8 gap-x-3">
                    <h2 className="text-lg col-span-10 font-semibold">
                        Datos del usuario
                    </h2>
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
                            value={
                                typeof swimmerFormStore.birthdate != "string"
                                    ? swimmerFormStore.birthdate
                                    : null
                            }
                            onChange={(birthdate) => {
                                swimmerFormStore.setBirthdate(birthdate);
                                swimmerFormStore.setAge(
                                    calculateAge(birthdate)
                                );
                            }}
                        />
                        {/* <CustomTextInput
                            label="Edad"
                            className="sm:col-span-1 pointer-events-none"
                            value={swimmerFormStore.age}
                            onChange={(e) => null}
                            variant="filled"
                        /> */}
                        <ReadOnly label="Edad" text={swimmerFormStore.age} />
                    </div>

                    <CustomRadioGroup
                        label="Rol"
                        className="sm:col-span-4 pointer-events-none"
                        data={registerStore.roles}
                        value={swimmerFormStore.role}
                        onChange={(value) => {
                            let role =
                                registerStore.roles?.find(
                                    (role) => role.value === value
                                ).label === "INSTRUCTOR"
                                    ? swimmerFormStore.setIsInstructor(true)
                                    : swimmerFormStore.setIsInstructor(false);
                            swimmerFormStore.setRole(value);
                        }}
                    />

                    <ReadOnly
                        label="Usuario"
                        text={swimmerFormStore.username}
                        className="sm:col-span-2"
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
                        className="sm:col-span-2"
                        value={swimmerFormStore.phoneNumber}
                        onChange={(e) =>
                            swimmerFormStore.setPhoneNumber(
                                e.currentTarget?.value
                            )
                        }
                    />
                    {!swimmerFormStore.isInstructor && (
                        <div className="sm:col-span-4 grid sm:grid-cols-4 gap-x-3">
                            <CustomTextInput
                                leftSectionPointerEvents="none"
                                withAsterisk={swimmerFormStore.age < 18}
                                label="Representante: "
                                placeholder="Ingrese el nombre"
                                className="sm:col-span-2"
                                value={swimmerFormStore.representative}
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
                        </div>
                    )}
                </div>
                {!swimmerFormStore.isInstructor && (
                    <div className=" grid grid-cols-12 bg-[#F1F3F5] p-6 rounded-md gap-x-3 gap-y-4">
                        <h2 className="col-span-12 font-semibold text-lg">
                            Datos de inscripción
                        </h2>

                        <ReadOnly
                            label={"# Ingreso"}
                            text={swimmerFormStore.receiptNumber}
                            className="sm:col-span-1"
                        />
                        <ReadOnly
                            label={"Instructor"}
                            text={"Joseph Carabajo"}
                            className="sm:col-span-2"
                            required
                        />
                        {/* <CustomSelect
                            label="Instructor: "
                            variant="filled"
                            placeholder="Elegir Instructor: "
                            withAsterisk
                            data={["Joseph Carabajo"]}
                            className="sm:col-span-2"
                            value={swimmerFormStore.instructor}
                            onChange={(v) => {
                                swimmerFormStore.setInstructor(v);
                                swimmerFormStore.setCourse(null);
                            }}
                        /> */}
                        {/* <div className="sm:col-span-2 grid sm:grid-cols-6 gap-x-3"> */}

                        <ReadOnly
                            label={"Curso"}
                            text={swimmerFormStore?.course}
                            required
                            className={"col-span-2"}
                        />

                        {/* <InputWrapper label="Precio" className="pointer-events-none col-span-2">
                        <Input variant="filled" value={`${coursePrice}$`} />
                    </InputWrapper> */}
                        {/* </div> */}

                        <CustomDatePickerInput
                            type="range"
                            label="Inicio-Fin de Inscripción:"
                            className="pointer-events-none col-span-3"
                            placeholder="Inicio-Fin de Inscripción:"
                            valueFormat="DD MMMM YYYY"
                            locale="es"
                            variant={"filled"}
                            value={swimmerFormStore.enrollmentDuration}
                            onChange={(e) => null}
                        />
                        <CustomRadioGroup
                            label="Estado de inscripción"
                            className="sm:col-span-4"
                            data={registerStore.enrollmentStatuses}
                            value={swimmerFormStore.enrollmentStatus}
                            onChange={swimmerFormStore.setEnrollmentStatus}
                        />
                        <CustomTextInput
                            label="Pendiente"
                            className="sm:col-span-1"
                            value={`$ ${pendingValue}`}
                            variant="filled"
                            readOnly
                        />
                        <div className="col-span-3 grid grid-cols-10 gap-x-3">
                            <CustomNumberInput
                                label="Valor a pagar"
                                max={pendingValue}
                                className="col-span-4"
                                value={swimmerFormStore.credit}
                                onChange={(value) => {
                                    swimmerFormStore.setCredit(value);
                                    let paymentStatus = "3";
                                    if (value === parseFloat(pendingValue)) {
                                        paymentStatus = "1";
                                    } else if (
                                        value > 0 &&
                                        value < parseFloat(pendingValue)
                                    ) {
                                        paymentStatus = "2";
                                    } else {
                                        paymentStatus = "3";
                                    }
                                    swimmerFormStore.setPaymentStatus(
                                        paymentStatus
                                    );
                                }}
                            />
                            <SelectPaymentMethod
                                store={swimmerFormStore}
                                className="col-span-6"
                            />
                        </div>

                        <CustomRadioGroup
                            label="Estado de pago"
                            className="sm:col-span-4 pointer-events-none"
                            data={registerStore.paymentStatuses}
                            value={swimmerFormStore.paymentStatus}
                            onChange={swimmerFormStore.setPaymentStatus}
                        />
                    </div>
                )}
                <Group justify="center">
                    <CustomButton
                        onClick={updateUser}
                        text={"Guardar"}
                        bgColor={"#15192F"}
                    />
                </Group>
            </form>
        </CustomSection>
    );
}

export default UpdateSwimmer;
