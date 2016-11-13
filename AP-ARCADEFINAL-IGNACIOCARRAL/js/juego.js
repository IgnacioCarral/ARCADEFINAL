var juego={
	filas:[[/*1,2,3*/],
          [/*4,5,6*/],
          [/*7,8,9*/]],
	espacioVacio:{
      fila:2,
      columna:2
  	},
	crearPieza:function(fila , columna , numero){
            var divJ = $("<div>");
            divJ.addClass("pieza");
            divJ.css({
               top: fila*200,
               left: columna*200,
               backgroundImage:'url("Piezas/' + numero + '.jpg")',
            });
            return {
            	acamica : divJ,
            	filaInicial: fila,
            	columnaInicial: columna,
            };
	},

	instalarPiezas : function (elemento){
      var numero = 1;
      for (var fila = 0; fila < 3; fila++) {
         for (var columna = 0; columna<3; columna++){
             if (fila==this.espacioVacio.fila&&columna==this.espacioVacio.columna){
              juego.filas[fila][columna]=null;

            }else{
               
               var pieza =this.crearPieza(fila, columna, numero++);
               juego.filas[fila][columna]= pieza;
               elemento.append(pieza.acamica)
            };
            }
         }
  },
   
	moverFichaFilaColumna : function(ficha,fila,columna){
      ficha.acamica.css({
         top: fila * 200,
         left: columna * 200
      })
	},

	guardarEspacioVacio : function (fila, columna){
      this.espacioVacio.fila = fila;
      this.espacioVacio.columna= columna;

      this.filas[fila][columna] = null;
	},

	intercambiarPosicionConEspacioVacio(fila, columna){
      var ficha = this.filas[fila] && this.filas[fila][columna];
      if(ficha){
         this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
         this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
         this.guardarEspacioVacio(fila,columna);
      }
	},

	moverHaciaAbajo : function(){
      var filaOrigen = this.espacioVacio.fila-1;
      var columnaOrigen = this.espacioVacio.columna;

      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	moverHaciaArriba : function(){
      var filaOrigen = this.espacioVacio.fila+1;
      var columnaOrigen = this.espacioVacio.columna;

      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	moverAlaDerecha : function(){
      var filaOrigen = this.espacioVacio.fila;
      var columnaOrigen = this.espacioVacio.columna-1;

      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	moverAlaIzquierda : function(){
      var filaOrigen = this.espacioVacio.fila;
      var columnaOrigen = this.espacioVacio.columna+1;

      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
 	capturarTeclas : function(){
    	var tell = this;

      $(document).keydown(function(evento) {
        switch(evento.which) {
            case 37:
              tell.moverAlaIzquierda();
            break;

            case 38:
              tell.moverHaciaArriba();
            break;

            case 39:
              tell.moverAlaDerecha();
            break;

            case 40:
              tell.moverHaciaAbajo();
            break;

            default: return
         };
         evento.preventDefault();
         tell.chequearSiGano();

      })
   	}, 
	mezclarFichas(veces){
    if(veces<=5){return;}

    var that = this;
    var funciones = ['moverHaciaAbajo','moverHaciaArriba','moverAlaIzquierda','moverAlaDerecha'];
    var numeroRandom = Math.floor(Math.random() * 4);
    var functionName = funciones[numeroRandom];
    this[functionName]();

    setTimeout(function(){
      that.mezclarFichas(veces-3);
    },15);
  },

	chequearSiGano : function (){
		for (var fila = 0; fila < 3; fila++) {
         	for (var columna = 0; columna<3; columna++){
         		if(this.filas[fila][columna]&& !(this.filas[fila][columna].filaInicial==fila && this.filas[fila][columna].columnaInicial==columna)){
					return false}
			}
		}
    alert('Hace clic en "aceptar", luego apreta la tecla F12 y busca la consola ("console" en ingles)');
    console.log("Felicitaciones, ganaste este extremadamente dificil rompecabezas, ahora apreta F5 para recibir tu recompenza!")
  },

  iniciar: function(elemento){
      this.instalarPiezas(elemento);
      this.mezclarFichas(150);
      this.capturarTeclas();
	}
};


$(function(){
	var elemento= $("#juego");
	juego.iniciar(elemento);
  console.log(juego.filas)
	})