const testRegex = ev => {
    e = ev.target

    if(e.value === "") {
        resetInput(e)
        return
    }
    const regexStr = document.querySelector('#regex-input').value
    const regex = new RegExp(regexStr, 'm')

    e.style.backgroundColor = regex.test(e.value) ? "lightgreen" : "salmon"
}

const resetInput = input => {
    input.style.backgroundColor = 'white'
    input.style.border = '1px solid gray'
    input.style.borderRadius = '2px'
}

const createRegexTestInput = () => {
    const div = document.createElement('div')
    div.className = 'tegex-tests'

    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = "Insira string de teste"
    input.style.width = "675px"
    input.addEventListener('input', e => testRegex(e))

    const button = document.createElement('button')
    button.innerHTML = '+'
    button.addEventListener('click', e => newTest(e))

    div.appendChild(input)
    div.appendChild(button)
    
    document.querySelector('#regex').appendChild(div)
}

const newTest = ev => {
    e = ev.target

    createRegexTestInput()

    e.parentElement.removeChild(e)
}

createRegexTestInput()