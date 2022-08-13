const result = document.getElementById('result');
const length1 = document.getElementById('length');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generate = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');


const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}




function getRandomLower() {
	const lowers = 'abcdefghijklmnopqrstuvwxyz'
	return lowers[Math.floor(Math.random() * lowers.length)];
}

function getRandomNumber() {
	const numbers = '1234567890'
	return numbers[Math.floor(Math.random() * numbers.length)];
}

function getRandomUpper() {
	const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	return uppers[Math.floor(Math.random() * uppers.length)];
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}





clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = result.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

generate.addEventListener('click', () => {
    const hasUpper = uppercase.checked;
    const length = +length1.value;
	const hasLower = lowercase.checked;
    const hasNumber = numbers.checked;
	const hasSymbol = symbols.checked;


	result.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	

	if(typesCount === 0) {
		return '';
	}

	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}






