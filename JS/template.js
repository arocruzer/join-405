const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
let msgBox = document.getElementById("msgBox");
let hero = document.getElementById("body")
if(msg){
    msgBox.innerHTML = msg;
}else{
    msgBox.style.display = "none";
}


hero.onclick = function() {
        msgBox.style.display = "none";
    }