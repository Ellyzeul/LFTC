const automataInterpreter = (automata, string, index=0, name='q0') => {
    if(typeof string[index] == 'undefined') return false

    const states = automata.filter(state => 
        (state.receives === string[index] || state.receives === '')
        && state.name === name
    )
    const length = states.length
    const strLen = string.length
    let nextStates
    let nextLength

    for(let i = 0; i < length; i++) {
        nextStates = automata.filter(next => next.name === states[i].goesTo)
        nextLength = nextStates.length
        if(nextLength === 0) return false

        for(let j = 0; j < nextLength; j++) {
            if(nextStates[j].final && index === strLen-1) return true
            if(automataInterpreter(automata, string, index+1, nextStates[j].name)) return true
        }

    }

    return false
}

const automataStepByStep = (automata, string, index=0, name='q0') => {
    if(typeof string[index] == 'undefined') return [{
        message: "Fim da string atingido... Voltando",
        bool: false,
        code: 5
    }]

    const states = automata.filter(state => 
        (state.receives === string[index] || state.receives === '')
        && state.name === name
    )
    const length = states.length
    const strLen = string.length
    let nextStates
    let nextLength
    let result = []

    for(let i = 0; i < length; i++) {
        nextStates = automata.filter(next => next.name === states[i].goesTo)
        nextLength = nextStates.length
        if(nextLength === 0) {
            result = [{
                message: "Não há próximos estados... Voltando",
                state: states[i],
                bool: false,
                code: 3
            }, ...result]
            return result
        }

        for(let j = 0; j < nextLength; j++) {
            if(nextStates[j].final && index === strLen-1) {
                result = [{
                    message: "Final da string alcançado em um estado final, string valida!!",
                    state: states[i],
                    next: nextStates[j],
                    code: 0,
                    bool: true
                }, ...result]
                return result
            }
            result = automataStepByStep(automata, string, index+1, nextStates[j].name)
            if(result[0].bool) return [{
                state: states[i],
                next: nextStates[j],
                bool: true,
                code: 1
            }, ...result]
            else result = [{
                state: states[i],
                next: nextStates[j],
                code: 1
            }, ...result]
        }

    }

    if(length === 0) return [...result, {
        message:"Nenhum estado encontrado... Voltando",
        receives: string[index],
        bool: false,
        code: 4
    }]
    else return [...result, {
        message:"Não há outro estado a seguir... Sem mais ramificações, "+(index===0?"string inválida":"voltando"),
        receives: string[index],
        bool: false,
        code: 6
    }]
}

const tableFA = document.getElementById("table-finite-automata");

function addcolumnFA() {
    let row = tableFA.getElementsByTagName('tr');
    for(i=0;i<row.length;i++){
      row[i].innerHTML = row[i].innerHTML + "<td><input type='text'></td>";
    }
}

function deletecolumnFA(){
    let allRows = tableFA.rows;
    for (let i=0; i<allRows.length; i++) {
        if (allRows[i].cells.length > 1) {
            allRows[i].deleteCell(-1);
        }
    }
}

function addRowFA() {
    let row = tableFA.getElementsByTagName('tr');
    row = row[row.length-1].outerHTML;
    tableFA.innerHTML = tableFA.innerHTML + row;
    row = tableFA.getElementsByTagName('tr');
    row = row[row.length-1].getElementsByTagName('td');

    for(i=0;i<row.length;i++){
      row[i].innerHTML = "<td><input type='text'></td>";
    }
  }

function deleteRowFA(){
    let row = tableFA.getElementsByTagName('tr');
        if(row.length!='1'){
            row[row.length - 1].outerHTML='';
        }
}

