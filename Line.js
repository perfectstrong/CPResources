(function(a) {
    a.Line = function(k, o) {
        a.Line.baseConstructor.call(this, k);
        this.baseItemBoundingRect = null;
        var c = this.currentState;
        if (void 0 != this._parentObj) {
            this._canvasObj = a.D[this._parentObj.mdi];
            if (this._parentObj.hasOwnProperty("stc") && c < this._parentObj.stc.length && 0 <= c) {
                var b = a.D[this._parentObj.stc[c]];
                b && (this._canvasObj = a.D[b.mdi])
            }
            this.prevCanvasObj = this._canvasObj
        }
        this._visible = this.getAttribute("visible");
        this._data = a.D[this.element.id];
        this._parentDivName = this.getAttribute("dn");
        this.actualParent =
            b = document.getElementById(this.parentDivName);
        this.canvasID = k.id;
        this._canvasObj = a.D[this.canvasID];
        var e = this.data.b;
        this._bounds = {
            minX: e[0],
            minY: e[1],
            maxX: e[2],
            maxY: e[3]
        };
        e = this.data.vb;
        this._vbounds = {
            minX: e[0],
            minY: e[1],
            maxX: e[2],
            maxY: e[3],
            width: e[2] - e[0],
            height: e[3] - e[1]
        };
        b && (b.drawingBoard = this.element.parentElement, b.bounds = this.bounds, b.drawingBoard.bounds = this.vbounds);
        this.args = o;
        this.isDrawn = !1;
        this._sh = this.getAttribute("sh");
        this._re = this.getAttribute("re");
        a.responsive && (this._responsiveCSS =
            this.getAttribute("css"));
        !1 == this.cloneOfBaseStateItem && -1 != this.baseStateItemID && (this.playEffectsOnStart = !0);
        a.setInitialVisibility(this);
        if (this._data.hasOwnProperty("stc")) {
            b = this._data.stc;
            for (e = 0; e < b.length; ++e) e != c && a._hideData(b[e])
        }
    };
    a.inherits(a.Line, a.DisplayObject);
    Object.defineProperties(a.Line.prototype, {
        canvasObj: {
            get: function() {
                return this._canvasObj
            },
            set: function(k) {
                this.prevCanvasObj = this._canvasObj;
                this._data = this._canvasObj = k;
                this.prevCanvasObj.dn !== this._canvasObj.dn && (this._tr =
                    this._re = this._sh = this._vbounds = this._bounds = this._responsiveCSS = null, this.isDrawn = !1, k = this.canvasSwitchReason, this.drawIfNeeded(!0, k ? k : a.ReasonForDrawing.kItemStateChanged))
            }
        },
        data: {
            get: function() {
                return this._canvasObj
            },
            set: function(a) {
                this._data = a
            }
        },
        bounds: {
            get: function() {
                if (this._vbounds) {
                    var a = this.canvasObj.b;
                    this._vbounds = {
                        minX: a[0],
                        minY: a[1],
                        maxX: a[2],
                        maxY: a[3]
                    }
                }
                return this._vbounds
            },
            set: function(a) {
                this._bounds = a
            }
        },
        vbounds: {
            get: function() {
                if (!this._vbounds) {
                    var a = this.canvasObj.vb;
                    a && (this._vbounds = {
                        minX: a[0],
                        minY: a[1],
                        maxX: a[2],
                        maxY: a[3]
                    })
                }
                return this._vbounds
            },
            set: function(a) {
                this._vbounds = a
            }
        },
        tr: {
            get: function() {
                this._tr || (this._tr = this.canvasObj.tr);
                return this._tr
            },
            set: function(a) {
                this._tr = a
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
        responsiveCSS: {
            get: function() {
                this._responsiveCSS || (this._responsiveCSS = this.canvasObj.css);
                return this._responsiveCSS
            },
            set: function(a) {
                this._responsiveCSS = a
            }
        },
        parentDivName: {
            get: function() {
                return this._parentDivName
            },
            set: function(a) {
                this._parentDivName = a
            }
        }
    });
    a.Line.prototype.start = function(a, o) {
        this.drawIfNeeded(a, o);
        if (!this.effectIsStarted || a) this.areDimensionsCalculated = !1, this.updateEffects(this.hasEffect), this.effectIsStarted = !0
    };
    a.Line.prototype.reset = function() {
        delete a.ropMap[this.element.id];
        this.isDrawn = !1;
        this.element.width = "0";
        this.element.height = "0";
        this.element.style.width =
            "0px";
        this.element.style.height = "0px";
        this.element.left = "0";
        this.element.top = "0";
        this.element.style.left = "0px";
        this.element.style.top = "0px";
        this.effectIsStarted = !1
    };
    a.Line.prototype.getLinkOffsets = function(k, o, c) {
        void 0 === o && (o = !1);
        void 0 === c && (c = a.ReasonForDrawing.kRegularDraw);
        var b = {
            l: 0,
            t: 0,
            r: 0,
            b: 0,
            hOff: {}
        };
        b.hOff.offset = 0;
        b.hOff.poleVal = {
            init: 0,
            curr: 0
        };
        b.vOff = {};
        b.vOff.offset = 0;
        b.vOff.poleVal = {
            init: 0,
            curr: 0
        };
        var e = a.GetBoundingClientRectForElem(a("div_Slide"), o),
            m = a("project").clientWidth,
            g = a("project").clientHeight,
            d = !1,
            p = !1,
            f = void 0,
            l = void 0;
        if (k.lhID || k.lvID) f = a.getDisplayObjByCP_UID(k.lhID), l = k.lhID == k.lvID ? f : a.getDisplayObjByCP_UID(k.lvID), f && (d = f.isStarted && f.isDrawnComplete), l && (p = l.isStarted && l.isDrawnComplete);
        if (d && -1 != k.lhID) {
            var h = f.actualParent;
            if (h) {
                var i = a.GetBoundingClientRectForBaseItem(f, o, c),
                    d = i ? i : a.GetBoundingClientRectForElem(h, o);
                !i && h.tr && (i = f.actualParent.style.transform || f.actualParent.style.msTransform || f.actualParent.style.MozTransform || f.actualParent.style.WebkitTransform || f.actualParent.style.OTransform,
                    a.applyTransform(f.actualParent, ""), d = a.GetBoundingClientRectForElem(h, o), a.applyTransform(f.actualParent, i));
                if (d && (h = k.lhV, -1 != h.indexOf("H%") ? (h = h.split("H%")[0], h = a.getRoundedValue(h * g / 100) + "px") : -1 != h.indexOf("%") && (h = h.split("%")[0], h = a.getRoundedValue(h * m / 100) + "px"), d = d[a.rLinkEdges[k.lhEID]], d -= e.left, b.hOff.poleVal.curr = d, "auto" != k.l && "" != k.l && (b.hOff.offset = parseFloat(h)), "auto" != k.r && "" != k.r)) b.hOff.offset = -parseFloat(h);
                f = a.createTempElemAndGetBoundingRect(f.currentCSS, void 0, !1);
                b.hOff.poleVal.init =
                    f[a.rLinkEdges[k.lhEID]] - e.left
            }
        } else b.hOff = void 0;
        if (p && -1 != k.lvID) {
            if (h = l.actualParent) {
                d = (i = a.GetBoundingClientRectForBaseItem(l, o, c)) ? i : a.GetBoundingClientRectForElem(h, o);
                !i && h.tr && (i = l.actualParent.style.transform || l.actualParent.style.msTransform || l.actualParent.style.MozTransform || l.actualParent.style.WebkitTransform || l.actualParent.style.OTransform, a.applyTransform(l.actualParent, ""), d = a.GetBoundingClientRectForElem(h, o), a.applyTransform(l.actualParent, i));
                if (d && (h = k.lvV, -1 != h.indexOf("H%") ?
                        (h = h.split("H%")[0], h = a.getRoundedValue(h * m / 100) + "px") : -1 != h.indexOf("%") && (h = h.split("%")[0], h = a.getRoundedValue(h * g / 100) + "px"), d = d[a.rLinkEdges[k.lvEID]], d -= e.top, b.vOff.poleVal.curr = d, "auto" != k.t && "" != k.t && (b.vOff.offset = parseFloat(h)), "auto" != k.b && "" != k.b)) b.vOff.offset = -parseFloat(h);
                f = a.createTempElemAndGetBoundingRect(l.currentCSS, void 0, !1);
                b.vOff.poleVal.init = f[a.rLinkEdges[k.lvEID]] - e.top
            }
        } else b.vOff = void 0;
        return b
    };
    a.Line.prototype.drawForResponsive = function(k, o) {
        if (!this.responsiveCSS) return !1;
        if (this.isDrawn && !k) return a.initializeVisibilityForGroupedItem(this), !0;
        if (!this.data) return !1;
        var c = a.getResponsiveCSS(this.responsiveCSS);
        a.getCSSFromLayouter(c, this);
        var b = !1,
            b = this.sh && !this.sh.i,
            e = void 0 != this.tr;
        if (this.isDrawn && this.currentCSS == c && !b && !e && (!k || o == a.ReasonForDrawing.kMoviePaused)) return !0;
        this.currentCSS = c;
        this.parentDivName = b = this.getAttribute("dn");
        var m = c,
            g = o === a.ReasonForDrawing.kItemStateChanged || o === a.ReasonForDrawing.kGettingBoundingRectInBaseState || o === a.ReasonForDrawing.kLinkedToItemAppeared,
            b = this.getLinkOffsets(c, g, o);
        a.applyResponsiveStyles(this.element.parentElement, m, !0, g, void 0, o);
        a.applyResponsiveStyles(this.actualParent, c, !0, g, void 0, o);
        var d = a.GetBoundingClientRectForElem(a.movie.stage.mainSlideDiv, g);
        this.parentElementClientBoundingRect = a.GetBoundingClientRectForElem(this.element.parentElement, g);
        var e = this.parentElementClientBoundingRect.left - d.left,
            p = this.parentElementClientBoundingRect.top - d.top;
        this.actualParentClientBoundingRect = a.GetBoundingClientRectForElem(this.actualParent,
            g);
        var f = this.actualParent,
            l = 0,
            h = 0,
            g = a("div_Slide").clientWidth,
            d = a("div_Slide").clientHeight,
            l = g > this.element.parentElement.clientWidth ? g : this.element.parentElement.clientWidth,
            h = d > this.element.parentElement.clientHeight ? d : this.element.parentElement.clientHeight,
            m = a.createResponsiveStyleObj(c, void 0, "0px", "0px", "0px", "0px", l + "px", h + "px", void 0),
            m = this.canvas = a.createResponsiveCanvas(m, l, h, this.element);
        this.element.style.marginLeft = -e + "px";
        this.element.style.marginTop = -p + "px";
        this.element.parentElement.style.webkitBoxReflect =
            this.re ? "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))" : "unset";
        a.movie.stage.addToParentChildMap(f.id, this.element.id);
        this.element.originalParent = f;
        e = m.gc;
        e.clearRect(0, 0, this.element.getBoundingClientRect().width, this.element.getBoundingClientRect().height);
        a.DESKTOP == a.device && (a.MSIE == a.browser || a.MSEDGE == a.browser || a.FIREFOX == a.browser) && e.beginPath();
        e.save();
        this.sh && !this.sh.i && (e.shadowOffsetX = this.sh.d * Math.cos(Math.PI * this.sh.a / 180), e.shadowOffsetY = this.sh.d * Math.sin(Math.PI * this.sh.a / 180), e.shadowBlur = this.sh.b, e.shadowColor = a.ConvertRGBToRGBA(this.sh.c, this.sh.o));
        var i = c.l,
            n = c.t,
            f = c.w,
            l = c.h,
            h = a.getResponsiveCSS(this.data);
        if (-1 != f.indexOf("H%")) var j = f.split("H%")[0],
            f = a.getRoundedValue(j * d / 100);
        else -1 != f.indexOf("%") ? (j = f.split("%")[0], f = a.getRoundedValue(j * g / 100)) : f = f.split("px")[0]; - 1 != l.indexOf("H%") ? (j = l.split("H%")[0], l = a.getRoundedValue(j *
            g / 100)) : -1 != l.indexOf("%") ? (j = l.split("%")[0], l = a.getRoundedValue(j * d / 100)) : l = l.split("px")[0];
        f = parseFloat(f);
        l = parseFloat(l);
        m = c.cah;
        p = c.cav;
        m ? i = (g - f) / 2 : "auto" != c.l ? -1 != i.indexOf("H%") ? (j = i.split("H%")[0], i = a.getRoundedValue(j * d / 100)) : -1 != i.indexOf("%") ? (j = i.split("%")[0], i = a.getRoundedValue(j * g / 100)) : i = i.split("px")[0] : (i = c.r, -1 != i.indexOf("H%") ? (j = i.split("H%")[0], i = a.getRoundedValue(j * d / 100)) : -1 != i.indexOf("%") ? (j = i.split("%")[0], i = a.getRoundedValue(j * g / 100)) : i = i.split("px")[0], i = parseFloat(i),
            i = g - (i + f));
        p ? n = (d - l) / 2 : "auto" != c.t ? -1 != n.indexOf("H%") ? (j = n.split("H%")[0], n = a.getRoundedValue(j * g / 100)) : -1 != n.indexOf("%") ? (j = n.split("%")[0], n = a.getRoundedValue(j * d / 100)) : n = n.split("px")[0] : (n = c.b, -1 != n.indexOf("H%") ? (j = n.split("H%")[0], n = a.getRoundedValue(j * g / 100)) : -1 != n.indexOf("%") ? (j = n.split("%")[0], n = a.getRoundedValue(j * d / 100)) : n = n.split("px")[0], n = parseFloat(n), n = d - (n + l));
        var i = parseFloat(i),
            n = parseFloat(n),
            q = j = d = g = 0;
        "false" != h.rpX1IsLeft ? (g = i, d = i + f) : (g = i + f, d = i);
        "false" != h.rpY1IsTop ? (j = n,
            q = n + l) : (j = n + l, q = n);
        f = lRightPoint = lTopPoint = lBottomPoint = 0;
        g > d ? (f = d, lRightPoint = g) : (f = g, lRightPoint = d);
        j > q ? (lTopPoint = q, lBottomPoint = j) : (lTopPoint = j, lBottomPoint = q);
        b.hOff && !m && (m = 0, "" != c.l && "auto" != c.l ? (m = f, f = b.hOff.poleVal.curr + b.hOff.offset, lRightPoint += f - m) : "" != c.r && "auto" != c.r && (m = lRightPoint, lRightPoint = b.hOff.poleVal.curr + b.hOff.offset, f += lRightPoint - m));
        b.vOff && !p && (p = 0, "" != c.t && "auto" != c.t ? (p = lTopPoint, lTopPoint = b.vOff.poleVal.curr + b.vOff.offset, lBottomPoint += lTopPoint - p) : "" != c.b && "auto" !=
            c.b && (p = lBottomPoint, lBottomPoint = b.vOff.poleVal.curr + b.vOff.offset, lTopPoint += lBottomPoint - p));
        g > d ? (d = f, g = lRightPoint) : (g = f, d = lRightPoint);
        j > q ? (q = lTopPoint, j = lBottomPoint) : (j = lTopPoint, q = lBottomPoint);
        c = this.canvasObj.sw;
        5 > c && (c = 5);
        e.lineWidth = this.canvasObj.sw;
        e.strokeStyle = this.canvasObj.sc;
        e.moveTo(g, j);
        0 == this.canvasObj.ss ? e.lineTo(d, q) : a.drawDashedLine(e, g, j, d, q, this.canvasObj.ss);
        e.stroke();
        a.drawLineCapStyle(e, g, j, d, q, this.canvasObj.sc, c, this.canvasObj.sst, 0);
        a.drawLineCapStyle(e, g, j, d, q,
            this.canvasObj.sc, c, this.canvasObj.est, 1);
        e.restore();
        this.isDrawn = !0;
        this.drawComplete(o);
        a.isVisible(this) || a._hide(this.parentDivName);
        a.isVisible(this) && this.playEffectsOnStart && (b = this.parentDivName, (c = a.D[b].selfAnimationScript) && eval(c), this.playEffectsOnStart = !1);
        return !0
    };
    a.Line.prototype.drawIfNeeded = function(k, o) {
        if ((!a.responsive || !this.drawForResponsive(k, o)) && !this.isDrawn) {
            var c = this.bounds,
                b = this.vbounds,
                e = this.canvasObj.sw;
            5 > e && (e = 5);
            var m = c.minX,
                g = c.minY,
                d = c.maxX - c.minX,
                p = c.maxY -
                c.minY,
                c = this.actualParent;
            c.style.left = m + "px";
            c.style.top = g + "px";
            c.style.width = d + "px";
            c.style.height = p + "px";
            m = 0 < b.minX ? 0 : b.minX;
            g = 0 < b.minY ? 0 : b.minY;
            p = a.D.project.h > b.maxY ? a.D.project.h : b.maxY;
            d = (a.D.project.w > b.maxX ? a.D.project.w : b.maxX) - m;
            b = this.canvas = a.createCanvas(0, 0, d, p - g, this.element);
            this.element.style.display = "block";
            this.element.style.position = "absolute";
            this.element.parentElement.style.left = this.vbounds.minX + "px";
            this.element.parentElement.style.top = this.vbounds.minY + "px";
            this.element.parentElement.style.width =
                this.vbounds.maxX - this.vbounds.minX + "px";
            this.element.parentElement.style.height = this.vbounds.maxY - this.vbounds.minY + "px";
            this.element.style.marginLeft = m - this.vbounds.minX + "px";
            this.element.style.marginTop = g - this.vbounds.minY + "px";
            this.element.parentElement.style.webkitBoxReflect = this.re ? "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))" : "unset";
            a.movie.stage.addToParentChildMap(c.id,
                this.element.id);
            this.element.originalParent = c;
            b = b.gc;
            b.save();
            b.translate(0 > m ? -m : 0, 0 > g ? -g : 0);
            this.sh && !this.sh.i && (b.shadowOffsetX = this.sh.d * Math.cos(Math.PI * this.sh.a / 180), b.shadowOffsetY = this.sh.d * Math.sin(Math.PI * this.sh.a / 180), b.shadowBlur = this.sh.b, b.shadowColor = a.ConvertRGBToRGBA(this.sh.c, this.sh.o));
            m = this.canvasObj.x1;
            g = this.canvasObj.y1;
            d = this.canvasObj.x2;
            c = this.canvasObj.y2;
            b.lineWidth = this.canvasObj.sw;
            b.strokeStyle = this.canvasObj.sc;
            b.moveTo(m, g);
            0 == this.canvasObj.ss ? b.lineTo(d, c) :
                a.drawDashedLine(b, m, g, d, c, this.canvasObj.ss);
            b.stroke();
            a.drawLineCapStyle(b, m, g, d, c, this.canvasObj.sc, e, this.canvasObj.sst, 0);
            a.drawLineCapStyle(b, m, g, d, c, this.canvasObj.sc, e, this.canvasObj.est, 1);
            b.restore();
            this.isDrawn = !0;
            a.isVisible(this) || a._hide(this.parentDivName);
            a.isVisible(this) && this.playEffectsOnStart && ((e = a.D[this.parentDivName].selfAnimationScript) && eval(e), this.playEffectsOnStart = !1)
        }
    }
})(window.cp);