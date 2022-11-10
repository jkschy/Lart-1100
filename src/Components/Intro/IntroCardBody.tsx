import {Button, Text} from "@nextui-org/react";
import MajorsCarousel from "./MajorsCarousel";
import Player from "../../Models/Player";
import React, {useState} from "react";
import {Card} from "@nextui-org/react"

const IntroCardBody = ({setPlayer}: IntroCardBodyProps) => {
    const [major, setMajor] = useState("");

    const changeMajor = (newMajor: string) => {
        setMajor(newMajor);
    }

    return <Card.Body>
        <Text h2 css={{m: "0 auto"}}>First, Pick a Major!</Text>
        <div className={"startDropdown"}>
            <MajorsCarousel changeMajor={changeMajor}/>
        </div>
        <Text css={{w: "60%", m: "0 auto", ta: "center", color: "gray"}}>There are advantages and disadvantages to each that you will discover along the way.</Text>
        <Button color={"gradient"} css={{w: "50%", m: "20px auto"}} onPress={() => setPlayer(Player.newPlayer(major))}>Begin College</Button>
    </Card.Body>
}

interface IntroCardBodyProps {
    setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>,
}

export default IntroCardBody