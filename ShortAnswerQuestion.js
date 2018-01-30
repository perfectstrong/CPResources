cp.ShortAnswer = function(a, b) {
    cp.ShortAnswer.baseConstructor.call(this, a, b);
    cp.responsive && (this.responsiveCSS = this.getAttribute("css"));
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
    this.args = b
};
cp.inherits(cp.ShortAnswer, cp.Answer);
cp.ShortAnswer.prototype.addAndGetTextAreaField = function(a, b) {
    var c;
    c = "";
    this.font = this.getAttribute("font");
    if ("" == this.element.innerHTML) {
        this.font && (c = c + " -webkit-appearance:none;" + (" font-family:" + this.font.n + ";"), c += "font-size:" + this.font.s + "px;", c += "color: " + this.font.c + ";", this.font.B && (c += "font-weight:bold;"), this.font.u && (c += "text-decoration: underline;"), this.font.i && (c += "font-style: italic;"), c += "resize: none;overflow:auto;border:1px solid;border-top-color:#696969;border-left-color:#696969;border-right-color:#E6E6E6;border-bottom-color:#E6E6E6;border-radius:0px;padding:2px;box-sizing: border-box;");
        var d = this.bounds.maxY - this.bounds.minY;
        cp.MSIE == cp.browser && (d += 1);
        void 0 == this.accstring && (this.accstring = "Short Answer");
        this.element.innerHTML += "<textarea " + (this.enabled ? "" : " readonly='readonly'") + " aria-label='" + this.accstring + "' id='" + this.element.id + "_inputField' style='left:0px; top:0px; width:" + (this.bounds.maxX - this.bounds.minX) + "px; height:" + d + "px;position:absolute;" + c + "'></textarea>"
    }
    this.inputField = document.getElementById(this.element.id + "_inputField");
    this.sh && (c = this.sh.a, cp.applyShadow(this.inputField,
        this.sh.d * Math.cos(Math.PI * c / 180) + "px " + this.sh.d * Math.sin(Math.PI * c / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, 1) + (this.sh.i ? " inset" : "")));
    this.inputField.focus();
    var e = this;
    this.inputField.resetText = function() {
        e.element.oHandler.value = ""
    };
    this.inputField.setText = function(a) {
        e.element.oHandler.value = a
    };
    this.inputField.getText = function() {
        return e.element.oHandler.value
    };
    this.inputField.disable = function() {
        e.enabled = false;
        e.element.oHandler.blur();
        e.element.oHandler.setAttribute("readonly",
            "readonly")
    };
    this.inputField.getWidth = function() {
        return parseFloat(e.element.oHandler.style.width)
    };
    c = this.inputField;
    if (!cp.responsive) {
        var d = b.b[0],
            g = b.b[1],
            h = b.b[2] - b.b[0],
            j = b.b[3] - b.b[1];
        this.answerLabelDivElem.style.position = "absolute";
        this.answerLabelDivElem.style.left = d + "px";
        this.answerLabelDivElem.style.top = g + "px";
        this.answerLabelDivElem.style.width = h + "px";
        this.answerLabelDivElem.style.height = j + "px"
    }
    return c
};
cp.ShortAnswer.prototype.addQuestionSpecificMethods = function() {
    var a = this;
    this.element.clearAnswer = function() {
        a.selectedText = "";
        a.isDrawn && a.element.oHandler.setText("")
    };
    this.element.disableOption = function() {
        lShouldDisable = !0;
        a.element.tabIndex = -1
    };
    this.element.isAttempted = function() {
        var b = a.element.oHandler.getText(),
            b = b.replace(/^\s*|\s*$/g, "");
        return "" != b
    };
    this.element.isCorrectlyAnswered = function() {
        var b = "",
            b = a.element.oHandler.getText(),
            b = b.replace(/^\s*|\s*$/g, "");
        if ("" == b) return !1;
        for (var c =
                0; c < a.correctAnswersList.length; ++c) {
            var d = a.correctAnswersList[c],
                d = d.replace(/^\s*|\s*$/g, "");
            if (a.isCaseSensitive) {
                if (d == b) return !0
            } else if (d.toLowerCase() == b.toLowerCase()) return !0
        }
        return !1
    }
};
cp.ShortAnswer.prototype.updateInputFontStyle = function(a) {
    this.ResponsiveFontProp = this.getAttribute("rpfont");
    if (this.font = this.ResponsiveFontProp[cp.ResponsiveProjWidth].font) a.style.fontFamily = this.font.n, a.style.fontSize = this.font.s + "px", a.style.color = this.font.c, a.style.fontWeight = this.font.B ? "bold" : "normal", a.style.textDecoration = this.font.u ? "underline" : "none", a.style.fontStyle = this.font.i ? "italic" : "normal"
};
cp.ShortAnswer.prototype.drawForResponsive = function(a) {
    if (!this.m_questionObj || !this.m_questionObj.getIsStarted() || !this.responsiveCSS) return !1;
    if (this.isDrawn && !a) return !0;
    var b = cp.getResponsiveCSS(this.responsiveCSS);
    cp.getCSSFromLayouter(b, this);
    var c = !1,
        c = this.re || this.sh && !this.sh.i || this.fillOuterArea,
        d = void 0 != this.tr;
    if (this.currentCSS == b && !c && !d && !a) return !0;
    if (!this.isDrawn) {
        a = this.element.id;
        this.enabled = !0;
        if (!cp.movie.playbackController) return;
        c = cp.movie.playbackController.GetQuizController();
        if (!c) return;
        c.GetIsInReviewMode();
        c = this.m_questionObj.shouldDisableOptions();
        cp.movie.stage.getSlideDiv();
        this.group = this.m_questionObj.getAnswerGroupName();
        d = cp.D[a];
        this.isCaseSensitive = d.cs;
        this.answertextParentDiv = cp(a + "canvasHolder");
        this.answertextParentDiv || (this.answertextParentDiv = cp.newElem("div"), cp.fixWebkitScaling(this.answertextParentDiv), cp.addRewrapObjectAsPerRestOfProjectItem(this.answertextParentDiv), this.answertextParentDiv.id = a + "canvasHolder", d.answerTextCanvasHolder = this.answertextParentDiv.id,
            this.answertextParentDiv.setAttribute("class", "cp-rewrap"));
        this.answerLabelDivElem || (this.answerLabelDivElem = document.getElementById(d.actid));
        this.selectedText = this.m_questionObj.getSelectedText(this.element.id);
        cp.verbose && cp.log("Draw Text Field");
        this.element.oHandler || (this.element.oHandler = this.addAndGetTextAreaField(this.m_questionObj, d), d.oHandler = this.element.oHandler, this.element.oHandler.setText(this.selectedText));
        this.correctAnswersList = this.m_questionObj.getExpectedCorrectAnswerIDList();
        this.addQuestionSpecificMethods();
        c && (this.element.style.cursor = "default", this.element.tabIndex = -1, this.element.oHandler.disable());
        this.isDrawn = !0;
        this.m_questionObj.registerShortAnswer(this.element);
        this.visible || (this.element.style.visibility = "hidden")
    }
    this.inputField.style.left = "0px";
    this.inputField.style.top = "0px";
    this.inputField.style.width = "100%";
    this.inputField.style.height = "100%";
    this.updateInputFontStyle(this.inputField);
    cp.applyResponsiveStyles(this.answerLabelDivElem, b);
    this.adjustPositionWithAnswerArea(b,
        this.answerLabelDivElem);
    return !0
};
cp.ShortAnswer.prototype.addIfNeeded = function(a) {
    if ((!cp.responsive || !this.drawForResponsive(a)) && this.m_questionObj && !this.isDrawn && this.m_questionObj.getIsStarted())
        if (a = this.element.id, this.enabled = !0, cp.movie.playbackController) {
            var b = cp.movie.playbackController.GetQuizController();
            if (b) {
                b.GetIsInReviewMode();
                b = this.m_questionObj.shouldDisableOptions();
                cp.movie.stage.getSlideDiv();
                this.group = this.m_questionObj.getAnswerGroupName();
                var c = cp.D[a];
                this.isCaseSensitive = c.cs;
                var d = cp.newElem("div");
                cp.fixWebkitScaling(d);
                cp.addRewrapObjectAsPerRestOfProjectItem(d);
                d.id = a + "canvasHolder";
                c.answerTextCanvasHolder = d.id;
                d.setAttribute("class", "cp-rewrap");
                this.answerLabelDivElem = document.getElementById(c.actid);
                this.selectedText = this.m_questionObj.getSelectedText(this.element.id);
                cp.verbose && cp.log("Draw Text Field");
                this.element.oHandler = this.addAndGetTextAreaField(this.m_questionObj, c);
                c.oHandler = this.element.oHandler;
                this.element.oHandler.setText(this.selectedText);
                this.correctAnswersList = this.m_questionObj.getExpectedCorrectAnswerIDList();
                this.addQuestionSpecificMethods();
                b && (this.element.style.cursor = "default", this.element.tabIndex = -1, this.element.oHandler.disable());
                this.isDrawn = !0;
                this.m_questionObj.registerShortAnswer(this.element);
                this.visible || (this.element.style.visibility = "hidden")
            }
        }
};
cp.ShortAnswerQuestion = function(a, b) {
    cp.ShortAnswerQuestion.baseConstructor.call(this, a, b);
    this.answerOptions = this.getAnswerOptions();
    this.m_reviewAreaId = void 0
};
cp.inherits(cp.ShortAnswerQuestion, cp.Question);
cp.ShortAnswerQuestion.prototype.resetQuestionData = function() {
    cp.ShortAnswerQuestion.superClass.resetQuestionData.call(this);
    this.m_quizController.GetGoToQuizScopeActionExecuted() || (this.m_selectedAnswersArr = [])
};
cp.ShortAnswerQuestion.prototype.startQuestion = function() {
    this.m_quizController && (this.m_quizController.GetIsInReviewMode(), this.answerOptionsDrawn = !1, this.answerOptionElem = void 0, cp.ShortAnswerQuestion.superClass.startQuestion.call(this))
};
cp.ShortAnswerQuestion.prototype.addOrUpdateCustomReviewAreaFontStyles = function() {
    if (cp.responsive && this.m_reviewAreaId) {
        var a = cp.D[this.m_reviewAreaId];
        if (document.getElementById(this.m_reviewAreaId)) {
            var b = cp(this.m_reviewAreaId + "_inputField"),
                c = cp(this.m_reviewAreaId + "_label"),
                a = a.rpfont[cp.ResponsiveProjWidth].font;
            b.style.fontWeight = a.B ? "bold" : "normal";
            b.style.fontStyle = a.i ? "italic" : "normal";
            b.style.textDecoration = a.u ? "underline" : "none";
            b.style.color = a.c;
            b.style.fontFamily = a.n;
            b.style.fontSize =
                a.s + "px";
            b.style.textAlign = "left";
            c.style.left = "0px";
            c.style.top = -(a.s + 5) + "px";
            c.style.width = "100%"
        }
    }
};
cp.ShortAnswerQuestion.prototype.updateCustomReviewAreaTransforms = function() {
    if (cp.responsive && (this.addOrUpdateCustomReviewAreaFontStyles(), this.m_reviewAreaId)) {
        var a = cp.D[this.m_reviewAreaId];
        if (a && document.getElementById(this.m_reviewAreaId)) {
            cp(this.m_reviewAreaId + "_label");
            var b = cp(this.m_reviewAreaId + "_inputField");
            if (a = a.css ? a.css[cp.ResponsiveProjWidth] : void 0) b.style.left = "0px", b.style.top = "0px", b.style.width = "100%", b.style.height = "100%", cp.applyResponsiveStyles(b.parentElement.parentElement,
                a)
        }
    }
};
cp.ShortAnswerQuestion.prototype.showCustomReviewArea = function(a) {
    if (this.getIsCorrect()) return !0;
    if (this.getIsIncomplete()) return !1;
    this.getAssociatedObjName();
    this.m_reviewAreaId = a;
    var b = cp.D[this.m_reviewAreaId],
        c = document.getElementById(this.m_reviewAreaId);
    if (c) {
        var d = b.B,
            e = b.c,
            g = b.f,
            h = b.i,
            j = b.sz,
            i = b.u,
            f;
        f = " -webkit-appearance:none;resize: none;overflow:auto;border:1px solid;border-top-color:#696969;border-left-color:#696969;border-right-color:#E6E6E6;border-bottom-color:#E6E6E6;border-radius:0px;padding:10px;box-sizing: border-box;-webkit-transform:translate3d(0px, 0px, 0px) scale(1);";
        cp.responsive ||
            (f = f + (" font-family:" + g + ";") + ("font-size:" + j + "px;") + ("color: " + e + ";"), d && (f += "font-weight:bold;"), i && (f += "text-decoration: underline;"), h && (f += "font-style: italic;"));
        d = b.b[3] - b.b[1];
        cp.MSIE == cp.browser && (d += 1);
        e = this.getExpectedCorrectAnswerIDList();
        cp.cpJoin(e, "\n");
        g = "";
        for (h = 0; h < e.length; ++h) i = e[h], "" != i && (g += "-" + i + "\n");
        void 0 == this.accstring && (this.accstring = "Short Answer");
        c.innerHTML = "<div id='" + this.m_reviewAreaId + "_label' style='left:" + b.b[0] + "px;top:" + (b.b[1] - j - 5) + "px;position:absolute;width:" +
            (b.b[2] - b.b[0]) + "px;font-family:Myriad-Pro;font-size:12px;font-weight:bold;'>" + this.questionData.rtt + "</div><textarea readonly='readonly' aria-label='" + this.accstring + "' id='" + a + "_inputField' style='left:" + b.b[0] + "px;top:" + b.b[1] + "px;width:" + (b.b[2] - b.b[0]) + "px;height:" + d + "px;position:absolute;" + f + "'>" + g + "</textarea>";
        cp.responsive && this.updateCustomReviewAreaTransforms();
        return !0
    }
};
cp.ShortAnswerQuestion.prototype.getSelectedText = function() {
    return void 0 == this.m_selectedAnswersArr[0] ? "" : this.m_selectedAnswersArr[0]
};
cp.ShortAnswerQuestion.prototype.registerShortAnswer = function(a) {
    this.answerOptionElem = a;
    this.answerOptionsDrawn = void 0 != this.answerOptionElem
};
cp.ShortAnswerQuestion.prototype.clearAnswers = function() {
    this.verbose && cp.log("Inside Clear Answers");
    var a = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest(),
        a = (a = !1 == this.getWasJudged() || a && !1 == this.m_quizController.m_submittedAllQuestions) && !this.m_quizController.GetIsInReviewMode();
    !1 != a && (this.m_selectedAnswersArr = [], this.verbose && cp.log("Not Attempted. Hence Clearing"), this.answerOptionElem && this.answerOptionElem.clearAnswer())
};
cp.ShortAnswerQuestion.prototype.disableAllOptions = function() {
    if (this.m_quizController) {
        var a = !0;
        this.m_quizController.GetIsSubmitAll() && !this.getIsPretest() && (!this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions) && (a = !1);
        a && (this.answerOptionElem && (this.answerOptionElem.disableOption(), !0 == this.answerOptionsDrawn && this.answerOptionElem.oHandler.disable()), this.m_answersDisabled = !0)
    }
};
cp.ShortAnswerQuestion.prototype.checkIfAttempted = function() {
    return this.answerOptionElem && this.answerOptionElem.isAttempted()
};
cp.ShortAnswerQuestion.prototype.checkIfCorrect = function() {
    return this.answerOptionElem && this.answerOptionElem.isCorrectlyAnswered()
};
cp.ShortAnswerQuestion.prototype.checkAndSetQuestionStatus = function() {
    var a = this.QuestionStatusEnum.INCOMPLETE,
        a = !1;
    a = this.getIsSurvey() ? this.checkIfAttempted() ? this.QuestionStatusEnum.CORRECT : this.QuestionStatusEnum.INCOMPLETE : this.checkIfAttempted() ? (a = this.checkIfCorrect()) ? this.QuestionStatusEnum.CORRECT : this.QuestionStatusEnum.INCORRECT : this.QuestionStatusEnum.INCOMPLETE;
    this.setQuestionStatus(a)
};
cp.ShortAnswerQuestion.prototype.getAnswerScores = function() {
    var a = [],
        b = cp.D[this.answerOptionElem.id],
        c = new cp.AnswerScore;
    c.m_answerID = b.aid.toString();
    c.m_correctAnswer = cp.cpJoin(this.getExpectedCorrectAnswerIDList(), ";");
    c.m_chosenAnswer = this.answerOptionElem.oHandler.getText();
    a.push(c);
    return a
};
cp.ShortAnswerQuestion.prototype.setQuestionSpecificScoreProperties = function(a) {
    void 0 != a && (a.m_answerOrderArrayAsString = "")
};
cp.ShortAnswerQuestion.prototype.restoreFromQuestionSpecificScoreProperties = function(a) {
    void 0 != a && (a = a.m_answerOrderArrayAsString, void 0 == a || "" == a || this.setAnswerOrder(a))
};
cp.ShortAnswerQuestion.prototype.resumeSelectedAnswers = function(a) {
    if (!(0 >= a.length)) {
        this.m_selectedAnswersArr = [];
        for (var b = 0; b < a.length; ++b) {
            var c = unescape(a[b].m_chosenAnswer);
            this.m_selectedAnswersArr.push(c)
        }
    }
};
cp.ShortAnswerQuestion.prototype.setSelectedAnswers = function() {
    this.m_selectedAnswersArr = [];
    if (this.answerOptionElem && this.answerOptionElem.oHandler) {
        var a = this.answerOptionElem.oHandler.getText();
        this.m_selectedAnswersArr.push(a)
    }
};
cp.ShortAnswerQuestion.prototype.getChosenAnswerAsString = function() {
    return cp.ShortAnswerQuestion.superClass.getChosenAnswerAsString.call(this)
};
cp.ShortAnswerQuestion.prototype.getCorrectAnswerAsString = function() {
    var a;
    return a = "" + cp.cpJoin(this.getExpectedCorrectAnswerIDList(), ":")
};
cp.ShortAnswerQuestion.prototype.getChosenAnswerAsStringForReview = function() {
    return this.getChosenAnswerAsString()
};
cp.ShortAnswerQuestion.prototype.getCorrectAnswerAsStringForReview = function() {
    return this.getCorrectAnswerAsString()
};
cp.ShortAnswerQuestion.prototype.getAnswerTexts = function() {
    return ""
};
cp.ShortAnswerQuestion.prototype.saveAnswerOrder = function() {
    this.setSelectedAnswers()
};