const automataInterpreter = (automata, string, index=0, name='q0') => {
    const params = {
        automata: automata,
        string: string,
        index: index,
        name: name
    }
    const states = params.automata.filter(state => 
        state.name == name &&
        (state.receives == params.string[params.index] || state.receives == '')
    )
    let nextState

    for(i = 0; i < states.length; i++) {
        nextState = params.automata.filter(state => state.name == states[i].goesTo)
        if(nextState.length == 0) return false

        if((params.index >= string.length -1) && (nextState[0].final === true)) return true
        if((typeof params.string[params.index] === 'undefined') || (states[i].goesTo === null)) return false

        if(automataInterpreter(params.automata, params.string, params.index+1, states[i].goesTo)) return true
    }

    return false
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
    const input = document.querySelector('#automata-test-input')

    const automata = tableToJsonFA()
    const test = input.value
    
    const response = automataInterpreter(automata, test)

    input.style.backgroundColor = response ? 'lightgreen' : 'salmon'
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
