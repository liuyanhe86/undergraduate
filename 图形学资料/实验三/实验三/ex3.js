var gl;
var canvas;

var vPosition, vColor;
var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc, viewMatrixLoc;

var f1Vertices=[];//F1赛车顶点
var f1Color=[];//F1赛车颜色
var f1VBuffer, f1CBuffer;//F1赛车缓冲区
var f1Forwards = vec4(0.0, 0.0, 1.0, 1.0);//正面朝向方向向量
var f1Tx = 0, f1Ty = 0, f1Tz = 0;//各个坐标轴方向上的位移量
var f1RotateAngle = 0;//绕Y轴的旋转量

var sktBrdVertices = [];
var sktBrdColor = [];
var sktBrdVBuffer, sktBrdCBuffer;
var sktBrdForwards = vec4(0.0, 0.0, 1.0, 1.0);
var sktBrdTx = 0, sktBrdTy = 0, sktBrdTz = 0;
var sktBrdRotateAngle = 0;

//透视投影视景体参数
var near = 0.3;
var far = 20.0;
var radius = 4.0;
var theta  = 0;
var phi    = 1.0;
var dr = 5.0 * Math.PI / 180.0;
var  fovy = 60.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect = 1.0;       // Viewport aspect ratio
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var dragging = false;//是否在拖动鼠标
var lastX = -1, lastY = -1;//上次点击时的光标位置
var isWandering = false;//是否在漫游
var rotationDirection = false;//旋转方向
var isInitializing = true;//是否正在初始化
var height = 1.0;//视点高度系数
var rotationDelta = 0.5;

//候选颜色
var vertexColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
    vec4( 0.0, 0.0, 0.0, 0.5 ),  // gray
];


//车前身四棱锥
var frontBodyBaseVertices = [
    vec4(0, 0, 2, 1.0),//0
    vec4(0.55, 0, 1.1, 1.0),//1
    vec4(-0.55, 0, 1.1, 1.0),//2
    vec4(0.25, 0.4, 1.1, 1.0),//3
    vec4(-0.25, 0.4, 1.1, 1.0)//4
];

//车头下悬板三棱柱
var headBaseVertices = [
    vec4(-0.7, 0, 1.9, 1.0),//0
    vec4(-0.7, 0, 2.1, 1.0),//1
    vec4(-0.7, 0.05, 1.9, 1.0),//2
    vec4(0.7, 0, 1.9, 1.0),//3
    vec4(0.7, 0, 2.1, 1.0),//4
    vec4(0.7, 0.05, 1.9, 1.0)//5
];

//车舱
var capsuleBaseVertices = [
    vec4(-0.15,0,1.1, 1.0),//0
    vec4(0.15,0,1.1, 1.0),//1
    vec4(0.15,0.4,1.1, 1.0),//2
    vec4(-0.15,0.4,1.1, 1.0),//3
    vec4(-0.15,0.4,0.5, 1.0),//4
    vec4(0.15,0.4,0.5, 1.0),//5
    vec4(0.15,0.2,0.5, 1.0),//6
    vec4(-0.15,0.2,0.5, 1.0),//7
    vec4(-0.15,0.2,0, 1.0),//8
    vec4(0.15,0.2,0, 1.0),//9
    vec4(0.15,0,0, 1.0),//10
    vec4(-0.15,0,0, 1.0),//11
];

//左车门
var leftDoorBaseVertices = [
    vec4(-0.15, 0, 1.1, 1.0),//0
    vec4(-0.25, 0, 1.1, 1.0),//1
    vec4(-0.25, 0.4, 1.1, 1.0),//2
    vec4(-0.15, 0.4, 1.1, 1.0),//3
    vec4(-0.15, 0.4, -0.3, 1.0),//4
    vec4(-0.25, 0.4, -0.3, 1.0),//5
    vec4(-0.25, 0, -0.3, 1.0),//6
    vec4(-0.15, 0, -0.3, 1.0)//7
];

//右车门
var rightDoorBaseVertices = [
    vec4(0.15, 0, 1.1, 1.0),//0
    vec4(0.25, 0, 1.1, 1.0),//1
    vec4(0.25, 0.4, 1.1, 1.0),//2
    vec4(0.15, 0.4, 1.1, 1.0),//3
    vec4(0.15, 0.4, -0.3, 1.0),//4
    vec4(0.25, 0.4, -0.3, 1.0),//5
    vec4(0.25, 0, -0.3, 1.0),//6
    vec4(0.15, 0, -0.3, 1.0)//7
];

