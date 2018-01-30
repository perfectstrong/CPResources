(function() {
    function A(b, a, c, e, d, f) {
        for (var a = a.split(" "), g = "", h = 0; h < a.length; h++) {
            var k = a[h];
            h < a.length - 1 && (k += " ");
            var l = g + k;
            if (b.measureText(l).width > d && 0 != g.length) {
                var l = b,
                    m = d,
                    o = l.measureText(g);
                if (o.width < m) l = [g];
                else {
                    for (var p = g.length, q = [], n = "", t = 0; t < p; ++t) o = l.measureText(n + g.charAt(t)), o.width > m ? (q.push(n), n = g.charAt(t)) : n += g.charAt(t);
                    "" != n && q.push(n);
                    l = q
                }
                for (g = 0; g < l.length - 1; ++g) b.fillText(l[g].trim(), c, e), e += f;
                b.measureText(l[l.length - 1] + " " + k).width > d ? (b.fillText(l[l.length - 1].trim(),
                    c, e), e += f, g = k) : g = l[l.length - 1] + " " + k
            } else g = l
        }
        b.fillText(g.trim(), c, e)
    }
    cp.DD = {};
    cp.DD.SnapBehaviourPos = {};
    cp.DD.SnapBehaviourPos.kCPSBPNone = 0;
    cp.DD.SnapBehaviourPos.kCPSBPAbsolute = 1;
    cp.DD.SnapBehaviourPos.kCPSBPAnchorTopLeft = 2;
    cp.DD.SnapBehaviourPos.kCPSBPAnchorTopCenter = 3;
    cp.DD.SnapBehaviourPos.kCPSBPAnchorTopRight = 4;
    cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterLeft = 5;
    cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterCenter = 6;
    cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterRight = 7;
    cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomLeft =
        8;
    cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomCenter = 9;
    cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomRight = 10;
    cp.DD.SnapBehaviourPos.kCPSBPStackHorizonatally = 11;
    cp.DD.SnapBehaviourPos.kCPSBPStackVertically = 12;
    cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingTop = 13;
    cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingBottom = 14;
    cp.DD.SnapBehaviourPos.kCPSBPTileBottomTopStartingLeft = 15;
    cp.DD.SnapBehaviourPos.kCPSBPTileTopBottomStartingLeft = 16;
    cp.DD.ReasonForUpdatingCurrentState = {};
    cp.DD.ReasonForUpdatingCurrentState.kRegular =
        0;
    cp.DD.ReasonForUpdatingCurrentState.kOrientationChangeOrResize = 1;
    cp.DD.ReasonForUpdatingCurrentState.kReset = 2;
    cp.DD.ReasonForUpdatingCurrentState.kUndo = 3;
    cp.DD.ObjectStateNames = {};
    cp.DD.ObjectStateNames.kCPNormal = "Normal";
    cp.DD.ObjectStateNames.kCPDragStart = "DragStart";
    cp.DD.ObjectStateNames.kCPDragOver = "DragOver";
    cp.DD.ObjectStateNames.kCPDropAccept = "DropAccept";
    cp.DD.ObjectStateNames.kCPDropReject = "DropReject";
    cp.DD.ObjectStateNames.kCPDropCorrect = "DropCorrect";
    cp.DD.ObjectStateNames.kCPDropIncorrect =
        "DropIncorrect";
    var B = 20;
    cp.DD.getAttribute = function(b, a) {
        var c = cp.D[b];
        return !c ? null : c[a]
    };
    cp.DDch = function(b) {
        var a = cp.DD.CurrInteractionManager.m_ActiveInteraction;
        if (null !== a) {
            if (a.m_questionObj) {
                if (a.m_questionObj.isDisabled) return
            } else if (a.m_InteractionCompleted) return;
            0 < a.m_maxAttempts && a.m_CurrentAttempt >= a.m_maxAttempts || (b = cp.D[b.id], b.type === cp.kCPOTDDSubmitButton ? a.OnSubmitButtonClicked() : b.type === cp.kCPOTUndoButton ? a.OnUndoButtonClicked() : b.type === cp.kCPOTResetButton && a.OnResetButtonClicked())
        }
    };
    cp.DD.AnimationState = function(b, a, c, e, d) {
        this.x = b;
        this.y = a;
        this.w = c;
        this.h = e;
        this.opac = d
    };
    cp.DD.GetRectFromBounds = function(b, a, c, e) {
        var d = {};
        d.left = b;
        d.right = b + c;
        d.top = a;
        d.bottom = a + e;
        return d
    };
    cp.DD.doRectangleIntersect = function(b, a) {
        return a.left > b.right || a.right < b.left || a.top > b.bottom || a.bottom < b.top ? !1 : !0
    };
    cp.DD.getMidPoint = function(b, a, c, e, d) {
        var f = 3.1415 * d / 180,
            d = Math.cos(f),
            f = Math.sin(f),
            c = c / 2,
            e = e / 2;
        return {
            x: b + c * d - e * f,
            y: a + c * f + e * d
        }
    };
    cp.DD.getEndPointsAfterRotation = function(b, a, c, e, d) {
        var f = cp.DD.getMidPoint(b,
                a, c, e, d),
            g = [],
            g = {
                x: b,
                y: a
            },
            h = {
                x: b + c,
                y: a
            },
            c = {
                x: b + c,
                y: a + e
            },
            a = a + e,
            g = cp.DD.Rotate(g.x, g.y, f.x, f.y, d),
            h = cp.DD.Rotate(h.x, h.y, f.x, f.y, d),
            c = cp.DD.Rotate(c.x, c.y, f.x, f.y, d);
        cp.DD.Rotate(b, a, f.x, f.y, d);
        return g = [g, h, c, h]
    };
    cp.DD.getEndPointsAfterRotation2 = function(b, a, c, e, d) {
        var f = b + c / 2,
            g = a + e / 2,
            h = [],
            h = {
                x: b,
                y: a
            },
            k = {
                x: b + c,
                y: a
            },
            c = {
                x: b + c,
                y: a + e
            },
            b = {
                x: b,
                y: a + e
            },
            h = cp.DD.Rotate(h.x, h.y, f, g, d),
            k = cp.DD.Rotate(k.x, k.y, f, g, d),
            c = cp.DD.Rotate(c.x, c.y, f, g, d),
            b = cp.DD.Rotate(b.x, b.y, f, g, d);
        return h = [h, k, c, b]
    };
    cp.DD.GetDimensionsAfterRotation =
        function(b, a, c, e, d) {
            if (null === b || void 0 === b || null === a || void 0 === a || null === c || void 0 === c || null === e || void 0 === e || null === d || void 0 === d) return null;
            b = cp.DD.getEndPointsAfterRotation2(b, a, c, e, d);
            return cp.DD.GetBoundingRectForTransformedPoints(b)
        };
    cp.DD.GetBoundingRectForTransformedPoints = function(b) {
        if (4 != b.length) return null;
        for (var a = b[0], c = a.x, e = a.y, d = a.x, a = a.y, f = 1; f < b.length; f++) {
            var g = b[f];
            c > g.x && (c = g.x);
            e > g.y && (e = g.y);
            d < g.x && (d = g.x);
            a < g.y && (a = g.y)
        }
        return {
            minX: c,
            minY: e,
            maxX: d,
            maxY: a
        }
    };
    cp.DD.Rotate =
        function(b, a, c, e, d) {
            var d = d * Math.PI / 180,
                b = b - c,
                f = a - e,
                a = Math.atan2(f, b),
                b = Math.sqrt(b * b + f * f),
                a = a + d,
                d = Math.cos(a) * b,
                b = Math.sin(a) * b;
            return {
                x: d + c,
                y: b + e
            }
        };
    cp.DD.getRotationAngle = function(b) {
        b = b.style.getPropertyValue("-webkit-transform");
        if (null === b) return 0;
        b = cp.getAngleFromRotateStr(b);
        return isNaN(b) ? 0 : b
    };
    cp.DD.ChangeMouseCursor = function(b) {
        cp.movie.stage.getSlideDiv().style.cursor = b
    };
    cp.DD.DefaultDocumentTouchStart = function() {};
    cp.DD.DefaultDocumentTouchMove = function(b) {
        if (b.target && b.target.isTocItem) cp.origTouchMove &&
            cp.origTouchMove != cp.DD.DefaultDocumentTouchMove && cp.origTouchMove(b);
        else {
            var a = document.documentElement;
            document.getElementById("cpDocument");
            var c = cp.D.project.w,
                e = cp.D.project.h,
                d = cp.D.project.shc;
            c <= a.clientWidth && e <= a.clientHeight && b.preventDefault();
            c <= a.clientHeight && e <= a.clientWidth && b.preventDefault();
            d && b.preventDefault()
        }
    };
    cp.DD.DefaultDocumentTouchEnd = function() {};
    cp.DD.asg = function(b, a, c, e) {
        Object.defineProperty ? Object.defineProperty(b, a, {
            get: c,
            set: e
        }) : b.__defineGetter__ && (c && b.__defineGetter__(a,
            c), e && b.__defineSetter__(a, e))
    };
    cp.DD.CustomDivStruct = function() {
        this.Height = this.Width = this.postop = this.posleft = null;
        if (cp.responsive) {
            var b = this;
            this.R_posleft = {};
            this.R_postop = {};
            this.R_Width = {};
            this.R_Height = {};
            cp.DD.asg(this, "posleft", function() {
                return void 0 == b.R_posleft[cp.ResponsiveProjWidth] ? null : b.R_posleft[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_posleft[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this, "postop", function() {
                    return void 0 == b.R_postop[cp.ResponsiveProjWidth] ? null : b.R_postop[cp.ResponsiveProjWidth]
                },
                function(a) {
                    b.R_postop[cp.ResponsiveProjWidth] = a
                });
            cp.DD.asg(this, "Width", function() {
                return void 0 == b.R_Width[cp.ResponsiveProjWidth] ? null : b.R_Width[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_Width[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this, "Height", function() {
                return void 0 == b.R_Height[cp.ResponsiveProjWidth] ? null : b.R_Height[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_Height[cp.ResponsiveProjWidth] = a
            })
        }
    };
    cp.DD.copyCustomDivStructObject = function(b) {
        var a = new cp.DD.CustomDivStruct;
        a.R_posleft = JSON.parse(JSON.stringify(b.R_posleft));
        a.R_postop = JSON.parse(JSON.stringify(b.R_postop));
        a.R_Width = JSON.parse(JSON.stringify(b.R_Width));
        a.R_Height = JSON.parse(JSON.stringify(b.R_Height));
        return a
    };
    cp.DD.CustomCanvasStruct = function() {
        this.MarginTop = this.MarginLeft = this.Height = this.Width = this.postop = this.posleft = null;
        if (cp.responsive) {
            this.textChildHeight = this.textChildWidth = this.textChildPosTop = this.textChildPosLeft = this.textHeight = this.textWidth = this.textPosTop = this.textPosLeft = null;
            var b = this;
            this.R_posleft = {};
            this.R_postop = {};
            this.R_Width = {};
            this.R_Height = {};
            this.R_MarginLeft = {};
            this.R_MarginTop = {};
            this.R_TextPosLeft = {};
            this.R_TextPosTop = {};
            this.R_TextWidth = {};
            this.R_TextHeight = {};
            this.R_TextChildPosLeft = {};
            this.R_TextChildPosTop = {};
            this.R_TextChildWidth = {};
            this.R_TextChildHeight = {};
            cp.DD.asg(this, "posleft", function() {
                return void 0 == b.R_posleft[cp.ResponsiveProjWidth] ? null : b.R_posleft[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_posleft[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this, "postop", function() {
                return void 0 == b.R_postop[cp.ResponsiveProjWidth] ?
                    null : b.R_postop[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_postop[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this, "Width", function() {
                return void 0 == b.R_Width[cp.ResponsiveProjWidth] ? null : b.R_Width[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_Width[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this, "Height", function() {
                return void 0 == b.R_Height[cp.ResponsiveProjWidth] ? null : b.R_Height[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_Height[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this, "MarginLeft", function() {
                return void 0 == b.R_MarginLeft[cp.ResponsiveProjWidth] ?
                    null : b.R_MarginLeft[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_MarginLeft[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this, "MarginTop", function() {
                return void 0 == b.R_MarginTop[cp.ResponsiveProjWidth] ? null : b.R_MarginTop[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_MarginTop[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this, "textPosLeft", function() {
                return void 0 == b.R_TextPosLeft[cp.ResponsiveProjWidth] ? null : b.R_TextPosLeft[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_TextPosLeft[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this,
                "textPosTop",
                function() {
                    return void 0 == b.R_TextPosTop[cp.ResponsiveProjWidth] ? null : b.R_TextPosTop[cp.ResponsiveProjWidth]
                },
                function(a) {
                    b.R_TextPosTop[cp.ResponsiveProjWidth] = a
                });
            cp.DD.asg(this, "textWidth", function() {
                return void 0 == b.R_TextWidth[cp.ResponsiveProjWidth] ? null : b.R_TextWidth[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_TextWidth[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this, "textHeight", function() {
                    return void 0 == b.R_TextHeight[cp.ResponsiveProjWidth] ? null : b.R_TextHeight[cp.ResponsiveProjWidth]
                },
                function(a) {
                    b.R_TextHeight[cp.ResponsiveProjWidth] = a
                });
            cp.DD.asg(this, "textChildPosLeft", function() {
                return void 0 == b.R_TextChildPosLeft[cp.ResponsiveProjWidth] ? null : b.R_TextChildPosLeft[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_TextChildPosLeft[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this, "textChildPosTop", function() {
                return void 0 == b.R_TextChildPosTop[cp.ResponsiveProjWidth] ? null : b.R_TextChildPosTop[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_TextChildPosTop[cp.ResponsiveProjWidth] = a
            });
            cp.DD.asg(this, "textChildWidth",
                function() {
                    return void 0 == b.R_TextChildWidth[cp.ResponsiveProjWidth] ? null : b.R_TextChildWidth[cp.ResponsiveProjWidth]
                },
                function(a) {
                    b.R_TextChildWidth[cp.ResponsiveProjWidth] = a
                });
            cp.DD.asg(this, "textChildHeight", function() {
                return void 0 == b.R_TextChildHeight[cp.ResponsiveProjWidth] ? null : b.R_TextChildHeight[cp.ResponsiveProjWidth]
            }, function(a) {
                b.R_TextChildHeight[cp.ResponsiveProjWidth] = a
            })
        }
    };
    cp.DD.copyCustomCanvasStructObject = function(b) {
        var a = new cp.DD.CustomCanvasStruct;
        a.R_posleft = JSON.parse(JSON.stringify(b.R_posleft));
        a.R_postop = JSON.parse(JSON.stringify(b.R_postop));
        a.R_Width = JSON.parse(JSON.stringify(b.R_Width));
        a.R_Height = JSON.parse(JSON.stringify(b.R_Height));
        a.R_MarginLeft = JSON.parse(JSON.stringify(b.R_MarginLeft));
        a.R_MarginTop = JSON.parse(JSON.stringify(b.R_MarginTop));
        a.R_TextPosLeft = JSON.parse(JSON.stringify(b.R_TextPosLeft));
        a.R_TextPosTop = JSON.parse(JSON.stringify(b.R_TextPosTop));
        a.R_TextWidth = JSON.parse(JSON.stringify(b.R_TextWidth));
        a.R_TextHeight = JSON.parse(JSON.stringify(b.R_TextHeight));
        a.R_TextChildPosLeft =
            JSON.parse(JSON.stringify(b.R_TextChildPosLeft));
        a.R_TextChildPosTop = JSON.parse(JSON.stringify(b.R_TextChildPosTop));
        a.R_TextChildWidth = JSON.parse(JSON.stringify(b.R_TextChildWidth));
        a.R_TextChildHeight = JSON.parse(JSON.stringify(b.R_TextChildHeight));
        return a
    };
    cp.DD.DragSourcePropertiesObject = function(b) {
        this.objectID = b;
        this.fset = document.getElementById(b);
        this.div = document.getElementById("re-" + b + "c");
        this.canvas = document.getElementById(b + "c");
        this.Height = this.Width = this.postop = this.posleft = this.Index =
            this.Opacity = this.DropTargetId = null;
        if (cp.responsive) {
            var a = this;
            this.R_posleft = {};
            this.R_postop = {};
            this.R_Width = {};
            this.R_Height = {};
            this.currentPositionId = this.objectID;
            this.postopRel = this.posleftRel = 0;
            cp.DD.asg(this, "posleft", function() {
                return void 0 == a.R_posleft[cp.ResponsiveProjWidth] ? null : a.R_posleft[cp.ResponsiveProjWidth]
            }, function(b) {
                a.R_posleft[cp.ResponsiveProjWidth] = b
            });
            cp.DD.asg(this, "postop", function() {
                    return void 0 == a.R_postop[cp.ResponsiveProjWidth] ? null : a.R_postop[cp.ResponsiveProjWidth]
                },
                function(b) {
                    a.R_postop[cp.ResponsiveProjWidth] = b
                });
            cp.DD.asg(this, "Width", function() {
                return void 0 == a.R_Width[cp.ResponsiveProjWidth] ? null : a.R_Width[cp.ResponsiveProjWidth]
            }, function(b) {
                a.R_Width[cp.ResponsiveProjWidth] = b
            });
            cp.DD.asg(this, "Height", function() {
                return void 0 == a.R_Height[cp.ResponsiveProjWidth] ? null : a.R_Height[cp.ResponsiveProjWidth]
            }, function(b) {
                a.R_Height[cp.ResponsiveProjWidth] = b
            })
        }
        this.objectState = this.zIndex = this.canvasStruct = this.divStruct = null
    };
    cp.DD.copyDragSourcePropertiesObject =
        function(b) {
            var a = new cp.DD.DragSourcePropertiesObject(b.objectID);
            a.DropTargetId = b.DropTargetId;
            a.Opacity = b.Opacity;
            a.Index = b.Index;
            a.R_posleft = JSON.parse(JSON.stringify(b.R_posleft));
            a.R_postop = JSON.parse(JSON.stringify(b.R_postop));
            a.R_Width = JSON.parse(JSON.stringify(b.R_Width));
            a.R_Height = JSON.parse(JSON.stringify(b.R_Height));
            a.currentPositionId = b.currentPositionId;
            a.posleftRel = b.posleftRel;
            a.postopRel = b.postopRel;
            a.divStruct = cp.DD.copyCustomDivStructObject(b.divStruct);
            a.canvasStruct = cp.DD.copyCustomCanvasStructObject(b.canvasStruct);
            a.zIndex = b.zIndex;
            a.objectState = b.objectState;
            return a
        };
    cp.DD.UpdateDragSourceStatePropertiesObject = function(b, a, c, e, d, f, g, h, k, l, m, o) {
        if (b && (null !== a && (b.Index = a), null !== c && (b.posleft = c), null !== e && (b.postop = e), null !== d && (b.Width = d), null !== f && (b.Height = f), null !== g && (b.Opacity = g), null !== h && (b.divStruct = cp.responsive ? cp.DD.copyCustomDivStructObject(h) : h), null !== k && (b.canvasStruct = cp.responsive ? cp.DD.copyCustomCanvasStructObject(k) : k), null != l && (b.zIndex = l), null != m && (b.currentPositionId = m), null != o)) b.objectState =
            o
    };
    cp.DD.R_UpdateDragSourceStatePropertiesObject = function(b, a, c, e, d, f, g, h, k, l, m, o, p) {
        if (b && (null !== c && (b.Index = c), null !== e && (b.R_posleft[a] = e), null !== d && (b.R_postop[a] = d), null !== f && (b.R_Width[a] = f), null !== g && (b.R_Height[a] = g), null !== h && (b.Opacity = h), null !== k && (b.divStruct = cp.DD.copyCustomDivStructObject(k)), null !== l && (b.canvasStruct = cp.DD.copyCustomCanvasStructObject(l)), null != m && (b.zIndex = m), null != o && (b.currentPositionId = o), null != p)) b.objectState = p
    };
    cp.DD.ClearDragSourcePropertiesList = function(b) {
        if (b)
            for (i =
                0; i < b.length; ++i) cp.DD.UpdateDragSourceStatePropertiesObject(b[i], null, null, null, null, null, null, null, null, null, null, null)
    };
    cp.DD.DragSourceLMSPropertiesObject = function(b) {
        this.objectID = b;
        this.currentDTID = this.previousDTID = this.postop = this.posleft = null;
        if (cp.responsive) {
            var a = this;
            this.R_posleft = {};
            this.R_postop = {};
            this.currentPositionId = this.objectID;
            cp.DD.asg(this, "posleft", function() {
                return void 0 == a.R_posleft[cp.ResponsiveProjWidth] ? null : a.R_posleft[cp.ResponsiveProjWidth]
            }, function(b) {
                a.R_posleft[cp.ResponsiveProjWidth] =
                    b
            });
            cp.DD.asg(this, "postop", function() {
                return void 0 == a.R_postop[cp.ResponsiveProjWidth] ? null : a.R_postop[cp.ResponsiveProjWidth]
            }, function(b) {
                a.R_postop[cp.ResponsiveProjWidth] = b
            })
        }
    };
    cp.DD.DropTargetLMSPropertiesObject = function(b) {
        this.objectID = b;
        this.dsHeight = this.dsWidth = null;
        this.acceptedDragSources = [];
        this.acceptedSourceObjects = [];
        this.prevAcceptedDragSources = [];
        this.prevAcceptedDragSourceObjects = [];
        if (cp.responsive) {
            var a = this;
            this.R_dsWidth = {};
            this.R_dsHeight = {};
            cp.DD.asg(this, "dsWidth", function() {
                return void 0 ==
                    a.R_dsWidth[cp.ResponsiveProjWidth] ? null : a.R_dsWidth[cp.ResponsiveProjWidth]
            }, function(b) {
                a.R_dsWidth[cp.ResponsiveProjWidth] = b
            });
            cp.DD.asg(this, "dsHeight", function() {
                return void 0 == a.R_dsHeight[cp.ResponsiveProjWidth] ? null : a.R_dsHeight[cp.ResponsiveProjWidth]
            }, function(b) {
                a.R_dsHeight[cp.ResponsiveProjWidth] = b
            })
        }
    };
    cp.DD.UpdateDivStructure = function(b) {
        var a, c = document.getElementById("div_Slide"),
            e = c.getElementsByClassName("cp-frameset"),
            d = null,
            f = [],
            g = {};
        for (a = 0; a < b.length; ++a)
            if (d = b[a]) {
                f.push(d);
                d.fset = document.getElementById(d.objectID);
                d.div = document.getElementById("re-" + d.objectID + "c");
                d.canvas = document.getElementById(d.objectID + "c");
                null == g[d.fset.id] && (g[d.fset.id] = []);
                for (var h = cp.DD.GetAllItemsInAllStates(d.fset.id), k = 0; k < h.length; k++) {
                    var l = h[k],
                        m = document.getElementById(l),
                        o = document.getElementById(cp.D[l].mdi).parentElement;
                    g[d.fset.id].push([l, m, o]);
                    c.removeChild(m);
                    e[0].removeChild(o)
                }
            }
        f.sort(cp.DD.DragSourceSortFunction);
        e[0].getElementsByClassName("cp-rewrap");
        for (a = 0; a < f.length; ++a)
            if (d =
                f[a])
                if (b = d.Index, null !== b) {
                    c = g[d.fset.id];
                    null !== d.posleft && (d.fset.style.left = parseFloat(d.posleft) + "px");
                    null !== d.postop && (d.fset.style.top = parseFloat(d.postop) + "px");
                    h = b;
                    c && (h = b - c.length + 1);
                    cp.MSIE == cp.browser ? cp.DD.UpdateDivProperties(d.fset, d, null) : cp.DD.UpdateDivProperties(d.fset, d, d.Opacity);
                    cp.DD.InsertBeforeConsideringStates_Cached(c, e[h + 1].id);
                    cp.DD.UpdateDivProperties(d.div, d.divStruct, d.Opacity);
                    d.fset.style.zIndex = d.zIndex;
                    d.div.style.zIndex = d.zIndex;
                    cp.DD.updateZIndicesOfAllStateItems(d.fset.id);
                    if (null !== cp.DD.CurrInteractionManager.m_ActiveInteraction && (document.getElementById(cp.D[d.fset.id].mdi), b = cp.DD.GetBaseItemInState(d.fset.id), c = d.fset.id, null !== b && (c = b.framesetID), b = document.getElementById(cp.D[c].mdi), b.style.visibility = "hidden", cp.responsive && cp.hide(d.objectID), c = cp.DD.CreateDummyCanvas(b), null !== c && null !== d.divStruct)) "cp-WebObject" === b.className && (cp.applyTransform(c.element, b.style.webkitTransform), cp.applyTransform(c.element, b.style.transform), c.element.style.width = b.clientWidth +
                        "px", c.element.style.height = b.clientHeight + "px"), c.element.style.visibility = "visible", cp.DD.AnimateObjectGliding(b, c, parseFloat(d.div.style.left), parseFloat(d.div.style.top), parseFloat(d.divStruct.posleft), parseFloat(d.divStruct.postop), 20, d);
                    d.canvas.style.opacity = d.Opacity;
                    cp.DD.updateOpacityOfAllStateItems(d.fset.id, d.Opacity);
                    b = d.divStruct;
                    if (null !== b && (null !== b.posleft && (d.div.style.left = parseFloat(b.posleft) + "px"), null !== b.postop && (d.div.style.top = parseFloat(b.postop) + "px"), null !== b.Width &&
                            (d.div.style.width = parseFloat(b.Width) + "px"), null !== b.Height)) d.div.style.height = parseFloat(b.Height) + "px";
                    b = d.canvasStruct;
                    if (null !== b && (null !== b.posleft && (d.canvas.style.left = parseFloat(b.posleft) + "px"), null !== b.postop && (d.canvas.style.top = parseFloat(b.postop) + "px"), null !== b.Width && (d.canvas.style.width = parseFloat(b.Width) + "px"), null !== b.Height && (d.canvas.style.height = parseFloat(b.Height) + "px"), null !== b.MarginLeft && (d.canvas.style.marginLeft = parseFloat(b.MarginLeft) + "px"), null !== b.MarginTop)) d.canvas.style.marginTop =
                        parseFloat(b.MarginTop) + "px";
                    cp.DD.UpdateSizeNPosOfAllStateItems(d.fset.id, cp.DD.populateBoundsForStateItems(d, 2))
                }
    };
    cp.DD.AnimateObjectGliding = function(b, a, c, e, d, f, g, h) {
        function k() {
            if (0 === g) {
                document.getElementById("div_Slide").removeChild(a.element);
                b.style.visibility = "visible";
                if (cp.responsive && h) {
                    cp.show(h.objectID);
                    var c = cp(h.objectID + "_vTxtHolder");
                    if (c) {
                        cp(h.objectID);
                        var d = h.canvasStruct;
                        d && (c.style.left = d.textPosLeft, c.style.top = d.textPosTop, c.style.width = d.textWidth, c.style.height = d.textHeight);
                        var e = {
                            bUpdateTextChildSize: !1
                        };
                        if (c.firstChild) {
                            c.firstChild.style.left = d.textChildPosLeft;
                            c.firstChild.style.top = d.textChildPosTop;
                            c.firstChild.style["-ms-transform-origin"] = "left top";
                            c.firstChild.style["-moz-transform-origin"] = "left top";
                            c.firstChild.style["-webkit-transform-origin"] = "left top";
                            c.firstChild.style["-o-transform-origin"] = "left top";
                            c.firstChild.style["transform-origin"] = "left top";
                            var d = 1,
                                f = "scale(1)";
                            if (h.currentPositionId != h.objectID) {
                                var t = cp.DD.CurrInteractionManager.m_ActiveInteraction.GetDTObjFromDTID(h.currentPositionId);
                                t && (f = "scale(" + t.sbs / 100 + ")", d = t.sbs / 100)
                            }
                            cp.applyTransform(c.firstChild, f);
                            e.bUpdateScale = !0;
                            e.scale = d
                        }
                        cp.DD.UpdateTextBoundsOfAllStateItems(h.objectID, cp.DD.populateTextBoundsForStateItems(h, e))
                    }
                }
                cp.DD.changeState(h.objectID, h.objectState, cp.DD.CurrInteractionManager.m_ActiveInteraction)
            } else a.element.style.left = parseFloat(a.element.style.left) + m + "px", a.element.style.top = parseFloat(a.element.style.top) + l + "px", g -= 1, setTimeout(k, 20)
        }
        var l = (f - e) / g,
            m = (d - c) / g;
        setTimeout(k, 20)
    };
    cp.DD.CreateDummyCanvas =
        function(b, a) {
            var c = 0,
                e = 0,
                c = b.style && parseFloat(b.style.width) ? parseFloat(b.style.width) : b.width,
                e = b.style && parseFloat(b.style.height) ? parseFloat(b.style.height) : b.height,
                d = cp.createCanvas(0, 0, c, e, cp.newElem("canvas"));
            d.element.style.display = "block";
            d.element.style.position = "absolute";
            d.element.style.visibility = "hidden";
            d.element.style.marginLeft = "0px";
            d.element.style.marginTop = "0px";
            "" !== b.style.opacity && (d.element.style.opacity = b.style.opacity);
            gc = d.gc;
            if ("cp-animationItem" === b.className || "cp-WebObject" ===
                b.className) {
                var f = new Image,
                    g = cp.D[b.id];
                f.onload = function() {
                    d.gc.drawImage(f, 0, 0, c, e)
                };
                var h = g.ip,
                    g = cp.movie.im;
                h && g && g.getImageDataURI(h, function(a) {
                    h = a
                });
                f.src = h
            } else if (gc.drawImage(b, 0, 0, c, e), g = b.parentElement, 1 < g.childNodes.length && (g = g.getElementsByClassName("cp-vtxt"), null != g && 1 == g.length)) {
                var g = g[0],
                    k = "";
                g.firstChild.firstChild.firstChild.firstChild && (k = g.firstChild.firstChild.firstChild.firstChild.textContent);
                gc.font = g.firstChild.firstChild.firstChild.style.font;
                gc.fillStyle = g.firstChild.firstChild.firstChild.style.color;
                var l = g.firstChild.firstChild.style.textAlign;
                gc.textBaseline = "top";
                "left" == l ? (gc.textAlign = "left", gc.fillText(k, parseFloat(g.style.marginLeft), parseFloat(g.style.marginTop) - 2)) : "center" == l ? (gc.textAlign = "center", gc.fillText(k, parseFloat(g.style.marginLeft) + parseFloat(g.style.width) / 2, parseFloat(g.style.marginTop) - 2)) : "right" == l ? (gc.textAlign = "right", gc.fillText(k, parseFloat(g.style.marginLeft) + parseFloat(g.style.width), parseFloat(g.style.marginTop) - 2)) : (gc.textAlign = "left", gc.fillText(k, parseFloat(g.style.marginLeft),
                    parseFloat(g.style.marginTop) - 2))
            }
            void 0 === a ? (document.getElementById("div_Slide").appendChild(d.element), d.element.style.zIndex = 2E3) : a.parentNode && "div_Slide" === a.parentNode.id ? (document.getElementById("div_Slide").insertBefore(d.element, a), d.element.style.zIndex = a.style.zIndex) : (document.getElementById("div_Slide").appendChild(d.element), d.element.style.zIndex = 2E3);
            parentEl = b.parentElement;
            d.element.style.left = parseFloat(parentEl.style.left) + parseFloat(b.style.marginLeft) + "px";
            d.element.style.top =
                parseFloat(parentEl.style.top) + parseFloat(b.style.marginTop) + "px";
            return d
        };
    cp.DD.UpdateDivProperties = function(b, a, c) {
        if (b && (null !== a.Width && (b.style.width = parseFloat(a.Width) + "px"), null !== a.Height && (b.style.height = parseFloat(a.Height) + "px"), null !== c)) b.style.opacity = c;
        return b
    };
    cp.DD.SortDragSourceList = function() {};
    cp.DD.CurrInteractionManager = null;
    cp.DD.IsTouchDevice = function() {
        return cp.device == cp.IDEVICE || cp.device == cp.ANDROID || cp.device == cp.KINDLE ? !0 : !1
    };
    cp.CreateInteractionManager = function(b) {
        return new cp.DD.InteractionManager(b)
    };
    cp.SetCurrentInteractionManager = function(b) {
        cp.DD.CurrInteractionManager = b
    };
    cp.GetCurrentInteractionManager = function() {
        return cp.DD.CurrInteractionManager
    };
    cp.DD.spv = function(b, a, c) {
        if (b && cp.responsive) {
            b.getBoundingClientRect();
            var e = cp("div_Slide");
            b.parentElement.getBoundingClientRect();
            var d = b.parentElement;
            "div_Slide" == d.id && (d = e);
            "" != b.style.left && -1 != b.style.left.indexOf("%") ? b.style.left = parseFloat(b.style.left) * d.clientWidth / 100 + "px" : -1 == b.style.left.indexOf("px") && "" != b.style.right && (b.style.left = -1 != b.style.right.indexOf("%") ? Math.ceil(d.clientWidth - b.clientWidth) - parseFloat(b.style.right) * d.clientWidth / 100 + "px" : Math.ceil(d.clientWidth - b.clientWidth) - parseFloat(b.style.right) + "px");
            "" != b.style.top && -1 != b.style.top.indexOf("%") ? b.style.top = parseFloat(b.style.top) * d.clientHeight / 100 + "px" : -1 == b.style.top.indexOf("px") && "" != b.style.bottom && (-1 != b.style.bottom.indexOf("%") ? b.style.top = Math.ceil(d.clientHeight - b.clientHeight) - parseFloat(b.style.bottom) * d.clientHeight / 100 + "px" : -1 != b.style.bottom.indexOf("px") &&
                (b.style.top = Math.ceil(d.clientHeight - b.clientHeight) - parseFloat(b.style.bottom) + "px"));
            b.style.width = Math.ceil(b.clientWidth) + "px";
            b.style.height = Math.ceil(b.clientHeight) + "px";
            isNaN(parseFloat(b.style.marginLeft)) && (b.style.marginLeft = "0px");
            isNaN(parseFloat(b.style.marginTop)) && (b.style.marginTop = "0px");
            cp.DD.spvOfAllStateItems(a, c)
        }
    };
    cp.DD.spvOfAllStateItems = function(b, a) {
        if (!(void 0 === b || void 0 === a))
            for (var c = cp.DD.GetBaseItemsInAllStates(b), e = 0; e < c.length; e++) {
                var d = c[e];
                if (d && (d = d.item, d.framesetID !==
                        b)) {
                    var f;
                    switch (a) {
                        case 0:
                            f = document.getElementById(d.framesetID);
                            break;
                        case 1:
                            f = document.getElementById(d.divID);
                            break;
                        case 2:
                            f = document.getElementById(d.canvasID)
                    }
                    f && cp.DD.spv(f)
                }
            }
    };
    cp.DD.GetObjectStateItems = function(b, a) {
        var c = [],
            e = [],
            d = cp.D[b];
        if (!d) return e;
        var f = !1;
        void 0 === a && (f = !0);
        var g = cp.getDisplayObjByKey(d.mdi);
        if (g)
            if (d = g.states, g = g.currentState, f) 0 <= g && g < d.length && (c = d[g].stsi);
            else
                for (f = 0; f < d.length; f++)
                    if ((g = d[f]) && g.stn == a) c = g.stsi;
        for (d = 0; d < c.length; d++) f = c[d], g = cp.getDisplayObjNameByCP_UID(f),
            e.push({
                UID: f,
                framesetID: g,
                divID: "re-" + g + "c",
                canvasID: g + "c"
            });
        return e
    };
    cp.DD.getBaseStateItem = function(b) {
        var a = b;
        if (b = cp.D[b])(b = cp.getDisplayObjByKey(b.mdi)) && -1 !== b.baseStateItemID && (a = cp.getDisplayObjNameByCP_UID(b.baseStateItemID));
        return a
    };
    cp.DD.GetBaseItemInState = function(b, a) {
        for (var c = null, e = cp.DD.GetObjectStateItems(b, a), d = 0; d < e.length; d++) {
            var f = e[d];
            if (f) {
                var g = cp.getDisplayObjByKey(f.canvasID);
                if (g)
                    if (-1 === g.baseStateItemID) {
                        c = f;
                        break
                    } else if (g.cloneOfBaseStateItem) {
                    c = f;
                    break
                }
            }
        }
        return c
    };
    cp.DD.GetBaseItemsInAllStates = function(b) {
        var a = [],
            c = cp.D[b];
        if (!c) return a;
        if (c = cp.getDisplayObjByKey(c.mdi))
            for (var c = c.states, e = 0; e < c.length; e++) {
                var d = c[e];
                if (d) {
                    var f = cp.DD.GetBaseItemInState(b, d.stn);
                    f && a.push({
                        item: f,
                        stateType: d.stt
                    })
                }
            }
        return a
    };
    cp.DD.getCurrentObjectStateProperties = function(b) {
        var a = void 0,
            b = cp.D[b];
        if (!b) return a;
        var c = cp.getDisplayObjByKey(b.mdi);
        c && (b = c.states, c = c.currentState, 0 <= c && c < b.length && (a = b[c]));
        return a
    };
    cp.DD.getCurrentStateName = function(b) {
        var a = "";
        if (b = cp.DD.getCurrentObjectStateProperties(b)) a =
            b.stn;
        return a
    };
    cp.DD.RegisterObjectStateItems = function(b, a) {
        var c = cp.DD.GetBaseItemInState(b);
        if (c && (c = document.getElementById(c.framesetID))) cp.DD.IsTouchDevice() ? c.ontouchstart = a.ItemOnMouseDown : c.onmousedown = a.ItemOnMouseDown, !0 === cp.DD.getAttribute(a.m_elId, "hc") && (c.onmouseover = a.ItemOnMouseOver, c.onmouseout = a.ItemOnMouseOut)
    };
    cp.DD.UnregisterObjectStateItems = function(b, a) {
        var c = cp.DD.GetBaseItemInState(b);
        if (c && (c = document.getElementById(c.framesetID))) cp.DD.IsTouchDevice() ? c.ontouchstart =
            null : c.onmousedown = null, !0 === cp.DD.getAttribute(a.m_elId, "hc") && (c.onmouseover = null, c.onmouseout = null)
    };
    cp.DD.populateBoundsForStateItems = function(b, a) {
        var c = {
                fsLeft: null,
                fsTop: null,
                fsW: null,
                fsH: null,
                divLeft: null,
                divTop: null,
                divW: null,
                divH: null,
                canvasW: null,
                canvasH: null,
                canvasMarginLeft: null,
                canvasMarginTop: null
            },
            e = 0 === a || 2 === a,
            d = 1 === a || 2 === a;
        if (b) {
            var f = b.divStruct,
                g = b.canvasStruct;
            e && (c.fsLeft = b.posleft, c.fsTop = b.postop);
            d && (c.fsW = b.Width, c.fsH = b.Height);
            if (f && (e && (c.divLeft = f.posleft, c.divTop =
                    f.postop), d)) c.divW = f.Width, c.divH = f.Height;
            g && d && (c.canvasW = g.Width, c.canvasH = g.Height, c.canvasMarginLeft = g.MarginLeft, c.canvasMarginTop = g.MarginTop)
        }
        return c
    };
    cp.DD.IsTransitionState = function(b) {
        return b === cp.kSTTDragOver || b === cp.kSTTDragStart ? !0 : !1
    };
    cp.DD.UpdateSizeNPosOfAllStateItems = function(b, a) {
        for (var c = cp.DD.GetBaseItemsInAllStates(b), e = 0; e < c.length; e++) {
            var d = c[e];
            if (d) {
                var d = d.item,
                    f = !cp.DD.IsTransitionState(c[e].stateType);
                if (d.framesetID !== b) {
                    var g = document.getElementById(d.framesetID),
                        d = document.getElementById(cp.D[d.framesetID].mdi);
                    if (!d || !g) break;
                    var h = d.parentElement;
                    if (!h) break;
                    f && null !== a.divW && (h.style.width = a.divW);
                    f && null !== a.divH && (h.style.height = a.divH);
                    f && null !== a.fsW && (g.style.width = a.fsW);
                    f && null !== a.fsH && (g.style.height = a.fsH);
                    f && null !== a.canvasW && (d.style.width = a.canvasW);
                    f && null !== a.canvasH && (d.style.height = a.canvasH);
                    null !== a.canvasMarginLeft && (d.style.marginLeft = a.canvasMarginLeft);
                    null !== a.canvasMarginTop && (d.style.marginTop = a.canvasMarginTop);
                    null !== a.fsLeft &&
                        (g.style.left = a.fsLeft);
                    null !== a.fsTop && (g.style.top = a.fsTop);
                    null !== a.divLeft && (h.style.left = a.divLeft);
                    null !== a.divTop && (h.style.top = a.divTop)
                }
            }
        }
    };
    cp.DD.updateOpacityOfAllStateItems = function(b, a) {
        for (var c = cp.DD.GetBaseItemsInAllStates(b), e = 0; e < c.length; e++) {
            var d = c[e];
            if (d && (d = d.item, d.framesetID !== b)) {
                d = document.getElementById(cp.D[d.framesetID].mdi);
                if (!d) break;
                d.style.opacity = a
            }
        }
    };
    cp.DD.initializeTextBoundsForStateItems = function() {
        return {
            textPosLeft: null,
            textPosTop: null,
            textWidth: null,
            textHeight: null,
            textChildPosLeft: null,
            textChildPosTop: null,
            textChildWidth: null,
            textChildHeight: null,
            scale: null
        }
    };
    cp.DD.populateTextBoundsForStateItems = function(b, a) {
        void 0 === a && (a.bUpdateTextChildSize = !0, a.bUpdateScale = !1, a.scale = 1);
        var c = cp.DD.initializeTextBoundsForStateItems();
        if (!b || !b.canvasStruct) return c;
        if (cp.responsive && (c.textPosLeft = b.canvasStruct.textPosLeft, c.textPosTop = b.canvasStruct.textPosTop, c.textWidth = b.canvasStruct.textWidth, c.textHeight = b.canvasStruct.textHeight, c.textChildPosLeft = b.canvasStruct.textChildPosLeft,
                c.textChildPosTop = b.canvasStruct.textChildPosTop, void 0 !== a.bUpdateTextChildSize && a.bUpdateTextChildSize && (c.textChildWidth = b.canvasStruct.textChildWidth, c.textChildHeight = b.canvasStruct.textChildHeight), void 0 !== a.bUpdateScale && a.bUpdateScale)) c.scale = a.scale;
        return c
    };
    cp.DD.UpdateTextBoundsOfAllStateItems = function(b, a) {
        for (var c = cp.DD.GetBaseItemsInAllStates(b), e = 0; e < c.length; e++) {
            var d = c[e];
            if (d && (d = d.item, !cp.DD.IsTransitionState(c[e].stateType) && (d = d.framesetID, d !== b && cp.responsive && (d = cp(d +
                    "_vTxtHolder")))))
                if (null != a.textPosLeft && (d.style.left = a.textPosLeft), null != a.textPosTop && (d.style.top = a.textPosTop), null != a.textWidth && (d.style.width = a.textWidth), null != a.textHeight && (d.style.height = a.textHeight), d.firstChild)
                    if (null != a.textChildPosLeft && (d.firstChild.style.left = a.textChildPosLeft), null != a.textChildPosTop && (d.firstChild.style.top = a.textChildPosTop), null !== a.textChildWidth && (d.firstChild.style.width = a.textChildWidth), null !== a.textChildHeight && (d.firstChild.style.height = a.textChildHeight),
                        null != a.scale) d.firstChild.style["-ms-transform-origin"] = "left top", d.firstChild.style["-moz-transform-origin"] = "left top", d.firstChild.style["-webkit-transform-origin"] = "left top", d.firstChild.style["-o-transform-origin"] = "left top", d.firstChild.style["transform-origin"] = "left top", cp.applyTransform(d.firstChild, "scale(" + a.scale + ")")
        }
    };
    cp.DD.changeStateAfterSomeTime = function(b, a, c, e) {
        setTimeout(function() {
            cp.DD.changeState(b, a, c)
        }, e)
    };
    cp.DD.changeStateForSomeTime = function(b, a, c, e, d, f) {
        void 0 === d &&
            (d = !1);
        var g = cp.DD.getCurrentStateName(b);
        cp.DD.changeState(b, a, c);
        !0 === d && cp.DD.DisableDrag(b);
        setTimeout(function() {
            var e = cp.DD.getCurrentStateName(b);
            !0 === d && cp.DD.EnableDrag(b);
            e === a && (void 0 == f ? cp.DD.changeState(b, g, c) : cp.DD.changeState(b, f, c))
        }, e)
    };
    cp.DD.DisableDrag = function(b) {
        var a, b = cp.DD.GetBaseItemInState(b);
        null !== b && (a = document.getElementById(b.framesetID));
        void 0 != a && (cp.DD.IsTouchDevice() ? a.ontouchstart = null : a.onmousedown = null)
    };
    cp.DD.EnableDrag = function(b) {
        var a = cp.DD.CurrInteractionManager.m_ActiveInteraction,
            c, b = cp.DD.GetBaseItemInState(b);
        null !== b && (c = document.getElementById(b.framesetID));
        void 0 != c && (cp.DD.IsTouchDevice() ? c.ontouchstart = a.ItemOnMouseDown : c.onmousedown = a.ItemOnMouseDown)
    };
    cp.DD.HasMouseHandlers = function(b) {
        var a = !1,
            c = cp.DD.GetBaseItemInState(b);
        null !== c && (b = c.framesetID);
        (c = document.getElementById(b)) && (a = cp.DD.IsTouchDevice() ? null !== c.ontouchstart : null !== c.onmousedown);
        return a
    };
    cp.DD.changeState = function(b, a, c) {
        var e = cp.DD.HasMouseHandlers(b);
        c && e && cp.DD.UnregisterObjectStateItems(b,
            c);
        cp.changeState(b, a);
        c && e && cp.DD.RegisterObjectStateItems(b, c)
    };
    cp.DD.GetAllItemsInAllStates = function(b) {
        for (var a = [], b = cp.DD.getBaseStateItem(b), c = document.getElementById("div_Slide").getElementsByClassName("cp-frameset"), e = 1; e < c.length; ++e) {
            var d = c[e].id;
            cp.DD.getBaseStateItem(d) === b && a.push(d)
        }
        return a
    };
    cp.DD.InsertBeforeConsideringStates = function(b, a) {
        var c = cp.DD.GetAllItemsInAllStates(b),
            e = cp.DD.GetAllItemsInAllStates(a);
        if (0 !== e.length)
            for (var d = e[0], e = c.length - 1; 0 <= e; e--) {
                var f = c[e],
                    g = document.getElementById(f),
                    h = document.getElementById(cp.D[f].mdi).parentElement,
                    k = document.getElementById(d),
                    d = document.getElementById(cp.D[d].mdi).parentElement;
                k.parentNode.insertBefore(g, k);
                d.parentNode.insertBefore(h, d);
                d = f
            }
    };
    cp.DD.InsertBeforeConsideringStates_Cached = function(b, a) {
        var c = cp.DD.GetAllItemsInAllStates(a);
        if (0 !== c.length)
            for (var e = c[0], c = b.length - 1; 0 <= c; c--) {
                var d = b[c],
                    f = d[0],
                    g = d[1],
                    d = d[2],
                    h = document.getElementById(e),
                    e = document.getElementById(cp.D[e].mdi).parentElement;
                h.parentNode.insertBefore(g, h);
                e.parentNode.insertBefore(d,
                    e);
                e = f
            }
    };
    cp.DD.GetZIndexValue = function(b, a, c) {
        var e = cp.DD.GetAllItemsInAllStates(b),
            d = document.getElementById(b),
            b = document.getElementById(cp.D[b].mdi).parentElement;
        a.fset = d.style.zIndex;
        a.div = b.style.zIndex;
        for (d = e.length - 1; 0 <= d; d--) {
            var f = e[d],
                b = document.getElementById(f),
                f = document.getElementById(cp.D[f].mdi).parentElement;
            0 === c ? (a.fset = Math.max(a.fset, b.style.zIndex), a.div = Math.max(a.div, f.style.zIndex)) : 1 === c && (a.fset = Math.min(a.fset, b.style.zIndex), a.div = Math.min(a.div, f.style.zIndex))
        }
    };
    cp.DD.updateZIndicesOfAllStateItems =
        function(b) {
            for (var a = cp.DD.GetAllItemsInAllStates(b), c = document.getElementById(b), b = document.getElementById(cp.D[b].mdi).parentElement, e = a.length - 1; 0 <= e; e--) {
                var d = a[e],
                    f = document.getElementById(d),
                    d = document.getElementById(cp.D[d].mdi).parentElement;
                f.style.zIndex = c.style.zIndex;
                d.style.zIndex = b.style.zIndex
            }
        };
    cp.DD.parseAnswerStringIntoMap = function(b, a) {
        var c = {};
        if (0 === a)
            for (var e = /\(|\}|\}\(/g, e = b.replace(/\\b/g, "").split(e), d = 0; d < e.length; d++) {
                var f = e[d];
                if ("" !== f) {
                    var g = f.split("){");
                    if (2 ===
                        g.length && (f = g[0], g = g[1], f = f.replace(/t:/g, ""), f = f.split("-"), 2 === f.length)) {
                        var h = f[0],
                            f = f[1],
                            h = {
                                sourceType: h,
                                count: parseInt(g, 10)
                            };
                        void 0 === c[f] && (c[f] = []);
                        c[f].push(h)
                    }
                }
            } else if (1 === a) {
                e = /t:|-t:/g;
                e = b.split(e);
                g = null;
                h = !0;
                for (d = 0; d < e.length; d++)
                    if (f = e[d], "" !== f)
                        if (h) g = h = f, h = !1;
                        else {
                            if (g)
                                if (void 0 === c[f]) c[f] = [], h = {
                                    sourceType: g,
                                    count: 1
                                }, c[f].push(h);
                                else {
                                    for (var h = c[f], k = !1, l = 0; l < h.length; l++) {
                                        var m = h[l];
                                        if (m && g === m.sourceType) {
                                            m.count += 1;
                                            k = !0;
                                            break
                                        }
                                    }
                                    k || (h = {
                                        sourceType: g,
                                        count: 1
                                    }, c[f].push(h))
                                }
                            h = !0
                        }
            }
        return c
    };
    cp.DD.updateObjectStateNames = function() {
        cp.DD.ObjectStateNames.kCPNormal = cp.getLocalisedStateName("kCPNormalState");
        cp.DD.ObjectStateNames.kCPDragStart = cp.getLocalisedStateName("kCPDragstartState");
        cp.DD.ObjectStateNames.kCPDragOver = cp.getLocalisedStateName("kCPDragoverState");
        cp.DD.ObjectStateNames.kCPDropAccept = cp.getLocalisedStateName("kCPDropAccept");
        cp.DD.ObjectStateNames.kCPDropReject = cp.getLocalisedStateName("kCPDropReject");
        cp.DD.ObjectStateNames.kCPDropCorrect = cp.getLocalisedStateName("kCPDropCorrect");
        cp.DD.ObjectStateNames.kCPDropIncorrect = cp.getLocalisedStateName("kCPDropIncorrect")
    };
    cp.DD.hasStateWithName = function(b, a) {
        var c = !1,
            e = cp.D[b];
        if (!e) return c;
        if (e = cp.getDisplayObjByKey(e.mdi))
            for (var e = e.states, d = 0; d < e.length; d++) {
                var f = e[d];
                f && f.stn == a && (c = !0)
            }
        return c
    };
    cp.DD.InteractionManager = function(b) {
        this.m_ActiveInteraction = null;
        this.m_InteractionList = b;
        null !== this.m_InteractionList && 0 < this.m_InteractionList.length && (this.m_ActiveInteraction = new cp.DD.Interaction(this.m_InteractionList[0].n),
            this.m_ActiveInteractionIndex = 0);
        cp.DD.updateObjectStateNames()
    };
    cp.DD.InteractionManager.prototype.getActiveInteraction = function() {
        return this.m_ActiveInteraction
    };
    cp.DD.InteractionManager.prototype.changeActiveInteraction = function() {
        var b = this.m_ActiveInteraction;
        if (null !== b) {
            if (0 < b.m_dsList.length)
                for (var a = 0; a < b.m_dsList.length; ++a) {
                    dsDiv = document.getElementById(b.m_dsList[a].n);
                    var c = cp.DD.GetBaseItemInState(b.m_dsList[a].n);
                    null !== c && (dsDiv = document.getElementById(c.framesetID));
                    cp.DD.IsTouchDevice() ?
                        (dsDiv.ontouchstart = null, dsDiv.ontouchmove = null, dsDiv.ontouchend = null) : (dsDiv.onmousedown = null, dsDiv.onmouseover = null, dsDiv.onmouseout = null)
                }
            b.clearAnswerList();
            this.m_ActiveInteractionIndex += 1;
            null !== this.m_InteractionList && this.m_InteractionList.length > this.m_ActiveInteractionIndex && (this.m_ActiveInteraction = new cp.DD.Interaction(this.m_InteractionList[this.m_ActiveInteractionIndex].n))
        }
    };
    cp.DD.InteractionManager.prototype.PauseAtFrame = function() {
        return this.m_ActiveInteraction ? this.m_ActiveInteraction.m_PauseAt :
            -1
    };
    cp.DD.InteractionManager.prototype.CheckInteractionPause = function(b) {
        var a = this.m_ActiveInteraction;
        if (a.m_questionObj) {
            if (!0 === a.m_questionObj.isDisabled) return !1
        } else if (a.m_InteractionCompleted) return !1;
        return 0 < a.m_maxAttempts && a.m_CurrentAttempt >= a.m_maxAttempts ? !1 : a.m_PauseAt === b ? !0 : !1
    };
    cp.DD.InteractionManager.prototype.handleSlideExit = function() {
        this.m_ActiveInteraction && cp.responsive && this.m_ActiveInteraction.handleSlideExit(!0)
    };
    cp.DD.InteractionManager.prototype.saveResponsiveInteractionState =
        function(b) {
            this.m_ActiveInteraction && (cp.responsive && b == cp.ReasonForDrawing.kOrientationChangeOrResize) && this.m_ActiveInteraction.storeSuspendData(!0)
        };
    cp.DD.InteractionManager.prototype.adjustResponsiveInteraction = function(b) {
        if (this.m_ActiveInteraction && cp.responsive && b == cp.ReasonForDrawing.kOrientationChangeOrResize) {
            this.m_ActiveInteraction.m_attemptedAnswerString = [];
            this.m_ActiveInteraction.resumeInteraction(!0);
            var b = this.m_ActiveInteraction.m_dsList,
                a = this.m_ActiveInteraction.DSMap,
                c = this.m_ActiveInteraction.DragSourceCurrentStateList,
                e = this.m_ActiveInteraction.DragSourcePreviousStateList;
            if (b)
                for (i = 0; i < b.length; ++i) {
                    var d = c[a[b[i].n]],
                        f = e[a[b[i].n]];
                    "" == d.currentPositionId && (d.currentPositionId = d.objectID);
                    "" == f.currentPositionId && (f.currentPositionId = d.objectID)
                }
        }
    };
    cp.DD.InteractionManager.prototype.registerDisplayObject = function(b) {
        if (null !== this.m_ActiveInteraction) {
            var a = this.m_ActiveInteraction,
                c = b.substr(0, b.length - 1),
                e = cp.D[c];
            if (e) {
                var d = "re-" + b,
                    f = cp.getDisplayObjByKey(b),
                    g = c;
                f && f.cloneOfBaseStateItem && (g = cp.getDisplayObjNameByCP_UID(f.baseStateItemID));
                !0 === e.isDDB && (a.m_buttonIDList.push(d), a.m_questionObj && a.m_questionObj.isDisabled || 0 < a.m_maxAttempts && a.m_CurrentAttempt >= a.m_maxAttempts ? (document.getElementById(d).style.visibility = "hidden", cp.responsive && cp.hide(c)) : cp.show(c));
                for (var h = f = !1, k, l = 0; l < a.m_dsList.length && !f; ++l) {
                    k = a.m_dsList[l].n;
                    document.getElementById(k);
                    if (k === c) {
                        f = !0;
                        break
                    }
                    k === g && (h = !0)
                }
                for (l = 0; l < a.m_dtList.length && !f; ++l) {
                    k = a.m_dtList[l].n;
                    document.getElementById(k);
                    if (k === c) {
                        f = !0;
                        break
                    }
                    k === g && (h = !0)
                }
                if (e.isPartOfInteraction =
                    f) {
                    1 === a.m_resumeItemsMap[c] && (a.m_resumeItemsMap[c] = 0, a.m_resumeItemsToBeDrawn -= 1);
                    for (e = 0; e < a.m_dtList.length; ++e)
                        if (k = a.m_dtList[e].n, dtObj = a.GetDTObjFromDTID(k), g = document.getElementById(k), null !== dtObj && null !== g && (f = dtObj.dep, !(void 0 === f || null === f || 0 >= f.length) && !cp.DD.IsTouchDevice())) g.setAttribute("onmouseover", 'cp.showHint("' + dtObj.dep[0] + '",this)'), g.setAttribute("onmouseout", 'cp.hideHint("' + dtObj.dep[0] + '",this)');
                    g = this.m_ActiveInteraction;
                    f = g.DSMap[c];
                    e = document.getElementById(c);
                    m =
                        document.getElementById(b);
                    o = document.getElementById(d);
                    if (!(null === f || void 0 === f)) {
                        b = g.DragSourceCurrentStateList[f];
                        d = g.DragSourceInitialStateList[f];
                        g = function(a) {
                            cp.DD.spv(o, c, 1);
                            a.posleft = o.style.left;
                            a.postop = o.style.top;
                            a.Width = o.style.width;
                            a.Height = o.style.height
                        };
                        f = function(a) {
                            cp.DD.spv(m, c, 2);
                            a.posleft = m.style.left;
                            a.postop = m.style.top;
                            a.Width = m.style.width;
                            a.Height = m.style.height;
                            a.MarginLeft = m.style.marginLeft;
                            a.MarginTop = m.style.marginTop;
                            var b = cp(c + "_vTxtHolder");
                            if (b) {
                                a.textPosLeft =
                                    b.style.left;
                                a.textPosTop = b.style.top;
                                a.textWidth = b.style.width;
                                a.textHeight = b.style.height;
                                if (b.firstChild) {
                                    a.textChildPosLeft = b.firstChild.style.left;
                                    a.textChildPosTop = b.firstChild.style.top;
                                    a.textChildWidth = b.firstChild.style.width;
                                    a.textChildHeight = b.firstChild.style.height
                                }
                            }
                        };
                        if (void 0 !== b && void 0 !== d) {
                            cp.DD.spv(e, c, 0);
                            if (0 === a.registeredMap[c] || cp.responsive) d.posleft = e.style.left, d.postop = e.style.top, d.Width = e.style.width, d.Height = e.style.height, void 0 == d.divStruct && (d.divStruct = new cp.DD.CustomDivStruct),
                                g(d.divStruct), void 0 == d.canvasStruct && (d.canvasStruct = new cp.DD.CustomCanvasStruct), f(d.canvasStruct), d.DropTargetId = null, d.zIndex = e.style.zIndex, void 0 == d.objectState && (d.objectState = cp.DD.getCurrentStateName(c)), a.registeredMap[c] = 1;
                            b.posleft = e.style.left;
                            b.postop = e.style.top;
                            b.Width = e.style.width;
                            b.Height = e.style.height;
                            void 0 == b.divStruct && (b.divStruct = new cp.DD.CustomDivStruct);
                            g(b.divStruct);
                            void 0 == b.canvasStruct && (b.canvasStruct = new cp.DD.CustomCanvasStruct);
                            f(b.canvasStruct);
                            b.DropTargetId =
                                null;
                            b.zIndex = e.style.zIndex;
                            b.objectState = cp.DD.getCurrentStateName(c)
                        }
                        void 0 == a.DSLMSMap[c] && (a.DSLMSMap[c] = new cp.DD.DragSourceLMSPropertiesObject(c));
                        if (!a.m_questionObj || !a.m_questionObj.isDisabled)
                            for (l = 0; l < a.m_dsList.length; ++l)
                                if (k = a.m_dsList[l].n, document.getElementById(k), k === c) {
                                    cp.DD.RegisterObjectStateItems(c, a);
                                    break
                                }
                    }
                } else if (cp.responsive && h) {
                    var e = document.getElementById(c),
                        m = document.getElementById(b),
                        o = document.getElementById(d);
                    cp.DD.spv(e);
                    cp.DD.spv(m);
                    cp.DD.spv(o)
                }
            }
        }
    };
    cp.DD.InteractionManager.prototype.DoNecessaryStuffBeforeChangeState =
        function(b) {
            var a = !1;
            if (null !== this.m_ActiveInteraction)
                for (var c = this.m_ActiveInteraction, e, d = 0; d < c.m_dsList.length; ++d) e = c.m_dsList[d].n, e === b && (a = cp.DD.HasMouseHandlers(b), c && a && cp.DD.UnregisterObjectStateItems(b, c));
            return a
        };
    cp.DD.InteractionManager.prototype.DoNecessaryStuffAfterChangeState = function(b, a) {
        if (null !== this.m_ActiveInteraction)
            for (var c = this.m_ActiveInteraction, e, d = 0; d < c.m_dsList.length; ++d) e = c.m_dsList[d].n, e === b && c && a && cp.DD.RegisterObjectStateItems(b, c)
    };
    cp.DD.DragSourceSortFunction =
        function(b, a) {
            return b.Index > a.Index ? 1 : b.Index < a.Index ? -1 : 0
        };
    cp.DD.DropTargetSortFunction = function(b, a) {
        return b.t > a.t ? 1 : b.t < a.t ? -1 : 0
    };
    cp.DD.Interaction = function(b) {
        cp.log("navigator.userAgent = " + navigator.userAgent);
        this.m_elId = b;
        this.m_dsList = cp.DD.getAttribute(this.m_elId, "ds");
        this.m_dtList = cp.DD.getAttribute(this.m_elId, "dt");
        this.m_dtList.sort(cp.DD.DropTargetSortFunction);
        this.m_dsCanvasList = [];
        this.m_buttonIDList = [];
        this.DSMap = {};
        this.DTMap = {};
        this.DSLMSMap = {};
        this.DTLMSList = [];
        this.DragSourceCurrentStateList = [];
        this.DragSourcePreviousStateList = [];
        this.DragSourceInitialStateList = [];
        this.registeredMap = {};
        if (0 < this.m_dsList.length)
            for (b = 0; b < this.m_dsList.length; ++b) {
                var a = this.m_dsList[b].n;
                dsDiv = document.getElementById(a);
                var c = new cp.DD.DragSourcePropertiesObject(a),
                    e = new cp.DD.DragSourcePropertiesObject(a),
                    d = new cp.DD.DragSourcePropertiesObject(a);
                this.DragSourceCurrentStateList.push(c);
                this.DragSourcePreviousStateList.push(e);
                this.DragSourceInitialStateList.push(d);
                this.DSMap[a] = this.DragSourceCurrentStateList.length -
                    1;
                this.registeredMap[a] = 0
            }
        b = document.getElementById("div_Slide").getElementsByClassName("cp-frameset");
        c = a = null;
        e = 0;
        for (d = 1; d < b.length; ++d) {
            var f = b[d].id,
                g = cp.DD.getBaseStateItem(f);
            void 0 !== this.DSMap[g] && null !== this.DSMap[g] ? (this.DragSourceCurrentStateList[this.DSMap[g]].Index = d - 1, f = this.DragSourceInitialStateList[this.DSMap[g]], f.Index = d - 1, f.prevNonDs = a, f.relDepth = e, g !== c && (e += 1), c = g) : (a = f, e = 0, c = null)
        }
        this.m_DTtoSnapBehaviourAudioMap = {};
        if (0 < this.m_dtList.length)
            for (b = 0; b < this.m_dtList.length; ++b) dtID =
                this.m_dtList[b].n, this.DTMap[dtID] = new cp.DD.DropTargetLMSPropertiesObject(dtID), dtObj = this.GetDTObjFromDTID(dtID), dsDiv = document.getElementById(dtID), null !== dtObj && null !== dsDiv && dtObj.sba && (this.m_DTtoSnapBehaviourAudioMap[dtID] = dtObj.sba);
        this.m_autoSubmit = cp.DD.getAttribute(this.m_elId, "as");
        b = cp.DD.getAttribute(this.m_elId, "sb");
        void 0 !== b && (null !== b && 0 < b.length) && cp.show(b);
        b = cp.DD.getAttribute(this.m_elId, "sub");
        a = cp.DD.getAttribute(this.m_elId, "ub");
        b && (void 0 !== a && null !== a && 0 < a.length) &&
            cp.show(a);
        b = cp.DD.getAttribute(this.m_elId, "srb");
        a = cp.DD.getAttribute(this.m_elId, "rb");
        b && (void 0 !== a && null !== a && 0 < a.length) && cp.show(a);
        this.m_PauseAt = cp.DD.getAttribute(this.m_elId, "pa");
        this.m_successAction = cp.DD.getAttribute(this.m_elId, "oca");
        this.m_failureAction = cp.DD.getAttribute(this.m_elId, "ofa");
        this.m_maxAttempts = cp.DD.getAttribute(this.m_elId, "ma");
        this.m_CurrentAttempt = 0;
        this.m_DummyCanvasWithoutEffect = this.m_dummyCanvas = this.m_dragSourceCanvas = null;
        this.m_dummyCanvasOffset = {
            x: 0,
            y: 0
        };
        this.m_DsFrameSetDataID = null;
        this.m_InitialMouseTop = this.m_InitialMouseLeft = this.m_previousmousetop = this.m_previousmouseleft = 0;
        this.m_isItemBeingDragged = !1;
        this.m_attemptedAnswerString = [];
        this.m_correctAnswerList = cp.DD.getAttribute(this.m_elId, "cal");
        this.m_tempFrameSetPos = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
        this.m_DragSourceInitialFsPos = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
        this.m_SendDragSourceBack = cp.DD.getAttribute(this.m_elId, "sdc2op");
        this.m_ReturnDragSourceAudio = cp.DD.getAttribute(this.m_elId, "plaud");
        this.m_ReplacedDragSourceDummyCanvas =
            this.m_ReplaceDsFsId = this.m_ReplacedDragSourceCanvas = null;
        this.m_DTFsIdToDTEffectCanvasMap = {};
        this.m_shouldIncludeInQuiz = cp.DD.getAttribute(this.m_elId, "siq");
        this.resetAvailable = this.undoAvailable = !1;
        this.m_StoredViewDataString = this.m_StoredSuspendDataString = "";
        this.m_resumeItemsToBeDrawn = 0;
        this.m_resumeItemsMap = {};
        this.m_InteractionCompleted = !1;
        this.m_dragSourceStateItemCanvas = this.m_DsStateFsIDAtMouseDown = this.m_DsStateItemFrameSetDataID = null;
        this.m_DsStateNameAtMouseDown = "";
        this.m_tempTimerID =
            this.m_tempStateChangeMap = null;
        this.m_DTFsIdToStateBeforeDragOverMap = {};
        this.m_DragSourceDummyCanvasUpdatedWithState = !1;
        this.m_DropTargetStatePriorToDropAcceptOrRejectState = this.m_DragSourceCurrentTransientState = this.m_DragSourcePreviousTransientState = null;
        var h = this;
        cp.em.addEventListener(function() {
            h.Init()
        }, cp.SLIDEENTEREVENT);
        this.m_shouldIncludeInQuiz && (this.m_questionObj = cp.getQuestionObject(this.m_elId), this.m_questionObj instanceof cp.DragDropQuestion ? this.m_questionObj.setDDInteraction(this) :
            this.m_questionObj = void 0);
        cp.DD.IsTouchDevice() && (cp.origTouchMove = document.ontouchmove, cp.origTouchEnd = document.ontouchend, cp.origTouchStart = document.ontouchstart, document.ontouchmove = cp.DD.DefaultDocumentTouchMove, document.ontouchend = cp.DD.DefaultDocumentTouchEnd, document.ontouchstart = cp.DD.DefaultDocumentTouchStart)
    };
    cp.DD.Interaction.prototype.Init = function() {
        this.m_buttonIDList = [];
        this.m_DummyCanvasWithoutEffect = this.m_dummyCanvas = this.m_dragSourceCanvas = null;
        this.m_InteractionCompleted = !1;
        this.m_dummyCanvasOffset = {
            x: 0,
            y: 0
        };
        this.m_DsFrameSetDataID = null;
        this.m_InitialMouseTop = this.m_InitialMouseLeft = this.m_previousmousetop = this.m_previousmouseleft = 0;
        this.m_isItemBeingDragged = !1;
        if (!this.m_shouldIncludeInQuiz) {
            this.m_attemptedAnswerString = [];
            for (var b = this.m_CurrentAttempt = 0; b < this.m_dtList.length; ++b) {
                var a = this.DTMap[this.m_dtList[b].n];
                a && (a.acceptedDragSources.length = 0)
            }
        }
        this.m_tempFrameSetPos = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
        this.m_DragSourceInitialFsPos = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
        this.m_ReplacedDragSourceDummyCanvas =
            this.m_ReplaceDsFsId = this.m_ReplacedDragSourceCanvas = null;
        this.m_DTFsIdToDTEffectCanvasMap = {};
        this.resetAvailable = this.undoAvailable = !1;
        this.m_dragSourceStateItemCanvas = this.m_DsStateFsIDAtMouseDown = this.m_DsStateItemFrameSetDataID = null;
        this.m_DsStateNameAtMouseDown = "";
        this.m_tempTimerID = this.m_tempStateChangeMap = null;
        this.m_DTFsIdToStateBeforeDragOverMap = {};
        this.m_DragSourceDummyCanvasUpdatedWithState = !1;
        this.m_DropTargetStatePriorToDropAcceptOrRejectState = this.m_DragSourceCurrentTransientState =
            this.m_DragSourcePreviousTransientState = null
    };
    cp.DD.Interaction.prototype.ItemOnMouseDown = function(b) {
        if (!cp.disableInteractions) {
            var a = cp.DD.CurrInteractionManager.m_ActiveInteraction;
            if (null !== a && !a.m_dummyCanvas) {
                var c = b.target,
                    e = document.getElementById(cp.DD.getBaseStateItem(c.id));
                a.m_DsFrameSetDataID = e.id;
                a.m_DsStateItemFrameSetDataID = c.id;
                a.m_DsStateFsIDAtMouseDown = c.id;
                a.m_DsStateNameAtMouseDown = cp.DD.getCurrentStateName(a.m_DsFrameSetDataID);
                a.m_DragSourcePreviousTransientState = null;
                var d =
                    cp.D[c.id];
                a.m_dragSourceCanvas = document.getElementById(cp.D[e.id].mdi);
                a.m_dragSourceStateItemCanvas = document.getElementById(d.mdi);
                "cp-WebObject" === a.m_dragSourceStateItemCanvas.className && (a.m_dragSourceStateItemCanvas.width = a.m_dragSourceStateItemCanvas.clientWidth, a.m_dragSourceStateItemCanvas.height = a.m_dragSourceStateItemCanvas.clientHeight);
                cp.DD.IsTouchDevice() ? c.ontouchmove = null : c.onmousemove = null;
                if (d.type === cp.kCPOTAutoShape && (e = cp.D[d.mdi], !e.svg && (void 0 !== e.ss && 0 === e.ss) && (e = a.isPointInPath(getPageX(b),
                        getPageY(b)), !e))) {
                    cp.log("mouse down isinpath = " + e);
                    return
                }
                b = cp.getScaledPosition(getPageX(b), getPageY(b));
                a.m_isItemBeingDragged || (a.m_InitialMouseLeft = b.X, a.m_InitialMouseTop = b.Y);
                a.m_tempFrameSetPos.x = parseFloat(c.style.left);
                a.m_tempFrameSetPos.y = parseFloat(c.style.top);
                a.m_tempFrameSetPos.w = parseFloat(c.style.width);
                a.m_tempFrameSetPos.h = parseFloat(c.style.height);
                a.m_DragSourceInitialFsPos.x = parseFloat(c.style.left);
                a.m_DragSourceInitialFsPos.y = parseFloat(c.style.top);
                a.m_DragSourceInitialFsPos.w =
                    parseFloat(c.style.width);
                a.m_DragSourceInitialFsPos.h = parseFloat(c.style.height);
                a.m_DragSourceDummyCanvasUpdatedWithState = !1;
                a.CreateDragSourceDummyCanvasAndShowEffects(cp.DD.ObjectStateNames.kCPDragStart);
                cp.DD.IsTouchDevice() ? (document.ontouchmove = cp.DD.CurrInteractionManager.m_ActiveInteraction.ItemOnMouseMove, document.ontouchend = cp.DD.CurrInteractionManager.m_ActiveInteraction.ItemOnMouseUp) : (document.onmousemove = cp.DD.CurrInteractionManager.m_ActiveInteraction.ItemOnMouseMove, document.onmouseup =
                    cp.DD.CurrInteractionManager.m_ActiveInteraction.ItemOnMouseUp);
                document.onselectstart = function() {
                    return false
                }
            }
        }
    };
    cp.DD.Interaction.prototype.isPointInPath = function(b, a) {
        var c = document.getElementById(this.m_DsStateItemFrameSetDataID + "c"),
            e = c.getContext("2d"),
            d = c.parentElement.getBoundingClientRect(),
            f = c.getBoundingClientRect();
        cp("div_Slide").getBoundingClientRect();
        var g = cp.getScaledPosition(b, a),
            h = d.left - cp.movie.offset,
            k = d.top - cp.movie.topOffset,
            l = f.left - cp.movie.offset,
            m = f.top - cp.movie.topOffset,
            o = parseFloat(c.style.marginLeft),
            p = parseFloat(c.style.marginTop),
            o = !isNaN(o) ? o : 0,
            p = !isNaN(p) ? p : 0;
        if (e) {
            if (cp.responsive) q = g.X - window.pageXOffset - f.left, f = g.Y - window.pageYOffset - f.top, q /= cp("div_Slide").scaleFactor, f /= cp("div_Slide").scaleFactor;
            else {
                var q = g.X - window.pageXOffset / cp.movie.m_scaleFactor - (0 > o ? l : h) / cp.movie.m_scaleFactor,
                    f = g.Y - window.pageYOffset / cp.movie.m_scaleFactor - (0 > p ? m : k) / cp.movie.m_scaleFactor;
                cp.shouldScale && (cp.loadedModules.toc && (!cp.toc.movieProperties.tocProperties.overlay &&
                    1 == cp.toc.movieProperties.tocProperties.position) && (q += cp.toc.movieProperties.tocProperties.width), cp.loadedModules.playbar && !cp.PB.MP.PBP.overlay && (0 == cp.PB.MP.PBP.position ? q += cp.PB.playBarHeight : 1 == cp.PB.MP.PBP.position && (f += cp.PB.playBarHeight)));
                q *= parseFloat(c.parentElement.style.width) / d.width * cp.movie.m_scaleFactor;
                f *= parseFloat(c.parentElement.style.height) / d.height * cp.movie.m_scaleFactor;
                cp.verbose && (cp.log("lParentOffsetL : " + h + "," + k), cp.log("lElemL : " + l + "," + m), cp.log("lElemMarginL : " +
                    o + p), cp.log("X : " + q + "," + f))
            }
            return lBool = e.isPointInPath(q, f)
        }
        return !1
    };
    cp.DD.Interaction.prototype.CreateResponsiveDragSourceDummyCanvasAndShowEffects = function(b) {
        function a(b) {
            if (b) {
                b.id = "";
                "cp-vtxt" != b.className && (b.className = "");
                var c = b.nodeName.toLowerCase();
                if ("div" == c || "canvas" == c) b.style.visibility = "visible", b.style.display = "block";
                "canvas" == c && b.getContext("2d").drawImage(f.m_dragSourceStateItemCanvas, 0, 0);
                for (var b = b.childNodes, c = b.length, d = 0; d < c; ++d) a(b[d])
            }
        }
        if (cp.responsive) {
            var c = this.GetDSObjFromDSID(this.m_DsFrameSetDataID);
            if (c) {
                var c = c.ef,
                    e = this.m_dragSourceStateItemCanvas;
                cp.hide(this.m_DsStateItemFrameSetDataID);
                var d = cp.DD.GetBaseItemInState(this.m_DsFrameSetDataID, b);
                d && (this.m_dragSourceStateItemCanvas = e = document.getElementById(d.canvasID), this.m_DsStateItemFrameSetDataID = d.framesetID, this.m_DragSourceCurrentTransientState = this.m_DsStateNameAtMouseDown = b, "cp-WebObject" === this.m_dragSourceStateItemCanvas.className && (this.m_dragSourceStateItemCanvas.width = this.m_dragSourceStateItemCanvas.clientWidth, this.m_dragSourceStateItemCanvas.height =
                    this.m_dragSourceStateItemCanvas.clientHeight));
                this.m_DummyCanvasWithoutEffect = {};
                this.m_DummyCanvasWithoutEffect.element = cp.newElem("div");
                this.m_DummyCanvasWithoutEffect.element.style.cssText = e.parentElement.style.cssText;
                this.m_DummyCanvasWithoutEffect.element.innerHTML = e.parentElement.innerHTML;
                cp.hide(this.m_DsStateItemFrameSetDataID);
                var f = this;
                a(this.m_DummyCanvasWithoutEffect.element);
                cp("div_Slide").appendChild(this.m_DummyCanvasWithoutEffect.element);
                this.m_DummyCanvasWithoutEffect.element.style.zIndex =
                    2E3;
                this.m_DummyCanvasWithoutEffect.element.style.display = "none";
                this.m_dummyCanvas = {};
                this.m_dummyCanvas.element = cp.newElem("div");
                this.m_dummyCanvas.element.style.cssText = e.parentElement.style.cssText;
                this.m_dummyCanvas.element.innerHTML = e.parentElement.innerHTML;
                a(this.m_dummyCanvas.element);
                this.m_dummyCanvas.id = "dummy";
                document.getElementById("div_Slide").appendChild(this.m_dummyCanvas.element);
                this.m_dummyCanvas.element.style.zIndex = 2E3;
                2 === c && (c = 0);
                0 === c && (this.m_dummyCanvasOffset.x = 0, this.m_dummyCanvasOffset.y =
                    0, draggedItemParentEl = e.parentElement, this.m_dummyCanvas.element.style.left = parseFloat(draggedItemParentEl.style.left) + "px", this.m_dummyCanvas.element.style.top = parseFloat(draggedItemParentEl.style.top) + "px");
                1 === c && cp.applyTransform(this.m_dummyCanvas.element, "scale(1.2)");
                this.m_dummyCanvas.element.style.visibility = "visible";
                cp.hide(this.m_DsStateItemFrameSetDataID);
                this.UpdateDragSourceAudio(this.m_DsFrameSetDataID, b, this.m_DragSourcePreviousTransientState);
                this.m_DragSourcePreviousTransientState =
                    b
            }
        }
    };
    cp.DD.Interaction.prototype.CreateDragSourceDummyCanvasAndShowEffects = function(b) {
        if (cp.responsive) return this.CreateResponsiveDragSourceDummyCanvasAndShowEffects(b);
        var a = this.GetDSObjFromDSID(this.m_DsFrameSetDataID);
        if (a) {
            var c = a.ef,
                e, d, f, g, a = this.m_dragSourceStateItemCanvas;
            cp.hide(this.m_DsStateItemFrameSetDataID);
            if (g = cp.DD.GetBaseItemInState(this.m_DsFrameSetDataID, b)) this.m_dragSourceStateItemCanvas = a = document.getElementById(g.canvasID), this.m_DsStateItemFrameSetDataID = g.framesetID, this.m_DragSourceCurrentTransientState =
                this.m_DsStateNameAtMouseDown = b, "cp-WebObject" === this.m_dragSourceStateItemCanvas.className && (this.m_dragSourceStateItemCanvas.width = this.m_dragSourceStateItemCanvas.clientWidth, this.m_dragSourceStateItemCanvas.height = this.m_dragSourceStateItemCanvas.clientHeight);
            e = parseFloat(a.style.width);
            d = parseFloat(a.style.height);
            this.m_DummyCanvasWithoutEffect = cp.createCanvas(0, 0, e, d, cp.newElem("canvas"));
            this.m_DummyCanvasWithoutEffect.element.style.display = "block";
            this.m_DummyCanvasWithoutEffect.element.style.position =
                "absolute";
            this.m_DummyCanvasWithoutEffect.element.style.visibility = "hidden";
            this.m_DummyCanvasWithoutEffect.element.style.marginLeft = "0px";
            this.m_DummyCanvasWithoutEffect.element.style.marginTop = "0px";
            f = this.m_DummyCanvasWithoutEffect.gc;
            var h = {
                x: 0,
                y: 0,
                w: e,
                h: d
            };
            this.PaintItemOnDummyCanvas(f, a, h);
            document.getElementById("div_Slide").appendChild(this.m_DummyCanvasWithoutEffect.element);
            this.m_DummyCanvasWithoutEffect.element.style.zIndex = 2E3;
            2 === c && (c = 0);
            0 === c && (this.m_dummyCanvasOffset.x = 0, h = g = this.m_dummyCanvasOffset.y =
                0, "cp-WebObject" === a.className ? (g = parseFloat(a.bounds.minX), h = parseFloat(a.bounds.minY), e = parseFloat(a.width), d = parseFloat(a.height)) : (e = parseFloat(a.style.width), d = parseFloat(a.style.height)), this.m_dummyCanvas = cp.createCanvas(g, h, e, d, cp.newElem("canvas")), this.m_dummyCanvas.element.style.display = "block", this.m_dummyCanvas.element.style.position = "absolute", this.m_dummyCanvas.element.style.visibility = "hidden", this.m_dummyCanvas.element.style.marginLeft = "0px", this.m_dummyCanvas.element.style.marginTop =
                "0px", this.m_dummyCanvas.id = "dummy", f = this.m_dummyCanvas.gc, h = {
                    x: 0,
                    y: 0,
                    w: e,
                    h: d
                }, this.PaintItemOnDummyCanvas(f, a, h), document.getElementById("div_Slide").appendChild(this.m_dummyCanvas.element), this.m_dummyCanvas.element.style.zIndex = 2E3, g = a.parentElement, this.m_dummyCanvas.element.style.left = parseFloat(g.style.left) + parseFloat(a.style.marginLeft) + "px", this.m_dummyCanvas.element.style.top = parseFloat(g.style.top) + parseFloat(a.style.marginTop) + "px");
            if (1 === c) {
                g = a.parentElement;
                var h = cp.D[this.m_DsStateItemFrameSetDataID],
                    h = cp.D[h.mdi],
                    k = h.re || h.sh && !h.sh.i;
                k ? (this.m_dummyCanvasOffset.x = this.m_InitialMouseLeft * (1.2 - 1), this.m_dummyCanvasOffset.y = this.m_InitialMouseTop * (1.2 - 1)) : (this.m_dummyCanvasOffset.x = (this.m_InitialMouseLeft - parseFloat(g.style.left)) * (1.2 - 1), this.m_dummyCanvasOffset.y = (this.m_InitialMouseTop - parseFloat(g.style.top)) * (1.2 - 1));
                e = 1.2 * parseFloat(a.style.width);
                d = 1.2 * parseFloat(a.style.height);
                this.m_dummyCanvas = cp.createCanvas(0, 0, e, d, cp.newElem("canvas"));
                this.m_dummyCanvas.element.style.display = "block";
                this.m_dummyCanvas.element.style.position = "absolute";
                this.m_dummyCanvas.element.style.visibility = "hidden";
                this.m_dummyCanvas.element.style.marginLeft = "0px";
                this.m_dummyCanvas.element.style.marginTop = "0px";
                this.m_dummyCanvas.id = "dummy";
                f = this.m_dummyCanvas.gc;
                h = {
                    x: 0,
                    y: 0,
                    w: e,
                    h: d
                };
                this.PaintItemOnDummyCanvas(f, a, h);
                document.getElementById("div_Slide").appendChild(this.m_dummyCanvas.element);
                this.m_dummyCanvas.element.style.zIndex = 2E3;
                this.m_dummyCanvas.element.style.left = parseFloat(g.style.left) + parseFloat(a.style.marginLeft) -
                    this.m_dummyCanvasOffset.x + "px";
                this.m_dummyCanvas.element.style.top = parseFloat(g.style.top) + parseFloat(a.style.marginTop) - this.m_dummyCanvasOffset.y + "px"
            }
            if (2 == c) {
                h = cp.D[this.m_DsFrameSetDataID];
                h = cp.D[h.mdi];
                k = h.re || h.sh && !h.sh.i;
                this.m_dummyCanvasOffset.x = 10;
                this.m_dummyCanvasOffset.y = 10;
                e = parseFloat(this.m_dragSourceCanvas.style.width) + 2 * this.m_dummyCanvasOffset.x;
                d = parseFloat(this.m_dragSourceCanvas.style.height) + 2 * this.m_dummyCanvasOffset.y;
                g = c = 0;
                var h = this.m_dummyCanvasOffset.x,
                    l = this.m_dummyCanvasOffset.y;
                k && (this.m_dummyCanvasOffset.x = 0, this.m_dummyCanvasOffset.y = 0, c = -parseFloat(this.m_dragSourceCanvas.style.marginLeft) - h, g = -parseFloat(this.m_dragSourceCanvas.style.marginTop) - l, e = parseFloat(this.m_dragSourceCanvas.style.width), d = parseFloat(this.m_dragSourceCanvas.style.height));
                this.m_dummyCanvas = cp.createCanvas(0, 0, e, d, cp.newElem("canvas"));
                this.m_dummyCanvas.element.style.display = "block";
                this.m_dummyCanvas.element.style.position = "absolute";
                this.m_dummyCanvas.element.style.visibility = "hidden";
                this.m_dummyCanvas.element.style.marginLeft =
                    "0px";
                this.m_dummyCanvas.element.style.marginTop = "0px";
                this.m_dummyCanvas.id = "dummy";
                f = this.m_dummyCanvas.gc;
                if ("cp-animationItem" === this.m_dragSourceCanvas.className || "cp-WebObject" === this.m_dragSourceCanvas.className) {
                    var m = new Image,
                        k = cp.D[this.m_dragSourceCanvas.id];
                    m.onload = function() {
                        f.drawImage(m, 0, 0, e, d)
                    };
                    var o = k.ip,
                        k = cp.movie.im;
                    o && k && k.getImageDataURI(o, function(a) {
                        o = a
                    });
                    m.src = o
                } else f.drawImage(this.m_dragSourceCanvas, this.m_dummyCanvasOffset.x, this.m_dummyCanvasOffset.y, parseFloat(this.m_dragSourceCanvas.style.width),
                    parseFloat(this.m_dragSourceCanvas.style.height));
                document.getElementById("div_Slide").appendChild(this.m_dummyCanvas.element);
                this.m_dummyCanvas.element.style.zIndex = 2E3;
                k = f.createLinearGradient(c + 0, g + l, c + 0, g + 0);
                k.addColorStop(0, "#ffff00");
                k.addColorStop(1, "#ffffff");
                f.fillStyle = k;
                f.fillRect(c + h, g + 0, this.m_DragSourceInitialFsPos.w, l);
                k = f.createLinearGradient(c + 0, g + l + this.m_DragSourceInitialFsPos.h, c + 0, g + 2 * l + this.m_DragSourceInitialFsPos.h);
                k.addColorStop(0, "#ffff00");
                k.addColorStop(1, "#ffffff");
                f.fillStyle = k;
                f.fillRect(c + h, g + l + this.m_DragSourceInitialFsPos.h, this.m_DragSourceInitialFsPos.w, l);
                k = f.createLinearGradient(c + h, g + 0, c + 0, g + 0);
                k.addColorStop(0, "#ffff00");
                k.addColorStop(1, "#ffffff");
                f.fillStyle = k;
                f.fillRect(c + 0, g + l, h, this.m_DragSourceInitialFsPos.h);
                k = f.createLinearGradient(c + h + this.m_DragSourceInitialFsPos.w, g + 0, c + 2 * h + this.m_DragSourceInitialFsPos.w, g + 0);
                k.addColorStop(0, "#ffff00");
                k.addColorStop(1, "#ffffff");
                f.fillStyle = k;
                f.fillRect(c + h + this.m_DragSourceInitialFsPos.w, g + l, h, this.m_DragSourceInitialFsPos.h);
                k = f.createLinearGradient(c + h, g + l, c + 0, g + 0);
                k.addColorStop(0, "#ffff00");
                k.addColorStop(1, "#ffffff");
                f.fillStyle = k;
                f.fillRect(c + 0, g + 0, h, l);
                k = f.createLinearGradient(c + h + this.m_DragSourceInitialFsPos.w, g + l, c + 2 * h + this.m_DragSourceInitialFsPos.w, g + 0);
                k.addColorStop(0, "#ffff00");
                k.addColorStop(1, "#ffffff");
                f.fillStyle = k;
                f.fillRect(c + h + this.m_DragSourceInitialFsPos.w, g + 0, h, l);
                k = f.createLinearGradient(c + h, g + l + this.m_DragSourceInitialFsPos.h, c + 0, g + 2 * l + this.m_DragSourceInitialFsPos.h);
                k.addColorStop(0, "#ffff00");
                k.addColorStop(1, "#ffffff");
                f.fillStyle = k;
                f.fillRect(c + 0, g + l + this.m_DragSourceInitialFsPos.h, h, l);
                k = f.createLinearGradient(c + h + this.m_DragSourceInitialFsPos.w, g + l + this.m_DragSourceInitialFsPos.h, c + 2 * h + this.m_DragSourceInitialFsPos.w, g + 2 * l + this.m_DragSourceInitialFsPos.h);
                k.addColorStop(0, "#ffff00");
                k.addColorStop(1, "#ffffff");
                f.fillStyle = k;
                f.fillRect(c + h + this.m_DragSourceInitialFsPos.w, g + this.m_DragSourceInitialFsPos.h + l, h, l);
                g = this.m_dragSourceCanvas.parentElement;
                this.m_dummyCanvas.element.style.left =
                    parseFloat(g.style.left) + parseFloat(this.m_dragSourceCanvas.style.marginLeft) - this.m_dummyCanvasOffset.x + "px";
                this.m_dummyCanvas.element.style.top = parseFloat(g.style.top) + parseFloat(this.m_dragSourceCanvas.style.marginTop) - this.m_dummyCanvasOffset.y + "px"
            }
            this.m_dummyCanvas.element.style.visibility = "visible";
            "cp-WebObject" === a.className && (cp.applyTransform(this.m_dummyCanvas.element, a.style.webkitTransform), cp.applyTransform(this.m_dummyCanvas.element, a.style.transform), this.m_dummyCanvas.element.style.left =
                parseFloat(a.parentElement.style.left) - this.m_dummyCanvasOffset.x + "px", this.m_dummyCanvas.element.style.top = parseFloat(a.parentElement.style.top) - this.m_dummyCanvasOffset.y + "px");
            cp.hide(this.m_DsStateItemFrameSetDataID);
            this.UpdateDragSourceAudio(this.m_DsFrameSetDataID, b, this.m_DragSourcePreviousTransientState);
            this.m_DragSourcePreviousTransientState = b
        }
    };
    cp.DD.Interaction.prototype.PaintItemOnDummyCanvas = function(b, a, c) {
        if (!cp.responsive && a && b && c)
            if ("cp-animationItem" === a.className || "cp-WebObject" ===
                a.className) {
                var e = new Image,
                    a = cp.D[a.id];
                e.onload = function() {
                    b.drawImage(e, c.x, c.y, c.w, c.h)
                };
                var d = a.ip,
                    a = cp.movie.im;
                d && a && a.getImageDataURI(d, function(a) {
                    d = a
                });
                e.src = d
            } else if (b.drawImage(a, c.x, c.y, c.w, c.h), a = a.parentElement, 1 < a.childNodes.length && (a = a.getElementsByClassName("cp-vtxt"), null != a && 1 == a.length)) {
            var a = a[0],
                f = "";
            a.firstChild.firstChild.firstChild.firstChild && (f = a.firstChild.firstChild.firstChild.firstChild.textContent);
            b.font = a.firstChild.firstChild.firstChild.style.font;
            b.fillStyle =
                a.firstChild.firstChild.firstChild.style.color;
            var g = a.firstChild.firstChild.style.textAlign;
            b.textBaseline = "top";
            var h = parseFloat(a.style.marginLeft),
                k = parseFloat(a.style.marginTop),
                l = parseFloat(a.style.width);
            parseFloat(a.style.height);
            var m = parseFloat(a.firstChild.firstChild.firstChild.style.fontSize),
                m = parseFloat(a.firstChild.firstChild.firstChild.style.lineHeight) * m / 100;
            cp.responsive && (f = a.innerText, b.font = a.firstChild.firstChild.firstChild.style.font, b.fillStyle = a.firstChild.firstChild.firstChild.style.color,
                h = parseFloat(a.style.left), k = parseFloat(a.firstChild.style.top) + 2, l = a.clientWidth);
            "left" == g ? (b.textAlign = "left", A(b, f, h, k, l, m)) : "center" == g ? (b.textAlign = "center", A(b, f, h + l / 2, k, l, m)) : "right" == g ? (b.textAlign = "right", A(b, f, h + l, k, l, m)) : (b.textAlign = "left", A(b, f, h, k, l, m))
        }
    };
    cp.DD.Interaction.prototype.UpdateResponsiveDragSourceDummyCanvasWithState = function(b) {
        function a(b) {
            if (b) {
                b.id = "";
                "cp-vtxt" != b.className && (b.className = "");
                var d = b.nodeName.toLowerCase();
                if ("div" == d || "canvas" == d) b.style.visibility =
                    "visible", b.style.display = "block";
                "canvas" == d && b.getContext("2d").drawImage(c, 0, 0);
                for (var b = b.childNodes, d = b.length, e = 0; e < d; ++e) a(b[e])
            }
        }
        if (cp.responsive && this.m_DummyCanvasWithoutEffect && this.m_dummyCanvas && this.GetDSObjFromDSID(this.m_DsFrameSetDataID)) {
            var c = this.m_dragSourceStateItemCanvas,
                e = this.m_DsStateItemFrameSetDataID,
                d = cp.DD.GetBaseItemInState(this.m_DsFrameSetDataID, b);
            d && (c = document.getElementById(d.canvasID), e = d.framesetID, this.m_dragSourceStateItemCanvas && this.m_dragSourceStateItemCanvas.id !=
                d.canvasID && (this.m_DragSourceDummyCanvasUpdatedWithState = !0), this.m_dragSourceStateItemCanvas = c, this.m_DsStateItemFrameSetDataID = e, this.m_DragSourceCurrentTransientState = b, d = document.getElementById(e), "cp-WebObject" === this.m_dragSourceStateItemCanvas.className && (this.m_dragSourceStateItemCanvas.width = this.m_dragSourceStateItemCanvas.clientWidth, this.m_dragSourceStateItemCanvas.height = this.m_dragSourceStateItemCanvas.clientHeight), this.m_tempFrameSetPos.w = parseFloat(d.style.width), this.m_tempFrameSetPos.h =
                parseFloat(d.style.height));
            var f = d = "0px",
                d = this.m_DummyCanvasWithoutEffect.element.style.left,
                f = this.m_DummyCanvasWithoutEffect.element.style.top;
            this.m_DummyCanvasWithoutEffect.element.style.cssText = c.parentElement.style.cssText;
            this.m_DummyCanvasWithoutEffect.element.innerHTML = c.parentElement.innerHTML;
            cp.hide(e);
            a(this.m_DummyCanvasWithoutEffect.element);
            this.m_DummyCanvasWithoutEffect.element.style.left = d;
            this.m_DummyCanvasWithoutEffect.element.style.top = f;
            this.m_DummyCanvasWithoutEffect.element.style.zIndex =
                2E3;
            this.m_DummyCanvasWithoutEffect.element.style.display = "none";
            d = this.m_dummyCanvas.element.style.left;
            f = this.m_dummyCanvas.element.style.top;
            this.m_dummyCanvas.element.style.cssText = c.parentElement.style.cssText;
            this.m_dummyCanvas.element.innerHTML = c.parentElement.innerHTML;
            a(this.m_dummyCanvas.element);
            this.m_dummyCanvas.element.style.left = d;
            this.m_dummyCanvas.element.style.top = f;
            this.m_dummyCanvas.element.style.zIndex = 2E3;
            cp.hide(e);
            this.UpdateDragSourceAudio(this.m_DsFrameSetDataID, b, this.m_DragSourcePreviousTransientState);
            this.m_DragSourcePreviousTransientState = b
        }
    };
    cp.DD.Interaction.prototype.PlayStopAudio = function(b, a) {
        if (b) {
            var c = cp.D[b];
            c && c.ia && cp.movie.am.showHideObjectAudio(c.ia, a)
        }
    };
    cp.DD.Interaction.prototype.UpdateDragSourceAudio = function(b, a, c) {
        if (b && a !== c && (null != c && (c = cp.DD.GetBaseItemInState(b, c)) && this.PlayStopAudio(c.framesetID, !1), null != a))(b = cp.DD.GetBaseItemInState(b, a)) && this.PlayStopAudio(b.framesetID, !0)
    };
    cp.DD.Interaction.prototype.UpdateDragSourceDummyCanvasWithState = function(b, a) {
        if (cp.responsive) return this.UpdateResponsiveDragSourceDummyCanvasWithState(b,
            a);
        if (this.m_DummyCanvasWithoutEffect && this.m_dummyCanvas) {
            var c = this.GetDSObjFromDSID(this.m_DsFrameSetDataID);
            if (c) {
                var c = c.ef,
                    e, d, f, g = this.m_dragSourceStateItemCanvas;
                if (f = cp.DD.GetBaseItemInState(this.m_DsFrameSetDataID, b)) g = document.getElementById(f.canvasID), this.m_dragSourceStateItemCanvas && this.m_dragSourceStateItemCanvas.id != f.canvasID && (this.m_DragSourceDummyCanvasUpdatedWithState = !0), this.m_dragSourceStateItemCanvas = g, this.m_DsStateItemFrameSetDataID = f.framesetID, this.m_DragSourceCurrentTransientState =
                    b, f = document.getElementById(f.framesetID), "cp-WebObject" === this.m_dragSourceStateItemCanvas.className && (cp.applyTransform(this.m_dragSourceStateItemCanvas, g.style.webkitTransform), cp.applyTransform(this.m_dragSourceStateItemCanvas, g.style.transform), this.m_dragSourceStateItemCanvas.width = this.m_dragSourceStateItemCanvas.clientWidth, this.m_dragSourceStateItemCanvas.height = this.m_dragSourceStateItemCanvas.clientHeight), this.m_tempFrameSetPos.w = parseFloat(f.style.width), this.m_tempFrameSetPos.h = parseFloat(f.style.height);
                e = parseFloat(g.style.width);
                d = parseFloat(g.style.height);
                f = this.m_DummyCanvasWithoutEffect.gc;
                f.clearRect(0, 0, parseFloat(this.m_DummyCanvasWithoutEffect.element.width), parseFloat(this.m_DummyCanvasWithoutEffect.element.height));
                this.m_DummyCanvasWithoutEffect.element.width = e;
                this.m_DummyCanvasWithoutEffect.element.height = d;
                this.m_DummyCanvasWithoutEffect.element.style.width = e + "px";
                this.m_DummyCanvasWithoutEffect.element.style.height = d + "px";
                e = {
                    x: 0,
                    y: 0,
                    w: e,
                    h: d
                };
                this.PaintItemOnDummyCanvas(f, g, e);
                this.UpdateDragSourceAudio(this.m_DsFrameSetDataID,
                    b, this.m_DragSourcePreviousTransientState);
                2 === c && (c = 0);
                0 === c && (this.m_dummyCanvasOffset.x = 0, this.m_dummyCanvasOffset.y = 0, "cp-WebObject" === g.className ? (cp.applyTransform(this.m_dummyCanvas.element, g.style.webkitTransform), cp.applyTransform(this.m_dummyCanvas.element, g.style.transform), parseFloat(g.bounds.minX), parseFloat(g.bounds.minY), e = parseFloat(g.width), d = parseFloat(g.height)) : (e = parseFloat(g.style.width), d = parseFloat(g.style.height)), f = this.m_dummyCanvas.gc, f.clearRect(0, 0, parseFloat(this.m_dummyCanvas.element.width),
                    parseFloat(this.m_dummyCanvas.element.height)), this.m_dummyCanvas.element.width = e, this.m_dummyCanvas.element.height = d, this.m_dummyCanvas.element.style.width = e + "px", this.m_dummyCanvas.element.style.height = d + "px", e = {
                    x: 0,
                    y: 0,
                    w: e,
                    h: d
                }, this.PaintItemOnDummyCanvas(f, g, e));
                1 === c && (e = 1.2 * parseFloat(g.style.width), d = 1.2 * parseFloat(g.style.height), f = this.m_dummyCanvas.gc, f.clearRect(0, 0, parseFloat(this.m_dummyCanvas.element.width), parseFloat(this.m_dummyCanvas.element.height)), this.m_dummyCanvas.element.width =
                    e, this.m_dummyCanvas.element.height = d, this.m_dummyCanvas.element.style.width = e + "px", this.m_dummyCanvas.element.style.height = d + "px", e = {
                        x: 0,
                        y: 0,
                        w: e,
                        h: d
                    }, this.PaintItemOnDummyCanvas(f, g, e));
                this.m_DragSourcePreviousTransientState = b
            }
        }
    };
    cp.DD.Interaction.prototype.UpdateDragOverStates = function() {
        if (this.m_tempStateChangeMap)
            for (var b = 0; b < this.m_tempStateChangeMap.length; b++) {
                var a = this.m_tempStateChangeMap[b];
                if (0 === a.type) {
                    var c = cp.DD.getCurrentStateName(a.item);
                    cp.changeState(a.item, a.toState, !0, !0);
                    this.UpdateDropTargetEffect(a.item, c);
                    a.removeFromMap && (this.m_DTFsIdToStateBeforeDragOverMap[a.item] = null)
                } else 1 === a.type && (this.m_dummyCanvasObjectState = a.toState, this.UpdateDragSourceDummyCanvasWithState(a.toState, !0))
            }
    };
    cp.DD.Interaction.prototype.ItemOnMouseMove = function(b) {
        var a = cp.DD.CurrInteractionManager.m_ActiveInteraction;
        if (null !== a && !(null === a.m_dummyCanvas || null === a.m_dragSourceCanvas)) {
            cp.m_gestureHandler && cp.m_gestureHandler.disableGestures();
            var c = cp("div_Slide");
            cp.hide(a.m_DsStateItemFrameSetDataID);
            a.m_dummyCanvas.element.style.visibility = "visible";
            var e = cp.getScaledPosition(getPageX(b), getPageY(b));
            a.m_isItemBeingDragged || (a.m_previousmouseleft = e.X, a.m_previousmousetop = e.Y);
            a.m_dummyCanvas.element.style.left = parseInt(a.m_dummyCanvas.element.style.left, 10) + (e.X - a.m_previousmouseleft) / c.scaleFactor + "px";
            a.m_dummyCanvas.element.style.top = parseInt(a.m_dummyCanvas.element.style.top, 10) + (e.Y - a.m_previousmousetop) / c.scaleFactor + "px";
            cp.DD.ChangeMouseCursor("pointer");
            a.m_previousmouseleft = e.X;
            a.m_previousmousetop =
                e.Y;
            a.m_isItemBeingDragged = !0;
            var c = parseFloat(a.m_dummyCanvas.element.style.left) + a.m_dummyCanvasOffset.x,
                e = parseFloat(a.m_dummyCanvas.element.style.top) + a.m_dummyCanvasOffset.y,
                d = parseFloat(a.m_dragSourceStateItemCanvas.style.marginLeft),
                f = parseFloat(a.m_dragSourceStateItemCanvas.style.marginTop);
            isNaN(d) && (d = 0);
            isNaN(f) && (f = 0);
            cp.responsive && (c += d, e += f);
            d += parseFloat(a.m_dragSourceStateItemCanvas.parentElement.style.left);
            f += parseFloat(a.m_dragSourceStateItemCanvas.parentElement.style.top);
            cp.verbose &&
                (cp.log(c + "," + e), cp.log(d + "," + f));
            a.m_DragSourceDummyCanvasUpdatedWithState ? (a.m_tempFrameSetPos.x = c, a.m_tempFrameSetPos.y = e) : (a.m_tempFrameSetPos.x = a.m_DragSourceInitialFsPos.x + c - d, a.m_tempFrameSetPos.y = a.m_DragSourceInitialFsPos.y + e - f);
            cp.verbose && cp.log(a.m_tempFrameSetPos.x + "," + a.m_tempFrameSetPos.y);
            var d = document.getElementById("div_Slide").getElementsByClassName("cp-frameset"),
                f = document.getElementById(a.m_DsStateItemFrameSetDataID),
                g = !1,
                c = cp.DD.GetDimensionsAfterRotation(0, 0, a.m_tempFrameSetPos.w,
                    a.m_tempFrameSetPos.h, cp.DD.getRotationAngle(f)),
                h = cp.DD.GetRectFromBounds(a.m_tempFrameSetPos.x + c.minX, a.m_tempFrameSetPos.y + c.minY, c.maxX - c.minX, c.maxY - c.minY),
                e = !0;
            a.m_tempStateChangeMap = [];
            for (var c = null, k = d.length - 1; 1 <= k && !1 === g; --k) {
                var l = d[k];
                if (f.id != d[k].id) {
                    var m = d[k].id,
                        o = a.GetDTObjFromDTID(m);
                    if (o) {
                        cp.DD.spv(d[k], d[k].id, 0);
                        g = 0;
                        o.ha && (g = o.ha);
                        var p = cp.DD.GetDimensionsAfterRotation(0, 0, parseFloat(l.style.width), parseFloat(l.style.height), cp.DD.getRotationAngle(d[k])),
                            q = parseFloat(l.style.left) +
                            p.minX - g,
                            l = parseFloat(l.style.top) + p.minY - g,
                            g = cp.DD.GetRectFromBounds(q, l, p.maxX - p.minX + 2 * g, p.maxY - p.minY + 2 * g),
                            g = cp.DD.doRectangleIntersect(h, g),
                            l = o.dep,
                            p = null;
                        if (!(void 0 === l || null === l || 0 >= l.length) && !cp.DD.IsTouchDevice()) p = o.dep[0];
                        g ? (a.ShowDropTargetEffect(m), null != p && void 0 != p && cp.showHint(p, cp.DD.CurrInteractionManager), c = m) : (a.HideDropTargetEffect(m, !1), null != p && void 0 != p && cp.hideHint(p, cp.DD.CurrInteractionManager))
                    }
                }
            }
            if (g) {
                if (c && (d = cp.DD.getCurrentObjectStateProperties(c)) && d.stn !== cp.DD.ObjectStateNames.kCPDragOver)(f =
                    a.DragSourceCurrentStateList[a.DSMap[a.m_DsFrameSetDataID]]) && (null !== f.DropTargetId && f.DropTargetId === c) && (e = !1), e && (a.m_DTFsIdToStateBeforeDragOverMap[c] = (cp.DD.ObjectStateNames.kCPDropReject === d.stn || cp.DD.ObjectStateNames.kCPDropAccept === d.stn) && a && null !== a.m_DropTargetStatePriorToDropAcceptOrRejectState && a.m_DropTargetStatePriorToDropAcceptOrRejectState.dropTarget === c ? a.m_DropTargetStatePriorToDropAcceptOrRejectState.prevState : d.stn, a.m_tempStateChangeMap.push({
                    type: 0,
                    item: c,
                    toState: cp.DD.ObjectStateNames.kCPDragOver,
                    removeFromMap: !1
                }));
                e ? (!a.m_dummyCanvasObjectState || a.m_dummyCanvasObjectState != cp.DD.ObjectStateNames.kCPDragOver) && a.m_tempStateChangeMap.push({
                    type: 1,
                    toState: cp.DD.ObjectStateNames.kCPDragOver
                }) : (!a.m_dummyCanvasObjectState || a.m_dummyCanvasObjectState == cp.DD.ObjectStateNames.kCPDragOver) && a.m_tempStateChangeMap.push({
                    type: 1,
                    toState: a.m_DsStateNameAtMouseDown
                })
            } else a.m_dummyCanvasObjectState && a.m_dummyCanvasObjectState === cp.DD.ObjectStateNames.kCPDragOver && a.m_tempStateChangeMap.push({
                type: 1,
                toState: a.m_DsStateNameAtMouseDown
            });
            if (0 < a.m_dtList.length)
                for (e = 0; e < a.m_dtList.length; ++e)
                    if (dtID = a.m_dtList[e].n, dtID !== c && (d = cp.DD.getCurrentObjectStateProperties(dtID)) && d.stn === cp.DD.ObjectStateNames.kCPDragOver) d = cp.DD.ObjectStateNames.kCPNormal, a.m_DTFsIdToStateBeforeDragOverMap[dtID] && (d = a.m_DTFsIdToStateBeforeDragOverMap[dtID]), a.m_tempStateChangeMap.push({
                        type: 0,
                        item: dtID,
                        toState: d,
                        removeFromMap: !0
                    });
            a.m_tempStateChangeMap && 0 < a.m_tempStateChangeMap.length && !a.m_tempTimerID && (a.m_tempTimerID = setTimeout(function() {
                a.UpdateDragOverStates();
                a.m_tempTimerID = null
            }, 10));
            b.preventDefault();
            b.stopPropagation && b.stopPropagation()
        }
    };
    cp.DD.Interaction.prototype.ShowDropTargetEffect = function(b) {
        var a = this.GetDTObjFromDTID(b);
        if (a && 1 === a.ef) {
            var c = document.getElementById(b),
                a = document.getElementById(cp.D[b].mdi),
                e = a.parentElement;
            cp.DD.spv(e, b, 1);
            cp.DD.spv(a, b, 2);
            var d = cp.DD.GetBaseItemInState(b),
                f = b;
            d && (f = d.framesetID, c = document.getElementById(d.framesetID), a = document.getElementById(cp.D[d.framesetID].mdi), e = a.parentElement);
            if (cp.responsive) cp.applyTransform(a.parentElement,
                "scale(1.2)");
            else if (this.m_DTFsIdToDTEffectCanvasMap[b]) a.style.visibility = "hidden", this.m_DTFsIdToDTEffectCanvasMap[b].element.style.visibility = "visible";
            else {
                var d = cp.D[cp.D[f].mdi],
                    d = d.re || d.sh && !d.sh.i,
                    f = 1.2 * parseFloat(a.style.width),
                    g = (f - parseFloat(a.style.width)) / 2,
                    h = 1.2 * parseFloat(a.style.height),
                    k = (h - parseFloat(a.style.height)) / 2,
                    l = cp.createCanvas(0, 0, f, h, cp.newElem("canvas"));
                l.element.style.display = "block";
                l.element.style.position = "absolute";
                l.element.style.visibility = "visible";
                a.style.visibility =
                    "hidden";
                l.element.style.marginLeft = "0px";
                l.element.style.marginTop = "0px";
                l.element.style.opacity = 1;
                this.PaintDropTargetOnEffectCanvas(l.gc, a, {
                    x: 0,
                    y: 0,
                    w: f,
                    h: h
                });
                try {
                    var m = document.getElementById("div_Slide").getElementsByClassName("cp-frameset")[0],
                        o = e,
                        p = cp.DD.GetAllItemsInAllStates(b);
                    if (0 < p.length) {
                        var q = p[p.length - 1];
                        if (q && cp.D[q]) {
                            var n = document.getElementById(cp.D[q].mdi);
                            n && (o = n.parentElement)
                        }
                    }
                    m.insertBefore(l.element, o.nextSibling);
                    l.element.style.zIndex = o.style.zIndex
                } catch (t) {}
                d ? (g = (parseInt(c.style.left) +
                    parseInt(c.style.width) / 2) * (1.2 - 1), k = (parseInt(c.style.top) + parseInt(c.style.height) / 2) * (1.2 - 1), l.element.style.left = parseFloat(e.style.left) + parseFloat(a.style.marginLeft) - g + "px", l.element.style.top = parseFloat(e.style.top) + parseFloat(a.style.marginTop) - k + "px") : (l.element.style.left = parseFloat(e.style.left) - g + "px", l.element.style.top = parseFloat(e.style.top) - k + "px");
                l.element.style.width = f + "px";
                l.element.style.height = h + "px";
                this.m_DTFsIdToDTEffectCanvasMap[b] = l
            }
        }
    };
    cp.DD.Interaction.prototype.UpdateDropTargetEffect =
        function(b, a) {
            var c = this.GetDTObjFromDTID(b);
            if (c && 1 === c.ef) {
                var e = document.getElementById(b),
                    c = document.getElementById(cp.D[b].mdi),
                    d = c.parentElement;
                cp.DD.spv(d, b, 1);
                cp.DD.spv(c, b, 2);
                var f = cp.DD.GetBaseItemInState(b),
                    g = b;
                f && (g = f.framesetID, e = document.getElementById(f.framesetID), c = document.getElementById(cp.D[f.framesetID].mdi), d = c.parentElement);
                if (cp.responsive) {
                    if ((e = cp.DD.GetBaseItemInState(b, a)) && e.framesetID && cp.D[e.framesetID])(e = document.getElementById(cp.D[e.framesetID].mdi)) && cp.applyTransform(e.parentElement,
                        "scale(1)");
                    cp.applyTransform(c.parentElement, "scale(1.2)")
                } else if (this.m_DTFsIdToDTEffectCanvasMap[b]) {
                    var f = cp.D[cp.D[g].mdi],
                        f = f.re || f.sh && !f.sh.i,
                        g = 1.2 * parseFloat(c.style.width),
                        h = (g - parseFloat(c.style.width)) / 2,
                        k = 1.2 * parseFloat(c.style.height),
                        l = (k - parseFloat(c.style.height)) / 2,
                        m = this.m_DTFsIdToDTEffectCanvasMap[b];
                    c.style.visibility = "hidden";
                    var o = m.gc;
                    o.clearRect(0, 0, parseFloat(m.element.style.width), parseFloat(m.element.style.height));
                    m.element.style.width = g + "px";
                    m.element.style.height = k +
                        "px";
                    m.element.width = g;
                    m.element.height = k;
                    this.PaintDropTargetOnEffectCanvas(o, c, {
                        x: 0,
                        y: 0,
                        w: g,
                        h: k
                    });
                    f ? (h = (parseInt(e.style.left) + parseInt(e.style.width) / 2) * (1.2 - 1), l = (parseInt(e.style.top) + parseInt(e.style.height) / 2) * (1.2 - 1), m.element.style.left = parseFloat(d.style.left) + parseFloat(c.style.marginLeft) - h + "px", m.element.style.top = parseFloat(d.style.top) + parseFloat(c.style.marginTop) - l + "px") : (m.element.style.left = parseFloat(d.style.left) - h + "px", m.element.style.top = parseFloat(d.style.top) - l + "px")
                }
            }
        };
    cp.DD.Interaction.prototype.PaintDropTargetOnEffectCanvas =
        function(b, a, c) {
            if (!(void 0 === b || void 0 == a))
                if ("cp-animationItem" === a.className || "cp-WebObject" === a.className) {
                    var e = new Image,
                        a = cp.D[a.id];
                    e.onload = function() {
                        b.drawImage(e, c.x, c.y, c.w, c.h)
                    };
                    var d = a.ip,
                        a = cp.movie.im;
                    d && a && a.getImageDataURI(d, function(a) {
                        d = a
                    });
                    e.src = d
                } else if (b.drawImage(a, c.x, c.y, c.w, c.h), a = a.parentElement, 1 < a.childNodes.length && (a = a.getElementsByClassName("cp-vtxt"), null != a && 1 == a.length)) {
                var f = a[0],
                    a = "";
                f.firstChild.firstChild.firstChild.firstChild && (a = f.firstChild.firstChild.firstChild.firstChild.textContent);
                b.font = f.firstChild.firstChild.firstChild.style.font;
                b.fillStyle = f.firstChild.firstChild.firstChild.style.color;
                var g = f.firstChild.firstChild.style.textAlign,
                    h = parseFloat(f.style.marginLeft),
                    k = parseFloat(f.style.marginTop),
                    l = parseFloat(f.style.width);
                parseFloat(f.style.height);
                var m = parseFloat(f.firstChild.firstChild.firstChild.style.fontSize),
                    f = parseFloat(f.firstChild.firstChild.firstChild.style.lineHeight) * m / 100;
                b.textBaseline = "top";
                "left" == g ? (b.textAlign = "left", A(b, a, h, k, l, f)) : "center" == g ? (b.textAlign =
                    "center", A(b, a, h + l / 2, k, l, f)) : "right" == g ? (b.textAlign = "right", A(b, a, h + l, k, l, f)) : (b.textAlign = "left", A(b, a, h, k, l, f))
            }
        };
    cp.DD.Interaction.prototype.HideDropTargetEffect = function(b, a) {
        var c = document.getElementById(cp.D[b].mdi),
            e = cp.DD.GetBaseItemInState(b);
        e && (c = document.getElementById(cp.D[e.framesetID].mdi));
        !cp.responsive && this.m_DTFsIdToDTEffectCanvasMap[b] ? a ? (c.style.visibility = "visible", document.getElementById("div_Slide").getElementsByClassName("cp-frameset")[0].removeChild(this.m_DTFsIdToDTEffectCanvasMap[b].element),
            this.m_DTFsIdToDTEffectCanvasMap[b] = null) : (c.style.visibility = "visible", this.m_DTFsIdToDTEffectCanvasMap[b].element.style.visibility = "hidden") : cp.applyTransform(c.parentElement, "scale(1)")
    };
    cp.DD.Interaction.prototype.GetDTObjFromDTID = function(b) {
        if (0 < this.m_dtList.length)
            for (var a = 0; a < this.m_dtList.length; ++a)
                if (this.m_dtList[a].n === b) return this.m_dtList[a];
        return null
    };
    cp.DD.Interaction.prototype.GetDSObjFromDSID = function(b) {
        if (0 < this.m_dsList.length)
            for (var a = 0; a < this.m_dsList.length; ++a)
                if (this.m_dsList[a].n ===
                    b) return this.m_dsList[a];
        return null
    };
    cp.DD.Interaction.prototype.checkAccepts = function(b, a) {
        var c = !1,
            e = this.GetDTObjFromDTID(a);
        if (null !== e && (c = e.ac, c = "" === c || "*" === c ? !0 : "\\b()\\b" === c ? !1 : RegExp(c).test(b))) {
            var d = e.acc;
            if (0 > d) c = !0;
            else {
                var f = this.DTMap[a];
                f && (c = f.acceptedDragSources.length < d ? !0 : !1 === e.rgo ? !1 : this.shouldReplaceDragSource = !0)
            }
        }
        return c
    };
    cp.DD.Interaction.prototype.ItemOnMouseOver = function(b) {
        var b = b.target,
            a = cp.D[b.id];
        if (a)
            if (a.type === cp.kCPOTAutoShape) {
                this.lCanvas = document.getElementById(b.id +
                    "c");
                this.lgc = this.lCanvas.getContext("2d");
                var c = this;
                b.onmousemove = function(a) {
                    if (void 0 !== this.lCanvas.ss && 0 === this.lCanvas.ss) {
                        var b;
                        if (c.lCanvas && c.lgc) {
                            b = c.lcanvas.parentElement.getBoundingClientRect();
                            var f = c.lcanvas.getBoundingClientRect();
                            cp("div_Slide").getBoundingClientRect();
                            var g = cp.getScaledPosition(window.getPageX(a), window.getPageY(a)),
                                a = b.left - cp.movie.offset,
                                h = b.top - cp.movie.topOffset,
                                k = f.left - cp.movie.offset,
                                l = f.top - cp.movie.topOffset,
                                m = parseFloat(c.lcanvas.style.marginLeft),
                                o =
                                parseFloat(c.lcanvas.style.marginTop),
                                m = !isNaN(m) ? m : 0,
                                o = !isNaN(o) ? o : 0;
                            if (c.lgc) {
                                if (cp.responsive) p = g.X - window.pageXOffset - f.left, f = g.Y - window.pageYOffset - f.top;
                                else {
                                    var p = g.X - window.pageXOffset / cp.movie.m_scaleFactor - (0 > m ? k : a) / cp.movie.m_scaleFactor,
                                        f = g.Y - window.pageYOffset / cp.movie.m_scaleFactor - (0 > o ? l : h) / cp.movie.m_scaleFactor;
                                    cp.shouldScale && (cp.loadedModules.toc && (!cp.toc.movieProperties.tocProperties.overlay && 1 == cp.toc.movieProperties.tocProperties.position) && (p += cp.toc.movieProperties.tocProperties.width),
                                        cp.loadedModules.playbar && !cp.PB.MP.PBP.overlay && (0 == cp.PB.MP.PBP.position ? p += cp.PB.playBarHeight : 1 == cp.PB.MP.PBP.position && (f += cp.PB.playBarHeight)));
                                    p *= parseFloat(c.lcanvas.parentElement.style.width) / b.width * cp.movie.m_scaleFactor;
                                    f *= parseFloat(c.lcanvas.parentElement.style.height) / b.height * cp.movie.m_scaleFactor;
                                    cp.verbose && (cp.log("lParentOffsetL : " + a + "," + h), cp.log("lElemL : " + k + "," + l), cp.log("lElemMarginL : " + m + o), cp.log("X : " + p + "," + f))
                                }
                                b = c.lgc.isPointInPath(p, f)
                            } else b = !1
                        } else cp.log(b), b = !1;
                        b ? cp.DD.ChangeMouseCursor("pointer") : cp.DD.ChangeMouseCursor("default")
                    } else cp.DD.ChangeMouseCursor("pointer")
                }
            } else cp.DD.ChangeMouseCursor("pointer")
    };
    cp.DD.Interaction.prototype.ItemOnMouseOut = function(b) {
        b.target.onmousemove = null;
        cp.DD.ChangeMouseCursor("default")
    };
    cp.DD.Interaction.prototype.ItemOnMouseUp = function() {
        if (!cp.disableInteractions) {
            cp.m_gestureHandler && cp.m_gestureHandler.enableGestures();
            var b = cp.DD.CurrInteractionManager.m_ActiveInteraction;
            if (null !== b) {
                var a = b.m_dummyCanvas;
                b.m_DummyCanvasWithoutEffect.id = "dummy";
                var c = parseFloat(b.m_dummyCanvas.element.style.left),
                    e = parseFloat(b.m_dummyCanvas.element.style.top),
                    d = b.m_dummyCanvasOffset.x,
                    f = b.m_dummyCanvasOffset.y;
                cp.verbose && (cp.log(c + "," + e), cp.log(d + "," + f));
                draggedItemParentEl = b.m_dragSourceCanvas.parentElement;
                b.m_DummyCanvasWithoutEffect.element.style.left = c + d + "px";
                b.m_DummyCanvasWithoutEffect.element.style.top = e + f + "px";
                b.m_DummyCanvasWithoutEffect.element.style.visibility = "visible";
                b.m_DummyCanvasWithoutEffect.element.style.display =
                    "block";
                b.m_DummyCanvasWithoutEffect.element.offsetHeight = b.m_DummyCanvasWithoutEffect.element.offsetHeight;
                "cp-WebObject" === b.m_dragSourceCanvas.className && !cp.responsive && (cp.applyTransform(b.m_DummyCanvasWithoutEffect.element, b.m_dummyCanvas.element.style.webkitTransform), cp.applyTransform(b.m_DummyCanvasWithoutEffect.element, b.m_dummyCanvas.element.style.transform));
                b.m_dummyCanvas = b.m_DummyCanvasWithoutEffect;
                document.getElementById("div_Slide").removeChild(a.element);
                b.m_dummyCanvasOffset.x =
                    0;
                b.m_dummyCanvasOffset.y = 0;
                cp.DD.ChangeMouseCursor("default");
                b.m_isItemBeingDragged = !1;
                cp.DD.IsTouchDevice() ? (document.ontouchmove = cp.DD.DefaultDocumentTouchMove, document.ontouchend = cp.DD.DefaultDocumentTouchEnd, document.ontouchstart = cp.DD.DefaultDocumentTouchStart) : (document.onmouseup = null, document.onmousemove = null);
                document.onselectstart = null;
                null !== b.m_dragSourceCanvas && null !== b.m_dummyCanvas && b.appendDragSourceToOverlappingDropTarget()
            }
        }
    };
    cp.DD.Interaction.prototype.deleteDummyCanvas = function() {
        document.getElementById("div_Slide").removeChild(this.m_dummyCanvas.element);
        this.UpdateDragSourceAudio(this.m_DsFrameSetDataID, null, this.m_DragSourceCurrentTransientState);
        this.m_DragSourceCurrentTransientState = this.m_DragSourcePreviousTransientState = null
    };
    cp.DD.Interaction.prototype.appendDragSourceToOverlappingDropTarget = function() {
        for (var b = document.getElementById("div_Slide").getElementsByClassName("cp-frameset"), a = document.getElementById(this.m_DsStateItemFrameSetDataID), c = !1, e = !1, d = null, f = cp.DD.GetDimensionsAfterRotation(0, 0, this.m_tempFrameSetPos.w, this.m_tempFrameSetPos.h,
                cp.DD.getRotationAngle(a)), f = cp.DD.GetRectFromBounds(this.m_tempFrameSetPos.x + f.minX, this.m_tempFrameSetPos.y + f.minY, f.maxX - f.minX, f.maxY - f.minY), g = b.length - 1; 1 <= g; --g)
            if (c = b[g], cp.DD.spv(c, c.id, 0), a.id != b[g].id) {
                var h = b[g].id,
                    k = this.GetDTObjFromDTID(h);
                if (k && cp.responsive) {
                    var l = this.DTMap[h];
                    l.prevAcceptedDragSources = JSON.parse(JSON.stringify(l.acceptedDragSources));
                    l.prevAcceptedDragSourceObjects = JSON.parse(JSON.stringify(l.acceptedSourceObjects))
                }
            }
        for (var m = "", g = b.length - 1; 1 <= g; --g)
            if (c = b[g],
                cp.DD.spv(c, c.id, 0), a.id != b[g].id && (h = b[g].id, k = this.GetDTObjFromDTID(h))) {
                cp.responsive && (l = this.DTMap[h], l.prevAcceptedDragSources = JSON.parse(JSON.stringify(l.acceptedDragSources)), l.prevAcceptedDragSourceObjects = JSON.parse(JSON.stringify(l.acceptedSourceObjects)));
                l = 0;
                k.ha && (l = k.ha);
                var o = cp.DD.GetDimensionsAfterRotation(0, 0, parseFloat(c.style.width), parseFloat(c.style.height), cp.DD.getRotationAngle(b[g])),
                    p = parseFloat(c.style.left) + o.minX - l,
                    c = parseFloat(c.style.top) + o.minY - l,
                    c = cp.DD.GetRectFromBounds(p,
                        c, o.maxX - o.minX + 2 * l, o.maxY - o.minY + 2 * l);
                if (c = cp.DD.doRectangleIntersect(f, c)) {
                    c = this.m_DTFsIdToStateBeforeDragOverMap[h];
                    this.m_DTFsIdToStateBeforeDragOverMap[h] = null;
                    if (0 < this.m_dtList.length)
                        for (e = 0; e < this.m_dtList.length; ++e)
                            if (dtID = this.m_dtList[e].n, this.HideDropTargetEffect(dtID, !0), dtID !== h && (l = cp.DD.getCurrentObjectStateProperties(dtID)) && l.stn === cp.DD.ObjectStateNames.kCPDragOver) l = cp.DD.ObjectStateNames.kCPNormal, this.m_DTFsIdToStateBeforeDragOverMap[dtID] && (l = this.m_DTFsIdToStateBeforeDragOverMap[dtID],
                                this.m_DTFsIdToStateBeforeDragOverMap[dtID] = null), cp.changeState(dtID, l);
                    o = this.GetDSObjFromDSID(this.m_DsFrameSetDataID);
                    if (null === k || null === o) return;
                    e = this.DragSourceCurrentStateList[this.DSMap[this.m_DsFrameSetDataID]];
                    this.shouldReplaceDragSource = !1;
                    if (e = e.DropTargetId === h ? !0 : this.checkAccepts(o.t, h)) {
                        this.resetAvailable = this.undoAvailable = !0;
                        this.UpdateDragSourcePreviousStatePropertiesObjects();
                        cp.responsive && (l = this.DTMap[h], l.prevAcceptedDragSources = JSON.parse(JSON.stringify(l.acceptedDragSources)),
                            l.prevAcceptedDragSourceObjects = JSON.parse(JSON.stringify(l.acceptedSourceObjects)));
                        this.shouldReplaceDragSource && this.ReplaceDragSource(h);
                        this.DoOnMouseUpNAccept(o, k, h, c);
                        break
                    } else null === d ? (d = h, m = c) : cp.changeState(h, c)
                }
            }!1 === e && (null !== d ? (this.DoOnDropTargetRejects(d, m), this.MoveDragSourceOnDropTargetReject(a, !0)) : this.MoveDragSourceOnDropTargetReject(a, !1))
    };
    cp.DD.Interaction.prototype.PlayReturnDragSourceAudio = function() {
        this.m_ReturnDragSourceAudio && cp.playAudio(this.m_ReturnDragSourceAudio, !1)
    };
    cp.DD.Interaction.prototype.MoveDragSourceOnDropTargetReject = function(b, a) {
        var c = parseFloat(this.m_dummyCanvas.element.style.left),
            e = parseFloat(this.m_dummyCanvas.element.style.left) + parseFloat(this.m_dummyCanvas.element.style.width),
            d = parseFloat(this.m_dummyCanvas.element.style.top),
            f = parseFloat(this.m_dummyCanvas.element.style.top) + parseFloat(this.m_dummyCanvas.element.style.height),
            g = parseFloat(this.m_dummyCanvas.element.parentElement.style.width),
            h = parseFloat(this.m_dummyCanvas.element.parentElement.style.height);
        cp.responsive && (g = cp("div_Slide").clientWidth, h = cp("div_Slide").clientHeight);
        var k = !0;
        if (c > g || 0 > e || d > h || 0 > f) k = !1;
        if (!0 === a || this.m_SendDragSourceBack || !k) c = parseFloat(this.m_dummyCanvas.element.style.left), e = parseFloat(this.m_dummyCanvas.element.style.top), d = this.m_dummyCanvasOffset.x, f = this.m_dummyCanvasOffset.y, g = parseFloat(this.m_dragSourceCanvas.style.marginLeft) + parseFloat(this.m_dragSourceCanvas.parentElement.style.left), h = parseFloat(this.m_dragSourceCanvas.style.marginTop) + parseFloat(this.m_dragSourceCanvas.parentElement.style.top),
            "cp-WebObject" === this.m_dragSourceCanvas.className && (g = parseFloat(this.m_dragSourceCanvas.parentElement.style.left), h = parseFloat(this.m_dragSourceCanvas.parentElement.style.top)), cp.responsive && (g = 0 < g ? g : this.m_DragSourceInitialFsPos.x, h = 0 < h ? h : this.m_DragSourceInitialFsPos.y), cp.verbose && (cp.log(c + "," + e), cp.log(g + "," + h)), !0 === a ? (this.UpdateDragSourceDummyCanvasWithState(cp.DD.ObjectStateNames.kCPDropReject, !1), k = {}, k[this.m_DsFrameSetDataID] = {
                    type: 1,
                    toState: cp.DD.ObjectStateNames.kCPDropReject,
                    disableDrag: !0
                },
                this.AnimateObjectGliding(this.m_dummyCanvas.element, new cp.DD.AnimationState(c, e, null, null, null), new cp.DD.AnimationState(g - d, h - f, null, null, null), 10, this.ReturnDragSourceAnimationCallback, k)) : this.AnimateObjectGliding(this.m_dummyCanvas.element, new cp.DD.AnimationState(c, e, null, null, null), new cp.DD.AnimationState(g - d, h - f, null, null, null), 10, this.ReturnDragSourceAnimationCallback), !0 === a && this.PlayReturnDragSourceAudio();
        else {
            this.resetAvailable = this.undoAvailable = !0;
            this.UpdateDragSourcePreviousStatePropertiesObjects();
            c = b.id;
            c = cp.DD.getBaseStateItem(c);
            b = document.getElementById(c);
            d = this.m_dragSourceCanvas.parentElement;
            e = null;
            for (f = 0; f < this.DragSourceInitialStateList.length; ++f) g = this.DragSourceInitialStateList[f], g.objectID == c && (e = g);
            if (null != e) {
                null !== e.Width && (b.style.width = parseFloat(e.Width) + "px");
                null !== e.Height && (b.style.height = parseFloat(e.Height) + "px");
                cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[c]], null, null, null, b.style.width, b.style.height, null, null, null,
                    null, "", null);
                f = e.divStruct;
                null !== f && (null !== f.Width && (d.style.width = parseFloat(f.Width) + "px"), null !== f.Height && (d.style.height = parseFloat(f.Height) + "px"), cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[c]], null, null, null, null, null, null, f, null, null, "", null));
                d = e.canvasStruct;
                if (null !== d) {
                    null !== d.Width && (this.m_dragSourceCanvas.style.width = parseFloat(d.Width) + "px");
                    null !== d.Height && (this.m_dragSourceCanvas.style.height = parseFloat(d.Height) + "px");
                    null !== d.MarginLeft &&
                        (this.m_dragSourceCanvas.style.marginLeft = parseFloat(d.MarginLeft) + "px");
                    null !== d.MarginTop && (this.m_dragSourceCanvas.style.marginTop = parseFloat(d.MarginTop) + "px");
                    f = e.objectID + "_vTxtHolder";
                    if (f = cp(f))
                        if (null !== d.textPosLeft && (f.style.left = parseFloat(d.textPosLeft) + "px"), null !== d.textPosTop && (f.style.top = parseFloat(d.textPosTop) + "px"), null !== d.textWidth && (f.style.width = parseFloat(d.textWidth) + "px"), null !== d.textHeight && (f.style.height = parseFloat(d.textHeight) + "px"), f.firstChild)
                            if (null !== d.textChildPosLeft &&
                                (f.firstChild.style.left = parseFloat(d.textChildPosLeft) + "px"), null !== d.textChildPosTop && (f.firstChild.style.top = parseFloat(d.textChildPosTop) + "px"), null !== d.textChildWidth && (f.firstChild.style.width = parseFloat(d.textChildWidth) + "px"), null !== d.textChildHeight) f.firstChild.style.height = parseFloat(d.textChildHeight) + "px";
                    cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[c]], null, null, null, null, null, null, null, d, null, "", null)
                }
                cp.DD.UpdateSizeNPosOfAllStateItems(c, cp.DD.populateBoundsForStateItems(this.DragSourceCurrentStateList[this.DSMap[c]],
                    1));
                cp.DD.UpdateTextBoundsOfAllStateItems(c, cp.DD.populateTextBoundsForStateItems(this.DragSourceCurrentStateList[this.DSMap[c]], {
                    bUpdateTextChildSize: !0,
                    bUpdateScale: !1
                }));
                this.SetDsFramesetAndCanvasDivPos(c, this.m_tempFrameSetPos.x, this.m_tempFrameSetPos.y);
                this.m_dragSourceCanvas.style.opacity = 1;
                cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[c]], null, null, null, null, null, 1, null, null, null, "", null);
                cp.DD.updateOpacityOfAllStateItems(c, 1);
                this.RestoreOriginalIndexOfDsFramesetId(c);
                f = b;
                g = cp.DD.GetBaseItemInState(c);
                null !== g && (f = document.getElementById(g.framesetID));
                cp.DD.IsTouchDevice() ? f.ontouchstart = this.ItemOnMouseDown : f.onmousedown = this.ItemOnMouseDown;
                !0 === cp.DD.getAttribute(this.m_elId, "hc") && !cp.DD.IsTouchDevice() && (f.onmouseover = this.ItemOnMouseOver, f.onmouseout = this.ItemOnMouseOut);
                g = this.DSLMSMap[b.id];
                g.posleft = b.style.left;
                g.postop = b.style.top;
                g.previousDTID = g.currentDTID;
                if (null !== g.currentDTID) {
                    h = this.DTMap[g.currentDTID];
                    for (f = 0; f < h.acceptedSourceObjects.length; ++f)
                        if (h.acceptedSourceObjects[f].objectID ===
                            g.objectID) {
                            h.acceptedSourceObjects.splice(f, 1);
                            break
                        }
                }
                g.currentDTID = null;
                g.currentPositionId = g.objectID;
                if (g = this.DragSourceCurrentStateList[this.DSMap[this.m_DsFrameSetDataID]].DropTargetId) {
                    for (f = 0; f < this.DTMap[g].acceptedDragSources.length; ++f)
                        if (this.DTMap[g].acceptedDragSources[f] === this.m_DsFrameSetDataID) {
                            this.DTMap[g].acceptedDragSources.splice(f, 1);
                            break
                        }
                    for (f = 0; f < this.DTMap[g].acceptedSourceObjects.length; ++f)
                        if (this.DTMap[g].acceptedSourceObjects[f].objectID === this.m_DsFrameSetDataID) {
                            this.DTMap[g].acceptedSourceObjects.splice(f,
                                1);
                            break
                        }
                    f = this.GetDTObjFromDTID(g).sbp;
                    (f == cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingTop || f == cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingBottom || f == cp.DD.SnapBehaviourPos.kCPSBPTileBottomTopStartingLeft || f == cp.DD.SnapBehaviourPos.kCPSBPTileTopBottomStartingLeft) && this.SetSnapPosition(g, null)
                }
                this.DragSourceCurrentStateList[this.DSMap[this.m_DsFrameSetDataID]].DropTargetId = null;
                if (cp.responsive && (f = this.m_DsFrameSetDataID + "_vTxtHolder", f = cp(f))) g = cp.DD.initializeTextBoundsForStateItems(),
                    h = cp(this.m_DsFrameSetDataID), null !== d ? (f.style.width = d.textWidth, f.style.height = d.textHeight) : (f.style.width = h.clientWidth + "px", f.style.height = h.clientHeight + "px"), g.textWidth = f.style.width, g.textHeight = f.style.height, f.firstChild && (f.firstChild.style["-ms-transform-origin"] = "left top", f.firstChild.style["-moz-transform-origin"] = "left top", f.firstChild.style["-webkit-transform-origin"] = "left top", f.firstChild.style["-o-transform-origin"] = "left top", f.firstChild.style["transform-origin"] = "left top",
                        cp.applyTransform(f.firstChild, "scale(1)"), g.scale = 1), cp.DD.UpdateTextBoundsOfAllStateItems(this.m_DsFrameSetDataID, g);
                cp.show(this.m_DsFrameSetDataID);
                e = e.objectState;
                cp.DD.changeState(c, e, this);
                cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[c]], null, null, null, null, null, null, null, null, null, null, e);
                this.deleteDummyCanvas();
                this.m_dummyCanvas = this.m_dragSourceCanvas = null
            }
        }
    };
    cp.DD.Interaction.prototype.DoOnMouseUpNAccept = function(b, a, c, e) {
        var d = this.DragSourceCurrentStateList[this.DSMap[this.m_DsFrameSetDataID]].DropTargetId;
        if (d) {
            for (var f = 0; f < this.DTMap[d].acceptedDragSources.length; ++f)
                if (this.DTMap[d].acceptedDragSources[f] === this.m_DsFrameSetDataID) {
                    this.DTMap[d].acceptedDragSources.splice(f, 1);
                    break
                }
            for (f = 0; f < this.DTMap[d].acceptedSourceObjects.length; ++f)
                if (this.DTMap[d].acceptedSourceObjects[f].objectID === this.m_DsFrameSetDataID) {
                    this.DTMap[d].acceptedSourceObjects.splice(f, 1);
                    this.DSLMSMap[this.m_DsFrameSetDataID].currentDTID = null;
                    break
                }
        }
        this.appendDivAsChildOfAnotherDiv(c, this.m_DsFrameSetDataID);
        var d = cp.D[cp.D[this.m_DsFrameSetDataID].mdi],
            d = d.re || d.sh && !d.sh.i,
            f = parseFloat(this.m_dummyCanvas.element.style.left),
            g = parseFloat(this.m_dummyCanvas.element.style.top),
            h = parseFloat(this.m_dragSourceCanvas.style.marginLeft),
            k = parseFloat(this.m_dragSourceCanvas.style.marginTop);
        cp.responsive && (f += h, g += k);
        var l = this.m_dummyCanvasOffset.x,
            m = this.m_dummyCanvasOffset.y,
            h = h + parseFloat(this.m_dragSourceCanvas.parentElement.style.left),
            k = k + parseFloat(this.m_dragSourceCanvas.parentElement.style.top);
        cp.verbose && (cp.log(f + "," + g), cp.log(h + "," + k));
        var o =
            cp.DD.ObjectStateNames.kCPDropAccept;
        cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[this.m_DsFrameSetDataID]], null, null, null, null, null, null, null, null, null, null, o);
        var p = !1,
            q = this.DragSourceCurrentStateList[this.DSMap[this.m_DsFrameSetDataID]];
        q && (null !== q.DropTargetId && q.DropTargetId === c) && (p = !0);
        q = {};
        q[this.m_DsFrameSetDataID] = {
            type: 0,
            toState: o
        };
        p ? cp.changeState(c, e) : this.m_autoSubmit || (cp.DD.hasStateWithName(c, o) ? (this.m_DropTargetStatePriorToDropAcceptOrRejectState = {
            dropTarget: c,
            prevState: e
        }, q[c] = {
            type: 1,
            toState: o,
            finalState: e
        }) : cp.changeState(c, e));
        q.dropTargetAccept = {
            target: c,
            prevState: e
        };
        d ? this.AnimateObjectGliding(this.m_dummyCanvas.element, new cp.DD.AnimationState(f, g, parseFloat(this.m_dummyCanvas.element.style.width), parseFloat(this.m_dummyCanvas.element.style.height), 1), new cp.DD.AnimationState(h - l, k - m, parseFloat(this.m_dragSourceCanvas.style.width) + 2 * l, parseFloat(this.m_dragSourceCanvas.style.height) + 2 * m, parseFloat(this.m_dragSourceCanvas.style.opacity)),
            10, this.ReturnDragSourceAnimationCallback, q) : this.AnimateObjectGliding(this.m_dummyCanvas.element, new cp.DD.AnimationState(f, g, parseFloat(this.m_dummyCanvas.element.style.width), parseFloat(this.m_dummyCanvas.element.style.height), 1), new cp.DD.AnimationState(h - l, k - m, parseFloat(this.m_dragSourceCanvas.parentElement.style.width) + 2 * l, parseFloat(this.m_dragSourceCanvas.parentElement.style.height) + 2 * m, parseFloat(this.m_dragSourceCanvas.style.opacity)), 10, this.ReturnDragSourceAnimationCallback, q);
        this.DTMap[c].acceptedDragSources.push(this.m_DsFrameSetDataID);
        this.DragSourceCurrentStateList[this.DSMap[this.m_DsFrameSetDataID]].DropTargetId = c;
        this.DSLMSMap[this.m_DsFrameSetDataID].currentDTID !== c && (e = document.getElementById(this.m_DsFrameSetDataID), this.DTMap[c].acceptedSourceObjects.push(this.DSLMSMap[this.m_DsFrameSetDataID]), this.DSLMSMap[this.m_DsFrameSetDataID].posleft = e.style.left, this.DSLMSMap[this.m_DsFrameSetDataID].postop = e.style.top, this.DSLMSMap[this.m_DsFrameSetDataID].previousDTID = this.DSLMSMap[this.m_DsFrameSetDataID].currentDTID, this.DSLMSMap[this.m_DsFrameSetDataID].currentDTID =
            c, this.DSLMSMap[this.m_DsFrameSetDataID].currentPositionId = c, this.DTLMSList.push(this.DTMap[c]));
        this.appendToAnswerList(b.t, a.t);
        cp.DD.ChangeMouseCursor("default")
    };
    cp.DD.Interaction.prototype.UpdateDragSourcePreviousStatePropertiesObjects = function() {
        for (var b = 0; b < this.DragSourceCurrentStateList.length; ++b) {
            var a = this.DragSourceCurrentStateList[b];
            if (cp.responsive)
                for (var c = cp.responsiveWidths.length, e = 0; e < c; ++e) {
                    var d = cp.responsiveWidths[e];
                    if ("" != a.DropTargetId && void 0 != a.DropTargetId) {
                        var f = cp(a.objectID).getBoundingClientRect(),
                            g = cp(a.DropTargetId).getBoundingClientRect();
                        this.DragSourcePreviousStateList[b].posleftRel = (f.left - g.left) / g.width;
                        this.DragSourcePreviousStateList[b].postopRel = (f.top - g.top) / g.height
                    }
                    cp.DD.R_UpdateDragSourceStatePropertiesObject(this.DragSourcePreviousStateList[b], d, a.Index, null, null, null, null, a.Opacity, a.divStruct, a.canvasStruct, a.zIndex, "" == a.currentPositionId ? a.objectID : a.currentPositionId, a.objectState)
                } else cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourcePreviousStateList[b], a.Index,
                    a.posleft, a.postop, a.Width, a.Height, a.Opacity, a.divStruct, a.canvasStruct, a.zIndex, null, a.objectState);
            this.DragSourcePreviousStateList[b].DropTargetId = a.DropTargetId;
            this.DragSourcePreviousStateList[b].Opacity = a.Opacity
        }
    };
    cp.DD.Interaction.prototype.R_UpdateDragSourceCurrentStatePropertiesObject = function(b, a) {
        if (cp.responsive)
            for (var c = cp.responsiveWidths.length, e = 0; e < c; ++e) {
                var d = cp.responsiveWidths[e];
                cp.DD.R_UpdateDragSourceStatePropertiesObject(b, d, a.Index, a.R_posleft[d], a.R_postop[d], a.R_Width[d],
                    a.R_Height[d], a.Opacity, a.divStruct, a.canvasStruct, a.zIndex, a.currentPositionId, a.objectState)
            }
    };
    cp.DD.Interaction.prototype.UpdateDragSourceCurrentStatePropertiesObjects = function(b) {
        for (var a = 0; a < b.length; ++a) {
            var c = b[a];
            c && (cp.responsive ? this.R_UpdateDragSourceCurrentStatePropertiesObject(this.DragSourceCurrentStateList[a], c) : cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[a], c.Index, c.posleft, c.postop, c.Width, c.Height, c.Opacity, c.divStruct, c.canvasStruct, c.zIndex, null,
                c.objectState), this.DragSourceCurrentStateList[a].DropTargetId = c.DropTargetId, this.DragSourceCurrentStateList[a].Opacity = c.Opacity)
        }
    };
    cp.DD.Interaction.prototype.ReplaceDragSource = function(b) {
        var a = this.GetDTObjFromDTID(b);
        if (a && a.rgo) {
            b = this.DTMap[b];
            this.m_ReplaceDsFsId = b.acceptedDragSources[0];
            var c = null,
                a = cp.DD.GetBaseItemInState(this.m_ReplaceDsFsId),
                c = null == a ? this.m_ReplaceDsFsId : a.framesetID,
                e = document.getElementById(cp.D[c].mdi),
                d = cp.D[this.m_ReplaceDsFsId],
                f = cp.D[d.mdi],
                a = document.getElementById(this.m_ReplaceDsFsId),
                d = document.getElementById(d.mdi);
            if (a && d && e) {
                var g = d.parentElement;
                if (g) {
                    this.m_ReplacedDragSourceDummyCanvas = cp.DD.CreateDummyCanvas(e, this.m_dummyCanvas.element);
                    this.m_ReplacedDragSourceDummyCanvas.element.style.visibility = "visible";
                    this.m_ReplacedDragSourceCanvas = e;
                    cp.hide(c);
                    c = null;
                    for (e = 0; e < this.DragSourceInitialStateList.length; ++e) {
                        var h = this.DragSourceInitialStateList[e];
                        h.objectID == this.m_ReplaceDsFsId && (c = h)
                    }
                    if (null != c) {
                        null !== c.Width && (a.style.width = parseFloat(c.Width) + "px");
                        null !== c.Height &&
                            (a.style.height = parseFloat(c.Height) + "px");
                        cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[this.m_ReplaceDsFsId]], null, null, null, a.style.width, a.style.height, null, null, null, null, null, null);
                        e = c.divStruct;
                        null !== e && (null !== e.Width && (g.style.width = parseFloat(e.Width) + "px"), null !== e.Height && (g.style.height = parseFloat(e.Height) + "px"), cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[this.m_ReplaceDsFsId]], null, null, null, null, null,
                            null, e, null, null, null, null));
                        g = c.canvasStruct;
                        if (null !== g) {
                            null !== g.Width && (d.style.width = parseFloat(g.Width) + "px");
                            null !== g.Height && (d.style.height = parseFloat(g.Height) + "px");
                            null !== g.MarginLeft && (d.style.marginLeft = parseFloat(g.MarginLeft) + "px");
                            null !== g.MarginTop && (d.style.marginTop = parseFloat(g.MarginTop) + "px");
                            h = c.objectID + "_vTxtHolder";
                            if (h = cp(h))
                                if (null !== g.textPosLeft && (h.style.left = parseFloat(g.textPosLeft) + "px"), null !== g.textPosTop && (h.style.top = parseFloat(g.textPosTop) + "px"), null !== g.textWidth &&
                                    (h.style.width = parseFloat(g.textWidth) + "px"), null !== g.textHeight && (h.style.height = parseFloat(g.textHeight) + "px"), h.firstChild)
                                    if (null !== g.textChildPosLeft && (h.firstChild.style.left = parseFloat(g.textChildPosLeft) + "px"), null !== g.textChildPosTop && (h.firstChild.style.top = parseFloat(g.textChildPosTop) + "px"), null !== g.textChildWidth && (h.firstChild.style.width = parseFloat(g.textChildWidth) + "px"), null !== g.textChildHeight) h.firstChild.style.height = parseFloat(g.textChildHeight) + "px";
                            cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[this.m_ReplaceDsFsId]],
                                null, null, null, null, null, null, null, g, null, null, null)
                        }
                        cp.DD.UpdateSizeNPosOfAllStateItems(this.m_ReplaceDsFsId, cp.DD.populateBoundsForStateItems(this.DragSourceCurrentStateList[this.DSMap[this.m_ReplaceDsFsId]], 1));
                        cp.DD.UpdateTextBoundsOfAllStateItems(this.m_ReplaceDsFsId, cp.DD.populateTextBoundsForStateItems(this.DragSourceCurrentStateList[this.DSMap[this.m_ReplaceDsFsId]], {
                            bUpdateTextChildSize: !0,
                            bUpdateScale: !1
                        }));
                        c = cp.D[cp.D[this.m_ReplaceDsFsId].mdi];
                        c = c.re || c.sh && !c.sh.i;
                        e = 1;
                        "" !== d.style.opacity &&
                            (e = d.style.opacity);
                        if (cp.responsive) {
                            if (this.SetDsFramesetAndCanvasDivPos(this.m_ReplaceDsFsId, parseFloat(this.DragSourceInitialStateList[this.DSMap[this.m_ReplaceDsFsId]].posleft), parseFloat(this.DragSourceInitialStateList[this.DSMap[this.m_ReplaceDsFsId]].postop)), h = this.m_ReplaceDsFsId + "_vTxtHolder", h = cp(h)) {
                                var f = cp.DD.initializeTextBoundsForStateItems(),
                                    k = cp(this.m_ReplaceDsFsId);
                                null !== g ? (h.style.width = g.textWidth, h.style.height = g.textHeight) : (h.style.width = k.clientWidth + "px", h.style.height =
                                    k.clientHeight + "px");
                                f.textWidth = h.style.width;
                                f.textHeight = h.style.height;
                                h.firstChild && (h.firstChild.style["-ms-transform-origin"] = "left top", h.firstChild.style["-moz-transform-origin"] = "left top", h.firstChild.style["-webkit-transform-origin"] = "left top", h.firstChild.style["-o-transform-origin"] = "left top", h.firstChild.style["transform-origin"] = "left top", cp.applyTransform(h.firstChild, "scale(1)"), f.scale = 1);
                                cp.DD.UpdateTextBoundsOfAllStateItems(this.m_ReplaceDsFsId, f)
                            }
                        } else this.SetDsFramesetAndCanvasDivPos(this.m_ReplaceDsFsId,
                            f.b[0], f.b[1]);
                        d.style.opacity = 1;
                        cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[this.m_ReplaceDsFsId]], null, null, null, null, null, 1, null, null, null, this.DragSourceInitialStateList[this.DSMap[this.m_ReplaceDsFsId]].currentPositionId, null);
                        cp.DD.updateOpacityOfAllStateItems(this.m_ReplaceDsFsId, 1);
                        this.RestoreOriginalIndexOfDsFramesetId(this.m_ReplaceDsFsId);
                        f = this.DragSourceInitialStateList[this.DSMap[this.m_ReplaceDsFsId]].objectState;
                        cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[this.m_ReplaceDsFsId]],
                            null, null, null, null, null, null, null, null, null, null, f);
                        c ? this.AnimateObjectGliding(this.m_ReplacedDragSourceDummyCanvas.element, new cp.DD.AnimationState(parseFloat(this.m_ReplacedDragSourceDummyCanvas.element.style.left), parseFloat(this.m_ReplacedDragSourceDummyCanvas.element.style.top), parseFloat(this.m_ReplacedDragSourceDummyCanvas.element.style.width), parseFloat(this.m_ReplacedDragSourceDummyCanvas.element.style.height), e), new cp.DD.AnimationState(parseFloat(d.style.marginLeft) + parseFloat(d.parentElement.style.left),
                            parseFloat(d.style.marginTop) + parseFloat(d.parentElement.style.top), parseFloat(d.style.width), parseFloat(d.style.height), 1), 20, this.ReplaceDragSourceAnimationCallback, f) : this.AnimateObjectGliding(this.m_ReplacedDragSourceDummyCanvas.element, new cp.DD.AnimationState(parseFloat(this.m_ReplacedDragSourceDummyCanvas.element.style.left), parseFloat(this.m_ReplacedDragSourceDummyCanvas.element.style.top), parseFloat(this.m_ReplacedDragSourceDummyCanvas.element.style.width), parseFloat(this.m_ReplacedDragSourceDummyCanvas.element.style.height),
                            e), new cp.DD.AnimationState(parseFloat(d.style.marginLeft) + parseFloat(d.parentElement.style.left), parseFloat(d.style.marginTop) + parseFloat(d.parentElement.style.top), parseFloat(d.parentElement.style.width), parseFloat(d.parentElement.style.height), 1), 20, this.ReplaceDragSourceAnimationCallback, f);
                        d = a;
                        f = cp.DD.GetBaseItemInState(a.id);
                        null !== f && (d = document.getElementById(f.framesetID));
                        cp.DD.IsTouchDevice() ? d.ontouchstart = this.ItemOnMouseDown : d.onmousedown = this.ItemOnMouseDown;
                        !0 === cp.DD.getAttribute(this.m_elId,
                            "hc") && !cp.DD.IsTouchDevice() && (d.onmouseover = this.ItemOnMouseOver, d.onmouseout = this.ItemOnMouseOut);
                        d = this.DSLMSMap[this.m_ReplaceDsFsId];
                        d.posleft = a.style.left;
                        d.postop = a.style.top;
                        d.previousDTID = d.currentDTID;
                        d.currentDTID = null;
                        d.currentPositionId = d.objectID;
                        b.acceptedSourceObjects.splice(0, 1);
                        b.acceptedDragSources.splice(0, 1);
                        this.DragSourceCurrentStateList[this.DSMap[this.m_ReplaceDsFsId]].DropTargetId = null
                    }
                }
            }
        }
    };
    cp.DD.Interaction.prototype.ReplaceDragSourceAnimationCallback = function(b) {
        var a =
            cp.DD.CurrInteractionManager.m_ActiveInteraction;
        null !== a && (a.m_ReplacedDragSourceCanvas && a.m_ReplacedDragSourceDummyCanvas) && (cp.show(a.m_ReplaceDsFsId), void 0 !== b && cp.DD.changeState(a.m_ReplaceDsFsId, b, a), document.getElementById("div_Slide").removeChild(a.m_ReplacedDragSourceDummyCanvas.element), a.m_ReplacedDragSourceCanvas = null, a.m_ReplacedDragSourceDummyCanvas = null)
    };
    cp.DD.Interaction.prototype.RestoreOriginalIndexOfDsFramesetId = function(b) {
        var a = this.DragSourceInitialStateList[this.DSMap[b]];
        if (a) {
            var c = a.prevNonDs,
                a = a.relDepth,
                e = document.getElementById("div_Slide").getElementsByClassName("cp-frameset"),
                d = null,
                f = null,
                g = !1;
            null === c && (g = !0);
            for (j = 1; j < e.length; ++j)
                if (d = e[j].id, g) {
                    var h = cp.DD.getBaseStateItem(d);
                    if (void 0 !== this.DSMap[h] && null !== this.DSMap[h]) {
                        if (d !== b && h != f && (a--, 0 >= a)) break;
                        f = h
                    } else break
                } else d === c && (g = !0);
            this.SetFramesetDepth(b, d);
            for (j = 1; j < e.length; ++j) d = e[j].id, h = cp.DD.getBaseStateItem(d), void 0 !== this.DSMap[h] && null !== this.DSMap[h] && cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[h]],
                j - 1, null, null, null, null, null, null, null, null, null, null)
        }
    };
    cp.DD.Interaction.prototype.SetFramesetDepth = function(b, a) {
        var c = null;
        a && (c = document.getElementById(a), document.getElementById(cp.D[c.id].mdi));
        var c = document.getElementById(b),
            e = document.getElementById(cp.D[b].mdi).parentElement;
        cp.DD.InsertBeforeConsideringStates(b, a);
        var d = this.DragSourceInitialStateList[this.DSMap[b]];
        d && (c.style.zIndex = d.zIndex, e.style.zIndex = d.zIndex, cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[b]],
            null, null, null, null, null, null, null, null, d.zIndex, null, null), cp.DD.updateZIndicesOfAllStateItems(b))
    };
    cp.DD.Interaction.prototype.PerformOnDropActions = function(b) {
        var b = this.GetDTObjFromDTID(b),
            a = this.GetDSObjFromDSID(this.m_DsFrameSetDataID);
        null === b || null === a || (b = b["oda_" + a.t], void 0 === b || null === b || cp.movie.executeAction(b))
    };
    cp.DD.Interaction.prototype.CheckAutoSubmit = function(b, a) {
        if (this.m_autoSubmit) {
            var c = {},
                e = this.CheckIfCorrect(c),
                d = !1;
            e == cp.QuestionStatusEnum.CORRECT || e == cp.QuestionStatusEnum.PARTIAL_CORRECT ?
                (this.m_questionObj && this.storeSuspendData(), cp.SubmitInteractions(this.m_elId, e, this.m_CurrentAttempt), this.m_CurrentAttempt++, this.ShowInteractionSuccessCaption(), cp.movie.executeAction(this.m_successAction), d = this.m_InteractionCompleted = !0, cp.DD.hasStateWithName(b, cp.DD.ObjectStateNames.kCPDropCorrect) || cp.changeState(b, a), this.updateCorrectIncorrectStatesOnTarget(c)) : cp.DD.hasStateWithName(b, cp.DD.ObjectStateNames.kCPDropAccept) ? cp.DD.changeStateForSomeTime(b, cp.DD.ObjectStateNames.kCPDropAccept,
                    this, 1E3, !1, a) : cp.changeState(b, a);
            (0 < this.m_maxAttempts && this.m_CurrentAttempt >= this.m_maxAttempts || d) && this.disableInteraction()
        }
    };
    cp.DD.Interaction.prototype.getCorrectAnswersArray = function() {
        for (var b = [], a = cp.DD.getAttribute(this.m_elId, "cal"), c = 0; c < a.length; ++c) {
            var e = a[c];
            e.a && b.push(e.a)
        }
        return b
    };
    cp.DD.Interaction.prototype.OnSubmitButtonClicked = function() {
        if (!(0 < this.m_maxAttempts && this.m_CurrentAttempt >= this.m_maxAttempts)) {
            this.m_questionObj && this.storeSuspendData();
            var b = {},
                a = this.CheckIfCorrect(b),
                c = !1;
            cp.SubmitInteractions(this.m_elId, a, this.m_CurrentAttempt);
            this.m_CurrentAttempt++;
            a == cp.QuestionStatusEnum.CORRECT || a == cp.QuestionStatusEnum.PARTIAL_CORRECT ? (this.ShowInteractionSuccessCaption(), cp.movie.executeAction(this.m_successAction), this.updateCorrectIncorrectStatesOnTarget(b), c = this.m_InteractionCompleted = !0) : (a = cp.DD.getAttribute(this.m_elId, "cal"), void 0 === a || null === a || 0 >= a.length ? this.m_InteractionCompleted = !0 : 0 < this.m_maxAttempts && this.m_CurrentAttempt === this.m_maxAttempts ? (this.ShowInteractionFailureCaption(),
                cp.movie.executeAction(this.m_failureAction), this.updateCorrectIncorrectStatesOnTarget(b), this.m_InteractionCompleted = !0) : (this.ShowInteractionFailureCaption(), !0 === cp.DD.getAttribute(this.m_elId, "re") ? this.ResetEverythingOnFailure() : !0 === cp.DD.getAttribute(this.m_elId, "ri") && this.ResetOnlyInCorrectOnFailure()));
            (0 < this.m_maxAttempts && this.m_CurrentAttempt >= this.m_maxAttempts || c) && this.disableInteraction()
        }
    };
    cp.DD.Interaction.prototype.OnUndoButtonClicked = function() {
        var b, a;
        if (!0 === this.undoAvailable) {
            if (cp.responsive) {
                var c = [];
                if (this.m_dsList)
                    for (b = 0; b < this.m_dsList.length; ++b) {
                        var e = this.DragSourceCurrentStateList[this.DSMap[this.m_dsList[b].n]],
                            e = this.DragSourceInitialStateList[this.DSMap[this.m_dsList[b].n]],
                            d = cp.DD.copyDragSourcePropertiesObject(this.DragSourcePreviousStateList[this.DSMap[this.m_dsList[b].n]]);
                        if ("" != d.currentPositionId) {
                            if (d.currentPositionId == e.currentPositionId) cp.DD.UpdateDragSourceStatePropertiesObject(d, null, e.posleft, e.postop, e.Width, e.Height, e.Opacity, e.divStruct, e.canvasStruct, e.zIndex,
                                e.currentPositionId, null);
                            else {
                                a = this.GetDTObjFromDTID(d.currentPositionId);
                                if (!a) continue;
                                var f = a.sbp;
                                a = f === cp.DD.SnapBehaviourPos.kCPSBPAbsolute;
                                var g = !1;
                                if (f == cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingTop || f == cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingBottom || f == cp.DD.SnapBehaviourPos.kCPSBPTileBottomTopStartingLeft || f == cp.DD.SnapBehaviourPos.kCPSBPTileTopBottomStartingLeft) g = !0;
                                f = absoluteTop = 0;
                                if (a) {
                                    var h = cp(d.currentPositionId).getBoundingClientRect(),
                                        f = h.left + d.posleftRel * h.width;
                                    absoluteTop = h.top + d.postopRel * h.height
                                }
                                this.updatePreviousStateSnapSize(d, e.currentPositionId, d.currentPositionId);
                                g || this.updatePreviousStateSnapPosition(d, e.currentPositionId, d.currentPositionId, a, f, absoluteTop);
                                this.updatePreviousStateSnapOpacity(d, e.currentPositionId, d.currentPositionId)
                            }
                            c.push(d)
                        }
                    }
                this.updateTiledPreviousStateSnapPosition(c);
                cp.DD.UpdateDivStructure(c)
            } else cp.DD.UpdateDivStructure(this.DragSourcePreviousStateList);
            if (0 < this.m_dsList.length)
                for (b = 0; b < this.m_dsList.length; ++b)
                    if (e =
                        this.DragSourceCurrentStateList[this.DSMap[this.m_dsList[b].n]], d = this.DragSourcePreviousStateList[this.DSMap[this.m_dsList[b].n]], c = e.DropTargetId, d = d.DropTargetId, e = this.DSLMSMap[this.m_dsList[b].n], null === c && null === d && e && (a = document.getElementById(this.m_dsList[b].n), e.posleft = a.style.left, e.postop = a.style.top, e.currentDTID = null, e.previousDTID = null, e.currentPositionId = e.objectID), c === d) cp.responsive && (c && d) && (this.DTMap[d].acceptedDragSources = JSON.parse(JSON.stringify(this.DTMap[c].prevAcceptedDragSources)),
                        this.DTMap[d].acceptedSourceObjects = JSON.parse(JSON.stringify(this.DTMap[c].prevAcceptedDragSourceObjects)), this.DTLMSList.push(this.DTMap[d]));
                    else {
                        if (c) {
                            for (a = 0; a < this.DTMap[c].acceptedDragSources.length; ++a)
                                if (this.DTMap[c].acceptedDragSources[a] === this.m_dsList[b].n) {
                                    this.DTMap[c].acceptedDragSources.splice(a, 1);
                                    break
                                }
                            for (a = 0; a < this.DTMap[c].acceptedSourceObjects.length; ++a)
                                if (this.DTMap[c].acceptedSourceObjects[a].objectID === this.m_dsList[b].n) {
                                    this.DTMap[c].acceptedSourceObjects.splice(a, 1);
                                    break
                                }
                        }
                        d ? (this.DTMap[d].acceptedDragSources.push(this.m_dsList[b].n), this.DTMap[d].acceptedSourceObjects.push(this.DSLMSMap[this.m_dsList[b].n]), this.DTLMSList.push(this.DTMap[d]), e && (e.posleft = null, e.postop = null, e.currentDTID = d, e.previousDTID = c, e.currentPositionId = d)) : e && (a = document.getElementById(this.m_dsList[b].n), e.posleft = a.style.left, e.postop = a.style.top, e.currentDTID = null, e.previousDTID = c, e.currentPositionId = e.objectID)
                    }
            this.UpdateDragSourceCurrentStatePropertiesObjects(this.DragSourcePreviousStateList,
                cp.DD.ReasonForUpdatingCurrentState.kUndo);
            if (0 < this.m_dsList.length)
                for (b = 0; b < this.m_dsList.length; ++b)
                    if (c = this.m_dsList[b].n, e = this.DragSourceCurrentStateList[this.DSMap[this.m_dsList[b].n]], d = e.DropTargetId, dsDiv = document.getElementById(c), c = cp.DD.GetBaseItemInState(c), null !== c && (dsDiv = document.getElementById(c.framesetID)), c = cp.DD.getAttribute(this.m_elId, "reds"), null == d || null !== d && c) cp.DD.IsTouchDevice() ? dsDiv.ontouchstart = this.ItemOnMouseDown : dsDiv.onmousedown = this.ItemOnMouseDown, !0 === cp.DD.getAttribute(this.m_elId,
                        "hc") && !cp.DD.IsTouchDevice() && (dsDiv.onmouseover = this.ItemOnMouseOver, dsDiv.onmouseout = this.ItemOnMouseOut);
            this.DTLMSList.pop();
            this.m_attemptedAnswerString.pop();
            this.undoAvailable = !1
        }
    };
    cp.DD.Interaction.prototype.OnResetButtonClicked = function() {
        if (!0 === this.resetAvailable) {
            cp.DD.UpdateDivStructure(this.DragSourceInitialStateList);
            this.UpdateDragSourceCurrentStatePropertiesObjects(this.DragSourceInitialStateList, cp.DD.ReasonForUpdatingCurrentState.kReset);
            cp.DD.ClearDragSourcePropertiesList(this.DragSourcePreviousStateList);
            if (0 < this.m_dsList.length)
                for (var b = 0; b < this.m_dsList.length; ++b) {
                    var a = this.m_dsList[b].n;
                    dsDiv = document.getElementById(a);
                    a = cp.DD.GetBaseItemInState(a);
                    null !== a && (dsDiv = document.getElementById(a.framesetID));
                    cp.DD.IsTouchDevice() ? dsDiv.ontouchstart = this.ItemOnMouseDown : dsDiv.onmousedown = this.ItemOnMouseDown;
                    !0 === cp.DD.getAttribute(this.m_elId, "hc") && !cp.DD.IsTouchDevice() && (dsDiv.onmouseover = this.ItemOnMouseOver, dsDiv.onmouseout = this.ItemOnMouseOut);
                    if (a = this.DSLMSMap[this.m_dsList[b].n]) a.posleft =
                        null, a.postop = null, a.currentDTID = null, a.previousDTID = null, a.currentPositionId = a.objectID
                }
            for (b = 0; b < this.m_dtList.length; ++b)
                if (a = this.DTMap[this.m_dtList[b].n]) a.acceptedDragSources.length = 0, a.acceptedSourceObjects.length = 0;
            this.clearAnswerList();
            this.DTLMSList = [];
            this.undoAvailable = this.resetAvailable = !1
        }
    };
    cp.DD.Interaction.prototype.ResetEverythingOnFailure = function() {
        this.OnResetButtonClicked()
    };
    cp.DD.Interaction.prototype.ResetOnlyInCorrectOnFailure = function() {};
    cp.DD.Interaction.prototype.CheckIfCorrect =
        function(b) {
            var a = cp.DD.getAttribute(this.m_elId, "cal");
            if (void 0 === a || null === a || 0 >= a.length) {
                var a = this.convertAnswerListToString(!0),
                    c = cp.QuestionStatusEnum.INCORRECT,
                    c = "" === a ? cp.QuestionStatusEnum.CORRECT : cp.QuestionStatusEnum.INCORRECT;
                this.CalculateDropTargetCorrectIncorrectStates(c, a, {
                    a: "",
                    isSeq: !0
                }, b);
                return c
            }
            for (c = 0; c < a.length; ++c) {
                var e = a[c];
                if (this.checkCorrectAnswers(e.a, e.isSeq)) return this.CalculateDropTargetCorrectIncorrectStates(cp.QuestionStatusEnum.CORRECT, this.convertAnswerListToString(e.isSeq),
                    e, b), cp.QuestionStatusEnum.CORRECT
            }
            e = {
                a: "",
                isSeq: !0
            };
            0 < a.length && (e = a[0]);
            this.CalculateDropTargetCorrectIncorrectStates(cp.QuestionStatusEnum.INCORRECT, this.convertAnswerListToString(e.isSeq), e, b);
            return cp.QuestionStatusEnum.INCORRECT
        };
    cp.DD.Interaction.prototype.CalculateDropTargetCorrectIncorrectStates = function(b, a, c, e) {
        if (void 0 !== e && !(void 0 === c || void 0 === a))
            if (c.isSeq) {
                for (var d = [], c = a.split(/t:|-t:/g), f = !0, a = 0; a < c.length; a++) {
                    var g = c[a];
                    "" !== g && (f ? f = !1 : (d.push(g), f = !0))
                }
                c = "";
                if (cp.QuestionStatusEnum.CORRECT ===
                    b) {
                    c = cp.DD.ObjectStateNames.kCPDropCorrect;
                    for (a = 0; a < d.length; a++) e[d[a]] = c
                }
            } else if (cp.QuestionStatusEnum.CORRECT === b)
            for (a = 0; a < this.m_dtList.length; ++a) {
                if (d = this.DTMap[this.m_dtList[a].n]) {
                    var h = d.acceptedDragSources;
                    0 < h.length && (d = d.objectID, e[d] = cp.DD.ObjectStateNames.kCPDropCorrect)
                }
            } else {
                f = cp.DD.parseAnswerStringIntoMap(c.a, 0);
                g = cp.DD.parseAnswerStringIntoMap(a, 1);
                b = [];
                c = [];
                for (d in f) {
                    var h = f[d],
                        k = [];
                    void 0 !== g[d] && (k = g[d]);
                    if (h.length !== k.length) c.push(d);
                    else {
                        for (var l = !1, a = 0; a < h.length; a++) {
                            var m =
                                h[a].count,
                                o = k[a].count;
                            if (h[a].sourceType !== k[a].sourceType || m !== o) {
                                l = !0;
                                break
                            }
                        }
                        l ? c.push(d) : b.push(d)
                    }
                }
                f = {};
                for (a = 0; a < this.m_dtList.length; ++a)
                    if (d = this.GetDTObjFromDTID(this.m_dtList[a].n), g = d.t, void 0 === f[g] && (f[g] = {
                            withSources: [],
                            withoutSources: []
                        }), k = this.m_dtList[a].n, d = this.DTMap[this.m_dtList[a].n]) k = d.objectID, h = d.acceptedDragSources, 0 < h.length ? f[g].withSources.push(k) : f[g].withoutSources.push(k);
                for (a = 0; a < b.length; a++)
                    if (g = b[a], d = f[g].withSources)
                        for (h = 0; h < d.length; h++) e[d[h]] = cp.DD.ObjectStateNames.kCPDropCorrect;
                for (a = 0; a < c.length; a++)
                    if (g = c[a], (d = f[g].withSources) && 0 < d.length)
                        for (h = 0; h < d.length; h++) e[d[h]] = cp.DD.ObjectStateNames.kCPDropIncorrect;
                    else {
                        if (d = f[g].withSources)
                            for (h = 0; h < d.length; h++) e[d[h]] = cp.DD.ObjectStateNames.kCPDropIncorrect;
                        if (d = f[g].withoutSources)
                            for (h = 0; h < d.length; h++) e[d[h]] = cp.DD.ObjectStateNames.kCPDropIncorrect
                    }
                for (a = 0; a < this.m_dtList.length; ++a)
                    if (d = this.GetDTObjFromDTID(this.m_dtList[a].n), g = d.t, d = this.DTMap[this.m_dtList[a].n]) h = d.acceptedDragSources, 0 < h.length && (-1 === b.indexOf(g) &&
                        -1 === c.indexOf(g)) && (d = d.objectID, e[d] = cp.DD.ObjectStateNames.kCPDropIncorrect)
            }
    };
    cp.DD.Interaction.prototype.DoOnDropTargetAccepts = function(b, a) {
        this.ShowDropTargetAcceptCaption(b);
        var c = cp.DD.getCurrentStateName(b);
        this.PerformOnDropActions(b);
        var e = cp.DD.getCurrentStateName(b);
        c !== e && (a = e);
        this.SetRedrag();
        this.CheckAutoSubmit(b, a)
    };
    cp.DD.Interaction.prototype.SetRedrag = function() {
        if (!cp.DD.getAttribute(this.m_elId, "reds")) {
            dsFrameset = document.getElementById(this.m_DsFrameSetDataID);
            var b = cp.DD.GetBaseItemInState(this.m_DsFrameSetDataID);
            null !== b && (dsFrameset = document.getElementById(b.framesetID));
            cp.DD.IsTouchDevice() ? dsFrameset.ontouchstart = null : (dsFrameset.onmousedown = null, dsFrameset.onmouseover = null, dsFrameset.onmouseout = null)
        }
    };
    cp.DD.Interaction.prototype.DoOnDropTargetRejects = function(b, a) {
        this.ShowDropTargetRejectCaption(b);
        var c = 1E3 + 10 * B;
        cp.DD.hasStateWithName(b, cp.DD.ObjectStateNames.kCPDropReject) ? (this.m_DropTargetStatePriorToDropAcceptOrRejectState = {
            dropTarget: b,
            prevState: a
        }, cp.DD.changeStateForSomeTime(b, cp.DD.ObjectStateNames.kCPDropReject,
            this, c, !1, a)) : cp.changeState(b, a)
    };
    cp.DD.Interaction.prototype.ShowDropTargetAcceptCaption = function(b) {
        b = this.GetDTObjFromDTID(b);
        if (null !== b) {
            var b = b.osc,
                a = !0;
            void 0 === b && (a = !1);
            void 0 !== b && 2 > b.length && (a = !1);
            var c = null;
            a && (c = new cp.Feedback(b, null, !1, cp.FeedbackType.SUCCESS, null), c.show());
            return !0
        }
    };
    cp.DD.Interaction.prototype.ShowDropTargetRejectCaption = function(b) {
        b = this.GetDTObjFromDTID(b);
        if (null !== b) {
            var b = b.ofc,
                a = !0;
            void 0 === b && (a = !1);
            void 0 !== b && 2 > b.length && (a = !1);
            var c = null;
            a && (c = new cp.Feedback(b,
                null, !1, cp.FeedbackType.FAILURE, null), c.show());
            return !0
        }
    };
    cp.DD.Interaction.prototype.ShowInteractionFailureCaption = function() {
        cp.DD.getAttribute(this.m_elId, "ofct");
        var b = cp.DD.getAttribute(this.m_elId, "ofc"),
            a = !0;
        void 0 === b && (a = !1);
        void 0 !== b && 2 > b.length && (a = !1);
        var c = null;
        a && (c = new cp.Feedback(b, null, !1, cp.FeedbackType.FAILURE, null), c.show());
        return !0
    };
    cp.DD.Interaction.prototype.ShowInteractionSuccessCaption = function() {
        cp.DD.getAttribute(this.m_elId, "osct");
        var b = cp.DD.getAttribute(this.m_elId,
                "osc"),
            a = !0;
        void 0 === b && (a = !1);
        void 0 !== b && 2 > b.length && (a = !1);
        var c = null;
        a && (c = new cp.Feedback(b, null, !1, cp.FeedbackType.SUCCESS, null), c.show());
        return !0
    };
    cp.DD.Interaction.prototype.SetDsFramesetAndCanvasDivPos = function(b, a, c) {
        var e = document.getElementById(b),
            d = document.getElementById(cp.D[b].mdi).parentElement,
            f = parseFloat(e.style.left),
            g = parseFloat(e.style.top);
        e.style.left = a + "px";
        e.style.top = c + "px";
        d.style.left = parseFloat(e.style.left) - (f - parseFloat(d.style.left)) + "px";
        d.style.top = parseFloat(e.style.top) -
            (g - parseFloat(d.style.top)) + "px";
        a = new cp.DD.CustomDivStruct;
        a.posleft = d.style.left;
        a.postop = d.style.top;
        if (d = this.DragSourceCurrentStateList[this.DSMap[b]].divStruct) a.Width = d.Width, a.Height = d.Height;
        cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[b]], null, e.style.left, e.style.top, null, null, null, a, null, null, null, null);
        cp.DD.UpdateSizeNPosOfAllStateItems(b, cp.DD.populateBoundsForStateItems(this.DragSourceCurrentStateList[this.DSMap[b]], 0))
    };
    cp.DD.Interaction.prototype.appendDivAsChildOfAnotherDiv =
        function(b, a) {
            this.SetSnapSize(b, a);
            this.SetSnapPosition(b, a);
            var c = this.DragSourceCurrentStateList[this.DSMap[this.m_DsFrameSetDataID]].DropTargetId;
            if (c) {
                var e = this.GetDTObjFromDTID(c).sbp;
                (e == cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingTop || e == cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingBottom || e == cp.DD.SnapBehaviourPos.kCPSBPTileBottomTopStartingLeft || e == cp.DD.SnapBehaviourPos.kCPSBPTileTopBottomStartingLeft) && this.SetSnapPosition(c, null)
            }
            if (c = this.GetDTObjFromDTID(b)) e = document.getElementById(cp.D[a].mdi),
                e.style.opacity = c.sbo / 100, cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[a]], null, null, null, null, null, e.style.opacity, null, null, null, b, null), cp.DD.updateOpacityOfAllStateItems(a, e.style.opacity);
            this.SetSnapDepth(b, a);
            this.PlaySnapBehaviourAudio(b)
        };
    cp.DD.Interaction.prototype.PlaySnapBehaviourAudio = function(b) {
        var a = this.GetDTObjFromDTID(b);
        a && a.sba && (b = this.m_DTtoSnapBehaviourAudioMap[b]) && cp.playAudio(b, !1)
    };
    cp.DD.Interaction.prototype.SetSnapDepth = function(b,
        a) {
        var c = this.GetDTObjFromDTID(b);
        if (c) {
            for (var e = c.sbd, d = null, f = null, c = null, c = this.DTMap[b].acceptedDragSources.length ? document.getElementById(this.DTMap[b].acceptedDragSources[this.DTMap[b].acceptedDragSources.length - 1]) : document.getElementById(b), g = document.getElementById(cp.D[c.id].mdi).parentElement, h = document.getElementById(a), k = document.getElementById(cp.D[a].mdi).parentElement, l = document.getElementById("div_Slide").getElementsByClassName("cp-frameset"), m = 1; m < l.length; ++m) {
                var o = l[m].id;
                o ===
                    b && (d = m);
                o === a && (f = m);
                if (null !== d && null !== f) break
            }
            l = {
                fset: c.style.zIndex,
                div: g.style.zIndex
            };
            0 === e ? (e = c, o = cp.DD.GetAllItemsInAllStates(c.id), 0 < o.length && (e = document.getElementById(o[o.length - 1])), cp.DD.InsertBeforeConsideringStates(h.id, e.nextSibling.id), cp.DD.GetZIndexValue(c.id, l, 0)) : 1 === e && (cp.DD.InsertBeforeConsideringStates(h.id, c.id), cp.DD.GetZIndexValue(c.id, l, 1));
            h.style.zIndex = parseInt(l.fset, 10);
            k.style.zIndex = parseInt(l.div, 10);
            cp.DD.updateZIndicesOfAllStateItems(h.id);
            cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[a]],
                null, null, null, null, null, null, null, null, h.style.zIndex, null, null);
            l = document.getElementById("div_Slide").getElementsByClassName("cp-frameset");
            for (c = 1; c < l.length; ++c) o = l[c].id, h = cp.DD.getBaseStateItem(o), void 0 !== this.DSMap[h] && null !== this.DSMap[h] && cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[h]], c - 1, null, null, null, null, null, null, null, null, null, null)
        }
    };
    cp.DD.Interaction.prototype.SetSnapSize = function(b, a) {
        var c = this.GetDTObjFromDTID(b);
        if (c && this.m_dragSourceCanvas) {
            var e =
                this.m_dragSourceCanvas.parentElement,
                c = c.sbs,
                d = this.DragSourceInitialStateList[this.DSMap[a]],
                f = d.Width,
                g = d.Height;
            e.style.width = parseFloat(d.divStruct.Width) * c / 100 + "px";
            e.style.height = parseFloat(d.divStruct.Height) * c / 100 + "px";
            var h = parseFloat(d.canvasStruct.Width) * c / 100,
                k = parseFloat(d.canvasStruct.Height) * c / 100;
            this.m_dragSourceCanvas.style.width = h + "px";
            this.m_dragSourceCanvas.style.height = k + "px";
            this.m_dragSourceCanvas.style.marginLeft = parseFloat(d.canvasStruct.MarginLeft) * c / 100 + "px";
            this.m_dragSourceCanvas.style.marginTop =
                parseFloat(d.canvasStruct.MarginTop) * c / 100 + "px";
            var e = new cp.DD.CustomDivStruct,
                l = new cp.DD.CustomCanvasStruct,
                m = this.DragSourceCurrentStateList[this.DSMap[a]].divStruct;
            m ? (e.posleft = m.posleft, e.postop = m.postop) : (m = document.getElementById(a), e.posleft = m.style.left, e.postop = m.style.top);
            e.Width = h + "px";
            e.Height = k + "px";
            (m = this.DragSourceCurrentStateList[this.DSMap[a]].canvasStruct) ? (l.posleft = m.posleft, l.postop = m.postop) : (l.posleft = this.m_dragSourceCanvas.style.left, l.posleft = this.m_dragSourceCanvas.style.top);
            l.Width = h + "px";
            l.Height = k + "px";
            l.MarginTop = this.m_dragSourceCanvas.style.marginTop;
            l.MarginLeft = this.m_dragSourceCanvas.style.marginLeft;
            if (m = document.getElementById(a)) {
                h = parseFloat(f) * c / 100;
                k = parseFloat(g) * c / 100;
                m.style.width = h + "px";
                m.style.height = k + "px";
                if (cp.responsive && (f = cp(a + "_vTxtHolder")))
                    if (g = parseFloat(d.canvasStruct.textWidth), d = parseFloat(d.canvasStruct.textHeight), f.style.left = parseFloat(f.style.left) * (c / 100) + "px", f.style.top = parseFloat(f.style.top) * (c / 100) + "px", f.style.width = g * c / 100 +
                        "px", f.style.height = d * c / 100 + "px", l && (l.textPosLeft = f.style.left, l.textPosTop = f.style.top, l.textWidth = f.style.width, l.textHeight = f.style.height), f.firstChild) f.firstChild.style.left = parseFloat(f.firstChild.style.left) * (c / 100) + "px", f.firstChild.style.top = parseFloat(f.firstChild.style.top) * (c / 100) + "px", l.textChildPosLeft = f.firstChild.style.left, l.textChildPosTop = f.firstChild.style.top, f.firstChild.style["-ms-transform-origin"] = "left top", f.firstChild.style["-moz-transform-origin"] = "left top", f.firstChild.style["-webkit-transform-origin"] =
                        "left top", f.firstChild.style["-o-transform-origin"] = "left top", f.firstChild.style["transform-origin"] = "left top", cp.applyTransform(f.firstChild, "scale(" + c / 100 + ")");
                cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[a]], null, null, null, m.style.width, m.style.height, null, null, null, null, b, null)
            }
            cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[a]], null, null, null, null, null, null, e, l, null, b, null);
            cp.DD.UpdateSizeNPosOfAllStateItems(a,
                cp.DD.populateBoundsForStateItems(this.DragSourceCurrentStateList[this.DSMap[a]], 1));
            cp.DD.UpdateTextBoundsOfAllStateItems(a, cp.DD.populateTextBoundsForStateItems(this.DragSourceCurrentStateList[this.DSMap[a]], {
                bUpdateTextChildSize: !1,
                bUpdateScale: !0,
                scale: c / 100
            }))
        }
    };
    cp.DD.Interaction.prototype.SetSnapPosition = function(b, a) {
        var c = document.getElementById(b),
            e = this.GetDTObjFromDTID(b);
        if (c && e) {
            var d = parseFloat(c.style.left),
                f = parseFloat(c.style.top),
                g = parseFloat(c.style.width),
                c = parseFloat(c.style.height),
                h = null,
                k = 0,
                l = 0;
            a && (h = document.getElementById(a), k = parseFloat(h.style.width), l = parseFloat(h.style.height));
            var h = this.DTMap[b],
                m, o = null,
                p = null,
                q = null,
                n = null,
                t, u, s, v, r, w;
            switch (e.sbp) {
                case cp.DD.SnapBehaviourPos.kCPSBPNone:
                    d = this.m_tempFrameSetPos.x;
                    f = this.m_tempFrameSetPos.y;
                    this.SetDsFramesetAndCanvasDivPos(a, d, f);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAbsolute:
                    d = this.m_tempFrameSetPos.x;
                    f = this.m_tempFrameSetPos.y;
                    this.SetDsFramesetAndCanvasDivPos(a, d, f);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorTopLeft:
                    this.SetDsFramesetAndCanvasDivPos(a,
                        d, f);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorTopCenter:
                    this.SetDsFramesetAndCanvasDivPos(a, d + g / 2 - k / 2, f);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorTopRight:
                    this.SetDsFramesetAndCanvasDivPos(a, d + g - k, f);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterLeft:
                    this.SetDsFramesetAndCanvasDivPos(a, d, f + c / 2 - l / 2);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterCenter:
                    this.SetDsFramesetAndCanvasDivPos(a, d + g / 2 - k / 2, f + c / 2 - l / 2);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterRight:
                    this.SetDsFramesetAndCanvasDivPos(a,
                        d + g - k, f + c / 2 - l / 2);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomLeft:
                    this.SetDsFramesetAndCanvasDivPos(a, d, f + c - l);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomCenter:
                    this.SetDsFramesetAndCanvasDivPos(a, d + g / 2 - k / 2, f + c - l);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomRight:
                    this.SetDsFramesetAndCanvasDivPos(a, d + g - k, f + c - l);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPStackHorizonatally:
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPStackVertically:
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingTop:
                    for (e =
                        0; e <= h.acceptedDragSources.length; ++e)
                        if (o = e !== h.acceptedDragSources.length ? h.acceptedDragSources[e] : a) {
                            p = document.getElementById(o);
                            0 !== e && (q = h.acceptedDragSources[e - 1]);
                            q && (n = document.getElementById(q));
                            m = parseFloat(p.style.width);
                            t = parseFloat(p.style.height);
                            s = v = l = k = 0;
                            if (w = cp.DD.GetDimensionsAfterRotation(0, 0, m, t, cp.DD.getRotationAngle(p))) k = -w.minX, l = -w.minY, m = w.maxX - w.minX;
                            v = s = p = u = 0;
                            n && (u = parseFloat(n.style.left), p = parseFloat(n.style.top), s = parseFloat(n.style.width), v = parseFloat(n.style.height),
                                r = cp.DD.GetDimensionsAfterRotation(0, 0, s, v, cp.DD.getRotationAngle(n)), w && (v = -r.minX, s = -r.minY, u -= v, p -= s, s = r.maxX - r.minX, v = r.maxY - r.minY));
                            r = null !== n ? u + s : d;
                            w = null !== n ? p : f;
                            if (null !== n && r + m > d + g) {
                                u = v;
                                for (m = e - 1; 0 <= m; --m)
                                    if (s = document.getElementById(h.acceptedDragSources[m]), c = parseFloat(s.style.top), p === c) s = parseFloat(s.style.height), u = s > u ? s : u;
                                    else break;
                                r = d;
                                w = null !== n ? p + u : f
                            }
                            r += k;
                            w += l;
                            this.SetDsFramesetAndCanvasDivPos(o, r, w)
                        }
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingBottom:
                    for (e = 0; e <=
                        h.acceptedDragSources.length; ++e)
                        if (n = q = null, o = e !== h.acceptedDragSources.length ? h.acceptedDragSources[e] : a) {
                            p = document.getElementById(o);
                            0 !== e && (q = h.acceptedDragSources[e - 1]);
                            q && (n = document.getElementById(q));
                            m = parseFloat(p.style.width);
                            t = parseFloat(p.style.height);
                            l = k = 0;
                            if (w = cp.DD.GetDimensionsAfterRotation(0, 0, m, t, cp.DD.getRotationAngle(p))) k = -w.minX, l = -w.minY, m = w.maxX - w.minX, t = w.maxY - w.minY;
                            v = s = p = u = 0;
                            n && (u = parseFloat(n.style.left), p = parseFloat(n.style.top), s = parseFloat(n.style.width), v = parseFloat(n.style.height),
                                r = cp.DD.GetDimensionsAfterRotation(0, 0, s, v, cp.DD.getRotationAngle(n)), w && (v = -r.minX, s = -r.minY, u -= v, p -= s, s = r.maxX - r.minX, v = r.maxY - r.minY));
                            r = null !== n ? u + s : d;
                            w = null !== n ? p + v - t : f + c - t;
                            if (null !== n && r + m > d + g) {
                                u = v;
                                for (m = e - 1; 0 <= m; --m)
                                    if (s = document.getElementById(h.acceptedDragSources[m]), q = parseFloat(s.style.top) + parseFloat(s.style.height), p + v === q) s = parseFloat(s.style.height), u = s > u ? s : u;
                                    else break;
                                r = d;
                                w = null !== n ? p + v - u - t : c - t
                            }
                            r += k;
                            w += l;
                            this.SetDsFramesetAndCanvasDivPos(o, r, w)
                        }
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPTileBottomTopStartingLeft:
                    for (e =
                        0; e <= h.acceptedDragSources.length; ++e)
                        if (n = q = null, o = e !== h.acceptedDragSources.length ? h.acceptedDragSources[e] : a) {
                            p = document.getElementById(o);
                            0 !== e && (q = h.acceptedDragSources[e - 1]);
                            q && (n = document.getElementById(q));
                            m = parseFloat(p.style.width);
                            t = parseFloat(p.style.height);
                            l = k = 0;
                            if (w = cp.DD.GetDimensionsAfterRotation(0, 0, m, t, cp.DD.getRotationAngle(p))) k = -w.minX, l = -w.minY, t = w.maxY - w.minY;
                            s = p = u = 0;
                            n && (u = parseFloat(n.style.left), p = parseFloat(n.style.top), s = parseFloat(n.style.width), v = parseFloat(n.style.height),
                                r = cp.DD.GetDimensionsAfterRotation(0, 0, s, v, cp.DD.getRotationAngle(n)), w && (v = -r.minX, s = -r.minY, u -= v, p -= s, s = r.maxX - r.minX));
                            r = null !== n ? u : d;
                            w = null !== n ? p - t : f + c - t;
                            if (null !== n && w < f) {
                                g = s;
                                for (m = e - 1; 0 <= m; --m)
                                    if (s = document.getElementById(h.acceptedDragSources[m]), q = parseFloat(s.style.left), u === q) q = parseFloat(s.style.width), g = q > g ? q : g;
                                    else break;
                                r = null !== n ? u + g : d;
                                w = f + c - t
                            }
                            r += k;
                            w += l;
                            this.SetDsFramesetAndCanvasDivPos(o, r, w)
                        }
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPTileTopBottomStartingLeft:
                    for (e = 0; e <= h.acceptedDragSources.length; ++e)
                        if (n =
                            q = null, o = e !== h.acceptedDragSources.length ? h.acceptedDragSources[e] : a) {
                            p = document.getElementById(o);
                            0 !== e && (q = h.acceptedDragSources[e - 1]);
                            q && (n = document.getElementById(q));
                            m = parseFloat(p.style.width);
                            t = parseFloat(p.style.height);
                            l = k = 0;
                            if (w = cp.DD.GetDimensionsAfterRotation(0, 0, m, t, cp.DD.getRotationAngle(p))) k = -w.minX, l = -w.minY, t = w.maxY - w.minY;
                            v = s = p = u = 0;
                            n && (u = parseFloat(n.style.left), p = parseFloat(n.style.top), s = parseFloat(n.style.width), v = parseFloat(n.style.height), r = cp.DD.GetDimensionsAfterRotation(0,
                                0, s, v, cp.DD.getRotationAngle(n)), w && (v = -r.minX, s = -r.minY, u -= v, p -= s, s = r.maxX - r.minX, v = r.maxY - r.minY));
                            r = null !== n ? u : d;
                            w = null !== n ? p + v : f;
                            if (null !== n && w + t > f + c) {
                                g = s;
                                for (m = e - 1; 0 <= m; --m)
                                    if (s = document.getElementById(h.acceptedDragSources[m]), q = parseFloat(s.style.left), u === q) q = parseFloat(s.style.width), g = q > g ? q : g;
                                    else break;
                                r = null !== n ? u + g : d;
                                w = f
                            }
                            r += k;
                            w += l;
                            this.SetDsFramesetAndCanvasDivPos(o, r, w)
                        }
                    break;
                default:
                    retVal.x = dtDivX, retVal.y = dtDivY
            }
        }
    };
    cp.DD.Interaction.prototype.ReturnDragSourceAnimationCallback = function(b) {
        var a =
            cp.DD.CurrInteractionManager.m_ActiveInteraction;
        if (null !== a) {
            if (a.m_dragSourceCanvas && a.m_dummyCanvas) {
                cp.show(a.m_DsStateFsIDAtMouseDown, {
                    forceHideTextScalingIcon: !0
                });
                a.deleteDummyCanvas();
                a.m_dragSourceCanvas = null;
                a.m_dummyCanvas = null;
                a.m_dummyCanvasObjectState = void 0;
                var c = !1;
                if (void 0 !== b)
                    for (var e in b) {
                        var d = b[e];
                        if (void 0 !== d) {
                            var f = d.toState,
                                g = d.type,
                                h = void 0;
                            d.finalState && (h = d.finalState);
                            1 === g ? cp.DD.hasStateWithName(e, f) && (d.hasOwnProperty("disableDrag") && !0 === d.disableDrag ? cp.DD.changeStateForSomeTime(e,
                                f, a, 1E3, !0, h) : cp.DD.changeStateForSomeTime(e, f, a, 1E3, !1, h), c = !0) : cp.DD.changeState(e, f, a)
                        }
                    }
            }
            b && b.dropTargetAccept && (e = function() {
                var c = b.dropTargetAccept;
                a.DoOnDropTargetAccepts(c.target, c.prevState)
            }, c ? setTimeout(e, 1E3) : e())
        }
    };
    cp.DD.Interaction.prototype.AnimateObjectGliding = function(b, a, c, e, d, f) {
        function g() {
            0 === e ? d && (f ? d.call(this, f) : d.call()) : (0 !== h && (b.style.left = parseFloat(b.style.left) + h + "px"), 0 !== k && (b.style.top = parseFloat(b.style.top) + k + "px"), 0 !== l && (b.style.width = parseFloat(b.style.width) +
                l + "px"), 0 !== m && (b.style.height = parseFloat(b.style.height) + m + "px"), 0 !== o && (b.style.opacity = "" === b.style.opacity ? 1 + o : parseFloat(b.style.opacity) + o), e -= 1, setTimeout(g, B))
        }
        if (null !== cp.DD.CurrInteractionManager.m_ActiveInteraction) {
            var h = 0,
                k = 0,
                l = 0,
                m = 0,
                o = 0;
            null !== a.x && (void 0 !== a.x && void 0 !== c.x && null !== c.x) && (h = (c.x - a.x) / e);
            null !== a.y && (void 0 !== a.y && void 0 !== c.y && null !== c.y) && (k = (c.y - a.y) / e);
            null !== a.w && (void 0 !== a.w && void 0 !== c.w && null !== c.w) && (l = (c.w - a.w) / e);
            null !== a.h && (void 0 !== a.h && void 0 !== c.h &&
                null !== c.h) && (m = (c.h - a.h) / e);
            null !== a.opac && (void 0 !== a.opac && void 0 !== c.opac && null !== c.opac) && (o = (c.opac - a.opac) / e);
            setTimeout(g, B)
        }
    };
    cp.DD.Interaction.prototype.convertAnswerListToString = function(b) {
        var a = this.m_attemptedAnswerString,
            c = "",
            e = 0,
            d;
        if (b)
            for (; e < a.length;) c += a[e], ++e;
        else {
            b = [];
            a = d = null;
            for (e = 0; e < this.m_dtList.length; ++e) {
                var f = this.GetDTObjFromDTID(this.m_dtList[e].n);
                d = a;
                a = f.t;
                if (!(null === d || d === a)) {
                    b.sort();
                    for (d = 0; d < b.length; ++d) c = c + "t:" + b[d] + "-t:" + this.m_dtList[e - 1].t;
                    b = []
                }
                if (d = this.DTMap[this.m_dtList[e].n]) {
                    f =
                        d.acceptedDragSources;
                    for (d = 0; d < f.length; ++d) {
                        var g = this.GetDSObjFromDSID(f[d]);
                        b.push(g.t)
                    }
                }
            }
            b.sort();
            for (d = 0; d < b.length; ++d) c = c + "t:" + b[d] + "-t:" + this.m_dtList[this.m_dtList.length - 1].t
        }
        return c
    };
    cp.DD.Interaction.prototype.updateCorrectIncorrectStatesOnTarget = function(b) {
        if (void 0 !== b)
            for (var a in b) cp.changeState(a, b[a])
    };
    cp.DD.Interaction.prototype.getSuspendData = function() {
        return this.m_StoredSuspendDataString
    };
    cp.DD.Interaction.prototype.storeSuspendData = function(b) {
        var a = new cp.QuizState;
        a.init();
        a.writeNumber(this.DTLMSList.length);
        var c, e, d, f, g, h = {};
        for (c = 0; c < this.DTLMSList.length; ++c) {
            d = this.DTLMSList[c];
            a.writeString(d.objectID);
            a.writeNumber(d.acceptedSourceObjects.length);
            f = !1;
            this.GetDTObjFromDTID(d.objectID).sbp === cp.DD.SnapBehaviourPos.kCPSBPAbsolute && (f = !0);
            for (e = 0; e < d.acceptedSourceObjects.length; ++e)
                if (g = d.acceptedSourceObjects[e], a.writeString(g.objectID), h[g.objectID] = 1, f)
                    if (cp.responsive) {
                        var k = cp(d.objectID).getBoundingClientRect(),
                            l = cp(g.objectID).getBoundingClientRect();
                        g = 1E4 * (((l.left + l.right) / 2 - (k.left + k.right) / 2) / k.width);
                        k = 1E4 * (((l.top + l.bottom) / 2 - (k.top + k.bottom) / 2) / k.height);
                        a.writeBoolean(0 > g);
                        a.writeNumber(Math.abs(parseFloat(g)));
                        a.writeBoolean(0 > k);
                        a.writeNumber(Math.abs(parseFloat(k)))
                    } else a.writeNumber(parseFloat(g.posleft)), a.writeNumber(parseFloat(g.postop))
        }
        for (c = e = 0; c < this.m_dsList.length; ++c)
            if (1 !== h[this.m_dsList[c].n] && (g = this.DSLMSMap[this.m_dsList[c].n]))
                if (d = cp.D[this.m_dsList[c].n], f = cp.D[d.mdi], d = f.b[0], f = f.b[1], null !== g.postop && null !== g.posleft)
                    if (cp.responsive) g.currentPositionId !==
                        this.m_dsList[c].n && (e += 1);
                    else if (parseFloat(g.postop) !== f || parseFloat(g.posleft) !== d) e += 1;
        a.writeNumber(e);
        for (c = 0; c < this.m_dsList.length; ++c)
            if (1 !== h[this.m_dsList[c].n] && (g = this.DSLMSMap[this.m_dsList[c].n]))
                if (d = cp.D[this.m_dsList[c].n], f = cp.D[d.mdi], d = f.b[0], f = f.b[1], null !== g.postop && null !== g.posleft)
                    if (cp.responsive) g.currentPositionId !== this.m_dsList[c].n && (a.writeString(g.objectID), a.writeNumber(parseFloat(g.posleft)), a.writeNumber(parseFloat(g.postop)));
                    else if (parseFloat(g.postop) !== f ||
            parseFloat(g.posleft) !== d) a.writeString(g.objectID), a.writeNumber(parseFloat(g.posleft)), a.writeNumber(parseFloat(g.postop));
        b ? this.m_StoredViewDataString = a.m_state : this.m_StoredSuspendDataString = a.m_state
    };
    cp.DD.Interaction.prototype.resumeInteraction = function(b) {
        this.resetAvailable = !0;
        this.m_questionObj && (this.m_CurrentAttempt = this.m_questionObj.currentAttempt);
        for (var a = 0; a < this.m_dtList.length; ++a) {
            var c = this.DTMap[this.m_dtList[a].n];
            c && (c.acceptedDragSources = [], c.acceptedSourceObjects = [])
        }
        b ||
            this.clearAnswerList();
        var e = {},
            d = b ? this.m_StoredViewDataString : this.m_StoredSuspendDataString;
        if (0 < d.length) {
            a = new cp.QuizState;
            a.init();
            var f, g;
            a.fromString(d);
            var h = a.readNumber();
            b || (this.DTLMSList = []);
            for (b = 0; b < h; ++b) {
                var k = a.readString();
                void 0 === e[k] && (e[k] = 0);
                var l = this.GetDTObjFromDTID(k),
                    m = l.sbp === cp.DD.SnapBehaviourPos.kCPSBPAbsolute,
                    o = a.readNumber();
                for (f = 0; f < o; ++f) {
                    d = a.readString();
                    g = c = null;
                    if (m)
                        if (cp.responsive) {
                            var p = cp(d).getBoundingClientRect(),
                                q = cp(k).getBoundingClientRect();
                            g = a.readBoolean();
                            var c = a.readNumber() / 100,
                                c = g ? -c : c,
                                n = a.readBoolean();
                            g = a.readNumber() / 100;
                            g = n ? -g : g;
                            n = (q.top + q.bottom) / 2;
                            c = (q.left + q.right) / 2 + c * q.width / 100 - p.width * l.sbs / 200;
                            g = n + g * q.height / 100 - p.height * l.sbs / 200
                        } else c = a.readNumber(), g = a.readNumber();
                    f == e[k] && (this.resumeAppendDragSourceToDropTarget(k, d, m, c, g), c = this.GetDTObjFromDTID(k), g = this.GetDSObjFromDSID(d), this.appendToAnswerList(g.t, c.t), this.DragSourceCurrentStateList[this.DSMap[d]].DropTargetId = k, e[k] += 1)
                }
            }
            h = a.readNumber();
            for (b = 0; b < h; ++b) d = a.readString(),
                e = this.DSLMSMap[d], c = a.readNumber(), g = a.readNumber(), e.posleft = c, e.postop = g, this.resumeChangePositionsOfDragSources(d, c, g);
            this.resumeCorrectIncorrectStates()
        }
    };
    cp.DD.Interaction.prototype.resumeAppendDragSourceToDropTarget = function(b, a, c, e, d) {
        if (!cp.DD.getAttribute(this.m_elId, "reds")) {
            var f = document.getElementById(a),
                g = cp.DD.GetBaseItemInState(a);
            null !== g && (f = document.getElementById(g.framesetID));
            cp.DD.IsTouchDevice() ? (f.ontouchstart = null, f.ontouchmove = null, f.ontouchend = null) : (f.onmousedown = null,
                f.onmouseover = null, f.onmouseout = null)
        }
        this.resumeSetSnapSize(a, b);
        this.resumeSetSnapPosition(a, b, c, e, d);
        this.resumeSetSnapOpacity(b, a);
        this.SetSnapDepth(b, a);
        c = document.getElementById(a);
        e = this.DTMap[b];
        e.acceptedDragSources.push(a);
        e.acceptedSourceObjects.push(this.DSLMSMap[a]);
        this.DSLMSMap[a].posleft = c.style.left;
        this.DSLMSMap[a].postop = c.style.top;
        this.DSLMSMap[a].previousDTID = null;
        this.DSLMSMap[a].currentDTID = b;
        this.DSLMSMap[a].currentPositionId = b;
        this.DTLMSList.push(this.DTMap[b]);
        b = document.getElementById("re-" +
            a + "c");
        b.style.display = "none";
        b.offsetHeight = void 0;
        b.style.display = "block"
    };
    cp.DD.Interaction.prototype.resumeSetSnapSize = function(b, a, c) {
        var e = this.GetDTObjFromDTID(a);
        if (e) {
            var d = document.getElementById("re-" + b + "c"),
                f = document.getElementById(b + "c"),
                e = e.sbs;
            cp.DD.spv(d, b, 1);
            cp.DD.spv(f, b, 2);
            var g = d.style.width,
                h = d.style.height,
                k = f.style.width,
                l = f.style.height,
                m = f.style.marginLeft,
                o = f.style.marginTop,
                p, q, n = cp(b + "_vTxtHolder");
            cp.responsive && n && (p = n.style.width, q = n.style.height);
            var t = 0,
                u = 0;
            c && (q =
                this.DragSourceInitialStateList[this.DSMap[b]], g = q.divStruct.Width, h = q.divStruct.Height, k = q.canvasStruct.Width, l = q.canvasStruct.Height, m = q.canvasStruct.MarginLeft, o = q.canvasStruct.MarginTop, t = q.Width, u = q.Height, p = q.canvasStruct.textWidth, q = q.canvasStruct.textHeight);
            d.style.width = parseFloat(g) * e / 100 + "px";
            d.style.height = parseFloat(h) * e / 100 + "px";
            g = parseFloat(k) * e / 100;
            l = parseFloat(l) * e / 100;
            f.style.width = g + "px";
            f.style.height = l + "px";
            f.style.marginLeft = parseFloat(m) * e / 100 + "px";
            f.style.marginTop = parseFloat(o) *
                e / 100 + "px";
            if (m = this.DragSourceCurrentStateList[this.DSMap[b]].divStruct) m.Width = d.style.width, m.Height = d.style.height;
            if (d = this.DragSourceCurrentStateList[this.DSMap[b]].canvasStruct) d.Width = g + "px", d.Height = l + "px", d.MarginTop = f.style.marginTop, d.MarginLeft = f.style.marginLeft;
            if (f = document.getElementById(b)) {
                c || (t = f.style.width, u = f.style.height);
                g = parseFloat(t) * e / 100;
                l = parseFloat(u) * e / 100;
                f.style.width = g + "px";
                f.style.height = l + "px";
                if (cp.responsive && n && (c = parseFloat(p), p = parseFloat(q), n.style.left =
                        parseFloat(n.style.left) * (e / 100) + "px", n.style.top = parseFloat(n.style.top) * (e / 100) + "px", n.style.width = c * e / 100 + "px", n.style.height = p * e / 100 + "px", d && (d.textPosLeft = n.style.left, d.textPosTop = n.style.top, d.textWidth = n.style.width, d.textHeight = n.style.height), n.firstChild)) n.firstChild.style.left = parseFloat(n.firstChild.style.left) * (e / 100) + "px", n.firstChild.style.top = parseFloat(n.firstChild.style.top) * (e / 100) + "px", d.textChildPosLeft = n.firstChild.style.left, d.textChildPosTop = n.firstChild.style.top, n.firstChild.style["-ms-transform-origin"] =
                    "left top", n.firstChild.style["-moz-transform-origin"] = "left top", n.firstChild.style["-webkit-transform-origin"] = "left top", n.firstChild.style["-o-transform-origin"] = "left top", n.firstChild.style["transform-origin"] = "left top", cp.applyTransform(n.firstChild, "scale(" + e / 100 + ")");
                cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[b]], null, null, null, g + "px", l + "px", null, null, null, null, a, null)
            }
            cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[b]],
                null, null, null, null, null, null, m, d, null, a, null)
        }
    };
    cp.DD.Interaction.prototype.resumeSetSnapPosition = function(b, a, c, e, d) {
        var f = document.getElementById(a),
            g = document.getElementById(b),
            h = this.GetDTObjFromDTID(a);
        if (f && h && g) {
            cp.DD.spv(f, a, 0);
            cp.DD.spv(g, b, 0);
            var k = parseFloat(f.style.left),
                l = parseFloat(f.style.top),
                m = parseFloat(f.style.width),
                f = parseFloat(f.style.height),
                o = parseFloat(g.style.width),
                p = parseFloat(g.style.height),
                q = parseFloat(g.style.left),
                n = parseFloat(g.style.top),
                a = this.DTMap[a],
                t = g = null,
                u = null,
                s = null,
                v, r;
            switch (h.sbp) {
                case cp.DD.SnapBehaviourPos.kCPSBPNone:
                case cp.DD.SnapBehaviourPos.kCPSBPAbsolute:
                    c ? (k = e, l = d) : (k = q, l = n);
                    this.SetDsFramesetAndCanvasDivPos(b, k, l);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorTopLeft:
                    this.SetDsFramesetAndCanvasDivPos(b, k, l);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorTopCenter:
                    this.SetDsFramesetAndCanvasDivPos(b, k + m / 2 - o / 2, l);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorTopRight:
                    this.SetDsFramesetAndCanvasDivPos(b, k + m - o, l);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterLeft:
                    this.SetDsFramesetAndCanvasDivPos(b,
                        k, l + f / 2 - p / 2);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterCenter:
                    this.SetDsFramesetAndCanvasDivPos(b, k + m / 2 - o / 2, l + f / 2 - p / 2);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterRight:
                    this.SetDsFramesetAndCanvasDivPos(b, k + m - o, l + f / 2 - p / 2);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomLeft:
                    this.SetDsFramesetAndCanvasDivPos(b, k, l + f - p);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomCenter:
                    this.SetDsFramesetAndCanvasDivPos(b, k + m / 2 - o / 2, l + f - p);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomRight:
                    this.SetDsFramesetAndCanvasDivPos(b,
                        k + m - o, l + f - p);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingTop:
                    for (d = 0; d <= a.acceptedDragSources.length; ++d) {
                        g = d !== a.acceptedDragSources.length ? a.acceptedDragSources[d] : b;
                        t = document.getElementById(g);
                        0 !== d && (u = a.acceptedDragSources[d - 1]);
                        u && (s = document.getElementById(u));
                        q = parseFloat(t.style.width);
                        h = parseFloat(t.style.height);
                        n = p = e = c = 0;
                        if (r = cp.DD.GetDimensionsAfterRotation(0, 0, q, h, cp.DD.getRotationAngle(t))) c = -r.minX, e = -r.minY, q = r.maxX - r.minX;
                        p = n = t = o = 0;
                        s && (o = parseFloat(s.style.left),
                            t = parseFloat(s.style.top), n = parseFloat(s.style.width), p = parseFloat(s.style.height), v = cp.DD.GetDimensionsAfterRotation(0, 0, n, p, cp.DD.getRotationAngle(s)), r && (p = -v.minX, n = -v.minY, o -= p, t -= n, n = v.maxX - v.minX, p = v.maxY - v.minY));
                        v = null !== s ? o + n : k;
                        r = null !== s ? t : l;
                        if (null !== s && v + q > k + m) {
                            o = p;
                            for (q = d - 1; 0 <= q; --q)
                                if (n = document.getElementById(a.acceptedDragSources[q]), f = parseFloat(n.style.top), t === f) n = parseFloat(n.style.height), o = n > o ? n : o;
                                else break;
                            v = k;
                            r = null !== s ? t + o : l
                        }
                        v += c;
                        r += e;
                        this.SetDsFramesetAndCanvasDivPos(g,
                            v, r)
                    }
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingBottom:
                    for (d = 0; d <= a.acceptedDragSources.length; ++d) {
                        s = u = null;
                        g = d !== a.acceptedDragSources.length ? a.acceptedDragSources[d] : b;
                        t = document.getElementById(g);
                        0 !== d && (u = a.acceptedDragSources[d - 1]);
                        u && (s = document.getElementById(u));
                        q = parseFloat(t.style.width);
                        h = parseFloat(t.style.height);
                        e = c = 0;
                        if (r = cp.DD.GetDimensionsAfterRotation(0, 0, q, h, cp.DD.getRotationAngle(t))) c = -r.minX, e = -r.minY, q = r.maxX - r.minX, h = r.maxY - r.minY;
                        p = n = t = o = 0;
                        s && (o = parseFloat(s.style.left),
                            t = parseFloat(s.style.top), n = parseFloat(s.style.width), p = parseFloat(s.style.height), v = cp.DD.GetDimensionsAfterRotation(0, 0, n, p, cp.DD.getRotationAngle(s)), r && (p = -v.minX, n = -v.minY, o -= p, t -= n, n = v.maxX - v.minX, p = v.maxY - v.minY));
                        v = null !== s ? o + n : k;
                        r = null !== s ? t + p - h : l + f - h;
                        if (null !== s && v + q > k + m) {
                            o = p;
                            for (q = d - 1; 0 <= q; --q)
                                if (n = document.getElementById(a.acceptedDragSources[q]), u = parseFloat(n.style.top) + parseFloat(n.style.height), t + p === u) n = parseFloat(n.style.height), o = n > o ? n : o;
                                else break;
                            v = k;
                            r = null !== s ? t + p - o - h : f - h
                        }
                        v +=
                            c;
                        r += e;
                        this.SetDsFramesetAndCanvasDivPos(g, v, r)
                    }
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPTileBottomTopStartingLeft:
                    for (d = 0; d <= a.acceptedDragSources.length; ++d) {
                        s = u = null;
                        g = d !== a.acceptedDragSources.length ? a.acceptedDragSources[d] : b;
                        t = document.getElementById(g);
                        0 !== d && (u = a.acceptedDragSources[d - 1]);
                        u && (s = document.getElementById(u));
                        q = parseFloat(t.style.width);
                        h = parseFloat(t.style.height);
                        e = c = 0;
                        if (r = cp.DD.GetDimensionsAfterRotation(0, 0, q, h, cp.DD.getRotationAngle(t))) c = -r.minX, e = -r.minY, h = r.maxY - r.minY;
                        n = t = o = 0;
                        s && (o = parseFloat(s.style.left), t = parseFloat(s.style.top), n = parseFloat(s.style.width), p = parseFloat(s.style.height), v = cp.DD.GetDimensionsAfterRotation(0, 0, n, p, cp.DD.getRotationAngle(s)), r && (p = -v.minX, n = -v.minY, o -= p, t -= n, n = v.maxX - v.minX));
                        v = null !== s ? o : k;
                        r = null !== s ? t - h : l + f - h;
                        if (null !== s && r < l) {
                            m = n;
                            for (q = d - 1; 0 <= q; --q)
                                if (n = document.getElementById(a.acceptedDragSources[q]), u = parseFloat(n.style.left), o === u) u = parseFloat(n.style.width), m = u > m ? u : m;
                                else break;
                            v = null !== s ? o + m : k;
                            r = l + f - h
                        }
                        v += c;
                        r += e;
                        this.SetDsFramesetAndCanvasDivPos(g,
                            v, r)
                    }
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPTileTopBottomStartingLeft:
                    for (d = 0; d <= a.acceptedDragSources.length; ++d) {
                        s = u = null;
                        g = d !== a.acceptedDragSources.length ? a.acceptedDragSources[d] : b;
                        t = document.getElementById(g);
                        0 !== d && (u = a.acceptedDragSources[d - 1]);
                        u && (s = document.getElementById(u));
                        q = parseFloat(t.style.width);
                        h = parseFloat(t.style.height);
                        e = c = 0;
                        if (r = cp.DD.GetDimensionsAfterRotation(0, 0, q, h, cp.DD.getRotationAngle(t))) c = -r.minX, e = -r.minY, h = r.maxY - r.minY;
                        p = n = t = o = 0;
                        s && (o = parseFloat(s.style.left),
                            t = parseFloat(s.style.top), n = parseFloat(s.style.width), p = parseFloat(s.style.height), v = cp.DD.GetDimensionsAfterRotation(0, 0, n, p, cp.DD.getRotationAngle(s)), r && (p = -v.minX, n = -v.minY, o -= p, t -= n, n = v.maxX - v.minX, p = v.maxY - v.minY));
                        v = null !== s ? o : k;
                        r = null !== s ? t + p : l;
                        if (null !== s && r + h > l + f) {
                            m = n;
                            for (q = d - 1; 0 <= q; --q)
                                if (n = document.getElementById(a.acceptedDragSources[q]), u = parseFloat(n.style.left), o === u) u = parseFloat(n.style.width), m = u > m ? u : m;
                                else break;
                            v = null !== s ? o + m : k;
                            r = l
                        }
                        v += c;
                        r += e;
                        this.SetDsFramesetAndCanvasDivPos(g,
                            v, r)
                    }
            }
        }
    };
    cp.DD.Interaction.prototype.resumeSetSnapOpacity = function(b, a) {
        var c = this.GetDTObjFromDTID(b);
        if (c) {
            var e = document.getElementById(cp.D[a].mdi);
            e.style.opacity = c.sbo / 100;
            cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[a]], null, null, null, null, null, e.style.opacity, null, null, null, null, null)
        }
    };
    cp.DD.Interaction.prototype.resumeSetSnapDepth = function() {};
    cp.DD.Interaction.prototype.resumeCorrectIncorrectStates = function() {
        var b = {},
            a = this.CheckIfCorrect(b);
        a ==
            cp.QuestionStatusEnum.CORRECT || a == cp.QuestionStatusEnum.PARTIAL_CORRECT ? this.updateCorrectIncorrectStatesOnTarget(b) : (a = cp.DD.getAttribute(this.m_elId, "cal"), void 0 === a || (null === a || 0 >= a.length) || 0 < this.m_maxAttempts && this.m_CurrentAttempt === this.m_maxAttempts && this.updateCorrectIncorrectStatesOnTarget(b))
    };
    cp.DD.Interaction.prototype.updatePreviousStateSnapSize = function(b, a, c) {
        if (cp.responsive) {
            var e = this.GetDTObjFromDTID(c);
            if (e) {
                document.getElementById("re-" + a + "c");
                document.getElementById(a + "c");
                var e = e.sbs,
                    d = cp(a + "_vTxtHolder"),
                    f = 0,
                    g = 0,
                    h = this.DragSourceInitialStateList[this.DSMap[a]],
                    k = h.divStruct.Width,
                    l = h.divStruct.Height,
                    m = h.canvasStruct.Width,
                    o = h.canvasStruct.Height,
                    p = h.canvasStruct.MarginLeft,
                    q = h.canvasStruct.MarginTop,
                    f = h.Width,
                    g = h.Height,
                    n = h.canvasStruct.textPosLeft,
                    t = h.canvasStruct.textPosTop,
                    u = h.canvasStruct.textWidth,
                    s = h.canvasStruct.textHeight,
                    v = h.canvasStruct.textChildPosLeft,
                    h = h.canvasStruct.textChildPosTop,
                    k = parseFloat(k) * e / 100 + "px",
                    l = parseFloat(l) * e / 100 + "px",
                    m = parseFloat(m) *
                    e / 100,
                    o = parseFloat(o) * e / 100,
                    p = parseFloat(p) * e / 100 + "px",
                    r = parseFloat(q) * e / 100 + "px";
                if (q = cp.DD.copyCustomDivStructObject(this.DragSourceCurrentStateList[this.DSMap[a]].divStruct)) b.divStruct && (q.posleft = b.divStruct.posleft, q.postop = b.divStruct.postop), q.Width = k, q.Height = l;
                if (k = cp.DD.copyCustomCanvasStructObject(this.DragSourceCurrentStateList[this.DSMap[a]].canvasStruct)) b.canvasStruct && (k.posleft = b.canvasStruct.posleft, k.postop = b.canvasStruct.postop), k.Width = m + "px", k.Height = o + "px", k.MarginTop = r, k.MarginLeft =
                    p;
                if (document.getElementById(a)) {
                    m = parseFloat(f) * e / 100;
                    o = parseFloat(g) * e / 100;
                    if (d && (a = parseFloat(u), s = parseFloat(s), k && (k.textPosLeft = parseFloat(n) * (e / 100) + "px", k.textPosTop = parseFloat(t) * (e / 100) + "px", k.textWidth = a * e / 100 + "px", k.textHeight = s * e / 100 + "px"), d.firstChild)) k.textChildPosLeft = parseFloat(v) * (e / 100) + "px", k.textChildPosTop = parseFloat(h) * (e / 100) + "px";
                    cp.DD.UpdateDragSourceStatePropertiesObject(b, null, null, null, m + "px", o + "px", null, null, null, null, c, null)
                }
                cp.DD.UpdateDragSourceStatePropertiesObject(b,
                    null, null, null, null, null, null, q, k, null, c, null)
            }
        }
    };
    cp.DD.Interaction.prototype.updatePreviousStateDivPos = function(b, a, c, e) {
        var d = document.getElementById(a),
            f = document.getElementById(cp.D[a].mdi).parentElement,
            g = parseFloat(d.style.left),
            h = parseFloat(d.style.top),
            d = c + "px",
            k = e + "px",
            l = new cp.DD.CustomDivStruct;
        l.posleft = c - (g - parseFloat(f.style.left)) + "px";
        l.postop = e - (h - parseFloat(f.style.top)) + "px";
        if (a = this.DragSourceCurrentStateList[this.DSMap[a]].divStruct) l.Width = a.Width, l.Height = a.Height;
        cp.DD.UpdateDragSourceStatePropertiesObject(b,
            null, d, k, null, null, null, l, null, null, null, null)
    };
    cp.DD.Interaction.prototype.updatePreviousStateSnapPosition = function(b, a, c, e, d, f) {
        var g = document.getElementById(c),
            h = document.getElementById(a),
            k = this.GetDTObjFromDTID(c);
        if (g && k && h) {
            cp.DD.spv(g, c, 0);
            cp.DD.spv(h, a, 0);
            var c = k.sbp,
                l = parseFloat(g.style.left),
                m = parseFloat(g.style.top),
                o = parseFloat(g.style.width),
                g = parseFloat(g.style.height),
                p = this.DragSourceInitialStateList[this.DSMap[a]],
                q = k.sbs,
                k = parseFloat(p.divStruct.Width) * q / 100,
                p = parseFloat(p.divStruct.Height) *
                q / 100,
                q = parseFloat(h.style.left),
                h = parseFloat(h.style.top);
            switch (c) {
                case cp.DD.SnapBehaviourPos.kCPSBPNone:
                case cp.DD.SnapBehaviourPos.kCPSBPAbsolute:
                    e ? e = d : (e = q, f = h);
                    this.updatePreviousStateDivPos(b, a, e, f);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorTopLeft:
                    this.updatePreviousStateDivPos(b, a, l, m);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorTopCenter:
                    this.updatePreviousStateDivPos(b, a, l + o / 2 - k / 2, m);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorTopRight:
                    this.updatePreviousStateDivPos(b, a, l + o - k,
                        m);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterLeft:
                    this.updatePreviousStateDivPos(b, a, l, m + g / 2 - p / 2);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterCenter:
                    this.updatePreviousStateDivPos(b, a, l + o / 2 - k / 2, m + g / 2 - p / 2);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorCenterRight:
                    this.updatePreviousStateDivPos(b, a, l + o - k, m + g / 2 - p / 2);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomLeft:
                    this.updatePreviousStateDivPos(b, a, l, m + g - p);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomCenter:
                    this.updatePreviousStateDivPos(b,
                        a, l + o / 2 - k / 2, m + g - p);
                    break;
                case cp.DD.SnapBehaviourPos.kCPSBPAnchorBottomRight:
                    this.updatePreviousStateDivPos(b, a, l + o - k, m + g - p)
            }
        }
    };
    cp.DD.Interaction.prototype.updateTiledPreviousStateSnapPosition = function(b) {
        function a(a) {
            for (var c = void 0, d = 0; d < b.length; ++d) b[d].objectID == a && (c = b[d]);
            return c
        }
        var c = [],
            e;
        for (e in this.DTMap) {
            var d = this.GetDTObjFromDTID(e);
            if (d) {
                var f = d.sbp;
                (f == cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingTop || f == cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingBottom || f == cp.DD.SnapBehaviourPos.kCPSBPTileBottomTopStartingLeft ||
                    f == cp.DD.SnapBehaviourPos.kCPSBPTileTopBottomStartingLeft) && c.push(e)
            }
        }
        e = c.length;
        if (!(0 >= e))
            for (d = 0; d < e; ++d) {
                var g = c[d],
                    h = this.DTMap[g],
                    k, l = document.getElementById(g),
                    m = this.GetDTObjFromDTID(g);
                if (!l || !m || !h) break;
                cp.DD.spv(l, g, 0);
                var g = parseFloat(l.style.left),
                    o = parseFloat(l.style.top),
                    p = parseFloat(l.style.width),
                    l = parseFloat(l.style.height),
                    f = m.sbp,
                    m = m.sbs;
                switch (f) {
                    case cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingTop:
                        var q = "",
                            n = k = null,
                            t = 0,
                            u = 0,
                            s = 0,
                            v = 0;
                        if (h.prevAcceptedDragSources.toString() !=
                            h.acceptedDragSources.toString())
                            for (f = 0; f < h.prevAcceptedDragSources.length; ++f) {
                                currentDragSourceFramesetID = h.prevAcceptedDragSources[f];
                                var r = this.DragSourcePreviousStateList[this.DSMap[currentDragSourceFramesetID]],
                                    r = cp.DD.copyDragSourcePropertiesObject(r);
                                currentDragSourceFrameset = document.getElementById(currentDragSourceFramesetID);
                                0 !== f && (q = h.prevAcceptedDragSources[f - 1]);
                                q && (n = document.getElementById(q));
                                var w = this.DragSourceInitialStateList[this.DSMap[currentDragSourceFramesetID]];
                                curDsFsWidth =
                                    parseFloat(w.divStruct.Width) * m / 100;
                                curDsFsHeight = parseFloat(w.divStruct.Height) * m / 100;
                                var y = w = 0,
                                    x = 0,
                                    z = 0;
                                if (x = cp.DD.GetDimensionsAfterRotation(0, 0, curDsFsWidth, curDsFsHeight, cp.DD.getRotationAngle(currentDragSourceFrameset))) w = -x.minX, y = -x.minY, curDsFsWidth = x.maxX - x.minX, curDsFsHeight = x.maxY - x.minY;
                                n && (t = parseFloat(k.divStruct.posleft), u = parseFloat(k.divStruct.postop), s = parseFloat(k.divStruct.Width), v = parseFloat(k.divStruct.Height), k = cp.DD.GetDimensionsAfterRotation(0, 0, s, v, cp.DD.getRotationAngle(n)),
                                    x && (x = -k.minX, z = -k.minY, t -= x, u -= z, s = k.maxX - k.minX, v = k.maxY - k.minY));
                                curDsFsX = null !== n ? t + s : g;
                                curDsFsY = null !== n ? u : o;
                                if (null !== n && curDsFsX + curDsFsWidth > g + p) {
                                    maxHeight = v;
                                    for (k = f - 1; 0 <= k; --k)
                                        if (x = document.getElementById(h.prevAcceptedDragSources[k]), l = parseFloat(x.style.top), u === l) curHeight = parseFloat(x.style.height), maxHeight = curHeight > maxHeight ? curHeight : maxHeight;
                                        else break;
                                    curDsFsX = g;
                                    curDsFsY = null !== n ? u + maxHeight : o
                                }
                                curDsFsX += w;
                                curDsFsY += y;
                                this.updatePreviousStateDivPos(r, currentDragSourceFramesetID,
                                    curDsFsX, curDsFsY);
                                w = a(currentDragSourceFramesetID);
                                r.divStruct.posleft = r.posleft;
                                r.divStruct.postop = r.postop;
                                cp.DD.UpdateDragSourceStatePropertiesObject(w, null, r.posleft, r.postop, null, null, null, r.divStruct, null, null, null, null);
                                k = w
                            }
                        break;
                    case cp.DD.SnapBehaviourPos.kCPSBPTileLeftRightStartingBottom:
                        q = "";
                        n = k = null;
                        v = s = u = t = 0;
                        if (h.prevAcceptedDragSources.toString() != h.acceptedDragSources.toString())
                            for (f = 0; f < h.prevAcceptedDragSources.length; ++f) {
                                n = q = currentDragSourceFrameset = currentDragSourceFramesetID =
                                    null;
                                currentDragSourceFramesetID = h.prevAcceptedDragSources[f];
                                currentDragSourceFrameset = document.getElementById(currentDragSourceFramesetID);
                                r = this.DragSourcePreviousStateList[this.DSMap[currentDragSourceFramesetID]];
                                r = cp.DD.copyDragSourcePropertiesObject(r);
                                0 !== f && (q = h.prevAcceptedDragSources[f - 1]);
                                q && (n = document.getElementById(q));
                                w = this.DragSourceInitialStateList[this.DSMap[currentDragSourceFramesetID]];
                                curDsFsWidth = parseFloat(w.divStruct.Width) * m / 100;
                                curDsFsHeight = parseFloat(w.divStruct.Height) *
                                    m / 100;
                                z = x = y = w = 0;
                                if (x = cp.DD.GetDimensionsAfterRotation(0, 0, curDsFsWidth, curDsFsHeight, cp.DD.getRotationAngle(currentDragSourceFrameset))) w = -x.minX, y = -x.minY, curDsFsWidth = x.maxX - x.minX, curDsFsHeight = x.maxY - x.minY;
                                v = s = u = t = 0;
                                n && (t = parseFloat(k.divStruct.posleft), u = parseFloat(k.divStruct.postop), s = parseFloat(k.divStruct.Width), v = parseFloat(k.divStruct.Height), k = cp.DD.GetDimensionsAfterRotation(0, 0, s, v, cp.DD.getRotationAngle(n)), x && (x = -k.minX, z = -k.minY, t -= x, u -= z, s = k.maxX - k.minX, v = k.maxY - k.minY));
                                curDsFsX =
                                    null !== n ? t + s : g;
                                curDsFsY = null !== n ? u + v - curDsFsHeight : o + l - curDsFsHeight;
                                if (null !== n && curDsFsX + curDsFsWidth > g + p) {
                                    maxHeight = v;
                                    for (k = f - 1; 0 <= k; --k)
                                        if (x = document.getElementById(h.prevAcceptedDragSources[k]), t = parseFloat(x.style.top) + parseFloat(x.style.height), u + v === t) curHeight = parseFloat(x.style.height), maxHeight = curHeight > maxHeight ? curHeight : maxHeight;
                                        else break;
                                    curDsFsX = g;
                                    curDsFsY = null !== n ? u + v - maxHeight - curDsFsHeight : l - curDsFsHeight
                                }
                                curDsFsX += w;
                                curDsFsY += y;
                                this.updatePreviousStateDivPos(r, currentDragSourceFramesetID,
                                    curDsFsX, curDsFsY);
                                w = a(currentDragSourceFramesetID);
                                r.divStruct.posleft = r.posleft;
                                r.divStruct.postop = r.postop;
                                cp.DD.UpdateDragSourceStatePropertiesObject(w, null, r.posleft, r.postop, null, null, null, r.divStruct, null, null, null, null);
                                k = w
                            }
                        break;
                    case cp.DD.SnapBehaviourPos.kCPSBPTileBottomTopStartingLeft:
                        q = "";
                        n = k = null;
                        v = s = u = t = 0;
                        if (h.prevAcceptedDragSources.toString() != h.acceptedDragSources.toString())
                            for (f = 0; f < h.prevAcceptedDragSources.length; ++f) {
                                n = q = currentDragSourceFrameset = currentDragSourceFramesetID =
                                    null;
                                currentDragSourceFramesetID = h.prevAcceptedDragSources[f];
                                currentDragSourceFrameset = document.getElementById(currentDragSourceFramesetID);
                                r = this.DragSourcePreviousStateList[this.DSMap[currentDragSourceFramesetID]];
                                r = cp.DD.copyDragSourcePropertiesObject(r);
                                0 !== f && (q = h.prevAcceptedDragSources[f - 1]);
                                q && (n = document.getElementById(q));
                                w = this.DragSourceInitialStateList[this.DSMap[currentDragSourceFramesetID]];
                                curDsFsWidth = parseFloat(w.divStruct.Width) * m / 100;
                                curDsFsHeight = parseFloat(w.divStruct.Height) *
                                    m / 100;
                                z = x = y = w = 0;
                                if (x = cp.DD.GetDimensionsAfterRotation(0, 0, curDsFsWidth, curDsFsHeight, cp.DD.getRotationAngle(currentDragSourceFrameset))) w = -x.minX, y = -x.minY, curDsFsWidth = x.maxX - x.minX, curDsFsHeight = x.maxY - x.minY;
                                v = s = u = t = 0;
                                n && (t = parseFloat(k.divStruct.posleft), u = parseFloat(k.divStruct.postop), s = parseFloat(k.divStruct.Width), v = parseFloat(k.divStruct.Height), k = cp.DD.GetDimensionsAfterRotation(0, 0, s, v, cp.DD.getRotationAngle(n)), x && (x = -k.minX, z = -k.minY, t -= x, u -= z, s = k.maxX - k.minX, v = k.maxY - k.minY));
                                curDsFsX =
                                    null !== n ? t : g;
                                curDsFsY = null !== n ? u - curDsFsHeight : o + l - curDsFsHeight;
                                if (null !== n && curDsFsY < o) {
                                    p = s;
                                    for (k = f - 1; 0 <= k; --k)
                                        if (x = document.getElementById(h.prevAcceptedDragSources[k]), u = parseFloat(x.style.left), t === u) u = parseFloat(x.style.width), p = u > p ? u : p;
                                        else break;
                                    curDsFsX = null !== n ? t + p : g;
                                    curDsFsY = o + l - curDsFsHeight
                                }
                                curDsFsX += w;
                                curDsFsY += y;
                                this.updatePreviousStateDivPos(r, currentDragSourceFramesetID, curDsFsX, curDsFsY);
                                w = a(currentDragSourceFramesetID);
                                r.divStruct.posleft = r.posleft;
                                r.divStruct.postop = r.postop;
                                cp.DD.UpdateDragSourceStatePropertiesObject(w,
                                    null, r.posleft, r.postop, null, null, null, r.divStruct, null, null, null, null);
                                k = w
                            }
                        break;
                    case cp.DD.SnapBehaviourPos.kCPSBPTileTopBottomStartingLeft:
                        if (q = "", n = k = null, v = s = u = t = 0, h.prevAcceptedDragSources.toString() != h.acceptedDragSources.toString())
                            for (f = 0; f < h.prevAcceptedDragSources.length; ++f) {
                                n = q = currentDragSourceFrameset = currentDragSourceFramesetID = null;
                                currentDragSourceFramesetID = h.prevAcceptedDragSources[f];
                                currentDragSourceFrameset = document.getElementById(currentDragSourceFramesetID);
                                r = this.DragSourcePreviousStateList[this.DSMap[currentDragSourceFramesetID]];
                                r = cp.DD.copyDragSourcePropertiesObject(r);
                                0 !== f && (q = h.prevAcceptedDragSources[f - 1]);
                                q && (n = document.getElementById(q));
                                w = this.DragSourceInitialStateList[this.DSMap[currentDragSourceFramesetID]];
                                curDsFsWidth = parseFloat(w.divStruct.Width) * m / 100;
                                curDsFsHeight = parseFloat(w.divStruct.Height) * m / 100;
                                z = x = y = w = 0;
                                if (x = cp.DD.GetDimensionsAfterRotation(0, 0, curDsFsWidth, curDsFsHeight, cp.DD.getRotationAngle(currentDragSourceFrameset))) w = -x.minX, y = -x.minY, curDsFsWidth = x.maxX - x.minX, curDsFsHeight = x.maxY - x.minY;
                                v = s =
                                    u = t = 0;
                                n && (t = parseFloat(k.divStruct.posleft), u = parseFloat(k.divStruct.postop), s = parseFloat(k.divStruct.Width), v = parseFloat(k.divStruct.Height), k = cp.DD.GetDimensionsAfterRotation(0, 0, s, v, cp.DD.getRotationAngle(n)), x && (x = -k.minX, z = -k.minY, t -= x, u -= z, s = k.maxX - k.minX, v = k.maxY - k.minY));
                                curDsFsX = null !== n ? t : g;
                                curDsFsY = null !== n ? u + v : o;
                                if (null !== n && curDsFsY + curDsFsHeight > o + l) {
                                    p = s;
                                    for (k = f - 1; 0 <= k; --k)
                                        if (x = document.getElementById(h.prevAcceptedDragSources[k]), u = parseFloat(x.style.left), t === u) u = parseFloat(x.style.width),
                                            p = u > p ? u : p;
                                        else break;
                                    curDsFsX = null !== n ? t + p : g;
                                    curDsFsY = o
                                }
                                curDsFsX += w;
                                curDsFsY += y;
                                this.updatePreviousStateDivPos(r, currentDragSourceFramesetID, curDsFsX, curDsFsY);
                                w = a(currentDragSourceFramesetID);
                                r.divStruct.posleft = r.posleft;
                                r.divStruct.postop = r.postop;
                                cp.DD.UpdateDragSourceStatePropertiesObject(w, null, r.posleft, r.postop, null, null, null, r.divStruct, null, null, null, null);
                                k = w
                            }
                }
            }
    };
    cp.DD.Interaction.prototype.updatePreviousStateSnapOpacity = function(b, a, c) {
        if (c = this.GetDTObjFromDTID(c)) a = document.getElementById(cp.D[a].mdi),
            a.style.opacity = c.sbo / 100, cp.DD.UpdateDragSourceStatePropertiesObject(b, null, null, null, null, null, a.style.opacity, null, null, null, null, null)
    };
    cp.DD.Interaction.prototype.updatePreviousStateSnapDepth = function(b, a, c) {
        if (this.GetDTObjFromDTID(c)) {
            for (var e = null, d = null, f = null, f = this.DTMap[c].prevAcceptedDragSources.length ? document.getElementById(this.DTMap[c].prevAcceptedDragSources[this.DTMap[c].prevAcceptedDragSources.length - 1]) : document.getElementById(c), g = document.getElementById(cp.D[f.id].mdi).parentElement,
                    h = document.getElementById(a), k = document.getElementById(cp.D[a].mdi).parentElement, l = document.getElementById("div_Slide").getElementsByClassName("cp-frameset"), m = 1; m < l.length; ++m) {
                var o = l[m].id;
                o === c && (e = m);
                o === a && (d = m);
                if (null !== e && null !== d) break
            }
            h.style.zIndex = f.style.zIndex;
            k.style.zIndex = g.style.zIndex;
            cp.DD.UpdateDragSourceStatePropertiesObject(b, null, null, null, null, null, null, null, null, h.style.zIndex, null, null);
            l = document.getElementById("div_Slide").getElementsByClassName("cp-frameset");
            for (a =
                1; a < l.length; ++a) o = l[a].id, void 0 !== this.DSMap[o] && null !== this.DSMap[o] && cp.DD.UpdateDragSourceStatePropertiesObject(b, a - 1, null, null, null, null, null, null, null, null, null, null)
        }
    };
    cp.DD.Interaction.prototype.resumeChangePositionsOfDragSources = function(b, a, c) {
        if (!(null === a || null === c)) {
            var e = document.getElementById(b),
                d = parseFloat(a) - parseFloat(e.style.left),
                f = parseFloat(c) - parseFloat(e.style.top);
            e.style.left = parseFloat(a) + "px";
            e.style.top = parseFloat(c) + "px";
            a = document.getElementById("re-" + b + "c");
            a.style.left =
                parseFloat(a.style.left) + d + "px";
            a.style.top = parseFloat(a.style.top) + f + "px";
            if (d = this.DragSourceCurrentStateList[this.DSMap[b]].divStruct) d.posleft = a.style.left, d.postop = a.style.top;
            cp.DD.UpdateDragSourceStatePropertiesObject(this.DragSourceCurrentStateList[this.DSMap[b]], null, e.style.left, e.style.top, null, null, null, d, null, null, null, null);
            a.style.display = "none";
            a.offsetHeight = void 0;
            a.style.display = "block";
            b = this.DSLMSMap[b];
            b.posleft = e.style.left;
            b.postop = e.style.top;
            b.previousDTID = null;
            b.currentDTID =
                null;
            b.currentPositionId = b.objectID
        }
    };
    cp.DD.Interaction.prototype.appendToAnswerList = function(b, a) {
        this.m_attemptedAnswerString.push("t:" + b + "-t:" + a)
    };
    cp.DD.Interaction.prototype.clearAnswerList = function() {
        for (; 0 < this.m_attemptedAnswerString.length;) this.m_attemptedAnswerString.pop()
    };
    cp.DD.Interaction.prototype.checkCorrectAnswers = function(b, a) {
        var c = RegExp(b),
            e = this.convertAnswerListToString(a);
        return c.test(e) ? !0 : !1
    };
    cp.DD.Interaction.prototype.handleSlideExit = function() {
        this.resetAnswers()
    };
    cp.DD.Interaction.prototype.resetAnswers =
        function() {
            if (0 < this.m_dsList.length) {
                dsID = this.m_dsList[0].n;
                dsDiv = document.getElementById(dsID);
                var b = cp.DD.GetBaseItemInState(dsID);
                null !== b && (dsDiv = document.getElementById(b.framesetID));
                cp.DD.IsTouchDevice() ? dsDiv.ontouchstart = null : dsDiv.onmousedown = null;
                !0 === cp.DD.getAttribute(this.m_elId, "hc") && (dsDiv.onmouseover = null, dsDiv.onmouseout = null)
            }
            for (b = 0; b < this.m_dtList.length; ++b) {
                var a = this.DTMap[this.m_dtList[b].n];
                a && (a.acceptedDragSources.length = 0)
            }
            this.m_attemptedAnswerString = [];
            this.m_questionObj &&
                (this.m_CurrentAttempt = this.m_questionObj.currentAttempt);
            cp.responsive && (this.m_StoredViewDataString = "", this.clearAnswerList(), this.DTLMSList = [], this.DSLMSMap = [], this.ClearDropTargetLMSPropertiesObjects())
        };
    cp.DD.Interaction.prototype.disableInteraction = function() {
        for (a = 0; a < this.m_dsList.length; ++a) {
            dsID = this.m_dsList[a].n;
            dsDiv = document.getElementById(dsID);
            var b = cp.DD.GetBaseItemInState(dsID);
            null !== b && (dsDiv = document.getElementById(b.framesetID));
            cp.DD.IsTouchDevice() ? dsDiv.ontouchstart = null :
                dsDiv.onmousedown = null;
            !0 === cp.DD.getAttribute(this.m_elId, "hc") && (dsDiv.onmouseover = null, dsDiv.onmouseout = null)
        }
        for (var a = 0; a < this.m_buttonIDList.length; ++a) b = this.m_buttonIDList[a], b = b.replace(/^re-/, ""), b = b.replace(/c$/, ""), cp.hide(b)
    };
    cp.DD.Interaction.prototype.getStateToStore = function() {
        return this.m_StoredSuspendDataString
    };
    cp.DD.Interaction.prototype.setStateToStore = function(b) {
        this.m_StoredSuspendDataString = unescape(b);
        "" !== this.m_StoredSuspendDataString && this.doResume()
    };
    cp.DD.Interaction.prototype.ClearDropTargetLMSPropertiesObjects =
        function() {
            for (var b = 0; b < this.m_dtList.length; ++b) {
                var a = this.DTMap[this.m_dtList[b].n];
                null !== a && void 0 !== a && (a.dsWidth = null, a.dsHeight = null, a.acceptedDragSources = [], a.acceptedSourceObjects = [], a.prevAcceptedDragSources = [], a.prevAcceptedDragSourceObjects = [])
            }
        };
    cp.DD.Interaction.prototype.doResume = function() {
        function b() {
            0 === k.m_resumeItemsToBeDrawn ? k.resumeInteraction() : setTimeout(b, 20)
        }
        if (0 < this.m_StoredSuspendDataString.length) {
            var a = new cp.QuizState;
            a.init();
            var c, e, d;
            a.fromString(this.m_StoredSuspendDataString);
            var f = a.readNumber();
            for (c = 0; c < f; ++c) {
                d = a.readString();
                1 !== this.m_resumeItemsMap[d] && (this.m_resumeItemsMap[d] = 1, this.m_resumeItemsToBeDrawn += 1);
                var g = this.GetDTObjFromDTID(d).sbp === cp.DD.SnapBehaviourPos.kCPSBPAbsolute,
                    h = a.readNumber();
                for (e = 0; e < h; ++e)
                    if (d = a.readString(), 1 !== this.m_resumeItemsMap[d] && (this.m_resumeItemsMap[d] = 1, this.m_resumeItemsToBeDrawn += 1), g) a.readBoolean(), a.readNumber(), a.readBoolean(), a.readNumber()
            }
            f = a.readNumber();
            for (c = 0; c < f; ++c) d = a.readString(), 1 !== this.m_resumeItemsMap[d] &&
                (this.m_resumeItemsMap[d] = 1, this.m_resumeItemsToBeDrawn += 1), a.readNumber(), a.readNumber()
        }
        this.ClearDropTargetLMSPropertiesObjects();
        var k = this;
        setTimeout(b, 20)
    }
})();
cp.DDInteractionCallLaterData = function() {
    this.m_Function = null;
    this.m_Args = []
};