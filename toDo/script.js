const INPUT_TEXT_TASK = document.getElementById('input-text-add-task')
const BUTTON_TASK_ADD = document.getElementById('button-add-task')
const SPAN_TASKS = document.querySelector('.span-tasks')
const BUTTON_EDIT_DONE_TASKS = document.getElementById('button-edit-done-tasks')

let arrayTasks = new Array()

class NewTask {
    constructor (
        taskValue, 
        divContainerId, 
        checkboxId, 
        deleteButtonId,
        pTextId    
    ) {
        this.taskValue = taskValue
        this.divContainerId = divContainerId
        this.checkboxId = checkboxId
        this.deleteButtonId = deleteButtonId
        this.pTextId = pTextId
    }
}

function addEventListenersToButtonAndCheckBox (taskObj) {

    let idOfButton = taskObj.deleteButtonId
    let buttonDOMElement = document.getElementById(idOfButton)
    
    let idOfCheckbox = taskObj.checkboxId
    let checkBoxDOMElement = document.getElementById(idOfCheckbox)

    if (!buttonDOMElement || !checkBoxDOMElement) {
        console.error("Error: Elementos del DOM no encontrados.");
        return;
    }


    function removeTaskFromDOM () {

        //It removes the element from DOM
        const divTaskContainerDOMElement = document.getElementById(taskObj.divContainerId)
        divTaskContainerDOMElement.remove()

        //It removes eventListeners
        buttonDOMElement.removeEventListener('click', removeTaskFromDOM)
        checkBoxDOMElement.removeEventListener('change', checkOrUncheckTask)

        //It removes the task element from arrayTasks
        const indexCurrentTaskElement = arrayTasks.findIndex(element => element === taskObj)
        arrayTasks.splice(indexCurrentTaskElement, 1)

        if (arrayTasks.length < 1) {
            BUTTON_EDIT_DONE_TASKS.textContent = 'Editar'
        }
    }


    function checkOrUncheckTask () {

        const pDOMElement = document.getElementById(taskObj.pTextId)

        if (checkBoxDOMElement.checked) {
            pDOMElement.style.textDecoration = 'line-through'
            pDOMElement.style.color = 'black'

        } else if (!checkBoxDOMElement.checked) {
            pDOMElement.style.textDecoration = 'none'
            pDOMElement.style.color = 'rgb(255, 255, 255)'
        }
    }


    //Actions for delete button element
    buttonDOMElement.addEventListener('click', removeTaskFromDOM)
    //Actions for check box element
    checkBoxDOMElement.addEventListener('change', checkOrUncheckTask)
}


function showButtonAndHideCheckBox (buttonArray, checkBoxArray) {

    // It shows the delete button element
    buttonArray.forEach(element => {
        const DOMElement = document.getElementById(element)
        DOMElement.style.display = 'flex'
    })

    //it hides the check box element
    checkBoxArray.forEach(element => {
        const DOMElement = document.getElementById(element)
        DOMElement.style.display = 'none'
    })
}


function showCheckBoxAndHideButton (buttonArray, checkBoxArray) {

    // It hides the delete button element
    buttonArray.forEach(element => {
        const DOMElement = document.getElementById(element)
        DOMElement.style.display = 'none'
    })

    //it shows the check box element
    checkBoxArray.forEach(element => {
        const DOMElement = document.getElementById(element)
        DOMElement.style.display = 'flex'
    })
}


function createElementIdentification (keyword, indentityType) {

    let arrayOfKeyWord = keyword.split(' ')
    let randomNumber = Math.floor(Math.random() * (5000 - 10 + 1) + 10)

    let transformedArray = arrayOfKeyWord.map((word) => {
        return word.toLowerCase() 
    })

    transformedArray.push(indentityType, randomNumber)
    let newId = transformedArray.join('-')
    return newId
}



