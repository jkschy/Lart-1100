class Decision {
    private readonly decisionName: string;
    private readonly effectStat: string;
    private readonly effectAmount: number;


    private constructor(name: string, stat: string, amount: number) {
        this.decisionName = name;
        this.effectStat = stat;
        this.effectAmount = amount;
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

    public static fromJSON(json: {name: string, stat: string, amount: number}) {
        return new Decision(json.name, json.stat, json.amount);
    }
}

export default Decision