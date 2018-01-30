(function(a) {
    a.Feedback = function(d, c, b, e, f) {
        this.lastFrame = this.startFrame = this.currentFrame = 0;
        this.itemName = d;
        this.endAction = c;
        this.parentSlide = a.movie.stage.currentSlide;
        this.element = document.getElementById(d);
        this.item = a.D[d];
        this.type = a.FeedbackType.OTHER;
        if (void 0 != e) switch (e) {
            case a.FeedbackType.SUCCESS:
            case a.FeedbackType.FAILURE:
            case a.FeedbackType.HINT:
                this.type = e
        }
        this.actionObj = f;
        a.FeedbackType.SUCCESS == this.type && this.actionObj && (this.actionObj.actionInProgress = !0);
        this.item && (this.transIn =
            this.item.trin, this.effectObj = this.item.ef);
        this.transIn || (this.transIn = 0);
        this.drawingBoard = null;
        this.element && this.element.drawingBoard && (this.element.drawingBoard.style.opacity = 0, this.drawingBoard = this.element.drawingBoard);
        this.item && (this.transOut = this.item.trout);
        this.transOut || (this.transOut = 0);
        this.pause = b;
        this.onMouse = !1;
        this.item && (this.item.to && this.item.from) && (this.lastFrame = this.item.to - this.item.from);
        this.item && void 0 != this.item.du && (this.lastFrame = this.item.du);
        this.createCSSAnimationRule()
    };
    a.Feedback.prototype = {
        update: function() {
            this.currentFrame++;
            this.currentFrame > this.lastFrame && (a.movie.stage.RemoveFeedback(this), this.hide(), this.endAction && a.movie.executeAction(this.endAction));
            if (this.effectObj) {
                var d = this.effectObj["ef" + this.effectObj.id];
                if (d && d.length)
                    for (var c = 0; c < d.length; ++c) {
                        var b = d[c],
                            e = this.currentFrame;
                        if (b.sf - 1 > e || b.sf - 1 + b.du <= e) b.ci = -1;
                        else {
                            for (var f, e = e - (b.sf - 1), g = 0; g < b.kf.length - 1; ++g)
                                if (b.kf[g].f <= e && b.kf[g + 1].f > e) {
                                    b.ci = g;
                                    break
                                }
                            f = b.kf[b.ci];
                            var i = b.io,
                                l = b.fo,
                                h =
                                b.kf[b.ci + 1],
                                j = e - f.f,
                                k = 0 > b.ease ? -b.ease / 100 + 1 : 1 - b.ease / 200,
                                g = f.x + (h.x - f.x) * Math.pow(j / (h.f - f.f), k);
                            f = f.y + (h.y - f.y) * Math.pow(j / (h.f - f.f), k);
                            b = (i + (l - i) * e / b.du) / 100;
                            b = 0 > b ? 0 : b;
                            b = 1 < b ? 1 : b;
                            this.element.style.left = this.element.bounds.minX + g + "px";
                            this.element.style.top = this.element.bounds.minY + f + "px";
                            this.element.drawingBoard && (this.element.drawingBoard.style.left = this.element.drawingBoard.bounds.minX + g + "px", this.element.drawingBoard.style.top = this.element.drawingBoard.bounds.minY + f + "px", this.element.drawingBoard.style.opacity =
                                b + "")
                        }
                    }
            }
            if (this.drawingBoard)
                if (d = a.canUseWebkitAnimations() && a.FeedbackType.HINT != this.type, c = this.currentFrame, b = this.lastFrame - this.currentFrame, c < this.transIn) d || (this.drawingBoard.style.opacity = a.device != a.DESKTOP ? 1 : c / this.transIn);
                else if (d || (this.drawingBoard.style.opacity = a.device != a.DESKTOP ? 1 : c > this.lastFrame - this.transOut ? b / this.transOut : 1), this.onMouse) this.currentFrame = this.lastFrame - this.transOut - 1
        },
        onRollover: function() {
            this.onMouse = !0;
            this.currentFrame = 0;
            this.show()
        },
        onRollout: function() {
            this.onMouse = !1;
            this.currentFrame = this.lastFrame - this.transOut
        },
        createCSSAnimationRule: function() {
            function d() {
                var a = document.styleSheets[0];
                if (a && !a.cssRules) return !1;
                for (var c = 0; c < a.cssRules.length; ++c)
                    if (a.cssRules[c].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && a.cssRules[c].name == b) return !0;
                return !1
            }
            var c = a.D[this.itemName];
            if (c && a.canUseWebkitAnimations() && a.FeedbackType.HINT != this.type) {
                var b = this.itemName + "_rule";
                if (d()) a.verbose && a.log("rule exists");
                else {
                    var e = "";
                    if (0 != c.trin && void 0 != c.trin) var f = Math.round(1E4 *
                            c.trin / c.du) / 100,
                        e = e + (" { 0% { opacity:0; } " + f + "% { opacity:1; } ");
                    else e += " { 0% { opacity:1; } ";
                    0 != c.trout && void 0 != c.trout ? (c = Math.round(1E4 * (c.du - c.trout) / c.du) / 100, e += " " + c + "% { opacity:1; }  100% { opacity:0; } }") : e += " 100% { opacity:1; } }";
                    c = document.styleSheets[0];
                    a.verbose && a.log(b + ", " + e);
                    c.insertRule("@-webkit-keyframes " + b + e)
                }
                this.webkitAnimationRule = b
            }
        },
        show: function() {
            var d = a.D[this.itemName];
            if (d && (this.drawingBoard && (a.canUseWebkitAnimations() && a.FeedbackType.HINT != this.type ?
                    (a.verbose && a.log("Using Webkit animation"), this.drawingBoard.style.webkitAnimationName = this.webkitAnimationRule, this.drawingBoard.style.webkitAnimationDuration = d.du / a.movie.fps + "s") : this.drawingBoard.style.opacity = a.device != a.DESKTOP ? 1 : 0), void 0 != this.parentSlide && this.parentSlide == a.movie.stage.currentSlide)) {
                this.pause && !a.movie.paused && a.movie.pause(a.ReasonForPause.FEEDBACK_ITEM);
                var c = a.FeedbackCloseReason.OTHER;
                switch (this.type) {
                    case a.FeedbackType.SUCCESS:
                        c = a.FeedbackCloseReason.SHOW_SUCCESS;
                        break;
                    case a.FeedbackType.FAILURE:
                        c = a.FeedbackCloseReason.SHOW_FAILURE;
                        break;
                    case a.FeedbackType.HINT:
                        c = a.FeedbackCloseReason.SHOW_HINT
                }
                a.movie.stage.RemoveFeedbacks(c);
                a.movie.stage.AddFeedback(this);
                a.moveDivElemToTop(this.element);
                d = document.getElementById(d.mdi);
                void 0 != d && a.moveRewrapElemToTop(d.parentNode);
                a.show(this.itemName)
            }
        },
        hide: function() {
            a.FeedbackType.SUCCESS == this.type && this.actionObj && (this.actionObj.actionInProgress = !1);
            a.hide(this.itemName);
            this.drawingBoard && (this.drawingBoard.style.opacity =
                1)
        },
        canHide: function(d) {
            return a.FeedbackType.HINT == this.type || a.FeedbackType.OTHER == this.type || a.FeedbackCloseReason.SLIDE_CHANGE == d || a.FeedbackCloseReason.OTHER == d ? !0 : a.FeedbackCloseReason.SHOW_HINT == d || a.FeedbackType.SUCCESS == this.type ? !1 : !0
        }
    }
})(window.cp);