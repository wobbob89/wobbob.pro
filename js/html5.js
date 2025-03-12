// Create new HTML5 elements for older browsers ================================
// -----------------------------------------------------------------------------
// Ensures all new HTML5 elements are recognized and styled properly
// This script should load before any others.
// -----------------------------------------------------------------------------

(function() {
    var elements = [
        "article", "aside", "audio", "canvas", "command", "datalist", "details", "embed",
        "figcaption", "figure", "footer", "header", "hgroup", "keygen", "mark", "meter", "nav", 
        "output", "progress", "rp", "rt", "ruby", "section", "source", "summary", "time", "video"
    ];
    for (var i = 0; i < elements.length; i++) {
        document.createElement(elements[i]);
    }

    // Ensure older browsers recognize and style these elements correctly
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = elements.join(", ") + " { display: block; }";
    document.head.appendChild(style);
})();
