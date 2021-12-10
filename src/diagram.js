let nodeDataArray = [];

let linkDataArray = [
  {to: "q1", from: "q0", color: "red", progress: "true", text: "a"},
  {to: "q2", from: "q1", color: "red", text: "b"}
];

let flagConnect = 0;

function init(){
  let $ = go.GraphObject.make;

  myDiagram = $(go.Diagram, "canvas");

  // myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

  myDiagram.nodeTemplate = 
      $(go.Node, "Auto",
          $(go.Shape, "Circle", { fill: "yellow"},
              new go.Binding("fill", "color")
          ),
          $(go.TextBlock, "text", {margin: 10},
              new go.Binding("text", "key")
          ),

          {
            click: function(e, obj) { 
              let nodeClicked = obj.part.data.key;
              console.log("Clicked on " + nodeClicked); 
            },
            selectionChanged: function(part) {
                let shape = part.elt(0);
                shape.fill = part.isSelected ? "red" : "yellow";
              }
          }   

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


function reload(){
  myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}


function addElement(){
  let key = "q";
  key = key + String(nodeDataArray.length);
  nodeDataArray.push({ key: key, color: "yellow" });
  reload();
}

function connectElement(){
  flagConnect = flagConnect ? 0 : 1; 
  console.log(flagConnect);
};