//车后身
var backBodyBigPrismoidBaseVertices=[
    vec4(0.15, 0, -0.3, 1.0),//0
    vec4(0.15, 0, -0.9, 1.0),//1
    vec4(0.15, 0.6, -0.3, 1.0),//2
    vec4(-0.15, 0, -0.3, 1.0),//3
    vec4(-0.15, 0, -0.9, 1.0),//4
    vec4(-0.15, 0.6, -0.3, 1.0)//5
];
var backBodySmallPrismoidBaseVertices1=[
    vec4(0.15, 0.4, 0, 1.0),//0
    vec4(0.25, 0.4, 0, 1.0),//1
    vec4(0.15, 0.6, 0, 1.0),//2
    vec4(0.15, 0.4, -0.3, 1.0),//3
    vec4(0.25, 0.4, -0.3, 1.0),//4
    vec4(0.15, 0.6, -0.3, 1.0)//5
];
var backBodySmallPrismoidBaseVertices2=[
    vec4(-0.15, 0.4, 0, 1.0),//0
    vec4(-0.25, 0.4, 0, 1.0),//1
    vec4(-0.15, 0.6, 0, 1.0),//2
    vec4(-0.15, 0.4, -0.3, 1.0),//3
    vec4(-0.25, 0.4, -0.3, 1.0),//4
    vec4(-0.15, 0.6, -0.3, 1.0)//5
];
var backBodyCubeBaseVertices = [
    vec4(-0.15, 0, 0, 1.0),//0
    vec4(0.15, 0, 0, 1.0),//1
    vec4(0.15, 0.6, 0, 1.0),//2
    vec4(-0.15, 0.6, 0, 1.0),//3
    vec4(-0.15, 0.6, -0.3, 1.0),//4
    vec4(0.15, 0.6, -0.3, 1.0),//5
    vec4(0.15, 0, -0.3, 1.0),//6
    vec4(-0.15, 0, -0.3, 1.0)//7
];

//尾翼
var tailWingBaseVertices = [
    vec4(-0.85, 0.9, -0.9, 1.0),//0
    vec4(-0.85, 0.9, -0.5, 1.0),//1
    vec4(-0.85, 0.7, -0.9, 1.0),//2
    vec4(0.85, 0.9, -0.9, 1.0),//3
    vec4(0.85, 0.9, -0.5, 1.0),//4
    vec4(0.85, 0.7, -0.9, 1.0)//5
];
var tailWingStickBaseVertices1 = [
    vec4(-0.55, 0, -0.85, 1.0),//0
    vec4(-0.45, 0, -0.85, 1.0),//1
    vec4(-0.45, 0.8, -0.85, 1.0),//2
    vec4(-0.55, 0.8, -0.85, 1.0),//3
    vec4(-0.55, 0.8, -0.9, 1.0),//4
    vec4(-0.45, 0, -0.9, 1.0),//5
    vec4(-0.45, 0, -0.9, 1.0),//6
    vec4(-0.55, 0, -0.9, 1.0)//7
];
var tailWingStickBaseVertices2 = [
    vec4(0.55, 0, -0.85, 1.0),//0
    vec4(0.45, 0, -0.85, 1.0),//1
    vec4(0.45, 0.8, -0.85, 1.0),//2
    vec4(0.55, 0.8, -0.85, 1.0),//3
    vec4(0.55, 0.8, -0.9, 1.0),//4
    vec4(0.45, 0, -0.9, 1.0),//5
    vec4(0.45, 0, -0.9, 1.0),//6
    vec4(0.55, 0, -0.9, 1.0)//7
];

//滑板
//前翘
var sktBrdFrontBaseVertices = [
    vec4(-0.2, 0, 1.2, 1.0),//0
    vec4(-0.2, 0.1, 1.2, 1.0), //1
    vec4(-0.2, 0.3, 1.6, 1.0), //2
    vec4(0.2, 0, 1.2, 1.0), //3
    vec4(0.2, 0.1, 1.2, 1.0), //4
    vec4(0.2, 0.3, 1.6, 1.0) //5
];
//板身
var sktBrdBodyBaseVertices = [
    vec4(-0.2, 0, 1.2, 1.0),//0
    vec4(0.2, 0, 1.2, 1.0), //1
    vec4(0.2, 0.1, 1.2, 1.0), //2
    vec4(-0.2, 0.1, 1.2, 1.0), //3
    vec4(-0.2, 0.1, 0, 1.0),//4
    vec4(0.2, 0.1, 0, 1.0), //5
    vec4(0.2, 0, 0, 1.0), //6
    vec4(-0.2, 0, 0, 1.0) //7
];
//后翘
var sktBrdBackBaseVertices = [
    vec4(-0.2, 0, 0, 1.0),//0
    vec4(-0.2, 0.1, 0, 1.0), //1
    vec4(-0.2, 0.3, -0.4, 1.0), //2
    vec4(0.2, 0, 0, 1.0), //3
    vec4(0.2, 0.1, 0, 1.0), //4
    vec4(0.2, 0.3, -0.4, 1.0) //5
];
//前中轴
var sktBrdFrontAxleBaseVertices = [
    vec4(-0.02, -0.2, 1.2, 1.0),  //0
    vec4(0.02, -0.2, 1.2, 1.0),  //1
    vec4(0.02, 0, 1.2, 1.0),//2
    vec4(-0.02, 0, 1.2, 1.0),//3
    vec4(-0.02, 0, 1.18, 1.0), //4
    vec4(0.02, 0, 1.18, 1.0), //5
    vec4(0.02, -0.2, 1.18, 1.0),   //6
    vec4(-0.02, -0.2, 1.18, 1.0)   //7
];
//后中轴
var sktBrdBackAxleBaseVertices = [
    vec4(-0.02, -0.2, 0, 1.0),  //0
    vec4(0.02, -0.2, 0, 1.0),  //1
    vec4(0.02, 0, 0, 1.0),//2
    vec4(-0.02, 0, 0, 1.0),//3
    vec4(-0.02, 0, -0.02, 1.0), //4
    vec4(0.02, 0, -0.02, 1.0), //5
    vec4(0.02, -0.2, -0.02, 1.0), //6
    vec4(-0.02, -0.2, -0.02, 1.0)  //7
];

