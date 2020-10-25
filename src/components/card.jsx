import React from 'react';

/**
 * @description Card component
 * @param {object} props
 * @returns {string} component
 */
const Card = (props) => {
	//console.log('card props:', props);
	
	let symbol = '';
	
	switch(props.color) {
		case 'club':
			symbol = <b>&clubs;</b>;
			break;

		case 'diam':
			symbol = <b>&diams;</b>;
			break;
		
		case 'heart':
			symbol = <b>&hearts;</b>;
			break;
		
		case 'spade':
			symbol = <b>&spades;</b>;
			break;
		
		case 'back':
		default:
			break;
	}

	/**
	 * @description get card component
	 * @returns {string} component
	 */
	const getCard = () => {
		// card back
		if (props.back) {
			return (
				<div className='Card back animated'>
					<b>&#10026;</b>
				</div>
			);
		}
		
		return (
			<div className={'Card animated ' + props.color}>
				<div className={'card-number ' + props.color}>
					{props.number}
				</div>

				<div className={'card-symbol ' + props.color}>
					{symbol}
				</div>
			</div>
		);
	}

	return (
		<React.Fragment>
			{getCard()}
		</React.Fragment>
	);
};

export default Card;
