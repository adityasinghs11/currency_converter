const convertButton = document.getElementById('convert');
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const resultInput = document.getElementById('result');

const convertCurrency = async () => {
	const amount = amountInput.value;
	const fromCurrency = fromCurrencySelect.value;
	const toCurrency = toCurrencySelect.value;

	if (!amount || !fromCurrency || !toCurrency) {
		alert('Please fill in all fields');
		return;
	}

	try {
		const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
		const data = await response.json();
		console.log(data);
		const conversionRate = data.rates[toCurrency];

		if (!conversionRate) {
			alert('Invalid currency');
			return;
		}

		const result = (amount * conversionRate).toFixed(2);
		resultInput.value = result;
	} catch (error) {
		console.error(error);
		alert('Error fetching data');
	}
};

convertButton.addEventListener('click', convertCurrency);