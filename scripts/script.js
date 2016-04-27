var graph;
var dataset;

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
            

  change_color("weight (lb)");

  graph.svg
       .selectAll(".dimension")
       .on("click", change_color);


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
      .datum(d.slice(0,10))
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

function change_color(dimension) {
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
};

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


