import {Karma, KarmaFromString, PlayerInfo, PlayerInfoFromString} from "../Utils/Enums";

export type triggerJSONType =
    {
        random: string,
        stat: string,
        comparison: string,
        amount: string
    };

class Trigger {
    private random: number
    private stat: Karma | PlayerInfo
    private comparison: string
    private amount: number

    private constructor(random: number, stat: Karma | PlayerInfo, comparison: string, amount: number) {
        this.random = random;
        this.stat = stat;
        this.comparison = comparison;
        this.amount = amount;
    }

    public static fromJSON(jsonData: triggerJSONType) {
        let stat: PlayerInfo | Karma;

        try {
            stat = KarmaFromString(jsonData.stat);
        } catch (e) {
            stat = PlayerInfoFromString(jsonData.stat);
        }

        return new Trigger(parseInt(jsonData.random), stat, jsonData.comparison, parseInt(jsonData.amount));
    }
}

export default Trigger