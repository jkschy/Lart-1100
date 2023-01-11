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
    const [type, setType] = useState<"study" | "work">("work");

    const pass = (amountLost?: number) => {
        let amount = randomNumberBetween(8, 15);

        if (type === "work") {
            amount *= 10;
        }

        if (amountLost) {
            amount -= amountLost;
        }
        createToast(`Successfully ${type === "study" ? "studied" : "worked" }! gained ${amount} ${type === "study" ?  "intelligence" : "money"}`, "success");

        props.updatePlayer(player => {
            if (type === "study") {
                return player?.setIntelligence(amount)
            } else {
                return player?.addMoney(amount);
            }
        })

        setShowMiniGame(false);
    }


    const fail = () => {
        if (type === "study") {
            const amount = randomNumberBetween(1, 5);
            createToast(`Failed to ${type} lost ${amount} intelligence`, "error");
            props.updatePlayer(player => player?.setIntelligence(amount));
        } else {
            createToast(`Failed to ${type}!`, "error");
        }

        setShowMiniGame(false);
    }

    const study = () => {
        const timeAvailable = props.player.useFreeTime(1);
        if (timeAvailable) {
            setType("study");
            props.updatePlayer(timeAvailable);
            setShowMiniGame(true);
            return;
        }

        createToast("Somehow studied with no time...", "error");
    }

    const work = () => {
        const timeAvailable = props.player.useFreeTime(1);
        if (timeAvailable) {
            setType("work");
            props.updatePlayer(() => timeAvailable)
            setShowMiniGame(true);
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
                    <SidebarItem title={"Exam:"} value={"50%"} color={"secondary"}/>
                    <SidebarItem title={"Job"}>
                        <JobDropdown updatePlayer={props.updatePlayer}/>
                    </SidebarItem>
                    <SidebarItem>
                        <ActionButtons study={study} work={work} hasFreeTime={props.player.hasFreeTime}/>
                    </SidebarItem>
                    <Spacer y={.3}/>
                    {showMiniGame && <RandomMiniGame onPass={pass} onFail={fail} type={type} updatePlayer={props.updatePlayer}/>}
                    <div id={"jobModalPortal"}></div>
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