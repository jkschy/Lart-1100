import React, {useEffect, useState} from 'react';
import {Card, Container, Divider, Loading, Spacer, Text} from "@nextui-org/react";
import KarmaBar from "./Components/Generic/KarmaBar";
import Player from "./Models/Player";
import MoreMenu from "./Components/Generic/MoreMenu";
import Sidebar from "./Components/Generic/Sidebar/Sidebar";
import ChoiceLoader from "./Utils/ChoiceLoader";
import ChoiceComponent from "./Components/Choice/ChoiceComponent";
import {Majors} from "./Utils/Enums";
import Choice from "./Models/Choice";

function App() {
    const [player, setPlayer] = useState(Player.newPlayer());
    const [showChoice, setShowChoice] = useState(false);
    const [choiceLoader, setChoiceLoader] = useState<ChoiceLoader | undefined>()
    const [currentChoice, setCurrentChoice] = useState<Choice | undefined>();

    const getNewChoice = () => {
        if (currentChoice) {
            choiceLoader?.choices.get(Majors.ComputerScience)?.getNewChoice();
        }

        if (choiceLoader) {
            setCurrentChoice(choiceLoader.choices.get(Majors.ComputerScience)?.getChoice());
        } else {
            setChoiceLoader(() => {
                const loader = new ChoiceLoader();
                setCurrentChoice(loader.choices.get(Majors.ComputerScience)?.getChoice());
                return loader;
            })
        }
    }

    useEffect(getNewChoice, [])

    useEffect(() => {
        setShowChoice(true);
    }, [currentChoice])


    const choose = () => {
        setTimeout(() => {
            setShowChoice(false);
            setTimeout(getNewChoice, 5000)
        }, 500);
    }


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
                    <Sidebar player={player} updatePlayer={setPlayer}>
                        {showChoice && <ChoiceComponent choice={currentChoice}
                                                        updatePlayer={setPlayer}
                                                        choose={choose}
                                                        choiceList={choiceLoader?.choices.get(Majors.ComputerScience)}/>}
                        {!showChoice && <Loading type={"gradient"} size={"xl"} css={{display: "flex", justifyContent: "center", height: "100%"}}/>}
                    </Sidebar>
                </Card.Body>
            </Card>
    </Container>
  );
}

export default App;
