import {Card, Input} from "@nextui-org/react";
import React from "react";

const Sidebar = (props: SidebarProps) => {
    return (
        <div className={"sidebar"}>
            <Card>
                <Card.Body>
                    <Input label={"Free Time"}/>
                </Card.Body>
            </Card>
            <div className={"sidebar-content"}>
                {props.children}
            </div>
        </div>)
}

interface SidebarProps {
    children?: React.ReactNode
}

export default Sidebar