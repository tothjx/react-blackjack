import React from 'react';
import Board from './board';
import Card from './card';

/**
 * @description Desk component
 * @param {object} props
 * @returns {string} component
 */
const Desk = (props) => {
	//console.log('desk props:', props);

	const back = (props.playerCards.length > 0 && !props.isStopped) ? true : false;

	return (
		<React.Fragment>
			<div className='Desk'>
				{/* BOARD for player */}
				<Board 
					{...props}
					handleDraw={props.handleDraw}
					handleStop={props.handleStop}
					handleNew={props.handleNew}
					getRoundValue={props.getRoundValue}
					target='player'
				/>

				{/* DESK for player */}
				<div className='desk-player'>
					{
						props.playerCards.map((item, idx) => {
							return (
								<Card 
									color={item.color} 
									number={item.number}
									key={item.color + '_' + item.number}
									back={false}
								/>
							)
						})
					}
				</div>
				
				{/* BOARD for bank */}
				<Board 
					{...props}
					handleDraw={props.handleDraw}
					handleStop={props.handleStop}
					getRoundValue={props.getRoundValue}
					target='bank'
				/>

				{/* DESK for bank */}
				<div className='desk-bank'>
					{
						props.bankCards.map((item, idx) => {
							return (
								<Card 
									color={item.color}
									number={item.number}
									key={item.color + '_' + item.number}
									back={back}
								/>
							)
						})
					}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Desk;
