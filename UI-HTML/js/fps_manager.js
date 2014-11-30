var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
// Boucle de rendu toutes les modifs doivent de faire ici
function fps_manager() {
	now = Date.now();
	delta = now - then;
	if (delta > interval) {
		then = now - (delta % interval);
	}
}