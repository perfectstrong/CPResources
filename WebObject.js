(function(b) {
    b.WebObject = function(a, d) {
        b.WebObject.baseConstructor.call(this, a);
        this.baseItemBoundingRect = null;
        this.visible = this.getAttribute("visible");
        this.parentDivName = this.getAttribute("dn");
        this.replaceCount = 0;
        var c = this.getAttribute("b");
        this._parentData = b.D[this.parentDivName];
        this.isParentOfTypeSlide = void 0 == this.parentData.type;
        this.modifyParent = !this.isParentOfTypeSlide;
        this.canvasID = a.id;
        this._canvasObj = b.D[this.canvasID];
        this.visible = b.isVisible(this);
        this.actualParent = document.getElementById(this.parentDivName);
        this.actualDrawingElement = this.element;
        this._bounds = {
            minX: c[0],
            minY: c[1],
            maxX: c[2],
            maxY: c[3]
        };
        c = this.getAttribute("vb");
        this._vbounds = {
            minX: c[0],
            minY: c[1],
            maxX: c[2],
            maxY: c[3],
            width: c[2] - c[0],
            height: c[3] - c[1]
        };
        this.args = d;
        this.isDrawn = !1;
        this._tr = this.getAttribute("tr");
        this._clientURI = this.getAttribute("wou");
        this._autoLoad = this.getAttribute("woal");
        this._useBorder = this.getAttribute("wob");
        this._useScroll = this.getAttribute("wos");
        this._loadingAnimation = this.getAttribute("wolanim");
        this._container =
            this.getAttribute("woc");
        this._windowsizingType = this.getAttribute("wows");
        this._windowWidth = this.getAttribute("woww");
        this._windowHeight = this.getAttribute("wowh");
        this._resourceType = this.getAttribute("wort");
        this._svgZoomVal = this.getAttribute("wosvgz");
        this._svgData = this.getAttribute("wosvg");
        b.responsive && (this.responsiveCSS = this.getAttribute("css"));
        this.webObjectCreated = !1;
        window && "https:" === window.location.protocol && (c = this.clientURI.indexOf("http:"), 0 == c && (this.clientURI = "https:" + this.clientURI.slice(c +
            5)));
        !1 == this.cloneOfBaseStateItem && -1 != this.baseStateItemID && (this.playEffectsOnStart = !0);
        b.setInitialVisibility(this)
    };
    b.inherits(b.WebObject, b.DisplayObject);
    Object.defineProperties(b.WebObject.prototype, {
        canvasObj: {
            get: function() {
                return this._canvasObj
            },
            set: function(a) {
                this.prevCanvasObj = this._canvasObj;
                this._canvasObj = a;
                this.prevCanvasObj.dn !== this._canvasObj.dn && (this._svgData = this._svgZoomVal = this._resourceType = this._windowHeight = this._windowWidth = this._windowsizingType = this._container = this._loadingAnimation =
                    this._useScroll = this._useBorder = this._autoLoad = this._clientURI = this._tr = this._parentData = this._vbounds = this._bounds = null, this.isDrawn = this.webObjectCreated = !1, a = this.canvasSwitchReason, this.drawIfNeeded(!0, a ? a : b.ReasonForDrawing.kItemStateChanged))
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
                        maxY: a[3]
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
        clientURI: {
            get: function() {
                this._clientURI || (this._clientURI = this.canvasObj.wou);
                return this._clientURI
            },
            set: function(a) {
                this._clientURI = a
            }
        },
        autoLoad: {
            get: function() {
                this._autoLoad || (this._autoLoad = this.canvasObj.woal);
                return this._autoLoad
            },
            set: function(a) {
                this._autoLoad = a
            }
        },
        useBorder: {
            get: function() {
                this._useBorder ||
                    (this._useBorder = this.canvasObj.wob);
                return this._useBorder
            },
            set: function(a) {
                this._useBorder = a
            }
        },
        useScroll: {
            get: function() {
                this._useScroll || (this._useScroll = this.canvasObj.wos);
                return this._useScroll
            },
            set: function(a) {
                this._useScroll = a
            }
        },
        loadingAnimation: {
            get: function() {
                this._loadingAnimation || (this._loadingAnimation = this.canvasObj.wolanim);
                return this._loadingAnimation
            },
            set: function(a) {
                this._loadingAnimation = a
            }
        },
        container: {
            get: function() {
                this._container || (this._container = this.canvasObj.woc);
                return this._container
            },
            set: function(a) {
                this._container = a
            }
        },
        windowsizingType: {
            get: function() {
                this._windowsizingType || (this._windowsizingType = this.canvasObj.wows);
                return this._windowsizingType
            },
            set: function(a) {
                this._windowsizingType = a
            }
        },
        windowWidth: {
            get: function() {
                this._windowWidth || (this._windowWidth = this.canvasObj.woww);
                return this._windowWidth
            },
            set: function(a) {
                this._windowWidth = a
            }
        },
        windowHeight: {
            get: function() {
                this._windowHeight || (this._windowHeight = this.canvasObj.wowh);
                return this._windowHeight
            },
            set: function(a) {
                this._windowHeight =
                    a
            }
        },
        resourceType: {
            get: function() {
                this._resourceType || (this._resourceType = this.canvasObj.wort);
                return this._resourceType
            },
            set: function(a) {
                this._resourceType = a
            }
        },
        svgZoomVal: {
            get: function() {
                this._svgZoomVal || (this._svgZoomVal = this.canvasObj.wosvgz);
                return this._svgZoomVal
            },
            set: function(a) {
                this._svgZoomVal = a
            }
        },
        svgData: {
            get: function() {
                this._svgData || (this._svgData = this.canvasObj.wosvg);
                return this._svgData
            },
            set: function(a) {
                this._svgData = a
            }
        },
        responsiveCSS: {
            get: function() {
                this._responsiveCSS || (this._responsiveCSS =
                    this.canvasObj.css);
                return this._responsiveCSS
            },
            set: function(a) {
                this._responsiveCSS = a
            }
        },
        parentData: {
            get: function() {
                this._parentData || (this._parentData = b.D[this.canvasObj.dn]);
                return this._parentData
            },
            set: function(a) {
                this._parentData = a
            }
        }
    });
    b.WebObject.prototype.start = function(a, b) {
        this.drawIfNeeded(a, b);
        if (!0 === this.svgData && (!this.effectIsStarted || a)) this.areDimensionsCalculated = !1, this.updateEffects(this.hasEffect), this.effectIsStarted = !0
    };
    b.WebObject.prototype.reset = function() {
        delete b.ropMap[this.element.id];
        this.isDrawn = !1;
        this.element.parentElement.width = "0";
        this.element.parentElement.height = "0";
        this.element.parentElement.style.width = "0px";
        this.element.parentElement.style.height = "0px";
        this.element.parentElement.left = "0";
        this.element.parentElement.top = "0";
        this.element.parentElement.style.left = "0px";
        this.element.parentElement.style.top = "0px";
        this.webObjectCreated = !1;
        $("#" + this.element.id).empty();
        this.effectIsStarted = !1
    };
    b.WebObject.prototype.drawForResponsive = function(a, d) {
        if (!this.responsiveCSS) return !1;
        if (this.isDrawn && !a) return b.initializeVisibilityForGroupedItem(this), !0;
        var c = b.getResponsiveCSS(this.responsiveCSS);
        b.getCSSFromLayouter(c, this);
        var e = void 0 != this.tr;
        if (this.isDrawn && this.currentCSS == c && !e && (!a || d == b.ReasonForDrawing.kMoviePaused)) return !0;
        d === b.ReasonForDrawing.kOrientationChangeOrResize && delete this.baseItemBoundingRect;
        this.currentCSS = c;
        e = 0;
        this.tr && (e = b.getAngleFromRotateStr(this.tr));
        !0 === this.svgData && (this.element.style.width = "100%", this.element.style.height = "100%");
        var f =
            this.element.parentElement;
        !0 === this.svgData ? d != b.ReasonForDrawing.kMoviePaused && (this.modifyParent && !this.isParentOfTypeSlide && b.applyResponsiveStyles(this.actualParent, c, !0), void 0 != this.isParentOfTypeSlide && !this.isParentOfTypeSlide && b.applyResponsiveStyles(f, c, !0)) : (b.applyResponsiveStyles(this.actualParent, c, !0), b.applyResponsiveStyles(f, c, !0));
        f.rotateAngle = e;
        this.tr && (!0 === this.svgData ? b.applyTransform(this.element, this.tr) : (b.applyTransform(f, this.tr), f.tr = this.tr));
        if (!this.webObjectCreated) {
            f.style.position =
                "absolute";
            f.style.color = "#00FF00";
            f.style.border = 0 == this.container && this.useBorder ? "1px solid #9A9A9A" : "0px";
            b.device == b.IDEVICE && (!0 === !this.svgData && (f.style.overflow = "scroll"), f.style["-webkit-overflow-scrolling"] = "touch");
            b.movie.stage.addToParentChildMap(this.parentDivName, this.element.id);
            if (!1 == this.autoLoad) {
                c = "clicktoload_" + this.element.id;
                jQuery("<div>", {
                    id: c,
                    style: "background:url(assets/htmlimages/Play_icon.png) no-repeat center center;background-color:#ffffff;position:absolute;margin:auto;top:0;left:0;right:0;bottom:0;"
                }).appendTo("#" +
                    this.element.id);
                var g = this;
                $("#" + c).click(function() {
                    g.loadWebObject();
                    $(this).hide()
                })
            } else this.loadWebObject();
            this.webObjectCreated = !0
        }
        this.positionWebObject();
        b.isVisible(this) || b._hide(this.parentDivName);
        this.isDrawn = !0;
        !0 === this.svgData && d != b.ReasonForDrawing.kMoviePaused && this.drawComplete(d);
        b.isVisible(this) && this.playEffectsOnStart && ((c = b.D[this.parentDivName].selfAnimationScript) && eval(c), this.playEffectsOnStart = !1);
        return !0
    };
    b.WebObject.prototype.drawIfNeeded = function(a, d) {
        if (b.responsive) this.drawForResponsive(a,
            d) && (this.tr && this.hasEffect) && (b.applyTransform(this.element, this.tr), !0 != this.svgData && b.applyTransform(this.element.parentElement, this.tr));
        else if (!this.isDrawn) {
            this.element.style.left = "0px";
            this.element.style.top = "0px";
            this.element.style.width = "100%";
            this.element.style.height = "100%";
            this.element.parentElement.style.left = this.bounds.minX + "px";
            this.element.parentElement.style.top = this.bounds.minY + "px";
            this.element.parentElement.style.width = this.bounds.maxX - this.bounds.minX + "px";
            this.element.parentElement.style.height =
                this.bounds.maxY - this.bounds.minY + "px";
            this.element.parentElement.style.position = "absolute";
            this.element.parentElement.style.color = "#00FF00";
            this.element.parentElement.style.border = 0 == this.container && this.useBorder ? "1px solid #9A9A9A" : "0px";
            b.device == b.IDEVICE && (!0 === !this.svgData && (this.element.parentElement.style.overflow = "scroll"), this.element.parentElement.style["-webkit-overflow-scrolling"] = "touch");
            b.movie.stage.addToParentChildMap(this.parentDivName, this.element.id);
            if (!1 == this.autoLoad) {
                var c =
                    "clicktoload_" + this.element.id;
                jQuery("<div>", {
                    id: c,
                    style: "background:url(assets/htmlimages/Play_icon.png) no-repeat center center;background-color:#ffffff;position:absolute;margin:auto;top:0;left:0;right:0;bottom:0;"
                }).appendTo("#" + this.element.id);
                var e = this;
                $("#" + c).click(function() {
                    e.loadWebObject();
                    $(this).hide()
                })
            } else this.loadWebObject();
            this.webObjectCreated = !0;
            rotateAngle = 0;
            this.tr && (!0 === this.svgData ? b.applyTransform(this.element, this.tr) : b.applyTransform(this.element.parentElement, this.tr),
                rotateAngle = b.getAngleFromRotateStr(this.tr));
            this.isDrawn = !0;
            this.drawComplete();
            b.isVisible(this) || b._hide(this.parentDivName);
            b.isVisible(this) && this.playEffectsOnStart && ((c = b.D[this.parentDivName].selfAnimationScript) && eval(c), this.playEffectsOnStart = !1)
        }
    };
    b.WebObject.prototype.loadWebObject = function() {
        var a = this;
        if (0 == this.container)
            if (!0 === this.svgData) this.loadSVG();
            else {
                var d = "no";
                this.useScroll && (d = "auto");
                var c = "myFrame_" + this.element.id,
                    e = "loading_" + this.element.id;
                jQuery("<iframe>", {
                    src: this.clientURI,
                    id: c,
                    allowtransparency: "true",
                    style: "visibility : hidden ; position:absolute ; border:0px;",
                    title: "Web Object",
                    scrolling: d,
                    width: this.element.parentElement.clientWidth,
                    height: this.element.parentElement.clientHeight
                }).appendTo("#" + this.element.id);
                this.loadingAnimation && jQuery("<div>", {
                    id: e,
                    style: "background:url(assets/htmlimages/loader_transparent.gif) no-repeat center center;background-color:#ffffff;position:absolute;margin:auto;top:0;left:0;right:0;bottom:0;"
                }).appendTo("#" + this.element.id);
                3 ==
                    this.resourceType && ($("#" + c).css("visibility", "visible"), $("#" + e).css("display", "none"));
                $("#" + c).load(function() {
                    if (a.visible) {
                        this.style.visibility = "visible";
                        $("#" + e).css("display", "none")
                    }
                })
            }
        else 1 == this.container && (d = "", 0 == this.windowsizingType ? d += ",top=0,left=0'" : 1 == this.windowsizingType ? d = d + ",width=" + screen.width + ",height=" + screen.height + ",top=0,left=0,fullscreen=yes'" : 2 == this.windowsizingType && (d = d + ",width=" + parseInt(this.windowWidth) + ",height=" + parseInt(this.windowHeight) + "'"), b.m_isPreview ?
            b.parentWindow.open(this.clientURI, "_blank", d) : b.currentWindow.open(this.clientURI, "_blank", d))
    };
    b.WebObject.prototype.positionWebObject = function() {
        var a = b("myFrame_" + this.element.id);
        a && (a.style.width = this.element.parentElement.clientWidth + "px", a.style.height = this.element.parentElement.clientHeight + "px")
    };
    b.WebObject.prototype.loadSVG = function() {
        this.element.innerHTML = '<object style="height:100%;width:100%;" onload={cp.OnSVGObjectLoaded(arguments[0],' + this.svgZoomVal + ');} type="image/svg+xml" data="' +
            this.clientURI + '"/>';
        var a = this.bounds;
        this.element.bounds = a;
        this.element.style.width = a.maxX - a.minX + "px";
        this.element.style.height = a.maxY - a.minY + "px";
        this.element.style.marginLeft = "0px";
        this.element.style.marginTop = "0px";
        if (this.actualParent) {
            this.actualParent.drawingBoard = this.element.parentElement;
            this.actualParent.drawingBoard.bounds = this.vbounds;
            var d = this.actualParent,
                c = a.minY,
                e = a.maxX - a.minX,
                f = a.maxY - a.minY;
            d.style.left = a.minX + "px";
            d.style.top = c + "px";
            d.style.width = e + "px";
            d.style.height = f + "px";
            this.tr && b.applyTransform(this.actualParent, this.tr)
        }
    }
})(window.cp)