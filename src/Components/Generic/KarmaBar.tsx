import {Progress, Text} from "@nextui-org/react";
import React, {useEffect, useState} from "react";

const KarmaBar = (props: KarmaBarProps) => {
    const [curValue, setCurValue] = useState(props.currentValue);

    useEffect(() => {
        if (props.currentValue === curValue) {
            return
        }

        const diff = Math.abs(props.currentValue - curValue);

        for (let i = 0; i < diff; i++) {
            setTimeout(() => {
                setCurValue((curVal) => curVal - 1);
            }, i * 3)
        }
    }, [props.currentValue])

        const getColor = () => {
            switch (props.name) {
                case "Integrity":
                    return "secondary"
                case "Intelligence":
                    return "warning"
                case "Popularity":
                    return "error"
            }
        }

        return (
            <div className={"full-width"}>
                <Progress value={props.currentValue} shadow color={getColor()}/>
                <div className={"flex-space-between"}>
                    <Text>{props.name}</Text>
                    <Text>{curValue}/100</Text>
                </div>
            </div>
        )
}

interface KarmaBarProps {
    currentValue: number,
    name: string,
}

export default KarmaBar