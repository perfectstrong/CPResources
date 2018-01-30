cp.AutoShape = function(c, a, d) {
    function f(a, c, d) {
        e.AutoShapeState = 2;
        e.changeStateOnMouseEvents && e.changeStateOnMouseEvents("mousedown", d)
    }

    function i(a, d, c) {
        e.AutoShapeState = 0;
        e.changeStateOnMouseEvents && e.changeStateOnMouseEvents("mouseup", c)
    }

    function g(a, c, d) {
        i(a);
        e.parentData && (e.parentData.dep && 0 < e.parentData.dep.length) && (cp.verbose && cp.log("hiding hint"), e.hintVisible = !1, cp.hideHint(e.parentData.dep[0], a));
        e.changeStateOnMouseEvents && e.changeStateOnMouseEvents("mouseout", d)
    }

    function j(a, d, c) {
        e.AutoShapeState =
            1;
        e.isDrawn = !1;
        e.setVBounds();
        e.changeStateOnMouseEvents && e.changeStateOnMouseEvents("mouseover", c);
        (1 == cp("div_Slide").scaleFactor || !cp.responsive) && e.drawIfNeeded(!0, cp.ReasonForDrawing.kMouseEvent)
    }

    function l(a, c, d) {
        c ? (e.parentData && e.parentData.handCursor && (e.actualParent.style.cursor = "pointer"), !e.hintVisible && (e.parentData && e.parentData.dep && 0 < e.parentData.dep.length) && (cp.verbose && cp.log("showing hint"), e.hintVisible = !0, cp.showHint(e.parentData.dep[0], a)), 0 == e.AutoShapeState && j(a, c, d)) : (e.actualParent.style.cursor =
            "default", e.parentData && (e.parentData.dep && 0 < e.parentData.dep.length) && (cp.log("hiding hint"), e.hintVisible = !1, cp.hideHint(e.parentData.dep[0], a)), 0 != e.AutoShapeState && g(a, c, d))
    }

    function k(a, c, d, f) {
        return function(a) {
            if (void 0 != a && !cp.disableInteractions) {
                var g = a.type.toLowerCase(),
                    i = 0 != e.canvasObj.ss || e.is_inside_canvas(a);
                if ("mousemove" != g) e.clicked = "mousedown" == a.type.toLowerCase();
                else {
                    if (e.clicked || s.x == a.clientX && s.y == a.clientY) return;
                    s.x = a.clientX;
                    s.y = a.clientY
                }
                if (("mousemove" == a.type.toLowerCase() ||
                        "mousedown" == a.type.toLowerCase() || "mouseover" == a.type.toLowerCase() || "touch" == a.type.toLowerCase() || "touchstart" == a.type.toLowerCase()) && !i) d && (cp.device == cp.DESKTOP && "mousemove" == a.type.toLowerCase()) && d(c, i, a);
                else if (g = e, e.cloneOfBaseStateItem && (g = cp.getDisplayObjByCP_UID(e.baseStateItemID)), !g || !(g.parentData && void 0 != g.parentData.enabled) || g.parentData.enabled) f && f(), d && d(c, i, a)
            }
        }
    }
    var e = this;
    this.tMatrixMultiplyPoint = function(a, d, c) {
        return [d * a[0] + c * a[2] + a[4], d * a[1] + c * a[3] + a[5]]
    };
    this.tInvertMatrix =
        function(a) {
            var d = 1 / (a[0] * a[3] - a[1] * a[2]);
            return [a[3] * d, -a[1] * d, -a[2] * d, a[0] * d, d * (a[2] * a[5] - a[3] * a[4]), d * (a[1] * a[4] - a[0] * a[5])]
        };
    this.is_inside_canvas = function(a, d) {
        if (void 0 == a) return !1;
        var c;
        if (!e.element) return !1;
        if ((c = e.canvasObj) && c.svg || c && c.ss && 0 != c.ss) return !0;
        var g = c = void 0,
            f = void 0,
            i = void 0,
            j = void 0;
        if (d && (e.sh && !e.sh.i || e.re))(c = e.element.style.transform) && (e.element.style.transform = ""), (g = e.element.style.WebkitTransform) && (e.element.style.WebkitTransform = ""), (f = e.element.style.MozTransform) &&
            (e.element.style.MozTransform = ""), (i = e.element.style.msTransform) && (e.element.style.msTransform = ""), (j = e.element.style.OTransform) && (e.element.style.OTransform = "");
        var l = e.element.parentElement.getBoundingClientRect(),
            k = e.element.getBoundingClientRect();
        cp("div_Slide").getBoundingClientRect();
        var m = cp.getScaledPosition(getPageX(a), getPageY(a)),
            n = l.left - cp.movie.offset,
            q = l.top - cp.movie.topOffset,
            s = k.left - cp.movie.offset,
            v = k.top - cp.movie.topOffset,
            u = parseFloat(e.element.style.marginLeft),
            w = parseFloat(e.element.style.marginTop),
            u = !isNaN(u) ? u : 0,
            w = !isNaN(w) ? w : 0,
            A = e.element.getContext("2d");
        if (A) {
            if (cp.responsive) z = m.X - window.pageXOffset - k.left, k = m.Y - window.pageYOffset - k.top, z /= cp("div_Slide").scaleFactor, k /= cp("div_Slide").scaleFactor;
            else {
                var z = m.X - window.pageXOffset / cp.movie.m_scaleFactor - (0 > u ? s : n) / cp.movie.m_scaleFactor,
                    k = m.Y - window.pageYOffset / cp.movie.m_scaleFactor - (0 > w ? v : q) / cp.movie.m_scaleFactor;
                cp.shouldScale && (cp.loadedModules.toc && (!cp.toc.movieProperties.tocProperties.overlay && 1 == cp.toc.movieProperties.tocProperties.position) &&
                    (z += cp.toc.movieProperties.tocProperties.width), cp.loadedModules.playbar && !cp.PB.MP.PBP.overlay && (0 == cp.PB.MP.PBP.position ? z += cp.PB.playBarHeight : 1 == cp.PB.MP.PBP.position && (k += cp.PB.playBarHeight)));
                z *= parseFloat(e.element.parentElement.style.width) / l.width * cp.movie.m_scaleFactor;
                k *= parseFloat(e.element.parentElement.style.height) / l.height * cp.movie.m_scaleFactor;
                cp.verbose && (cp.log("lParentOffsetL : " + n + "," + q), cp.log("lElemL : " + s + "," + v), cp.log("lElemMarginL : " + u + w), cp.log("X : " + z + "," + k))
            }
            if (d &&
                (e.sh && !e.sh.i || e.re)) c && (e.element.style.transform = c), g && (e.element.style.WebkitTransform = g), f && (e.element.style.MozTransform = f), i && (e.element.style.msTransform = i), j && (e.element.style.OTransform = j);
            return c = A.isPointInPath(z, k)
        }
        return !1
    };
    this.setVBounds = function() {
        var a = e.canvasObj,
            c = 0;
        a.sw > e.canvasObj.sw && (c = a.sw - e.canvasObj.sw);
        cp.responsive && (c = 0);
        a = e.canvasObj.vbwr;
        e._wrvBounds = {
            minX: a[0] - 2 * c,
            minY: a[1] - 2 * c,
            maxX: a[2] + 2 * c,
            maxY: a[3] + 2 * c,
            width: a[2] - a[0] + 4 * c,
            height: a[3] - a[1] + 4 * c
        };
        a = e.canvasObj.vb;
        e._vbounds = {
            minX: a[0] - 2 * c,
            minY: a[1] - 2 * c,
            maxX: a[2] + 2 * c,
            maxY: a[3] + 2 * c,
            width: a[2] - a[0] + 4 * c,
            height: a[3] - a[1] + 4 * c
        }
    };
    var s = {};
    cp.AutoShape.baseConstructor.call(this, c);
    this.baseItemBoundingRect = null;
    this.visible = this.getAttribute("visible");
    this.parentId = cp.D[a].dn;
    this._parentObj = cp.D[this.parentId];
    this.prevCanvasObj = this._canvasObj = null;
    c = this.currentState;
    if (void 0 != this._parentObj) {
        this._canvasObj = cp.D[this._parentObj.mdi];
        if (this._parentObj.hasOwnProperty("stc") && (c < this._parentObj.stc.length && 0 <=
                c) && (a = cp.D[this._parentObj.stc[c]])) this._canvasObj = cp.D[a.mdi];
        this.prevCanvasObj = this._canvasObj
    }
    this._transIn = this._parentObj.trin;
    this.parentDivName = this.getAttribute("dn");
    this._parentData = cp.D[this.parentDivName];
    this._parentData.isCanvasClicked = this.is_inside_canvas;
    this._parentData.canvasPainterObject = this;
    this.actualParent = a = document.getElementById(this.parentDivName);
    1 !== this._parentData.uab && cp.removeAccessibilityOutline(this.actualParent);
    if (this._canvasObj) {
        var m = this._canvasObj.b;
        this._bounds = {
            minX: m[0],
            minY: m[1],
            maxX: m[2],
            maxY: m[3],
            width: m[2] - m[0],
            height: m[3] - m[1]
        };
        this.args = d;
        this.setVBounds();
        this._sh = this._canvasObj.sh;
        this._re = this._canvasObj.re;
        this._tr = this._canvasObj.tr;
        this._normalImage = this._canvasObj.ip;
        this.prevState = this.AutoShapeState = 0
    }
    a && (a.drawingBoard = this.element.parentElement, a.bounds = this._bounds, a.drawingBoard.bounds = this._vbounds);
    if (a && void 0 != this._parentData.pa && this._bounds) {
        -1 != this._parentData.pa && this._parentData.immo && (cp.movie.stage.currentSlide && (this._parentData.pa =
            cp.movie.stage.currentSlide.to - 1), this.setAttribute("clickedOnce", !1));
        var q = this._bounds.maxX - this._bounds.minX,
            n = this._bounds.maxY - this._bounds.minY,
            m = d = 1,
            u = 0,
            w = 0;
        10 < q && (d = (q - 4) / q);
        10 < n && (m = (n - 4) / n);
        if (1 > d && 1 > m) {
            var u = !1,
                u = cp.responsive ? this.sh && !this.sh.i : this.sh && !this.sh.i || this.re,
                v = (u && cp.D.project.w > this._vbounds.maxX ? cp.D.project.w : this._vbounds.maxX) - (0 < this._vbounds.minX && u ? 0 : this._vbounds.minX),
                w = (u && cp.D.project.h > this._vbounds.maxY ? cp.D.project.h : this._vbounds.maxY) - (0 < this._vbounds.minY &&
                    u ? 0 : this._vbounds.minY),
                n = (this._vbounds.maxX + this._vbounds.minX) / 2,
                q = (this._vbounds.maxY + this._vbounds.minY) / 2,
                v = v / 2 - (v / 2 - n) * d,
                w = w / 2 - (w / 2 - q) * m;
            u ? (u = v - n, w -= q) : w = u = 0;
            this.oldMouseOver = a.onmouseover;
            this.oldMouseOut = a.onmouseout;
            this.dataObjForMouseStates = {
                sx: d,
                sy: m,
                tx: -u,
                ty: -w,
                p: a,
                old_tr: this.tr
            };
            d = window.event || Event;
            cp.device == cp.IDEVICE || cp.device == cp.ANDROID ? (this.ontouchstartHandler = k(d, this.element, f), this.ontouchendHandler = k(d, this.element, i), a.ontouchstart = k(d, this.element, f), a.ontouchend =
                k(d, this.element, i)) : (a.onmouseover = k(d, this.element, j, a.onmouseover), a.onmousemove = k(d, this.element, l, a.onmousemove), a.onmouseout = k(d, this.element, g, a.onmouseout), a.onmousedown = k(d, this.element, f), a.onmouseup = k(d, this.element, i), this.onmouseoverHandler = a.onmouseover, this.onmousemoveHandler = a.onmousemove, this.onmouseoutHandler = a.onmouseout, this.onmousedownHandler = a.onmousedown, this.onmouseupHandler = a.onmouseup);
            this.shouldShowRollOver = !0;
            this.setUpClickHandler()
        }
    }
    this.isDrawn = !1;
    cp.responsive && (this._responsiveCSS =
        this._canvasObj.css);
    !1 == this.cloneOfBaseStateItem && -1 != this.baseStateItemID && (this.playEffectsOnStart = !0);
    cp.setInitialVisibility(this);
    if (this._parentData.hasOwnProperty("stc")) {
        a = this._parentData.stc;
        for (d = 0; d < a.length; ++d) d != c && cp._hideData(a[d])
    }
};
cp.inherits(cp.AutoShape, cp.DisplayObject);
Object.defineProperties(cp.AutoShape.prototype, {
    canvasObj: {
        get: function() {
            return this._canvasObj
        },
        set: function(c) {
            this.prevCanvasObj = this._canvasObj;
            this._canvasObj = c;
            this.prevCanvasObj.dn !== this._canvasObj.dn && (this._transIn = this._parentObj = this._normalImage = this._tr = this._re = this._sh = this._wrvBounds = this._vbounds = this._bounds = this._responsiveCSS = this._parentData = null, this.isDrawn = !1, c = this.canvasSwitchReason, this._canvasObj.visible = !0, this.drawIfNeeded(!0, c ? c : cp.ReasonForDrawing.kItemStateChanged),
                cp.updateVarText(this.actualParent, !0, !0))
        }
    },
    parentData: {
        get: function() {
            this._parentData || (this._parentData = cp.D[this.canvasObj.dn]);
            return this._parentData
        },
        set: function(c) {
            this._parentData = c
        }
    },
    responsiveCSS: {
        get: function() {
            this._responsiveCSS || (this._responsiveCSS = this.canvasObj.css);
            return this._responsiveCSS
        },
        set: function(c) {
            this._responsiveCSS = c
        }
    },
    bounds: {
        get: function() {
            if (!this._bounds) {
                var c = this.canvasObj.b;
                this._bounds = {
                    minX: c[0],
                    minY: c[1],
                    maxX: c[2],
                    maxY: c[3],
                    width: c[2] - c[0],
                    height: c[3] -
                        c[1]
                }
            }
            return this._bounds
        },
        set: function(c) {
            this._bounds = c
        }
    },
    vbounds: {
        get: function() {
            if (!this._vbounds) {
                var c = 0;
                this.prevCanvasObj.sw > this.canvasObj.sw && (c = this.prevCanvasObj.sw - this.canvasObj.sw);
                cp.responsive && (c = 0);
                var a = this.canvasObj.vb;
                this._vbounds = {
                    minX: a[0] - 2 * c,
                    minY: a[1] - 2 * c,
                    maxX: a[2] + 2 * c,
                    maxY: a[3] + 2 * c,
                    width: a[2] - a[0] + 4 * c,
                    height: a[3] - a[1] + 4 * c
                }
            }
            return this._vbounds
        },
        set: function(c) {
            this._vbounds = c
        }
    },
    wrvBounds: {
        get: function() {
            if (!this._wrvBounds) {
                var c = 0;
                this.prevCanvasObj.sw > this.canvasObj.sw &&
                    (c = this.prevCanvasObj.sw - this.canvasObj.sw);
                cp.responsive && (c = 0);
                var a = this.canvasObj.vbwr;
                this._wrvBounds = {
                    minX: a[0] - 2 * c,
                    minY: a[1] - 2 * c,
                    maxX: a[2] + 2 * c,
                    maxY: a[3] + 2 * c,
                    width: a[2] - a[0] + 4 * c,
                    height: a[3] - a[1] + 4 * c
                }
            }
            return this._wrvBounds
        },
        set: function(c) {
            this._wrvBounds = c
        }
    },
    sh: {
        get: function() {
            this._sh || (this._sh = this.canvasObj.sh);
            return this._sh
        },
        set: function(c) {
            this._sh = c
        }
    },
    re: {
        get: function() {
            this._re || (this._re = this.canvasObj.re);
            return this._re
        },
        set: function(c) {
            this._re = c
        }
    },
    tr: {
        get: function() {
            this._tr ||
                (this._tr = this.canvasObj.tr);
            return this._tr
        },
        set: function(c) {
            this._tr = c
        }
    },
    normalImage: {
        get: function() {
            this._normalImage || (this._normalImage = this.canvasObj.ip);
            return this._normalImage
        },
        set: function(c) {
            this._normalImage = c
        }
    },
    parentObj: {
        get: function() {
            this._parentObj || (this._parentObj = cp.D[this.canvasObj.dn]);
            return this._parentObj
        },
        set: function(c) {
            this._parentObj = c
        }
    },
    transIn: {
        get: function() {
            this._transIn || (this._transIn = this.parentObj.trin);
            return this._transIn
        },
        set: function(c) {
            this._transIn = c
        }
    }
});
cp.AutoShape.prototype.start = function(c, a) {
    this.drawIfNeeded(c, a);
    if (!this.effectIsStarted || c) this.areDimensionsCalculated = !1, this.updateEffects(this.hasEffect), this.effectIsStarted = !0
};
cp.AutoShape.prototype.reset = function() {
    delete cp.ropMap[this.element.id];
    this.isDrawn = !1;
    this.element.width = "0";
    this.element.height = "0";
    this.element.style.width = "0px";
    this.element.style.height = "0px";
    this.element.left = "0";
    this.element.top = "0";
    this.element.style.left = "0px";
    this.element.style.top = "0px";
    this.removeMouseHandlers(!0);
    this.effectIsStarted = !1;
    this.parentData.canvasPainterObject = null;
    this.parentData.isCanvasClicked = null
};
cp.AutoShape.prototype.getCurrentCanvasObj = function() {
    if (this.canvasObj && this.canvasObj.b && this.canvasObj.p0) return this.canvasObj
};
cp.AutoShape.prototype.addMouseHandlers = function() {
    cp.device == cp.IDEVICE || cp.device == cp.ANDROID ? (cp.registerGestureEvent(this.actualParent, cp.GESTURE_EVENT_TYPES.TOUCH, this.ontouchstartHandler), cp.registerGestureEvent(this.actualParent, cp.GESTURE_EVENT_TYPES.RELEASE, this.ontouchendHandler)) : (this.actualParent.onmouseover = this.onmouseoverHandler, this.actualParent.onmousemove = this.onmousemoveHandler, this.actualParent.onmouseout = this.onmouseoutHandler, this.actualParent.onmousedown = this.onmousedownHandler,
        this.actualParent.onmouseup = this.onmouseupHandler)
};
cp.AutoShape.prototype.removeMouseHandlers = function(c) {
    if (this.actualParent)
        if (this.actualParent.onclick = null, cp.device == cp.IDEVICE || cp.device == cp.ANDROID) cp.removeGestureEvent(this.actualParent, cp.GESTURE_EVENT_TYPES.TOUCH, this.ontouchstartHandler), cp.removeGestureEvent(this.actualParent, cp.GESTURE_EVENT_TYPES.RELEASE, this.ontouchendHandler), c && (this.ontouchendHandler = this.ontouchstartHandler = null);
        else if (this.actualParent.onmouseout = null, this.actualParent.onmousedown = null, this.actualParent.onmouseup =
        null, this.actualParent.onmouseover = null, this.oldMouseOver && (this.actualParent.onmouseover = this.oldMouseOver), this.oldMouseOut) this.actualParent.onmouseout = this.oldMouseOut;
    c && (this.oldMouseOut = this.oldMouseOver = null)
};
cp.AutoShape.prototype.setUpClickHandler = function() {
    var c = this,
        a = !1,
        d = !1,
        a = !1,
        f = cp.movie.stage.currentSlide;
    if (this.actualParent && f) {
        if ((a = "Question Slide" == f.st) && f.qs)(f = cp.D[f.qs]) && "Hotspot" == f.qtp && (d = !0);
        (a = a && !d) && !this.actualParent.onclick ? cp.registerGestureEvent(this.actualParent, cp.GESTURE_EVENT_TYPES.TAP, function(a) {
            return function(d) {
                c.is_inside_canvas(d) && cp.clickSuccessHandler(a)
            }
        }(this.parentData)) : (this.actualParent.onclick = null, cp.removeGestureEvent(this.actualParent, cp.GESTURE_EVENT_TYPES.TAP))
    }
    this.needsOwnHandler =
        a
};

