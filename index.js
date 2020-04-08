let full = false;
let resized = false;

function main() {
  // Inisiasi kanvas WebGL
  var leftCanvas = document.getElementById("leftCanvas");
  var rightCanvas = document.getElementById("rightCanvas");
  var leftGL = leftCanvas.getContext("webgl");
  var rightGL = rightCanvas.getContext("webgl");
  resize();

  let colorGrey = [0.7, 0.7, 0.7];
  let colorYellow = [0.92156862745 , 0.78823529411, 0.43529411764];
  let colorDarkGrey = [0.2, 0.2, 0.2];
  let colorWhite = [1.0, 1.0, 1.0];

  // Inisiasi verteks kubus
  let vertices = [];
  let colors = [];
  addCube(vertices, colors, -0.2, 0, 0, 0.3, 1, 0.15, colorYellow);
  addCube(vertices, colors, 0.15, 0.145, 0, 0.4, 0.695, 0.03, colorWhite);
  addCube(vertices, colors, 0.2+0.125+0.0625, -0.2375, 0, 0.125, 0.075, 0.1, colorGrey);
  addCube(vertices, colors, 0.2+0.125-0.0625, -0.2375, 0, 0.125, 0.075, 0.11, colorGrey);
  addCube(vertices, colors, 0.2-0.125+0.0625, -0.2375, 0, 0.125, 0.075, 0.09, colorGrey);
  addCube(vertices, colors, 0.2-0.125-0.0625, -0.2375, 0, 0.125, 0.075, 0.1, colorGrey);
  addCube(vertices, colors, 0.2+0.125+0.0625, -0.3125, 0, 0.125, 0.075, 0.11, colorGrey);
  addCube(vertices, colors, 0.2+0.125-0.0625, -0.3125, 0, 0.125, 0.075, 0.12, colorGrey);
  addCube(vertices, colors, 0.2-0.125+0.0625, -0.3125, 0, 0.125, 0.075, 0.1, colorGrey);
  addCube(vertices, colors, 0.2-0.125-0.0625, -0.3125, 0, 0.125, 0.075, 0.11, colorGrey);
  addCube(vertices, colors, 0.2+0.125+0.0625, -0.3875, 0, 0.125, 0.075, 0.12, colorGrey);
  addCube(vertices, colors, 0.2+0.125-0.0625, -0.3875, 0, 0.125, 0.075, 0.09, colorGrey);
  addCube(vertices, colors, 0.2-0.125+0.0625, -0.3875, 0, 0.125, 0.075, 0.1, colorGrey);
  addCube(vertices, colors, 0.2-0.125-0.0625, -0.3875, 0, 0.125, 0.075, 0.12, colorGrey);
  addCube(vertices, colors, 0.2+0.125+0.0625, -0.4625, 0, 0.125, 0.075, 0.09, colorGrey);
  addCube(vertices, colors, 0.2+0.125-0.0625, -0.4625, 0, 0.125, 0.075, 0.1, colorGrey);
  addCube(vertices, colors, 0.2-0.125+0.0625, -0.4625, 0, 0.125, 0.075, 0.11, colorGrey);
  addCube(vertices, colors, 0.2-0.125-0.0625, -0.4625, 0, 0.125, 0.075, 0.12, colorGrey);
  addCube(vertices, colors, 0.35, 0.15, 0, 0.05, 0.7, 0.05, colorDarkGrey);
  addCube(vertices, colors, 0.15, 0.475, 0, 0.4, 0.05, 0.05, colorDarkGrey);

  // Inisiasi VBO (Vertex Buffer Object)
  let leftVertexBuffer = leftGL.createBuffer();
  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, leftVertexBuffer);
  leftGL.bufferData(leftGL.ARRAY_BUFFER, new Float32Array(vertices), leftGL.STATIC_DRAW);
  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, null);

  let rightVertexBuffer = rightGL.createBuffer();
  rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightVertexBuffer);
  rightGL.bufferData(rightGL.ARRAY_BUFFER, new Float32Array(vertices), rightGL.STATIC_DRAW);
  rightGL.bindBuffer(rightGL.ARRAY_BUFFER, null);

  let leftColorBuffer = leftGL.createBuffer();
  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, leftColorBuffer);
  leftGL.bufferData(leftGL.ARRAY_BUFFER, new Float32Array(colors), leftGL.STATIC_DRAW);
  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, null);

  let rightColorBuffer = rightGL.createBuffer();
  rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightColorBuffer);
  rightGL.bufferData(rightGL.ARRAY_BUFFER, new Float32Array(colors), leftGL.STATIC_DRAW);
  rightGL.bindBuffer(rightGL.ARRAY_BUFFER, null);

  // Definisi Shaders
  var leftVertexShaderCode = document.getElementById("leftVertexShader").text;

  var leftFragmentShaderCode = document.getElementById("leftFragmentShader").text;

  var rightVertexShaderCode = document.getElementById("rightVertexShader").text;

  var rightFragmentShaderCode = document.getElementById("rightFragmentShader").text;
  
  // Proses kompilasi, penautan (linking), dan eksekusi Shaders
  var vertexShader = leftGL.createShader(leftGL.VERTEX_SHADER);
  leftGL.shaderSource(vertexShader, leftVertexShaderCode);
  leftGL.compileShader(vertexShader);
  var fragmentShader = leftGL.createShader(leftGL.FRAGMENT_SHADER);
  leftGL.shaderSource(fragmentShader, leftFragmentShaderCode);
  leftGL.compileShader(fragmentShader);
  var leftShaderProgram = leftGL.createProgram();
  leftGL.attachShader(leftShaderProgram, vertexShader);
  leftGL.attachShader(leftShaderProgram, fragmentShader);
  leftGL.linkProgram(leftShaderProgram);
  leftGL.useProgram(leftShaderProgram);

  vertexShader = rightGL.createShader(rightGL.VERTEX_SHADER);
  rightGL.shaderSource(vertexShader, rightVertexShaderCode);
  rightGL.compileShader(vertexShader);
  fragmentShader = rightGL.createShader(rightGL.FRAGMENT_SHADER);
  rightGL.shaderSource(fragmentShader, rightFragmentShaderCode);
  rightGL.compileShader(fragmentShader);
  var rightShaderProgram = rightGL.createProgram();
  rightGL.attachShader(rightShaderProgram, vertexShader);
  rightGL.attachShader(rightShaderProgram, fragmentShader);
  rightGL.linkProgram(rightShaderProgram);
  rightGL.useProgram(rightShaderProgram);

  // Pengikatan VBO dan pengarahan pointer atribut posisi dan warna
  setVertex(leftGL, leftShaderProgram, leftVertexBuffer, 3);
  setColors(leftGL, leftShaderProgram, leftColorBuffer);
  setVertex(rightGL, rightShaderProgram, rightVertexBuffer, 3);
  setColors(rightGL, rightShaderProgram, rightColorBuffer);

  let projectionMatrixLoc = rightGL.getUniformLocation(rightShaderProgram, "uProjectionMatrix");
  let projectionMatrix = createProjectionMatrix();
  rightGL.uniformMatrix4fv(projectionMatrixLoc, false, new Float32Array(projectionMatrix));

  let zRotation = 0;

  let xRotation = 0;
  let yRotation = 0;

  // Persiapan tampilan layar dan mulai menggambar secara berulang (animasi)
  function render() {
    if (resized) {
			leftGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, leftGL.canvas.width, leftGL.canvas.width);
			rightGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, rightGL.canvas.width, rightGL.canvas.width);
			resized = false;
    }
    
    zRotation -= 0.5;
    if(zRotation >= 360){
      zRotation -= 360;
    }

    yRotation += 0.75;
    if(yRotation >= 360){
      yRotation -= 360;
    }

    xRotation += 0.25;
    if(xRotation >= 360){
      xRotation -= 360;
    }

    let transformMatrix = createMatrix4f();
    transformMatrix = translateMatrix(transformMatrix, 0, -0.3, 0);
    transformMatrix = scaleMatrix(transformMatrix, 1, 1, 1);
    transformMatrix = rotateMatrix(transformMatrix, 0, 0, zRotation);
    let transformMatrixLoc = leftGL.getUniformLocation(leftShaderProgram, "uTransform");
    leftGL.uniformMatrix4fv(transformMatrixLoc, false, new Float32Array(transformMatrix));

    transformMatrix = createMatrix4f();
    transformMatrix = translateMatrix(transformMatrix, 0, 0, 0);
    transformMatrix = scaleMatrix(transformMatrix, 2, 2, 2);
    transformMatrix = rotateMatrix(transformMatrix, xRotation, yRotation, 0);
    transformMatrix = translateMatrix(transformMatrix, 0, 0, -4);
    transformMatrixLoc = rightGL.getUniformLocation(rightShaderProgram, "uTransform");
    rightGL.uniformMatrix4fv(transformMatrixLoc, false, new Float32Array(transformMatrix));
    leftGL.clear(leftGL.COLOR_BUFFER_BIT | leftGL.DEPTH_BUFFER_BIT);
    leftGL.drawArrays(leftGL.TRIANGLES, 0, colors.length/3);
		rightGL.clear(rightGL.COLOR_BUFFER_BIT | rightGL.DEPTH_BUFFER_BIT);
    rightGL.drawArrays(rightGL.TRIANGLES, 0, colors.length/3);
    requestAnimationFrame(render);
  }

  leftGL.enable(leftGL.DEPTH_TEST);
  rightGL.enable(rightGL.DEPTH_TEST);
  leftGL.clearColor(0.4, 0.4, 0.4, 1.0);
  leftGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, leftGL.canvas.width, leftGL.canvas.width);
  rightGL.clearColor(0.1, 0.1, 0.1, 1.0);
  rightGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, rightGL.canvas.width, rightGL.canvas.width);
  render();
}

