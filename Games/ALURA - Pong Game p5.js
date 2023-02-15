//VARIÁVEIS

//BOLA
//Posição Bolinha
    let xBolinha = 300;
    let yBolinha = 200;
  //Tamanho Bolinha
    let dBolinha = 30;
    let raio = dBolinha /= 2
  //Velocidade Bolinha
    let velocidadeXBolinha = 6
    let velocidadeYBolinha = 6
//RAQUETE 1
  //Posição Raquete
    let xRaquete = 5
    let yRaquete = 150
  //Tamanho Raquete
    let compRaquete = 10
    let alturaRaquete = 90
  //Colisão Raquete
    let colidiu = false;
  //Sombra Raquete 1
    let xSombraRaquete = 0
    let ySombraRaquete = yRaquete
    let compSombraRaquete = xRaquete
    let alturaSombraRaquete = alturaRaquete
    
//RAQUETE DO OPONENTE
  //Posição Raquete
    let xRaqueteOponente = 585;
    let yRaqueteOponente = 150;
    let velocidadeYOponente;
    let chanceDeErrar = 0;
  //Sombra Raquete Oponente
    let xSombraRaqueteOponente = 595
    let ySombraRaqueteOponente = yRaqueteOponente
//PLACAR DO JOGO
    let meusPontos = 0;
    let pontosDoOponente = 0;
//SONS JOGO
    let raquetada;
    let ponto;
    let trilha;


//FUNÇÕES BACKGROUND
    function setup() {
      createCanvas(600, 400);
      trilha.loop()
        }

    function preload(){
      trilha = loadSound("trilha-1.mp3");
      ponto = loadSound("ponto.mp3");
      raquetada = loadSound("raquetada.mp3");
    }

//FUNÇÕES JOGO
  function draw() {
      background(0);

//BOLA
      mostraBolinha();
      movimentaBolinha();
      verificaColisaoBorda();
      bolinhaNaoFicaPresa();
//RAQUETES
      mostraRaquete(xRaquete, yRaquete);
      movimentaMinhaRaquete();
      //verificaColisaoRaquete();
      verificaColisaoRaquete(xRaquete,yRaquete);
      mostraRaquete (xRaqueteOponente, yRaqueteOponente);
      movimentaRaqueteOponente();
      verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente); 
      mostraSombraRaquete(xSombraRaquete,ySombraRaquete);
      mostraSombraRaqueteOponente(xSombraRaqueteOponente, ySombraRaqueteOponente)
//PLACAR
      incluiPlacar();
      marcaPonto();
      calculaChanceDeErrar();
    
    function mostraBolinha(){
      circle(xBolinha, yBolinha, dBolinha)
      }

    function movimentaBolinha(){
      xBolinha += velocidadeXBolinha
      yBolinha += velocidadeYBolinha;
    }

    function verificaColisaoBorda(){
      //limitar movimento da bola até o limite da borda:
      if ((xBolinha + raio) > width || (xBolinha - raio) < 0){
        velocidadeXBolinha *= -1;
         }
      if (yBolinha + raio > height || yBolinha - raio  < 0){
        velocidadeYBolinha *= -1;
         }
      }

    function mostraRaquete(x, y){
      rect(x, y, compRaquete, alturaRaquete)
      }
    
    function mostraSombraRaquete(x, y){
      fill(color(0,255,255));
      rect(x, y, compSombraRaquete, alturaSombraRaquete)
      }
    function mostraSombraRaqueteOponente(x, y){
      fill(color(128,0,128));
      rect(x, y, compSombraRaquete, alturaSombraRaquete)
      }
    
    function movimentaMinhaRaquete(){
      if(keyIsDown(UP_ARROW)){
        yRaquete -= 10;
        ySombraRaquete -= 10;
      }
      if(keyIsDown(DOWN_ARROW)){
        yRaquete += 10;
        ySombraRaquete += 10;
      }
    }
  
   //  function verificaColisaoRaquete(){
   //  if(xBolinha - raio < xRaquete + compRaquete
   //  && yBolinha - raio < yRaquete + alturaRaquete
   //  && yBolinha - raio > yRaquete ){
   //  velocidadeXBolinha *= -1;
   //  raquetada.play();
   //  }
    }

    function verificaColisaoRaquete(x,y){
    colidiu = collideRectCircle(x, y, compRaquete, alturaRaquete, xBolinha, yBolinha, raio);
      if (colidiu){
        velocidadeXBolinha *= -1;
        raquetada.play();
      }
    }

//JOGANDO COM O PC
    function movimentaRaqueteOponente(){
     velocidadeYOponente = yBolinha - yRaqueteOponente - compRaquete / 2 - 30;
     yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
     ySombraRaqueteOponente += velocidadeYOponente + chanceDeErrar; 
     calculaChanceDeErrar()
    }
   
    function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

    function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    xBolinha = 23
    }
    
}

//MULTIPLAYER
  //  function movimentaRaqueteOponente(){
  //      if(keyIsDown(87)){
  //      yRaqueteOponente -= 10;
  //    }
  //    if(keyIsDown(83)){
  //      yRaqueteOponente += 10;
  //    }     
  // }
   

    function incluiPlacar(){
      
      textSize(16);
      textAlign(CENTER);
      
      fill(color(210,105,30));
      rect(150, 10, 40, 20);
      fill(255);
      text(meusPontos, 170, 26)
      fill(color(210,105,30));
      rect(450, 10, 40, 20);
      fill(255);
      text(pontosDoOponente, 470, 26)
      
    }

    function marcaPonto(){
      if (xBolinha > 585){
        meusPontos += 1;
        ponto.play();
      }
      if (xBolinha < 15){
        pontosDoOponente += 1;
        ponto.play();
      }
    
  }
    
