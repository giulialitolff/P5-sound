

let grille = 1;
let sound;
let amp;
let zoom=0.01


let affichage1 = false

function preload(){
     sound = loadSound('sound/sal blossoms.mp3')
}


let marge=30


function setup() {
    colorMode(HSL);
   
 createCanvas(windowWidth, windowHeight);
   noStroke();
 frameRate(10)

 
 amp = new p5.Amplitude();
}


  let tps = 0



function draw() {


    background(255)
   

    grille2()

  



  
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mousePressed(){
let lecture = sound.isPlaying();
    if(lecture==false){
        sound.play()
    }
}

function keyPressed(){

  if(key=='1'){
affichage1=!affichage1
  }
}



function grille1(){
    
    let level= amp.getLevel(); 
    tps=tps+level*0.5


for (let x = marge; x <width-marge; x+=grille) {
    for (let y =marge; y<height-marge; y+=grille) {


    let seed= y*x
    let s = noise(y+frameCount*0.5)*grille*50
    let paramX= x*zoom
    let paramY= y*zoom
    let tps = frameCount*0.02
    let noise2D=noise(paramX,paramY,tps)*grille*2
    fill(random(255),100,10)
 
   ellipse(x,y,noise2D)


    }
 }
}






function grille2(){
    
    let level= amp.getLevel(); 
    tps=tps+level*0.5


for (let x = marge; x <width-marge; x+=grille) {
    for (let y =marge; y<height-marge; y+=grille) {


    let seed= y*x
    let s = noise(y+frameCount*0.5)*grille*50
    let paramX= x*zoom
    let paramY= y*zoom
    let tps = frameCount*0.02
    let noise2D=noise(paramX,paramY,tps)*grille*2
    fill(random(255),100,10)
 
   ellipse(x,y,noise2D)


    }
 }
}