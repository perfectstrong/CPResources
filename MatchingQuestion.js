cp.MatchingItem = function(a, c) {
    cp.MatchingItem.baseConstructor.call(this, a, c);
    this.canvasDivName = this.getAttribute("cn");
    this.labelCanvasDivName = this.getAttribute("ln");
    var d = this.getAttribute("b");
    this.bounds = {
        minX: d[0],
        minY: d[1],
        maxX: d[2],
        maxY: d[3]
    };
    d = this.getAttribute("vb");
    this.vbounds = {
        minX: d[0],
        minY: d[1],
        maxX: d[2],
        maxY: d[3]
    };
    this.answerHolderLeft = this.getAttribute("ahl");
    this.answerHolderTop = this.getAttribute("aht");
    this.sh = this.getAttribute("sh");
    this.args = c;
    cp.responsive && (this.responsiveCSS =
        this.getAttribute("css"))
};
cp.inherits(cp.MatchingItem, cp.Answer);
cp.MatchingItem.prototype.addAndGetResponsiveLabelCombo = function(a, c) {
    if (cp.responsive) {
        this.answerLabelCanvasNames = a.getAnswerLabels();
        document.getElementById(c.answerTextCanvasHolder);
        var d = cp(this.element.id + "_labelDD");
        d || (d = cp.newElem("div"), cp.fixWebkitScaling(d), d.id = this.element.id + "_labelDD", d.style.position = "absolute", d.style.left = "0px", d.style.top = "0px", d.style.width = "100%", d.style.height = "100%", this.answerLabelDivElem && this.answerLabelDivElem.appendChild(d));
        if ("" == d.innerHTML) {
            var e;
            e = "" + ("<select id='" + this.element.id + "_matchingLabel' name='" + this.group + "'>");
            for (var b = 0; b < this.answerLabelCanvasNames.length; ++b) {
                var f = cp.D[this.answerLabelCanvasNames[b]];
                e += "<option value='" + this.answerLabelCanvasNames[b] + "'  style='width:100%;height:100%;left:0px;top:0px;'>";
                f = cp.getAccessibilityString(f);
                e += f;
                e += "</option>"
            }
            document.getElementById(d.id).innerHTML = e + "</select> ";
            var j = document.getElementById(this.element.id + "_matchingLabel");
            j.style.width = "100%";
            j.style.height = "100%";
            j.style.position =
                "absolute";
            j.style.zIndex = 1E3;
            j.style.opacity = 0;
            var h = this;
            j.onchange = function() {
                h.element.oHandler.setIndex(j.selectedIndex)
            };
            d = "<img id='" + this.element.id + "_spanImageArrow' class='spanArrow' style='position:absolute;right:5px;margin:auto;top:0px;bottom:0px;'>";
            d += "<div id='" + this.element.id + "_spanImage' style='position:absolute;left:5px; top:5px;height:100%;width:100%;'/>";
            e = cp(this.element.id + "spanComboBoxTitleImage");
            e || (e = cp.newElem("span"), e.id = this.element.id + "spanComboBoxTitleImage", e.className =
                "spanComboBox", e.innerHTML = d, e.style.width = "100%", e.style.height = "100%", this.answerLabelDivElem.appendChild(e));
            var g = document.getElementById(this.element.id + "_spanImage");
            j.setNewIndex = function(b) {
                if (b != -1) {
                    h.answerLabelCanvasName = h.answerLabelCanvasNames[b];
                    var a = cp.D[h.answerLabelCanvasName];
                    j.selectedIndex = b;
                    h.element.drawLine(h.m_questionObj.getXYForColumn2Option(a.aid, h.element));
                    if (g)
                        if (b = cp.D[a.dn]) g.innerHTML = b.rpvt[cp.ResponsiveProjWidth].vt
                } else {
                    cp.verbose && cp.log("Inside setNewIndex : " +
                        b);
                    h.answerLabelCanvasName = "";
                    j.selectedIndex = -1;
                    j.value = "";
                    j.text = "";
                    if (g) g.innerHTML = ""
                }
            };
            this.sh && (d = this.sh.a, cp.applyShadow(this.element, this.sh.d * Math.cos(Math.PI * d / 180) + "px " + this.sh.d * Math.sin(Math.PI * d / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" : "")));
            j.resetIndex = function() {
                h.element.oHandler.setIndex(-1)
            };
            j.setIndex = function(b) {
                h.element.oHandler.setNewIndex(b)
            };
            j.getIndex = function() {
                return h.element.oHandler.selectedIndex
            };
            j.disable = function() {
                h.element.oHandler.disabled =
                    "disabled"
            };
            j.getWidth = function() {
                return parseFloat(h.element.oHandler.style.width)
            };
            e = j
        }
        return e
    }
};
cp.MatchingItem.prototype.drawForResponsive = function(a) {
    if (this.m_questionObj && this.m_questionObj.getIsStarted()) {
        if (!this.responsiveCSS) return !1;
        if (this.isDrawn && !a) return !0;
        var c = cp.getResponsiveCSS(this.responsiveCSS);
        cp.getCSSFromLayouter(c, this);
        var d = !1,
            d = this.re || this.sh && !this.sh.i,
            e = void 0 != this.tr;
        if (this.currentCSS == c && !d && !e && !a) return !0;
        this.currentCSS = c;
        a = this.element.id;
        if (cp.movie.playbackController && (d = cp.movie.playbackController.GetQuizController())) {
            d.GetIsInReviewMode();
            var b =
                this.m_questionObj.shouldDisableOptions(),
                d = cp.movie.stage.getSlideDiv(),
                e = d.firstChild;
            d.getBoundingClientRect();
            this.group = this.m_questionObj.getAnswerGroupName();
            var f = cp.D[a];
            this.isSkipped = this.isCorrect = !1;
            var j = b ? "default" : "pointer";
            this.currentOptionObj || (this.currentOptionObj = this.m_questionObj.getAnswerOption(a), this.answerTextCanvasDivName = this.currentOptionObj.name, f.answerTextDivName = this.answerTextCanvasDivName);
            var h = cp.D[this.answerTextCanvasDivName];
            this.zIndex = cp.D[f.actid].zIndex;
            var g = this,
                k = cp.movie.stage.getSlideDiv();
            this.element.drawLine = function(b) {
                var a = false;
                if (b == void 0) {
                    var d = cp(g.lLineCanvasID + "_matchingLineCanvasDiv");
                    if (d == void 0) return;
                    d.innerHTML = "";
                    g.answerLabelCanvasName = g.answerLabelCanvasNames[g.element.oHandler.getIndex()];
                    b = g.m_questionObj.getXYForColumn2Option(cp.D[g.answerLabelCanvasName].aid, g.element);
                    a = true
                }
                var c = k.getBoundingClientRect(),
                    d = g.element.parentElement.getBoundingClientRect(),
                    e = (d.left + d.width - c.left) / cp("div_Slide").scaleFactor,
                    c = (d.top +
                        d.height / 2 - c.top) / cp("div_Slide").scaleFactor,
                    f = b.x,
                    b = b.y;
                if (cp.verbose) {
                    cp.log("lElemBoundingRect.left : " + d.left);
                    cp.log("lElemBoundingRect.top : " + d.top);
                    cp.log("lElemBoundingRect.width : " + d.width);
                    cp.log("lElemBoundingRect.height : " + d.height);
                    cp.log("startX : " + e);
                    cp.log("startY : " + c);
                    cp.log("endX : " + f);
                    cp.log("endY : " + b)
                }
                var i = e < f ? e : f,
                    h = c < b ? c : b,
                    j = f - e > 0 ? f - e : e - f,
                    m = b - c > 0 ? b - c : c - b;
                g.lLineCanvasID = g.element.id + "_Line";
                d = document.getElementById(g.lLineCanvasID + "_matchingLineCanvasDiv");
                if (d == void 0 &&
                    !a) {
                    d = cp.newElem("div");
                    cp.fixWebkitScaling(d);
                    d.id = g.lLineCanvasID + "_matchingLineCanvasDiv"
                } else d.innerHTML = "";
                d.style.display = "block";
                d.style.position = "absolute";
                d.style.left = i - 10 + "px";
                d.style.top = h - 10 + "px";
                d.style.width = j + 20 + "px";
                d.style.height = m + 20 + "px";
                cp.addRewrapObjectAsPerRestOfProjectItem(d);
                a = cp.newElem("canvas");
                a.id = g.lLineCanvasID + "_matchingLineCanvas";
                d.appendChild(a);
                d.style.zIndex = g.zIndex;
                a.width = j + 20;
                a.height = m + 20;
                j = a.getContext("2d");
                j.beginPath();
                j.moveTo(e - parseFloat(d.style.left),
                    c - parseFloat(d.style.top));
                j.lineTo(f - parseFloat(d.style.left), b - parseFloat(d.style.top));
                j.stroke();
                a.style.display = "block"
            };
            this.element.resetMatch = function() {
                g.element.oHandler.resetIndex();
                var b = document.getElementById(g.lLineCanvasID + "_matchingLineCanvasDiv");
                b != void 0 && b.parentElement && b.parentElement.removeChild(b)
            };
            this.element.removeOpenReviewAreas = function() {
                var b = document.getElementById(g.m_questionObj.getAssociatedObjName()),
                    a = document.getElementById(g.element.id + "_correctMatchingReview");
                a != void 0 && b.parentNode.removeChild(a)
            };
            this.element.addReviewButton = function() {
                var b = document.getElementById(g.m_questionObj.getAssociatedObjName()),
                    a = g.element,
                    d = g.element.id + "_reviewButton",
                    c = document.getElementById(d);
                c || (c = cp.newElem("img"));
                c.id = d;
                cp.fixWebkitScaling(c);
                c.className = "sequenceReviewImage";
                c.style.position = "absolute";
                var d = k.getBoundingClientRect(),
                    e = a.parentElement.getBoundingClientRect();
                c.style.left = e.left - d.left + "px";
                c.style.top = e.bottom - d.top + "px";
                g.reviewButtonCH = function(b) {
                    if (!cp.disableInteractions) {
                        var d =
                            a.id + "_correctMatchingReview",
                            c = document.getElementById(d);
                        c == void 0 && (c = cp.newElem("div"));
                        cp.fixWebkitScaling(c);
                        var e = "cp-reviewUL";
                        cp.MSIE == cp.browser && (e = "cp-reviewULIE");
                        for (var e = "<ul class='" + e + "' style='padding-left:20px;padding-right:20px'>", f = 0; f < g.m_questionObj.Column2Options.length; ++f) {
                            var i = cp.D[g.m_questionObj.Column2Options[f]],
                                h = cp.D[cp.D[i.dn + "mtcha"].cn];
                            i.aid == cp.D[cp.D[a.id].answerTextDivName].aid && (e = e + ("<li>" + cp.getAccessibilityString(h) + cp(i.dn + "c-vtext").innerText + "</li>"))
                        }
                        e =
                            e + "</ul>" + ("<img id='matchingReviewCloseButton' src='" + cp.movie.im.m_projectImages["assets/htmlimages/closeReviewButton.png"].nativeImage.src + "' style='right:6px;top:6px;position:absolute'>");
                        c.id = d;
                        c.className = "sequenceReviewArea";
                        c.style.position = "absolute";
                        f = document.getElementById(a.id + "_reviewButton");
                        d = k.getBoundingClientRect();
                        f = f.getBoundingClientRect();
                        c.style.left = f.right - d.left + "px";
                        c.style.top = f.top - d.top + "px";
                        c.innerHTML = e;
                        b.stopPropagation && b.stopPropagation();
                        g.m_questionObj.showReviewArea(c)
                    }
                };
                cp.registerGestureEvent(c, cp.GESTURE_EVENT_TYPES.TAP, g.reviewButtonCH);
                b.parentNode.appendChild(c);
                c.style.zIndex = 1E3
            };
            this.element.disableOption = function() {
                b = true;
                g.element.tabIndex = -1
            };
            this.answertextParentDiv = cp(this.element.id + "canvasHolder");
            if (!this.answertextParentDiv && (this.answertextParentDiv = cp.newElem("div"), cp.fixWebkitScaling(this.answertextParentDiv), cp.addRewrapObjectAsPerRestOfProjectItem(this.answertextParentDiv), this.answertextParentDiv.id = this.element.id + "canvasHolder", f.answerTextCanvasHolder =
                    this.answertextParentDiv.id, this.answertextParentDiv.setAttribute("class", "cp-rewrap"), this.answertextParentDiv.style.zIndex = this.zIndex, cp.applyResponsiveStyles(this.answertextParentDiv, c), this.adjustPositionWithAnswerArea(c, this.answertextParentDiv), this.matchingAnswerCanvasElement = cp(this.answerTextCanvasDivName), this.matchingAnswerCanvasElement || (this.matchingAnswerCanvasElement = cp.newElem("canvas"), canvas = this.canvas = cp.createCanvas(0, 0, cp.D.project.w, cp.D.project.h, this.matchingAnswerCanvasElement),
                        this.matchingAnswerCanvasElement.setAttribute("class", "cp-shape"), this.matchingAnswerCanvasElement.setAttribute("name", this.group), this.matchingAnswerCanvasElement.id = this.answerTextCanvasDivName, this.answertextParentDiv.appendChild(this.matchingAnswerCanvasElement)), !this.answertextCanvasShape)) this.answertextCanvasShape = new cp.Shape(this.matchingAnswerCanvasElement, cp.D[this.answerTextCanvasDivName]), this.answertextCanvasShape.modifyParent = !1, this.answertextCanvasShape.start(), h && cp.updateVarText(cp(h.dn), !0, !0);
            var h = cp.D[this.labelCanvasDivName],
                i = h.dn,
                m = document.getElementById(this.labelCanvasDivName);
            m && (this.answerLabelCanvasParentElement = m.parentElement);
            this.answerLabelDivElem = document.getElementById(i);
            cp.applyResponsiveStyles(this.answerLabelDivElem, h.css[cp.ResponsiveProjWidth]);
            this.element.oHandler ? this.element.oHandler.setIndex(this.element.oHandler.getIndex()) : (i = this.m_questionObj.getSelectedIndex(this.currentOptionObj.selectedAnswerLabel), this.element.oHandler = this.addAndGetResponsiveLabelCombo(this.m_questionObj,
                f, i), f.oHandler = this.element.oHandler, this.element.oHandler.setIndex(i), -1 == i && (this.isSkipped = !0), this.isCorrect = this.m_questionObj.getIsOptionCorrect(this.element, i));
            cp.applyResponsiveStyles(this.element.parentElement, c);
            this.adjustPositionWithAnswerArea(f.css[cp.ResponsiveProjWidth], this.matchingAnswerCanvasElement.parentElement, !0);
            this.adjustPositionWithAnswerArea(f.css[cp.ResponsiveProjWidth], this.element.parentElement, !0);
            this.matchingAnswerCanvasElement.parentElement.getBoundingClientRect();
            this.answerLabelDivElem.getBoundingClientRect();
            this.adjustPositionWithAnswerArea(h.css[cp.ResponsiveProjWidth], this.answerLabelDivElem, !0);
            this.adjustPositionWithAnswerArea(h.css[cp.ResponsiveProjWidth], this.answerLabelCanvasParentElement, !0);
            e.insertBefore(this.answertextParentDiv, this.answerLabelCanvasParentElement);
            d.insertBefore(this.element.parentElement, this.answerLabelDivElem);
            this.element.style.left = "0px";
            this.element.style.top = "0px";
            this.element.style.width = "100%";
            this.element.style.height =
                "100%";
            this.element.style.cursor = j;
            this.element.style.borderRadius = "5px";
            this.element.style.position = "absolute";
            this.element.style.background = "#000000";
            this.element.style.opacity = 0;
            b || this.m_questionObj.addDragEvents(this.element.id);
            this.element.parentElement.getBoundingClientRect();
            this.element.getBoundingClientRect();
            cp(this.answerAreaItemName).getBoundingClientRect();
            b && (this.element.style.cursor = "default", this.element.oHandler.disable(), this.element.tabIndex = -1, this.m_questionObj.getWasJudged() &&
                this.m_questionObj.canShowReviewIcons() && (this.m_questionObj.getAnsweredCorrectly() ? this.reviewIconImage || (this.reviewIconImage = cp.newElem("img"), this.reviewIconImage.id = a + "_reviewCorrect", this.reviewIconImage.src = cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src, this.reviewIconImage.tabIndex = -1, this.reviewIconImage.style.position = "absolute", this.answerLabelDivElem.appendChild(this.reviewIconImage), this.reviewIconImage.style.zIndex = this.zIndex, g.sh && (c = g.sh.a,
                    cp.applyShadow(this.reviewIconImage, g.sh.d * Math.cos(Math.PI * c / 180) + "px " + g.sh.d * Math.sin(Math.PI * c / 180) + "px " + g.sh.b + "px " + cp.ConvertRGBToRGBA(g.sh.c, g.sh.o) + (g.sh.i ? " inset" : "") + (g.sh.i ? " inset" : "")))) : (c = this.isCorrect ? cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src : this.isSkipped ? cp.movie.im.m_projectImages["assets/htmlimages/skip_answer_normal.png"].nativeImage.src : cp.movie.im.m_projectImages["assets/htmlimages/incorrect_answer_normal.png"].nativeImage.src,
                    this.reviewIconImage || (this.reviewIconImage = cp.newElem("img"), this.reviewIconImage.id = a + "_reviewIncorrect", this.reviewIconImage.src = c, this.reviewIconImage.tabIndex = -1, this.reviewIconImage.style.position = "absolute", this.answerLabelDivElem.appendChild(this.reviewIconImage), this.isCorrect || this.element.addReviewButton(), this.reviewIconImage.style.zIndex = this.zIndex, g.sh && (c = g.sh.a, cp.applyShadow(this.reviewIconImage, g.sh.d * Math.cos(Math.PI * c / 180) + "px " + g.sh.d * Math.sin(Math.PI * c / 180) + "px " + g.sh.b + "px " +
                        cp.ConvertRGBToRGBA(g.sh.c, g.sh.o) + (g.sh.i ? " inset" : ""))))), this.reviewIconImage.style.left = "-20px", this.reviewIconImage.style.top = "0px"));
            this.isDrawn || this.m_questionObj.registerColumn1Option(this.element);
            this.isDrawn = !0;
            this.visible || (this.element.style.visibility = "hidden");
            return !0
        }
    }
};
cp.MatchingItem.prototype.addAndGetLabelCombo = function(a, c) {
    if (!cp.responsive) {
        this.answerLabelCanvasNames = a.getAnswerLabels();
        var d = cp.D[this.answerLabelCanvasNames[0]].b;
        if (4 == d.length)
            for (var e = 0; 4 > e; ++e) d[e] = parseFloat(d[e]);
        else d = [0, 0, 0, 0];
        this.answerLabelCanvasImageBounds = {
            minX: d[0],
            minY: d[1],
            maxX: d[2],
            maxY: d[3]
        };
        var e = this.answerLabelCanvasImageBounds.maxX - this.answerLabelCanvasImageBounds.minX,
            b = this.answerLabelCanvasImageBounds.maxY - this.answerLabelCanvasImageBounds.minY;
        document.getElementById(c.answerTextCanvasHolder);
        var f = cp.newElem("div");
        cp.fixWebkitScaling(f);
        f.id = this.element.id + "_labelDD";
        f.style.position = "absolute";
        f.style.left = "0px";
        f.style.top = "-2px";
        f.style.width = e + "px";
        f.style.height = b + "px";
        this.element.parentElement.appendChild(f);
        var j = cp.movie.im;
        if ("" == f.innerHTML) {
            var h;
            h = "" + ("<select class='mydds' id='" + this.element.id + "_matchingLabel' name='" + this.group + "'>");
            for (var g = 0; g < this.answerLabelCanvasNames.length; ++g) {
                var k = cp.D[this.answerLabelCanvasNames[g]],
                    i = k.lip;
                j && j.getImageDataURI(i, function(b) {
                    i =
                        b
                });
                h += "<option value='" + this.answerLabelCanvasNames[g] + "' style='position:absolute;width:" + e + "px' title='" + i + "'>";
                h = cp.DESKTOP != cp.device ? h + k.accstr : h + (k.accstr + a.getTextForColumn2Option(cp.trimStartingAndTrailingSpaces(k.accstr)));
                h += "</option>"
            }
            document.getElementById(f.id).innerHTML = h + "</select> ";
            var m = document.getElementById(this.element.id + "_matchingLabel");
            m.style.width = e + 30 + "px";
            m.style.height = b + "px";
            m.style.position = "absolute";
            m.style.zIndex = 1E3;
            if (cp.DESKTOP != cp.device) {
                var s;
                m.style.opacity =
                    0;
                var l = this;
                m.onchange = function() {
                    l.element.oHandler.setIndex(m.selectedIndex)
                };
                d = "<img id='" + this.element.id + "_spanImage' style='position:absolute;top:2px; left:5px; width:" + e + "px; height:" + b + "px;'/>";
                d += "<img id='" + this.element.id + "_spanImageArrow' class='spanArrow' style='position:absolute;left:" + (e + 5) + "px;top:3px'/>";
                f = cp.newElem("span");
                f.id = "spanComboBoxTitleImage";
                f.className = "spanComboBox";
                f.innerHTML = d;
                f.style.width = e + 30 + "px";
                f.style.height = b + 3 + "px";
                this.answerLabelDivElem.appendChild(f);
                var n = document.getElementById(this.element.id + "_spanImage");
                m.setNewIndex = function(b) {
                    if (-1 != b) {
                        l.answerLabelCanvasName = l.answerLabelCanvasNames[b];
                        var a = cp.D[l.answerLabelCanvasName];
                        s = a.ip;
                        j && j.getImageDataURI(s, function(b) {
                            s = b
                        });
                        m.selectedIndex = b;
                        l.element.drawLine(l.questionObj.getXYForColumn2Option(a.aid, l.element))
                    } else cp.verbose && cp.log("Inside setNewIndex : " + b), l.answerLabelCanvasName = "", s = "assets/htmlimages/placeholder.png", m.selectedIndex = -1, m.value = "", m.text = "";
                    n.style.display = "none";
                    n.src = s;
                    n.onload = setTimeout(function() {
                        -1 != m.selectedIndex && (n.style.display = "block")
                    }, 100)
                };
                this.answerLabelDivElem.style.position = "absolute";
                this.answerLabelDivElem.style.left = this.answerHolderLeft - e - 40 + "px";
                this.answerLabelDivElem.style.width = e + "px";
                this.answerLabelDivElem.style.height = b + "px";
                this.sh && (e = this.sh.a, cp.applyShadow(this.element, this.sh.d * Math.cos(Math.PI * e / 180) + "px " + this.sh.d * Math.sin(Math.PI * e / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" :
                    "")));
                m.resetIndex = function() {
                    l.element.oHandler.setIndex(-1)
                };
                m.setIndex = function(b) {
                    l.element.oHandler.setNewIndex(b)
                };
                m.getIndex = function() {
                    return l.element.oHandler.selectedIndex
                };
                m.disable = function() {
                    l.element.oHandler.disabled = "disabled"
                };
                m.getWidth = function() {
                    return parseFloat(l.element.oHandler.style.width)
                };
                h = m
            } else {
                m.style.position = "absolute";
                m.style.left = "10px";
                m.style.width = e + 30 + "px";
                m.style.height = b + "px";
                jQuery("#" + this.element.id + "_matchingLabel").css("width", e + 30);
                var l = this,
                    o = function(b) {
                        -1 !=
                            b && (l.answerLabelCanvasName = l.answerLabelCanvasNames[b], l.element.drawLine(l.questionObj.getXYForColumn2Option(cp.D[l.answerLabelCanvasName].aid, l.element)))
                    };
                h = jQuery("#" + this.element.id + "_matchingLabel").msDropDown({
                    style: "position:fixed, z-index:1000;left:" + (d.minX + 20) + "px, top:" + d.minY + "px, height:" + b + "px, width:" + e + "px,",
                    on: {
                        close: function() {
                            var b = l.element.oHandler.get("selectedIndex");
                            o(b);
                            l.element.parentElement.style.zIndex = l.zIndex
                        }
                    }
                }, "").data("dd");
                h.set("width", e + 30);
                this.sh && (e = this.sh.a,
                    cp.applyShadow(this.element, this.sh.d * Math.cos(Math.PI * e / 180) + "px " + this.sh.d * Math.sin(Math.PI * e / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" : "")));
                var p = h.open;
                h.open = function(b) {
                    l.element.parentElement.style.zIndex = 1E3;
                    b.preventDefault();
                    b.stopPropagation();
                    p()
                };
                cp.addDCHDiv(f, function(b) {
                    l.element.oHandler.open(b)
                });
                h.resetIndex = function() {
                    l.element.oHandler.setIndex(-1)
                };
                h.setIndex = function(b) {
                    l.element.oHandler.set("selectedIndex", b);
                    o(b)
                };
                h.getIndex =
                    function() {
                        return l.element.oHandler.get("selectedIndex")
                    };
                h.disable = function() {
                    l.element.oHandler.set("disabled", true)
                };
                h.getWidth = function() {
                    return l.element.oHandler.get("width")
                };
                m.onchange = function(b) {
                    l.element.oHandler.setIndex(m.selectedIndex);
                    b.preventDefault();
                    return false
                }
            }
        }
        return h
    }
};
cp.MatchingItem.prototype.addIfNeeded = function(a) {
    if (!cp.responsive || !this.drawForResponsive(a))
        if (a = cp.getQuestionObject(this.relatedQuestionSlide))
            if (this.questionObj = a, !this.isDrawn && a.getIsStarted()) {
                var c = this.element.id;
                if (cp.movie.playbackController) {
                    var d = cp.movie.playbackController.GetQuizController();
                    if (d) {
                        d.GetIsInReviewMode();
                        var e = a.shouldDisableOptions(),
                            b = document.getElementById(this.labelCanvasDivName),
                            f = cp.movie.stage.getSlideDiv().firstChild;
                        this.group = a.getAnswerGroupName();
                        var j =
                            cp.D[c];
                        this.isSkipped = this.isCorrect = !1;
                        var d = e ? "default" : "pointer",
                            h = a.getAnswerOption(c);
                        this.answerTextCanvasDivName = h.name;
                        var g = cp.D[this.answerTextCanvasDivName];
                        j.answerTextDivName = this.answerTextCanvasDivName;
                        this.zIndex = cp.D[j.actid].zIndex;
                        g = g.b;
                        if (4 == g.length)
                            for (var k = 0; 4 > k; ++k) g[k] = parseFloat(g[k]);
                        else g = [0, 0, 0, 0];
                        this.answerTextCanvasImageBounds = {
                            minX: g[0],
                            minY: g[1],
                            maxX: g[2],
                            maxY: g[3]
                        };
                        var i = this;
                        this.element.drawLine = function(b) {
                            if (void 0 != b) {
                                var a = parseFloat(i.element.parentElement.style.left) +
                                    parseFloat(i.element.parentElement.style.width),
                                    d = parseFloat(i.element.parentElement.style.top) + parseFloat(i.element.parentElement.style.height) / 2,
                                    c = b.x,
                                    b = b.y;
                                cp.verbose && (cp.log("self.element.parentElement.style.left : " + i.element.parentElement.style.left), cp.log("self.element.parentElement.style.top : " + i.element.parentElement.style.top), cp.log("self.element.parentElement.style.width : " + i.element.parentElement.style.width), cp.log("self.element.parentElement.style.height : " + i.element.parentElement.style.height),
                                    cp.log("startX : " + a), cp.log("startY : " + d), cp.log("endX : " + c), cp.log("endY : " + b));
                                var g = a < c ? a : c,
                                    e = d < b ? d : b,
                                    f = 0 < c - a ? c - a : a - c,
                                    h = 0 < b - d ? b - d : d - b;
                                i.lLineCanvasID = i.element.id + a.toString() + d.toString();
                                var k = document.getElementById(i.lLineCanvasID + "_matchingLineCanvasDiv");
                                void 0 == k ? (k = cp.newElem("div"), cp.fixWebkitScaling(k), k.id = i.lLineCanvasID + "_matchingLineCanvasDiv") : k.innerHTML = "";
                                k.style.display = "block";
                                k.style.position = "absolute";
                                k.style.left = g - 10 + "px";
                                k.style.top = e - 10 + "px";
                                k.style.width = f + 20 + "px";
                                k.style.height = h + 20 + "px";
                                cp.addRewrapObjectAsPerRestOfProjectItem(k);
                                g = cp.newElem("canvas");
                                g.id = i.lLineCanvasID + "_matchingLineCanvas";
                                k.appendChild(g);
                                k.style.zIndex = i.zIndex;
                                g.width = f + 20;
                                g.height = h + 20;
                                f = g.getContext("2d");
                                f.beginPath();
                                f.moveTo(a - parseFloat(k.style.left), d - parseFloat(k.style.top));
                                f.lineTo(c - parseFloat(k.style.left), b - parseFloat(k.style.top));
                                f.stroke();
                                g.style.display = "block"
                            }
                        };
                        this.element.resetMatch = function() {
                            i.element.oHandler.resetIndex();
                            var b = document.getElementById(i.lLineCanvasID +
                                "_matchingLineCanvasDiv");
                            void 0 != b && b.parentElement && b.parentElement.removeChild(b)
                        };
                        this.element.removeOpenReviewAreas = function() {
                            var b = document.getElementById(i.questionObj.getAssociatedObjName()),
                                a = document.getElementById(i.element.id + "_correctMatchingReview");
                            void 0 != a && b.parentNode.removeChild(a)
                        };
                        this.element.addReviewButton = function() {
                            var b = document.getElementById(i.questionObj.getAssociatedObjName()),
                                a = i.element,
                                d = i.element.id + "_reviewButton",
                                c = document.getElementById(d);
                            c || (c = cp.newElem("img"));
                            c.id = d;
                            cp.fixWebkitScaling(c);
                            c.className = "sequenceReviewImage";
                            c.style.position = "absolute";
                            c.style.left = parseFloat(a.parentElement.style.left) + parseFloat(a.style.left) + "px";
                            c.style.top = parseFloat(a.parentElement.style.top) + parseFloat(a.parentElement.style.height) + "px";
                            cp.registerGestureEvent(c, cp.GESTURE_EVENT_TYPES.TAP, function(b) {
                                if (!cp.disableInteractions) {
                                    var d = a.id + "_correctMatchingReview",
                                        c = document.getElementById(d);
                                    void 0 == c && (c = cp.newElem("div"));
                                    cp.fixWebkitScaling(c);
                                    var g = "cp-reviewUL";
                                    cp.MSIE == cp.browser && (g = "cp-reviewULIE");
                                    for (var g = "<ul class='" + g + "' style='padding-left:20px;padding-right:20px'>", e = 0; e < i.questionObj.Column2Options.length; ++e) {
                                        var f = cp.D[i.questionObj.Column2Options[e]],
                                            k = cp.D[cp.D[f.dn + "mtcha"].cn];
                                        f.aid == cp.D[cp.D[a.id].answerTextDivName].aid && (g += "<li>" + cp.getAccessibilityString(k) + f.atxtlms + "</li>")
                                    }
                                    g = g + "</ul>" + ("<img id='matchingReviewCloseButton' src='" + cp.movie.im.m_projectImages["assets/htmlimages/closeReviewButton.png"].nativeImage.src + "' style='right:6px;top:6px;position:absolute'>");
                                    c.id = d;
                                    c.className = "sequenceReviewArea";
                                    c.style.position = "absolute";
                                    d = document.getElementById(a.id + "_reviewButton");
                                    c.style.left = parseFloat(d.style.left) + parseFloat(d.width) + 10 + "px";
                                    c.style.top = parseFloat(d.style.top) + "px";
                                    c.innerHTML = g;
                                    b.stopPropagation && b.stopPropagation();
                                    i.questionObj.showReviewArea(c)
                                }
                            });
                            b.parentNode.appendChild(c);
                            c.style.zIndex = 1E3
                        };
                        this.element.disableOption = function() {
                            e = !0;
                            i.element.tabIndex = -1
                        };
                        g = cp.newElem("div");
                        cp.fixWebkitScaling(g);
                        cp.addRewrapObjectAsPerRestOfProjectItem(g);
                        g.id = this.element.id + "canvasHolder";
                        j.answerTextCanvasHolder = g.id;
                        g.setAttribute("class", "cp-rewrap");
                        k = cp.newElem("canvas");
                        canvas = this.canvas = cp.createCanvas(0, 0, cp.D.project.w, cp.D.project.h, k);
                        k.setAttribute("class", "cp-shape");
                        k.setAttribute("name", this.group);
                        k.id = this.answerTextCanvasDivName;
                        g.appendChild(k);
                        g.style.zIndex = this.zIndex;
                        var m = new cp.Shape(k, cp.D[this.answerTextCanvasDivName]);
                        m.modifyParent = !1;
                        m.start();
                        f.removeChild(b.parentElement);
                        this.answerLabelDivElem = document.getElementById(cp.D[this.labelCanvasDivName].dn);
                        b = a.getSelectedIndex(h.selectedAnswerLabel);
                        this.element.oHandler = this.addAndGetLabelCombo(a, j, b);
                        j.oHandler = this.element.oHandler;
                        this.element.oHandler.setIndex(b);
                        j = parseFloat(this.element.oHandler.getWidth()) + 10;
                        f = this.answerHolderTop;
                        k.style.left = j + "px";
                        k.parentElement.style.top = f + "px";
                        f = parseFloat(k.style.width) + j;
                        k = parseFloat(k.style.height);
                        g.style.width = f + "px";
                        g.style.left = this.answerHolderLeft - j + "px";
                        this.element.parentElement.style.width = f + "px";
                        this.element.parentElement.style.left = this.answerHolderLeft -
                            j + "px";
                        this.element.parentElement.style.height = k + "px";
                        this.element.parentElement.style.top = this.answerHolderTop + "px";
                        this.element.style.cursor = d;
                        this.element.style.borderRadius = "5px";
                        this.element.style.left = j + "px";
                        this.element.style.top = "-2px";
                        this.element.style.width = this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + "px";
                        this.element.style.height = this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6 + "px";
                        this.element.style.position = "absolute";
                        this.element.style.background =
                            "#000000";
                        this.element.style.opacity = 0; - 1 == b && (this.isSkipped = !0);
                        e || a.addDragEvents(this.element.id);
                        d = parseFloat(this.element.style.left) - parseFloat(g.style.left) - 30 + "px";
                        this.isCorrect = a.getIsOptionCorrect(this.element, b);
                        e && (this.element.style.cursor = "default", this.element.oHandler.disable(), this.element.tabIndex = -1, a.getWasJudged() && a.canShowReviewIcons() && (a.getAnsweredCorrectly() ? (g = cp.newElem("img"), g.id = c + "_reviewCorrect", g.src = cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src,
                            g.tabIndex = -1, g.style.position = "absolute", g.style.left = d, g.style.top = "0px", this.element.parentNode.appendChild(g), g.style.zIndex = this.zIndex, i.sh && (c = i.sh.a, cp.applyShadow(g, i.sh.d * Math.cos(Math.PI * c / 180) + "px " + i.sh.d * Math.sin(Math.PI * c / 180) + "px " + i.sh.b + "px " + cp.ConvertRGBToRGBA(i.sh.c, i.sh.o) + (i.sh.i ? " inset" : "") + (i.sh.i ? " inset" : "")))) : (j = this.isCorrect ? cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src : this.isSkipped ? cp.movie.im.m_projectImages["assets/htmlimages/skip_answer_normal.png"].nativeImage.src :
                            cp.movie.im.m_projectImages["assets/htmlimages/incorrect_answer_normal.png"].nativeImage.src, g = cp.newElem("img"), g.id = c + "_reviewIncorrect", g.src = j, g.tabIndex = -1, g.style.position = "absolute", g.style.left = d, g.style.top = "0px", this.element.parentNode.appendChild(g), this.isCorrect || this.element.addReviewButton(), g.style.zIndex = this.zIndex, i.sh && (c = i.sh.a, cp.applyShadow(g, i.sh.d * Math.cos(Math.PI * c / 180) + "px " + i.sh.d * Math.sin(Math.PI * c / 180) + "px " + i.sh.b + "px " + cp.ConvertRGBToRGBA(i.sh.c, i.sh.o) + (i.sh.i ? " inset" :
                                ""))))));
                        this.isDrawn = !0;
                        a.registerColumn1Option(this.element);
                        this.visible || (this.element.style.visibility = "hidden")
                    }
                }
            }
};
cp.MatchingAnswer = function(a, c) {
    cp.MatchingAnswer.baseConstructor.call(this, a, c);
    this.canvasDivName = this.getAttribute("cn");
    var d = this.getAttribute("b");
    this.bounds = {
        minX: d[0],
        minY: d[1],
        maxX: d[2],
        maxY: d[3]
    };
    d = this.getAttribute("vb");
    this.vbounds = {
        minX: d[0],
        minY: d[1],
        maxX: d[2],
        maxY: d[3]
    };
    this.answerHolderLeft = this.getAttribute("ahl");
    this.answerHolderTop = this.getAttribute("aht");
    this.sh = this.getAttribute("sh");
    this.args = c;
    cp.responsive && (this.responsiveCSS = this.getAttribute("css"))
};
cp.inherits(cp.MatchingAnswer, cp.Answer);
cp.MatchingAnswer.prototype.drawForResponsive = function(a) {
    if (this.m_questionObj && this.m_questionObj.getIsStarted()) {
        if (!this.responsiveCSS) return !1;
        if (this.isDrawn && !a) return !0;
        var c = cp.getResponsiveCSS(this.responsiveCSS);
        cp.getCSSFromLayouter(c, this);
        var d = !1,
            d = this.re || this.sh && !this.sh.i,
            e = void 0 != this.tr;
        if (this.currentCSS == c && !d && !e && !a) return !0;
        this.currentCSS = c;
        a = this.element.id;
        if (cp.movie.playbackController && (d = cp.movie.playbackController.GetQuizController())) {
            d.GetIsInReviewMode();
            var b =
                this.m_questionObj.shouldDisableOptions();
            this.answerLabelCanvasElement = document.getElementById(this.canvasDivName);
            var f = cp.movie.stage.getSlideDiv().firstChild;
            cp.movie.stage.getSlideDiv().getBoundingClientRect();
            this.group = this.m_questionObj.getAnswerGroupName();
            d = cp.D[a];
            this.isSkipped = this.isCorrect = !1;
            e = b ? "default" : "pointer";
            this.answerTextCanvasDivName = cp.D[d.actid].mdi;
            d.answerTextDivName = this.answerTextCanvasDivName;
            this.zIndex = cp.D[d.actid].zIndex;
            this.answertextParentDiv = cp(a + "canvasHolder");
            if (!this.answertextParentDiv && (this.answertextParentDiv = cp.newElem("div"), cp.fixWebkitScaling(this.answertextParentDiv), f.insertBefore(this.answertextParentDiv, this.answerLabelCanvasElement.parentElement), this.answertextParentDiv.id = a + "canvasHolder", d.answerTextCanvasHolder = this.answertextParentDiv.id, this.answertextParentDiv.setAttribute("class", "cp-rewrap"), this.answertextParentDiv.style.zIndex = this.zIndex, this.matchingAnswerCanvasElement = cp(this.answerTextCanvasDivName), this.matchingAnswerCanvasElement ||
                    (this.matchingAnswerCanvasElement = cp.newElem("canvas"), canvas = this.canvas = cp.createCanvas(0, 0, cp.D.project.w, cp.D.project.h, this.matchingAnswerCanvasElement), this.matchingAnswerCanvasElement.setAttribute("class", "cp-shape"), this.matchingAnswerCanvasElement.setAttribute("name", this.group), this.matchingAnswerCanvasElement.id = this.answerTextCanvasDivName, this.answertextParentDiv.appendChild(this.matchingAnswerCanvasElement)), !this.answertextCanvasShape)) this.answertextCanvasShape = new cp.Shape(this.matchingAnswerCanvasElement,
                cp.D[this.answerTextCanvasDivName]), this.answertextCanvasShape.start();
            var f = cp.D[this.canvasDivName],
                j = cp(f.dn);
            cp.applyResponsiveStyles(this.matchingAnswerCanvasElement.parentElement, c);
            this.adjustPositionWithAnswerArea(d.css[cp.ResponsiveProjWidth], this.matchingAnswerCanvasElement.parentElement);
            this.adjustPositionWithAnswerArea(d.css[cp.ResponsiveProjWidth], this.element.parentElement);
            this.matchingAnswerCanvasElement.parentElement.getBoundingClientRect();
            j.getBoundingClientRect();
            this.adjustPositionWithAnswerArea(f.css[cp.ResponsiveProjWidth],
                j, !0);
            this.adjustPositionWithAnswerArea(f.css[cp.ResponsiveProjWidth], this.answerLabelCanvasElement.parentElement, !0);
            this.matchingAnswerCanvasElement.lineOffset = parseFloat(this.matchingAnswerCanvasElement.parentElement.style.left) - parseFloat(this.answerLabelCanvasElement.parentElement.style.left);
            this.matchingAnswerCanvasElement.parentElement.style.width = this.matchingAnswerCanvasElement.parentElement.clientWidth + this.answerLabelCanvasElement.clientWidth + "px";
            this.element.parentElement.style.width =
                this.matchingAnswerCanvasElement.parentElement.style.width;
            this.matchingAnswerCanvasElement.style.width = this.element.parentElement.clientWidth - this.answerLabelCanvasElement.clientWidth + "px";
            this.element.style.width = this.matchingAnswerCanvasElement.style.width;
            this.element.style.left = "0px";
            this.element.style.top = "0px";
            this.element.style.width = "100%";
            this.element.style.height = "100%";
            this.element.style.cursor = e;
            this.element.style.borderRadius = "5px";
            this.element.style.position = "absolute";
            this.element.style.background =
                "#000000";
            this.element.style.opacity = 0;
            var h = this;
            this.element.disableOption = function() {
                b = !0;
                h.element.tabIndex = -1
            };
            b || this.m_questionObj.addDragEvents(a);
            b && (this.element.style.cursor = "default", this.element.tabIndex = -1);
            this.isDrawn || this.m_questionObj.registerColumn2Option(this);
            this.isDrawn = !0;
            this.visible || (this.element.style.visibility = "hidden");
            return !0
        }
    }
};
cp.MatchingAnswer.prototype.addIfNeeded = function(a) {
    if (!cp.responsive || !this.drawForResponsive(a))
        if ((a = cp.getQuestionObject(this.relatedQuestionSlide)) && !this.isDrawn && a.getIsStarted()) {
            var c = this.element.id;
            if (cp.movie.playbackController) {
                var d = cp.movie.playbackController.GetQuizController();
                if (d) {
                    d.GetIsInReviewMode();
                    var e = a.shouldDisableOptions(),
                        b = document.getElementById(this.canvasDivName),
                        d = cp.movie.stage.getSlideDiv().firstChild;
                    this.group = a.getAnswerGroupName();
                    var f = cp.D[c];
                    this.isSkipped =
                        this.isCorrect = !1;
                    var j = e ? "default" : "pointer";
                    this.answerTextCanvasDivName = cp.D[f.actid].mdi;
                    var h = cp.D[this.answerTextCanvasDivName];
                    f.answerTextDivName = this.answerTextCanvasDivName;
                    this.zIndex = cp.D[f.actid].zIndex;
                    h = h.b;
                    if (4 == h.length)
                        for (var g = 0; 4 > g; ++g) h[g] = parseFloat(h[g]);
                    else h = [0, 0, 0, 0];
                    this.answerTextCanvasImageBounds = {
                        minX: h[0],
                        minY: h[1],
                        maxX: h[2],
                        maxY: h[3]
                    };
                    g = f.actid;
                    h = cp.newElem("div");
                    cp.fixWebkitScaling(h);
                    d.insertBefore(h, b.parentElement);
                    h.id = c + "canvasHolder";
                    f.answerTextCanvasHolder =
                        h.id;
                    h.setAttribute("class", "cp-rewrap");
                    f = cp.newElem("canvas");
                    canvas = this.canvas = cp.createCanvas(0, 0, cp.D.project.w, cp.D.project.h, f);
                    f.setAttribute("class", "cp-shape");
                    f.setAttribute("name", this.group);
                    f.id = this.answerTextCanvasDivName;
                    h.appendChild(f);
                    h.style.zIndex = this.zIndex;
                    (new cp.Shape(f, cp.D[this.answerTextCanvasDivName])).start();
                    var k = cp.D[g].mdi,
                        g = parseFloat(f.parentElement.style.left) + (cp.D[k].b[0] - this.answerTextCanvasImageBounds.minX),
                        k = parseFloat(f.parentElement.style.top) + (cp.D[k].b[1] -
                            this.answerTextCanvasImageBounds.minY);
                    f.parentElement.style.left = g + "px";
                    f.parentElement.style.top = k + "px";
                    b = b.parentElement;
                    g -= parseFloat(b.style.left);
                    k -= parseFloat(b.style.top);
                    d.removeChild(b);
                    h.appendChild(b);
                    f.style.left = parseFloat(f.style.left) + g + "px";
                    h.style.left = parseFloat(h.style.left) - g + "px";
                    h.style.width = parseFloat(h.style.width) + g + "px";
                    b.style.left = "0px";
                    b.style.top = k + "px";
                    this.element.style.cursor = j;
                    this.element.style.borderRadius = "5px";
                    this.element.style.left = -g + "px";
                    this.element.style.top =
                        "-2px";
                    this.element.style.width = this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + g + "px";
                    this.element.style.height = this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6 + "px";
                    this.element.style.position = "absolute";
                    this.element.style.background = "#000000";
                    this.element.style.opacity = 0;
                    var i = this;
                    this.element.disableOption = function() {
                        e = !0;
                        i.element.tabIndex = -1
                    };
                    e || a.addDragEvents(c);
                    e && (this.element.style.cursor = "default", this.element.tabIndex = -1);
                    this.isDrawn = !0;
                    a.registerColumn2Option(this);
                    this.visible || (this.element.style.visibility = "hidden")
                }
            }
        }
};
cp.MatchingQuestion = function(a, c) {
    cp.MatchingQuestion.baseConstructor.call(this, a, c);
    this.answerOptions = this.getAnswerOptions();
    this.Column1Options = this.getColumn1Options();
    this.Column2Options = this.getColumn2Options();
    this.Column1OptionsMap = {};
    this.Column2OptionsMap = {};
    this.answerLabels = this.questionData.anslb;
    this.isShuffleEnabled = this.questionData.ish;
    this.shuffledColumn1Options = this.Column1Options.slice(0);
    this.answerOptionsDrawnCtr = this.isCorrectCounter = this.shuffleCounter = -1;
    this.answerOptionsDrawn = !1;
    this.drawLaterMap = {};
    this.column1OptionsList = []
};
cp.inherits(cp.MatchingQuestion, cp.Question);
cp.MatchingQuestion.prototype.resetQuestionData = function() {
    cp.MatchingQuestion.superClass.resetQuestionData.call(this);
    this.m_quizController.GetGoToQuizScopeActionExecuted() || (this.m_selectedAnswersArr = []);
    this.answerOptionsDrawnCtr = this.isCorrectCounter = this.shuffleCounter = -1;
    this.answerOptionsDrawn = !1
};
cp.MatchingQuestion.prototype.getColumn1Options = function() {
    var a = [],
        c = this.questionData.aio;
    if (!c || 0 >= c.length) return "";
    for (var d = 0; d < c.length; ++d) {
        var e = c[d].split(":");
        a.push(e[0])
    }
    return a
};
cp.MatchingQuestion.prototype.getColumn2Options = function() {
    var a = [],
        c = this.questionData.aco;
    if (!c || 0 >= c.length) return "";
    for (var d = 0; d < c.length; ++d) {
        var e = c[d].split(":");
        a.push(e[0])
    }
    return a
};
cp.MatchingQuestion.prototype.getTextForColumn2Option = function(a) {
    for (var c = 0; c < this.Column2Options.length; ++c) {
        var d = cp.D[this.Column2Options[c]];
        if (d.aid == a || d.aid + ")" == a) return d.atxtlms
    }
};
cp.MatchingQuestion.prototype.getXYForColumn2Option = function(a, c) {
    for (var d = cp.movie.stage.getSlideDiv().getBoundingClientRect(), e = 0; e < this.Column2Options.length; ++e) {
        var b = cp.D[this.Column2Options[e]];
        if (b.aid == a || b.aid + ")" == a) {
            var b = {},
                f = document.getElementById(this.Column2Options[e]);
            if (f) return b.name = this.Column2Options[e], cp.responsive ? (e = f.parentElement.getBoundingClientRect(), b.x = (e.left - d.left - f.lineOffset) / cp("div_Slide").scaleFactor, b.y = (e.top - d.top + e.height / 2) / cp("div_Slide").scaleFactor) :
                (b.x = parseFloat(f.parentElement.style.left), b.y = parseFloat(f.parentElement.style.top) + parseFloat(f.parentElement.style.height) / 2), b;
            cp.verbose && (cp.log("Elem not found. Adding it to drawLaterMap : " + this.Column2Options[e]), cp.log("Elem not found. Adding it for : " + c.id));
            void 0 == this.drawLaterMap[this.Column2Options[e]] && (this.drawLaterMap[this.Column2Options[e]] = {});
            this.drawLaterMap[this.Column2Options[e]][c.id] = c.id;
            break
        }
    }
};
cp.MatchingQuestion.prototype.startQuestion = function() {
    this.answerOptionsDrawnCtr = this.isCorrectCounter = this.shuffleCounter = -1;
    this.answerOptionsDrawn = !1;
    this.drawLaterMap = {};
    this.m_quizController && (this.m_quizController.GetIsInReviewMode(), this.m_isShuffled || this.shuffleAnswers(), cp.MatchingQuestion.superClass.startQuestion.call(this))
};
cp.MatchingQuestion.prototype.adjustCustomObjects = function() {
    for (var a in this.Column1OptionsMap) {
        var c = this.Column1OptionsMap[a];
        c && c.drawLine && c.drawLine()
    }
};
cp.MatchingQuestion.prototype.updateCustomReviewAreaTransforms = function() {
    var a = cp.movie.stage.getSlideDiv(),
        c;
    for (c in this.Column1OptionsMap) {
        var d = this.Column1OptionsMap[c];
        d.removeOpenReviewAreas();
        var e = cp(d.id + "_reviewButton");
        if (e) {
            var b = a.getBoundingClientRect(),
                f = d.parentElement.getBoundingClientRect();
            e.style.left = f.left - b.left + "px";
            e.style.top = f.bottom - b.top + "px";
            e.getBoundingClientRect();
            if (d = cp(d.id + "_correctMatchingReview")) d.style.left = e.right - b.left + "px", d.style.top = e.top - b.top + "px"
        }
    }
};
cp.MatchingQuestion.prototype.showReviewArea = function(a) {
    for (var c in this.Column1OptionsMap) this.Column1OptionsMap[c].removeOpenReviewAreas();
    var d = document.getElementById(this.getAssociatedObjName());
    d.parentNode.appendChild(a);
    var e = cp.movie.stage.getSlideDiv(),
        b = e.onclick;
    e.style.cursor = "pointer";
    cp.registerGestureEvent(e, cp.GESTURE_EVENT_TYPES.TAP, function(c) {
        cp.disableInteractions || (d.parentNode.removeChild(a), e.style.cursor = "default", cp.registerGestureEvent(e, cp.GESTURE_EVENT_TYPES.TAP, b),
            cp.handleClick(c))
    });
    c = document.getElementById("matchingReviewCloseButton");
    cp.registerGestureEvent(c, cp.GESTURE_EVENT_TYPES.TAP, function() {
        cp.disableInteractions || (d.parentNode.removeChild(a), e.style.cursor = "default", cp.registerGestureEvent(e, cp.GESTURE_EVENT_TYPES.TAP, b))
    })
};
cp.MatchingQuestion.prototype.registerColumn1Option = function(a) {
    for (var c = 0; c < this.Column1Options.length; ++c) {
        var d = this.Column1Options[c];
        if (cp.D[a.id].answerTextDivName == d) {
            this.Column1OptionsMap[d] = a;
            break
        }
    }
};
cp.MatchingQuestion.prototype.registerColumn2Option = function(a) {
    for (var c = a.element, d = cp.movie.stage.getSlideDiv().getBoundingClientRect(), e = 0; e < this.Column2Options.length; ++e) {
        var b = this.Column2Options[e];
        if (-1 != c.id.indexOf(cp.D[b].dn)) {
            for (var f in this.drawLaterMap)
                if (b == f) {
                    var e = this.drawLaterMap[f],
                        j;
                    for (j in e)
                        if (e = document.getElementById(j)) {
                            var h = {};
                            h.name = b;
                            if (cp.responsive) {
                                var g = a.answerLabelCanvasElement.parentElement.getBoundingClientRect();
                                h.x = g.left - d.left;
                                h.y = g.top - d.top + g.height /
                                    2
                            } else h.x = parseFloat(c.parentElement.style.left) + parseFloat(c.style.left), h.y = parseFloat(c.parentElement.style.top) + parseFloat(c.parentElement.style.height) / 2;
                            e.drawLine(h)
                        }
                }
            this.Column2OptionsMap[b] = c;
            break
        }
    }
};
cp.MatchingQuestion.prototype.clearAnswers = function() {
    this.verbose && cp.log("Inside Clear Answers");
    var a = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest(),
        a = (a = !1 == this.getWasJudged() || a && !1 == this.m_quizController.m_submittedAllQuestions) && !this.m_quizController.GetIsInReviewMode();
    if (!1 != a) {
        this.m_selectedAnswersArr = [];
        this.verbose && cp.log("Not Attempted. Hence Clearing");
        for (a = 0; a < this.Column1Options.length; ++a) {
            var c = this.Column1OptionsMap[this.Column1Options[a]];
            c && c.resetMatch()
        }
    }
};
cp.MatchingQuestion.prototype.addDragEvents = function(a) {
    cp.verbose && cp.log("Adding drag events : " + a);
    var c = document.getElementById(a),
        d = document.getElementById(this.getAssociatedObjName()),
        e = cp.movie.stage.getSlideDiv();
    this.lDraggableItem = void 0;
    this.lDroppableItemsMap = [];
    var b = this,
        f = cp.movie.im;
    if (cp.DESKTOP != cp.device) cp.IDEVICE != cp.device && document.body.addEventListener("touchstart", function() {}), c.ontouchstart = function(a) {
        a = a.touches;
        if (!(1 < a.length)) {
            cp.m_gestureHandler.enabled = !1;
            a = a[0];
            b.lDraggableItem = a.target;
            b.lIsColumn1ItemDragged = !1;
            for (var c = 0; c < b.Column1Options.length; ++c) {
                var i = cp.D[b.Column1Options[c]],
                    i = i.dn; - 1 != b.lDraggableItem.id.indexOf(i) && (b.lDroppableItemsMap = b.Column2OptionsMap, b.lIsColumn1ItemDragged = !0)
            }
            if (!b.lIsColumn1ItemDragged)
                for (c = 0; c < b.Column2Options.length; ++c) i = cp.D[b.Column2Options[c]], i = i.dn, -1 != b.lDraggableItem.id.indexOf(i) && (b.lDroppableItemsMap = b.Column1OptionsMap);
            var i = cp.D[b.lDraggableItem.id].answerTextDivName,
                c = cp.getScaledPosition(a.pageX,
                    a.pageY),
                i = cp.D[i],
                h = e.getBoundingClientRect();
            if (cp.responsive) b.draggedImageCopy = cp.newElem("div"), b.draggedImageCopy.innerHTML = cp.D[i.dn].rpvt[cp.ResponsiveProjWidth].vt, b.draggedImageCopy.style.left = a.pageX + "px", b.draggedImageCopy.style.top = a.pageY + "px", b.draggedImageCopy.style.zIndex = 1E3, cp.scaleItem(b.draggedImageCopy, cp("div_Slide").scaleFactor, cp("div_Slide").scaleFactor), document.body.appendChild(b.draggedImageCopy);
            else {
                b.draggedImageCopy = cp.newElem("img");
                var j = i.ip;
                f && f.getImageDataURI(j,
                    function(b) {
                        j = b
                    });
                b.draggedImageCopy.src = j;
                cp.shouldScale ? (b.draggedImageCopy.style.left = c.X - h.left + 10 + "px", b.draggedImageCopy.style.top = c.Y + "px", d.parentNode.appendChild(b.draggedImageCopy)) : (b.draggedImageCopy.style.left = a.pageX + "px", b.draggedImageCopy.style.top = a.pageY + "px", b.draggedImageCopy.style.zIndex = 1E3, cp.scaleItem(b.draggedImageCopy, cp("div_Slide").scaleFactor, cp("div_Slide").scaleFactor), document.body.appendChild(b.draggedImageCopy))
            }
            b.draggedImageCopy.id = "draggedImageCopy";
            b.draggedImageCopy.style.width =
                i.b[2] - i.b[0] + "px";
            b.draggedImageCopy.style.height = i.b[3] - i.b[1] + "px";
            b.draggedImageCopy.style.display = "block";
            b.draggedImageCopy.style.position = "absolute";
            b.lTouchStarted = !0
        }
    }, c.ontouchmove = function(a) {
        cp.m_gestureHandler.enabled = !1;
        a.preventDefault && a.preventDefault();
        if (1 == a.touches.length && b.lTouchStarted) {
            var a = a.touches[0],
                c = cp.getScaledPosition(a.pageX, a.pageY),
                d = e.getBoundingClientRect();
            cp.shouldScale ? (b.draggedImageCopy.style.left = c.X - d.left + 10 + "px", b.draggedImageCopy.style.top = c.Y + "px") :
                (b.draggedImageCopy.style.left = a.pageX + "px", b.draggedImageCopy.style.top = a.pageY + "px")
        }
    }, c.ontouchend = function(a) {
        cp.m_gestureHandler.enableGestures && cp.m_gestureHandler.enableGestures();
        a.stopPropagation && a.stopPropagation();
        b.lTouchStarted = !1;
        if (b.draggedImageCopy) {
            var c, d, f;
            if (cp.shouldScale) a = parseFloat(b.draggedImageCopy.style.left), c = parseFloat(b.draggedImageCopy.style.top), d = parseFloat(b.draggedImageCopy.style.left) + parseFloat(b.draggedImageCopy.style.width), f = parseFloat(b.draggedImageCopy.style.top) +
                parseFloat(b.draggedImageCopy.style.height);
            else {
                f = b.draggedImageCopy.getBoundingClientRect();
                var h = e.getBoundingClientRect(),
                    a = f.left - h.left;
                c = f.top - h.top;
                d = f.right - h.left;
                f = f.bottom - h.top
            }
            b.draggedImageCopy.parentNode && b.draggedImageCopy.parentNode.removeChild(b.draggedImageCopy);
            b.draggedImageCopy = void 0;
            for (var j in b.lDroppableItemsMap) {
                var n = b.lDroppableItemsMap[j],
                    o, p, r, q;
                cp.shouldScale ? (o = parseFloat(n.style.left) + parseFloat(n.parentElement.style.left), p = parseFloat(n.style.top) + parseFloat(n.parentElement.style.top),
                    r = parseFloat(n.parentElement.style.width) + o, q = parseFloat(n.parentElement.style.height) + p) : (q = n.getBoundingClientRect(), o = q.left - h.left, p = q.top - h.top, r = q.right - h.left, q = q.bottom - h.top);
                o = a > r || c > q || d < o || f < p ? !1 : !0;
                if (o) {
                    cp.verbose && cp.log("Dropped on : " + n.id);
                    b.lDraggableItem.drawLine ? (n = cp.D[j], o = j, b.lDraggableItem.drawLine(b.getXYForColumn2Option(n.aid, b.lDraggableItem)), n = b.lDraggableItem.oHandler) : (p = cp.D[b.lDraggableItem.id], o = cp.D[p.actid].mdi, n.drawLine(b.getXYForColumn2Option(p.aid, n)), n = n.oHandler);
                    for (p = 0; p < b.Column2Options.length; ++p)
                        if (o == b.Column2Options[p]) {
                            lIndex = p;
                            break
                        }
                    n.setIndex(lIndex)
                }
            }
        }
    };
    else {
        var j = function(a) {
                if (!cp.disableInteractions && b.isMouseDown && b.draggedImageCopy)
                    if (a = cp.getScaledPosition(a.clientX, a.clientY), cp.responsive) {
                        var c = e.getBoundingClientRect();
                        b.draggedImageCopy.style.left = a.X - c.left + "px";
                        b.draggedImageCopy.style.top = a.Y - c.top + "px"
                    } else b.draggedImageCopy.style.left = window.pageXOffset + a.X + "px", b.draggedImageCopy.style.top = window.pageYOffset + a.Y + "px"
            },
            h = function() {
                if (!cp.disableInteractions &&
                    (document.onmousemove = b.prevMouseMove, document.onmouseup = b.prevMouseUp, this.addedCustomDocMouseUpEvnt = !1, c.onmousemove = void 0, b.isMouseDown)) {
                    b.isMouseDown = !1;
                    cp.verbose && cp.log("Drag Ended");
                    var a = e.getBoundingClientRect(),
                        d, f, h, j;
                    if (cp.responsive) {
                        var l = b.draggedImageCopy.getBoundingClientRect();
                        d = l.left - a.left;
                        f = l.top - a.top;
                        h = l.right - a.left;
                        j = l.bottom - a.top
                    } else d = parseFloat(b.draggedImageCopy.style.left), f = parseFloat(b.draggedImageCopy.style.top), h = parseFloat(b.draggedImageCopy.style.left) + parseFloat(b.draggedImageCopy.style.width),
                        j = parseFloat(b.draggedImageCopy.style.top) + parseFloat(b.draggedImageCopy.style.height);
                    (l = document.getElementById(b.draggedImageCopy.id)) && l.parentNode.removeChild(l);
                    b.draggedImageCopy = void 0;
                    for (var n in b.lDroppableItemsMap) {
                        var l = b.lDroppableItemsMap[n],
                            o, p, r, q;
                        cp.responsive ? (q = l.parentElement.getBoundingClientRect(), o = q.left - a.left, p = q.top - a.top, r = q.right - a.left, q = q.bottom - a.top) : (o = parseFloat(l.style.left) + parseFloat(l.parentElement.style.left), p = parseFloat(l.style.top) + parseFloat(l.parentElement.style.top),
                            r = parseFloat(l.parentElement.style.width) + o, q = parseFloat(l.parentElement.style.height) + p);
                        o = d > r || f > q || h < o || j < p ? !1 : !0;
                        if (o) {
                            cp.verbose && cp.log("Dropped on : " + l.id);
                            b.lDraggableItem.drawLine ? (a = cp.D[n], b.lDraggableItem.drawLine(b.getXYForColumn2Option(a.aid, b.lDraggableItem)), a = b.lDraggableItem.oHandler) : (a = cp.D[b.lDraggableItem.id], n = cp.D[a.actid].mdi, l.drawLine(b.getXYForColumn2Option(a.aid, l)), a = l.oHandler);
                            for (d = 0; d < b.Column2Options.length; ++d)
                                if (n == b.Column2Options[d]) {
                                    lIndex = d;
                                    break
                                }
                            a.setIndex(lIndex);
                            break
                        }
                    }
                }
            };
        c.ondragstart = function() {
            return !1
        };
        document.onselectstart = function() {
            return !1
        };
        c.onmousedown = function(a) {
            if (!cp.disableInteractions) {
                b.lDraggableItem = a.target;
                b.lIsColumn1ItemDragged = !1;
                for (var k = 0; k < b.Column1Options.length; ++k) {
                    var i = cp.D[b.Column1Options[k]],
                        i = i.dn; - 1 != b.lDraggableItem.id.indexOf(i) && (b.lDroppableItemsMap = b.Column2OptionsMap, b.lIsColumn1ItemDragged = !0)
                }
                if (!b.lIsColumn1ItemDragged)
                    for (k = 0; k < b.Column2Options.length; ++k) i = cp.D[b.Column2Options[k]], i = i.dn, -1 != b.lDraggableItem.id.indexOf(i) &&
                        (b.lDroppableItemsMap = b.Column1OptionsMap);
                i = cp.D[b.lDraggableItem.id].answerTextDivName;
                a = cp.getScaledPosition(a.clientX, a.clientY);
                i = cp.D[i];
                if (cp.responsive) b.draggedImageCopy = cp.newElem("div"), b.draggedImageCopy.innerHTML = cp.D[i.dn].rpvt[cp.ResponsiveProjWidth].vt, k = e.getBoundingClientRect(), b.draggedImageCopy.style.left = a.X - k.left + "px", b.draggedImageCopy.style.top = a.Y - k.top + "px";
                else {
                    b.draggedImageCopy = cp.newElem("img");
                    var m = i.ip;
                    f && f.getImageDataURI(m, function(a) {
                        m = a
                    });
                    b.draggedImageCopy.src =
                        m;
                    b.draggedImageCopy.style.left = window.pageXOffset + a.X + 10 + "px";
                    b.draggedImageCopy.style.top = window.pageYOffset + a.Y + "px"
                }
                cp.fixWebkitScaling(b.draggedImageCopy);
                b.draggedImageCopy.id = "draggedImageCopy";
                b.draggedImageCopy.style.width = i.b[2] - i.b[0] + "px";
                b.draggedImageCopy.style.height = i.b[3] - i.b[1] + "px";
                b.draggedImageCopy.style.display = "block";
                b.draggedImageCopy.style.position = "absolute";
                d.parentNode.appendChild(b.draggedImageCopy);
                b.isMouseDown = !0;
                b.prevMouseMove = document.onmousemove;
                b.prevMouseUp =
                    document.onmouseup;
                c.onmousemove = j;
                document.onmousemove = j;
                document.onmouseup = h;
                this.addedCustomDocMouseUpEvnt = !0;
                return !1
            }
        }
    }
};
cp.MatchingQuestion.prototype.removeDragEvents = function(a) {
    cp.verbose && cp.log("Removing drag events for : " + a);
    if (a = document.getElementById(a)) this.addedCustomDocMouseUpEvnt && (document.onmouseup = void 0), a.onmousedown = void 0, a.ondragstart = void 0, a.onselectstart = void 0, a.ontouchstart = void 0, a.ontouchmove = void 0, a.ontouchend = void 0, a.style.cursor = "default"
};
cp.MatchingQuestion.prototype.shuffleAnswers = function() {
    var a = !this.m_quizController.GetIsAttemptFinished() && this.getWasJudged() && !this.m_quizController.GetIsSubmitAll(),
        c = this.getIsPretest() && this.m_quizController.GetIsPretestQuestionsDisabled();
    if (!((!this.isShuffleEnabled || (a || this.m_quizController.GetIsInReviewMode() || c) || this.m_isShuffled) && 0 < this.Column1Options.length)) {
        for (var d = this.Column1Options.length, e, c = [], a = 0; a < d; ++a) c[a] = this.Column1Options[a];
        for (a = d; 1 < a; a--) d = Math.floor(Math.random() *
            a), d != a && (e = c[d], c[d] = c[a - 1], c[a - 1] = e);
        this.shuffledColumn1Options = c;
        this.m_isShuffled = !0
    }
};
cp.MatchingQuestion.prototype.getAnswerLabels = function() {
    return this.answerLabels
};
cp.MatchingQuestion.prototype.getSelectedIndex = function(a) {
    if (this.answerLabels)
        for (var c = 0; c < this.answerLabels.length; ++c)
            if (a == cp.D[this.answerLabels[c]].aid) return c;
    return -1
};
cp.MatchingQuestion.prototype.getAnswerOption = function(a) {
    if (!this.column1OptionsList || 0 >= this.column1OptionsList.length || this.column1OptionsList.length >= this.shuffledColumn1Options.length) this.column1OptionsList = [];
    this.column1OptionsList.push(a);
    this.shuffleCounter >= this.shuffledColumn1Options.length && (this.shuffleCounter = -1);
    a = {};
    this.shuffleCounter++;
    a.name = this.shuffledColumn1Options[this.shuffleCounter];
    if (this.m_selectedAnswersArr && 0 < this.m_selectedAnswersArr.length) {
        for (var c = -1, d = 0; d < this.Column1Options.length; ++d) this.Column1Options[d] ==
            a.name && (c = d);
        a.selectedAnswerLabel = this.m_selectedAnswersArr[c]
    }
    this.shuffleCounter == this.shuffledColumn1Options.length - 1 && (this.answerOptionsDrawn = !0);
    return a
};
cp.MatchingQuestion.prototype.getIsOptionCorrect = function(a, c) {
    return -1 == c ? !1 : cp.D[this.Column2Options[c]].aid == cp.D[cp.D[a.id].answerTextDivName].aid ? !0 : !1
};
cp.MatchingQuestion.prototype.disableAllOptions = function() {
    if (this.m_quizController) {
        var a = !0;
        this.m_quizController.GetIsSubmitAll() && !this.getIsPretest() && (!this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions) && (a = !1);
        if (a) {
            for (a = 0; a < this.Column1Options.length; ++a) {
                var c = this.Column1Options[a];
                if (c = this.Column1OptionsMap[c]) this.removeDragEvents(c.id), c.disableOption(), !0 == this.answerOptionsDrawn && c.oHandler.disable()
            }
            for (a = 0; a < this.Column2Options.length; ++a)
                if (c =
                    this.Column2Options[a], c = this.Column2OptionsMap[c]) this.removeDragEvents(c.id), c.disableOption();
            this.m_answersDisabled = !0
        }
    }
};
cp.MatchingQuestion.prototype.checkIfAttempted = function() {
    for (var a in this.Column1OptionsMap)
        if (-1 != this.Column1OptionsMap[a].oHandler.getIndex()) return !0;
    return !1
};
cp.MatchingQuestion.prototype.checkIfCorrect = function() {
    for (var a in this.Column1OptionsMap) {
        var c = this.Column1OptionsMap[a],
            d = c.oHandler.getIndex();
        if (-1 == d || cp.D[this.Column2Options[d]].aid != cp.D[cp.D[c.id].answerTextDivName].aid) return !1
    }
    return !0
};
cp.MatchingQuestion.prototype.checkAndSetQuestionStatus = function() {
    var a = this.QuestionStatusEnum.INCOMPLETE,
        a = !1;
    a = this.getIsSurvey() ? this.checkIfAttempted() ? this.QuestionStatusEnum.CORRECT : this.QuestionStatusEnum.INCOMPLETE : this.checkIfAttempted() ? (a = this.checkIfCorrect()) ? this.QuestionStatusEnum.CORRECT : this.QuestionStatusEnum.INCORRECT : this.QuestionStatusEnum.INCOMPLETE;
    this.setQuestionStatus(a)
};
cp.MatchingQuestion.prototype.getAnswerScores = function() {
    for (var a = [], c = 0, d = 0; d < this.Column1Options.length; ++d) {
        var e = this.Column1OptionsMap[this.Column1Options[d]];
        if (void 0 != e) {
            var b = cp.D[cp.D[e.id].answerTextDivName],
                f = new cp.AnswerScore;
            f.m_answerID = c.toString();
            f.m_correctAnswer = b.aid;
            e = e.oHandler.getIndex();
            f.m_chosenAnswer = -1 == e ? "0" : cp.D[this.Column2Options[e]].aid;
            a.push(f);
            c++
        }
    }
    return a
};
cp.MatchingQuestion.prototype.setQuestionSpecificScoreProperties = function(a) {
    void 0 != a && (a.m_answerOrderArrayAsString = this.m_answerOrderArray)
};
cp.MatchingQuestion.prototype.restoreFromQuestionSpecificScoreProperties = function(a) {
    void 0 != a && (a = a.m_answerOrderArrayAsString, void 0 == a || "" == a || this.setAnswerOrder(a))
};
cp.MatchingQuestion.prototype.setAnswerOrder = function(a) {
    if (a && !(0 >= a.length)) {
        var c = a.split(";"),
            d = this.questionData.itemlb;
        this.shuffledColumn1Options = Array(this.Column1Options.length);
        for (var e = c.length - 1; 0 <= e; --e)
            for (var b = c[e].split(":"), f = b[0], b = b[1], j = 0; j < d.length; ++j) {
                var h = cp.D[d[j]].b;
                h[0] == f && h[1] == b && (this.shuffledColumn1Options[j] = this.Column1Options[e])
            }
        this.answerOptions = c.slice(0);
        this.m_answerOrderArray = a
    }
};
cp.MatchingQuestion.prototype.resumeSelectedAnswers = function(a) {
    if (!(0 >= a.length)) {
        this.m_selectedAnswersArr = [];
        for (var c = 0; c < a.length; ++c) {
            var d = unescape(a[c].m_chosenAnswer);
            "0" == d ? this.m_selectedAnswersArr.push(void 0) : this.m_selectedAnswersArr.push(d)
        }
    }
};
cp.MatchingQuestion.prototype.setSelectedAnswers = function() {
    this.m_selectedAnswersArr = [];
    for (var a = 0; a < this.Column1Options.length; ++a) {
        var c = this.Column1OptionsMap[this.Column1Options[a]];
        void 0 != c && (c = c.oHandler.getIndex(), -1 == c ? this.m_selectedAnswersArr.push(void 0) : this.m_selectedAnswersArr.push(cp.D[this.Column2Options[c]].aid))
    }
};
cp.MatchingQuestion.prototype.getChosenAnswerAsString = function() {
    for (var a = "", c = 0, d = 0; d < this.Column1Options.length; ++d) {
        var e = this.Column1OptionsMap[this.Column1Options[d]];
        void 0 != e && (e = e.oHandler.getIndex(), e = cp.D[this.Column2Options[e]], a = 0 == c ? a + (c + "." + (e ? e.aid : " ")) : a + ("," + c + "." + (e ? e.aid : " ")), c++)
    }
    return a
};
cp.MatchingQuestion.prototype.getCorrectAnswerAsString = function() {
    for (var a = "", c = 0, d = 0; d < this.Column1Options.length; ++d) {
        var e = this.Column1OptionsMap[this.Column1Options[d]];
        void 0 != e && (e = cp.D[cp.D[e.id].answerTextDivName], a = 0 == c ? a + (c + "." + e.aid) : a + ("," + c + "." + e.aid), c++)
    }
    return a
};
cp.MatchingQuestion.prototype.getChosenAnswerAsStringForReview = function() {
    return this.getChosenAnswerAsString()
};
cp.MatchingQuestion.prototype.getCorrectAnswerAsStringForReview = function() {
    return this.getCorrectAnswerAsString()
};
cp.MatchingQuestion.prototype.getAnswerTexts = function() {
    for (var a = {}, c = {}, d = {}, e = 0, b = 0; b < this.Column1Options.length; ++b) {
        var f = this.Column1Options[b],
            f = this.Column1OptionsMap[f];
        void 0 != f && (f = cp.D[f.id], f = cp.D[f.answerTextDivName], a[e++] = escape(f.aAnsTxtlms))
    }
    for (e = 0; e < this.Column2Options.length; ++e) f = this.Column2Options[e], b = this.Column2OptionsMap[f], void 0 != b && (f = cp.D[b.id], f = cp.D[f.answerTextDivName], c[f.aid] = escape(f.atxtlms));
    d.left = a;
    d.right = c;
    return d
};
cp.MatchingQuestion.prototype.saveAnswerOrder = function() {
    for (var a = "", c = 0, d = 0; d < this.Column1Options.length; ++d) {
        var e = document.getElementById(this.Column1Options[d]);
        e && e.parentElement && (e = e.parentElement.id.split("canvasHolder"), e = cp.D[cp.D[e[0]].ln], 0 != c && (a += ";"), a += e.b[0], a += ":", a += e.b[1], c++)
    }
    this.m_answerOrderArray = a;
    this.setSelectedAnswers()
};