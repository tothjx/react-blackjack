import React from 'react';
import {Button} from '@material-ui/core';
/*
import Icon from '@material-ui/core/Icon';
import {
	AddCircleOutline as StartBtn, 
	PanTool as StopBtn,
	AddCircle as NewBtn
} from '@material-ui/icons';
*/
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors';
import * as cfg from './config';

/**
 * @description ButtonBar component
 * @returns {string} component
 */
const ButtonBar = (props) => {
	//console.log('button-bar props:', props);
	
	// standard mui button
	const StdButton = withStyles(theme => ({
		root: {
			color: theme.palette.getContrastText(orange[800]),
			backgroundColor: orange[600],
				'&:hover': {
					backgroundColor: orange[800],
				},
			padding: theme.spacing(.75, 1.85),
		},
	}))(Button);
	
	// default style
	const useStyles = makeStyles(theme => ({
		margin: {
			margin: theme.spacing(.5),
		}
	}));
	
	const classes = useStyles();

	/**
	 * @description get button for draw
	 * @returns {string} component
	 */
	const getDrawButton = () => {
		const countPlayerCards = props.playerCards.length;
		const countBankCards = props.bankCards.length;
		let btnTitle = cfg.GIVE_ME_CARD;
		
		if (countPlayerCards === 0 && countBankCards === 0) {
			btnTitle = cfg.START;
		}

		return (
			<div>
				<StdButton 
					size="small"
					variant="outlined" 
					color="primary" 
					className={classes.margin}
					onClick={props.handleDraw}
				>
					{btnTitle}
				</StdButton>
			</div>
		);
	}
	
	/**
	 * @description get button for stopping
	 * @returns {string} component
	 */
	const getStopButton = () => {
		return (
			<StdButton 
				size="small"
				variant="text" 
				color="primary" 
				className={classes.margin}
				onClick={props.handleStop}
			>
				{cfg.STOP}
			</StdButton>
		);
	}

	/**
	 * @description get button for new round
	 * @returns {string} component
	 */
	const getNewButton = () => {
		return (
			<StdButton 
				size="small"
				variant="text" 
				color="primary" 
				className={classes.margin}
				onClick={props.handleNew}
			>
				{cfg.NEW_ROUND}
			</StdButton>
		);
	}

	/**
	 * @description show/hide help panel
	 * @returns {string} component
	 */
	const getHelpButton = () => {
		return (
			<StdButton 
				size="small"
				variant="text" 
				color="primary" 
				className={classes.margin}
				onClick={props.handleHelp}
			>
				{cfg.HELP}
			</StdButton>
		);
	}

	/**
	 * @description reset scores
	 * @returns {string} component
	 */
	const getResetButton = () => {
		return (
			<StdButton 
				size="small"
				variant="text" 
				color="primary" 
				className={classes.margin}
				onClick={props.handleResetScores}
			>
				{cfg.RESET}
			</StdButton>
		);
	}

	return (
		<div className='button-bar'>
			{getResetButton()}
			{getHelpButton()}
			{(!props.isStopped) ? getDrawButton() : ''}
			{(props.playerCards.length > 0 && !props.isStopped) ? getStopButton() : ''}
			{(props.isStopped && props.bankHand) ? getNewButton() : ''}
		</div>
	);
}

export default ButtonBar;
