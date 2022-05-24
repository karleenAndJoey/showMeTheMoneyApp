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
            app.displayConvertedInput(jsonData)
        })   
}

// Create a construction method that will fetch Currency API data and store them in a variable
// Store input value in a variable
app.getUserInput = document.querySelector('#moneyInput')
let userInput = app.getUserInput

app.errorMsg = function () {
    if (!userInput.value) {
    alert('Please enter a numerical value');
}}

// Create an object that will later store a value that we can access
let apiData = {};

// This will append the data into our "to" dropdown
app.displayConvertedInput = (dataFromApi) => {
    // To get the array of country codes
    apiData = dataFromApi.rates
    const rates = Object.keys(apiData)

    const convertedDropDown = document.querySelector('#toConvertedInput')

    rates.forEach((individualRate) => {
        const options = document.createElement('option')
        options.value = individualRate
        options.innerHTML = individualRate
        convertedDropDown.appendChild(options)
    })
}

app.setupEventListeners = function () {
    // Query our convert button
    const convert = document.querySelector('.convertButton')
    
    // When user clicks the convert button, we attached an event listener to it and a function that will multiply userinput and convertedRate
    convert.addEventListener('click', function (e) {
        e.preventDefault();
        
        const getConvertedValue = document.querySelector('#toConvertedInput')
    
        let convertedRate = apiData[getConvertedValue.value]
    
        let total = (userInput.value * convertedRate).toFixed(2);
        
        
        // Append the user input amount to the page
        const cadH3 = document.querySelector('.cadH3');
        const cadAmount = document.querySelector('.cadAmount');
        cadAmount.innerHTML = ` $${userInput.value} CAD =`;
        cadH3.append(cadAmount);
        
        
        // Append the converted total amount to the page
        const amount = document.querySelector('.amount');
        const convertedValue = document.querySelector('.convertedValue');
        convertedValue.innerHTML = ` ${total} ${getConvertedValue.value} `;
        amount.append(convertedValue);
        
    
        // Append the selected currency flag to the page
        const flagImage = document.querySelector('.flag');
        flagImage.src = `./assets/${getConvertedValue.value}.png`;
    
        // Append the current date to the page
        // Date object
        const date = new Date();
    
    
        // a function to fix how the minutes append to the page
        let minutes = function () {
            if (date.getMinutes() < 10) {
                return minutes = '0' + date.getMinutes();
            } else {
                return minutes = date.getMinutes();
            }
        }

        const dateH3 = document.querySelector('.dateH3');
        const dateInput = document.querySelector('.date');
        dateInput.innerHTML =
        `Date:  ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}
        <br>
        Time: ${date.getHours()}:${minutes()}`;
    
        dateH3.append(dateInput);
    
        // Call the function that will alert user if they enter anything but a number
        app.errorMsg();
        
        // To clear the input field once submitted
        userInput.value = "";
    })
}



app.init = () => {
    app.getBase();
    app.setupEventListeners();
};

app.init();


