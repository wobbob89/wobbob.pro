// Cufon Font Rendering Engine
// Ensures text replacement using Cufon font rendering

(function() {
    var script = document.createElement('script');
    script.src = "js/ITC_Busorama_500.font.js";
    script.type = "text/javascript";
    script.onload = function() {
        Cufon.now();
    };
    document.head.appendChild(script);
})();
