import {Button, Card, Text, Tooltip} from "@nextui-org/react";
import Choice from "../../Models/Choice";
import Player from "../../Models/Player";
import Decision from "../../Models/Decision";
import {isKarma, KarmaFromString} from "../../Utils/Enums";
import React, {useEffect, useRef, useState} from "react";
import {toTitleCase} from "../../Utils/Utils";
import ChoiceList from "../../Models/ChoiceList";
import choiceList from "../../Models/ChoiceList";

const ChoiceComponent = (props: ChoiceProps) => {
    const choice = useRef<HTMLDivElement>(null);
    const [currentChoice, setCurrentChoice] = useState(props.choice);

    useEffect(() => {
        choice?.current?.classList.add("bounceIn");
        setTimeout(() => choice?.current?.classList.remove("bounceIn"), 700);
    }, [])

    const handleClick = (decision: Decision) => {
        choice.current?.classList.remove("bounceOut");
        choice.current?.classList.remove("bounceIn");

        if (!decision.loadChoice) {
            decision.effetedStat.forEach((stat, index) => {
                if (isKarma(stat)) {
                    props.updatePlayer((player) => {
                        player?.updateKarma(KarmaFromString(stat), decision.amountChange[index]);
                        return player;
                    })
                }
            })
            props.choose();
            choice.current?.classList.add("bounceOut");
        } else {
            choice.current?.classList.add("bounceOut");
            setTimeout(() => {
                if (choiceList && currentChoice?.choiceID) {
                    setCurrentChoice(props.choiceList?.getLoadedChoice(currentChoice.choiceID));
                }

                choice.current?.classList.add("bounceIn");
            }, 500)
        }

    }

    return (
        <Card css={{bg: "white", h: "100%"}} ref={choice}>
            <Card.Header>
                <Text b color={"black"}>{currentChoice?.title}</Text>
            </Card.Header>
            <Card.Body>
                <Text color={"black"}>{currentChoice?.description}</Text>
            </Card.Body>
            <Card.Footer css={{d: "flex", jc: "space-evenly"}}>
                {currentChoice?.getDecisions().map((decision) => {
                    return <Tooltip content={decision.tooltipText}>
                        <Button onPress={() => {
                            handleClick(decision)
                        }}>{toTitleCase(decision.name)}</Button>
                    </Tooltip>
                })}
            </Card.Footer>
        </Card>
    )
}

interface ChoiceProps {
    choice: Choice | undefined
    updatePlayer:  React.Dispatch<React.SetStateAction<Player | undefined>>,
    choiceList: ChoiceList | undefined,
    choose: () => void;
}

export default ChoiceComponent
