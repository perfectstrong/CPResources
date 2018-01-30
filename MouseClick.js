(function(b) {
    b.MouseClick = function(a, c) {
        b.MouseClick.baseConstructor.call(this, a, c);
        this.data = this.getAttribute("data")
    };
    b.inherits(b.MouseClick, b.Shape);
    b.MouseClick.prototype.drawForResponsive = b.MouseClick.prototype.drawIfNeeded = function(a) {
        if (!this.isDrawn || a) {
            a = this.bounds;
            b.responsive && (a = this.getAttribute("b"), a = a[b.ResponsiveProjWidth], a = {
                minX: a[0],
                minY: a[1],
                maxX: a[2],
                maxY: a[3]
            });
            var c = -a.minY + a.maxY,
                c = (this.canvas = b.createCanvas(a.minX, a.minY, Math.ceil(-a.minX + a.maxX), Math.ceil(c), this.element)).gc;
            c.save();
            var e = b.movie.stage.isSlideBGCropped(),
                d = 0,
                d = b.responsive ? e ? a.minX : b.project.clientWidth * a.minX / b.ResponsiveProjWidth : a.minX;
            this.element.style.left = d + "px";
            this.element.style.top = a.minY + "px";
            this.element.style.width = a.maxX - a.minX + "px";
            this.element.style.height = a.maxY - a.minY + "px";
            if (this.shape) try {
                var f = this.getAttribute("objectToBeHidden");
                this.shape(c, this.data, f, this.visible, this.divName) && (this.isDrawn = !0)
            } catch (g) {}
            c.restore()
        }
    }
})(window.cp);