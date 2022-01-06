const table = document.getElementById("table-grammar");

function addRow(){
    let row = document.createElement('tr');
    let html = "<td>" + "<input type='text'>"+ "</td><td>" + "→" + "</td><td>" + "<input type='text'>"+ "</td>";
    row.innerHTML = html;
    table.appendChild(row);
}


function deleteRow(){
    table.removeChild(table.lastChild);
}


function tableToJson(){
    let arr = new Array();
    for(let i=1; i<table.rows.length;i++){
        arr.push({"LHS": table.rows[i].cells[0].firstChild.value, "RHS": table.rows[i].cells[2].firstChild.value.split("|")});
    }
    console.log(arr);
    //return JSON.parse(arr);
}