//起跑线
var startingLineColor = [];
var startingLineVertices = [];
function startingLine(){
    var metaSquare0 = [
        vec4(-1.5, -0.3, -1.4, 1.0),//0
        vec4(-1.5, -0.3, -1.1, 1.0),//1
        vec4(-1.2, -0.3, -1.1, 1.0),//2
        vec4(-1.2, -0.3, -1.4, 1.0),//3
        vec4(-1.2, -0.4, -1.4, 1.0),//4
        vec4(-1.2, -0.4, -1.1, 1.0),//5
        vec4(-1.5, -0.4, -1.1, 1.0),//6
        vec4(-1.5, -0.4, -1.4, 1.0)//7
    ];
    var metaSquare1 = [
        vec4(-1.2, -0.3, -1.4, 1.0),
        vec4(-1.2, -0.3, -1.1, 1.0),
        vec4(-0.9, -0.3, -1.1, 1.0),
        vec4(-0.9, -0.3, -1.4, 1.0),
        vec4(-0.9, -0.4, -1.4, 1.0),
        vec4(-0.9, -0.4, -1.1, 1.0),
        vec4(-1.2, -0.4, -1.1, 1.0),
        vec4(-1.2, -0.4, -1.4, 1.0)
    ];
    var metaSquare2 = [
        vec4(-1.5, -0.3, -1.1, 1.0),
        vec4(-1.5, -0.3, -0.8, 1.0),
        vec4(-1.2, -0.3, -0.8, 1.0),
        vec4(-1.2, -0.3, -1.1, 1.0),
        vec4(-1.2, -0.4, -1.1, 1.0),
        vec4(-1.2, -0.4, -0.8, 1.0),
        vec4(-1.5, -0.4, -0.8, 1.0),
        vec4(-1.5, -0.4, -1.1, 1.0)
    ];
    var metaSquare3 = [
        vec4(-1.2, -0.3, -1.1, 1.0),
        vec4(-1.2, -0.3, -0.8, 1.0),
        vec4(-0.9, -0.3, -0.8, 1.0),
        vec4(-0.9, -0.3, -1.1, 1.0),
        vec4(-0.9, -0.4, -1.1, 1.0),
        vec4(-0.9, -0.4, -0.8, 1.0),
        vec4(-1.2, -0.4, -0.8, 1.0),
        vec4(-1.2, -0.4, -1.1, 1.0)
    ];
    for(var i = 0; i < 5; i++)
        for(var j = -2; j < 6; j++)
        {
            var vertices = [];
            for(v in metaSquare0)
            {
                vertices.push(vec4(metaSquare0[v][0]+0.6*j, metaSquare0[v][1], metaSquare0[v][2]+0.6*i, metaSquare0[v][3]));
            }
            getBrickVertex(vertices, startingLineVertices, startingLineColor, 0);
            vertices = [];
            for(v in metaSquare1)
            {
                vertices.push(vec4(metaSquare1[v][0]+0.6*j, metaSquare1[v][1], metaSquare1[v][2]+0.6*i, metaSquare1[v][3]));
            }
            getBrickVertex(vertices, startingLineVertices, startingLineColor, 6);
            vertices = [];
            for(v in metaSquare2)
            {
                vertices.push(vec4(metaSquare2[v][0]+0.6*j, metaSquare2[v][1], metaSquare2[v][2]+0.6*i, metaSquare2[v][3]));
            }
            getBrickVertex(vertices, startingLineVertices, startingLineColor, 6);
            vertices = [];
            for(v in metaSquare3)
            {
                vertices.push(vec4(metaSquare3[v][0]+0.6*j, metaSquare3[v][1], metaSquare3[v][2]+0.6*i, metaSquare3[v][3]));
            }
            getBrickVertex(vertices, startingLineVertices, startingLineColor, 0);
        }
}
startingLine();
var startingLineVBuffer, startingLineCBuffer;

