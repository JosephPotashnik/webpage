
// variable to store our intervalID
let nIntervId

function GenerateGraph() {

    if (!nIntervId) {
        nIntervId = setInterval(GenerateGraph, 8000);
    }

    let svg = document.getElementById('svg-container');
    // remove all child nodes of the svg element
    while (svg.firstChild !== null) {
        svg.removeChild(svg.firstChild);
    }
    

    function swapElements(arr, i1, i2) {
        let res = [...arr];
        let temp = res[i1];
        res[i1] = res[i2];
        res[i2] = temp;
        return res;
    }

    const circleCount = 6; // Number of vertices
    const edgesPerVertex = 5; //note: number of edges per vertex must be smaller than circleCount (because we not allow repeats of edges to a target vertex)
    const svgContainer = document.getElementById('svg-container');
    const svgContainerWidth = parseInt(svgContainer.getAttribute('width'));
    const svgContainerHeight = parseInt(svgContainer.getAttribute('height'));
    let circleArr = [];
    let lineArr = [];
    let indexArr = [];
    let radius = 10;
    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        let cx = Math.floor(Math.random() * (svgContainerWidth - 2 * radius + 1) + radius);
        let cy = Math.floor(Math.random() * (svgContainerHeight - 2 * radius + 1) + radius);
        circle.setAttribute('cx', cx); // X position
        circle.setAttribute('cy', cy); // Y position
        circle.setAttribute('r', radius);
        circleArr.push(circle);
        indexArr.push(i);
    }
    for (let i = 0; i < circleCount; i++) {
        //line from circle i to a random circle except circle i
        //create new index array in which index i is in the last position
        let excludedIndex = i;
        let tempIndexArr = indexArr;
        for (let j = 0; j < edgesPerVertex; j++) {
            tempIndexArr = swapElements(tempIndexArr, excludedIndex, indexArr.length - j - 1);
            randomIndex = Math.floor(Math.random() * (indexArr.length - j - 1));
            let targetCircleIndex = tempIndexArr[randomIndex];
            excludedIndex = randomIndex;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

            line.setAttribute('x1', circleArr[i].getAttribute('cx')); // X position
            line.setAttribute('y1', circleArr[i].getAttribute('cy'));; // Y position
            line.setAttribute('x2', circleArr[targetCircleIndex].getAttribute('cx'));; // X position
            line.setAttribute('y2', circleArr[targetCircleIndex].getAttribute('cy'));; // Y position
            lineArr.push(line);
        }
    }
    for (let i = 0; i < lineArr.length; i++)
        svgContainer.appendChild(lineArr[i]);
    for (let i = 0; i < circleArr.length; i++)
        svgContainer.appendChild(circleArr[i]);
}

