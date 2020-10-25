// GENERAL FUNCTIONS

/**
 * @description convert first letter of string to uppercase
 * @param {string} str
 * @returns {string}
 */
export const getCapStrFirst = (str) => {
	if (typeof str !== 'string') {
		return '';
	}
	
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @description get a random number between min and max
 * @param {number} min 
 * @param {number} max
 * @returns {number} integer
 */
export const getRandomIntMinMax = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * @description copy input to clipboard
 * @param {strign} sel
 * @returns {string}
 */
export const copyInputToClipboard = (sel) => {
	let src = document.querySelector(sel);
	src.select();
	src.setSelectionRange(0, 99999)
	document.execCommand('copy');
	//alert(src.value);

	return src.value;
}

/**
 * @description copy div to clipboard
 * @param {string} sel
 * @returns {boolean}
 */
export const copyDivToClipboard = (sel) => {
    let range = document.createRange();
    range.selectNode(document.querySelector(sel));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
	window.getSelection().removeAllRanges();
	
	return true;
}

/**
 * @description set cookie value and expiry day by name
 * @param {string} name 
 * @param {string} value 
 * @param {number} exdays 
 * @returns {boolean}
 */
export const setCookie = (name, value, exdays) => {
	let exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	let c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = name + "=" + c_value;

	return true;
}

/**
 * @description get cookie value by name
 * @param {string} name 
 * @returns {string|boolean}
 */
export const getCookie = (name) => {
	let i, x, y, acookies = document.cookie.split(";");
	for (i=0; i<acookies.length; i++) {
		x = acookies[i].substr(0, acookies[i].indexOf("="));
		y = acookies[i].substr(acookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x === name) {
			return unescape(y);
		}
	}

	return false;
}

/**
 * @description delete cookie value by name
 * @param {string} name 
 * @returns {boolean}
 */
export const delCookie = (name) => {
	setCookie(name, '', 0);

	return true;
}

/**
 * @description get current timestamp
 * @returns {string} timestamp
 */
export const time2str = () => {
	let dt = new Date();
	let ye = dt.getFullYear();
	let mo = '' + (dt.getMonth() + 1);
	let da = '' + dt.getDate();
	let ho = dt.getHours();
	let mi = dt.getMinutes();
	let se = dt.getSeconds()
	let ms = dt.getMilliseconds();

	if (mo.toString().length < 2) {mo = '0' + mo;}
	if (da.toString().length < 2) {da = '0' + da;}
	if (ho.toString().length < 2) {ho = '0' + ho;}
	if (mi.toString().length < 2) {mi = '0' + mi;}
	if (se.toString().length < 2) {se = '0' + se;}
	
	let strDate = [ye, mo, da].join('-');
	let strTime = [ho, mi, se].join(':') + '.' + ms;
	
	return strDate + ' ' + strTime;
}
