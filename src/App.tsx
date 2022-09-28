import React from 'react';
import {Card, Container, Divider, Spacer, Text} from "@nextui-org/react";
import KarmaBar from "./Components/Generic/KarmaBar";
import Player from "./Models/Player";
import MoreMenu from "./Components/Generic/MoreMenu";
import Sidebar from "./Components/Generic/Sidebar";


function App() {
    const player = Player.newPlayer();

  return (
    <Container className={"main-container"}>
        <MoreMenu/>
        <Card color={"gradient"}>
                <Card.Header css={{justifyContent: 'center'}}>
                    <Text h2 css={{
                        textGradient: "90deg, hsla(25, 91%, 54%, 1) 29%, hsla(42, 100%, 66%, 1) 100%",
                    }}>Lart 1100</Text>
                </Card.Header>
                <Card.Body>
                    <div className={"flex-center CGap-medium"}>
                        <KarmaBar currentValue={player.integrity} name={"Integrity"}/>
                        <KarmaBar currentValue={player.intelligence} name={"Intelligence"}/>
                        <KarmaBar currentValue={player.popularity} name={"Popularity"}/>
                    </div>
                    <Spacer/>
                    <Divider/>
                    <Spacer/>

                </Card.Body>
            </Card>
        <Sidebar>

        </Sidebar>
    </Container>
  );
}

export default App;
