var diameter = 560;

d3.json("data/data1.json", function(error, data) {

  var dataScale = d3.scale.linear()
    .domain([0,1])
    .range([20,125]);

  var bubble = d3.layout.pack()
    .size([diameter, diameter])
    .padding(3)
    .value(function(d) {
      return d.size;
    })
    .sort(function(a,b) {
      return a.name - b.name;
    })
    .radius(function(d) {
      return dataScale(d)
    })

  var bubArr = processData(data);

  _.map(bubArr.children, function(d,i) {

    var session = d3.select('#content').append('div')
      .attr('class', 'box')

    var svg = session.append('svg')
      .attr('width', 350)
      .attr('height', 500)

    var nodes = bubble.nodes(d)
      .filter(function(d) { // filter out parent
        console.log(d)
        return !d.children; })

    // console.log(nodes)

    var vis = svg.selectAll('circle')
      .data(nodes, function(d, i) {
        // console.log(d)
        return i; });

    vis.enter().append('circle')
      .attr('transform', function(d) { return 'translate(' + d.x/2 + ',' + d.y/2.0 + ')';})
      .attr('r', function(d) {
        // console.log(d.r)
        return d.r/1.75; })
      .attr('class', function(d) { return d.className; })

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