(function(a) {
    a.DrawingItem = function(g, d, c) {
        function e(a) {
            k.changeStateOnMouseEvents && k.changeStateOnMouseEvents("mouseover", a)
        }

        function j(a) {
            k.changeStateOnMouseEvents && k.changeStateOnMouseEvents("mouseout", a)
        }

        function l(a) {
            k.changeStateOnMouseEvents && k.changeStateOnMouseEvents("mousedown", a)
        }

        function i(a) {
            k.changeStateOnMouseEvents && k.changeStateOnMouseEvents("mouseup", a)
        }

        function f(a, c, g, d) {
            return function(e) {
                if (!(k.parentObj && void 0 != k.parentObj.enabled) || k.parentObj.enabled) d && d(), g && k.mouseState ==
                    a || (k.mouseState = a, c(e))
            }
        }
        var k = this;
        this.mouseState = a.mouseStateOut;
        a.DrawingItem.baseConstructor.call(this, g);
        this.baseItemBoundingRect = null;
        this.visible = this.getAttribute("visible");
        this.parentId = a.D[d].dn;
        this._parentObj = a.D[this.parentId];
        this._canvasObj = null;
        void 0 != this._parentObj && (this._canvasObj = a.D[this._parentObj.mdi]);
        this.parentDivName = this.getAttribute("dn");
        this.actualParent = d = document.getElementById(this.parentDivName);
        g = this.currentState;
        if (void 0 != this._parentObj) {
            if (this._parentObj.hasOwnProperty("stc") &&
                g < this._parentObj.stc.length && 0 <= g) {
                var m = a.D[this._parentObj.stc[g]];
                m && (this._canvasObj = a.D[m.mdi])
            }
            this.prevCanvasObj = this._canvasObj
        }
        this._parentObj = a.D[this._canvasObj.dn];
        this._transIn = this._parentObj.trin;
        this._canvasObj && (this.type = this._canvasObj.t, m = this._canvasObj.b, this._bounds = {
                minX: m[0],
                minY: m[1],
                maxX: m[2],
                maxY: m[3],
                width: m[2] - m[0],
                height: m[3] - m[1]
            }, this.args = c, c = this.canvasObj.vb, this._vbounds = {
                minX: c[0],
                minY: c[1],
                maxX: c[2],
                maxY: c[3],
                width: c[2] - c[0],
                height: c[3] - c[1]
            }, this._sh = this._canvasObj.sh,
            this._re = this._canvasObj.re, this._tr = this._canvasObj.tr, this._currImage = this._canvasObj.ip);
        d && (d.drawingBoard = this.element.parentElement, d.bounds = this._bounds, d.drawingBoard.bounds = this._vbounds);
        this._parentObj && a.doesSupportStates(this._parentObj.type) && d && (a.device == a.IDEVICE || a.device == a.ANDROID ? (d.ontouchstart = f(a.mouseStateTouchStart, l), d.ontouchend = f(a.mouseStateTouchEnd, i)) : (d.onmouseover = f(a.mouseStateOver, e, !1, d.onmouseover), d.onmouseout = f(a.mouseStateOut, j, !1, d.onmouseout), d.onmousedown =
            f(a.mouseStateDown, l), d.onmouseup = f(a.mouseStateUp, i)));
        this.shouldShowRollOver = !0;
        this.isDrawn = !1;
        a.responsive && (this._responsiveCSS = this.getAttribute("css"));
        !1 == this.cloneOfBaseStateItem && -1 != this.baseStateItemID && (this.playEffectsOnStart = !0);
        a.setInitialVisibility(this);
        if (this._parentObj.hasOwnProperty("stc")) {
            c = this._parentObj.stc;
            for (d = 0; d < c.length; ++d) d != g && a._hideData(c[d])
        }
    };
    a.inherits(a.DrawingItem, a.DisplayObject);
    Object.defineProperties(a.DrawingItem.prototype, {
        canvasObj: {
            get: function() {
                return this._canvasObj
            },
            set: function(g) {
                this.prevCanvasObj = this._canvasObj;
                this._canvasObj = g;
                this.prevCanvasObj.dn !== this._canvasObj.dn && (this._parentObj = this._tr = this._re = this._sh = this._vbounds = this._bounds = this._responsiveCSS = null, this.isDrawn = !1, g = this.canvasSwitchReason, this.drawIfNeeded(!0, g ? g : a.ReasonForDrawing.kItemStateChanged), a.responsive || a.updateVarText(this.actualParent, !0, !0))
            }
        },
        parentObj: {
            get: function() {
                this._parentObj || (this._parentObj = a.D[this.canvasObj.dn]);
                return this._parentObj
            },
            set: function(a) {
                this._parentObj =
                    a
            }
        },
        transIn: {
            get: function() {
                this._transIn || (this._transIn = a.D[this.canvasObj.dn].trin);
                return this._transIn
            },
            set: function(a) {
                this._transIn = a
            }
        },
        currImage: {
            get: function() {
                this._currImage || (this._currImage = this.canvasObj.ip);
                return this._currImage
            },
            set: function(a) {
                this._currImage = a
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
                        width: a[2] - a[0],
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
                    var a =
                        this.canvasObj.vb;
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
                this._tr || (this._tr = this.canvasObj.tr);
                return this._tr
            },
            set: function(a) {
                this._tr = a
            }
        },
        responsiveCSS: {
            get: function() {
                this._responsiveCSS ||
                    (this._responsiveCSS = this.canvasObj.css);
                return this._responsiveCSS
            },
            set: function(a) {
                this._responsiveCSS = a
            }
        }
    });
    a.DrawingItem.prototype.start = function(a, d) {
        this.drawIfNeeded(a, d);
        if (!this.effectIsStarted || a) this.areDimensionsCalculated = !1, this.updateEffects(this.hasEffect), this.effectIsStarted = !0
    };
    a.DrawingItem.prototype.reset = function() {
        delete a.ropMap[this.element.id];
        this.isDrawn = !1;
        this.element.width = "0";
        this.element.height = "0";
        this.element.style.width = "0px";
        this.element.style.height = "0px";
        this.element.left =
            "0";
        this.element.top = "0";
        this.element.style.left = "0px";
        this.element.style.top = "0px";
        this.effectIsStarted = !1
    };
    a.DrawingItem.prototype.drawForResponsive = function(g, d) {
        if (!this.responsiveCSS) return !1;
        if (this.isDrawn && !g) return a.initializeVisibilityForGroupedItem(this), !0;
        var c = a.getResponsiveCSS(this.responsiveCSS);
        a.getCSSFromLayouter(c, this);
        var e = !1,
            e = this.sh && !this.sh.i;
        if (!this.isDrawn || !(this.currentCSS == c && g && d == a.ReasonForDrawing.kMoviePaused)) {
            var j = d === a.ReasonForDrawing.kItemStateChanged ||
                d === a.ReasonForDrawing.kGettingBoundingRectInBaseState || d === a.ReasonForDrawing.kLinkedToItemAppeared;
            this.currentCSS = c;
            if (this.canvasObj && this.type) {
                var l = this.canvasObj,
                    i = this.parentObj,
                    f = c,
                    k = this.actualParent.style.transform || this.actualParent.style.msTransform || this.actualParent.style.MozTransform || this.actualParent.style.WebkitTransform || this.actualParent.style.OTransform,
                    m = this.element.parentElement.style.transform || this.element.parentElement.style.msTransform || this.element.parentElement.style.MozTransform ||
                    this.element.parentElement.style.WebkitTransform || this.element.parentElement.style.OTransform;
                a.applyTransform(this.actualParent, "");
                a.applyTransform(this.element.parentElement, "");
                a.applyResponsiveStyles(this.actualParent, c, !0, j, void 0, d);
                if (i.rpvt && i.autoGrow && (d == a.ReasonForDrawing.kTextGrow || d == a.ReasonForDrawing.kMouseEvent)) {
                    var p = i.minItemHeight;
                    if (!p) {
                        p = i.variableText;
                        void 0 == p && (p = i.rpvt[a.ResponsiveProjWidth].vt);
                        var o = this.actualParent.clientWidth,
                            q = i.offsets;
                        q && (o -= q[0] + q[2]);
                        o -= (i.rplm ?
                            i.rplm[a.ResponsiveProjWidth] : 0) + (i.rprm ? i.rprm[a.ResponsiveProjWidth] : 0);
                        p = a.createTempTextElemAndGetBoundingRect(o, i, p, j).height
                    }
                    this.actualParent.clientHeight < p && (this.actualParent.style.height = p + "px");
                    a.createResponsiveStyleObj(c, c.p, c.l, c.t, c.r, c.b, this.actualParent.clientWidth + "px", this.actualParent.clientHeight + "px", c.crop)
                }
                this.actualParent.offsetHeight = this.actualParent.offsetHeight;
                this.actualParentClientBoundingRect = a.GetBoundingClientRectForElem(this.actualParent, j);
                q = a.GetBoundingClientRectForElem(a.movie.stage.mainSlideDiv,
                    j);
                this.HFactor = this.WFactor = 1;
                this.WFactor = parseInt(100 * this.actualParent.clientWidth / this.bounds.width) / 100;
                this.HFactor = parseInt(100 * this.actualParent.clientHeight / this.bounds.height) / 100;
                p = 0;
                this.tr && (p = a.getAngleFromRotateStr(this.tr));
                if (!this.m_centrePoint || d == a.ReasonForDrawing.kOrientationChangeOrResize || d == a.ReasonForDrawing.kLinkedToItemAppeared) this.m_centrePoint = a.getCenterForRotation(this.actualParent);
                o = a.getBoundsForRotatedItem1(this.actualParentClientBoundingRect.left - q.left, this.actualParentClientBoundingRect.top -
                    q.top, this.actualParentClientBoundingRect.width, this.actualParentClientBoundingRect.height, this.m_centrePoint, p, this.strokeWidth);
                f = t = r = b = void 0;
                "auto" != c.l && (f = o.l);
                "auto" != c.t && (t = o.t);
                "auto" != c.r && (r = o.r);
                "auto" != c.b && (b = o.b);
                f = a.createResponsiveStyleObj(c, c.p, f, t, r, b, o.w, o.h, c.crop);
                a.applyResponsiveStyles(this.element.parentElement, f);
                this.parentElementClientBoundingRect = a.GetBoundingClientRectForElem(this.element.parentElement, j);
                o = j = 0;
                this.m_centrePoint && (j = this.m_centrePoint.X - (this.actualParentClientBoundingRect.left -
                    q.left), o = this.m_centrePoint.Y - (this.actualParentClientBoundingRect.top - q.top));
                if (i.rpvt) {
                    var f = this.actualParent.id + "_vTxtHandlerHolder",
                        n = a(f);
                    n || (n = a.newElem("div"), n.id = f, n.style.display = "block", n.style.position = "absolute", n.style.width = this.actualParent.clientWidth + "px", n.style.height = this.actualParent.clientHeight + "px", n.style.visibility = "hidden", this.actualParent.appendChild(n));
                    n.style.left = "0px";
                    n.style.top = "0px";
                    n.style.width = this.actualParent.clientWidth + "px";
                    n.style.height = this.actualParent.clientHeight +
                        "px";
                    n = this.actualParent.id + "_vTxtHolder";
                    f = a(n);
                    f || (f = a.newElem("div"), f.id = n, f.style.display = "block", f.style.position = "absolute", this.element.parentElement.appendChild(f), f.style.width = this.actualParent.clientWidth + "px", f.style.height = this.actualParent.clientHeight + "px");
                    a.applyTransform(f, "rotate(0)");
                    n = this.actualParentClientBoundingRect.top - this.parentElementClientBoundingRect.top + this.actualParent.clientHeight / 2;
                    f.style.left = this.actualParentClientBoundingRect.left - this.parentElementClientBoundingRect.left +
                        this.actualParent.clientWidth / 2 - this.actualParent.clientWidth / 2 + "px";
                    f.style.top = n - this.actualParent.clientHeight / 2 + "px";
                    f.style.width = this.actualParent.clientWidth + "px";
                    f.style.height = this.actualParent.clientHeight + "px";
                    (d == a.ReasonForDrawing.kOrientationChangeOrResize || d == a.ReasonForDrawing.kItemStateChanged) && a.updateVarText(this.actualParent, !0, !0);
                    this.tr ? (f.style.left = (this.element.parentElement.clientWidth - f.clientWidth) / 2 + "px", f.style.top = (this.element.parentElement.clientHeight - f.clientHeight) /
                        2 + "px", n = "center center", f.style["-ms-transform-origin"] = n, f.style["-moz-transform-origin"] = n, f.style["-webkit-transform-origin"] = n, f.style["-o-transform-origin"] = n, f.style["transform-origin"] = n, a.applyTransform(f, this.tr)) : a.applyTransform(f, "none")
                }
                a.applyTransform(this.actualParent, k);
                a.applyTransform(this.element.parentElement, m);
                var m = this.actualParent,
                    s = k = 0;
                e ? (k = a("div_Slide").clientWidth, s = a("div_Slide").clientHeight) : (k = this.element.parentElement.clientWidth, s = this.element.parentElement.clientHeight);
                f = a.createResponsiveStyleObj(c, void 0, "0px", "0px", "0px", "0px", k + "px", s + "px", void 0);
                n = this.parentElementClientBoundingRect.left - q.left;
                q = this.parentElementClientBoundingRect.top - q.top;
                f = this.canvas = a.createResponsiveCanvas(f, k, s, this.element);
                this.isParentOfTypeSlide || (e ? (this.element.style.marginLeft = (0 > n ? 1 : -1) * n + "px", this.element.style.marginTop = (0 > q ? 1 : -1) * q + "px") : (this.element.style.marginLeft = "0px", this.element.style.marginTop = "0px"));
                this.element.parentElement.style.webkitBoxReflect = this.re ?
                    "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))" : "unset";
                a.movie.stage.addToParentChildMap(m.id, this.element.id);
                this.element.originalParent = m;
                k = f.gc;
                k.crop = c.crop ? c.crop : void 0;
                k.save();
                e && (k.setTransform(1, 0, 0, 1, 0 > n ? -n : 0, 0 > q ? -q : 0), k.translate(n, q), k.shadowOffsetX = this.sh.d * Math.cos(Math.PI * this.sh.a / 180), k.shadowOffsetY = this.sh.d * Math.sin(Math.PI * this.sh.a / 180),
                    k.shadowBlur = this.sh.b, c = this.sh.o, 1 == c && (c = 0.999), k.shadowColor = a.ConvertRGBToRGBA(this.sh.c, c));
                this.element.style.display = "block";
                this.element.style.position = "absolute";
                k = f.gc;
                k.save();
                this.tr ? (n = j ? 100 * j / m.clientWidth + "%" : "center", n += " ", n = o ? n + (100 * o / m.clientHeight + "%") : n + "center", m.style["-ms-transform-origin"] = n, m.style["-moz-transform-origin"] = n, m.style["-webkit-transform-origin"] = n, m.style["-o-transform-origin"] = n, m.style["transform-origin"] = n, a.applyTransform(m, this.tr), m.tr = this.tr) : (m.tr =
                    void 0, a.applyTransform(m, "none"));
                m.rotateAngle = p;
                c = this.element.parentElement.clientWidth / 2;
                e = this.element.parentElement.clientHeight / 2;
                c = this.actualParentClientBoundingRect.left - this.parentElementClientBoundingRect.left + j;
                e = this.actualParentClientBoundingRect.top - this.parentElementClientBoundingRect.top + o;
                k.translate(c, e);
                0 != p ? k.rotate(Math.PI * p / 180) : k.rotate(0.02 * Math.PI / 180);
                k.translate(-j, -o);
                c = 0;
                void 0 != l.ss && (c = l.ss);
                if ((l = this.draw(k, c)) && void 0 != this.normalImage)(c = a.movie.im.images[this.normalImage]) &&
                    c.nativeImage.complete ? (this.sh && !this.sh.i && (k.shadowOffsetX = 0, k.shadowOffsetY = 0, k.shadowBlur = 0, k.shadowColor = "rgba(0,0,0,0)"), k.drawImage(c.nativeImage, -c.nativeImage.width / 2, -c.nativeImage.height / 2, c.nativeImage.width, c.nativeImage.height)) : l = !1;
                k.restore();
                this.transIn && d == a.ReasonForDrawing.kRegularDraw && (this.element.parentElement.style.opacity = 0);
                a.handleQuizzingItemsInReviewMode(this.element, i, this.parentDivName);
                this.isDrawn = l;
                !0 == this.isDrawn && this.drawComplete(d);
                a.isVisible(this) || a._hide(this.parentDivName);
                a.isVisible(this) && this.playEffectsOnStart && ((i = this.parentObj.selfAnimationScript) && eval(i), this.playEffectsOnStart = !1);
                return !0
            }
        }
    };
    a.DrawingItem.prototype.drawIfNeeded = function(g, d) {
        if ((!a.responsive || !this.drawForResponsive(g, d)) && !this.isDrawn && this.canvasObj && this.type && this.canvasObj.b) {
            this.HFactor = this.WFactor = 1;
            var c = this.bounds,
                e = this.vbounds,
                j = this.parentObj,
                l = c.minX,
                i = c.minY,
                f = c.maxX - c.minX,
                k = c.maxY - c.minY,
                m = this.actualParent;
            m.style.left = l + "px";
            m.style.top = i + "px";
            m.style.width = f + "px";
            m.style.height = k + "px";
            var k = !1,
                k = this.re || this.sh && !this.sh.i,
                l = 0 < e.minX && k ? 0 : e.minX,
                i = 0 < e.minY && k ? 0 : e.minY,
                p = k && a.D.project.h > e.maxY ? a.D.project.h : e.maxY,
                f = (k && a.D.project.w > e.maxX ? a.D.project.w : e.maxX) - l,
                f = this.canvas = a.createCanvas(0, 0, f, p - i, this.element);
            this.element.style.display = "block";
            this.element.style.position = "absolute";
            this.element.parentElement.style.left = this.vbounds.minX + "px";
            this.element.parentElement.style.top = this.vbounds.minY + "px";
            this.element.parentElement.style.width = this.vbounds.maxX -
                this.vbounds.minX + "px";
            this.element.parentElement.style.height = this.vbounds.maxY - this.vbounds.minY + "px";
            this.element.style.marginLeft = l - this.vbounds.minX + "px";
            this.element.style.marginTop = i - this.vbounds.minY + "px";
            this.element.parentElement.style.webkitBoxReflect = this.re ? "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))" : "unset";
            a.movie.stage.addToParentChildMap(m.id,
                this.element.id);
            this.element.originalParent = m;
            e = f.gc;
            e.save();
            k ? e.setTransform(1, 0, 0, 1, 0 > l ? -l : 0, 0 > i ? -i : 0) : e.translate(-this.vbounds.minX, -this.vbounds.minY);
            this.sh && !this.sh.i && (e.shadowOffsetX = this.sh.d * Math.cos(Math.PI * this.sh.a / 180), e.shadowOffsetY = this.sh.d * Math.sin(Math.PI * this.sh.a / 180), e.shadowBlur = this.sh.b, e.shadowColor = a.ConvertRGBToRGBA(this.sh.c, this.sh.o));
            this.element.style.display = "block";
            this.element.style.position = "absolute";
            e = f.gc;
            e.save();
            l = 0;
            this.tr && (l = a.getAngleFromRotateStr(this.tr));
            m.rotateAngle = l;
            if (this.sh || 0 != l) e.translate((c.minX + c.maxX) / 2, (c.minY + c.maxY) / 2), 0 != l ? e.rotate(Math.PI * l / 180) : e.rotate(0.02 * Math.PI / 180), e.translate(-(c.minX + c.maxX) / 2, -(c.minY + c.maxY) / 2);
            m = 0;
            void 0 != this.canvasObj.ss && (m = this.canvasObj.ss);
            if ((m = this.draw(e, m)) && void 0 != this.currImage)(l = a.movie.im.images[this.currImage]) && l.nativeImage.complete ? (e.translate((c.minX + c.maxX) / 2, (c.minY + c.maxY) / 2), e.drawImage(l.nativeImage, -l.nativeImage.width / 2, -l.nativeImage.height / 2, l.nativeImage.width, l.nativeImage.height)) :
                m = !1;
            a.handleQuizzingItemsInReviewMode(this.element, j, this.parentDivName);
            e.restore();
            this.transIn && (this.element.parentElement.style.opacity = 0);
            this.isDrawn = m;
            !0 == this.isDrawn && this.drawComplete(d);
            a.isVisible(this) && this.playEffectsOnStart && ((c = this.parentObj.selfAnimationScript) && eval(c), this.playEffectsOnStart = !1)
        }
    };
    a.DrawingItem.prototype.draw = function(g, d) {
        switch (this.type) {
            case a.kCPOTOvalItem:
                this.drawOval(g, 0);
                break;
            case a.kCPOTAnswerArea:
            case a.kCPOTMatchingQuestionArea:
            case a.kCPOTMatchingAnswerArea:
            case a.kCPOTStageQuestionText:
            case a.kCPOTStageQuestionTitle:
            case a.kCPOTRectangleItem:
            case a.kCPOTLikertQuestionArea:
            case a.kCPOTLikertTotalGroupArea:
            case a.kCPOTScorableButtonItem:
            case a.kCPOTTextEntryButtonItem:
            case a.kCPOTRetakeButton:
            case a.kCPOTStageQuestionNextButton:
            case a.kCPOTStageQuestionClearButton:
            case a.kCPOTStageQuestionBackButton:
            case a.kCPOTStageQuestionReviewModeNextButton:
            case a.kCPOTStageQuestionReviewModeBackButton:
            case a.kCPOTStageQuestionSubmitButton:
            case a.kCPOTScoringReviewButton:
            case a.kCPOTScoringContinueButton:
            case a.kCPOTSubmitAllButton:
            case a.kCPOTResetButton:
            case a.kCPOTUndoButton:
            case a.kCPOTDDSubmitButton:
                this.drawRectangle(g,
                    0);
                break;
            case a.kCPOTPolygon:
                this.drawPolygon(g, 0);
                break;
            default:
                return !0
        }
        var c = 1;
        void 0 != this.canvasObj.fa && (c = this.canvasObj.fa / 100);
        var e = g.globalAlpha;
        g.globalAlpha = c;
        a.responsive && a.D[this.parentDivName].shouldShowDisabledState && (g.globalAlpha = 0.5);
        c = this.setFill(g);
        g.globalAlpha = e;
        if (0 != d && 0 < this.canvasObj.sw) switch (this.type) {
            case a.kCPOTOvalItem:
                this.drawOval(g, d);
                break;
            case a.kCPOTAnswerArea:
            case a.kCPOTMatchingQuestionArea:
            case a.kCPOTMatchingAnswerArea:
            case a.kCPOTStageQuestionText:
            case a.kCPOTStageQuestionTitle:
            case a.kCPOTRectangleItem:
            case a.kCPOTLikertQuestionArea:
            case a.kCPOTLikertTotalGroupArea:
            case a.kCPOTScorableButtonItem:
            case a.kCPOTTextEntryButtonItem:
            case a.kCPOTRetakeButton:
            case a.kCPOTStageQuestionNextButton:
            case a.kCPOTStageQuestionClearButton:
            case a.kCPOTStageQuestionBackButton:
            case a.kCPOTStageQuestionReviewModeNextButton:
            case a.kCPOTStageQuestionReviewModeBackButton:
            case a.kCPOTStageQuestionSubmitButton:
            case a.kCPOTScoringReviewButton:
            case a.kCPOTScoringContinueButton:
            case a.kCPOTSubmitAllButton:
            case a.kCPOTResetButton:
            case a.kCPOTUndoButton:
            case a.kCPOTDDSubmitButton:
                this.drawRectangle(g,
                    d);
                break;
            case a.kCPOTPolygon:
                this.drawPolygon(g, d);
                break;
            default:
                return !0
        }
        0 < this.canvasObj.sw && (g.lineWidth = this.canvasObj.sw, g.strokeStyle = this.canvasObj.sc, g.stroke());
        return c
    };
    a.DrawingItem.prototype.getTranslationValuesForTiletype = function() {
        var g = this.canvasObj;
        if (g) {
            var d = g.imgf;
            if (d) {
                var c = d.img.tiletype,
                    e = 0,
                    j = 0,
                    l = d.b[2] - d.b[0],
                    i = d.b[3] - d.b[1],
                    f = d.img.w,
                    d = d.img.h;
                a.responsive && (l = Math.floor(l * this.WFactor) + g.sw, i = Math.floor(i * this.HFactor) + g.sw);
                switch (c) {
                    case "t":
                        e = (l - f) / 2;
                        break;
                    case "tr":
                        e =
                            l - f;
                        break;
                    case "l":
                        j = (i - d) / 2;
                        break;
                    case "c":
                        e = (l - f) / 2;
                        j = (i - d) / 2;
                        break;
                    case "r":
                        e = l - imageWidthimageWidth;
                        j = (i - d) / 2;
                        break;
                    case "bl":
                        j = i - d;
                        break;
                    case "b":
                        e = (l - f) / 2;
                        j = i - d;
                        break;
                    case "br":
                        e = l - f, j = i - d
                }
                0 < e && (e = e % f - f);
                0 < j && (j = j % d - d);
                a.responsive || (e += g.b[0], j += g.b[1]);
                return {
                    x: e,
                    y: j
                }
            }
        }
    };
    a.DrawingItem.prototype.setFill = function(g) {
        var d = null,
            c = "",
            c = null,
            e = [],
            j = 0,
            l = 0,
            i = 0,
            f = 1,
            c = c = null,
            i = !0,
            k = 0,
            m = 0,
            e = k = 1,
            p = m = !1,
            o = g.canvas;
        if (0 == o.width || 0 == o.height) return !0;
        if (this.canvasObj.gf) {
            if (c = a.getGradientFill(this.canvasObj.gf,
                    g)) g.fillStyle = c
        } else if (this.canvasObj.imgf) {
            i = !1;
            d = this.canvasObj.imgf;
            if (void 0 == d.img || void 0 == d.img.ip) return !1;
            c = d.img.ip;
            if ((c = a.movie.im.images[c]) && c.nativeImage.complete) {
                i = d.s;
                if (f = d.t) d = this.getTranslationValuesForTiletype(), m = !0, g.translate(d.x, d.y), c = g.createPattern(c.nativeImage, "repeat"), g.fillStyle = c;
                else if (i) void 0 != this.canvasObj.b && 4 == this.canvasObj.b.length && (e = this.canvasObj.b, k = e[2] - e[0], h = e[3] - e[1], a.responsive && (k *= this.WFactor, h *= this.HFactor), k /= d.img.w, e = h / d.img.h, g.scale(k,
                    e), c = g.createPattern(c.nativeImage, "no-repeat"), g.fillStyle = c);
                else {
                    i = document.createElement("canvas");
                    f = i.getContext("2d");
                    o = g.canvas;
                    i.left = o.left;
                    i.right = o.right;
                    i.top = o.top;
                    i.bottom = o.bottom;
                    i.width = o.width;
                    i.height = o.height;
                    var o = c.nativeImage.width,
                        q = c.nativeImage.height,
                        j = d.b[2] - d.b[0],
                        l = d.b[3] - d.b[1];
                    a.responsive ? (j = Math.floor(j * this.WFactor) + this.canvasObj.sw, l = Math.floor(l * this.HFactor) + this.canvasObj.sw, j = -(o - j) / 2, l = -(q - l) / 2, f.translate(j, l)) : (m = (l - imageHeight) / 2, f.translate((j - o) / 2, m),
                        j = this.canvasObj.b[0], l = this.canvasObj.b[1], m = !0, g.translate(j, l));
                    d = f.globalAlpha;
                    f.globalAlpha = 0;
                    f.fillStyle = "#FFFFFF";
                    f.fill();
                    f.globalAlpha = d;
                    c = f.createPattern(c.nativeImage, "no-repeat");
                    f.fillStyle = c;
                    f.fillRect(0, 0, o, q);
                    c = g.createPattern(i, "no-repeat");
                    g.fillStyle = c
                }
                i = !0
            }
        } else this.canvasObj.bc ? g.fillStyle = this.canvasObj.bc : this.currImage && (p = !0, i = !1);
        i && g.fill();
        (1 != k || 1 != e) && g.scale(1 / k, 1 / e);
        m && g.translate(-j, -l);
        return i || p
    };
    a.DrawingItem.prototype.drawRectangle = function(g, d) {
        var c = 0,
            e = [],
            j = 0,
            l = 0,
            i = 0,
            f = i = 0,
            k = 0,
            e = 0;
        void 0 == this.canvasObj.b || 4 != this.canvasObj.b.length || ((e = this.canvasObj.b, j = e[2] - e[0], l = e[3] - e[1], i = j, l < j && (i = l), void 0 != this.canvasObj.cr && (c = this.canvasObj.cr, c = i * c / 100), i = e[0], f = e[1], k = e[2], e = e[3], a.responsive && (k = Math.round(this.WFactor * (k - i)), e = Math.round(this.HFactor * (e - f)), i = Math.round(this.WFactor * (i - i)), f = Math.round(this.HFactor * (f - f)), l = e - f, j = k - i), 0 != d) ? a.drawDashedRectangle(g, i, f, j, l, c, d) : (g.beginPath(), a.moveTo(g, i, e - c, d), a.lineTo(g, i, f + c, d), 0 < c && a.bezierCurveTo(g,
            i, f + c, i, f, i + c, f, d), a.lineTo(g, i + c, f, d), a.lineTo(g, k - c, f, d), 0 < c && a.bezierCurveTo(g, k - c, f, k, f, k, f + c, d), a.lineTo(g, k, f + c, d), a.lineTo(g, k, e - c, d), 0 < c && a.bezierCurveTo(g, k, e - c, k, e, k - c, e, d), a.lineTo(g, k - c, e, d), a.lineTo(g, i + c, e, d), 0 < c && a.bezierCurveTo(g, i + c, e, i, e, i, e - c, d), g.closePath()))
    };
    a.DrawingItem.prototype.drawOval = function(g, d) {
        var c = [],
            e = c = 0,
            j = 0,
            l = 0,
            i = 0,
            f = 0,
            k = 0,
            m = 0;
        void 0 == this.canvasObj.b || 4 != this.canvasObj.b.length || ((c = this.canvasObj.b, j = c[0], l = c[1], i = c[2], f = c[3], a.responsive && (j *= this.WFactor,
            l *= this.HFactor, i *= this.WFactor, f *= this.HFactor), c = (i - j) / 2, e = (f - l) / 2, k = 0.55285 * c, m = 0.55285 * e, 0 != d) ? a.drawDashedOval(g, (j + i) / 2, (l + f) / 2, c, e, d) : (g.beginPath(), a.moveTo(g, i, l + e, d), a.bezierCurveTo(g, i, l + e + m, j + c + k, f, j + c, f, d), a.bezierCurveTo(g, j + c - k, f, j, l + e + m, j, l + e, d), a.bezierCurveTo(g, j, l + e - m, j + c - k, l, j + c, l, d), a.bezierCurveTo(g, j + c + k, l, i, l + e - m, i, l + e, d), g.closePath()))
    };
    a.DrawingItem.prototype.drawPolygon = function(g, d) {
        var c = null,
            e = this.canvasObj.pta,
            j = 0;
        if (!(void 0 == e || 2 > e.length))
            if (0 != d) a.drawDashedPolyLine(g,
                e, d, this.WFactor, this.HFactor);
            else {
                g.beginPath();
                c = e[0];
                a.moveTo(g, this.WFactor * c.x, this.HFactor * c.y, d);
                for (j = 1; j < e.length; ++j) c = e[j], a.lineTo(g, this.WFactor * c.x, this.HFactor * c.y, d);
                g.closePath()
            }
    };
    a.DrawingItem.prototype.changeStateOnMouseEvents = function(g, d) {
        var c = null; - 1 == this.baseStateItemID ? c = this : this.cloneOfBaseStateItem && (c = a.getDisplayObjByCP_UID(this.baseStateItemID));
        c && void 0 !== c.HandleMouseEventOnStateItems && c.HandleMouseEventOnStateItems(g, this.parentStateType, d)
    };
    a.DrawingItem.prototype.HandleMouseEventOnStateItems =
        function(g, d, c) {
            var e = !1,
                j = a.D[this.parentDivName];
            j && (e = a.isValidItemForStateOptimization({
                n: this.parentDivName,
                t: j.type
            }));
            if ((e || this.parentStateType == a.kSTTNormal) && (!(j && void 0 != j.enabled) || j.enabled)) {
                var j = a.kSTTNone,
                    l = "";
                if (0 <= this.currentState && this.currentState < this.states.length) {
                    var i = this.states[this.currentState];
                    i && (j = i.stt, l = i.stn)
                }
                i = !(a.device == a.IDEVICE || a.device == a.ANDROID) || "mouseup" != g;
                if (!(!e && i && j != d)) {
                    var d = !1,
                        f = "",
                        k = !1;
                    if ("mouseover" == g) {
                        if ((j == a.kSTTNormal || j == a.kSTTCustom ||
                                j == a.kSTTVisited) && this.shouldShowRollOver)
                            if (d = !0, f = a.getLocalisedStateName("kCPRolloverState"), this.stateAtStartOfMouseEvents = l, a.BringBaseItemToFrontWithinState(this, a.getLocalisedStateName("kCPRolloverState")), a.device === a.DESKTOP && (g = a.GetMouseOverManager())) {
                                var m = this;
                                g.addMouseOverItem(this, function() {
                                    m.ForceMouseOut()
                                })
                            }
                    } else if ("mouseout" == g) {
                        if (j == a.kSTTRollOver || j == a.kSTTDown) d = !0, f = this.stateAtStartOfMouseEvents, a.device === a.DESKTOP && (g = a.GetMouseOverManager()) && g.removeMouseOverItem(this);
                        if (j == a.kSTTNormal || j == a.kSTTCustom || j == a.kSTTVisited) a.browser == a.CHROME && this.ignoreMouseOutEventOnNormal ? this.ignoreMouseOutEventOnNormal = !1 : this.shouldShowRollOver = !0
                    } else if ("mousedown" == g) {
                        if (j == a.kSTTNormal || j == a.kSTTRollOver || j == a.kSTTCustom || j == a.kSTTVisited)
                            if (d = !0, f = a.getLocalisedStateName("kCPDownState"), this.bShouldListenForMouseUpOnDownState = !0, j == a.kSTTNormal || j == a.kSTTCustom || j == a.kSTTVisited) this.stateAtStartOfMouseEvents = l, this.ignoreMouseOutEventOnNormal = !0
                    } else if ("mouseup" == g &&
                        (!i || j == a.kSTTDown)) d = !0, f = this.stateAtStartOfMouseEvents, this.shouldShowRollOver = !1, this.bShouldListenForMouseUpOnDownState && (k = !0);
                    d && (f !== a.getLocalisedStateName("kCPRolloverState") && a.ResetItemZIndicesWithinState(this, a.getLocalisedStateName("kCPRolloverState")), a.changeState(this.actualParent.id, f, !1));
                    k && !e && (!a.IsGestureSupportedDevice() && (a.shouldRelaxBrowserCheck(this.parentObj.type) || a.CHROME != a.browser && a.MSIE != a.browser || a.m_isLMSPreview)) && a.dispatchClickEvent(this.actualParent, c, {
                        asPartOfStateChange: !0
                    })
                }
            }
        };
    a.AnswerArea = function(g, d) {
        a.AnswerArea.baseConstructor.call(this, g, d);
        this.canvasElem = this.element
    };
    a.inherits(a.AnswerArea, a.DrawingItem);
    a.RectWithText = function(g, d) {
        a.RectWithText.baseConstructor.call(this, g, d);
        this.canvasElem = this.element;
        this.currImage = this.getAttribute("ip")
    };
    a.inherits(a.RectWithText, a.DrawingItem)
})(window.cp);