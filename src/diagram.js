let nodeDataArray = [];

let linkDataArray = [
  //{to: "q1", from: "q0", color: "red", progress: "true", text: "a"},
  //{to: "q2", from: "q1", color: "red", text: "b"},
  //{to: "q1", from: "q1", color: "red", text: "b"}
];

let flagConnect = 0;

let index = 0;

function init(){
  let $ = go.GraphObject.make;

  let nodetext = "";

  let CircleParams = {
    parameter1: 2,  
    spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight  
  };

  myDiagram = $(go.Diagram, "canvas",
          {
            "animationManager.initialAnimationStyle": go.AnimationManager.None,
            "InitialAnimationStarting": function(e) {
                var animation = e.subject.defaultAnimation;
                animation.easing = go.Animation.EaseOutExpo;
                animation.duration = 900;
                animation.add(e.diagram, 'scale', 0.1, 1);
                animation.add(e.diagram, 'opacity', 0, 1);
            },
              "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
              "clickCreatingTool.archetypeNodeData": {
                key: String(index++),
                text: "q"+String(index++)
              },
              "undoManager.isEnabled": true,
              positionComputation: function (diagram, pt) {
                return new go.Point(Math.floor(pt.x), Math.floor(pt.y));
              }
          });

  // myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

  /*
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
*/

//=====================================================================
myDiagram.nodeTemplate =
$(go.Node, "Auto",
  {
    locationSpot: go.Spot.Top,
    isShadowed: true, shadowBlur: 1,
    shadowOffset: new go.Point(0, 1),
    shadowColor: "rgba(0, 0, 0, .14)"
  },
  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  // define the node's outer shape, which will surround the TextBlock
  $(go.Shape, "Circle", CircleParams,
    {
      name: "SHAPE", fill: "yellow", strokeWidth: 0,
      stroke: null,
      portId: "",  // this Shape is the Node's port, not the whole Node
      fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
      toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
      cursor: "pointer"
    }),
  
  //$(go.Shape, "TriangleRight", { width: 20, height: 20, margin: 4, fill: null }),
  
  $(go.TextBlock,
    {
      font: "bold small-caps 11pt helvetica, bold arial, sans-serif", margin: 10, stroke: "rgba(0, 0, 0, .87)",
      editable: true  // editing the text automatically updates the model data
    },
    new go.Binding("text").makeTwoWay())
);
//==============================================================================

  myDiagram.linkTemplate = 
      $(go.Link,
        { curve: go.Link.Bezier },
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

function addNodeAndLink(e, obj) {
  var adornment = obj.part;
  var diagram = e.diagram;
  diagram.startTransaction("Add State");

  // get the node data for which the user clicked the button
  var fromNode = adornment.adornedPart;
  var fromData = fromNode.data;
  // create a new "State" data object, positioned off to the right of the adorned Node
  var toData = { text: "new" };
  var p = fromNode.location.copy();
  p.x += 200;
  toData.loc = go.Point.stringify(p);  // the "loc" property is a string, not a Point object
  // add the new node data to the model
  var model = diagram.model;
  model.addNodeData(toData);

  // create a link data from the old node data to the new node data
  var linkdata = {
    from: model.getKeyForNodeData(fromData),  // or just: fromData.id
    to: model.getKeyForNodeData(toData),
    text: "transition"
  };
  // and add the link data to the model
  model.addLinkData(linkdata);

  // select the new Node
  var newnode = diagram.findNodeForData(toData);
  diagram.select(newnode);

  diagram.commitTransaction("Add State");

  // if the new node is off-screen, scroll the diagram to show the new node
  diagram.scrollToRect(newnode.actualBounds);
}
