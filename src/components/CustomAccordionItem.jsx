import { Accordion } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export function CustomAccordionItem(props) {
    const [open, setOpen] = useState(true);

    return (
        <Accordion.Item value={props.value} label={props.label} variant="contained"
            styles={{
                item: {
                    borderColor: "transparent",
                },
            }}
        >
            <Accordion.Control style={{
                backgroundColor: props.backgroundColor,
                paddingLeft: "3rem"
            }}
                classNames={{
                    chevron: "text-white text-sm",
                }}
                styles={{
                    chevron: {
                        color: "white",
                        height: "1.5rem",
                        width: "1.5rem",
                        marginTop: 4,
                    },
                }}
                chevron={open ? <IconMinus /> : <IconPlus />}
                onClick={() => setOpen(!open)}
            >
                <div className="flex gap-2 text-white text-xl font-bold items-center">
                    {props.icon}
                    {props.label}
                </div>
            </Accordion.Control>
            <Accordion.Panel>
                {props.children}
            </Accordion.Panel>
        </Accordion.Item>
    )
}