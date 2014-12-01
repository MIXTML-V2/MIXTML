var play1 = play2 = false;

function turn_on_left(){
	if (play1)
		tourneDisqueG.rotation.z -= 0.1;
}

function turn_on_right(){
	if (play2)
		tourneDisqueD.rotation.z -= 0.1;
}