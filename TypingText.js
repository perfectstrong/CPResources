(function(a) {
    a.TypingText = function(g, f) {
        a.TypingText.baseConstructor.call(this, g, f);
        this.id = this.getAttribute("id");
        this.positions = this.getAttribute("b");
        this.left = this.getAttribute("l");
        this.top = this.getAttribute("t");
        this.srcimage = this.getAttribute("ip");
        if (!a.responsive) {
            var e = this;
            a.movie.im.getImageDataURI(e.srcimage, function(a) {
                e.srcimageDataURI = a
            })
        }
        this.playKeyTap = this.getAttribute("pkt");
        this.isDrawn = !1;
        a.responsive && (this.responsiveCSS = this.getAttribute("css"))
    };
    a.inherits(a.TypingText, a.DisplayObject);
    a.TypingText.prototype.start = function(a, f) {
        this.addIfNeeded(a, f);
        if (!this.effectIsStarted || a) this.updateEffects(this.hasEffect), this.effectIsStarted = !0
    };
    a.TypingText.prototype.reset = function() {
        delete a.ropMap[this.element.id];
        this.top = this.left = this.srcimage = this.positions = this.id = "";
        this.effectIsStarted = this.isDrawn = !1
    };
    a.TypingText.prototype.drawForResponsive = function(g) {
        if (this.isDrawn && !g) return !0;
        for (var f = 0; 1 > f; ++f) {
            var e = this.positions,
                h = e[2],
                j = e[3],
                c = e[0],
                e = e[1],
                i = a.movie.im.images[this.srcimage];
            if (i && i.nativeImage.complete) {
                var d = a.movie.stage.currentSlide;
                if (d) {
                    var b = a.D["Slide" + d.id + "c"];
                    if (!(b.aip ? b.aip : b.ip)) break
                }
                b = a("Slide" + d.id + "sf_c");
                if (!b) {
                    this.canvas = a.createCanvas(0, 0, a.D.project.w, a.D.project.h, b);
                    b = this.canvas.element;
                    b.id = "Slide" + d.id + "sf_c";
                    b.style.display = "block";
                    b.style.position = "absolute";
                    b.style.left = "0px";
                    b.style.top = "0px";
                    var k = document.getElementById("Slide" + d.id + "c");
                    k.parentElement.insertBefore(b, k.nextSibling)
                }
                a.movie.stage.isSlideBGCropped() ? (d = a.D[d.mdi].css[a.ResponsiveProjWidth],
                    b.style.left = -d.crop.x + "px", b.style.top = -d.crop.y + "px", b.style.width = a.D.project.w + "px", b.style.height = a.D.project.h + "px") : (b.style.left = "0px", b.style.top = "0px", b.style.width = "100%", b.style.height = "100%");
                g || (d = b.getContext("2d"), d.setTransform(1, 0, 0, 1, 0 > this.left ? -this.left : 0, 0 > this.top ? -this.top : 0), d.translate(0, 0), d.drawImage(i.nativeImage, c, e, h, j, Math.floor(this.left), Math.floor(this.top), Math.floor(h), Math.floor(j)));
                this.playKeyTap && (a.movie.playKeyTap && !g) && a.movie.am.playKeyTap();
                this.isDrawn = !0
            }
        }
        return !0
    };
    a.TypingText.prototype.addIfNeeded = function(g, f) {
        if ((!a.responsive || !this.drawForResponsive(g, f)) && !this.isDrawn) {
            for (var e = this.id, h = 0, j = 0; 1 > j; ++j) {
                var c = this.positions,
                    h = h + 1,
                    c = "#" + e + h + "{position: absolute; width:" + (c[2] + "px") + "; height:" + (c[3] + "px") + "; display:block; background:url(" + this.srcimageDataURI + ") " + (-c[0] + "px") + " " + (-c[1] + "px") + "; }",
                    i = document.getElementsByTagName("style")[0];
                !1 == (-1 != i.innerHTML.indexOf(c)) && i.appendChild(document.createTextNode(c));
                c = a.newElem("img");
                c.id = e + h;
                c.src = "assets/htmlimages/img_trans.gif";
                c.style.left = this.left + "px";
                c.style.top = this.top + "px";
                c.width = 1;
                c.height = 1;
                this.element.appendChild(c)
            }
            this.isDrawn = !0;
            this.playKeyTap && a.movie.playKeyTap && a.movie.am.playKeyTap()
        }
    }
})(window.cp);