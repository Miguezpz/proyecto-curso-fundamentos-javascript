//const API_URL = 'https://api-random-number-miguezpz.onrender.com/randomNumber/min/max'

/* fetch ('https://api-random-number-miguezpz.onrender.com/randomNumber/1/5')
    .then(res => res.json())
    .then(data => console.log('Número Random:', data.randomNumber)) */

    const API_URL = 'https://api-random-number-miguezpz.onrender.com/randomNumber/'
    const INPUT_MIN_VALUE = document.getElementById('input-min-value')
    const INPUT_MAX_VALUE = document.getElementById('input-max-value')
    const BUTTON_GET_RANDOM_NUMBER = document.getElementById('button-get-random-number')
    const SPAN_RESULT_RANDOM_NUMBER = document.getElementById('span-result-random-number')


    async function getRandomNumberFromAPI (minValue, maxValue) {
        try {
            const response = await fetch(`${API_URL}${minValue}/${maxValue}`)
            const data = await response.json()
            SPAN_RESULT_RANDOM_NUMBER.textContent = data.randomNumber

        } catch (error) {
            console.log(error)
        }
    }
    
    window.addEventListener('keyup', (event) => {

        if (event.key === 'Enter'
            && INPUT_MIN_VALUE.value
            && INPUT_MAX_VALUE.value
        ) {
            const minValue = INPUT_MIN_VALUE.value
            const maxValue = INPUT_MAX_VALUE.value

            getRandomNumberFromAPI(minValue, maxValue)
        }
    })

    BUTTON_GET_RANDOM_NUMBER.addEventListener('click', () => {
        
        if (INPUT_MIN_VALUE.value && INPUT_MAX_VALUE.value) {   
            const minValue = INPUT_MIN_VALUE.value
            const maxValue = INPUT_MAX_VALUE.value
            getRandomNumberFromAPI(minValue, maxValue)
        }
    })

