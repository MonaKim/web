function make2Darray (cols, rows){
	let arr = new Array(cols);
	for (let i=0; i<arr.length; i++){
		arr[i] = new Array (rows);
	}
	return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;

function setup(){
	createCanvas(400,400);
	cols = width/resolution;
	rows = height/resolution;

	grid = make2Darray(cols,rows);
	for(let i =0; i<cols; i++){
		for(let j=0; j<rows; j++){
			grid[i][j] = floor(random(2));
		}
	}
}
function draw(){
	background(255);

	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){
			let x = i * resolution;
			let y = j * resolution;
			if(grid[i][j] == 1 ){
				var c = color(255,204,0);
				fill(c);
				stroke(c);
				rect(x,y,resolution-1,resolution-1);
			}
	}
}
	let next = make2Darray(cols, rows);
	//compute next based on grid
	for(let i = 1; i<cols; i++){
		for(let j = 1; j<rows; j++){
			let state = grid[i][j];


			//count live neighbors
			let sum = 0;
			let neighbors = countNeighbors(grid, i, j);

			if (state == 0 && neighbors == 3){
				next[i][j] = 1;
				} else if(state == 1 && (neighbors < 2 || neighbors > 3)){
					next[i][j] = 0;
				} else {
					next[i][j] = state;
				}

			}
		}

	grid = next;

}

function countNeighbors(grid, x, y){
	let sum = 0;
	for(let i= -1; i < 2; i++){
		for(let j = -1; j < 2; j++){

			let col = (x + i + cols) % cols;
			let row = (y + j + rows) % rows;

			sum += grid[col][row];
		}
	}
	sum -= grid[x][y];
	return sum;
}