function addNewTaskToSpanElement () {

    let newTask = INPUT_TEXT_TASK.value.trim()

    if (newTask.length > 0) {

        INPUT_TEXT_TASK.value = ''
        const buttonValue = BUTTON_EDIT_DONE_TASKS.textContent

        //main div
        const divContainer = document.createElement('div')
        const divContainerId = createElementIdentification(newTask, 'divContainer')
        divContainer.classList.add('task-element')
        divContainer.id = divContainerId

        // p div
        const divP = document.createElement('div')
        divP.classList.add('div-p')
         
        //p element
        const pElement = document.createElement('p')
        const pElementClass = 'task-p-element'
        const pElementId = createElementIdentification(newTask, 'pElement')
        pElement.textContent = newTask
        pElement.classList.add(pElementClass)
        pElement.id = pElementId

        //checkbox & button div
        const divCheckboxAndButton = document.createElement('div')
        divCheckboxAndButton.classList.add('div-checkbox-and-button')

        //checkbox element
        const checkbox = document.createElement('input')
        const checkboxClass = 'task-checkbox-element'
        const checkboxId = createElementIdentification(newTask, 'checkboxId')
        checkbox.type = 'checkbox'
        checkbox.classList.add(checkboxClass)
        checkbox.id = checkboxId

        //delete button
        const deleteButton = document.createElement('button')
        const deleteButtonId = createElementIdentification(newTask, 'buttonId')
        deleteButton.textContent = '✖️'
        deleteButton.id = deleteButtonId
        deleteButton.classList.add('task-button-element')
        

        //It solves a bug by starting with the right DOM element's display value
        if (buttonValue === 'Listo') {
            deleteButton.style.display = 'flex'
            checkbox.style.display = 'none'

        } else if (buttonValue === 'Editar') {
            deleteButton.style.display = 'none'
            checkbox.style.display = 'flex'
        }

        //DOM elements injection
        divP.append(pElement)
        divCheckboxAndButton.append(checkbox)
        divCheckboxAndButton.append(deleteButton)
        divContainer.append(divP)
        divContainer.append(divCheckboxAndButton)
        SPAN_TASKS.append(divContainer)

        const taskObject = new NewTask(
            newTask,
            divContainerId,
            checkboxId,
            deleteButtonId,
            pElementId
        )

        arrayTasks.push(taskObject)
        addEventListenersToButtonAndCheckBox(taskObject)
    }
}

function switchDisplayedEditElements () {

    if (arrayTasks.length > 0) {

        console.log('se ejecutó el cambio de valor del boton');
        
        const buttonValue = BUTTON_EDIT_DONE_TASKS.textContent
        const arrayOfDeleteTaskButtons = arrayTasks.map(element => element.deleteButtonId)
        const arrayOfCompleteTaskCheckbox = arrayTasks.map(element => element.checkboxId)
    
        if (buttonValue === 'Editar') {
            BUTTON_EDIT_DONE_TASKS.textContent = 'Listo'
            showButtonAndHideCheckBox(arrayOfDeleteTaskButtons, arrayOfCompleteTaskCheckbox)

        } else if (buttonValue === 'Listo') {
            BUTTON_EDIT_DONE_TASKS.textContent = 'Editar' 
            showCheckBoxAndHideButton(arrayOfDeleteTaskButtons, arrayOfCompleteTaskCheckbox)
        }
    }
}


BUTTON_TASK_ADD.addEventListener('click', addNewTaskToSpanElement)

window.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && INPUT_TEXT_TASK.value) {
        addNewTaskToSpanElement()
    }
})

BUTTON_EDIT_DONE_TASKS.addEventListener('click', switchDisplayedEditElements)

//0... Escribir lógica para evitar id's duplicados en los numeros aleatorios generados.
//1... Continuar con los estilos en las tareas

/* 

Resolvi bug de boton al crear un nuevo task, agregar a commit.

He creado una clase para manejar crear un objeto por cada new task


*/