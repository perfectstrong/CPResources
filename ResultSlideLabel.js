(function(b) {
    b.ResultSlideLabel = function(f, e) {
        b.ResultSlideLabel.baseConstructor.call(this, f);
        this.id = this.getAttribute("id");
        this.visible = this.getAttribute("visible");
        this.textAlign = this.getAttribute("ta");
        this.bold = this.getAttribute("B");
        this.color = this.getAttribute("c");
        this.font = this.getAttribute("f");
        this.italic = this.getAttribute("i");
        this.size = this.getAttribute("sz");
        this.underline = this.getAttribute("u");
        this.parentDivName = this.getAttribute("dn");
        this.quizParam = this.getAttribute("qp");
        var a =
            "";
        if (b.movie.playbackController) {
            var c = b.movie.playbackController.GetQuizController();
            if (c && (null != this.quizParam ? a = c.GetParameterValueByName(this.quizParam) : b.movie.playbackController.HasQuiz() && (this.textAlign = "left", a = c.GetIsPassed() ? c.GetPassedScoreFeedback() : c.GetFailedScoreFeedback()), this.text = a, a = this.getAttribute("b"), this.bounds = {
                        minX: a[0],
                        minY: a[1],
                        maxX: a[2],
                        maxY: a[3]
                    }, this.tr = this.getAttribute("tr"), this.re = this.getAttribute("re"), this.sh = this.getAttribute("sh"), a = this.getAttribute("vb"),
                    this.vbounds = {
                        minX: a[0],
                        minY: a[1],
                        maxX: a[2],
                        maxY: a[3]
                    }, this.element && (this.element.parentElement.drawingBoard = this.element.parentElement, this.element.parentElement.bounds = this.bounds), this.args = e, this.isDrawn = !1, b.responsive)) this.responsiveCSS = this.getAttribute("css")
        }
    };
    b.inherits(b.ResultSlideLabel, b.DisplayObject);
    b.ResultSlideLabel.prototype.start = function(b, e) {
        this.addIfNeeded(b, e);
        if (!this.effectIsStarted || b) this.updateEffects(this.hasEffect), this.effectIsStarted = !0
    };
    b.ResultSlideLabel.prototype.reset =
        function() {
            delete b.ropMap[this.element.id];
            this.isDrawn = !1;
            this.element.width = "0";
            this.element.height = "0";
            this.element.style.width = "0px";
            this.element.style.height = "0px";
            this.element.left = "0";
            this.element.top = "0";
            this.element.style.left = "0px";
            this.element.style.top = "0px"
        };
    b.ResultSlideLabel.prototype.drawForResponsive = function(f, e) {
        if (!this.responsiveCSS) return !1;
        if (this.isDrawn && !f) return !0;
        var a = b.getResponsiveCSS(this.responsiveCSS);
        b.getCSSFromLayouter(a, this);
        var c = !1,
            c = this.sh && !this.sh.i ||
            this.fillOuterArea,
            d = void 0 != this.tr;
        if (this.isDrawn && this.currentCSS == a && !c && !d && (!f || e == b.ReasonForDrawing.kMoviePaused)) return !0;
        this.currentCSS = a;
        c = this.getAttribute("dn");
        this.parentDivName || (this.parentDivName = c);
        this.actualParent = b(this.parentDivName);
        c = b.D[this.parentDivName];
        d = b("re-" + this.element.id);
        d || (b.applyResponsiveStyles(this.element.parentElement, a, !0), this.element.parentNode.removeChild(this.element), d = b.newElem("div"), d.id = "re-" + this.element.id, b.fixWebkitScaling(d), b.movie.stage.getSlideDiv(),
            b.addRewrapObjectAsPerRestOfProjectItem(d), d.setAttribute("class", "cp-rewrap"), d.appendChild(this.element), d.setAttribute("tabIndex", -1), this.zIndex = c.zIndex, d.style.zIndex = this.zIndex);
        b.applyResponsiveStyles(d, a, !0);
        this.isDrawn || (this.element.style.left = "0px", this.element.style.top = "0px", this.element.style.width = "100%", this.element.style.position = "absolute", this.sh && (this.element.style.textShadow = this.sh.d * Math.cos(Math.PI * this.sh.a / 180) + "px " + this.sh.d * Math.sin(Math.PI * this.sh.a / 180) + "px " + this.sh.b +
            "px " + b.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" : "")), this.re && (d.style.webkitBoxReflect = "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))"), this.actualParentElem = b(this.parentDivName), this.actualParentElem.setAttribute("tabIndex", -1), b.createAlternativeAccessibleText(this.actualParentElem, this.text), b.removeAccessibilityOutline(this.actualParentElem));
        b.applyResponsiveStyles(this.actualParentElem, a, !0);
        a = this.getAttribute("rpfont")[b.ResponsiveProjWidth].font;
        this.element.style.fontWeight = a.B ? "bold" : "normal";
        this.element.style.fontStyle = a.i ? "italic" : "normal";
        this.element.style.textDecoration = a.u ? "underline" : "none";
        this.element.style.color = a.c;
        this.element.style.fontFamily = a.n;
        this.element.style.fontSize = a.s + "px";
        this.element.style.textAlign = this.textAlign;
        this.element.style.verticalAlign = "middle";
        "" == this.element.innerHTML && (this.element.innerHTML +=
            this.text);
        this.isDrawn = !0;
        this.drawComplete(e);
        this.visible || b.hide(this.parentDivName);
        a = this.actualParentElem.clientHeight;
        0 < a && this.element.clientHeight <= a && (this.element.style.top = (a - this.element.clientHeight) / 2 + "px");
        return !0
    };
    b.ResultSlideLabel.prototype.addIfNeeded = function(f, e) {
        if ((!b.responsive || !this.drawForResponsive(f, e)) && !this.isDrawn) {
            var a = b.newElem("div");
            a.id = "re-" + this.element.id;
            b.fixWebkitScaling(a);
            this.element.parentElement.style.position = "absolute";
            this.element.parentElement.style.left =
                this.vbounds.minX + "px";
            this.element.parentElement.style.top = this.vbounds.minY + "px";
            this.element.parentElement.style.width = this.vbounds.maxX - this.vbounds.minX + "px";
            this.element.parentElement.style.height = this.vbounds.maxY - this.vbounds.minY + "px";
            a.style.position = "absolute";
            a.style.left = this.vbounds.minX + "px";
            a.style.top = this.vbounds.minY + "px";
            a.style.width = this.vbounds.maxX - this.vbounds.minX + "px";
            a.style.height = this.vbounds.maxY - this.vbounds.minY + "px";
            this.element.style.left = "0px";
            this.element.style.top =
                "0px";
            this.element.style.width = "100%";
            this.sh && (this.element.style.textShadow = this.sh.d * Math.cos(Math.PI * this.sh.a / 180) + "px " + this.sh.d * Math.sin(Math.PI * this.sh.a / 180) + "px " + this.sh.b + "px " + b.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" : ""));
            this.re && (a.style.webkitBoxReflect = "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))");
            this.element.style.position =
                "absolute";
            this.element.style.textAlign = this.textAlign;
            this.element.style.verticalAlign = "middle";
            this.element.style.color = this.color;
            this.element.style.fontFamily = this.font;
            this.element.style.fontSize = this.size + "px";
            this.element.style.fontWeight = this.bold ? "bold" : "normal";
            this.element.style.fontStyle = this.italic ? "italic" : "normal";
            this.element.style.textDecoration = this.underline ? "underline" : "none";
            "" == this.element.innerHTML && (this.element.innerHTML += this.text);
            this.element.parentNode.removeChild(this.element);
            b.movie.stage.getSlideDiv();
            b.addRewrapObjectAsPerRestOfProjectItem(a);
            a.setAttribute("class", "cp-rewrap");
            a.appendChild(this.element);
            a.setAttribute("tabIndex", -1);
            this.zIndex = b.D[this.parentDivName].zIndex;
            a.style.zIndex = this.zIndex;
            this.actualParentElem = b(this.parentDivName);
            this.actualParentElem.setAttribute("tabIndex", -1);
            b.createAlternativeAccessibleText(this.actualParentElem, this.text);
            b.removeAccessibilityOutline(this.actualParentElem);
            this.isDrawn = !0;
            this.visible || b.hide(this.parentDivName);
            var c = b.newElem("div");
            c.style.color = this.element.style.color;
            c.style.fontFamily = this.element.style.fontFamily;
            c.style.fontSize = this.element.style.fontSize;
            c.style.fontWeight = this.element.style.fontWeight;
            c.style.fontStyle = this.element.style.fontStyle;
            c.style.textDecoration = this.element.style.textDecoration;
            this.sh && (c.style.textShadow = this.element.style.textShadow);
            c.style.visibility = "hidden";
            c.innerHTML = this.element.innerHTML;
            document.body.appendChild(c);
            a = c.clientHeight;
            document.body.removeChild(c);
            c = this.vbounds.maxY - this.vbounds.minY;
            0 < a && (0 < c && a <= c) && (this.element.style.top = (c - a) / 2 + "px")
        }
    }
})(window.cp);