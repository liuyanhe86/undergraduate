var gl;
var canvas;
var program;

var vPosition, vColor, vNormal, vTexCoord;
var ambientProduct;
var diffuseProduct;
var specularProduct;
var modelViewMatrix, projectionMatrix, normalMatrix;
var modelViewMatrixLoc, projectionMatrixLoc, normalMatrixLoc;

/***************************光照部分******************************/
var lightPosition = vec4(0.0, 1.0, 0.0, 1.0);
var lightAmbient = vec4(0.3, 0.3, 0.3, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

var materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
var materialDiffuse = vec4(1.0, 0.8, 0.0, 1.0);
var materialSpecular = vec4(1.0, 0.8, 0.0, 1.0);
var materialShininess = 100.0;

/**************************F1赛车***********************************/
var f1Vertices = []; // F1赛车顶点
var f1Color = []; // F1赛车颜色
var f1NormalsArray = []; // F1法向量数组
var f1TexCoordArray = []; // F1赛车纹理坐标数组
var f1VBuffer, f1CBuffer, f1NBuffer, f1TBuffer; // F1赛车顶点和颜色缓冲区
var f1Forwards = vec4(0.0, 0.0, 1.0, 1.0); // 正面朝向方向向量
var f1Tx = 0.0,
    f1Ty = 0.0,
    f1Tz = 0.0; // 各个坐标轴方向上的位移量
var f1ScalePercent = 1; // f1的缩放比例
var f1RotateAngle = 0; // 绕Y轴的旋转量

var f1WheelBottomVertices = [];
var f1WheelBottomColor = [];
var f1WheelBottomNormals = [];
var f1WheelBottomVBuffer, sktBrdWheelBottomCBuffer, sktBrdWheelBottomNBuffer;

var f1WheelSideVertices = [];
var f1WheelSideColor = [];
var f1WheelSideNormals = [];
var f1WheelSideVBuffer, f1SideCBuffer, f1SideNBuffer;
/**************************滑板***********************************/
var sktBrdVertices = [];
var sktBrdColor = [];
var sktBrdNormalsArray = [];
var sktBrdTexCoordArray = [];
var sktBrdVBuffer, sktBrdCBuffer, sktBrdNBuffer, sktBrdTBuffer;
var sktBrdForwards = vec4(0.0, 0.0, 1.0, 1.0);
var sktBrdTx = 0,
    sktBrdTy = 0,
    sktBrdTz = 0;
var sktBrdScalePercent = 1;
var sktBrdRotateAngle = 0;


var sktBrdWheelBottomVertices = [];
var sktBrdWheelBottomColor = [];
var sktBrdWheelBottomNormals = [];
var sktBrdWheelBottomVBuffer, sktBrdWheelBottomCBuffer, sktBrdWheelBottomNBuffer;

var sktBrdWheelSideVertices = [];
var sktBrdWheelSideColor = [];
var sktBrdWheelSideNormals = [];
var sktBrdWheelSideVBuffer, sktBrdWheelSideCBuffer, sktBrdWheelSideNBuffer;
/**************************光源***********************************/
var lightVertices = [];
var lightColor = [];
var lightNormalsArray = [];
var lightCBuffer, lightVBuffer, lightNBuffer;
var lightForwards = vec4(0.0, 0.0, 1.0, 1.0);
var lightTx = lightPosition[0],
    lightTy = lightPosition[1],
    lightTz = lightPosition[2];
var lightScalePercent = 1;
var lightRotateAngle = 0;
/******************************视图相关************************************/
var near = 0.3;
var far = 20.0;
var radius = 4.0;
var theta = 0;
var phi = 1.0;
var dr = 5.0 * Math.PI / 180.0;
var fovy = 60.0; // Field-of-view in Y direction angle (in degrees)
var aspect = 1.0; // Viewport aspect ratio
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var dragging = false; //是否在拖动鼠标
var lastX = -1,
    lastY = -1; //上次点击时的光标位置
var isWandering = false; //是否在漫游
var rotationDirection = false; //旋转方向
var isInitializing = true; //是否正在初始化
var height = 1.0; //视点高度系数
var rotationDelta = 0.5;

/******************************侯选颜色************************************/
var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0), // black
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(1.0, 0.5, 0.0, 1.0), // yellow
    vec4(0.0, 1.0, 0.0, 1.0), // green
    vec4(0.0, 0.0, 1.0, 1.0), // blue
    vec4(1.0, 0.0, 1.0, 1.0), // magenta
    vec4(1.0, 1.0, 1.0, 1.0), // white
    vec4(0.0, 1.0, 1.0, 1.0), // cyan
    vec4(0.0, 0.0, 0.0, 0.5), // gray
];

/******************************纹理相关************************************/
var texture;
var texCoord = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)
];

/******************************阴影相关************************************/
var shaderProjectionMatrix;

//配置纹理
function configureTexture0(image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
        gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture0"), 0);
}

function configureTexture1(image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
        gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture1"), 1);
}

function configureTexture2(image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
        gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture2"), 2);
}

function configureTexture3(image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE3);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
        gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture3"), 3);
}


/******************************f1赛车基点坐标数组************************************/
//车前身四棱锥
var frontBodyBaseVertices = [
    vec4(0, 0, 2, 1.0), //0
    vec4(0.55, 0, 1.1, 1.0), //1
    vec4(-0.55, 0, 1.1, 1.0), //2
    vec4(0.25, 0.4, 1.1, 1.0), //3
    vec4(-0.25, 0.4, 1.1, 1.0) //4
];

//车头下悬板三棱柱
var headBaseVertices = [
    vec4(-0.7, 0, 1.9, 1.0), //0
    vec4(-0.7, 0, 2.1, 1.0), //1
    vec4(-0.7, 0.05, 1.9, 1.0), //2
    vec4(0.7, 0, 1.9, 1.0), //3
    vec4(0.7, 0, 2.1, 1.0), //4
    vec4(0.7, 0.05, 1.9, 1.0) //5
];

//车舱
var capsuleBaseVertices = [
    vec4(-0.15, 0, 1.1, 1.0), //0
    vec4(0.15, 0, 1.1, 1.0), //1
    vec4(0.15, 0.4, 1.1, 1.0), //2
    vec4(-0.15, 0.4, 1.1, 1.0), //3
    vec4(-0.15, 0.4, 0.5, 1.0), //4
    vec4(0.15, 0.4, 0.5, 1.0), //5
    vec4(0.15, 0.2, 0.5, 1.0), //6
    vec4(-0.15, 0.2, 0.5, 1.0), //7
    vec4(-0.15, 0.2, 0, 1.0), //8
    vec4(0.15, 0.2, 0, 1.0), //9
    vec4(0.15, 0, 0, 1.0), //10
    vec4(-0.15, 0, 0, 1.0), //11
];

//左车门
var leftDoorBaseVertices = [
    vec4(-0.25, 0, 1.1, 1.0), //0
    vec4(-0.15, 0, 1.1, 1.0), //1
    vec4(-0.15, 0.4, 1.1, 1.0), //2
    vec4(-0.25, 0.4, 1.1, 1.0), //3
    vec4(-0.25, 0.4, -0.3, 1.0), //4
    vec4(-0.15, 0.4, -0.3, 1.0), //5
    vec4(-0.15, 0, -0.3, 1.0), //6
    vec4(-0.25, 0, -0.3, 1.0) //7
];

//右车门
var rightDoorBaseVertices = [
    vec4(0.15, 0, 1.1, 1.0), //0
    vec4(0.25, 0, 1.1, 1.0), //1
    vec4(0.25, 0.4, 1.1, 1.0), //2
    vec4(0.15, 0.4, 1.1, 1.0), //3
    vec4(0.15, 0.4, -0.3, 1.0), //4
    vec4(0.25, 0.4, -0.3, 1.0), //5
    vec4(0.25, 0, -0.3, 1.0), //6
    vec4(0.15, 0, -0.3, 1.0) //7
];

//车后身
var backBodyBigPrismoidBaseVertices = [
    vec4(0.15, 0, -0.3, 1.0), //0
    vec4(0.15, 0, -0.9, 1.0), //1
    vec4(0.15, 0.6, -0.3, 1.0), //2
    vec4(-0.15, 0, -0.3, 1.0), //3
    vec4(-0.15, 0, -0.9, 1.0), //4
    vec4(-0.15, 0.6, -0.3, 1.0) //5
];
var backBodySmallPrismoidBaseVertices1 = [
    vec4(0.15, 0.4, 0, 1.0), //0
    vec4(0.25, 0.4, 0, 1.0), //1
    vec4(0.15, 0.6, 0, 1.0), //2
    vec4(0.15, 0.4, -0.3, 1.0), //3
    vec4(0.25, 0.4, -0.3, 1.0), //4
    vec4(0.15, 0.6, -0.3, 1.0) //5
];
var backBodySmallPrismoidBaseVertices2 = [
    vec4(-0.15, 0.4, -0.3, 1.0), //0
    vec4(-0.25, 0.4, -0.3, 1.0), //1
    vec4(-0.15, 0.6, -0.3, 1.0), //2
    vec4(-0.15, 0.4, 0, 1.0), //3
    vec4(-0.25, 0.4, 0, 1.0), //4
    vec4(-0.15, 0.6, 0, 1.0), //5

];
var backBodyCubeBaseVertices = [
    vec4(-0.15, 0, 0, 1.0), //0
    vec4(0.15, 0, 0, 1.0), //1
    vec4(0.15, 0.6, 0, 1.0), //2
    vec4(-0.15, 0.6, 0, 1.0), //3
    vec4(-0.15, 0.6, -0.3, 1.0), //4
    vec4(0.15, 0.6, -0.3, 1.0), //5
    vec4(0.15, 0, -0.3, 1.0), //6
    vec4(-0.15, 0, -0.3, 1.0) //7
];

