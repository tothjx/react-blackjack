import React from 'react';
import * as cfg from './config';

/**
 * @description Help component
 * @returns {string} component
 */
const Help = (props) => {
	return (
		<div className='help animated' id='help' onClick={props.handleHelp}>
			<h2>{cfg.HELP_TITLE}</h2>
			<div className='help_version'>verzió: {cfg.APP_VERSION}</div>
			<div className='help_p'>{cfg.HELP_TEXT_1}</div>
			<div className='help_p'>{cfg.HELP_TEXT_2}</div>
			<div className='help_p'>{cfg.HELP_TEXT_3}</div>
			<div className='help_p'>{cfg.HELP_TEXT_4}</div>
		</div>
	);
}

export default Help;
