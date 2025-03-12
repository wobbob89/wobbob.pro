document.addEventListener("DOMContentLoaded", function () {
    console.log("Merch Store Functions Loaded 🛒");

    const merchItems = document.querySelectorAll(".merch-item");
    merchItems.forEach(item => {
        item.addEventListener("click", function () {
            alert(`Added ${item.dataset.name} to cart! ✅`);
        });
    });

    console.log("Merch Cart System Ready ✅");
});
