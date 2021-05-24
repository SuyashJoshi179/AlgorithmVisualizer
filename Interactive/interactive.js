//google.charts.load('current', { 'packages': ['corechart'] });
//google.charts.setOnLoadCallback(drawhist);



/*let data = [{ index: 0, value: 7 }
    , { index: 1, value: 6 }
    , { index: 2, value: 5 }
    , { index: 3, value: 15 }
    , { index: 4, value: 3 }
    , { index: 5, value: 2 }
    , { index: 6, value: 1 }
    , { index: 7 , value: 5}
]*/

let lis = []
let data = []

let n = 5 + Math.floor(Math.random() * 11)

while (lis.length < n) {
    let val = Math.floor(1 + Math.random() * 20)

    if (lis.indexOf(val) == -1) {
        lis.push(val)
    }
}

for (i = 0; i < n; i++) { data.push({ index: i, value: lis[i] }) }
console.log(data)



var svg = d3.select("svg"),
    width = $('svg').width() - 100//svg.attr("width") + 100,
height = $('svg').height() - 150//svg.attr("height") + 100;

svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", width / 2 - 125)
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

function drawhist(arr) {
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

function colorate(inputArr, red = -1, border = -1) {
    red = red === -1 ? -1 : data.find((d) => inputArr[red] === d.value).index
    border = border === -1 ? -1 : data.find((d) => inputArr[border] === d.value).index
    g.selectAll(".bar")
        .attr("style", (d) => {
            console.log("Check: ", d.index === border);
            return(d.index === red ? "fill: red; " : "fill: steelblue; " + (d.index === border ? "outline: 3px solid red;" : "outline: 0px solid steelblue;"));
        })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


var timervalue;
var steps = 0;
var i = 0;
var mystates = [];



async function test(inputArr) {
    let n = inputArr.length
    for (i = 1; i < n; i++) {
        colorate(inputArr, i, -1);
        let j = i - 1;
        if (inputArr[j] > inputArr[i]) {
            while ((j > -1) && (inputArr[j + 1] < inputArr[j])) {
                await sleep(1000);
                colorate(inputArr, j+1, j);
                await sleep(1000);
                [inputArr[j], inputArr[j + 1]] = [inputArr[j + 1], inputArr[j]];
                drawhist(inputArr);
                await sleep(1500);
                j--;
                colorate(inputArr, j+1);
            }
        } else {
            await sleep(1000);
            colorate(inputArr, i, j);
            await sleep(1000);
            colorate(inputArr, i);
        }

        var temp = [];
        for (var newtemp = 0; newtemp < n; newtemp++) temp.push(inputArr[newtemp]);

        mystates.push(temp);
        drawhist(inputArr);
        await sleep(1000);
        colorate(inputArr);
        await sleep(1000);
        console.log("InputArr: ", inputArr);
    }
}



function insertionSort(inputArr) {

    let n = inputArr.length;
    test(inputArr, n).then();
    console.log("Completed..")
    return inputArr;
}

document.getElementById("button1").addEventListener("click", function () {
    lis = insertionSort(lis);
});

document.getElementById("button2").addEventListener("click", function () {
    clearTimeout(timervalue);
});

document.getElementById("button3").addEventListener("click", function () {
    lis = insertionSort(lis);
    clearTimeout(timervalue);
});

document.getElementById("button4").addEventListener("click", function () {
    console.log(mystates);

    drawhist(mystates[mystates.length - 1]);
    mystates.pop();
    i -= 1;
});





