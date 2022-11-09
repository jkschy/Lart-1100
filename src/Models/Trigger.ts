import {
    isSpecialTrigger,
    Karma,
    KarmaFromString,
    PlayerInfo,
    PlayerInfoFromString,
    SpecialTrigger,
    SpecialTriggerFromString
} from "../Utils/Enums";
import {type} from "os";

export type triggerJSONType =
    {
        event: string,
        random: string,
        stat: string,
        comparison: string,
        amount: string,
    };

class Trigger {
    private event: SpecialTrigger | string
    private random: number
    private stat: Karma | PlayerInfo
    private comparison: string
    private amount: number

    private constructor(random: number, stat: Karma | PlayerInfo, comparison: string, amount: number, event: SpecialTrigger | string) {
        this.event = event;
        this.random = random;
        this.stat = stat;
        this.comparison = comparison;
        this.amount = amount;
    }

    public get isSpecialTrigger() {
        return typeof this.event === "number";
    }

    public get triggerEvent() {
        return this.event;
    }

    public static fromJSON(jsonData: triggerJSONType) {
        let stat: PlayerInfo | Karma;
        let event: SpecialTrigger | string = "";

        try {
            stat = KarmaFromString(jsonData.stat);
        } catch (e) {
            stat = PlayerInfoFromString(jsonData.stat);
        }

        event = SpecialTriggerFromString(jsonData.event)
        if (event === undefined) {
            event = jsonData.event;
        }

        return new Trigger(parseInt(jsonData.random), stat, jsonData.comparison, parseInt(jsonData.amount), event);
    }
}

export default Trigger