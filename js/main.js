

//Subjective Test parameters
var showingTime = 2000; //10 seconds in this case
var participant = 1; // Participant ID
var numTrainingODIs = 1; // Specify number of ODIs that will be presented in the training session


// url parameters
var parameters = (function() {
  var parameters = {};
  var parts = window.location.search.substr(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var parameter = parts[i].split('=');
    parameters[parameter[0]] = parameter[1];
  }
  return parameters;
})();

(function () {
var panosList = fetchPanos();

function fetchPanos() {
    //return fetch('panos_' + participant + '.json').then(function (response) { // A different panos.json file for each participant
    return fetch('panos.json').then(function (response) {
    return response.json();
  });
}

self.panosList = panosList;
})();

var isMobile = function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

var camera;
var clock = new THREE.Clock();
var vrControls;
var idxPanos = 0; // Index of ODI in the panos.json file
var effect;
var overlay;
var overlay_text;
var pano;
var panoCurrent;
var renderer;
var scene;
var scene2;
var vrMode = false;
var creatingFile = 0;
var currentIndex = 0;
var currentResults = "";
var panoCurrentName = "";
var raycaster;
var vector;
var helper;
var loadedOverlay_text=0;


var group = new THREE.Group();
var trainingDone = 0;


function bend( group, amount, multiMaterialObject ) {
  function bendVertices( mesh, amount, parent ) {
    var vertices = mesh.geometry.vertices;

    if (!parent) {
      parent = mesh;
    }

    for (var i = 0; i < vertices.length; i++) {
      var vertex = vertices[i];

      // apply bend calculations on vertexes from world coordinates
      parent.updateMatrixWorld();

      var worldVertex = parent.localToWorld(vertex);

      var worldX = Math.sin( worldVertex.x / amount) * amount;
      var worldZ = - Math.cos( worldVertex.x / amount ) * amount;
      var worldY = worldVertex.y  ;

      // convert world coordinates back into local object coordinates.
      var localVertex = parent.worldToLocal(new THREE.Vector3(worldX, worldY, worldZ));
      vertex.x = localVertex.x;
      vertex.z = localVertex.z+amount;
      vertex.y = localVertex.y;
    }

    mesh.geometry.computeBoundingSphere();
    mesh.geometry.verticesNeedUpdate = true;
  }

  for ( var i = 0; i < group.children.length; i ++ ) {
    var element = group.children[ i ];

    if (element.geometry.vertices) {
      if (multiMaterialObject) {
        bendVertices( element, amount, group);
      } else {
        bendVertices( element, amount);
      }
    }
  }
}

function loadPano() { panosList.then(function(panos) {
    creatingFile = 1;
    currentIndex = 0;
    panoCurrent = panos[idxPanos];
    panoCurrentName = panoCurrent.name.toString();

    var imgPano = panoCurrent.image;
    var imgOverlay = panoCurrent.overlay; // To display a message over the ODI

// ********************* FADE OUT *********************
    // fade out current ODI.
    new TWEEN.Tween(pano.material)
      .to({opacity: 0}, 300)
      .onComplete(function () {
        // load in new ODI texture.
        pano.material.map = THREE.ImageUtils.loadTexture(imgPano, THREE.UVMapping, fadeIn);
       })
      .start();

     // fade out current planar ODI.
    new TWEEN.Tween(overlay.material)
      .to({opacity: 0}, 300)
      .onComplete(function () {
        // load in new planar ODI.
        overlay.material.map = THREE.ImageUtils.loadTexture(imgPano, THREE.UVMapping);
      })
      .start();

      // fade out current message if there is one
    new TWEEN.Tween(overlay_text.children[0].material)
      .to({opacity: 0}, 300)
      .onComplete(function () {
        // load in new message.
        overlay_text.children[0].material.map = THREE.ImageUtils.loadTexture(imgOverlay, THREE.UVMapping);
      })
      .start();

  // ********************* FADE IN *********************
      // fade in newly loaded ODI.
      function fadeIn() {
        new TWEEN.Tween(pano.material)
          .to({opacity: 1}, 1000)
          .onComplete(fadeInOverlayText)
          .start();
      }

   // if (loadedOverlay_text === 0) {
      // fade in newly message.
      function fadeInOverlayText() {
      new TWEEN.Tween(overlay_text.children[0].material)
        .to({opacity: 1}, 100)
        .onComplete(fadeInOverlay)
        .start();
    }

    // fade in newly planar ODI.
      function fadeInOverlay() {
        new TWEEN.Tween(overlay.material)
          .to({opacity: 1}, 100)
          .start();
      }
  });
}


