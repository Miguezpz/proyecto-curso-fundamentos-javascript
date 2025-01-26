const TEXTAREA_VARIABLES = document.getElementById('textarea-variables')
const INPUT_CONVERT_STRING = document.getElementById('input-convert-string')
const SPAN_RESULTADO_VARIABLE_CONVERSION = document.getElementById('resultado-variable-conversion')
const DIV_REGRESAR_MAIN_MENU = document.querySelector('.div-a-regresar-main-menu')

class Variable {
    constructor (name, value, description, id) {
        this.name = name
        this.value = value
        this.description = description
        this.id = id
    }
}


function getVariabletTypes (arrayOfString) {

    //lowerCamelCase
    const arrayLowerCamelCase = arrayOfString.map((word, index) => {
        return index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    const resultLowerCamelCase = arrayLowerCamelCase.join('')

    //PascalCase
    const arrayPascalCase = arrayOfString.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    const resultPascalCase = arrayPascalCase.join('')

    //snake_case
    const arraySnakeCase = arrayOfString.map((word) => word.toLowerCase())
    const resultSnakeCase = arraySnakeCase.join('_')

    //SNAKE_UPPER_CASE
    const arraySnakeUpperCase = arrayOfString.map((word) => word.toUpperCase())
    const resultSnakeUpperCase = arraySnakeUpperCase.join('_')

    //kebab-case
    const arrayKebabCase = arrayOfString.map((word) => word.toLowerCase())
    const resultKebabCase = arrayKebabCase.join('-')
    
    //UPPERCASE
    const arrayUpperCase = arrayOfString.map((word) => word.toUpperCase())
    const resultUpperCase = arrayUpperCase.join('')

    //lowercase
    const arrayLowerCase = arrayOfString.map((word) => word.toLowerCase())
    const resultLowerCase = arrayLowerCase.join('')

    const lowerCamelString = new Variable(
        'lowerCamelCase', 
        resultLowerCamelCase,
        `Se utiliza para declarar variables, nombres de funciones y
        propiedades de objetos.`,
        'lowerCamelCase'
    )   

    const pascalCaseString = new Variable(
        'PascalCase',
        resultPascalCase,
        `Su uso es en los nombres de las clases "class", constructores,
        y funciones que representan tipos.`,
        'pascalCase'
    )

    const snakeCaseString = new Variable(
        'snake_case',
        resultSnakeCase,
        `Rara vez se utiliza en JavaScript puro, pero suele usarse en
        archivos JSON o APIs externas.`,
        'snakeCase'
    )

    const snakeUpperCaseString = new Variable(
        'SNAKE_UPPER_CASE',
        resultSnakeUpperCase,
        `Se utiliza en constantes globales, como valores de
        configuración inmutables como por ejemplo: <br>
        <i>const API_URL = 'http://api.com'</i>`,
        'snakeUpperCase'
    )

    const kebabCaseString = new Variable(
        'kebab-case',
        resultKebabCase,
        `Este no se utiliza en JS porque los guiones no son validos
        en identificadores pero su uso se encuentra en HTML
        en la declaración del valor de IDs, clases y nombres de carpetas
        o archivos. Ejemplo:<br>
        id='boton-input'`,
        'kebabCase'
    )

    const upperCaseString = new Variable(
        'UPPERCASE',
        resultUpperCase,
        `Es similar a UPPER_SNAKE_CASE, pero se suele utilizar en
        abreviaturas, modulos o librerias, ejemplo:<br>
        const XPRS = require('express')`,
        'upperCase'
    )

    const lowerCaseString = new Variable(
        'lowercase',
        resultLowerCase,
        `No es común en JS por su escasa distinción de palabras, pero
        se usa en claves de objetos JSON y configuraciones simples como:
        <br> let color = 'red'`,
        'lowerCase'
    )

    return [
        lowerCamelString,
        pascalCaseString,
        snakeCaseString,
        snakeUpperCaseString,
        kebabCaseString,
        upperCaseString,
        lowerCaseString
    ]
}

function executeStringConvertion () {

    if (TEXTAREA_VARIABLES.value) {

        const textAreaValorString = TEXTAREA_VARIABLES.value
        DIV_REGRESAR_MAIN_MENU.style.display = 'flex'

        TEXTAREA_VARIABLES.value = ''
        SPAN_RESULTADO_VARIABLE_CONVERSION.innerHTML = ''

        const stringAConvertir = textAreaValorString.trim()
        const arrayDeString = stringAConvertir.split(' ')

        const conversionDeVariables = getVariabletTypes(arrayDeString)
        
        for (elemento of conversionDeVariables) {
            console.log(`${elemento.name}`)

            //article
            const article = document.createElement('article')
            article.id = elemento.id
            
            //div h3 value
            const divOfH3AndPValue = document.createElement('div')

            //h3
            const h3Name = document.createElement('h3')
            h3Name.textContent = elemento.name

            //p value
            const pValue = document.createElement('p')
            pValue.textContent = elemento.value

            // div description
            const divPDescription = document.createElement('div')

            //p description
            const pDescription = document.createElement('p')
            pDescription.innerHTML = elemento.description

            divOfH3AndPValue.append(h3Name)
            divOfH3AndPValue.append(pValue)

            divPDescription.append(pDescription)

            article.append(divOfH3AndPValue)
            article.append(divPDescription)

            article.classList.add('article-variable')
            divOfH3AndPValue.classList.add('div-of-h3-and-p-value')
            h3Name.classList.add('h3-name')
            pValue.classList.add('p-value')
            divPDescription.classList.add('div-of-p-description')
            pDescription.classList.add('p-description')

            SPAN_RESULTADO_VARIABLE_CONVERSION.append(article)
        }
    }
}


INPUT_CONVERT_STRING.addEventListener('click', executeStringConvertion)

window.addEventListener('keyup', (event) => {

    if (event.key === 'Enter') {
        executeStringConvertion()
    }
})