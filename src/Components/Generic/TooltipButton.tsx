import {Button, ButtonProps, Tooltip} from "@nextui-org/react";
import React from "react";

const TooltipButton = (props: TooltipButtonProps) => {
    return <Tooltip content={<div>{props.tooltipText}</div>} placement={"bottomStart"}>
        <Button {...props.buttonProps}>{props.children}</Button>
    </Tooltip>
}

interface TooltipButtonProps {
    tooltipText: string | React.ReactNode,
    buttonProps: ButtonProps,
    children: React.ReactNode,
}

export default TooltipButton