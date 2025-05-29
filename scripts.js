// THEME SWITCH
document.addEventListener("DOMContentLoaded", () => { // theme switching
    const togglebtn = document.getElementById("themeswitch");
    const body = document.body;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");

    function applyTheme(theme) {  // applies the theme
        if (theme === "dark") {
            body.classList.add("darkmode");
        } else {
            body.classList.remove("darkmode");
        }
    }

    if (savedTheme) { // checks local storage, and system preferences
        applyTheme(savedTheme);
    } else {
        applyTheme(systemPrefersDark ? "dark" : "light"); 
    }

    togglebtn.addEventListener("click", () => { // theme switching, click script
        const currentTheme = body.classList.contains("darkmode") ? "dark" : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => { // live reloading
        if (!localStorage.getItem("theme")) { 
            applyTheme(event.matches ? "dark" : "light");
        }
    });
});


// LAPTOP BUTTON
const audio = document.getElementById("audio");
const playButton = document.getElementById("playbtn");

document.getElementById("playbtn").addEventListener("click", function() { // funny audio button
    let audio = document.getElementById("audio"); // play audio (kinda buggy but it works)
    if (audio.paused) {
        audio.play();
        playButton.src = "./img/bsod.png";  // changes image to bsod funny
    } else {
        audio.pause();
        playButton.src = "./img/laptop.png"; // TEMPORARY I SWEAR, stolen from gnome.org, slightly edited
    }
});

// HEADER SCROLL + MENU NAVIGATION
let isMenuOpen = false;
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (isMenuOpen) { // if menu is open, dont add blur
            return;
        }
        if (window.scrollY > 50) {
            header.classList.add("scrolled"); // add blur past y50
        } else {
            header.classList.remove("scrolled"); // remove if under y50
        }
    });

    const navItems = document.querySelectorAll('.nav-item');
    const menutitle = document.querySelector('.menu-title');
    const menunav = document.getElementById('menunav');

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => { // checks for cursor
            const title = item.getAttribute('data-menu');  
            menutitle.textContent = title; // changes to current nav-item title
            menunav.style.height = '40%'; // activates menu
            header.classList.remove("scrolled"); // removes header blur
            isMenuOpen = true;
        });
    });

    document.querySelector('.menu').addEventListener('mouseleave', () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        }
        menunav.style.height = '0%'; // bye bye menu
        isMenuOpen = false;
    });
});

// TOUCHSCREEN, DISMISS MENU IF TAPPED ELSEWHERE
document.addEventListener('click', (event) => {
    const menunav = document.getElementById('menunav');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('header');

    if (isMenuOpen) {
        if (!menunav.contains(event.target) && !nav.contains(event.target)) { // removes menu if tapped elsewhere
            menunav.style.height = '0%'; 
            isMenuOpen = false;

            if (window.scrollY > 50) { 
                header.classList.add("scrolled"); // adds header blur if past y50 again
            }
        }
    }
});

// REMOVE MENU IF WINDOW IS TOO SMALL
window.addEventListener('resize', () => {
    const menunav = document.getElementById('menunav');
    const header = document.querySelector('header');

    if (window.innerWidth <= 768) {
        if (isMenuOpen) {
            menunav.style.height = '0%'; // removes menu if responsive
            isMenuOpen = false;

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            }
        }
    }
});


// HEADER LOGO TEXT
function updateLogoText() {
    const logoText = document.querySelector(".logo-text"); // Header text shorten
    if (window.innerWidth <= 768) {
        logoText.textContent = "GLG";
    } else {
        logoText.textContent = "Geodes Linux Guide";
    }
}
// UPDATE LOGO TEXT
updateLogoText();
window.addEventListener("resize", updateLogoText);


// PARAGRAPH TEXT
function updateParaText() {
    const logoText = document.querySelector(".para-text"); // Parahraph text shorten
    const buttonShow = document.querySelector(".para-btn"); // Show read more button
    if (window.innerWidth <= 768) {
        logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits.";
        buttonShow.style.position = "relative"; // adds button to show more if <768
        buttonShow.style.left = "50%"; // dont know why i did this but i am too lazy to change it now
        buttonShow.style.transform = "translateX(-50%)";
        buttonShow.style.display = "block";
    } else {
        logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits. In other words, your PC becomes a sitting duck for hackers and malware, and your apps will eventually just stop being supported. This will lead to millions of (frankly, not even that old) devices being thrown out when they dont need to be. Windows 11 has its problems too, with privacy concerns, unwanted features/removal of features, and many AI features being shoved down your throat.";
        buttonShow.style.display = "none"; // removes button if screen size is >768
    }
}
// UPDATE PARAGRAPH TEXT
updateParaText();
window.addEventListener("resize", updateParaText);


// READ MORE/LESS BUTTON
function paraTextToggle() {
    const logoText = document.querySelector(".para-text");
    const button = document.querySelector(".para-btn");
    const icon = document.getElementById("para-icon");
    const label = document.getElementById("para-label");
    const isExpanded = button.dataset.expanded === "true";

    if (!isExpanded) { // adds this text if you press the read more button (couldve done this more efficiently but it works)
        logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits. In other words, your PC becomes a sitting duck for hackers and malware, and your apps will eventually just stop being supported. This will lead to millions of (frankly, not even that old) devices being thrown out when they dont need to be. Windows 11 has its problems too, with privacy concerns, unwanted features/removal of features, and many AI features being shoved down your throat.";
        label.textContent = "Read Less"; // arrow text + icon
        icon.className = "nf nf-fa-angle_up";
        button.dataset.expanded = "true";
    } else { // back to smaller ver
        logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits.";
        label.textContent = "Read More"; // arrow text + icon
        icon.className = "nf nf-fa-angle_down";
        button.dataset.expanded = "false";
    }
}


// GRADIENT
const section = document.querySelector('.sectionmiddle');
const gradient = section.querySelector('.gradient');

section.addEventListener('mousemove', e => {
  const rect = section.getBoundingClientRect(); // gets section size
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  section.style.setProperty('--x', `${x}px`); // finds x/y of cursor
  section.style.setProperty('--y', `${y}px`);
  gradient.style.opacity = '0.2'; // sets gradient to 0.2, maybe too much idk
});

section.addEventListener('mouseleave', () => { // removes the gradient if mouse leaves the section
  gradient.style.opacity = '0';
});


// NAVIGATION & NAV ITEM MENUS
const hideheader = document.querySelector('header'); // full screen nav, remove header

function openNav() { 
    hideheader.style.opacity = '0';
    document.getElementById("fullnav").style.height = "100vh"; // height of screen
}
function closeNav() {
    hideheader.style.opacity = '1';
    document.getElementById("fullnav").style.height = "0%"; // disappear
}