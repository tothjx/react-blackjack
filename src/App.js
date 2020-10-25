import React from 'react';
import * as cfg from './components/config';
import * as util from './components/util';
import ButtonBar from './components/button-bar';
import Help from './components/help';
import Desk from './components/desk';
import './styles/App.scss';

/**
 * @description blackjack App component
 */
class App extends React.Component {
	constructor() {
		super();
		if (this.initCookies()) {
			this.card = {};				// selected card props
			this.newColorDeck = [];		// new deck for selected color
			this.cardsetName = '';		// cardsetName for target
			this.newCardset = [];		// newCardset except selected card

			this.state = {
				club: cfg.DECK,								// club cards in deck
				diam: cfg.DECK,								// diam cards in deck
				heart: cfg.DECK,							// heart cards in deck
				spade: cfg.DECK,							// spade cards in deck
				info: '',									// info text (currently not in use)
				playerScore: util.getCookie('playerScore'),	// scores for player
				playerCards: [],							// cards for player
				bankScore: util.getCookie('bankScore'),		// scores for bank
				bankCards: [],								// cards for bank
				isStopped: false,							// game stopped
				bankHand: false,							// bank hand in actual round
			};
		}

		//this.showCookies();
	}

	////////////////////////////////////////
	// HANDLE FUNCTIONS
	////////////////////////////////////////

	/**
	 * @description handle for drawing
	 */
	handleDraw = async () => {
		// microtime
		// console.log(util.time2str());
		
		if (this.state.playerCards.length >= 2) {
			// add a card
			if (!this.state.isStopped) {
				await this.addCard('player');
			}
		} else {
			// first run
			await this.addCard('player');
			await this.addCard('bank');
			await this.addCard('player');
			await this.addCard('bank');

			// check blackjack 
			switch (this.checkBlackjack()) {
				case 'player':
					await this.setStateValue('isStopped', true);
					await this.setStateValue('bankHand', true);
					await this.increaseScore('player', true);
					break;
				case 'both':
					await this.setStateValue('isStopped', true);
					await this.setStateValue('bankHand', true);
					break;
				default:
					// check scores
					await this.checkScores();
			}
		}

		// check scores
		if (this.state.playerCards.length > 2) {
			this.checkScores();
		}
	}
	
	/**
	 * @description handle for stopping
	 */
	handleStop = async () => {
		// stop
		await this.setStateValue('isStopped', true);
		
		// check scores
		this.checkScores();
	}

	/**
	 * @description handle for new round
	 */
	handleNew = () => {
		window.location.reload('/');
	}

	/**
	 * @description handle for state debug
	 * @description click on arrow (in title) in debug mode
	 */
	handleDebug = () => {
		this.showActualState();
	}

	/**
	 * @description reset score and date cookies
	 */
	handleResetScores = async () => {
		util.setCookie('lastUpdate', util.time2str(), cfg.COOKIE_LIFETIME);
		util.setCookie('playerScore', 0, cfg.COOKIE_LIFETIME);
		util.setCookie('bankScore', 0, cfg.COOKIE_LIFETIME);

		await this.setStateValue('playerScore', 0);
		await this.setStateValue('bankScore', 0);

		//this.showCookies();
	}

	/**
	 * @description handle for show/hide help panel
	 */
	handleHelp = () => {
		const node = document.getElementById('help');
		if (node.style.display === undefined || node.style.display === '' || node.style.display === 'none') {
			node.style.display = 'block';
		} else {
			node.style.display = 'none';
		}
	}

	////////////////////////////////////////
	// CARD/DECK FUNCTIONS
	////////////////////////////////////////

	/**
	 * @description add card to desk
	 * @param {string} ['player', 'bank'] target
	 * @returns {Promise}
	 */
	addCard = (target) => {
		// this.addCard(target).then(result => /* */)
		// or
		// const result = await this.addCard(target);
		// or
		// await this.addCard(target);

		// set card data
		if (this.setCardData(target)) {
			// set states
			return new Promise(resolve => {
				this.setState({
					[this.cardsetName]: this.newCardset,
					[this.card.color]: this.newColorDeck,
				}, () => {
					this.resetCardData();
					resolve(true);
				});
			});
		}
	}

	/**
	 * @description check blackjack
	 * @returns {string} ['player', 'both', ''] winner
	 */
	checkBlackjack = () => {
		let winner = '';
		if (this.state.playerCards.length !== 2 || this.state.bankCards.length !== 2) {
			return winner;
		}

		if (this.isBlackjack(this.state.playerCards)) {
			// player has blackjack
			if (this.isBlackjack(this.state.bankCards)) {
				// bank has blackjack too
				return 'both';
			}

			return 'player';
		}

		return winner;
	}

	/**
	 * @description check cards for blackjack
	 * @param {array} cards
	 * @returns {boolean}
	 */
	isBlackjack = (cards) => {
		// [{color: "heart", index: 10, number: "10"}]
		
		// check cards length
		if (cards.length !== 2) {return false;}
		
		const num1 = cards[0].number;
		const num2 = cards[1].number;
		const ten = ['10', 'J', 'Q', 'K']

		if ((num1 === 'A' || num2 === 'A') && (ten.indexOf(num1) > -1 || ten.indexOf(num2) > -1)) {
			return true;
		}

		return false;
	}

