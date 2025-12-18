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



     if(affichage1=== true){
        
          grille4()
        }
}


       
  


function keyPressed(){
  if(key==="x"){
    affichage1=!affichage1
  }

  if(key==="y"){
    affichage2=!affichage2
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

     for (let x = marge; x <width-marge; x+=grille) {
      for (let y = marge; y<height-marge; y+=grille) {
 
         let paramX=x*zoom;
         let paramY =y*zoom;

         let noise3d = noise(paramX,paramY,temps)
        //  map (valeur, min1, max1, min2, max2)

        
         stroke(50,100,90)
         noise3d = map(noise3d,0,1,-30,20)
        line(x,y,x+grille-5,y)

        stroke(200,255,85)
        line(x*1.1,y/1.1,x+noise3d,y)
 }
}
}

function grille3(){

   let level = amp.getLevel();
      temps = temps+level*0.5;


}


function grille2(){
    
noStroke()
    let level= amp.getLevel(); 
    tps=tps+level*0.1


for (let x = marge; x <width-marge; x+=grille) {
    for (let y =marge; y<height-marge; y+=grille) {


    let seed= y*x
    let s = noise(y+frameCount*0.5)*grille*50
    let paramX= x*zoom
    let paramY= y*zoom
    let tps = frameCount*0.02
    let noise2D=noise(paramX,paramY,tps)*grille*1.5
    

    fill(random(255),150,100)
    ellipse(x,y,noise2D)



    }
 }
}

function grille4(){

   let level = amp.getLevel();
      tps = tps+level*5;
    stroke(200,50,70)
   for (let x = 0; x <width; x+=grille*30) {
        beginShape()
      for (let y = 0; y<height; y+=grille*2) {
    
        let paramX=x*zoom*5;
        let paramY =y*zoom*5;

let noiseX = noise(paramX,paramY,tps)*200
      
        point(x,y-noiseX)


}
}
}


function grille5(){
    let d = dist(x, y, mouseX, mouseY);
    let influence = map(d, 0, 200, 20, 0, true);

    let noise3d = noise(paramX, paramY, temps);
    noise3d = map(noise3d, 0, 1, -30, 20);

    line( x,y,x + noise3d + influence,y);
}