function addCube(vertices, colors, x, y, z, width, height, length, color){

  width = width/2;
  height = height/2;
  length = length/2;

  var colorOffset = [
    0.0, 0.0, 0.0,    // depan
    +0.1, +0.1, +0.1,    // kanan
    +0.2, +0.2, +0.2,    // atas
    +0.1, +0.1, +0.1,    // kiri
    0, 0, 0,    // belakang
    -0.2, -0.2, -0.2    // bawah
];

  let cubePoints = [
    [x - width, y + height, z + length],   // A, 0
    [x - width, y - height, z + length],   // B, 1
    [x + width, y - height, z + length],   // C, 2 
    [x + width, y + height, z + length],   // D, 3
    [x - width, y + height, z - length],   // E, 4
    [x - width, y - height, z - length],   // F, 5
    [x + width, y - height, z - length],   // G, 6
    [x + width, y + height, z - length]    // H, 7 
  ];

  function quad(a, b, c, d) {
    var indices = [a, b, c, c, d, a];
    for (var i=0; i<indices.length; i++) {
      for (var j=0; j<3; j++) {
        vertices.push(cubePoints[indices[i]][j]);
      }
      for(let j=0; j<3; j++){
        colors.push(color[j] + colorOffset[(a-1) * 3+j]);
      }
    }
  }

  quad(1, 2, 3, 0); // Kubus depan
  quad(2, 6, 7, 3); // Kubus kanan
  quad(3, 7, 4, 0); // Kubus atas
  quad(4, 5, 1, 0); // Kubus kiri
  quad(5, 4, 7, 6); // Kubus belakang
  quad(6, 2, 1, 5); // Kubus bawah
  
}

