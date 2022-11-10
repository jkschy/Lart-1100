import React from "react";
import TooltipButton from "../TooltipButton";

const ActionButtons = (props: ActionButtonProps) => {

    return <div className={"sidebar-actions"}>
        <TooltipButton tooltipText={!props.hasFreeTime ? "Play a game to earn (or lose) some intelligence" : "No Free time :("} buttonProps={{size: "xs", onPress: props.study, disabled: props.hasFreeTime}}>
            Study
        </TooltipButton>

        <TooltipButton
            tooltipText={"Use 1 free time to gain: $8"}
            buttonProps={{size: "xs", onPress: props.work, disabled: props.hasFreeTime}}
            >
            Work
        </TooltipButton>
    </div>
}

interface ActionButtonProps {
    study: () => void,
    hasFreeTime: boolean,
    work: () => void
}

export default ActionButtons