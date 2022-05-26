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
app.endpoint = `https://morning-coast-00478.herokuapp.com/https://www.currency-api.com/symbols`;

app.getBase = () => {
    const currencyUrl = new URL(app.endpoint);

    fetch(currencyUrl)
        .then((response) => response.json())
        .then((jsonData) => {

            app.displayFromInput(jsonData);
            app.displayConvertedInput(jsonData);
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


// This will append the data into our "from" dropdown
app.displayFromInput = (dataFromApi) => {
    // To get the array of country codes
    apiData = dataFromApi.symbols
    apiData.sort();
    apiData.splice(32, 0, 6, 9, 21, 22, 23, 30, 32, 35, 36, 38)

    console.log(apiData)

    //Append to the page
    const fromDropDown = document.querySelector('#baseInput')

    apiData.forEach((individualRate) => {
        const options = document.createElement('option')
        options.value = individualRate
        options.innerHTML = individualRate
        fromDropDown.appendChild(options)
    })
}

// This will append the data into our "to" dropdown
app.displayConvertedInput = (dataFromApi) => {
    // To get the array of country codes
    apiData = dataFromApi.symbols
    apiData.sort();
    apiData.splice()

    console.log(apiData);
    //Append to the page
    const convertedDropDown = document.querySelector('#toConvertedInput')

    apiData.forEach((individualRate) => {
        const options = document.createElement('option')
        options.value = individualRate
        options.innerHTML = individualRate
        convertedDropDown.appendChild(options)
    })
}


// EVENT LISTENER 
app.setupEventListeners = function () {
    // Query our convert button
    const convert = document.querySelector('.convertButton')
    
    // When user clicks the convert button, we attached an event listener to it and a function that will multiply userinput and convertedRate
    convert.addEventListener('click', function (e) {
        e.preventDefault();
        
        const getBaseValue = document.querySelector('#baseInput')

        const getConvertedValue = document.querySelector('#toConvertedInput')

        // console.log(getBaseValue);
        // console.log(getConvertedValue);
    
        let fromRate = getBaseValue.value;
        let convertedRate = getConvertedValue.value;
        
        console.log(fromRate);
        console.log(convertedRate);

        // Fetch request to get the conversion paired rate
        secondEndpoint = `https://morning-coast-00478.herokuapp.com/https://v6.exchangerate-api.com/v6/1779a7b8e62507dacf3be946/pair/${fromRate}/${convertedRate}`;

        getSecondBase = () => {
            const secondCurrencyUrl = new URL(secondEndpoint);
        
            fetch(secondCurrencyUrl)
                .then((response) => response.json())
                .then((jsonData) => {
                    conversionRate(jsonData)
                })
        }

        getSecondBase();

     

        // Create an object that will store our conversion rate value
        let apiSecondData = {};

        // Store the conversion rate in a variable
        conversionRate = (conversionData) => {
            apiSecondData = conversionData.conversion_rate

            
            let total = (userInput.value * apiSecondData).toFixed(2);
            
            console.log(total);

            // Append the user input amount to the page
            const cadH3 = document.querySelector('.cadH3');
            const cadAmount = document.querySelector('.cadAmount');
            cadAmount.innerHTML = `${userInput.value} ${fromRate} =`;
            cadH3.append(cadAmount);
            

            // Append the converted total amount to the page
            const amount = document.querySelector('.amount');
            const convertedValue = document.querySelector('.convertedValue');
            convertedValue.innerHTML = `${total} ${convertedRate} `;
            amount.appendChild(convertedValue);
            
            
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

            
            // Append the From currency flag to the page
            const baseFlagImg = document.querySelector('.fromFlag');
            baseFlagImg.src = `./assets/${fromRate}.png`;
            baseFlagImg.alt = `Flag of ${fromRate}`
            
            // Append the selected currency flag to the page
            const flagImage = document.querySelector('.flag');
            flagImage.src = `./assets/${convertedRate}.png`;
            flagImage.alt = `Flag of ${convertedRate}`
            
            
            // Call the function that will alert user if they enter anything but a number
            app.errorMsg();
            
            // To clear the input field once submitted
            userInput.value = "";
        }

        conversionRate();

    })
    
    }

    

app.init = () => {
    app.getBase();
    app.setupEventListeners();
};

app.init();