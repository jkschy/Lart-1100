import { randomNumberBetween } from '../Utils/Utils'
import { FreeTimeFromMajor, Karma, MajorFromString } from '../Utils/Enums'
import ChoiceLoader from '../Utils/ChoiceLoader'
import Exam from './Exam'

export interface IPlayer {
	year: number
	major: string
	intelligence: number
	integrity: number
	popularity: number
	freeTime: number
	freeTimePerQuestion: number
	money: number
	choiceLoader: ChoiceLoader
	timesCaught: number
	choiceCount: number
}

class Player {
	private readonly player: IPlayer
	private readonly CHOICESPERYEAR = 3
	private constructor(
		year: number,
		major: string,
		intelligence: number,
		integrity: number,
		popularity: number,
		freeTime: number,
		money: number,
		choiceLoader: ChoiceLoader,
		timesCaught: number,
		choiceCount: number
	) {
		this.player = {
			year: year,
			major: major,
			integrity: parseInt(integrity.toString()),
			intelligence: parseInt(intelligence.toString()),
			popularity: parseInt(popularity.toString()),
			freeTime: freeTime,
			freeTimePerQuestion: FreeTimeFromMajor(major),
			money: money,
			choiceLoader: choiceLoader,
			timesCaught: timesCaught,
			choiceCount: choiceCount
		}

		this.saveToLocalStorage()
		console.log(Exam.createExam())
	}

	public updateKarma(karmaName: Karma, amountChange: number) {
		switch (karmaName) {
			case Karma.integrity:
				return this.setIntegrity(amountChange)
			case Karma.intelligence:
				return this.setIntelligence(amountChange)
			case Karma.popularity:
				return this.setPopularity(amountChange)
		}
		return Player.fromPlayer(this.player)
	}

	public setPopularity(amountChange: number) {
		const num = parseInt(amountChange.toString())
		if (this.player.popularity + num < 0) {
			this.player.popularity = 0
		} else {
			this.player.popularity += num
		}
		return Player.fromPlayer(this.player)
	}

	public setIntelligence(amountChange: number) {
		const num = parseInt(amountChange.toString())
		if (this.player.intelligence + num < 0) {
			this.player.intelligence = 0
		} else if (this.player.intelligence + num > 100) {
			this.player.intelligence = 100
		} else {
			this.player.intelligence += num
		}
		return Player.fromPlayer(this.player)
	}

	public setIntegrity(amountChange: number) {
		const num = parseInt(amountChange.toString())
		if (this.player.integrity + num < 0) {
			this.player.integrity = 0
		} else {
			this.player.integrity += num
		}
		return Player.fromPlayer(this.player)
	}

	public useMoney(amountUse: number) {
		const num = parseInt(amountUse.toString())
		if (this.player.money < num) {
			return false
		}

		this.player.money -= num
		return Player.fromPlayer(this.player)
	}

	public addMoney(amountToAdd: number) {
		const num = parseInt(amountToAdd.toString())

		this.player.money += num
		return Player.fromPlayer(this.player)
	}

	public useFreeTime(hours: number) {
		const num = parseInt(hours.toString())

		if (this.freeTime === 0 || this.freeTime - num < 0) {
			return false
		}
		this.player.freeTime = this.player.freeTime - num
		return Player.fromPlayer(this.player)
	}

	public getChoice() {
		return this.player.choiceLoader.choices.get(MajorFromString(this.major.replaceAll(' ', '')))?.getChoice()
	}

	public newChoice() {
		this.player.choiceLoader.choices.get(MajorFromString(this.major.replaceAll(' ', '')))?.getNewChoice()
		this.player.choiceCount += 1
		this.saveToLocalStorage()
		return Player.fromPlayer(this.player)
	}

	public addFreeTime() {
		this.player.freeTime += this.player.freeTimePerQuestion
		return Player.fromPlayer(this.player)
	}

	public caught() {
		this.player.timesCaught++

		if (this.player.timesCaught == 2) {
			//TODO: add loss event
			console.log('you lose')
		}

		return Player.fromPlayer(this.player)
	}

	public get year() {
		console.log(this.player.choiceCount)
		console.log(this.CHOICESPERYEAR)
		let yearNum = Math.trunc(this.player.choiceCount / this.CHOICESPERYEAR + 1)

		console.log('Year: ' + yearNum)
		switch (yearNum) {
			case 1:
				return 'Freshmen'
			case 2:
				return 'Sophomore'
			case 3:
				return 'Junior'
			case 4:
				return 'Senior'
			default:
				return 'Freshmen'
		}
	}

	public getYearNum() {
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
		return this.player.popularity
	}

	public get money() {
		return this.player.money
	}

	public get freeTime() {
		return this.player.freeTime
	}

	public get hasFreeTime() {
		return this.player.freeTime <= 0
	}

	public get choiceLoader() {
		return this.player.choiceLoader
	}

	private getPlayerSave() {
		return {
			year: this.player.year,
			major: this.player.major,
			intelligence: this.player.intelligence,
			integrity: this.player.integrity,
			popularity: this.player.popularity,
			freeTime: this.player.freeTime,
			money: this.player.money,
			timesCaught: this.player.timesCaught,
			choiceCount: this.player.choiceCount
		}
	}

	public saveToLocalStorage() {
		window.localStorage.setItem('lartPlayer', JSON.stringify(this.getPlayerSave()))
		const choicesJSON = JSON.stringify(this.player.choiceLoader.getJSON())
		if (choicesJSON) {
			window.localStorage.setItem('choices', choicesJSON)
		}
	}

	private static fromPlayer(player: IPlayer) {
		return new Player(
			player.year,
			player.major,
			player.intelligence,
			player.integrity,
			player.popularity,
			player.freeTime,
			player.money,
			player.choiceLoader,
			player.timesCaught,
			player.choiceCount
		)
	}

	public static existingPlayer(
		year: number,
		major: string,
		intelligence: number,
		integrity: number,
		popularity: number,
		freeTime: number,
		money: number,
		choiceLoader: ChoiceLoader,
		timesCaught: number,
		choiceCount: number
	) {
		return new Player(
			year,
			major,
			intelligence,
			integrity,
			popularity,
			freeTime,
			money,
			choiceLoader,
			timesCaught,
			choiceCount
		)
	}

	public static newPlayer(major?: string) {
		const playerString = window.localStorage.getItem('lartPlayer')
		const choices = window.localStorage.getItem('choices')

		let player
		if (playerString && choices) {
			player = JSON.parse(playerString)
			player.choiceLoader = ChoiceLoader.fromJSON(JSON.parse(choices))
		}

		if (player) {
			return this.existingPlayer(
				player.year,
				player.major,
				player.intelligence,
				player.integrity,
				player.popularity,
				player.freeTime,
				player.money,
				player.choiceLoader,
				player.timesCaught,
				player.choiceCount
			)
		}

		return new Player(
			1,
			major ? major.toString() : 'NULL',
			51,
			randomNumberBetween(0, 100),
			randomNumberBetween(0, 100),
			12,
			100,
			new ChoiceLoader(),
			0,
			0
		)
	}

	public static hasExistingPlayer() {
		return !!window.localStorage.getItem('lartPlayer')
	}
}

export default Player
