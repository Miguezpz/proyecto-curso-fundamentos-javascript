//const API_URL = 'https://api-random-number-miguezpz.onrender.com/randomNumber/min/max'

/* fetch ('https://api-random-number-miguezpz.onrender.com/randomNumber/1/5')
    .then(res => res.json())
    .then(data => console.log('Número Random:', data.randomNumber)) */

    const API_URL = 'https://api-random-number-miguezpz.onrender.com/randomNumber/'
    const INPUT_MIN_VALUE = document.getElementById('input-min-value')
    const INPUT_MAX_VALUE = document.getElementById('input-max-value')
    const INPUT_RANDOM_NUMBER_QUANTITY = document.getElementById('input-random-number-quantity')
    const BUTTON_GET_RANDOM_NUMBER = document.getElementById('button-get-random-number')
    const DIV_SPAN_RESULT_RANDOM_NUMBER = document.querySelector('.div-span-result-random-number')
    const SPAN_RANDOM_NUMBER_MESSAGE = document.querySelector('.span-random-number-message')
    const SPAN_RESULT_RANDOM_NUMBER = document.getElementById('span-result-random-number')


    function disableButtonGetRandomNumber (trueOrFalse) {
        BUTTON_GET_RANDOM_NUMBER.disabled = trueOrFalse
    }

    async function getRandomNumbersFromAPI (minValue, maxValue, numberQuantity) {

        try {
            DIV_SPAN_RESULT_RANDOM_NUMBER.style.display = 'flex'
            SPAN_RESULT_RANDOM_NUMBER.textContent = ''
            SPAN_RANDOM_NUMBER_MESSAGE.textContent = 'Esperando respuesta del servidor 🔄 ... '
            const generatedNumbers = []

            for (let i = 0; i < numberQuantity; i++) {
                const response = await fetch(`${API_URL}${minValue}/${maxValue}`)
                const data = await response.json()
                generatedNumbers.push(data.randomNumber)
                console.log(data.randomNumber)
                
                if (generatedNumbers.length == numberQuantity) {

                    let joinedArray = generatedNumbers.join(', ')

                    for (randomNumber of joinedArray) {
                        SPAN_RESULT_RANDOM_NUMBER.textContent += randomNumber
                    }

                    SPAN_RANDOM_NUMBER_MESSAGE.textContent = 'Números generados ✅'
                    disableButtonGetRandomNumber(false)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    
    window.addEventListener('keyup', (event) => {

        if (event.key === 'Enter'
            && INPUT_MIN_VALUE.value
            && INPUT_MAX_VALUE.value
            && INPUT_RANDOM_NUMBER_QUANTITY.value <= 20
        ) {

            disableButtonGetRandomNumber(true)
            const minValue = INPUT_MIN_VALUE.value
            const maxValue = INPUT_MAX_VALUE.value
            const numberQuantity = INPUT_RANDOM_NUMBER_QUANTITY.value

            getRandomNumbersFromAPI(minValue, maxValue, numberQuantity)
        }
    })

    BUTTON_GET_RANDOM_NUMBER.addEventListener('click', () => {
        
        if (INPUT_MIN_VALUE.value && INPUT_MAX_VALUE.value && INPUT_RANDOM_NUMBER_QUANTITY.value <= 20) {   
            disableButtonGetRandomNumber(true)
            const minValue = INPUT_MIN_VALUE.value
            const maxValue = INPUT_MAX_VALUE.value
            const numberQuantity = INPUT_RANDOM_NUMBER_QUANTITY.value
            getRandomNumbersFromAPI(minValue, maxValue, numberQuantity)
        }
    })

