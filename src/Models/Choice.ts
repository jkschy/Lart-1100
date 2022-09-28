import Decision from "./Decision";

class Choice {
    private choiceTitle: string
    private choiceDescription: string
    private readonly leftDecision: Decision
    private readonly rightDecision: Decision

    private constructor(title: string, description: string, left: Decision, right: Decision) {
        this.choiceTitle = title;
        this.choiceDescription = description
        this.leftDecision = left;
        this.rightDecision = right;
    }

    public get left() {
        return this.leftDecision
    }

    public get right() {
        return this.rightDecision;
    }

    public choose(choice: "left" | "right"): {stat: string, amount: number} {
        if (choice === "left") {
            return {
                stat: this.leftDecision.effetedStat,
                amount: this.leftDecision.amountChange,
            }
        } else {
            return {
                stat: this.rightDecision.effetedStat,
                amount: this.rightDecision.amountChange,
            }
        }
    }

    public static fromJson(jsonData: {title: string, description: string, left: {name: string, stat: string, amount: number}, right: {name: string, stat: string, amount: number}}) {
        const left = Decision.fromJSON(jsonData.left);
        const right = Decision.fromJSON(jsonData.right);

        return new Choice(jsonData.title, jsonData.description, left, right);
    }

}

export default Choice