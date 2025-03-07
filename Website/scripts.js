document.addEventListener("DOMContentLoaded", () => { // lets the page load before running
    const togglebtn = document.getElementById("themeswitch");
    const body = document.body;
    
    if (localStorage.getItem("theme") === "dark") {  // if its dark, apply dark theme
        body.classList.add("darkmode");
    }

    togglebtn.style.cursor = "pointer"; // so that the mouse pointer changes to the hand (yay)
    
    togglebtn.addEventListener("click", () => { // click script
        body.classList.toggle("darkmode");
        
        if (body.classList.contains("darkmode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});

document.getElementById("playbtn").addEventListener("click", function() {
    let audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});