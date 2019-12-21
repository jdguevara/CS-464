class Object {

    constructor(distance,xrot,yrot,zrot,desc)
    {
        this.distance = distance;
        this.xRot = xrot;
        this.yRot = yrot;
        this.zRot = zrot;
        this.lastx = xrot;
        this.xoffset = 0;
        this.yoffset = 0;
        this.zoffset = 0;
        this.movementLeft = 0;
        this.startingPoint = [this.xoffset, this.yoffset, this.zoffset];
        this.ldir = true;
        this.ldirx = false;
        this.lx = 0;
        this.lPos = 1;
        this.texture = null;
        this.orbit = false;
        this.illuminate = false;
        this.animation = function (){};
        this.vertScale = null;
        this.desc = desc;
    }
    bindTexture(ref)
    {
        this.texture = ref;
    }
    bindAnimation(ref)
    {
        this.animation = ref;
    }
    orbitMode(mode)
    {
        this.orbit = mode;
    }
    illumMode(mode)
    {
        this.illuminate = mode;
    }
    initGeometry(x,y,z, scale=1) {
        this.vertices = [];
        this.normals = [];
        for (var i = 0; i < 128; i++) {
            for (var j = 0; j < 128; j++) {
                this.vertices[0 + j * 3 + i * 128 * 3] = ((j * 1.0) / 50 - 1.0+x)*scale;
                this.vertices[1 + j * 3 + i * 128 * 3] = (0+y)*scale;
                this.vertices[2 + j * 3 + i * 128 * 3] = ((i * 1.0) / 50 - 1.0+z)*scale;

                this.normals[0 + j * 3 + i * 128 * 3] = 1;
                this.normals[1 + j * 3 + i * 128 * 3] = 1;
                this.normals[2 + j * 3 + i * 128 * 3] = 0;
            }
        }

        this.textureCoords = [];
        this.tc = 0;
        for (var i = 0; i < 1; i += .01) {
            for (var j = 0; j < 1; j += .01) {
                this.textureCoords[this.tc++] = j;
                this.textureCoords[this.tc++] = i;
            }
        }

        this.terrainVertexIndices = [];
        this.tvertex = 0;
        for (var i = 0; i < 128-1; i++) {
            for (var j = 0; j < 128-1; j++) {
                this.terrainVertexIndices[this.tvertex++] = 0 + j + i * 128;
                this.terrainVertexIndices[this.tvertex++] = 1 + j + i * 128;
                this.terrainVertexIndices[this.tvertex++] = 0 + j + (i + 1) * 128;

                this.terrainVertexIndices[this.tvertex++] = 0 + j + (i + 1) * 128;
                this.terrainVertexIndices[this.tvertex++] = 1 + j + (i + 1) * 128;
                this.terrainVertexIndices[this.tvertex++] = 1 + j + i * 128;
            }
        }

    }
    initgeometryfromjson(jsonobj,x,y,z,scale,meshNum = 0)
    {
        this.xoffset = x;
        this.yoffset = y;
        this.zoffset = z;
        this.startingPoint = [this.xoffset, this.yoffset, this.zoffset];
        this.vertices = jsonobj.meshes[meshNum].vertices,scale;
        for(var i = 0; i < this.vertices.length; i+=3)
        {
            this.vertices[i] *=scale;
            this.vertices[i+1] *=scale;
            this.vertices[i+2] *=scale;
        }
        // console.log("tried to scale")
        this.terrainVertexIndices = [].concat.apply([], jsonobj.meshes[meshNum].faces);
        this.textureCoords = jsonobj.meshes[meshNum].texturecoords[0];
        this.normals = jsonobj.meshes[meshNum].normals;
    }
    prepare() {
        terrainVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertexPositionBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        terrainVertexPositionBuffer.itemSize = 3;
        try {
            terrainVertexPositionBuffer.numItems = this.vertices.length;
        } catch (error) {
            
        }
        

        normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
        normalBuffer.itemSize = 3;
        try {
            this.normals.length;
        } catch (error) {
            
        }
        

        terrainVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertexTextureCoordBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoords), gl.STATIC_DRAW);
        terrainVertexTextureCoordBuffer.itemSize = 2;
        try {
            terrainVertexTextureCoordBuffer.numItems = this.textureCoords.length;
        } catch (error) {
            
        }
        

        terrainVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, terrainVertexIndexBuffer);

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.terrainVertexIndices), gl.STATIC_DRAW);
        terrainVertexIndexBuffer.itemSize = 1;
        try {
            terrainVertexIndexBuffer.numItems = this.terrainVertexIndices.length;
        } catch (error) {
            
        }
        
    }
    // Do this before prepare maybe. dunno
    loadTexture()
    {
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
        // look at texture functions for loading a texture then use this.reference
    }
}