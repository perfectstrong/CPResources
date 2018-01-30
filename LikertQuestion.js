cp.LikertItem = function(a, b) {
    cp.LikertItem.baseConstructor.call(this, a);
    this.visible = this.getAttribute("visible");
    this.answerID = this.getAttribute("aid");
    this.relatedQuestionSlide = this.getAttribute("rqs");
    this.canvasDivName = this.getAttribute("cn");
    this.value = "enabled";
    this.checked = !1;
    this.sh = this.getAttribute("sh");
    this.args = b;
    this.isDrawn = !1
};
cp.inherits(cp.LikertItem, cp.DisplayObject);
cp.LikertItem.prototype.start = function(a) {
    this.addIfNeeded();
    if (!this.effectIsStarted || a) this.updateEffects(this.hasEffect), this.effectIsStarted = !0
};
cp.LikertItem.prototype.reset = function() {
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
cp.LikertItem.prototype.loadAndDrawImage = function(a, b) {
    null == this.loadedBtnImages && (this.loadedBtnImages = {});
    var e = cp.movie.im.m_projectImages[a].nativeImage;
    this.loadedBtnImages[a] = e;
    var c = this.radioCanvasElements[b],
        d = c.gc;
    cp.clearCanvasProperly(c);
    this.applyShadowOnChild(c);
    d.drawImage(this.loadedBtnImages[a], this.bounds.minX, this.bounds.minY);
    e && (e.alt = " ")
};
cp.LikertItem.prototype.clearAnswers = function() {
    if (this.lQuestionObj) {
        for (var a = 0; a < this.radioElements.length; ++a) this.loadAndDrawImage(this.lQuestionObj.getImageForState(this.type, "default"), a), this.radioElements[a] && (this.radioElements[a].checked = !1);
        this.checked = !1
    }
};
cp.LikertItem.prototype.isAnswered = function() {
    return this.checked
};
cp.LikertItem.prototype.disableOptions = function() {
    if (this.lQuestionObj && "disabled" != this.value) {
        this.value = "disabled";
        for (var a = 0; a < this.radioElements.length; ++a) this.radioElements[a].disabled = "disabled", this.radioElements[a].style.cursor = "default", this.radioElements[a].checked ? this.loadAndDrawImage(this.lQuestionObj.getImageForState(this.type, "selectedDisabled"), a) : this.loadAndDrawImage(this.lQuestionObj.getImageForState(this.type, "disabled"), a)
    }
};
cp.LikertItem.prototype.getItemText = function() {
    return !this.answerTextCanvasDivData ? "" : this.answerTextCanvasDivData.accstr
};
cp.LikertItem.prototype.getAnswerText = function() {
    if (!this.lQuestionObj) return "";
    for (var a = 0; a < this.radioElements.length; ++a)
        if (this.radioElements[a].checked) return this.lQuestionObj.getRatingScaleValue(a);
    return ""
};
cp.LikertItem.prototype.checkRadioButtonAtIndex = function(a, b) {
    if (!(void 0 == a || 0 > a)) {
        var e = this.radioElements[a];
        if (!e.disabled || !b)
            for (var c = document.getElementsByName(this.group), d = 0; d < c.length; ++d) {
                var f = c[d];
                e == f ? (this.checked = !0, f.checked = !0) : f.checked = !1;
                f.checked ? e.disabled ? this.loadAndDrawImage(this.lQuestionObj.getImageForState(this.type, "selectedDisabled"), d) : this.loadAndDrawImage(this.lQuestionObj.getImageForState(this.type, "selected"), d) : e.disabled ? this.loadAndDrawImage(this.lQuestionObj.getImageForState(this.type,
                    "disabled"), d) : this.loadAndDrawImage(this.lQuestionObj.getImageForState(this.type, "default"), d)
            }
    }
};
cp.LikertItem.prototype.createCanvasWithCorrectBounds = function(a, b) {
    var e = 0 < b[0] ? 0 : b[0],
        c = 0 < b[1] ? 0 : b[1],
        d = (cp.D.project.w > b[2] ? cp.D.project.w : b[2]) - e,
        f = (cp.D.project.h > b[3] ? cp.D.project.h : b[3]) - c;
    canvas = this.canvas = cp.createCanvas(0, 0, d, f, a);
    this.canvas.gcStyleW = d;
    this.canvas.gcStyleH = f;
    this.canvas.gcStyleL = e;
    this.canvas.gcStyleT = c
};
cp.LikertItem.prototype.applyShadowOnChild = function(a) {
    var b = a.gc;
    b.width = a.gcStyleW;
    b.height = a.gcStyleH;
    b.left = a.gcStyleL;
    b.top = a.gcStyleT;
    this.sh && !this.sh.i && (b.shadowOffsetX = this.sh.d * Math.cos(Math.PI * this.sh.a / 180), b.shadowOffsetY = this.sh.d * Math.sin(Math.PI * this.sh.a / 180), b.shadowBlur = this.sh.b, b.shadowColor = cp.ConvertRGBToRGBA(this.sh.c, this.sh.o))
};
cp.LikertItem.prototype.addIfNeeded = function() {
    if ((this.lQuestionObj = cp.getQuestionObject(this.relatedQuestionSlide)) && !this.isDrawn && this.lQuestionObj.getIsStarted() && cp.movie.playbackController) {
        var a = cp.movie.playbackController.GetQuizController();
        if (a) {
            a.GetIsInReviewMode();
            a = this.lQuestionObj.shouldDisableOptions();
            this.group = this.getAttribute("gn");
            var b = a ? "default" : "pointer",
                e = cp.D[this.element.id];
            this.actualId = e.actid;
            this.answerTextDivData = cp.D[this.actualId];
            this.answerTextCanvasDivName =
                this.answerTextDivData.mdi;
            this.answerTextCanvasDivData = cp.D[this.answerTextCanvasDivName];
            var c = this.answerTextCanvasDivData.accstr,
                d = this.answerTextCanvasDivData.b;
            this.answerTextCanvasImageBounds = {
                minX: d[0],
                minY: d[1],
                maxX: d[2],
                maxY: d[3]
            };
            this.bounds = {
                minX: d[0],
                minY: d[1],
                maxX: d[2],
                maxY: d[3]
            };
            var f = document.getElementById(this.canvasDivName),
                h = cp.movie.stage.getSlideDiv().firstChild,
                d = !1,
                d = this.re || this.sh && !this.sh.i;
            this.radioButtonNames = e.rbs;
            this.type = "radio";
            this.zIndex = cp.D[e.actid].zIndex;
            var i = e.aax;
            if ("" == this.element.innerHTML) {
                this.element.innerHTML += "<div id='" + this.answerTextCanvasDivName + "' tabIndex = '-1' role='text' aria-label='" + c + "' style='cursor:default;left:" + this.answerTextCanvasImageBounds.minX + "px; top:" + this.answerTextCanvasImageBounds.minY + "px;width: " + (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX) + "px; height: " + (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY) + "px;'></div>";
                for (var g = 0, k = 0; k < this.radioButtonNames.length; ++k) {
                    var j =
                        this.radioButtonNames[k],
                        g = cp.D[j],
                        c = g.b;
                    g.currentXPos = c[0] + i - this.answerTextCanvasImageBounds.minX - 11;
                    var g = c[2] + 10,
                        l = this.lQuestionObj.getRatingScaleValue(k);
                    this.element.innerHTML += "<input tabIndex='-1' aria-label='" + l + "' type='radio' " + this.value + " unchecked name='" + this.group + "' id='" + j + "' style='cursor:" + b + ";left:" + (c[0] + i - this.answerTextCanvasImageBounds.minX - 11) + "px; top: -3px;width: 22px; height:22px;position:absolute;border-radius:0px;border:0px'></input>"
                }
                this.bounds.maxX = g
            }
            b = cp.newElem("div");
            cp.fixWebkitScaling(b);
            h.insertBefore(b, f.parentElement);
            b.setAttribute("class", "cp-rewrap");
            b.id = this.actualId + "canvasHolder";
            e.answerTextCanvasHolder = b.id;
            c = cp.newElem("canvas");
            c.setAttribute("class", "cp-shape");
            c.id = this.answerTextCanvasDivName;
            b.appendChild(c);
            b.style.zIndex = this.zIndex;
            f = document.getElementById(this.actualId);
            f.drawingBoard = b;
            cp.updateVarText(f);
            this.answerTextCanvasDivData.dns = this.element.id;
            this.answerTextCanvasDivData.re = this.re;
            this.answerTextCanvasDivData.sh = this.sh;
            this.answerTextCanvasDivData.tr =
                this.tr;
            d && (c.style.marginLeft = -this.bounds.minX + "px", c.style.marginTop = -this.bounds.minY + "px");
            (new cp.Shape(c, this.answerTextCanvasDivData)).start();
            c.parentElement.style.left = this.bounds.minX + "px";
            c.parentElement.style.top = this.bounds.minY + "px";
            c.parentElement.style.width = this.bounds.maxX - this.bounds.minX + "px";
            c.parentElement.style.height = this.bounds.maxY - this.bounds.minY + "px";
            c.parentElement.style.position = "absolute";
            this.radioElements = [];
            this.radioCanvasElements = [];
            for (d = 0; d < this.radioButtonNames.length; ++d) {
                j =
                    this.radioButtonNames[d];
                g = cp.D[j];
                c = g.b;
                f = cp(j);
                this.radioElements[d] = f;
                h = cp.newElem("canvas");
                this.createCanvasWithCorrectBounds(h, c);
                h.style.display = "block";
                h.style.position = "absolute";
                h.style.marginLeft = -this.bounds.minX + g.currentXPos + 5 + "px";
                h.style.marginTop = -this.bounds.minY + "px";
                b.appendChild(h);
                this.radioCanvasElements[d] = canvas;
                var m = this;
                f.onclick = function(a) {
                    return function() {
                        cp.disableInteractions || m.checkRadioButtonAtIndex(a, true)
                    }
                }(d);
                "checked" == g.checked ? this.loadAndDrawImage(this.lQuestionObj.getImageForState(this.type,
                    "selected"), d) : this.loadAndDrawImage(this.lQuestionObj.getImageForState(this.type, "default"), d)
            }
            e = this.lQuestionObj.getSelectedIndex(e.actid);
            this.checkRadioButtonAtIndex(e);
            a && this.disableOptions();
            this.element.style.left = this.bounds.minX + "px";
            this.element.style.top = this.bounds.minY + "px";
            this.element.style.width = this.bounds.maxX - this.bounds.minX + "px";
            this.element.style.height = this.bounds.maxY - this.bounds.minY + "px";
            this.element.style.position = "absolute";
            this.element.parentElement.style.zIndex = 1E3;
            this.isDrawn = !0;
            this.visible || (this.element.style.visibility = "hidden");
            this.lQuestionObj.registerLikertItem(this)
        }
    }
};
cp.LikertQuestion = function(a, b) {
    cp.LikertQuestion.baseConstructor.call(this, a, b);
    this.answerItems = [];
    this.answerOptions = this.getAnswerOptions();
    this.typeStatesMap = {
        radio: {
            "default": "assets/htmlimages/radioButton_normal.png",
            selected: "assets/htmlimages/radioButton_selected.png",
            disabled: "assets/htmlimages/radioButton_disabled.png",
            selectedDisabled: "assets/htmlimages/radioButton_selectedDisabled.png"
        }
    };
    this.ratingScaleVector = this.questionData.rsv;
    this.verbose = !1;
    this.m_eachAnswerIsSeparateInteraction = !0
};
cp.inherits(cp.LikertQuestion, cp.Question);
cp.LikertQuestion.prototype.sendInteractionDataForEachAnswer = function(a) {
    if (this.answerItems && !(0 >= this.answerItems.length)) {
        var b = 0,
            e = {},
            c = this.getQuestionScore(),
            d = c.m_interactionID,
            f = cp.movie.playbackController;
        if (f && c)
            for (var h = 0; h < this.answerItems.length; ++h) {
                var i = this.answerItems[h],
                    g = i.getItemText();
                "" != g && !f.IsRunningInConnect() ? (g = cp.trimStartingAndTrailingSpaces(g), g.replace(" ", "_"), e[g] && (g += ++b), e[g] = 1) : (g = b, b++);
                c.m_interactionID = d + "_" + g;
                c.m_chosenAnswersAsString = i.getAnswerText();
                c.m_correctAnswersAsString = i.getAnswerText();
                this.m_quizController.SendInteractionData(c, a)
            }
    }
};
cp.LikertQuestion.prototype.resumeSelectedAnswers = function(a) {
    if (void 0 != a) {
        this.m_selectedAnswersArr = [];
        for (var b = 0; b < a.length; ++b) this.m_selectedAnswersArr.push(a[b].m_chosenAnswer)
    }
};
cp.LikertQuestion.prototype.registerLikertItem = function(a) {
    this.answerItems.push(a)
};
cp.LikertQuestion.prototype.setQuestionSpecificScoreProperties = function(a) {
    a.m_answerOrderArrayAsString = ""
};
cp.LikertQuestion.prototype.getSelectedIndex = function(a) {
    if (!this.m_selectedAnswersArr || 0 >= this.m_selectedAnswersArr.length) return -1;
    for (var b = 0; b < this.answerOptions.length; ++b)
        if (a == this.answerOptions[b]) return this.ratingScaleVector.indexOf(this.m_selectedAnswersArr[b]);
    return -1
};
cp.LikertQuestion.prototype.getRatingScaleValue = function(a) {
    return this.ratingScaleVector[a]
};
cp.LikertQuestion.prototype.getImageForState = function(a, b) {
    return this.typeStatesMap[a][b]
};
cp.LikertQuestion.prototype.getAnswerScores = function() {
    var a = [];
    if (!this.answerItems || 0 >= this.answerItems.length) return a;
    for (var b = 0; b < this.answerItems.length; ++b) {
        var e = this.answerItems[b].getAnswerText(),
            c = new cp.AnswerScore;
        c.m_answerID = (b + 1).toString();
        c.m_correctAnswer = e;
        c.m_chosenAnswer = e;
        a.push(c)
    }
    return a
};
cp.LikertQuestion.prototype.getQuestionScoredPoints = function() {
    return 0
};
cp.LikertQuestion.prototype.resetQuestionData = function() {
    cp.LikertQuestion.superClass.resetQuestionData.call(this);
    this.m_quizController.GetGoToQuizScopeActionExecuted() || (this.m_selectedAnswersArr = [])
};
cp.LikertQuestion.prototype.setSelectedAnswers = function() {
    if (this.answerItems && !(0 >= this.answerItems.length)) {
        this.m_selectedAnswersArr = [];
        for (var a = 0; a < this.answerItems.length; ++a) {
            var b = this.answerItems[a].getAnswerText();
            "" != b && this.m_selectedAnswersArr.push(b)
        }
    }
};
cp.LikertQuestion.prototype.disableAllOptions = function() {
    if (this.m_quizController) {
        var a = !0;
        this.m_quizController.GetIsSubmitAll() && !this.getIsPretest() && (!this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions) && (a = !1);
        if (a && this.answerItems && !(0 >= this.answerItems.length)) {
            for (a = 0; a < this.answerItems.length; ++a) {
                var b = this.answerItems[a];
                b.disableOptions && b.disableOptions()
            }
            this.m_answersDisabled = !0
        }
    }
};
cp.LikertQuestion.prototype.clearAnswers = function() {
    this.verbose && cp.log("Inside Clear Answers");
    var a = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest(),
        a = (a = !1 == this.getWasJudged() || a && !1 == this.m_quizController.m_submittedAllQuestions) && !this.m_quizController.GetIsInReviewMode();
    if (!1 != a && (this.m_selectedAnswersArr = [], this.verbose && cp.log("Not Attempted. Hence Clearing"), this.answerItems && !(0 >= this.answerItems.length)))
        for (a = 0; a < this.answerItems.length; ++a) {
            var b =
                this.answerItems[a];
            b && (b.checked = !1, b.clearAnswers())
        }
};
cp.LikertQuestion.prototype.getSelectedAnswerTextList = function(a) {
    if (this.answerItems && !(0 >= this.answerItems.length)) {
        for (var b = this.answerItems[0].getAnswerText(), e = 1; e < this.answerItems.length; ++e) this.answerItems[e].getAnswerText(), b += a + this.answerItems[0].getAnswerText();
        cp.verbose && cp.log("Expected Answer Text List : " + b);
        return b
    }
};
cp.LikertQuestion.prototype.getAnswerTexts = function() {
    var a = cp.LikertQuestion.superClass.getAnswerTexts.call(this);
    if (a && !(0 >= a.length)) {
        var b = {},
            e = this.questionData.ao;
        if (e.length == this.answerItems.length) {
            for (var c = 0; c < e.length; ++c) {
                var d = e[c].split(":"),
                    d = cp.D[d[0]],
                    f = this.answerItems[c].getAnswerText();
                b[d.aid] = void 0 != f && "" != f ? cp.trimStartingAndTrailingSpaces(f) : ""
            }
            a.answerTextMap = b;
            return a
        }
    }
};
cp.LikertQuestion.prototype.saveAnswerOrder = function() {
    this.m_answerOrderArray = this.answerOptions.slice(0);
    this.setSelectedAnswers()
};
cp.LikertQuestion.prototype.checkIfAttempted = function() {
    for (var a = 0; a < this.answerItems.length; ++a)
        if (!this.answerItems[a].isAnswered()) return !1;
    return !0
};
cp.LikertQuestion.prototype.checkAndSetQuestionStatus = function() {
    var a = this.QuestionStatusEnum.INCOMPLETE,
        a = this.checkIfAttempted() ? this.QuestionStatusEnum.CORRECT : this.QuestionStatusEnum.INCOMPLETE;
    this.setQuestionStatus(a)
};
cp.LikertQuestion.prototype.startQuestion = function() {
    cp.LikertQuestion.superClass.startQuestion.call(this);
    this.answerItems = []
};