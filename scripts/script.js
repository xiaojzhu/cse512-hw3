var graph;
var dataset;
var color_set = d3.scale.linear()
  .range(["#3182bd", "#f33"]);

d3.csv('Prestige2.csv', function(data) {
  dataset = data.sort(function(row1, row2){return d3.ascending(row1.name, row2.name)});


  graph = d3.parcoords()('#wrapper')
            .data(data)
            .alpha(0.4)
            .mode("queue")
            .rate(5)
            .render()
            .interactive()
            .brushable()
            .reorderable()
            
// add instruction text
   var instructions = "-Drag around axis to begin brush. -Click axis to clear brush. -Click a label to color data based on axis values. -Hover on each line to highlight."
  /*change_color("weight (lb)");*/

/*  d3.select("#wrapper svg").append("text")
  .text(instructions)
  .attr("text-anchor", "middle")
  .attr("text-decoration", "overline")
  .attr("transform", "translate(" + graph.width()/2 + "," + (graph.height()-5) + ")");;
*/
// set the initial coloring based on the 6rd column
update_colors(d3.keys(data[0])[5]);

 // click label to activate coloring
graph.svg.selectAll(".dimension")
    .on("click", update_colors)
    .selectAll(".label")
      .style("font-size", "14px"); // change font sizes of selected lable

//add hover event
d3.select("#wrapper svg")
  .on("mousemove", function() {
      var mousePosition = d3.mouse(this);         
      highlightLineOnClick(mousePosition, true); //true will also add tooltip
  })
  .on("mouseout", function(){
    cleanTooltip();
    graph.unhighlight();
  });

/*  graph.svg
       .selectAll(".dimension")
       .on("click", change_color);
*/
  var grid = d3.divgrid();
  d3.select("#grid")
      .datum(data) //.slice(0,10)) 
      .call(grid)
      .selectAll(".row")
      .on({
        "mouseover": function(d) { graph.highlight([d]) },
        "mouseout": graph.unhighlight
      });


  graph.on("brush", function(d) {
    d3.select("#grid")
      .datum(d /*.slice(0,10)*/)
      .call(grid)
      .selectAll(".row")
      .on({
        "mouseover": function(d) { graph.highlight([d])},
        "mouseout": graph.unhighlight
      });
  });
});






   // Remove all but selected from the dataset
  d3.select("#keep-data")
    .on("click", function() {
      new_data = graph.brushed();
      if (new_data.length == 0) {
        alert("Please do not select all the data when keeping/excluding");
        return false;
      }
      callUpdate(new_data);
    });

  // Exclude selected from the dataset
  d3.select("#exclude-data")
    .on("click", function() {
      new_data = _.difference(dataset, graph.brushed());
      if (new_data.length == 0) {
        alert("Please do not select all the data when keeping/excluding");
        return false;
      }
      callUpdate(new_data);
    });
    
  
  d3.select("#reset-data")
     .on("click", function() {
           callUpdate(dataset);
     });
  

var color_scale = d3.scale.linear()
                    .domain([-2,-0.5,0.5,2])
                    .range(["#DE5E60", "steelblue", "steelblue", "#98df8a"])
                    .interpolate(d3.interpolateLab);

/*function change_color(dimension) {
  graph.svg.selectAll(".dimension")
    .style("font-weight", "normal")
    .filter(function(d) { return d == dimension; })
    .style("font-weight", "bold")

  graph.color(zcolor(graph.data(),dimension)).render()
}

function zcolor(col, dimension) {
  var z = zscore(_(col).pluck(dimension).map(parseFloat));
  return function(d) { return color_scale(z(d[dimension]))}
};

function zscore(col) {
  var n = col.length,
  mean = _(col).mean(),
  sigma = _(col).stdDeviation();

  return function(d) {
    return (d-mean)/sigma;
  }; 
};*/

function callUpdate(data) {
         graph.data(data).brush().render().updateAxes();       
}


//for lengend of occupation types
  $(function() {
    var types =
      ["Professional","Blue Collar","White Collar"];
    var Typecolors = {
      "Professional" : '#1b9e77',
      "Blue Collar" : '#1f77b4',
      "White Collar" : '#ff9896'}
       _(types).each(function(group) {
      $('#legend').append("<div class='item'><div class='color' style='background: " + Typecolors[group] + "';></div><div class='key'>" + group + "</div></div>");
       });
  });

//function defination for added features in parcood 
// update color and font weight of chart based on axis selection
// modified from here: https://syntagmatic.github.io/parallel-coordinates/
function update_colors(dimension) { 
  // change the fonts to bold
  graph.svg.selectAll(".dimension")
    .style("font-weight", "normal")
    .filter(function(d) { return d == dimension; })
      .style("font-weight", "bold");

  // change color of lines
  // set domain of color scale
  var values = graph.data().map(function(d){return parseFloat(d[dimension])}); 
  color_set.domain([d3.min(values), d3.max(values)]);
  
  // change colors for each line
  graph.color(function(d){return color_set([d[dimension]])}).render();
};    



