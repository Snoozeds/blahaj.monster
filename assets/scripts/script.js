// Mouse trails
let lastTime = 0;
const interval = 30; // Milliseconds between creating a new trail

document.addEventListener('mousemove', function (e) {
    const now = Date.now();
    if (now - lastTime < interval) return; // Skip if too soon
    lastTime = now;

    const trail = document.createElement('div');
    trail.className = 'trail';

    // Random Rotation and Angle
    const randomAngle = Math.random() * 2 * Math.PI;
    const randomDistance = Math.random() * 50;
    const offsetX = Math.cos(randomAngle) * randomDistance;
    const offsetY = Math.sin(randomAngle) * randomDistance;

    trail.style.left = `${e.pageX + offsetX}px`;
    trail.style.top = `${e.pageY + offsetY}px`;

    const initialRotation = Math.floor(Math.random() * 360);
    trail.style.transform = `translate(-50%, -50%) rotate(${initialRotation}deg)`;

    document.body.appendChild(trail);

    trail.addEventListener('animationend', () => {
        trail.remove();
    });
});

// Joke popup ads
const popupAd = document.getElementById("popup-ad");
const closeAdButton = document.getElementById("close-ad");
const popupAdImg = document.getElementById("popup-ad-img");
const body = document.body;
const mainContent = document.getElementById("main-content");

const adImages = [
    "media/fake ads/blahajarly.webp",
    "media/fake ads/local-blahajs.webp",
    "media/fake ads/safe-vpn.webp",
    "media/fake ads/blahaj-stone-dubtoshi.webp",
    "media/fake ads/blahaj-bat.webp",
    "media/fake ads/blahaj-credit.webp"
];

// Check localStorage for the user's preference
let showPopups = localStorage.getItem("showPopups") !== "false";

let popupVisible = false;

function showPopupAd() {
    if (showPopups && !popupVisible && popupAdImg != null) {
        const randomIndex = Math.floor(Math.random() * adImages.length);
        popupAdImg.src = adImages[randomIndex];
        popupAd.style.display = "block";
        popupVisible = true;
    }
}

function closePopupAd() {
    popupAd.style.display = "none";
    popupVisible = false;
}

setInterval(() => {
    showPopupAd();
}, 15000);

if (closeAdButton != null) {
    closeAdButton.addEventListener("click", closePopupAd);
}

// Settings
const settingsButton = document.querySelector('.settings-button');
const settingsPanel = document.querySelector('.settings-panel');
const popupToggle = document.getElementById('popup-toggle');
const motionToggle = document.getElementById('motion-toggle');

// Initialize reduced motion state
let reducedMotion = localStorage.getItem("reducedMotion") === "true";

function updateMotionPreference(reduced) {
    if (reduced) {
        document.body.style.backgroundImage = "url('../../media/static-glitter.webp')";
        document.querySelectorAll('.marquee span').forEach(span => {
            span.style.animation = 'none';
        });
        document.querySelectorAll('.blinking-text').forEach(elem => {
            elem.style.animation = 'none';
        });
        document.querySelectorAll('.gallery-container img').forEach(img => {
            img.style.animation = 'none';
        });
    } else {
        document.body.style.backgroundImage = "url('../../media/animated-glitter.webp')";
        document.querySelectorAll('.marquee span').forEach(span => {
            span.style.animation = '';
        });
        document.querySelectorAll('.blinking-text').forEach(elem => {
            elem.style.animation = '';
        });
        document.querySelectorAll('.gallery-container img').forEach(img => {
            img.style.animation = '';
        });
    }
}

// Initialize motion toggle state
if (motionToggle) {
    motionToggle.checked = reducedMotion;
    if (reducedMotion) {
        updateMotionPreference(true);
    }
}

// Settings panel toggle
settingsButton.addEventListener('click', () => {
    settingsPanel.classList.toggle('visible');
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (!settingsButton.contains(e.target) && !settingsPanel.contains(e.target)) {
        settingsPanel.classList.remove('visible');
    }
});

// Popup ads toggle
if (popupToggle) {
    popupToggle.checked = showPopups;
    popupToggle.addEventListener('change', (e) => {
        showPopups = e.target.checked;
        localStorage.setItem("showPopups", showPopups ? "true" : "false");
        if (!showPopups) {
            closePopupAd();
        }
    });
}

// Reduced motion toggle
if (motionToggle) {
    motionToggle.addEventListener('change', (e) => {
        reducedMotion = e.target.checked;
        localStorage.setItem("reducedMotion", reducedMotion ? "true" : "false");
        updateMotionPreference(reducedMotion);
    });
}

// Check system preference on load
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reducedMotion = true;
    if (motionToggle) {
        motionToggle.checked = true;
    }
    updateMotionPreference(true);
}