//窗口加载
window.onload = function init()
{
    //1.初始化gl
    canvas = document.getElementById( "gl-canvas" ); 
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    gl.viewport( 0, 0, canvas.width, canvas.height );//设定视图范围
    gl.clearColor(0.91, 0.92, 0.93, 1.0);//清除背景颜色
    //*其他配置，如打开深度缓冲区
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(1.0, 2.0);

    //2.添加图形顶点和颜色
    //左前车轮
    getCylinderVertex(-0.8,0,1.2,//车轮底面坐标
        0.2,0.3,100,360,//车轮厚度、半径、面数、度数
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        f1Vertices, f1Color);
    //右前车轮
    getCylinderVertex(0.6,0,1.2,
        0.2,0.3,100,360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        f1Vertices, f1Color);
    //前车轴
    getCylinderVertex(-0.85,0,1.2,
        1.7,0.05,100,360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[3], vertexColors[4], 
        f1Vertices, f1Color);
    //左后车轮
    getCylinderVertex(-0.8,0,-0.9,
        0.2,0.3,100,360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        f1Vertices, f1Color);
    //右后车轮
    getCylinderVertex(0.6,0,-0.9,
        0.2,0.3,100,360, 
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        f1Vertices, f1Color);
    //后车轴
    getCylinderVertex(-0.85,0,-0.9,
        1.7,0.05,100,360, 
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[3], vertexColors[4],
        f1Vertices, f1Color);
    //车前身
    getPyramidVertex(frontBodyBaseVertices, f1Vertices, f1Color);
    //车前身下悬挂板
    getPrismoidVertex(headBaseVertices,f1Vertices, f1Color);
    //车舱        
    getCapsuleVertex(capsuleBaseVertices, f1Vertices, f1Color);
    //车门
    getCubeVertex(leftDoorBaseVertices, f1Vertices, f1Color);
    getCubeVertex(rightDoorBaseVertices, f1Vertices, f1Color);
    //车后身
    getPrismoidVertex(backBodyBigPrismoidBaseVertices,f1Vertices, f1Color);
    getCubeVertex(backBodyCubeBaseVertices, f1Vertices, f1Color);
    getPrismoidVertex(backBodySmallPrismoidBaseVertices1,f1Vertices, f1Color);
    getPrismoidVertex(backBodySmallPrismoidBaseVertices2,f1Vertices, f1Color);
    //尾翼
    getPrismoidVertex(tailWingBaseVertices,f1Vertices, f1Color);
    getCubeVertex(tailWingStickBaseVertices1, f1Vertices, f1Color);
    getCubeVertex(tailWingStickBaseVertices2, f1Vertices, f1Color);

    this.getSphereVertices(5, 0.5, 0,0,0, f1Vertices, f1Color);

    //滑板身体部分
    getPrismoidVertex(sktBrdFrontBaseVertices,sktBrdVertices, sktBrdColor);
    getCubeVertex(sktBrdBodyBaseVertices, sktBrdVertices, sktBrdColor);
    getPrismoidVertex(sktBrdBackBaseVertices,sktBrdVertices, sktBrdColor);
    //滑板左前轮
    getCylinderVertex(-0.2,-0.2,1.2,//车轮底面坐标
        0.1,0.1,100,360,//车轮厚度、半径、面数、度数
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        sktBrdVertices, sktBrdColor);
    //滑板右前轮
    getCylinderVertex(0.1,-0.2,1.2,
        0.1,0.1,100,360,
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        sktBrdVertices, sktBrdColor);
    //前轴
    getCylinderVertex(-0.2,-0.2,1.2,
        0.4,0.025,100,360, 
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[3], vertexColors[4],
        sktBrdVertices, sktBrdColor);
    getCubeVertex(sktBrdFrontAxleBaseVertices, sktBrdVertices, sktBrdColor);
    //滑板左后轮
    getCylinderVertex(-0.2,-0.2,0,
        0.1,0.1,100,360, 
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        sktBrdVertices, sktBrdColor);
    //滑板右后轮
    getCylinderVertex(0.1,-0.2,0,
        0.1,0.1,100,360, 
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[0], vertexColors[8],
        sktBrdVertices, sktBrdColor);
    //后轴
    getCylinderVertex(-0.2,-0.2,0,
        0.4,0.025,100,360, 
        vertexColors[1], vertexColors[2], vertexColors[1], vertexColors[2], vertexColors[3], vertexColors[4],
        sktBrdVertices, sktBrdColor);
    getCubeVertex(sktBrdBackAxleBaseVertices, sktBrdVertices, sktBrdColor);


    // getBallVertex(0, 0.9, 0, 0.5, 100, 1080, f1Vertices, color);
    // getConeVertex(0, -0.9, 0, 0.3, 0.1, 100, 3600, f1Vertices, color, [], vec4(1, 1, 1, 1));
    

    //3.创建程序对象并读取、编译和链接着色器
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);
    vColor = gl.getAttribLocation(program, "vColor");//获取着色器属性位置
    gl.enableVertexAttribArray(vColor);//向着色器属性传递相应的值
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    //4.创建缓冲区并绑定，之后传递给着色器中对应属性
    //顶点
    //f1赛车顶点
    f1VBuffer = gl.createBuffer();//创建顶点缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, f1VBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(f1Vertices), gl.STATIC_DRAW);

    //滑板顶点
    sktBrdVBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdVBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdVertices), gl.STATIC_DRAW);

    //起跑线
    startingLineVBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, startingLineVBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(startingLineVertices), gl.STATIC_DRAW);


    //颜色
    //f1赛车颜色
    f1CBuffer = gl.createBuffer();//创建颜色缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, f1CBuffer);//绑定缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, flatten(f1Color), gl.STATIC_DRAW);//绑定数据

    //滑板颜色
    sktBrdCBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdCBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(sktBrdColor), gl.STATIC_DRAW);

    startingLineCBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, startingLineCBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(startingLineColor), gl.STATIC_DRAW);


    document.getElementById("wander").onclick = function(){
        isWandering = true;
    }
    this.document.getElementById("stopwander").onclick = function(){
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
            if(isWandering)
            {
                if(dx > 0)
                    rotationDirection = false;
                else
                    rotationDirection = true;
            }
            else{
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
    document.onkeydown = function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(!isWandering)
            switch(e.keyCode)
            {
                case 87:
                    f1Tx+=0.1*f1Forwards[0];
                    f1Ty+=0.1*f1Forwards[1];
                    f1Tz+=0.1*f1Forwards[2];
                    break;
                case 83:
                    f1Tx-=0.1*f1Forwards[0];
                    f1Ty-=0.1*f1Forwards[1];
                    f1Tz-=0.1*f1Forwards[2];
                    break;
                case 65:
                    f1RotateAngle-=5;
                    break;
                case 68:
                    f1RotateAngle+=5;
                    break;
                case 38:
                    sktBrdTx+=0.1*sktBrdForwards[0];
                    sktBrdTy+=0.1*sktBrdForwards[1];
                    sktBrdTz+=0.1*sktBrdForwards[2];
                    break;
                case 40:
                    sktBrdTx-=0.1*sktBrdForwards[0];
                    sktBrdTy-=0.1*sktBrdForwards[1];
                    sktBrdTz-=0.1*sktBrdForwards[2];
                    break;
                case 37:
                    sktBrdRotateAngle-=5;
                    break;
                case 39:
                    sktBrdRotateAngle+=5;
                    break;
            }
            else{
                switch(e.keyCode)
                {
                    case 37:
                        if(rotationDirection)
                        rotationDelta -=0.1;
                        else
                        rotationDelta +=0.1;
                        break;
                    case 39:
                        if(rotationDirection)
                        rotationDelta +=0.1;
                        else
                        rotationDelta -=0.1;
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

    //5.渲染
    
    render();
}

function render()
{
    if(isWandering)
    {
        if(rotationDirection)
            theta -= dr * rotationDelta;
        else
            theta += dr * rotationDelta;
        phi = 0;
        eye = vec3( radius*Math.sin(theta)*Math.cos(phi), 
                    radius * height,//*Math.sin(theta)*Math.sin(phi),
                    radius*Math.cos(theta));
    }
    else{
        eye = vec3( radius*Math.sin(theta)*Math.cos(phi), 
                    radius*Math.sin(theta)*Math.sin(phi),
                    radius*Math.cos(theta));
    }
    //1.清空缓冲区
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    modelViewMatrix = lookAt( eye, at, up );
    projectionMatrix = perspective(fovy, aspect, near, far);
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );//!!!每次画一个对象之前把模型视图矩阵更新！

    gl.bindBuffer(gl.ARRAY_BUFFER, startingLineCBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, startingLineVBuffer);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, startingLineVertices.length);

    var init = translate(-0.8, 0, 0);
    var T = translate(f1Tx, f1Ty, f1Tz);
    var R = rotateY(f1RotateAngle);
    var f1ModelMatrix = mult(mult(init, T), R);
    var f1ModelViewMatrix = lookAt( eye, at, up );//复制初值！！！
    f1ModelViewMatrix = mult(f1ModelViewMatrix, f1ModelMatrix);
    var m = mult(T, R); // 用于处理正面的方向
    f1Forwards = vec4(0, 0, 1.0, 1.0);
    f1Forwards = multMat4Vec4(m, f1Forwards);
    //2.绑定缓冲区并读取数据
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(f1ModelViewMatrix) );//!!!每次画一个对象之前把模型视图矩阵更新！
    gl.bindBuffer(gl.ARRAY_BUFFER, f1CBuffer);//绑定颜色缓冲区
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);//从当前绑定的缓冲区（bindBuffer()指定的缓冲区）中读取顶点数据
    gl.bindBuffer(gl.ARRAY_BUFFER, f1VBuffer);//绑定顶点缓冲区
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, f1Vertices.length);//渲染数组中的图元

    init = translate(0.8, 0, 0);
    T = translate(sktBrdTx, sktBrdTy, sktBrdTz);
    R = rotateY(sktBrdRotateAngle);
    var sktBrdModelMatrix = mult(mult(init, T), R);
    var sktBrdModelViewMatrix = lookAt( eye, at, up );//复制初值！！！
    sktBrdModelViewMatrix = mult(sktBrdModelViewMatrix, sktBrdModelMatrix);
    m = mult(T, R);
    sktBrdForwards = vec4(0, 0, 1.0, 1.0);
    sktBrdForwards = multMat4Vec4(m, sktBrdForwards);
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(sktBrdModelViewMatrix));//!!!每次画一个对象之前把模型视图矩阵更新！
    gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdCBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, sktBrdVBuffer);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, sktBrdVertices.length);

    //出场动画
    if(isInitializing)
        if(theta < Math.PI)
            theta += 0.02;
        else
            isInitializing = false;
            
    //3.实现持续动画效果
    requestAnimFrame(render);
}

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
function triangle(a, b, c, color_index, vertices, color) {
    color.push(vertexColors[color_index]);
    vertices.push(a);
    color.push(vertexColors[color_index]);
    vertices.push(b);
    color.push(vertexColors[color_index]);
    vertices.push(c);
}

