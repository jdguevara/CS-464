// Webgl
var distance = -50;
var xRot = 0;
var yRot = 15;
var zRot = 0;
var lastTime = 0;
var data = [];
var exTexture;
var terrainVertexPositionBuffer;
var terrainVertexTextureCoordBuffer;
var terrainVertexIndexBuffer;
var normalBuffer;
var vertices;
var normals;
var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();
var shaderProgram;
var gl;

var model;

var objects = [];
var textures = [];

night = [.025, .025, .1, 0.99];
day = [.025, .1, .3, 0.15];
current = [.025, .1, .3, 0.15];

var lightingDirection = [
    -0.5, -.5, .5
];
var ambientColor = [.5, .5, .5];
var DirectionalColor = [.8, .8, .8];
var lastts = 0;
// User Interactions
var unlocked = false;