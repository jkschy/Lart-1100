import {Button, Card, Text, Tooltip} from "@nextui-org/react";
import Choice from "../../Models/Choice";
import Player from "../../Models/Player";
import Decision from "../../Models/Decision";
import {isKarma, KarmaFromString, PlayerInfo, PlayerInfoFromString} from "../../Utils/Enums";
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
        props.updatePlayer(player => player?.addFreeTime())

        if (!decision.loadChoice) {
            decision.effetedStat.forEach((stat, index) => {
                if (isKarma(stat)) {
                    props.updatePlayer((player) => {
                        player?.updateKarma(KarmaFromString(stat), decision.amountChange[index]);
                        return player;
                    })
                } else {
                    props.updatePlayer(player => {
                        switch (PlayerInfoFromString(stat)) {
                            case PlayerInfo.money:
                                player?.addMoney(decision.amountChange[index]);
                                break;
                            default:
                                break;
                        }
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
            <Card.Footer css={{d: "grid", gridTemplateColumns: "1fr 1fr", gridAutoRows: "1fr", rowGap: "15px"}} >
                {currentChoice?.getDecisions().map((decision) => {
                    return <div className={"margin-center"}>
                            <Tooltip content={decision.tooltipText} placement={currentChoice?.getDecisions().indexOf(decision) <= 1 ? "top" : "bottom"}>
                                <Button onPress={() => {
                                    handleClick(decision)
                                }}>{toTitleCase(decision.name)}</Button>
                            </Tooltip>
                        </div>
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