//尾翼
var tailWingBaseVertices = [
    vec4(0.85, 0.9, -0.9, 1.0), //0
    vec4(0.85, 0.9, -0.5, 1.0), //1
    vec4(0.85, 0.7, -0.9, 1.0), //2
    vec4(-0.85, 0.9, -0.9, 1.0), //3
    vec4(-0.85, 0.9, -0.5, 1.0), //4
    vec4(-0.85, 0.7, -0.9, 1.0), //5

];
var tailWingStickBaseVertices1 = [
    vec4(-0.55, 0, -0.85, 1.0), //0
    vec4(-0.45, 0, -0.85, 1.0), //1
    vec4(-0.45, 0.8, -0.85, 1.0), //2
    vec4(-0.55, 0.8, -0.85, 1.0), //3
    vec4(-0.55, 0.8, -0.9, 1.0), //4
    vec4(-0.45, 0, -0.9, 1.0), //5
    vec4(-0.45, 0, -0.9, 1.0), //6
    vec4(-0.55, 0, -0.9, 1.0) //7
];
var tailWingStickBaseVertices2 = [
    vec4(0.45, 0, -0.85, 1.0), //0
    vec4(0.55, 0, -0.85, 1.0), //1
    vec4(0.55, 0.8, -0.85, 1.0), //2
    vec4(0.45, 0.8, -0.85, 1.0), //3
    vec4(0.45, 0.8, -0.9, 1.0), //4
    vec4(0.55, 0, -0.9, 1.0), //5
    vec4(0.55, 0, -0.9, 1.0), //6
    vec4(0.45, 0, -0.9, 1.0) //7
];

/********************************滑板基点坐标数组***********************************/
//前翘
var sktBrdFrontBaseVertices = [
    vec4(0.2, 0, 1.2, 1.0), //0
    vec4(0.2, 0.1, 1.2, 1.0), //1
    vec4(0.2, 0.3, 1.6, 1.0), //2
    vec4(-0.2, 0, 1.2, 1.0), //3
    vec4(-0.2, 0.1, 1.2, 1.0), //4
    vec4(-0.2, 0.3, 1.6, 1.0), //5

];
//板身
var sktBrdBodyBaseVertices = [
    vec4(-0.2, 0, 1.2, 1.0), //0
    vec4(0.2, 0, 1.2, 1.0), //1
    vec4(0.2, 0.1, 1.2, 1.0), //2
    vec4(-0.2, 0.1, 1.2, 1.0), //3
    vec4(-0.2, 0.1, 0, 1.0), //4
    vec4(0.2, 0.1, 0, 1.0), //5
    vec4(0.2, 0, 0, 1.0), //6
    vec4(-0.2, 0, 0, 1.0) //7
];
//后翘
var sktBrdBackBaseVertices = [
    vec4(-0.2, 0, 0, 1.0), //0
    vec4(-0.2, 0.1, 0, 1.0), //1
    vec4(-0.2, 0.3, -0.4, 1.0), //2
    vec4(0.2, 0, 0, 1.0), //3
    vec4(0.2, 0.1, 0, 1.0), //4
    vec4(0.2, 0.3, -0.4, 1.0) //5
];
//前中轴
var sktBrdFrontAxleBaseVertices = [
    vec4(-0.02, -0.2, 1.2, 1.0), //0
    vec4(0.02, -0.2, 1.2, 1.0), //1
    vec4(0.02, 0, 1.2, 1.0), //2
    vec4(-0.02, 0, 1.2, 1.0), //3
    vec4(-0.02, 0, 1.18, 1.0), //4
    vec4(0.02, 0, 1.18, 1.0), //5
    vec4(0.02, -0.2, 1.18, 1.0), //6
    vec4(-0.02, -0.2, 1.18, 1.0) //7
];
//后中轴
var sktBrdBackAxleBaseVertices = [
    vec4(-0.02, -0.2, 0, 1.0), //0
    vec4(0.02, -0.2, 0, 1.0), //1
    vec4(0.02, 0, 0, 1.0), //2
    vec4(-0.02, 0, 0, 1.0), //3
    vec4(-0.02, 0, -0.02, 1.0), //4
    vec4(0.02, 0, -0.02, 1.0), //5
    vec4(0.02, -0.2, -0.02, 1.0), //6
    vec4(-0.02, -0.2, -0.02, 1.0) //7
];

/******************************光源基点坐标数组*******************************/
var lightBaseVertices = [
    vec4(-0.05, -0.05, 0.05, 1.0),
    vec4(0.05, -0.05, 0.05, 1.0),
    vec4(0.05, 0.05, 0.05, 1.0),
    vec4(-0.05, 0.05, 0.05, 1.0),
    vec4(-0.05, 0.05, -0.05, 1.0),
    vec4(0.05, 0.05, -0.05, 1.0),
    vec4(0.05, -0.05, -0.05, 1.0),
    vec4(-0.05, -0.05, -0.05, 1.0)
];

/******************************起跑线*******************************/
var startingLineColor = [];
var startingLineVertices = [];
var startingLineNormalsArray = [];
var startingLineTexCoordArray = [];
var startingLineVBuffer, startingLineCBuffer, startingLineNBuffer, startingLineTBuffer;
/*******************************赛道路面****************************/
var roadColor = [];
var roadVertices = [];
var roadNormalsArray = [];
var roadTexArray = [];
var roadVBuffer, roadCBuffer, roadNBuffer, roadTBuffer;
/*****************************************************************/

/***************************why 多Agent独立运动控制******************************/
/* 基本模式定义 */
var agents = [];
var MODE = new Object();
MODE.LEADER = 1;
MODE.FOLLOWER = -1;

/* Utils */
function toAngle(x, y) {

    var len = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    if (len == 0) {
        return 0;
    } else {
        var ang = Math.asin(y / len);
        if (x < 0) {
            ang = Math.PI - ang;
        }
        if (x > 0 && y < 0) {
            ang = 2 * Math.PI + ang;
        }
        return ang - Math.PI / 2;
    }
}

/* base formation controll */
function actionAll(agts, tm) {
    for (var ind in agts) {
        thinkBBLR(agts[ind]);
        parseMove(agts[ind], tm);
    }
}

function parseMove(agts, tm) {
    agts.loc.x += agts.vel.x * tm / 1000;
    agts.loc.y += agts.vel.y * tm / 1000;
}

function thinkBBLR(agt) {
    if (agt.mode == MODE.LEADER) {
        agt.vel.x = 0;
        agt.vel.y = 0;
    } else {
        agt.vel.x = agt.detectee.loc.x - agt.loc.x + agt.desire.x;
        agt.vel.y = agt.detectee.loc.y - agt.loc.y + agt.desire.y;
        var len = Math.sqrt(Math.pow(agt.vel.x, 2) + Math.pow(agt.vel.y, 2));
        if (len < 2) {
            return;
        }
        agt.vel.x = agt.lmt_spd * agt.vel.x / len;
        agt.vel.y = agt.lmt_spd * agt.vel.y / len;
    }
}

/* callback function */
function onStart() {
    setInterval(() => {
        // alert('agtA:' + agents[0].loc.x + '\t' + agents[0].loc.y);
        actionAll(agents, 100);
    }, 100);
}

function onDeploy() {
    alert('init');
    agents = []
    onDeploy.agentA = {
        mode: MODE.LEADER,
        loc: {
            x: 5,
            y: 5,
        },
        vel: {
            x: 0,
            y: 0,
        },
        lmt_spd: 2,
        detectee: null,
        desire: null,
    };
    onDeploy.agentB = {
        mode: MODE.FOLLOWER,
        loc: {
            x: 10,
            y: 0,
        },
        vel: {
            x: 0,
            y: 0,
        },
        lmt_spd: 2,
        detectee: onDeploy.agentA,
        desire: {
            x: 0,
            y: 0,
        },
    };
    onDeploy.agentC = {
        mode: MODE.FOLLOWER,
        loc: {
            x: 0,
            y: 10,
        },
        vel: {
            x: 0,
            y: 0,
        },
        lmt_spd: 2,
        detectee: onDeploy.agentA,
        desire: {
            x: 0,
            y: 0,
        },
    };
    onDeploy.agentD = {
        mode: MODE.FOLLOWER,
        loc: {
            x: 10,
            y: 10,
        },
        vel: {
            x: 0,
            y: 0,
        },
        lmt_spd: 2,
        detectee: onDeploy.agentA,
        desire: {
            x: 0,
            y: 0,
        },
    };
    agents.push(onDeploy.agentA);
    agents.push(onDeploy.agentB);
    agents.push(onDeploy.agentC);
    agents.push(onDeploy.agentD);

    onDeploy.onSetLine = function () {
        onDeploy.agentB.desire = {
            x: 0,
            y: 5,
        }
        onDeploy.agentC.desire = {
            x: 0,
            y: 10,
        }
        onDeploy.agentD.desire = {
            x: 0,
            y: -5,
        }
    }

    onDeploy.onSetDiamond = function () {
        onDeploy.agentB.desire = {
            x: 2.5,
            y: 2.5,
        }
        onDeploy.agentC.desire = {
            x: -2.5,
            y: 2.5,
        }
        onDeploy.agentD.desire = {
            x: 0,
            y: 5,
        }
    }

    onDeploy.onSetWedge = function () {
        onDeploy.agentB.desire = {
            x: 2.5,
            y: 0,
        }
        onDeploy.agentC.desire = {
            x: -1.5,
            y: -1.5,
        }
        onDeploy.agentD.desire = {
            x: 4,
            y: -1.5,
        }
    }
    onDeploy.onSetDiamond();
}

function onLine() {
    onDeploy.onSetLine();
}

function onWedge() {
    onDeploy.onSetWedge();
}

function onDiamond() {
    onDeploy.onSetDiamond();
}

/*****************************************************************/