function getTransformDataForMouseStates(c, a) {
    if (cp.responsive) {
        var d = c.getBoundingClientRect(),
            f = c.parentElement.getBoundingClientRect(),
            i = a.actualParent.getBoundingClientRect(),
            g = cp("div_Slide").getBoundingClientRect(),
            j = i.width,
            l = i.height,
            k = i = 1,
            e = 0,
            s = 0;
        10 < j && (i = (j - 4) / j);
        10 < l && (k = (l - 4) / l);
        1 > i && 1 > k && (j = cp.project.clientWidth, l = cp.project.clientHeight, e = !1, e = a.sh && !a.sh.i, j = (e && j > d.right - g.left ? j : d.right - g.left) - (0 < d.left - g.left && e ? 0 : d.left - g.left), d = (e && l > d.bottom - g.top ? l : d.bottom - g.top) - (0 < d.top - g.top &&
            e ? 0 : d.top - g.top), l = f.left - g.left + f.width / 2, f = f.top - g.top + f.height / 2, e ? (e = j / 2 - (j / 2 - l) * i - l, s = d / 2 - (d / 2 - f) * k - f) : s = e = 0);
        return {
            sx: i,
            sy: k,
            tx: -e,
            ty: -s,
            p: a.actualParent,
            old_tr: a.tr
        }
    }
}
cp.AutoShape.prototype.shrinkShapeButtonInAllStates = function() {
    for (var c = cp.GetBaseItemsInAllStates(this, !0), a = 0; a < c.length; a++) {
        var d = c[a];
        d && d.shrinkShapeButton()
    }
};
cp.AutoShape.prototype.expandShapeButtonInAllStates = function() {
    for (var c = cp.GetBaseItemsInAllStates(this, !0), a = 0; a < c.length; a++) {
        var d = c[a];
        d && d.expandShapeButton()
    }
};
cp.AutoShape.prototype.shrinkShapeButton = function() {
    if (this.dataObjForMouseStates) {
        var c = {
            sx: this.dataObjForMouseStates.sx,
            sy: this.dataObjForMouseStates.sy,
            tx: this.dataObjForMouseStates.tx,
            ty: this.dataObjForMouseStates.ty,
            p: this.dataObjForMouseStates.p,
            old_tr: this.dataObjForMouseStates.old_tr
        };
        cp.responsive && (c = getTransformDataForMouseStates(this.element, this));
        c = "translate(" + c.tx / cp("div_Slide").scaleFactor + "px," + c.ty / cp("div_Slide").scaleFactor + "px) scalex(" + c.sx + ") scaley(" + c.sy + ")";
        cp.applyTransform(this.element,
            c);
        this.setVBounds();
        (1 == cp("div_Slide").scaleFactor || !cp.responsive) && this.drawIfNeeded(!0, cp.ReasonForDrawing.kMouseEvent)
    }
};
cp.AutoShape.prototype.expandShapeButton = function() {
    this.dataObjForMouseStates && (cp.applyTransform(this.element, ""), this.setVBounds(), (1 == cp("div_Slide").scaleFactor || !cp.responsive) && this.drawIfNeeded(!0, cp.ReasonForDrawing.kMouseEvent))
};
cp.AutoShape.prototype.restOfProjectDoOnNewSlide = function() {
    this.addMouseHandlers();
    this.setUpClickHandler()
};
cp.AutoShape.prototype.drawForResponsive = function(c, a) {
    if (!this.responsiveCSS) return !1;
    if (this.isDrawn && !c) return cp.initializeVisibilityForGroupedItem(this), !0;
    var d = cp.getResponsiveCSS(this.responsiveCSS);
    cp.getCSSFromLayouter(d, this);
    var f = !1,
        f = this.sh && !this.sh.i,
        i = void 0 != this.tr;
    if (this.currentCSS == d && c && this.isDrawn && a == cp.ReasonForDrawing.kMoviePaused) return cp.verbose && cp.log("Returning because this.isDrawn : " + this.isDrawn), !0;
    var g = a === cp.ReasonForDrawing.kItemStateChanged || a === cp.ReasonForDrawing.kGettingBoundingRectInBaseState ||
        a === cp.ReasonForDrawing.kLinkedToItemAppeared;
    this.currentCSS = d;
    var j = this.canvasObj,
        l = this.prevCanvasObj,
        k = d,
        e = this.actualParent.style.transform || this.actualParent.style.msTransform || this.actualParent.style.MozTransform || this.actualParent.style.WebkitTransform || this.actualParent.style.OTransform,
        s = this.element.parentElement.style.transform || this.element.parentElement.style.msTransform || this.element.parentElement.style.MozTransform || this.element.parentElement.style.WebkitTransform || this.element.parentElement.style.OTransform;
    cp.applyTransform(this.actualParent, "");
    cp.applyTransform(this.element.parentElement, "");
    cp.applyResponsiveStyles(this.actualParent, d, !0, g, void 0, a);
    var m = this.parentData;
    if (m.rpvt && m.autoGrow && (a == cp.ReasonForDrawing.kTextGrow || a == cp.ReasonForDrawing.kLinkedToItemAppeared || a == cp.ReasonForDrawing.kMouseEvent || a == cp.ReasonForDrawing.kMoviePaused) && !cp.isPartOfFlex(this)) {
        var q = m.minItemHeight;
        q && this.actualParent.clientHeight < q && (this.actualParent.style.height = q + "px");
        cp.createResponsiveStyleObj(d,
            d.p, d.l, d.t, d.r, d.b, this.actualParent.clientWidth + "px", this.actualParent.clientHeight + "px", d.crop)
    }
    m.minItemHeight = this.actualParent.clientHeight;
    this.actualParent.offsetHeight = this.actualParent.offsetHeight;
    this.actualParentClientBoundingRect = cp.GetBoundingClientRectForElem(this.actualParent, g);
    var n = cp.GetBoundingClientRectForElem(cp.movie.stage.mainSlideDiv, g);
    this.HFactor = this.WFactor = 1;
    this.WFactor = Math.round(1E4 * this.actualParent.clientWidth / this.bounds.width) / 1E4;
    this.HFactor = Math.round(1E4 *
        this.actualParent.clientHeight / this.bounds.height) / 1E4;
    var u, w, v, y, q = this.wrvBounds.minY - this.bounds.minY;
    u = (this.wrvBounds.minX - this.bounds.minX) * this.WFactor;
    w = q * this.HFactor;
    v = this.wrvBounds.width * this.WFactor;
    y = this.wrvBounds.height * this.HFactor;
    k = cp.createResponsiveStyleObj(d, d.p, this.actualParentClientBoundingRect.left - n.left + u - j.sw / 2 + "px", this.actualParentClientBoundingRect.top - n.top + w - j.sw / 2 + "px", "0px", "0px", v + j.sw + "px", y + j.sw + "px", d.crop);
    cp.applyResponsiveStyles(this.element.parentElement,
        k);
    this.parentElementClientBoundingRect = cp.GetBoundingClientRectForElem(this.element.parentElement, g);
    q = 0;
    if (this.tr) {
        q = cp.getAngleFromRotateStr(this.tr);
        this.actualParent.offsetHeight = this.actualParent.offsetHeight;
        if (!this.m_centrePoint || a == cp.ReasonForDrawing.kOrientationChangeOrResize || a == cp.ReasonForDrawing.kLinkedToItemAppeared || a == cp.ReasonForDrawing.kItemStateChanged || a == cp.ReasonForDrawing.kGettingBoundingRectInBaseState) this.m_centrePoint = cp.getCenterForRotation(this.actualParent, a == cp.ReasonForDrawing.kItemStateChanged);
        this.actualParentClientBoundingRect = cp.GetBoundingClientRectForElem(this.actualParent, g);
        var x = cp.getBoundsForRotatedItem1(this.parentElementClientBoundingRect.left - n.left, this.parentElementClientBoundingRect.top - n.top, this.parentElementClientBoundingRect.width, this.parentElementClientBoundingRect.height, this.m_centrePoint, q, j.sw),
            p = t = r = b = void 0;
        "auto" != d.l && (p = x.l);
        "auto" != d.t && (t = x.t);
        "auto" != d.r && (r = x.r);
        "auto" != d.b && (b = x.b);
        k = cp.createResponsiveStyleObj(k, d.p, p, t, r, b, x.w, x.h, d.crop);
        cp.applyResponsiveStyles(this.element.parentElement,
            k)
    }
    this.parentElementClientBoundingRect = cp.GetBoundingClientRectForElem(this.element.parentElement, g);
    x = g = 0;
    this.m_centrePoint && (g = this.m_centrePoint.X - (this.actualParentClientBoundingRect.left - n.left), x = this.m_centrePoint.Y - (this.actualParentClientBoundingRect.top - n.top));
    if (m.rpvt) {
        var k = this.actualParent.clientWidth,
            m = this.actualParent.clientHeight,
            p = this.actualParent.id + "_vTxtHandlerHolder",
            o = cp(p);
        o || (o = cp.newElem("div"), o.id = p, o.style.display = "block", o.style.position = "absolute", o.style.visibility =
            "hidden", this.actualParent.appendChild(o));
        o.style.left = "0px";
        o.style.top = "0px";
        o.style.width = k + "px";
        o.style.height = m + "px";
        o = this.actualParent.id + "_vTxtHolder";
        p = cp(o);
        p || (p = cp.newElem("div"), p.id = o, p.style.display = "block", p.style.position = "absolute", p.style.zIndex = 1, this.element.parentElement.appendChild(p));
        p.style.left = this.actualParentClientBoundingRect.left - this.parentElementClientBoundingRect.left + "px";
        p.style.top = this.actualParentClientBoundingRect.top - this.parentElementClientBoundingRect.top +
            "px";
        p.style.width = k + "px";
        p.style.height = m + "px";
        (a == cp.ReasonForDrawing.kOrientationChangeOrResize || a == cp.ReasonForDrawing.kItemStateChanged || a == cp.ReasonForDrawing.kGettingBoundingRectInBaseState) && cp.updateVarText(this.actualParent, !0, !0);
        if (this.tr) o = "center center", o = (g ? 100 * g / k + "%" : "center") + " ", o = x ? o + (100 * x / m + "%") : o + "center", p.style["-ms-transform-origin"] = o, p.style["-moz-transform-origin"] = o, p.style["-webkit-transform-origin"] = o, p.style["-o-transform-origin"] = o, p.style["transform-origin"] = o,
            cp.applyTransform(p, this.tr);
        else if ((a === cp.ReasonForDrawing.kItemStateChanged || a === cp.ReasonForDrawing.kGettingBoundingRectInBaseState) && l && l.tr) o = "initial", p.style["-ms-transform-origin"] = o, p.style["-moz-transform-origin"] = o, p.style["-webkit-transform-origin"] = o, p.style["-o-transform-origin"] = o, p.style["transform-origin"] = o, k = p.style.transform || p.style.msTransform || p.style.MozTransform || p.style.WebkitTransform || p.style.OTransform, k = k.replace(l.tr, ""), cp.applyTransform(p, k)
    }
    cp.applyTransform(this.actualParent,
        e);
    cp.applyTransform(this.element.parentElement, s);
    e = this.actualParent;
    m = s = 0;
    s = v + 2 * j.sw;
    m = y + 2 * j.sw;
    f ? (v = this.element.parentElement.clientWidth, y = this.element.parentElement.clientHeight, k = cp("div_Slide").clientWidth, p = cp("div_Slide").clientHeight, s = s > k ? s : k, m = m > p ? m : p, s = s > v ? s : v, m = m > y ? m : y) : (s = Math.ceil(parseFloat(this.element.parentElement.style.width)), m = Math.ceil(parseFloat(this.element.parentElement.style.height)));
    k = cp.createResponsiveStyleObj(d, void 0, "0px", "0px", "0px", "0px", s + "px", m + "px", void 0);
    v = this.parentElementClientBoundingRect.left - n.left;
    y = this.parentElementClientBoundingRect.top - n.top;
    s = this.canvas = cp.createResponsiveCanvas(k, s, m, this.element);
    this.isParentOfTypeSlide || (f ? (this.element.style.marginLeft = (0 > v ? 0 : -1) * v + "px", this.element.style.marginTop = (0 > y ? 0 : -1) * y + "px") : (this.element.style.marginLeft = "0px", this.element.style.marginTop = "0px"));
    if (this.re) this.element.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" +
        (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))";
    else if ((a === cp.ReasonForDrawing.kItemStateChanged || a == cp.ReasonForDrawing.kGettingBoundingRectInBaseState) && l && l.re) this.element.parentElement.style.webkitBoxReflect = "unset";
    cp.movie.stage.addToParentChildMap(e.id, this.element.id);
    this.element.originalParent = e;
    n = s.gc;
    n.crop = d.crop ? d.crop : void 0;
    n.save();
    f ? (n.setTransform(1, 0, 0, 1, 0 > v ? -v : 0, 0 > y ? -y : 0), n.translate(v, y), n.shadowOffsetX = this.sh.d * Math.cos(cp.PIBy180 * this.sh.a),
        n.shadowOffsetY = this.sh.d * Math.sin(cp.PIBy180 * this.sh.a), n.shadowBlur = this.sh.b, d = this.sh.o, 1 == d && (d = 0.999), n.shadowColor = cp.ConvertRGBToRGBA(this.sh.c, d)) : i || (n.translate(-u, -w), n.translate(j.sw / 2, j.sw / 2));
    this.element.style.display = "block";
    this.element.style.position = "absolute";
    n = s.gc;
    n.save();
    if (this.tr) o = g ? 100 * g / e.clientWidth + "%" : "center", o += " ", o = x ? o + (100 * x / e.clientHeight + "%") : o + "center", e.style["-ms-transform-origin"] = o, e.style["-moz-transform-origin"] = o, e.style["-webkit-transform-origin"] =
        o, e.style["-o-transform-origin"] = o, e.style["transform-origin"] = o, cp.applyTransform(e, this.tr), e.tr = this.tr;
    else if ((a === cp.ReasonForDrawing.kItemStateChanged || a == cp.ReasonForDrawing.kGettingBoundingRectInBaseState) && l && l.tr) k = e.style.transform || e.style.msTransform || e.style.MozTransform || e.style.WebkitTransform || e.style.OTransform, k = k.replace(l.tr, ""), cp.applyTransform(e, k), e.tr = void 0;
    e.rotateAngle = q;
    if (f || i) f = this.element.parentElement.clientWidth / 2, i = this.element.parentElement.clientHeight / 2, f =
        this.actualParentClientBoundingRect.left - this.parentElementClientBoundingRect.left + g, i = this.actualParentClientBoundingRect.top - this.parentElementClientBoundingRect.top + x, n.translate(f, i), 0 != q ? n.rotate(cp.PIBy180 * q) : n.rotate(0.02 * cp.PIBy180), n.translate(-g, -x);
    n.clearRect(0, 0, this.element.getBoundingClientRect().width, this.element.getBoundingClientRect().height);
    cp.DESKTOP == cp.device && (cp.MSIE == cp.browser || cp.MSEDGE == cp.browser || cp.FIREFOX == cp.browser) && n.beginPath();
    f = 0;
    void 0 != j.ss && (f = j.ss);
    i = 1;
    void 0 != j.fa && (i = j.fa / 100);
    void 0 != this.normalImage && 1 != i && (j = cp.movie.im.images[this.normalImage]) && j.nativeImage.complete && n.drawImage(j.nativeImage, -j.nativeImage.width / 2, -j.nativeImage.height / 2, j.nativeImage.width, j.nativeImage.height);
    if ((f = this.draw(n, f)) && void 0 != this.normalImage)(j = cp.movie.im.images[this.normalImage]) && j.nativeImage.complete ? (this.sh && !this.sh.i && (n.shadowOffsetX = 0, n.shadowOffsetY = 0, n.shadowBlur = 0, n.shadowColor = "rgba(0,0,0,0)"), n.drawImage(j.nativeImage, -j.nativeImage.width /
        2, -j.nativeImage.height / 2, j.nativeImage.width, j.nativeImage.height)) : f = !1;
    n.restore();
    this.transIn && a == cp.ReasonForDrawing.kRegularDraw && (this.element.parentElement.style.opacity = 0);
    this.isDrawn = f;
    !0 == this.isDrawn && this.drawComplete(a);
    void 0 != this.parentData.enabled && !this.parentData.enabled && this.removeMouseHandlers();
    cp.isVisible(this) || cp._hide(this.parentDivName);
    cp.isVisible(this) && this.playEffectsOnStart && ((j = this.parentData.selfAnimationScript) && eval(j), this.playEffectsOnStart = !1);
    return !0
};
cp.AutoShape.prototype.drawIfNeeded = function(c, a) {
    if ((!cp.responsive || !this.drawForResponsive(c, a)) && !this.isDrawn) {
        this.HFactor = this.WFactor = 1;
        var d = this.canvasObj,
            f = this.bounds,
            i = d.sw;
        void 0 == i && (i = 1);
        1 != i && void 0 == this.vbounds && (this.vbounds.minX += 3 * i / 2, this.vbounds.minY += 3 * i / 2, this.vbounds.maxX -= 3 * i / 2, this.vbounds.maxY -= 3 * i / 2);
        var g = this.vbounds,
            j = f.minX,
            l = f.minY,
            k = f.maxX - f.minX,
            e = f.maxY - f.minY,
            i = this.actualParent;
        i.style.left = j + "px";
        i.style.top = l + "px";
        i.style.width = k + "px";
        i.style.height = e + "px";
        var e = !1,
            e = this.re || this.sh && !this.sh.i,
            j = 0 < g.minX && e ? 0 : g.minX,
            l = 0 < g.minY && e ? 0 : g.minY,
            s = e && cp.D.project.h > g.maxY ? cp.D.project.h : g.maxY,
            k = (e && cp.D.project.w > g.maxX ? cp.D.project.w : g.maxX) - j,
            g = this.canvas = cp.createCanvas(0, 0, k, s - l, this.element);
        this.element.style.display = "block";
        this.element.style.position = "absolute";
        this.element.parentElement.style.left = this.vbounds.minX + "px";
        this.element.parentElement.style.top = this.vbounds.minY + "px";
        this.element.parentElement.style.width = this.vbounds.maxX - this.vbounds.minX +
            "px";
        this.element.parentElement.style.height = this.vbounds.maxY - this.vbounds.minY + "px";
        this.element.style.marginLeft = j - this.vbounds.minX + "px";
        this.element.style.marginTop = l - this.vbounds.minY + "px";
        this.element.parentElement.style.webkitBoxReflect = this.re ? "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))" : "unset";
        cp.movie.stage.addToParentChildMap(i.id, this.element.id);
        this.element.originalParent = i;
        g = g.gc;
        g.clearRect(0, 0, this.element.getBoundingClientRect().width, this.element.getBoundingClientRect().height);
        cp.DESKTOP == cp.device && (cp.MSIE == cp.browser || cp.FIREFOX == cp.browser || cp.MSEDGE == cp.browser) && g.beginPath();
        g.save();
        e ? g.setTransform(1, 0, 0, 1, 0 > j ? -j : 0, 0 > l ? -l : 0) : g.translate(-this.vbounds.minX, -this.vbounds.minY);
        this.sh && !this.sh.i && (g.shadowOffsetX = this.sh.d * Math.cos(cp.PIBy180 * this.sh.a), g.shadowOffsetY = this.sh.d * Math.sin(cp.PIBy180 * this.sh.a), g.shadowBlur =
            this.sh.b, j = this.sh.o, 1 == j && (j = 0.999), g.shadowColor = cp.ConvertRGBToRGBA(this.sh.c, j));
        this.element.style.display = "block";
        this.element.style.position = "absolute";
        j = 0;
        this.tr && (cp.applyTransform(i, this.tr), i.tr = this.tr, j = cp.getAngleFromRotateStr(this.tr));
        i.rotateAngle = j;
        if (this.sh || 0 != j) g.translate((f.minX + f.maxX) / 2, (f.minY + f.maxY) / 2), 0 != j ? g.rotate(cp.PIBy180 * j) : g.rotate(0.02 * cp.PIBy180), g.translate(-(f.minX + f.maxX) / 2, -(f.minY + f.maxY) / 2);
        i = 0;
        void 0 != d.ss && (i = d.ss);
        j = 1;
        void 0 != d.fa && (j = d.fa / 100);
        if (void 0 !=
            this.normalImage && 1 != j && (d = cp.movie.im.images[this.normalImage]) && d.nativeImage.complete) g.translate((f.minX + f.maxX) / 2, (f.minY + f.maxY) / 2), g.drawImage(d.nativeImage, -d.nativeImage.width / 2, -d.nativeImage.height / 2, d.nativeImage.width, d.nativeImage.height), g.translate(-(f.minX + f.maxX) / 2, -(f.minY + f.maxY) / 2);
        if ((i = this.draw(g, i)) && void 0 != this.normalImage)(d = cp.movie.im.images[this.normalImage]) && d.nativeImage.complete ? (this.sh && !this.sh.i && (g.shadowOffsetX = 0, g.shadowOffsetY = 0, g.shadowBlur = 0, g.shadowColor =
            "rgba(0,0,0,0)"), g.translate((f.minX + f.maxX) / 2, (f.minY + f.maxY) / 2), g.drawImage(d.nativeImage, -d.nativeImage.width / 2, -d.nativeImage.height / 2, d.nativeImage.width, d.nativeImage.height)) : i = !1;
        g.restore();
        this.transIn && a == cp.ReasonForDrawing.kRegularDraw && (this.element.parentElement.style.opacity = 0);
        this.isDrawn = i;
        !0 == this.isDrawn && this.drawComplete(a);
        void 0 != this.parentData.enabled && !this.parentData.enabled && this.removeMouseHandlers();
        cp.isVisible(this) || cp._hide(this.parentDivName);
        cp.isVisible(this) &&
            this.playEffectsOnStart && ((f = this.parentData.selfAnimationScript) && eval(f), this.playEffectsOnStart = !1)
    }
};
cp.AutoShape.prototype.draw = function(c, a) {
    if (this.canvasObj.svg) return this.drawSVGShape(c), !0;
    var d = !1;
    this.drawFillBoundary(c, !0);
    var f = this.canvasObj;
    if (f) {
        d = 1;
        void 0 != f.fa && (d = f.fa / 100);
        var i = c.globalAlpha;
        0 != a && 0 < f.sw && (c.globalAlpha = d, this.setFill(c), c.globalAlpha = i, this.drawBoundary(c, a));
        c.globalAlpha = d;
        d = this.setFill(c);
        c.globalAlpha = i;
        0 == a && 0 < f.sw && this.drawFillBoundary(c, !1);
        0 < f.sw && (c.lineWidth = f.sw, c.strokeStyle = f.sc, c.stroke());
        0 != f.sw && (c.shadowOffsetX = 0, c.shadowOffsetY = 0, c.shadowBlur =
            0, c.shadowColor = "rgba(0,0,0,0)", c.stroke());
        return d
    }
};
cp.AutoShape.prototype.drawSVGShape = function(c) {
    var a = null,
        d = this.canvasObj.p0,
        f = 0,
        i = 1,
        g = 1;
    if (d)
        for (f = 0; f < d.length; ++f)
            if (a = d[f], !(0 >= a.length)) switch (a[0]) {
                case cp.kBeginPath:
                    this.canvasObj.svg && c.beginPath();
                    break;
                case cp.kMoveTo:
                    c.moveTo(a[1] * this.WFactor, a[2] * this.HFactor);
                    break;
                case cp.kLineTo:
                    c.lineTo(a[1] * this.WFactor, a[2] * this.HFactor);
                    break;
                case cp.kBezierTo:
                    c.bezierCurveTo(a[1] * this.WFactor, a[2] * this.HFactor, a[3] * this.WFactor, a[4] * this.HFactor, a[5] * this.WFactor, a[6] * this.HFactor);
                    break;
                case cp.kClosePath:
                    c.closePath();
                    break;
                case cp.kPathFillData:
                    if (this.canvasObj.svg)
                        if (a = a[1], a.indexOf("gf")) a = eval("{" + a + "}"), c.fillStyle = a;
                        else {
                            var j = {},
                                a = a.substr(3);
                            j.gf = eval("(" + a + ")");
                            if (j.gf && (a = cp.getGradientFill(j.gf, c, this.WFactor, this.HFactor))) c.fillStyle = a
                        }
                    break;
                case cp.kPathFillAlpha:
                    i = a[1];
                    break;
                case cp.KPathStrokeColor:
                    c.strokeStyle = "#" + a[1];
                    break;
                case cp.KPathStrokeWidth:
                    a = a[1];
                    j = c.globalAlpha;
                    c.globalAlpha = i;
                    c.fill();
                    a && (c.lineWidth = a, c.globalAlpha = g, c.stroke());
                    c.globalAlpha = j;
                    break;
                case cp.KPathStrokeAlpha:
                    g = a[1]
            }
};
cp.AutoShape.prototype.drawFillBoundary = function(c, a) {
    var d = null,
        f = this.canvasObj.p0,
        i = 0;
    if (f)
        for (i = 0; i < f.length; ++i)
            if (d = f[i], !(0 >= d.length)) switch (d[0]) {
                case cp.kMoveTo:
                    c.moveTo(d[1] * this.WFactor, d[2] * this.HFactor);
                    break;
                case cp.kLineTo:
                    c.lineTo(d[1] * this.WFactor, d[2] * this.HFactor);
                    break;
                case cp.kBezierTo:
                    c.bezierCurveTo(d[1] * this.WFactor, d[2] * this.HFactor, d[3] * this.WFactor, d[4] * this.HFactor, d[5] * this.WFactor, d[6] * this.HFactor);
                    break;
                case cp.kClosePath:
                    c.closePath();
                    break;
                case cp.kNotClosed:
                    if (!a) break;
                case cp.kNoStroke:
                    i < f.length - 1 && (d = f[++i][0], cp.kBeginPath != d && --i);
                    for (; i < f.length - 1;)
                        if (d = f[++i][0], cp.kNotClosed == d || cp.kNoStroke == d || cp.kBeginPath == d) {
                            --i;
                            break
                        }
            }
};
cp.AutoShape.prototype.drawBoundary = function(c, a) {
    var d = null,
        f = this.canvasObj.p0,
        i = 0,
        g = 0,
        j = 0;
    if (f) {
        var l = new cp.dashStruct,
            k = cp.getPattern(a, 7, 3);
        c.beginPath();
        for (j = 0; j < f.length; ++j)
            if (d = f[j], !(0 >= d.length)) switch (d[0]) {
                case cp.kMoveTo:
                    c.moveTo(d[1] * this.WFactor, d[2] * this.HFactor);
                    i = d[1] * this.WFactor;
                    g = d[2] * this.HFactor;
                    l = new cp.dashStruct;
                    break;
                case cp.kLineTo:
                    cp.drawDashedLineImpl(c, k, l, i, g, d[1] * this.WFactor, d[2] * this.HFactor);
                    i = d[1] * this.WFactor;
                    g = d[2] * this.HFactor;
                    break;
                case cp.kBezierTo:
                    cp.drawDashedBezierCurve(c,
                        k, l, i, g, d[1] * this.WFactor, d[2] * this.HFactor, d[3] * this.WFactor, d[4] * this.HFactor, d[5] * this.WFactor, d[6] * this.HFactor);
                    i = d[5] * this.WFactor;
                    g = d[6] * this.HFactor;
                    break;
                case cp.kClosePath:
                    l = new cp.dashStruct
            }
    }
};
cp.AutoShape.prototype.getTranslationValuesForTiletype = function() {
    var c = this.canvasObj;
    if (c) {
        var a = c.imgf;
        if (a) {
            var d = a.img.tiletype,
                f = 0,
                i = 0,
                g = a.b[2] - a.b[0],
                j = a.b[3] - a.b[1],
                l = a.img.w,
                a = a.img.h;
            cp.responsive && (g = Math.floor(g * this.WFactor) + c.sw, j = Math.floor(j * this.HFactor) + c.sw);
            switch (d) {
                case "t":
                    f = (g - l) / 2;
                    break;
                case "tr":
                    f = g - l;
                    break;
                case "l":
                    i = (j - a) / 2;
                    break;
                case "c":
                    f = (g - l) / 2;
                    i = (j - a) / 2;
                    break;
                case "r":
                    f = g - l;
                    i = (j - a) / 2;
                    break;
                case "bl":
                    i = j - a;
                    break;
                case "b":
                    f = (g - l) / 2;
                    i = j - a;
                    break;
                case "br":
                    f = g - l, i = j - a
            }
            0 <
                f && (f = f % l - l);
            0 < i && (i = i % a - a);
            cp.responsive || (f += c.b[0], i += c.b[1]);
            return {
                x: f,
                y: i
            }
        }
    }
};
cp.AutoShape.prototype.setFill = function(c) {
    var a = null,
        d = "",
        d = null,
        f = [],
        i = 0,
        g = 0,
        j = 0,
        l = 1,
        d = d = null,
        j = !0,
        k = 0,
        f = k = 1,
        e = !1,
        s = !1,
        m = this.canvasObj;
    if (m) {
        var q = c.canvas;
        if (0 == q.width || 0 == q.height) return !0;
        if (m.gf) {
            if (d = cp.getGradientFill(m.gf, c, this.WFactor, this.HFactor)) c.fillStyle = d
        } else if (m.imgf) {
            j = !1;
            a = m.imgf;
            if (void 0 == a.img || void 0 == a.img.ip) return !1;
            d = a.img.ip;
            if ((d = cp.movie.im.images[d]) && d.nativeImage.complete) {
                j = a.s;
                if (l = a.t) g = this.getTranslationValuesForTiletype(), e = !0, i = g.x, g = g.y, c.translate(i,
                    g), d = c.createPattern(d.nativeImage, "repeat"), c.fillStyle = d;
                else if (j) void 0 != this.canvasObj.b && 4 == this.canvasObj.b.length && (cp.responsive ? (i = Math.floor(i * this.WFactor) + m.sw, g = Math.floor(g * this.HFactor) + m.sw) : (i += this.canvasObj.b[0], g += this.canvasObj.b[1]), f = this.canvasObj.b, k = f[2] - f[0], h = f[3] - f[1], cp.responsive && (k *= this.WFactor, h *= this.HFactor), k /= a.img.w, f = h / a.img.h, c.translate(i, g), e = !0, c.scale(k, f), d = c.createPattern(d.nativeImage, "no-repeat"), c.fillStyle = d);
                else {
                    j = document.createElement("canvas");
                    l = j.getContext("2d");
                    q = c.canvas;
                    j.left = q.left;
                    j.right = q.right;
                    j.top = q.top;
                    j.bottom = q.bottom;
                    j.width = q.width;
                    j.height = q.height;
                    var q = d.nativeImage.width,
                        n = d.nativeImage.height,
                        i = a.b[2] - a.b[0],
                        g = a.b[3] - a.b[1];
                    cp.responsive ? (i = Math.floor(i * this.WFactor) + m.sw, g = Math.floor(g * this.HFactor) + m.sw, i = -(q - i) / 2, g = -(n - g) / 2, l.translate(i, g)) : (l.translate((i - q) / 2, (g - n) / 2), i = this.canvasObj.b[0], g = this.canvasObj.b[1], e = !0, c.translate(i, g));
                    a = l.globalAlpha;
                    l.globalAlpha = 0;
                    l.globalAlpha = a;
                    d = l.createPattern(d.nativeImage,
                        "no-repeat");
                    l.fillStyle = d;
                    l.fillRect(0, 0, q, n);
                    d = c.createPattern(j, "no-repeat");
                    c.fillStyle = d
                }
                j = !0
            }
        } else m.bc ? c.fillStyle = m.bc : this.normalImage && (s = !0, j = !1);
        j && c.fill();
        (1 != k || 1 != f) && c.scale(1 / k, 1 / f);
        e && c.translate(-i, -g);
        return j || s
    }
};
cp.AutoShape.prototype.changeStateOnMouseEvents = function(c, a) {
    var d = null; - 1 == this.baseStateItemID ? d = this : this.cloneOfBaseStateItem && (d = cp.getDisplayObjByCP_UID(this.baseStateItemID));
    d && void 0 !== d.HandleMouseEventOnStateItems && d.HandleMouseEventOnStateItems(c, this.parentStateType, a)
};
cp.AutoShape.prototype.HandleMouseEventOnStateItems = function(c, a, d) {
    var f = cp.D[this.parentDivName];
    if (!(f && void 0 != f.enabled) || f.enabled) {
        var a = cp.kSTTNone,
            i = "";
        if (0 <= this.currentState && this.currentState < this.states.length) {
            var g = this.states[this.currentState];
            g && (a = g.stt, i = g.stn)
        }
        var j = !(cp.device == cp.IDEVICE || cp.device == cp.ANDROID) || "mouseup" != c,
            g = !1,
            l = "",
            k = !1,
            e = !1;
        f && (e = cp.isValidItemForStateOptimization({
            n: this.parentDivName,
            t: f.type
        }));
        if ("mouseover" == c) {
            if ((a == cp.kSTTNormal || a == cp.kSTTCustom ||
                    a == cp.kSTTVisited) && this.shouldShowRollOver)
                if (g = !0, l = cp.getLocalisedStateName("kCPRolloverState"), this.stateAtStartOfMouseEvents = i, cp.BringBaseItemToFrontWithinState(this, cp.getLocalisedStateName("kCPRolloverState")), cp.device === cp.DESKTOP && (c = cp.GetMouseOverManager())) {
                    var s = this;
                    c.addMouseOverItem(this, function() {
                        s.ForceMouseOut()
                    })
                }
        } else if ("mouseout" == c) {
            if (a == cp.kSTTRollOver || a == cp.kSTTDown) g = !0, l = this.stateAtStartOfMouseEvents, cp.device === cp.DESKTOP && (c = cp.GetMouseOverManager()) && c.removeMouseOverItem(this);
            if (a == cp.kSTTNormal || a == cp.kSTTCustom || a == cp.kSTTVisited) cp.browser == cp.CHROME && this.ignoreMouseOutEventOnNormal ? this.ignoreMouseOutEventOnNormal = !1 : this.shouldShowRollOver = !0
        } else if ("mousedown" == c) {
            if (a == cp.kSTTNormal || a == cp.kSTTRollOver || a == cp.kSTTCustom || a == cp.kSTTVisited)
                if (g = !0, l = cp.getLocalisedStateName("kCPDownState"), this.bShouldListenForMouseUpOnDownState = !0, a == cp.kSTTNormal || a == cp.kSTTCustom || a == cp.kSTTVisited) this.stateAtStartOfMouseEvents = i, this.ignoreMouseOutEventOnNormal = !0;
            this.shrinkShapeButtonInAllStates()
        } else if ("mouseup" ==
            c) {
            if (!j || a == cp.kSTTDown) a == cp.kSTTDown && (g = !0, l = this.stateAtStartOfMouseEvents), this.shouldShowRollOver = !1, this.bShouldListenForMouseUpOnDownState && (k = !0);
            this.expandShapeButtonInAllStates()
        }
        g && (l !== cp.getLocalisedStateName("kCPRolloverState") && cp.ResetItemZIndicesWithinState(this, cp.getLocalisedStateName("kCPRolloverState")), cp.changeState(this.actualParent.id, l, !1));
        k && !e && (!cp.IsGestureSupportedDevice() && !cp.disableInteractions && (this.needsOwnHandler || cp.shouldRelaxBrowserCheck(this.parentData.type) ||
            cp.CHROME != cp.browser && cp.MSIE != cp.browser || cp.m_isLMSPreview)) && cp.dispatchClickEvent(this.actualParent, d, {
            asPartOfStateChange: !0
        })
    }
};