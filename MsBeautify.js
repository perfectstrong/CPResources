var msBeautify = msBeautify || {};
(function(b) {
    function R(e, d, x) {
        var j, Y, i, d = b.extend(!0, {
                byJson: {
                    data: null,
                    selectedIndex: 0,
                    name: null,
                    size: 0,
                    multiple: !1,
                    width: 250
                },
                mainCSS: "dd",
                height: 120,
                visibleRows: 7,
                rowHeight: 0,
                showIcon: !0,
                zIndex: 9999,
                useSprite: !1,
                animStyle: "slideDown",
                event: "click",
                openDirection: "auto",
                jsonTitle: !0,
                style: "",
                disabledOpacity: 1,
                disabledOptionEvents: !0,
                childWidth: 0,
                enableCheckbox: !1,
                checkboxNameSuffix: "_mscheck",
                append: "",
                prepend: "",
                reverseMode: !0,
                roundedCorner: !0,
                enableAutoFilter: !0,
                on: {
                    create: null,
                    open: null,
                    close: null,
                    add: null,
                    remove: null,
                    change: null,
                    blur: null,
                    click: null,
                    dblclick: null,
                    mousemove: null,
                    mouseover: null,
                    mouseout: null,
                    focus: null,
                    mousedown: null,
                    mouseup: null
                }
            }, d),
            m = this,
            R = {
                postElementHolder: "_msddHolder",
                postID: "_msdd",
                postTitleID: "_title",
                postTitleTextID: "_titleText",
                postChildID: "_child"
            };
        Y = d.mainCSS;
        i = "selected";
        j = "_msddli_";
        var o = !1,
            s = !1,
            n = !1,
            S = {},
            q = {},
            I = !1,
            C = !1,
            z = !1,
            J = null,
            G = !1,
            K, Z = document,
            L = window.navigator.userAgent,
            na = L.match(/msie/i);
        d.reverseMode = d.reverseMode.toString();
        d.roundedCorner = d.roundedCorner.toString();
        var $ = function(a) {
                return "[object Array]" == Object.prototype.toString.call(a) ? !0 : !1
            },
            f = function(a) {
                void 0 === S[a] && (S[a] = Z.getElementById(a));
                return S[a]
            },
            y = function(a) {
                var c = l("postChildID");
                return b("#" + c + " li." + j).index(a)
            },
            l = function(a) {
                return e + R[a]
            },
            D = function(a) {
                var c = "",
                    g = "",
                    e = "",
                    k = -1,
                    f = "",
                    r = "",
                    l = "",
                    i;
                if (void 0 !== a) {
                    k = a.title || "";
                    if ("" != k) {
                        if ((f = /^\{.*\}$/.test(k)) && d.jsonTitle) var j = eval("[" + k + "]");
                        g = f && d.jsonTitle ? j[0].title : g;
                        e = f && d.jsonTitle ? j[0].description : e;
                        c = f && d.jsonTitle ? j[0].image :
                            k;
                        l = f && d.jsonTitle ? j[0].imagecss : l
                    }
                    f = a.text || "";
                    k = a.value || "";
                    r = a.className || "";
                    g = b(a).prop("data-title") || b(a).data("title") || g || "";
                    e = b(a).prop("data-description") || b(a).data("description") || e || "";
                    c = b(a).prop("data-image") || b(a).data("image") || c || "";
                    l = b(a).prop("data-imagecss") || b(a).data("imagecss") || l || "";
                    i = b(a).index()
                }
                return {
                    image: c,
                    title: g,
                    description: e,
                    value: k,
                    text: f,
                    className: r,
                    imagecss: l,
                    index: i
                }
            },
            p = function(a, b, g) {
                a = Z.createElement(a);
                if (b)
                    for (var d in b) switch (d) {
                        case "style":
                            a.style.cssText =
                                b[d];
                            break;
                        default:
                            a[d] = b[d]
                    }
                g && (a.innerHTML = g);
                return a
            },
            T = function(a) {
                var b = {},
                    g = void 0 === a.style ? "" : a.style.cssText;
                0 < g.length && (b.style = g);
                g = a.disabled ? "disabled" : "enabled";
                g = a.selected ? g + " " + i : g;
                g = g + " " + j;
                b.className = g;
                !1 != d.useSprite && (b.className = g + " " + a.className);
                b = p("li", b);
                b.style.position = "";
                b.style.width = "";
                g = D(a);
                "" != g.title && (b.title = g.title);
                var h = g.image;
                if ("" != h && d.showIcon) {
                    var k = p("img");
                    k.src = h;
                    "" != g.imagecss && (k.className = g.imagecss + " ")
                }
                if ("" != g.description) var f = p("span", {
                        className: "description"
                    },
                    g.description);
                !0 === d.enableCheckbox && (g = p("input", {
                    type: "checkbox",
                    name: e + d.checkboxNameSuffix + "[]",
                    value: a.value || "",
                    className: "checkbox"
                }), b.appendChild(g), !0 === d.enableCheckbox && (g.checked = a.selected ? !0 : !1));
                k && b.appendChild(k);
                f ? b.appendChild(f) : k && (k.className += "fnone");
                a = p("div", {
                    className: "clear"
                });
                b.appendChild(a);
                return b
            },
            t = function(a) {
                var c = l("postChildID");
                if (a) return -1 == a ? b("#" + c).css({
                    height: "auto",
                    overflow: "auto"
                }) : b("#" + c).css("height", a + "px"), !1;
                var g, a = f(e).options.length;
                if (a >
                    d.visibleRows || d.visibleRows) {
                    g = b("#" + c + " li:first");
                    var h = parseInt(g.css("padding-bottom")) + parseInt(g.css("padding-top"));
                    0 === d.rowHeight && (b("#" + c).css({
                        visibility: "hidden",
                        display: "block"
                    }), d.rowHeight = Math.ceil(g.height()), b("#" + c).css({
                        visibility: "visible"
                    }), (!o || !0 === d.enableCheckbox) && b("#" + c).css({
                        display: "none"
                    }));
                    g = (d.rowHeight + h) * Math.min(d.visibleRows, a) + 3
                } else o && (g = b("#" + e).height());
                return g
            },
            aa = function() {
                var a = l("postChildID");
                b("#" + a).on("click", function(a) {
                    if (!0 === n) return !1;
                    a.preventDefault();
                    a.stopPropagation();
                    o && U()
                });
                b("#" + a + " li.enabled").on("click", function(a) {
                    "input" !== a.target.nodeName.toLowerCase() && A(this)
                });
                b("#" + a + " li.enabled").on("mousedown", function(c) {
                    if (!0 === n) return !1;
                    K = b("#" + a + " li." + i);
                    J = this;
                    c.preventDefault();
                    c.stopPropagation();
                    !0 === d.enableCheckbox && "input" === c.target.nodeName.toLowerCase() && (z = !0);
                    if (!0 === o)
                        if (s)
                            if (!0 === C) {
                                b(this).addClass(i);
                                var g = b("#" + a + " li." + i),
                                    e = y(this);
                                if (1 < g.length) {
                                    var c = b("#" + a + " li." + j),
                                        f = y(g[0]),
                                        g = y(g[1]);
                                    e > g && (f = e, g += 1);
                                    for (e = Math.min(f,
                                            g); e <= Math.max(f, g); e++) {
                                        var l = c[e];
                                        b(l).hasClass("enabled") && b(l).addClass(i)
                                    }
                                }
                            } else !0 === z ? (b(this).toggleClass(i), !0 === d.enableCheckbox && (c = this.childNodes[0], c.checked = !c.checked)) : (b("#" + a + " li." + i).removeClass(i), b("#" + a + " input:checkbox").prop("checked", !1), b(this).addClass(i), !0 === d.enableCheckbox && (this.childNodes[0].checked = !0));
                    else b("#" + a + " li." + i).removeClass(i), b(this).addClass(i);
                    else b("#" + a + " li." + i).removeClass(i), b(this).addClass(i)
                });
                b("#" + a + " li.enabled").on("mouseenter", function(a) {
                    if (!0 ===
                        n) return !1;
                    a.preventDefault();
                    a.stopPropagation();
                    null != J && s && (b(this).addClass(i), !0 === d.enableCheckbox && (this.childNodes[0].checked = !0))
                });
                b("#" + a + " li.enabled").on("mouseover", function() {
                    if (!0 === n) return !1;
                    b(this).addClass("hover")
                });
                b("#" + a + " li.enabled").on("mouseout", function() {
                    if (!0 === n) return !1;
                    b("#" + a + " li.hover").removeClass("hover")
                });
                b("#" + a + " li.enabled").on("mouseup", function(c) {
                    if (!0 === n) return !1;
                    c.preventDefault();
                    c.stopPropagation();
                    !0 === d.enableCheckbox && (z = !1);
                    c = b("#" + a + " li." +
                        i).length;
                    G = K.length != c || 0 == c ? !0 : !1;
                    M();
                    N();
                    U();
                    J = null
                });
                !1 == d.disabledOptionEvents && (b("#" + a + " li." + j).on("click", function() {
                        if (!0 === n) return !1;
                        E(this, "click")
                    }), b("#" + a + " li." + j).on("mouseenter", function() {
                        if (!0 === n) return !1;
                        E(this, "mouseenter")
                    }), b("#" + a + " li." + j).on("mouseover", function() {
                        if (!0 === n) return !1;
                        E(this, "mouseover")
                    }), b("#" + a + " li." + j).on("mouseout", function() {
                        if (!0 === n) return !1;
                        E(this, "mouseout")
                    }), b("#" + a + " li." + j).on("mousedown", function() {
                        if (!0 === n) return !1;
                        E(this, "mousedown")
                    }),
                    b("#" + a + " li." + j).on("mouseup", function() {
                        if (!0 === n) return !1;
                        E(this, "mouseup")
                    }))
            },
            ba = function(a, c, d) {
                b("#" + a).off(c, d);
                b("#" + a).trigger(c);
                b("#" + a).on(c, d)
            },
            ca = function() {
                u("focus")
            },
            da = function() {
                u("blur")
            },
            V = function() {
                var a = l("postID"),
                    c = l("postChildID");
                if (!0 === o && !1 === d.enableCheckbox) b("#" + a + " .ddTitle").hide(), b("#" + c).css({
                    display: "block",
                    position: "relative"
                });
                else {
                    !1 === d.enableCheckbox && (s = !1);
                    b("#" + a + " .ddTitle").show();
                    b("#" + c).css({
                        display: "none",
                        position: "absolute"
                    });
                    var g = b("#" + c + " li." +
                        i)[0];
                    b("#" + c + " li." + i).removeClass(i);
                    g = y(b(g).addClass(i));
                    w(g)
                }
                b("#" + a + " .ddTitle").css("height", b("#" + a).height() + "px");
                b("#" + c).css("min-width", b("#" + a).width() + "px");
                0 == d.rowHeight && t();
                f(e).children.length > d.visibleRows ? (a = b("#" + c + " li:first"), a = parseInt(a.css("padding-bottom")) + parseInt(a.css("padding-top")), a = d.rowHeight * d.visibleRows - a, b("#" + c).css("height", a + "px")) : t(-1)
            },
            ea = function() {
                var a = l("postID");
                !0 === n ? b("#" + a).addClass("disabledAll") : b("#" + a).removeClass("disabledAll")
            },
            fa = function(a) {
                function c(a) {
                    b(b("#" +
                        g + " li." + j)[a]).addClass(i);
                    !0 === d.enableCheckbox && b(b("#" + g + " li." + j)[a]).find("input.checkbox").prop("checked", "checked")
                }
                var g = l("postChildID");
                b("#" + g + " li." + j).removeClass(i);
                !0 === d.enableCheckbox && b("#" + g + " li." + j + " input.checkbox").prop("checked", !1);
                if (!0 === $(a))
                    for (var e = 0; e < a.length; e++) c(a[e]);
                else c(a)
            },
            ga = function(a, c) {
                for (var d = l("postChildID"), d = a || b("#" + d + " li." + i), h = 0; h < d.length; h++) {
                    var k = !0 === c ? d[h] : y(d[h]);
                    f(e).options[k].selected = "selected"
                }
                w(d)
            },
            M = function() {
                var a = l("postChildID"),
                    c = b("#" + a + " li." + i);
                if (s && (C || z) || G) f(e).selectedIndex = -1;
                var g;
                0 == c.length ? g = -1 : 1 < c.length ? ga(c) : g = y(b("#" + a + " li." + i));
                if ((f(e).selectedIndex != g || G) && 1 >= c.length) G = !1, O("change"), f(e).selectedIndex = g, w(g), "function" == typeof d.on.change && (a = B(), d.on.change(a.data, a.ui)), b("#" + e).trigger("change")
            },
            w = function(a, c) {
                if (void 0 !== a) {
                    var d, h, k; - 1 == a ? (d = -1, k = h = "", F(-1)) : "object" != typeof a ? (h = f(e).options[a], d = f(e).selectedIndex = a, h = D(h), k = 0 <= a ? f(e).options[a].text : "", F(void 0, h), h = h.value) : (d = c && c.index ||
                        f(e).selectedIndex, h = c && c.value || f(e).value, k = c && c.text || f(e).options[f(e).selectedIndex].text || "", F(d));
                    m.selectedIndex = d;
                    m.value = h;
                    m.selectedText = k;
                    d = f(e).children;
                    m.children = d;
                    d = B();
                    m.uiData = d;
                    d = b("#" + e + " option:selected");
                    m.selectedOptions = d
                }
            },
            O = function(a) {
                var c = {
                        byElement: !1,
                        byJQuery: !1,
                        hasEvent: !1
                    },
                    d = b("#" + e);
                try {
                    null !== d.prop("on" + a) && (c.hasEvent = !0, c.byElement = !0)
                } catch (h) {}
                if ((d = "function" == typeof b._data ? b._data(d[0], "events") : d.data("events")) && d[a]) c.hasEvent = !0, c.byJQuery = !0;
                return c
            },
            U = function() {
                N();
                b("body").on("click", A);
                b(document).on("keydown", ha);
                b(document).on("keyup", ia)
            },
            N = function() {
                b("body").off("click", A);
                b(document).off("keydown", ha);
                b(document).off("keyup", ia)
            },
            oa = function(a) {
                if (47 > a.keyCode && 8 != a.keyCode && 46 != a.keyCode) return !1;
                var a = l("postChildID"),
                    c = l("postTitleTextID"),
                    c = f(c).value;
                if (0 == c.length) b("#" + a + " li:hidden").show(), t(-1);
                else if (b("#" + a + " li").hide(), c = b("#" + a + " li:Contains('" + c + "')").show(), b("#" + a + " li:visible").length <= d.visibleRows && t(-1), 0 < c.length &&
                    !o || !s) b("#" + a + " ." + i).removeClass(i), b(c[0]).addClass(i);
                o || P()
            },
            ja = function() {
                if ("true" == d.enableAutoFilter) {
                    var a = l("postID"),
                        c = l("postTitleTextID");
                    0 < b("#" + c + ":hidden").length && !1 == z && (b("#" + c + ":hidden").show().val(""), ba(a, "blur", da), f(c).focus())
                }
            },
            ha = function(a) {
                l("postTitleTextID");
                var c = l("postChildID");
                switch (a.keyCode) {
                    case 40:
                    case 39:
                        a.preventDefault();
                        a.stopPropagation();
                        var d = function(a) {
                                a += 1;
                                return a > e.length || !0 === b(e[a]).hasClass("enabled") ? a : d(a)
                            },
                            a = l("postChildID"),
                            e = b("#" + a + " li:visible." +
                                j),
                            c = b("#" + a + " li:visible." + i),
                            c = 0 == c.length ? e[0] : c,
                            c = b("#" + a + " li:visible." + j).index(c);
                        c < e.length - 1 && (c = d(c), c < e.length && ((!C || !o || !s) && b("#" + a + " ." + i).removeClass(i), b(e[c]).addClass(i), F(c), !0 == o && M(), W(b(e[c]))), o || P());
                        break;
                    case 38:
                    case 37:
                        a.preventDefault();
                        a.stopPropagation();
                        var f = function(a) {
                                a -= 1;
                                return 0 > a || !0 === b(H[a]).hasClass("enabled") ? a : f(a)
                            },
                            a = l("postChildID"),
                            c = b("#" + a + " li:visible." + i),
                            H = b("#" + a + " li:visible." + j),
                            c = b("#" + a + " li:visible." + j).index(c[0]);
                        0 <= c && (c = f(c), 0 <= c && ((!C ||
                            !o || !s) && b("#" + a + " ." + i).removeClass(i), b(H[c]).addClass(i), F(c), !0 == o && M(), 0 >= parseInt(b(H[c]).position().top + b(H[c]).height()) && (c = b("#" + a).scrollTop() - b("#" + a).height() - b(H[c]).height(), b("#" + a).animate({
                            scrollTop: c
                        }, 500))), o || P());
                        break;
                    case 27:
                        a.preventDefault();
                        a.stopPropagation();
                        A();
                        break;
                    case 13:
                        a.preventDefault();
                        a.stopPropagation();
                        A();
                        a = b("#" + c + " li." + i).length;
                        G = K.length != a || 0 == a ? !0 : !1;
                        M();
                        N();
                        J = null;
                        break;
                    case 16:
                        C = !0;
                        break;
                    case 17:
                        z = !0;
                        break;
                    default:
                        47 <= a.keyCode && !1 === o && ja()
                }
                if (!0 ===
                    n) return !1;
                u("keydown")
            },
            ia = function(a) {
                switch (a.keyCode) {
                    case 16:
                        C = !1;
                        break;
                    case 17:
                        z = !1
                }
                if (!0 === n) return !1;
                u("keyup")
            },
            pa = function() {
                if (!0 === n) return !1;
                u("dblclick")
            },
            qa = function() {
                if (!0 === n) return !1;
                u("mousemove")
            },
            ra = function(a) {
                if (!0 === n) return !1;
                a.preventDefault();
                u("mouseover")
            },
            sa = function(a) {
                if (!0 === n) return !1;
                a.preventDefault();
                u("mouseout")
            },
            ta = function() {
                if (!0 === n) return !1;
                u("mousedown")
            },
            ua = function() {
                if (!0 === n) return !1;
                u("mouseup")
            },
            X = function(a, c) {
                var d = {
                    byElement: !1,
                    byJQuery: !1,
                    hasEvent: !1
                };
                void 0 != b(a).prop("on" + c) && (d.hasEvent = !0, d.byElement = !0);
                var e = b(a).data("events");
                e && e[c] && (d.hasEvent = !0, d.byJQuery = !0);
                return d
            },
            E = function(a, c) {
                if (!1 == d.disabledOptionEvents) {
                    var g = f(e).options[y(a)];
                    if (!0 === X(g, c).hasEvent) {
                        if (!0 === X(g, c).byElement) g["on" + c]();
                        if (!0 === X(g, c).byJQuery) switch (c) {
                            case "keydown":
                            case "keyup":
                                break;
                            default:
                                b(g).trigger(c)
                        }
                        return !1
                    }
                }
            },
            u = function(a) {
                "function" == typeof d.on[a] && d.on[a].apply(this, arguments);
                if (!0 === O(a).hasEvent) {
                    if (!0 === O(a).byElement) f(e)["on" + a]();
                    else if (!0 === O(a).byJQuery) switch (a) {
                        case "keydown":
                        case "keyup":
                            break;
                        default:
                            b("#" + e).triggerHandler(a)
                    }
                    return !1
                }
            },
            W = function(a) {
                var c = l("postChildID"),
                    a = void 0 !== a ? a : b("#" + c + " li." + i);
                if (0 < a.length) {
                    var a = parseInt(b(a).position().top),
                        d = parseInt(b("#" + c).height());
                    a > d && (a = a + b("#" + c).scrollTop() - d / 2, b("#" + c).animate({
                        scrollTop: a
                    }, 500))
                }
            },
            P = function() {
                var a = l("postID"),
                    c = l("postChildID"),
                    e = document.getElementById(a).parentElement.id,
                    h = b("#" + e).position(),
                    e = b("#" + e).height(),
                    f = b("#div_Slide").height(),
                    i = b("#" + c).height(),
                    r = b("#" + a).height(),
                    j = d.openDirection.toLowerCase();
                (f + 0 < Math.floor(i + e + h.top) || "alwaysup" == j) && "alwaysdown" != j ? (r = i, b("#" + c).css({
                        top: "-" + r + "px",
                        display: "block",
                        zIndex: d.zIndex
                    }), "true" == d.roundedCorner && b("#" + a).removeClass("borderRadius borderRadiusTp").addClass("borderRadiusBtm"), r = b("#" + c).offset().top, -10 > r && (b("#" + c).css({
                        top: parseInt(b("#" + c).css("top")) - r + 20 + "px",
                        zIndex: d.zIndex
                    }), "true" == d.roundedCorner && b("#" + a).removeClass("borderRadiusBtm borderRadiusTp").addClass("borderRadius"))) :
                    (b("#" + c).css({
                        top: r + "px",
                        zIndex: d.zIndex
                    }), "true" == d.roundedCorner && b("#" + a).removeClass("borderRadius borderRadiusBtm").addClass("borderRadiusTp"));
                na && (c = L.indexOf("MSIE"), c = 0 < c ? parseInt(L.substring(c + 5, L.indexOf(".", c))) : 0, 7 >= c && (b("div.ddcommon").css("zIndex", d.zIndex - 10), b("#" + a).css("zIndex", d.zIndex + 5)))
            },
            ka = function() {
                l("postID");
                var a = l("postChildID");
                N();
                if ("function" == typeof d.on.close) {
                    var c = B();
                    d.on.close(c.data, c.ui)
                }
                c = l("postTitleTextID");
                0 < b("#" + c + ":visible").length && (b("#" + c + ":visible").hide(),
                    f(c).blur());
                0 == d.rowHeight && t();
                f(e).children.length > d.visibleRows ? (c = b("#" + a + " li:first"), c = parseInt(c.css("padding-bottom")) + parseInt(c.css("padding-top")), c = d.rowHeight * d.visibleRows - c, b("#" + a).css("height", c + "px")) : t(-1);
                b("#" + a).css({
                    zIndex: 1
                });
                F(f(e).selectedIndex)
            },
            A = function() {
                I = !1;
                var a = l("postID"),
                    c = l("postChildID");
                msBeautify.oldDiv == c && (msBeautify.oldDiv = "", msBeautify.oldHolder = void 0);
                var e = d.animStyle;
                if (!1 === o || !0 === d.enableCheckbox) {
                    var h;
                    var f = l("postID"),
                        i = l("postChildID"),
                        r = document.getElementById(f).parentElement.id;
                    h = b("#" + r).position();
                    var r = b("#" + r).height(),
                        j = b("#div_Slide").height(),
                        i = b("#" + i).height();
                    b("#" + f).height();
                    f = d.openDirection.toLowerCase();
                    h = (j + 0 < Math.floor(i + r + h.top) || "alwaysup" == f) && "alwaysdown" != f ? !0 : !1;
                    h || "" == e || "none" == e ? (b("#" + c).css({
                        display: "none"
                    }), "true" == d.roundedCorner && b("#" + a).removeClass("borderRadiusTp borderRadiusBtm").addClass("borderRadius"), ka()) : b("#" + c).slideUp("fast", function() {
                        ka()
                    })
                }
            },
            la = function(a) {
                if (null != a && "undefined" != typeof a) {
                    var c = l("postChildID"),
                        d = D(a),
                        c = b("#" +
                            c + " li." + j + ":eq(" + a.index + ")");
                    return {
                        data: d,
                        ui: c,
                        option: a,
                        index: a.index
                    }
                }
                return null
            },
            B = function() {
                var a = l("postChildID"),
                    c = f(e),
                    d, h;
                if (-1 == c.selectedIndex) h = a = d = null, c = -1;
                else if (a = b("#" + a + " li." + i), 1 < a.length) {
                    var k = [];
                    h = [];
                    for (d = 0; d < a.length; d++) {
                        var j = y(a[d]);
                        k.push(j);
                        h.push(c.options[j])
                    }
                    c = d = k
                } else h = c.options[c.selectedIndex], d = D(h), c = c.selectedIndex;
                return {
                    data: d,
                    ui: a,
                    index: c,
                    option: h
                }
            },
            F = function(a, c) {
                var g = l("postTitleID"),
                    h = {}; - 1 == a ? (h.text = "", h.className = "", h.description = "", h.image = x) :
                    "undefined" != typeof a ? (h = f(e).options[a], h = D(h)) : h = c;
                b("#" + g).find(".ddlabel") && b("#" + g).find(".ddlabel").html(h.text);
                f(g).className = "ddTitleText " + h.className;
                "" != h.description ? b("#" + g).find(".description").html(h.description).show() : b("#" + g).find(".description").html("").hide();
                var k = b("#" + g).find("img");
                0 < k.length && b(k).remove();
                if ("" != h.image && d.showIcon && (k = p("img", {
                        src: h.image
                    }), b("#" + g).prepend(k), "" != h.imagecss && (k.className = h.imagecss + " "), "" == h.description)) k.className += "fnone"
            },
            ma = function(a,
                c, g) {
                var h = l("postChildID"),
                    k = !1;
                switch (a) {
                    case "add":
                        var m = T(c || f(e).options[g]),
                            k = 3 == arguments.length ? g : b("#" + h + " li." + j).length - 1;
                        0 > k || !k ? b("#" + h + " ul").append(m) : (h = b("#" + h + " li." + j)[k], b(h).before(m));
                        h = l("postChildID");
                        b("#" + h).off("click");
                        b("#" + h + " li.enabled").off("mouseenter");
                        b("#" + h + " li.enabled").off("click");
                        b("#" + h + " li.enabled").off("mouseover");
                        b("#" + h + " li.enabled").off("mouseout");
                        b("#" + h + " li.enabled").off("mousedown");
                        b("#" + h + " li.enabled").off("mouseup");
                        aa();
                        null != d.on.add &&
                            d.on.add.apply(this, arguments);
                        break;
                    case "remove":
                        k = b(b("#" + h + " li." + j)[g]).hasClass(i), b("#" + h + " li." + j + ":eq(" + g + ")").remove(), m = b("#" + h + " li.enabled"), !0 == k && 0 < m.length && (b(m[0]).addClass(i), k = b("#" + h + " li." + j).index(m[0]), w(k)), 0 == m.length && w(-1), b("#" + h + " li." + j).length < d.visibleRows && !o && t(-1), null != d.on.remove && d.on.remove.apply(this, arguments)
                }
            };
        this.act = function() {
            var a = arguments[0];
            Array.prototype.shift.call(arguments);
            switch (a) {
                case "add":
                    m.add.apply(this, arguments);
                    break;
                case "remove":
                    m.remove.apply(this,
                        arguments);
                    break;
                default:
                    try {
                        f(e)[a].apply(f(e), arguments)
                    } catch (b) {}
            }
        };
        this.add = function() {
            var a, c, d, h, k;
            k = arguments[0];
            "string" == typeof k ? (a = k, opt = new Option(a, a)) : (a = k.text || "", c = k.value || a, d = k.title || "", h = k.image || "", k = k.description || "", opt = new Option(a, c), b(opt).data("description", k), b(opt).data("image", h), b(opt).data("title", d));
            arguments[0] = opt;
            f(e).add.apply(f(e), arguments);
            a = f(e).children;
            m.children = a;
            a = f(e).length;
            m.length = a;
            ma("add", opt, arguments[1])
        };
        this.remove = function(a) {
            f(e).remove(a);
            var b = f(e).children;
            m.children = b;
            b = f(e).length;
            m.length = b;
            ma("remove", void 0, a)
        };
        this.set = function(a, c) {
            if ("undefined" == typeof a || "undefined" == typeof c) return !1;
            a = a.toString();
            try {
                m[a] = c
            } catch (d) {}
            switch (a) {
                case "size":
                    f(e)[a] = c;
                    0 == c && (f(e).multiple = !1);
                    o = 1 < f(e).size || !0 == f(e).multiple ? !0 : !1;
                    V();
                    break;
                case "multiple":
                    f(e)[a] = c;
                    o = 1 < f(e).size || !0 == f(e).multiple ? !0 : !1;
                    s = f(e).multiple;
                    V();
                    m[a] = c;
                    break;
                case "disabled":
                    n = f(e)[a] = c;
                    ea();
                    break;
                case "selectedIndex":
                case "value":
                    "selectedIndex" == a && !0 === $(c) ?
                        (b("#" + e + " option").prop("selected", !1), ga(c, !0), fa(c)) : (f(e)[a] = c, fa(f(e).selectedIndex), w(f(e).selectedIndex));
                    break;
                case "length":
                    var h = l("postChildID");
                    c < f(e).length && (f(e)[a] = c, 0 == c ? (b("#" + h + " li." + j).remove(), w(-1)) : (b("#" + h + " li." + j + ":gt(" + (c - 1) + ")").remove(), 0 == b("#" + h + " li." + i).length && b("#" + h + " li.enabled:eq(0)").addClass(i)), m[a] = c, h = f(e).children, m.children = h);
                    break;
                case "id":
                    break;
                default:
                    try {
                        f(e)[a] = c, m[a] = c
                    } catch (k) {}
            }
        };
        this.get = function(a) {
            return m[a] || f(e)[a]
        };
        this.visible = function(a) {
            var c =
                l("postID");
            if (!0 === a) b("#" + c).show();
            else if (!1 === a) b("#" + c).hide();
            else return "none" == b("#" + c).css("display") ? !1 : !0
        };
        this.debug = function(a) {
            msBeautify.debug(a)
        };
        this.close = function() {
            A()
        };
        this.open = function() {
            if (!0 !== n) {
                l("postID");
                var a = l("postChildID");
                if (I) "mouseover" !== d.event && A();
                else {
                    I = !0;
                    "" != msBeautify.oldDiv && msBeautify.oldHolder && msBeautify.oldHolder.close();
                    msBeautify.oldDiv = a;
                    msBeautify.oldHolder = m;
                    b("#" + a + " li:hidden").show();
                    P();
                    var c = d.animStyle;
                    if ("" == c || "none" == c) b("#" + a).css({
                            display: "block"
                        }),
                        W(), "function" == typeof d.on.open && (a = B(), d.on.open(a.data, a.ui));
                    else b("#" + a)[c]("fast", function() {
                        W();
                        if ("function" == typeof d.on.open) {
                            var a = B();
                            d.on.open(a.data, a.ui)
                        }
                    });
                    U()
                }
            }
        };
        this.visibleRows = this.showRows = function(a) {
            if ("undefined" == typeof a || 0 == a) return !1;
            d.visibleRows = a;
            0 == d.rowHeight && t();
            f(e).children.length > d.visibleRows ? (a = b("#" + childid + " li:first"), a = parseInt(a.css("padding-bottom")) + parseInt(a.css("padding-top")), a = d.rowHeight * d.visibleRows - a, b("#" + childid).css("height", a + "px")) : t(-1)
        };
        this.on = function(a, c) {
            b("#" + e).on(a, c)
        };
        this.off = function(a, c) {
            b("#" + e).off(a, c)
        };
        this.addMyEvent = this.on;
        this.getData = function() {
            return B()
        };
        this.namedItem = function() {
            var a = f(e).namedItem.apply(f(e), arguments);
            return la(a)
        };
        this.item = function() {
            var a = f(e).item.apply(f(e), arguments);
            return la(a)
        };
        this.setIndexByValue = function(a) {
            this.set("value", a)
        };
        this.destroy = function() {
            l("postElementHolder");
            var a = l("postID");
            b("#" + a + ", #" + a + " *").off();
            f(e).tabIndex = f(a).tabIndex;
            b("#" + a).remove();
            b("#" + e).parent().replaceWith(b("#" +
                e));
            b("#" + e).data("dd", null)
        };
        this.refresh = function() {
            w(f(e).selectedIndex)
        };
        (function() {
            if (d.byJson.data) {
                var a = ["description", "image", "title"];
                try {
                    e.id || (e.id = "dropdown" + msBeautify.counter);
                    d.byJson.data = eval(d.byJson.data);
                    var c = "msdropdown" + msBeautify.counter++,
                        g = {};
                    g.id = c;
                    g.name = d.byJson.name || e.id;
                    0 < d.byJson.size && (g.size = d.byJson.size);
                    g.multiple = d.byJson.multiple;
                    for (var h = p("select", g), c = 0; c < d.byJson.data.length; c++) {
                        var k = d.byJson.data[c],
                            l = new Option(k.text, k.value),
                            i;
                        for (i in k)
                            if ("text" !=
                                i.toLowerCase()) {
                                var j = -1 != b.inArray(i.toLowerCase(), a) ? "data-" : "";
                                l.setAttribute(j + i, k[i])
                            }
                        h.options[c] = l
                    }
                    f(e.id).appendChild(h);
                    h.selectedIndex = d.byJson.selectedIndex;
                    b(h).css({
                        width: d.byJson.width + "px"
                    });
                    e = h
                } catch (m) {
                    throw "There is an error in json data.";
                }
            }
        })();
        e.id || (e.id = "msdrpdd" + msBeautify.counter++);
        e = e.id;
        m.element = e;
        d.mainCSS = b("#" + e).data("maincss") || d.mainCSS;
        d.visibleRows = b("#" + e).data("visiblerows") || d.visibleRows;
        !1 == b("#" + e).data("showicon") && (d.showIcon = b("#" + e).data("showicon"));
        d.useSprite = b("#" + e).data("usesprite") || d.useSprite;
        d.animStyle = b("#" + e).data("animstyle") || d.animStyle;
        d.event = b("#" + e).data("event") || d.event;
        d.openDirection = b("#" + e).data("opendirection") || d.openDirection;
        d.jsonTitle = b("#" + e).data("jsontitle") || d.jsonTitle;
        d.disabledOpacity = b("#" + e).data("disabledopacity") || d.disabledOpacity;
        d.childWidth = b("#" + e).data("childwidth") || d.childWidth;
        d.enableCheckbox = b("#" + e).data("enablecheckbox") || d.enableCheckbox;
        d.checkboxNameSuffix = b("#" + e).data("checkboxnamesuffix") ||
            d.checkboxNameSuffix;
        d.append = b("#" + e).data("append") || d.append;
        d.prepend = b("#" + e).data("prepend") || d.prepend;
        d.reverseMode = b("#" + e).data("reversemode") || d.reverseMode;
        d.roundedCorner = b("#" + e).data("roundedcorner") || d.roundedCorner;
        d.enableAutoFilter = b("#" + e).data("enableautofilter") || d.enableAutoFilter;
        d.reverseMode = d.reverseMode.toString();
        d.roundedCorner = d.roundedCorner.toString();
        d.enableAutoFilter = d.enableAutoFilter.toString();
        n = f(e).disabled;
        "true" === d.enableCheckbox.toString() && (f(e).multiple = !0, d.enableCheckbox = !0);
        if (o = 1 < f(e).size || !0 == f(e).multiple ? !0 : !1) s = f(e).multiple;
        try {
            var q = b.extend(!0, {}, f(e)),
                Q;
            for (Q in q) "function" != typeof q[Q] && (m[Q] = q[Q])
        } catch (va) {}
        m.selectedText = 0 <= f(e).selectedIndex ? f(e).options[f(e).selectedIndex].text : "";
        m.version = msBeautify.version.msDropdown;
        m.author = msBeautify.author;
        (function() {
            var a;
            a = {
                className: Y + " ddcommon" + (d.roundedCorner == "true" ? " borderRadius" : "")
            };
            var c;
            c = f(e);
            c = c.style === void 0 ? "" : c.style.cssText;
            var g = b("#" + e).outerWidth();
            a.style = "width: " +
                g + "px;";
            if (c.length > 0) a.style = a.style + "" + c;
            a.id = l("postID");
            a.tabIndex = f(e).tabIndex;
            a = p("div", a);
            a.style.left = "";
            c = f(e).selectedIndex >= 0 ? f(e).options[f(e).selectedIndex] : {
                value: "",
                text: ""
            };
            var h = g = "",
                k = b("#" + e).data("usesprite");
            if (k) d.useSprite = k;
            if (d.useSprite != false) {
                g = " " + d.useSprite;
                h = " " + c.className
            }
            var g = p("div", {
                    className: "ddTitle" + g + (d.roundedCorner == "true" ? " borderRadiusTp" : "")
                }),
                k = p("span", {
                    className: "ddArrow arrowoff"
                }),
                i = l("postTitleID"),
                h = p("span", {
                    className: "ddTitleText" + h,
                    id: i
                });
            c = D(c);
            if (c.image != "" && d.showIcon) {
                var j = p("img");
                j.src = x;
                if (c.imagecss != "") j.className = c.imagecss + " "
            }
            g.appendChild(k);
            j && h.appendChild(j);
            g.appendChild(h);
            j = p("span", {
                className: "description"
            }, c.description);
            h.appendChild(j);
            a.appendChild(g);
            j = l("postTitleTextID");
            j = p("input", {
                id: j,
                type: "text",
                value: "",
                autocomplete: "off",
                className: "text shadow " + (d.roundedCorner == "true" ? "borderRadius" : ""),
                style: "display: none"
            });
            a.appendChild(j);
            j = {
                className: "ddChild ddchild_ border shadow",
                id: l("postChildID")
            };
            j.style = o == false ? "z-index: " + d.zIndex : "z-index:1";
            if (c = b("#" + e).data("childwidth") || d.childWidth) j.style = (j.style || "") + ";width:" + c;
            j = p("div", j);
            c = p("ul");
            if (d.useSprite != false) c.className = d.useSprite;
            g = f(e).children;
            for (h = 0; h < g.length; h++) {
                i = g[h];
                if (i.nodeName.toLowerCase() == "optgroup") {
                    var k = p("li", {
                            className: "optgroup"
                        }),
                        q = p("span", {
                            className: "optgroupTitle"
                        }, i.label);
                    k.appendChild(q);
                    for (var i = i.children, q = p("ul"), s = 0; s < i.length; s++) {
                        var t = T(i[s]);
                        q.appendChild(t)
                    }
                    k.appendChild(q)
                } else k = T(i);
                c.appendChild(k)
            }
            j.appendChild(c);
            a.appendChild(j);
            b("#" + e).after(a);
            a = l("postElementHolder");
            if (b("#" + a).length == 0) {
                j = {
                    style: "height: 0px;overflow: hidden;position: absolute;",
                    className: "ddOutOfVision"
                };
                j.id = a;
                j = p("div", j);
                b("#" + e).after(j);
                b("#" + e).appendTo(b("#" + a))
            } else b("#" + a).css({
                height: 0,
                overflow: "hidden",
                position: "absolute"
            });
            f(e).tabIndex = -1;
            a = l("postTitleTextID");
            if (d.enableAutoFilter == "true") b("#" + a).on("keyup", oa);
            V();
            ea();
            var v = l("postID");
            a = l("postTitleTextID");
            l("postChildID");
            b("#" +
                v).on(d.event, function(a) {
                if (n === true) return false;
                u(d.event);
                a.preventDefault();
                a.stopPropagation();
                m.open(a)
            });
            b("#" + v).on("keydown", function(a) {
                var b = a.which;
                if (!I && (b == 13 || b == 38 || b == 40 || b == 37 || b == 39 || b >= 47 && !o)) {
                    m.open(a);
                    if (b >= 47) ja();
                    else {
                        a.preventDefault();
                        a.stopImmediatePropagation()
                    }
                }
            });
            b("#" + v).on("focus", ca);
            b("#" + v).on("blur", da);
            b("#" + a).on("blur", function() {
                ba(v, "focus", ca)
            });
            aa();
            b("#" + v).on("dblclick", pa);
            b("#" + v).on("mousemove", qa);
            b("#" + v).on("mouseenter", ra);
            b("#" + v).on("mouseleave",
                sa);
            b("#" + v).on("mousedown", ta);
            b("#" + v).on("mouseup", ua);
            a = l("postChildID");
            d.append != "" && b("#" + a).append(d.append);
            d.prepend != "" && b("#" + a).prepend(d.prepend);
            typeof d.on.create == "function" && d.on.create.apply(m, arguments)
        })();
        q = B();
        m.uiData = q;
        q = b("#" + e + " option:selected");
        m.selectedOptions = q;
        q = l("postChildID");
        K = b("#" + q + " li." + i);
        if ("true" === d.reverseMode) b("#" + e).on("change", function() {
            w(this.selectedIndex)
        });
        f(e).refresh = function() {
            b("#" + e).msDropdown().data("dd").refresh()
        }
    }
    msBeautify = {
        version: {
            msDropdown: "3.5.2"
        },
        author: "Marghoob Suleman",
        counter: 20,
        debug: function(e) {
            !1 !== e ? b(".ddOutOfVision").css({
                height: "auto",
                position: "relative"
            }) : b(".ddOutOfVision").css({
                height: "0px",
                position: "absolute"
            })
        },
        oldDiv: "",
        oldHolder: void 0,
        create: function(e, d, x) {
            var j;
            switch ((x || "dropdown").toLowerCase()) {
                case "dropdown":
                case "select":
                    j = b(e).msDropdown(d).data("dd")
            }
            return j
        }
    };
    b.msDropDown = {};
    b.msDropdown = {};
    b.extend(!0, b.msDropDown, msBeautify);
    b.extend(!0, b.msDropdown, msBeautify);
    void 0 === b.fn.prop && (b.fn.prop = b.fn.attr);
    void 0 ===
        b.fn.on && (b.fn.on = b.fn.bind, b.fn.off = b.fn.unbind);
    b.expr[":"].Contains = "function" === typeof b.expr.createPseudo ? b.expr.createPseudo(function(e) {
        return function(d) {
            return b(d).text().toUpperCase().indexOf(e.toUpperCase()) >= 0
        }
    }) : function(e, d, x) {
        return b(e).text().toUpperCase().indexOf(x[3].toUpperCase()) >= 0
    };
    b.fn.extend({
        msDropDown: function(e, d) {
            return this.each(function() {
                if (!b(this).data("dd")) {
                    var x = new R(this, e, d);
                    b(this).data("dd", x)
                }
            })
        }
    });
    b.fn.msDropdown = b.fn.msDropDown
})(jQuery);