//窗口加载
window.onload = function init() {
    //1.初始化gl
    {
        canvas = document.getElementById("gl-canvas");
        gl = WebGLUtils.setupWebGL(canvas);
        if (!gl) {
            alert("WebGL isn't available");
        }
        gl.viewport(0, 0, canvas.width, canvas.height); //设定视图范围
        gl.clearColor(0.91, 0.92, 0.93, 1.0); //清除背景颜色
        //*其他配置，如打开深度缓冲区
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.POLYGON_OFFSET_FILL);
        gl.polygonOffset(1.0, 2.0);

        shaderProjectionMatrix = mat4();
        shaderProjectionMatrix[3][3] = 0;
        shaderProjectionMatrix[3][1] = -1 / lightPosition[1];
    }

    //2.添加图形顶点和颜色
    { // 画起跑线
        startingLine();

        // 画路面
        road();

        // ① 画F1
        drawF1();

        // ② 画滑板
        drawSktBrd();

        // ③ 画光源
        drawLight();
    }

    //3.创建程序对象并读取、编译和链接着色器
    {
        program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);

        vPosition = gl.getAttribLocation(program, "vPosition");
        gl.enableVertexAttribArray(vPosition);

        vColor = gl.getAttribLocation(program, "vColor");
        gl.enableVertexAttribArray(vColor);

        vNormal = gl.getAttribLocation(program, "vNormal");
        gl.enableVertexAttribArray(vNormal);

        vTexCoord = gl.getAttribLocation(program, "vTexCoord");
        gl.enableVertexAttribArray(vTexCoord);

        modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
        projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");
        normalMatrixLoc = gl.getUniformLocation(program, "normalMatrix");

        // 设置材质
        ambientProduct = mult(lightAmbient, materialAmbient);
        diffuseProduct = mult(lightDiffuse, materialDiffuse);
        specularProduct = mult(lightSpecular, materialSpecular);
    }

    //4.创建缓冲区并绑定，之后传递给着色器中对应属性
    createAndBindVCNTBuffer();

    //5.给元素绑定事件
    {
        document.getElementById("wander").onclick = function () {
            isWandering = true;
        }
        this.document.getElementById("stopwander").onclick = function () {
            isWandering = false;
        }
        canvas.onmousedown = function (ev) {
            var x = ev.clientX;
            var y = ev.clientY;
            // Start dragging if a moue is in <canvas>
            var rect = ev.target.getBoundingClientRect();
            if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
                lastX = x;
                lastY = y;
                dragging = true;
            }
        };

        //鼠标离开时
        canvas.onmouseleave = function (ev) {
            dragging = false;
        };

        //鼠标释放
        canvas.onmouseup = function (ev) {
            dragging = false;
        };

        //鼠标移动
        canvas.onmousemove = function (ev) {
            var x = ev.clientX;
            var y = ev.clientY;
            if (dragging) {
                var factor = 100 / canvas.height; // The rotation ratio
                var dx = factor * (x - lastX);
                var dy = factor * (y - lastY);
                if (isWandering) {
                    if (dx > 0)
                        rotationDirection = false;
                    else
                        rotationDirection = true;
                } else {
                    theta -= dx * Math.PI / 180;
                    phi += dy * Math.PI / 180;
                }
            }
            lastX = x, lastY = y;
        };
        //鼠标缩放
        canvas.onmousewheel = function (event) {
            if (event.wheelDelta > 0) {
                radius -= 0.5;
            } else {
                radius += 0.5;
            }
        };

        //键盘响应事件
        {
            /*
            keyCode 8 = BackSpace BackSpace
            keyCode 9 = Tab Tab
            keyCode 12 = Clear
            keyCode 13 = Enter
            keyCode 16 = Shift_L
            keyCode 17 = Control_L
            keyCode 18 = Alt_L
            keyCode 19 = Pause
            keyCode 20 = Caps_Lock
            keyCode 27 = Escape Escape
            keyCode 32 = space
            keyCode 33 = Prior
            keyCode 34 = Next
            keyCode 35 = End
            keyCode 36 = Home
            keyCode 37 = Left
            keyCode 38 = Up
            keyCode 39 = Right
            keyCode 40 = Down
            keyCode 41 = Select
            keyCode 42 = Print
            keyCode 43 = Execute
            keyCode 45 = Insert
            keyCode 46 = Delete
            keyCode 47 = Help
            keyCode 48 = 0 equal braceright
            keyCode 49 = 1 exclam onesuperior
            keyCode 50 = 2 quotedbl twosuperior
            keyCode 51 = 3 section threesuperior
            keyCode 52 = 4 dollar
            keyCode 53 = 5 percent
            keyCode 54 = 6 ampersand
            keyCode 55 = 7 slash braceleft
            keyCode 56 = 8 parenleft bracketleft
            keyCode 57 = 9 parenright bracketright
            keyCode 65 = a A
            keyCode 66 = b B
            keyCode 67 = c C
            keyCode 68 = d D
            keyCode 69 = e E EuroSign
            keyCode 70 = f F
            keyCode 71 = g G
            keyCode 72 = h H
            keyCode 73 = i I
            keyCode 74 = j J
            keyCode 75 = k K
            keyCode 76 = l L
            keyCode 77 = m M mu
            keyCode 78 = n N
            keyCode 79 = o O
            keyCode 80 = p P
            keyCode 81 = q Q at
            keyCode 82 = r R
            keyCode 83 = s S
            keyCode 84 = t T
            keyCode 85 = u U
            keyCode 86 = v V
            keyCode 87 = w W
            keyCode 88 = x X
            keyCode 89 = y Y
            keyCode 90 = z Z
            keyCode 96 = KP_0 KP_0
            keyCode 97 = KP_1 KP_1
            keyCode 98 = KP_2 KP_2
            keyCode 99 = KP_3 KP_3
            keyCode 100 = KP_4 KP_4
            keyCode 101 = KP_5 KP_5
            keyCode 102 = KP_6 KP_6
            keyCode 103 = KP_7 KP_7
            keyCode 104 = KP_8 KP_8
            keyCode 105 = KP_9 KP_9
            keyCode 106 = KP_Multiply KP_Multiply
            keyCode 107 = KP_Add KP_Add
            keyCode 108 = KP_Separator KP_Separator
            keyCode 109 = KP_Subtract KP_Subtract
            keyCode 110 = KP_Decimal KP_Decimal
            keyCode 111 = KP_Divide KP_Divide
            keyCode 112 = F1
            keyCode 113 = F2
            keyCode 114 = F3
            keyCode 115 = F4
            keyCode 116 = F5
            keyCode 117 = F6
            keyCode 118 = F7
            keyCode 119 = F8
            keyCode 120 = F9
            keyCode 121 = F10
            keyCode 122 = F11
            keyCode 123 = F12
            keyCode 124 = F13
            keyCode 125 = F14
            keyCode 126 = F15
            keyCode 127 = F16
            keyCode 128 = F17
            keyCode 129 = F18
            keyCode 130 = F19
            keyCode 131 = F20
            keyCode 132 = F21
            keyCode 133 = F22
            keyCode 134 = F23
            keyCode 135 = F24
            keyCode 136 = Num_Lock
            keyCode 137 = Scroll_Lock
            keyCode 187 = acute grave
            keyCode 188 = comma semicolon
            keyCode 189 = minus underscore
            keyCode 190 = period colon
            keyCode 192 = numbersign apostrophe
            keyCode 210 = plusminus hyphen macron
            keyCode 211 =
            keyCode 212 = copyright registered
            keyCode 213 = guillemotleft guillemotright
            keyCode 214 = masculine ordfeminine
            keyCode 215 = ae AE
            keyCode 216 = cent yen
            keyCode 217 = questiondown exclamdown
            keyCode 218 = onequarter onehalf threequarters
            keyCode 220 = less greater bar
            keyCode 221 = plus asterisk asciitilde
            keyCode 227 = multiply division
            keyCode 228 = acircumflex Acircumflex
            keyCode 229 = ecircumflex Ecircumflex
            keyCode 230 = icircumflex Icircumflex
            keyCode 231 = ocircumflex Ocircumflex
            keyCode 232 = ucircumflex Ucircumflex
            keyCode 233 = ntilde Ntilde
            keyCode 234 = yacute Yacute
            keyCode 235 = oslash Ooblique
            keyCode 236 = aring Aring
            keyCode 237 = ccedilla Ccedilla
            keyCode 238 = thorn THORN
            keyCode 239 = eth ETH
            keyCode 240 = diaeresis cedilla currency
            keyCode 241 = agrave Agrave atilde Atilde
            keyCode 242 = egrave Egrave
            keyCode 243 = igrave Igrave
            keyCode 244 = ograve Ograve otilde Otilde
            keyCode 245 = ugrave Ugrave
            keyCode 246 = adiaeresis Adiaeresis
            keyCode 247 = ediaeresis Ediaeresis
            keyCode 248 = idiaeresis Idiaeresis
            keyCode 249 = odiaeresis Odiaeresis
            keyCode 250 = udiaeresis Udiaeresis
            keyCode 251 = ssharp question backslash
            keyCode 252 = asciicircum degree
            keyCode 253 = 3 sterling
            keyCode 254 = Mode_switch
            */
        }


        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (!isWandering)
                switch (e.keyCode) {
                    /*******F1******/
                    case 87:
                        f1Tx += 0.1 * f1Forwards[0];
                        f1Ty += 0.1 * f1Forwards[1];
                        f1Tz += 0.1 * f1Forwards[2];
                        break;
                    case 83:
                        f1Tx -= 0.1 * f1Forwards[0];
                        f1Ty -= 0.1 * f1Forwards[1];
                        f1Tz -= 0.1 * f1Forwards[2];
                        break;
                    case 65:
                        f1RotateAngle -= 5;
                        break;
                    case 68:
                        f1RotateAngle += 5;
                        break;
                        // 1: Smaller F1
                    case 49:
                        f1ScalePercent -= 0.05;
                        break;
                        // 2: Bigger F1
                    case 50:
                        f1ScalePercent += 0.05;
                        break;

                        /**********sktBrd***********/
                    case 38:
                        sktBrdTx += 0.1 * sktBrdForwards[0];
                        sktBrdTy += 0.1 * sktBrdForwards[1];
                        sktBrdTz += 0.1 * sktBrdForwards[2];
                        break;
                    case 40:
                        sktBrdTx -= 0.1 * sktBrdForwards[0];
                        sktBrdTy -= 0.1 * sktBrdForwards[1];
                        sktBrdTz -= 0.1 * sktBrdForwards[2];
                        break;
                    case 37:
                        sktBrdRotateAngle -= 5;
                        break;
                    case 39:
                        sktBrdRotateAngle += 5;
                        break;
                        // 3: Smaller sktBrd
                    case 51:
                        sktBrdScalePercent -= 0.05;
                        break;
                        // 4: Bigger sktBrd
                    case 52:
                        sktBrdScalePercent += 0.05;
                        break;

                        /*************Light**************/
                        // I: light front
                    case 73:
                        lightPosition[2] += 0.1;
                        lightTz = lightPosition[2];
                        break;
                        // K: light back
                    case 75:
                        lightPosition[2] -= 0.1;
                        lightTz = lightPosition[2];
                        break;
                        // J: light left
                    case 74:
                        lightPosition[0] -= 0.1;
                        lightTx = lightPosition[0];
                        break;
                        // L: light right
                    case 76:
                        lightPosition[0] += 0.1;
                        lightTx = lightPosition[0];
                        break;
                        // U: light up
                    case 85:
                        lightPosition[1] += 0.1;
                        lightTy = lightPosition[1];
                        break;
                        // O: light down
                    case 79:
                        lightPosition[1] -= 0.1;
                        lightTy = lightPosition[1];
                        break;
                        // 5: Smaller light
                    case 53:
                        lightScalePercent -= 0.05;
                        break;
                        // 6: Bigger light
                    case 54:
                        lightScalePercent += 0.05;
                        break;
                }
            else {
                switch (e.keyCode) {
                    case 37:
                        if (rotationDirection)
                            rotationDelta -= 0.1;
                        else
                            rotationDelta += 0.1;
                        break;
                    case 39:
                        if (rotationDirection)
                            rotationDelta += 0.1;
                        else
                            rotationDelta -= 0.1;
                        break;
                    case 38:
                        height += 0.1;
                        break;
                    case 40:
                        height -= 0.1;
                        break;
                }
            }
        }

    }

    // 6.初始化光源位置以及乘积
    {
        gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
            flatten(lightPosition));
        gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
            flatten(ambientProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
            flatten(diffuseProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
            flatten(specularProduct));
        gl.uniform1f(gl.getUniformLocation(program, "shininess"),
            materialShininess);
    }

    var image0 = document.getElementById("startLine");

    configureTexture0(image0);

    var image1 = document.getElementById("road");

    configureTexture1(image1);

    var image2 = document.getElementById("steel");

    configureTexture2(image2);

    var image3 = document.getElementById("wood");

    configureTexture3(image3);

    // 7.渲染
    render();
}

