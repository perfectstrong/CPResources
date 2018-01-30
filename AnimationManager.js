(function() {
    var ENABLE_PPTX_LOGS = !0;
    (function() {
        function u() {
            return (new Date).getTime()
        }

        function B(a, b, c) {
            function d(a, b, c) {
                0 > c && (c += 1);
                1 < c && (c -= 1);
                return c < 1 / 6 ? a + 6 * (b - a) * c : 0.5 > c ? b : c < 2 / 3 ? a + 6 * (b - a) * (2 / 3 - c) : a
            }
            0 > a && (a += 360);
            360 < a && (a -= 360);
            a /= 360;
            b = (100 < b ? 100 : 0 > b ? 0 : b) / 100;
            c = (100 < c ? 100 : 0 > c ? 0 : c) / 100;
            if (0 == b) c = b = a = c;
            else var e = 0.5 > c ? c * (1 + b) : c + b - c * b,
                g = 2 * c - e,
                c = d(g, e, a + 1 / 3),
                b = d(g, e, a),
                a = d(g, e, a - 1 / 3);
            c = Math.round(255 * c);
            b = Math.round(255 * b);
            a = Math.round(255 * a);
            return [255 < c ? 255 : 0 > c ? 0 : c, 255 < b ? 255 : 0 > b ? 0 : b, 255 < a ? 255 : 0 > a ? 0 : a]
        }
        var j, s, w, z, A, c = {
            instanceManager: {}
        };
        window.PPTXLib = c;
        c.updateNoSkipFramesFromEffectData = function(a) {
            if (void 0 != a.g4 && (a = a.g4.a1, void 0 != a))
                for (var b = 1; b < a.length; ++b) {
                    var f = cp.movie.stage.currentSlideStartFrame + c.TimeInMSToFrameNumber(a[b][0]) - 1;
                    j.AddNoSkipFrameExternal(f);
                    j.AddNoSkipFrameExternal(f + 1);
                    j.AddNoSkipFrameExternal(f + 3)
                }
        };
        c.addToInstanceManager = function(a, b) {
            c.instanceManager[a] = b
        };
        c.hasAnimationInfo = function(a) {
            return void 0 != a.g4
        };
        c.initializeAnimationManagerForCPSlide = function(a) {
            c.animationManager.resetObjects();
            c.animationManager.resetData();
            c.instanceManager = {};
            if (void 0 != a.g4) {
                c.animationManager.resetData(a.g4.a1, a.g4.a2, a.to - a.from, cp.getCpInfoOriginalFPS, cp.getCpInfoSpeed, !1);
                var a = a.g4.c3,
                    b;
                for (b in a) c.instanceManager[b] = new c.PptxTriggeringDisplayItem(b, a[b])
            }
            return c.animationManager
        };
        c.resetAnimationsDueToResizeOrOrientationChange = function() {
            c.animationManager.resetAnimationsDueToResizeOrOrientationChange()
        };
        c.resetObjects = function(a) {
            c.animationManager.resetObjects(a)
        };
        c.processTriggerForObject = function(a, b, c) {
            a.processTriggers &&
                a.processTriggers(b, c)
        };
        c.updateAnimationManager = function() {
            c.mSeekReset = !1;
            var a = cp.getCpElapsedMovieTime();
            isNaN(a) && (a = 0);
            if (void 0 != c.animationManager) {
                var b = cp.movie.stage.canAdvanceCurrentFrameForEffects(a - cp.movie.stage.currentSlideStartTime);
                cp.getCpIsPlaying() && c.animationManager.updateAnimationTimeWithElapsedTime && b ? c.animationManager.updateAnimationTimeWithElapsedTime(a - cp.movie.stage.currentSlideStartTime) : c.animationManager.updateAnimationTimeWithFrameNumber && c.animationManager.updateAnimationTimeWithFrameNumber(cp.movie.stage.getNextSkipFrame() -
                    cp.movie.stage.currentSlideStartFrame)
            }
        };
        c.forceRedraw = function() {
            c.animationManager.forceRedraw()
        };
        c.PptxObjTypes = {
            kPPTX_OTNone: 0,
            kPPTX_OTShape: 1,
            kPPTX_OTText: 2,
            kPPTX_OTImage: 3,
            kPPTX_OTButton: 4,
            kPPTX_OTAudio: 5,
            kPPTX_OTVideo: 6,
            kPPTX_OTCanvas: 10,
            kPPTX_OTGlyphStore: 20
        };
        c.PptxHTMLFillTypes = {
            kPPTX_FillNone: 0,
            kPPTX_FillSolid: 1,
            kPPTX_FillGradient: 2,
            kPPTX_FillImage: 3
        };
        c.PptxHTMLGradientType = {
            kPPTX_GradientLinear: 0,
            kPPTX_GradientRadial: 1,
            kPPTX_GradientRectangular: 2,
            kPPTX_GradientPath: 3
        };
        c.PptxHTMLPointType = {
            kPPTX_PtMoveTo: 0,
            kPPTX_PtLineTo: 1,
            kPPTX_PtQuadCurveTo: 2
        };
        c.PptxHTMLLineEndType = {
            kPPTX_LineEndCapRound: 0,
            kPPTX_LineEndCapFlat: 1,
            kPPTX_LineEndCapSquare: 2
        };
        c.PptxHTMLLineJoinStyle = {
            kPPTX_LineJoinStyleRound: 0,
            kPPTX_LineJoinStyleBevel: 1,
            kPPTX_LineJoinStyleMiter: 2
        };
        c.PptxHTMLLinePattern = {
            kPPTX_LinePatternEMPTY: 0,
            kPPTX_LinePatternSOLID: 1,
            kPPTX_LinePatternDASH: 2,
            kPPTX_LinePatternDASHDOT: 3,
            kPPTX_LinePatternDASHDOTDOT: 4,
            kPPTX_LinePatternDOT: 5,
            kPPTX_LinePatternCUSTOM: 6
        };
        c.AudioType = {
            kPPTX_InvalidType: 0,
            kPPTX_AnimationAudio: 1,
            kPPTX_ActionAudio: 2,
            kPPTX_AudioObject: 3
        };
        c.inherits = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.baseConstructor = b;
            a.superClass = b.prototype
        };
        c.TimeInMSToFrameNumber = function(a) {
            return Math.floor(a * cp.getCpInfoOriginalFPS() / 1E3)
        };
        c.IsPointInBBox = function(a, b, c) {
            return a < c[0] || a > c[2] || b < c[1] || b > c[3] ? !1 : !0
        };
        c.mSlideScaled = {};
        c.currentTabIndex = 0;
        c.GetRunningTabIndex = function() {
            return ++c.currentTabIndex
        };
        c.PptxAnimatableDisplayData = function(a) {
            this.mData = [];
            this.mColorLengthData = [];
            this.mColorRedraw = [];
            this.mRedraw = !1;
            this.mDataRelative = {};
            a && this.copyFrom(a)
        };
        c.PptxAnimatableDisplayData.prototype = {
            copyFrom: function(a) {
                this.mData = a.mData.slice(0);
                this.mRedraw = a.mRedraw;
                this.mDataRelative = {};
                this.mColorRedraw = []
            },
            isequals: function(a) {
                this.mRedraw = !1;
                for (var a = a.mData, b = 0; 18 >= b; b++) {
                    try {
                        var c = !1;
                        if (this.mData[b].length && a[b].length && this.mData[b].length == a[b].length) {
                            for (var d = 0; d < this.mData[b].length && this.mData[b][d] == a[b][d]; ++d);
                            d == this.mData[b].length &&
                                (c = !0)
                        }
                        if (c) continue
                    } catch (e) {}
                    if (this.mData[b] !== a[b]) return 9 >= b && (this.mRedraw = !0), !1
                }
                return !0
            },
            roundoff: function() {
                for (var a in this.mDataRelative) {
                    var b = Number(a);
                    switch (b) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            this.mColorRedraw[b] || (this.mData[b] = this.mData[b].slice(0), this.mColorRedraw[b] = 1);
                            for (var c = this.mData[b], b = this.mDataRelative[b], d = 0, e = 0; d < c.length; d += 4, e += 3) {
                                var g;
                                g = c[d];
                                var h = c[d + 1],
                                    i = c[d + 2];
                                g /= 255;
                                var h = h / 255,
                                    i = i / 255,
                                    q = Math.max(g, h, i),
                                    k = Math.min(g, h, i),
                                    l = void 0,
                                    m = void 0,
                                    j = (q + k) / 2;
                                if (q == k) l =
                                    m = 0;
                                else {
                                    var p = q - k,
                                        m = 0.5 < j ? p / (2 - q - k) : p / (q + k);
                                    switch (q) {
                                        case g:
                                            l = (h - i) / p + (h < i ? 6 : 0);
                                            break;
                                        case h:
                                            l = (i - g) / p + 2;
                                            break;
                                        case i:
                                            l = (g - h) / p + 4
                                    }
                                    l *= 60;
                                    0 > l && (l += 360)
                                }
                                l = Math.round(l);
                                m = Math.round(100 * m);
                                j = Math.round(100 * j);
                                360 < l && (l -= 360);
                                m = 100 < m ? 100 : 0 > m ? 0 : m;
                                j = 100 < j ? 100 : 0 > j ? 0 : j;
                                g = [l, m, j];
                                g[0] += b[e];
                                g[1] += b[e + 1];
                                g[2] += b[e + 2];
                                g = B(g[0], g[1], g[2]);
                                c[d] = ~~g[0];
                                c[d + 1] = ~~g[1];
                                c[d + 2] = ~~g[2]
                            }
                            break;
                        case 19:
                            b = this.mDataRelative[a];
                            this.mData[10] *= 1 + b[0] / 100;
                            this.mData[11] *= 1 + b[1] / 100;
                            break;
                        case 10:
                        case 11:
                            this.mData[b] *= this.mDataRelative[a];
                            break;
                        default:
                            this.mData[a] += this.mDataRelative[a]
                    }
                }
            },
            destroy: function() {
                this.mData = this.mColorLengthData = this.mColorRedraw = this.mDataRelative = null
            }
        };
        c.PptxTriggeringDisplayItem = function(a, b) {
            this.mUniqueName = a;
            this.mTriggerEffectSequence = b;
            this.mTriggerTimelineCurrentIndex = -1;
            this.mMaxTriggers = this.mTriggerEffectSequence ? this.mTriggerEffectSequence.length : 0
        };
        c.PptxTriggeringDisplayItem.prototype.destroy = function() {
            this.mTriggerEffectSequence = null
        };
        c.PptxTriggeringDisplayItem.prototype.processTriggers =
            function(a, b) {
                void 0 == b && (b = !0);
                if (0 < this.mMaxTriggers) {
                    var f = !1;
                    if (a) {
                        if (void 0 == this.timesTriggered || !1 == b) this.timesTriggered = -1;
                        cp.log(this.timesTriggered);
                        this.timesTriggered++
                    } else f = c.animationManager.completeRunningAnimations(this);
                    this.mTriggerTimelineCurrentIndex++;
                    this.mTriggerTimelineCurrentIndex == this.mMaxTriggers ? f ? this.mTriggerTimelineCurrentIndex-- : (c.am && c.am.PauseAllAnimTrigTl(this.mUniqueName), c.animationManager.removeTriggerAnimations(this), this.mTriggerTimelineCurrentIndex = 0,
                        c.animationManager.createTriggerAnimations(this.mTriggerEffectSequence[this.mTriggerTimelineCurrentIndex], this, a, b)) : c.animationManager.createTriggerAnimations(this.mTriggerEffectSequence[this.mTriggerTimelineCurrentIndex], this, a, b)
                }
            };
        c.PptxTriggeringDisplayItem.prototype.toString = function() {
            return this.mUniqueName
        };
        c.PptxAnimatableDisplayItem = function(a, b, f, d) {
            this.isCpObject && (f = this.initializeAnimatableDisplayData(b.b, b.h6, b.JSONEffectData));
            this.mOrderedAnimationList = [];
            this.mAnimationList = {};
            this.mTriggerTimelineId = d;
            this.mForceUpdateFrameData = !0;
            this.mUniqueName = a;
            this.mDisplayData = new c.PptxAnimatableDisplayData(f);
            this.mOutDisplayData = new c.PptxAnimatableDisplayData(f);
            this.mCurrentDisplayData = new c.PptxAnimatableDisplayData(f)
        };
        c.PptxAnimatableDisplayItem.prototype.initializeAnimatableDisplayData = function(a, b, f) {
            var d = new c.PptxAnimatableDisplayData,
                e = d.mData;
            if (!f) return d;
            this.m_BBox = c.transformer.BBox(a);
            e[12] = (this.m_BBox[0] + this.m_BBox[2]) / 2;
            e[13] = (this.m_BBox[1] + this.m_BBox[3]) /
                2;
            e[10] = this.m_BBox[2] - this.m_BBox[0];
            e[11] = this.m_BBox[3] - this.m_BBox[1];
            e[14] = 1;
            e[15] = 0;
            e[16] = 0;
            e[18] = 0;
            e[17] = 0 === b ? !1 : !0;
            e[3] = [];
            e[0] = [0, 255, 0, 1];
            e[4] = 0;
            e[5] = 0;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[1] = [];
            e[9] = 1;
            e[2] = [];
            return d
        };
        c.PptxAnimatableDisplayItem.prototype.transformObject = function() {
            var a = this.mOutDisplayData.mData,
                b = this.mDisplayData.mData,
                f = Math.cos(a[15] * Math.PI / 180),
                d = Math.sin(a[15] * Math.PI / 180),
                f = [f, d, -d, f, 0, 0],
                e = [a[10] / b[10], 0, 0, a[11] / b[11], 0, 0],
                d = c.matrixMultiply(e, f),
                e = c.matrixMultiply(e, [1,
                    0, 0, 1, 0, 0
                ]),
                d = c.matrixMultiply(d, [1, a[18], a[16], 1, 0, 0]),
                e = c.matrixMultiply(e, [1, a[18], a[16], 1, 0, 0]),
                g = a[12] - b[12],
                b = a[13] - b[13],
                f = d,
                d = c.matrixMultiply([1, 0, 0, 1, g, b], d),
                e = c.matrixMultiply([1, 0, 0, 1, g, b], e);
            this.m_TransformMatrix = d;
            d = "matrix(" + d[0].toFixed(6) + "," + d[1].toFixed(6) + "," + d[2].toFixed(6) + "," + d[3].toFixed(6) + "," + d[4].toFixed(6) + "," + d[5].toFixed(6) + ")";
            e[0].toFixed(6);
            e[1].toFixed(6);
            e[2].toFixed(6);
            e[3].toFixed(6);
            e[4].toFixed(6);
            e[5].toFixed(6);
            mtrixR = "matrix(" + f[0].toFixed(6) + "," + f[1].toFixed(6) +
                "," + f[2].toFixed(6) + "," + f[3].toFixed(6) + "," + f[4].toFixed(6) + "," + f[5].toFixed(6) + ")";
            this.actualParent && (this.actualParent.style.transform = d, this.actualParent.style.msTransform = d, this.actualParent.style.MozTransform = d, this.actualParent.style.WebkitTransform = d, 1 != cp.movie.m_scaleFactor && cp.fixWebkitScaling && cp.fixWebkitScaling(this.actualParent), this.actualParent.style.OTransform = d);
            this.setTransformOrigin(this.m_DrawingC);
            void 0 != this.m_DrawingC && (this.m_DrawingC.parentElement.style.transform = d, this.m_DrawingC.parentElement.style.msTransform =
                d, this.m_DrawingC.parentElement.style.MozTransform = d, this.m_DrawingC.parentElement.style.WebkitTransform = d, 1 != cp.movie.m_scaleFactor && cp.fixWebkitScaling && cp.fixWebkitScaling(this.m_DrawingC), this.m_DrawingC.parentElement.style.OTransform = d, this.m_DrawingC.style.opacity = a[14]);
            this.m_Context && this.m_Context.canvas && (this.m_Context.canvas.hidden = a[17] ? !1 : !0)
        };
        c.PptxAnimatableDisplayItem.prototype.destroy = function() {
            var a = c.instanceManager[this.mTriggerTimelineId];
            a && a.destroy();
            if (this.isCpObject &&
                void 0 != this.m_triggerTimelineIds)
                for (a = 0; a < this.m_triggerTimelineIds.length; ++a) {
                    var b = c.instanceManager[this.m_triggerTimelineIds[a]];
                    b && b.destroy()
                }
            for (a = 0; a < this.mOrderedAnimationList.length; ++a) void 0 != this.mOrderedAnimationList.effect && (this.mOrderedAnimationList.effect.destroy(), this.mOrderedAnimationList.effect = this.mOrderedAnimationList.trigger = null);
            this.mDisplayData.destroy();
            this.mOutDisplayData.destroy();
            this.mCurrentDisplayData.destroy();
            this.mOrderedAnimationList = this.mAnimationList =
                this.mDisplayData = this.mOutDisplayData = this.mCurrentDisplayData = null
        };
        c.PptxAnimatableDisplayItem.prototype.getAnimations = function(a) {
            return this.mAnimationList[a]
        };
        c.PptxAnimatableDisplayItem.prototype.addAnimation = function(a, b) {
            this.mAnimationList[b] || (this.mAnimationList[b] = []);
            this.mAnimationList[b].push(a);
            this.mOrderedAnimationList.push({
                effect: a,
                trigger: b
            })
        };
        c.PptxAnimatableDisplayItem.prototype.removeAnimations = function(a) {
            if (this.mAnimationList[a]) {
                delete this.mAnimationList[a];
                for (var b = [], c = 0; c < this.mOrderedAnimationList.length; ++c) this.mOrderedAnimationList[c].trigger != a && b.push(this.mOrderedAnimationList[c]);
                this.mOrderedAnimationList = b
            }
        };
        c.PptxAnimatableDisplayItem.prototype.updateAnimationDataPostConstruction = function() {
            for (var a = [], b = 0; 3 >= b; ++b) a[b] = this.mDisplayData.mData[b].length / 4;
            this.mDisplayData.mColorLengthData = this.mOutDisplayData.mColorLengthData = this.mCurrentDisplayData.mColorLengthData = a
        };
        c.PptxAnimatableDisplayItem.prototype.updateEffects = function(a) {
            if (a) try {
                var b =
                    this.updateFrameData();
                if (this.canvas) {
                    if (this.m_Context = this.canvas.gc, this.m_DrawingC = this.m_Context.canvas) this.m_DrawingC.hidden = this.mOutDisplayData.mData[c.ANIMATABLE_DATA_VISIBLE_POS] ? !1 : !0, this.m_DrawingC.hidden && (this.mOutDisplayData.mData[c.ANIMATABLE_DATA_ALPHA_POS] = 0)
                } else this.m_DrawingC = this.actualDrawingElement, cp.responsive && !this.m_DrawingC && (this.buttonType && "textButton" == this.buttonType) && (this.m_DrawingC = this.element);
                this.mOutDisplayData.mRedraw && void 0 != this.drawIfNeeded && this.drawIfNeeded(cpInfoCurrentFrame,
                    b[1]);
                this.transformObject()
            } catch (f) {
                o(f)
            }
        };
        c.PptxAnimatableDisplayItem.prototype.updateFrameData = function() {
            var a = this.mForceUpdateFrameData;
            this.mCurrentDisplayData.copyFrom(this.mOutDisplayData);
            this.mOutDisplayData.copyFrom(this.mDisplayData);
            for (var b = 0; b < this.mOrderedAnimationList.length; ++b) a = this.mOrderedAnimationList[b].effect.applyEffect(this.mOutDisplayData.mData, this.mOutDisplayData, this.mDisplayData.mData) || a;
            a |= c.mSeekReset;
            this.mOutDisplayData.roundoff();
            var b = this.mOutDisplayData.isequals(this.mCurrentDisplayData),
                f = this.mOutDisplayData.mRedraw;
            this.mOutDisplayData.mRedraw = this.mOutDisplayData.mRedraw || a;
            this.mForceUpdateFrameData = !1;
            return [!b, !f && a]
        };
        c.PptxAnimatableDisplayItem.prototype.drawMask = function(a, b, c) {
            for (var d = this.mOrderedAnimationList.length - 1; 0 <= d && !this.mOrderedAnimationList[d].effect.applyMask(a, this.mOutDisplayData.mData, b, c); --d);
        };
        c.PptxAnimatableDisplayItem.prototype.completeRunningAnimations = function(a) {
            a = this.mAnimationList[a];
            if (!a) return !1;
            for (var b = !1, c = 0; c < a.length; ++c) b = a[c].fforward() ||
                b;
            return b
        };
        c.PptxAnimatableDisplayItem.prototype.processTriggers = function(a, b) {
            void 0 == b && (b = !0);
            if (this.isCpObject) {
                if (void 0 != this.m_triggerTimelineIds)
                    for (var f = 0; f < this.m_triggerTimelineIds.length; ++f) {
                        var d = this.m_triggerTimelineIds[f];
                        if (cp.responsive) {
                            var e = d[d.length - 1] - 0;
                            if (cp.getCurrentBreakPointID() != e) continue
                        } - 1 != d.indexOf(a) && (d = c.instanceManager[d]) && d.processTriggers(!0, b)
                    }
            } else(f = c.instanceManager[this.mTriggerTimelineId]) && f.processTriggers()
        };
        c.PptxAnimatableDisplayItem.prototype.toString =
            function() {
                return this.mUniqueName
            };
        c.PptxAnimationManager = function() {
            function a(a) {
                var b = p[a];
                b && (delete p[a], b.resetData());
                return b
            }

            function b() {
                for (var b = q + 1; b < j.length; ++b)
                    if (g >= j[b])
                        for (var c = k[b], d = 1; c && d < c.length; d++)
                            if (cp.responsive) {
                                var e = c[d],
                                    h = e[e.length - 1] - 0;
                                cp.getCurrentBreakPointID() == h && (h = a(e), (h = t.createAnimation(l[e], e, !1, !1, c[0])) && f(h, t))
                            } else e = c[d], (h = a(e)) || (h = t.createAnimation(l[e], e, !1, !1, c[0])), h && f(h, t);
                else break;
                q = b - 1
            }

            function f(a, b) {
                if (a && a.mTargetObjectName) {
                    void 0 !=
                        b.mUniqueName && (a.mTriggerObject = b.mUniqueName);
                    var d = c.instanceManager[a.mTargetObjectName];
                    d && (d.addAnimation(a, b), r[b] || (r[b] = {}), r[b][a.mTargetObjectName] = d)
                }
            }
            var d = !1,
                e = 0,
                g = 0,
                h = 0,
                i = 0,
                q = -1,
                k = [],
                l = [],
                j = [],
                r = {},
                p = {},
                t = this,
                o = null,
                v = null;
            this.mTempCanvasContext = this.mTempCanvas = null;
            var n = [];
            n[0] = c.Effects.AnimateLinearInterpolate;
            n[1] = c.Effects.SetEffectBase;
            n[2] = c.Effects.AnimateLinearInterpolateRelative;
            n[3] = c.Effects.AnimateLinearMultipleInterpolateRelative;
            n[4] = c.Effects.AnimateColor;
            n[5] = c.Effects.EffectBase;
            n[6] = c.Effects.AnimateMotionPath;
            n[7] = c.Effects.AnimateFormula;
            n[8] = c.Effects.AnimateSound;
            n[32] = c.Effects.AnimateBlinds;
            n[33] = c.Effects.AnimateBox;
            n[34] = c.Effects.AnimateDiamond;
            n[35] = c.Effects.AnimateCircle;
            n[36] = c.Effects.AnimateSplit;
            n[37] = c.Effects.AnimatePlus;
            n[38] = c.Effects.AnimateWipe;
            n[39] = c.Effects.AnimateCheckerBoard;
            n[40] = c.Effects.AnimateStripes;
            n[41] = c.Effects.AnimateDissolve;
            n[42] = c.Effects.AnimateRandomBars;
            n[43] = c.Effects.AnimateWedge;
            n[44] = c.Effects.AnimateWheel;
            this.resetAnimationsDueToResizeOrOrientationChange =
                function() {
                    this.resetObjects();
                    this.setAnimationTimeAfterSeek(cpInfoCurrentFrame - cp.movie.stage.currentSlideStartFrame)
                };
            this.resetObjects = function(a) {
                if (null == a)
                    for (var b in r) {
                        c.instanceManager[b] && (c.instanceManager[b].timesTriggered = -1);
                        var d = r[b],
                            f;
                        for (f in d) d[f].removeAnimations(b)
                    } else
                        for (b in r)
                            for (f in d = r[b], d) f == a && d[f].removeAnimations(b)
            };
            this.forceRedraw = function() {
                for (var a in c.instanceManager) {
                    var b = c.instanceManager[a];
                    b && b.updateEffects && b.updateEffects(!0)
                }
            };
            this.resetData = function(a,
                b, c, f, t, n) {
                if (n) {
                    for (f = 0; f < a.length; ++f) k.push(a[f]);
                    for (x in b) l[x] = b[x]
                } else {
                    l = b || [];
                    k = a || [];
                    h = g = e = 0;
                    q = -1;
                    d = !1;
                    j = [];
                    r = {};
                    p = {};
                    i = 0;
                    o = f;
                    v = t;
                    for (var x in b)
                        if (a = b[x], f = s.data[a.a3]) f.lastTriggerName = "", l[x] = a
                }
                for (b = j.length; b < k.length; ++b) j.push(k[b][0]);
                k.sort(function(a, b) {
                    return a[0] - b[0]
                });
                j.sort(function(a, b) {
                    return a - b
                });
                c ? this.mTempCanvas || (this.mTempCanvas = document.createElement("canvas"), this.mTempCanvasContext = this.mTempCanvas.getContext("2d")) : this.mTempCanvasContext = this.mTempCanvas = null
            };
            this.start = function() {
                e = u();
                g = 0;
                h = e;
                b()
            };
            this.updateAnimationTimeWithFrameNumber = function(a) {
                void 0 != v && (h = u() * v(), d || (a = 1E3 * a / o(), a >= i ? (g = a, e = h - a, b()) : (this.setAnimationTimeAfterSeek(a), c.mSeekReset = !0), i = a))
            };
            this.updateAnimationTimeWithElapsedTime = function(a) {
                void 0 != v && (h = u() * v(), d || (a >= i ? (g = a, e = h - a, b()) : this.setAnimationTimeAfterSeek(a), i = a))
            };
            this.updateAnimationTime = function() {
                h = u();
                d || (g = h - e, b())
            };
            this.pauseAnimations = function() {
                d = !0
            };
            this.resumeAnimations = function() {
                d = !1;
                e = u() - g
            };
            this.setAnimationTimeAfterSeek =
                function(a) {
                    e = g = 0;
                    void 0 != c.am && c.am.PauseAllMainTimeLineSounds();
                    var d = r[this],
                        f;
                    for (f in d)
                        if (d[f].getAnimations) {
                            var h = d[f].getAnimations(this);
                            if (h)
                                for (var i = 0; i < h.length; ++i) p[h[i].mEffectID] = h[i]
                        }
                    this.removeTriggerAnimations(this);
                    q = -1;
                    g = a;
                    e = u() - a;
                    b()
                };
            this.processClick = function() {
                this.completeRunningAnimations(this);
                var a = q + 1;
                g = j.length > a ? j[a] : Infinity;
                e = u() - g
            };
            this.createAnimation = function(a, b, c, d, f) {
                if (a) {
                    var e = n[a.a4];
                    if (e) return new e(a, b, c, d, f)
                }
                return null
            };
            this.completeRunningAnimations =
                function(a) {
                    var b = !1,
                        c = r[a],
                        d;
                    for (d in c) b = c[d].completeRunningAnimations(a) || b;
                    return b
                };
            this.createTriggerAnimations = function(a, b, d) {
                if (a && b)
                    for (var e = 1; e < a.length; ++e) {
                        var g = a[e];
                        if (d) {
                            if (void 0 != b.mUniqueName) var h = b.mUniqueName;
                            var i = c.instanceManager[h];
                            if (i) {
                                var j = s.data[l[g].a3],
                                    k = j.lastTriggerName;
                                void 0 == j.OriginalSubEffects && (j.OriginalSubEffects = {});
                                void 0 == j.OriginalSubEffects[h] && (j.OriginalSubEffects[h] = cp.cloneObject(l[g].b4));
                                if (void 0 != i.timesTriggered && 0 < i.timesTriggered && k == h) {
                                    var i =
                                        l[g].b4,
                                        q = j.OriginalSubEffects[h];
                                    if (i)
                                        for (e = 0; e < i.length; ++e) {
                                            var t = i[e],
                                                m = q[e],
                                                n = t.c0;
                                            if (14 != n)
                                                for (var r = t.b6, m = m.b6, p = 0, p = t.b6[r.length - 1], o = 1; o < r.length; o += 2) 10 == n || 11 == n ? t.b6[0] != t.b6[r.length - 1] && !0 != l[g].b1 && (t.b6[o] *= p) : !0 != l[g].b1 && (t.b6[o] = m[o] + p)
                                        }
                                }
                                k != h && (l[g].b4 = cp.cloneObject(j.OriginalSubEffects[h]));
                                j.lastTriggerName = h
                            }
                        }
                        f(this.createAnimation(l[g], g, !0, !1), b)
                    }
            };
            this.removeTriggerAnimations = function(a) {
                var b = r[a],
                    c;
                for (c in b) b[c].removeAnimations(a);
                delete r[a]
            };
            this.getAnimationTime =
                function(a) {
                    return a ? h : g
                }
        };
        c.PptxAnimationManager.prototype.toString = function() {
            return "CPPR-PresenterAnimationManager"
        };
        c.Effects = {};
        c.Effects.EffectBase = function(a, b, f, d, e) {
            this.mTargetObjectName = a.a3;
            this.mEffectID = b;
            this.mIsTriggerEffect = d ? !1 : f;
            this.mDelayInMs = a.a5 || 0;
            this.mDurationInMs = a.a6;
            this.mAutoReverse = a.a8 ? !0 : !1;
            this.mRewindWhenDonePlaying = d ? !1 : a.b1 ? !0 : !1;
            this.mRepeatTimes = d ? 1 : a.a7 || 1;
            this.mRepeatTillNextClick = d ? !1 : a.b2 ? !0 : !1;
            this.mRepeatTillSlideEnd = d ? !1 : a.b3 ? !0 : !1;
            this.mEffectFunc = void 0;
            this.mStartTimeInMS = e || 0;
            this.mInitPoint = {};
            this.mTimeInitialized = !1;
            this.mIsSubAnimOnNextClick = a.j1 ? !0 : !1;
            this.mResetMask = !1;
            if (void 0 != a.j2 && (a.isCpObject || !d)) this.mInitPoint[0] = this.transformValue(12, Number(a.j2[0])), this.mInitPoint[1] = this.transformValue(13, Number(a.j2[1]));
            this.mHasRewindEffect = this.mRewindWhenDonePlaying || this.mAutoReverse;
            this.mAutoReverse && (this.mRepeatTimes *= 2);
            this.mEffectCompletedTime = this.mHasRewindEffect ? 0 : this.mDurationInMs;
            this.mMaskCurrentTime = -1;
            this.mMaskFunc = this.applyMaskImpl;
            this.mSubEffects = [];
            if (b = a.b4)
                for (d = 0; d < b.length; ++d)
                    if (e = c.animationManager.createAnimation(b[d], d, f, !0, 0)) void 0 == e.mTargetObjectName && (e.mTargetObjectName = this.mTargetObjectName), void 0 == e.mDurationInMs && (e.mDurationInMs = this.mDurationInMs), e.mIsSubAnimOnNextClick && (e.mDelayInMs = this.mDurationInMs - e.mDurationInMs), e.mInitPoint[0] = this.mInitPoint[0], e.mInitPoint[1] = this.mInitPoint[1], this.mSubEffects.push(e);
            f = a.a9 || 0;
            b = a.b0 || 0;
            a = a.JSONBounceTime || 0;
            this.mGetTimeFunc = f || b || a ? this.getAdjsutedTime(f,
                b, a) : this.getCurrentTime;
            this.resetData()
        };
        c.Effects.EffectBase.prototype = {
            destroy: function() {
                for (var a = 0; a < this.mSubEffects.length; ++a) this.mSubEffects[a].destroy(), this.mSubEffects[a] = null;
                this.mGetTimeFunc = this.mSubEffects = this.mMaskFunc = this.mEffectFunc = null
            },
            updateCompleteEffectStatus: function(a) {
                this.mEffectFunc = (this.mCompleted = a) ? this.applyCompletedEffectImpl : this.applyEffectImpl;
                this.mMaskCurrentTime = -1;
                this.updateCompleteEffectStatusImpl()
            },
            resetData: function() {
                this.updateCompleteEffectStatus(!1);
                this.mIsTriggerEffect && (this.mStartTimeInMS = c.animationManager.getAnimationTime(this.mIsTriggerEffect));
                this.mNextMileStone = 0;
                this.mIsInReveseMode = !1;
                this.mActualStartTimeInMS = this.mStartTimeInMS + this.mDelayInMs;
                for (var a = 0; a < this.mSubEffects.length; ++a) this.mSubEffects[a].resetData()
            },
            fforward: function() {
                if (this.mCompleted) return !1;
                this.mRepeatTillSlideEnd || this.updateCompleteEffectStatus(!0);
                return !0
            },
            applyEffect: function(a, b, c, d) {
                var e = !0,
                    g = !1;
                if (void 0 == d) {
                    e = !1;
                    d = this.mEffectCompletedTime;
                    if (this.mCompleted) {
                        if (this.mRewindWhenDonePlaying) return !1
                    } else {
                        d =
                            this.mGetTimeFunc();
                        0 == this.mSubEffects.length && (g = this.mResetMask);
                        this.mResetMask = !1;
                        for (var h = 0; h < this.mSubEffects.length; ++h) g |= this.mSubEffects[h].mResetMask, this.mSubEffects[h].mResetMask = !1;
                        var i;
                        if (h = cp.D[this.mTargetObjectName]) i = h.mdi, i = cp.getDisplayObjByKey(i);
                        if (0 > d) return !1 == this.mRewindWhenDonePlaying && (i && i.displayDataBackup && i.relativeAnimatableDisplayDataBackup) && (i.mOutDisplayData = i.relativeAnimatableDisplayDataBackup, i.mOutDisplayData.mData = i.displayDataBackup), g
                    }
                    this.mTimeInitialized ||
                        (this.mTimeInitialized = !0, this.mInitValDispPos = {}, this.mInitValDispPos[0] = a[12], this.mInitValDispPos[1] = a[13])
                } else {
                    if (d >= this.mActualStartTimeInMS + this.mDurationInMs) this.mCompleted || this.updateCompleteEffectStatus(!0);
                    else {
                        if (d < this.mActualStartTimeInMS) return !1;
                        this.mCompleted && this.updateCompleteEffectStatus(!1)
                    }
                    this.mCompleted || (d -= this.mActualStartTimeInMS)
                }
                e || (e = b.mDataRelative, i = !1, void 0 != e[10] && 0 == e[10] && (i = !0), void 0 != e[11] && 0 == e[11] && (i = !0), 0 == a[14] && (i = !0), i && (void 0 != e[10] && (e[10] = 1),
                    void 0 != e[11] && (e[11] = 1), 0 == a[14] && (a[14] = c[14]), a[15] = c[15]));
                if (0 === this.mSubEffects.length) {
                    c = this.mEffectFunc(d, a, b, c);
                    if (h = cp.D[this.mTargetObjectName])
                        if (i = h.mdi, i = cp.getDisplayObjByKey(i)) i.displayDataBackup = a, i.relativeAnimatableDisplayDataBackup = b;
                    return c
                }
                for (h = 0; h < this.mSubEffects.length; ++h) this.mSubEffects[h].mTimeInitialized || (this.mSubEffects[h].mTimeInitialized = !0, this.mSubEffects[h].mInitValDispPos = {}, this.mSubEffects[h].mInitValDispPos[0] = this.mInitValDispPos[0], this.mSubEffects[h].mInitValDispPos[1] =
                    this.mInitValDispPos[1]), g = this.mSubEffects[h].applyEffect(a, b, c, d) || g;
                this.mMaskCurrentTime = d;
                return g
            },
            getCurrentTime: function() {
                var a = c.animationManager.getAnimationTime(this.mIsTriggerEffect) - this.mActualStartTimeInMS;
                if (0 > a) return -Infinity;
                if (a < this.mNextMileStone) return this.mIsInReveseMode ? this.mNextMileStone - a : a - this.mNextMileStone + this.mDurationInMs;
                this.mIsInReveseMode = !1;
                var b = a / this.mDurationInMs;
                if (b < this.mRepeatTimes) {
                    b = ~~b;
                    this.mNextMileStone = (b + 1) * this.mDurationInMs;
                    if (this.mAutoReverse) {
                        if (0 ===
                            b % 2) return a - this.mNextMileStone + this.mDurationInMs;
                        this.mIsInReveseMode = !0;
                        return this.mNextMileStone - a
                    }
                    a = a - this.mNextMileStone + this.mDurationInMs;
                    return this.mRewindWhenDonePlaying && 0 === a - this.mDurationInMs ? 0 : a
                }
                this.updateCompleteEffectStatus(!0);
                return this.mEffectCompletedTime
            },
            getAdjsutedTime: function(a, b) {
                var c = 0,
                    d = 0,
                    e = this.mDurationInMs - a - b;
                a && b ? (c = 1 / (a * (a / 2 + e + b / 2)), d = c * a / b) : !a && b ? (d = 1 / (b * (e + b / 2)), a = 0) : a && !b && (c = 1 / (a * (e + a / 2)), b = 0);
                var g = this,
                    e = g.mDurationInMs - a - b,
                    h = g.mDurationInMs - b,
                    i = d / 2,
                    j = c * a,
                    k = j * a / 2;
                if (a && b) {
                    var l = c * g.mDurationInMs / 2,
                        m = k + e * j - j * h;
                    return function() {
                        var b = g.getCurrentTime();
                        if (b < 0) return b;
                        if (b <= a) return l * b * b;
                        if (b <= h) return g.mDurationInMs * (j * b - k);
                        var c = b - h;
                        return g.mDurationInMs * (m + j * b - i * c * c)
                    }
                }
                if (!a && b) {
                    var o = d * b,
                        p = g.mDurationInMs * o;
                    return function() {
                        var a = g.getCurrentTime();
                        if (a < 0) return a;
                        if (a <= h) return p * a;
                        var b = a - h;
                        return g.mDurationInMs * (o * a - i * b * b)
                    }
                }
                l = g.mDurationInMs * (c / 2);
                return function() {
                    var b = g.getCurrentTime();
                    return b < 0 ? b : b <= a ? l * b * b : g.mDurationInMs * (k +
                        j * (b - a))
                }
            },
            applyMask: function(a, b, c, d) {
                if (0 > this.mMaskCurrentTime) return !1;
                var e = !1;
                if (0 === this.mSubEffects.length) e = this.mMaskCurrentTime / this.mDurationInMs, this.mOneMinusPercent && (e = 1 - e), e = this.mMaskFunc(e, a, b, c, d);
                else
                    for (var g = 0; g < this.mSubEffects.length; ++g) e = this.mSubEffects[g].applyMask(a, b, c, d) || e;
                this.mMaskCurrentTime = -1;
                return e
            },
            applyEffectImpl: function() {
                return !1
            },
            applyCompletedEffectImpl: function() {
                return !1
            },
            applyMaskImpl: function() {
                return !1
            },
            updateCompleteEffectStatusImpl: function() {},
            transformValue: function(a, b) {
                if (c.transformer.ShouldTransform()) switch (a) {
                    case 12:
                        return c.transformer.XCoord(b);
                    case 13:
                        return c.transformer.YCoord(b);
                    case 10:
                        return c.transformer.Width(b);
                    case 11:
                        return c.transformer.Height(b)
                }
                return b
            },
            transformArray: function(a, b) {
                if (c.transformer.ShouldTransform()) switch (a) {
                    case 12:
                        for (var f = 0; f < b.length; ++f) b[f] = c.transformer.XCoord(b[f]);
                        break;
                    case 13:
                        for (f = 0; f < b.length; ++f) b[f] = c.transformer.YCoord(b[f])
                }
            }
        };
        c.Effects.SetEffectBase = function(a, b, f, d, e) {
            c.Effects.SetEffectBase.baseConstructor.call(this,
                a, b, f, d, e);
            this.mRefVariable = Number(a.c0);
            this.mCompletedValue = a.c1
        };
        c.inherits(c.Effects.SetEffectBase, c.Effects.EffectBase);
        c.Effects.SetEffectBase.prototype.applyCompletedEffectImpl = function(a, b) {
            b[this.mRefVariable] = this.mCompletedValue;
            return !1
        };
        c.Effects.SetEffectBase.prototype.applyCompletedColorEffectImpl = function(a, b, c) {
            a = c.mColorLengthData[this.mRefVariable];
            b[this.mRefVariable] = [];
            for (var d = 0; d < a; ++d) b[this.mRefVariable].push.apply(b[this.mRefVariable], this.mCompletedValue);
            c.mColorRedraw[this.mRefVariable] =
                1;
            return !1
        };
        c.Effects.SetEffectBase.prototype.updateCompleteEffectStatusImpl = function() {
            this.mCompleted && (this.mEffectFunc = 3 >= this.mRefVariable ? this.applyCompletedColorEffectImpl : this.applyCompletedEffectImpl)
        };
        c.Effects.AnimateLinearInterpolate = function(a, b, f, d, e) {
            c.Effects.AnimateLinearInterpolate.baseConstructor.call(this, a, b, f, d, e);
            this.mRefVariable = Number(a.c0);
            this.mTimeData = [];
            this.mValueData = [];
            this.mFractionData = [];
            if (a = a.b6) {
                for (b = 0; b < a.length;) f = cp.project.clientWidth, d = cp.project.clientHeight,
                    this.mTimeData.push(a[b++] * this.mDurationInMs / 100), cp.responsive ? 12 == this.mRefVariable ? this.mValueData.push(a[b++] * f) : 13 == this.mRefVariable ? this.mValueData.push(a[b++] * d) : this.mValueData.push(a[b++]) : this.mValueData.push(a[b++]);
                this.transformArray(this.mRefVariable, this.mValueData);
                for (b = 1; b < this.mTimeData.length; ++b) this.mFractionData[b - 1] = (this.mValueData[b] - this.mValueData[b - 1]) / (this.mTimeData[b] - this.mTimeData[b - 1]);
                this.mCompletedValue = this.mHasRewindEffect ? this.mValueData[0] : this.mValueData[this.mValueData.length -
                    1]
            } else this.mCompletedValue = 0
        };
        c.inherits(c.Effects.AnimateLinearInterpolate, c.Effects.EffectBase);
        c.Effects.AnimateLinearInterpolate.prototype.applyEffectImpl = function(a, b, c) {
            for (var d = 1; d < this.mTimeData.length; ++d)
                if (a < this.mTimeData[d]) {
                    a -= this.mTimeData[d - 1];
                    10 == this.mRefVariable || 11 == this.mRefVariable ? (c = c.mDataRelative, c[this.mRefVariable] || (c[this.mRefVariable] = 0), c[this.mRefVariable] = this.mValueData[d - 1] + a * this.mFractionData[d - 1]) : b[this.mRefVariable] = this.mValueData[d - 1] + a * this.mFractionData[d -
                        1];
                    12 == this.mRefVariable && (b[this.mRefVariable] = b[this.mRefVariable] + this.mInitValDispPos[0] - this.mInitPoint[0]);
                    13 == this.mRefVariable && (b[this.mRefVariable] = b[this.mRefVariable] + this.mInitValDispPos[1] - this.mInitPoint[1]);
                    17 == this.mRefVariable && (b[this.mRefVariable] = this.mValueData[d - 1]);
                    break
                }
            return !1
        };
        c.Effects.AnimateLinearInterpolate.prototype.applyCompletedEffectImpl = function(a, b, c) {
            10 == this.mRefVariable || 11 == this.mRefVariable ? (a = c.mDataRelative, a[this.mRefVariable] || (a[this.mRefVariable] = 0),
                a[this.mRefVariable] = this.mCompletedValue) : b[this.mRefVariable] = this.mCompletedValue;
            12 == this.mRefVariable && (b[this.mRefVariable] = b[this.mRefVariable] + this.mInitValDispPos[0] - this.mInitPoint[0]);
            13 == this.mRefVariable && (b[this.mRefVariable] = b[this.mRefVariable] + this.mInitValDispPos[1] - this.mInitPoint[1]);
            return !1
        };
        c.Effects.AnimateLinearInterpolateRelative = function(a, b, f, d, e) {
            c.Effects.AnimateLinearInterpolateRelative.baseConstructor.call(this, a, b, f, d, e);
            this.mRefVariable = Number(a.c0);
            a = this.transformValue(this.mRefVariable,
                Number(a.c2));
            this.mCompletedValue = this.mHasRewindEffect ? 0 : a;
            this.mChangeByPerTime = a / this.mDurationInMs
        };
        c.inherits(c.Effects.AnimateLinearInterpolateRelative, c.Effects.EffectBase);
        c.Effects.AnimateLinearInterpolateRelative.prototype.applyEffectImpl = function(a, b, c) {
            b = c.mDataRelative;
            b[this.mRefVariable] || (b[this.mRefVariable] = 0);
            b[this.mRefVariable] += this.mChangeByPerTime * a;
            return !1
        };
        c.Effects.AnimateLinearInterpolateRelative.prototype.applyCompletedEffectImpl = function(a, b, c) {
            a = c.mDataRelative;
            a[this.mRefVariable] ||
                (a[this.mRefVariable] = 0);
            a[this.mRefVariable] += this.mCompletedValue;
            return !1
        };
        c.Effects.AnimateLinearMultipleInterpolateRelative = function(a, b, f, d, e) {
            c.Effects.AnimateLinearMultipleInterpolateRelative.baseConstructor.call(this, a, b, f, d, e);
            this.mRefVariable = Number(a.c0);
            this.mCompletedValue = a.b6;
            this.mEffectFunc = 19 === this.mRefVariable ? this.applyEffectImpl : this.applyColorEffectImpl
        };
        c.inherits(c.Effects.AnimateLinearMultipleInterpolateRelative, c.Effects.EffectBase);
        c.Effects.AnimateLinearMultipleInterpolateRelative.prototype.applyEffectImpl =
            function(a, b, c) {
                b = c.mDataRelative;
                b[this.mRefVariable] || (b[this.mRefVariable] = [0, 0]);
                a /= this.mDurationInMs;
                1 < a && (a = 1);
                this.mHasRewindEffect && 1 <= a && (a = 0);
                var d, c = 1 + this.mCompletedValue[0] * a / 100;
                d = 1 + b[this.mRefVariable][0] / 100;
                b[this.mRefVariable][0] = 100 * (c * d - 1);
                c = 1 + this.mCompletedValue[1] * a / 100;
                d = 1 + b[this.mRefVariable][1] / 100;
                b[this.mRefVariable][1] = 100 * (c * d - 1);
                return !1
            };
        c.Effects.AnimateLinearMultipleInterpolateRelative.prototype.applyColorEffectImpl = function(a, b, c) {
            b = c.mDataRelative;
            c = c.mColorLengthData[this.mRefVariable];
            if (!b[this.mRefVariable]) {
                var d = [0, 0, 0];
                b[this.mRefVariable] = [];
                for (var e = 0; e < c; ++e) b[this.mRefVariable].push.apply(b[this.mRefVariable], d)
            }
            a /= this.mDurationInMs;
            1 < a && (a = 1);
            c *= 3;
            for (d = 0; d < c;) b[this.mRefVariable][d++] += ~~(this.mCompletedValue[0] * a), b[this.mRefVariable][d++] += ~~(this.mCompletedValue[1] * a), b[this.mRefVariable][d++] += ~~(this.mCompletedValue[2] * a);
            return !1
        };
        c.Effects.AnimateLinearMultipleInterpolateRelative.prototype.applyCompletedEffectImpl = function(a, b, c, d) {
            return this.mEffectFunc(this.mDurationInMs,
                b, c, d)
        };
        c.Effects.AnimateLinearMultipleInterpolateRelative.prototype.updateCompleteEffectStatusImpl = function() {
            this.mEffectFunc = 19 === this.mRefVariable ? this.applyEffectImpl : this.applyColorEffectImpl
        };
        c.Effects.AnimateFormula = function(a, b, f, d, e) {
            c.Effects.AnimateLinearInterpolate.baseConstructor.call(this, a, b, f, d, e);
            this.mRefVariable = Number(a.c0);
            this.mTimeData = [];
            this.mValueData = [];
            this.mFormulaData = [];
            a = a.b6;
            this.formula = [];
            this.formula[0] = Math.sin;
            this.formula[1] = Math.cos;
            this.formula[2] = Math.tan;
            this.formula[3] = Math.min;
            this.formula[4] = Math.max;
            this.formula[5] = Math.abs;
            if (a) {
                for (f = b = 0; f < a.length;) this.mTimeData.push(a[f++] * this.mDurationInMs / 100), this.mFormulaData[b] = [], e = a[f++], d = 0, "for" === e ? (this.mValueData.push("f"), e = a[f++], this.mFormulaData[b][d++] = e, this.mFormulaData[b][d++] = this.transformValue(this.mRefVariable, a[f++]), this.mFormulaData[b][d++] = this.formula[a[f++]], 1 < e && (this.mFormulaData[b][d++] = this.formula[a[f++]]), this.mFormulaData[b][d++] = a[f++], this.mFormulaData[b][d++] = a[f++],
                    0 < e && (this.mFormulaData[b][d++] = a[f++], 1 < e && (this.mFormulaData[b][d++] = a[f++], this.mFormulaData[b][d++] = a[f++], this.mFormulaData[b][d++] = a[f++], this.mFormulaData[b][d++] = a[f++], this.mFormulaData[b][d++] = a[f++]))) : this.mValueData.push(this.transformValue(this.mRefVariable, Number(e))), b++;
                a = 0;
                a = "f" === this.mValueData[0] ? this.applyFormula(0, 0) : this.mValueData[0];
                b = 0;
                b = "f" === this.mValueData[this.mValueData.length - 1] ? this.applyFormula(this.mValueData.length - 1, 1) : this.mValueData[this.mValueData.length - 1];
                this.mCompletedValue = this.mHasRewindEffect ? a : b
            } else this.mCompletedValue = 0
        };
        c.inherits(c.Effects.AnimateFormula, c.Effects.EffectBase);
        c.Effects.AnimateFormula.prototype.applyEffectImpl = function(a, b) {
            for (var c = 1; c < this.mTimeData.length; ++c)
                if (a < this.mTimeData[c]) {
                    var d = 0,
                        d = "f" === this.mValueData[c - 1] ? this.applyFormula(c - 1, a / this.mDurationInMs) : this.mValueData[c - 1];
                    b[this.mRefVariable] = 10 == this.mRefVariable || 11 == this.mRefVariable ? b[this.mRefVariable] * d : d;
                    break
                }
            return !1
        };
        c.Effects.AnimateFormula.prototype.applyCompletedEffectImpl =
            function(a, b) {
                b[this.mRefVariable] = 10 == this.mRefVariable || 11 == this.mRefVariable ? b[this.mRefVariable] * this.mCompletedValue : this.mCompletedValue;
                return !1
            };
        c.Effects.AnimateFormula.prototype.applyFormula = function(a, b) {
            var c = this.mFormulaData[a][2],
                d = 0;
            if (c) {
                if (0 == this.mFormulaData[a][0]) d = this.mFormulaData[a][3] * c(this.mFormulaData[a][4] * b);
                else if (1 == this.mFormulaData[a][0]) d = this.mFormulaData[a][3] - c(this.mFormulaData[a][4] * b) / this.mFormulaData[a][5];
                else if (2 == this.mFormulaData[a][0] || 3 == this.mFormulaData[a][0]) {
                    var e =
                        this.mFormulaData[a][3];
                    e && (d = -this.mFormulaData[a][5] * (this.mFormulaData[a][6] - b), d = c(d) * -this.mFormulaData[a][7], c = -this.mFormulaData[a][8] * (this.mFormulaData[a][9] - b), c = e(c) * -this.mFormulaData[a][10], d = 2 == this.mFormulaData[a][0] ? this.mFormulaData[a][4] + (d - c) * (this.mFormulaData[a][11] - b) : this.mFormulaData[a][4] + (d + c) * (this.mFormulaData[a][11] - b))
                }
                d *= this.mFormulaData[a][1]
            }
            return d
        };
        c.Effects.AnimateSound = function(a, b, f, d, e) {
            c.Effects.AnimateSound.baseConstructor.call(this, a, b, f, d, e);
            this.mSoundId =
                a.h9;
            this.mIsSubAnim = a.j0 ? !0 : !1;
            this.mInitialized = !1;
            this.mInMainTimeLine = !f;
            this.mPrevPaused = !1
        };
        c.inherits(c.Effects.AnimateSound, c.Effects.EffectBase);
        c.Effects.AnimateSound.prototype.destroy = function() {
            this.mAudioDt.pauseAudio();
            c.Effects.AnimateSound.superClass.destroy.call(this)
        };
        c.Effects.AnimateSound.prototype.applyEffectImpl = function(a) {
            if (!1 == this.mInitialized) {
                try {
                    this.mAudioDt = c.am.GetAudio(c.instanceManager[this.mTargetObjectName].m_Parent.m_PptxSlideItemObj.mdi, this.mSoundId)
                } catch (b) {}
                this.mInitialized = !0;
                if (void 0 == this.mAudioDt) return !1;
                this.mInMainTimeLine || (this.mAudioDt.triggered = !0, void 0 != this.mTriggerObject && (this.mAudioDt.mTriggerObject = this.mTriggerObject));
                c.am.PauseAllSubAnim();
                this.mAudioDt.playAudio(a, this.mInMainTimeLine, this.mIsSubAnim);
                this.mAudioDt.curParent = this.mTargetObjectName
            }
            if (void 0 == this.mAudioDt || this.mAudioDt.triggered) return !1;
            if (this.mInMainTimeLine)
                if (cp.getCpIsPlaying()) {
                    if (this.mPrevPaused || this.mAudioDt.seekReset) c.am.PauseAllSubAnim(), this.mAudioDt.playAudio(a,
                        this.mInMainTimeLine, this.mIsSubAnim), this.mAudioDt.curParent = this.mTargetObjectName;
                    this.mPrevPaused = !1
                } else this.mPrevPaused || this.mAudioDt.pauseAudio(), this.mPrevPaused = !0;
            return !1
        };
        c.Effects.AnimateSound.prototype.applyCompletedEffectImpl = function(a) {
            if (!this.mAudioDt || void 0 == this.mAudioDt.nativeAudio || this.mAudioDt.triggered) return !1;
            a = (a / 1E3).toFixed(3);
            void 0 != this.mAudioDt.curParent && this.mAudioDt.curParent == this.mTargetObjectName && this.mAudioDt.nativeAudio.duration < a && this.mAudioDt.pauseAudio();
            return !1
        };
        c.Effects.AnimateMotionPath = function(a, b, f, d, e) {
            c.Effects.AnimateMotionPath.baseConstructor.call(this, a, b, f, d, e);
            this.mSVGPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            this.mSVGPath.setAttribute("d", a.b6);
            this.mRevDir = a.h7 ? !0 : !1;
            this.mPathLength = this.mSVGPath.getTotalLength();
            a = this.mRevDir ? 0 : 1;
            a = this.mHasRewindEffect ? 1 - a : a;
            a = this.mSVGPath.getPointAtLength(this.mPathLength * a);
            this.mCompletedXValue = a.x;
            this.mCompletedYValue = a.y;
            this.mSlideWidth = s.data.project.w;
            this.mSlideHeight =
                s.data.project.h
        };
        c.inherits(c.Effects.AnimateMotionPath, c.Effects.EffectBase);
        c.Effects.AnimateMotionPath.prototype.destroy = function() {
            c.Effects.AnimateMotionPath.superClass.destroy.call(this);
            this.mSVGPath = null
        };
        c.Effects.AnimateMotionPath.prototype.applyEffectImpl = function(a, b, c, d) {
            a /= this.mDurationInMs;
            this.mRevDir && (a = 1 - a);
            a = this.mSVGPath.getPointAtLength(this.mPathLength * a);
            b[12] = d[12] + this.mSlideWidth * a.x;
            b[13] = d[13] + this.mSlideHeight * a.y;
            return !1
        };
        c.Effects.AnimateMotionPath.prototype.applyCompletedEffectImpl =
            function(a, b, c, d) {
                b[12] = d[12] + this.mSlideWidth * this.mCompletedXValue;
                b[13] = d[13] + this.mSlideHeight * this.mCompletedYValue;
                return !1
            };
        c.Effects.AnimateColor = function(a, b, f, d, e) {
            c.Effects.AnimateColor.baseConstructor.call(this, a, b, f, d, e);
            this.mRefVariable = Number(a.c0);
            this.mCompletedValue = a.b6
        };
        c.inherits(c.Effects.AnimateColor, c.Effects.EffectBase);
        c.Effects.AnimateColor.prototype.applyEffectImpl = function(a, b, c) {
            c.mColorRedraw[this.mRefVariable] || (b[this.mRefVariable] = b[this.mRefVariable].slice(0));
            for (var a = a / this.mDurationInMs, d = 1 - a, e = b[this.mRefVariable].length, g = 0; g < e;) b[this.mRefVariable][g] = ~~(Number(b[this.mRefVariable][g++]) * d + this.mCompletedValue[0] * a), b[this.mRefVariable][g] = ~~(Number(b[this.mRefVariable][g++]) * d + this.mCompletedValue[1] * a), b[this.mRefVariable][g] = ~~(Number(b[this.mRefVariable][g++]) * d + this.mCompletedValue[2] * a), b[this.mRefVariable][g] = ~~(Number(b[this.mRefVariable][g++]) * d + this.mCompletedValue[3] * a);
            c.mColorRedraw[this.mRefVariable] = 1;
            return !1
        };
        c.Effects.AnimateColor.prototype.applyCompletedEffectImpl =
            function(a, b, c) {
                c.mColorRedraw[this.mRefVariable] || (b[this.mRefVariable] = b[this.mRefVariable].slice(0));
                for (var a = b[this.mRefVariable].length, d = 0; d < a;) b[this.mRefVariable][d++] = this.mCompletedValue[0], b[this.mRefVariable][d++] = this.mCompletedValue[1], b[this.mRefVariable][d++] = this.mCompletedValue[2], b[this.mRefVariable][d++] = this.mCompletedValue[3];
                c.mColorRedraw[this.mRefVariable] = 1;
                return !1
            };
        c.Effects.EffectBaseShape = function(a, b, f, d, e) {
            c.Effects.EffectBaseShape.baseConstructor.call(this, a, b, f,
                d, e);
            this.mPresetClass = Number(a.b9);
            this.mDirection = Number(a.b8);
            this.mOneMinusPercent = this.mRedraw = !1
        };
        c.inherits(c.Effects.EffectBaseShape, c.Effects.EffectBase);
        c.Effects.EffectBaseShape.prototype.applyEffectImpl = function(a) {
            this.mMaskCurrentTime = a;
            1 === this.mPresetClass && (this.mResetMask = !0);
            return !0
        };
        c.Effects.EffectBaseShape.prototype.applyMask = function(a, b, f, d) {
            return this.mCompleted && !this.mHasRewindEffect && 1 === this.mPresetClass ? (a.clearRect(0, 0, f, d), !0) : c.Effects.EffectBaseShape.superClass.applyMask.call(this,
                a, b, f, d)
        };
        c.Effects.EffectBaseShape.prototype.applyCompletedEffectImpl = function() {
            1 === this.mPresetClass && (this.mResetMask = !0);
            if (!this.mRedraw) return !1;
            this.mRedraw = !1;
            return !0
        };
        c.Effects.EffectBaseShape.prototype.updateCompleteEffectStatusImpl = function() {
            this.mRedraw = !0
        };
        c.Effects.AnimateWipe = function(a, b, f, d, e) {
            c.Effects.AnimateWipe.baseConstructor.call(this, a, b, f, d, e);
            if (1 === this.mPresetClass) switch (this.mDirection) {
                case 0:
                    this.mDirection = 1;
                    break;
                case 1:
                    this.mDirection = 0;
                    break;
                case 2:
                    this.mDirection =
                        3;
                    break;
                case 3:
                    this.mDirection = 2
            } else this.mOneMinusPercent = !0
        };
        c.inherits(c.Effects.AnimateWipe, c.Effects.EffectBaseShape);
        c.Effects.AnimateWipe.prototype.applyMaskImpl = function(a, b, c, d, e) {
            switch (this.mDirection) {
                case 0:
                    a *= d;
                    b.clearRect(d - a, 0, a, e);
                    break;
                case 1:
                    b.clearRect(0, 0, d * a, e);
                    break;
                case 2:
                    b.clearRect(0, 0, d, e * a);
                    break;
                case 3:
                    a *= e, b.clearRect(0, e - a, d, a)
            }
            return !0
        };
        c.Effects.AnimateBlinds = function(a, b, f, d, e) {
            c.Effects.AnimateBlinds.baseConstructor.call(this, a, b, f, d, e);
            1 === this.mPresetClass && (this.mOneMinusPercent = !0)
        };
        c.inherits(c.Effects.AnimateBlinds, c.Effects.EffectBaseShape);
        c.Effects.AnimateBlinds.prototype.applyMaskImpl = function(a, b, c, d, e) {
            c = 6;
            if (8 === this.mDirection) {
                for (var g = e / 6, a = g * a, e = e - g + a, a = g - a; 0 < c--;) b.clearRect(0, e, d, a), e -= g;
                return !0
            }
            g = d / 6;
            a *= g;
            d = d - g + a;
            for (a = g - a; 0 < c--;) b.clearRect(d, 0, a, e), d -= g;
            return !0
        };
        c.Effects.AnimateRandomBars = function(a, b, f, d, e) {
            c.Effects.AnimateRandomBars.baseConstructor.call(this, a, b, f, d, e);
            0 === this.mPresetClass && (this.mOneMinusPercent = !0);
            this.mRectArray = [];
            for (a = 101; --a;) this.mRectArray.push(a /
                100);
            this.randomizeArray(this.mRectArray)
        };
        c.inherits(c.Effects.AnimateRandomBars, c.Effects.EffectBaseShape);
        c.Effects.AnimateRandomBars.prototype.randomizeArray = function(a) {
            for (var b, c, d = a.length; d--;) c = Math.floor(Math.random() * (d + 1)), b = a[c], a[c] = a[d], a[d] = b
        };
        c.Effects.AnimateRandomBars.prototype.applyMaskImpl = function(a, b, c, d, e) {
            a = Math.round(100 * a);
            if (9 == this.mDirection) {
                c = Math.round(d / 100);
                for (1 > c && (c = 1); a--;) b.clearRect(Math.round(this.mRectArray[a] * d), 0, c, e);
                return !0
            }
            c = Math.round(e / 100);
            for (1 >
                c && (c = 1); a--;) b.clearRect(0, Math.round(this.mRectArray[a] * e), d, c);
            return !0
        };
        c.Effects.AnimateCheckerBoard = function(a, b, f, d, e) {
            c.Effects.AnimateCheckerBoard.baseConstructor.call(this, a, b, f, d, e);
            1 === this.mPresetClass && (this.mOneMinusPercent = !0)
        };
        c.inherits(c.Effects.AnimateCheckerBoard, c.Effects.EffectBaseShape);
        c.Effects.AnimateCheckerBoard.prototype.applyMaskImpl = function(a, b, c, d, e) {
            (c = this.mOneMinusPercent ? 0.5 < a : 0.5 > a) || (a -= 0.5);
            var g = 0,
                h = 0;
            if (8 === this.mDirection)
                for (var i = d / 12, j = Math.ceil(e / 6),
                        k = i, l = j, e = 0, k = i * a, e = c ? 2 * (i - k) : i - 2 * k, a = 0; 6 > a; ++a) {
                    0 === a % 2 ? g = c ? 2 * k : i + 2 * k : c ? (b.clearRect(0, h, i, j), g = i + 2 * k) : g = 2 * k;
                    for (; g < d;) b.clearRect(g, h, e, l), g += 2 * i;
                    h += j
                } else {
                    i = Math.ceil(d / 6);
                    j = e / 12;
                    k = i;
                    d = 0;
                    l = j * a;
                    d = c ? 2 * (j - l) : j - 2 * l;
                    for (a = 0; 12 > a; ++a) {
                        0 === a % 2 ? h = c ? 2 * l : j + 2 * l : c ? (b.clearRect(g, 0, i, j), h = j + 2 * l) : h = 2 * l;
                        for (; h < e;) b.clearRect(g, h, k, d), h += 2 * j;
                        g += i
                    }
                }
            return !0
        };
        c.Effects.AnimateDissolve = function(a, b, f, d, e) {
            c.Effects.AnimateDissolve.baseConstructor.call(this, a, b, f, d, e);
            this.mRectArray = [];
            this.mSimpleDissolveInitDone =
                this.mSimpleDissolve = !1;
            a = 200;
            a = 400;
            for (b = 0; b < a; ++b) this.mRectArray.push(b);
            c.Effects.AnimateRandomBars.prototype.randomizeArray.call(this, this.mRectArray);
            0 === this.mPresetClass && (this.mOneMinusPercent = !0)
        };
        c.inherits(c.Effects.AnimateDissolve, c.Effects.EffectBaseShape);
        c.Effects.AnimateDissolve.prototype.applyMaskImpl = function(a, b, f, d, e) {
            if (!1 == this.mSimpleDissolveInitDone)
                if (this.mSimpleDissolve = !1, this.mSimpleDissolveInitDone = !0, A) this.mSimpleDissolve = !0;
                else try {
                    b.getImageData(0, 0, d, e)
                } catch (g) {
                    this.mSimpleDissolve = !0
                }
            if (this.mSimpleDissolve) {
                var f = Math.ceil(d / 20),
                    h = Math.ceil(e / 20);
                if (0.5 > a)
                    for (a = ~~(400 * a); a--;) {
                        var i = this.mRectArray[a],
                            j = Math.floor(i / 20) * h,
                            k = i % 20 * f;
                        b.clearRect(k, j, f, h)
                    } else {
                        var a = ~~(400 * a),
                            f = Math.ceil(5),
                            h = Math.ceil(5),
                            l = c.animationManager.mTempCanvas,
                            m = c.animationManager.mTempCanvasContext;
                        l.width = 100;
                        l.height = 100;
                        for (m.beginPath(); a--;) i = this.mRectArray[a], k = i % 20 * f, j = Math.floor(i / 20) * h, m.rect(k, j, f, h);
                        m.fill();
                        b.globalCompositeOperation = "destination-out";
                        b.drawImage(l, 0, 0, d, e)
                    }
                return !0
            }
            f =
                d * e;
            a = Math.round(a * f);
            f = Math.ceil(f / 200);
            d = b.getImageData(0, 0, d, e);
            e = d.data;
            a = Math.ceil(a / f);
            h = 3;
            for (i = 0; i < f; ++i) {
                j = this.mRectArray[i] || this.mRectArray[i % 200];
                h += 800;
                for (k = 0; k < a; ++k) e[h + 4 * this.mRectArray[(j + k) % 200]] = 0
            }
            b.putImageData(d, 0, 0);
            return !0
        };
        c.Effects.AnimateSplit = function(a, b, f, d, e) {
            c.Effects.AnimateSplit.baseConstructor.call(this, a, b, f, d, e);
            if (1 == this.mPresetClass) switch (this.mDirection) {
                case 10:
                    this.mDirection = 12;
                    break;
                case 12:
                    this.mDirection = 10;
                    break;
                case 11:
                    this.mDirection = 13;
                    break;
                case 13:
                    this.mDirection =
                        11
            } else this.mOneMinusPercent = !0
        };
        c.inherits(c.Effects.AnimateSplit, c.Effects.EffectBaseShape);
        c.Effects.AnimateSplit.prototype.applyMaskImpl = function(a, b, c, d, e) {
            switch (this.mDirection) {
                case 10:
                    return a *= e, b.clearRect(0, (e - a) / 2, d, a), !0;
                case 11:
                    return a *= d, b.clearRect((d - a) / 2, 0, a, e), !0;
                case 12:
                    return a = e * a / 2, b.clearRect(0, 0, d, a), b.clearRect(0, e - a, d, a), !0;
                case 13:
                    return a = d * a / 2, b.clearRect(0, 0, a, e), b.clearRect(d - a, 0, a, e), !0
            }
            return !1
        };
        c.Effects.AnimateStripes = function(a, b, f, d, e) {
            c.Effects.AnimateStripes.baseConstructor.call(this,
                a, b, f, d, e);
            this.mCompositeOperation = "destination-in";
            this.mOneMinusPercent = !0;
            switch (this.mDirection) {
                case 4:
                case 6:
                    this.mCompositeOperation = "destination-out", this.mOneMinusPercent = !1
            }
            1 === this.mPresetClass && (this.mOneMinusPercent = !this.mOneMinusPercent);
            this.mTempCanvas = document.createElement("canvas")
        };
        c.inherits(c.Effects.AnimateStripes, c.Effects.EffectBaseShape);
        c.Effects.AnimateStripes.prototype.destroy = function() {
            c.Effects.AnimateStripes.superClass.destroy.call(this);
            this.mTempCanvas = null
        };
        c.Effects.AnimateStripes.prototype.applyMaskImpl =
            function(a, b, c, d, e) {
                c = 2 * d;
                if (this.mTempCanvas.width != c || this.mTempCanvas.width != e) {
                    this.mTempCanvas.width = 2 * d;
                    this.mTempCanvas.height = e;
                    var g = this.mTempCanvas.getContext("2d"),
                        h = Math.ceil(d / 16),
                        i = Math.ceil(e / 16);
                    g.fillRect(0, 0, d, e);
                    g.translate(d, 0);
                    d = !1;
                    switch (this.mDirection) {
                        case 4:
                        case 7:
                            d = !0
                    }
                    e = 16;
                    if (d)
                        for (; e--;) g.fillRect(0, i * e, h * (16 - e), i);
                    else
                        for (; e--;) g.fillRect(0, i * e, h * (e + 1), i)
                }
                b.globalCompositeOperation = this.mCompositeOperation;
                b.drawImage(this.mTempCanvas, -c * a, 0);
                return !1
            };
        c.Effects.AnimateWheel =
            function(a, b, f, d, e) {
                c.Effects.AnimateWheel.baseConstructor.call(this, a, b, f, d, e);
                this.mSpokes = Number(a.b7);
                this.mAnglePerSpoke = 2 * Math.PI / this.mSpokes;
                this.mCompositeOperation = 1 === this.mPresetClass ? "destination-out" : "destination-in";
                this.mMaxDimension = this.mCachedHeight = this.mCachedWidth = 0
            };
        c.inherits(c.Effects.AnimateWheel, c.Effects.EffectBaseShape);
        c.Effects.AnimateWheel.prototype.applyMaskImpl = function(a, b, f, d, e) {
            a *= this.mAnglePerSpoke;
            if (this.mCachedWidth !== d || this.mCachedHeight !== e) this.mMaxDimension =
                Math.sqrt(Math.pow(d / 2, 2) + Math.pow(e / 2, 2)), this.mCachedWidth = d, this.mCachedHeight = e;
            var f = c.animationManager.mTempCanvas,
                g = c.animationManager.mTempCanvasContext;
            f.width = f.height = this.mMaxDimension;
            g.save();
            g.translate(this.mMaxDimension / 2, this.mMaxDimension / 2);
            g.beginPath();
            for (var h = 0; h < this.mSpokes; ++h) {
                var i = this.mAnglePerSpoke * h + -1.5708;
                g.moveTo(0, 0);
                g.arc(0, 0, this.mMaxDimension, i, i + a, !1)
            }
            g.fill();
            g.restore();
            b.globalCompositeOperation = this.mCompositeOperation;
            b.drawImage(f, 0, 0, d, e);
            return !0
        };
        c.Effects.AnimateWedge = function(a, b, f, d, e) {
            c.Effects.AnimateWedge.baseConstructor.call(this, a, b, f, d, e);
            this.mCompositeOperation = 1 === this.mPresetClass ? "destination-out" : "destination-in";
            this.mMaxDimension = this.mCachedHeight = this.mCachedWidth = 0
        };
        c.inherits(c.Effects.AnimateWedge, c.Effects.EffectBaseShape);
        c.Effects.AnimateWedge.prototype.applyMaskImpl = function(a, b, f, d, e) {
            a *= Math.PI;
            if (this.mCachedWidth !== d || this.mCachedHeight !== e) this.mMaxDimension = Math.sqrt(Math.pow(d / 2, 2) + Math.pow(e / 2, 2)), this.mCachedWidth =
                d, this.mCachedHeight = e;
            var f = c.animationManager.mTempCanvas,
                g = c.animationManager.mTempCanvasContext;
            f.width = f.height = this.mMaxDimension;
            g.translate(this.mMaxDimension / 2, this.mMaxDimension / 2);
            g.moveTo(0, 0);
            g.arc(0, 0, this.mMaxDimension, -1.5708 - a, -1.5708 + a, !1);
            g.fill();
            b.globalCompositeOperation = this.mCompositeOperation;
            b.drawImage(f, 0, 0, d, e);
            return !0
        };
        c.Effects.AnimateShape = function(a, b, f, d, e) {
            c.Effects.AnimateShape.baseConstructor.call(this, a, b, f, d, e);
            this.mOneMinusPercent = !1;
            if (1 == this.mPresetClass) switch (this.mDirection) {
                case 14:
                    this.mDirection =
                        15;
                    this.mOneMinusPercent = !0;
                    break;
                case 15:
                    this.mDirection = 14
            } else 14 === this.mDirection && (this.mOneMinusPercent = !0);
            this.mCompositeOperation = 14 === this.mDirection ? "destination-out" : "destination-in";
            this.mNeedAnotherCanvas = "destination-in" === this.mCompositeOperation && z
        };
        c.inherits(c.Effects.AnimateShape, c.Effects.EffectBaseShape);
        c.Effects.AnimateBox = function(a, b, f, d, e) {
            c.Effects.AnimateBox.baseConstructor.call(this, a, b, f, d, e)
        };
        c.inherits(c.Effects.AnimateBox, c.Effects.AnimateShape);
        c.Effects.AnimateBox.prototype.applyMaskImpl =
            function(a, b, f, d, e) {
                f = d * a;
                a *= e;
                b.globalCompositeOperation = this.mCompositeOperation;
                if (this.mNeedAnotherCanvas) {
                    var g = c.animationManager.mTempCanvas;
                    g.width = d;
                    g.height = e;
                    c.animationManager.mTempCanvasContext.fillRect((d - f) / 2, (e - a) / 2, f, a);
                    b.drawImage(g, 0, 0)
                } else b.fillRect((d - f) / 2, (e - a) / 2, f, a);
                return !0
            };
        c.Effects.AnimateDiamond = function(a, b, f, d, e) {
            c.Effects.AnimateDiamond.baseConstructor.call(this, a, b, f, d, e)
        };
        c.inherits(c.Effects.AnimateDiamond, c.Effects.AnimateShape);
        c.Effects.AnimateDiamond.prototype.applyMaskImpl =
            function(a, b, f, d, e) {
                f = d * a;
                a *= e;
                b.globalCompositeOperation = this.mCompositeOperation;
                if (this.mNeedAnotherCanvas) {
                    var g = c.animationManager.mTempCanvas;
                    g.width = d;
                    g.height = e;
                    var d = d / 2,
                        e = e / 2,
                        h = c.animationManager.mTempCanvasContext;
                    h.beginPath();
                    h.moveTo(d - f, e);
                    h.lineTo(d, e - a);
                    h.lineTo(d + f, e);
                    h.lineTo(d, e + a);
                    h.fill();
                    b.drawImage(g, 0, 0)
                } else d /= 2, e /= 2, b.beginPath(), b.moveTo(d - f, e), b.lineTo(d, e - a), b.lineTo(d + f, e), b.lineTo(d, e + a), b.fill();
                return !0
            };
        c.Effects.AnimateCircle = function(a, b, f, d, e) {
            c.Effects.AnimateCircle.baseConstructor.call(this,
                a, b, f, d, e)
        };
        c.inherits(c.Effects.AnimateCircle, c.Effects.AnimateShape);
        c.Effects.AnimateCircle.prototype.applyMaskImpl = function(a, b, f, d, e) {
            f = 0.7071 * d * a;
            a = 0.7071 * e * a;
            b.globalCompositeOperation = this.mCompositeOperation;
            if (this.mNeedAnotherCanvas) {
                var g = c.animationManager.mTempCanvas;
                g.width = d;
                g.height = e;
                var d = d / 2,
                    e = e / 2,
                    h = c.animationManager.mTempCanvasContext;
                h.beginPath();
                h.translate(d - f, e - a);
                h.scale(f, a);
                h.arc(1, 1, 1, 0, 6.283185, !1);
                h.fill();
                b.drawImage(g, 0, 0)
            } else d /= 2, e /= 2, b.save(), b.beginPath(), b.translate(d -
                f, e - a), b.scale(f, a), b.arc(1, 1, 1, 0, 6.283185, !1), b.fill(), b.restore();
            return !0
        };
        c.Effects.AnimatePlus = function(a, b, f, d, e) {
            c.Effects.AnimatePlus.baseConstructor.call(this, a, b, f, d, e)
        };
        c.inherits(c.Effects.AnimatePlus, c.Effects.AnimateShape);
        c.Effects.AnimatePlus.prototype.applyMaskImpl = function(a, b, f, d, e) {
            a = a / 2 + 0.5;
            f = d * a;
            a *= e;
            b.globalCompositeOperation = this.mCompositeOperation;
            if (this.mNeedAnotherCanvas) {
                var g = c.animationManager.mTempCanvas;
                g.width = d;
                g.height = e;
                var h = c.animationManager.mTempCanvasContext;
                h.beginPath();
                h.moveTo(0, a);
                h.lineTo(f, a);
                h.lineTo(f, 0);
                h.lineTo(d - f, 0);
                h.lineTo(d - f, a);
                h.lineTo(d, a);
                h.lineTo(d, e - a);
                h.lineTo(d - f, e - a);
                h.lineTo(d - f, e);
                h.lineTo(f, e);
                h.lineTo(f, e - a);
                h.lineTo(0, e - a);
                h.fill();
                b.drawImage(g, 0, 0)
            } else b.beginPath(), b.moveTo(0, a), b.lineTo(f, a), b.lineTo(f, 0), b.lineTo(d - f, 0), b.lineTo(d - f, a), b.lineTo(d, a), b.lineTo(d, e - a), b.lineTo(d - f, e - a), b.lineTo(d - f, e), b.lineTo(f, e), b.lineTo(f, e - a), b.lineTo(0, e - a), b.fill();
            return !0
        };
        c.animationManager = new c.PptxAnimationManager;
        var o = function(a) {
            void 0 !=
                a && (void 0 != ENABLE_PPTX_LOGS ? console.log(a) : j.log(a))
        };
        c.PPTX_SLIDE_ITEM_TYPE = 251658241;
        c.PptxObjCreator = function(a, b) {
            return c.PPTX_SLIDE_ITEM_TYPE == a ? (b.elemType = "div", b.classType = "cp-pptxSlideItem", b.rewrap = !0) : !1
        };
        c.PptxStageClickHandler = function() {
            return !1
        };
        c.SetBounds = function(a, b) {
            a.left = b[0];
            a.top = b[1];
            a.style.left = b[0] + "px";
            a.style.top = b[1] + "px";
            a.style.position = "absolute";
            return a.width != b[2] || a.height != b[3] ? (a.width = b[2], a.height = b[3], a.style.width = b[2] + "px", a.style.height = b[3] + "px", !0) :
                !1
        };
        c.SetCanvasBounds = function(a, b, f) {
            c.SetBounds(a, f) || b.clearRect(0, 0, f[2], f[3])
        };
        c.initializePPTXLibrary = function() {
            j = cp;
            s = cp.model;
            w = cp.DisplayObject;
            z = j.browser === j.SAFARI;
            A = j.device === j.IDEVICE;
            c.instanceManager = c.instanceManager;
            c.PptxSlideItem = function(a) {
                try {
                    c.currentTabIndex = 0;
                    c.PptxSlideItem.baseConstructor.call(this, a);
                    var b = s.data[a.id];
                    this.m_PptxSlideItemId = b.dn;
                    this.m_PptxSlideItemObj = s.data[this.m_PptxSlideItemId];
                    this.m_SlideStartFrame = this.m_PptxSlideItemObj.from;
                    this.m_SlideStartTime =
                        1E3 * this.m_SlideStartFrame / cp.getCpInfoOriginalFPS();
                    if ("j3" in b && "j4" in b) {
                        var f = b.j3,
                            d = b.j4,
                            e = Math.abs(f - s.data.project.iw),
                            g = Math.abs(d - s.data.project.ih),
                            h = JSON.parse(JSON.stringify(s.data.project.prm));
                        if (1 < e || 1 < g) {
                            var i = s.data.project.ih / d;
                            h[0] *= s.data.project.iw / f;
                            h[1] *= i
                        }
                        c.transformer.Scale(h[0], h[1]);
                        c.transformer.Transform(h[2], h[3]);
                        void 0 == c.mSlideScaled[this.m_PptxSlideItemId] ? (c.mSlideScaled[this.m_PptxSlideItemId] = 1, c.transformer.SetCanModifyActuals(!0)) : c.transformer.SetCanModifyActuals(!1)
                    }
                    c.animationManager.resetData(b.g4.a1,
                        b.g4.a2, this.m_PptxSlideItemObj.to - this.m_SlideStartFrame, cp.getCpInfoOriginalFPS, cp.getCpInfoSpeed, cp.movie.stage.m_SlideHasEffects);
                    var q = b.g4.c3,
                        k;
                    for (k in q) c.instanceManager[k] = new c.PptxTriggeringDisplayItem(k, q[k]);
                    this.m_OnStageClicks = {};
                    this.m_PausedonFrame = -1;
                    var l = b.g4.a1;
                    if (void 0 != l)
                        for (var m = 1; m < l.length; ++m) {
                            var r = this.m_SlideStartFrame + c.TimeInMSToFrameNumber(l[m][0]) - 1;
                            this.m_OnStageClicks[r] = r;
                            j.AddNoSkipFrameExternal(r)
                        }
                    this.m_PptxSlideItemC = null;
                    void 0 != this.m_PptxSlideItemObj &&
                        (this.m_PptxSlideItemC = s.data[this.m_PptxSlideItemObj.mdi]);
                    this.m_PptxSlideItemParentDiv = document.getElementById("re-" + this.m_PptxSlideItemId + "c");
                    c.SetBounds(this.m_PptxSlideItemParentDiv, this.m_PptxSlideItemC.b);
                    this.m_PptxSlideItemParentDiv.onclick = c.ObjClickHandler;
                    var p = document.getElementById(this.m_PptxSlideItemId);
                    p && c.SetBounds(p, [0, 0, 0, 0]);
                    this.m_PptxSlideItemDiv = p;
                    this.m_ActionList = "g5" in b ? b.g5 : [];
                    var t = this.m_PptxSlideItemC.c9;
                    this.m_PptxSlideObjs = [];
                    for (m = 0; m < t.length; ++m) {
                        var u = t[m].d1,
                            v = t[m].d2,
                            n = this.m_PptxSlideItemC[u];
                        if (void 0 != n && null != n) {
                            var w = c.PptxObjFactory(u, v, n, this);
                            this.m_PptxSlideObjs.push(w);
                            c.instanceManager[u] = w
                        }
                    }
                } catch (y) {
                    o(y), y.stack && o(y.stack)
                }
                c.animationManager.start()
            };
            c.inherits(c.PptxSlideItem, w);
            c.PptxSlideItem.prototype.appendChild = function(a) {
                this.element.appendChild(a)
            };
            c.PptxSlideItem.prototype.removeChild = function(a) {
                this.element.removeChild(a)
            };
            c.PptxSlideItem.prototype.forEachPptxChild = function() {};
            c.PptxSlideItem.prototype.updateFrame = function() {
                var a = !0;
                void 0 != this.m_OnStageClicks[cpInfoCurrentFrame] ? this.m_PausedonFrame != cpInfoCurrentFrame ? (this.m_PausedonFrame = cpInfoCurrentFrame, j.movie.pause(j.ReasonForPause.PPTX_PAUSE_FOR_ONCLICK_ANIMATION)) : a = !1 : this.m_PausedonFrame = -1;
                a && this.DrawChildrens()
            };
            c.PptxSlideItem.prototype.GetActionObjFromIndex = function(a) {
                return 0 <= a && this.m_ActionList.length > a ? this.m_ActionList[a] : null
            };
            c.PptxSlideItem.prototype.start = function() {
                this.DrawChildrens();
                this.updateFrame()
            };
            c.mSeekReset = !1;
            c.PptxSlideItem.prototype.DrawChildrens =
                function() {
                    try {
                        this.m_CurrentFrame = cpInfoCurrentFrame;
                        for (var a = 0; a < this.m_PptxSlideObjs.length; ++a) this.m_PptxSlideObjs[a].DrawIfNeeded(this.m_CurrentFrame)
                    } catch (b) {
                        o(b), b.stack && o(b.stack)
                    }
                };
            c.PptxSlideItem.prototype.reset = function(a) {
                try {
                    c.am.StopAllAudios(), void 0 != a && !0 == a && this.OnPptxSlideExit()
                } catch (b) {
                    o(b), b.stack && o(b.stack)
                }
            };
            c.PptxSlideItem.prototype.OnPptxSlideExit = function() {
                for (var a = 0; a < this.m_PptxSlideObjs.length; ++a) this.m_PptxSlideObjs[a].resetObj(), delete this.m_PptxSlideObjs[a];
                this.m_PptxSlideItemParentDiv = this.m_PptxSlideItemC = this.m_PptxSlideItemC = this.m_PptxSlideItemObj = this.m_PptxSlideItemId = this.m_PptxSlideObjs = null;
                c.animationManager.resetData();
                c.instanceManager = {};
                c.am.StopAllAudios()
            };
            c.PptxSlideItem.prototype.getPPTXSlideItemData = function(a) {
                return this.m_PptxSlideItemC[a]
            };
            c.PptxSlideItem.prototype.delegateClick = function(a, b, c) {
                for (var d = -1, e = !1, g = 0; g < this.m_PptxSlideObjs.length; ++g)
                    if (this.m_PptxSlideObjs[g].m_Name == a.m_Name) {
                        d = g;
                        break
                    }
                for (g = d - 1; 0 <= g && !(a = {
                        m_X: 0,
                        m_Y: 0
                    }, this.m_PptxSlideObjs[g].isPointInItem(b, c, a) && (e = this.m_PptxSlideObjs[g].onClick(a))); --g);
                return e
            };
            j.RegisterExternalObjects("pptxSlideItem", c.PptxSlideItem, c.PptxObjCreator, c.PptxStageClickHandler);
            c.PptxDisplayItem = function(a, b, f) {
                var d = this.initializeAnimatableDisplayData(b.f5, b.h6, !0);
                this.m_BBox = c.transformer.BBox(b.f5);
                var e = "";
                void 0 != b.b5 && (e = b.b5);
                c.PptxDisplayItem.baseConstructor.call(this, a, b, d, e);
                d.destroy();
                this.m_Name = a;
                this.m_Parent = f;
                this.m_TransformMatrix = null;
                this.m_DrawingC =
                    document.createElement("canvas");
                this.m_DrawingC.id = a;
                this.m_DrawingC.parentObj = this;
                this.m_Context = this.m_DrawingC.getContext("2d");
                this.m_accesibilityInfo = null;
                if ("j5" in b) {
                    this.m_accesibilityInfo = b.j5;
                    b = this.m_accesibilityInfo.length;
                    for (f = 0; f < b; ++f) {
                        e = this.m_accesibilityInfo[f];
                        d = document.createElement("div");
                        d.id = this.m_Parent.m_PptxSlideItemId + a + "_acc" + f;
                        d.style.left = e.f5[0] + "px";
                        d.style.top = e.f5[1] + "px";
                        d.style.width = e.f5[2] - e.f5[0] + "px";
                        d.style.height = e.f5[3] - e.f5[1] + "px";
                        d.style.position =
                            "absolute";
                        d.tabIndex = 0;
                        var g = " Clickable"; - 1 == e.h4 && (g = " graphic");
                        if (j.browser === j.CHROME) d.setAttribute("role", "document"), d.setAttribute("aria-label", e.i9 + g);
                        else if (j.browser === j.MSIE) {
                            var h = document.createElement("p");
                            h.textContent = e.i9 + g;
                            g = document.createElement("div");
                            g.id = this.m_Parent.m_PptxSlideItemId + a + "_accTempText" + f;
                            g.style.opacity = 0;
                            g.appendChild(h);
                            d.appendChild(g)
                        } else -1 != e.h4 ? d.setAttribute("role", "button") : d.setAttribute("role", "img"), d.setAttribute("aria-label", e.i9);
                        d.parentObj =
                            this;
                        if (-1 != e.h4 && (e = this.m_Parent.GetActionObjFromIndex(e.h4))) d.ActionInfo = e, d.onkeypress = c.ObjKeyPressHandler;
                        d.onclick = c.ObjClickHandler;
                        this.m_Parent.m_PptxSlideItemDiv.appendChild(d)
                    }
                }
                c.SetCanvasBounds(this.m_DrawingC, this.m_Context, [this.m_BBox[0], this.m_BBox[1], this.m_BBox[2] - this.m_BBox[0], this.m_BBox[3] - this.m_BBox[1]]);
                this.m_Parent.appendChild(this.m_DrawingC);
                this.m_DrawingC.onclick = c.ObjClickHandler;
                this.m_ActionObjects = []
            };
            c.inherits(c.PptxDisplayItem, c.PptxAnimatableDisplayItem);
            c.PptxDisplayItem.prototype.AddAnimationPropertyToManager =
                function(a, b) {
                    var c = a.split(",");
                    this.mDisplayData.mData[b].push.apply(this.mDisplayData.mData[b], c)
                };
            c.PptxDisplayItem.prototype.resetObj = function() {
                this.destroy();
                this.m_Parent.removeChild(this.m_DrawingC);
                this.m_TransformMatrix = this.m_Context = this.m_DrawingC = null;
                this.m_ActionObjects = []
            };
            c.PptxDisplayItem.prototype.DrawIfNeeded = function(a) {
                try {
                    var b = this.updateFrameData();
                    this.m_Context.canvas.hidden = this.mOutDisplayData.mData[17] ? !1 : !0;
                    this.m_Context.canvas.hidden && (this.mOutDisplayData.mData[14] =
                        0);
                    this.mOutDisplayData.mRedraw && this.drawObject(a, b[1]);
                    if (this.mOutDisplayData.mRedraw || b[0]) this.drawMask(this.m_Context, this.m_DrawingC.width, this.m_DrawingC.height), this.transformObject()
                } catch (c) {
                    o(c)
                }
            };
            c.PptxDisplayItem.prototype.isPointInItem = function(a, b) {
                return c.IsPointInBBox(a, b, this.m_BBox)
            };
            c.PptxDisplayItem.prototype.onClick = function(a) {
                var b = !1;
                if (this.mTriggerTimelineId.length) return this.processTriggers(), !0;
                if (this.m_ActionObjects.length || null != this.m_TextActionObject) b = c.executeAction(this,
                    a);
                return b
            };
            c.getCanvasPoint = function(a) {
                switch (a[0]) {
                    case c.PptxHTMLPointType.kPPTX_PtMoveTo:
                        return [a[1], a[2]];
                    case c.PptxHTMLPointType.kPPTX_PtLineTo:
                        return [a[1], a[2]];
                    case c.PptxHTMLPointType.kPPTX_PtQuadCurveTo:
                        return [a[3], a[4]];
                    default:
                        o("unknown path token")
                }
                return [0, 0]
            };
            c.projectToCanvas = function(a, b) {
                if (b && a) {
                    a.beginPath();
                    for (var f = 0; f < b.length; ++f) {
                        var d = b[f];
                        switch (d[0]) {
                            case c.PptxHTMLPointType.kPPTX_PtMoveTo:
                                a.moveTo(d[1], d[2]);
                                break;
                            case c.PptxHTMLPointType.kPPTX_PtLineTo:
                                a.lineTo(d[1],
                                    d[2]);
                                break;
                            case c.PptxHTMLPointType.kPPTX_PtQuadCurveTo:
                                a.quadraticCurveTo(d[1], d[2], d[3], d[4])
                        }
                    }
                    2 < b.length && (f = c.getCanvasPoint(b[0]), d = c.getCanvasPoint(b[b.length - 1]), 1E-6 > Math.abs(f[0] - d[0]) + Math.abs(f[1] - d[1]) && a.closePath())
                }
            };
            c.transformer = {
                data: {
                    m_Tmatrix: [1, 0, 0, 1, 0, 0],
                    shouldTransform: !1,
                    m_CanModifyActuals: !0
                },
                SetCanModifyActuals: function(a) {
                    c.transformer.data.m_CanModifyActuals = a
                },
                ShouldTransform: function() {
                    return c.transformer.data.shouldTransform
                },
                Scale: function(a, b) {
                    c.transformer.data.m_Tmatrix[0] =
                        a;
                    c.transformer.data.m_Tmatrix[3] = b;
                    c.transformer.data.shouldTransform = c.transformer.data.shouldTransform || !(1 == a && 1 == b)
                },
                Transform: function(a, b) {
                    c.transformer.data.m_Tmatrix[4] = a;
                    c.transformer.data.m_Tmatrix[5] = b;
                    c.transformer.data.shouldTransform = c.transformer.data.shouldTransform || !(0 == a && 0 == b)
                },
                Point: function(a) {
                    return !c.transformer.data.shouldTransform ? a : [c.transformer.data.m_Tmatrix[0] * a[0] + c.transformer.data.m_Tmatrix[2] * a[1] + c.transformer.data.m_Tmatrix[4], c.transformer.data.m_Tmatrix[1] *
                        a[0] + c.transformer.data.m_Tmatrix[3] * a[1] + c.transformer.data.m_Tmatrix[5]
                    ]
                },
                XCoord: function(a) {
                    return !c.transformer.data.shouldTransform ? a : c.transformer.data.m_Tmatrix[0] * a + c.transformer.data.m_Tmatrix[4]
                },
                YCoord: function(a) {
                    return !c.transformer.data.shouldTransform ? a : c.transformer.data.m_Tmatrix[3] * a + c.transformer.data.m_Tmatrix[5]
                },
                Width: function(a) {
                    return !c.transformer.data.shouldTransform ? a : c.transformer.data.m_Tmatrix[0] * a
                },
                Height: function(a) {
                    return !c.transformer.data.shouldTransform ? a : c.transformer.data.m_Tmatrix[3] *
                        a
                },
                Matrix: function(a) {
                    return !c.transformer.data.shouldTransform ? a : c.matrixMultiply(c.transformer.data.m_Tmatrix, a)
                },
                MangledMatrix: function(a) {
                    if (!c.transformer.data.shouldTransform) return a;
                    c.transformer.data.m_CanModifyActuals && (a = c.transformer.Matrix([a[0], a[3], a[1], a[2], a[4], a[5]]));
                    return [a[0], a[2], a[3], a[1], a[4], a[5]]
                },
                Path: function(a) {
                    if (c.transformer.data.shouldTransform && c.transformer.data.m_CanModifyActuals)
                        for (var b = 0; b < a.length; ++b) {
                            var f = a[b];
                            switch (f[0]) {
                                case c.PptxHTMLPointType.kPPTX_PtMoveTo:
                                case c.PptxHTMLPointType.kPPTX_PtLineTo:
                                    var d =
                                        c.transformer.Point([f[1], f[2]]);
                                    f[1] = d[0];
                                    f[2] = d[1];
                                    break;
                                case c.PptxHTMLPointType.kPPTX_PtQuadCurveTo:
                                    d = c.transformer.Point([f[1], f[2]]), f[1] = d[0], f[2] = d[1], d = c.transformer.Point([f[3], f[4]]), f[3] = d[0], f[4] = d[1]
                            }
                        }
                },
                FillPaths: function(a) {
                    if (c.transformer.data.shouldTransform)
                        for (var b = a.length, f = 0; f < b; ++f) c.transformer.Path(a[f].e7)
                },
                BBox: function(a) {
                    if (!c.transformer.data.shouldTransform) return a;
                    var b = c.transformer.Point([a[0], a[1]]),
                        a = c.transformer.Point([a[2], a[3]]);
                    return [b[0], b[1], a[0], a[1]]
                },
                FillStyle: function(a) {
                    if (c.transformer.data.shouldTransform) {
                        var b = a.length;
                        if (c.transformer.data.m_CanModifyActuals)
                            for (var f = 0; f < b; ++f) {
                                var d = a[f];
                                switch (d.e3) {
                                    case c.PptxHTMLFillTypes.kPPTX_FillGradient:
                                        switch (d.e9) {
                                            case c.PptxHTMLGradientType.kPPTX_GradientLinear:
                                            case c.PptxHTMLGradientType.kPPTX_GradientRadial:
                                                var e = c.transformer.Point([d.f6[0], d.f6[1]]),
                                                    g = c.transformer.Point([d.f6[2], d.f6[3]]);
                                                d.f6 = [e[0], e[1], g[0], g[1]]
                                        }
                                        break;
                                    case c.PptxHTMLFillTypes.kPPTX_FillImage:
                                        d.g3 = c.transformer.MangledMatrix(d.g3)
                                }
                            }
                    }
                }
            };
            c.PptxDisplayItem.prototype.getColorRGB = function(a) {
                var b = a % 256,
                    a = parseInt(a / 256),
                    c = a % 256,
                    a = parseInt(a / 256);
                return "rgb(" + a % 256 + "," + c + "," + b + ")"
            };
            c.PptxDisplayItem.prototype.getColorRGBA = function(a) {
                var b = a % 256 / 255,
                    a = parseInt(a / 256),
                    c = a % 256,
                    a = parseInt(a / 256),
                    d = a % 256,
                    a = parseInt(a / 256);
                return "rgba(" + a % 256 + "," + d + "," + c + "," + b + ")"
            };
            c.fillCanvas = function(a, b, f, d, e, g) {
                if (!(void 0 == b || null == b)) {
                    var h = b.e3;
                    h == c.PptxHTMLFillTypes.kPPTX_FillGradient && f.mColorRedraw[1] && (h = c.PptxHTMLFillTypes.kPPTX_FillSolid);
                    switch (h) {
                        case c.PptxHTMLFillTypes.kPPTX_FillNone:
                            return;
                        case c.PptxHTMLFillTypes.kPPTX_FillSolid:
                            b = f.mData[1];
                            d *= 4;
                            a.fillStyle = "rgba(" + b[d] + "," + b[d + 1] + "," + b[d + 2] + "," + b[d + 3] + ")";
                            break;
                        case c.PptxHTMLFillTypes.kPPTX_FillGradient:
                            switch (b.e9) {
                                case c.PptxHTMLGradientType.kPPTX_GradientLinear:
                                    g = a.createLinearGradient(b.f6[0], b.f6[1], b.f6[2], b.f6[3]);
                                    break;
                                case c.PptxHTMLGradientType.kPPTX_GradientRadial:
                                    var g = (b.f6[0] + b.f6[2]) / 2,
                                        d = (b.f6[1] + b.f6[3]) / 2,
                                        f = b.f6[2],
                                        i = b.f6[3],
                                        f = Math.sqrt((g - f) * (g - f) + (d - i) * (d - i)),
                                        q = Math.floor((e[0] + e[2]) / 2),
                                        i = Math.floor((e[1] + e[3]) /
                                            2),
                                        k = g,
                                        l = d,
                                        m = i - f;
                                    m > d && (k = q, q = (m - d) / 2, l = i - q, d = d + q + 1);
                                    g = a.createRadialGradient(g, d, 0, k, l, f);
                                    break;
                                default:
                                    return
                            }
                            for (d = 0; d < b.f1.length; ++d) f = b.f1[d], g.addColorStop(f[0], "rgba(" + f[1] + ")");
                            a.save();
                            a.clip();
                            c.projectToCanvas(a, [
                                [c.PptxHTMLPointType.kPPTX_PtMoveTo, e[0], e[1]],
                                [c.PptxHTMLPointType.kPPTX_PtLineTo, e[2], e[1]],
                                [c.PptxHTMLPointType.kPPTX_PtLineTo, e[2], e[3]],
                                [c.PptxHTMLPointType.kPPTX_PtLineTo, e[0], e[3]],
                                [c.PptxHTMLPointType.kPPTX_PtLineTo, e[0], e[1]]
                            ]);
                            a.fillStyle = g;
                            break;
                        case c.PptxHTMLFillTypes.kPPTX_FillImage:
                            if (null ==
                                g || !("g1" in b)) return;
                            e = -1;
                            for (d = 0; d < g.length; ++d) g[d].g1 == b.g1 && (e = d);
                            if (-1 == e) return;
                            f = j.movie.im.images;
                            i = "dr/pptxIm/" + g[e].ip;
                            d = null;
                            void 0 == b.bImageScalingCorrected && (b.g3[0] = Math.round(g[e].f3 * b.g3[0]) / g[e].f3, b.g3[1] = Math.round(g[e].f4 * b.g3[1]) / g[e].f4, b.bImageScalingCorrected = !0);
                            if (f && i in f) d = f[i].nativeImage;
                            else {
                                o("Image not found at source yet");
                                return
                            }
                            e = null;
                            if (d && d.complete) e = a.createPattern(d, b.f2 ? "repeat" : "no-repeat");
                            else {
                                o("Image not loaded yet");
                                return
                            }
                            a.save();
                            a.transform(b.g3[0],
                                b.g3[2], b.g3[3], b.g3[1], b.g3[4], b.g3[5]);
                            a.fillStyle = e;
                            break;
                        default:
                            return
                    }
                    a.fill();
                    switch (h) {
                        case c.PptxHTMLFillTypes.kPPTX_FillGradient:
                        case c.PptxHTMLFillTypes.kPPTX_FillImage:
                            a.restore()
                    }
                }
            };
            c.setLineType = function(a, b) {
                if ("h5" in b) switch (b.h5) {
                    case c.PptxHTMLLinePattern.kPPTX_LinePatternSOLID:
                        break;
                    default:
                        "j6" in b && a.setLineDash(b.j6)
                }
            };
            c.strokeCanvas = function(a, b, f, d) {
                a.lineWidth = b.d5;
                f.mColorRedraw[2] ? (f = f.mData[2], d *= 4, a.strokeStyle = "rgba(" + f[d] + "," + f[d + 1] + "," + f[d + 2] + "," + f[d + 3] + ")") : a.strokeStyle =
                    "rgba(" + b.d6 + ")";
                if ("d9" in b) switch (b.d9) {
                    case c.PptxHTMLLineJoinStyle.kPPTX_LineJoinStyleBevel:
                        a.lineJoin = "bevel";
                        break;
                    case c.PptxHTMLLineJoinStyle.kPPTX_LineJoinStyleMiter:
                        a.lineJoin = "miter";
                        break;
                    default:
                        a.lineJoin = "round"
                } else a.lineJoin = "round";
                if ("d8" in b) switch (b.d8) {
                    case c.PptxHTMLLineEndType.kPPTX_LineEndCapSquare:
                        a.lineCap = "square";
                        break;
                    case c.PptxHTMLLineEndType.kPPTX_LineEndCapFlat:
                        a.lineCap = "butt";
                        break;
                    default:
                        a.lineCap = "round"
                } else a.lineCap = "round";
                a.stroke()
            };
            c.matrixMultiply = function(a,
                b) {
                return [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]]
            };
            c.PptxBaseShape = function(a, b, f, d) {
                this.m_name = a;
                this.m_itemData = b;
                this.m_parent = f;
                this.m_drawingC = d;
                this.m_context = this.m_drawingC.getContext("2d");
                this.m_actionIndex = "h4" in b ? b.h4 : -1;
                this.m_depth = b.f7;
                this.m_clipDepth = b.f8;
                this.m_bbox = c.transformer.BBox(b.f5);
                (this.m_fillStyles = b.e2) && c.transformer.FillStyle(this.m_fillStyles);
                this.m_lineStyles = b.d4;
                this.m_matrix =
                    b.f6 ? b.f6 : [1, 1, 0, 0, 0, 0];
                this.m_matrix = c.transformer.MangledMatrix(this.m_matrix);
                this.alreadyDrawn = !1
            };
            c.PptxBaseShape.prototype.resetObj = function() {
                this.m_drawingC = this.m_parent = this.m_itemData = null;
                this.m_actionIndex = -1;
                this.m_matrix = this.m_fillStyles = null;
                this.alreadyDrawn = !1
            };
            c.PptxAutoShape = function(a, b, f, d) {
                c.PptxAutoShape.baseConstructor.call(this, a, b, f, d);
                this.m_type = c.PptxObjTypes.kPPTX_OTShape;
                this.m_fillPaths = b.e8;
                c.transformer.FillPaths(this.m_fillPaths);
                a = "0,0,0,0";
                if (this.m_fillStyles &&
                    this.m_fillStyles.length) switch (b = this.m_fillStyles[0], b.e3) {
                    case c.PptxHTMLFillTypes.kPPTX_FillSolid:
                        a = b.d6;
                        break;
                    case c.PptxHTMLFillTypes.kPPTX_FillGradient:
                        b.f1.length && (a = b.f1[0][1])
                }
                f.AddAnimationPropertyToManager(a, 3);
                f.AddAnimationPropertyToManager(a, 1);
                a = "0,0,0,0";
                this.m_lineStyles && this.m_lineStyles.length && (a = this.m_lineStyles[0].d6);
                f.AddAnimationPropertyToManager(a, 2)
            };
            c.inherits(c.PptxAutoShape, c.PptxBaseShape);
            c.PptxAutoShape.prototype.resetObj = function() {
                this.m_fillPaths = null;
                c.PptxAutoShape.superClass.resetObj.call(this)
            };
            c.PptxAutoShape.prototype.DrawIfNeeded = function(a) {
                this.drawObject(a)
            };
            c.PptxAutoShape.prototype.drawObject = function(a, b, f) {
                if (null != this.m_clipDepth) {
                    var d = f + 1;
                    if (!(d >= this.m_parent.m_ChildItems.length)) {
                        var e = this.m_parent.m_ChildItems[d];
                        if (e && e.m_depth == this.m_clipDepth) {
                            for (var d = this.m_fillPaths.length, g = 0; g < d; ++g) this.m_context.save(), c.projectToCanvas(this.m_context, this.m_fillPaths[g].e7), this.m_context.clip(), e.drawObject(a, b, f + 1), this.m_context.restore();
                            e.alreadyDrawn = !0
                        }
                    }
                } else if (this.alreadyDrawn) this.alreadyDrawn = !1;
                else {
                    d = this.m_fillPaths.length;
                    this.m_drawingC.style.opacity = b.mData[14];
                    for (g = 0; g < d; ++g)
                        if (a = !1, e = this.m_fillPaths[g], "e5" in e && 0 != e.e5 && (a = !0, c.projectToCanvas(this.m_context, e.e7), c.fillCanvas(this.m_context, this.m_fillStyles[e.e5 - 1], b, f, this.m_bbox, this.m_parent.m_Parent.m_PptxSlideItemC.pxi)), "e6" in e && 0 != e.e6) c.setLineType(this.m_context, this.m_lineStyles[e.e6 - 1]), a || c.projectToCanvas(this.m_context, e.e7), c.strokeCanvas(this.m_context, this.m_lineStyles[e.e6 - 1], b, f)
                }
            };
            c.PptxAutoShape.prototype.isPointInPath =
                function(a, b, f) {
                    for (var d = this.m_fillPaths.length, e = 0; e < d; ++e) {
                        var g = this.m_fillPaths[e],
                            h = f || "e5" in g && 0 != g.e5;
                        if (h = h || "e6" in g && 0 != g.e6)
                            if (c.projectToCanvas(this.m_context, g.e7), this.m_context.isPointInPath(a, b)) return !0
                    }
                    return !1
                };
            c.PptxAutoShape.prototype.isClipPath = function(a) {
                a += 1;
                if (a >= this.m_parent.m_ChildItems.length) return !1;
                a = this.m_parent.m_ChildItems[a];
                return !a || a.m_depth != this.m_clipDepth ? !1 : !0
            };
            c.PptxText = function(a, b, f, d) {
                c.PptxText.baseConstructor.call(this, a, b, f, d);
                this.m_type = c.PptxObjTypes.kPPTX_OTText
            };
            c.inherits(c.PptxText, c.PptxAutoShape);
            c.PptxText.prototype.resetObj = function() {
                c.PptxText.superClass.resetObj.call(this)
            };
            c.PptxText.prototype.DrawIfNeeded = function(a) {
                this.drawObject(a)
            };
            c.PptxText.prototype.drawObject = function() {};
            c.PptxCanvasWrapper = function(a, b, f) {
                c.PptxCanvasWrapper.baseConstructor.call(this, a, b, f);
                this.m_Type = c.PptxObjTypes.kPPTX_OTCanvas;
                this.m_BBox = c.transformer.BBox(b.f5);
                this.m_ChildItems = [];
                for (var d = [], e = 0; e < b.c7.length; ++e) {
                    var g = b.c7[e],
                        h = f.getPPTXSlideItemData(g);
                    void 0 != h && null != h && (h = c.PptxObjFactory(g, h.d2, h, this, this.m_DrawingC), this.m_ChildItems.push(h), c.instanceManager[g] = h, d.push({
                        actionInd: h.m_actionIndex,
                        bbox: h.m_bbox
                    }))
                }
                for (g = 0; g < d.length; ++g)
                    if (h = d[g], e = f.GetActionObjFromIndex(h.actionInd), null != e) {
                        var i = {};
                        i.m_ActionInfo = e;
                        i.m_ActionObjBBox = h.bbox;
                        this.m_ActionObjects.push(i)
                    }
                this.m_TextActionObject = null;
                if (void 0 != b.i8) {
                    this.m_TextActions = b.i8;
                    for (b = 0; b < this.m_TextActions.length; ++b) {
                        d = this.m_TextActions[b];
                        f = document.createElement("div");
                        f.id =
                            this.m_Parent.m_PptxSlideItemId + a + "_accText" + b;
                        f.style.left = d.f5[0] + "px";
                        f.style.top = d.f5[1] + "px";
                        f.style.width = d.f5[2] - d.f5[0] + "px";
                        f.style.height = d.f5[3] - d.f5[1] + "px";
                        f.style.position = "absolute";
                        f.tabIndex = 0;
                        f.parentObj = this;
                        j.browser === j.MSIE ? (e = document.createElement("p"), e.textContent = "This is Hyperlink", g = document.createElement("div"), g.id = this.m_Parent.m_PptxSlideItemId + a + "_accTextAria" + b, g.style.opacity = 0, g.appendChild(e), f.appendChild(g)) : (f.setAttribute("role", "button"), f.setAttribute("aria-label",
                            "This is Hyperlink"));
                        if (-1 != d.h4 && (e = this.m_Parent.GetActionObjFromIndex(d.h4))) f.ActionInfo = e, f.onkeypress = c.ObjKeyPressHandler, f.onclick = c.ObjClickHandler;
                        this.m_Parent.m_PptxSlideItemDiv.appendChild(f)
                    }
                }
                this.m_ImageDataCache = null;
                this.updateAnimationDataPostConstruction()
            };
            c.inherits(c.PptxCanvasWrapper, c.PptxDisplayItem);
            c.PptxCanvasWrapper.prototype.resetObj = function() {
                for (var a = 0; a < this.m_ChildItems.length; ++a) this.m_ChildItems[a] && this.m_ChildItems[a].resetObj();
                this.m_ImageDataCache = null;
                c.PptxCanvasWrapper.superClass.resetObj.call(this)
            };
            c.PptxCanvasWrapper.prototype.drawObject = function(a, b) {
                if (!b || null == this.m_ImageDataCache) {
                    c.SetCanvasBounds(this.m_DrawingC, this.m_Context, [this.m_BBox[0], this.m_BBox[1], this.m_BBox[2] - this.m_BBox[0], this.m_BBox[3] - this.m_BBox[1]]);
                    this.m_Context.globalCompositeOperation = "source-over";
                    this.m_Context.save();
                    this.m_Context.translate(-this.m_BBox[0], -this.m_BBox[1]);
                    for (var f = 0; f < this.m_ChildItems.length; ++f) this.m_ChildItems[f].drawObject(a, this.mOutDisplayData,
                        f);
                    this.m_Context.restore();
                    if (b) try {
                        this.m_ImageDataCache = this.m_Context.getImageData(0, 0, this.m_BBox[2] - this.m_BBox[0], this.m_BBox[3] - this.m_BBox[1])
                    } catch (d) {
                        this.m_ImageDataCache = null, o("Run from web server to enable image cached approach")
                    }
                } else this.m_Context.putImageData(this.m_ImageDataCache, 0, 0)
            };
            c.PptxCanvasWrapper.prototype.transformObject = function() {
                var a = this.mOutDisplayData.mData,
                    b = this.mDisplayData.mData,
                    f = Math.cos(a[15] * Math.PI / 180),
                    d = Math.sin(a[15] * Math.PI / 180);
                if (j.device === j.ANDROID &&
                    j.browser === j.CHROME && a[11].toFixed(0) != b[11].toFixed(0) && a[10].toFixed(0) != b[10].toFixed(0)) {
                    var e = 11;
                    b[11] > b[10] && (e = 10);
                    a[e] = b[e]
                }
                f = c.matrixMultiply([a[10] / b[10], 0, 0, a[11] / b[11], 0, 0], [f, d, -d, f, 0, 0]);
                f = c.matrixMultiply(f, [1, 0, a[16], 1, 0, 0]);
                this.m_TransformMatrix = f = c.matrixMultiply([1, 0, 0, 1, a[12] - b[12], a[13] - b[13]], f);
                f = "matrix(" + f[0].toFixed(6) + "," + f[1].toFixed(6) + "," + f[2].toFixed(6) + "," + f[3].toFixed(6) + "," + f[4].toFixed(6) + "," + f[5].toFixed(6) + ")";
                this.m_DrawingC.style.transform = f;
                this.m_DrawingC.style["-ms-transform"] =
                    f;
                this.m_DrawingC.style.MozTransform = f;
                this.m_DrawingC.style["-webkit-transform"] = f;
                1 != cp.movie.m_scaleFactor && cp.fixWebkitScaling && cp.fixWebkitScaling(this.m_DrawingC);
                this.m_DrawingC.style["-o-transform"] = f;
                this.m_DrawingC.style.opacity = a[14];
                this.m_Context.canvas.hidden = a[17] ? !1 : !0
            };
            c.PptxCanvasWrapper.prototype.isPointInItem = function(a, b, f) {
                a -= (this.m_BBox[0] + this.m_BBox[2]) / 2;
                b -= (this.m_BBox[1] + this.m_BBox[3]) / 2;
                if (null != this.m_TransformMatrix) var d = a,
                    a = this.m_TransformMatrix[3] * a - this.m_TransformMatrix[2] *
                    b + this.m_TransformMatrix[2] * this.m_TransformMatrix[5] - this.m_TransformMatrix[4] * this.m_TransformMatrix[3],
                    b = -this.m_TransformMatrix[1] * d + this.m_TransformMatrix[0] * b + this.m_TransformMatrix[1] * this.m_TransformMatrix[4] - this.m_TransformMatrix[5] * this.m_TransformMatrix[0],
                    d = this.m_TransformMatrix[0] * this.m_TransformMatrix[3] - this.m_TransformMatrix[1] * this.m_TransformMatrix[2],
                    a = a / d,
                    b = b / d;
                var d = a + (this.m_BBox[0] + this.m_BBox[2]) / 2,
                    e = b + (this.m_BBox[1] + this.m_BBox[3]) / 2;
                f.m_X = d;
                f.m_Y = e;
                a += (this.m_BBox[2] -
                    this.m_BBox[0]) / 2;
                b += (this.m_BBox[3] - this.m_BBox[1]) / 2;
                if (!c.PptxDisplayItem.prototype.isPointInItem.call(this, a + this.m_BBox[0], b + this.m_BBox[1])) return !1;
                f = !1;
                this.m_TextActionObject = null;
                if (void 0 != this.m_TextActions)
                    for (var g = 0; g < this.m_TextActions.length; ++g) {
                        var h = this.m_TextActions[g];
                        if (c.IsPointInBBox(d, e, h.f5)) {
                            this.m_TextActionObject = this.m_Parent.GetActionObjFromIndex(h.h4);
                            f = !0;
                            break
                        }
                    }
                if (!f) {
                    this.m_Context.save();
                    this.m_Context.translate(-this.m_BBox[0], -this.m_BBox[1]);
                    f = !1;
                    for (d = 0; d <
                        this.m_ChildItems.length; ++d) {
                        e = this.m_ChildItems[d];
                        g = e.isClipPath(d);
                        if (e.isPointInPath(a, b, g)) {
                            f = !0;
                            break
                        }
                        g && ++d
                    }
                    this.m_Context.restore()
                }
                if (f) return !0;
                f = null;
                try {
                    f = this.m_Context.getImageData(a, b, 1, 1)
                } catch (i) {
                    return o("Run from web server to make proper click handling work"), !1
                }
                return 0 != f.data[3]
            };
            c.PptxObjFactory = function(a, b, f, d, e) {
                switch (b) {
                    case c.PptxObjTypes.kPPTX_OTShape:
                        return new c.PptxAutoShape(a, f, d, e);
                    case c.PptxObjTypes.kPPTX_OTText:
                        return new c.PptxText(a, f, d, e);
                    case c.PptxObjTypes.kPPTX_OTCanvas:
                        return new c.PptxCanvasWrapper(a,
                            f, d)
                }
                return null
            };
            c.PptxObjActionID = {
                kHLinkAction_URL: 0,
                kHLinkAction_OpenFile: 1
            };
            c.HandleAction = function(a, b) {
                var f = !1;
                try {
                    for (var d = 0; d < a.length; ++d) {
                        var e = a[d];
                        try {
                            if (void 0 != e.h1) {
                                var f = !0,
                                    g = c.am.GetAudio(b.m_Parent.m_PptxSlideItemObj.mdi, e.h1);
                                g && (g.triggered = !0, g.playAudio(0, !1, !1))
                            }
                        } catch (h) {}
                        switch (e.g7) {
                            case c.PptxObjActionID.kHLinkAction_URL:
                            case c.PptxObjActionID.kHLinkAction_OpenFile:
                                void 0 != e.g8 && j.openURL(e.g8), f = !0
                        }
                    }
                } catch (i) {}
                return f
            };
            c.executeAction = function(a, b) {
                for (var f = null, d =
                        0; d < a.m_ActionObjects.length; ++d)
                    if (c.IsPointInBBox(b.m_X, b.m_Y, a.m_ActionObjects[d].m_ActionObjBBox)) {
                        f = a.m_ActionObjects[d].m_ActionInfo;
                        break
                    }
                null == f && 0 < a.m_ActionObjects.length && (f = a.m_ActionObjects[0].m_ActionInfo);
                null != a.m_TextActionObject && (f = a.m_TextActionObject);
                f instanceof Array || (f = [f]);
                return c.HandleAction(f, a)
            };
            c.ObjClickHandler = function(a) {
                var b = a.currentTarget.parentObj;
                if (!b && (b = a.target.parentObj, !b)) return;
                var f = a.pageX - j.movie.offset,
                    d = a.pageY - j.movie.topOffset,
                    e = !1,
                    g = {
                        m_X: 0,
                        m_Y: 0
                    };
                b.isPointInItem(f, d, g) && (e = b.onClick(g));
                e || (e = b.m_Parent.delegateClick(b, f, d));
                if (e) a.stopPropagation();
                else {
                    if (b = document.activeElement.parentObj)
                        if (a = document.activeElement.ActionInfo) {
                            c.HandleAction(a, document.activeElement.parentObj);
                            return
                        }
                    c.am.PauseAllStopAudio();
                    if (j.movie.paused) j.movie.play();
                    else {
                        a = cpInfoCurrentFrame;
                        f = Infinity;
                        if (b && b.m_Parent && b.m_Parent.m_OnStageClicks && 0 < b.m_Parent.m_OnStageClicks.length)
                            for (var h in b.m_Parent.m_OnStageClicks) d = b.m_Parent.m_OnStageClicks[h],
                                d < a || f > d && (f = d);
                        Infinity != f && j.movie.jumpToFrame(f + 1)
                    }
                }
            };
            c.ObjKeyPressHandler = function(a) {
                var b = a.currentTarget;
                if (b) {
                    var f = 0;
                    a.keyCode ? f = a.keyCode : a.which && (f = a.which);
                    if (32 == f || 13 == f)(a = b.ActionInfo) && c.HandleAction(a, b.parentObj)
                }
            };
            c.PptxAudio = function(a, b, f, d, e, g, h, i) {
                c.PptxAudio.baseConstructor.call(this, a, b, f, d, e);
                this.audioState = 2;
                this.seekReset = this.triggered = this.mIsSubAnim = this.mInMainTimeLine = this.mInitialised = !1;
                void 0 != i && (this.mStopPlaying = i)
            };
            c.inherits(c.PptxAudio, j.ExtAudioObject);
            c.PptxAudio.prototype.play = function() {};
            c.PptxAudio.prototype.playAudio = function(a, b, f) {
                this.seekReset = !1;
                if (!this.nativeAudio && (c.am.cpam.allocAudioChannel(this, !1), !this.nativeAudio)) return;
                this.mInitialised || (void 0 != b && (this.mInMainTimeLine = b), void 0 != f && (this.mIsSubAnim = f), this.mInitialised = !0);
                this.setCurrentTime(a);
                this.audioState = 0;
                this.nativeAudio.play()
            };
            c.PptxAudio.prototype.pause = function(a) {
                this.mInMainTimeLine && !(j.ReasonForPause.PPTX_PAUSE_FOR_ONCLICK_ANIMATION == a && this.mIsSubAnim) &&
                    this.pauseAudio()
            };
            c.PptxAudio.prototype.pauseAudio = function(a) {
                void 0 == a && (a = !1);
                !(j.ReasonForPause.PPTX_PAUSE_FOR_ONCLICK_ANIMATION == j.movie.reasonForPause && this.mIsSubAnim && !a) && (!(j.ReasonForPause.INTERACTIVE_ITEM == j.movie.reasonForPause && this.mIsSubAnim && !a) && 0 == this.audioState) && (this.audioState = 1, this.nativeAudio && (this.nativeAudio.pause(), this.nativeAudio.pausedAt = (new Date).getTime()))
            };
            c.PptxAudio.prototype.stopAudio = function() {
                this.pauseAudio(!0);
                this.audioState = 2;
                this.paused = this.ended = !0
            };
            c.PptxAudio.prototype.setCurrentTime = function(a) {
                a = (a / 1E3).toFixed(3);
                if (this.nativeAudio)
                    if (this.nativeAudio.duration < a) this.nativeAudio.pause();
                    else if (!(0.05 > Math.abs(this.nativeAudio.currentTime - a))) try {
                    this.nativeAudio.currentTime = a
                } catch (b) {}
            };
            c.PPAudioManager = function(a) {
                this.cpam = a;
                this.verbose = !1
            };
            c.PPAudioManager.prototype = {
                load: function() {
                    this.ppAudios = {};
                    for (var a = (s.data.project_main.slides || "").split(","), b = 0; b < a.length; ++b) {
                        var f = s.data[a[b]];
                        if ("PPTX Slide" == f.st)
                            for (var d = 0; d <
                                f.si.length; ++d)
                                if (c.PPTX_SLIDE_ITEM_TYPE == f.si[d].t) {
                                    for (var e = f.si[d].n, g = s.data[e].mdi, h = s.data[g].h8, i = s.data[e].from, j = s.data[e].to, e = {}, k = !1, l = 0; l < h.length; ++l) {
                                        var k = h[l],
                                            m = 0,
                                            o = "";
                                        void 0 != k.i3 && (m = k.i3);
                                        void 0 != k.i7 && (o = k.i7);
                                        m = new c.PptxAudio(this.cpam, k.h9, "ar/pptxAr/" + k.i1, i, j, k.i0, k.i5, m, 0, o);
                                        e[k.h9] = m;
                                        k = !0
                                    }
                                    if (k)
                                        if (this.ppAudios[g] = e, void 0 == this.cpam.extAudios[a[b]]) this.cpam.extAudios[a[b]] = e;
                                        else {
                                            var g = this.cpam.extAudios[a[b]],
                                                p;
                                            for (p in e) g[p] = e[p]
                                        }
                                }
                    }
                },
                StopAllAudios: function() {
                    for (var a in this.ppAudios) {
                        var b =
                            this.ppAudios[a],
                            c;
                        for (c in b) b[c].stopAudio()
                    }
                },
                PauseAllMainTimeLineSounds: function() {
                    for (var a in this.ppAudios) {
                        var b = this.ppAudios[a],
                            c;
                        for (c in b) {
                            var d = b[c];
                            d.mInMainTimeLine && !d.triggered && (d.pauseAudio(), d.seekReset = !0)
                        }
                    }
                },
                PauseAllSubAnim: function() {
                    for (var a in this.ppAudios) {
                        var b = this.ppAudios[a],
                            c;
                        for (c in b) {
                            var d = b[c];
                            d.mIsSubAnim && (d.pauseAudio(!0), d.seekReset = !0)
                        }
                    }
                },
                PauseAllAnimTrigTl: function(a) {
                    for (var b in this.ppAudios) {
                        var c = this.ppAudios[b],
                            d;
                        for (d in c) {
                            var e = c[d];
                            void 0 != e.mTriggerObject &&
                                e.mTriggerObject == a && (e.pauseAudio(), e.seekReset = !0)
                        }
                    }
                },
                PauseAllStopAudio: function() {
                    for (var a in this.ppAudios) {
                        var b = this.ppAudios[a],
                            c;
                        for (c in b) {
                            var d = b[c];
                            void 0 != d.mStopPlaying && 0 == d.mStopPlaying && (d.pauseAudio(), d.seekReset = !0)
                        }
                    }
                },
                GetAudio: function(a, b) {
                    var c = this.ppAudios[a];
                    return c && (c = c[b]) ? c : null
                }
            };
            c.RegisterPPTXAudioCb = function(a) {
                try {
                    c.am = new c.PPAudioManager(a), c.am.load()
                } catch (b) {
                    o("Error in PPTXLib.RegisterPPTXAudioCb " + b)
                }
                o("RegisterPPTXAudioCb ")
            };
            j.AddExternalAudioCb(c.RegisterPPTXAudioCb)
        }
    })();
})();