//画四棱锥
function getPyramidVertex(base_vertices, vertices, color){
    var indices = [//四棱锥顶点绘制索引顺序
        0, 1, 2,
        0, 1, 3,
        0, 2, 4,
        0, 3, 4,
        1, 2, 4,
        4, 3, 1
    ];

    triangle(base_vertices[0], base_vertices[1], base_vertices[2], 4, vertices, color);
    triangle(base_vertices[0], base_vertices[1], base_vertices[3], 4, vertices, color);
    triangle(base_vertices[0], base_vertices[2], base_vertices[4], 4, vertices, color);
    triangle(base_vertices[0], base_vertices[3], base_vertices[4], 1, vertices, color);
    triangle(base_vertices[1], base_vertices[2], base_vertices[4], 0, vertices, color);
    triangle(base_vertices[4], base_vertices[3], base_vertices[1], 0, vertices, color);

}

//画三棱柱
function getPrismoidVertex(base_vertices, vertices, color){
    var indices = [
        0, 1, 2,
        1, 0, 3,
        3, 4, 1,
        0, 3, 5,
        5, 2, 0,
        1, 4, 5, 
        5, 2, 1,
        3, 4, 5
    ];
    triangle(base_vertices[0], base_vertices[1], base_vertices[2], 4, vertices, color);
    triangle(base_vertices[1], base_vertices[0], base_vertices[3], 4, vertices, color);
    triangle(base_vertices[3], base_vertices[4], base_vertices[1], 4, vertices, color);
    triangle(base_vertices[0], base_vertices[3], base_vertices[5], 1, vertices, color);
    triangle(base_vertices[5], base_vertices[2], base_vertices[0], 1, vertices, color);
    triangle(base_vertices[1], base_vertices[4], base_vertices[5], 1, vertices, color);
    triangle(base_vertices[5], base_vertices[2], base_vertices[1], 1, vertices, color);
    triangle(base_vertices[3], base_vertices[4], base_vertices[5], 4, vertices, color);
}