//渲染
function render() {
    if (isWandering) {
        if (rotationDirection)
            theta -= dr * rotationDelta;
        else
            theta += dr * rotationDelta;
        phi = 0;
        eye = vec3(radius * Math.sin(theta) * Math.cos(phi),
            radius * height, //*Math.sin(theta)*Math.sin(phi),
            radius * Math.cos(theta));
    } else {
        eye = vec3(radius * Math.sin(theta) * Math.cos(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(theta));
    }
    //1.清空缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //初始视图
    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = perspective(fovy, aspect, near, far);
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix)); //!!!每次画一个对象之前把模型视图矩阵更新！

    /*****************************起跑线相关***********************************/
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, startingLineCBuffer);
        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, startingLineVBuffer);
        gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, startingLineNBuffer);
        gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, startingLineTBuffer);
        gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);

        //起跑线材质
        materialAmbient = vec4(1.0, 1.0, 1.0, 1.0);
        materialDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
        materialSpecular = vec4(1.0, 1.0, 1.0, 1.0);
        materialShininess = 100.0;

        ambientProduct = mult(lightAmbient, materialAmbient);
        diffuseProduct = mult(lightDiffuse, materialDiffuse);
        specularProduct = mult(lightSpecular, materialSpecular);

        gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
            flatten(ambientProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
            flatten(diffuseProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
            flatten(specularProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
            flatten(lightPosition));
        gl.uniform1f(gl.getUniformLocation(program, "shininess"),
            materialShininess);

        gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.drawArrays(gl.TRIANGLES, 0, startingLineVertices.length);
    }

    /********************************赛道相关********************************/
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, roadCBuffer);
        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, roadVBuffer);
        gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, roadNBuffer);
        gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, roadTBuffer);
        gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);

        materialAmbient = vec4(1.0, 1.0, 1.0, 1.0);
        materialDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
        materialSpecular = vec4(1.0, 1.0, 1.0, 1.0);
        materialShininess = 100.0;

        ambientProduct = mult(lightAmbient, materialAmbient);
        diffuseProduct = mult(lightDiffuse, materialDiffuse);
        specularProduct = mult(lightSpecular, materialSpecular);

        gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
            flatten(ambientProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
            flatten(diffuseProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
            flatten(specularProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
            flatten(lightPosition));
        gl.uniform1f(gl.getUniformLocation(program, "shininess"),
            materialShininess);

        gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 1);
        gl.activeTexture(gl.TEXTURE1);
        gl.drawArrays(gl.TRIANGLES, 0, roadVertices.length);
    }

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), -1);

    /***********************************F1相关********************************/
    for (var agt in agents) {
        why_drawF1(agents[agt].loc.x / 10, agents[agt].loc.y / 10, toAngle(agents[agt].vel.x, agents[agt].vel.y));
    }
    // why_drawF1(0.5, 0.5, -Math.PI / 2);

    function why_drawF1(x, y, ang) {
        // ① F1变换
        {
            var init = translate(-0.8, 0, 0);
            var S = scalem(f1ScalePercent/4, f1ScalePercent/4, f1ScalePercent/4);
            var T = translate(f1Tx + (x * 6 - 2), f1Ty - 0.2, f1Tz + ((y * 6) - 2));
            var R = rotateY(f1RotateAngle + ang * 180 / Math.PI);

            var f1ModelMatrix = mult(mult(mult(init, T), R), S);
            var f1ModelViewMatrix = lookAt(eye, at, up); //复制初值！！！

            f1ModelViewMatrix = mult(f1ModelViewMatrix, f1ModelMatrix);

            // ② 记录F1正面的方向
            var m = mult(mult(T, R), S); // 用于处理正面的方向
            f1Forwards = vec4(0, 0, 1.0, 1.0);
            f1Forwards = multMat4Vec4(m, f1Forwards);

            // ③ modelViewMatrix和normalMatrix
            // #1 modelViewMatrix
            gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(f1ModelViewMatrix)); //!!!每次画一个对象之前把模型视图矩阵更新！

            // #2 normalMatrix
            normalMatrix = f1ModelMatrix;
            gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));
        }

        // 车身
        {
            gl.bindBuffer(gl.ARRAY_BUFFER, f1CBuffer);
            gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, f1VBuffer);
            gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, f1NBuffer);
            gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, f1TBuffer);
            gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);

            materialAmbient = vec4(1.0, 1.0, 0.5, 1.0);
            materialDiffuse = vec4(1.0, 0.8, 0.0, 1.0);
            materialSpecular = vec4(1.0, 1.0, 1.0, 1.0);
            materialShininess = 100.0;

            ambientProduct = mult(lightAmbient, materialAmbient);
            diffuseProduct = mult(lightDiffuse, materialDiffuse);
            specularProduct = mult(lightSpecular, materialSpecular);

            gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
                flatten(ambientProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
                flatten(diffuseProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
                flatten(specularProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
                flatten(lightPosition));
            gl.uniform1f(gl.getUniformLocation(program, "shininess"),
                materialShininess);

            gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 2);
            gl.activeTexture(gl.TEXTURE2);

            gl.drawArrays(gl.TRIANGLES, 0, f1Vertices.length); //渲染数组中的图元
        }

        gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), -1);

        // 车的阴影
        {
            init = translate(-0.8, -0.07, 0);

            f1ModelMatrix = mult(mult(mult(init, T), R), S);
            f1ModelViewMatrix = lookAt(eye, at, up); //复制初值！！！

            f1ModelViewMatrix = mult(f1ModelViewMatrix, f1ModelMatrix);
            f1ModelViewMatrix = mult(f1ModelViewMatrix, translate(lightTx, lightTy, lightTz));
            f1ModelViewMatrix = mult(f1ModelViewMatrix, shaderProjectionMatrix);
            f1ModelViewMatrix = mult(f1ModelViewMatrix, translate(-lightTx, -lightTy,-lightTz));

            gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(f1ModelViewMatrix) );
            gl.uniform1i(gl.getUniformLocation(program, "shadow"), 0);

            gl.drawArrays(gl.TRIANGLES, 0, f1Vertices.length);//渲染数组中的图元

            // 复原
            init = translate(-0.8, 0, 0);
            f1ModelMatrix = mult(mult(mult(init, T), R), S);
            f1ModelViewMatrix = lookAt( eye, at, up );
            gl.uniform1i(gl.getUniformLocation(program, "shadow"), 1);

            f1ModelViewMatrix = mult(f1ModelViewMatrix, f1ModelMatrix);
            gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(f1ModelViewMatrix) );
        }

        // 车轮底面
        {
            materialAmbient = vec4(1.0, 0.0, 0.0, 1.0);
            materialDiffuse = vec4(1.0, 0.0, 0.0, 1.0);
            materialSpecular = vec4(1.0, 0.0, 0.0, 1.0);
            materialShininess = 100.0;

            ambientProduct = mult(lightAmbient, materialAmbient);
            diffuseProduct = mult(lightDiffuse, materialDiffuse);
            specularProduct = mult(lightSpecular, materialSpecular);
            gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
                flatten(ambientProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
                flatten(diffuseProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
                flatten(specularProduct));
            gl.uniform1f(gl.getUniformLocation(program, "shininess"),
                materialShininess);

            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelBottomCBuffer);
            gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelBottomVBuffer);
            gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelBottomNBuffer);
            gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.TRIANGLES, 0, f1WheelBottomVertices.length);
        }

        // 车的阴影
        {
            f1ModelViewMatrix = mult(f1ModelViewMatrix, translate(lightTx, lightTy, lightTz));
            f1ModelViewMatrix = mult(f1ModelViewMatrix, shaderProjectionMatrix);
            f1ModelViewMatrix = mult(f1ModelViewMatrix, translate(-lightTx, -lightTy,-lightTz));

            gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(f1ModelViewMatrix) );
            gl.uniform1i(gl.getUniformLocation(program, "shadow"), 0);

            gl.drawArrays(gl.TRIANGLES, 0, f1Vertices.length);//渲染数组中的图元

            // 复原
            f1ModelMatrix = mult(mult(mult(init, T), R), S);
            f1ModelViewMatrix = lookAt( eye, at, up );//复制初值！！！
            gl.uniform1i(gl.getUniformLocation(program, "shadow"), 1);

            f1ModelViewMatrix = mult(f1ModelViewMatrix, f1ModelMatrix);
            gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(f1ModelViewMatrix) );
        }


        // 车轮侧面
        {
            materialAmbient = vec4(0.0, 0.0, 0.0, 1.0);
            materialDiffuse = vec4(0.0, 0.0, 0.0, 1.0);
            materialSpecular = vec4(0.0, 0.0, 0.0, 1.0);
            materialShininess = 100.0;

            ambientProduct = mult(lightAmbient, materialAmbient);
            diffuseProduct = mult(lightDiffuse, materialDiffuse);
            specularProduct = mult(lightSpecular, materialSpecular);
            gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
                flatten(ambientProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
                flatten(diffuseProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
                flatten(specularProduct));
            gl.uniform1f(gl.getUniformLocation(program, "shininess"),
                materialShininess);

            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelSideCBuffer);
            gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelSideVBuffer);
            gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelSideNBuffer);
            gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.TRIANGLES, 0, f1WheelSideVertices.length);
        }

        // 车的阴影
        {
            f1ModelViewMatrix = mult(f1ModelViewMatrix, translate(lightTx, lightTy, lightTz));
            f1ModelViewMatrix = mult(f1ModelViewMatrix, shaderProjectionMatrix);
            f1ModelViewMatrix = mult(f1ModelViewMatrix, translate(-lightTx, -lightTy,-lightTz));

            gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(f1ModelViewMatrix) );
            gl.uniform1i(gl.getUniformLocation(program, "shadow"), 0);

            gl.drawArrays(gl.TRIANGLES, 0, f1Vertices.length);//渲染数组中的图元

            // 复原
            f1ModelMatrix = mult(mult(mult(init, T), R), S);
            f1ModelViewMatrix = lookAt( eye, at, up );//复制初值！！！
            gl.uniform1i(gl.getUniformLocation(program, "shadow"), 1);

            f1ModelViewMatrix = mult(f1ModelViewMatrix, f1ModelMatrix);
            gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(f1ModelViewMatrix) );
        }


    }


    /***********************************滑板相关********************************/
    {
        //变换
        {
            var init = translate(0.8, 0, 0);
            var S = scalem(sktBrdScalePercent, sktBrdScalePercent, sktBrdScalePercent);
            var T = translate(sktBrdTx, sktBrdTy, sktBrdTz);
            var R = rotateY(sktBrdRotateAngle);

            var sktBrdModelMatrix = mult(mult(mult(init, T), R), S);
            var sktBrdModelViewMatrix = lookAt(eye, at, up); //复制初值！！！
            sktBrdModelViewMatrix = mult(sktBrdModelViewMatrix, sktBrdModelMatrix);

            m = mult(mult(T, R), S);
            sktBrdForwards = vec4(0, 0, 1.0, 1.0);
            sktBrdForwards = multMat4Vec4(m, sktBrdForwards);

            gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(sktBrdModelViewMatrix)); //!!!每次画一个对象之前把模型视图矩阵更新！

            normalMatrix = sktBrdModelMatrix;
            gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));
        }

        //滑板主体
        {
            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdCBuffer);
            gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdVBuffer);
            gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdNBuffer);
            gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdTBuffer);
            gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);

            materialAmbient = vec4(0.8, 0.5, 0.3, 1.0);
            materialDiffuse = vec4(0.8, 0.5, 0.3, 1.0);
            materialSpecular = vec4(0.8, 0.5, 0.3, 1.0);
            materialShininess = 100.0;

            ambientProduct = mult(lightAmbient, materialAmbient);
            diffuseProduct = mult(lightDiffuse, materialDiffuse);
            specularProduct = mult(lightSpecular, materialSpecular);
            gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
                flatten(ambientProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
                flatten(diffuseProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
                flatten(specularProduct));
            gl.uniform1f(gl.getUniformLocation(program, "shininess"),
                materialShininess);

            gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 3);
            gl.activeTexture(gl.TEXTURE3);

            gl.drawArrays(gl.TRIANGLES, 0, sktBrdVertices.length);
        }

        gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), -1);

        //车轮底面
        {
            materialAmbient = vec4(0.0, 0.0, 1.0, 1.0);
            materialDiffuse = vec4(0.0, 0.0, 1.0, 1.0);
            materialSpecular = vec4(0.0, 0.0, 1.0, 1.0);
            materialShininess = 100.0;

            ambientProduct = mult(lightAmbient, materialAmbient);
            diffuseProduct = mult(lightDiffuse, materialDiffuse);
            specularProduct = mult(lightSpecular, materialSpecular);
            gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
                flatten(ambientProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
                flatten(diffuseProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
                flatten(specularProduct));
            gl.uniform1f(gl.getUniformLocation(program, "shininess"),
                materialShininess);

            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelBottomCBuffer);
            gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelBottomVBuffer);
            gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelBottomNBuffer);
            gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.TRIANGLES, 0, sktBrdWheelBottomVertices.length);
        }

        //车轮侧面
        {
            materialAmbient = vec4(0.0, 0.0, 0.0, 1.0);
            materialDiffuse = vec4(0.0, 0.0, 0.0, 1.0);
            materialSpecular = vec4(0.0, 0.0, 0.0, 1.0);
            materialShininess = 100.0;

            ambientProduct = mult(lightAmbient, materialAmbient);
            diffuseProduct = mult(lightDiffuse, materialDiffuse);
            specularProduct = mult(lightSpecular, materialSpecular);
            gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
                flatten(ambientProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
                flatten(diffuseProduct));
            gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
                flatten(specularProduct));
            gl.uniform1f(gl.getUniformLocation(program, "shininess"),
                materialShininess);

            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelSideCBuffer);
            gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelSideVBuffer);
            gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelSideNBuffer);
            gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.TRIANGLES, 0, sktBrdWheelSideVertices.length);
        }


    }

    /**************************光源相关****************************/
    {
        var S = scalem(lightScalePercent, lightScalePercent, lightScalePercent);
        var T = translate(lightTx, lightTy, lightTz);

        var lightModelMatrix = mult(T, S);
        var lightModelViewMatrix = lookAt(eye, at, up);
        lightModelViewMatrix = mult(lightModelViewMatrix, lightModelMatrix);

        m = mult(T, S);
        lightForwards = vec4(0, 0, 1.0, 1.0);
        lightForwards = multMat4Vec4(m, lightForwards);

        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(lightModelViewMatrix));

        normalMatrix = lightModelMatrix;
        gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));

        materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
        materialDiffuse = vec4(1.0, 0.8, 0.0, 1.0);
        materialSpecular = vec4(1.0, 1.0, 0.0, 1.0);
        materialShininess = 100.0;

        ambientProduct = mult(lightAmbient, materialAmbient);
        diffuseProduct = mult(lightDiffuse, materialDiffuse);
        specularProduct = mult(lightSpecular, materialSpecular);

        gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
            flatten(ambientProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
            flatten(diffuseProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
            flatten(specularProduct));
        gl.uniform1f(gl.getUniformLocation(program, "shininess"),
            materialShininess);

        gl.bindBuffer(gl.ARRAY_BUFFER, lightCBuffer);
        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, lightVBuffer);
        gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, lightNBuffer);
        gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, lightVertices.length);
    }

    //出场动画
    if (isInitializing) {
        if (theta < Math.PI)
            theta += 0.02;
        else
            isInitializing = false;
    }

    //3.实现持续动画效果
    requestAnimFrame(render);
}

