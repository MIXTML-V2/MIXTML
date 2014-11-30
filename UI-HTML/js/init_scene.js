function init(){
	//création de la scène
	init_screen();
	projector = new THREE.Projector();
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	// ajout des d'objets dans la scène
	init_mat();
	// set des platines
	init_plat();
	// slider
	init_slider_vert();
	init_slider_hori();
	// Balance
	init_slider_sound_balance();
	init_object();
	camera.position.z = 5;
}
function init_screen(){
	scene = new THREE.Scene();
	//set de la taille de la scène
	width = window.innerWidth;
	height = window.innerHeight;
	ratio = width / height;
	if (ratio != 16/9){
	ratio = 16/9;
	height = width /ratio;
	}
	if (width < 1280)
		width = 1280;
	if (height < 720)
		height = 720;
	camera = new THREE.PerspectiveCamera( 45, ratio, 1, 1000 );
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );
	document.body.appendChild( renderer.domElement );
}
function init_mat(){
	var texture_plat = new THREE.ImageUtils.loadTexture('ressources/plat.png');
	plat_mat = new THREE.MeshBasicMaterial({ map: texture_plat });
	texture_plat = new THREE.ImageUtils.loadTexture('ressources/sliders.jpg');
	slider_mat = new THREE.MeshBasicMaterial({ map: texture_plat });
}
function init_plat(){
	radius = 0.45 * ratio;
	segments = 24;
	espacementPlat = (2 * radius) - (2 * radius / 3);
	circleGeometry = new THREE.CircleGeometry( radius, segments );	
	// création et ajout des objects platines
	tourneDisqueG = new THREE.Mesh( circleGeometry, plat_mat );
	tourneDisqueD = new THREE.Mesh( circleGeometry, plat_mat );
	scene.add( tourneDisqueD, tourneDisqueG );
	objects.push ( tourneDisqueD, tourneDisqueG );
	tourneDisqueD.position.x = positionX + espacementPlat ;
	tourneDisqueG.position.x = positionX - espacementPlat ;
	tourneDisqueD.position.y = positionY;
	tourneDisqueG.position.y = positionY;
}
function init_slider_vert() {
	sliderVertGeometry = new THREE.BoxGeometry( 2 * sliderSize, 1 * sliderSize, 0.1 * sliderSize );
	sliderVolG = new THREE.Mesh( sliderVertGeometry, slider_mat );
	sliderVolD = new THREE.Mesh( sliderVertGeometry, slider_mat );
	scene.add( sliderVolG, sliderVolD );
	objects.push (sliderVolG, sliderVolD );
	sliderVolD.position.x = 2.15 + positionX;
	sliderVolG.position.x = -2.15 + positionX;
	sliderVolD.position.y = positionY;
	sliderVolG.position.y = positionY;
}
function init_slider_hori() {
	sliderHoriGeometry = new THREE.BoxGeometry( 1 * sliderSize, 2 * sliderSize, 0.1 * sliderSize );
	sliderSpeedG = new THREE.Mesh( sliderHoriGeometry, slider_mat );
	sliderSpeedD = new THREE.Mesh( sliderHoriGeometry, slider_mat );
	scene.add( sliderSpeedG, sliderSpeedD );
	objects.push ( sliderSpeedG, sliderSpeedD );
	var espacementPlat = (2 * radius) - (2 * radius / 3);
	sliderSpeedG.position.x = positionX - espacementPlat ;
	sliderSpeedD.position.x = positionX + espacementPlat ;
	sliderSpeedG.position.y = sliderSpeedD.position.y = - espacementPlat + positionY;
}
function init_slider_sound_balance() {
	sliderBalance = new THREE.Mesh( sliderHoriGeometry, slider_mat );
	scene.add( sliderBalance );
	objects.push ( sliderBalance );
	sliderBalance.position.x = positionX;
	sliderBalance.position.y =  (2 * radius) - (2 * radius / 3) + 0.3;
}
function init_object() {
	var playliste_forme = new THREE.BoxGeometry( 1.7, 4.2, 0.1 );
	var object_mat = new THREE.MeshBasicMaterial({color: 0xff5500});
	playlist = new THREE.Mesh( playliste_forme, object_mat );
	scene.add( playlist );
	objects.push ( playlist );
	playlist.position.x = 2.8;
}