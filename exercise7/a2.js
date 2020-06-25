let margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let main = d3.select("#my_dataviz")
;

let svg = main.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
;

g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top + height})`)
;

dots = g.append('g');

let label = main.append("div")
    .attr("class", "tooltip")
    .style('opacity', 0)

d3.csv("two.csv").then(function (data) {
    xScale = d3.scaleLinear()
        .domain([0, d3.max(d3.extent(data, d => +d.one))])
        .range([0, width])
        .nice()
    ;

    xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickSize(5)
        .tickPadding(5)
    ;

    yScale = d3.scaleLinear()
        .domain([0, d3.max(d3.extent(data, d => +d.two))])
        .range([0, -height])
        .nice()
    ;

    yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10)
        .tickSize(5)
        .tickPadding(5)
    ;

    dots.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(+d.one);
        })
        .attr("cy", function (d) {
            return yScale(+d.two);
        })
        .attr("r", 4)
        .style("fill", "red")
        .on("mouseover", function (d) {
            label.html(`one: ${+d.one} <br> two: ${+d.two}`)
            label.transition()
                .style('opacity', 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
            ;
        })
        .on("mouseout", function (d) {
            label.transition()
                .style('opacity', 0)
        });

    gX = g.append('g').call(xAxis);
    gY = g.append('g').call(yAxis);

    let zoom = d3.zoom()
        .scaleExtent([1, 40])
        .on("zoom", zoomed)
    ;

    svg.call(zoom);

    function zoomed() {
        dots.attr("transform", d3.event.transform);
        gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
        gY.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
    }

    main.append('p')
        .text('Mean: ' + d3.mean(data, d => +d.one))
    ;

    main.append('p')
        .text('Median: ' + d3.median(data, d => +d.one))
    ;

    main.append('p')
        .text('Mean: ' + d3.mean(data, d => +d.two))
    ;

    main.append('p')
        .text('Median: ' + d3.median(data, d => +d.two))
    ;

    main.append('p')
        .text('Kovarianz: ' + covariance(data))
    ;

    main.append('p')
        .text('Korellationskoeffizient: ' + correlation(data))
    ;

})

const covariance = (data) => {
    const meanOne = d3.mean(data, d => +d.one);
    const meanTwo = d3.mean(data, d => +d.two);
    let ret = 0;
    let pro = 0;
    for (i = 0; i < data.length; i++) {
        let one = data[i].one - meanOne;
        let two = data[i].two - meanTwo;
        pro = one * two
        ret += pro;
    }
    return ret / data.length;
}

const correlation = (data) => {
    let one = d3.deviation(data, d => +d.one);
    let two = d3.deviation(data, d => +d.two);
    let cov = covariance(data);
    return cov / (one * two);
}