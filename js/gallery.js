document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-grid img");

    galleryItems.forEach(img => {
        img.addEventListener("click", function () {
            const modal = document.createElement("div");
            modal.classList.add("gallery-modal");
            modal.innerHTML = `
                <div class="modal-overlay"></div>
                <img src="${img.src}" alt="Gallery Image">
                <button class="close-modal">✖</button>
            `;
            document.body.appendChild(modal);

            document.querySelector(".close-modal").addEventListener("click", function () {
                modal.remove();
            });

            document.querySelector(".modal-overlay").addEventListener("click", function () {
                modal.remove();
            });
        });
    });

    console.log("Gallery Image Viewer Initialized 📸");
});
