cp.QuizButtonCH = function(a) {
    if (!cp.disableInteractions) {
        a.stopPropagation && a.stopPropagation();
        var c = a.target.id,
            a = a.target,
            b = cp.D[c];
        b && (b.sicbs && void 0 !== b.bstiid && -1 !== b.bstiid) && (c = cp.getDisplayObjNameByCP_UID(b.bstiid), a = cp(c));
        c = cp.D[c].chfn;
        c(a)
    }
};
cp.QuestionSlideReviewLabel = function(a, c) {
    cp.QuestionSlideReviewLabel.baseConstructor.call(this, a);
    this.textAlign = this.getAttribute("ta");
    this.bold = this.getAttribute("B");
    this.color = this.getAttribute("c");
    this.font = this.getAttribute("f");
    this.italic = this.getAttribute("i");
    this.size = this.getAttribute("sz");
    this.underline = this.getAttribute("u");
    this.id = this.getAttribute("id");
    this.canvasObj = cp.D[this.element.id];
    this.visible = this.getAttribute("visible");
    this.re = this.getAttribute("re");
    this.sh = this.getAttribute("sh");
    var b = this.getAttribute("b");
    this.parentDivName = this.getAttribute("dn");
    this.relatedQuestionSlide = this.getAttribute("rqs");
    cp.responsive && (this.responsiveCSS = this.getAttribute("css"));
    if (void 0 != this.relatedQuestionSlide) {
        var d = cp.getQuestionObject(this.relatedQuestionSlide);
        void 0 != d && (d.m_correctFeedbackText = this.getAttribute("cf"), d.m_partialCorrectFeedbackText = this.getAttribute("pcf"), d.m_incorrectDisplayChosenText = this.getAttribute("idc"), d.m_incorrectDisplayCorrectText = this.getAttribute("ict"))
    }
    this.bounds = {
        minX: b[0],
        minY: b[1],
        maxX: b[2],
        maxY: b[3]
    };
    b = this.getAttribute("vb");
    this.vbounds = {
        minX: b[0],
        minY: b[1],
        maxX: b[2],
        maxY: b[3]
    };
    this.args = c;
    this.element && (this.element.parentElement.drawingBoard = this.element.parentElement, this.element.parentElement.bounds = this.bounds);
    this.isDrawn = !1
};
cp.inherits(cp.QuestionSlideReviewLabel, cp.DisplayObject);
cp.QuestionSlideReviewLabel.prototype.start = function(a) {
    this.addIfNeeded();
    if (!this.effectIsStarted || a) this.updateEffects(this.hasEffect), this.effectIsStarted = !0
};
cp.QuestionSlideReviewLabel.prototype.reset = function() {
    delete cp.ropMap[this.element.id];
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
cp.QuestionSlideReviewLabel.prototype.drawForResponsive = function(a, c) {
    var b = cp.getQuestionObject(this.relatedQuestionSlide);
    if (!b || !b.getIsStarted() || !this.responsiveCSS) return !1;
    if (this.isDrawn && !a) return !0;
    var d = cp.getResponsiveCSS(this.responsiveCSS);
    cp.getCSSFromLayouter(d, this);
    var e = !1,
        e = this.re || this.sh && !this.sh.i || this.fillOuterArea,
        f = void 0 != this.tr;
    if (this.currentCSS == d && !e && !f && !a) return !0;
    this.currentCSS = d;
    if (!cp.movie.playbackController) return !1;
    e = cp.movie.playbackController.GetQuizController();
    if (!e || !1 == e.GetIsInReviewMode()) return !1;
    this.actualParent = cp(this.parentDivName);
    if (!b.getIsIncomplete() || b.getIsSurvey() || b.getIsPretest()) return this.isDrawn = b.showCustomReviewArea(this.element.id), this.drawComplete(c), !0 == this.isDrawn;
    this.zIndex = cp.D[this.parentDivName].zIndex;
    cp.applyResponsiveStyles(this.element.parentElement, d, !0);
    this.element.parentElement.offsetHeight = this.element.parentElement.offsetHeight;
    this.actualParentClientBoundingRect = this.element.parentElement.getBoundingClientRect();
    e = cp("re-" + this.element.id);
    e || (e = cp.newElem("div"), e.id = "re-" + this.element.id, cp.fixWebkitScaling(e), cp.addRewrapObjectAsPerRestOfProjectItem(e));
    cp.applyResponsiveStyles(e, d, !0);
    e.offsetHeight = e.offsetHeight;
    this.parentElementClientBoundingRect = e.getBoundingClientRect();
    this.element.style.left = "0px";
    this.element.style.top = "0px";
    this.element.style.width = "100%";
    this.element.style.height = "100%";
    this.isDrawn || (this.sh && (this.element.style.textShadow = (this.sh.i ? "inset " : "") + this.sh.d * Math.cos(Math.PI *
        this.sh.a / 180) + "px " + this.sh.d * Math.sin(Math.PI * this.sh.a / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o)), this.re && (e.style.webkitBoxReflect = "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))"), this.element.style.position = "absolute", this.visible = 1, this.text = b.getIsIncomplete() ? this.getAttribute("icf") : "", void 0 != this.getAttribute("accstr") && (this.element.setAttribute("tabIndex",
        "-1"), this.element.setAttribute("aria-label", this.text), cp.removeAccessibilityOutline(this.element), this.element.setAttribute("role", "img")), "" == this.element.innerHTML && (this.element.innerHTML += this.text), this.element.parentNode.removeChild(this.element), e.setAttribute("class", "cp-rewrap"), e.style.zIndex = this.zIndex, e.appendChild(this.element));
    b = this.getAttribute("rpfont")[cp.ResponsiveProjWidth].font;
    this.element.style.fontWeight = b.B ? "bold" : "normal";
    this.element.style.fontStyle = b.i ? "italic" : "normal";
    this.element.style.textDecoration = b.u ? "underline" : "none";
    this.element.style.color = b.c;
    this.element.style.fontFamily = b.n;
    this.element.style.fontSize = b.s + "px";
    this.element.style.textAlign = this.textAlign;
    this.element.style.verticalAlign = "middle";
    this.isDrawn = !0;
    this.drawComplete(c);
    this.visible || cp.hide(this.parentDivName);
    return !0
};
cp.QuestionSlideReviewLabel.prototype.addIfNeeded = function(a, c) {
    if ((!cp.responsive || !this.drawForResponsive(a)) && !this.isDrawn) {
        var b = cp.getQuestionObject(this.relatedQuestionSlide);
        if (b && b.getIsStarted() && cp.movie.playbackController) {
            var d = cp.movie.playbackController.GetQuizController();
            d && !1 != d.GetIsInReviewMode() && ((this.actualParent = cp(this.parentDivName), !b.getIsIncomplete() || b.getIsSurvey() || b.getIsPretest()) ? (this.isDrawn = b.showCustomReviewArea(this.element.id), this.drawComplete(c)) : (this.zIndex =
                cp.D[this.parentDivName].zIndex, d = cp.newElem("div"), d.id = "re-" + this.element.id, cp.fixWebkitScaling(d), d.style.position = "absolute", d.style.left = this.vbounds.minX + "px", d.style.top = this.vbounds.minY + "px", d.style.width = this.vbounds.maxX - this.vbounds.minX + "px", d.style.height = this.vbounds.maxY - this.vbounds.minY + "px", this.element.parentElement.style.position = "absolute", this.element.parentElement.style.left = this.bounds.minX + "px", this.element.parentElement.style.top = this.bounds.minY + "px", this.element.parentElement.style.width =
                this.bounds.maxX - this.bounds.minX + "px", this.element.parentElement.style.height = this.bounds.maxY - this.bounds.minY + "px", this.element.style.left = "0px", this.element.style.top = "0px", this.element.style.width = "100%", this.element.style.height = "100%", this.sh && (this.element.style.textShadow = (this.sh.i ? "inset " : "") + this.sh.d * Math.cos(Math.PI * this.sh.a / 180) + "px " + this.sh.d * Math.sin(Math.PI * this.sh.a / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o)), this.re && (d.style.webkitBoxReflect = "below " +
                    this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))"), this.element.style.position = "absolute", this.element.style.textAlign = this.textAlign, this.element.style.verticalAlign = "middle", this.visible = 1, this.text = b.getIsIncomplete() ? this.getAttribute("icf") : "", void 0 != this.getAttribute("accstr") && (this.element.setAttribute("tabIndex", "-1"), this.element.setAttribute("aria-label", this.text),
                    cp.removeAccessibilityOutline(this.element), this.element.setAttribute("role", "img")), this.element.style.color = this.color, this.element.style.fontFamily = this.font, this.element.style.fontSize = this.size + "px", this.element.style.fontWeight = this.bold ? "bold" : "normal", this.element.style.fontStyle = this.italic ? "italic" : "normal", this.element.style.textDecoration = this.underline ? "underline" : "none", "" == this.element.innerHTML && (this.element.innerHTML += this.text), this.element.parentNode.removeChild(this.element),
                cp.addRewrapObjectAsPerRestOfProjectItem(d), d.setAttribute("class", "cp-rewrap"), d.appendChild(this.element), d.style.zIndex = this.zIndex, this.isDrawn = !0, this.drawComplete(c), this.visible || cp.hide(this.parentDivName)))
        }
    }
};
cp.ProgressSlideLabel = function(a, c) {
    cp.ProgressSlideLabel.baseConstructor.call(this, a);
    this.id = this.getAttribute("id");
    this.visible = this.getAttribute("visible");
    this.textAlign = this.getAttribute("ta");
    this.bold = this.getAttribute("B");
    this.color = this.getAttribute("c");
    this.font = this.getAttribute("f");
    this.italic = this.getAttribute("i");
    this.size = this.getAttribute("sz");
    this.underline = this.getAttribute("u");
    this.quizParam = this.getAttribute("qp");
    if (cp.movie.playbackController) {
        var b = cp.movie.playbackController.GetQuizController();
        b && (b.GetParameterValueByName(this.quizParam), this.relatedQuestionSlide = this.getAttribute("rqs"), cp.responsive && (this.responsiveCSS = this.getAttribute("css")), this.parentDivName = this.getAttribute("dn"), b = this.getAttribute("b"), this.bounds = {
            minX: b[0],
            minY: b[1],
            maxX: b[2],
            maxY: b[3]
        }, this.tr = this.getAttribute("tr"), this.re = this.getAttribute("re"), this.sh = this.getAttribute("sh"), b = this.getAttribute("vb"), this.vbounds = {
            minX: b[0],
            minY: b[1],
            maxX: b[2],
            maxY: b[3]
        }, this.element && (this.element.parentElement.drawingBoard =
            this.element.parentElement, this.element.parentElement.bounds = this.bounds), this.args = c, this.isDrawn = !1)
    }
};
cp.inherits(cp.ProgressSlideLabel, cp.DisplayObject);
cp.ProgressSlideLabel.prototype.start = function(a) {
    this.addIfNeeded();
    if (!this.effectIsStarted || a) this.updateEffects(this.hasEffect), this.effectIsStarted = !0
};
cp.ProgressSlideLabel.prototype.reset = function() {
    delete cp.ropMap[this.element.id];
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
cp.ProgressSlideLabel.prototype.drawForResponsive = function(a) {
    var c = cp.getQuestionObject(this.relatedQuestionSlide);
    if (!c || !c.getIsStarted() || !this.responsiveCSS) return !1;
    if (this.isDrawn && !a) return !0;
    var b = cp.getResponsiveCSS(this.responsiveCSS);
    cp.getCSSFromLayouter(b, this);
    var d = !1,
        d = this.re || this.sh && !this.sh.i || this.fillOuterArea,
        e = void 0 != this.tr;
    if (this.currentCSS == b && !d && !e && !a) return !0;
    this.currentCSS = b;
    var f = !0,
        a = cp.D[this.parentDivName],
        e = cp.D[a.mdi],
        d = cp("re-" + this.element.id);
    d || (d = cp.newElem("div"),
        d.id = "re-" + this.element.id, cp.fixWebkitScaling(d), cp.addRewrapObjectAsPerRestOfProjectItem(d));
    var h = b;
    this.getAttribute("useV") && (h = cp.createResponsiveStyleObj(b, b.p, b.vl, b.vt, b.vr, b.vb, b.vw, b.vh, b.crop));
    cp.applyResponsiveStyles(this.element.parentElement, b, f);
    this.element.parentElement.offsetHeight = this.element.parentElement.offsetHeight;
    this.parentElementClientBoundingRect = this.element.parentElement.getBoundingClientRect();
    var g = 0;
    this.tr && (g = cp.getAngleFromRotateStr(this.tr), f = cp.getCenterForRotation(this.element.parentElement),
        g = cp.getBoundsForRotatedItem(this.element.parentElement.clientWidth, this.element.parentElement.clientHeight, f, g), h = cp.createResponsiveStyleObj(b, b.p, g.l, g.t, g.r, g.b, g.w, g.h, b.crop), cp.applyTransform(this.element, this.tr), g = cp.getAngleFromRotateStr(this.tr), this.element.tr = this.tr, this.element.parentElement.tr = this.tr, cp.applyTransform(this.element.parentElement, this.tr), f = !1);
    cp.applyResponsiveStyles(d, h, f);
    this.element.rotateAngle = g;
    this.element.parentElement.rotateAngle = g;
    this.element.style.left =
        "0px";
    this.element.style.top = "0px";
    this.element.style.width = "100%";
    this.element.style.height = "100%";
    this.element.style.display = "block";
    this.element.style.position = "absolute";
    this.isDrawn || (this.text = this.getAttribute("text"), this.text = c ? c.getProgressString(this.text) : "", !0 === e.hasOwnProperty("accstr") && (c = document.getElementById(this.parentDivName), cp.createAlternativeAccessibleText(c, this.text, "img"), cp.removeAccessibilityOutline(c)), this.zIndex = a.zIndex, this.sh && (this.element.style.textShadow = this.sh.d *
        Math.cos(Math.PI * this.sh.a / 180) + "px " + this.sh.d * Math.sin(Math.PI * this.sh.a / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" : "")), this.re && (d.style.webkitBoxReflect = "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))"), "" == this.element.innerHTML && (this.element.innerHTML += "<table style='width=100%;height:100%;'><tr style='width=100%;height:100%;'><td  style='width=100%;height:100%;vertical-align:middle;'>" +
        this.text + "</td></tr></table>"), this.element.parentNode.removeChild(this.element), d.setAttribute("class", "cp-rewrap"), d.appendChild(this.element), d.style.zIndex = this.zIndex);
    c = this.getAttribute("rpfont")[cp.ResponsiveProjWidth].font;
    this.element.style.fontWeight = c.B ? "bold" : "normal";
    this.element.style.fontStyle = c.i ? "italic" : "normal";
    this.element.style.textDecoration = c.u ? "underline" : "none";
    this.element.style.color = c.c;
    this.element.style.fontFamily = c.n;
    this.element.style.fontSize = c.s + "px";
    this.element.style.textAlign =
        this.textAlign;
    this.element.style.verticalAlign = "middle";
    this.isDrawn = !0;
    this.visible || cp.hide(this.parentDivName);
    return !0
};
cp.ProgressSlideLabel.prototype.addIfNeeded = function(a) {
    if (!cp.responsive || !this.drawForResponsive(a))
        if ((a = cp.getQuestionObject(this.relatedQuestionSlide)) && a.getIsStarted() && !this.isDrawn) {
            this.text = this.getAttribute("text");
            this.text = a ? a.getProgressString(this.text) : "";
            var a = this.bounds,
                c = cp.D[this.parentDivName];
            if (!0 === cp.D[c.mdi].hasOwnProperty("accstr")) {
                var b = document.getElementById(this.parentDivName);
                cp.createAlternativeAccessibleText(b, this.text, "img");
                cp.removeAccessibilityOutline(b)
            }
            this.zIndex =
                c.zIndex;
            this.element.style.width = a.maxX - a.minX + "px";
            this.element.style.height = a.maxY - a.minY + "px";
            c = cp.newElem("div");
            c.id = "re-" + this.element.id;
            cp.fixWebkitScaling(c);
            this.element.style.textAlign = this.textAlign;
            this.element.style.verticalAlign = "middle";
            b = 0;
            this.tr && (cp.applyTransform(this.element, this.tr), b = cp.getAngleFromRotateStr(this.tr), this.element.tr = this.tr, this.element.parentElement.tr = this.tr, cp.applyTransform(this.element.parentElement, this.tr));
            this.element.rotateAngle = b;
            this.element.parentElement.rotateAngle =
                b;
            this.sh && (this.element.style.textShadow = this.sh.d * Math.cos(Math.PI * this.sh.a / 180) + "px " + this.sh.d * Math.sin(Math.PI * this.sh.a / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" : ""));
            this.re && (c.style.webkitBoxReflect = "below " + this.re.d + "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s / 100) + ", transparent), to(rgba(255, 255, 255, " + (1 - this.re.p / 100) + ")))");
            this.element.parentElement.style.position = "absolute";
            this.element.parentElement.style.left =
                this.bounds.minX + "px";
            this.element.parentElement.style.top = this.bounds.minY + "px";
            this.element.parentElement.style.width = this.bounds.maxX - this.bounds.minX + "px";
            this.element.parentElement.style.height = this.bounds.maxY - this.bounds.minY + "px";
            c.style.position = "absolute";
            c.style.left = this.vbounds.minX + "px";
            c.style.top = this.vbounds.minY + "px";
            c.style.width = this.vbounds.maxX - this.vbounds.minX + "px";
            c.style.height = this.vbounds.maxY - this.vbounds.minY + "px";
            this.element.style.marginLeft = -(this.vbounds.minX - a.minX) +
                "px";
            this.element.style.marginTop = -(this.vbounds.minY - a.minY) + "px";
            this.element.style.display = "block";
            this.element.style.position = "absolute";
            this.element.style.color = this.color;
            this.element.style.fontFamily = this.font;
            this.element.style.fontSize = this.size + "px";
            this.element.style.fontWeight = this.bold ? "bold" : "normal";
            this.element.style.fontStyle = this.italic ? "italic" : "normal";
            this.element.style.textDecoration = this.underline ? "underline" : "none";
            "" == this.element.innerHTML && (this.element.innerHTML += "<table style='width=100%;height:100%;'><tr style='width=100%;height:100%;'><td  style='width=100%;height:100%;vertical-align:middle;'>" +
                this.text + "</td></tr></table>");
            this.element.parentNode.removeChild(this.element);
            cp.addRewrapObjectAsPerRestOfProjectItem(c);
            c.setAttribute("class", "cp-rewrap");
            c.appendChild(this.element);
            c.style.zIndex = this.zIndex;
            this.isDrawn = !0;
            this.visible || cp.hide(this.parentDivName)
        }
};
cp.Answer = function(a) {
    cp.Answer.baseConstructor.call(this, a);
    this.id = this.getAttribute("id");
    this.type = this.getAttribute("type");
    this.visible = this.getAttribute("visible");
    this.answerID = this.getAttribute("aid");
    this.relatedQuestionSlide = this.getAttribute("rqs");
    this.m_questionObj = cp.getQuestionObject(this.relatedQuestionSlide);
    if (cp.responsive && (a = cp.D[this.element.id])) this.answerAreaItemName = a.aan;
    this.isDrawn = !1
};
cp.inherits(cp.Answer, cp.DisplayObject);
cp.Answer.prototype.start = function(a) {
    this.addIfNeeded();
    if (!this.effectIsStarted || a) this.updateEffects(this.hasEffect), this.effectIsStarted = !0
};
cp.Answer.prototype.reset = function() {
    delete cp.ropMap[this.element.id];
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
cp.adjustPositionWithAnswerArea = function(a, c, b, d) {
    if (cp.responsive && a && c && b) {
        var e = cp(b),
            f = cp.D[b],
            b = 0;
        f && !d && (b = cp.D[f.mdi].sw);
        d = e.getBoundingClientRect();
        e = cp.movie.stage.mainSlideDiv.getBoundingClientRect();
        cp.applyResponsiveStyles(c, a);
        var f = a.l,
            h = a.t,
            g = a.r,
            a = a.b;
        "auto" != f && (f = -1 != f.indexOf("%") ? cp.getRoundedValue(parseFloat(f) * e.width / 100) : parseFloat(f), d && (f += d.left + b - e.left), c.style.left = f + "px");
        "auto" != h && (h = -1 != h.indexOf("%") ? cp.getRoundedValue(parseFloat(h) * e.height / 100) : parseFloat(h),
            d && (h += d.top - e.top), c.style.top = h + "px");
        "auto" != g && (g = -1 != g.indexOf("%") ? cp.getRoundedValue(parseFloat(g) * e.width / 100) : parseFloat(g), d && (g += e.right - d.right - b), c.style.right = g + "px");
        "auto" != a && (a = -1 != a.indexOf("%") ? cp.getRoundedValue(parseFloat(a) * e.height / 100) : parseFloat(a), d && (a += e.bottom - d.bottom), c.style.bottom = a + "px")
    }
};
cp.Answer.prototype.adjustPositionWithAnswerArea = function(a, c, b) {
    cp.adjustPositionWithAnswerArea(a, c, this.answerAreaItemName, b)
};
cp.Answer.prototype.addIfNeeded = function() {};
cp.Answer.prototype.linkedItemDrawingCompleteHandler = function(a) {
    if (cp.responsive && this.drawForResponsive)
        if (this.answerAreaItemName) {
            var c = cp.D[this.answerAreaItemName];
            c && (c = cp.D[c.mdi], a.cpData && a.cpData.uid && a.cpData.uid == c.uid && (cp.verbose && cp.log("drawing " + this.element.id + ", for " + a.cpData.uid), this.drawForResponsive(!0, cp.ReasonForDrawing.kLinkedToItemAppeared)))
        } else cp.Answer.superClass.linkedItemDrawingCompleteHandler.call(this, a)
};
cp.Answer.prototype.subscribeToItemDrawingCompleteHandler = function(a) {
    if (cp.responsive)
        if (this.answerAreaItemName) {
            if (a = cp.D[this.answerAreaItemName])
                if (a = cp.D[a.mdi]) {
                    var c = this;
                    (a = cp.getResponsiveCSS(a.css)) && (-1 != a.lhID || -1 != a.lvID) && cp.em.addEventListener(function(a) {
                        c.linkedItemDrawingCompleteHandler(a)
                    }, cp.ITEMDRAWINGCOMPLETEEVENT)
                }
        } else cp.Answer.superClass.subscribeToItemDrawingCompleteHandler.call(this, a)
};
cp.Question = function(a, c) {
    if (cp.movie.playbackController && (this.m_quizController = cp.movie.playbackController.GetQuizController())) this.m_questionScore = void 0, this.wasJudged = !1, this.m_isSurvey = this.m_isTracked = !0, this.associatedObjName = c, this.m_slideIndex = -1, cp.movie.stage && (this.m_slideIndex = cp.movie.stage.getSlideIndexForName(c)), this.questionObjName = a, this.progressString = "", this.questionData = cp.D[this.questionObjName], this.latencyTimer = void 0, this.latency = 0, this.timer = void 0, this.score = this.timeBeforePause =
        this.pausedMsecs = this.endTime = this.startTime = 0, this.m_selectedAnswersArr = [], this.isPartialScore = this.questionData.ips, this.timeLimit = this.questionData.tl, this.questionTextCanvasName = this.questionData.qtc, this.feedbackCaptionToBeShown = "", this.currentAttempt = 0, this.numberOfAttempts = this.questionData.noa, this.incorrectFeedbackCaptions = this.questionData.ifc, this.reviewModeBackButtonDivElement = this.reviewModeNextButtonDivElement = this.backButtonDivElement = this.skipButtonDivElement = this.clearButtonDivElement =
        this.submitAllButtonDivElement = this.submitButtonDivElement = void 0, this.shouldReportAnswers = this.questionData.sra, this.lastFeedbackShown = void 0, this.QuestionStatusEnum || (this.QuestionStatusEnum = {}, this.QuestionStatusEnum.INCOMPLETE = cp.QuestionStatusEnum.INCOMPLETE, this.QuestionStatusEnum.INCORRECT = cp.QuestionStatusEnum.INCORRECT, this.QuestionStatusEnum.CORRECT = cp.QuestionStatusEnum.CORRECT, this.QuestionStatusEnum.PARTIAL_CORRECT = cp.QuestionStatusEnum.PARTIAL_CORRECT), this.m_QuestionStatus = this.QuestionStatusEnum.INCOMPLETE,
        this.StateEnum || (this.StateEnum = {}, this.StateEnum.INIT = 0, this.StateEnum.PLAYING = 1, this.StateEnum.PAUSED = 2, this.StateEnum.ENDED = 3), this.state = this.StateEnum.INIT, this.QuestionScoringTypeEnum || (this.QuestionScoringTypeEnum = {}, this.QuestionScoringTypeEnum.SURVEY = 0, this.QuestionScoringTypeEnum.PRETEST = 1, this.QuestionScoringTypeEnum.GRADED = 2), this.m_scoringType = this.QuestionScoringTypeEnum.SURVEY, !0 == this.getIsPretest() ? this.m_scoringType = this.QuestionScoringTypeEnum.PRETEST : !0 == this.getIsSurvey() ? this.m_scoringType =
        this.QuestionScoringTypeEnum.SURVEY : this.m_scoringType = this.QuestionScoringTypeEnum.GRADED, this.verbose = !1, this.shouldAddToTotal = !0, this.m_answersDisabled = this.m_isShuffled = !1, this.m_answerOrderArray = [], this.m_eachAnswerIsSeparateInteraction = this.m_isStarted = this.m_areButtonsDisabled = !1
};
cp.Question.prototype = {
    shouldDisableOptions: function() {
        var a = !1,
            c = this.m_quizController.GetIsInReviewMode() && !this.getIsKnowledgeCheck(),
            a = this.m_quizController.GetIsSubmitAll() && !this.getIsPretest(),
            a = !this.m_quizController.GetIsAttemptFinished() && this.getWasJudged() && !a;
        this.getIsPretest() && this.m_quizController.GetIsPretestQuestionsDisabled() && (a = !0);
        return this.m_answersDisabled = a || c
    },
    showCustomReviewArea: function() {
        return !1
    },
    getIsLastPretestQuestion: function() {
        if (!this.getIsPretest()) return !1;
        var a = this.m_slideIndex + 1;
        return a >= cp.movie.stage.slides.length ? !0 : this.m_quizController ? (a = this.m_quizController.GetQuestionsOnSlide(a)) && 0 < a.length ? !a[0].getIsPretest() : !0 : !1
    },
    getAnswerOptions: function() {
        var a = [],
            c = this.questionData.ao;
        if (!c || 0 >= c.length) return "";
        for (var b = 0; b < c.length; ++b) {
            var d = c[b].split(":");
            a.push(d[0])
        }
        return a
    },
    setShouldAddToTotal: function(a) {
        this.shouldAddToTotal = a
    },
    setQuestionStatus: function(a) {
        this.m_QuestionStatus = a
    },
    getQuestionStatus: function() {
        return this.m_QuestionStatus
    },
    getQuestionScoringType: function() {
        return this.m_scoringType
    },
    getIsCorrect: function() {
        return this.getQuestionStatus() == this.QuestionStatusEnum.CORRECT
    },
    getIsPartiallyCorrect: function() {
        return this.getQuestionStatus() == this.QuestionStatusEnum.PARTIAL_CORRECT
    },
    getIsIncomplete: function() {
        return this.getQuestionStatus() == this.QuestionStatusEnum.INCOMPLETE
    },
    getIsIncorrect: function() {
        return this.getQuestionStatus() == this.QuestionStatusEnum.INCORRECT
    },
    registerSubmitButton: function(a, c) {
        void 0 === c && (c = !1);
        c || (this.submitButtonDivElement = a);
        this.m_areButtonsDisabled ? this.disableButton(a) : this.enableButton(a)
    },
    registerSubmitAllButton: function(a, c) {
        void 0 === c && (c = !1);
        c || (this.submitAllButtonDivElement = a);
        this.m_areButtonsDisabled ? this.disableButton(a) : this.enableButton(a)
    },
    registerSkipButton: function(a, c) {
        void 0 === c && (c = !1);
        c || (this.skipButtonDivElement = a);
        if (this.shouldDisableSkipButton()) cp.disable(a.id), b = cp.D[a.id], b.shouldShowDisabledState = !0, a.disabled = "disabled", a.tabIndex = -1, a.onclick = "", cp.removeGestureEvent(a,
            cp.GESTURE_EVENT_TYPES.TAP), a.style.cursor = "default";
        else {
            cp.enable(a.id);
            var b = cp.D[a.id];
            b.shouldShowDisabledState = !1;
            a.disabled = !1;
            a.style.cursor = "pointer";
            cp.registerGestureEvent(a, cp.GESTURE_EVENT_TYPES.TAP, cp.QuizButtonCH)
        }
    },
    registerClearButton: function(a, c) {
        void 0 === c && (c = !1);
        c || (this.clearButtonDivElement = a);
        this.m_areButtonsDisabled ? this.disableButton(a) : this.enableButton(a)
    },
    registerBackButton: function(a, c) {
        void 0 === c && (c = !1);
        c || (this.backButtonDivElement = a);
        this.enableButton(a)
    },
    registerReviewModeNextButton: function(a,
        c) {
        void 0 === c && (c = !1);
        c || (this.reviewModeNextButtonDivElement = a);
        if (this.shouldDisableReviewModeNextButton()) cp.disable(a.id), b = cp.D[a.id], b.shouldShowDisabledState = !0, a.disabled = "disabled", a.tabIndex = -1, a.onclick = "", cp.removeGestureEvent(a, cp.GESTURE_EVENT_TYPES.TAP), a.style.cursor = "default";
        else {
            cp.enable(a.id);
            var b = cp.D[a.id];
            b.shouldShowDisabledState = !1;
            a.disabled = !1;
            a.style.cursor = "pointer";
            cp.registerGestureEvent(a, cp.GESTURE_EVENT_TYPES.TAP, cp.QuizButtonCH)
        }
    },
    registerReviewModeBackButton: function(a,
        c) {
        void 0 === c && (c = !1);
        c || (this.reviewModeBackButtonDivElement = a);
        this.enableButton(a)
    },
    shouldShowSuccessCaption: function() {
        return this.questionData.osct
    },
    shouldShowPartialCorrectCaption: function() {
        return this.questionData.spcc
    },
    shouldShowFailureCaption: function() {
        return this.questionData.ofct
    },
    shouldShowIncompleteCaption: function() {
        return this.questionData.sic
    },
    shouldShowRetryCaption: function() {
        return this.questionData.sfrc
    },
    shouldShowTimeOutCaption: function() {
        return this.questionData.stfc
    },
    getSuccessCaptionName: function() {
        return this.questionData.osc
    },
    getSuccessFeedback: function() {
        var a = {};
        a.name = this.getSuccessCaptionName();
        a.action = this.getSuccessAction();
        a.captionToBeShown = this.shouldShowSuccessCaption();
        return a
    },
    getPartialCorrectCaptionName: function() {
        return this.questionData.opcc
    },
    getPartialCorrectFeedback: function() {
        var a = {};
        a.name = this.getPartialCorrectCaptionName();
        a.action = this.getSuccessAction();
        a.captionToBeShown = this.shouldShowPartialCorrectCaption();
        return a
    },
    getRetryCaptionName: function() {
        return this.questionData.frc
    },
    getRetryFeedback: function() {
        var a = {};
        a.name = this.getRetryCaptionName();
        a.action = "";
        a.captionToBeShown = this.shouldShowRetryCaption();
        return a
    },
    getFailureCaptionName: function(a) {
        return this.incorrectFeedbackCaptions && 0 == this.incorrectFeedbackCaptions.length || a >= this.incorrectFeedbackCaptions.length || 0 > a ? void 0 : this.incorrectFeedbackCaptions[a]
    },
    getFailureFeedback: function(a) {
        var c = {};
        c.name = this.getFailureCaptionName(a);
        this.currentAttempt >= this.numberOfAttempts ? (cp.verbose && cp.log("Last Attempt. Setting action now."), c.action = this.getFailureAction()) :
            (cp.verbose && cp.log("Current Attempt :" + this.currentAttempt), c.action = "");
        c.captionToBeShown = this.shouldShowFailureCaption();
        return c
    },
    getIncompleteCaptionName: function() {
        return this.questionData.oic
    },
    getIncompleteFeedback: function() {
        var a = {};
        a.name = this.getIncompleteCaptionName();
        a.action = "";
        a.captionToBeShown = this.shouldShowIncompleteCaption();
        return a
    },
    getTimeOutCaptionName: function() {
        return this.questionData.tfcn
    },
    getTimeOutFeedback: function() {
        var a = {};
        a.name = this.getTimeOutCaptionName();
        a.action =
            "cpCmndResume = 1;";
        a.captionToBeShown = this.shouldShowTimeOutCaption();
        return a
    },
    getSuccessAction: function() {
        return this.questionData.oca
    },
    getFailureAction: function() {
        return this.questionData.ofa
    },
    getSlideIndex: function() {
        return this.m_slideIndex
    },
    resetQuestionData: function() {
        this.score = this.latency = 0;
        this.wasJudged = !1;
        this.m_QuestionStatus = this.QuestionStatusEnum.INCOMPLETE;
        this.setCurrentAttempt(0);
        this.enableQuizButtons();
        this.m_answersDisabled = !1;
        this.m_questionScore && this.m_questionScore.resetScore()
    },
    setActionToBeExecuted: function(a) {
        this.actionToBeExecuted = a
    },
    getActionToBeExecuted: function() {
        return this.actionToBeExecuted
    },
    getName: function() {
        return this.questionObjName
    },
    startLatency: function() {
        if (!this.getWasJudged() && !this.m_quizController.GetIsInReviewMode()) {
            this.latency = 0;
            var a = this;
            this.latencyTimer = setInterval(function() {
                a.latencyTimer += 100
            }, 100);
            this.timeLimit && 0 < this.timeLimit && (this.timer = setTimeout(function() {
                a.verbose && cp.log("Calling Timeout");
                a.disableAllOptions();
                a.stopLatencyTimer();
                a.autoJudge()
            }, this.timeLimit))
        }
    },
    stopLatencyTimer: function() {
        this.timer && (this.verbose && cp.log("Clearing Timeout"), clearTimeout(this.timer));
        this.latencyTimer && clearInterval(this.latencyTimer)
    },
    getLatency: function() {
        return this.latency = void 0 != this.startTime && 0 != this.startTime && void 0 != this.endTime && 0 != this.endTime ? this.endTime.getTime() - this.startTime.getTime() - this.pausedMsecs : 0
    },
    getAssociatedObjName: function() {
        return this.associatedObjName
    },
    getQuestionType: function() {
        return this.questionType =
            this.questionData.qtp
    },
    getAnswerGroupName: function() {
        return this.answerGroupName = this.questionData.gn
    },
    getQuestionText: function() {
        this.questionText = this.questionData.qt;
        if (cp.responsive) {
            var a = cp.D[this.questionTextCanvasName];
            if (a && (a = cp.D[a.dn])) this.questionText = a.rpvt[cp.responsiveWidths[cp.responsiveWidths.length - 1]].text
        }
        return this.questionText
    },
    getSelectedAnswerTextList: function() {
        return ""
    },
    getExpectedCorrectAnswerTextList: function() {
        return ""
    },
    getAnswerTexts: function() {
        var a = {};
        a.learner_response =
            this.getSelectedAnswerTextList("-");
        a.correct_response = this.getExpectedCorrectAnswerTextList("-");
        return a
    },
    getDescriptionText: function() {
        var a = {};
        a.questionText = this.getQuestionText();
        a.answerTexts = this.getAnswerTexts();
        return a
    },
    getProgressString: function(a) {
        this.progressString = "";
        if (!this.m_quizController) return this.progressString;
        var c = this.getQuestionNumberInQuiz() + 1,
            b = this.m_quizController.GetNumberOfQuestionsInQuiz(),
            d = 0,
            e = 0,
            f = cp.movie.questionObjs,
            h = 0;
        f && (h = f.length);
        for (var g = 0; g < h; ++g) f[g] &&
            f[g].getIsKnowledgeCheck() && (d++, g < c && e++);
        c -= e;
        b -= d;
        if (d = this.m_quizController.GetGraphManager()) c = d.getQuestionSlideProgressNumber(this.m_slideIndex), b = d.getNumQuestions();
        if ("NaN" == c) return this.progressString;
        d = this.m_quizController.GetProgressType();
        (e = this.m_quizController.GetForceAbsoluteProgressType()) && (d = 1);
        0 == d ? "NaN" == b && (a = a.substr(0, a.indexOf("%d") + 2)) : e && (a = a.substr(0, a.indexOf("%d") + 2));
        return this.progressString = a.replace("%d", c).replace("%d", b)
    },
    getAnsweredCorrectly: function() {
        var a =
            this.getQuestionStatus();
        return a == this.QuestionStatusEnum.CORRECT || a == this.QuestionStatusEnum.PARTIAL_CORRECT ? !0 : !1
    },
    getIsTracked: function() {
        return this.isTracked = this.questionData.it
    },
    getIsSurvey: function() {
        return this.isSurvey = this.questionData.is
    },
    getIsPretest: function() {
        return this.questionData.ipq
    },
    getIsKnowledgeCheck: function() {
        return this.questionData.ikc
    },
    getNumberOfAttempts: function() {
        return this.numberOfAttempts
    },
    getCurrentAttempt: function() {
        return this.currentAttempt
    },
    setCurrentAttempt: function(a) {
        var c =
            this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.m_quizController.GetIsInReviewMode();
        this.m_questionScore && (this.m_questionScore.m_numTries = a);
        this.currentAttempt = a;
        if (this.currentAttempt >= this.numberOfAttempts && !c && (this.disableAllOptions(), this.submitButtonDivElement && (this.submitButtonDivElement.enable = !1), this.clearButtonDivElement)) this.clearButtonDivElement.enable = !1
    },
    getQuestionNumberInQuiz: function() {
        return this.questionNumberInQuiz = this.questionData.qnq
    },
    getObjectiveId: function() {
        return this.objectiveID =
            this.questionData.oid
    },
    getInteractionId: function() {
        this.interactionID = this.questionData.iid;
        var a = this.m_quizController.GetPlaybackController(),
            c = a.GetLMSType();
        c && (c = c.toUpperCase());
        if (!a.IsRunningInConnect() && ("SCORM12" == c || "AICC" == c)) a = this.getQuestionText(), this.interactionID = this.interactionID + "_" + a;
        return this.interactionID
    },
    getWeighting: function() {
        return this.weighting = this.questionData.w
    },
    getNegativeWeight: function() {
        return this.questionData.nw
    },
    getInteractionType: function() {
        return this.interactionType =
            this.questionData.itp
    },
    getScore: function() {
        return this.score
    },
    setScore: function(a) {
        this.score = this.shouldAddToTotal ? a : 0
    },
    getSelectedAnswerChoices: function() {
        return this.getSelectedAnswersAsString()
    },
    getSelectedAnswersAsString: function() {
        var a = "";
        if (!this.m_selectedAnswersArr || 0 >= this.m_selectedAnswersArr.length) return a;
        for (var a = a + this.m_selectedAnswersArr[0], c = 1; c < this.m_selectedAnswersArr.length; ++c) a += ";", a += this.m_selectedAnswersArr[c];
        return a
    },
    setSelectedAnswers: function(a) {
        this.m_selectedAnswersArr =
            [];
        this.m_selectedAnswersArr.push(a)
    },
    getAnswerOrder: function() {
        if (!this.answerOptions || 0 >= this.answerOptions.length) return "";
        for (var a = "", a = this.answerOptions[0], c = 1; c < this.answerOptions.length; ++c) a += ";", a += this.answerOptions[c];
        return a
    },
    setAnswerOrder: function(a) {
        a && !(0 >= a.length) && (this.answerOptions = a.split(";"), this.m_answerOrderArray = this.answerOptions.slice(0))
    },
    getAnswerID: function(a) {
        a = cp(cp.D[a.parentNode.parentNode.id].answerTextCanvasHolder).firstChild;
        return cp.D[a.id].aid
    },
    getExpectedCorrectAnswerIDList: function() {
        return this.questionData.cal
    },
    getQuestionLevelScoredPoints: function() {
        var a = 0;
        return a = this.getAnsweredCorrectly() ? this.getWeighting() : this.getNegativeWeight()
    },
    getQuestionScoredPoints: function() {
        return this.getIsSurvey() || !this.wasJudged ? 0 : this.getQuestionLevelScoredPoints()
    },
    getChosenAnswerFeedback: function() {},
    getFeedbackToShow: function(a, c) {
        var b = {},
            b = this.getChosenAnswerFeedback();
        if (c && this.shouldShowTimeOutCaption()) return b = this.getTimeOutFeedback();
        if (this.getIsIncomplete() && !a && this.shouldShowIncompleteCaption()) return b =
            this.getIncompleteFeedback();
        if (b) return b;
        this.getAnsweredCorrectly() ? b = this.getIsPartiallyCorrect() ? this.getPartialCorrectFeedback() : this.getSuccessFeedback() : this.shouldShowRetryCaption() && this.currentAttempt < this.numberOfAttempts ? b = this.getRetryFeedback() : this.getIsIncomplete() && a || this.currentAttempt >= this.numberOfAttempts ? (b = 0, this.incorrectFeedbackCaptions && (b = this.incorrectFeedbackCaptions.length - 1), b = this.getFailureFeedback(b)) : b = this.currentAttempt <= this.incorrectFeedbackCaptions.length ?
            this.getFailureFeedback(this.currentAttempt - 1) : void 0;
        return b
    },
    hideLastFeedback: function() {
        this.lastFeedbackShown && cp.hide(this.lastFeedbackShown.name);
        this.lastFeedbackShown = void 0
    },
    saveAnswerOrder: function() {},
    pauseQuestion: function() {
        if (this.state == this.StateEnum.PLAYING) {
            this.state = this.StateEnum.PAUSED;
            this.stopLatencyTimer();
            var a = new Date;
            this.timeBeforePause = this.startTime.getMilliseconds() - a.getMilliseconds();
            this.pausedMsecs += this.timeBeforePause;
            this.timeLimit -= this.timeBeforePause;
            this.timeBeforePause =
                0
        }
    },
    resumeQuestion: function() {
        this.state == this.StateEnum.PAUSED && (this.state = this.StateEnum.PLAYING, !this.m_quizController.GetIsInReviewMode() && 0 < this.timeLimit && this.startLatency())
    },
    endQuestion: function(a) {
        this.verbose && cp.log("End Question Called");
        if (this.state == this.StateEnum.PLAYING || this.state == this.StateEnum.PAUSED) {
            this.state = this.StateEnum.ENDED;
            this.stopLatencyTimer();
            var c = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest(),
                b = this.m_quizController && this.m_quizController.GetIsInReviewMode();
            c && !b && this.checkAndSetQuestionStatus();
            b || this.saveAnswerOrder();
            var d = this.getAnsweredCorrectly();
            this.endTime = new Date;
            this.m_questionScore.m_endTime = this.endTime;
            this.m_questionScore.m_answerScores = this.getAnswerScores();
            var e = this.getIsIncomplete();
            this.m_questionScore.m_answersIncomplete = a || b || this.m_answersDisabled || c ? e : !0;
            this.m_questionScore.m_answeredCorrectly = this.getAnsweredCorrectly();
            this.m_questionScore.m_isShuffled = this.m_isShuffled;
            this.m_questionScore.m_partiallyCorrect = this.getIsPartiallyCorrect();
            a ? (this.wasJudged = this.m_questionScore.m_wasJudged = a, this.disableAllOptions(), this.disableQuizButtons(), this.setHandledClick(!0), this.stopLatencyTimer(), b = this.getQuestionScoredPoints(), this.setScore(b), this.m_questionScore.m_scoredPoints = this.getScore(), this.getIsPretest() || (d ? this.m_quizController && cp._cpQuizScopeSlide(this.m_quizController.GetNextQuestionSlideNumber()) : cp._cpQuizScopeSlide(cpInfoCurrentSlideIndex))) : (!this.getIsPretest() && !this.getIsKnowledgeCheck() && cp._cpQuizScopeSlide(cpInfoCurrentSlideIndex),
                c ? (this.m_questionScore.m_wasJudged = !e, this.setCurrentAttempt(1), this.wasJudged = !this.getIsIncomplete(), b = this.getQuestionScoredPoints(), this.setScore(b), this.m_questionScore.m_scoredPoints = this.getScore()) : this.getWasJudged() || (this.wasJudged = this.m_questionScore.m_wasJudged = !1, this.setScore(0), this.m_questionScore.m_scoredPoints = 0));
            d && (c || this.disableAllOptions(), this.getIsPretest() && (cpQuizInfoPreTestTotalCorrectAnswers += 1), cpQuizInfoTotalCorrectAnswers += 1);
            cpQuizInfoAnswerChoice = this.getSelectedAnswerChoices();
            this.getIsSurvey() ? cpQuizInfoLastSlidePointScored = 0 : (cpQuizInfoNoQuestionsPerQuiz += 1, cpQuizInfoLastSlidePointScored = this.getQuestionScoredPoints());
            d = this.getDescriptionText();
            a && (this.getIsTracked() && !this.m_quizController.GetIsInReviewMode()) && (this.m_eachAnswerIsSeparateInteraction ? this.shouldReportAnswers && this.sendInteractionDataForEachAnswer && this.sendInteractionDataForEachAnswer(d) : this.shouldReportAnswers && this.m_quizController.SendInteractionData(this.getQuestionScore(), d), a = this.m_quizController.GetScore(),
                d = this.m_quizController.GetMaxScore(), b = this.m_quizController.GetMinScore(), cp.em.fireEvent("SCORE", {
                    score: a,
                    maxScore: d,
                    minScore: b,
                    quizId: cp.D.quizzingData.quizID
                }));
            a = this.m_quizController.GetPlaybackController();
            cp.m_isLMSPreview && void 0 != cp.LMSDriverHolder && cp.toggleLMSPreviewDebugLogsColor(cp.LMSDriverHolder);
            d = a.GetSendCourseDataWithInteractionData();
            this.wasJudged && (d && !c) && ((c = a.GetLMSType()) && c.toUpperCase(), a.GetIsTracked(), a.SendCourseData(!1))
        }
    },
    autoJudge: function() {
        this.verbose && cp.log("inside autojudge");
        this.setCurrentAttempt(this.numberOfAttempts - 1);
        this.judge(!0, !0)
    },
    checkAndSetQuestionStatus: function() {},
    judge: function(a, c) {
        this.verbose && cp.log("inside judge");
        this.saveAnswerOrder();
        this.hideLastFeedback(!1);
        var b = this.shouldShowIncompleteCaption(),
            d = this.getIsSurvey(),
            e;
        this.checkAndSetQuestionStatus();
        d ? (this.verbose && cp.log("inside judge : isSurvey"), this.getIsIncomplete() ? (this.verbose && cp.log("inside judge : incomplete"), e = this.getFeedbackToShow(a, c)) : (this.setCurrentAttempt(this.currentAttempt +
            1), this.endQuestion(!0), e = this.getFeedbackToShow(a, !1))) : this.currentAttempt < this.numberOfAttempts && (this.getIsIncomplete() && !a && b ? e = this.getFeedbackToShow(a, c) : (this.setCurrentAttempt(this.currentAttempt + 1), e = this.getFeedbackToShow(a, c), this.currentAttempt >= this.numberOfAttempts || this.getAnsweredCorrectly() ? this.endQuestion(!0) : (this.getIsIncorrect() && this.setQuestionStatus(this.QuestionStatusEnum.INCOMPLETE), b = this.m_quizController.GetPlaybackController(), b.GetSendCourseDataWithInteractionData() &&
            ((d = b.GetLMSType()) && (d = d.toUpperCase()), b.GetIsTracked() && "EMAIL" != d && "ACROBAT" != d && "INTERNALSERVER" != d && "AICC" != d ? b.SendCourseData(!0) : b.SendCourseData(!1)))));
        if (e && (cp.D[e.name] && e.captionToBeShown ? this.showFeedbackCaptionAndDoAction(e) : cp.movie.executeAction(e.action), this.m_quizController && this.getIsLastPretestQuestion() && (this.currentAttempt >= this.numberOfAttempts || this.getAnsweredCorrectly()))) this.m_quizController.m_PretestQuestionsDisabled = !0;
        e = this.getQuestionEventData();
        cp.em.fireEvent("CPQuestionSubmit",
            e)
    },
    getQuestionEventData: function() {
        var a = {};
        switch (this.getQuestionScoringType()) {
            case this.QuestionScoringTypeEnum.GRADED:
                a.Name = "GradedQuestion";
                break;
            case this.QuestionScoringTypeEnum.SURVEY:
                a.Name = "SurveyQuestion";
                break;
            case this.QuestionScoringTypeEnum.PRETEST:
                a.Name = "PretestQuestion";
                break;
            default:
                a.Name = "GradedQuestion"
        }
        var c = this.getInteractionType(),
            b = this.getDescriptionText(),
            d = this.getCorrectAnswerAsString(),
            e = this.getChosenAnswerAsString();
        switch (c) {
            case "sequencing":
                d = b.answerTexts.correct_response.split("-").join(",");
                e = b.answerTexts.learner_response.split("-").join(",");
                break;
            case "likert":
                d = e = b.answerTexts.learner_response
        }
        a = {
            questionType: "hotspot" == c ? "hot-spot" : c,
            objectiveID: this.getObjectiveId(),
            questionScoringType: a,
            questionMaxScore: this.getWeighting(),
            correctAnswer: String(d),
            questionMaxAttempts: this.numberOfAttempts,
            selectedAnswer: String(e),
            slideNumber: this.m_slideIndex,
            quizName: "QuizName",
            interactionID: this.getInteractionId(),
            questionAttempts: this.currentAttempt,
            questionNumber: this.getQuestionNumberInQuiz(),
            questionAnswered: !1 == this.getIsIncomplete(),
            questionScore: this.getScore(),
            reportAnswers: this.shouldReportAnswers,
            questionAnsweredCorrectly: this.getAnsweredCorrectly(),
            infiniteAttempts: 9999 == this.numberOfAttempts,
            interactionType: this.getInteractionType(),
            weighting: this.getWeighting()
        };
        cp.IsRunningInACAP && (a.descriptionData = b);
        return a
    },
    showFeedbackCaptionAndDoAction: function(a) {
        function c() {
            b.parentNode.removeChild(b);
            cp.hide(d);
            h.setHandledClick(f);
            cp.movie.executeAction(a.action)
        }
        var b, d = a.name,
            e = cp.D[d].mdi;
        this.hideLastFeedback(!0);
        var f;
        this.slide && (f = cp.D[this.slide].handled);
        this.setHandledClick(!1);
        this.lastFeedbackShown = a;
        var h = this,
            g = document.getElementById(d);
        cp.moveDivElemToTop(g);
        e = document.getElementById(e);
        void 0 != e && cp.moveRewrapElemToTop(e.parentNode);
        e = cp.D[d];
        g = e.sc;
        g = new cp.Shortcut(g.k, g.c ? !0 : !1, g.s ? !0 : !1, g.a ? !0 : !1);
        (e = new cp.KeyHandler(function(a) {
            a && c()
        }, g, e.from, e.to, "")) && cp.movie.stage.addKeyHandler(e);
        cp.show(d, {
            forceHideTextScalingIcon: !0
        });
        e = cp.movie.stage.getSlideDiv();
        b = cp.newElem("div");
        cp.fixWebkitScaling(b);
        b.id = "feedbackClickDiv";
        b.style.left = "0px";
        b.style.top = "0px";
        b.style.width = "100%";
        b.style.height = "100%";
        b.style.cursor = "pointer";
        cp.MSIE != cp.browser ? (b.style.backgroundColor = "#FFFFFF", b.style.opacity = 0) : b.style.backgroundColor = "rgba(255,255,255,0)";
        b.style.display = "block";
        b.style.position = "absolute";
        b.style.WebkitTapHighlightColor = "rgba(0,0,0,0)";
        e.parentNode.appendChild(b);
        cp.clearGestureCache(b);
        cp.registerGestureEvent(b, cp.GESTURE_EVENT_TYPES.TAP, c);
        cp.registerGestureEvent(b,
            cp.GESTURE_EVENT_TYPES.DRAG_START, cp.m_gestureHandler.ondragstarthandler);
        cp.registerGestureEvent(b, cp.GESTURE_EVENT_TYPES.DRAG, cp.m_gestureHandler.ondraghandler);
        cp.registerGestureEvent(b, cp.GESTURE_EVENT_TYPES.DRAG_END, cp.m_gestureHandler.ondragendhandler);
        b.style.zIndex = 1E4
    },
    clearButtonClickHandler: function() {
        this.clearAnswers()
    },
    reviewmodemoveForward: function() {
        if (this.reviewModeNextButtonDivElement && !this.reviewModeNextButtonDivElement.disabled && this.m_quizController) {
            if (!1 == this.m_quizController.GetIsInReviewMode() &&
                (this.getIsPretest() || !this.m_quizController || !this.m_quizController.GetIsSubmitAll())) {
                var a = this.getQuestionEventData();
                cp.em.fireEvent("CPQuestionSkip", a)
            }
            a = this.m_quizController && this.m_quizController.GetIsSubmitAll();
            !this.getWasJudged() && !a && this.clearAnswers();
            if (cpInfoCurrentSlideIndex == cpInfoSlideCount) cpCmndResume = !0;
            else if (this.getIsLastPretestQuestion()) this.m_quizController && this.m_quizController.ExecutePretestAction(this.getSlideIndex());
            else {
                a = -1;
                if (this.m_quizController) {
                    var c = this.m_quizController.GetGraphManager();
                    if (c && (a = this.m_quizController.GetNextQuestionSlideNumber(), -1 == a))
                        for (var c = c.GetPrevBranch(), b = cpInfoCurrentSlideIndex, d = 0; d < c.length; ++d) {
                            var e = c[d],
                                f = "",
                                h = this.m_quizController.GetQuestionsOnSlide(e);
                            if (h && 0 < h.length) {
                                var g = !1;
                                (h = h[0]) && h.getIsKnowledgeCheck() && (g = !0);
                                g || (f = "Question")
                            } else this.m_quizController.GetAnyScoreSlideIndex() == e && (f = "AnyScoreSlide");
                            if (("AnyScoreSlide" == f || "Question" == f) && e > b) {
                                a = e;
                                break
                            }
                        }
                } - 1 == a ? cpCmndNextOnReview = !0 : cpCmndGotoSlideAndResume = a
            }
        }
    },
    moveForward: function() {
        if (this.skipButtonDivElement &&
            !this.skipButtonDivElement.disabled && this.m_quizController) {
            var a = this.m_quizController.GetIsInReviewMode();
            if (!1 == a && (this.getIsPretest() || !this.m_quizController || !this.m_quizController.GetIsSubmitAll())) {
                var c = this.getQuestionEventData();
                cp.em.fireEvent("CPQuestionSkip", c)
            }
            c = this.m_quizController && this.m_quizController.GetIsSubmitAll();
            !this.getWasJudged() && !c && this.clearAnswers();
            if (cpInfoCurrentSlideIndex == cpInfoSlideCount) cpCmndResume = !0;
            else if (this.getIsLastPretestQuestion()) this.m_quizController &&
                this.m_quizController.ExecutePretestAction(this.getSlideIndex());
            else {
                if ((a = !1 == a && !(this.getIsPretest() || c)) && this.m_quizController)
                    if (a = this.m_quizController.GetGraphManager(), void 0 != a) {
                        c = a.getNextSlideList(this.getSlideIndex());
                        if (1 == c.length) cpCmndGotoSlideAndResume = c[0];
                        else
                            for (var c = a.getBranchHistory(), b = c.length - 1; 0 <= b; --b) {
                                var d = c[b];
                                if (d == this.getSlideIndex() && b != c.length - 1) {
                                    var e = c[b + 1];
                                    if (a.getIsJumpValid(d, e)) {
                                        cpCmndGotoSlideAndResume = e;
                                        break
                                    }
                                }
                            }
                        return
                    }
                cpCmndNextOnReview = !0
            }
        }
    },
    moveBackward: function() {
        if (this.backButtonDivElement &&
            !this.backButtonDivElement.disabled && this.m_quizController) {
            var a = this.m_quizController.GetIsInReviewMode(),
                c = this.m_quizController && this.m_quizController.GetIsSubmitAll();
            if (!1 == a && this.m_quizController && (a = this.m_quizController.GetGraphManager(), void 0 != a)) {
                for (var b = a.getBranchHistory(), d = b.length - 1; 0 <= d; --d) {
                    var e = b[d];
                    if (e == this.getSlideIndex() && 0 != d) {
                        var f = b[d - 1];
                        if (a.getIsJumpValid(f, e)) {
                            !this.getWasJudged() && !c && this.clearAnswers();
                            cpCmndGotoSlideAndResume = f;
                            break
                        }
                    }
                }
                return
            }!this.getWasJudged() &&
                !c && this.clearAnswers();
            cpCmndPreviousOnReview = !0
        }
    },
    reviewmodemoveBackward: function() {
        if (this.reviewModeBackButtonDivElement && !this.reviewModeBackButtonDivElement.disabled && this.m_quizController) {
            this.m_quizController.GetIsInReviewMode();
            var a = this.m_quizController && this.m_quizController.GetIsSubmitAll();
            !this.getWasJudged() && !a && this.clearAnswers();
            cpCmndPreviousOnReview = !0
        }
    },
    skipButtonClickHandler: function(a) {
        cp.D[a.id] && this.moveForward()
    },
    backButtonClickHandler: function(a) {
        cp.D[a.id] && this.moveBackward()
    },
    reviewModeNextButtonClickHandler: function(a) {
        cp.D[a.id] && this.reviewmodemoveForward()
    },
    reviewModeBackButtonClickHandler: function(a) {
        cp.D[a.id] && this.reviewmodemoveBackward()
    },
    clearAnswers: function() {},
    disableAllOptions: function() {},
    getIsStarted: function() {
        return this.m_isStarted
    },
    startQuestion: function() {
        if (this.m_quizController) {
            void 0 == this.m_questionScore && (this.m_questionScore = new cp.QuestionScore);
            var a = this.m_quizController.GetIsInReviewMode(),
                c = this.m_quizController.GetGoToQuizScopeActionExecuted();
            if (c && !a || this.getIsKnowledgeCheck()) this.getIsPretest() || this.resetQuestionData(), this.m_quizController.SetGoToQuizScopeActionExecuted(!1);
            this.verbose && cp.log("current state : " + this.state);
            if (this.state == this.StateEnum.INIT || this.state == this.StateEnum.ENDED) {
                this.verbose && cp.log("startQuestion");
                this.state = this.StateEnum.PLAYING;
                this.updateQuizProgressIndicator();
                if ((a || this.getWasJudged()) && !this.getIsKnowledgeCheck()) {
                    var b = c && !this.getIsPretest() && !this.getIsKnowledgeCheck();
                    if (a || !b) this.disableAllOptions(),
                        this.disableQuizButtons();
                    a && this.canShowReviewIcons() && this.markQuestionFeedback()
                } else this.startLatency(), this.startTime = new Date, 0 == this.m_questionScore.m_numTries && (this.m_questionScore.m_startTime = this.startTime);
                a = this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
                if (0 == this.getCurrentAttempt() && !a || this.getIsIncomplete())
                    if (this.getCurrentAttempt() < this.getNumberOfAttempts() && (!this.m_quizController.GetIsPretestQuestionsDisabled() || !this.getIsPretest())) c || this.clearAnswers();
                cpQuizInfoPointsPerQuestionSlide =
                    this.getWeighting();
                cpQuizInfoNegativePointsOnCurrentQuestionSlide = this.getNegativeWeight();
                cpQuizInfoQuestionPartialScoreOn = this.isPartialScore;
                void 0 != this.timeLimit && (cpQuizInfoQuestionSlideTiming = this.timeLimit / 1E3);
                cpQuizInfoAnswerChoice = "";
                cpQuizInfoQuestionSlideType = this.getInteractionType();
                cpQuizInfoMaxAttemptsOnCurrentQuestion = this.numberOfAttempts;
                c = this.m_quizController.GetPassingScore();
                a = this.m_quizController.GetMaxScore();
                cpQuizInfoQuizPassPoints = c;
                0 != a && (cpQuizInfoQuizPassPercent =
                    parseInt(100 * c / a))
            }
            this.m_isStarted = !0
        }
    },
    markQuestionFeedback: function() {
        if (this.getWasJudged() && this.questionTextCanvasName) {
            var a = cp.D[this.questionTextCanvasName],
                c = "re-" + this.questionTextCanvasName,
                b = cp.newElem("img");
            cp.fixWebkitScaling(b);
            var d = this.getQuestionStatus();
            d == this.QuestionStatusEnum.CORRECT ? (b.src = cp.movie.im.m_projectImages["assets/htmlimages/correct_question_normal.png"].nativeImage.src, b.setAttribute("tabIndex", "-1"), void 0 != this.m_correctFeedbackText && (b.setAttribute("aria-label",
                this.m_correctFeedbackText), cp.removeAccessibilityOutline(b), b.setAttribute("role", "img"))) : d == this.QuestionStatusEnum.PARTIAL_CORRECT ? (b.src = cp.movie.im.m_projectImages["assets/htmlimages/partial_correct_question_normal.png"].nativeImage.src, b.setAttribute("tabIndex", "-1"), void 0 != this.m_partialCorrectFeedbackText && (b.setAttribute("aria-label", this.m_partialCorrectFeedbackText), cp.removeAccessibilityOutline(b), b.setAttribute("role", "img"))) : (b.src = cp.movie.im.m_projectImages["assets/htmlimages/incorrect_question_normal.png"].nativeImage.src,
                void 0 != this.m_incorrectDisplayChosenText && (void 0 != this.m_incorrectDisplayCorrectText && "Hotspot" != this.getQuestionType()) && (d = "".concat(this.m_incorrectDisplayChosenText, " ", this.getChosenAnswerAsStringForReview(), " ", this.m_incorrectDisplayCorrectText, " ", this.getCorrectAnswerAsStringForReview()), b.setAttribute("tabIndex", "-1"), b.setAttribute("aria-label", d), cp.removeAccessibilityOutline(b), b.setAttribute("role", "img")));
            a.sh && (d = a.sh.a, cp.applyShadow(b, a.sh.d * Math.cos(Math.PI * d / 180) + "px " + a.sh.d *
                Math.sin(Math.PI * d / 180) + "px " + a.sh.b + "px " + cp.ConvertRGBToRGBA(a.sh.c, a.sh.o) + (a.sh.i ? " inset" : "")));
            b.style.left = "-30px";
            b.style.top = "0px";
            b.style.position = "absolute";
            document.getElementById(c).appendChild(b)
        }
    },
    getWasJudged: function() {
        return this.wasJudged
    },
    setHandledClick: function(a) {
        this.slide && (cp.D[this.slide].handled = a)
    },
    enableButton: function(a) {
        void 0 != a && (cp.enable(a.id), a.disabled = !1, a.style.cursor = "pointer", cp.registerGestureEvent(a, cp.GESTURE_EVENT_TYPES.TAP, cp.QuizButtonCH))
    },
    enableQuizButtons: function() {
        this.verbose &&
            cp.log("Enabling buttons");
        this.enableButton(this.submitButtonDivElement);
        this.enableButton(this.clearButtonDivElement);
        this.enableButton(this.submitAllButtonDivElement);
        this.m_areButtonsDisabled = !1
    },
    disableButton: function(a) {
        void 0 != a && (cp.disable(a.id), a.disabled = "disabled", a.tabIndex = -1, a.style.cursor = "default", a.onclick = "", cp.removeGestureEvent(a, cp.GESTURE_EVENT_TYPES.TAP))
    },
    disableQuizButtons: function() {
        this.verbose && cp.log("Disabling buttons");
        if (this.m_quizController) {
            var a = !0;
            this.m_quizController.GetIsSubmitAll() &&
                !this.getIsPretest() && (!this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions) && (a = !1);
            a && (this.disableButton(this.submitButtonDivElement), this.disableButton(this.clearButtonDivElement), this.disableButton(this.submitAllButtonDivElement), this.m_areButtonsDisabled = !0)
        }
    },
    shouldDisableSkipButton: function() {
        var a = !1;
        if (this.m_quizController.GetIsInReviewMode()) return !1;
        var c = this.m_quizController.GetIsSubmitAll();
        if ("mustAnswer" == this.m_quizController.GetQuestionAdvanceType() &&
            !c && !this.m_answersDisabled && !this.getIsPretest() && !this.getIsKnowledgeCheck()) return !0;
        var b = this.getSlideIndex();
        if (0 <= b && (!this.getIsPretest() && !c) && (c = this.m_quizController.GetGraphManager(), void 0 != c)) {
            var d = c.getNextSlideList(b);
            if (void 0 != d)
                if (1 == d.length) a = !1;
                else if (a = !0, d = c.getBranchHistory(), void 0 != d)
                for (var e = d.length - 1; 0 <= e; --e) {
                    var f = d[e];
                    if (f == b && e != d.length - 1 && c.getIsJumpValid(f, d[e + 1])) {
                        a = !1;
                        break
                    }
                }
        }
        return a
    },
    shouldDisableReviewModeNextButton: function() {
        return this.m_quizController.GetIsInReviewMode() ?
            !1 : !0
    },
    canShowReviewIcons: function() {
        return this.getIsSurvey() || this.getIsIncomplete() || !this.m_quizController || !this.m_quizController.GetIsInReviewMode() || this.getIsPretest() || this.getIsKnowledgeCheck() ? !1 : !0
    },
    getIsAttempted: function() {
        return 0 < this.currentAttempt
    },
    resumeSelectedAnswers: function(a) {
        if (void 0 != a) {
            this.m_selectedAnswersArr = [];
            for (var c = 0; c < a.length; ++c) "1" == a[c].m_chosenAnswer && this.m_selectedAnswersArr.push(a[c].m_answerID)
        }
    },
    getChosenAnswerAsString: function() {
        return this.getSelectedAnswersAsString()
    },
    getCorrectAnswerAsString: function() {
        var a = this.getExpectedCorrectAnswerIDList();
        if (0 >= a.length) return "0";
        for (var c = a[0], b = 1; b < a.length; ++b) c += ";" + a[b];
        return c
    },
    getChosenAnswerAsStringForReview: function() {
        return ""
    },
    getCorrectAnswerAsStringForReview: function() {
        return ""
    },
    getAnswerScores: function() {
        var a = [];
        if (!this.answerOptions) return a;
        for (var c = this.m_selectedAnswersArr.slice(0), b = {}, d = 0; d < c.length; ++d) b[c[d]] = c[d];
        for (c = 0; c < this.answerOptions.length; ++c)
            if (d = cp.D[this.answerOptions[c]]) {
                var e = new cp.AnswerScore;
                e.m_answerID = d.aid;
                e.m_correctAnswer = d.ic ? "1" : "0";
                e.m_chosenAnswer = b[e.m_answerID] ? "1" : "0";
                a.push(e)
            }
        return a
    },
    getQuestionScore: function() {
        if (this.m_questionScore) {
            this.m_questionScore.m_isPretestQuestion = this.getIsPretest();
            this.m_questionScore.m_isKnowledgeCheck = this.getIsKnowledgeCheck();
            this.m_questionScore.m_slideNum = this.m_slideIndex;
            this.m_questionScore.m_questionNumInQuiz = this.getQuestionNumberInQuiz();
            this.getQuestionStatus();
            this.m_questionScore.m_numTries = this.getCurrentAttempt();
            this.m_questionScore.setinteractionType(this.getInteractionType());
            this.setQuestionSpecificScoreProperties(this.m_questionScore.m_questionSpecificScore);
            this.m_questionScore.m_interactionID = this.getInteractionId();
            this.m_questionScore.m_objectiveID = this.getObjectiveId();
            this.m_questionScore.m_chosenAnswersAsString = this.getChosenAnswerAsString();
            this.m_questionScore.m_isCorrectAsString = this.getAnsweredCorrectly() ? "C" : "W";
            this.m_questionScore.m_correctAnswersAsString = this.getCorrectAnswerAsString();
            this.m_questionScore.m_scoringType = this.getQuestionScoringType();
            this.m_questionScore.m_maxTries =
                this.numberOfAttempts;
            var a = this.getDescriptionText();
            this.m_questionScore.m_descriptionTexts = a;
            this.m_questionScore.m_weighting = this.getWeighting();
            this.m_questionScore.m_scoredPoints = this.getScore();
            this.m_questionScore.m_negativeWeight = this.getNegativeWeight();
            addLeadingZero = function(a) {
                return 10 > a ? "0" + a : a
            };
            a = this.getLatency();
            this.m_questionScore.m_latencyAsSeconds = a;
            this.m_questionScore.m_latencyAsString = addLeadingZero(Math.round(a / 3600)) + ":" + addLeadingZero(Math.round(a % 3600 / 60)) + ":" + addLeadingZero(Math.round(a) %
                60);
            a = new Date;
            this.m_questionScore.m_curDateAsString = addLeadingZero(a.getMonth() + 1) + "/" + addLeadingZero(a.getDate()) + "/" + a.getFullYear();
            this.m_questionScore.m_curDateAsString2 = a.getFullYear() + "/" + addLeadingZero(a.getMonth() + 1) + "/" + addLeadingZero(a.getDate());
            this.m_questionScore.m_curTimeAsSecondsSinceMidnight = 3600 * a.getHours() + 60 * a.getMinutes() + a.getSeconds();
            return this.m_questionScore
        }
    },
    getSlide: function() {
        return this.slide
    },
    updateQuizProgressIndicator: function() {
        if (this.m_quizController && !(0 >=
                this.m_quizController.GetQuestionsOnSlide(this.m_slideIndex).length) && this.state == this.StateEnum.PLAYING) {
            var a = this.m_quizController.GetGraphManager();
            a && (!this.getIsPretest() && !this.getIsKnowledgeCheck()) && (a.setQuestionSlideProgressNumber(this.m_slideIndex), this.m_quizController.GetFirstNonPretestQuestionEncountered() || (this.m_quizController.SetFirstNonPretestQuestionEncountered(!0), 0 >= a.getCompletionBranch().length && this.m_quizController.SetForceAbsoluteProgressType(!0)))
        }
    },
    setQuestionSpecificScoreProperties: function(a) {
        if (void 0 !=
            a) {
            var c = "",
                b = this.questionData.ao,
                d = this.m_answerOrderArray;
            if (d && b && 0 < d.length && d.length == b.length) {
                for (var e = {}, f = 0; f < b.length; ++f) {
                    var h = b[f].split(":");
                    e[h[0]] = h[1]
                }
                b = d[0];
                c += e[b];
                for (f = 1; f < d.length; ++f) b = d[f], c += ";" + e[b]
            }
            a.m_answerOrderArrayAsString = c
        }
    },
    restoreFromQuestionSpecificScoreProperties: function(a) {
        if (void 0 != a && (a = a.m_answerOrderArrayAsString, !(void 0 == a || "" == a))) {
            var a = a.split(";"),
                c = this.questionData.ao,
                b = this.answerOptions;
            if (b && c && !(0 >= b.length || b.length != c.length || b.length != a.length)) {
                for (var b = {}, d = 0; d < c.length; ++d) {
                    var e = c[d].split(":");
                    b[e[1]] = e[0]
                }
                d = a[0];
                c = "" + b[d];
                for (e = 1; e < a.length; ++e) d = a[e], c += ";" + b[d];
                this.setAnswerOrder(c)
            }
        }
    }
};