import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Container, Divider, Loading, Spacer, Text} from "@nextui-org/react";
import KarmaBar from "./Components/Generic/KarmaBar";
import Player from "./Models/Player";
import MoreMenu from "./Components/Generic/MoreMenu";
import Sidebar from "./Components/Generic/Sidebar/Sidebar";
import ChoiceComponent from "./Components/Choice/ChoiceComponent";
import {Majors} from "./Utils/Enums";
import Choice from "./Models/Choice";
import MajorsCarousel from "./Components/Intro/MajorsCarousel";

function App() {
    const [player, setPlayer] = useState<Player | undefined>();
    const [showChoice, setShowChoice] = useState(false);
    const [currentChoice, setCurrentChoice] = useState<Choice | undefined>();
    const [major, setMajor] = useState("");

    const changeMajor = (major: string) => {
        setMajor(major);
    }

    const videoRef = useRef<HTMLVideoElement>(null);

    const getNewChoice = () => {
        if (currentChoice) {
            player?.newChoice()
        }
        const choice = player?.getChoice()
        if (choice) {
            setCurrentChoice(choice)
        }

    }

    useEffect(() => {
        if (!currentChoice && player && player.choiceLoader) {
            setCurrentChoice(player?.getChoice())
        }
    }, [player])

    useEffect(() => {
        if(Player.hasExistingPlayer()) {
            setPlayer(Player.newPlayer())
        }

        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, [])

    useEffect(() => {
        if (currentChoice) {
            setShowChoice(true);
        }
    }, [currentChoice])


    const choose = () => {
        setTimeout(() => {
            setShowChoice(false);
            setTimeout(getNewChoice, 5000)
        }, 500);
    }


    return (
        <Container className={"main-container"}>
            <video autoPlay loop muted playsInline preload="auto" src={"video.mp4"}
                   style={{position: "absolute", left: "0", width: "100vw", height: "100vh"}} ref={videoRef}/>
            <MoreMenu/>
            <Card color={"gradient"} css={{w: "85%", m: "30px auto"}}>
                <Card.Header css={{justifyContent: 'center'}}>
                    <Text h2 css={{
                        textGradient: "90deg, hsla(25, 91%, 54%, 1) 29%, hsla(42, 100%, 66%, 1) 100%",
                    }}>Lart 1100</Text>
                </Card.Header>
                {player && <Card.Body>
                    <div className={"flex-center CGap-medium"}>
                        <KarmaBar currentValue={player.integrity} name={"Integrity"}/>
                        <KarmaBar currentValue={player.intelligence} name={"Intelligence"}/>
                        <KarmaBar currentValue={player.popularity} name={"Popularity"}/>
                    </div>
                    <Spacer/>
                    <Divider/>
                    <Spacer/>
                    <Sidebar player={player} updatePlayer={setPlayer}>
                        {showChoice && <ChoiceComponent choice={currentChoice}
                                                        updatePlayer={setPlayer}
                                                        choose={choose}
                                                        choiceList={player?.choiceLoader?.choices.get(Majors.ComputerScience)}/>}
                        {!showChoice && <Loading type={"gradient"} size={"xl"}
                                                 css={{display: "flex", justifyContent: "center", height: "100%"}}/>}
                    </Sidebar>
                </Card.Body>}
                {!player && <Card.Body>
                    <Text h2 css={{m: "0 auto"}}>First, Pick a Major!</Text>
                    <div className={"startDropdown"}>
                        <MajorsCarousel changeMajor={changeMajor}/>
                    </div>
                    <Text css={{w: "60%", m: "0 auto", ta: "center", color: "gray"}}>There are advantages and disadvantages to each that you will discover along the way.</Text>
                    <Button color={"gradient"} css={{w: "50%", m: "20px auto"}} onPress={() => {
                        const player = Player.newPlayer(major);
                        const choice = player.getChoice()
                        setPlayer(player);
                        if (choice) setCurrentChoice(choice);
                        console.log(player.choiceLoader)
                    }}>Begin College</Button>
                </Card.Body>}
            </Card>
        </Container>)
}

export default App;
