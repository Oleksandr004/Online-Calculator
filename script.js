const modeBtn = document.getElementById('mode-btn')
const calculatorBody = document.getElementById('calculator__body')
const circle = document.getElementById('mode-circle')
const img = document.getElementById('mode-img')
const result = document.getElementById('results__operation')
const resetBtn = document.getElementById('reset-btn')
const time = document.getElementById('status-bar__time')
const numbers = document.querySelectorAll('.number')
const resultValue = document.getElementById('results__result-value')

let firstValue = ''
let symbol = ''

const clearEntry = () => {
	if (resultValue.textContent.length > 1) {
		resultValue.textContent = resultValue.textContent.slice(0, -1)
	} else {
		resultValue.textContent = '0'
		result.textContent = ''
	}
}

const calculateAnswer = () => {
	const currentValue = parseFloat(resultValue.textContent)
	let calculation
	switch (symbol) {
		case '+':
			calculation = parseFloat(firstValue) + currentValue
			result.textContent = `${firstValue} + ${currentValue}`
			break
		case '-':
			calculation = parseFloat(firstValue) - currentValue
			result.textContent = `${firstValue} - ${currentValue}`
			break
		case 'x':
			calculation = parseFloat(firstValue) * currentValue
			result.textContent = `${firstValue} x ${currentValue}`
			break
		case '÷':
			calculation = parseFloat(firstValue) / currentValue
			result.textContent = `${firstValue} ÷ ${currentValue}`
			break
		default:
			return
	}
	resultValue.textContent = calculation
	symbol = ''
}

const setOperator = (operator) => {
	firstValue = resultValue.textContent
	symbol = operator
	resultValue.textContent = '0'
}

const toggleSign = () => {
	if (resultValue.textContent !== '0') {
		resultValue.textContent = resultValue.textContent.startsWith('-')
			? resultValue.textContent.slice(1)
			: '-' + resultValue.textContent
	}
}

const appendNumber = (number) => {
	if (resultValue.textContent.length <= 5) {
		if (resultValue.textContent === '0') {
			resultValue.textContent = number
		} else {
			resultValue.textContent += number
		}
	} else {
		alert('max symbol 6')
	}
}
const loadTheme = () => {
	const savedTheme = localStorage.getItem('theme')
	if (savedTheme === 'dark') {
		calculatorBody.classList.add('dark')
		modeBtn.style.backgroundColor = '#fff'
		circle.style.left = '44px'
		circle.style.backgroundColor = 'rgb(210, 211, 218)'
		img.src = '/images/sun.png'
		img.style.top = '4px'
		img.style.right = '40px'
	} else {
		calculatorBody.classList.remove('dark')
		modeBtn.style.backgroundColor = 'rgb(46, 47, 56)'
		circle.style.left = '4px'
		img.src = '/images/Union.png'
		img.style.right = '11.5px'
		img.style.top = '7px'
	}
}

const updateTime = () => {
	const timeNow = new Date()
	time.textContent = `${timeNow.getHours()}:${timeNow
		.getMinutes()
		.toString()
		.padStart(2, '0')}`
}

calculatorBody.onclick = (e) => {
	if (e.target.classList.contains('number')) {
		appendNumber(e.target.textContent)
	}
	if (e.target.classList.contains('operator')) {
		setOperator(e.target.textContent)
	}
	if (e.target.classList.contains('clear')) {
		clearEntry()
	}
	if (e.target.classList.contains('dot')) {
		if (!resultValue.textContent.includes('.')) {
			resultValue.textContent += '.'
		}
	}
	if (e.target.classList.contains('answer')) {
		calculateAnswer()
	}
	if (e.target.classList.contains('sign-switch')) {
		toggleSign()
	}
	if (e.target.classList.contains('procent')) {
		console.log('resultValue:', resultValue.textContent)
		console.log('firstValue:', firstValue)
		if (firstValue == '') {
			window.alert(23)
			resultValue.textContent = resultValue.textContent / 100
		}
		if (firstValue !== '') {
			resultValue.textContent = (resultValue.textContent * firstValue) / 100
		}
	}
}
resetBtn.onclick = () => {
	firstValue = ''
	resultValue.textContent = '0'
	result.textContent = ''
}

modeBtn.onclick = () => {
	calculatorBody.classList.toggle('dark')
	if (calculatorBody.classList.contains('dark')) {
		modeBtn.style.backgroundColor = '#fff'
		circle.style.left = '44px'
		circle.style.backgroundColor = 'rgb(210, 211, 218)'
		img.src = '/images/sun.png'
		img.style.top = '4px'
		img.style.right = '40px'
		localStorage.setItem('theme', 'dark')
	} else {
		modeBtn.style.backgroundColor = 'rgb(46, 47, 56)'
		circle.style.left = '4px'
		img.src = '/images/Union.png'
		img.style.right = '11.5px'
		img.style.top = '7px'
		localStorage.setItem('theme', 'light')
	}
}
updateTime()
setInterval(updateTime, 1000)
loadTheme()
