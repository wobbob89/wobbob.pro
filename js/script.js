document.addEventListener("DOMContentLoaded", function () {
    console.log("WoBBoB Website Loaded 🚀");

    // Load analytics tracking
    const analyticsScript = document.createElement('script');
    analyticsScript.src = './js/analytics.js';
    analyticsScript.async = true;
    document.head.appendChild(analyticsScript);

    // Navigation Active State
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentLocation) {
            link.classList.add("active");
        }
    });

    // 🎵 Music Player Fix (Ensures Embedded Players Work)
    const spotifyPlayer = document.querySelector("iframe[src*='spotify']");
    if (spotifyPlayer) {
        console.log("Spotify Player Loaded 🎶");
    }

    const soundCloudPlayer = document.querySelector("iframe[src*='soundcloud']");
    if (soundCloudPlayer) {
        console.log("SoundCloud Player Loaded 🔊");
    }

    // 🖼️ Gallery Image Click for Full View
    const galleryImages = document.querySelectorAll(".gallery-grid img");
    galleryImages.forEach(img => {
        img.addEventListener("click", function () {
            const fullImage = document.createElement("div");
            fullImage.classList.add("full-image-view");
            fullImage.innerHTML = `
                <div class="overlay"></div>
                <img src="${img.src}" alt="Gallery Image">
                <button class="close-btn">✖</button>
            `;
            document.body.appendChild(fullImage);

            document.querySelector(".close-btn").addEventListener("click", function () {
                fullImage.remove();
            });
        });
    });

    // 🔞 Age Verification for Adult Content
    if (document.getElementById("age-verification")) {
        const agePopup = document.getElementById("age-verification");
        const enterBtn = document.getElementById("enter-site");
        const leaveBtn = document.getElementById("leave-site");

        enterBtn.addEventListener("click", function () {
            agePopup.style.display = "none";
            localStorage.setItem("ageVerified", "true");
        });

        leaveBtn.addEventListener("click", function () {
            window.location.href = "https://www.google.com";
        });

        if (localStorage.getItem("ageVerified") === "true") {
            agePopup.style.display = "none";
        } else {
            agePopup.style.display = "flex";
        }
    }

    // 📱 Open Social Media Links in New Tab
    const socialLinks = document.querySelectorAll(".social-icons a");
    socialLinks.forEach(link => {
        link.setAttribute("target", "_blank");
    });

    console.log("All JavaScript Functions Loaded ✅");
});
