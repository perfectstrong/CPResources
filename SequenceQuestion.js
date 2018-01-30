cp.SequenceInput = function(b, c) {
    cp.SequenceInput.baseConstructor.call(this, b);
    this.type = this.getAttribute("type");
    this.visible = parseFloat(this.getAttribute("visible"));
    this.answerID = this.getAttribute("aid");
    this.relatedQuestionSlide = this.getAttribute("rqs");
    this.canvasDivName = this.getAttribute("cn");
    var a = this.getAttribute("b");
    this.bounds = {
        minX: a[0],
        minY: a[1],
        maxX: a[2],
        maxY: a[3]
    };
    a = this.getAttribute("vb");
    this.vbounds = {
        minX: a[0],
        minY: a[1],
        maxX: a[2],
        maxY: a[3]
    };
    this.answerHolderLeft = this.getAttribute("ahl");
    this.answerHolderTop = this.getAttribute("aht");
    this.sh = this.getAttribute("sh");
    this.args = c;
    this.isDrawn = !1;
    cp.responsive && (this.responsiveCSS = this.getAttribute("css"))
};
cp.inherits(cp.SequenceInput, cp.Answer);
cp.SequenceInput.prototype.start = function(b) {
    this.addIfNeeded();
    if (!this.effectIsStarted || b) this.updateEffects(this.hasEffect), this.effectIsStarted = !0
};
cp.SequenceInput.prototype.reset = function() {
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
cp.SequenceInput.prototype.drawForResponsive = function(b) {
    if (this.m_questionObj && this.m_questionObj.getIsStarted()) {
        if (!this.responsiveCSS) return !1;
        if (this.isDrawn && !b) return !0;
        var c = cp.getResponsiveCSS(this.responsiveCSS);
        cp.getCSSFromLayouter(c, this);
        var a = !1,
            a = this.re || this.sh && !this.sh.i,
            d = void 0 != this.tr;
        if (this.currentCSS == c && !a && !d && !b) return !0;
        this.currentCSS = c;
        var g = this.element.id;
        if (cp.movie.playbackController && (b = cp.movie.playbackController.GetQuizController())) {
            b.GetIsInReviewMode();
            var f =
                this.m_questionObj.shouldDisableOptions();
            this.answerLabelCanvasElement = document.getElementById(this.canvasDivName);
            var d = cp.D[this.canvasDivName].dn,
                h = cp.movie.stage.getSlideDiv().firstChild;
            this.shouldShowComboBox = this.m_questionObj.showAsCombo();
            this.group = this.m_questionObj.getAnswerGroupName();
            a = cp.D[g];
            this.isSkipped = this.isCorrect = !1;
            var j = f ? "default" : "pointer",
                p = cp.D[a.cn];
            this.lAnswerLabelCanvasElem = document.getElementById(p.dn);
            this.zIndex = cp.D[a.actid].zIndex;
            if (this.shouldShowComboBox) {
                this.isDrawn ||
                    (this.answerLabelCanvasParentElement = this.answerLabelCanvasElement.parentElement, this.answerLabelCanvasParentSiblingElement = this.answerLabelCanvasParentElement.nextSibling, h.removeChild(this.answerLabelCanvasParentElement), h.insertBefore(this.answerLabelCanvasParentElement, this.answerLabelCanvasParentSiblingElement));
                cp.applyResponsiveStyles(this.element.parentElement, c);
                this.adjustPositionWithAnswerArea(p.css[cp.ResponsiveProjWidth], this.answerLabelCanvasParentElement);
                this.adjustPositionWithAnswerArea(p.css[cp.ResponsiveProjWidth],
                    cp(d));
                this.adjustPositionWithAnswerArea(c, this.element.parentElement);
                this.element.style.position = "absolute";
                this.element.style.left = "0px";
                this.element.style.top = "0px";
                this.element.style.width = "100%";
                this.element.style.height = "100%";
                d = this.m_questionObj.getSelectedIndex(this.answerID);
                this.answerTextCanvasDivNames = this.m_questionObj.answerOptions.slice(0); - 1 == d && (this.isSkipped = !0);
                this.answertextParentDiv = cp(g + "canvasHolder");
                this.answertextParentDiv || (this.answertextParentDiv = cp.newElem("div"),
                    cp.fixWebkitScaling(this.answertextParentDiv), cp.addRewrapObjectAsPerRestOfProjectItem(this.answertextParentDiv), this.answertextParentDiv.id = g + "canvasHolder", a.answerTextCanvasHolder = this.answertextParentDiv.id, this.answertextParentDiv.setAttribute("class", "cp-rewrap"), this.answertextParentDiv.style.zIndex = this.zIndex);
                if ("" == this.element.innerHTML) {
                    a = "" + ("<select id='" + g + "_sequenceInput' class='dropdown' name='" + this.group + "' style='opacity:0;width:100%;height:100%;left:0px;top:0px;'>");
                    for (h = 0; h <
                        this.answerTextCanvasDivNames.length; ++h) b = cp.D[this.answerTextCanvasDivNames[h]], b = cp.D[b.dn], a += "<option value='" + this.answerTextCanvasDivNames[h] + "'>", a += b.rpvt[cp.ResponsiveProjWidth].vt, a += "</option>";
                    document.getElementById(this.element.id).innerHTML = a + "</select> ";
                    this.selectElement = document.getElementById(g + "_sequenceInput");
                    e = this;
                    this.selectElement.onchange = function() {
                        e.selectElement.setNewIndex(e.selectElement.selectedIndex)
                    };
                    b = function() {
                        if (!e.selectElement.disabled && e.selectElement.selectedIndex ==
                            -1) {
                            e.answerTextCanvasDivName = e.answerTextCanvasDivNames[0];
                            var a = cp.D[e.answerTextCanvasDivName];
                            e.selectElement.selectedIndex = 0;
                            e.selectElement.value = a[0];
                            e.selectElement.setNewIndex(0)
                        }
                    };
                    cp.DESKTOP == cp.device ? this.selectElement.onfocus = b : this.selectElement.ontouchstart = b;
                    this.selectElement.style.zIndex = 1E3;
                    cp.verbose && cp.log("Index : " + d);
                    b = "<img id='" + g + "_spanImageArrow' class='spanArrow' style='position:absolute;right:5px;margin:auto;top:0px;bottom:0px;'>" + ("<div id='" + g + "_spanImage' style='position:absolute;left:5px; top:5px;height:100%;width:100%;'/>");
                    a = cp(g + "spanComboBoxTitleImage");
                    a || (a = cp.newElem("span"), a.id = g + "spanComboBoxTitleImage", a.className = "spanComboBox", a.innerHTML = b, a.style.width = "100%", a.style.height = "100%", this.answertextParentDiv.appendChild(a));
                    this.selectElement.setNewIndex = function(a) {
                        if (a != -1) {
                            e.answerTextCanvasDivName = e.answerTextCanvasDivNames[a];
                            var b = cp.D[e.answerTextCanvasDivName],
                                c = b.atxt;
                            if (b.dn)
                                if (b = cp.D[b.dn].rpvt) c = b[cp.ResponsiveProjWidth].vt;
                            e.selectElement.selectedIndex = a;
                            e.selectElement.cpSelectedIndex = a;
                            cp(g +
                                "_spanImage").innerHTML = c
                        } else {
                            cp.verbose && cp.log("Inside setNewIndex : " + a);
                            e.answerTextCanvasDivName = "";
                            e.selectElement.selectedIndex = -1;
                            e.selectElement.cpSelectedIndex = -1;
                            e.selectElement.value = "";
                            e.selectElement.text = "";
                            cp(g + "_spanImage").innerHTML = "--Select--"
                        }
                    };
                    this.selectElement.setNewIndex(d);
                    this.sh && (b = this.sh.a, cp.applyShadow(this.element, this.sh.d * Math.cos(Math.PI * b / 180) + "px " + this.sh.d * Math.sin(Math.PI * b / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" :
                        "")));
                    f && (this.element.style.cursor = "default", this.selectElement.disabled = "disabled")
                } else if (this.selectElement && this.answerTextCanvasDivNames)
                    if (a = this.selectElement.options, this.answerTextCanvasDivNames.length == a.length) {
                        for (d = 0; d < a.length; ++d) h = a[d], b = cp.D[this.answerTextCanvasDivNames[d]], b = cp.D[b.dn], h.value = this.answerTextCanvasDivNames[d], h.innerHTML = b.rpvt[cp.ResponsiveProjWidth].vt;
                        this.selectElement.setNewIndex(this.selectElement.cpSelectedIndex)
                    } else {
                        cp.log("Responsive Sequence Drop down inputs : Something is seriously wrong.");
                        return
                    }
                this.answertextParentDiv.getBoundingClientRect();
                this.selectElement.parentElement.style.left = "0px";
                this.selectElement.parentElement.style.top = "0px";
                this.selectElement.parentElement.style.width = "100%";
                this.selectElement.parentElement.style.height = "100%";
                cp.applyResponsiveStyles(this.answertextParentDiv, c);
                this.adjustPositionWithAnswerArea(c, this.answertextParentDiv);
                this.answertextParentDiv.style.position = "absolute";
                this.answerTextCanvasDivName = this.selectElement.value
            } else {
                this.answerTextCanvasDivName ||
                    (this.answerTextCanvasDivName = this.m_questionObj.getAnswerOption(this.answerID, g));
                void 0 == a.answerTextDivName ? a.answerTextDivName = this.answerTextCanvasDivName : (this.answerTextCanvasDivName = a.answerTextDivName, this.sequenceCanvasElement = cp(this.answerTextCanvasDivName));
                c = cp(g + "_dummyhighlight");
                c || (c = cp.newElem("div"), cp.fixWebkitScaling(c), h.insertBefore(c, this.answerLabelCanvasElement.parentElement), c.id = g + "_dummyhighlight", c.style.cursor = j, c.style.borderRadius = "5px", c.style.position = "absolute",
                    c.style.zIndex = this.zIndex);
                var n = cp(g + "canvasHolder"),
                    b = cp.D[this.answerTextCanvasDivName];
                if (!n && (n = cp.newElem("div"), cp.fixWebkitScaling(n), h.insertBefore(n, this.answerLabelCanvasElement.parentElement), n.id = g + "canvasHolder", a.answerTextCanvasHolder = n.id, n.setAttribute("class", "cp-rewrap"), n.style.zIndex = this.zIndex, this.sequenceCanvasElement || (this.sequenceCanvasElement = cp.newElem("canvas"), canvas = this.canvas = cp.createCanvas(0, 0, cp.D.project.w, cp.D.project.h, this.sequenceCanvasElement), this.sequenceCanvasElement.setAttribute("class",
                        "cp-shape"), this.sequenceCanvasElement.setAttribute("name", this.group), this.sequenceCanvasElement.id = this.answerTextCanvasDivName, n.appendChild(this.sequenceCanvasElement)), !this.answertextCanvasShape)) this.answertextCanvasShape = new cp.Shape(this.sequenceCanvasElement, b), this.answertextCanvasShape.start();
                this.isDrawn || (this.answerLabelCanvasParentElement = this.answerLabelCanvasElement.parentElement, this.answerLabelCanvasParentSiblingElement = this.answerLabelCanvasParentElement.nextSibling, h.removeChild(this.answerLabelCanvasParentElement),
                    h.insertBefore(this.answerLabelCanvasParentElement, this.answerLabelCanvasParentSiblingElement));
                this.adjustPositionWithAnswerArea(p.css[cp.ResponsiveProjWidth], this.answerLabelCanvasParentElement);
                this.adjustPositionWithAnswerArea(p.css[cp.ResponsiveProjWidth], cp(d));
                this.adjustPositionWithAnswerArea(a.css[cp.ResponsiveProjWidth], this.sequenceCanvasElement.parentElement);
                this.adjustPositionWithAnswerArea(a.css[cp.ResponsiveProjWidth], this.element.parentElement);
                b && cp.updateVarText(cp(b.dn), !0, !0);
                this.answerLabelCanvasParentElement.getBoundingClientRect();
                this.sequenceCanvasElement.parentElement.getBoundingClientRect();
                this.element.style.left = "0px";
                this.element.style.top = "0px";
                this.element.style.width = "100%";
                this.element.style.height = "100%";
                this.element.style.cursor = j;
                this.element.style.borderRadius = "5px";
                this.element.style.position = "absolute";
                this.element.style.background = "#000000";
                this.element.style.opacity = 0;
                b = cp.movie.stage.mainSlideDiv.getBoundingClientRect();
                a = this.element.getBoundingClientRect();
                c.style.left = a.left - b.left + "px";
                c.style.top = a.top - b.top - 2 + "px";
                c.style.width = this.element.clientWidth + "px";
                c.style.height = this.element.clientHeight + "px";
                if (!this.isDrawn) {
                    var e = this;
                    if (cp.DESKTOP == cp.device) {
                        var q = document.getElementById(g + "_dummyhighlight");
                        this.element.onmouseover = function() {
                            if (!cp.disableInteractions && !f) {
                                q.style.backgroundColor = "#000000";
                                q.style.opacity = "0.3";
                                if (e.sh) {
                                    var a = e.sh.a;
                                    cp.applyShadow(q, e.sh.d * Math.cos(Math.PI * a / 180) + "px " + e.sh.d * Math.sin(Math.PI * a / 180) + "px " + e.sh.b +
                                        "px " + cp.ConvertRGBToRGBA(e.sh.c, e.sh.o) + (e.sh.i ? " inset" : ""))
                                }
                            }
                        };
                        this.element.onmouseout = function() {
                            if (!cp.disableInteractions && !f) {
                                q.style.backgroundColor = "transparent";
                                cp.applyShadow(q, "")
                            }
                        }
                    }
                    this.element.disableOption = function() {
                        f = true;
                        e.element.tabIndex = -1
                    }
                }
                f || this.m_questionObj.addDragEvents(g)
            }
            this.isCorrect = this.m_questionObj.getIsOptionCorrect(this.answerTextCanvasDivName);
            f && (this.element.style.cursor = "default", this.element.tabIndex = -1, this.m_questionObj.getWasJudged() && this.m_questionObj.canShowReviewIcons() &&
                (this.m_questionObj.getAnsweredCorrectly() ? this.reviewIconImage || (this.reviewIconImage = cp.newElem("img"), this.reviewIconImage.id = g + "_reviewCorrect", this.reviewIconImage.src = cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src, this.reviewIconImage.tabIndex = -1, this.reviewIconImage.style.position = "absolute", this.lAnswerLabelCanvasElem.appendChild(this.reviewIconImage), this.reviewIconImage.style.zIndex = this.zIndex, this.sh && (b = this.sh.a, cp.applyShadow(this.reviewIconImage,
                    this.sh.d * Math.cos(Math.PI * b / 180) + "px " + this.sh.d * Math.sin(Math.PI * b / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" : "") + (this.sh.i ? " inset" : "")))) : (c = this.isCorrect ? cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src : this.isSkipped ? cp.movie.im.m_projectImages["assets/htmlimages/skip_answer_normal.png"].nativeImage.src : cp.movie.im.m_projectImages["assets/htmlimages/incorrect_answer_normal.png"].nativeImage.src, this.reviewIconImage ||
                    (this.reviewIconImage = cp.newElem("img"), this.reviewIconImage.id = g + "_reviewIncorrect", this.reviewIconImage.src = c, this.reviewIconImage.tabIndex = -1, this.reviewIconImage.style.position = "absolute", this.lAnswerLabelCanvasElem.appendChild(this.reviewIconImage), this.reviewIconImage.style.zIndex = this.zIndex, this.sh && (b = this.sh.a, cp.applyShadow(this.reviewIconImage, this.sh.d * Math.cos(Math.PI * b / 180) + "px " + this.sh.d * Math.sin(Math.PI * b / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ?
                        " inset" : ""))))), b = cp.movie.stage.mainSlideDiv.getBoundingClientRect(), a = this.lAnswerLabelCanvasElem.getBoundingClientRect(), this.reviewIconImage.style.left = "-20px", this.reviewIconImage.style.top = "3px"));
            this.isDrawn = !0;
            this.visible || (this.element.style.visibility = "hidden");
            return !0
        }
    }
};
cp.SequenceInput.prototype.addIfNeeded = function(b) {
    if (!cp.responsive || !this.drawForResponsive(b)) {
        var c = cp.getQuestionObject(this.relatedQuestionSlide);
        if (c && !this.isDrawn && c.getIsStarted()) {
            var b = this.element.id,
                a = this.bounds;
            if (cp.movie.playbackController) {
                var d = cp.movie.playbackController.GetQuizController();
                if (d) {
                    d.GetIsInReviewMode();
                    var g = c.shouldDisableOptions(),
                        f = document.getElementById(this.canvasDivName),
                        d = cp.movie.stage.getSlideDiv().firstChild;
                    this.shouldShowComboBox = c.showAsCombo();
                    this.group =
                        c.getAnswerGroupName();
                    var h = cp.D[b];
                    this.isSkipped = this.isCorrect = !1;
                    var j = g ? "default" : "pointer";
                    this.lAnswerLabelCanvasElem = document.getElementById(cp.D[h.cn].dn);
                    this.zIndex = cp.D[h.actid].zIndex;
                    if (this.shouldShowComboBox) {
                        this.element.style.position = "absolute";
                        this.element.style.left = a.minX + "px";
                        this.element.style.top = a.minY + "px";
                        this.element.style.width = a.maxX - a.minX + "px";
                        this.element.style.height = a.maxY - a.minY + "px";
                        d = c.getSelectedIndex(this.answerID);
                        this.answerTextCanvasDivNames = c.answerOptions.slice(0);
                        o = cp.D[this.answerTextCanvasDivNames[0]].b;
                        if (4 == o.length)
                            for (t = 0; 4 > t; ++t) o[t] = parseFloat(o[t]);
                        else o = [0, 0, 0, 0];
                        this.answerTextCanvasImageBounds = {
                            minX: o[0],
                            minY: o[1],
                            maxX: o[2],
                            maxY: o[3]
                        };
                        var p = c.defaultTitleImage,
                            n = cp.movie.im;
                        n && n.getImageDataURI(p, function(a) {
                            p = a
                        }); - 1 == d && (this.isSkipped = !0);
                        if ("" == this.element.innerHTML) {
                            f = "" + ("<select class='mydds' id='" + b + "_sequenceInput' name='" + this.group + "'>");
                            for (j = 0; j < this.answerTextCanvasDivNames.length; ++j) o = cp.D[this.answerTextCanvasDivNames[j]], s = o.ip,
                                n && n.getImageDataURI(s, function(a) {
                                    s = a
                                }), f += "<option value='" + this.answerTextCanvasDivNames[j] + "' style='position:absolute;width:" + (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX) + "px' title='" + s + "'>", f += o.atxt, f += "</option>";
                            document.getElementById(this.element.id).innerHTML = f + "</select> ";
                            var e = document.getElementById(b + "_sequenceInput");
                            e.style.width = this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + "px";
                            e.style.height = this.answerTextCanvasImageBounds.maxY -
                                this.answerTextCanvasImageBounds.minY + "px";
                            e.style.position = "absolute";
                            o = h.actid;
                            j = cp.newElem("div");
                            cp.fixWebkitScaling(j);
                            cp.addRewrapObjectAsPerRestOfProjectItem(j);
                            j.id = b + "canvasHolder";
                            h.answerTextCanvasHolder = j.id;
                            j.setAttribute("class", "cp-rewrap");
                            var q;
                            if (cp.DESKTOP != cp.device) {
                                e.style.opacity = 0;
                                l = this;
                                e.onchange = function() {
                                    e.setNewIndex(e.selectedIndex)
                                };
                                e.ontouchstart = function() {
                                    if (!e.disabled && e.selectedIndex == -1) {
                                        l.answerTextCanvasDivName = l.answerTextCanvasDivNames[0];
                                        var a = cp.D[l.answerTextCanvasDivName];
                                        e.selectedIndex = 0;
                                        e.value = a[0];
                                        e.setNewIndex(0)
                                    }
                                };
                                e.style.zIndex = 1E3;
                                cp.verbose && cp.log("Index : " + d);
                                h = "<img id='" + b + "_spanImage' src='" + p + "' style='position:absolute;left:5px; height:" + (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY) + "px; title='" + p + "'/>";
                                h += "<img id='" + b + "_spanImageArrow' class='spanArrow' style='position:absolute;left:" + (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX - 20) + "px;top:3px'/>";
                                f = cp.newElem("span");
                                f.id = "spanComboBoxTitleImage";
                                f.className = "spanComboBox";
                                f.innerHTML = h;
                                f.style.width = this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + "px";
                                f.style.height = this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 3 + "px";
                                j.appendChild(f);
                                j.style.zIndex = this.zIndex;
                                var r, k = document.getElementById(b + "_spanImage");
                                e.setNewIndex = function(a) {
                                    if (a != -1) {
                                        l.answerTextCanvasDivName = l.answerTextCanvasDivNames[a];
                                        r = cp.D[l.answerTextCanvasDivName].ip;
                                        n && n.getImageDataURI(r, function(a) {
                                            r = a
                                        });
                                        e.selectedIndex =
                                            a
                                    } else {
                                        if (cp.verbose) {
                                            cp.log("Inside setNewIndex : " + a);
                                            cp.log("Setting image path as : " + p)
                                        }
                                        l.answerTextCanvasDivName = "";
                                        r = p;
                                        e.selectedIndex = -1;
                                        e.value = "";
                                        e.text = ""
                                    }
                                    k.style.display = "none";
                                    k.src = r;
                                    k.onload = setTimeout(function() {
                                        k.style.display = "block"
                                    }, 100)
                                };
                                e.setNewIndex(d);
                                j.style.position = "absolute";
                                j.style.left = a.minX + "px";
                                j.style.top = a.minY + "px";
                                j.style.width = a.maxX - a.minX + "px";
                                j.style.height = a.maxY - a.minY + "px";
                                this.sh && (a = this.sh.a, cp.applyShadow(this.element, this.sh.d * Math.cos(Math.PI * a / 180) +
                                    "px " + this.sh.d * Math.sin(Math.PI * a / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" : "")))
                            } else {
                                j = parseFloat(e.parentElement.style.left) + this.answerTextCanvasImageBounds.minX;
                                o = parseFloat(e.parentElement.style.top) + this.answerTextCanvasImageBounds.minY;
                                e.style.left = "10px";
                                e.parentElement.style.position = "absolute";
                                e.parentElement.style.left = a.minX + "px";
                                e.parentElement.style.top = a.minY + "px";
                                e.parentElement.style.width = a.maxX - a.minX + "px";
                                e.parentElement.style.height =
                                    a.maxY - a.minY + "px";
                                f = jQuery("#" + b + "_sequenceInput");
                                f.css("width", this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX);
                                l = this;
                                q = jQuery("#" + b + "_sequenceInput").msDropDown({
                                    style: "position:fixed, left:" + (a.minX + 20) + "px, top:" + this.bounds.minY + "px, height:" + (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY) + "px, width:" + (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX) + "px,",
                                    on: {
                                        close: function() {
                                            l.element.parentElement.style.zIndex =
                                                l.zIndex
                                        }
                                    }
                                }, p).data("dd");
                                h.oHandler = q;
                                q.set("selectedIndex", d);
                                this.sh && (a = this.sh.a, cp.applyShadow(this.element, this.sh.d * Math.cos(Math.PI * a / 180) + "px " + this.sh.d * Math.sin(Math.PI * a / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" : "")));
                                var m = q.open;
                                q.open = function(a) {
                                    l.element.parentElement.style.zIndex = 1E3;
                                    a.preventDefault();
                                    a.stopPropagation();
                                    m()
                                };
                                cp.addDCHDiv(this.element, function(a) {
                                    q.open(a)
                                });
                                e.onchange = function(a) {
                                    q.set("selectedIndex", e.selectedIndex);
                                    a.preventDefault();
                                    return false
                                }
                            }
                            g && (this.element.style.cursor = "default", cp.DESKTOP != cp.device ? e.disabled = "disabled" : q.set("disabled", !0))
                        }
                        f = document.getElementById(b + "_sequenceInput");
                        this.answerTextCanvasDivName = f.value
                    } else {
                        this.answerTextCanvasDivName = c.getAnswerOption(this.answerID, b);
                        o = cp.D[this.answerTextCanvasDivName];
                        h.answerTextDivName = this.answerTextCanvasDivName;
                        var s = o.ip,
                            o = o.b;
                        if (4 == o.length)
                            for (var t = 0; 4 > t; ++t) o[t] = parseFloat(o[t]);
                        else o = [0, 0, 0, 0];
                        this.answerTextCanvasImageBounds = {
                            minX: o[0],
                            minY: o[1],
                            maxX: o[2],
                            maxY: o[3]
                        };
                        this.element.style.cursor = j;
                        this.element.style.borderRadius = "5px";
                        this.element.style.left = "-20px";
                        this.element.style.top = "-2px";
                        this.element.style.width = this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 40 + "px";
                        this.element.style.height = this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6 + "px";
                        this.element.style.position = "absolute";
                        this.element.style.background = "#000000";
                        this.element.style.opacity = 0;
                        a = cp.newElem("div");
                        cp.fixWebkitScaling(a);
                        d.insertBefore(a, f.parentElement);
                        a.id = b + "_dummyhighlight";
                        a.style.cursor = j;
                        a.style.borderRadius = "5px";
                        a.style.left = this.bounds.minX - 30 + "px";
                        a.style.top = this.bounds.minY - 3 + "px";
                        a.style.width = this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 40 + "px";
                        a.style.height = this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6 + "px";
                        a.style.position = "absolute";
                        a.style.zIndex = this.zIndex;
                        o = h.actid;
                        j = cp.newElem("div");
                        cp.fixWebkitScaling(j);
                        d.insertBefore(j, f.parentElement);
                        j.id = b + "canvasHolder";
                        h.answerTextCanvasHolder = j.id;
                        j.setAttribute("class", "cp-rewrap");
                        a = cp.newElem("canvas");
                        canvas = this.canvas = cp.createCanvas(0, 0, cp.D.project.w, cp.D.project.h, a);
                        a.setAttribute("class", "cp-shape");
                        a.setAttribute("name", this.group);
                        a.id = this.answerTextCanvasDivName;
                        j.appendChild(a);
                        j.style.zIndex = this.zIndex;
                        (new cp.Shape(a, cp.D[this.answerTextCanvasDivName])).start();
                        h = cp.D[o].mdi;
                        j = parseFloat(a.parentElement.style.left) + (cp.D[h].b[0] - this.answerTextCanvasImageBounds.minX);
                        o = parseFloat(a.parentElement.style.top) + (cp.D[h].b[1] - this.answerTextCanvasImageBounds.minY);
                        a.parentElement.style.left = j + "px";
                        a.parentElement.style.top = o + "px";
                        a = f.parentElement;
                        h = a.nextSibling;
                        d.removeChild(a);
                        d.insertBefore(a, h);
                        var l = this;
                        if (cp.DESKTOP == cp.device) {
                            var u = document.getElementById(b + "_dummyhighlight");
                            this.element.onmouseover = function() {
                                if (!cp.disableInteractions && !g && (u.style.backgroundColor = "#000000", u.style.opacity = "0.3", l.sh)) {
                                    var a = l.sh.a;
                                    cp.applyShadow(u, l.sh.d * Math.cos(Math.PI *
                                        a / 180) + "px " + l.sh.d * Math.sin(Math.PI * a / 180) + "px " + l.sh.b + "px " + cp.ConvertRGBToRGBA(l.sh.c, l.sh.o) + (l.sh.i ? " inset" : ""))
                                }
                            };
                            this.element.onmouseout = function() {
                                !cp.disableInteractions && !g && (u.style.backgroundColor = "transparent", cp.applyShadow(u, ""))
                            }
                        }
                        this.element.disableOption = function() {
                            g = !0;
                            l.element.tabIndex = -1
                        };
                        g || c.addDragEvents(b)
                    }
                    this.isCorrect = c.getIsOptionCorrect(this.answerTextCanvasDivName);
                    g && (this.element.style.cursor = "default", this.element.tabIndex = -1, c.getWasJudged() && c.canShowReviewIcons() &&
                        (l = this, c.getAnsweredCorrectly() ? (c = cp.newElem("img"), c.id = b + "_reviewCorrect", c.src = cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src, c.tabIndex = -1, c.style.position = "absolute", c.style.left = "-20px", c.style.top = "0px", this.lAnswerLabelCanvasElem.appendChild(c), c.style.zIndex = this.zIndex, l.sh && (a = l.sh.a, cp.applyShadow(c, l.sh.d * Math.cos(Math.PI * a / 180) + "px " + l.sh.d * Math.sin(Math.PI * a / 180) + "px " + l.sh.b + "px " + cp.ConvertRGBToRGBA(l.sh.c, l.sh.o) + (l.sh.i ? " inset" : "") +
                            (l.sh.i ? " inset" : "")))) : (a = this.isCorrect ? cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src : this.isSkipped ? cp.movie.im.m_projectImages["assets/htmlimages/skip_answer_normal.png"].nativeImage.src : cp.movie.im.m_projectImages["assets/htmlimages/incorrect_answer_normal.png"].nativeImage.src, c = cp.newElem("img"), c.id = b + "_reviewIncorrect", c.src = a, c.tabIndex = -1, c.style.position = "absolute", c.style.left = "-20px", c.style.top = "0px", this.lAnswerLabelCanvasElem.appendChild(c),
                            c.style.zIndex = this.zIndex, l.sh && (a = l.sh.a, cp.applyShadow(c, l.sh.d * Math.cos(Math.PI * a / 180) + "px " + l.sh.d * Math.sin(Math.PI * a / 180) + "px " + l.sh.b + "px " + cp.ConvertRGBToRGBA(l.sh.c, l.sh.o) + (l.sh.i ? " inset" : ""))))));
                    this.isDrawn = !0;
                    this.visible || (this.element.style.visibility = "hidden")
                }
            }
        }
    }
};
cp.SequenceQuestion = function(b, c) {
    cp.SequenceQuestion.baseConstructor.call(this, b, c);
    this.answerOptions = this.getAnswerOptions();
    this.isShuffleEnabled = this.questionData.ish;
    this.answerOptionsDrawnCtr = this.isCorrectCounter = this.shuffleCounter = -1;
    this.answerOptionsDrawn = !1;
    this.correctSequenceArr = this.questionData.cal;
    this.defaultTitleImage = this.questionData.defaultTitleImage;
    this.currentSequenceArr = [];
    this.selectedSequenceArr = [];
    this.selectedIndexes = [];
    this.sequenceElementList = []
};
cp.inherits(cp.SequenceQuestion, cp.Question);
cp.SequenceQuestion.prototype.setQuestionSpecificScoreProperties = function(b) {
    this.showAsCombo() && 0 >= this.selectedSequenceArr.length ? b.m_answerOrderArrayAsString = "" : cp.SequenceQuestion.superClass.setQuestionSpecificScoreProperties.call(this, b)
};
cp.SequenceQuestion.prototype.resumeSelectedAnswers = function(b) {
    if (!(0 >= b.length)) {
        var c = this.questionData.ao;
        if (c && !(0 >= c.length)) {
            for (var a = {}, d = 0; d < c.length; ++d) {
                var g = c[d].split(":");
                a[g[1]] = g[0]
            }
            for (c = 0; c < b.length; ++c) d = unescape(b[c].m_chosenAnswer), g = "", void 0 != a[d] ? g = a[d] : (d = d.split("answerText_"), g = a[d[1]]), this.m_selectedAnswersArr.push(g);
            this.resumeSequenceArrays()
        }
    }
};
cp.SequenceQuestion.prototype.startQuestion = function() {
    this.answerOptionsDrawnCtr = this.isCorrectCounter = this.shuffleCounter = -1;
    this.answerOptionsDrawn = !1;
    if (this.m_quizController) {
        var b = this.m_quizController.GetIsInReviewMode();
        this.m_isShuffled || this.shuffleAnswers();
        b && this.addCorrectAnswerDiv();
        cp.SequenceQuestion.superClass.startQuestion.call(this)
    }
};
cp.SequenceQuestion.prototype.getExpectedCorrectAnswerTextList = function(b) {
    var c = this.correctSequenceArr;
    if (0 >= c.length) return "";
    for (var a = cp.D[c[0]], d = cp.trimStartingAndTrailingSpaces(a.atxtlms), g = 1; g < c.length; ++g) a = cp.D[c[g]], d += b + cp.trimStartingAndTrailingSpaces(a.atxtlms);
    return d
};
cp.SequenceQuestion.prototype.getSelectedAnswerTextList = function(b) {
    if (this.showAsCombo()) {
        d = this.getAllOptions();
        if (0 >= d.length) return "";
        var c = d[0],
            c = -1 != c.selectedIndex ? c.value : "",
            a = " ";
        "" != c && (c = cp.D[c], a = cp.trimStartingAndTrailingSpaces(c.atxtlms));
        for (g = 1; g < d.length; ++g) c = d[g], c = c.value, "" != c && (c = cp.D[c], a += b + cp.trimStartingAndTrailingSpaces(c.atxtlms));
        "" == a && (a = "0")
    } else {
        var d = this.sequenceElementList;
        if (0 >= d.length) return "";
        for (var c = d[0], c = cp.D[c], c = c.answerTextDivName, c = cp.D[c], a = cp.trimStartingAndTrailingSpaces(c.atxtlms),
                g = 1; g < d.length; ++g) c = d[g], c = cp.D[c], c = c.answerTextDivName, c = cp.D[c], a += b + cp.trimStartingAndTrailingSpaces(c.atxtlms)
    }
    return a
};
cp.SequenceQuestion.prototype.getChosenAnswerAsStringForReview = function() {
    var b = this.getSelectedAnswerTextList(";");
    if (!b || "0" == b) b = "";
    return b
};
cp.SequenceQuestion.prototype.getCorrectAnswerAsStringForReview = function() {
    var b = this.getExpectedCorrectAnswerTextList(";");
    b || (b = "");
    return b
};
cp.SequenceQuestion.prototype.saveAnswerOrder = function() {
    if (this.showAsCombo()) {
        for (var b = this.getAllOptions(), c = 0; c < b.length; ++c) this.currentSequenceArr[c] = b[c].value;
        this.m_answerOrderArray = this.answerOptions.slice(0)
    } else this.m_answerOrderArray = this.currentSequenceArr.slice(0);
    cp.verbose && cp.log("Current Sequence : " + this.currentSequenceArr);
    this.m_selectedAnswersArr = [];
    for (b = 0; b < this.currentSequenceArr.length; ++b) this.m_selectedAnswersArr.push(this.currentSequenceArr[b]);
    this.setSelectedAnswers()
};
cp.SequenceQuestion.prototype.setAnswerOrder = function(b) {
    if (b && !(0 >= b.length)) {
        for (var b = b.split(";"), c = 0; c < b.length; ++c);
        this.answerOptions = b.slice(0);
        this.m_answerOrderArray = b.slice(0)
    }
};
cp.SequenceQuestion.prototype.resumeSequenceArrays = function() {
    var b = this.m_selectedAnswersArr.slice(0);
    if (!(0 >= b.length))
        if (this.showAsCombo())
            for (var c = 0; c < b.length; ++c) - 1 == b[c] || "undefined" == b[c] ? (this.currentSequenceArr[c] = "", this.selectedSequenceArr[c] = "") : (this.currentSequenceArr[c] = b[c], this.selectedSequenceArr[c] = b[c]);
        else this.selectedSequenceArr = this.currentSequenceArr = b
};
cp.SequenceQuestion.prototype.clearAnswers = function() {
    this.verbose && cp.log("Inside Clear Answers");
    var b = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest(),
        b = (b = !1 == this.getWasJudged() || b && !1 == this.m_quizController.m_submittedAllQuestions) && (!this.m_quizController.GetIsInReviewMode() || this.getIsKnowledgeCheck());
    !1 != b && (this.verbose && cp.log("Not Attempted. Hence Clearing"), this.selectedSequenceArr = [], this.drawSequenceOptions(this.answerOptions))
};
cp.SequenceQuestion.prototype.showAsCombo = function() {
    return this.questionData.sac
};
cp.SequenceQuestion.prototype.getIsOptionCorrect = function(b) {
    var c = this.correctSequenceArr[++this.isCorrectCounter];
    this.isCorrectCounter == this.answerOptions.length && (this.isCorrectCounter = -1);
    return c == b
};
cp.SequenceQuestion.prototype.addDragEvents = function(b) {
    var c = document.getElementById(b);
    if (c) {
        var a = this,
            d = document.getElementById(this.getAssociatedObjName());
        this.dropIndicatorImage = this.draggedImageCopy = void 0;
        this.draggedOptionIndex = -1;
        var g = cp.movie.stage.getSlideDiv();
        if (cp.device != cp.DESKTOP) this.lTouchStarted = !1, c.ontouchstart = function(b) {
            if (1 == b.touches.length) {
                cp.m_gestureHandler.enabled = !1;
                for (var c = b.touches[0], n = c.target, e = cp.D[b.target.id].answerTextDivName, b = cp.getScaledPosition(c.pageX,
                        c.pageY), q, f = a.currentSequenceArr.slice(0), h = 0; h < f.length; ++h)
                    if (f[h] == e) {
                        q = h;
                        break
                    }
                a.dropIndicatorImage = cp.newElem("img");
                a.dropIndicatorImage.id = "dropIndicatorImg";
                a.dropIndicatorImage.className = "dropIndicator";
                a.dropIndicatorImage.style.left = parseFloat(n.parentNode.style.left) - 50 + "px";
                a.dropIndicatorImage.style.top = parseFloat(n.parentNode.style.top) + "px";
                a.dropIndicatorImage.style.position = "absolute";
                a.draggedOptionIndex = q;
                n = cp.D[e];
                g.getBoundingClientRect();
                if (cp.responsive) a.draggedImageCopy =
                    cp.newElem("div"), a.draggedImageCopy.innerHTML = cp.D[n.dn].rpvt[cp.ResponsiveProjWidth].vt, a.draggedImageCopy.style.left = c.pageX + "px", a.draggedImageCopy.style.top = c.pageY + "px", a.draggedImageCopy.style.zIndex = 1E3, cp.scaleItem(a.draggedImageCopy, cp("div_Slide").scaleFactor, cp("div_Slide").scaleFactor), document.body.appendChild(a.draggedImageCopy);
                else {
                    a.draggedImageCopy = cp.newElem("img");
                    var m = n.ip;
                    (n = cp.movie.im) && n.getImageDataURI(m, function(a) {
                        m = a
                    });
                    a.draggedImageCopy.src = m;
                    cp.shouldScale ? (a.draggedImageCopy.style.left =
                        b.X + 10 + "px", a.draggedImageCopy.style.top = b.Y + "px", d.parentNode.appendChild(a.draggedImageCopy)) : (a.draggedImageCopy.style.left = c.pageX + "px", a.draggedImageCopy.style.top = c.pageY + "px", a.draggedImageCopy.style.zIndex = 1E3, cp.scaleItem(a.draggedImageCopy, cp("div_Slide").scaleFactor, cp("div_Slide").scaleFactor), document.body.appendChild(a.draggedImageCopy))
                }
                a.draggedImageCopy.id = "draggedImageCopy";
                a.draggedImageCopy.style.display = "block";
                a.draggedImageCopy.style.position = "absolute";
                d.parentNode.appendChild(a.dropIndicatorImage);
                a.lTouchStarted = !0
            }
        }, c.ontouchmove = function(b) {
            if ((!b.target || !b.target.isTocItem) && 1 == b.touches.length)
                if (cp.m_gestureHandler.enabled = !1, a.lTouchStarted) {
                    b.preventDefault && b.preventDefault();
                    var c = b.touches[0],
                        b = cp.getScaledPosition(c.pageX, c.pageY),
                        d = g.getBoundingClientRect();
                    cp.responsive ? (a.draggedImageCopy.style.left = c.pageX + "px", a.draggedImageCopy.style.top = c.pageY + "px") : cp.shouldScale ? (a.draggedImageCopy.style.left = b.X + 10 + "px", a.draggedImageCopy.style.top = b.Y + "px") : (a.draggedImageCopy.style.left =
                        c.pageX + "px", a.draggedImageCopy.style.top = c.pageY + "px");
                    for (var c = a.sequenceElementList, e = "", f = 0; f < c.length; ++f) {
                        var h = c[f],
                            k = document.getElementById(h),
                            m = 0;
                        cp.shouldScale ? (parseFloat(k.parentNode.style.left), e = parseFloat(k.parentNode.style.top), parseFloat(k.parentNode.style.left), parseFloat(k.parentNode.style.width), k = parseFloat(k.parentNode.style.top) + parseFloat(k.parentNode.style.height), m = b.Y) : (m = k.parentNode.getBoundingClientRect(), e = m.top - d.top, k = m.bottom - d.top, m = b.Y - d.top);
                        m -= window.pageYOffset;
                        h = document.getElementById(h + "_dummyhighlight");
                        h.style.backgroundColor = "transparent";
                        m >= e && m <= k && (e = parseFloat(e), a.dropIndicatorImage.style.top = e + 3 + "px", h.style.backgroundColor = "#efefef")
                    }
                }
        }, c.ontouchend = function(b) {
            cp.m_gestureHandler.enableGestures && cp.m_gestureHandler.enableGestures();
            b.stopPropagation && b.stopPropagation();
            a.lTouchStarted = !1;
            if (a.draggedImageCopy) {
                b = a.draggedImageCopy.getBoundingClientRect();
                a.draggedImageCopy.parentNode && a.draggedImageCopy.parentNode.removeChild(a.draggedImageCopy);
                a.dropIndicatorImage && a.dropIndicatorImage.parentNode && a.dropIndicatorImage.parentNode.removeChild(a.dropIndicatorImage);
                a.draggedImageCopy = void 0;
                a.dropIndicatorImage = void 0;
                for (var c = g.getBoundingClientRect(), d = b.top - c.top, e = parseFloat(a.draggedOptionIndex), f = -1, b = a.currentSequenceArr.slice(0), h = a.sequenceElementList, k = 0; k < h.length; ++k) {
                    var m = h[k],
                        s = document.getElementById(m).getBoundingClientRect(),
                        o = s.top - c.top,
                        s = s.bottom - c.top;
                    document.getElementById(m + "_dummyhighlight").style.backgroundColor =
                        "transparent";
                    if (d >= o && d <= s) {
                        f = k;
                        break
                    }
                }
                if (-1 != f) {
                    c = [];
                    if (e < f)
                        for (d = b[e]; e < f; ++e) b[e] = b[e + 1];
                    else
                        for (d = b[e]; e > f; --e) b[e] = b[e - 1];
                    b[f] = d;
                    for (f = 0; f < b.length; ++f) c.push(b[f]);
                    a.drawSequenceOptions(c)
                }
            }
        };
        else {
            this.isMouseDown = !1;
            c.ondragstart = function() {
                return !1
            };
            c.onselectstart = function() {
                return !1
            };
            var f = function(b) {
                    if (a.isMouseDown) {
                        var c = 0,
                            d = g.getBoundingClientRect();
                        if (a.draggedImageCopy) {
                            var e = cp.getScaledPosition(b.clientX, b.clientY);
                            cp.responsive ? (c = e.Y - d.top, a.draggedImageCopy.style.left = e.X -
                                d.left + "px") : cp.shouldScale ? (c = e.Y, a.draggedImageCopy.style.left = e.X + "px") : (c = b.clientY - d.top, a.draggedImageCopy.style.left = b.clientX - d.left + "px");
                            a.draggedImageCopy.style.top = c + "px"
                        }
                        if (a.dropIndicatorImage) {
                            b = a.sequenceElementList;
                            for (e = e = 0; e < b.length; ++e) {
                                var f = document.getElementById(b[e]).getBoundingClientRect(),
                                    h = f.top,
                                    k = f.bottom,
                                    m = d.top;
                                cp.shouldScale && (h = cp.getScaledPosition(f.left, f.top).Y, k = cp.getScaledPosition(f.right, f.bottom).Y, m = 0);
                                f = h - m;
                                k -= m;
                                m = 0;
                                0 < e && (m = document.getElementById(b[e - 1]).getBoundingClientRect(),
                                    h = m.bottom, cp.shouldScale && (h = cp.getScaledPosition(m.right, m.bottom).Y), m = h - d.top);
                                if (c > m && c < k) {
                                    e = parseFloat(f);
                                    a.dropIndicatorImage.style.top = e + 3 + "px";
                                    break
                                }
                            }
                        }
                    }
                },
                h = function() {
                    if (!cp.disableInteractions && (document.onmousemove = a.prevMouseMove, document.onmouseup = a.prevMouseUp, this.addedCustomDocMouseUpEvnt = !1, c.onmousemove = void 0, a.isMouseDown)) {
                        a.isMouseDown = !1;
                        cp.verbose && cp.log("Drag Ended");
                        var b = document.getElementById(a.dropIndicatorImage.id);
                        b && b.parentNode.removeChild(b);
                        var b = a.draggedImageCopy.getBoundingClientRect(),
                            d = document.getElementById(a.draggedImageCopy.id);
                        d && d.parentNode.removeChild(d);
                        var f = g.getBoundingClientRect(),
                            e = b.top - f.top;
                        a.dropIndicatorImage = void 0;
                        a.draggedImageCopy = void 0;
                        for (var h = parseFloat(a.draggedOptionIndex), d = -1, b = a.currentSequenceArr.slice(0), r = a.sequenceElementList, k = 0; k < r.length; ++k) {
                            var m = document.getElementById(r[k]);
                            cp.verbose && cp.log(m.parentNode.id);
                            var m = m.getBoundingClientRect().bottom - f.top,
                                s = 0;
                            0 < k && (s = document.getElementById(r[k - 1]), cp.verbose && cp.log(s.parentNode.id),
                                s = s.getBoundingClientRect().bottom - f.top);
                            cp.verbose && cp.log(e + "," + s + "," + m);
                            if (e > s && e <= m) {
                                d = k;
                                break
                            }
                        }
                        if (-1 != d) {
                            f = [];
                            cp.verbose && cp.log("From,To : " + h + "," + d);
                            if (h < d)
                                for (e = b[h]; h < d; ++h) b[h] = b[h + 1];
                            else
                                for (e = b[h]; h > d; --h) b[h] = b[h - 1];
                            b[d] = e;
                            for (d = 0; d < b.length; ++d) f.push(b[d]);
                            cp.verbose && cp.log("Sequence to be drawn : " + f.toString());
                            a.drawSequenceOptions(f)
                        }
                    }
                };
            c.onmousedown = function(b) {
                if (!cp.disableInteractions) {
                    cp.verbose && cp.log("Dragging element : " + b.target.id);
                    if (a.dropIndicatorImage) {
                        var p = document.getElementById(a.dropIndicatorImage.id);
                        p && p.parentNode.removeChild(p)
                    }
                    a.draggedImageCopy && (p = document.getElementById(a.draggedImageCopy.id)) && p.parentNode.removeChild(p);
                    var p = cp.getScaledPosition(b.clientX, b.clientY),
                        n = b.target.parentNode.firstChild;
                    n.firstChild && "p" == n.firstChild.nodeName.toLowerCase() && (n = n.nextSibling);
                    var e = cp.D[n.id],
                        n = e.answerTextDivName;
                    a.sh = e.sh;
                    for (var q, e = a.currentSequenceArr.slice(0), r = 0; r < e.length; ++r)
                        if (e[r] == n) {
                            q = r;
                            break
                        }
                    a.draggedOptionIndex = q;
                    q = cp.D[n];
                    var k = q.ip;
                    (n = cp.movie.im) && n.getImageDataURI(k, function(a) {
                        k =
                            a
                    });
                    a.dropIndicatorImage = cp.newElem("img");
                    cp.fixWebkitScaling(a.dropIndicatorImage);
                    a.dropIndicatorImage.id = "dropIndicatorImg";
                    a.dropIndicatorImage.className = "dropIndicator";
                    a.dropIndicatorImage.style.left = parseFloat(b.target.parentNode.style.left) - 50 + "px";
                    a.dropIndicatorImage.style.top = parseFloat(b.target.parentNode.style.top) + "px";
                    a.dropIndicatorImage.style.position = "absolute";
                    cp.responsive ? (a.draggedImageCopy = cp.newElem("div"), a.draggedImageCopy.innerHTML = cp.D[q.dn].rpvt[cp.ResponsiveProjWidth].vt,
                        b = g.getBoundingClientRect(), a.draggedImageCopy.style.left = window.pageXOffset + p.X - b.left + "px", a.draggedImageCopy.style.top = window.pageYOffset + p.Y - b.top + "px") : (a.draggedImageCopy = cp.newElem("img"), a.draggedImageCopy.src = k, a.draggedImageCopy.style.left = parseFloat(b.target.parentNode.style.left) + "px", a.draggedImageCopy.style.top = parseFloat(b.target.parentNode.style.top) + "px");
                    cp.fixWebkitScaling(a.draggedImageCopy);
                    a.draggedImageCopy.id = "draggedImageCopy";
                    a.draggedImageCopy.style.display = "block";
                    a.draggedImageCopy.style.position =
                        "absolute";
                    a.sh && (b = a.sh.a, cp.applyShadow(a.draggedImageCopy, a.sh.d * Math.cos(Math.PI * b / 180) + "px " + a.sh.d * Math.sin(Math.PI * b / 180) + "px " + a.sh.b + "px " + cp.ConvertRGBToRGBA(a.sh.c, a.sh.o) + (a.sh.i ? " inset" : "")));
                    a.draggedImageCopy.style.zIndex = 1E3;
                    a.dropIndicatorImage.style.zIndex = 1E3;
                    d.appendChild(a.dropIndicatorImage);
                    d.appendChild(a.draggedImageCopy);
                    a.isMouseDown = !0;
                    cp.verbose && cp.log(a.isMouseDown);
                    a.prevMouseMove = document.onmousemove;
                    a.prevMouseUp = document.onmouseup;
                    c.onmousemove = f;
                    document.onmousemove =
                        f;
                    document.onmouseup = h;
                    this.addedCustomDocMouseUpEvnt = !0;
                    return !1
                }
            }
        }
    }
};
cp.SequenceQuestion.prototype.removeDragEvents = function(b) {
    cp.verbose && cp.log("Removing drag events for : " + b);
    if (b = document.getElementById(b)) this.addedCustomDocMouseUpEvnt && (document.onmouseup = void 0), b.onmousedown = void 0, b.ondragstart = void 0, b.onselectstart = void 0, b.ontouchstart = void 0, b.ontouchmove = void 0, b.ontouchend = void 0, b.style.cursor = "default"
};
cp.SequenceQuestion.prototype.shuffleAnswers = function() {
    var b = !this.m_quizController.GetIsAttemptFinished() && this.getWasJudged() && !this.m_quizController.GetIsSubmitAll(),
        c = this.getIsPretest() && this.m_quizController.GetIsPretestQuestionsDisabled();
    if (!((!(this.getIsKnowledgeCheck() || !b && !this.m_quizController.GetIsInReviewMode() && !c) || this.m_isShuffled) && 0 < this.answerOptions.length)) {
        for (var a = this.answerOptions.length, d, c = [], b = 0; b < a; ++b) c[b] = this.answerOptions[b];
        for (b = a; 1 < b; b--) a = Math.floor(Math.random() *
            b), a != b && (d = c[a], c[a] = c[b - 1], c[b - 1] = d);
        this.updateOriginalSequence(c);
        this.m_isShuffled = !0
    }
};
cp.SequenceQuestion.prototype.getAnswerOption = function(b, c) {
    var a;
    if (!this.sequenceElementList || 0 >= this.sequenceElementList.length || this.sequenceElementList.length >= this.answerOptions.length) this.sequenceElementList = [];
    this.sequenceElementList.push(c);
    this.shuffleCounter >= this.answerOptions.length && (this.shuffleCounter = -1);
    var d = this.answerOptions[++this.shuffleCounter];
    a = cp.D[d];
    var g = cp.D[c];
    void 0 != a && (a.aid = g.aid);
    this.shuffleCounter == this.answerOptions.length - 1 && (this.answerOptionsDrawn = !0);
    return d
};
cp.SequenceQuestion.prototype.getAnswerScores = function() {
    var b = [];
    if (0 >= this.correctSequenceArr.length) return b;
    var c = this.correctSequenceArr.slice(0),
        a = this.selectedSequenceArr.slice(0);
    if (!a || 0 >= a.length) return b;
    var d = this.questionData.ao,
        g = this.m_answerOrderArray;
    if (g && d && 0 < g.length && g.length == d.length)
        for (var f = {}, g = 0; g < d.length; ++g) {
            var h = d[g].split(":");
            f[h[0]] = h[1]
        }
    for (d = 0; d < a.length; ++d) {
        var g = cp.D[c[d]],
            h = cp.D[a[d]],
            j = new cp.AnswerScore;
        j.m_chosenAnswer = h ? this.showAsCombo() ? cp.trimStartingAndTrailingSpaces(h.atxtlms) : "Q_" +
            (this.getQuestionNumberInQuiz() + 1) + "answerText_" + f[a[d]] : "";
        g ? (j.m_answerID = this.showAsCombo() ? g.aid : h.aid, j.m_correctAnswer = cp.trimStartingAndTrailingSpaces(g.atxtlms)) : (j.m_answerID = "", j.m_correctAnswer = "");
        b.push(j)
    }
    return b
};
cp.SequenceQuestion.prototype.getSelectedIndex = function() {
    if (0 < this.selectedSequenceArr.length) {
        this.shuffleCounter >= this.selectedSequenceArr.length && (this.shuffleCounter = -1);
        var b = this.selectedSequenceArr[++this.shuffleCounter];
        if (void 0 == b || "" == b || "undefined" == b) return -1;
        ++this.answerOptionsDrawnCtr;
        this.answerOptionsDrawnCtr == this.answerOptions.length - 1 && (this.answerOptionsDrawnCtr = -1, this.answerOptionsDrawn = !0);
        for (var c = 0; c < this.answerOptions.length; ++c)
            if (b == this.answerOptions[c]) return c
    } else ++this.answerOptionsDrawnCtr,
        this.answerOptionsDrawnCtr == this.answerOptions.length - 1 && (this.answerOptionsDrawnCtr = -1, this.answerOptionsDrawn = !0);
    return -1
};
cp.SequenceQuestion.prototype.updateOriginalSequence = function(b) {
    cp.verbose && cp.log("populating original sequence and current sequence");
    for (var c = 0; c < b.length; ++c) {
        var a = b[c];
        this.answerOptions[c] = a;
        this.currentSequenceArr[c] = a
    }
    cp.verbose && cp.log("Current Sequence : " + this.currentSequenceArr)
};
cp.SequenceQuestion.prototype.resetQuestionData = function() {
    cp.SequenceQuestion.superClass.resetQuestionData.call(this);
    this.m_quizController.GetGoToQuizScopeActionExecuted() || (this.selectedSequenceArr = []);
    this.shuffleCounter = -1
};
cp.SequenceQuestion.prototype.disableAllOptions = function() {
    if (this.m_quizController) {
        var b = !0;
        this.m_quizController.GetIsSubmitAll() && !this.getIsPretest() && (!this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions) && (b = !1);
        if (b) {
            if (this.showAsCombo()) {
                b = this.getAllOptions();
                for (i = 0; i < b.length; ++i)
                    if (cp.DESKTOP != cp.device || cp.responsive) document.getElementById(b[i].id).disabled = "disabled";
                    else {
                        var c = b[i].id.replace("_sequenceInput", "");
                        cp.D[c].oHandler.set("disabled", !0)
                    }
            } else
                for (i = 0; i < this.sequenceElementList.length; ++i) this.removeDragEvents(this.sequenceElementList[i]), (b = cp(this.sequenceElementList[i])) && b.disableOption && b.disableOption();
            this.m_answersDisabled = !0
        }
    }
};
cp.SequenceQuestion.prototype.getAllOptions = function() {
    return this.showAsCombo() ? document.getElementsByName(this.getAnswerGroupName()) : this.answerOptions
};
cp.SequenceQuestion.prototype.drawSequenceOptions = function(b) {
    cp.verbose && cp.log("Inside drawSequenceOptions");
    cp.verbose && cp.log("Current Sequence : " + this.currentSequenceArr);
    this.currentSequenceArr = b.slice(0);
    cp.verbose && cp.log("Current Sequence : " + this.currentSequenceArr);
    if (this.answerOptionsDrawn) {
        var c = this.getAllOptions();
        if (this.showAsCombo())
            for (g = 0; g < c.length; ++g) {
                var a = c[g],
                    d = a.id.replace("_sequenceInput", "");
                cp.DESKTOP != cp.device || cp.responsive ? document.getElementById(a.id).setNewIndex(-1) :
                    (a = a.id.replace("_sequenceInput", ""), cp.D[a].oHandler.set("selectedIndex", -1));
                parentElementDivData = cp.D[d];
                seqOptionDivData = cp.D[b[g]];
                seqOptionDivData.aid = parentElementDivData.aid
            } else
                for (var g = 0; g < this.sequenceElementList.length; ++g) {
                    var c = cp.D[this.sequenceElementList[g]],
                        f = c.answerTextDivName,
                        d = b[g],
                        a = document.getElementById(d);
                    document.getElementById(f);
                    f = document.getElementById(c.answerTextCanvasHolder);
                    if (a) {
                        if (cp.responsive) {
                            var h = a.parentNode;
                            h && (a = f.innerHTML, f.innerHTML = h.innerHTML, h.innerHTML =
                                a)
                        } else(h = a.parentNode) && h.removeChild(a), f.appendChild(a);
                        c.answerTextDivName = d;
                        cp.D[d].aid = c.aid
                    }
                }
    }
};
cp.SequenceQuestion.prototype.checkIfAttempted = function() {
    if (this.showAsCombo())
        for (var b = this.getAllOptions(), c = 0; c < b.length; ++c) {
            if ("" != b[c].value) return !0
        } else return !0;
    return !1
};
cp.SequenceQuestion.prototype.checkIfCorrect = function() {
    return this.currentSequenceArr.toString() == this.correctSequenceArr.toString()
};
cp.SequenceQuestion.prototype.setSelectedAnswers = function() {
    this.showAsCombo() || (this.answerOptions = this.currentSequenceArr.slice(0), this.m_answerOrderArray = this.currentSequenceArr.slice(0));
    this.selectedSequenceArr = this.currentSequenceArr.slice(0)
};
cp.SequenceQuestion.prototype.checkAndSetQuestionStatus = function() {
    var b = this.QuestionStatusEnum.INCOMPLETE,
        b = !1;
    b = this.getIsSurvey() ? this.checkIfAttempted() ? this.QuestionStatusEnum.CORRECT : this.QuestionStatusEnum.INCOMPLETE : this.checkIfAttempted() ? (b = this.checkIfCorrect()) ? this.QuestionStatusEnum.CORRECT : this.QuestionStatusEnum.INCORRECT : this.QuestionStatusEnum.INCOMPLETE;
    this.setQuestionStatus(b)
};
cp.SequenceQuestion.prototype.updateCustomReviewAreaTransforms = function() {
    if (cp.responsive && !this.getAnsweredCorrectly() && this.questionTextCanvasName) {
        var b = document.getElementById(this.questionTextCanvasName + "_reviewButton");
        if (b) {
            var c = cp.D[this.questionTextCanvasName],
                c = cp.createTempElemAndGetBoundingRect(c.css[cp.ResponsiveProjWidth], cp(c.dn).parentElement),
                a = cp.movie.stage.mainSlideDiv.getBoundingClientRect();
            b.style.left = c.left - a.left + "px";
            b.style.top = c.bottom - a.top + "px"
        }
    }
};
cp.SequenceQuestion.prototype.addCorrectAnswerDiv = function() {
    if (this.getWasJudged() && !this.getAnsweredCorrectly() && this.questionTextCanvasName) {
        var b = cp.D[this.questionTextCanvasName],
            c = b.dn,
            a = b.b;
        if (4 == a.length)
            for (var d = 0; 4 > d; ++d) a[d] = parseFloat(a[d]);
        else a = [0, 0, 0, 0];
        var d = document.getElementById(this.getAssociatedObjName()),
            g = this.questionTextCanvasName + "_reviewButton",
            f = document.getElementById(g);
        f || (f = cp.newElem("img"));
        f.id = g;
        cp.fixWebkitScaling(f);
        f.className = "sequenceReviewImage";
        f.style.position =
            "absolute";
        cp.responsive ? (b = cp.createTempElemAndGetBoundingRect(b.css[cp.ResponsiveProjWidth], cp(c).parentElement), c = cp.movie.stage.mainSlideDiv.getBoundingClientRect(), f.style.left = b.left - c.left + "px", f.style.top = b.bottom + "px") : (f.style.left = a[0] + "px", f.style.top = a[3] + "px");
        var h = this;
        cp.registerGestureEvent(f, cp.GESTURE_EVENT_TYPES.TAP, function(a) {
            if (!cp.disableInteractions) {
                var b = h.questionTextCanvasName + "_correctSequenceReview",
                    c = document.getElementById(b);
                c == void 0 && (c = cp.newElem("div"));
                cp.fixWebkitScaling(c);
                var d = "cp-reviewUL";
                cp.MSIE == cp.browser && (d = "cp-reviewULIE");
                for (var d = "<ul class='" + d + "' style='padding-left:20px;padding-right:20px'>", g = h.correctSequenceArr, r = 0; r < g.length; ++r) var k = cp.D[g[r]],
                    d = cp.responsive ? d + ("<li>" + cp.D[k.dn].rpvt[cp.ResponsiveProjWidth].vt + "</li>") : d + ("<li>" + k.atxt + "</li>");
                d = d + "</ul>" + ("<img id='sequenceReviewCloseButton' src='" + cp.movie.im.m_projectImages["assets/htmlimages/closeReviewButton.png"].nativeImage.src + "' style='right:6px;top:6px;position:absolute'>");
                c.id = b;
                c.className = "sequenceReviewArea";
                c.style.position = "absolute";
                c.style.left = parseFloat(f.style.left) + parseFloat(f.width) + 10 + "px";
                c.style.top = parseFloat(f.style.top) + "px";
                c.innerHTML = d;
                c.style.zIndex = 1E3;
                a.stopPropagation && a.stopPropagation();
                h.showReviewArea(c)
            }
        });
        d.parentNode.appendChild(f);
        f.style.zIndex = 1E3
    }
};
cp.SequenceQuestion.prototype.showReviewArea = function(b) {
    var c = document.getElementById(this.getAssociatedObjName());
    c.parentNode.appendChild(b);
    var a = cp.movie.stage.getSlideDiv(),
        d = a.onclick;
    a.style.cursor = "pointer";
    cp.registerGestureEvent(a, cp.GESTURE_EVENT_TYPES.TAP, function(f) {
        cp.disableInteractions || (c.parentNode.removeChild(b), a.style.cursor = "default", cp.registerGestureEvent(a, cp.GESTURE_EVENT_TYPES.TAP, d), cp.handleClick(f))
    });
    var g = document.getElementById("sequenceReviewCloseButton");
    cp.registerGestureEvent(g,
        cp.GESTURE_EVENT_TYPES.TAP,
        function() {
            cp.disableInteractions || (c.parentNode.removeChild(b), a.style.cursor = "default", cp.registerGestureEvent(a, cp.GESTURE_EVENT_TYPES.TAP, d))
        })
};