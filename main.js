var diameter = 960;

// var svg = d3.select('#content').append('svg')
//   .attr('width', diameter)
//   .attr('height', diameter);

var bubble = d3.layout.pack()
  .size([diameter, diameter])
  .padding(3)
  .value(function(d) {return d.size;})

d3.json("data/data.json", function(error, data) {
  var bubArr = processData(data);

  _.map(bubArr.children, function(d,i) {

    var session = d3.select('body').append('div')
      .attr('class', 'col-md-3')

    var svg = session.append('svg')
      .attr('width', 300)
      .attr('height', 300)

    var nodes = bubble.nodes(d)
      .filter(function(d) { return !d.children; })

    var vis = svg.selectAll('circle')
      .data(nodes, function(d, i) { return i; });

    vis.enter().append('circle')
      .attr('transform', function(d) { return 'translate(' + d.x/3 + ',' + d.y/3 + ')';})
      .attr('r', function(d) { return d.r/4; })
      .attr('class', function(d) { return d.className; });

  });

  // var nodes = bubble.nodes(bubArr)
  //   .filter(function(d) { return !d.children; }); // filter out the outer bubble

  // var vis = svg.selectAll('circle')
  //   .data(nodes, function(d, i) { return i; });

  // vis.enter().append('circle')
  //   .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')';})
  //   .attr('r', function(d) { return d.r; })
  //   .attr('class', function(d) { return d.className; }); // class name not appending


});


function processData(data) {
  // { "name": 1, "children": [{"name": theta, "size": 0.45}, {"name": theta, "size": 0.45} ]}

  var obj = data.mentalState;
  var childrenArr = [];

  for(var prop in obj) {
    var newArr = [];

    for(var item in obj[prop]) {
      newArr.push({name: item, size: obj[prop][item], className: item.toLowerCase()})
    }

    childrenArr.push({name: prop, children: newArr})
  }

  return {children: childrenArr};
}

d3.select(self.frameElement).style("height", diameter + "px");