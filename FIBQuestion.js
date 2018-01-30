cp.FIBAnswer = function(a, d) {
    cp.FIBAnswer.baseConstructor.call(this, a, d);
    var c = this.getAttribute("b");
    this.bounds = {
        minX: c[0],
        minY: c[1],
        maxX: c[2],
        maxY: c[3]
    };
    c = this.getAttribute("vb");
    this.vbounds = {
        minX: c[0],
        minY: c[1],
        maxX: c[2],
        maxY: c[3]
    };
    this.args = d;
    c = this.getAttribute("capN");
    c = cp.D[cp.D[c].mdi];
    this.sh = c.sh;
    this.aid = this.getAttribute("aid");
    cp.responsive && c && (this.answerAreaItemName = c.aan, this.responsiveCSS = c.css)
};
cp.inherits(cp.FIBAnswer, cp.Answer);
cp.updateSelectElement = function(a, d) {
    if (cp.responsive && a) {
        var c = cp.D[d];
        if (c && c[a.id]) {
            for (var f = c[a.id].answerObjects, e = 0; e < f.length; ++e) {
                var g = f[e].text,
                    b = document.createElement("option");
                b.value = g;
                b.text = g;
                b.style.wordWrap = "break-word";
                b.style.whiteSpace = "pre-wrap";
                a.appendChild(b)
            }
            c.setNewIndex ? c.setNewIndex(c[a.id].idx) : a.selectedIndex = -1
        }
    }
};
cp.FIBAnswer.prototype.getResponsiveLabelCombo = function(a, d) {
    this.answerObjects = a.getAnswerObjects(this.element.id);
    var c = cp.D[d.capN],
        f = d.capN + this.aid;
    c[f] || (c[f] = {});
    c[f].answerObjects = this.answerObjects;
    c[f].idx = -1;
    var e = document.getElementById(f);
    e.name = this.group;
    cp.updateSelectElement(e, d.capN);
    e.style.zIndex = 1E3;
    var g = {},
        b = this;
    e.onchange = function() {
        var a = document.getElementById(f);
        b.element.oHandler.setIndex(a.selectedIndex)
    };
    g.getControlBoundingClientRect = function() {
        var b = document.getElementById(f);
        if (b) return b.getBoundingClientRect()
    };
    g.setNewIndex = function(a) {
        var d = document.getElementById(f); - 1 != a ? (b.answerObj = b.answerObjects[a], d && (d.selectedIndex = a)) : (cp.verbose && cp.log("Inside setNewIndex : " + a), b.answerObj = void 0, d && (d.selectedIndex = -1, d.value = "", d.text = ""));
        c[f].idx = a
    };
    c.setNewIndex = e.setNewIndex;
    this.sh && (e = this.sh.a, cp.applyShadow(this.element.parentElement, this.sh.d * Math.cos(Math.PI * e / 180) + "px " + this.sh.d * Math.sin(Math.PI * e / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c,
        1) + (this.sh.i ? " inset" : "")));
    g.resetIndex = function() {
        b.element.oHandler.setIndex(-1)
    };
    g.setIndex = function(a) {
        b.element.oHandler.setNewIndex(a)
    };
    g.getIndex = function() {
        var b = document.getElementById(f);
        return !b ? -1 : b.selectedIndex
    };
    g.disable = function() {
        var b = document.getElementById(f);
        if (b) b.disabled = "disabled"
    };
    g.getWidth = function() {
        var b = document.getElementById(f);
        return !b ? 0 : parseFloat(b.style.width)
    };
    g.getText = function() {
        var a = b.element.oHandler.getIndex();
        return a == -1 ? "" : b.answerObjects[a].text
    };
    g.setText = function(a) {
        if (a == "") b.element.oHandler.setIndex(-1);
        else {
            for (var c = -1, d = 0; d < b.answerObjects.length; ++d)
                if (b.answerObjects[d].text == a) {
                    c = d;
                    break
                }
            b.element.oHandler.setIndex(c)
        }
    };
    return g
};
cp.FIBAnswer.prototype.getResponsiveTextInputField = function(a, d) {
    var c = {},
        f = d.capN + this.aid,
        e = document.getElementById(f),
        g = this;
    this.showScroll && (e.style.resize = "none");
    void 0 != this.showBorder && !this.showBorder ? e.style.border = "0px" : (e.style.border = "1px solid", e.style.borderTopColor = "#696969", e.style.borderLeftColor = "#696969", e.style.borderRightColor = "#E6E6E6", e.style.borderBottomColor = "#E6E6E6");
    e.style.borderRadius = "0px";
    e.style.padding = "0px";
    if (this.sh) {
        var b = this.sh.a;
        cp.applyShadow(e, this.sh.d *
            Math.cos(Math.PI * b / 180) + "px " + this.sh.d * Math.sin(Math.PI * b / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, 1) + (this.sh.i ? " inset" : ""))
    }
    c.getControlBoundingClientRect = function() {
        return document.getElementById(f).getBoundingClientRect()
    };
    c.resetText = function() {
        var b = document.getElementById(f);
        if (b) b.value = ""
    };
    c.setText = function(b) {
        var a = document.getElementById(f);
        if (a) a.value = b
    };
    c.getText = function() {
        var b = document.getElementById(f);
        return b ? b.value : ""
    };
    c.disable = function() {
        g.enabled = false;
        var b = document.getElementById(f);
        b && b.setAttribute("readonly", "readonly")
    };
    c.getWidth = function() {
        var b = document.getElementById(f);
        return b ? parseFloat(b.style.width) : 0
    };
    return c
};
cp.FIBAnswer.prototype.getMaxCorrectAnswerWidth = function() {
    if (!this.correctAnswersList || !this.correctAnswersList.length) return 0;
    for (var a = 0, d = 0; d < this.correctAnswersList.length; ++d) a < this.correctAnswersList[d].length && (a = this.correctAnswersList[d].length);
    d = document.createElement("input");
    d.id = "DummyInputField";
    d.type = "text";
    d.size = a;
    d.display = "none";
    document.body.appendChild(d);
    a = d.clientWidth;
    document.body.removeChild(d);
    return a
};
cp.FIBAnswer.prototype.linkedItemDrawingCompleteHandler = function(a) {
    if (cp.responsive && this.drawForResponsive && this.answerAreaItemName) {
        var d = cp.D[this.answerAreaItemName];
        if (d && (d = cp.D[d.mdi], a.cpData && a.cpData.uid && a.cpData.uid == d.uid && (cp.verbose && cp.log("drawing " + this.element.id + ", for " + a.cpData.uid), a = this.getAttribute("capN"), a = cp.D[a]))) a = cp.getDisplayObjByKey(a.mdi), a.drawForResponsive && a.drawForResponsive(!0, cp.ReasonForDrawing.kLinkedToItemAppeared)
    }
};
cp.FIBAnswer.prototype.drawForResponsive = function(a) {
    if (this.m_questionObj && this.m_questionObj.getIsStarted()) {
        if (!this.responsiveCSS) return !1;
        if (this.isDrawn && !a) return !0;
        var d = cp.getResponsiveCSS(this.responsiveCSS);
        cp.getCSSFromLayouter(d, this);
        var c = !1,
            c = this.re || this.sh && !this.sh.i,
            f = void 0 != this.tr;
        if (this.currentCSS == d && !c && !f && !a) return !0;
        this.currentCSS = d;
        a = this.element.id;
        this.enabled = !0;
        if (cp.movie.playbackController && (d = cp.movie.playbackController.GetQuizController())) {
            d.GetIsInReviewMode();
            var e = this.m_questionObj.shouldDisableOptions();
            cp.movie.stage.getSlideDiv();
            this.group = this.m_questionObj.getAnswerGroupName();
            d = cp.D[a];
            this.isComboBox = d.sac;
            this.isCaseSensitive = d.cs;
            this.correctAnswersList = d.correctAnswers;
            this.m_questionObj.setCaptionName(d.capN);
            this.zIndex = cp.D[d.capN].zIndex;
            var g = cp.movie.stage.getSlideDiv();
            if (!this.isDrawn) {
                var b = this;
                this.selectedText = this.m_questionObj.getSelectedText(this.element.id);
                this.isComboBox ? (cp.verbose && cp.log("Draw Combo Box"), this.element.oHandler =
                    this.getResponsiveLabelCombo(this.m_questionObj, d)) : (cp.verbose && cp.log("Draw Text Field"), this.element.oHandler = this.getResponsiveTextInputField(this.m_questionObj, d));
                d.oHandler = this.element.oHandler;
                this.element.oHandler.setText(this.selectedText);
                this.element.clearAnswer = function() {
                    b.selectedText = "";
                    b.isDrawn && b.element.oHandler.setText("")
                };
                this.element.removeOpenReviewAreas = function() {
                    var a = document.getElementById(b.m_questionObj.getAssociatedObjName()),
                        c = document.getElementById(b.element.id +
                            "_correctfibReview");
                    c != void 0 && a.parentNode.removeChild(c)
                };
                this.element.adjustReviewIcon = function() {
                    var a = g.getBoundingClientRect(),
                        c = b.element.oHandler.getControlBoundingClientRect(),
                        d = c.left - a.left + "px",
                        c = c.bottom - a.top + 5 + "px";
                    if (b.reviewIconImage) {
                        b.reviewIconImage.style.left = d;
                        b.reviewIconImage.style.top = c
                    }
                    if (b.reviewButton) {
                        d = b.reviewIconImage.getBoundingClientRect();
                        b.reviewButton.style.left = d.right + 2 - a.left + "px";
                        b.reviewButton.style.top = d.top - a.top + "px"
                    }
                };
                var j = document.getElementById(b.m_questionObj.getAssociatedObjName());
                this.element.addReviewButton = function() {
                    var a = b.element,
                        c = b.element.id + "_reviewButton";
                    b.reviewButton = document.getElementById(c);
                    if (!b.reviewButton) b.reviewButton = cp.newElem("img");
                    b.reviewButton = b.reviewButton;
                    b.reviewButton.id = c;
                    cp.fixWebkitScaling(b.reviewButton);
                    b.reviewButton.className = "sequenceReviewImage";
                    b.reviewButton.style.position = "absolute";
                    var d;
                    d = document.getElementById(b.element.id + "_reviewIncorrect");
                    c = g.getBoundingClientRect();
                    b.element.oHandler.getControlBoundingClientRect();
                    d = d.getBoundingClientRect();
                    b.reviewButton.style.left = d.right + 2 - c.left + "px";
                    b.reviewButton.style.top = d.top - c.top + "px";
                    b.reviewButtonCH = function(c) {
                        var d = a.id + "_correctfibReview",
                            e = document.getElementById(d);
                        e == void 0 && (e = cp.newElem("div"));
                        cp.fixWebkitScaling(e);
                        var f = "cp-reviewUL";
                        cp.MSIE == cp.browser && (f = "cp-reviewULIE");
                        for (var f = "<ul class='" + f + "' style='padding-left:20px;padding-right:20px'>", h = 0; h < b.correctAnswersList.length; ++h) f = f + ("<li>" + b.correctAnswersList[h] + "</li>");
                        f = f + "</ul>" + ("<img id='fibReviewCloseButton' src='" +
                            cp.movie.im.m_projectImages["assets/htmlimages/closeReviewButton.png"].nativeImage.src + "' style='right:6px;top:6px;position:absolute'>");
                        e.id = d;
                        e.className = "sequenceReviewArea";
                        e.style.position = "absolute";
                        d = g.getBoundingClientRect();
                        h = b.reviewButton.getBoundingClientRect();
                        e.style.left = h.right - d.left + "px";
                        e.style.top = h.top - d.top + "px";
                        e.innerHTML = f;
                        c.stopPropagation && c.stopPropagation();
                        b.m_questionObj.showReviewArea(e)
                    };
                    cp.registerGestureEvent(b.reviewButton, cp.GESTURE_EVENT_TYPES.TAP, b.reviewButtonCH);
                    j.parentNode.appendChild(b.reviewButton);
                    b.reviewButton.style.zIndex = 1E3
                };
                this.element.disableOption = function() {
                    e = true;
                    b.element.tabIndex = -1
                };
                this.lCorrectAnswersAreAlsoEmpty = !1;
                for (d = 0; d < this.correctAnswersList.length; ++d) c = this.correctAnswersList[d], c = c.replace(/^\s*|\s*$/g, ""), this.lCorrectAnswersAreAlsoEmpty = this.lCorrectAnswersAreAlsoEmpty || "" == c;
                this.element.isAttempted = function() {
                    if (b.isComboBox) return b.element.oHandler.getIndex() != -1;
                    var a = b.element.oHandler.getText(),
                        a = a.replace(/^\s*|\s*$/g,
                            "");
                    return a != "" || b.lCorrectAnswersAreAlsoEmpty
                };
                this.element.isCorrectlyAnswered = function() {
                    var a = "",
                        a = b.element.oHandler.getText(),
                        a = a.replace(/^\s*|\s*$/g, "");
                    if (a == "" && !b.lCorrectAnswersAreAlsoEmpty) return false;
                    for (var c = 0; c < b.correctAnswersList.length; ++c) {
                        var d = b.correctAnswersList[c],
                            d = d.replace(/^\s*|\s*$/g, "");
                        if (b.isCaseSensitive) {
                            if (d == a) return true
                        } else if (d.toLowerCase() == a.toLowerCase()) return true
                    }
                    return false
                };
                e && (this.element.style.cursor = "default", this.element.tabIndex = -1, this.element.oHandler.disable(),
                    this.m_questionObj.getWasJudged() && this.m_questionObj.canShowReviewIcons() && (this.m_questionObj.getAnsweredCorrectly() ? this.reviewIconImage || (this.reviewIconImage = cp.newElem("img"), this.reviewIconImage.id = a + "_reviewCorrect", this.reviewIconImage.src = cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src, this.reviewIconImage.tabIndex = -1, this.reviewIconImage.style.position = "absolute", this.element.parentNode.parentNode.appendChild(this.reviewIconImage), b.sh && (a = b.sh.a,
                        cp.applyShadow(this.reviewIconImage, b.sh.d * Math.cos(Math.PI * a / 180) + "px " + b.sh.d * Math.sin(Math.PI * a / 180) + "px " + b.sh.b + "px " + cp.ConvertRGBToRGBA(b.sh.c, b.sh.o) + (b.sh.i ? " inset" : "") + (b.sh.i ? " inset" : "")))) : (d = this.element.isAttempted() ? this.element.isCorrectlyAnswered() ? cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src : cp.movie.im.m_projectImages["assets/htmlimages/incorrect_answer_normal.png"].nativeImage.src : cp.movie.im.m_projectImages["assets/htmlimages/skip_answer_normal.png"].nativeImage.src,
                        this.reviewIconImage || (this.reviewIconImage = cp.newElem("img"), this.reviewIconImage.id = a + "_reviewIncorrect", this.reviewIconImage.src = d, this.reviewIconImage.tabIndex = -1, this.reviewIconImage.style.position = "absolute", j.parentNode.appendChild(this.reviewIconImage), this.reviewIconImage.onload = function() {
                            b.isCorrect || b.element.addReviewButton()
                        }, b.sh && (a = b.sh.a, cp.applyShadow(this.reviewIconImage, b.sh.d * Math.cos(Math.PI * a / 180) + "px " + b.sh.d * Math.sin(Math.PI * a / 180) + "px " + b.sh.b + "px " + cp.ConvertRGBToRGBA(b.sh.c,
                            b.sh.o) + (b.sh.i ? " inset" : "")))))));
                this.element.logicalAnswerObj = this;
                this.m_questionObj.registerFIBAnswer(this.element)
            }
            this.isDrawn = !0;
            this.visible || (this.element.style.visibility = "hidden");
            return !0
        }
    }
};
cp.FIBAnswer.prototype.addAndGetLabelCombo = function(a, d) {
    this.answerObjects = a.getAnswerObjects(this.element.id);
    document.getElementById(d.answerTextCanvasHolder);
    this.relatedCaptionData = cp.D[cp.D[d.capN].mdi];
    var c = d.b[0],
        f = d.b[1],
        e = d.b[2] - d.b[0] + 1,
        g = d.b[3] - d.b[1],
        b = cp.newElem("div");
    cp.fixWebkitScaling(b);
    b.id = this.element.id + "_labelDD";
    b.style.position = "absolute";
    b.style.left = "0px";
    b.style.top = "0px";
    b.style.width = e + "px";
    b.style.height = g + "px";
    this.element.style.left = "0px";
    this.element.style.top =
        "0px";
    this.element.style.width = "100%";
    this.element.style.height = "100%";
    this.element.style.display = "block";
    this.element.style.position = "absolute";
    this.element.style.zIndex = 10;
    this.element.appendChild(b);
    var j = a.defaultTitleImage,
        i = cp.movie.im;
    i && i.getImageDataURI(j, function(a) {
        j = a
    });
    if ("" == b.innerHTML) {
        var h;
        h = "" + ("<select class='mydds' id='" + this.element.id + "_fibLabel' name='" + this.group + "'>");
        for (var m = 0; m < this.answerObjects.length; ++m) {
            var n = this.answerObjects[m],
                r = n.text,
                p = n.ip;
            i && i.getImageDataURI(p,
                function(a) {
                    p = a
                });
            h += "<option value='" + r + "' style='word-wrap:break-word;white-space:pre-wrap;position:absolute;width:" + e + "px' title='" + p + "'>";
            h += r;
            h += "</option>"
        }
        document.getElementById(b.id).innerHTML = h + "</select> ";
        var l = document.getElementById(this.element.id + "_fibLabel");
        l.style.width = e + "px";
        l.style.height = g + "px";
        l.style.position = "absolute";
        l.style.zIndex = 1E3;
        if (cp.DESKTOP != cp.device) {
            var q;
            l.style.opacity = 0;
            var k = this;
            l.onchange = function() {
                k.element.oHandler.setIndex(l.selectedIndex)
            };
            b = "<img id='" +
                this.element.id + "_spanImage' src='" + j + "' title='" + j + "' style='position:absolute;top:2px; left:5px; width:" + (e - 10) + "px; height:" + g + "px;'/>";
            b += "<img id='" + this.element.id + "_spanImageArrow' class='spanArrow' style='position:absolute;left:" + (e - 20) + "px;top:3px'/>";
            i = cp.newElem("span");
            i.id = "spanComboBoxTitleImage";
            i.className = "spanComboBox";
            i.innerHTML = b;
            i.style.width = e + "px";
            i.style.height = g + 3 + "px";
            i.style.overflow = "none";
            this.answerLabelDivElem.appendChild(i);
            var o = document.getElementById(this.element.id +
                "_spanImage");
            l.setNewIndex = function(a) {
                -1 != a ? (k.answerObj = k.answerObjects[a], q = k.answerObj.ip, l.selectedIndex = a) : (cp.verbose && cp.log("Inside setNewIndex : " + a), k.answerObj = void 0, q = j, l.selectedIndex = -1, l.value = "", l.text = "");
                o.style.display = "none";
                o.src = q;
                o.onload = setTimeout(function() {
                    o.style.display = "block"
                }, 100)
            };
            this.answerLabelDivElem.style.position = "absolute";
            this.answerLabelDivElem.style.left = c + "px";
            this.answerLabelDivElem.style.top = f + "px";
            this.answerLabelDivElem.style.width = e + "px";
            this.answerLabelDivElem.style.height =
                g + "px";
            this.sh && (b = this.sh.a, cp.applyShadow(this.element.parentElement, this.sh.d * Math.cos(Math.PI * b / 180) + "px " + this.sh.d * Math.sin(Math.PI * b / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, 1) + (this.sh.i ? " inset" : "")));
            l.resetIndex = function() {
                k.element.oHandler.setIndex(-1)
            };
            l.setIndex = function(a) {
                k.element.oHandler.setNewIndex(a)
            };
            l.getIndex = function() {
                return k.element.oHandler.selectedIndex
            };
            l.disable = function() {
                k.element.oHandler.disabled = "disabled"
            };
            l.getWidth = function() {
                return parseFloat(k.element.oHandler.style.width)
            };
            h = l
        } else {
            parseFloat(l.style.left);
            parseFloat(l.style.top);
            l.style.position = "absolute";
            l.style.left = "10px";
            l.style.top = "0px";
            l.style.width = e + "px";
            l.style.height = g + "px";
            b = jQuery("#" + this.element.id + "_fibLabel");
            b.css("width", e);
            b.css("height", g);
            k = this;
            h = jQuery("#" + this.element.id + "_fibLabel").msDropDown({
                style: "position:fixed, z-index:1000;left:" + (c + 20) + "px, top:" + f + "px, height:" + g + "px",
                on: {
                    close: function() {
                        var a = k.element.oHandler.get("selectedIndex"); - 1 != a && (k.answerObj = k.answerObjects[a])
                    }
                }
            }, j).data("dd");
            h.set("width", e);
            h.set("height", g);
            h.set("overflow", !0);
            i = jQuery("#" + this.element.id + "_labelDD");
            this.sh && (b = this.sh.a, cp.applyShadow(i[0], this.sh.d * Math.cos(Math.PI * b / 180) + "px " + this.sh.d * Math.sin(Math.PI * b / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, 1) + (this.sh.i ? " inset" : "")));
            this.answerLabelDivElem.style.position = "absolute";
            this.answerLabelDivElem.style.left = c + "px";
            this.answerLabelDivElem.style.top = f + "px";
            this.answerLabelDivElem.style.width = e + "px";
            this.answerLabelDivElem.style.height =
                g + "px";
            var s = h.open;
            h.open = function(a) {
                k.element.parentElement.style.zIndex = 1E3;
                a.preventDefault();
                a.stopPropagation();
                s()
            };
            cp.addDCHDiv(this.answerLabelDivElem, function(a) {
                k.element.oHandler.open(a)
            });
            h.resetIndex = function() {
                k.element.oHandler.setIndex(-1)
            };
            h.setIndex = function(a) {
                k.element.oHandler.set("selectedIndex", a)
            };
            h.getIndex = function() {
                return k.element.oHandler.get("selectedIndex")
            };
            h.disable = function() {
                k.element.oHandler.set("disabled", true)
            };
            h.getWidth = function() {
                return k.element.oHandler.get("width")
            };
            l.onchange = function(a) {
                k.element.oHandler.setIndex(l.selectedIndex);
                a.preventDefault();
                return false
            }
        }
    }
    h.getText = function() {
        var a = k.element.oHandler.getIndex();
        return -1 == a ? "" : k.answerObjects[a].text
    };
    h.setText = function(a) {
        if ("" == a) k.element.oHandler.setIndex(-1);
        else {
            for (var b = -1, c = 0; c < k.answerObjects.length; ++c)
                if (k.answerObjects[c].text == a) {
                    b = c;
                    break
                }
            k.element.oHandler.setIndex(b)
        }
    };
    return h
};
cp.FIBAnswer.prototype.addAndGetTextInputField = function(a, d) {
    var c;
    c = "";
    this.font = this.getAttribute("font");
    if ("" == this.element.innerHTML) {
        this.font && (c = c + " -webkit-appearance:none;" + (" font-family:" + this.font.n + ";"), c += "font-size:" + this.font.s + "px;", c += "color: " + this.font.c + ";", this.font.B && (c += "font-weight:bold;"), this.font.u && (c += "text-decoration: underline;"), this.font.i && (c += "font-style: italic;"), this.showScroll && (c += "resize: none;"), c = void 0 != this.showBorder && !this.showBorder ? c + "border:0px;" :
            c + "border:1px solid;border-top-color:#696969;border-left-color:#696969;border-right-color:#E6E6E6;border-bottom-color:#E6E6E6;", c += "border-radius:0px;padding:0px;");
        var f = this.bounds.maxY - this.bounds.minY;
        cp.MSIE == cp.browser && (f += 1);
        void 0 == this.accstring && (this.accstring = "Fill in the Blank");
        this.element.innerHTML += "<input type='text'" + (this.enabled ? "" : " readonly='readonly'") + " aria-label='" + this.accstring + "' id='" + this.element.id + "_inputField' style='left:0px; top:0px; width:" + (this.bounds.maxX -
            this.bounds.minX - 2) + "px; height:" + f + "px;position:absolute;" + c + "'></input>"
    }
    this.inputField = document.getElementById(this.element.id + "_inputField");
    this.sh && (c = this.sh.a, cp.applyShadow(this.inputField, this.sh.d * Math.cos(Math.PI * c / 180) + "px " + this.sh.d * Math.sin(Math.PI * c / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, 1) + (this.sh.i ? " inset" : "")));
    var e = this;
    this.inputField.resetText = function() {
        e.element.oHandler.value = ""
    };
    this.inputField.setText = function(a) {
        e.element.oHandler.value = a
    };
    this.inputField.getText =
        function() {
            return e.element.oHandler.value
        };
    this.inputField.disable = function() {
        e.enabled = false;
        e.element.oHandler.setAttribute("readonly", "readonly")
    };
    this.inputField.getWidth = function() {
        return parseFloat(e.element.oHandler.style.width)
    };
    c = this.inputField;
    var f = d.b[0],
        g = d.b[1],
        b = d.b[2] - d.b[0],
        j = d.b[3] - d.b[1];
    this.answerLabelDivElem.style.position = "absolute";
    this.answerLabelDivElem.style.left = f + "px";
    this.answerLabelDivElem.style.top = g + "px";
    this.answerLabelDivElem.style.width = b + "px";
    this.answerLabelDivElem.style.height =
        j + "px";
    return c
};
cp.FIBAnswer.prototype.addIfNeeded = function(a) {
    if (!cp.responsive || !this.drawForResponsive(a))
        if ((a = cp.getQuestionObject(this.relatedQuestionSlide)) && !this.isDrawn && a.getIsStarted()) {
            var d = this.element.id;
            this.enabled = !0;
            if (cp.movie.playbackController) {
                var c = cp.movie.playbackController.GetQuizController();
                if (c) {
                    c.GetIsInReviewMode();
                    var f = a.shouldDisableOptions();
                    cp.movie.stage.getSlideDiv();
                    this.group = a.getAnswerGroupName();
                    c = cp.D[d];
                    this.isComboBox = c.sac;
                    this.isCaseSensitive = c.cs;
                    this.correctAnswersList =
                        c.correctAnswers;
                    var e, g;
                    this.zIndex = cp.D[c.capN].zIndex;
                    e = cp.newElem("div");
                    cp.fixWebkitScaling(e);
                    cp.addRewrapObjectAsPerRestOfProjectItem(e);
                    e.id = d + "canvasHolder";
                    c.answerTextCanvasHolder = e.id;
                    e.setAttribute("class", "cp-rewrap");
                    e.style.zIndex = this.zIndex;
                    this.answerLabelDivElem = document.getElementById(c.dn);
                    this.selectedText = a.getSelectedText(this.element.id);
                    this.isComboBox ? (cp.verbose && cp.log("Draw Combo Box"), this.element.oHandler = this.addAndGetLabelCombo(a, c)) : (cp.verbose && cp.log("Draw Text Field"),
                        this.element.oHandler = this.addAndGetTextInputField(a, c));
                    c.oHandler = this.element.oHandler;
                    this.element.oHandler.setText(this.selectedText);
                    var b = this;
                    this.questionObj = a;
                    this.element.clearAnswer = function() {
                        b.selectedText = "";
                        b.isDrawn && b.element.oHandler.setText("")
                    };
                    this.element.removeOpenReviewAreas = function() {
                        var a = document.getElementById(b.questionObj.getAssociatedObjName()),
                            c = document.getElementById(b.element.id + "_correctfibReview");
                        c != void 0 && a.parentNode.removeChild(c)
                    };
                    this.element.addReviewButton =
                        function() {
                            var a = document.getElementById(b.questionObj.getAssociatedObjName()),
                                c = b.element,
                                d = b.element.id + "_reviewButton",
                                e = document.getElementById(d);
                            e || (e = cp.newElem("img"));
                            e.id = d;
                            cp.fixWebkitScaling(e);
                            e.className = "sequenceReviewImage";
                            e.style.position = "absolute";
                            d = document.getElementById(b.element.id + "_reviewIncorrect");
                            e.style.left = parseFloat(d.style.left) + d.clientWidth + 2 + "px";
                            e.style.top = d.style.top;
                            cp.registerGestureEvent(e, cp.GESTURE_EVENT_TYPES.TAP, function(a) {
                                var d = c.id + "_correctfibReview",
                                    e = document.getElementById(d);
                                e == void 0 && (e = cp.newElem("div"));
                                cp.fixWebkitScaling(e);
                                var f = "cp-reviewUL";
                                cp.MSIE == cp.browser && (f = "cp-reviewULIE");
                                for (var f = "<ul class='" + f + "' style='padding-left:20px;padding-right:20px'>", g = 0; g < b.correctAnswersList.length; ++g) f = f + ("<li>" + b.correctAnswersList[g] + "</li>");
                                f = f + "</ul>" + ("<img id='fibReviewCloseButton' src='" + cp.movie.im.m_projectImages["assets/htmlimages/closeReviewButton.png"].nativeImage.src + "' style='right:6px;top:6px;position:absolute'>");
                                e.id = d;
                                e.className = "sequenceReviewArea";
                                e.style.position = "absolute";
                                d = document.getElementById(c.id + "_reviewButton");
                                e.style.left = parseFloat(d.style.left) + parseFloat(d.width) + 10 + "px";
                                e.style.top = parseFloat(d.style.top) + "px";
                                e.innerHTML = f;
                                a.stopPropagation && a.stopPropagation();
                                b.questionObj.showReviewArea(e)
                            });
                            a.parentNode.appendChild(e);
                            e.style.zIndex = 1E3
                        };
                    this.element.disableOption = function() {
                        f = true;
                        b.element.tabIndex = -1
                    };
                    this.lCorrectAnswersAreAlsoEmpty = !1;
                    for (c = 0; c < this.correctAnswersList.length; ++c) e =
                        this.correctAnswersList[c], e = e.replace(/^\s*|\s*$/g, ""), this.lCorrectAnswersAreAlsoEmpty = this.lCorrectAnswersAreAlsoEmpty || "" == e;
                    this.element.isAttempted = function() {
                        if (b.isComboBox) return b.element.oHandler.getIndex() != -1;
                        var a = b.element.oHandler.getText(),
                            a = a.replace(/^\s*|\s*$/g, "");
                        return a != "" || b.lCorrectAnswersAreAlsoEmpty
                    };
                    this.element.isCorrectlyAnswered = function() {
                        var a = "",
                            a = b.element.oHandler.getText(),
                            a = a.replace(/^\s*|\s*$/g, "");
                        if (a == "" && !b.lCorrectAnswersAreAlsoEmpty) return false;
                        for (var c =
                                0; c < b.correctAnswersList.length; ++c) {
                            var d = b.correctAnswersList[c],
                                d = d.replace(/^\s*|\s*$/g, "");
                            if (b.isCaseSensitive) {
                                if (d == a) return true
                            } else if (d.toLowerCase() == a.toLowerCase()) return true
                        }
                        return false
                    };
                    e = this.bounds.minX + "px";
                    g = this.bounds.maxY + 5 + "px";
                    if (f && (this.element.style.cursor = "default", this.element.tabIndex = -1, this.element.oHandler.disable(), a.getWasJudged() && a.canShowReviewIcons()))
                        if (a.getAnsweredCorrectly()) c = cp.newElem("img"), c.id = d + "_reviewCorrect", c.src = cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src,
                            c.tabIndex = -1, c.style.position = "absolute", c.style.left = e, c.style.top = g, this.element.parentNode.parentNode.appendChild(c), b.sh && (d = b.sh.a, cp.applyShadow(c, b.sh.d * Math.cos(Math.PI * d / 180) + "px " + b.sh.d * Math.sin(Math.PI * d / 180) + "px " + b.sh.b + "px " + cp.ConvertRGBToRGBA(b.sh.c, b.sh.o) + (b.sh.i ? " inset" : "") + (b.sh.i ? " inset" : "")));
                        else {
                            var j;
                            j = this.element.isAttempted() ? this.element.isCorrectlyAnswered() ? cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src : cp.movie.im.m_projectImages["assets/htmlimages/incorrect_answer_normal.png"].nativeImage.src :
                                cp.movie.im.m_projectImages["assets/htmlimages/skip_answer_normal.png"].nativeImage.src;
                            c = cp.newElem("img");
                            c.id = d + "_reviewIncorrect";
                            c.src = j;
                            c.tabIndex = -1;
                            c.style.position = "absolute";
                            c.style.left = e;
                            c.style.top = g;
                            this.element.parentNode.parentNode.appendChild(c);
                            c.onload = function() {
                                b.isCorrect || b.element.addReviewButton()
                            };
                            b.sh && (d = b.sh.a, cp.applyShadow(c, b.sh.d * Math.cos(Math.PI * d / 180) + "px " + b.sh.d * Math.sin(Math.PI * d / 180) + "px " + b.sh.b + "px " + cp.ConvertRGBToRGBA(b.sh.c, b.sh.o) + (b.sh.i ? " inset" : "")))
                        }
                    this.isDrawn = !0;
                    a.registerFIBAnswer(this.element);
                    this.visible || (this.element.style.visibility = "hidden")
                }
            }
        }
};
cp.FIBQuestion = function(a, d) {
    cp.FIBQuestion.baseConstructor.call(this, a, d);
    this.captionName = void 0;
    this.answerOptions = this.getAnswerOptions();
    this.answerOptionToAnswersMap = this.createAnswerOptionToAnswersMap();
    this.defaultTitleImage = this.questionData.defaultTitleImage
};
cp.inherits(cp.FIBQuestion, cp.Question);
cp.FIBQuestion.prototype.setCaptionName = function(a) {
    this.captionName = a
};
cp.FIBQuestion.prototype.resetQuestionData = function() {
    cp.FIBQuestion.superClass.resetQuestionData.call(this);
    if (!this.m_quizController.GetGoToQuizScopeActionExecuted()) {
        this.m_selectedAnswersArr = [];
        for (var a in this.answerOptionToAnswersMap) {
            var d = this.answerOptionToAnswersMap[a];
            d.selectedAns && (d.selectedAns = "")
        }
    }
};
cp.FIBQuestion.prototype.createAnswerOptionToAnswersMap = function() {
    for (var a = {}, d = 0; d < this.answerOptions.length; ++d) {
        var c = this.answerOptions[d],
            f = cp.D[c],
            e = f.correctAnswers,
            g = {
                answers: []
            };
        if (f.sac) {
            g.sac = !0;
            for (var b = f.allAnswers, f = f.allImageClassNames, j = 0; j < b.length; ++j) {
                var i = {};
                i.text = b[j];
                i.ip = f[j];
                i.ic = !1;
                for (var h = 0; h < e.length; ++h)
                    if (b[j] == e[h]) {
                        i.ic = !0;
                        break
                    }
                g.answers[j] = i
            }
        } else {
            g.sac = !1;
            for (h = 0; h < e.length; ++h) i = {}, i.text = e[h], i.ic = !0, g.answers[h] = i
        }
        a[c] = g
    }
    return a
};
cp.FIBQuestion.prototype.startQuestion = function() {
    if (this.m_quizController && (this.m_quizController.GetIsInReviewMode(), this.shuffleAnswers(), this.answerOptionsDrawn = !1, cp.FIBQuestion.superClass.startQuestion.call(this), cp.responsive)) {
        var a = this;
        cp.em.addEventListener(function(d) {
            a.notifyResponsiveItemChange.call(a, d);
            a.m_answersDisabled && a.disableAllOptions()
        }, cp.INPUTCONTROLREPLACEDEVENT)
    }
};
cp.FIBQuestion.prototype.showReviewArea = function(a) {
    for (var d in this.answerOptionToAnswersMap) {
        var c = this.answerOptionToAnswersMap[d];
        c && c.elem.removeOpenReviewAreas()
    }
    var f = document.getElementById(this.getAssociatedObjName());
    f.parentNode.appendChild(a);
    var e = cp.movie.stage.getSlideDiv(),
        g = e.onclick;
    e.style.cursor = "pointer";
    cp.registerGestureEvent(e, cp.GESTURE_EVENT_TYPES.TAP, function(b) {
        cp.disableInteractions || (f.parentNode.removeChild(a), e.style.cursor = "default", cp.registerGestureEvent(e, cp.GESTURE_EVENT_TYPES.TAP,
            g), cp.handleClick(b))
    });
    d = document.getElementById("fibReviewCloseButton");
    cp.registerGestureEvent(d, cp.GESTURE_EVENT_TYPES.TAP, function() {
        cp.disableInteractions || (f.parentNode.removeChild(a), e.style.cursor = "default", cp.registerGestureEvent(e, cp.GESTURE_EVENT_TYPES.TAP, g))
    })
};
cp.FIBQuestion.prototype.shuffleAnswers = function() {
    var a = !this.m_quizController.GetIsAttemptFinished() && this.getWasJudged() && !this.m_quizController.GetIsSubmitAll(),
        d = this.getIsPretest() && this.m_quizController.GetIsPretestQuestionsDisabled();
    if (!((a || this.m_quizController.GetIsInReviewMode() || d) && 0 < this.answerOptions.length)) {
        a = this.answerOptions.length;
        for (d = 0; d < a; ++d) {
            var c = this.answerOptions[d],
                f = cp.D[c];
            if (f.sac && f.ish && !0 != f.isShuffled) {
                var e = this.answerOptionToAnswersMap[c].answers,
                    g, b = e.length,
                    j, i = [];
                for (g = 0; g < b; ++g) i[g] = e[g];
                for (g = b; 1 < g; g--) e = Math.floor(Math.random() * g), e != g && (j = i[e], i[e] = i[g - 1], i[g - 1] = j);
                for (g = 0; g < b; ++g) this.answerOptionToAnswersMap[c].answers[g] = i[g];
                f.isShuffled = !0
            }
        }
    }
};
cp.FIBQuestion.prototype.getSelectedText = function(a) {
    a = this.answerOptionToAnswersMap[a];
    return void 0 == a.selectedAns ? "" : a.selectedAns
};
cp.FIBQuestion.prototype.getAnswerObjects = function(a) {
    return this.answerOptionToAnswersMap[a].answers
};
cp.FIBQuestion.prototype.registerFIBAnswer = function(a) {
    this.answerOptionToAnswersMap[a.id].elem = a;
    var a = !0,
        d;
    for (d in this.answerOptionToAnswersMap) var c = this.answerOptionToAnswersMap[d],
        a = a && void 0 != c.elem;
    this.answerOptionsDrawn = a
};
cp.FIBQuestion.prototype.clearAnswers = function() {
    this.verbose && cp.log("Inside Clear Answers");
    var a = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest(),
        a = (a = !1 == this.getWasJudged() || a && !1 == this.m_quizController.m_submittedAllQuestions) && !this.m_quizController.GetIsInReviewMode();
    if (!1 != a) {
        this.m_selectedAnswersArr = [];
        this.verbose && cp.log("Not Attempted. Hence Clearing");
        for (var d in this.answerOptionToAnswersMap)
            if (a = this.answerOptionToAnswersMap[d])(a = a.elem) && a.clearAnswer()
    }
};
cp.FIBQuestion.prototype.disableAllOptions = function() {
    if (this.m_quizController) {
        var a = !0;
        this.m_quizController.GetIsSubmitAll() && !this.getIsPretest() && (!this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions) && (a = !1);
        if (a) {
            for (var d in this.answerOptionToAnswersMap)
                if (a = this.answerOptionToAnswersMap[d].elem) a.disableOption(), !0 == this.answerOptionsDrawn && a.oHandler.disable();
            this.m_answersDisabled = !0
        }
    }
};
cp.FIBQuestion.prototype.notifyResponsiveItemChange = function(a) {
    if (cp.responsive && (a && a.cpData) && a.cpData.captionName == this.captionName)
        if ("updateResponsiveVarText:textadjust" != a.cpData.reason) {
            var d = [],
                c = [],
                f;
            for (f in this.answerOptionToAnswersMap) {
                var e = this.answerOptionToAnswersMap[f],
                    g = e.elem;
                if (g && g.oHandler) {
                    var b = g.logicalAnswerObj;
                    b.isComboBox ? (e = g.oHandler.getIndex, b = b.getResponsiveLabelCombo) : (e = g.oHandler.getText, b = b.getResponsiveTextInputField);
                    d[f] = e();
                    c[f] = b
                }
            }
            a.cpData.callbackFn && a.cpData.callbackFn();
            for (var j in this.answerOptionToAnswersMap)
                if (e = this.answerOptionToAnswersMap[j], (g = e.elem) && g.oHandler) b = e.elem.logicalAnswerObj, e.elem.oHandler = c[j].call(b, this, cp.D[b.element.id]), (b.isComboBox ? b.element.oHandler.setIndex : b.element.oHandler.setText)(d[j])
        } else
            for (j in this.answerOptionToAnswersMap) e = this.answerOptionToAnswersMap[j], (g = e.elem) && g.adjustReviewIcon()
};
cp.FIBQuestion.prototype.checkIfAttempted = function() {
    for (var a in this.answerOptionToAnswersMap) {
        var d = this.answerOptionToAnswersMap[a].elem;
        if (d && d.isAttempted()) return !0
    }
    return !1
};
cp.FIBQuestion.prototype.checkIfCorrect = function() {
    var a = !0,
        d;
    for (d in this.answerOptionToAnswersMap) {
        var c = this.answerOptionToAnswersMap[d].elem,
            a = a && c && c.isCorrectlyAnswered();
        if (!a) return !1
    }
    return a
};
cp.FIBQuestion.prototype.checkAndSetQuestionStatus = function() {
    var a = this.QuestionStatusEnum.INCOMPLETE,
        a = !1;
    a = this.getIsSurvey() ? this.checkIfAttempted() ? this.QuestionStatusEnum.CORRECT : this.QuestionStatusEnum.INCOMPLETE : this.checkIfAttempted() ? (a = this.checkIfCorrect()) ? this.QuestionStatusEnum.CORRECT : this.QuestionStatusEnum.INCORRECT : this.QuestionStatusEnum.INCOMPLETE;
    this.setQuestionStatus(a)
};
cp.FIBQuestion.prototype.getAnswerScores = function() {
    var a = [],
        d;
    for (d in this.answerOptionToAnswersMap) {
        var c = this.answerOptionToAnswersMap[d];
        if (void 0 != c) {
            var f = cp.D[d],
                e = new cp.AnswerScore;
            e.m_answerID = f.aid.toString();
            e.m_correctAnswer = 0 < f.correctAnswers.length ? cp.cpJoin(f.correctAnswers, ";") : "";
            e.m_chosenAnswer = c.elem.oHandler.getText();
            a.push(e)
        }
    }
    return a
};
cp.FIBQuestion.prototype.setQuestionSpecificScoreProperties = function(a) {
    void 0 != a && (a.m_answerOrderArrayAsString = this.m_answerOrderArray)
};
cp.FIBQuestion.prototype.restoreFromQuestionSpecificScoreProperties = function(a) {
    void 0 != a && (a = a.m_answerOrderArrayAsString, void 0 == a || "" == a || this.setAnswerOrder(a))
};
cp.FIBQuestion.prototype.setAnswerOrder = function(a) {
    if (a && !(0 >= a.length)) {
        for (var d = a.split(";"), c = this.answerOptions.length, f = 0; f < c; ++f) {
            var e = this.answerOptions[f],
                g = this.answerOptionToAnswersMap[e];
            if (g.sac) {
                for (var b = d[f].split(":"), g = g.answers, j = [], i = 0; i < b.length; ++i)
                    for (var h = unescape(b[i]), m = 0; m < g.length; ++m) {
                        var n = g[m];
                        n.text == h && j.push(n)
                    }
                this.answerOptionToAnswersMap[e].answers = j.splice(0)
            }
        }
        this.m_answerOrderArray = a
    }
};
cp.FIBQuestion.prototype.resumeSelectedAnswers = function(a) {
    if (!(0 >= a.length)) {
        this.m_selectedAnswersArr = [];
        for (var d = 0; d < a.length; ++d) {
            var c = unescape(a[d].m_chosenAnswer),
                f = this.answerOptionToAnswersMap[this.answerOptions[d]];
            this.m_selectedAnswersArr[d] = c;
            f.selectedAns = c
        }
    }
};
cp.FIBQuestion.prototype.setSelectedAnswers = function() {
    this.m_selectedAnswersArr = [];
    for (var a = this.answerOptions.length, d = 0; d < a; ++d) {
        var c = this.answerOptionToAnswersMap[this.answerOptions[d]],
            f = c.elem;
        f && f.oHandler && (f = f.oHandler.getText(), this.m_selectedAnswersArr[d] = f, c.selectedAns = f)
    }
};
cp.FIBQuestion.prototype.getChosenAnswerAsString = function() {
    return cp.FIBQuestion.superClass.getChosenAnswerAsString.call(this)
};
cp.FIBQuestion.prototype.getCorrectAnswerAsString = function() {
    for (var a = "", d = this.answerOptions.length, c = 0; c < d; ++c) var f = cp.D[this.answerOptions[c]],
        a = 0 == c ? a + cp.cpJoin(f.correctAnswers, ":") : a + (";" + cp.cpJoin(f.correctAnswers, ":"));
    return a
};
cp.FIBQuestion.prototype.getChosenAnswerAsStringForReview = function() {
    return this.getChosenAnswerAsString()
};
cp.FIBQuestion.prototype.getCorrectAnswerAsStringForReview = function() {
    return this.getCorrectAnswerAsString()
};
cp.FIBQuestion.prototype.getAnswerTexts = function() {
    return ""
};
cp.FIBQuestion.prototype.saveAnswerOrder = function() {
    var a = "",
        d;
    for (d in this.answerOptionToAnswersMap) {
        var c = this.answerOptionToAnswersMap[d];
        if (void 0 != c) {
            if (c.sac)
                for (var a = a + c.answers[0].text, f = 1; f < c.answers.length; ++f) a += ":" + escape(c.answers[f].text);
            else a += "";
            a += ";"
        }
    }
    this.m_answerOrderArray = a = a.substr(0, a.length - 1);
    this.setSelectedAnswers()
};