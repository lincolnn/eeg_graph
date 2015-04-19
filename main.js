var diameter = 560;

d3.json("data/data.json", function(error, data) {

  var bubble = d3.layout.pack()
    .size([diameter, diameter])
    .padding(3)
    .value(function(d) {return d.size;})

  var bubArr = processData(data);

  _.map(bubArr.children, function(d,i) {

    var session = d3.select('#content').append('div')
      .attr('class', 'col-md-2')

    var svg = session.append('svg')
      .attr('width', 400)
      .attr('height', 600)

    var nodes = bubble.nodes(d)
      .filter(function(d) { return !d.children; })

    var vis = svg.selectAll('circle')
      .data(nodes, function(d, i) { return i; });

    vis.enter().append('circle')
      .attr('transform', function(d) { return 'translate(' + d.x/2 + ',' + d.y/2.0 + ')';})
      .attr('r', function(d) { return d.r/1.75; })
      .attr('class', function(d) { return d.className; });

  });
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