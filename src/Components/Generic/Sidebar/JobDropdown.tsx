import {Dropdown} from "@nextui-org/react";
import React from "react";

const JobDropdown = (props: DropdownProps) => {
    return  <Dropdown>
        <Dropdown.Button flat size={"xs"}>IT Assistant</Dropdown.Button>
        <Dropdown.Menu>
            <Dropdown.Item key={"Admin"} command={"$9/hour"}>Receptionist</Dropdown.Item>
            <Dropdown.Item key={"Intern"} command={"$11/hour"}>Intern</Dropdown.Item>
            <Dropdown.Item key={"Tutor"} command={"$7/hour"}>Tutor</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
}

interface DropdownProps {
    currentJob?: string,
    availableJobs?: string[]
}

export default JobDropdown