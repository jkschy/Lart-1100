import Choice from "./Choice";
import {addItemToArrayLocation, removeItemFromArray, shuffleArray} from "../Utils/Utils";
import {SpecialTrigger} from "../Utils/Enums";
import ChoiceLoader from "../Utils/ChoiceLoader";

class ChoiceList {
    private choices: Choice[]
    private readonly loadableChoices: Map<string, Choice> = new Map();
    private major: string
    private currentChoice: Choice;

    constructor(major: string, choices: Choice[], shuffle: boolean, loadableChoices?: Map<string, Choice>) {
        this.major = major;
        if (loadableChoices) {
            this.loadableChoices = loadableChoices;
            this.choices = choices;
            this.currentChoice = this.choices[0];
        }

        if (shuffle) {
            choices = this.getAllLoadableChoices(choices);
            const startChoice = this.getStartElementIfExists(choices);
            if (startChoice) {
                choices = removeItemFromArray(choices, startChoice);
                choices = addItemToArrayLocation(choices, startChoice, 0);
            }
        }

        this.choices = choices;
        this.currentChoice = this.choices[0];
    }

    getChoice(): Choice {
        return this.currentChoice;
    }

    getNewChoice() {
        this.choices = removeItemFromArray(this.choices, this.currentChoice);
        this.currentChoice = this.choices[0];
    }

    getAllLoadableChoices(allChoices: Choice[]) {
        let choices = allChoices;
        const loadChoices = allChoices.filter(choice => !choice.choiceTrigger?.isSpecialTrigger)
        loadChoices.forEach((choice) => {
            if (choice.choiceTrigger) {
                choices = removeItemFromArray(allChoices, choice);
                if (choice.choiceTrigger?.triggerEvent) {
                    this.loadableChoices.set(choice.choiceTrigger?.triggerEvent.toString(), choice)
                }
            }
        });
        return shuffleArray(choices);
    }

    private getStartElementIfExists(choices: Choice[]) {
        const startChoice = choices.filter(choice => choice.choiceTrigger?.triggerEvent === SpecialTrigger.Start);
        return startChoice[0]
    }

    public getLoadedChoice(choiceID: string) {
        return this.loadableChoices.get(choiceID);
    }

    public get numChoices() {
        return this.choices.length;
    }

    public get allChoices() {
        return this.choices;
    }

    public getJSON() {
        return {
            "choicesLeft": this.choices.map((choice) => choice.choiceID),
            "loadableChoices": Array.from(this.loadableChoices.entries()).map((choice) => {return {id: choice[1].choiceID, loadId: choice[0]}})
        }
    }

    public static fromJSON(major: string, choiceList: {choicesLeft: string[], loadableChoices: {id: string, loadId: string}[]}) {
        const allChoices: Choice[] = []
        const loadableChoices:  Map<string, Choice> = new Map();

        choiceList.choicesLeft.forEach((choiceID) => {
            const parsedChoice = ChoiceLoader.choiceFromID(choiceID);
            if (parsedChoice) {
                allChoices.push(parsedChoice)
            }
        })

        choiceList.loadableChoices.forEach((choices) => {
            const parsedChoice = ChoiceLoader.choiceFromID(choices.id);
            if (parsedChoice) {
                loadableChoices.set(choices.loadId, parsedChoice);

            }
        })
        return new ChoiceList(major, allChoices, false, loadableChoices)
    }
}

export default ChoiceList