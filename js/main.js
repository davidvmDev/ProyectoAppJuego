var secciones = [];
var tiempo_splash = 2000;

window.onload = function() {
    inicializarReferencias();
    //Crear Fondo
    var dot = [];
	for (var i = 0; i < 200; i++) {
		dot.push(new freshDot());
	}
	//setTimeout(cambiarSplash, tiempo_splash);
};

function inicializarReferencias() {
	secciones[1] = document.getElementById('seccion_1');
	secciones[2] = document.getElementById('seccion_2');
	secciones[3] = document.getElementById('seccion_3');
	secciones[4] = document.getElementById('seccion_4');
	secciones[5] = document.getElementById('seccion_5');
	secciones[6] = document.getElementById('seccion_6');
	secciones[7] = document.getElementById('seccion_7');
}

function cambiarSplash() {
	secciones[1].className = 'splash oculto';
	secciones[2].className = 'home';
}

function cambiarSeccion(id_seccion) {
	for (var i in secciones) {
		secciones[i].classList.add('oculto');
	}

	secciones[id_seccion].classList.add('animated');
	secciones[id_seccion].classList.add('headShake');
	secciones[id_seccion].classList.remove('oculto');
}
var monstruos = [];

function iniciarTablero() {}

//Fondo
function freshDot() {
	this.obj = document.createElement('div');
	this.obj.classList.add('box');
	this.obj.style.top = window.innerHeight * Math.random() + 'px';
	this.obj.style.left = window.innerWidth * Math.random() + 'px';
	this.size = Math.floor(5 * Math.random()) + 7;
	this.obj.style.height = this.size + 'px';
	this.obj.style.width = this.size + 'px';

	document.body.appendChild(this.obj);
}
