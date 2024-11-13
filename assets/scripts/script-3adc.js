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
const toggleAdButton = document.getElementById("toggle-ad");
const closeAdButton = document.getElementById("close-ad");
const popupAdImg = document.getElementById("popup-ad-img");
const body = document.body;
const mainContent = document.getElementById("main-content");

const adImages = [
    "media/fake ads/blahajarly.webp",
    "media/fake ads/local-blahajs.webp",
    "media/fake ads/safe-vpn.webp",
    "media/fake ads/blahaj-stone-dubtoshi.webp"
];

// Check sessionStorage for the user's preference
let showPopups = sessionStorage.getItem("showPopups") !== "false";

let popupVisible = false;

function showPopupAd() {
    if (showPopups && !popupVisible) {
        const randomIndex = Math.floor(Math.random() * adImages.length);
        popupAdImg.src = adImages[randomIndex];
        popupAd.style.display = "block";
        toggleAdButton.style.visibility = "visible";

        // Mark the popup as visible
        popupVisible = true;
    }
}

function closePopupAd() {
    popupAd.style.display = "none";
    toggleAdButton.style.visibility = "hidden";

    popupVisible = false;
}

// Toggle the popup ad setting
toggleAdButton.addEventListener("click", () => {
    showPopups = !showPopups;
    sessionStorage.setItem("showPopups", showPopups ? "true" : "false");
    alert(`Joke popups are now ${showPopups ? 'enabled' : 'disabled'} until you restart your browser.`);
});

setInterval(() => {
    showPopupAd();
}, 15000);

closeAdButton.addEventListener("click", closePopupAd);