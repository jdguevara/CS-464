function initGeometry() {
    terrainVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertexPositionBuffer);
    vertices = [];
    normals = [];
    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
            vertices[0 + j * 3 + i * 100 * 3] = (j * 1.0) / 50 - 1.0;
            vertices[1 + j * 3 + i * 100 * 3] = 0;
            vertices[2 + j * 3 + i * 100 * 3] = (i * 1.0) / 50 - 1;

            normals[0 + j * 3 + i * 100 * 3] = 0;
            normals[1 + j * 3 + i * 100 * 3] = 1;
            normals[2 + j * 3 + i * 100 * 3] = 0;
        }
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    terrainVertexPositionBuffer.itemSize = 3;
    terrainVertexPositionBuffer.numItems = 100 * 100;

    normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    normalBuffer.itemSize = 3;
    normalBuffer.numItems = 100 * 100;

    terrainVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertexTextureCoordBuffer);
    var textureCoords = [];
    var tc = 0;
    for (var i = 0; i < 1; i += .01) {
        for (var j = 0; j < 1; j += .01) {
            textureCoords[tc++] = j;
            textureCoords[tc++] = i;
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    terrainVertexTextureCoordBuffer.itemSize = 2;
    terrainVertexTextureCoordBuffer.numItems = tc;

    terrainVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, terrainVertexIndexBuffer);
    var terrainVertexIndices = [];
    var tvertex = 0;
    for (var i = 0; i < 99; i++) {

        for (var j = 0; j < 99; j++) {
            terrainVertexIndices[tvertex++] = 0 + j + i * 100;
            terrainVertexIndices[tvertex++] = 1 + j + i * 100;
            terrainVertexIndices[tvertex++] = 0 + j + (i + 1) * 100;

            terrainVertexIndices[tvertex++] = 0 + j + (i + 1) * 100;
            terrainVertexIndices[tvertex++] = 1 + j + (i + 1) * 100;
            terrainVertexIndices[tvertex++] = 1 + j + i * 100;
        }
    }
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(terrainVertexIndices), gl.STATIC_DRAW);
    terrainVertexIndexBuffer.itemSize = 1;
    terrainVertexIndexBuffer.numItems = tvertex;
}