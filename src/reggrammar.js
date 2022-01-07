const table = document.getElementById("table-grammar");

function addRow(){
    let row = document.createElement('tr');
    let html = `
        <td>
            <input type='text'>
        </td>
        <td>→</td>
            <td><input type='text'>
        </td>
    `;
    row.innerHTML = html;
    table.appendChild(row);
}


function deleteRow(){
    table.removeChild(table.lastChild);
}

function buildJson(arr){
    let result = new Array();

    for(let j=0; j<arr.length;j++){
        for(let k=0; k<arr[j].RHS.length;k++){
            let goesTo = arr[j].RHS[k][1];
            let receives = arr[j].RHS[k][0];
            if(typeof receives == 'undefined') receives = "";
            if(typeof goesTo == 'undefined') goesTo = null;

            result.push({"name": arr[j].LHS, "receives": receives, "goesTo": goesTo});
        }
    }  
    return result;
}

function tableToJson(){
    let arr = new Array();
    let result;
    
    for(let i=1; i<table.rows.length;i++){
        arr.push({
            "LHS": table.rows[i].cells[0].firstChild.value, 
            "RHS": table.rows[i].cells[2].firstChild.value.split("|")
        });
    }

    result = buildJson(arr);
    
    return result
}

const grammarInterpreter = (grammar, string, index = 0, name = 'S') => {
    const nodes = grammar.filter(node =>
        node.name == name &&
        (node.receives == string[index] || node.receives == '')
    )

    for(i = 0; i < nodes.length; i++) {
        if((index >= string.length - 1) && (nodes[i].goesTo === null)) return true
        if((typeof string[index] === 'undefined') || (nodes[i].goesTo === null)) return false

        if(grammarInterpreter(grammar, string, index+1, nodes[i].goesTo)) return true
    }

    return false
}

const createGrammarTestInput = () => {
    const div = document.createElement('div')
    div.className = 'grammar-tests'

    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = "Insira string de teste"
    input.style.width = "675px"
    input.addEventListener('input', e => {
        e.target.style.backgroundColor = 'white'
        e.target.style.border = '1px solid gray'
        e.target.style.borderRadius = '2px'
    })

    const button = document.createElement('button')
    button.innerHTML = '+'
    button.addEventListener('click', e => newGrammarTest(e))

    div.appendChild(input)
    div.appendChild(button)
    
    document.querySelector('#reggrammar').appendChild(div)
}

const newGrammarTest = ev => {
    e = ev.target

    createGrammarTestInput()

    e.parentElement.removeChild(e)
}

createGrammarTestInput()

const testGrammar = () => {
    const grammar = tableToJson()
    const tests = document.querySelectorAll('#reggrammar > .grammar-tests')
    console.log(grammar)

    tests.forEach(div => {
        const input = div.children[0]
        const test = input.value

        input.style.backgroundColor = grammarInterpreter(grammar, test) ? "lightgreen" : "salmon"
    })
}