//画车舱
function getCapsuleVertex(base_vertices, vertices, color){
    var indices = [
        0, 1, 2,
        2, 3, 0,
        2, 3, 4,
        4, 5, 2,
        5, 4, 7,
        7, 6, 5,
        6, 7, 8,
        8, 9, 6,
        9, 8, 11,
        11, 10, 9,
        1, 0, 11,
        11, 10, 0,
        2, 5, 6,
        6, 1, 2,
        6, 1, 10,
        10, 9, 6,
        3, 4, 7,
        7, 0, 3,
        7, 0, 11,
        11, 8, 7
    ];
    triangle(base_vertices[0],base_vertices[1],base_vertices[2], 0, vertices, color);
    triangle(base_vertices[2],base_vertices[3],base_vertices[0], 0, vertices, color);
    triangle(base_vertices[2],base_vertices[3],base_vertices[4], 3, vertices, color);
    triangle(base_vertices[4],base_vertices[5],base_vertices[2], 3, vertices, color);
    triangle(base_vertices[5],base_vertices[4],base_vertices[7], 0, vertices, color);
    triangle(base_vertices[7],base_vertices[6],base_vertices[5], 0, vertices, color);
    triangle(base_vertices[6],base_vertices[7],base_vertices[8], 0, vertices, color);
    triangle(base_vertices[8],base_vertices[9],base_vertices[6], 0, vertices, color);
    triangle(base_vertices[9],base_vertices[8],base_vertices[11], 0, vertices, color);
    triangle(base_vertices[11],base_vertices[10],base_vertices[9], 0, vertices, color);
    triangle(base_vertices[1],base_vertices[0],base_vertices[11], 0, vertices, color);
    triangle(base_vertices[11],base_vertices[10],base_vertices[0], 0, vertices, color);
    triangle(base_vertices[2],base_vertices[5],base_vertices[6], 0, vertices, color);
    triangle(base_vertices[6],base_vertices[1],base_vertices[2], 0, vertices, color);
    triangle(base_vertices[6],base_vertices[1],base_vertices[10], 0, vertices, color);
    triangle(base_vertices[10],base_vertices[9],base_vertices[6], 0, vertices, color);
    triangle(base_vertices[3],base_vertices[4],base_vertices[7], 0, vertices, color);
    triangle(base_vertices[7],base_vertices[0],base_vertices[3], 0, vertices, color);
    triangle(base_vertices[7],base_vertices[0],base_vertices[11], 0, vertices, color);
    triangle(base_vertices[11],base_vertices[8],base_vertices[7], 0, vertices, color);
}

