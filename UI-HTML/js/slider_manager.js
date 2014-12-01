function get_slider_init_posi(){
	for (i = 0; i < objects.length; i++)
	{
		if (objects[i] == sliderSpeedG || objects[i] == sliderSpeedD || objects[i] == sliderBalance)
			posi_object_X.push(objects[i].position.x);
	}
	
	for (i = 0; i < objects.length; i++)
	{
		if (objects[i] == sliderVolG || objects[i] == sliderVolD)
			posi_object_Y.push(objects[i].position.y);
	}
	console.log(posi_object_X);
}

function init_slideVert(picked_object){
	slider_positionY = sliderVolD.position.y;
	sliderVertTouch = true;
	
	if (pick_object == sliderVolD)
		console.log( 'touch slider volume droite' );
	if (pick_object == sliderVolG)
		console.log( 'touch slider volume gauche' );
}

function slideVert(picked_object){
	var mid_slide;
	var rayon = 0.5;
	if (picked_object == sliderVolG)
		mid_slide = posi_object_Y[0];
	if (picked_object == sliderVolD)
		mid_slide = posi_object_Y[1];
		
	if (picked_object.position.y <= mid_slide + rayon && picked_object.position.y >= mid_slide - rayon)
		pick_object.position.y = slider_positionY - ((mouseY - mouseDownY)/(height / 4.125));
	if (picked_object.position.y >= mid_slide + rayon)
		picked_object.position.y = mid_slide + rayon;
	if (picked_object.position.y <= mid_slide - rayon)
		picked_object.position.y = mid_slide - rayon;

	VolG = sliderVolG.position.y + 0.3;
	VolD = sliderVolD.position.y + 0.3;
	volume1(VolG);
	volume2(VolD);
}

function init_slideHori(picked_object){
	slider_positionX = picked_object.position.x;
	sliderHoriTouch = true;
	
	if (picked_object == sliderSpeedG)
		console.log( 'touch slider speed gauche' );
	if (picked_object == sliderSpeedD)
		console.log( 'touch slider speed droite' );
	if (picked_object == sliderBalance)
		console.log( 'touch slider Balance' );
}

function slideHori(picked_object){
	var mid_slide;
	var rayon = 0.5;
	if (picked_object == sliderSpeedG)
		mid_slide = posi_object_X[0];
	if (picked_object == sliderSpeedD)
		mid_slide = posi_object_X[1];
	if (picked_object == sliderBalance)
		mid_slide = posi_object_X[2];
		
	if (picked_object.position.x <= mid_slide + rayon && picked_object.position.x >= mid_slide - rayon)
		picked_object.position.x = slider_positionX + ((mouseX - mouseDownX)/(width / 7));
	if (picked_object.position.x >= mid_slide + rayon)
		picked_object.position.x = mid_slide + rayon;
	if (picked_object.position.x <= mid_slide - rayon)
		picked_object.position.x = mid_slide - rayon;
	
	
	VolBalance = sliderBalance.position.x + 1.5;
	crossfading(VolBalance);
}