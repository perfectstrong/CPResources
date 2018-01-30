(function(a) {
    a.HighlightBox = function(q, j) {
        a.HighlightBox.baseConstructor.call(this, q);
        this.baseItemBoundingRect = null;
        this.visible = this.getAttribute("visible");
        this.parentDivName = this.getAttribute("dn");
        this._parentObj = a.D[this.parentDivName];
        var c = void 0 !== this.currentState ? this.currentState : this._parentObj.stis;
        if (void 0 != this._parentObj) {
            this._canvasObj = a.D[this._parentObj.mdi];
            if (this._parentObj.hasOwnProperty("stc") && c < this._parentObj.stc.length && 0 <= c) {
                var e = a.D[this._parentObj.stc[c]];
                e && (this._canvasObj =
                    a.D[e.mdi])
            }
            this.prevCanvasObj = this._canvasObj
        }
        this._parentObj && (this._transIn = this._parentObj.trin);
        var f = this._canvasObj.b;
        this.actualParent = e = document.getElementById(this.parentDivName);
        this._bounds = {
            minX: f[0],
            minY: f[1],
            maxX: f[2],
            maxY: f[3]
        };
        f = this._canvasObj.vb;
        this._vbounds = {
            minX: f[0],
            minY: f[1],
            maxX: f[2],
            maxY: f[3],
            width: f[2] - f[0],
            height: f[3] - f[1]
        };
        e && (e.drawingBoard = this.element.parentElement, e.bounds = this._bounds, e.drawingBoard.bounds = this._vbounds);
        this.args = j;
        this.isDrawn = !1;
        this._tr = this._canvasObj.tr;
        this._sh = this._canvasObj.sh;
        this._re = this._canvasObj.re;
        this._fillColor = this._canvasObj.fc;
        this._strokeColor = this._canvasObj.sc;
        this._strokeWidth = this._canvasObj.sw;
        this._fillOpacity = this._canvasObj.fo / 100;
        this.fillOuterArea = this._canvasObj.foa;
        a.responsive && (this._responsiveCSS = this._canvasObj.css);
        !1 == this.cloneOfBaseStateItem && -1 != this.baseStateItemID && (this.playEffectsOnStart = !0);
        a.setInitialVisibility(this);
        if (this._parentObj.hasOwnProperty("stc")) {
            e = a.D[this.actualParent.id].stc;
            for (f = 0; f < e.length; ++f) f !=
                c && a._hideData(e[f])
        }
    };
    a.inherits(a.HighlightBox, a.DisplayObject);
    Object.defineProperties(a.HighlightBox.prototype, {
        parentObj: {
            get: function() {
                this._parentObj || (this._parentObj = a.D[this.canvasObj.dn]);
                return this._parentObj
            },
            set: function(a) {
                this._parentObj = a
            }
        },
        responsiveCSS: {
            get: function() {
                this._responsiveCSS || (this._responsiveCSS = this.canvasObj.css);
                return this._responsiveCSS
            },
            set: function(a) {
                this._responsiveCSS = a
            }
        },
        canvasObj: {
            get: function() {
                return this._canvasObj
            },
            set: function(q) {
                this.prevCanvasObj =
                    this._canvasObj;
                this._canvasObj = q;
                this.prevCanvasObj.dn !== this._canvasObj.dn && (this._fillOpacity = this._strokeWidth = this._strokeColor = this._fillColor = this._transIn = this._parentObj = this._tr = this._re = this._sh = this._wrvBounds = this._vbounds = this._bounds = this._responsiveCSS = null, this.isDrawn = !1, q = this.canvasSwitchReason, this.drawIfNeeded(!0, q ? q : a.ReasonForDrawing.kItemStateChanged))
            }
        },
        bounds: {
            get: function() {
                if (!this._bounds) {
                    var a = this.canvasObj.b;
                    this._bounds = {
                        minX: a[0],
                        minY: a[1],
                        maxX: a[2],
                        maxY: a[3],
                        width: a[2] -
                            a[0],
                        height: a[3] - a[1]
                    }
                }
                return this._bounds
            },
            set: function(a) {
                this._bounds = a
            }
        },
        vbounds: {
            get: function() {
                if (!this._vbounds) {
                    var a = this.canvasObj.vb;
                    this._vbounds = {
                        minX: a[0],
                        minY: a[1],
                        maxX: a[2],
                        maxY: a[3],
                        width: a[2] - a[0],
                        height: a[3] - a[1]
                    }
                }
                return this._vbounds
            },
            set: function(a) {
                this._vbounds = a
            }
        },
        sh: {
            get: function() {
                this._sh || (this._sh = this.canvasObj.sh);
                return this._sh
            },
            set: function(a) {
                this._sh = a
            }
        },
        re: {
            get: function() {
                this._re || (this._re = this.canvasObj.re);
                return this._re
            },
            set: function(a) {
                this._re = a
            }
        },
        tr: {
            get: function() {
                this._tr ||
                    (this._tr = this.canvasObj.tr);
                return this._tr
            },
            set: function(a) {
                this._tr = a
            }
        },
        transIn: {
            get: function() {
                this._transIn || (this._transIn = this.parentObj.trin);
                return this._transIn
            },
            set: function(a) {
                this._transIn = a
            }
        },
        fillColor: {
            get: function() {
                this._fillColor || (this._fillColor = this.canvasObj.fc);
                return this._fillColor
            },
            set: function(a) {
                this._fillColor = a
            }
        },
        strokeColor: {
            get: function() {
                this._strokeColor || (this._strokeColor = this.canvasObj.sc);
                return this._strokeColor
            },
            set: function(a) {
                this._strokeColor = a
            }
        },
        strokeWidth: {
            get: function() {
                this._strokeWidth ||
                    (this._strokeWidth = this.canvasObj.sw);
                return this._strokeWidth
            },
            set: function(a) {
                this._strokeWidth = a
            }
        },
        fillOpacity: {
            get: function() {
                this._fillOpacity || (this._fillOpacity = this.canvasObj.fo / 100);
                return this._fillOpacity
            },
            set: function(a) {
                this._fillOpacity = a
            }
        }
    });
    a.HighlightBox.prototype.start = function(a, j) {
        this.drawIfNeeded(a, j);
        if (!this.effectIsStarted || a) this.areDimensionsCalculated = !1, this.updateEffects(this.hasEffect), this.effectIsStarted = !0
    };
    a.HighlightBox.prototype.reset = function() {
        delete a.ropMap[this.element.id];
        this.isDrawn = !1;
        this.element.width = "0";
        this.element.height = "0";
        this.element.style.width = "0px";
        this.element.style.height = "0px";
        this.element.left = "0";
        this.element.top = "0";
        this.element.style.left = "0px";
        this.element.style.top = "0px";
        this.effectIsStarted = !1
    };
    a.HighlightBox.prototype.drawForResponsive = function(q, j) {
        if (!this.responsiveCSS) return !1;
        if (this.isDrawn && !q) return a.initializeVisibilityForGroupedItem(this), !0;
        var c = a.getResponsiveCSS(this.responsiveCSS);
        a.getCSSFromLayouter(c, this);
        var e = !1,
            e = this.sh &&
            !this.sh.i || this.fillOuterArea,
            f = void 0 != this.tr;
        if (this.isDrawn && this.currentCSS == c && !e && !f && (!q || j == a.ReasonForDrawing.kMoviePaused)) return !0;
        this.currentCSS = c;
        var l = this.getAttribute("dn");
        this.parentDivName || (this.parentDivName = l);
        var i = c,
            l = this.actualParent,
            k = j === a.ReasonForDrawing.kItemStateChanged || j === a.ReasonForDrawing.kGettingBoundingRectInBaseState || j === a.ReasonForDrawing.kLinkedToItemAppeared,
            h = !0;
        a.applyResponsiveStyles(this.actualParent, c, h, k, void 0, j);
        this.actualParent.offsetHeight =
            this.actualParent.offsetHeight;
        this.actualParentClientBoundingRect = a.GetBoundingClientRectForElem(this.actualParent, k);
        var g = 0;
        if (this.tr) {
            var g = a.getAngleFromRotateStr(this.tr),
                h = a.getCenterForRotation(this.actualParent),
                h = a.getBoundsForRotatedItem(this.actualParent.clientWidth, this.actualParent.clientHeight, h, g, this.strokeWidth),
                o = t = r = b = void 0;
            "auto" != c.l && (o = h.l);
            "auto" != c.t && (t = h.t);
            "auto" != c.r && (r = h.r);
            "auto" != c.b && (b = h.b);
            i = a.createResponsiveStyleObj(c, c.p, o, t, r, b, h.w, h.h, c.crop);
            h = !1
        }
        a.applyResponsiveStyles(this.element.parentElement,
            i, h, k, void 0, j);
        h = a.GetBoundingClientRectForElem(a.movie.stage.mainSlideDiv, k);
        this.parentElementClientBoundingRect = a.GetBoundingClientRectForElem(this.element.parentElement, k);
        var k = this.parentElementClientBoundingRect.left - h.left,
            g = this.parentElementClientBoundingRect.top - h.top,
            m = i = 0,
            h = l.clientWidth - this.strokeWidth,
            o = l.clientHeight - this.strokeWidth,
            p = m = 0;
        e ? (m = a("div_Slide").clientWidth, p = a("div_Slide").clientHeight, i = a.createResponsiveStyleObj(c, void 0, "0px", "0px", "0px", "0px", m + "px", p + "px", void 0)) :
            (m = this.element.parentElement.clientWidth, p = this.element.parentElement.clientHeight, i = a.createResponsiveStyleObj(c, void 0, "0px", "0px", "0px", "0px", "100%", "100%", void 0));
        c = (this.canvas = a.createResponsiveCanvas(i, m, p, this.element)).gc;
        c.clearRect(0, 0, this.element.getBoundingClientRect().width, this.element.getBoundingClientRect().height);
        a.DESKTOP == a.device && (a.MSIE == a.browser || a.FIREFOX == a.browser || a.MSEDGE == a.browser) && c.beginPath();
        !this.isParentOfTypeSlide && e && (this.element.style.marginLeft = (0 > k ?
            1 : -1) * k + "px", this.element.style.marginTop = (0 > g ? 1 : -1) * g + "px");
        this.tr && (a.applyTransform(l, this.tr), l.tr = this.tr);
        this.re && (this.element.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))");
        a.movie.stage.addToParentChildMap(l.id, this.element.id);
        this.element.originalParent = l;
        c.save();
        e ? (c.setTransform(1, 0, 0, 1, 0 > k ? -k : 0, 0 > g ? -g : 0),
            c.translate(k, g)) : f && (c.translate(this.element.parentElement.clientWidth / 2, this.element.parentElement.clientHeight / 2), c.translate(this.strokeWidth / 2, this.strokeWidth / 2));
        c.fillStyle = a.ConvertColorToRGBA(this.fillColor, this.fillOpacity);
        c.lineWidth = 0;
        this.fillOuterArea && (c.translate(-k, -g), c.fillRect(0, 0, this.element.getBoundingClientRect().width, this.element.getBoundingClientRect().height), c.fillStyle = "rgba(0,0,0,0)", c.translate(k, g));
        this.sh && !this.sh.i && (c.shadowOffsetX = this.sh.d * Math.cos(Math.PI *
            this.sh.a / 180), c.shadowOffsetY = this.sh.d * Math.sin(Math.PI * this.sh.a / 180), c.shadowBlur = this.sh.b, c.shadowColor = a.ConvertRGBToRGBA(this.sh.c, this.sh.o));
        g = 0;
        this.tr && (g = a.getAngleFromRotateStr(this.tr));
        e && c.translate(this.element.parentElement.clientWidth / 2, this.element.parentElement.clientHeight / 2);
        g ? c.rotate(Math.PI * g / 180) : this.sh && c.rotate(0.02 * Math.PI / 180);
        i = !e && !f ? 0 + this.strokeWidth / 2 : -l.clientWidth / 2;
        m = !e && !f ? 0 + this.strokeWidth / 2 : -l.clientHeight / 2;
        c.lineWidth = this.strokeWidth;
        c.lineJoin = "miter";
        c.lineCap = "square";
        c.strokeStyle = this.strokeColor;
        c.rect(i, m, h, o);
        0 != this.strokeWidth && c.stroke();
        c.fill();
        0 != this.strokeWidth && (c.shadowOffsetX = 0, c.shadowOffsetY = 0, c.shadowBlur = 0, c.shadowColor = "rgba(0,0,0,0)", c.stroke());
        this.fillOuterArea && c.clearRect(i + this.strokeWidth / 2, m + this.strokeWidth / 2, h - this.strokeWidth, o - this.strokeWidth);
        c.restore();
        this.isDrawn = !0;
        this.drawComplete(j);
        this.transIn && j == a.ReasonForDrawing.kRegularDraw && (this.element.parentElement.style.opacity = 0);
        a.isVisible(this) || a._hide(this.parentDivName);
        a.isVisible(this) && this.playEffectsOnStart && (l = this.parentDivName, (e = a.D[l].selfAnimationScript) && eval(e), this.playEffectsOnStart = !1);
        return !0
    };
    a.HighlightBox.prototype.drawIfNeeded = function(q, j) {
        if ((!a.responsive || !this.drawForResponsive(q, j)) && !this.isDrawn) {
            var c = this.bounds,
                e = this.vbounds,
                f = this.fillColor,
                l = this.strokeColor,
                i = this.strokeWidth,
                k = this.fillOpacity,
                h = this.fillOuterArea,
                g = c.minX,
                o = c.minY,
                m = c.maxX - c.minX,
                p = c.maxY - c.minY,
                d = this.actualParent;
            d.style.left = g + "px";
            d.style.top = o + "px";
            d.style.width =
                m + "px";
            d.style.height = p + "px";
            var n = g = 0,
                v = c.maxX - c.minX,
                w = c.maxY - c.minY,
                n = !1,
                n = this.re || this.sh && !this.sh.i || this.fillOuterArea,
                s = void 0 != this.tr,
                g = 0 < e.minX && n ? 0 : e.minX,
                o = 0 < e.minY && n ? 0 : e.minY,
                p = n && a.D.project.h > e.maxY ? a.D.project.h : e.maxY,
                m = (n && a.D.project.w > e.maxX ? a.D.project.w : e.maxX) - g,
                p = p - o,
                e = this.canvas = a.createCanvas(0, 0, m, p, this.element);
            this.tr && (a.applyTransform(d, this.tr), d.tr = this.tr);
            this.element.style.display = "block";
            this.element.style.position = "absolute";
            this.element.parentElement.style.left =
                this.vbounds.minX + "px";
            this.element.parentElement.style.top = this.vbounds.minY + "px";
            this.element.parentElement.style.width = this.vbounds.maxX - this.vbounds.minX + "px";
            this.element.parentElement.style.height = this.vbounds.maxY - this.vbounds.minY + "px";
            this.element.style.marginLeft = g - this.vbounds.minX + "px";
            this.element.style.marginTop = o - this.vbounds.minY + "px";
            this.re && (this.element.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" +
                (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))");
            a.movie.stage.addToParentChildMap(d.id, this.element.id);
            this.element.originalParent = d;
            d = e.gc;
            d.clearRect(0, 0, this.element.getBoundingClientRect().width, this.element.getBoundingClientRect().height);
            a.DESKTOP == a.device && (a.MSIE == a.browser || a.FIREFOX == a.browser || a.MSEDGE == a.browser) && d.beginPath();
            d.save();
            var u = e = 0;
            n ? (e = 0 > g ? -g : 0, u = 0 > o ? -o : 0, d.translate(e, u), d.setTransform(1, 0, 0, 1, e, u)) : s && d.translate(m / 2, p / 2);
            d.fillStyle =
                a.ConvertColorToRGBA(f, k);
            d.lineWidth = 0;
            h && (d.fillRect(0, 0, m, p), d.fillStyle = "rgba(0,0,0,0)");
            this.sh && !this.sh.i && (d.shadowOffsetX = this.sh.d * Math.cos(Math.PI * this.sh.a / 180), d.shadowOffsetY = this.sh.d * Math.sin(Math.PI * this.sh.a / 180), d.shadowBlur = this.sh.b, d.shadowColor = a.ConvertRGBToRGBA(this.sh.c, this.sh.o));
            f = 0;
            this.tr && (f = a.getAngleFromRotateStr(this.tr));
            n && d.translate((c.minX + c.maxX) / 2, (c.minY + c.maxY) / 2);
            f ? d.rotate(Math.PI * f / 180) : this.sh && d.rotate(0.02 * Math.PI / 180);
            g = !n && !s ? 0 + i / 2 : (c.minX - c.maxX) /
                2;
            n = !n && !s ? 0 + i / 2 : (c.minY - c.maxY) / 2;
            d.lineWidth = i;
            d.lineJoin = "miter";
            d.lineCap = "square";
            d.strokeStyle = l;
            d.rect(g, n, v, w);
            0 != i && d.stroke();
            d.fill();
            0 != i && (d.shadowOffsetX = 0, d.shadowOffsetY = 0, d.shadowBlur = 0, d.shadowColor = "rgba(0,0,0,0)", d.stroke());
            h && d.clearRect(g + i / 2, n + i / 2, v - i, w - i);
            d.restore();
            this.isDrawn = !0;
            this.drawComplete();
            this.transIn && j !== a.ReasonForDrawing.kItemStateChanged && (this.element.parentElement.style.opacity = 0);
            a.isVisible(this) || a._hide(this.parentDivName);
            a.isVisible(this) && this.playEffectsOnStart &&
                ((c = a.D[this.parentDivName].selfAnimationScript) && eval(c), this.playEffectsOnStart = !1)
        }
    }
})(window.cp);