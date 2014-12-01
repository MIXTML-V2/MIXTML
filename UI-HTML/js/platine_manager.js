var play1 = play2 = false;

function turn_on_left(){
	if (play1)
		tourneDisqueG.rotation.z -= SpeedG / 10;
}

function turn_on_right(){
	if (play2)
		tourneDisqueD.rotation.z -= SpeedD / 10;
}
/*
function chargement_left(){
	plat_mat = new THREE.MeshBasicMaterial({ map: texture_plat, color = 0xff0000 });
	plat_mat.needsUpdate = true;
}

function chargement_right(){
	
}

function ready_left(){
	
}

function ready_right(){
	
}*/