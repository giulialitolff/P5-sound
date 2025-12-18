let grille = 2;
let marge = 30;
let sound;
let amp;
let font;
let fft;
let tps = 0




let affichage1 = false;
let affichage2 = false;




function preload(){
  sound = loadSound('sound/sal blossoms.mp3')
}

function setup() {
    colorMode(HSL)
    createCanvas(windowWidth, windowHeight);
  
    frameRate(10)
    amp = new p5.Amplitude();
    fft = new p5.FFT();


 

}

let zoom =0.009;
let temps =0;


function draw() {

  let bass, lowMid, mid, highMid, treble;
  fft.analyze();

//ici on obtient que des valeurs entre 0 et 255
  bass = fft.getEnergy("bass");
  lowMid = fft.getEnergy("lowMid");
  mid = fft.getEnergy("mid");
  highMid = fft.getEnergy("highMid");
  treble = fft.getEnergy("treble");

     background(200,255,85)
    grille = map(mouseX/30, 0, width, 1, 40);
  zoom = map(mouseY/30, 0, height, 0.002, 0.002);

  fft.analyze();
  background(200,255,85);

  grille1();

  fill(0,0,100,80);
  noStroke();
  circle(width/2, height/2, highMid*2);

 



        if(affichage2===true){
          // background(200,255,85)
          grille=20
          marge=1
          //  grilleB()
          grilleC()
          grilleA()
          // grilleB()
         
        } else{
          marge=30
        }

        
        if(affichage1=== true){
        
          grille2()
        }


}


       
  


function keyPressed(){
  if(key==="c"){
    affichage2=!affichage2
  }

    if(key==="x"){
    affichage1=!affichage1
  }
  
}
function mousePressed(){
 let lecture = sound.isPlaying();
 if(lecture == false){
      sound.play()
 }    
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




function grille1(){
      let level = amp.getLevel();
      temps = temps+level*0.5;

        for (let y = marge; y<height-marge; y+=grille) {
      if(y!=height-marge-grille){
    strokeWeight(2)
          stroke(50,100,90)
          line(marge,y,width-marge,y)
        }
      }
     for (let x = marge; x <width-marge; x+=grille) {
      
      for (let y = marge; y<height-marge; y+=grille) {
 
         let paramX=x*zoom;
         let paramY =y*zoom;

         let noise3d = noise(paramX,paramY,temps)
        //  map (valeur, min1, max1, min2, max2)

        
         //stroke(50,100,90)
         noise3d = map(noise3d,0,1,-10,50)
          // stroke(20,100,50)
       // line(x,y,x+grille-5,y)
strokeWeight(0.1)
        stroke(200,255,85)
        line(x*1.1,y/1.1,x+noise3d,y)
 }
}
}


function grille2(){

    let bass, lowMid, mid, highMid, treble;
  fft.analyze();

//ici on obtient que des valeurs entre 0 et 255
  bass = fft.getEnergy("bass");
  lowMid = fft.getEnergy("lowMid");
  mid = fft.getEnergy("mid");
  highMid = fft.getEnergy("highMid");

    stroke(200,100,100)
   for (let x = 0; x <width; x+=grille*20) {
        // beginShape()
      for (let y = 0; y<height; y+=grille*2) {
    
        let paramX=x*zoom;
        let paramY =y*zoom;

let noiseX = noise(paramX,paramY,mid)*300
strokeWeight(1)
        point(x,y-noiseX)


}
}
}



function grilleA(){
  grille=20
  zoom=10
  strokeWeight(0.1)
    fft = new p5.FFT();

      fft.analyze();

  highMid = fft.getEnergy("highMid");
      highMid=highMid/255
      tps+=highMid*0.5;
    stroke(50,100,90)
    noFill()

     for (let x = 0; x <width; x+=grille) {
        beginShape()
      for (let y = 0; y<height; y+=grille*0.01) {
 
        let paramX=x*zoom;
        let paramY =y*zoom;

         let noiseX = noise(paramX,paramY,frameCount)*500

     vertex(x+noiseX,y-noiseX)

      
 }
 endShape()
}
}

function grilleB(){
 let zoom =0.009;
    let grilleLocal =1;
       let level = amp.getLevel();
      tps+=level*0.5;
    stroke(100,50,150)
    

     for (let x = 0; x <width-marge; x+=grilleLocal) {
        beginShape()
      for (let y = 0; y<height-marge; y+=grilleLocal/2) {
 
        let paramX=x*zoom;
        let paramY =y*zoom;

         let noiseX = noise(paramX,paramY,tps)
         let treshold = noise(x*zoom,y*zoom,tps)

         if (treshold>0.8){
            strokeWeight(0.7)
            point(x,y+noiseX)
         }


   

        
 }
 endShape()
}
}

function grilleC(){
  let zoom =0.009;
    let grilleLocal =1;
       let level = amp.getLevel();
      tps+=level*0.5;
    stroke(150,50,70)
    

     for (let x = 0; x <width-marge; x+=grilleLocal/2) {
        beginShape()
      for (let y = 0; y<height-marge; y+=grilleLocal*2) {
 
        let paramX=x*zoom;
        let paramY =y*zoom;

         let noiseX = noise(paramX,paramY,tps)*500
         let treshold = noise(x*zoom,y*zoom,tps)

         if (treshold>0.5){
     line(x+noiseX,y)
         }else{
          strokeWeight(0.7)
            point(x,y+noiseX)
         }


   

        
 }
 endShape()
}
}
