function onDocumentMouseDown( event ) {	
	// appelle raycaster
	event.preventDefault();
	mouseDownX = event.clientX;
	mouseDownY = event.clientY;
	var mouse3D = new THREE.Vector3( ( event.clientX / width ) * 2 - 1,  //x
									-( event.clientY / height ) * 2 + 1, //y
									0.5 );                               //z
	mouse3D.unproject( camera );
	raycaster = new THREE.Raycaster( camera.position, mouse3D.sub( camera.position ).normalize() );
	console.log(raycaster);
	var intersects = raycaster.intersectObjects( objects );
	// Change move object if hit
	if ( intersects.length > 0 ) {
		pick_object = intersects[ 0 ].object;
		intersects = 0;
		if (pick_object == sliderVolD || 
			pick_object == sliderVolG)
			init_slideVert(pick_object);
		if (pick_object == sliderSpeedG || 
			pick_object == sliderSpeedD || 
			pick_object == sliderBalance)
			init_slideHori(pick_object);
	}
	mouseDown = true;
}
function onDocumentMouseUp( event ) {
	event.preventDefault();
	event.stopPropagation();
	
	mouseDown = false;
	sliderVertTouch = false;
	sliderHoriTouch = false;
}
function onDocumentMouseMove( event ) {
	if (mouseDown){
		mouseX = event.clientX;
		mouseY = event.clientY;
		if (sliderVertTouch)
			slideVert(pick_object);
		if (sliderHoriTouch)
			slideHori(pick_object);
	}
}