	/**
	 * @description set actual card data
	 * @param {string} ['player', 'bank'] target
	 * @returns {boolean}
	 */
	setCardData = (target) => {
		if (this.resetCardData()) {
			this.card.color = this.getColor();
			this.card.index = util.getRandomIntMinMax(0, this.state[this.card.color].length - 1);

			/*
			// hack for full desk testing
			if (target === 'player' && this.state.playerCards.length < 9) {
				this.card.index = 0;
			} else {
				this.card.index = util.getRandomIntMinMax(0, this.state[this.card.color].length - 1);
			}

			// hack for blackjack testing
			if (cfg.DEBUG && target === 'player' && (this.state.playerCards.length === 0 || this.state.playerCards.length === 1)) {
				this.card.index = this.state[this.card.color].length - 1;
			} else {
				this.card.index = util.getRandomIntMinMax(0, this.state[this.card.color].length - 1);
			}
			*/

			this.card.number = this.state[this.card.color][this.card.index];
			this.newColorDeck = this.state[this.card.color].filter((item, idx) => {
				return idx !== this.card.index;
			});
			this.cardsetName = this.getCardsetName(target);
			this.newCardset = this.state[this.cardsetName];
			this.newCardset.push(this.card);

			return true;
		}
		
		return false;
	}

	/**
	 * @description reset actual card data
	 * @returns {boolean}
	 */
	resetCardData = () => {
		this.card = {};
		this.newColorDeck = [];
		this.cardsetName = '';
		this.newCardset = [];

		return true;
	}

	/**
	 * @description get name of cardset
	 * @param {string} ['player', 'bank'] target
	 * @returns {string} stateName
	 */
	getCardsetName = (target) => {
		let stateName = '';
		switch(target) {
			case 'player': 
				stateName = 'playerCards'; 
				break;
			case 'bank':
				stateName = 'bankCards';
				break;
			default:
				break;		
		}

		return stateName;
	} 

	/**
	 * @description get value of cards in current round
	 * @param {string} ['player', 'bank'] target
	 * @returns {number} count
	 */
	getRoundValue = (target) => {
		let cardSet = [], count = 0;

		if (target === 'bank') {
			cardSet = this.state.bankCards;
		} else {
			cardSet = this.state.playerCards;
		}

		cardSet.forEach((item) => {
			count = count + this.getCardValue(item.number);
		});
		
		return count;
	}

	/**
	 * @description get integer value of card number
	 * @param {string} ['2', '3', '4', '5', '6', '7', '8', '8', '10', 'J', 'Q', 'K', 'A'] fig
	 * @returns {number} value of card
	 */
	getCardValue = (fig) => {
		switch(fig) {
			case 'A': 
				return 11;
			case 'J':
			case 'Q':
			case 'K': 
				return 10;
			default: 
				return parseInt(fig);
		}
	}
	
	/**
	 * @description get a random color for drawing
	 * @returns {string} color
 	 */
	getColor = () => {
		const num = util.getRandomIntMinMax(1, 4);
		
		switch(num) {
			case 1: return 'club';
			case 2: return 'diam';
			case 3: return 'heart';
			case 4: return 'spade';
			default: return 'error';
		}
	}

	/**
	 * @description init cookies
	 * @returns {boolean}
	 */
	initCookies = () => {
		const lastUpdate = util.getCookie('lastUpdate');
		const playerScore = util.getCookie('playerScore');
		const bankScore = util.getCookie('bankScore');
		
		if (!lastUpdate || !playerScore || !bankScore) {
			util.setCookie('lastUpdate', util.time2str(), cfg.COOKIE_LIFETIME);
			util.setCookie('playerScore', 0, cfg.COOKIE_LIFETIME);
			util.setCookie('bankScore', 0, cfg.COOKIE_LIFETIME);
		}
		
		if (util.getCookie('lastUpdate') && util.getCookie('playerScore') && util.getCookie('bankScore')) {
			return true;
		}

		return false;
	}

	/**
	 * @description hit for bank
	 */
	hitBank = async () => {
		while(this.getRoundValue('bank') <= 16) {
			await this.addCard('bank');
		}
	}

	/**
	 * @description check scores and find winner
	 */
	checkScores = async () => {
		const pValue = this.getRoundValue('player');
		const bankHand = this.state.bankHand;
		const isStopped = this.state.isStopped;

		if (isStopped) {
			// player stopped
			if (!bankHand) {
				// add card to bank
				await this.hitBank();
				await this.setStateValue('bankHand', true);
			}

			const winner = this.getWinner();
			const players = ['player', 'bank'];
			if (players.indexOf(winner) > -1) {
				this.increaseScore(winner);
			}
		} else {
			// game in progress

			// player bust
			if (pValue > 21) {
				await this.setStateValue('isStopped', true);
				await this.setStateValue('bankHand', true);
				await this.increaseScore('bank', false);
				//this.showCookies();
			}
		}
	}