//画地砖（其实就是画长方体😅）
function getBrickVertex(base_vertices, vertices, color, color_index){
    var indice = [
        0, 1, 2,
        2, 3, 0,
        2, 3, 4,
        4, 5, 2,
        4, 5, 6,
        6, 7, 4,
        7, 0, 1,
        1, 6, 7,
        0, 7, 4,
        4, 3, 0,
        1, 6, 5,
        5, 2, 1,
    ];

    triangle(base_vertices[0], base_vertices[1], base_vertices[2], color_index, vertices, color);
    triangle(base_vertices[2], base_vertices[3], base_vertices[0], color_index, vertices, color);
    triangle(base_vertices[2], base_vertices[3], base_vertices[4], color_index, vertices, color);
    triangle(base_vertices[4], base_vertices[5], base_vertices[2], color_index, vertices, color);
    triangle(base_vertices[4], base_vertices[5], base_vertices[6], color_index, vertices, color);
    triangle(base_vertices[6], base_vertices[7], base_vertices[4], color_index, vertices, color);
    triangle(base_vertices[7], base_vertices[0], base_vertices[1], color_index, vertices, color);
    triangle(base_vertices[1], base_vertices[6], base_vertices[7], color_index, vertices, color);
    triangle(base_vertices[0], base_vertices[7], base_vertices[4], color_index, vertices, color);
    triangle(base_vertices[4], base_vertices[3], base_vertices[0], color_index, vertices, color);
    triangle(base_vertices[1], base_vertices[6], base_vertices[5], color_index, vertices, color);
    triangle(base_vertices[5], base_vertices[2], base_vertices[1], color_index, vertices, color);
}

//画长方体
function getCubeVertex(base_vertices, vertices, color){
    var indice = [
        0, 1, 2,
        2, 3, 0,
        2, 3, 4,
        4, 5, 2,
        4, 5, 6,
        6, 7, 4,
        7, 0, 1,
        1, 6, 7,
        0, 7, 4,
        4, 3, 0,
        1, 6, 5,
        5, 2, 1,
    ];

    triangle(base_vertices[0], base_vertices[1], base_vertices[2], 0, vertices, color);
    triangle(base_vertices[2], base_vertices[3], base_vertices[0], 0, vertices, color);
    triangle(base_vertices[2], base_vertices[3], base_vertices[4], 0, vertices, color);
    triangle(base_vertices[4], base_vertices[5], base_vertices[2], 0, vertices, color);
    triangle(base_vertices[4], base_vertices[5], base_vertices[6], 0, vertices, color);
    triangle(base_vertices[6], base_vertices[7], base_vertices[4], 0, vertices, color);
    triangle(base_vertices[7], base_vertices[0], base_vertices[1], 0, vertices, color);
    triangle(base_vertices[1], base_vertices[6], base_vertices[7], 0, vertices, color);
    triangle(base_vertices[0], base_vertices[7], base_vertices[4], 2, vertices, color);
    triangle(base_vertices[4], base_vertices[3], base_vertices[0], 2, vertices, color);
    triangle(base_vertices[1], base_vertices[6], base_vertices[5], 2, vertices, color);
    triangle(base_vertices[5], base_vertices[2], base_vertices[1], 2, vertices, color);
}

