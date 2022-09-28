export type DecisionJSONType =
    {
        name: string;
        effectedStat: string;
        effectedAmount: number
        load?: string
    };

class Decision {
    private readonly decisionName: string;
    private readonly effectStat: string;
    private readonly effectAmount: number;
    private readonly load: string


    private constructor(name: string, stat: string, amount: number, load?: string) {
        this.decisionName = name;
        this.effectStat = stat;
        this.effectAmount = amount;
        load ? this.load = load : this.load = "";
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

    public static fromJSON(json: DecisionJSONType) {
        return new Decision(json.name, json.effectedStat, json.effectedAmount, json.load);
    }

    public static fromDecisionArray(decisions: DecisionJSONType[]) {
        const parsedDecisions: Decision[] = [];

        decisions.map((decision) => {
            parsedDecisions.push(Decision.fromJSON(decision));
        })

        return parsedDecisions;
    }
}

export default Decision