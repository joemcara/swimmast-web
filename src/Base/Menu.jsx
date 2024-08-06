import React, { useEffect } from "react";
import snachesOrcasLogo from "../assets/snachesOrcasLogo.png";
import CustomNavLink from "../components/CustomNavLink";
import { Accordion, ScrollArea } from "@mantine/core";
import {
    IconAddressBook,
    IconEdit,
    IconFileDescription,
    IconLogout,
    IconReport,
    IconSchool,
    IconSwimming,
    IconUser,
    IconUserEdit,
} from "@tabler/icons-react";
import { CustomAccordionItem } from "../components/CustomAccordionItem";
import { useLocation } from "react-router-dom";

const iconSize = 30;

const icons = {
    SWIMMER: <IconUser size={iconSize} />,
    COURSE: <IconSchool size={iconSize} />,
    REGISTER: <IconFileDescription size={iconSize} />,
    UPDATE: <IconEdit size={iconSize} />,
    LOGOUT: <IconLogout size={iconSize} />,
    REPORTS: <IconReport size={iconSize} />,
};

function Menu() {
    let location = useLocation();
    return (
        <div className="bg-system-menu-gray w-64 min-h-screen fixed top-0 left-0 flex flex-col items-center hidden lg:flex text-white">
            <ScrollArea
                type="auto"
                h={"100vh"}
                className="w-full"
                offsetScrollbars
                classNames={{
                    scrollbar: "pointer-events-none",
                }}
            >
                <div className="flex flex-col items-center mb-2">
                    <a href="/">
                        <img
                            alt="snaches-orcas"
                            src={snachesOrcasLogo}
                            className="h-40 w-40 object-contain"
                        />
                    </a>
                    <h3 className="text-xl font-semibold">
                        {window.localStorage.getItem("user")}
                    </h3>
                </div>
                <nav className="flex flex-col text-white w-full">
                    <Accordion defaultValue={["register", "update"]} multiple>
                        <CustomNavLink
                            to="/"
                            text="Usuarios"
                            padding={"pl-8"}
                            icon={icons["SWIMMER"]}
                        />
                        <CustomNavLink
                            to="/cursos"
                            text="Cursos"
                            padding={"pl-8"}
                            icon={icons["COURSE"]}
                        />
                        <CustomAccordionItem
                            value="register"
                            label="Registrar"
                            icon={icons["REGISTER"]}
                            backgroundColor={
                                location.pathname.includes("registrar")
                                    ? "#818DA3"
                                    : "#2C3E50"
                            }
                        >
                            <CustomNavLink
                                to="/registrar-usuario"
                                text="Registrar usuario"
                                padding={"pl-16"}
                            />
                            <CustomNavLink
                                to="/registrar-curso"
                                text="Registrar curso"
                                padding={"pl-16"}
                            />
                        </CustomAccordionItem>
                        <CustomAccordionItem
                            value="update"
                            label="Actualizar"
                            icon={icons["UPDATE"]}
                            backgroundColor={
                                location.pathname.includes("actualizar")
                                    ? "#818DA3"
                                    : "#2C3E50"
                            }
                        >
                            <CustomNavLink
                                to="/actualizar-usuario"
                                text="Actualizar usuario"
                                padding={"pl-16"}
                            />
                            <CustomNavLink
                                to="/actualizar-curso"
                                text="Actualizar curso"
                                padding={"pl-16"}
                            />
                        </CustomAccordionItem>
                    </Accordion>
                    <CustomNavLink
                        text="Reportes"
                        to="/"
                        icon={icons["REPORTS"]}
                        padding={"pl-8"}
                    />
                    <CustomNavLink
                        text="Cerrar sesión"
                        to="/logout"
                        icon={icons["LOGOUT"]}
                        padding={"pl-8"}
                    />
                </nav>
            </ScrollArea>
        </div>
    );
}

export default Menu;
