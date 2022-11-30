import React, {useEffect, useState} from 'react';
import {Card, Container, Text} from "@nextui-org/react";
import Player from "./Models/Player";
import MoreMenu from "./Components/Generic/MoreMenu";
import MainHeader from "./Components/Generic/Header/MainHeader";
import IntroCardBody from "./Components/Intro/IntroCardBody";
import BackgroundVideo from "./Components/Generic/BackgroundVideo";

function App() {
    const [player, setPlayer] = useState<Player | undefined>();

    const TEXT_GRADIENT = "90deg, hsla(25, 91%, 54%, 1) 29%, hsla(42, 100%, 66%, 1) 100%";

    useEffect(() => {
        if(Player.hasExistingPlayer()) {
            setPlayer(Player.newPlayer())
        }
    }, [])

    return (
        <Container className={"main-container"}>
            <BackgroundVideo/>
            <MoreMenu/>
            <Card color={"gradient"} css={{w: "85%", m: "30px auto"}}>
                <Card.Header css={{jc: "center"}}>
                    <Text h2 css={{textGradient: TEXT_GRADIENT}}>Lart 1100</Text>
                </Card.Header>
                {player
                    ? <MainHeader player={player} updatePlayer={setPlayer}/>
                    : <IntroCardBody setPlayer={setPlayer}/>}
            </Card>
        </Container>)
}

export default App;
