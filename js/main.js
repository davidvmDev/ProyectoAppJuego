var secciones = [];
var tiempo_splash = 2000;

window.onload = function() {
	inicializarReferencias();
	
    //Crear Fondo
    var dot = [];
	for (var i = 0; i < 50; i++) {
		dot.push(new freshDot());
	}
	//this.animacionSplash();
    setTimeout(cambiarSplash, tiempo_splash);
    
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

var NumeroEspeciales=3;
function iniciarTablero() {
	
	var aliens=[];
	var salida="";
	
	contenido = document.getElementById("tablero");
	var especiales=1;
	//var organizar= new Promise (function(){
		for (var i = 1; i < 26; i++) {
			var numeroAleatorio=Math.round(Math.random()*(5 - 1) + 1);
								
        	aliens[i]=" <img src='img/alien"+numeroAleatorio+".PNG' class='alienOculto alien'>";                     
		}
	var totalAliens = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
	lista = totalAliens.sort(function() {return Math.random() - 0.5});

	for (var i = 1; especiales < NumeroEspeciales+1; i++) {
		var numeroAleatorio=Math.round(Math.random()*(5 - 1) + 1);
		aliens[lista[i]]=" <img src='img/alien"+numeroAleatorio+".PNG' class='alienOculto alien' id='especial"+especiales+"'> ";
		especiales++;	
	}
	for (var i = 1; i < 26; i++) {
		salida+=aliens[i];
	}

		contenido.innerHTML = salida;			
}

var especiales=[];
var id="";

function aparecerAliens(){
	
	for(var i=1;i<NumeroEspeciales+1;i++){
		id=i.toString();
		especiales[i]=document.getElementById("especial"+id);
	}
	var k=1;
		return new Promise(resolve => {
			var aparecer = setInterval(()=>{	
			if(k>NumeroEspeciales){
				clearInterval(aparecer);
				resolve('finalizo');					
			}
			else{
				
				especiales[k].classList.remove('alienOculto');
				especiales[k].classList.remove('bounceIn');	
				k++;
				
			}					
	},1500);
	});

}


 function desapareserAliens(){
	var k=1;
	return new Promise(resolve => {
		var aparecer = setInterval(()=>{	
		if(k>NumeroEspeciales){
			clearInterval(aparecer);
			resolve('finalizo');					
		}
		else{
			
			especiales[k].classList.add('alienOculto');
			especiales[k].classList.add('bounceIn');	
			k++;
			
		}					
},1500);
});
	
}

var estaContando=false;
puntaje = document.getElementById("tiempo");
function contador(){	
	if(estaContando==true){	
		return;	
	}
	i=15;
	var timer = setInterval(iniciarContador,1000);
	
		function iniciarContador(){	
			if(i<0){
				clearInterval(timer);
				estaContando=false;
			}
			else {
				puntaje.innerHTML=i--;	
				estaContando=true;
				}	
		}
		
}
/*
var allAliens = document.querySelectorAll('alien');

function checkear(especial){
	especiales[especial].classList.remove('alien');
	return new Promise(resolve => {	
			especiales[especial].onclick = function() {				
				especiales[especial].classList.remove('alienOculto');
				especiales[especial].classList.remove('bounceIn');
				console.log("vas bien");
				resolve("bien");
			}	
		
},reject=>{
	for(var i in allAliens){
		allAliens[i].onclick=function(){reject("mal");};
	}
	allAliens.onclick = function() {
		console.log("papi se cago");		
		reject("mal");
	}
});
	
}*/

//Dinamica

async function ronda(){
	cambiarSeccion(3);
	
	iniciarTablero();
	await aparecerAliens();
	console.log("termino");
	await desapareserAliens();
	console.log("desaparecidos");
	contador(); 
	/*var resultado="";
	for(var i=1;i<NumeroEspeciales+1;i++){
		if(resultado="mal"){
			
			break;

		}
		else{
			resultado= await checkear(i);
		}
		
	}*/
	
	
}

//Fondo
function freshDot() {
	this.obj = document.createElement('div');
	this.obj.classList.add('box');
	this.obj.style.top = 776 * Math.random() + 'px';
	this.obj.style.left = 415 * Math.random() + 'px';
	this.size = Math.floor(5 * Math.random()) + 7;
	this.obj.style.height = this.size + 'px';
	this.obj.style.width = this.size + 'px';

	document.body.appendChild(this.obj);
}

//Splash
function animacionSplash() {
	var brain_ercise = document.getElementById("brain_ercise");
	var mouse = document.getElementById("mouse");
	var brainXercise = document.getElementById("brainXercise");

	var v = [brain_ercise, mouse, brainXercise];

	for(var i = 0; i < 7; i++){

	}

	brain_ercise.classList.add('animated bounceIn');
	mouse.classList.remove('oculto');
	mouse.classList.add('animated slideInRight');
	mouse.classList.add('pulse');
	brain_ercise.classList.add('oculto');
	brainXercise.classList.remove('oculto');
	mouse.classList.add('animated slideOutLeft');
}
