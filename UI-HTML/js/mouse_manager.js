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
		if (pick_object == sliderVolD)
		{
			slider_positionY = sliderVolD.position.y;
			sliderVertTouch = true;
			console.log( 'touch slider volume droite' );
		}
		if (pick_object == sliderVolG)
		{
			slider_positionY = sliderVolG.position.y;
			sliderVertTouch = true;
			console.log( 'touch slider volume gauche' );
		}
		if (pick_object == sliderSpeedG)
		{
			slider_positionX = sliderSpeedG.position.x;
			sliderHoriTouch = true;
			console.log( 'touch slider speed gauche' );
		}
		if (pick_object == sliderSpeedD)
		{
			slider_positionX = sliderSpeedD.position.x;
			sliderHoriTouch = true;
			console.log( 'touch slider speed droite' );
		}
	}
	mouseDown = true;
}
function onDocumentMouseUp( event ) {
	event.preventDefault();
	event.stopPropagation();
	
	mouseDown = false;
	sliderVertTouch = false;
	sliderHoriTouch = false;
	
	document.removeEventListener( 'mousemove', mousemove );
	document.removeEventListener( 'mouseup', mouseup );
	_this.dispatchEvent( endEvent );
}
function onDocumentMouseMove( event ) {
	if (mouseDown){
		mouseX = event.clientX;
		mouseY = event.clientY;
		if (sliderVertTouch)
			pick_object.position.y = slider_positionY - ((mouseY - mouseDownY)/(height / 4.125));
		if (sliderHoriTouch)
			pick_object.position.x = slider_positionX + ((mouseX - mouseDownX)/(width / 7));
		now = Date.now();
		delta = now - then;
		 
		if (delta > interval) {
			then = now - (delta % interval);
		}
	}
}
