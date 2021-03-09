//google.charts.load('current', { 'packages': ['corechart'] });
//google.charts.setOnLoadCallback(drawhist);

let data = [{ index: 0, value: 7 }
    , { index: 1, value: 6 }
    , { index: 2, value: 5 }
    , { index: 3, value: 4 }
    , { index: 4, value: 3 }
    , { index: 5, value: 2 }
    , { index: 6, value: 1 }]

var svg = d3.select("svg"),
    width = $('svg').width() - 100//svg.attr("width") + 100,
    height = $('svg').height() - 150//svg.attr("height") + 100;

svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", width/2 - 125)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text("Array values")

var x = d3.scaleBand().range([0, width]).padding(0.4),
    y = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + 75 + "," + 100 + ")");

x.domain(data.map(function (d) { return d.index; }));
y.domain([0, d3.max(data, function (d) { return d.value; }) * 1.05]);

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append("text")
    .attr("y", height - 220)
    .attr("x", width / 2)
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Index");

g.append("g")
    .call(d3.axisLeft(y).tickFormat(function (d) {
        return d;
    }).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("dy", "-3.1em")
    .attr("text-anchor", "begin")
    .attr("stroke", "black")
    .text("Value");

g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function (d) { return x(d.index); })
    .attr("y", function (d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .transition()
    .ease(d3.easeLinear)
    .duration(400)
    .delay(function (d, i) {
        return i * 50;
    })
    .attr("height", function (d) { return height - y(d.value); });

/*
function drawhist(arr = [10000, 30000, 20000, 50000, 40000]) {
    console.log(arr);

    let modified = arr.map((x, i) => [i.toString(), x]);
    modified.unshift(['Index', 'Value']);
    var data = google.visualization.arrayToDataTable(modified);
    var options = {
        titleindex: 'Array to be sorted',
        bar: { groupWidth: "80%" },
        legend: { position: "none" },
        fontName: 'Poppins',
        chartArea: { width: '80%', height: '85%', right: '30' }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('graph'));
    chart.draw(data, options);
    function suff() {
        console.log('clicked');
        data = google.visualization.arrayToDataTable(shuffleArray(modified));
        chart.draw(data, options);
    }
    //setInterval(suff, 1000);
}

setInterval(() => {
    data = shuffleArray(data);
    x.domain(data.map(function (d) { return d.index; }));
    y.domain([0, d3.max(data, function (d) { return d.value; }) * 1.05]);
    g.selectAll(".bar")
        .transition()
        .ease(d3.easeLinear)
        .duration(1000)
        .attr("x", function (d) { return x(d.index); })
}, 2000)
*/

function drawhist(arr)
{
    console.log(arr);
    //console.log( 'before: ',data);
    //data = data.map((x) => ({ index: arr.indexOf(x.value), value: x.value }));
    //console.log('after: ',data);
    x.domain(arr.map(function (d) { return data.filter(x => x.value === d)[0].index; }));
    y.domain([0, d3.max(data, function (d) { return d.value; }) * 1.05]);
    g.selectAll(".bar")
        .transition()
        .ease(d3.easeLinear)
        .duration(1000)
        .attr("x", function (d) { return x(d.index); })

}

function test(i, inputArr, n) {
    if(i<n) {
        let current = inputArr[i];
            
        let j = i-1; 
        while ((j > -1) && (current < inputArr[j])) {
            inputArr[j+1] = inputArr[j];
            j--;
        }
        inputArr[j+1] = current;
        drawhist(inputArr);
        console.log("InputArr: ", inputArr);
        setTimeout(test, 2000, i+1, inputArr, n);
    }
}

function insertionSort(inputArr) {

    let n = inputArr.length;
    test(1, inputArr, n);
    console.log("Completed..")
    return inputArr;
}
setTimeout(() => insertionSort([7,6,5,4,3,2,1]), 2000);