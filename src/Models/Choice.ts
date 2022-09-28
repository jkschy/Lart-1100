import Decision, {DecisionJSONType} from "./Decision";
import {ChoiceTypes, ChoiceTypesFromString} from "../Utils/Enums";
import Trigger, {triggerJSONType} from "./Trigger";

export type ChoiceJSONType =
    {
        title: string,
        description: string,
        decisions: DecisionJSONType[],
        type: string,
        trigger: triggerJSONType,
    };

class Choice {
    private choiceTitle: string
    private choiceDescription: string
    private readonly decisions: Decision[];
    private readonly type: ChoiceTypes
    private readonly trigger: Trigger;


    private constructor(title: string, description: string, decisions: Decision[], type: ChoiceTypes, trigger: Trigger) {
        this.choiceTitle = title;
        this.choiceDescription = description
        this.decisions = decisions;
        this.type = type;
        this.trigger = trigger;
    }

    public get decisionType(): ChoiceTypes {
        return this.type
    }

    public getDecisions() {
        return this.decisions;
    }

    public static fromJson(jsonData: ChoiceJSONType) {
        const decisions: Decision[] = []
        return new Choice(jsonData.title, jsonData.description, Decision.fromDecisionArray(jsonData.decisions), ChoiceTypesFromString(jsonData.type), Trigger.fromJSON(jsonData.trigger));
    }

}






export default Choice
