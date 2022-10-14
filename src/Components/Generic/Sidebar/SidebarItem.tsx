import React from "react";
import {Badge, Text, SimpleColors, Spacer} from "@nextui-org/react";

const SidebarItem = (props: SidebarItemProps) => {
    return (
    <div className={`sidebar-item-grid ${props.title ? "withTitle" : "withoutTitle"}`}>
        {props.title && <Text css={{ta: "right"}}>{props.title}</Text>}
        <div className={`${props.title ? "right" : "full"}`}>
            {!props.children && <Badge variant={"bordered"} color={props.color ? props.color : "primary"} isSquared size={"xs"}>{props.value}</Badge>}
            {props.children && props.children}
        </div>
        <Spacer y={.2}/>
    </div>)
}

interface  SidebarItemProps {
    title?: string,
    value?: string,
    children?: React.ReactNode,
    color?: SimpleColors,
}

export default SidebarItem