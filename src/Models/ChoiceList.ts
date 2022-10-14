import Choice from "./Choice";
import {addItemToArrayLocation, removeItemFromArray, shuffleArray} from "../Utils/Utils";
import {SpecialTrigger} from "../Utils/Enums";

class ChoiceList {
    private choices: Choice[]
    private readonly loadableChoices: Map<string, Choice> = new Map();
    private major: string
    private currentChoice: Choice;

    constructor(major: string, choices: Choice[]) {
        this.major = major;

        choices = this.getAllLoadableChoices(choices);
        choices = shuffleArray(choices);
        const startChoice = this.getStartElementIfExists(choices);
        choices = removeItemFromArray(choices, startChoice);
        this.choices = addItemToArrayLocation(choices, startChoice, 0);
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
                this.loadableChoices.set(choice.choiceTrigger?.triggerEvent.toString(), choice)
            }
        });
        return choices;
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
}

export default ChoiceList