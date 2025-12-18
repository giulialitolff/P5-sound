let grille = 20;
let marge = 1;
let sound;
let amp;
let font;
let fft;
let tps = 0
let bass, lowMid, mid, highMid, treble;




let affichage1 = true;




function preload(){
  sound = loadSound('sound/sal blossoms.mp3')
}

function setup() {
    colorMode(HSL)
    createCanvas(windowWidth, windowHeight);
  
    frameRate(10)
    amp = new p5.Amplitude();
    fft = new p5.FFT();

      fft.analyze();

//ici on obtient que des valeurs entre 0 et 255
  bass = fft.getEnergy("bass");
  lowMid = fft.getEnergy("lowMid");
  mid = fft.getEnergy("mid");
  highMid = fft.getEnergy("highMid");
  treble = fft.getEnergy("treble");


 

}

let zoom =0.009;
let time =0;

function draw() {




     background(50,255,90)


         
    grille3()
    grille1()

    grille2()
    


       
  
}


function mousePressed(){
 let lecture = sound.isPlaying();
 if(lecture == false){
      sound.play()
 }    
}








function grille1(){
    fft = new p5.FFT();

      fft.analyze();

//ici on obtient que des valeurs entre 0 et 255
  bass = fft.getEnergy("bass");
  lowMid = fft.getEnergy("lowMid");
  mid = fft.getEnergy("mid");
  highMid = fft.getEnergy("highMid");
      highMid=highMid/255
      time+=highMid*0.5;
    stroke(200,50,90)
    noFill()

     for (let x = 0; x <width; x+=grille) {
        beginShape()
      for (let y = 0; y<height; y+=grille*0.1) {
 
        let paramX=x*zoom;
        let paramY =y*zoom;

         let noiseX = noise(paramX,paramY,time)*300

     vertex(x+noiseX,y-noiseX)

      
 }
 endShape()
}
}

function grille2(){

   let level = amp.getLevel();
      time = time+level*0.5;
    stroke(200,50,70)
   for (let x = 0; x <width; x+=grille/1.5) {
        beginShape()
      for (let y = 0; y<height; y+=grille*0.1) {
    
        let paramX=x*zoom;
        let paramY =y*zoom;

let noiseX = noise(paramX,paramY,time)*200
      
        point(x,y-noiseX)


}
}
}


function grille3(){
    let grilleLocal =1;
       let level = amp.getLevel();
      time+=level*0.3;
    stroke(150,50,50)
    

     for (let x = 0; x <width-marge; x+=grilleLocal) {
        beginShape()
      for (let y = 0; y<height-marge; y+=grilleLocal) {
 
        let paramX=x*zoom;
        let paramY =y*zoom;

         let noiseX = noise(paramX,paramY,time)*500
         let treshold = noise(x*zoom,y*zoom,time)

         if (treshold>0.5){
     line(x+noiseX,y)
         }else{
            point(x,y+noiseX)
         }


   

        
 }
 endShape()
}
}
