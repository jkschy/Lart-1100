import {randomNumberBetween} from "../Utils/Utils";
import {Karma} from "../Utils/Enums";

export interface IPlayer {
    name: string,
    year: number,
    major: string,
    intelligence: number,
    integrity: number,
    popularity: number,
    freeTime: number,
    money: number,
}

class Player {
    private readonly player: IPlayer;

    private constructor(name: string, year: number, major: string, intelligence: number, integrity: number, popularity: number, freeTime: number, money: number) {
        this.player = {
            name: name,
            year: year,
            major: major,
            integrity: parseInt(integrity.toString()),
            intelligence: parseInt(intelligence.toString()),
            popularity: parseInt(popularity.toString()),
            freeTime: freeTime,
            money: money,
        }
    }

    public updateKarma(karmaName: Karma, amountChange: number) {
        switch (karmaName) {
            case Karma.integrity:
                return this.setIntegrity(amountChange);
            case Karma.intelligence:
                return this.setIntelligence(amountChange);
            case Karma.popularity:
                return this.setPopularity(amountChange);
        }
    }

    public setPopularity(amountChange: number) {
        const num = parseInt(amountChange.toString());
        if (this.player.popularity + num < 0) {
            this.player.popularity = 0;
        } else {
            this.player.popularity += num;
        }

        return Player.fromPlayer(this.player);
    }

    public setIntelligence(amountChange: number) {
        const num = parseInt(amountChange.toString());
        if (this.player.intelligence + num < 0) {
            this.player.intelligence = 0;
        } else if (this.player.intelligence + num > 100) {
            this.player.intelligence = 100;
        } else {
            this.player.intelligence += num;
        }

        return Player.fromPlayer(this.player);
    }

    public setIntegrity(amountChange: number) {
        const num = parseInt(amountChange.toString());
        if (this.player.integrity + num < 0) {
            this.player.integrity = 0;
        } else {
            this.player.integrity += num
        }

        return Player.fromPlayer(this.player);
    }

    public useMoney(amountUse: number) {
        const num = parseInt(amountUse.toString());
        if (this.player.money < num) {
            return false;
        }

        this.player.money -= num;
        return Player.fromPlayer(this.player);
    }

    public addMoney (amountToAdd: number) {
        const num = parseInt(amountToAdd.toString());

        this.player.money += num
        return Player.fromPlayer(this.player);
    }

    public useFreeTime(hours: number) {
        const num = parseInt(hours.toString());

        if (this.freeTime === 0 || this.freeTime - num < 0) {
            return false
        }
        this.player.freeTime = this.player.freeTime - num;
        return Player.fromPlayer(this.player);
    }


    public get name() {
        return this.player.name
    }

    public get year() {
        let year = "Freshman";
        switch (this.getYearNum()) {
            case 2:
                year = "Sophomore";
                break;
            case 3:
                year = "Junior";
                break;
            case 4:
                year = "Senior";
                break;
        }

        return year;
    }

    public getYearNum() {
        return this.player.year;
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

    public get money() {
        return this.player.money;
    }

    public get freeTime() {
        return this.player.freeTime;
    }

    public get hasFreeTime() {
        return this.player.freeTime <= 0;
    }

    private static fromPlayer(player:IPlayer) {
        return new Player(player.name, player.year, player.major, player.intelligence, player.integrity, player.popularity, player.freeTime, player.money);
    }

    public static existingPlayer(name: string, year: number, major: string, intelligence: number, integrity: number, popularity: number, freeTime: number, money: number) {
        return new Player(name, year, major, intelligence, integrity, popularity, freeTime, money);
    }

    public static newPlayer() {
       return new Player("TestUser", 1, "ComputerScience", 50, randomNumberBetween(0, 100), randomNumberBetween(0, 100), 12, 100);
    }
}

export default Player