import axios from 'axios'

export interface IQuestion {
	questionText: string
	answers: IAnswer[]
}

export interface IAnswer {
	answerText: string
	correct: boolean
}

export interface IExam {
	category: string
	difficulty: string
	questions: IQuestion[]
}

class Exam {
	private exam: IExam | undefined

	private constructor(exam: IExam) {
		this.exam = exam
	}

	private static async createNewExam(): Promise<IExam> {
		const URL = Exam.createApiLink()
		const questions: IQuestion[] = []
		let category: string = ''
		let difficulty: string = ''

		if (URL) {
			const res = await axios.get(URL)

			difficulty = res.data.results[0].difficulty
			category = res.data.results[0].category
			for (let result of res.data.results) {
				questions.push(
					Exam.createQuestion(result['incorrect_answers'], result['correct_answer'], result['question'])
				)
			}
		}
		return {
			category: category,
			difficulty: difficulty,
			questions: questions
		}
	}
	private static createApiLink() {
		let difficulty = 'hard'
		let player: any = window.localStorage.getItem('lartPlayer')
		if (!player) {
			return null
		}
		player = JSON.parse(player)
		let intelligence = parseInt(player?.intelligence)
		if (intelligence > 50) {
			difficulty = 'medium'
		}
		if (intelligence > 80) {
			difficulty = 'easy'
		}
		const URL = `https://opentdb.com/api.php?amount=10&category=9&difficulty=${difficulty}&type=multiple`
		console.log(URL)
		return URL
	}

	private static createQuestion(incorrectAnswers: string[], correctAnswer: string, questionText: string): IQuestion {
		const answers: IAnswer[] = []
		for (let answer of incorrectAnswers) {
			answers.push({
				answerText: answer,
				correct: false
			})
		}
		answers.push({
			answerText: correctAnswer,
			correct: true
		})

		return {
			questionText: questionText,
			answers: answers
		}
	}

	public static async createExam() {
		return new Exam(await Exam.createNewExam())
	}
}

export default Exam
