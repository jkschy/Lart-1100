import allChoices from "../choices/allChoices.json";
import {MajorFromString, Majors, SpecialTrigger} from "./Enums";
import ChoiceList from "../Models/ChoiceList";
import Choice from "../Models/Choice";
import {addItemToArrayLocation} from "./Utils";


class ChoiceLoader {
    choices: Map<Majors, ChoiceList> = new Map();


    constructor(choices?: Map<Majors, ChoiceList>) {
        if (choices) {
            this.choices = choices;
            return;
        }

        for (let major in allChoices) {
            this.choices.set(MajorFromString(major), this.loadAllChoices(major));
        }


    }

    private loadAllChoices(major: string) {
        const majorJSON = allChoices[major as keyof typeof allChoices]
        return new ChoiceList(major, this.convertToChoices(majorJSON), true);
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

    public getJSON() {
        const allChoices = Array.from(this.choices.entries())
        return allChoices.map((choice) => {
            return {
                id: choice[0],
                choices: choice[1].getJSON()
            }
        })
    }

    public static choiceFromID(id: string) {
        for (let major in allChoices) {
            const majorJSON = allChoices[major as keyof typeof allChoices]
            for (let choices in majorJSON) {
                const choiceJSON = majorJSON[choices as keyof typeof majorJSON]
                if (choices === id) {
                    // @ts-ignore
                    return Choice.fromJson(choiceJSON, id)
                }
            }
        }
    }

    public static fromJSON(choiceLists: {id: string, choices: {choicesLeft: string[], loadableChoices: {id: string, loadId: string}[]}}[]) {
        const choices: Map<Majors, ChoiceList> = new Map();
        choiceLists.forEach((choice) => {
            const major = MajorFromString(Majors[parseInt(choice.id)])
            choices.set(major, ChoiceList.fromJSON(major.toString(), {choicesLeft: choice.choices.choicesLeft, loadableChoices: choice.choices.loadableChoices}))
        })
        return new ChoiceLoader(choices)
    }
}

export default ChoiceLoader