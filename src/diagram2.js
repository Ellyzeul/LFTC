let nodeDataArray = [];

let linkDataArray = [
  //{to: "q1", from: "q0", color: "red", progress: "true", text: "a"},
  //{to: "q2", from: "q1", color: "red", text: "b"}
];

let flagConnect = 0;

function init(){
  let $ = go.GraphObject.make;
  let i = 0;
  

  myDiagram = $(go.Diagram, "canvas",
                {
                    "animationManager.initialAnimationStyle": go.AnimationManager.None,
                    "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
                    "clickCreatingTool.archetypeNodeData": { 
                        //key: "",//"q"+ String(nodeDataArray.length),
                        text: "new"
                    },
                    "undoManager.isEnabled": true,
                    click: function(e) { 
                        console.log("oi");  
                      }
                });
       
   myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

  myDiagram.nodeTemplate = 
      $(go.Node, "Auto",
        {
            locationSpot: go.Spot.Top,
            isShadowed: true, shadowBlur: 1,
            shadowOffset: new go.Point(0, 1),
            shadowColor: "rgba(0, 0, 0, .14)"
        },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),   

          $(go.Shape, "Circle", { 
              fill: "yellow",
              portId: "",
              fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
              toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
              cursor: "pointer"
            },
              new go.Binding("fill", "color")
          ),
          $(go.TextBlock, "text", {
              margin: 10,
              editable: true
            },
              new go.Binding("text", "text") //, "key"
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
          ),

          $(go.Panel, "Auto",
            $(go.Shape,  // the label background, which becomes transparent around the edges
              {
                strokeWidth: 1.5,
                fill: $(go.Brush, "Radial",
                  { 0: "rgb(245, 245, 245)", 0.7: "rgb(245, 245, 245)", 1: "rgba(245, 245, 245, 0)" }),
                stroke: null
              }),
            $(go.TextBlock, "transition",  // the label text
              {
                textAlign: "center",
                font: "9pt helvetica, arial, sans-serif",
                margin: 4,
                editable: true  // enable in-place editing
              },
              // editing the text automatically updates the model data
              new go.Binding("text").makeTwoWay())
          )
      );
}


function reload(){
  myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}


function addElement(){
  let key = "q";
  /*let init = 500;
  let end = 100;
  init += 1;
  end += 1;*/
  key = key + String(nodeDataArray.length);
  nodeDataArray.push({ 
      key: key, 
      text: key, 
      color: "yellow"
      //location: e//String(init)+String(end)
    });
  reload();
  alert("Os nomes dos elementos podem ser trocados. Basta clicar sobre o nome que deseja alterar"); 
}




/*
function connectElement(){
  flagConnect = flagConnect ? 0 : 1; 
  console.log(flagConnect);
};*/

function diagramToJson(){
  return myDiagram.model.toJson();
}