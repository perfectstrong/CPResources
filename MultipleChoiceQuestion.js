cp.MCQInput = function(a, c) {
    cp.MCQInput.baseConstructor.call(this, a);
    this.isSingleChoice = "radio" == this.type;
    if (cp.responsive) {
        var b = cp.D[cp.D[this.element.id].ahn];
        this.responsiveCSS = b ? b.css : this.getAttribute("css")
    }
    this.isCorrect = this.getAttribute("ic");
    this.tabIndex = -1;
    this.accessibilityText = this.getAttribute("ad");
    this.canvasDivName = this.getAttribute("cn");
    this.value = "enabled";
    this.checked = "unchecked";
    b = this.getAttribute("b");
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
    this.answerHolderLeft = this.getAttribute("ahl");
    this.answerHolderTop = this.getAttribute("aht");
    this.sh = this.getAttribute("sh");
    this.args = c
};
cp.inherits(cp.MCQInput, cp.Answer);
cp.MCQInput.prototype.start = function(a) {
    this.addIfNeeded();
    if (!this.effectIsStarted || a) this.updateEffects(this.hasEffect), this.effectIsStarted = !0
};
cp.MCQInput.prototype.reset = function() {
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
cp.MCQInput.prototype.disableOption = function() {
    if ("disabled" != this.value && (this.element.style.cursor = "default", this.value = "disabled", this.inputControl.disabled = "disabled", this.inputControl.style.cursor = "default", this.inputControl.parentNode.style.cursor = "default", this.inputControl.parentNode.parentNode.style.cursor = "default", "checked" == this.checked || this.inputControl.checked ? this.loadAndDrawImage(this.m_questionObj.getImageForState(this.type, "selectedDisabled")) : this.loadAndDrawImage(this.m_questionObj.getImageForState(this.type,
            "disabled")), this.m_questionObj.getWasJudged() && this.m_questionObj.canShowReviewIcons())) {
        if (!this.reviewIconImage) {
            this.reviewIconImage = cp.newElem("img");
            this.reviewIconImage.tabIndex = -1;
            this.reviewIconImage.style.position = "absolute";
            this.reviewIconImage.style.zIndex = this.zIndex;
            if (this.sh) {
                var a = this.sh.a;
                cp.applyShadow(this.reviewIconImage, this.sh.d * Math.cos(Math.PI * a / 180) + "px " + this.sh.d * Math.sin(Math.PI * a / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" :
                    ""))
            }
            this.isCorrect ? (this.reviewIconImage.src = this.isSingleChoice ? cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src : "checked" == this.checked ? cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src : cp.movie.im.m_projectImages["assets/htmlimages/skip_answer_normal.png"].nativeImage.src, this.element.parentNode.appendChild(this.reviewIconImage)) : this.m_questionObj.getWasJudged() && "checked" == this.checked ? (this.reviewIconImage.src =
                cp.movie.im.m_projectImages["assets/htmlimages/incorrect_answer_normal.png"].nativeImage.src, this.element.parentNode.appendChild(this.reviewIconImage)) : this.reviewIconImage = void 0
        }
        if (this.reviewIconImage) {
            var a = this.inputControlCanvasElement.parentElement.getBoundingClientRect(),
                c = cp("div_Slide").getBoundingClientRect();
            cp.responsive ? (this.element.parentElement.getBoundingClientRect(), this.element.getBoundingClientRect(), this.reviewIconImage.style.left = parseFloat(this.inputControl.style.left) - 20 +
                "px", this.reviewIconImage.style.top = this.inputControl.style.top) : (this.reviewIconImage.style.left = parseFloat(this.element.style.left) - 20 + "px", this.reviewIconImage.style.top = (a.top - c.top) / cp.movie.m_scaleFactor + "px")
        }
    }
};
cp.MCQInput.prototype.loadAndDrawImage = function(a) {
    var c = this.sh && !this.sh.i,
        b = cp.movie.im.m_projectImages[a].nativeImage;
    null == this.loadedBtnImages && (this.loadedBtnImages = {});
    this.loadedBtnImages[a] = b;
    this.inputControlCanvasElement.img = a;
    cp.clearCanvasProperly(this.canvas);
    b = this.canvas.gc;
    if (!cp.responsive) {
        var d = 0 < this.vbounds.minX && c ? 0 : this.vbounds.minX,
            e = 0 < this.vbounds.minY && c ? 0 : this.vbounds.minY,
            f = (cp.model.data.project.h > this.vbounds.maxY && c ? cp.model.data.project.h : this.vbounds.maxY + 4) - e;
        b.width =
            (cp.model.data.project.w > this.vbounds.maxX && c ? cp.model.data.project.w : this.vbounds.maxX + 4) - d;
        b.height = f;
        b.left = d;
        b.top = e
    }
    this.sh && !this.sh.i && (b.shadowOffsetX = this.sh.d * Math.cos(Math.PI * this.sh.a / 180), b.shadowOffsetY = this.sh.d * Math.sin(Math.PI * this.sh.a / 180), b.shadowBlur = this.sh.b, b.shadowColor = cp.ConvertRGBToRGBA(this.sh.c, this.sh.o));
    c ? cp.responsive ? (c = this.answerLabelCanvasParentElement.getBoundingClientRect(), d = cp("div_Slide").getBoundingClientRect(), b.drawImage(this.loadedBtnImages[a], c.left -
        d.left - 30, c.top - d.top)) : b.drawImage(this.loadedBtnImages[a], this.bounds.minX - 2, this.bounds.minY - 2) : cp.responsiveType == cp.kCPPMEAutoResponsive ? (d = cp.getProject().clientWidth / cp.D.project.w, c = 14 < this.loadedBtnImages[a].width * d ? this.loadedBtnImages[a].width * d : 14, d = 14 < this.loadedBtnImages[a].height * d ? this.loadedBtnImages[a].height * d : 14, e = 0, this.loadedBtnImages[a].width > c && (e = (this.loadedBtnImages[a].width - c) / 2), f = 0, this.loadedBtnImages[a].height > d && (f = (this.loadedBtnImages[a].height - d) / 2), b.drawImage(this.loadedBtnImages[a],
        e, f, c, d)) : b.drawImage(this.loadedBtnImages[a], 0, 0)
};
cp.MCQInput.prototype.addHighlightBoxMouseHandlers = function() {
    if (cp.DESKTOP == cp.device) {
        var a = this,
            c = document.getElementById(this.element.id + "_dummyhighlight");
        this.highlightElement.onmouseover = function() {
            if (!cp.disableInteractions && "disabled" != a.value && (c.style.backgroundColor = "#000000", c.style.opacity = "0.3", a.sh)) {
                var b = a.sh.a;
                cp.applyShadow(c, a.sh.d * Math.cos(Math.PI * b / 180) + "px " + a.sh.d * Math.sin(Math.PI * b / 180) + "px " + a.sh.b + "px " + cp.ConvertRGBToRGBA(a.sh.c, a.sh.o) + (a.sh.i ? " inset" : ""))
            }
        };
        this.highlightElement.onmouseout =
            function() {
                !cp.disableInteractions && "disabled" != a.value && (c.style.backgroundColor = "transparent", cp.applyShadow(c, ""))
            }
    }
};
cp.MCQInput.prototype.addDummyHighlightDiv = function(a, c) {
    var b = cp(this.element.id + "_dummyhighlight");
    b || (b = cp.newElem("div"), cp.fixWebkitScaling(b), a.insertBefore(b, this.answerLabelCanvasElement.parentElement), b.id = this.element.id + "_dummyhighlight", b.style.cursor = c, b.style.position = "absolute", b.style.zIndex = this.zIndex, b.style.borderRadius = "5px");
    var d = cp.movie.stage.mainSlideDiv.getBoundingClientRect(),
        e = this.element.getBoundingClientRect(),
        f = this.inputControlCanvasElement.parentElement.getBoundingClientRect();
    b.style.left = (f.left - d.left - 5) / cp.movie.m_scaleFactor + "px";
    b.style.top = (e.top - d.top - 2) / cp.movie.m_scaleFactor + "px";
    b.style.width = this.element.clientWidth + "px";
    b.style.height = this.element.clientHeight + "px"
};
cp.MCQInput.prototype.adjustVerticalAlignment = function(a, c, b, d) {
    if (c && b) {
        d = d ? 0 : parseFloat(c.parentElement.style.top);
        switch (a) {
            case cp.TextLayoutEnum.kTLCenter:
                d += (c.parentElement.clientHeight - b.clientHeight) / 2;
                break;
            case cp.TextLayoutEnum.kTLBottom:
                d += c.parentElement.clientHeight - b.clientHeight
        }
        b.style.top = d + "px"
    }
};
cp.MCQInput.prototype.drawForResponsive = function(a) {
    if (!this.m_questionObj || !this.m_questionObj.getIsStarted() || !this.responsiveCSS) return !1;
    if (this.isDrawn && !a) return !0;
    var c = cp.getResponsiveCSS(this.responsiveCSS);
    cp.getCSSFromLayouter(c, this);
    var b = !1,
        b = this.re || this.sh && !this.sh.i || this.fillOuterArea,
        d = void 0 != this.tr;
    if (this.currentCSS == c && !b && !d && !a) return !0;
    this.currentCSS = c;
    a = this.element.id;
    if (cp.movie.playbackController) {
        var e = cp.movie.playbackController.GetQuizController();
        if (e) {
            var f =
                cp.D[this.element.id],
                g = cp.D[f.actid + "c"];
            this.answerTextCanvasDivName || (this.answerTextCanvasDivName = this.m_questionObj.getAnswerOption(f));
            if (this.answerLabelCanvasElement = document.getElementById(this.canvasDivName)) {
                var d = cp.movie.stage.getSlideDiv().firstChild,
                    j = cp.D[this.answerTextCanvasDivName],
                    i = cp.D[f.cn];
                e.GetIsInReviewMode();
                var l = (e = this.m_questionObj.shouldDisableOptions()) ? "default" : "pointer";
                this.group = this.m_questionObj.getAnswerGroupName();
                this.accessibilityText = cp.getAccessibilityString(j);
                cp.modifyAlternativeAccessibleText(this.element.parentElement, this.accessibilityText);
                this.isCorrect = j.ic;
                f.ic = this.isCorrect;
                this.value = "enabled";
                this.m_questionObj.getIfSelected(this.answerID) && (this.checked = "checked");
                this.zIndex = cp.D[f.actid].zIndex;
                this.inputIdSuffix = this.isSingleChoice ? "_radioInputField" : "_checkBoxInputField";
                "" == this.element.innerHTML && (this.element.innerHTML += "<div id='" + this.element.id + "_highlight' style='" + cp.accOutlineStyleStr + ";cursor:" + l + ";border-radius:5px; left:0px;top: 0px;width:100%;height:100%;position:absolute;background-color:#FF0000;opacity:.5'><label><input type='" +
                    this.type + "' " + this.value + " " + this.checked + " name='" + this.group + "' id='" + a + this.inputIdSuffix + "' role='" + (this.isSingleChoice ? "radio" : "checkbox") + "' aria-label='" + this.accessibilityText + "' style='cursor:" + l + ";opacity:0;left: 0px; top:0px;width: 22px; height: 22px;position:absolute;border-radius:0px;'></input></label></div>");
                this.inputControl = document.getElementById(this.element.id + this.inputIdSuffix);
                this.inputControl.answerObject = this;
                this.inputControl.tabIndex = 1;
                var k = f.actid,
                    h = cp(k + "canvasHolder");
                h || (h = cp.newElem("div"), cp.fixWebkitScaling(h), d.insertBefore(h, this.answerLabelCanvasElement.parentElement), h.setAttribute("class", "cp-rewrap"), h.id = k + "canvasHolder", f.answerTextCanvasHolder = h.id, h.style.zIndex = this.zIndex, this.answertextCanvas = cp(this.answerTextCanvasDivName), this.answertextCanvas || (this.answertextCanvas = cp.newElem("canvas"), this.answertextCanvas.setAttribute("class", "cp-shape"), this.answertextCanvas.id = this.answerTextCanvasDivName, h.appendChild(this.answertextCanvas)), f = document.getElementById(j.dn),
                    f.drawingBoard = h, cp.D[this.answerTextCanvasDivName].dns = this.element.id, this.answertextCanvasShape || (this.answertextCanvasShape = new cp.Shape(this.answertextCanvas, cp.D[this.answerTextCanvasDivName]), this.answertextCanvasShape.start()), cp.updateVarText(f));
                f = cp.movie.stage.mainSlideDiv.getBoundingClientRect();
                this.parentElementClientBoundingRect = this.element.parentElement.getBoundingClientRect();
                this.isDrawn || (this.answerLabelCanvasParentElement = this.answerLabelCanvasElement.parentElement, this.answerLabelCanvasParentSiblingElement =
                    this.answerLabelCanvasParentElement.nextSibling, d.removeChild(this.answerLabelCanvasParentElement), d.insertBefore(this.answerLabelCanvasParentElement, this.answerLabelCanvasParentSiblingElement));
                this.inputControlCanvasElement || (this.inputControlCanvasElement = cp.newElem("canvas"), h = b ? cp.project.clientWidth : 26, k = b ? cp.project.clientHeight : 26, canvas = this.canvas = cp.createCanvas(0, 0, h, k, this.inputControlCanvasElement), this.inputControlCanvasElement.style.display = "block", this.inputControlCanvasElement.style.position =
                    "absolute", h = cp.newElem("div"), cp.fixWebkitScaling(h), d.insertBefore(h, this.answerLabelCanvasParentSiblingElement), h.appendChild(this.inputControlCanvasElement), h.style.display = "block", h.style.position = "absolute", h.style.width = "22px", h.style.height = "22px", h.style.zIndex = this.zIndex);
                this.adjustPositionWithAnswerArea(i.css[cp.ResponsiveProjWidth], this.answerLabelCanvasParentElement);
                this.adjustPositionWithAnswerArea(i.css[cp.ResponsiveProjWidth], cp(i.dn));
                this.adjustPositionWithAnswerArea(g.css[cp.ResponsiveProjWidth],
                    this.answertextCanvas.parentElement);
                this.inputControlCanvasElement && this.inputControlCanvasElement.img && (h = b ? cp.project.clientWidth : 26, k = b ? cp.project.clientHeight : 26, this.inputControlCanvasElement.width = h, this.inputControlCanvasElement.height = k, this.inputControlCanvasElement.style.width = h + "px", this.inputControlCanvasElement.style.height = k + "px", this.loadAndDrawImage(this.inputControlCanvasElement.img));
                g = this.answerLabelCanvasParentElement.getBoundingClientRect();
                h = this.answertextCanvas.parentElement.getBoundingClientRect();
                this.inputControlCanvasElement.parentElement.style.left = g.left - f.left - 30 + "px";
                this.inputControlCanvasElement.parentElement.style.top = g.top - f.top + "px";
                b && (this.inputControlCanvasElement.style.left = -(g.left - f.left - 30) + "px", this.inputControlCanvasElement.style.top = -(g.top - f.top) + "px");
                b = this.inputControlCanvasElement.parentElement.getBoundingClientRect();
                this.element.style.left = "0px";
                this.element.style.top = "0px";
                this.element.style.right = "auto";
                this.element.style.bottom = "auto";
                this.element.style.width =
                    "100%";
                this.element.style.height = "100%";
                this.element.style.position = "absolute";
                this.element.style.backgroundColor = "#ff0000";
                this.element.style.opacity = 0;
                this.adjustPositionWithAnswerArea(c, this.element.parentElement);
                c = this.element.getBoundingClientRect();
                this.answertextCanvas.parentElement.style.top = c.top - f.top + "px";
                this.element.parentElement.style.width = b.width + g.width + h.width + 20 + "px";
                this.element.parentElement.style.height = h.height + 6 + "px";
                c = cp.D[j.dn];
                j = c.rptl[cp.ResponsiveProjWidth];
                this.adjustVerticalAlignment(j,
                    this.answertextCanvas, this.answerLabelCanvasParentElement);
                this.adjustVerticalAlignment(j, this.answertextCanvas, this.inputControlCanvasElement.parentElement);
                this.adjustVerticalAlignment(j, this.answertextCanvas, this.inputControl, !0);
                this.addDummyHighlightDiv(d, l);
                this.element.parentElement.style.left = b.left - f.left - 5 + "px";
                cp.D[i.dn].rptl = c.rptl;
                if (!this.isDrawn) {
                    var m = this;
                    this.highlightElement = document.getElementById(a + "_highlight");
                    this.addHighlightBoxMouseHandlers();
                    a = function() {
                        cp.disableInteractions ||
                            m.value != "disabled" && m.m_questionObj.selectAnswerOption(m)
                    };
                    cp.registerGestureEvent(this.element, cp.GESTURE_EVENT_TYPES.TAP, a);
                    cp.DESKTOP == cp.device ? cp.registerGestureEvent(this.inputControl, cp.GESTURE_EVENT_TYPES.TAP, a) : cp.useg || (this.inputControl.onclick = a);
                    "checked" == this.checked ? this.loadAndDrawImage(this.m_questionObj.getImageForState(this.type, "selected")) : this.loadAndDrawImage(this.m_questionObj.getImageForState(this.type, "default"))
                }
                e && this.disableOption();
                this.isDrawn = !0;
                this.visible || (this.element.style.visibility =
                    "hidden");
                return !0
            }
        }
    }
};
cp.MCQInput.prototype.addIfNeeded = function(a) {
    if ((!cp.responsive || !this.drawForResponsive(a)) && this.m_questionObj && !this.isDrawn && this.m_questionObj.getIsStarted()) {
        var a = this.element.id,
            c = this.type;
        if (cp.movie.playbackController) {
            var b = cp.movie.playbackController.GetQuizController();
            if (b) {
                b.GetIsInReviewMode();
                b = this.m_questionObj.shouldDisableOptions();
                this.group = this.m_questionObj.getAnswerGroupName();
                var d = b ? "default" : "pointer",
                    e = cp.D[this.element.id];
                this.answerTextCanvasDivName = this.m_questionObj.getAnswerOption(e);
                if (this.answerLabelCanvasElement = document.getElementById(this.canvasDivName)) {
                    var f = cp.movie.stage.getSlideDiv().firstChild,
                        g = cp.D[this.answerTextCanvasDivName];
                    this.m_questionObj.getIfSelected(this.answerID) && (this.checked = "checked");
                    this.accessibilityText = cp.getAccessibilityString(g);
                    this.isCorrect = g.ic;
                    e.ic = this.isCorrect;
                    var j = !1,
                        j = this.re || this.sh && !this.sh.i,
                        i = g.b;
                    this.answerTextCanvasImageBounds = {
                        minX: i[0],
                        minY: i[1],
                        maxX: i[2],
                        maxY: i[3]
                    };
                    i = cp.D[e.cn].b;
                    this.lAnswerLabelBounds = {
                        minX: i[0],
                        minY: i[1],
                        maxX: i[2],
                        maxY: i[3]
                    };
                    this.zIndex = cp.D[e.actid].zIndex;
                    this.inputIdSuffix = this.isSingleChoice ? "_radioInputField" : "_checkBoxInputField";
                    "" == this.element.innerHTML && (this.element.innerHTML += "<div id='" + a + "_highlight' style='" + cp.accOutlineStyleStr + ";cursor:" + d + ";border-radius:5px; left: -5px; top: -1px;width: " + (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 50) + "px;height: " + (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6) + "px;position:absolute;background-color:#FF0000;opacity:.5'><label><input type='" +
                        c + "' " + this.value + " " + this.checked + " role='" + (this.isSingleChoice ? "radio" : "checkbox") + "' aria-label='" + this.accessibilityText + "'  name='" + this.group + "' id='" + a + this.inputIdSuffix + "' style='cursor:" + d + ";opacity:0;left: 0px; top: " + (this.lAnswerLabelBounds.maxY - this.lAnswerLabelBounds.minY - 22) / 2 + "px;width: 22px; height: 22px;position:absolute;border-radius:0px;'></input></label></div>");
                    this.inputControl = document.getElementById(a + this.inputIdSuffix);
                    this.inputControl.answerObject = this;
                    this.inputControl.tabIndex =
                        1;
                    c = e.actid;
                    i = cp.newElem("div");
                    cp.fixWebkitScaling(i);
                    f.insertBefore(i, this.answerLabelCanvasElement.parentElement);
                    i.setAttribute("class", "cp-rewrap");
                    i.id = c + "canvasHolder";
                    e.answerTextCanvasHolder = i.id;
                    e = cp.newElem("canvas");
                    e.setAttribute("class", "cp-shape");
                    e.id = this.answerTextCanvasDivName;
                    i.appendChild(e);
                    i.style.zIndex = this.zIndex;
                    var l = document.getElementById(g.dn);
                    l.drawingBoard = i;
                    cp.updateVarText(l);
                    cp.D[this.answerTextCanvasDivName].dns = this.element.id;
                    (new cp.Shape(e, cp.D[this.answerTextCanvasDivName])).start();
                    i = cp.D[c].mdi;
                    e.parentElement.style.left = parseFloat(e.parentElement.style.left) + (cp.D[i].b[0] - this.answerTextCanvasImageBounds.minX) + "px";
                    e.parentElement.style.top = parseFloat(e.parentElement.style.top) + (cp.D[i].b[1] - this.answerTextCanvasImageBounds.minY) + "px";
                    c = this.answerLabelCanvasElement.parentElement;
                    l = c.nextSibling;
                    f.removeChild(c);
                    f.insertBefore(c, l);
                    this.inputControlCanvasElement = cp.newElem("canvas");
                    canvas = this.canvas = cp.createCanvas(0, 0, (cp.model.data.project.w > this.vbounds.maxX && j ? cp.model.data.project.w :
                        this.vbounds.maxX + 4) - (0 < this.vbounds.minX && j ? 0 : this.vbounds.minX), (cp.model.data.project.h > this.vbounds.maxY && j ? cp.model.data.project.h : this.vbounds.maxY + 4) - (0 < this.vbounds.minY && j ? 0 : this.vbounds.minY), this.inputControlCanvasElement);
                    this.inputControlCanvasElement.style.display = "block";
                    this.inputControlCanvasElement.style.position = "absolute";
                    var k = cp.newElem("div");
                    cp.fixWebkitScaling(k);
                    f.insertBefore(k, l);
                    k.appendChild(this.inputControlCanvasElement);
                    k.style.display = "block";
                    k.style.position = "absolute";
                    k.style.left = this.vbounds.minX + "px";
                    k.style.top = this.lAnswerLabelBounds.minY + (this.lAnswerLabelBounds.maxY - this.lAnswerLabelBounds.minY - 22) / 2 + "px";
                    k.style.width = "22px";
                    k.style.height = "22px";
                    k.style.zIndex = this.zIndex;
                    j ? (this.inputControlCanvasElement.style.marginLeft = -this.vbounds.minX + "px", this.inputControlCanvasElement.style.marginTop = -this.lAnswerLabelBounds.minY + "px") : (this.inputControlCanvasElement.style.marginLeft = "-2px", this.inputControlCanvasElement.style.marginTop = "-2px");
                    var h = this;
                    this.element.style.left =
                        parseFloat(e.parentElement.style.left) + (cp.D[i].b[0] - this.answerTextCanvasImageBounds.minX) + "px";
                    this.element.style.top = cp.D[i].b[1] + "px";
                    this.element.style.width = this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 50 + "px";
                    this.element.style.height = this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6 + "px";
                    this.element.style.position = "absolute";
                    this.element.style.backgroundColor = "#ff0000";
                    this.element.style.opacity = 0;
                    g = cp.D[g.dn].txtl;
                    this.adjustVerticalAlignment(g,
                        e, c);
                    this.adjustVerticalAlignment(g, e, this.inputControlCanvasElement.parentElement);
                    this.adjustVerticalAlignment(g, e, this.inputControl, !0);
                    g = this.inputControlCanvasElement.parentElement.getBoundingClientRect();
                    j = cp.movie.stage.mainSlideDiv.getBoundingClientRect();
                    this.addDummyHighlightDiv(f, d);
                    this.highlightElement = document.getElementById(a + "_highlight");
                    this.addHighlightBoxMouseHandlers();
                    this.element.style.left = (g.left - j.left - 5) / cp.movie.m_scaleFactor + "px";
                    a = function() {
                        cp.disableInteractions || h.value !=
                            "disabled" && h.m_questionObj.selectAnswerOption(h)
                    };
                    cp.registerGestureEvent(this.element, cp.GESTURE_EVENT_TYPES.TAP, a);
                    cp.DESKTOP == cp.device ? cp.registerGestureEvent(this.inputControl, cp.GESTURE_EVENT_TYPES.TAP, a) : cp.useg || (this.inputControl.onclick = a);
                    "checked" == this.checked ? this.loadAndDrawImage(this.m_questionObj.getImageForState(this.type, "selected")) : this.loadAndDrawImage(this.m_questionObj.getImageForState(this.type, "default"));
                    b && this.disableOption();
                    this.isDrawn = !0;
                    this.visible || (this.element.style.visibility =
                        "hidden")
                }
            }
        }
    }
};
cp.MultipleChoiceQuestion = function(a, c) {
    cp.MultipleChoiceQuestion.baseConstructor.call(this, a, c);
    this.answerOptions = this.getAnswerOptions();
    this.shuffleCounter = -1;
    this.isShuffleEnabled = this.questionData.ish;
    this.correctAnswersList = "";
    this.chosenAnswerHasAdvancedFeedback = !1;
    this.typeStatesMap = {
        radio: {
            "default": "assets/htmlimages/radioButton_normal.png",
            selected: "assets/htmlimages/radioButton_selected.png",
            disabled: "assets/htmlimages/radioButton_disabled.png",
            selectedDisabled: "assets/htmlimages/radioButton_selectedDisabled.png"
        },
        checkbox: {
            "default": "assets/htmlimages/checkBox_normal.png",
            selected: "assets/htmlimages/checkBox_selected.png",
            disabled: "assets/htmlimages/checkBox_disabled.png",
            selectedDisabled: "assets/htmlimages/checkBox_selectedDisabled.png"
        }
    };
    this.verbose = !1
};
cp.inherits(cp.MultipleChoiceQuestion, cp.Question);
cp.MultipleChoiceQuestion.prototype.getImageForState = function(a, c) {
    return this.typeStatesMap[a][c]
};
cp.MultipleChoiceQuestion.prototype.getAnswerScore = function(a) {
    for (var c = 0, b = 0; b < this.answerOptions.length; ++b) {
        var d = cp.D[this.answerOptions[b]];
        if (a == d.aid) {
            c = d.ap;
            break
        }
    }
    return c
};
cp.MultipleChoiceQuestion.prototype.getSelectedAnswerChoices = function() {
    var a = "",
        c = this.m_selectedAnswersArr.slice(0);
    if (c && 0 >= c.length) return "";
    for (var b = [], d = this.questionData.ao, e = 0; e < d.length; ++e)
        for (var f = d[e].split(":"), f = cp.D[f[0]], g = 0; g < c.length; ++g) f.aid == c[g] && b.push(cp.D[this.answerOptions[e]].aid);
    a += b[0];
    for (c = 1; c < b.length; ++c) a += ";", a += b[c];
    return a
};
cp.MultipleChoiceQuestion.prototype.getAnswerScores = function() {
    var a = [];
    if (!this.answerOptions) return a;
    for (var c = document.getElementsByName(this.getAnswerGroupName()), b = this.m_selectedAnswersArr.slice(0), d = {}, e = 0; e < b.length; ++e) d[b[e]] = b[e];
    for (b = 0; b < c.length; ++b) {
        var e = cp.D[c[b].parentElement.parentElement.parentElement.id],
            f = cp(e.answerTextCanvasHolder).firstChild,
            f = cp.D[f.id],
            g = new cp.AnswerScore;
        g.m_answerID = e.aid;
        g.m_correctAnswer = f.ic ? "1" : "0";
        g.m_chosenAnswer = d[e.aid] ? "1" : "0";
        a.push(g)
    }
    return a
};
cp.MultipleChoiceQuestion.prototype.getQuestionScoredPoints = function() {
    if (this.getIsSurvey() || !this.getWasJudged()) return 0;
    if (!this.isPartialScore) return this.getQuestionLevelScoredPoints();
    var a = this.getSelectedOptions(this.getAnswerGroupName());
    if (!a) return 0;
    for (var c = 0, b = 0; b < a.length; ++b) {
        var d = this.getAnswerID(a[b].parentNode);
        d && (c += this.getAnswerScore(d))
    }
    return c
};
cp.MultipleChoiceQuestion.prototype.shuffleAnswers = function() {
    var a = !this.m_quizController.GetIsAttemptFinished() && this.getWasJudged() && !this.m_quizController.GetIsSubmitAll(),
        c = this.getIsPretest() && this.m_quizController.GetIsPretestQuestionsDisabled();
    if (this.isShuffleEnabled && (!a && !this.m_quizController.GetIsInReviewMode() && !c) && !this.m_isShuffled) {
        for (var b = this.answerOptions.length, d, c = [], a = 0; a < b; ++a) c[a] = this.answerOptions[a];
        for (a = b; 1 < a; a--) b = Math.floor(Math.random() * a), b != a && (d = c[b], c[b] = c[a -
            1], c[a - 1] = d);
        this.answerOptions = c;
        this.m_isShuffled = !0
    }
};
cp.MultipleChoiceQuestion.prototype.getAnswerOption = function() {
    this.shuffleAnswers();
    return this.answerOptions[++this.shuffleCounter]
};
cp.MultipleChoiceQuestion.prototype.getIfSelected = function(a) {
    if (!this.m_selectedAnswersArr || 0 >= this.m_selectedAnswersArr.length) return !1;
    for (var c = 0; c < this.m_selectedAnswersArr.length; ++c)
        if (a == this.m_selectedAnswersArr[c]) return !0;
    return !1
};
cp.MultipleChoiceQuestion.prototype.resetQuestionData = function() {
    cp.MultipleChoiceQuestion.superClass.resetQuestionData.call(this);
    this.m_quizController.GetGoToQuizScopeActionExecuted() || (this.m_selectedAnswersArr = []);
    this.correctAnswersList = "";
    this.shuffleCounter = -1;
    this.chosenAnswerHasAdvancedFeedback = !1
};
cp.MultipleChoiceQuestion.prototype.selectAnswerOption = function(a) {
    if (a && (a.inputControl && !a.inputControl.disabled) && !this.m_answersDisabled) {
        this.getSelectedOptions();
        for (var c = document.getElementsByName(this.getAnswerGroupName()), b = 0; b < c.length; ++b) {
            var d = c[b],
                e = d.answerObject;
            a.isSingleChoice ? (a.inputControl == d ? (d.checked = !0, a.checked = !0) : (d.checked = !1, a.checked = !1), d.checked ? e.loadAndDrawImage(this.getImageForState(a.type, "selected")) : e.loadAndDrawImage(this.getImageForState(a.type, "default"))) :
                a.inputControl == d && (d.checked = !d.checked, d.checked ? (e.loadAndDrawImage(this.getImageForState(a.type, "selected")), a.checked = !0) : (e.loadAndDrawImage(this.getImageForState(a.type, "default")), a.checked = !1))
        }
    }
};
cp.MultipleChoiceQuestion.prototype.setSelectedAnswers = function() {
    var a = this.getSelectedOptions(this.getAnswerGroupName());
    if (a && !(0 >= a.length)) {
        this.m_selectedAnswersArr = [];
        for (var c = 0; c < a.length; ++c) this.m_selectedAnswersArr.push(cp.D[a[c].parentElement.parentElement.parentElement.id].aid)
    }
};
cp.MultipleChoiceQuestion.prototype.disableAllOptions = function() {
    if (this.m_quizController) {
        var a = !0;
        this.m_quizController.GetIsSubmitAll() && !this.getIsPretest() && (!this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions) && (a = !1);
        if (a && (a = document.getElementsByName(this.getAnswerGroupName()), !(1 > a.length))) {
            for (var c = 0; c < a.length; ++c) {
                var b = a[c].answerObject;
                b && b.disableOption && b.disableOption()
            }
            this.m_answersDisabled = !0
        }
    }
};
cp.MultipleChoiceQuestion.prototype.getChosenAnswerFeedback = function() {
    for (var a = document.getElementsByName(this.getAnswerGroupName()), c = 0, b, d = 0; d < a.length; ++d)
        if (!0 == a[d].checked) {
            c++;
            var e = cp(cp.D[a[d].parentElement.parentElement.parentElement.id].answerTextCanvasHolder).firstChild,
                f = cp.D[e.id],
                e = f.fb,
                f = f.ac;
            if (e || f)
                if (b = {}, void 0 != e && cp.D[e] && (b.name = e, b.captionToBeShown = !0), void 0 != f) b.action = f
        }
    return b
};
cp.MultipleChoiceQuestion.prototype.getSelectedOptions = function(a) {
    for (var a = document.getElementsByName(a), c = [], b = 0, d = 0; d < a.length; ++d) !0 == a[d].checked && (c[b++] = a[d]);
    return c
};
cp.MultipleChoiceQuestion.prototype.clearAnswers = function() {
    this.verbose && cp.log("Inside Clear Answers");
    var a = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest(),
        a = (a = !1 == this.getWasJudged() || a && !1 == this.m_quizController.m_submittedAllQuestions) && !this.m_quizController.GetIsInReviewMode();
    if (!1 != a && (this.m_selectedAnswersArr = [], this.verbose && cp.log("Not Attempted. Hence Clearing"), a = document.getElementsByName(this.getAnswerGroupName()), !(1 > a.length)))
        for (var c = 0; c <
            a.length; ++c) {
            var b = a[c];
            b && (b.checked = !1, b.answerObject && b.answerObject.loadAndDrawImage(this.getImageForState(b.type, "default")))
        }
};
cp.MultipleChoiceQuestion.prototype.checkIfPartiallyCorrect = function(a) {
    if (!this.isPartialScore) return !1;
    for (var c = this.getExpectedCorrectAnswerIDList(), b = {}, d = c.length, e = 0; e < c.length; ++e) b[c[e]] = c[e];
    for (var f = e = c = 0; f < a.length; ++f) {
        var g = this.getAnswerID(a[f].parentNode);
        b[g] ? ++c : ++e
    }
    a = !1;
    0 < c && (a = !0, c == d && 0 == e && (a = !1));
    return a
};
cp.MultipleChoiceQuestion.prototype.checkIfCorrect = function(a) {
    for (var c = this.getExpectedCorrectAnswerIDList(), b = {}, d = 0; d < c.length; ++d) b[c[d]] = c[d];
    for (var e = [], d = {}, f = 0, g = 0; g < a.length; ++g) {
        var j = a[g];
        if (!cp.D[j.parentNode.parentNode.parentNode.id].ic) return !1;
        j = this.getAnswerID(j.parentNode);
        if (!b[j]) return !1;
        e[f++] = j;
        d[j] = j
    }
    if (e.length != c.length) return !1;
    for (a = 0; a < c.length; ++a)
        if (!d[c[a]]) return !1;
    return !0
};
cp.MultipleChoiceQuestion.prototype.getChosenAnswerAsString = function() {
    if ("choice" == this.getInteractionType()) return this.getSelectedAnswerChoices();
    for (var a = this.getAnsweredCorrectly(), c = 0; c < this.answerOptions.length; ++c) {
        var b = cp.D[this.answerOptions[c]];
        if (b.ic) {
            if (a) return b.isTrue
        } else if (!a) return b.isTrue
    }
};
cp.MultipleChoiceQuestion.prototype.getCorrectAnswerAsString = function() {
    if ("choice" == this.getInteractionType()) {
        var a = this.getExpectedCorrectAnswerIDList();
        if (0 >= a.length) return "0";
        for (var c = a[0], b = 1; b < a.length; ++b) c += ";" + a[b];
        return c
    }
    for (b = 0; b < this.answerOptions.length; ++b)
        if (a = cp.D[this.answerOptions[b]], a.ic) return a.isTrue
};
cp.MultipleChoiceQuestion.prototype.getChosenAnswerAsStringForReview = function() {
    return this.getSelectedAnswerChoices()
};
cp.MultipleChoiceQuestion.prototype.getCorrectAnswerAsStringForReview = function() {
    var a = this.getExpectedCorrectAnswerIDList();
    if (0 >= a.length) return "0";
    for (var c = a[0], b = 1; b < a.length; ++b) c += ";" + a[b];
    return c
};
cp.MultipleChoiceQuestion.prototype.getExpectedCorrectAnswerTextList = function(a) {
    for (var c = [], b = -1, d = 0; d < this.answerOptions.length; ++d) {
        var e = cp.D[this.answerOptions[d]];
        e.ic && (c[++b] = cp.trimStartingAndTrailingSpaces(e.atxtlms))
    }
    if (0 >= c.length) return "";
    b = c[0];
    for (d = 1; d < c.length; ++d) b += a + c[d];
    cp.verbose && cp.log("Expected Answer Text List : " + b);
    return b
};
cp.MultipleChoiceQuestion.prototype.getSelectedAnswerTextList = function(a) {
    var c = [];
    this.m_quizController.GetIsSubmitAll() && this.getIsPretest();
    var b = this.m_selectedAnswersArr.slice(0);
    if (b && 0 >= b.length) return "";
    for (var d = this.questionData.ao, e = 0; e < d.length; ++e)
        for (var f = d[e].split(":"), f = cp.D[f[0]], g = 0; g < b.length; ++g) f.aid == b[g] && c.push(cp.D[this.answerOptions[e]].accstr);
    if (0 >= c.length) return "";
    b = c[0];
    for (e = 1; e < c.length; ++e) b += a + c[e];
    cp.verbose && cp.log("Expected Answer Text List : " + b);
    return b
};
cp.MultipleChoiceQuestion.prototype.getAnswerTexts = function() {
    for (var a = cp.MultipleChoiceQuestion.superClass.getAnswerTexts.call(this), c = {}, b = this.questionData.ao, d = 0; d < b.length; ++d) {
        var e = b[d].split(":"),
            e = cp.D[e[0]];
        c[e.aid] = cp.trimStartingAndTrailingSpaces(e.atxtlms)
    }
    a.answerTextMap = c;
    return a
};
cp.MultipleChoiceQuestion.prototype.saveAnswerOrder = function() {
    this.m_answerOrderArray = this.answerOptions.slice(0);
    this.setSelectedAnswers()
};
cp.MultipleChoiceQuestion.prototype.checkAndSetQuestionStatus = function() {
    var a = this.QuestionStatusEnum.INCOMPLETE,
        a = this.getSelectedOptions(this.getAnswerGroupName()),
        a = !a || 0 == a.length ? this.QuestionStatusEnum.INCOMPLETE : this.getIsSurvey() ? this.QuestionStatusEnum.CORRECT : this.checkIfPartiallyCorrect(a) ? this.QuestionStatusEnum.PARTIAL_CORRECT : this.checkIfCorrect(a) ? this.QuestionStatusEnum.CORRECT : this.QuestionStatusEnum.INCORRECT;
    this.setQuestionStatus(a)
};
cp.MultipleChoiceQuestion.prototype.startQuestion = function() {
    this.chosenAnswerFeedback = this.correctAnswersList = "";
    this.shuffleCounter = -1;
    this.chosenAnswerHasAdvancedFeedback = !1;
    cp.MultipleChoiceQuestion.superClass.startQuestion.call(this)
};