/****************************绘制***************************/
// 各个部分的绘制
// 绘制起跑线
function startingLine() {
    var metaSquare = [
        vec4(-1.5, -0.3, -1.4, 1.0), //0
        vec4(-1.5, -0.3, -0.6, 1.0), //1
        vec4(-0.7, -0.3, -0.6, 1.0), //2
        vec4(-0.7, -0.3, -1.4, 1.0), //3
        vec4(-0.7, -0.4, -1.4, 1.0), //4
        vec4(-0.7, -0.4, -0.6, 1.0), //5
        vec4(-1.5, -0.4, -0.6, 1.0), //6
        vec4(-1.5, -0.4, -1.4, 1.0) //7
    ];
    for (var i = 0; i < 4; i++)
        for (var j = -2; j < 6; j++) {
            var vertices = [];
            for (v in metaSquare) {
                vertices.push(vec4(metaSquare[v][0] + 0.8 * j, metaSquare[v][1], metaSquare[v][2] + 0.8 * i, metaSquare[v][3]));
                startingLineTexCoordArray.push(texCoord[0]);
                startingLineTexCoordArray.push(texCoord[1]);
                startingLineTexCoordArray.push(texCoord[2]);
                startingLineTexCoordArray.push(texCoord[2]);
                startingLineTexCoordArray.push(texCoord[3]);
                startingLineTexCoordArray.push(texCoord[0]);
            }
            getCubeVertex(vertices, startingLineVertices, startingLineColor, startingLineNormalsArray);
        }
}

// 绘制赛道
function road() {
    var metaSquare = [
        vec4(-1.5, -0.3, -1.4, 1.0), //0
        vec4(-1.5, -0.3, 0.2, 1.0), //1
        vec4(0.1, -0.3, 0.2, 1.0), //2
        vec4(0.1, -0.3, -1.4, 1.0), //3
        vec4(0.1, -0.4, -1.4, 1.0), //4
        vec4(0.1, -0.4, 0.2, 1.0), //5
        vec4(-1.5, -0.4, 0.2, 1.0), //6
        vec4(-1.5, -0.4, -1.4, 1.0) //7
    ];
    for (var i = -4; i < 0; i++)
        for (var j = -1; j < 3; j++) {
            var vertices = [];
            for (v in metaSquare) {
                vertices.push(vec4(metaSquare[v][0] + 1.6 * j, metaSquare[v][1], metaSquare[v][2] + 1.6 * i, metaSquare[v][3]));
                roadTexArray.push(texCoord[0]);
                roadTexArray.push(texCoord[1]);
                roadTexArray.push(texCoord[2]);
                roadTexArray.push(texCoord[2]);
                roadTexArray.push(texCoord[3]);
                roadTexArray.push(texCoord[0]);
            }
            getCubeVertex(vertices, roadVertices, roadColor, roadNormalsArray);
        }
    for (var i = 2; i < 8; i++)
        for (var j = -1; j < 3; j++) {
            var vertices = [];
            for (v in metaSquare) {
                vertices.push(vec4(metaSquare[v][0] + 1.6 * j, metaSquare[v][1], metaSquare[v][2] + 1.6 * i, metaSquare[v][3]));
                roadTexArray.push(texCoord[0]);
                roadTexArray.push(texCoord[1]);
                roadTexArray.push(texCoord[2]);
                roadTexArray.push(texCoord[2]);
                roadTexArray.push(texCoord[3]);
                roadTexArray.push(texCoord[0]);
            }
            getCubeVertex(vertices, roadVertices, roadColor, roadNormalsArray);
        }
}

