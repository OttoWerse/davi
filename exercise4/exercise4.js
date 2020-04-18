var height = 1000,
    width = 600,
    marginLeft = 10,
    marginRight = 10,
    marginTop = 10,
    marginBottom = 10,
    margin = 20
;

var svg = d3.select("body").append("svg")
    .attr("id", "main")
    .attr("width", width + marginLeft + marginRight)
    .attr("height", height + marginTop + marginBottom)
;

// A1a
currentHeight = marginTop
rect_height = 100
rect_width = 30
for (i = 0; i < 10; i++) {
    svg.append("rect")
        .attr("height", rect_height)
        .attr("width", rect_width)
        .attr("fill", d3.schemeCategory10[i])
        .attr("x", marginLeft + rect_width * i)
        .attr("y", currentHeight)
    ;
}

// A1b
currentHeight += (rect_height + margin)
for (i = 0; i < 10; i++) {
    svg.append("rect")
        .attr("height", rect_height)
        .attr("width", rect_width)
        .attr("fill", d3.schemeCategory10[9 - i])
        .attr("x", marginLeft + rect_width * i)
        .attr("y", currentHeight)
    ;
}

// A2
currentHeight += (rect_height + margin)
start = 0
translation = 120
steps = 7

var rtg = d3.scaleLinear()
    .domain([0, steps-1])
    .range([start, translation])
;

for (i = 0; i < 7; i++) {
    svg.append("rect")
        .attr("height", rect_height)
        .attr("width", rect_width)
        .attr("fill", d3.hsl(rtg(i), 1, 0.5))
        .attr("x", marginLeft + rect_width * i)
        .attr("y", currentHeight)
    ;
}

// A3a
currentHeight += (rect_height + margin)
steps = 100
rect_height = 40
rect_width = 0.5 * width / steps
svg.append("rect")
    .attr("height", rect_height + 2)
    .attr("width", steps * rect_width + 2)
    .attr("x", marginLeft - 1)
    .attr("y", currentHeight - 1)
;

steps = 30
var red = d3.scaleLinear()
    .domain([0, steps])
    .range([0.5, 1])
;
steps = 70
var blue = d3.scaleLinear()
    .domain([0, steps])
    .range([1, 0.5])
;

steps = 100
change = 30
start = 0
translation = 240
for (i = 0; i < steps; i++) {
    svg.append("rect")
        .attr("height", rect_height)
        .attr("width", rect_width)
        .attr("fill", d3.hsl((i > change) ? translation : start, 1, (i > change) ? blue(i - change) : red(i)))
        .attr("x", marginLeft + rect_width * i)
        .attr("y", currentHeight)
    ;
}

var scale1 = d3.scaleLinear()
    .domain([0, 10])
    .range([0, steps * rect_width])
;

var axis1 = d3.axisBottom()
    .scale(scale1)
    .ticks(10)
    .tickSize(5)
    .tickPadding(2)
;

svg.append("g")
    .attr("transform", `translate(${marginLeft},${currentHeight + rect_height + 1})`)
    .call(axis1);

// A3b
currentHeight += (rect_height + margin)
steps = 100
rect_height = 40
rect_width = 0.5 * width / steps
svg.append("rect")
    .attr("height", rect_height + 2)
    .attr("width", steps * rect_width + 2)
    .attr("x", marginLeft - 1)
    .attr("y", currentHeight - 1)
;

steps = 50
var red = d3.scaleLinear()
    .domain([0, steps])
    .range([1, 0.5])
;
steps = 50
var blue = d3.scaleLinear()
    .domain([0, steps])
    .range([0.5, 1])
;

steps = 100
change = 50
start = 0
translation = 240
for (i = 0; i < steps; i++) {
    svg.append("rect")
        .attr("height", rect_height)
        .attr("width", rect_width)
        .attr("fill", d3.hsl((i > change) ? translation : start, 1, (i > change) ? blue(i - change) : red(i)))
        .attr("x", marginLeft + rect_width * i)
        .attr("y", currentHeight)
    ;
}

var scale1 = d3.scaleLinear()
    .domain([0, 10])
    .range([0, steps * rect_width])
;

var axis1 = d3.axisBottom()
    .scale(scale1)
    .ticks(10)
    .tickSize(5)
    .tickPadding(2)
;

svg.append("g")
    .attr("transform", `translate(${marginLeft},${currentHeight + rect_height + 1})`)
    .call(axis1);