let grille = 1;
let marge = 1;
let sound;
let amp;
let font;
let fft;
let tps = 0




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


 

}

let zoom =0.009;
let time =0;

function draw() {

  let bass, lowMid, mid, highMid, treble;
  fft.analyze();

//ici on obtient que des valeurs entre 0 et 255
  bass = fft.getEnergy("bass");
  lowMid = fft.getEnergy("lowMid");
  mid = fft.getEnergy("mid");
  highMid = fft.getEnergy("highMid");
  treble = fft.getEnergy("treble");

     background(255)


         
 
        grille1()

    



       
  
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
      time+=level*0.3;
    stroke(100,50,50)
    noFill()

     for (let x = 0; x <width-marge; x+=grille) {
        beginShape()
      for (let y = 0; y<height-marge; y+=grille) {
 
        let paramX=x*zoom;
        let paramY =y*zoom;

         let noiseX = noise(paramX,paramY,time)*100
         let treshold = noise(x*zoom,y*zoom,time)

         if (treshold>0.5){
     vertex(x+noiseX,y)
         }else{
            vertex(x,y)
         }


   

        
 }
 endShape()
}
}

function grille3(){

   let level = amp.getLevel();
      temps = temps+level*0.5;


}
