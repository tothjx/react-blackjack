import React from 'react';
import * as cfg from './config';

/**
 * @description Board component
 * @returns {string} component
 */
const Board = (props) => {
	//console.log('board props:', props);
	
	const {target, getRoundValue, isStopped} = props;
	const isPlayer = (target === 'player');
	const title = (isPlayer) ? cfg.TITLE_PLAYER : cfg.TITLE_BANK;
	
	/**
	 * @description get count of cards for target
	 * @param {string} ['player', 'bank'] target 
	 * @returns {number|string}
	 */
	const getCounter = (target) => {
		if (target === 'bank') {
			if (!isStopped) {
				return '0';
			}

			return getRoundValue('bank');
		}

		return getRoundValue('player');
	}

	return (
		<React.Fragment>
			<div className='board-player'>
				{title}: {getCounter(target)}
			</div>
		</React.Fragment>
	);
}

export default Board;
