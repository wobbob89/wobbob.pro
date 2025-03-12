document.addEventListener("DOMContentLoaded", function () {
    console.log("Music Player System Loaded 🎶");

    const spotifyPlayer = document.querySelector("iframe[src*='spotify']");
    const soundCloudPlayer = document.querySelector("iframe[src*='soundcloud']");

    if (spotifyPlayer) {
        console.log("✅ Spotify Player is active");
    } else {
        console.warn("⚠️ Spotify Player not found");
    }

    if (soundCloudPlayer) {
        console.log("✅ SoundCloud Player is active");
    } else {
        console.warn("⚠️ SoundCloud Player not found");
    }
});