// initialize scene
function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  var element = renderer.domElement;
  renderer.autoClear = false;

  // Creates a renderer with black background
  renderer.setClearColor( 0x000000 );
  document.body.appendChild( renderer.domElement );

  scene = new THREE.Scene(); // 3D-spherical projection
  scene2 = new THREE.Scene(); // Planar ODI 

 // PerspectiveCamera( fov, aspect, near, far )
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 0.01; 

  camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera2.position.z = 0.01; // Same camera position as above

  scene.add(camera);
  scene2.add(camera2);

  //Add Controls for mouse
  controls = new THREE.OrbitControls(camera, element);
  controls.rotateUp(Math.PI / 4);
  controls.target.set(
  camera.position.x + 0.1,
  camera.position.y,
  camera.position.z
  );
  controls.noZoom = true;
  controls.noPan = true;

  //  Device orientation event 
  window.addEventListener('deviceorientation', setOrientationControls, true);

  // effect and controls for VR - These are not in original THREE lib
  effect = new THREE.VREffect(renderer);
  vrControls = new THREE.VRControls(camera);

  // Fetch the JSON list of panos
  function loadMaterial() {

    return new Promise(function (resolve) {

      var material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        map: THREE.ImageUtils.loadTexture('images/background.jpg', THREE.UVMapping, resolve)
      });

      pano = new THREE.Mesh( geometry, material );
      pano.renderDepth = 2;
      pano.rotation.set( 0, -90 * Math.PI / 180, 0 );
      pano.name = 'MyPano';
      scene.add(pano);

    });
  }

  panosList.then(loadMaterial).then(loadPano);

  // ODI mesh
  var geometry = new THREE.SphereGeometry( 1000, 60, 60 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

  // planar ODI representation
  var geometry_S2 = new THREE.PlaneGeometry(10, 5); 

  //Raycaster Setup - to be used for UV projection
  raycaster = new THREE.Raycaster();
  vector = new THREE.Vector2(0, 0);

  // Creating the mesh for the planar ODI
  var material_S2 = new THREE.MeshBasicMaterial({
  transparent: false,
  alphaTest: 0.5,
  side: THREE.FrontSide,
  map: new THREE.TextureLoader().load('images/background.jpg') } );
  
  overlay = new THREE.Mesh( geometry_S2, material_S2 );
  overlay.position.set( 0, 0, -5);
  scene2.add(overlay);


  // Message geometry and texture
  overlay_text = new THREE.Object3D();
  var mesh = new THREE.Mesh(
  new THREE.PlaneGeometry( 63, 30, 20, 20 ),
  new THREE.MeshBasicMaterial({
    transparent: true,
    alphaTest: 0.5,
    side: THREE.FrontSide,
    map: new THREE.TextureLoader().load('images/FirstMessage10.png') // First message to be shown to the participant
  }));
  overlay_text.add( mesh );
  overlay_text.position.set( 0, -1, -5 );
  overlay_text.scale.set( 0.1, 0.1, 0.1 );
  bend(overlay_text , 100);
  mesh.renderOrder = 1;
  scene.add( overlay_text );

  // trigger function that begins to animate the scene.
  new TWEEN.Tween()
    .delay(400)
    .start();

   // kick off animation
  animate();
  onWindowResize();
}

