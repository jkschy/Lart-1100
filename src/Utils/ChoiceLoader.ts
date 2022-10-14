import allChoices from "../choices/allChoices.json";
import {MajorFromString, Majors, SpecialTrigger} from "./Enums";
import ChoiceList from "../Models/ChoiceList";
import Choice from "../Models/Choice";
import {addItemToArrayLocation} from "./Utils";


class ChoiceLoader {
    choices: Map<Majors, ChoiceList> = new Map();


    constructor() {
        for (let major in allChoices) {
            this.choices.set(MajorFromString(major), this.loadAllChoices(major));
        }
    }

    private loadAllChoices(major: string) {
        const majorJSON = allChoices[major as keyof typeof allChoices]
        return new ChoiceList(major, this.convertToChoices(majorJSON));
    }

    private convertToChoices(choices: object) {
        let allChoices: Choice[] = [];
        for (let choice in choices) {
            const info = choices[choice as keyof typeof choices];
            const parsedChoice = Choice.fromJson(info, choice);
            if (!parsedChoice.choiceTrigger?.isSpecialTrigger) {
                allChoices.push(parsedChoice);
                continue
            }


            //IS SPECIAL TRIGGER
            switch (parsedChoice.choiceTrigger.triggerEvent) {
                case SpecialTrigger.Start:
                    allChoices = addItemToArrayLocation(allChoices, parsedChoice, 0);
                    break;
                default:
                    allChoices.push(parsedChoice);

            }
        }

        return allChoices;
    }
}

export default ChoiceLoader