var imgs = [];
//variaveis dos varios objetos no mapa
var estrelasX = [];
var estrelasY = [];
var estrelasVel = [];
var estrelasTam = [];    
var qtEstrelas = 50; 
//cordenadas de origen do disparo, e do jogador 
var xdo=100, ydo=100; ve=2; //ve é a velocidade do inimigo
var disparo = false;
// coordendas do disparo
var xd, yd;	
var contFrames = 0;		//atualizações da tela		
var vidas = 3, pontos = 0, nivel = 1;
var colisao = false, colisaodisparo = false;
var raiojogador = 25;					//raio da elipse do jogador
var raioinimigo = 30;					//raio da elipse do inimigo
var raiodisparo1 = 10, raiodisparo2 = 4;	//raio 1 e 2 da elipse do disparo
var xinimigo= [], yinimigo= [];
var vtam = [];
var qt = 5;
var limitepontos=0
//variavel das imagens
var img;
var img2;
var aste;
var jog;
var ini;
var fim;
var missi;
var tela = 1
var musicaInicial = new Audio('Nyan.mp3')
var musicaInicial2 = new Audio('fase2.mp3')
var musicaInicial3 = new Audio('fase3.mp3')
var tiro = new Audio('tiro.mp3')

function preload() {
  img = loadImage('img/nav.png');
  aste = loadImage('img/aste1.png');
  ini = loadImage('img/gl.png');
   img2 = loadImage('img/ovni.png');
   jog = loadImage('img/jogar.png');
   fim = loadImage('img/ove.png');
   missi = loadImage('img/missil.png');
}

function setup() {  					//setup é para executar somente uma vez
	createCanvas(640, 500);
	xdo = 300;
	xd = xdo;  							
	ydo = 470;
	yd = ydo;
	frameRate(30);
		for (i = 0; i < qtEstrelas; i++) {
		estrelasX[i] = random(0,width);
		estrelasY[i] = random(0,height); 
		estrelasVel[i] = 2+random(0,10)/10; 
		estrelasTam[i] = random(2,4); 
	} 
	for ( i = 0; i < 100; i++) { 
    	xinimigo[i] = random(640-10,5); 
    	yinimigo[i] = random(640,500);
    }
}

function draw() {						//Draw é para executar sempre
 background(0);
 if ( tela == 1) {
	 musicaInicial.play()
   vidas = 3, pontos = 0, nivel = 1;
  //volta a repetir		
  //loop();	 
  background(0);
  image(ini,0,0,640,500)
  image(jog,300,250)
  image(img,200,380)
  image(img2,100,100)
  image(img2,300,400)
  image(img2,560,300)
  textSize(40); 
  fill(250,250,250);
   text("Batalha Espacial" ,130 , 50)
   text("pressione:"+"\n"+
       " ENTER", 130, 250);
        textSize(18); 
   text("ENTER" ,305 , 293)
   
	if (keyIsDown(ENTER) ) {
       		tela = 2;  
	}
 
	
}
  
if ( tela == 2) {
	
	musicaInicial.pause()
	musicaInicial2.play()
   
    background(0);
    textSize(32); 
    fill(135,206,235);
    text("Tela 2", 50, 160);

 
		//movimentar o jogador
 if (keyIsDown(LEFT_ARROW))
    xdo-=10;

  if (keyIsDown(RIGHT_ARROW))
    xdo+=10;

  if (keyIsDown(UP_ARROW))
    ydo-=10;

  if (keyIsDown(DOWN_ARROW))
    ydo+=10;
	
  	//"clear" limpa o cenário 
  clear();								
   background(0);
   
for ( i = 0; i < qt; i++) { 			//para controlar o numero de inimigos
	image(img,xdo,ydo,2*raiojogador,2*raiojogador)		
   image(aste,xinimigo[i],yinimigo[i] , raioinimigo*2,raioinimigo)
  	yinimigo[i] = yinimigo[i]+ve
  	
  	if(yinimigo[i] > height) {
   		yinimigo[i] = random(-200, -10)
  	}
 
 //--------------------------textos na tela-----------------------------
  textSize(25);
  fill(245,245,245);
  text("Vidas: "+vidas, 12, 22);
  text("Pontos: "+pontos, 355, 25);
  text( "nivel: "+ nivel, 175, 20)
  
  //--------------colisão entre os objetos-------------
   if ( dist(xdo,ydo,xinimigo[i],yinimigo[i]) < raioinimigo+raiojogador/2 ) {
     if ( colisao == false) { 
       vidas= vidas-1;      
       colisao = true;
       yinimigo[i]= random(-100,-5)
     }
 }
 else {
    colisao = false;  
 }
 //-----------colisão entre disparo e inimigo-----------
  if ( dist(xd,yd,xinimigo[i],yinimigo[i]) < raioinimigo+raiodisparo2 ) {
	  if(colisaodisparo == false){
    	colisaodisparo = true
       yinimigo[i] = random(-100, -10)
		   disparo = false
	   	 colisaodisparo = false
		   pontos=pontos+10
           limitepontos=limitepontos+10
       yd=ydo
    }
  }
  else{
    colisaodisparo = false
  }
  
} // quantidade de inimigos
   //---------------disparo-------------------
  if (keyIsDown(32) && (! disparo) ){ 
    disparo = true; 
    xd = xdo;
    yd = ydo;   
    tiro.play()  
  }
  // movimentação do disparo 
  // se o disparo estiver ativo 
  if (disparo) {
    // movimenta o disparo / tiro 
    yd = yd -10;
    // se o disparo sumir na tela 
    if (yd < 0) {
      // habilida a ocorrência de um novo disparo 
      disparo = false; 
    }
  }
   if (disparo) {
    image(missi,xd,yd,2*raiodisparo2,2*raiodisparo1); // desenha a elipse do disparo 
    
  }
  //------------subir de nivel----------
  if(limitepontos==100){
  nivel++
 limitepontos=0
 qt+=3
  }
    //-----espaço de varios objetos no cenario------

  // desenha objetos 
  for(i = 0; i < qtEstrelas; i++) {
	  rect(estrelasX[i],estrelasY[i],estrelasTam[i],estrelasTam[i])
  }
  
    // movimenta objetos 
  for(i = 0; i < qtEstrelas; i++) { 
	  estrelasY[i] = estrelasY[i] + estrelasVel[i]; 
	  if (estrelasY[i] > height) {
		estrelasX[i] = random(0,width);
		estrelasY[i] = -random(0,height); 		  
	  }
  }
  if (vidas == 0 ) {
        tela = 3; 
        
    }
}
    if ( tela == 3) {
    background(0);
    musicaInicial3.play()
    musicaInicial.pause()
    musicaInicial2.pause()
      image(fim,0,0,640,500)
    textSize(30); 
     fill(240,240,240);
    text("FIM DE JOGO", 150, 500);
    
    //para de repetir
    //noLoop();
    if (keyIsDown(ENTER) ) {
       tela = 1;
       
    } 
  }

  
  
}