// 绘制F1
function drawF1() {
    //左前车轮
    getCylinderVertex(-0.8, 0, 1.2, //车轮底面坐标
        0.2, 0.3, 100, 360, //车轮厚度、半径、面数、度数
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        f1WheelBottomVertices, f1WheelBottomColor, f1WheelSideVertices, f1WheelSideColor,
        f1WheelBottomNormals, f1WheelSideNormals,
        [], []);
    //右前车轮
    getCylinderVertex(0.6, 0, 1.2,
        0.2, 0.3, 100, 360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        f1WheelBottomVertices, f1WheelBottomColor, f1WheelSideVertices, f1WheelSideColor,
        f1WheelBottomNormals, f1WheelSideNormals,
        [], []);
    //前车轴
    getCylinderVertex(-0.85, 0, 1.2,
        1.7, 0.05, 100, 360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[3], vertexColors[4],
        f1Vertices, f1Color, f1Vertices, f1Color,
        f1NormalsArray, f1NormalsArray,
        f1TexCoordArray, f1TexCoordArray);
    //左后车轮
    getCylinderVertex(-0.8, 0, -0.9,
        0.2, 0.3, 100, 360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        f1WheelBottomVertices, f1WheelBottomColor, f1WheelSideVertices, f1WheelSideColor,
        f1WheelBottomNormals, f1WheelSideNormals,
        [], []);
    //右后车轮
    getCylinderVertex(0.6, 0, -0.9,
        0.2, 0.3, 100, 360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        f1WheelBottomVertices, f1WheelBottomColor, f1WheelSideVertices, f1WheelSideColor,
        f1WheelBottomNormals, f1WheelSideNormals,
        [], []);
    //后车轴
    getCylinderVertex(-0.85, 0, -0.9,
        1.7, 0.05, 100, 360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[3], vertexColors[4],
        f1Vertices, f1Color, f1Vertices, f1Color,
        f1NormalsArray, f1NormalsArray,
        f1TexCoordArray, f1TexCoordArray);
    //车前身
    getPyramidVertex(frontBodyBaseVertices, f1Vertices, f1Color, f1NormalsArray);
    getPyramidTexCoord(f1TexCoordArray);

    //车前身下悬挂板
    getPrismoidVertex(headBaseVertices, f1Vertices, f1Color, f1NormalsArray);
    getPrismoidTexCoord(f1TexCoordArray);

    //车舱        
    getCapsuleVertex(capsuleBaseVertices, f1Vertices, f1Color, f1NormalsArray);
    getCapsuleTexCoord(f1TexCoordArray);

    //车门
    getCubeVertex(leftDoorBaseVertices, f1Vertices, f1Color, f1NormalsArray);
    getCubeTexCoord(f1TexCoordArray);
    getCubeVertex(rightDoorBaseVertices, f1Vertices, f1Color, f1NormalsArray);
    getCubeTexCoord(f1TexCoordArray);

    //车后身
    getPrismoidVertex(backBodyBigPrismoidBaseVertices, f1Vertices, f1Color, f1NormalsArray);
    getPrismoidTexCoord(f1TexCoordArray);
    getCubeVertex(backBodyCubeBaseVertices, f1Vertices, f1Color, f1NormalsArray);
    getCubeTexCoord(f1TexCoordArray);
    getPrismoidVertex(backBodySmallPrismoidBaseVertices1, f1Vertices, f1Color, f1NormalsArray);
    getPrismoidTexCoord(f1TexCoordArray);
    getPrismoidVertex(backBodySmallPrismoidBaseVertices2, f1Vertices, f1Color, f1NormalsArray);
    getPrismoidTexCoord(f1TexCoordArray);

    //尾翼
    getPrismoidVertex(tailWingBaseVertices, f1Vertices, f1Color, f1NormalsArray);
    getPrismoidTexCoord(f1TexCoordArray);
    getCubeVertex(tailWingStickBaseVertices1, f1Vertices, f1Color, f1NormalsArray);
    getCubeTexCoord(f1TexCoordArray);
    getCubeVertex(tailWingStickBaseVertices2, f1Vertices, f1Color, f1NormalsArray);
    getCubeTexCoord(f1TexCoordArray);

}

// 绘制滑板
function drawSktBrd() {
    //滑板身体部分
    getPrismoidVertex(sktBrdFrontBaseVertices, sktBrdVertices, sktBrdColor, sktBrdNormalsArray);
    getPrismoidTexCoord(sktBrdTexCoordArray);
    getCubeVertex(sktBrdBodyBaseVertices, sktBrdVertices, sktBrdColor, sktBrdNormalsArray);
    getCubeTexCoord(sktBrdTexCoordArray);
    getPrismoidVertex(sktBrdBackBaseVertices, sktBrdVertices, sktBrdColor, sktBrdNormalsArray);
    getPrismoidTexCoord(sktBrdTexCoordArray);

    //滑板左前轮
    getCylinderVertex(-0.2, -0.2, 1.2, //车轮底面坐标
        0.1, 0.1, 100, 360, //车轮厚度、半径、面数、度数
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        sktBrdWheelBottomVertices, sktBrdWheelBottomColor, sktBrdWheelSideVertices, sktBrdWheelSideColor,
        sktBrdWheelBottomNormals, sktBrdWheelSideNormals,
        [], []);
    //滑板右前轮
    getCylinderVertex(0.1, -0.2, 1.2,
        0.1, 0.1, 100, 360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        sktBrdWheelBottomVertices, sktBrdWheelBottomColor, sktBrdWheelSideVertices, sktBrdWheelSideColor,
        sktBrdWheelBottomNormals, sktBrdWheelSideNormals,
        [], []);
    //前轴
    getCylinderVertex(-0.2, -0.2, 1.2,
        0.4, 0.025, 100, 360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[3], vertexColors[4],
        sktBrdVertices, sktBrdColor, sktBrdVertices, sktBrdColor,
        sktBrdNormalsArray, sktBrdNormalsArray,
        [], []);
    getCubeVertex(sktBrdFrontAxleBaseVertices, sktBrdVertices, sktBrdColor, sktBrdNormalsArray);
    getCubeTexCoord(sktBrdTexCoordArray);
    //滑板左后轮
    getCylinderVertex(-0.2, -0.2, 0,
        0.1, 0.1, 100, 360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        sktBrdWheelBottomVertices, sktBrdWheelBottomColor, sktBrdWheelSideVertices, sktBrdWheelSideColor,
        sktBrdWheelBottomNormals, sktBrdWheelSideNormals,
        [], []);
    //滑板右后轮
    getCylinderVertex(0.1, -0.2, 0,
        0.1, 0.1, 100, 360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        sktBrdWheelBottomVertices, sktBrdWheelBottomColor, sktBrdWheelSideVertices, sktBrdWheelSideColor,
        sktBrdWheelBottomNormals, sktBrdWheelSideNormals,
        [], []);
    //后轴
    getCylinderVertex(-0.2, -0.2, 0,
        0.4, 0.025, 100, 360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[3], vertexColors[4],
        sktBrdVertices, sktBrdColor, sktBrdVertices, sktBrdColor,
        sktBrdNormalsArray, sktBrdNormalsArray,
        [], []);
    getCubeVertex(sktBrdBackAxleBaseVertices, sktBrdVertices, sktBrdColor, sktBrdNormalsArray);
    getCubeTexCoord(sktBrdTexCoordArray);
}

// 绘制光源
function drawLight() {
    getCubeVertex(lightBaseVertices, lightVertices, lightColor, lightNormalsArray);
}

/********************创建&绑定缓冲区*************************/
function createAndBindVCNTBuffer() {

    // ① 顶点
    {
        // f1赛车顶点
        {
            f1VBuffer = gl.createBuffer(); //创建顶点缓冲区
            gl.bindBuffer(gl.ARRAY_BUFFER, f1VBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(f1Vertices), gl.STATIC_DRAW);

            //车轮底面
            f1WheelBottomVBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelBottomVBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(f1WheelBottomVertices), gl.STATIC_DRAW);

            //车轮侧面
            f1WheelSideVBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelSideVBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(f1WheelSideVertices), gl.STATIC_DRAW);
        }

        // 滑板顶点
        {
            //车身
            sktBrdVBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdVBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdVertices), gl.STATIC_DRAW);

            //车轮底面
            sktBrdWheelBottomVBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelBottomVBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdWheelBottomVertices), gl.STATIC_DRAW);

            //车轮侧面
            sktBrdWheelSideVBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelSideVBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdWheelSideVertices), gl.STATIC_DRAW);
        }

        // 起跑线
        {
            startingLineVBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, startingLineVBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(startingLineVertices), gl.STATIC_DRAW);
        }

        // 光源
        {
            lightVBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, lightVBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(lightVertices), gl.STATIC_DRAW);
        }

        //赛道
        {
            roadVBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, roadVBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(roadVertices), gl.STATIC_DRAW);
        }
    }

    // ② 颜色
    {
        // f1赛车颜色
        {
            f1CBuffer = gl.createBuffer(); //创建颜色缓冲区
            gl.bindBuffer(gl.ARRAY_BUFFER, f1CBuffer); //绑定缓冲区
            gl.bufferData(gl.ARRAY_BUFFER, flatten(f1Color), gl.STATIC_DRAW); //绑定数据

            //车轮底面
            f1WheelBottomCBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelBottomCBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(f1WheelBottomColor), gl.STATIC_DRAW);

            //车轮侧面
            f1WheelSideCBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelSideCBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(f1WheelSideColor), gl.STATIC_DRAW);
        }

        // 滑板颜色
        {
            //车身
            sktBrdCBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdCBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdColor), gl.STATIC_DRAW);

            //车轮底面
            sktBrdWheelBottomCBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelBottomCBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdWheelBottomColor), gl.STATIC_DRAW);

            //车轮侧面
            sktBrdWheelSideCBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelSideCBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdWheelSideColor), gl.STATIC_DRAW);
        }

        // 起跑线颜色
        {
            startingLineCBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, startingLineCBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(startingLineColor), gl.STATIC_DRAW);
        }

        // 光源颜色
        {
            lightCBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, lightCBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(lightColor), gl.STATIC_DRAW);
        }

        // 路面颜色
        {
            roadCBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, roadCBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(roadColor), gl.STATIC_DRAW);
        }
    }

    // ③ 法向量
    {
        // f1法向量
        {
            f1NBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, f1NBuffer); //绑定缓冲区
            gl.bufferData(gl.ARRAY_BUFFER, flatten(f1NormalsArray), gl.STATIC_DRAW); //绑定数据

            f1WheelBottomNBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelBottomNBuffer); //绑定缓冲区
            gl.bufferData(gl.ARRAY_BUFFER, flatten(f1WheelBottomNormals), gl.STATIC_DRAW); //绑定数据

            f1WheelSideNBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, f1WheelSideNBuffer); //绑定缓冲区
            gl.bufferData(gl.ARRAY_BUFFER, flatten(f1WheelSideNormals), gl.STATIC_DRAW); //绑定数据
        }

        // 滑板法向量
        {
            sktBrdNBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdNBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdNormalsArray), gl.STATIC_DRAW);

            sktBrdWheelBottomNBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelBottomNBuffer); //绑定缓冲区
            gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdWheelBottomNormals), gl.STATIC_DRAW); //绑定数据

            sktBrdWheelSideNBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdWheelSideNBuffer); //绑定缓冲区
            gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdWheelSideNormals), gl.STATIC_DRAW); //绑定数据
        }

        // 起跑线法向量
        {
            startingLineNBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, startingLineNBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(startingLineNormalsArray), gl.STATIC_DRAW);
        }

        // 光源法向量
        {
            lightNBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, lightNBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(lightNormalsArray), gl.STATIC_DRAW);
        }

        //赛道法向量
        {
            roadNBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, roadNBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(roadNormalsArray), gl.STATIC_DRAW);
        }
    }

    // ④ 纹理
    {
        //起跑线
        {
            startingLineTBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, startingLineTBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(startingLineTexCoordArray), gl.STATIC_DRAW);
        }

        //F1赛车
        {
            f1TBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, f1TBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(f1TexCoordArray), gl.STATIC_DRAW);
        }

        //滑板
        {
            sktBrdTBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdTBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdTexCoordArray), gl.STATIC_DRAW);
        }

        //赛道
        {
            roadTBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, roadTBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(roadTexArray), gl.STATIC_DRAW);
        }
    }

}
/***********************************************************/

