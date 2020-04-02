//fetch is used to make an HTTP Request (build in the browser) to either your back-end to get data or use third party API's. We will use the exchange rate API and pass the country URL as a param
//runs asynchronous (runs in the background) returns a promise when its done fetching, catch that promise with .then

const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//*First pull in all the DOM elements then we need each of these inputs through const variables
//*Second add event listeners that call specific functions
//*Third set calculate function to get values of currency-one currency-two


//Fetch exchange rates and update the DOM
//calculate function is important, will be called on everything, when we select a new currency, change the amount etc...
function calculate() {
    const currency_one = currencyEl_one.value; //bring in the values of currency one and two
    const currency_two = currencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`) //use a template literal that will make the USD or currency dynamic
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const rate = data.rates[currency_two];

            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2); //.toFixed method passes in just two decimals
        });
}

//Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);


swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;   //using temp variable to temporarily store one.value while you swap
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

calculate();