// 画圆柱
// 半径r 面数m 度数c 偏移量offset (x,y,z)底面圆心坐标 h圆柱高度
function getCylinderVertex(x, y, z, h, r, m, c, bottomcolor1, bottomcolor2, topcolor1, topcolor2, sidecolor1, sidecolor2, points, pointscolor){//共ms*3*2+ms*6
    var addAng = c / m;
    var angle = 0;
    for (var i = 0; i < m; i++) {//下底面,法向量都朝下
        points.push(vec4(x , y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        pointscolor.push(bottomcolor1);

        points.push(vec4(x, y, z, 1.0));
        pointscolor.push(vertexColors[1]);

        angle = angle + addAng;
        points.push(vec4(x , y+ Math.cos(Math.PI / 180 * angle) * r,z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        pointscolor.push(bottomcolor2);

    }
    for (var i = 0; i < m; i++) {//上底面,法向量都朝上
        points.push(vec4(x + h, y+ Math.cos(Math.PI / 180 * angle) * r,z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        pointscolor.push(topcolor1);


        points.push(vec4(x + h, y, z, 1.0));
        pointscolor.push(vertexColors[1]);


        angle = angle + addAng;
        points.push(vec4(x + h, y + Math.cos(Math.PI / 180 * angle) * r,z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        pointscolor.push(topcolor2);

    }
    for (var i = 0; i < m; i++) {//侧面由多个矩形构成，一个矩形由两个三角形构成
        //第一个三角形
        points.push(vec4(x, y  + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        pointscolor.push(sidecolor1);

        points.push(vec4(x + h, y + Math.cos(Math.PI / 180 * angle) * r,z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        pointscolor.push(vertexColors[0]);

        var temp = vec4(x + h, y + Math.cos(Math.PI / 180 * angle) * r, z + Math.sin(Math.PI / 180 * angle) * r, 1.0);
        angle = angle + addAng;
        points.push(vec4(x, y + Math.cos(Math.PI / 180 * angle) * r,z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        pointscolor.push(sidecolor1);

        //第二个三角形
        points.push(vec4(x + h, y + Math.cos(Math.PI / 180 * angle) * r,z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        pointscolor.push(sidecolor2);

        points.push(vec4(x , y + Math.cos(Math.PI / 180 * angle) * r ,z + Math.sin(Math.PI / 180 * angle) * r, 1.0));
        pointscolor.push(vertexColors[0]);

        points.push(temp);
        pointscolor.push(sidecolor2);
    }
}

//画球
function getSphereVertices(color,radius,move_x,move_y,move_z,vertices_ball, colors_ball) {
    var latitudeBands = 30;
    var longitudeBands = 30;
    var ballVertices = [];
    for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
      var theta = latNumber * Math.PI / latitudeBands;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);

      for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
          var phi = longNumber * 2 * Math.PI / longitudeBands;
          var sinPhi = Math.sin(phi);
          var cosPhi = Math.cos(phi);

          var x = cosPhi * sinTheta;
          var y = cosTheta;
          var z = sinPhi * sinTheta;

          ballVertices.push(vec4(radius * x,radius * y,radius * z, 1.0));
        }
    }
   for(var i=0;i<ballVertices.length;i++){
     var T1 =[move_x,move_y,move_z];
     for(var j=0;j<ballVertices[i].length;++j){
         ballVertices[i][j]+=T1[j];
     }
   }

   for (var latNumber1=0; latNumber1 < latitudeBands; latNumber1++) {
        for (var longNumber1=0; longNumber1 < longitudeBands; longNumber1++) {
            var first = (latNumber1 * (longitudeBands + 1)) + longNumber1;
            var second = first + longitudeBands + 1;
            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[first]);
            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[second]);
            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[first+1]);

            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[second]);
            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[second+1]);
            colors_ball.push(vertexColors[color]);
            vertices_ball.push(ballVertices[first+1]);
        }
    }
}


// 画圆锥
// 半径r 面数m 度数c 偏移量offset (x,y,z)底面圆心坐标 h圆锥顶点距离底部的距离
function getConeVertex(x, y, z, h, r, m, c,points, pointscolor, normals,change){
    var addAng = c / m;
    var angle = 0;
    var temp;//用于暂时存放点
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
    for (var i = 0; i < m; i++) {//圆锥侧面
        temp = vec4(x + Math.cos(Math.PI / 180 * angle) * r, y + Math.sin(Math.PI / 180 * angle) * r,z, 1.0); // 第1个点
        temp = mult(change,temp);
        points.push(temp);
        pointscolor.push(vertexColors[2]);

        temp = vec4(Math.cos(Math.PI / 180 * angle) * r*(h*h)/(h*h+r*r), Math.sin(Math.PI / 180 * angle) * r*(h*h)/(h*h+r*r), h*r*r/(h*h+r*r), 0);
        // temp = multMat4Vec4(change,temp);
        normals.push(temp);

        temp = vec4(x, y, z+h, 1.0);//第2个点
        temp = mult(change,temp);
        points.push(temp);
        pointscolor.push(vertexColors[3]);

        temp = vec4(Math.cos(Math.PI / 180 * angle) * r*(h*h)/(h*h+r*r),Math.sin(Math.PI / 180 * angle) * r*(h*h)/(h*h+r*r),h*r*r/(h*h+r*r),0);
        // temp = multMat4Vec4(change,temp);
        normals.push(temp);

        angle = angle + addAng;

        temp = vec4(x + Math.cos(Math.PI / 180 * angle) * r, y + Math.sin(Math.PI / 180 * angle) * r,z, 1.0);//第3个点
        temp = mult(change,temp);
        points.push(temp);
        pointscolor.push(vertexColors[2]);

        temp = vec4(Math.cos(Math.PI / 180 * angle) * r*(h*h)/(h*h+r*r), Math.sin(Math.PI / 180 * angle) * r*(h*h)/(h*h+r*r), h*r*r/(h*h+r*r), 0);
        // temp = multMat4Vec4(change,temp);
        normals.push(temp);
    }
}
