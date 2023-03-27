/* IF SOMETHING DOES NOT COMPILE PROPERLY THE WHOLE DOCUMENT DOES NOT RUN. IF A CONST STYLESHEET SENTENCE DOES NOT
WORK THEN THE REST OF THE DOCUMENT IS JUST STUCK*/


let image = document.getElementById("wheel");
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let settingsBtn = document.getElementById("settings");
let form = document.getElementById("form");
let tireDiameter;
let velocity;


function fetchcall() {
  let data = new FormData(form);
  fetch("config.php", { method: "POST", body: data })
  .then((result) => {
    //if (result.status != 200) { throw new Error("Bad Server Response")}
    alert("hi")
    return result.text();
  })
  .then((text) => alert("hi"))
  .catch(err => console.error(err));
  return false;
}


function Wheel (tireDiameter, velocity) {
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

form.addEventListener("submit", fetchcall());

settingsBtn.onclick = function() {
  let wheel = new Wheel(tireDiameter, velocity);
  secondsPerRotation = calculateVelocity(wheel);
  changeSpin(secondsPerRotation);
}

startBtn.onclick = function () {
    image.classList.add("spin");
} 

stopBtn.onclick = function() {
  image.classList.remove("spin");
}




/*
function processForm() {

  tireDiameter = document.getElementById("form").elements[1].value;
  velocity = document.getElementById("form").elements[3].value;
  alert(tireDiameter)
  
}
*/