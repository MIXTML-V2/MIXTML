function get_slider_init_posi()
{
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

function init_slideHori(picked_object){
	slider_positionX = picked_object.position.x;
	sliderHoriTouch = true;
	
	if (pick_object == sliderSpeedG)
		console.log( 'touch slider speed gauche' );
	if (pick_object == sliderSpeedD)
		console.log( 'touch slider speed droite' );
	if (pick_object == sliderBalance)
		console.log( 'touch slider Balance' );
}

function slideHori(picked_object){
	var mid_slide;
	var rayon = 0.8;
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
}