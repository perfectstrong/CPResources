cp.HotspotInput = function(a) {
    this.elementName = a.id;
    cp.HotspotInput.baseConstructor.call(this, a);
    this.id = this.getAttribute("id");
    this.type = this.getAttribute("type");
    this.answerID = this.getAttribute("aid");
    this.relatedQuestionSlide = this.getAttribute("rqs");
    cp.responsive && (this.responsiveCSS = this.getAttribute("css"));
    this.isCorrect = this.getAttribute("ic");
    this.value = "enabled";
    this.marked = this.getAttribute("mr");
    this.showHandCursorOnOver = this.getAttribute("cur");
    this.isDrawn = !1
};
cp.inherits(cp.HotspotInput, cp.HighlightBox);
cp.HotspotInput.prototype.getAttribute = function(a) {
    var c = cp.D[this.elementName];
    return !c ? null : c[a]
};
cp.HotspotInput.prototype.start = function(a) {
    this.drawIfNeeded();
    if (!this.effectIsStarted || a) this.updateEffects(this.hasEffect), this.effectIsStarted = !0
};
cp.HotspotInput.prototype.reset = function(a) {
    delete cp.ropMap[this.element.id];
    cp.HotspotInput.superClass.reset.call(this, a);
    this.isDrawn = !1;
    this.element.width = "0";
    this.element.height = "0";
    this.element.style.width = "0px";
    this.element.style.height = "0px";
    this.element.left = "0";
    this.element.top = "0";
    this.element.style.left = "0px";
    this.element.style.top = "0px";
    cp.responsive && (this.registered = !1)
};
cp.HotspotInput.prototype.linkedItemDrawingCompleteHandler = function(a) {
    if (cp.responsive && this.drawForResponsive) {
        var c = cp.getResponsiveCSS(this.responsiveCSS);
        a.cpData && a.cpData.uid && !(a.cpData.uid != c.lhID && a.cpData.uid != c.lvID) && (cp.verbose && cp.log("drawing " + this.element.id + ", for " + a.cpData.uid), this.drawForResponsive(!0, cp.ReasonForDrawing.kLinkedToItemAppeared))
    }
};
cp.HotspotInput.prototype.subscribeToItemDrawingCompleteHandler = function() {
    if (cp.responsive && this.responsiveCSS) {
        var a = this,
            c = cp.getResponsiveCSS(this.responsiveCSS);
        c && (-1 != c.lhID || -1 != c.lvID) && cp.em.addEventListener(function(b) {
            a.linkedItemDrawingCompleteHandler(b)
        }, cp.ITEMDRAWINGCOMPLETEEVENT)
    }
};
cp.HotspotInput.prototype.drawForResponsive = function(a, c) {
    var b = cp.getQuestionObject(this.relatedQuestionSlide);
    if (!b || !b.getIsStarted() || !this.responsiveCSS) return !1;
    if (this.isDrawn && !a) return !0;
    var e = cp.getResponsiveCSS(this.responsiveCSS);
    cp.getCSSFromLayouter(e, this);
    var d = !1,
        d = this.re || this.sh && !this.sh.i || this.fillOuterArea,
        f = void 0 != this.tr;
    if (this.currentCSS == e && !d && !f && !a) return !0;
    this.actualElement || (this.actualElement = this.element);
    f = this.actualElement.parentElement;
    cp.movie.stage.getSlideDiv();
    d = cp("re-" + this.actualElement.id);
    d || (this.zIndex = cp.D[this.parentDivName].zIndex, d = cp.newElem("div"), cp.fixWebkitScaling(d), d.id = "re-" + this.actualElement.id, this.element = cp.newElem("canvas"), cp.addRewrapObjectAsPerRestOfProjectItem(d), d.setAttribute("class", "cp-rewrap"), d.appendChild(this.element), d.style.zIndex = this.zIndex, this.parentDivName += "hotspot");
    f && (f.drawingBoard = d, f.bounds = this.bounds, f.drawingBoard.bounds = this.vbounds);
    cp.HotspotInput.superClass.drawForResponsive.call(this, a, c);
    this.currentCSS =
        e;
    if (cp.movie.playbackController && (e = cp.movie.playbackController.GetQuizController())) return e.GetIsInReviewMode(), e = b.shouldDisableOptions(), this.group = b.getAnswerGroupName(), f.style.backgroundColor = "#FFFFFF", f.style.opacity = "0", f.style.cursor = this.showHandCursorOnOver ? "pointer" : "default", this.actualElement.name = this.group, e && (this.value = "disabled", f.style.cursor = "default", b.getWasJudged() && b.canShowReviewIcons() && this.isCorrect && (this.reviewIconImage || (this.reviewIconImage = cp.newElem("img"), cp.fixWebkitScaling(this.reviewIconImage),
            this.reviewIconImage.style.position = "absolute", this.sh && (e = this.sh.a, cp.applyShadow(this.reviewIconImage, this.sh.d * Math.cos(Math.PI * e / 180) + "px " + this.sh.d * Math.sin(Math.PI * e / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" : ""))), d.appendChild(this.reviewIconImage), this.reviewIconImage.style.zIndex = this.zIndex), this.reviewIconImage.src = cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src, e = lOrigImageH = 15, f = this.actualElement.parentElement.getBoundingClientRect(),
        d = d.getBoundingClientRect(), this.reviewIconImage.style.left = f.left - d.left + (f.width / 2 - e / 2) + "px", this.reviewIconImage.style.top = f.top - d.top + (f.height / 2 - lOrigImageH / 2) + "px")), this.actualElement.style.position = "absolute", this.isDrawn = !0, this.visible || (this.actualElement.style.visibility = "hidden"), b.registerHotspotInput(this, c), this.registered = !0
};
cp.HotspotInput.prototype.drawIfNeeded = function(a) {
    if (!cp.responsive || !this.drawForResponsive(a, cp.ReasonForDrawing.kRegularDraw))
        if ((a = cp.getQuestionObject(this.relatedQuestionSlide)) && !this.isDrawn && a.getIsStarted()) {
            var c = this.element,
                b = c.parentElement,
                e = cp.newElem("div");
            cp.fixWebkitScaling(e);
            e.id = "re-" + this.element.id;
            this.element = cp.newElem("canvas");
            cp.movie.stage.getSlideDiv();
            cp.addRewrapObjectAsPerRestOfProjectItem(e);
            e.setAttribute("class", "cp-rewrap");
            e.appendChild(this.element);
            this.zIndex =
                cp.D[this.parentDivName].zIndex;
            e.style.zIndex = this.zIndex;
            this.parentDivName += "hotspot";
            b && (b.drawingBoard = e, b.bounds = this.bounds, b.drawingBoard.bounds = this.vbounds);
            cp.HotspotInput.superClass.drawIfNeeded.call(this);
            if (cp.movie.playbackController) {
                var d = cp.movie.playbackController.GetQuizController();
                d && (d.GetIsInReviewMode(), d = a.shouldDisableOptions(), this.group = a.getAnswerGroupName(), b.style.backgroundColor = "#FFFFFF", b.style.opacity = "0", b.style.cursor = this.showHandCursorOnOver ? "pointer" : "default",
                    c.name = this.group, d && (this.value = "disabled", b.style.cursor = "default", a.getWasJudged() && a.canShowReviewIcons() && this.isCorrect && (b = cp.newElem("img"), cp.fixWebkitScaling(b), b.src = cp.movie.im.m_projectImages["assets/htmlimages/correct_answer_normal.png"].nativeImage.src, d = lOrigImageH = 15, b.style.position = "absolute", b.style.left = parseFloat(c.parentElement.style.left) - parseFloat(e.style.left) + parseFloat(c.parentElement.style.width) / 2 - d / 2 + "px", b.style.top = parseFloat(c.parentElement.style.top) - parseFloat(e.style.top) +
                        parseFloat(c.parentElement.style.height) / 2 - lOrigImageH / 2 + "px", this.sh && (d = this.sh.a, cp.applyShadow(b, this.sh.d * Math.cos(Math.PI * d / 180) + "px " + this.sh.d * Math.sin(Math.PI * d / 180) + "px " + this.sh.b + "px " + cp.ConvertRGBToRGBA(this.sh.c, this.sh.o) + (this.sh.i ? " inset" : ""))), e.appendChild(b), b.style.zIndex = this.zIndex)), c.style.position = "absolute", this.isDrawn = !0, this.visible || (c.style.visibility = "hidden"), a.registerHotspotInput(this))
            }
        }
};
cp.HotspotQuestion = function(a, c) {
    cp.HotspotQuestion.baseConstructor.call(this, a, c);
    this.answerOptions = this.getAnswerOptions();
    this.questionData = cp.D[this.questionObjName];
    this.hotspotPositionList = [];
    this.hotspotGroupName = "hotspotImage_" + c;
    this.selectedHotspotPositions = "";
    this.m_selectedAnswersArr = [];
    this.verbose = !1
};
cp.inherits(cp.HotspotQuestion, cp.Question);
cp.HotspotQuestion.prototype.registerHotspotInput = function(a, c) {
    this.m_slideElem = cp.movie.stage.mainSlideDiv;
    this.m_slideContainerDivRect = this.m_slideElem.getBoundingClientRect();
    this.hotspotInputs || (this.hotspotInputs = {});
    this.hitTestingRects || (this.hitTestingRects = {});
    for (var b = 0; b < this.answerOptions.length; ++b) {
        var e = this.answerOptions[b];
        if (e == a.parentDivName) {
            this.hotspotInputs[e] = a;
            var d = document.getElementById(e),
                d = cp.getHitTestingRect(d.parentElement),
                f = 0,
                g = 0;
            cp.responsive ? (f -= this.m_slideContainerDivRect.left,
                g -= this.m_slideContainerDivRect.top) : (0 > this.m_slideContainerDivRect.left && (f -= this.m_slideContainerDivRect.left), 0 > this.m_slideContainerDivRect.top && (g -= this.m_slideContainerDivRect.top));
            d.minX += f;
            d.minY += g;
            d.maxX += f;
            d.maxY += g;
            d.minX /= this.m_slideElem.scaleFactor;
            d.minY /= this.m_slideElem.scaleFactor;
            d.maxX /= this.m_slideElem.scaleFactor;
            d.maxY /= this.m_slideElem.scaleFactor;
            cp.responsive && (d.minX = cp.getRoundedValue(100 * (d.minX / cp.project.clientWidth)), d.maxX = cp.getRoundedValue(100 * (d.maxX / cp.project.clientWidth)),
                d.minY = cp.getRoundedValue(100 * (d.minY / cp.project.clientHeight)), d.maxY = cp.getRoundedValue(100 * (d.maxY / cp.project.clientHeight)));
            this.hitTestingRects[e] = d
        }
    }
    for (b = 0; b < this.answerOptions.length; ++b)
        if (e = this.answerOptions[b], void 0 == this.hotspotInputs[e]) return;
    (!cp.responsive || c == cp.ReasonForDrawing.kRegularDraw) && this.drawHotspotsAgain()
};
cp.HotspotQuestion.prototype.resetQuestionData = function() {
    cp.HotspotQuestion.superClass.resetQuestionData.call(this);
    if (!this.m_quizController.GetGoToQuizScopeActionExecuted()) {
        this.m_selectedAnswersArr = [];
        this.selectedHotspotPositions = "";
        this.resetHotspotPositionList();
        for (var a = this.getAllHotspotInputs(), c = 0; c < a.length; ++c)(currHotspotInput = a[c]) && this.resetHotspotIsMarked(currHotspotInput)
    }
};
cp.HotspotQuestion.prototype.drawHotspotsAgain = function() {
    this.resetHotspotPositionList(!0);
    this.drawHotspots(!0)
};
cp.HotspotQuestion.prototype.drawHotspots = function(a) {
    var c = document.getElementById(this.getAssociatedObjName()),
        b = this.getSelectedPositions();
    if ("" != b) {
        var b = b.split(";"),
            e = b.length;
        if (0 != e)
            for (var d = 0; d < e; ++d) {
                var f = b[d].split("_"),
                    g = f[0],
                    h = f[1];
                cp.responsive && (g = Math.round(g * cp.project.clientWidth / 100), h = Math.round(h * cp.project.clientHeight / 100));
                this.addHotspotDiv(c, g, h, f[2], a)
            }
    }
};
cp.HotspotQuestion.prototype.getAllowClickOnHotspotsOnlyFlag = function() {
    return this.questionData.ach
};
cp.HotspotQuestion.prototype.getHotspotImagePath = function() {
    return "./" + this.questionData.chap
};
cp.HotspotQuestion.prototype.getHotspotPositionList = function() {
    return this.hotspotPositionList
};
cp.HotspotQuestion.prototype.resetHotspotPositionList = function(a) {
    a || (this.hotspotPositionList = []);
    a = document.getElementById(this.getAssociatedObjName());
    if (void 0 != a && void 0 != a)
        for (var c = a.childNodes, b = c.length - 1; 0 <= b; --b) {
            var e = c[b];
            "IMG" == e.nodeName && -1 != e.name.indexOf("hotspotImage_") && a.removeChild(e)
        }
};
cp.HotspotQuestion.prototype.setSelectedPositions = function() {
    if (this.hotspotPositionList) {
        var a = this.hotspotPositionList.length;
        if (!(0 >= a)) {
            for (var c = "", c = this.hotspotPositionList[0].x + "_" + this.hotspotPositionList[0].y + "_" + this.hotspotPositionList[0].isCorrect, b = 1; b < a; ++b) c += ";", c += this.hotspotPositionList[b].x + "_" + this.hotspotPositionList[b].y + "_" + this.hotspotPositionList[b].isCorrect;
            this.selectedHotspotPositions = c
        }
    }
};
cp.HotspotQuestion.prototype.getSelectedPositions = function() {
    return this.selectedHotspotPositions
};
cp.HotspotQuestion.prototype.getHotspotIsMarked = function(a) {
    return cp.D[a.id].mr
};
cp.HotspotQuestion.prototype.setHotspotIsMarked = function(a) {
    cp.D[a.id].mr = !0
};
cp.HotspotQuestion.prototype.resetHotspotIsMarked = function(a) {
    var c = cp.D[a.id];
    c.cur && (a.parentNode.style.cursor = "pointer");
    c.mr = !1
};
cp.HotspotQuestion.prototype.getHotspotAnswerID = function(a) {
    return cp.D[a.id].aid
};
cp.HotspotQuestion.prototype.setSelectedAnswers = function() {
    this.setSelectedPositions();
    var a = this.getAllHotspotInputs();
    this.m_selectedAnswersArr = [];
    if (!(0 >= a.length))
        for (var c = 0; c < a.length; ++c) {
            var b = a[c];
            this.getHotspotIsMarked(b) && this.m_selectedAnswersArr.push(this.getHotspotAnswerID(b))
        }
};
cp.HotspotQuestion.prototype.disableAllOptions = function() {
    if (this.m_quizController) {
        var a = !0;
        this.m_quizController.GetIsSubmitAll() && !this.getIsPretest() && (!this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions) && (a = !1);
        if (a && (a = this.getAllHotspotInputs(), !(1 > a.length))) {
            for (var c = 0; c < a.length; ++c) a[c].parentNode.style.cursor = "default";
            this.m_answersDisabled = !0
        }
    }
};
cp.HotspotQuestion.prototype.getAllHotspotInputs = function() {
    this.getAnswerGroupName();
    for (var a = [], c = this.answerOptions, b = 0; b < c.length; ++b) a[b] = document.getElementById(c[b]);
    return a
};
cp.HotspotQuestion.prototype.getCorrectHotspotInputs = function() {
    for (var a = this.getAllHotspotInputs(), c = [], b = 0; b < a.length; ++b) {
        var e = a[b],
            d = cp.D[e.id];
        d && d.ic && c.push(e)
    }
    return c
};
cp.HotspotQuestion.prototype.clearAnswers = function() {
    this.verbose && cp.log("Inside Clear Answers");
    var a = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest(),
        a = (a = !1 == this.getWasJudged() || a && !1 == this.m_quizController.m_submittedAllQuestions) && !this.m_quizController.GetIsInReviewMode();
    if (!1 != a) {
        this.m_selectedAnswersArr = [];
        this.selectedHotspotPositions = "";
        this.verbose && cp.log("Not Attempted. Hence Clearing");
        for (var c = document.getElementsByName(this.hotspotGroupName),
                b = c.length, a = 0; a < b; ++a) {
            var e = c[0];
            if (e) {
                var d = e.parentNode;
                d && d.removeChild(e)
            }
        }
        c = this.getAllHotspotInputs();
        for (a = 0; a < c.length; ++a)(b = c[a]) && this.resetHotspotIsMarked(b);
        this.hotspotPositionList = []
    }
};
cp.HotspotQuestion.prototype.isCorrectHotspotInput = function(a) {
    return cp.D[a].ic
};
cp.HotspotQuestion.prototype.getOffsetXPosition = function(a) {
    return a - window.pageXOffset
};
cp.HotspotQuestion.prototype.getOffsetYPosition = function(a) {
    return a - window.pageYOffset
};
cp.HotspotQuestion.prototype.checkIfMarkedCorrectHotspot = function(a) {
    for (var c in this.hitTestingRects) {
        var b = this.hitTestingRects[c],
            e, d;
        e = !1;
        if (cp.responsive) {
            e = Math.floor(a.x * cp.project.clientWidth / 100);
            d = Math.floor(a.y * cp.project.clientHeight / 100);
            var f = Math.floor(b.maxX * cp.project.clientWidth / 100),
                g = Math.floor(b.minY * cp.project.clientHeight / 100),
                h = Math.floor(b.maxY * cp.project.clientHeight / 100);
            e = e > Math.floor(b.minX * cp.project.clientWidth / 100) - 2 && e < f + 2 && d > g - 2 && d < h + 2
        } else e = a.x - window.pageXOffset,
            d = a.y - window.pageYOffset, e = e > this.getOffsetXPosition(b.minX) && e < this.getOffsetXPosition(b.maxX) && d > this.getOffsetYPosition(b.minY) && d < this.getOffsetYPosition(b.maxY);
        if (e && this.isCorrectHotspotInput(c)) return a.isCorrect = "true", !0
    }
    a.isCorrect = "false";
    return !1
};
cp.HotspotQuestion.prototype.checkIfPositionCorrect = function(a, c) {
    if (!cp.responsive) {
        this.getAnswerGroupName();
        for (var b = this.answerOptions, e = 0; e < b.length; ++e) {
            var d = cp.D[b[e]],
                f = d.vb,
                g = f[1],
                h = f[2],
                i = f[3];
            if (a > f[0] && (a < h && c > g && c < i) && (d.mr = !0, d.ic)) return !0
        }
        return !1
    }
};
cp.HotspotQuestion.prototype.checkIfAllCorrectHotspotsMarked = function() {
    for (var a = this.getCorrectHotspotInputs(), c = 0; c < a.length; ++c)
        if (!this.getHotspotIsMarked(a[c])) return !1;
    return !0
};
cp.HotspotQuestion.prototype.getQuestionScoredPoints = function() {
    return this.getIsSurvey() || !this.getWasJudged() ? 0 : this.getQuestionLevelScoredPoints()
};
cp.HotspotQuestion.prototype.saveAnswerOrder = function() {
    this.setSelectedAnswers()
};
cp.HotspotQuestion.prototype.checkAndSetQuestionStatus = function() {
    var a = this.QuestionStatusEnum.INCOMPLETE,
        c = this.hotspotPositionList.length;
    if (0 >= c) a = this.QuestionStatusEnum.INCOMPLETE;
    else {
        var b = !0,
            e = !1;
        if (this.getIsSurvey()) this.getIsSurvey() && (a = this.QuestionStatusEnum.CORRECT);
        else {
            for (a = 0; a < c; ++a) this.checkIfMarkedCorrectHotspot(this.hotspotPositionList[a]) || (b = b && !1);
            b && (e = b && this.checkIfAllCorrectHotspotsMarked());
            a = e ? this.QuestionStatusEnum.CORRECT : this.QuestionStatusEnum.INCORRECT
        }
        this.setSelectedPositions()
    }
    this.setQuestionStatus(a)
};
cp.HotspotQuestion.prototype.hotspotQuestionHandler = function(a, c, b) {
    if (this.m_quizController) {
        var a = this.m_quizController.GetIsInReviewMode(),
            e = this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
        !this.getIsKnowledgeCheck() && a || this.getWasJudged() && !e || (a = this.getAssociatedObjName(), a = document.getElementById(a), this.showHideHotspotImage(a, c, b))
    }
};
cp.HotspotQuestion.prototype.checkIfClickedInsideHotspotAndSetMarked = function(a, c) {
    for (var b = this.getAllHotspotInputs(), e = 0; e < b.length; ++e) {
        var d = b[e];
        currHotspotInputParent = d.parentElement;
        var f = currHotspotInputParent.getBoundingClientRect(),
            g = !1,
            g = a - window.pageXOffset,
            h = c - window.pageYOffset;
        if (g = cp.responsive ? g > f.left - 2 && g < f.right + 2 && h > f.top - 2 && h < f.bottom + 2 : g > f.left && g < f.right && h > f.top && h < f.bottom) return this.setHotspotIsMarked(d), !0
    }
    return !1
};
cp.HotspotQuestion.prototype.showHideHotspotImage = function(a, c, b) {
    var e = a.childNodes,
        d = cp.movie.stage.mainSlideDiv,
        f = d.getBoundingClientRect();
    cp("project").getBoundingClientRect();
    for (var g = e.length - 1; 0 <= g; --g) {
        var h = e[g];
        if ("IMG" == h.nodeName && -1 != h.name.indexOf("hotspotImage_")) {
            var i = h.getBoundingClientRect(),
                j = c - window.pageXOffset,
                k = b - window.pageYOffset;
            if (isInside = cp.responsive ? j > i.left - 2 && j < i.right + 2 && k > i.top - 2 && k < i.bottom + 2 : j > i.left && j < i.right && k > i.top && k < i.bottom) {
                this.removeHotspotPosition(h.id) &&
                    a.removeChild(h);
                return
            }
        }
    }
    e = this.checkIfClickedInsideHotspotAndSetMarked(c, b, !0);
    if (!this.getAllowClickOnHotspotsOnlyFlag() || e) g = cp.getScaledPosition(c, b), e = g.X, g = g.Y, cp.shouldScale || (e = c - f.left, g = b - f.top, e -= window.pageXOffset, g -= window.pageYOffset), e /= d.scaleFactor, g /= d.scaleFactor, this.addHotspotDiv(a, e, g)
};
cp.HotspotQuestion.prototype.addHotspotDiv = function(a, c, b, e, d) {
    var f = cp.newElem("img");
    cp.fixWebkitScaling(f);
    var g = 0,
        h = 0;
    this.m_quizController.GetIsInReviewMode() ? this.getIsSurvey() ? (f.src = cp.movie.im.m_projectImages["assets/htmlimages/hotspot_correct_answer_normal.png"].nativeImage.src, g = h = 20) : "undefined" == typeof e ? (f.src = this.getHotspotImagePath(), g = h = 30) : "false" == e ? (f.src = cp.movie.im.m_projectImages["assets/htmlimages/hotspot_incorrect_answer_normal.png"].nativeImage.src, g = h = 20) : "true" == e && (f.src =
        cp.movie.im.m_projectImages["assets/htmlimages/hotspot_correct_answer_normal.png"].nativeImage.src, g = h = 20) : (f.src = this.getHotspotImagePath(), g = h = 30);
    f.name = this.hotspotGroupName;
    f.style.position = "absolute";
    a.appendChild(f);
    var i = f.clientWidth,
        a = f.clientHeight;
    f.naturalWidth && (i = i > f.naturalWidth ? i : f.naturalWidth);
    f.naturalHeight && (a = a > f.naturalHeight ? a : f.naturalHeight);
    i = i > f.width ? i : f.width;
    a = a > f.height ? a : f.height;
    0 == i && (i = g);
    0 == a && (a = h);
    cp.verbose && (cp.log("x,y : " + c + "," + b), cp.log("lBrowserSpecificW,lBrowserSpecificH : " +
        i + "," + a));
    cp.responsive ? (g = Math.round(100 * (c - i / 2) / cp.project.clientWidth), h = Math.round(100 * (b - a / 2) / cp.project.clientHeight), c = Math.round(100 * c / cp.project.clientWidth), b = Math.round(100 * b / cp.project.clientHeight), f.style.left = g + "%", f.style.top = h + "%") : (f.style.left = c - i / 2 + "px", f.style.top = b - a / 2 + "px");
    f.style.zIndex = 1E3;
    f.id = "hs_" + c + b;
    cp.redrawItem(f.id);
    d || this.addHotspotPosition(c, b, e, f.id)
};
cp.HotspotQuestion.prototype.addHotspotPosition = function(a, c, b, e) {
    var d = {};
    d.x = a;
    d.y = c;
    d.id = e;
    d.isCorrect = "undefined" != typeof b ? b : "-1";
    this.hotspotPositionList.push(d)
};
cp.HotspotQuestion.prototype.removeHotspotPosition = function(a) {
    for (var c = 0; c < this.hotspotPositionList.length; ++c)
        if (this.hotspotPositionList[c].id == a) return this.hotspotPositionList.splice(c, 1), !0;
    return !1
};
cp.HotspotQuestion.prototype.startQuestion = function() {
    if (this.m_quizController) {
        var a = this.m_quizController.GetIsInReviewMode();
        this.hotspotInputs = [];
        if (!this.getIsKnowledgeCheck() && (a || this.getWasJudged())) this.resetHotspotPositionList(), this.drawHotspots();
        this.lastViewedBreakPointWidth && parseFloat(this.lastViewedBreakPointWidth) != parseFloat(cp.ResponsiveProjWidth) && (a = cp.D.quizzingData) && cp.alert(a.rpViDv);
        cp.HotspotQuestion.superClass.startQuestion.call(this)
    }
};
cp.HotspotQuestion.prototype.setQuestionSpecificScoreProperties = function(a) {
    if (void 0 != a && this.getWasJudged()) {
        var c = this.hotspotPositionList.length;
        if (!(0 >= c)) {
            a.m_hotSpotNamesArrayAsString = "hotSpotAnimation_" + this.hotspotPositionList[0].x + "_" + this.hotspotPositionList[0].y;
            a.m_hotSpot_xchordsAsString = "" + this.hotspotPositionList[0].x;
            a.m_hotSpot_ychordsAsString = "" + this.hotspotPositionList[0].y;
            cp.responsive && (a.m_hotSpotIsCorrect = "" + this.hotspotPositionList[0].isCorrect);
            for (var b = 1; b < c; ++b) a.m_hotSpotNamesArrayAsString +=
                ";" + ("hotSpotAnimation_" + this.hotspotPositionList[b].x + "_" + this.hotspotPositionList[b].y), a.m_hotSpot_xchordsAsString += ";" + this.hotspotPositionList[b].x, a.m_hotSpot_ychordsAsString += ";" + this.hotspotPositionList[b].y, cp.responsive && (a.m_hotSpotIsCorrect += ";" + this.hotspotPositionList[b].isCorrect);
            cp.responsive && (a.m_BreakPointWidth = "" + cp.ResponsiveProjWidth)
        }
    }
};
cp.HotspotQuestion.prototype.restoreFromQuestionSpecificScoreProperties = function(a) {
    if (void 0 != a) {
        var c = [],
            b = [],
            e = [];
        "" != a.m_hotSpot_xchordsAsString && (c = a.m_hotSpot_xchordsAsString.split(";"));
        "" != a.m_hotSpot_ychordsAsString && (b = a.m_hotSpot_ychordsAsString.split(";"));
        cp.responsive && (a.m_hotSpotIsCorrect && (e = a.m_hotSpotIsCorrect.split(";")), a.m_BreakPointWidth && (this.lastViewedBreakPointWidth = a.m_BreakPointWidth));
        if (c.length == b.length && !(0 >= c.length || 0 >= b.length))
            if (!cp.responsive || !(e.length != c.length &&
                    0 >= e.length)) {
                for (var a = "", a = c[0] + "_" + b[0], a = cp.responsive ? a + ("_" + e[0]) : a + ("_" + this.checkIfPositionCorrect(c[0], b[0])), d = 1; d < c.length; ++d) a += ";", a += c[d] + "_" + b[d], a = cp.responsive ? a + ("_" + e[d]) : a + ("_" + this.checkIfPositionCorrect(c[d], b[d]));
                this.selectedHotspotPositions = a
            }
    }
};