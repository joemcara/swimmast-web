import React, { lazy, useEffect, useState } from "react";
import CustomTable from "../components/CustomTable";
import {
    ActionIcon,
    Checkbox,
    Group,
    Input,
    InputLabel,
    Select,
    Stack,
    TextInput,
} from "@mantine/core";
import CustomSection from "../components/CustomSection";
import CustomFilter from "../components/CustomFilter";
import axios from "axios";
import useHomeStore from "./HomeStore";
import useHomeFilterStore from "./HomeFilterStore";
import { IconSearch, IconSwimming, IconUser } from "@tabler/icons-react";
import { CustomCheckbox } from "../components/CustomInputs";
import { getHotkeyHandler, randomId, useHotkeys } from "@mantine/hooks";

function Home() {
    const homeStore = useHomeStore();
    const homeFilterStore = useHomeFilterStore();

    useEffect(() => {
        axios
            .get("enrollment_status/")
            .then(function (response) {
                const enrollmentStatuses = response.data?.map((status) => ({
                    value: status.id.toString(),
                    label: status.name,
                }));
                homeStore.setEnrollmentStatuses(enrollmentStatuses);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .get("payment_status/")
            .then(function (response) {
                const paymentStatuses = response.data?.map((status) => ({
                    value: status.id.toString(),
                    label: status.name,
                }));
                homeStore.setPaymentStatuses(paymentStatuses);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        getSwimmers();
    }, [homeFilterStore.currentPage]);

    useEffect(() => {
        if (!homeFilterStore.search) getSwimmers();
    }, [homeFilterStore.search]);

    const getSwimmers = () => {
        let url = `administration/registered_students/page/${homeFilterStore.currentPage}/`;
        let params = new URLSearchParams();
        if (homeFilterStore.enrollmentStatus)
            params.append(
                "enrollment_status",
                homeFilterStore.enrollmentStatus
            );
        if (homeFilterStore.paymentStatus)
            params.append("payment_status", homeFilterStore.paymentStatus);
        if (homeFilterStore.search)
            params.append("search", homeFilterStore.search);
        url += `?${params.toString()}`;
        axios
            .get(url, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
            .then(function (response) {
                homeStore.setStudents(response.data?.data);
                homeStore.setTotalPages(response.data?.pagesTotales);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <CustomSection
            title="Usuarios registrados"
            icon={<IconUser size={35} />}
            searchBar="Buscar usuario"
            getData={getSwimmers}
            filter={homeFilterStore}
        >
            <CustomFilter filter={homeFilterStore} getData={getSwimmers}>
                <Stack>
                    <InputLabel className="text-black" size={16} fw={700}>
                        Estado de inscripción
                    </InputLabel>
                    <Group>
                        {homeStore.enrollmentStatuses?.map((status) => (
                            <CustomCheckbox
                                key={status.key + status.value}
                                label={
                                    status.label?.charAt(0).toUpperCase() +
                                    status.label?.slice(1).toLowerCase()
                                }
                                checked={homeFilterStore.enrollmentStatus.includes(
                                    status.value
                                )}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        homeFilterStore.setEnrollmentStatus([
                                            ...homeFilterStore.enrollmentStatus,
                                            status.value,
                                        ]);
                                    } else {
                                        homeFilterStore.setEnrollmentStatus(
                                            homeFilterStore.enrollmentStatus.filter(
                                                (item) => item !== status.value
                                            )
                                        );
                                    }
                                }}
                            />
                        ))}
                    </Group>
                </Stack>
                <Stack>
                    <InputLabel className="text-black" size={16} fw={700}>
                        Estado de pago
                    </InputLabel>
                    <Group>
                        {homeStore.paymentStatuses?.map((status) => (
                            <CustomCheckbox
                                key={status.key + status.value}
                                label={
                                    status.label?.charAt(0).toUpperCase() +
                                    status.label?.slice(1).toLowerCase()
                                }
                                checked={homeFilterStore.paymentStatus.includes(
                                    status.value
                                )}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        homeFilterStore.setPaymentStatus([
                                            ...homeFilterStore.paymentStatus,
                                            status.value,
                                        ]);
                                    } else {
                                        homeFilterStore.setPaymentStatus(
                                            homeFilterStore.paymentStatus.filter(
                                                (item) => item !== status.value
                                            )
                                        );
                                    }
                                }}
                            />
                        ))}
                    </Group>
                </Stack>
            </CustomFilter>

            <CustomTable
                type="usuario"
                headers={[
                    "estadoDeSolicitud",
                    "usuario",
                    "nombres",
                    "apellidos",
                    "curso",
                    "finInscripcion",
                    "estadoDePago",
                ]}
                getters={[
                    "enrollment_status",
                    "username",
                    "first_name",
                    "last_name",
                    "course",
                    "due_date",
                    "payment_status",
                ]}
                data={homeStore.students}
                notification
                voucher
                store={homeStore}
                filter={homeFilterStore}
            />
        </CustomSection>
    );
}

export default Home;
