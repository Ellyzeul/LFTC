const tableFA = document.getElementById("table-finite-automata");

function addRowFA(){
    let row = document.createElement('tr');
    let html = `
        <td>
            <input type='text'>
        </td>
        <td>
            <input type='text'>
        </td>
            <td><input type='text'>
        </td>
    `;
    row.innerHTML = html;
    tableFA.appendChild(row);
}

function deleteRowFA(){
    tableFA.removeChild(tableFA.lastChild);
}
 

/*
function addcolumnFA(){
    let rows = tableFA.rows.length;
    let column = document.createElement('th');

    tableFA.appendChild(column);
    
    let cells = '';

    for(let i=0; i<rows; i++){
        cells = cells + 
    }
}*/

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
                arr.push({"name": name[name.length-1], "receives": receives, "goesTo": goesTo[goesTo.length-k], "final": final});
            };

            k=0;
            //arr.push({"name": name[name.length-1], "receives": receives, "goesTo": goesTo, "final": final});
        }
    }

    console.log(arr);
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


[
  {name:'q0', receives:'a', goesTo:'q1', final:false},
  {name:'q0', receives:'a', goesTo:'q2', final:false},
  {name:'q0', receives:'b', goesTo:'q1', final:false},
  {name:'q1', receives:'a', goesTo:'q2', final:false},
  {name:'q1', receives:'b', goesTo:'q2', final:false},
  {name:'q2', receives:'a', goesTo:'q2', final:true},
]

    |  a  |  b
q0  |q1,q2| q1
q1  |  q2 | q2
*q2 |  q2 |


*/