// Add highlight for every line on click
function getCentroids(data){
  // “this function returns centroid points for data. I had to change the source
  // for parallelcoordinates and make compute_centroids public.
  // I assume this should be already somewhere in graph and I don't need to recalculate it
  // but I couldn't find it so I just wrote this for now”--reference
  var margins = graph.margin();
  var graphCentPts = [];
  
  data.forEach(function(d){
    
    var initCenPts = graph.compute_centroids(d).filter(function(d, i){return i%2==0;});
    
    // move points based on margins
    var cenPts = initCenPts.map(function(d){
      return [d[0] + margins["left"], d[1]+ margins["top"]]; 
    });

    graphCentPts.push(cenPts);
  });

  return graphCentPts;
}

function getActiveData(){
  // I'm pretty sure this data is already somewhere in graph
  if (graph.brushed()!=false) return graph.brushed();
  return graph.data();
}

function isOnLine(startPt, endPt, testPt, tol){
  // check if test point is close enough to a line
  // between startPt and endPt. close enough means smaller than tolerance
  var x0 = testPt[0];
  var y0 = testPt[1];
  var x1 = startPt[0];
  var y1 = startPt[1];
  var x2 = endPt[0];
  var y2 = endPt[1];
  var Dx = x2 - x1;
  var Dy = y2 - y1;
  var delta = Math.abs(Dy*x0 - Dx*y0 - x1*y2+x2*y1)/Math.sqrt(Math.pow(Dx, 2) + Math.pow(Dy, 2)); 
  //console.log(delta);
  if (delta <= tol) return true;
  return false;
}

function findAxes(testPt, cenPts){
  // finds between which two axis the mouse is
  var x = testPt[0];
  var y = testPt[1];

  // make sure it is inside the range of x
  if (cenPts[0][0] > x) return false;
  if (cenPts[cenPts.length-1][0] < x) return false;

  // find between which segment the point is
  for (var i=0; i<cenPts.length; i++){
    if (cenPts[i][0] > x) return i;
  }
}

function cleanTooltip(){
  // removes any object under #tooltip is
  graph.svg.selectAll("#tooltip")
      .remove();
}

function addTooltip(clicked, clickedCenPts){
  
  // sdd tooltip to multiple clicked lines
    var clickedDataSet = [];
    var margins = graph.margin()

    // get all the values into a single list
    // I'm pretty sure there is a better way to write this is Javascript
    for (var i=0; i<clicked.length; i++){
      for (var j=0; j<clickedCenPts[i].length; j++){
        if (j==(clickedCenPts[i].length-1)){
          var text = d3.values(clicked[i])[0];
        }
        else{
          var text = d3.values(clicked[i])[j+1];
        }
        // not clean at all!
        var x = clickedCenPts[i][j][0] - margins.left;
        var y = clickedCenPts[i][j][1] - margins.top;
        clickedDataSet.push([x, y, text]);
    }
  };

  // add rectangles
  var fontSize = 14;
  var padding = 2;
  var rectHeight = fontSize + 2 * padding; //based on font size

  graph.svg.selectAll("rect[id='tooltip']")
          .data(clickedDataSet).enter()
          .append("rect")
          .attr("x", function(d) { return d[0] - d[2].length * 5;})
      .attr("y", function(d) { return d[1] - rectHeight + 2 * padding; })
      .attr("rx", "2")
      .attr("ry", "2")
      .attr("id", "tooltip")
      .attr("fill", "grey")
      .attr("opacity", 0.9)
      .attr("width", function(d){return d[2].length * 10;})
      .attr("height", rectHeight);

  // add text on top of rectangle
  graph.svg.selectAll("text[id='tooltip']")
      .data(clickedDataSet).enter()
        .append("text")
      .attr("x", function(d) { return d[0];})
      .attr("y", function(d) { return d[1]; })
      .attr("id", "tooltip")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .attr("font-size", fontSize)
          .text( function (d){ return d[2];})    
}

function getClickedLines(mouseClick){
    var clicked = [];
    var clickedCenPts = [];

  // find which data is activated right now
  var activeData = getActiveData();

  // find centriod points
  var graphCentPts = getCentroids(activeData);

    if (graphCentPts.length==0) return false;

  // find between which axes the point is
    var axeNum = findAxes(mouseClick, graphCentPts[0]);
    if (!axeNum) return false;
    
    graphCentPts.forEach(function(d, i){
      if (isOnLine(d[axeNum-1], d[axeNum], mouseClick, 2)){
        clicked.push(activeData[i]);
        clickedCenPts.push(graphCentPts[i]); // for tooltip
      }
  });
  //add graphcentPts in the beginning of each line 
    for (var i=0; i<clicked.length; i++){
      var x = clickedCenPts[i][0][0];
        var y = clickedCenPts[i][0][1]-15;
        clickedCenPts[i].push([x,y]);
  };

  return [clicked, clickedCenPts]
}


function highlightLineOnClick(mouseClick, drawTooltip){
  
  var clicked = [];
    var clickedCenPts = [];
  
  clickedData = getClickedLines(mouseClick);

  if (clickedData && clickedData[0].length!=0){

    clicked = clickedData[0];
      clickedCenPts = clickedData[1];

      // highlight clicked line
      graph.highlight(clicked);
    
    if (drawTooltip){
      // clean if anything is there
      cleanTooltip();
        // add tooltip
        addTooltip(clicked, clickedCenPts);
    }

  }
};
