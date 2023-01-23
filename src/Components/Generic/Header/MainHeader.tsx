import { Card, Divider, Loading, Spacer } from '@nextui-org/react'
import Sidebar from '../Sidebar/Sidebar'
import ChoiceComponent from '../../Choice/ChoiceComponent'
import { Majors } from '../../../Utils/Enums'
import React, { useState } from 'react'
import Player from '../../../Models/Player'
import KarmaHeader from './KarmaHeader'

const MainHeader = ({ player, updatePlayer }: MainHeaderProps) => {
	const [showChoice, setShowChoice] = useState(true)

	const choose = () => {
		setTimeout(() => {
			setShowChoice(false)
			setTimeout(getNewChoice, 5000)
		}, 500)
	}

	const getNewChoice = () => {
		if (player.getChoice()) {
			updatePlayer((player) => {
                if(player){
                    player?.newChoice()
                }
				return player
			})

			player?.newChoice()
			setShowChoice(true)
		}
	}

	return (
		<Card.Body>
			<KarmaHeader
				integrity={player.integrity}
				intelligence={player.intelligence}
				popularity={player.popularity}
			/>

			<Spacer />
			<Divider />
			<Spacer />

			<Sidebar player={player} updatePlayer={updatePlayer}>
				{showChoice ? (
					<ChoiceComponent
						choice={player.getChoice()}
						updatePlayer={updatePlayer}
						choose={choose}
						choiceList={player?.choiceLoader?.choices.get(Majors.ComputerScience)}
					/>
				) : (
					<Loading
						type={'gradient'}
						size={'xl'}
						css={{ display: 'flex', justifyContent: 'center', height: '100%' }}
					/>
				)}
			</Sidebar>
		</Card.Body>
	)
}

interface MainHeaderProps {
	player: Player
	updatePlayer: React.Dispatch<React.SetStateAction<Player | undefined>>
}

export default MainHeader
