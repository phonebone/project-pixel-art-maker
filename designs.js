const form = document.getElementById('sizePicker');
let canvas,
    color = '#eb5c81',
    grid = {
      width: 1,
      height:1
    };

// Wait for page to load before initializing:
window.addEventListener('load', init, false);

// Initialize:
function init(){
  const colorPicker = document.getElementById('colorPicker');
  canvas = document.getElementById('pixel_canvas');
  colorPicker.value = color;
  // if you want/need to change the color value in real time
  // colorPicker.addEventListener("input", updateColor, false);
  colorPicker.addEventListener('change', updateColor, false);
  // When size is submitted by the user, call makeGrid()
  form.addEventListener('submit', makeGrid, false);
  canvas.addEventListener('click', colorCell, false)
  // if the user's browser doesn't support a color well but instead shows a text
  // field for entering the color string directly, this selects the text in the
  // edit field, otherwise this does nothing.
  colorPicker.select();
}

// Change color value every time the user picks a new color:
function updateColor(e) {
  color = e.target.value;
}

function makeGrid(e) {
  e.preventDefault();
  // Save the user's width and height input for the grid:
  grid.width = e.target[0].value;
  grid.height = e.target[1].value;
  // Empty the grid:
  clearGrid();
  // Create a new grid:
  newGrid();
}

// Set bg color of cell:
function colorCell(e){
  if(e.target && e.target.nodeName === 'TD') {
    e.target.bgColor = color;
  }
}

// Remove the grid from the DOM if it exists:
function clearGrid(){
  const tableRows = canvas.querySelectorAll('tr');
  // if a table exists
  if(tableRows.length > 0){
    // make array of Nodelist
    let trArray = new Array(tableRows.length);
    let numRows = tableRows.length;
    while(numRows) {
      numRows--;
      trArray[numRows] = tableRows[numRows];
    }
    // for every existing table row
    trArray.forEach(function(tableRow){
      // remove the row from the DOM
      canvas.removeChild(tableRow);
    });
  }
}

// Create a new grid:
function newGrid(){
  // grid rows
  for(let r = 0; r<grid.height; r++){
    // grid columns
    let row = document.createElement('tr');
    for(let c = 0; c<grid.width; c++){
      let cell = document.createElement('td');
      row.appendChild(cell);
    }
    canvas.appendChild(row);
  }
}