function requestFullscreen() {
  var el = renderer.domElement;

  if (!isMobile()) {
    effect.setFullScreen(true);
    return;
  }

  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  if (vrMode) {
    effect.setSize(window.innerWidth, window.innerHeight);
  } else {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

function onFullscreenChange(e) {
  var fsElement = document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement;

  if (!fsElement) {
    vrMode = false;
  } else {
    // lock screen if mobile
    window.screen.orientation.lock('landscape');
  }
}

// Training Session - In this case it consist of 1 ODI, modify if more ODIs need to be presented
function trainingSlideShow(e) { 
  panosList.then(function (panos) {
    if (e.keyCode == '90') {
      vrControls.zeroSensor();
    } else if (e.keyCode == '39') { // right arrow - next ODI
      idxPanos ++;
     
      loadPano();
      window.removeEventListener('keydown', trainingSlideShow, true);
    }
  });
  var idxTrainODI = 1;
  if (trainingDone == 0){
    console.log('trainingDone', trainingDone)
    
    var refreshIntervalId = setInterval(function(){ panosList.then(function(panos) {
      loadPano();
      
      if (idxTrainODI == numTrainingODIs){
        window.clearInterval(refreshIntervalId);
        window.addEventListener('keydown', trainingSlideShow, true);
        trainingDone = 1;
        console.log('inside ', idxTrainODI, idxPanos)
      }
      idxTrainODI++;
      console.log('outside ', idxTrainODI, idxPanos)
      idxPanos ++;
    }); }, showingTime);

  } else{ 
    testSlideShow(e); 
  }
  e.stopPropagation();
}



function testSlideShow(e) {
  window.removeEventListener('keydown', trainingSlideShow, true); 
  
  var refreshIntervalId = setInterval( function(){ panosList.then(function(panos) {
    idxPanos++;
    if (idxPanos === panos.length) {
     //idxPanos = 0; // If one wants a continuous slide show
      currentFileName = "stats_showingTime_" + showingTime.toString() + "_participant_" + participant.toString() + ".csv";
      saveTextAsFile(currentResults, currentFileName);
    }
    loadPano();
  }); }, showingTime );
  e.stopPropagation();      
}


var viewPort;
var dot;
var active=0;

function animate() {
  // bounding box for the ODI planar representation, so I can get its max/min coordinates 
  helper = new THREE.BoundingBoxHelper(overlay, 0xff0000);
  helper.update();
  
  //If one desires to have a visible bounding box
  //scene2.add(helper)
  
  //max and min (x,y) values of the ODI planar
  var min, max, range;   
  min = helper.box.min;
  max = helper.box.max;
  var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
  
  var screenW = window.innerWidth;
  var screenH  = window.innerHeight;
  

  if (vrMode) {
    effect.render(scene, camera);
  }  else {
		renderer.clear();
    renderer.setViewport( 0, 0, screenW, screenH );
    renderer.render(scene, camera);
    renderer.clearDepth(); // important! clear the depth buffer
    renderer.setViewport(screenW/2, screenH/2, screenW/2, screenH/2);
    renderer.render(scene2, camera2);
  }
   vrControls.update();

  // Points on the bounding box = Viewport
  // Good explanation: http://stackoverflow.com/questions/11036106/three-js-projector-and-ray-objects

  point0= new THREE.Vector2(0,0); // center point on the viewport
    
  point1= new THREE.Vector2(-1,1);  // Up-left
  point2= new THREE.Vector2(1,1);   // Up-right
  point3= new THREE.Vector2(1,-1);  // Bottom-right
  point4= new THREE.Vector2(-1,-1); // Bottom-left

  //Extra mid-points
  point1_5= new THREE.Vector2(0,1);
  point2_5= new THREE.Vector2(1,0);
  point3_5= new THREE.Vector2(0,-1);
  point4_5= new THREE.Vector2(-1,0);

  // Get and draw the 3D point and/or the UV coordinates of that given point
  active=0;
  viewPort = new THREE.Shape();
  
  GettingUVcoord(point0, range, min, 0, 1); //Last value to specify that it's the mid point
  GettingUVcoord(point1, range, min, 1, 0, 1);
  GettingUVcoord(point1_5, range, min, 0, 0, 1);
  GettingUVcoord(point2, range, min, 0, 0, 1);
  GettingUVcoord(point2_5, range, min, 0, 0, 1);
  GettingUVcoord(point3, range, min, 0, 0, 1);
  GettingUVcoord(point3_5, range, min, 0, 0, 1);
  GettingUVcoord(point4, range, min, 0, 0, 1);
  GettingUVcoord(point4_5, range, min, 0, 0, 1);

  if (active==1){ // Create the viewport window
    
    var geometry_viewPort = new THREE.ShapeGeometry( viewPort );
    var geo = new THREE.EdgesGeometry(geometry_viewPort); // or WireframeGeometry( geometry )
    var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    var viewPortMesh = new THREE.LineSegments( geo, mat );
    viewPortMesh.position.set( 0, 0, -5);
    viewPortMesh.name = "viewport"; 
  
    // Viewport update (remove -> add)
    for ( var i = 0, l = scene2.children.length-1; i < l; i ++ ) {
      if (scene2.children[i].name == "viewport") {
        scene2.remove(scene2.children[i])
      }
    }
    scene2.add(viewPortMesh)
 }

 // Create a string, to create a csv file, with the Viewport delimited area
if (creatingFile) {
  currentIndex++;
  str_index = currentIndex.toString();
  str_Image = panoCurrentName;

  str = str_index + "," + str_Image  + ", " + JSON.stringify(clock.getElapsedTime()) + ", " + JSON.stringify(arrayOfPoints[0]) + ", " + JSON.stringify(arrayOfPoints[1]) + ", " + JSON.stringify(arrayOfPoints[2]) + ", " + JSON.stringify(arrayOfPoints[3]) + ", " + JSON.stringify(arrayOfPoints[4]) + ", " + JSON.stringify(arrayOfPoints[5]) + ", " + JSON.stringify(arrayOfPoints[6]) + ", " + JSON.stringify(arrayOfPoints[7]) + ", " + JSON.stringify(arrayOfPoints[8]) + ", " + JSON.stringify(arrayOfPoints[9])+ ", " + JSON.stringify(arrayOfPoints[10])+ ", " + JSON.stringify(arrayOfPoints[11])+ ", " + JSON.stringify(arrayOfPoints[12])+ ", " + JSON.stringify(arrayOfPoints[13]) + ", " + JSON.stringify(arrayOfPoints[14]) + ", " + JSON.stringify(arrayOfPoints[15]) + ", " + JSON.stringify(arrayOfPoints[16])+ ", " + JSON.stringify(arrayOfPoints[17]) +  "," + "StandardDeviation" +  "," + JSON.stringify(arrayOfPoints[18])+ ", " + JSON.stringify(arrayOfPoints[19]) + "\r\n";
  
  currentResults += "\r\n" + str;
}
 
  //Request Animation
  requestAnimationFrame(animate);
   TWEEN.update();
}

var arrayOfPoints =[];
function GettingUVcoord(point, range, min, initP, centerP, isViewport){
/*
point -- Used to get the direction for the UV projection from the camera
range -- size of the planar ODI (x, y)
min -- min (x, y) position value of the ODI
initP -- To set the initial point in the Shape (that will be built with the data taken here)
centerP -- Needed only for drawing the path of the user (we could work on color and size of the shown point)
isViewport -- If one wants to draw the point or not
*/ 

  //Raycaster 
  raycaster.ray.origin.copy(camera.position);
  raycaster.ray.direction.set(point.x, point.y, 0.5).unproject(camera).sub(camera.position).normalize();

  //Intersecting with the points
  var intersects;
  var thePoint_3D;
  var scene_children = scene.children;
    
  for ( var i = 0, l = scene_children.length; i < l; i ++ ) {
    if (scene_children[i].name == "MyPano") {
      active=1;

      intersects = raycaster.intersectObject(scene_children[i], false)
      thePoint_3D= intersects[0].point;
      thePoint_2D= intersects[0].uv;

      scaledUV_x = (thePoint_2D.x * range.x) + min.x;
      scaledUV_y = (thePoint_2D.y * range.y) + min.y;
      scaledPoint_2D = new THREE.Vector2(scaledUV_x, scaledUV_y);
 
      //Draw intersection point
      if (centerP === 1) {
        drawDot(scaledPoint_2D, 0xCC3333); 
        arrayOfPoints =[];
        arrayOfPoints.push(scaledUV_x);
        arrayOfPoints.push(scaledUV_y);
      }
           
      if(initP === 1 ){         
        viewPort.moveTo( scaledUV_x, scaledUV_y );
        arrayOfPoints.push(scaledUV_x);
        arrayOfPoints.push(scaledUV_y);
      } else if (initP === 0 && centerP === 0 && isViewport===1) {        
        viewPort.lineTo( scaledUV_x, scaledUV_y );
        arrayOfPoints.push(scaledUV_x);
        arrayOfPoints.push(scaledUV_y);
      } else if (isViewport===0){
        arrayOfPoints.push(scaledUV_x);
        arrayOfPoints.push(scaledUV_y);
      }
    }
  }
}

function drawDot(point, color) {
  /*
  point -- UV projected point position on the planar ODI
  color -- Color to be shown on the image
  */
  
  var material_dot = new THREE.PointsMaterial( { size: 0.05, vertexColors: true, color} ); //thePoint_2D
  var geometry_dot = new THREE.Geometry();
  var particle = new THREE.Vector3(point.x , point.y, -5); // thePoint_2D

  geometry_dot.vertices.push(particle);
  geometry_dot.colors.push(new THREE.Color(color));
  
  dot = new THREE.Points(geometry_dot, material_dot);
  scene2.add(dot); // thePoint_2D
}

function saveTextAsFile(textToSave, fileNameToSaveAs) {
  /*
  textToSave -- currentResults which are saved in function animation, when creating the string
  fileNameToSaveAs -- currentFileName defined in function testSlideShow
  */
  var textToSaveAsBlob = new Blob([textToSave], { type: "text/plain;charset=utf-8" }),
  textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  a.download = fileNameToSaveAs;
  a.href = textToSaveAsURL;
  a.click();

  window.URL.revokeObjectURL(textToSaveAsURL);
}

// Controls for the mouse
function setOrientationControls(e) {
  if (!e.alpha) {
  return;
}
controls = new THREE.DeviceOrientationControls(camera, true);
controls.connect();
controls.update();
window.removeEventListener('deviceorientation', setOrientationControls, true);
}


// listeners

document.querySelector('#enterVr').addEventListener('click', function() {
  vrMode = vrMode ? false : true;
  requestFullscreen();
  onWindowResize();
});

document.addEventListener('fullscreenchange', onFullscreenChange);
document.addEventListener('mozfullscreenchange', onFullscreenChange);

window.addEventListener('keydown', trainingSlideShow, true);
window.addEventListener('resize', onWindowResize, false );


init();

