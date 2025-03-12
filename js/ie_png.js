var ie_png = {

    ns: 'ie_png',
    
    createVmlNameSpace: function() {
        if (document.namespaces && !document.namespaces[this.ns]) {
            document.namespaces.add(this.ns, 'urn:schemas-microsoft-com:vml');
        }
        if (window.attachEvent) {
            window.attachEvent('onbeforeunload', function() {
                ie_png = null;
            });
        }
    },
    
    createVmlStyleSheet: function() {
        var style = document.createElement('style');
        document.documentElement.firstChild.insertBefore(style, document.documentElement.firstChild.firstChild);
        var styleSheet = style.styleSheet;
        styleSheet.addRule(this.ns + '\\:*', '{behavior:url(#default#VML)}');
        styleSheet.addRule(this.ns + '\\:rect', 'position:absolute;');
        styleSheet.addRule('img.' + this.ns + '_sizeFinder', 'position:absolute; z-index:-1; top:-10000px; visibility:hidden;');
        this.styleSheet = styleSheet;
    },
    
    applyFix: function(selector) {
        var selectors = selector.split(',');
        for (var i = 0; i < selectors.length; i++) {
            this.styleSheet.addRule(selectors[i], 'behavior:expression(ie_png.fixPng.call(this))');
        }
    },
    
    fixPng: function() {
        if (this.nodeName !== 'IMG') return;
        this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.src + "', sizingMethod='scale')";
        this.src = "transparent.gif";
    }
};

if (navigator.userAgent.indexOf("MSIE 6") !== -1) {
    ie_png.createVmlNameSpace();
    ie_png.createVmlStyleSheet();
    ie_png.applyFix("img");
}
