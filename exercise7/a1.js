let cube = d3.select('body').append('div')
    .attr('id', 'cube')
    .style('margin-left', '0px')
    .style('margin-right', '0px')
    .style('margin-top', '0px')
    .style('margin-bottom', '0px')
    .style('width', '200px')
    .style('height', '200px')
    .style('background-color', 'blue')
;


cube.transition()
    .delay(1000)
    .duration(2000)
    .style('margin-left', '500px')
    .style('margin-right', '0px')
    .style('margin-top', '50px')
    .style('margin-bottom', '50px')
    .style('width', '100px')
    .style('height', '100px')
    .style('background-color', 'red')
;