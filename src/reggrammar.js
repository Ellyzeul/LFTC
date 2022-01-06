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

function buildJson(arr){
    let result = new Array();

    for(let j=0; j<arr.length;j++){
        for(let k=0; k<arr[j].RHS.length;k++){
            let goesTo = arr[j].RHS[k][1];
            let receives = arr[j].RHS[k][0];
            if(goesTo == null && receives == null){
                receives = "";
                goesTo = null;
            }
            result.push({"name": arr[j].LHS, "receives": receives, "goesTo": goesTo});
        }
    }  
    return result;  
    //return JSON.parse(result);
}

function tableToJson(){
    let arr = new Array();
    let result;
    
    for(let i=1; i<table.rows.length;i++){
        arr.push({"LHS": table.rows[i].cells[0].firstChild.value, "RHS": table.rows[i].cells[2].firstChild.value.split("|")});
    }

    result = buildJson(arr);
    
    console.log(result);
    //return JSON.parse(result);
}