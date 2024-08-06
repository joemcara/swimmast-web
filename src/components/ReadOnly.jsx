import { InputLabel, Text } from "@mantine/core";
import React from "react";

function ReadOnly(props) {
    return (
        <div className={`bg-[#F1F3F5] ${props.className}`}>
            <InputLabel required={props.required}>{props.label}</InputLabel>
            <p className="text-sm mt-2 pl-3">{props.text}</p>
        </div>
    );
}

export default ReadOnly;
