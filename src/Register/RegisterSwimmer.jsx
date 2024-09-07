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
import {
    IconUserCheck,
    IconUserCircle,
    IconUserEdit,
    IconUserFilled,
    IconUserPlus,
    IconUsersPlus,
    IconUserUp,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { calculateAge } from "../util/Hooks";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../firebase/firebaseConfig";
import useEnrollmentFormStore from "../components/EnrollmentFormStore";
import useUserFormStore from "../components/UserFormStore";
import useFormStore from "../components/FormStore";

function RegisterSwimmer() {
    const userFormStore = useUserFormStore();
    const enrollmentFormStore = useEnrollmentFormStore();

    const registerStore = useRegisterStore();
    const formStore = useFormStore();
    const swimmerFormStore = useSwimmerFormStore();
    const [queryUsernames, setQueryUsernames] = useState(false);
    const navigate = useNavigate();
    const [coursePrice, setCoursePrice] = useState(0);


    const uploadImage = async () => {
        let url = "";
        try {
            let imageName = "";

            // Busca el nombre del curso
            registerStore.courses?.find(({ group, items }) => {
                items.find(item => {
                    if (item.value === swimmerFormStore.course) {
                        imageName = item?.course?.name?.trim().replace(/\s/g, '')?.toLowerCase();
                    }
                });
            });

            if (imageName) {
                const storageRef = ref(storage, `${swimmerFormStore.username?.toLowerCase()}/comprobantes/${imageName}-1`);

                // Sube la imagen
                const data = await uploadBytes(storageRef, swimmerFormStore.voucherImage);

                // Obtén el URL de descarga
                url = await getDownloadURL(data.ref);
                console.log("URL de la imagen:", url);
            } else {
                console.log("No se encontró el curso correspondiente.");
            }
        } catch (e) {
            console.log(e);
        }

        return url;
    }

    const getInstructors = () => {
        axios.get("instructor/").then(function (response) {
            const instructors = response.data?.map((instructor) => ({
                label: `${instructor.first_name} ${instructor.last_name}`,
                value: instructor.id.toString(),
            }));
            formStore.setInstructors(instructors);
        });
    };
    const getCourses = () => {
        let url = "administration/courses/type_grouped/";
        let params = new URLSearchParams();
        if (userFormStore.instructor) {
            params.append("instructor", userFormStore.instructor);
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
            formStore.setCourses(coursesGroups);
        });
    };

    //FILL SELECTS WITH DATA
    useEffect(() => {
        // swimmerFormStore.reset();
        getInstructors();
        axios.get("enrollment_status/").then(function (response) {
            const enrollmentStatuses = response.data?.map(
                (enrollmentStatus) => {
                    if (enrollmentStatus.name === "PENDIENTE") {
                        enrollmentFormStore.setEnrollmentStatus(
                            enrollmentStatus?.id.toString()
                        );
                    }
                    return {
                        label: enrollmentStatus.name,
                        value: enrollmentStatus.id.toString(),
                    };
                }
            );
            formStore.setEnrollmentStatuses(enrollmentStatuses);
        })


        axios.get("payment_status/").then(function (response) {
            const paymentStatuses = response.data?.map((paymentStatus) => {
                if (paymentStatus.name === "NO PAGADA") {
                    enrollmentFormStore.setPaymentStatus(
                        paymentStatus.id.toString()
                    );
                    console.log(paymentStatus.id)
                }
                return {
                    label: paymentStatus.name,
                    value: paymentStatus.id.toString(),
                };
            });
            formStore.setPaymentStatuses(paymentStatuses);
        });

        axios.get("role/").then(function (response) {
            let filteredRoles = response.data?.filter(
                (role) => role.name !== "ADMINISTRADOR"
            );
            const roles = filteredRoles?.map((role) => ({
                label: role.name,
                value: role.id.toString(),
            }));
            formStore.setRoles(roles);
        });

        axios.get("payment_receipt/").then(function (response) {
            let maxReceiptNumber = response.data?.reduce((max, current) => {
                return parseInt(current.receipt_number) >
                    parseInt(max.receipt_number)
                    ? current
                    : max;
            }).receipt_number;
            enrollmentFormStore.setReceiptNumber(parseInt(maxReceiptNumber) + 1);
        });

        setQueryUsernames(true);
    }, []);

    useEffect(() => {
        if (queryUsernames) getUsernames();
    }, [
        userFormStore.firstName,
        userFormStore.lastName,
        userFormStore.role,
        userFormStore.birthdate,
    ]);

    useEffect(() => {
        formStore.courses?.map((course) => {
            course.items?.map((item) => {
                if (item.value === enrollmentFormStore.course)
                    setCoursePrice(item.course.price);
            });
        });
    }, [enrollmentFormStore.course]);

    useEffect(() => {
        getCourses();
    }, [enrollmentFormStore.instructor]);

    const getUsernames = () => {
        if (
            !userFormStore.firstName.length < 2 ||
            !userFormStore.lastName.length < 2 ||
            !userFormStore.role ||
            !userFormStore.birthdate
        )
            return;
        let date = userFormStore.birthdate?.toLocaleString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        axios
            .post("administration/usernames/", {
                first_name: userFormStore.firstName,
                last_name: userFormStore.lastName,
                role: userFormStore.role,
                birthdate: date,
            })
            .then(function (response) {
                formStore.setUsernames(response.data);
                userFormStore.setUsername(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    };



    // const getInstructorData = () => {
    //     return {
    //         first_name: swimmerFormStore.firstName,
    //         last_name: swimmerFormStore.lastName,
    //         email: swimmerFormStore.email,
    //         role: swimmerFormStore.role,
    //         password: "12345678",
    //         confirm_password: "12345678",
    //     };
    // };

    // const getSwimmerData = () => {
    //     if (!swimmerFormStore.isInstructor && swimmerFormStore.age < 18) {
    //         if (swimmerFormStore.representative === "") {
    //             showErrorNotification({
    //                 message: "Debe ingresar el nombre del representante",
    //             });
    //             return null;
    //         } else if (swimmerFormStore.relationship === "") {
    //             showErrorNotification({
    //                 message: "Debe ingresar el vinculo del representante",
    //             });
    //             return null;
    //         }
    //     }
    //     console.log(swimmerFormStore.birthdate);
    //     return {
    //         first_name: swimmerFormStore.firstName,
    //         last_name: swimmerFormStore.lastName,
    //         email: swimmerFormStore.email,
    //         role: swimmerFormStore.role,
    //         password: "12345678",
    //         confirm_password: "12345678",
    //         birthdate: swimmerFormStore.birthdate?.toISOString().split("T")[0],
    //         age: swimmerFormStore.age,
    //         address: swimmerFormStore.address,
    //         phone_number: swimmerFormStore.phoneNumber,
    //         representative_name: swimmerFormStore.representative,
    //         representative_relationship: swimmerFormStore.relationship,
    //     };
    // };

    // const getEnrollmentData = () => {
    //     return {
    //         course: swimmerFormStore.course,
    //         status: swimmerFormStore.enrollmentStatus,
    //         receipt_number: swimmerFormStore.receiptNumber,
    //         payment_value: swimmerFormStore.credit,
    //         payment_status: swimmerFormStore.paymentStatus,
    //     };
    // };
    const saveUser = async () => {
        // let data = getSwimmerData();
        // if (!data) return;
        // data["username"] = swimmerFormStore.username?.toLowerCase();
        // data = { ...data, ...getEnrollmentData() };
        // let notificationId = showLoadingNotification({
        //     message: "Registrando nadador...",
        // });
        // let imageUrl = "";
        // if (swimmerFormStore.voucherImage && swimmerFormStore.username) {
        //     imageUrl = await uploadImage();
        //     console.log("image", imageUrl)
        //     if (!imageUrl) {
        //         updateErrorLoadingNotification(notificationId, "Error al subir la imagen");
        //         return;
        //     }
        // }

        // data["image_url"] = imageUrl;

        // axios
        //     .post(`administration/web_register_user_enrollment/`, data)
        //     .then(function (response) {
        //         if (response.status === 201) {
        //             updateSuccessLoadingNotification(
        //                 notificationId,
        //                 response.data?.message
        //             );
        //             swimmerFormStore.reset();
        //             navigate("/");
        //         } else updateErrorLoadingNotification(notificationId, error.response?.data?.error);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         updateErrorLoadingNotification(
        //             notificationId,
        //             error.response?.data?.error
        //         );
        //     });
        console.log(userFormStore);
    };

    // const generatePayment = (enrollmentId, notificationId, receiptNumber) => {
    //     let course = registerStore.courses?.find(
    //         (course) => course.value === swimmerFormStore.course
    //     )?.course;
    //     if (!course) {
    //         return updateErrorLoadingNotification(notificationId);
    //     }
    //     let url = "payment/create/";
    //     axios
    //         .post(url, {
    //             receipt_number: swimmerFormStore.receiptNumber,
    //             payment_status: swimmerFormStore.paymentStatus,
    //             enrollment: enrollmentId,
    //             course: swimmerFormStore.course,
    //             balance: course?.price,
    //             payment_date: new Date()?.toISOString().split("T")[0],
    //             payment_value: swimmerFormStore.credit,
    //             financial_institution: "Banco Pichincha",
    //             description: `Pago por registro de nadador en ${course.name}`,
    //         })
    //         .then(function (response) {
    //             console.log("RECEIPT CREADO");
    //             return updateSuccessLoadingNotification(notificationId);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             return updateErrorLoadingNotification(notificationId);
    //         });
    // };

    return (
        <CustomSection
            title="Registrar usuario"
            icon={<IconUserPlus size={35} />}
        >
            <form action="">
                <div className="grid grid-cols-10 gap-y-4 bg-[#F1F3F5] p-6 rounded-md my-8 gap-x-3">
                    <h2 className="text-lg col-span-10 font-semibold">
                        Datos del usuario
                    </h2>
                    <CustomTextInput
                        maxLength={15}
                        // variant="filled"
                        label="Nombres"
                        required
                        placeholder="Ingrese sus nombres"
                        className="sm:col-span-2"
                        value={userFormStore.firstName}
                        onChange={(e) => userFormStore.setFirstName(e.currentTarget.value)}
                    />
                    <CustomTextInput
                        maxLength={15}
                        label="Apellidos"
                        required
                        withAsterisk
                        placeholder="Ingrese sus apellidos"
                        className="sm:col-span-2"
                        value={userFormStore.lastName}
                        onChange={(e) => userFormStore.setLastName(e.currentTarget.value)}
                    />

                    <div className="sm:col-span-2 grid grid-cols-4 gap-x-2">
                        <CustomDateInput
                            label="Fecha de nacimiento"
                            withAsterisk
                            placeholder="día mes año"
                            valueFormat="DD MMMM YYYY"
                            className="sm:col-span-3"
                            value={
                                typeof userFormStore.birthdate != "string"
                                    ? userFormStore.birthdate
                                    : null
                            }
                            onChange={(birthdate) => {
                                userFormStore.setBirthdate(birthdate);
                                userFormStore.setAge(calculateAge(birthdate));
                            }}
                        />
                        <CustomTextInput
                            label="Edad"
                            className="sm:col-span-1 pointer-events-none"
                            value={userFormStore.age}
                            onChange={(e) => null}
                            variant="filled"
                        />
                    </div>
                    <CustomRadioGroup
                        label="Rol"
                        required
                        className="sm:col-span-4"
                        data={formStore.roles}
                        value={userFormStore.role}
                        onChange={(value) => {
                            let role =
                                formStore.roles?.find(
                                    (role) => role.value === value
                                ).label === "INSTRUCTOR"
                                    ? userFormStore.setIsInstructor(true)
                                    : userFormStore.setIsInstructor(false);
                            userFormStore.setRole(value);
                        }}
                    />
                    <CustomSelect
                        label="Usuario"
                        required
                        data={formStore.usernames}
                        value={userFormStore.username}
                        onChange={userFormStore.setUsername}
                    />
                    <CustomTextInput
                        required
                        leftSectionPointerEvents="none"
                        className="sm:col-span-2"
                        withAsterisk
                        label="Correo Electrónico: "
                        placeholder="nombre@dominio.com"
                        value={userFormStore.email}
                        onChange={(e) =>
                            userFormStore.setEmail(e.currentTarget?.value)
                        }
                    />
                    <CustomTextInput
                        maxLength={10}
                        required
                        leftSectionPointerEvents="none"
                        withAsterisk
                        label="Teléfono: "
                        placeholder="Ingrese telefono"
                        className="sm:col-span-2"
                        value={userFormStore.phoneNumber}
                        onChange={(e) =>
                            userFormStore.setPhoneNumber(e.currentTarget?.value)
                        }
                    />

                    {!(userFormStore.isInstructor || (!userFormStore.isInstructor && userFormStore.age > 18)) && (
                        <div className="sm:col-span-4 grid sm:grid-cols-4 gap-x-3">
                            <CustomTextInput
                                required={userFormStore.age < 18}
                                leftSectionPointerEvents="none"
                                withAsterisk={userFormStore.age < 18}
                                label="Representante: "
                                maxLength={15}
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
                                maxLength={10}
                                required={userFormStore.age < 18}
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

                        <CustomTextInput
                            label="# Ingreso"
                            placeholder="Número comprobante"
                            className="sm:col-span-1 pointer-events-none"
                            variant="filled"
                            value={enrollmentFormStore.receiptNumber}
                            onChange={(e) =>
                                enrollmentFormStore.setReceiptNumber(
                                    e.currentTarget.value
                                )
                            }
                        />
                        <CustomSelect
                            label="Instructor: "
                            placeholder="Elegir Instructor: "
                            withAsterisk
                            data={formStore.instructors}
                            className="sm:col-span-2"
                            value={enrollmentFormStore.instructor}
                            onChange={(v) => {
                                enrollmentFormStore.setInstructor(v)
                                enrollmentFormStore.setCourse(null);
                            }}
                        />
                        {/* <div className="sm:col-span-2 grid sm:grid-cols-6 gap-x-3"> */}
                        <CustomSelect
                            required
                            label="Curso:"
                            className="col-span-4"
                            data={formStore.courses}
                            value={enrollmentFormStore.course}
                            onChange={(value) => {
                                enrollmentFormStore.setCourse(value);
                                formStore.courses?.forEach(courseGroup => {
                                    courseGroup.items.forEach(({ course }) => {
                                        if (course.id.toString() === value) {
                                            enrollmentFormStore.setEnrollmentDuration([
                                                new Date(course.start_date),
                                                new Date(course.due_date),
                                            ])
                                            enrollmentFormStore.setInstructor(course.instructor_id);
                                        }
                                    });
                                });
                            }}
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
                            value={enrollmentFormStore.enrollmentDuration}
                            onChange={(e) => null}
                        />
                        <div className="col-span-4 grid grid-cols-10 gap-x-3">
                            <CustomNumberInput
                                label="Valor a pagar"
                                required
                                max={10}
                                className="col-span-3"
                                value={enrollmentFormStore.paymentValue}
                                onChange={(value) => {
                                    enrollmentFormStore.setPaymentValue(value);
                                    let paymentStatus = "3";
                                    if (value === parseFloat(coursePrice)) {
                                        paymentStatus = "1";
                                    } else if (
                                        value > 0 &&
                                        value < parseFloat(coursePrice)
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
                            className="sm:col-span-4"
                            data={formStore.paymentStatuses}
                            value={enrollmentFormStore.paymentStatus}
                            onChange={enrollmentFormStore.setPaymentStatus}
                        />
                    </div>
                )}

                <Group justify="center" mt={32}>
                    <CustomButton
                        onClick={saveUser}
                        text={"Guardar"}
                        bgColor={"#15192F"}
                    />
                </Group>

            </form>
        </CustomSection>
    );
}

export default RegisterSwimmer;
