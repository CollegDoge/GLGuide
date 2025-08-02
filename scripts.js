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


// LAPTOP IMAGE STUFF (HOME)
const audio = document.getElementById("audio");
const playButton = document.getElementById("playbtn");

if (audio && playButton) {
    let clickEnabled = true;
    let originalSrc = "./img/laptop.png";
    let altSrc = "./img/bsod.png";
    let scrollSrc = "./img/laptopkde.png";

    let imageList = [
        "./img/laptopkde.png",
        "./img/laptopgnome.png",
        "./img/laptopcinnamon.png",
    ];
    let currentImageIndex = 0;

    playButton.addEventListener("click", () => {
        if (clickEnabled) {
            if (audio.paused) {
                audio.play();
                playButton.src = "./img/bsod.png"; // changes image to bsod funny
            } else {
                audio.pause();
                playButton.src = "./img/laptop.png"; // regular image
            }
        } else {
            currentImageIndex = (currentImageIndex + 1) % imageList.length;
            playButton.src = imageList[currentImageIndex];
        }
    });

    function fadeImage(imgElement, newSrc) {
        const tempImg = new Image();
        tempImg.src = newSrc;

        tempImg.onload = () => {
            imgElement.classList.add("fade-out");
            setTimeout(() => {
                imgElement.src = newSrc;
                imgElement.classList.remove("fade-out");
            }, 200);
        };
        imgElement.style.cursor = "pointer"; // add clickable hint
    }

    function getScrollThreshold() {
        return window.innerWidth < 1200 ? 800 : 400;
    }

    window.addEventListener("scroll", () => {
        const threshold = getScrollThreshold();

        if (window.scrollY > threshold) { // if window is scrolled past the windows threshold (different per screen res), change the windows image to the KDE one
            if (clickEnabled) {
                clickEnabled = false;
                audio.pause(); // stop audio if playing
                fadeImage(playButton, scrollSrc);
            }
        }
    });
}


// MENUS, NAV AND HEADER SCROLL
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const menunav = document.getElementById('menunav');
    const menuitems = document.querySelector('.menu-items'); // get nav links
    const navItems = document.querySelectorAll('.nav-item');
    const overlay = document.getElementById('page-overlay'); // overlay element (blur and stuff)
    let isMenuOpen = false;

    function openMenu(title, selectedItem) {
        if (!title) return; // avoids null errors

        menuitems.innerHTML = "";

        const key = title.toLowerCase();
        const listContainer = document.querySelector(`.item-${key}`);

        if (listContainer) {
            const items = Array.from(listContainer.querySelectorAll('a'));
            const topRow = []; // define top row
            const bottomRow = []; // define bottom row

            items.forEach((a, i) => { // for each item, place them for the bottom/top row, alternating across 7 items 
                const clone = a.cloneNode(true);
                if (i % 2 === 0) {
                    topRow.push(clone);
                } else {
                    bottomRow.push(clone);
                }
            });

            const columns = []; // define columns
            const maxCols = Math.ceil(items.length / 2);
            for (let i = 0; i < maxCols; i++) { // make columns (2 down, 4 across, since I have 7 items)
                if (topRow[i]) columns.push(topRow[i]);
                if (bottomRow[i]) columns.push(bottomRow[i]);
            }

            columns.forEach(a => menuitems.appendChild(a)); // append to menuitems
        }

        menunav.style.height = '380px'; // height for menu
        header.classList.remove("scrolled");
        overlay.classList.add('active'); // menu active
        isMenuOpen = true; // adds open flag

        navItems.forEach(nav => nav.classList.remove('selected')); // remove selected class for each item
        selectedItem.classList.add('selected'); // add class for new item
    }


    function closeMenu() {
        menunav.style.height = '0%'; // hides menu
        overlay.classList.remove('active'); // remove overlay effect
        isMenuOpen = false; // removes open flag

        if (window.scrollY > 50) { // adds header blur if scrolled after closing menu
            header.classList.add("scrolled");
        }

        navItems.forEach(nav => nav.classList.remove('selected')); // removes colour hover if menu is closed
    }

    window.addEventListener("scroll", () => {
        if (!isMenuOpen) {
            header.classList.toggle("scrolled", window.scrollY > 50); // adds blur on scroll
        }
    });

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => { // adds title for each nav-item
            const title = item.getAttribute('data-menu');
            openMenu(title, item);
        });
    });

    document.querySelector('.menu').addEventListener('mouseleave', closeMenu); // closes menu if mouse moves out of menu

    document.addEventListener('click', (event) => { // closes menu if the user taps out of the menu
        if (isMenuOpen && 
            !menunav.contains(event.target) && 
            !document.querySelector('.nav').contains(event.target)) { 
            closeMenu();
        }
    });

    overlay.addEventListener('click', closeMenu); // overlay too, will hide menu if tapped.

    window.addEventListener('resize', () => { // removes menu if screen size <768 (hamburger instead)
        if (isMenuOpen && window.innerWidth <= 768) {
            closeMenu();
        }
    });
});


