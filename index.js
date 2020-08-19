// data object for each country
const boardComp = {
  boardSize: 12,
  boardBrk: {
    Female: 3,
    "Affiliated with Government": 2,
    "With Corporate Experience": 1
  }
};

// icon realted data
const iconWidth = 45;
const iconHeight = 50;
// viewBox height and width from the svg
const vbWidth = 81.244;
const vbHeight = 89;
// icon path instruction
const iconPathArray = [
  "M48.234,49.116C58.4,45.889,65.771,36.382,65.771,25.147C65.771,11.259,54.513,0,40.624,0  c-13.89,0-25.148,11.259-25.148,25.147c0,11.234,7.369,20.742,17.535,23.966C14.217,52.68,0,69.168,0,89h81.244  C81.244,69.168,67.027,52.682,48.234,49.116z"
]

// function to get index wise categories
function getIndCategs(array){
  const female = array.includes('Female') ? Array(boardComp.boardBrk.Female).fill("Female") : [];
  const govt = array.includes('Affiliated with Government') ? Array(boardComp.boardBrk['Affiliated with Government']).fill("Affiliated with Government") : [];
  const corp = array.includes('With Corporate Experience') ? Array(boardComp.boardBrk['With Corporate Experience']).fill("With Corporate Experience") : [];

  // always in a set order
  return [
    ...female, ...govt, ...corp
  ]
}

// draw function draws the default icons/ humanoids
function draw(colorDef, boardComp){

  const categoryRow = d3.select('.boardComp')
    .append('div')
    .classed('categoryRow', true)
    .style('display', 'flex');

  const iconDiv = d3.select('.boardComp').select('div.categoryRow')
    .selectAll('div.iconDiv')
    .data(Array.from(Array(boardComp.boardSize).keys()))
    .enter()
    .append('div')
    .attr('class', 'iconDiv')
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('width', '100vw');

  // div to hold icons
  const iconHolder = iconDiv
        .append('div')
        .style('width', '100%')
        .classed('iconHolder', true);

  // svg row to hold icons
  const icons = iconHolder
    .append('svg')
    .attr("viewBox", `0 0 ${vbWidth} ${vbHeight}`)
    .attr('preserveAspectRatio', 'xMinYMin meet')

  // draw icons in each svg
  iconPathArray.forEach(d => {
    icons.append('path')
                    .classed('iconPath', true)
                    .attr('d', d)
                    .attr('fill', colorDef);
  })
}

// function to transition checkbox input
function updateIcons(arrCateg, colArray, colorDef){
  const ind = getIndCategs(arrCateg);

  const colScale = d3.scaleOrdinal()
                    .domain(["Female", "Affiliated with Government", "With Corporate Experience"])
                    .range(colArray);

  d3.select('.boardComp')
    .selectAll('path.iconPath')
    .transition()
    .style('fill', (d, i) => {
      return ind[i] == null ? colorDef : colScale(ind[i]);
    })
}

draw('grey', boardComp);
