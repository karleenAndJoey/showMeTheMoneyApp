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


// Create an object that will later store a value that we can access
let apiData = {};

// This will append the data into our "to" dropdown
app.displayConvertedInput = (dataFromApi) => {
    // To get the array of country codes
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
        // const cadAmount = document.querySelector('.cadAmount');
        const cadAmount = document.querySelector('.cadAmount');
        // const cadP = document.querySelector('p');
        cadAmount.innerHTML = ` 💲${userInput.value} CAD Dollars =`;
        cadH3.append(cadAmount);
        
        
        // Append the converted total amount to the page
        const amount = document.querySelector('.amount');
        const convertedValue = document.querySelector('.convertedValue');
        convertedValue.innerHTML = `${total} ${getConvertedValue.value}`;
        amount.append(convertedValue);
        

        // Append the selected currency flag to the page
        const flagImage = document.querySelector('.flag');
        flagImage.src = `./assets/${getConvertedValue.value}.png`;

        // Append the current date to the page
        // Date object
        const date = new Date();
        console.log(date)

        const dateH3 = document.querySelector('.dateH3');
        const dateInput = document.querySelector('.date');
        dateInput.innerHTML = 
        `Date:  ${date.getMonth()}-${date.getDate()}-${date.getFullYear()}   
        Time: ${date.getHours()}:${date.getMinutes()} EST`;


        dateH3.append(dateInput);
        
        // To clear the input field once submitted
        userInput.value = "";

    })


app.init = () => {
    app.getBase()

};

app.init();


