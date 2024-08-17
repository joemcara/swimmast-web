import { ActionIcon, Group, Modal, Pagination, Table } from "@mantine/core";
import { randomId, useDisclosure } from "@mantine/hooks";
import { IconBellRinging, IconPhone, IconPhoto } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import snachesOrcasLogo from "../assets/snachesOrcasLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { calculateAge } from "../util/Hooks";
import storage from "../firebase/firebaseConfig";
import { Carousel } from "@mantine/carousel";
function CustomTable(props) {
    const [opened, { toggle }] = useDisclosure(false);
    let location = useLocation();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    function camelToSentence(text) {
        // Split the camel case string into words
        const words = text.split(/([A-Z][a-z]+)/);

        // Capitalize the first word and lowercase the rest
        words[0] =
            words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
        for (let i = 1; i < words.length; i++) {
            words[i] = words[i].toLowerCase();
        }

        // Join the words back with spaces
        return words.join(" ");
    }

    const cellColor = (cell) => {
        if (cell === "en curso" || cell === "APROBADA")
            return "text-green-600 font-semibold";
        else if (cell === "inactivo" || cell === "RECHAZADA")
            return "text-red-800 font-semibold";
        else if (cell === "por empezar" || cell === "PENDIENTE")
            return "text-yellow-600 font-semibold";
        else return "";
    };

    return (
        <div>
            <Modal
                opened={opened}
                onClose={toggle}
                size={"40rem"}
                className="flex justify-center items-center"
                title="Comprobantes de pago"
                styles={{
                    body: {
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "60vh",
                    },
                    title: {
                        padding: "1rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "black",
                    },
                }}
            >
                {images.length > 0 ? (

                    <Carousel
                        height={400}
                        className="w-full"
                        withControls
                        withIndicators
                    >
                        {images.map((image) => (
                            <Carousel.Slide key={image} >
                                <img
                                    className="object-contain w-full h-full"
                                    src={image}
                                    loading="lazy"
                                />
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                ) : (
                    <h2>
                        No hay comprobantes de pago disponibles
                    </h2>

                )}
            </Modal>
            <Table.ScrollContainer className="absolute mt-5">
                <Table
                    striped
                    highlightOnHover
                    classNames={{
                        th: "text-center  justify-center",
                    }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            {props.headers?.map((header, index) => {
                                return (
                                    <Table.Th key={header}>
                                        {camelToSentence(header)}
                                    </Table.Th>
                                );
                            })}
                            {props.notification && (
                                <Table.Th>Notificar</Table.Th>
                            )}
                            {props.voucher && <Table.Th>Comprobante</Table.Th>}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {props.data?.map((element, index) => {
                            let values = Object.values(element);
                            let keys = Object.keys(element);
                            return (
                                <Table.Tr
                                    key={randomId()}
                                    onClick={(e) => {
                                        element.age = element?.applicant
                                            ?.birthdate
                                            ? calculateAge(
                                                new Date(
                                                    element?.applicant?.birthdate
                                                )
                                            )
                                            : 0;
                                        props.store?.setSelectedItem(element);
                                        navigate(`/actualizar-${props.type}`);
                                    }}
                                >
                                    {props.getters?.map((value) => {
                                        return (
                                            <Table.Td
                                                className={cellColor(
                                                    element[value]
                                                )}
                                                key={
                                                    element[value] + randomId()
                                                }
                                            >
                                                {element[value]}
                                            </Table.Td>
                                        );
                                    })}
                                    {props.notification && (
                                        <Table.Td>
                                            <ActionIcon
                                                bg={"transparent"}
                                                onClick={(e) => {

                                                    console.log("notificar");
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <IconBellRinging
                                                    color="black"
                                                    bg="black"
                                                />
                                            </ActionIcon>
                                        </Table.Td>
                                    )}
                                    {props.voucher && (
                                        <Table.Td>
                                            <ActionIcon
                                                bg={"transparent"}
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    setImages(element.voucher);
                                                    toggle();
                                                }}
                                            >
                                                <IconPhoto
                                                    color="black"
                                                    bg="black"
                                                />
                                            </ActionIcon>
                                        </Table.Td>
                                    )}
                                </Table.Tr>
                            );
                        })}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <Group justify="center">
                <Pagination
                    total={props.store?.totalPages || 1}
                    value={props.filter?.currentPage}
                    onChange={props.filter?.setCurrentPage}
                    siblings={0}
                    color="#2C3E50"
                />
            </Group>
        </div>
    );
}

export default CustomTable;
