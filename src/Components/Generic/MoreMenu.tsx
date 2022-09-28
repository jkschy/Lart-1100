import { Squash as Hamburger } from 'hamburger-react'
import {useState} from "react";
import {Button, Spacer, Switch, Text} from "@nextui-org/react";

const MoreMenu = (props: MMProps) => {
    const [open, setOpen] = useState(false);

    return (<div className={"mm-container"}>
        <div className={"top"}>
            <Hamburger rounded onToggle={setOpen} size={20}/>
        </div>

        <div className={`collapse ${open ? "open" : "closed"}`}>
            <Spacer/>
            <Button className={`menu-item`}>Reset Game</Button>
            <Spacer/>
            <Switch className={`menu-item`}/>
        </div>

        <div className={"content"}>
            {props.children}
        </div>
    </div>)
}

interface MMProps {
    children?: React.ReactNode,
}

export default MoreMenu