// FULLSCREEN NAV FUNCTIONALITY
document.querySelectorAll('#fullnav .nav-item').forEach(navItem => {
    const titleText = navItem.querySelector('p').textContent.trim().toLowerCase(); // e.g., "distros"
    const dropdown = navItem.querySelector('.dropdown');
    const listContainer = document.querySelector(`.item-${titleText}`); // same thing as earlier, see last section

    if (dropdown && listContainer) {
        const items = listContainer.querySelectorAll('a'); // gets lists (now A instead of LI)
        items.forEach(a => {
            const clonedA = a.cloneNode(true);
            dropdown.appendChild(clonedA);
        });
    }
});
document.querySelectorAll('#fullnav .nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const isOpen = item.classList.contains('open'); // adds open (expanded) checking for items

        document.querySelectorAll('#fullnav .nav-item').forEach(nav => {
            nav.classList.remove('open'); // adds/removes entry
        });

        if (!isOpen) {
            item.classList.add('open');
        }
    });
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

// PARAGRAPH TEXT CHANGE (screen width < 768)
function updateParaText() { 
    const logoText = document.querySelector(".para-text");
    const buttonShow = document.querySelector(".para-btn");

    if (logoText && buttonShow) {
        if (window.innerWidth <= 768) { 
            logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits.";
            buttonShow.style.position = "relative"; // adds button to show more if <768
            buttonShow.style.left = "50%";  // dont know why i did this but i am too lazy to change it now
            buttonShow.style.transform = "translateX(-50%)"; 
            buttonShow.style.display = "block";
        } else {
            logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits. In other words, your PC becomes a sitting duck for hackers and malware, and your apps will eventually just stop being supported. This will lead to millions of (frankly, not even that old) devices being thrown out when they dont need to be. Windows 11 has its problems too, with privacy concerns, unwanted features/removal of features, and many AI features being shoved down your throat.";
            buttonShow.style.display = "none"; // removes button if screen size is >768
        }
    }
}


// UPDATES PARAGRAPH TEXT
updateParaText();
window.addEventListener("resize", updateParaText);

// READ MORE/LESS BUTTON (screen width < 768)
function paraTextToggle() {
    const logoText = document.querySelector(".para-text");
    const button = document.querySelector(".para-btn");
    const icon = document.getElementById("para-icon");
    const label = document.getElementById("para-label");

    if (logoText && button && icon && label) { // adds this text if you press the read more button (couldve done this more efficiently but it works)
        const isExpanded = button.dataset.expanded === "true";

        if (!isExpanded) {
            logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits. In other words, your PC becomes a sitting duck for hackers and malware, and your apps will eventually just stop being supported. This will lead to millions of (frankly, not even that old) devices being thrown out when they dont need to be. Windows 11 has its problems too, with privacy concerns, unwanted features/removal of features, and many AI features being shoved down your throat.";
            label.textContent = "Read Less"; // arrow text + icon
            icon.className = "nf nf-fa-angle_up"; 
            button.dataset.expanded = "true";
        } else {
            logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits.";
            label.textContent = "Read More"; // arrow text + icon
            icon.className = "nf nf-fa-angle_down";
            button.dataset.expanded = "false";
        }
    }
}



