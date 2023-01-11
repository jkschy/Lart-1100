import React from "react";
import WordScramble from "../../Components/MiniGames/WordScramble";
import Typing from "../../Components/MiniGames/Typing";
import Player from "../Player";

type updatePlayer = React.Dispatch<React.SetStateAction<Player | undefined>>;
class JobRequirements {
    requirement: JSX.Element
    tries: number
    completionsRequired: number
    updatePlayer: updatePlayer;

    constructor(requirement: string, completedTimes: number, numTries: number, updatePlayer: updatePlayer) {
        this.completionsRequired = completedTimes;
        this.tries = numTries;
        this.updatePlayer = updatePlayer;

        switch (requirement.toLowerCase()) {
            case "scramble":
                this.requirement = WordScramble({onFail: this.onFail, onPass: this.onPass, updatePlayer: this.updatePlayer});
                break;

            case "typing":
                this.requirement = Typing({onFail: this.onFail, onPass: this.onPass});
                break;

            default: {
                this.requirement = Typing({onFail: this.onFail, onPass: this.onPass});
                break;
            }
        }
    }

    onFail() {
        this.tries++;
    }

    onPass() {
        this.tries++;
        this.completionsRequired--;
    }
}

export default JobRequirements