function addRow(){
    let table = document.getElementById("table-grammar");
    let row = document.createElement('tr');
    let html = "<td>" + "<input type='text'>"+ "</td><td>" + "→" + "</td><td>" + "<input type='text'>"+ "</td>";
    row.innerHTML = html;
    table.appendChild(row);
}


function deleteRow(){
    let table = document.getElementById("table-grammar");
    table.removeChild(table.lastChild);
}


function textToJson(){
    let tabble = document.getElementById("table-grammar");
    
}