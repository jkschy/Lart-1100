import {Text} from "@nextui-org/react";
import {toTitleCase} from "../Utils/Utils";

export type DecisionJSONType =
    {
        name: string;
        effectedStat: string[];
        effectAmount: number[];
        load?: string;
        tooltip?: string;
    };

class Decision {
    private readonly decisionName: string;
    private readonly effectStat: string[];
    private readonly effectAmount: number[];
    private readonly load: string
    private readonly tooltip: string;


    private constructor(name: string, stat: string[], amount: number[], load?: string, tooltip?: string) {
        this.decisionName = name;
        this.effectStat = stat;
        this.effectAmount = amount;
        load ? this.load = load : this.load = "";
        this.tooltip = tooltip ? tooltip : "";
    }

    public get name() {
        return this.decisionName;
    }

    public get effetedStat() {
        return this.effectStat;
    }

    public get amountChange() {
        return this.effectAmount;
    }

    public get loadChoice() {
        return this.load;
    }

    public get tooltipText() {
        if (this.tooltip) {
            return <Text>{toTitleCase(this.tooltip)}</Text>
        } else {
            if (this.effetedStat.length !== this.amountChange.length) {
                console.error(`${this.decisionName} has incompatible stats and change amounts.`);
            }

            return <div className={"flex-column"}>
                {this.effetedStat.map((stat, index) => {
                    return <Text>{`${toTitleCase(stat)}: ${this.amountChange[index]}`}</Text>
                })}
            </div>
        }
    }

    public static fromJSON(json: DecisionJSONType) {
        return new Decision(json.name, json.effectedStat, json.effectAmount, json.load, json.tooltip);
    }

    public static fromDecisionArray(decisions: DecisionJSONType[]) {
        const parsedDecisions: Decision[] = [];

        decisions.forEach((decision) => {
            parsedDecisions.push(Decision.fromJSON(decision));
        })

        return parsedDecisions;
    }
}

export default Decision