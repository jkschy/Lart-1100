import Decision, {DecisionJSONType} from "./Decision";
import {ChoiceTypes, ChoiceTypesFromString} from "../Utils/Enums";
import Trigger, {triggerJSONType} from "./Trigger";

export type ChoiceJSONType =
    {
        title: string,
        description?: string,
        options: DecisionJSONType[],
        type: string,
        trigger?: triggerJSONType,
    };

class Choice {
    private readonly choiceTitle: string
    private readonly choiceDescription: string
    private readonly decisions: Decision[];
    private readonly type: ChoiceTypes
    private readonly trigger: Trigger | undefined;
    private id: string;


    private constructor(id: string, title: string, decisions: Decision[], type: ChoiceTypes, trigger?: Trigger, description?: string) {
        this.choiceTitle = title;
        this.choiceDescription = description ? description : "";
        this.decisions = decisions;
        this.type = type;
        this.trigger = trigger
        this.id = id;
    }

    public get decisionType(): ChoiceTypes {
        return this.type
    }

    public get title() {
        return this.choiceTitle;
    }

    public get description() {
        return this.choiceDescription;
    }

    public getDecisions() {
        return this.decisions;
    }

    public get choiceID() {
        return this.id;
    }

    public get choiceTrigger() {
        return this.trigger;
    }

    public static fromJson(jsonData: ChoiceJSONType, id: string) {
        const decisions: Decision[] = Decision.fromDecisionArray(jsonData.options);
        const type = ChoiceTypesFromString(jsonData.type);


        let trigger: Trigger | undefined = undefined;
        if (jsonData.trigger) {
            trigger = Trigger.fromJSON(jsonData.trigger);
        }


        return new Choice(id, jsonData.title, decisions, type, trigger, jsonData.description);
    }

}






export default Choice
