var secciones = [];
var tiempo_splash = 4400;
var ref_arr=[];
var resp_arr=[];
var jugando=false;
var NumeroEspeciales=3;// numero de aliens a aparecer por ronda.
var especiales=[];// los aliens que apareceran 
var id="";
var rondaa = 1;
var tiempoRonda;
var vidas=3;
var estaContando=false;
var vectorVidas=[];
puntaje = document.getElementById("tiempo");
for(var i=1;i<4;i++){
	vectorVidas[i]=document.getElementById("vida"+i);		
}
refRonda=document.getElementById("ronda");
var refTablero=document.getElementById("tablero");
var refVolver=document.getElementById("btnVolver");

window.onload = function() {
	inicializarReferencias();
	
    //Crear Fondo
    var dot = [];
	for (var i = 0; i < 50; i++) {
		dot.push(new freshDot());
	}
	document.getElementById('imgSplash').src = 'img/Splash.gif';
    setTimeout(cambiarSplash, tiempo_splash);
	refRonda.innerHTML=1;
	
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
// funcion para cambiar la seccion
function cambiarSeccion(id_seccion) {
	for (var i in secciones) {
		secciones[i].classList.add('oculto');
	}

	secciones[id_seccion].classList.add('animated');
	secciones[id_seccion].classList.add('fadeIn');
	secciones[id_seccion].classList.remove('oculto');
}


// Se inicia el tablero
function iniciarTablero() {
	
	var aliens=[];// tofos los aliens
	var salida="";
	
	contenido = document.getElementById("tablero");
	
	
		for (var i = 0; i < 25; i++) {
			var numeroAleatorio=Math.round(Math.random()*(5 - 1) + 1);
								
        	aliens[i]="<div> <img src='img/alien"+numeroAleatorio+".PNG' onclick='casillaErronea()' class='alienOculto alienJuego'> </div>";                     
		}
	var totalAliens = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,0];
	lista = totalAliens.sort(function() {return Math.random() - 0.5});

	for (var i = 0; i < NumeroEspeciales; i++) {
		var numeroAleatorio=Math.round(Math.random()*(5 - 1) + 1);
		aliens[lista[i]]="<div> <img src='img/alien"+numeroAleatorio+".PNG' onclick='validar("+i+");' class='alienOculto alienJuego' id='especial"+i+"'> </div> ";
		ref_arr[i]=i;
			
	}
	for (var i = 0; i < 25; i++) {
		salida+=aliens[i];
	}

		contenido.innerHTML = salida;		
		
}

function validar(opc){
	resp_arr.push(opc);
	comparar_ganador(ref_arr,resp_arr);
	console.log(ref_arr);
	console.log(resp_arr);
}
function comparar_ganador(a,b){
	for(var i=0;i<b.length;i++){
		if(a[i]!=b[i])
		{
			perdioVida();
			jugando=false;			
			return false;//perdio
		}
		else{
			if(i==a.length-1){
				ganoRonda();
				return true;
			}
		}	
	}	
	
	
}
function casillaErronea(){
	perdioVida();
}
//funcion para aparecer los aliens
function aparecerAliens(){
	
	for(var i=0;i<NumeroEspeciales;i++){
		id=i.toString();
		especiales[i]=document.getElementById("especial"+id);
		
	}
	refTablero.classList.add("noClick");
	refVolver.classList.add("noClick");
	console.log(especiales);
	
	var k=0;
		return new Promise(resolve => {
			var aparecer = setInterval(()=>{	
			if(k>=NumeroEspeciales){
				clearInterval(aparecer);
				resolve('finalizo');					
			}
			else{
				
				especiales[k].classList.remove('alienOculto');
				especiales[k].classList.add('bounceIn');	
					
				k++;
				
			}					
	},1500);
	},reject=>{
		if(jugando==false){
			reject('chao');
		}
		
	});

}

function perdioVida(){
	if(vidas==1){
		tiempoRonda=1;
		Swal.fire({
			title: 'Game Over',
			timer: 1000,		
		}).then((result) => {
			if (result.dismiss === Swal.DismissReason.timer) {
				empezarDeCero();
				
			}
		})
		
	}
	else{
		vidas--;
		tiempoRonda=1;
		desaparecerVida();
		Swal.fire({
			title: 'Perdiste Vida',
			timer: 1000,		
		}).then((result) => {
			if (result.dismiss === Swal.DismissReason.timer) {
				ronda();
			}
		})
	}
	
	
}

function tiempoAcabo(){
	if(vidas==1){
		tiempoRonda=-3;
		Swal.fire({
			title: 'Game Over',
			timer: 1000,		
		}).then((result) => {
			if (result.dismiss === Swal.DismissReason.timer) {
				empezarDeCero();
				
			}
		})
		
	}
	else{
		vidas--;	
		desaparecerVida();
		Swal.fire({
			title: 'Perdiste Vida',
			timer: 1000,		
		}).then((result) => {
			if (result.dismiss === Swal.DismissReason.timer) {
				ronda();
			}
		})
	}


}

function desaparecerVida(){
		vectorVidas[vidas+1].classList.add('alienOculto');
		vectorVidas[vidas+1].classList.add('bounceOut');				
}

function ganoRonda(){
	if(rondaa==6){
		ref_arr.length=0;
		resp_arr.length=0;
		Swal.fire({
			title: 'Ganaste!',
			width: 424,
			padding: '3em',			
		})
	}
	else{
		rondaa++;
		NumeroEspeciales++;
		tiempoRonda=1;
		refRonda.innerHTML=rondaa.toString();
		jugando=false;	

		Swal.fire({
			title: 'Bien',
			timer: 1000,		
		}).then((result) => {
			if (result.dismiss === Swal.DismissReason.timer) {
				ronda();
			}
		})
		
	}
}

//funcion para el contador de tiempo


function empezarDeCero(){

	NumeroEspeciales=3;
	vidas=3;
	rondaa=1;
	tiempoRonda=-3;
	jugando=false;
	for(var i=1;i<4;i++){
		vectorVidas[i].classList.remove('alienOculto');
		vectorVidas[i].classList.remove('bounceOut');		
	}
	
	cambiarSeccion(2);
}

//Dinamica

 function ronda(){
	ref_arr.length=0;
	resp_arr.length=0;
	jugando =true;
	cambiarSeccion(3);	
	iniciarTablero();
	console.log(resp_arr);
	console.log(ref_arr);
	
	aparecerAliens().then(()=>{
		var p=0;
		
		return new Promise(resolve => {
			var aparecer = setInterval(()=>{	
			if(p>=NumeroEspeciales){
				clearInterval(aparecer);
				resolve('finalizo');					
			}
			else{
				especiales[p].classList.add('alienOculto');
				especiales[p].classList.add('bounceOut');	
				p++;
					
			}					
			},1500);
		},reject=>{
			if(jugando==false){
				reject('chao');
			}
			});
			
	}).then(()=>{
		
		Swal.fire({
			title: 'Empieza',
			timer: 800,		
		})
		refTablero.classList.remove("noClick");
		refVolver.classList.remove("noClick");
		tiempoRonda=15;
		return new Promise(resolve => {
		var timer = setInterval(iniciarContador,1000);
		
			function iniciarContador(){	
				if(tiempoRonda<=0){
					clearInterval(timer);
					estaContando=false;
					resolve('tiempoTerminado');
				}
				else {
					puntaje.innerHTML=tiempoRonda--;	
					}	
			}
		})

	})
	
	
}

//Fondo con estrellas
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