// 计算矩阵作用于向量的结果，mat4 * vec4
function multMat4Vec4(mat4, vector) {
    var newVec = [];
    for (var i = 0; i < 4; i++) {
        newVec.push(mat4[i][0] * vector[0] +
            mat4[i][1] * vector[1] +
            mat4[i][2] * vector[2] +
            mat4[i][3] * vector[3]);
    }
    return newVec;
}

//画三角形
function triangle(a, b, c, color_index, vertices, color, normals) {
    var t1 = subtract(b, a);
    var t2 = subtract(c, b);
    var normal = cross(t1, t2);
    normal = vec4(normal[0], normal[1], normal[2], 0.0);

    color.push(vertexColors[color_index]);
    vertices.push(a);
    normals.push(normal);
    color.push(vertexColors[color_index]);
    vertices.push(b);
    normals.push(normal);
    color.push(vertexColors[color_index]);
    vertices.push(c);
    normals.push(normal);
}

//画四棱锥
function getPyramidVertex(base_vertices, vertices, color, normals) {
    var indices = [ //四棱锥顶点绘制索引顺序
        0, 2, 1,
        0, 1, 3,
        0, 4, 2,
        0, 3, 4,
        1, 2, 4,
        4, 3, 1
    ];

    triangle(base_vertices[0], base_vertices[2], base_vertices[1], 4, vertices, color, normals);
    triangle(base_vertices[0], base_vertices[1], base_vertices[3], 4, vertices, color, normals);
    triangle(base_vertices[0], base_vertices[4], base_vertices[2], 4, vertices, color, normals);
    triangle(base_vertices[0], base_vertices[3], base_vertices[4], 1, vertices, color, normals);
    triangle(base_vertices[1], base_vertices[2], base_vertices[4], 0, vertices, color, normals);
    triangle(base_vertices[4], base_vertices[3], base_vertices[1], 0, vertices, color, normals);

}

//给四棱锥添加纹理坐标
function getPyramidTexCoord(texCoordArray) {
    for (var i = 0; i < 4; i++) {
        texCoordArray.push(texCoord[0]);
        texCoordArray.push(texCoord[1]);
        texCoordArray.push(texCoord[2]);
    }
    texCoordArray.push(texCoord[0]);
    texCoordArray.push(texCoord[1]);
    texCoordArray.push(texCoord[2]);
    texCoordArray.push(texCoord[2]);
    texCoordArray.push(texCoord[3]);
    texCoordArray.push(texCoord[0]);
}

//画三棱柱
function getPrismoidVertex(base_vertices, vertices, color, normals) {
    var indices = [
        0, 1, 2,
        1, 0, 3,
        3, 4, 1,
        2, 5, 3,
        3, 0, 2,
        1, 4, 5,
        5, 2, 1,
        5, 4, 3
    ];
    triangle(base_vertices[0], base_vertices[1], base_vertices[2], 4, vertices, color, normals);
    triangle(base_vertices[1], base_vertices[0], base_vertices[3], 4, vertices, color, normals);
    triangle(base_vertices[3], base_vertices[4], base_vertices[1], 4, vertices, color, normals);
    triangle(base_vertices[2], base_vertices[5], base_vertices[3], 1, vertices, color, normals);
    triangle(base_vertices[3], base_vertices[0], base_vertices[2], 1, vertices, color, normals);
    triangle(base_vertices[1], base_vertices[4], base_vertices[5], 1, vertices, color, normals);
    triangle(base_vertices[5], base_vertices[2], base_vertices[1], 1, vertices, color, normals);
    triangle(base_vertices[5], base_vertices[4], base_vertices[3], 4, vertices, color, normals);
}

//给三棱柱添加纹理坐标
function getPrismoidTexCoord(texCoordArray) {
    //底面
    texCoordArray.push(texCoord[0]);
    texCoordArray.push(texCoord[1]);
    texCoordArray.push(texCoord[2]);

    //侧面
    texCoordArray.push(texCoord[0]);
    texCoordArray.push(texCoord[1]);
    texCoordArray.push(texCoord[2]);
    texCoordArray.push(texCoord[2]);
    texCoordArray.push(texCoord[3]);
    texCoordArray.push(texCoord[0]);
    texCoordArray.push(texCoord[0]);
    texCoordArray.push(texCoord[1]);
    texCoordArray.push(texCoord[2]);
    texCoordArray.push(texCoord[2]);
    texCoordArray.push(texCoord[3]);
    texCoordArray.push(texCoord[0]);
    texCoordArray.push(texCoord[0]);
    texCoordArray.push(texCoord[1]);
    texCoordArray.push(texCoord[2]);
    texCoordArray.push(texCoord[2]);
    texCoordArray.push(texCoord[3]);
    texCoordArray.push(texCoord[0]);

    //底面
    texCoordArray.push(texCoord[0]);
    texCoordArray.push(texCoord[1]);
    texCoordArray.push(texCoord[2]);
}

//画车舱
function getCapsuleVertex(base_vertices, vertices, color, normals) {
    var indices = [
        0, 1, 2,
        2, 3, 0,
        2, 5, 4,
        4, 3, 2,
        5, 6, 7,
        7, 4, 5,
        6, 9, 8,
        8, 7, 6,
        9, 10, 11,
        11, 8, 9,
        1, 0, 11,
        11, 10, 0,
        2, 1, 6,
        6, 5, 2,
        6, 1, 10,
        10, 9, 6,
        3, 4, 7,
        7, 0, 3,
        7, 8, 11,
        11, 0, 7
    ];
    triangle(base_vertices[0], base_vertices[1], base_vertices[2], 0, vertices, color, normals);
    triangle(base_vertices[2], base_vertices[3], base_vertices[0], 0, vertices, color, normals);
    triangle(base_vertices[2], base_vertices[5], base_vertices[4], 3, vertices, color, normals);
    triangle(base_vertices[4], base_vertices[3], base_vertices[2], 3, vertices, color, normals);
    triangle(base_vertices[5], base_vertices[6], base_vertices[7], 0, vertices, color, normals);
    triangle(base_vertices[7], base_vertices[4], base_vertices[5], 0, vertices, color, normals);
    triangle(base_vertices[6], base_vertices[9], base_vertices[8], 0, vertices, color, normals);
    triangle(base_vertices[8], base_vertices[7], base_vertices[6], 0, vertices, color, normals);
    triangle(base_vertices[9], base_vertices[10], base_vertices[11], 0, vertices, color, normals);
    triangle(base_vertices[11], base_vertices[8], base_vertices[9], 0, vertices, color, normals);
    triangle(base_vertices[1], base_vertices[0], base_vertices[11], 0, vertices, color, normals);
    triangle(base_vertices[11], base_vertices[10], base_vertices[0], 0, vertices, color, normals);
    triangle(base_vertices[2], base_vertices[1], base_vertices[6], 0, vertices, color, normals);
    triangle(base_vertices[6], base_vertices[5], base_vertices[2], 0, vertices, color, normals);
    triangle(base_vertices[6], base_vertices[1], base_vertices[10], 0, vertices, color, normals);
    triangle(base_vertices[10], base_vertices[9], base_vertices[6], 0, vertices, color, normals);
    triangle(base_vertices[3], base_vertices[4], base_vertices[7], 0, vertices, color, normals);
    triangle(base_vertices[7], base_vertices[0], base_vertices[3], 0, vertices, color, normals);
    triangle(base_vertices[7], base_vertices[8], base_vertices[11], 0, vertices, color, normals);
    triangle(base_vertices[11], base_vertices[0], base_vertices[7], 0, vertices, color, normals);
}
//给车舱添加纹理坐标
function getCapsuleTexCoord(texCoordArray) {
    for (var i = 0; i < 10; i++) {
        texCoordArray.push(texCoord[0]);
        texCoordArray.push(texCoord[1]);
        texCoordArray.push(texCoord[2]);
        texCoordArray.push(texCoord[2]);
        texCoordArray.push(texCoord[3]);
        texCoordArray.push(texCoord[0]);
    }
}

