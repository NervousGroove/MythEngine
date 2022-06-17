
const frames = document.getElementById("animation").children;
const frameCount = frames.length;
let i = 0;
setInterval(function () { 
    frames[i % frameCount].style.display = "none";
    frames[++i % frameCount].style.display = "block";
}, 100)
