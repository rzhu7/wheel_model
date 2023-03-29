/* IF SOMETHING DOES NOT COMPILE PROPERLY THE WHOLE DOCUMENT DOES NOT RUN. IF A CONST STYLESHEET SENTENCE DOES NOT
WORK THEN THE REST OF THE DOCUMENT IS JUST STUCK*/
/*note that even if we are using one function at the bottom of the js doc while the rest of the functions
arent used by the html at all 
IT IS STILL STUCK BC THE COMPILER JUST GETS STUCK THERE OR SMTH SO FRICKING EVERY SINGLE PART OF UR JS
CODE NEEDS TO BE WORKING BEFORE ANYTHING WILL WORK
*/  




let image = document.getElementById("wheel");
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let form = document.getElementById("form");
let submitBtn = document.getElementById("submit");
let tireDiameter;
let velocity;
let wheel;


function Wheel(tireDiameter, velocity) {
  let hubDiameter; 
  this.tireDiameter = tireDiameter; //in
  this.velocity = velocity; //mph
}


function calculateVelocity(wheel) {
  const inchesPerMile = 63360;
  const secondsPerHour = 3600;
  let velocity = wheel.velocity * inchesPerMile / secondsPerHour; //mph to inches per second
  let circumference = wheel.tireDiameter * Math.PI;
  let secondsPerRotation = circumference / velocity;
  return secondsPerRotation
}


function changeSpin(secondsPerRotation) {
  let stylesheet = document.createElement('style');
  stylesheet.innerHTML = 
    `@keyframes spinning {
      from { transform: rotate(0deg) }
      to { transform: rotate(360deg) }
    }
    .spin {
      animation-name: spinning;
      animation-duration: ${secondsPerRotation}s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }`;
  document.body.appendChild(stylesheet);  
}


submitBtn.onclick = () => {
  tireDiameter = document.getElementById("tire_diameter").value;
  velocity = document.getElementById("velocity").value;
  document.getElementById("tire_diameter").value = document.getElementById("tire_diameter").placeholder;
  document.getElementById("velocity").value = document.getElementById("velocity").placeholder;

  /*
  

//NOTES REMEMBER TO ADD THIS LIKE SIGN THING THAT SAYS:
tirediamter:
velocity :

  */
  if (tireDiameter.length === 0 || velocity.length === 0) {
    alert("no values given");
  }
  else {
    startBtn.disabled = false;
    wheel = new Wheel(tireDiameter, velocity);
  }
}


startBtn.onclick = () => {
  startBtn.disabled = true;
  secsPerRotation = calculateVelocity(wheel);
  changeSpin(secsPerRotation);
  image.classList.add("spin");
  stopBtn.disabled = false;
} 


stopBtn.onclick = function() {
  stopBtn.disabled = true;
  image.classList.remove("spin");
  startBtn.disabled = false;
}
