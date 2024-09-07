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
import useUpdateFormStore from "./UpdateUserFormStore";
import useFormStore from "../components/FormStore";
import useUserFormStore from "../components/UserFormStore";
import useEnrollmentFormStore from "../components/EnrollmentFormStore";

function UpdateSwimmer() {
    const formStore = useFormStore();
    const userFormStore = useUserFormStore();
    const enrollmentFormStore = useEnrollmentFormStore();

    const registerStore = useRegisterStore();
    const swimmerFormStore = useSwimmerFormStore();
    const homeStore = useHomeStore();
    const updateStore = useUpdateStore();
    const navigate = useNavigate();
    const updateUserFormStore = useUpdateFormStore();
    const [pendingValue, setPendingValue] = useState(0);
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
    const calculateAge = (birthdate) => {
        if (!birthdate) return 0;
        const birthdateYear = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
        const calculatedAge = currentYear - birthdateYear;
        return calculatedAge.toString();
    };

    const getInstructorData = () => {
        return {
            first_name: userFormStore.firstName,
            last_name: userFormStore.lastName,
            email: userFormStore.email,
            role: userFormStore.role,
        };
    };

    const getSwimmerData = () => {
        return {
            first_name: swimmerFormStore.firstName,
            last_name: swimmerFormStore.lastName,
            email: swimmerFormStore.email,
            role: swimmerFormStore.role,
            birthdate: swimmerFormStore.birthdate,
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
                let users = response.data?.map((user) => {
                    user.birthdate = new Date(user.birthdate)
                    return {
                        label:
                            user?.swimmast_user?.first_name +
                            " " +
                            user.swimmast_user?.last_name,
                        value: user.swimmast_user.id.toString(),
                        user: user,
                    }
                });
                formStore.setUsers(users);
            });
    };

    //EXECUTE WHEN FIRST TIME RENDER
    useEffect(() => {
        getUsers();
        getSelectData();
        updateUserFormStore.reset();
        if (homeStore.selectedItem) {
            // updateStore.setSelectedItem(homeStore.selectedItem?.applicant);
            updateUserFormStore.setUserId(homeStore.selectedItem?.applicant?.id.toString());
        }
    }, []);

    useEffect(() => {
        if (updateUserFormStore?.userId) {
            axios.get(`administration/web_user_enrollments/${updateUserFormStore?.userId}/`).then((response) => {
                let enrollments = response.data.enrollments?.map((enrollment) => ({
                    label: enrollment.receipt_number,
                    value: enrollment.id.toString(),
                    enrollment: enrollment,
                }));
                console.log(enrollments[0])
                updateStore.setEnrollments(enrollments);
                updateUserFormStore.edit(response.data?.user);
                updateUserFormStore.setEnrollmentId(enrollments ? enrollments[0].value : null);
                updateUserFormStore.setEnrollmentStatus(enrollments ? enrollments[0].enrollment?.enrollment_status_id?.toString() : null);
                updateUserFormStore.setPaymentStatus(enrollments ? enrollments[0].enrollment?.payment_status_id?.toString() : null);

            });
        }
    }, [updateUserFormStore.userId]);


    useEffect(() => {
        if (updateUserFormStore?.enrollmentId) {
            let enrollment = updateStore.enrollments?.find(enrollment => enrollment.value === updateUserFormStore.enrollmentId)
            console.log(enrollment)
            updateStore.setSelectedEnrollment(enrollment);
            updateUserFormStore.setEnrollmentStatus(enrollment?.enrollment?.enrollment_status_id?.toString());
            updateUserFormStore.setPaymentStatus(enrollment?.enrollment?.payment_status_id?.toString());
            axios.get(`payment_receipt/outstanding_balance/${updateUserFormStore.enrollmentId}`).then((response) => {
                setPendingValue(response.data?.outstanding_balance);
            });

            // console.log(updateStore.enrollments?.find(enrollment => enrollment.value === updateUserFormStore.enrollmentId))
        }

    }, [updateUserFormStore.enrollmentId]);

    const updateUser = () => {
        console.log(updateUserFormStore);
        let data = {
            swimmast_user_id: updateUserFormStore.userId,
            first_name: updateUserFormStore.firstName,
            last_name: updateUserFormStore.lastName,
            birthdate: updateUserFormStore.birthdate?.toISOString().split("T")[0],
            phone_number: updateUserFormStore.phoneNumber,
            representative_name: updateUserFormStore.representative,
            representative_relationship: updateUserFormStore.relationship,
            enrollment_id: updateUserFormStore.enrollmentId,
            enrollment_status: updateUserFormStore.enrollmentStatus,
            role_id: updateUserFormStore.role_id,
            payment_status: updateUserFormStore.paymentStatus,
            payment_value: updateUserFormStore.paymentValue,
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
                    data={formStore.users}
                    // CORREGIR LOS DATOS QUE DEVUELVE EN LA TABLA DE USUARIOS REGISTRADOS
                    value={userFormStore.id}
                    onChange={(_value, option) => {
                        console.log(option)
                        userFormStore.edit(option?.user)
                    }}
                    allowDeselect={false}
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
                        value={userFormStore.firstName}
                        onChange={(e) => userFormStore.setFirstName(e.currentTarget.value)}
                    />
                    <CustomTextInput
                        label="Apellidos"
                        withAsterisk
                        placeholder="Ingrese sus apellidos"
                        className="sm:col-span-2"
                        value={userFormStore.lastName}
                        onChange={(e) => userFormStore.setLastName(e.currentTarget.value)}
                    />
                    <div className="sm:col-span-2 grid grid-cols-4 gap-x-2">
                        <CustomDateInput
                            label="Fecha de nacimiento"
                            placeholder="día mes año"
                            valueFormat="DD MMMM YYYY"
                            className="sm:col-span-3"
                            value={userFormStore.birthdate}
                            onChange={(birthdate) => {
                                userFormStore.setBirthdate(birthdate);
                                userFormStore.setAge(
                                    calculateAge(birthdate)
                                );
                            }}
                        />
                        <ReadOnly label="Edad" text={userFormStore.age} />
                    </div>

                    <CustomRadioGroup
                        label="Rol"
                        className="sm:col-span-4 pointer-events-none"
                        data={formStore.roles}
                        value={userFormStore.role}
                        onChange={v => { console.log() }}
                    />

                    <ReadOnly
                        label="Usuario"
                        text={userFormStore.username}
                        className="sm:col-span-2"
                    />
                    <ReadOnly
                        label="Correo electrónico"
                        className="sm:col-span-2"
                        text={userFormStore.email}
                    />
                    <CustomTextInput
                        leftSectionPointerEvents="none"
                        withAsterisk
                        label="Teléfono: "
                        placeholder="Ingrese telefono"
                        className="sm:col-span-2"
                        value={userFormStore.phoneNumber}
                        onChange={(e) =>
                            userFormStore.setPhoneNumber(
                                e.currentTarget?.value
                            )
                        }
                    />

                    {!(userFormStore.isInstructor || (!userFormStore.isInstructor && userFormStore.age > 18)) && (
                        <div className="sm:col-span-4 grid sm:grid-cols-4 gap-x-3">
                            <CustomTextInput
                                leftSectionPointerEvents="none"
                                withAsterisk={userFormStore.age < 18}
                                label="Representante: "
                                placeholder="Ingrese el nombre"
                                className="sm:col-span-2"
                                value={userFormStore.representative}
                                onChange={(e) =>
                                    userFormStore.setRepresentative(
                                        e.currentTarget?.value
                                    )
                                }
                            />
                            <CustomTextInput
                                label="Vínculo:"
                                placeholder="Vínculo"
                                withAsterisk={userFormStore.age < 18}
                                className="sm:col-span-1"
                                value={userFormStore.relationship}
                                onChange={(e) =>
                                    userFormStore.setRelationship(
                                        e.currentTarget?.value
                                    )
                                }
                            />
                        </div>
                    )}
                </div>
                {!userFormStore.isInstructor && (
                    <div className=" grid grid-cols-12 bg-[#F1F3F5] p-6 rounded-md gap-x-3 gap-y-4">
                        <h2 className="col-span-12 font-semibold text-lg">
                            Datos de inscripción
                        </h2>

                        <CustomSelect
                            label={"# Ingreso"}
                            data={formStore.enrollments}
                            className="sm:col-span-1"
                            value={enrollmentFormStore.id}
                            onChange={enrollmentFormStore.setId}
                        />
                        <ReadOnly
                            label={"Instructor"}
                            text={formStore.selectedEnrollment?.enrollment?.instructor}
                            className="sm:col-span-2"
                        />

                        <ReadOnly
                            label={"Curso"}
                            text={updateStore.selectedEnrollment?.enrollment?.course?.name}
                            className={"col-span-4"}
                        />

                        <CustomRadioGroup
                            label="Estado de inscripción"
                            className="sm:col-span-4"
                            data={formStore.enrollmentStatuses}
                            value={enrollmentFormStore.enrollmentStatus}
                            onChange={enrollmentFormStore.setEnrollmentStatus}
                        />

                        <CustomDatePickerInput
                            type="range"
                            label="Inicio-Fin de Inscripción:"
                            className="pointer-events-none col-span-3"
                            placeholder="Inicio-Fin de Inscripción:"
                            valueFormat="DD MMMM YYYY"
                            locale="es"
                            variant={"filled"}
                            value={
                                formStore.selectedEnrollment ? [new Date(updateStore.selectedEnrollment?.enrollment?.start_date), new Date(updateStore.selectedEnrollment?.enrollment?.due_date)] : []}
                            onChange={(e) => null}
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
                                value={enrollmentFormStore.paymentValue}
                                onChange={(value) => {
                                    enrollmentFormStore.setPaymentValue(value);
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
                                    enrollmentFormStore.setPaymentStatus(
                                        paymentStatus
                                    );
                                }}
                            />
                            <SelectPaymentMethod
                                store={enrollmentFormStore}
                                className="col-span-6"
                            />
                        </div>

                        <CustomRadioGroup
                            label="Estado de pago"
                            className="sm:col-span-4 pointer-events-none"
                            data={formStore.paymentStatuses}
                            value={enrollmentFormStore.paymentStatus}
                            onChange={enrollmentFormStore.setPaymentStatus}
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