//画长方体
function getCubeVertex(base_vertices, vertices, color, normals) {
    var indice = [
        0, 1, 2,
        2, 3, 0,
        3, 2, 5,
        5, 4, 3,
        4, 5, 6,
        6, 7, 4,
        7, 6, 1,
        1, 0, 7,
        0, 3, 4,
        4, 7, 0,
        1, 6, 5,
        5, 2, 1,
    ];

    triangle(base_vertices[0], base_vertices[1], base_vertices[2], 0, vertices, color, normals);
    triangle(base_vertices[2], base_vertices[3], base_vertices[0], 0, vertices, color, normals);
    triangle(base_vertices[3], base_vertices[2], base_vertices[5], 0, vertices, color, normals);
    triangle(base_vertices[5], base_vertices[4], base_vertices[3], 0, vertices, color, normals);
    triangle(base_vertices[4], base_vertices[5], base_vertices[6], 0, vertices, color, normals);
    triangle(base_vertices[6], base_vertices[7], base_vertices[4], 0, vertices, color, normals);
    triangle(base_vertices[7], base_vertices[6], base_vertices[1], 0, vertices, color, normals);
    triangle(base_vertices[1], base_vertices[0], base_vertices[7], 0, vertices, color, normals);
    triangle(base_vertices[0], base_vertices[3], base_vertices[4], 2, vertices, color, normals);
    triangle(base_vertices[4], base_vertices[7], base_vertices[0], 2, vertices, color, normals);
    triangle(base_vertices[1], base_vertices[6], base_vertices[5], 2, vertices, color, normals);
    triangle(base_vertices[5], base_vertices[2], base_vertices[1], 2, vertices, color, normals);
}

//给长方体添加纹理
function getCubeTexCoord(texCoordArray) {
    for (var i = 0; i < 6; i++) {
        texCoordArray.push(texCoord[0]);
        texCoordArray.push(texCoord[1]);
        texCoordArray.push(texCoord[2]);
        texCoordArray.push(texCoord[2]);
        texCoordArray.push(texCoord[3]);
        texCoordArray.push(texCoord[0]);
    }
}

// 画圆柱
// 半径r 面数m 度数c 偏移量offset (x,y,z)底面圆心坐标 h圆柱高度
// 画圆柱
// 半径r 面数m 度数c 偏移量offset (x,y,z)底面圆心坐标 h圆柱高度
//bottomcolor1底面颜色1     bottomcolor2底面颜色2   topcolor1顶部颜色1  topcolor2顶部颜色2  sidecolor1侧面颜色1 sidecolor2侧面颜色2     
//bottomPoints底面顶点数组 bottomPointsColor底面顶点颜色数组 sidePoints侧面顶点数组 sidePointsColor侧面顶点颜色数组 bottomNormals底面法向量数组 sideNormals侧面法向量数组
function getCylinderVertex(x, y, z, h, r, m, c,
    bottomcolor1, bottomcolor2, topcolor1, topcolor2, sidecolor1, sidecolor2,
    bottomPoints, bottomPointsColor, sidePoints, sidePointsColor,
    bottomNormals, sideNormals,
    bottomTexArray, sideTexArray) { //共ms*3*2+ms*6
    var addAng = c / m;
    var angle = 0;
    for (var i = 0; i < m; i++) { //下底面,法向量都朝下
        bottomPoints.push(vec4(x, y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        bottomPointsColor.push(bottomcolor1);
        bottomNormals.push(vec4(-1, 0, 0, 0));
        bottomTexArray.push(texCoord[0]);

        bottomPoints.push(vec4(x, y, z, 1.0));
        bottomPointsColor.push(bottomcolor2);
        bottomNormals.push(vec4(-1, 0, 0, 0));
        bottomTexArray.push(texCoord[1]);

        angle = angle + addAng;
        bottomPoints.push(vec4(x, y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        bottomPointsColor.push(bottomcolor2);
        bottomNormals.push(vec4(-1, 0, 0, 0));
        bottomTexArray.push(texCoord[2]);

    }
    for (var i = 0; i < m; i++) { //上底面,法向量都朝上
        bottomPoints.push(vec4(x + h, y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        bottomPointsColor.push(topcolor1);
        bottomNormals.push(vec4(1, 0, 0, 0));
        bottomTexArray.push(texCoord[2]);

        bottomPoints.push(vec4(x + h, y, z, 1.0));
        bottomPointsColor.push(topcolor2);
        bottomNormals.push(vec4(1, 0, 0, 0));
        bottomTexArray.push(texCoord[3]);

        angle = angle + addAng;
        bottomPoints.push(vec4(x + h, y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        bottomPointsColor.push(topcolor2);
        bottomNormals.push(vec4(1, 0, 0, 0));
        bottomTexArray.push(texCoord[0]);

    }
    for (var i = 0; i < m; i++) { //侧面由多个矩形构成，一个矩形由两个三角形构成
        //第一个三角形
        sidePoints.push(vec4(x, y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        sidePointsColor.push(sidecolor1);
        sideNormals.push(vec4(0, Math.cos(Math.PI / 180 * angle) * r, Math.sin(Math.PI / 180 * angle) * r, 0));
        sideTexArray.push(texCoord[0]);

        sidePoints.push(vec4(x + h, y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        sidePointsColor.push(sidecolor1);
        sideNormals.push(vec4(0, Math.cos(Math.PI / 180 * angle) * r, Math.sin(Math.PI / 180 * angle) * r, 0));
        sideTexArray.push(texCoord[1]);

        var temp = vec4(x + h, y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0);
        angle = angle + addAng;
        sidePoints.push(vec4(x, y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        sidePointsColor.push(sidecolor1);
        sideNormals.push(vec4(0, Math.cos(Math.PI / 180 * angle) * r, Math.sin(Math.PI / 180 * angle) * r, 0));
        sideTexArray.push(texCoord[2]);

        //第二个三角形
        sidePoints.push(vec4(x + h, y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        sidePointsColor.push(sidecolor2);
        sideNormals.push(vec4(0, Math.cos(Math.PI / 180 * angle) * r, Math.sin(Math.PI / 180 * angle) * r, 0));
        sideTexArray.push(texCoord[2]);

        sidePoints.push(vec4(x, y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        sidePointsColor.push(sidecolor2);
        sideNormals.push(vec4(0, Math.cos(Math.PI / 180 * angle) * r, Math.sin(Math.PI / 180 * angle) * r, 0));
        sideTexArray.push(texCoord[3]);

        sidePoints.push(temp);
        sidePointsColor.push(sidecolor2);
        sideNormals.push(vec4(0, temp[1] - y, temp[2] - z, 0));
        sideTexArray.push(texCoord[0]);
    }
}

//画球
function getSphereVertices(color, radius, move_x, move_y, move_z, vertices_ball, colors_ball) {
    var latitudeBands = 30;
    var longitudeBands = 30;
    var ballVertices = [];
    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;

            ballVertices.push(vec4(radius * x, radius * y, radius * z, 1.0));
        }
    }
    for (var i = 0; i < ballVertices.length; i++) {
        var T1 = [move_x, move_y, move_z];
        for (var j = 0; j < ballVertices[i].length; ++j) {
            ballVertices[i][j] += T1[j];
        }
    }

    for (var latNumber1 = 0; latNumber1 < latitudeBands; latNumber1++) {
        for (var longNumber1 = 0; longNumber1 < longitudeBands; longNumber1++) {
            var first = (latNumber1 * (longitudeBands + 1)) + longNumber1;
            var second = first + longitudeBands + 1;
            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[first]);
            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[second]);
            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[first + 1]);

            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[second]);
            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[second + 1]);
            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[first + 1]);
        }
    }
}

// 画圆锥
// 半径r 面数m 度数c 偏移量offset (x,y,z)底面圆心坐标 h圆锥顶点距离底部的距离
function getConeVertex(x, y, z, h, r, m, c, points, pointscolor, normals, change) {
    var addAng = c / m;
    var angle = 0;
    var temp; //用于暂时存放点
    // for (var i = 0; i < m; i++) {//地面的圆盘,法向量都朝下
    //     temp = vec4(x + Math.cos(Math.PI / 180 * angle) * r, y + Math.sin(Math.PI / 180 * angle) * r,z, 1.0);//第1个点
    //     temp = mult(change,temp);
    //     points.push(temp);
    //     pointscolor.push(vertexColors[2]);
    //     temp = vec4(0,-1,0,0);//法向量都朝下
    //     // temp = multMat4Vec4(change,temp);
    //     normals.push(temp);

    //     temp = vec4(x, y, z, 1.0);//第2个点
    //     temp = mult(change,temp);
    //     points.push(temp);
    //     pointscolor.push(vertexColors[2]);

    //     temp = vec4(0,-1,0,0);//法向量都朝下
    //     // temp = multMat4Vec4(change,temp);
    //     normals.push(temp);

    //     angle = angle + addAng;

    //     temp = vec4(x + Math.cos(Math.PI / 180 * angle) * r, y + Math.sin(Math.PI / 180 * angle) * r,z, 1.0);//第3个点
    //     temp = mult(change,temp);
    //     points.push(temp);
    //     pointscolor.push(vertexColors[2]);

    //     temp = vec4(0,-1,0,0);//法向量都朝下
    //     // temp = multMat4Vec4(change,temp);
    //     normals.push(temp);
    // }
    // angle = 0;
    for (var i = 0; i < m; i++) { //圆锥侧面
        temp = vec4(x + Math.cos(Math.PI / 180 * angle) * r, y + Math.sin(Math.PI / 180 * angle) * r, z, 1.0); // 第1个点
        temp = mult(change, temp);
        points.push(temp);
        pointscolor.push(vertexColors[2]);

        temp = vec4(Math.cos(Math.PI / 180 * angle) * r * (h * h) / (h * h + r * r), Math.sin(Math.PI / 180 * angle) * r * (h * h) / (h * h + r * r), h * r * r / (h * h + r * r), 0);
        // temp = multMat4Vec4(change,temp);
        normals.push(temp);

        temp = vec4(x, y, z + h, 1.0); //第2个点
        temp = mult(change, temp);
        points.push(temp);
        pointscolor.push(vertexColors[3]);

        temp = vec4(Math.cos(Math.PI / 180 * angle) * r * (h * h) / (h * h + r * r), Math.sin(Math.PI / 180 * angle) * r * (h * h) / (h * h + r * r), h * r * r / (h * h + r * r), 0);
        // temp = multMat4Vec4(change,temp);
        normals.push(temp);

        angle = angle + addAng;

        temp = vec4(x + Math.cos(Math.PI / 180 * angle) * r, y + Math.sin(Math.PI / 180 * angle) * r, z, 1.0); //第3个点
        temp = mult(change, temp);
        points.push(temp);
        pointscolor.push(vertexColors[2]);

        temp = vec4(Math.cos(Math.PI / 180 * angle) * r * (h * h) / (h * h + r * r), Math.sin(Math.PI / 180 * angle) * r * (h * h) / (h * h + r * r), h * r * r / (h * h + r * r), 0);
        // temp = multMat4Vec4(change,temp);
        normals.push(temp);
    }
}