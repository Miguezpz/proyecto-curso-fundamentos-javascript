const INPUT_TEXT_TASK = document.getElementById('input-text-task')
const BUTTON_TASK_ADD = document.getElementById('button-task-add')
const SPAN_TASKS = document.querySelector('.span-tasks')

let arrayTasks = new Array()


function createButtonId (keyword) {

    let arrayOfKeyWord = keyword.split(' ')

    let transformedArray = arrayOfKeyWord.map((word) => {
        return word.toLowerCase() 
    })

    transformedArray.push('buttonId')
    let newId = transformedArray.join('-')
    return newId
}

BUTTON_TASK_ADD.addEventListener('click', () => {

    let newTask = INPUT_TEXT_TASK.value.trim()
    INPUT_TEXT_TASK.value = ''
    
    if (newTask) {

        //main div
        const divContainer = document.createElement('div')
        divContainer.classList.add('task-container')
         
        //p element
        const elementoP = document.createElement('p')
        elementoP.textContent = newTask


        //delete button
        const deleteButton = document.createElement('button')
        deleteButton.textContent = '❌'
        deleteButton.id = createButtonId(newTask)

        divContainer.append(elementoP)
        divContainer.append(deleteButton)
        SPAN_TASKS.append(divContainer)

        console.log('new task')

    } else {
        console.log('enter task')
    }
})