function setVertex(gl, program, buffer, numOfComponent){
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  let position = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(position, numOfComponent, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(position);
}

function setColors(gl, program, buffer){
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  let color = gl.getAttribLocation(program, "aColor");
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(color);
}

function createProjectionMatrix(){
  var n = 1, f = 50, fov = 60;
	var r = n * Math.tan(fov * Math.PI / 180 / 2);
	var projectionMatrix = [
		n/r, 0, 0, 0,
		0, n/r, 0, 0,
		0, 0, -(f+n)/(f-n), -1,
		0, 0, -2*f*n/(f-n), 0
  ];
  return projectionMatrix;
}

function createMatrix4f(){
  return [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ]
}

function scaleMatrix(mat, x, y, z){
  return multiply(mat, [
    x, 0.0, 0.0, 0.0,
    0.0, y, 0.0, 0.0,
    0.0, 0.0, z, 0.0,
    0.0, 0.0, 0.0, 1.0
  ])
}

function translateMatrix(mat, x, y, z){
  return multiply(mat, [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    x, y, z, 1.0
  ])
}

function rotateX(matrix, theta) {
	theta = theta * Math.PI / 180;
	return multiply(matrix, [
		1, 0, 0, 0,
		0, Math.cos(theta), -Math.sin(theta), 0,
		0, Math.sin(theta), Math.cos(theta), 0,
		0, 0, 0, 1
	]);
}

function rotateY(matrix, theta) {
	theta = theta * Math.PI / 180;
	return multiply(matrix, [
		Math.cos(theta), 0, -Math.sin(theta), 0,
		0, 1, 0, 0,
		Math.sin(theta), 0, Math.cos(theta), 0,
		0, 0, 0, 1
	]);
}

function rotateZ(matrix, theta) {
	theta = theta * Math.PI / 180;
	return multiply(matrix, [
		Math.cos(theta), -Math.sin(theta), 0, 0,
		Math.sin(theta), Math.cos(theta), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	]);
}

function rotateMatrix(mat, x, y, z){
  mat = rotateX(mat, x);
  mat = rotateY(mat, y);
  mat = rotateZ(mat, z);
  return mat;
}

function multiply(a, b) {
	return [
		a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
		a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
		a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
		a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],
		a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
		a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
		a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
		a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],
		a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
		a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
		a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
		a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],
		a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
		a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
		a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
		a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15]
	];
}

function resize() {
	var leftCanvas = document.getElementById("leftCanvas");
	var rightCanvas = document.getElementById("rightCanvas");
	leftCanvas.width = rightCanvas.width = window.innerWidth / 2 - 3;
	leftCanvas.height = rightCanvas.height = window.innerHeight;
	resized = true;
}

function fullscreen() {
	if (full) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) { /* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) { /* IE/Edge */
			document.msExitFullscreen();
		}
	} else {
		if (document.body.requestFullscreen) {
			document.body.requestFullscreen();
		} else if (document.body.mozRequestFullScreen) { /* Firefox */
			document.body.mozRequestFullScreen();
		} else if (document.body.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
			document.body.webkitRequestFullscreen();
		} else if (document.body.msRequestFullscreen) { /* IE/Edge */
			document.body.msRequestFullscreen();
		}
	}
	full = !full;
}