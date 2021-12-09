let nodeDataArray = [
  { key: "q0", color: "yellow" },
  { key: "q1", color: "yellow" }
];

let linkDataArray = [
  {to: "q1", from: "q0", color: "red"}
];

function init(){
  let $ = go.GraphObject.make;

  myDiagram = $(go.Diagram, "canvas");

  myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

  myDiagram.nodeTemplate = 
      $(go.Node, "Auto",
          $(go.Shape, "Circle", { fill: "yellow"},
              new go.Binding("fill", "color")
          ),
          $(go.TextBlock, "text", {margin: 10},
              new go.Binding("text", "key")
          )
      );

  myDiagram.linkTemplate = 
      $(go.Link,
          $(go.Shape, {strokeWidth: 3},
              new go.Binding("stroke", "color")
          ),

          $(go.Shape, {toArrow: "Standard", stroke: null},
              new go.Binding("fill", "color")
          )
      );
}

/*
function load(){
  myDiagram = $(go.Diagram, "canvas");

  myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

  myDiagram.nodeTemplate = 
      $(go.Node, "Auto",
          $(go.Shape, "Circle", { fill: "yellow"},
              new go.Binding("fill", "color")
          ),
          $(go.TextBlock, "text", {margin: 10},
              new go.Binding("text", "key")
          )
      );

  myDiagram.linkTemplate = 
      $(go.Link,
          $(go.Shape, {strokeWidth: 3},
              new go.Binding("stroke", "color")
          ),

          $(go.Shape, {toArrow: "Standard", stroke: null},
              new go.Binding("fill", "color")
          )
      );
}
*/

function addElement(){
  let key = "q";
  key = key + String(nodeDataArray.length);
  nodeDataArray.push({ key: key, color: "yellow" });
  console.log(nodeDataArray);
  //load();
}
