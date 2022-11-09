import React from "react";
import TooltipButton from "../TooltipButton";

const ActionButtons = (props: ActionButtonProps) => {

    return <div className={"sidebar-actions"}>
        <TooltipButton tooltipText={!props.hasFreeTime ? "Use 1 Free time to gain: 10 intelligence" : "No Free time :("} buttonProps={{size: "xs", onPress: props.study, disabled: props.hasFreeTime}}>
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