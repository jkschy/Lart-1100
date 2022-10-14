import {Card, Divider, Spacer} from "@nextui-org/react";
import React from "react";
import SidebarItem from "./SidebarItem";
import Player from "../../../Models/Player";
import JobDropdown from "./JobDropdown";
import ActionButtons from "./ActionButtons";

const Sidebar = (props: SidebarProps) => {

    const study = () => {
        const timeAvailable = props.player.useFreeTime(1);
        if (timeAvailable) {
            props.updatePlayer(timeAvailable.setIntelligence(10));
        }

        //Add notification or something
    }

    const work = () => {
        const timeAvailable = props.player.useFreeTime(1);
        if (timeAvailable) {
            props.updatePlayer(timeAvailable.addMoney(8));
        }

        //Add notification or something

    }


    return (
        <div className={"sidebar"}>
            <Card css={{w: "250px"}}>
                <Card.Body css={{d: "flex", fd: "column", rowGap: "10px", padding: "6px 12px 0px 2px", overflow: "hidden"}}>
                   <SidebarItem title={"Major"} value={props.player.major}/>
                   <SidebarItem title={"Year"} value={props.player.year.toString()}/>
                    <Divider x={.8}/>
                    <SidebarItem title={"Free Time"} value={`${props.player.freeTime} Hours`} color={"warning"}/>
                    <SidebarItem title={"Money"} value={`$${props.player.money}`} color={"success"}/>
                    <SidebarItem title={"GPA"} value={"3.3"} color={"secondary"}/>
                    <SidebarItem title={"Job"}>
                        <JobDropdown/>
                    </SidebarItem>
                    <SidebarItem>
                        <ActionButtons study={study} work={work} hasFreeTime={props.player.hasFreeTime}/>
                    </SidebarItem>
                    <Spacer y={.3}/>
                </Card.Body>
            </Card>
            <div className={"sidebar-content"}>
                {props.children}
            </div>
        </div>)
}

interface SidebarProps {
    player: Player,
    updatePlayer: React.Dispatch<React.SetStateAction<Player>>,
    children?: React.ReactNode
}

export default Sidebar