	/**
	 * @description get winner for actual round
	 * @returns {string} ['player', 'bank', 'push', '']
	 */
	getWinner = () => {
		const pValue = this.getRoundValue('player');
		const bValue = this.getRoundValue('bank');
		const pDiff = 21 - parseInt(pValue);
		const bDiff = 21 - parseInt(bValue);

		if (this.state.isStopped && this.state.bankHand) {
			// optimal results
			if (pValue <= 21 && bValue <= 21) {
				if (pDiff < bDiff) {
					return 'player';
				}

				if (bDiff < pDiff) {
					return 'bank';
				}

				if (pDiff === bDiff) {
					return 'push';
				}
			}

			// bank bust
			if (pValue <= 21 && bValue > 21) {
				return 'player';
			}

			// player bust
			if (pValue > 21) {
				return 'bank';
			}
		} else {
			// player bust
			if (pValue > 21) {
				return 'bank';
			}

			return '';
		}
	}

	/**
	 * @description increase score after a successful round
	 * @param {string} ['player', 'bank'] target
	 * @param {boolean} isBlackjack
	 * @returns {boolean}
	 */
	increaseScore = async (target, isBlackjack) => {
		if (['player', 'bank'].indexOf(target) < 0) {
			return false;
		}

		const plusValue = (isBlackjack) ? 2 : 1;
		const name = target + 'Score';
		const value = parseInt(util.getCookie(name)) + plusValue;
		util.setCookie(name, value, cfg.COOKIE_LIFETIME);
		util.setCookie('lastUpdate', util.time2str(), cfg.COOKIE_LIFETIME);
		await this.setStateValue(name, value);

		return true;
	}

	/**
	 * @description set custom state value by name
	 * @param {string} name
	 * @param {string} value
	 * @returns {Promise}
	 */
	setStateValue = (name, value) => {
		return new Promise(resolve => {
			this.setState({
				[name]: value
			}, () => {				
				resolve(true);
			});
		});
	}

	////////////////////////////////////////
	// DEBUG FUNCTIONS
	////////////////////////////////////////

	/**
	 * @description get count of all cards in deck
	 * @returns {number}
	 */
	getCountOfAllCards = () => {
		return (
			this.state.club.length + 
			this.state.diam.length + 
			this.state.heart.length + 
			this.state.spade.length
		);
	}

	/**
	 * @description get count of all cards in deck by color
	 * @param {string} ['club', 'diam', 'heart', 'spade'] color
	 * @returns {number}
	 */
	getCountOfCardsByColor = (color) => {
		let baseArr;

		switch(color) {
			case 'club': baseArr = this.state.club; break;
			case 'diam': baseArr = this.state.diam; break;
			case 'heart': baseArr = this.state.heart; break;
			case 'spade': baseArr = this.state.spade; break;
			default: return 0;
		}

		return baseArr.length;
	}
	
	/**
	 * @description show actual state in console (only debug mode)
	 */
	showActualState = () => {
		if (cfg.DEBUG) {
			console.log(cfg.STARS);
			console.log('=> ACTUAL STATE FOR DEBUG:');
			console.log(this.state);
			console.log(cfg.STARS);
		}
	}

	/**
	 * @description show live cookies in console (only debug mode)
	 */
	showCookies = () => {
		if (cfg.DEBUG) {
			console.log('last:', util.getCookie('lastUpdate'));
			console.log('player:', util.getCookie('playerScore'));
			console.log('bank:', util.getCookie('bankScore'));
		}
	}

	////////////////////////////////////////
	// RENDER
	////////////////////////////////////////

	/**
	 * @description render for app
	 */
	render() {
		let debugInfo = '';
		let viewCookies = '';

		if (cfg.DEBUG) {
			debugInfo = 
				<span className='debug_lnk' onClick={this.handleDebug}>
					&nbsp;&nbsp;[{this.getCountOfAllCards()}]
				</span>;
			
			viewCookies =
				<span className='view_cookies' onClick={this.showCookies}>
					&nbsp;&nbsp;[cook]
				</span>;
		}
		
		return (
			<React.Fragment>
				<div className='App'>
					<h1>
						<a className='white_lnk' href='/'>{cfg.MAIN_TITLE}</a>
						{debugInfo}
						{viewCookies}
					</h1>
					<div className='scores'>
						{cfg.TITLE_PLAYER}: {this.state.playerScore} &nbsp;&nbsp;{cfg.TITLE_BANK}: {this.state.bankScore} 
					</div>

					<ButtonBar 
						{...this.state}
						handleDraw={this.handleDraw}
						handleStop={this.handleStop}
						handleNew={this.handleNew}
						handleResetScores={this.handleResetScores}
						handleHelp={this.handleHelp}
						getRoundValue={this.getRoundValue}
					/>

					<Help handleHelp={this.handleHelp} />

					<Desk 
						{...this.state}
						handleDraw={this.handleDraw} 
						handleStop={this.handleStop} 
						handleNew={this.handleNew} 
						getRoundValue={this.getRoundValue}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
