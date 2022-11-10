import {Card, Divider, Spacer} from "@nextui-org/react";
import React, {useContext, useState} from "react";
import SidebarItem from "./SidebarItem";
import Player from "../../../Models/Player";
import JobDropdown from "./JobDropdown";
import ActionButtons from "./ActionButtons";
import RandomMiniGame from "../../MiniGames/RandomMiniGame";
import {ToastContext} from "../../../index";
import {randomNumberBetween} from "../../../Utils/Utils";

const Sidebar = (props: SidebarProps) => {
    const createToast = useContext(ToastContext);
    const [showMiniGame, setShowMiniGame] = useState(false);

    const addIntelligence = () => {
        createToast("Successfully studied! gained 10 intelligence", "success");
        props.updatePlayer((player) => player?.setIntelligence(10));
        setShowMiniGame(false);
    }

    const failStudy = () => {
        const amount = randomNumberBetween(1, 5);
        createToast(`Failed to study lost ${amount} intelligence`, "error");
        props.updatePlayer(player => player?.setIntelligence(-amount));
        setShowMiniGame(false);
    }

    const study = () => {
        const timeAvailable = props.player.useFreeTime(1);
        if (timeAvailable) {
            props.updatePlayer(timeAvailable);
            setShowMiniGame(true);
            return;
        }

        createToast("Somehow studied with no time...", "error");
    }

    const work = () => {
        const timeAvailable = props.player.useFreeTime(1);
        if (timeAvailable) {
            props.updatePlayer(() => timeAvailable?.addMoney(8))
            return;
        }

        createToast("Somehow worked with no time...", "error");
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
                    {showMiniGame && <RandomMiniGame onPass={addIntelligence} onFail={failStudy}/>}
                </Card.Body>
            </Card>
            <div className={"sidebar-content"}>
                {props.children}
            </div>
        </div>)
}

interface SidebarProps {
    player: Player,
    updatePlayer: React.Dispatch<React.SetStateAction<Player | undefined>>,
    children?: React.ReactNode
}

export default Sidebar