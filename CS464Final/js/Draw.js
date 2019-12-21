function Frames() {
    requestAnimFrame(Frames);
    drawScene();
    animate();
}

function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;
        for(x in objects)
        {
            objects[x].animation();
        }
    }

    lastTime = timeNow;
}

var lastx = [];
var pingpong = false;
var lastTexture;
var lastObject;
function drawScene() {

    
    updateSkyColor();
    updateAmbientColor();
    updateLightDirection();

    Select_Shader();
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clearColor(current[0], current[1], current[2], current[3]);
    for(x in objects)
    {
        if(lastObject != objects[x].desc)
        {
        objects[x].prepare();
        }
    
    if (objects[x].texture != null)
    {
        if(lastObject != objects[x].desc)
        {
            exTexture = objects[x].texture;
            // lastTexture = exTexture;
            lastObject = objects[x].desc;
            handleLoadedTexture(exTexture);
        }
        
    }
    else{}

    if (objects[x].illuminate == true) {
        gl.uniform1i(shaderProgram.bumpCLR, 1);
    } else {
        gl.uniform1i(shaderProgram.bumpCLR, 0);
    }


    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [0.0, -7, -5.0  +distance]);
    
    // mat4.translate(mvMatrix, [objects[x].xoffest, objects[x].yoffset, objects[x].zoffset]);
    mat4.rotate(mvMatrix, xRot/ 180.0 * 3.1415, [0, 1, 0]);
    mat4.rotate(mvMatrix, yRot/ 180.0 * 3.1415, [1, 0, 0]);
    mat4.rotate(mvMatrix, zRot/ 180.0 * 3.1415, [0, 0, 1]);

    // // mat4.rotate(lightingDirection, xRot/ 180.0 * 3.1415, [0, 1, 0]);
    // // mat4.rotate(lightingDirection, objects[x].yRot/ 180.0 * 3.1415, [1, 0, 0]);
    // // mat4.rotate(lightingDirection, objects[x].zRot/ 180.0 * 3.1415, [0, 0, 1]);
    if(objects[x].orbit == false)
    {
        mat4.translate(mvMatrix, [objects[x].xoffset, objects[x].yoffset, objects[x].zoffset]);
    }
    
    mat4.rotate(mvMatrix, objects[x].xRot/ 180.0 * 3.1415, [0, 1, 0]);
    mat4.rotate(mvMatrix, objects[x].yRot/ 180.0 * 3.1415, [1, 0, 0]);
    mat4.rotate(mvMatrix, objects[x].zRot/ 180.0 * 3.1415, [0, 0, 1]);

    if(objects[x].orbit == true)
    {
        mat4.translate(mvMatrix, [objects[x].xoffset, objects[x].yoffset, objects[x].zoffset]);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, terrainVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    //lighting
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, terrainVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, exTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    gl.uniform1i(shaderProgram.useLightingUniform, true);
    // lighting color and direction
    gl.uniform3f(
        shaderProgram.ambientColorUniform,
        ambientColor[0],ambientColor[1],ambientColor[2]
    );

    
    var normalizedLight = vec3.create();
    vec3.normalize(lightingDirection, normalizedLight);
    vec3.scale(normalizedLight, -1);
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, normalizedLight);

    gl.uniform3f(
        shaderProgram.directionalColorUniform, DirectionalColor[0],DirectionalColor[1],DirectionalColor[2]
    );

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, terrainVertexIndexBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, terrainVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
}