function tableToJsonFA(){
    let arr = new Array();
    let columns = tableFA.rows[0].cells.length;
    let rows = tableFA.rows.length;
    let k=0;

    for(let i=1;i<columns;i++){
        for(let j=1;j<rows;j++){
            let name = tableFA.rows[j].cells[0].children[0].value.split('*');
            let receives = tableFA.rows[0].cells[i].children[0].value;
            let goesTo = tableFA.rows[j].cells[i].children[0].value.split(',');

            let final = name.length == 2 ? true : false;

            while(k<goesTo.length){
                k++;
                arr.push({"name": name[name.length-1], "receives": receives, "goesTo": goesTo[goesTo.length-k] != '' ? goesTo[goesTo.length-k] : null, "final": final});
            };

            k=0;
        }
    }

    return arr
}

const testAutomota = () => {
    const inputs = document.querySelectorAll('.automata-test-input')

    const automata = tableToJsonFA()

    inputs.forEach(input => {
        const test = input.value
        
        const response = automataInterpreter(automata, test)
    
        input.style.backgroundColor = response ? 'lightgreen' : 'salmon'
    })
}

const createAutomataTestInput = () => {
    const div = document.createElement('div')
    div.className = 'automata-tests'

    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = "Insira string de teste"
    input.style.width = "675px"
    input.className = "automata-test-input"
    input.addEventListener('input', e => {
        e.target.style.backgroundColor = 'white'
        e.target.style.border = '1px solid gray'
        e.target.style.borderRadius = '2px'
    })

    const button = document.createElement('button')
    button.innerHTML = '+'
    button.addEventListener('click', e => newAutomataTest(e))

    const stepButton = document.createElement('button')
    stepButton.innerHTML = 'step'
    stepButton.addEventListener('click', e => {
        const steps = automataStepByStep(
            tableToJsonFA(),
            e.target.parentElement.children[0].value
        )

        let htmlSteps = "<ul>"
        steps.forEach(step => {
            switch(step.code) {
                case 0:
                    htmlSteps = `${htmlSteps}<li>Estado atual: ${step.state.name} => Recebeu: ${step.state.receives} => Próximo estado: ${step.next.name} => ${step.message}</li>`
                    break
                case 1:
                    htmlSteps = `${htmlSteps}<li>Estado atual: ${step.state.name} => Recebeu: ${step.state.receives} => Próximo estado: ${step.next.name}</li>`
                    break
                case 3:
                    htmlSteps = `${htmlSteps}<li>Estado atual: ${step.state.name} => ${step.message}</li>`
                    break
                case 4:
                case 6:
                    htmlSteps = `${htmlSteps}<li>Recebeu: ${step.receives} => ${step.message}</li>`
                    break
                case 5:
                    htmlSteps = `${htmlSteps}<li>${step.message}</li>`
                    break
            }
        })
        const display = document.createElement('div')
        display.className = "modal"
        display.id = "step-by-step"

        const content = document.createElement('div')
        content.className = "modal-content"
        content.innerHTML = htmlSteps

        const close = document.createElement('span')
        close.id = "close-modal"
        close.innerHTML = "&times ou Esc"
        close.onclick = ev => {
            document.body.removeChild(ev.target.parentElement.parentElement)
        }

        content.prepend(close)
        display.appendChild(content)
        document.body.appendChild(display)
    })

    div.appendChild(input)
    div.appendChild(button)
    div.appendChild(stepButton)
    
    document.querySelector('#table-areaAF').appendChild(div)
}
createAutomataTestInput()

const newAutomataTest = ev => {
    e = ev.target

    createAutomataTestInput()

    e.parentElement.removeChild(e)
}

document.onkeydown = e => {
    if(e.which == 27) {
        const closeModal = document.querySelector("#close-modal")
        closeModal != null ? closeModal.click() : null
    }
}
/*
[
  {name:'q0', receives:'a', goesTo:'q1'},
  {name:'q0', receives:'b', goesTo:'q1'},
  {name:'q1', receives:'a', goesTo:'q1', final:true}
]

    | a | b
q0  | q1| q1
*q1 | q1| 

*/
