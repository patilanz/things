// Move the mouse across the screen as a sine wave.
var robot = require("robotjs");
var b = robot.getMousePos();
var img = require('imagejs');
var readline = require('readline');
function generatePng(data){
	var signature = new Buffer([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);	
}

function start(){
	var get = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	get.question('Width: ', (width) => {
		console.log(width);
		get.question('Height: ', (height) => {
			get.question('File name: ', (fileName) => {
				get.close();
				width = width * 1;
				height = height * 1;
				if(isNaN(width) || isNaN(height)){
					console.log('Please type numbers');
					process.exit();
				}
				var pixelsLength = width * height;
				var data = [];
				var b = robot.getMousePos();
				var percent = 0;
				console.log('Mouve your mouse');
				var interval = setInterval(() => {
					var n = robot.getMousePos();
					if(n.x != b.x || n.y != b.y){
						b = n;
						var hex = robot.getPixelColor(n.x, n.y);
						var buffer = new ArrayBuffer(4);
						var view = new DataView(buffer);
						view.setUint32(0, parseInt(hex, 16), true);
						

						data.push(new Buffer(buffer));
						if(data.length == pixelsLength){
							console.log('Colors done');
							console.log('Saving to buffer...')
							clearInterval(interval);
							var result = new Buffer(pixelsLength * 4);
							for(var i = 0, j = 0, m = 0;i<result.length; i++){ // data[Buffer] to Buffer
								result[i] = data[j][m];
								m++;
								if(m == 4){
									m = 0;
									j++;
								}
							}
							var bitmap = new img.Bitmap({
								width: width,
								height: height,
								data: result
							});
							console.log('\nSaving to file...');
							bitmap.writeFile(fileName + '.jpg', {quality: 100}).then(() => {
								console.log(fileName + ' was saved!');
							});
						}else{
							var np = Math.floor(data.length / pixelsLength * 200);
							if(np/10 != percent/10){
								percent = np;
								var d = '';
								for(var i = 0, j = 0;i < 20;i++, j++){
									d += j < percent/10 ? '=' : ' ';
								}
								//process.stdout.cursorTo(0);
								process.stdout.write('<' + d + '>');
								//console.log('<' + d + '>');
								readline.cursorTo(process.stdout, 0);
							}
						}
					}
				}, 1);
			});
			
		});
	});

}


function arrayToBuffer(a){
	var buffer = new Buffer(a.length);
	var view; 
	//for(var )
}

//var bitmap = new img.Bitmap({width: 200, height: 300});

start();
