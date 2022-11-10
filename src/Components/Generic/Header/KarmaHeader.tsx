import KarmaBar from "../KarmaBar";
import React from "react";

const KarmaHeader = (props: KarmaHeaderProps) => {
    return <div className={"flex-center CGap-medium"}>
                <KarmaBar currentValue={props.integrity} name={"Integrity"}/>
                <KarmaBar currentValue={props.intelligence} name={"Intelligence"}/>
                <KarmaBar currentValue={props.popularity} name={"Popularity"}/>
            </div>
}

interface KarmaHeaderProps {
    integrity: number,
    intelligence: number,
    popularity: number,
}

export default KarmaHeader