// GRADIENT
const section = document.querySelector('.sectionmiddle');
const gradient = section?.querySelector('.gradient');

if (section && gradient) {
    section.addEventListener('mousemove', e => { 
        const rect = section.getBoundingClientRect(); // gets section size
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        section.style.setProperty('--x', `${x}px`); // finds x/y of cursor
        section.style.setProperty('--y', `${y}px`);
        gradient.style.opacity = '0.2'; // sets gradient to 0.2, maybe too much idk
    });

    section.addEventListener('mouseleave', () => { 
        gradient.style.opacity = '0'; // removes the gradient if mouse leaves the section
    });
}


// FULL NAVIGATION & NAV ITEM MENUS
const hideHeader = document.querySelector('header'); // full screen nav, remove header

function openNav() { 
    hideHeader.style.opacity = '0';
    document.getElementById("fullnav").style.height = "100vh"; // height of screen
}
function closeNav() {
    hideHeader.style.opacity = '1';
    document.getElementById("fullnav").style.height = "0%"; // disappear
}

function imagePreview(src, description, link) {
    const overlay = document.getElementById('page-overlay');
    const modal = document.getElementById('image-preview');
    const img = document.getElementById('preview-img');
    const desc = document.getElementById('preview-desc');
    const linkEl = document.getElementById('preview-link');

    img.src = src; // source defined in img
    desc.textContent = description; // description defined in img
    linkEl.href = link; // link defined in img (weird formatting issue, but it seems to work)

    if (window.innerWidth >= 768) {
        overlay.classList.add('active');
        modal.classList.add('active');

        document.body.style.overflow = 'hidden'; // hide scroll
        
        img.onclick = () => linkEl.click(); // open link when you click on the image (same as preview-link)
        overlay.onclick = () => closePreview(); // click outside to close, yes i already did this in header

        hideHeader.style.display = 'none';
    }
}

function closePreview() { // yes im making this again for the image preview, too lazy lol
    document.getElementById('page-overlay').classList.remove('active');
    document.getElementById('image-preview').classList.remove('active');
    document.body.style.overflow = '';
    hideHeader.style.display = 'flex';
}

// create random quote
const quote = document.querySelector('.randomquote');
if (quote) {
    const quotes = [
        "whats the point of a backend fr",
        "why wouldnt you just use netbeans",
        "i lost the game, and you did too",
        "i forgot what to write here",
        "i use arch btw",
        "thinkpads are goated",
        "windows? more like trashdows",
        "CSS is, well certainly something",
        "whats the point of life without a computer",
        "vaxry fix my bug already",
        "how do i exit vim",
        "i am a full stack developer (html, css, js, uhh bash script too)",
        "one day i will be happy",
        "furry art gets me through the day",
        "ignore my last quote i beg you",
        "dont even look at the code for this",
        "these are random quotes btw",
        "what am i doing, like seriously",
        "i am fueled by the desire to learn (and maybe monster sometimes)",
        "i hate you finn, you know what you did",
        "i have nightmares of using macos",
        "chatgpt, how do i center a div",
        "i have friends, of course i do",
        "im not angry, im just mad",
        "the stickers on my laptop increase my productivity i swear",
        "FF7700 is the best color, dont argue with me",
        "overwhelmed as one would be, placed in my position",
        "yesterday i woke up sucking a lemon",
        "mmmghghfhfhfhffhhh",
        "my pc specs: i5 13500, 32gb ram, 2x 1tb nvme, rx 6600xt",
        "i get all the women",
        "stop refreshing the page and do something productive",
        "libass is the best package",
        "cheaper things are generally more expensive"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quote.textContent = randomQuote;
}
