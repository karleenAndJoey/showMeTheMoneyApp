// Pseudo Code

// Create the init method, call it at the end

// Add event listener to the “submit” button and create a function that will do the conversion

    // Prevent default behaviour once submit button is clicked
    // Take moneyInput and multiply that by toConvertedInput, then put that in a variable
    // Then append it to the page in the convertedValue p tag
    // Also append the flag image of selected currency


// Create an app object using namespacing
const app = {};

// Initialize preset data in the dedicated properties
app.endpoint = `https://morning-coast-00478.herokuapp.com/https://www.currency-api.com/rates`;

app.getBase = () => {
    const currencyUrl = new URL(app.endpoint);
    currencyUrl.search = new URLSearchParams({
        base: 'CAD'
    });
    // Get data
    fetch(currencyUrl)
        .then((response) => response.json())
        .then((jsonData) => {
            console.log(jsonData);
            app.displayConvertedInput(jsonData)
        })   
}

// Create a construction method that will fetch Currency API data and store them in a variable
// Store input value in a variable
app.getUserInput = document.querySelector('#moneyInput')
let userInput = app.getUserInput

// create an object that will later store a value that we can access
let apiData = {};

// This will append the data into our "to" dropdown
app.displayConvertedInput = (dataFromApi) => {

    apiData = dataFromApi.rates
    const rates = Object.keys(apiData)

    console.log(rates);

    const convertedDropDown = document.querySelector('#toConvertedInput')

    rates.forEach((individualRate) => {
        const options = document.createElement('option')
        options.value = individualRate
        options.innerHTML = individualRate
        convertedDropDown.appendChild(options)
    })
}

    // query our convertbutton
    const convert = document.querySelector('.convertButton')

    // When user clicks the convert button, we attached an event listener to it and a function that will multiply userinput and convertedRate
    convert.addEventListener('click', function (e) {
        e.preventDefault();
        
        const getConvertedValue = document.querySelector('#toConvertedInput')

        let convertedRate = apiData[getConvertedValue.value]

        let total = (userInput.value * convertedRate).toFixed(2);

        userInput.value = ""
    })


app.init = () => {
    app.getBase()

};

app.init();


