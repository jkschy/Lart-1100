import {randomNumberBetween} from "../Utils/Numbers";

export interface IPlayer {
    name: string,
    year: number,
    major: string,
    intelligence: number,
    integrity: number,
    popularity: number
}

class Player {
    private readonly player: IPlayer;

    private constructor(name: string, year: number, major: string, intelligence: number, integrity: number, popularity: number) {
        this.player = {
            name: name,
            year: year,
            major: major,
            integrity: integrity,
            intelligence: intelligence,
            popularity: popularity,
        }
    }

    public setPopularity(amountChange: number) {
        if (this.player.popularity + amountChange < 0) {
            this.player.popularity = 0;
        } else {
            this.player.popularity += amountChange;
        }

        return Player.fromPlayer(this.player);
    }

    public setIntelligence(amountChange: number) {
        if (this.player.intelligence + amountChange < 0) {
            this.player.intelligence = 0;
        } else {}
        this.player.intelligence += amountChange

        return Player.fromPlayer(this.player);
    }

    public setIntegrity(amountChange: number) {
        if (this.player.integrity + amountChange < 0) {
            this.player.integrity = 0;
        } else {}
        this.player.integrity += amountChange

        return Player.fromPlayer(this.player);
    }


    public get name() {
        return this.player.name
    }

    public get year() {
        return this.player.year
    }

    public get major() {
        return this.player.major
    }

    public get integrity() {
        return this.player.integrity
    }

    public get intelligence() {
        return this.player.intelligence
    }

    public get popularity() {
        return this.player.popularity;
    }

    private static fromPlayer(player:IPlayer) {
        return new Player(player.name, player.year, player.major, player.intelligence, player.integrity, player.popularity);
    }

    public static existingPlayer(name: string, year: number, major: string, intelligence: number, integrity: number, popularity: number) {
        return new Player(name, year, major, intelligence, integrity, popularity);
    }

    public static newPlayer() {
       return new Player("ShowOff", 1, "CPSC", randomNumberBetween(0, 100), randomNumberBetween(0, 100), randomNumberBetween(0, 100))
    }
}

export default Player