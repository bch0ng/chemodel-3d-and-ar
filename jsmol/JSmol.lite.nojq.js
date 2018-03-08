(function (a) {
    function h(a) {
        try {
            return a ? new window.ActiveXObject("Microsoft.XMLHTTP") : new window.XMLHttpRequest
        } catch (d) { }
    }
    a.ajaxSettings.xhr = void 0 === window.ActiveXObject ? h : function () {
        return (this.url == document.location || 0 == this.url.indexOf("http") || !this.isLocal) && /^(get|post|head|put|delete|options)$/i.test(this.type) && h() || h(1)
    };
    a.ajaxTransport("+script", function (a) {
        var d, g = document.head || jQuery("head")[0] || document.documentElement;
        return {
            send: function (l, h) {
                d = document.createElement("script");
                a.scriptCharset &&
                    (d.charset = a.scriptCharset);
                d.src = a.url;
                d.onload = d.onreadystatechange = function (a, e) {
                    if (e || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, d.parentNode && d.parentNode.removeChild(d), d = null, e || h(200, "success")
                };
                g.insertBefore(d, g.firstChild)
            },
            abort: function () {
                if (d) d.onload(void 0, !0)
            }
        }
    });
    a.extend(a.support, {
        iecors: !!window.XDomainRequest
    });
    a.support.iecors ? a.ajaxTransport(function (a) {
        return {
            send: function (d, g) {
                var l = new window.XDomainRequest;
                l.onload = function () {
                    g(200,
                        "OK", {
                            text: l.responseText
                        }, {
                            "Content-Type": l.contentType
                        })
                };
                a.xhrFields && (l.onerror = a.xhrFields.error, l.ontimeout = a.xhrFields.timeout);
                l.open(a.type, a.url);
                l.send(a.hasContent && a.data || null)
            },
            abort: function () {
                xdr.abort()
            }
        }
    }) : (a.ajaxSetup({
        accepts: {
            binary: "text/plain; charset=x-user-defined"
        },
        responseFields: {
            binary: "response"
        }
    }), a.ajaxTransport("binary", function (a) {
        var d;
        return {
            send: function (g, l) {
                var h = a.xhr();
                console.log("xhr.open binary async=" + a.async + " url=" + a.url);
                h.open(a.type, a.url, a.async);
                var k = !1;
                try {
                    h.hasOwnProperty("responseType") && (h.responseType = "arraybuffer", k = !0)
                } catch (m) { }
                try {
                    !k && h.overrideMimeType && h.overrideMimeType("text/plain; charset=x-user-defined")
                } catch (b) { } !a.crossDomain && !g["X-Requested-With"] && (g["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (var f in g) h.setRequestHeader(f, g[f])
                } catch (c) { }
                h.send(a.hasContent && a.data || null);
                d = function () {
                    var b = h.status,
                        f = "",
                        c = h.getAllResponseHeaders(),
                        g = {};
                    try {
                        if (d && 4 === h.readyState) {
                            d = void 0;
                            try {
                                g.text = "string" === typeof h.responseText ?
                                    h.responseText : null
                            } catch (k) { }
                            try {
                                g.binary = h.response
                            } catch (m) { }
                            try {
                                f = h.statusText
                            } catch (t) {
                                f = ""
                            } !b && a.isLocal && !a.crossDomain ? b = g.text ? 200 : 404 : 1223 === b && (b = 204);
                            l(b, f, g, c)
                        }
                    } catch (s) {
                         
                    }
                };
                a.async ? 4 === h.readyState ? setTimeout(d) : h.onreadystatechange = d : d()
            },
            abort: function () { }
        }
    }))
})(jQuery);
(function (a, h, e, d) {
    function g(e, g) {
        function k(b) {
            a(m).each(function () {
                self.Jmol && (0 <= g.indexOf("mouseup") || 0 <= g.indexOf("touchend")) && Jmol._setMouseOwner(null);
                var c = a(this);
                this !== b.target && !c.has(b.target).length && c.triggerHandler(g, [b.target, b])
            })
        }
        g = g || e + d;
        var m = a(),
            b = e + "." + g + "-special-event";
        a.event.special[g] = {
            setup: function () {
                m = m.add(this);
                1 === m.length && a(h).bind(b, k)
            },
            teardown: function () {
                self.Jmol && Jmol._setMouseOwner(null);
                m = m.not(this);
                0 === m.length && a(h).unbind(b)
            },
            add: function (b) {
                var a =
                    b.handler;
                b.handler = function (b, f) {
                    b.target = f;
                    a.apply(this, arguments)
                }
            }
        }
    }
    a.map(e.split(" "), function (a) {
        g(a)
    });
    g("focusin", "focus" + d);
    g("focusout", "blur" + d)
})(jQuery, document, "click mousemove mouseup touchmove touchend", "outjsmol");
"undefined" == typeof jQuery;
self.Jmol || (Jmol = {});
Jmol._version || (Jmol = function (a) {
    var h = function (a) {
        return {
            rear: a++,
            header: a++,
            main: a++,
            image: a++,
            front: a++,
            fileOpener: a++,
            coverImage: a++,
            dialog: a++,
            menu: a + 9E4,
            console: a + 91E3,
            consoleImage: a + 91001,
            monitorZIndex: a + 99999
        }
    },
        h = {
            _version: "$Date: 2018-01-28 23:38:52 -0600 (Sun, 28 Jan 2018) $",
            _alertNoBinary: !0,
            _allowedJmolSize: [25, 2048, 300],
            _appletCssClass: "",
            _appletCssText: "",
            _fileCache: null,
            _jarFile: null,
            _j2sPath: null,
            _use: null,
            _j2sLoadMonitorOpacity: 90,
            _applets: {},
            _asynchronous: !0,
            _ajaxQueue: [],
            _persistentMenu: !1,
            _getZOrders: h,
            _z: h(Jmol.z || 9E3),
            _debugCode: !0,
            _debugCore: !1,
            db: {
                _databasePrefixes: "$=:",
                _fileLoadScript: ";if (_loadScript = '' && defaultLoadScript == '' && _filetype == 'Pdb') { select protein or nucleic;cartoons Only;color structure; select * };",
                _nciLoadScript: ";n = ({molecule=1}.length < {molecule=2}.length ? 2 : 1); select molecule=n;display selected;center selected;",
                _pubChemLoadScript: "",
                _DirectDatabaseCalls: {
                    "cactus.nci.nih.gov": null,
                    ".x3dna.org": null,
                    "rruff.geo.arizona.edu": null,
                    ".rcsb.org": null,
                    "ftp.wwpdb.org": null,
                    "pdbe.org": null,
                    "materialsproject.org": null,
                    ".ebi.ac.uk": null,
                    "pubchem.ncbi.nlm.nih.gov": null,
                    "www.nmrdb.org/tools/jmol/predict.php": null,
                    $: "https://cactus.nci.nih.gov/chemical/structure/%FILENCI/file?format=sdf&get3d=True",
                    $$: "https://cactus.nci.nih.gov/chemical/structure/%FILENCI/file?format=sdf",
                    "=": "https://files.rcsb.org/download/%FILE.pdb",
                    "*": "https://www.ebi.ac.uk/pdbe/entry-files/download/%FILE.cif",
                    "==": "https://files.rcsb.org/ligands/download/%FILE.cif",
                    ":": "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/%FILE/SDF?record_type=3d"
                },
                _restQueryUrl: "http://www.rcsb.org/pdb/rest/search",
                _restQueryXml: "<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search</description><keywords>QUERY</keywords></orgPdbQuery>",
                _restReportUrl: "http://www.pdb.org/pdb/rest/customReport?pdbids=IDLIST&customReportColumns=structureId,structureTitle"
            },
            _debugAlert: !1,
            _document: a,
            _isXHTML: !1,
            _lastAppletID: null,
            _mousePageX: null,
            _mouseOwner: null,
            _serverUrl: "https://your.server.here/jsmol.php",
            _syncId: ("" + Math.random()).substring(3),
            _touching: !1,
            _XhtmlElement: null,
            _XhtmlAppendChild: !1
        };
    a = a.location.href.toLowerCase();
    h._debugCore = 0 <= a.indexOf("j2sdebugcore");
    h._httpProto = 0 == a.indexOf("https") ? "https://" : "http://";
    h._isFile = 0 == a.indexOf("file:");
    h._isFile && $.ajaxSetup({
        mimeType: "text/plain"
    });
    h._ajaxTestSite = h._httpProto + "google.com";
    a = h._isFile || 0 == a.indexOf("http://localhost") || 0 == a.indexOf("http://127.");
    h._tracker = !a && "https://chemapps.stolaf.edu/jmol/JmolTracker.php?id=UA-45940799-1";
    h._isChrome = 0 <= navigator.userAgent.toLowerCase().indexOf("chrome");
    h._isSafari = !h._isChrome && 0 <= navigator.userAgent.toLowerCase().indexOf("safari");
    h._isMsie = void 0 !== window.ActiveXObject;
    h._isEdge = 0 <= navigator.userAgent.indexOf("Edge/");
    h._useDataURI = !h._isSafari && !h._isMsie && !h._isEdge;
    window.requestAnimationFrame || (window.requestAnimationFrame = window.setTimeout);
    for (var e in Jmol) h[e] = Jmol[e];
    return h
}(document, Jmol));
(function (a, h) {
    a.__$ = h;
    h(document).ready(function () {
        a._document = null
    });
    a.$ = function (b, a) {
        null == b;
        return h(a ? "#" + b._id + "_" + a : b)
    };
    a._$ = function (b) {
        return "string" == typeof b ? h("#" + b) : b
    };
    a.$ajax = function (b) {
        a._ajaxCall = b.url;
        b.cache = "NO" != b.cache;
        b.url = a._fixProtocol(b.url);
        return h.ajax(b)
    };
    a._fixProtocol = function (b) {
        0 <= b.indexOf("get3d=True") && (b = b.replace(/get3d\=True/, "get3d=true"));
        return 0 == b.indexOf("http://www.rcsb.org/pdb/files/") && 0 > b.indexOf("/ligand/") ?
            "http://files.rcsb.org/view/" + b.substring(30).replace(/\.gz/, "") : 0 == b.indexOf("http://") && ("https://" == a._httpProto || 0 < b.indexOf(".gov/") || 0 == b.indexOf("http://www.materialsproject")) ? "https" + b.substring(4) : b
    };
    a._getNCIInfo = function (b, f) {
        return a._getFileData("https://cactus.nci.nih.gov/chemical/structure/" + b + "/" + ("name" == f ? "names" : f))
    };
    a.$appEvent = function (b, f, c, e) {
        b = a.$(b, f);
        b.off(c) && e && b.on(c, e)
    };
    a.$resize = function (b) {
        return h(window).resize(b)
    };
    a.$after = function (b, a) {
        return h(b).after(a)
    };
    a.$append =
        function (b, a) {
            return h(b).append(a)
        };
    a.$bind = function (b, a, c) {
        return c ? h(b).bind(a, c) : h(b).unbind(a)
    };
    a.$closest = function (b, a) {
        return h(b).closest(a)
    };
    a.$get = function (b, a) {
        return h(b).get(a)
    };
    a.$documentOff = function (b, a) {
        return h(document).off(b, "#" + a)
    };
    a.$documentOn = function (b, a, c) {
        return h(document).on(b, "#" + a, c)
    };
    a.$getAncestorDiv = function (b, a) {
        return h("div." + a + ":has(#" + b + ")")[0]
    };
    a.$supportsIECrossDomainScripting = function () {
        return h.support.iecors
    };
    a.$attr = function (b, f, c) {
        return a._$(b).attr(f,
            c)
    };
    a.$css = function (b, f) {
        return a._$(b).css(f)
    };
    a.$find = function (b, f) {
        return a._$(b).find(f)
    };
    a.$focus = function (b) {
        return a._$(b).focus()
    };
    a.$html = function (b, f) {
        return a._$(b).html(f)
    };
    a.$offset = function (b) {
        return a._$(b).offset()
    };
    a.$windowOn = function (b, a) {
        return h(window).on(b, a)
    };
    a.$prop = function (b, f, c) {
        var e = a._$(b);
        return 3 == arguments.length ? e.prop(f, c) : e.prop(f)
    };
    a.$remove = function (b) {
        return a._$(b).remove()
    };
    a.$scrollTo = function (b, f) {
        var c = a._$(b);
        return c.scrollTop(0 > f ? c[0].scrollHeight : f)
    };
    a.$setEnabled = function (b, f) {
        return a._$(b).attr("disabled", f ? null : "disabled")
    };
    a.$getSize = function (b) {
        b = a._$(b);
        return [b.width(), b.height()]
    };
    a.$setSize = function (b, f, c) {
        return a._$(b).width(f).height(c)
    };
    a.$is = function (b, f) {
        return a._$(b).is(f)
    };
    a.$setVisible = function (b, f) {
        var c = a._$(b);
        return f ? c.show() : c.hide()
    };
    a.$submit = function (b) {
        return a._$(b).submit()
    };
    a.$val = function (b, f) {
        var c = a._$(b);
        return 1 == arguments.length ? c.val() : c.val(f)
    };
    a._clearVars = function () {
        delete jQuery;
        delete h;
        delete a;
        delete SwingController;
        delete J;
        delete JM;
        delete JS;
        delete JSV;
        delete JU;
        delete JV;
        delete java;
        delete javajs;
        delete Clazz;
        delete c$
    };
    var e = document,
        d = window,
        g = {};
    g.ua = navigator.userAgent.toLowerCase();
    var l;
    a: {
        l = ["linux", "unix", "mac", "win"];
        for (var j = l.length; j--;)
            if (-1 != g.ua.indexOf(l[j])) {
                l = l[j];
                break a
            }
        l = "unknown"
    }
    g.os = l;
    g.browser = function () {
        for (var b = g.ua, a = "konqueror webkit omniweb opera webtv icab msie mozilla".split(" "), c = 0; c < a.length; c++)
            if (0 <= b.indexOf(a[c])) return a[c];
        return "unknown"
    };
    g.browserName = g.browser();
    g.browserVersion = parseFloat(g.ua.substring(g.ua.indexOf(g.browserName) + g.browserName.length + 1));
    g.supportsXhr2 = function () {
        return h.support.cors || h.support.iecors
    };
    g.allowDestroy = "msie" != g.browserName;
    g.allowHTML5 = "msie" != g.browserName || 0 > navigator.appVersion.indexOf("MSIE 8");
    g.getDefaultLanguage = function () {
        return navigator.language || navigator.userLanguage || "en-US"
    };
    g._webGLtest = 0;
    g.supportsWebGL = function () {
        if (!a.featureDetection._webGLtest) {
            var b;
            a.featureDetection._webGLtest = d.WebGLRenderingContext &&
                ((b = e.createElement("canvas")).getContext("webgl") || b.getContext("experimental-webgl")) ? 1 : -1
        }
        return 0 < a.featureDetection._webGLtest
    };
    g.supportsLocalization = function () {
        for (var b = e.getElementsByTagName("meta"), a = b.length; 0 <= --a;)
            if (0 <= b[a].outerHTML.toLowerCase().indexOf("utf-8")) return !0;
        return !1
    };
    g.supportsJava = function () {
        a.featureDetection._javaEnabled || (a.featureDetection._javaEnabled = a._isMsie ? navigator.javaEnabled() ? 1 : -1 : navigator.javaEnabled() && (!navigator.mimeTypes || navigator.mimeTypes["application/x-java-applet"]) ?
            1 : -1);
        return 0 < a.featureDetection._javaEnabled
    };
    g.compliantBrowser = function () {
        var b = !!e.getElementById,
            a = g.os;
        if ("opera" == g.browserName && 7.54 >= g.browserVersion && "mac" == a || "webkit" == g.browserName && 125.12 > g.browserVersion || "msie" == g.browserName && "mac" == a || "konqueror" == g.browserName && 3.3 >= g.browserVersion) b = !1;
        return b
    };
    g.isFullyCompliant = function () {
        return g.compliantBrowser() && g.supportsJava()
    };
    g.useIEObject = "win" == g.os && "msie" == g.browserName && 5.5 <= g.browserVersion;
    g.useHtml4Object = "mozilla" == g.browserName &&
        5 <= g.browserVersion || "opera" == g.browserName && 8 <= g.browserVersion || "webkit" == g.browserName;
    g.hasFileReader = d.File && d.FileReader;
    a.featureDetection = g;
    a._ajax = function (b) {
        if (!b.async) return a.$ajax(b).responseText;
        a._ajaxQueue.push(b);
        1 == a._ajaxQueue.length && a._ajaxDone()
    };
    a._ajaxDone = function () {
        var b = a._ajaxQueue.shift();
        b && a.$ajax(b)
    };
    a._grabberOptions = [
        ["$", "NCI(small molecules)"],
        [":", "PubChem(small molecules)"],
        ["=", "RCSB(macromolecules)"],
        ["*", "PDBe(macromolecules)"]
    ];
    a._getGrabberOptions = function (b) {
        if (0 ==
            a._grabberOptions.length) return "";
        var f = '<input type="text" id="ID_query" onfocus="jQuery(this).select()" onkeypress="if(13==event.which){Jmol._applets[\'ID\']._search();return false}" size="32" value="" />',
            c = '<button id="ID_submit" onclick="Jmol._applets[\'ID\']._search()">Search</button></nobr>';
        1 == a._grabberOptions.length ? (f = "<nobr>" + f + '<span style="display:none">', c = "</span>" + c) : f += "<br /><nobr>";
        for (var f = f + '<select id="ID_select">', e = 0; e < a._grabberOptions.length; e++) var d = a._grabberOptions[e],
            f = f + ('<option value="' + d[0] + '" ' + (0 == e ? "selected" : "") + ">" + d[1] + "</option>");
        f = (f + "</select>" + c).replace(/ID/g, b._id);
        return "<br />" + f
    };
    a._getScriptForDatabase = function (b) {
        return "$" == b ? a.db._nciLoadScript : ":" == b ? a.db._pubChemLoadScript : a.db._fileLoadScript
    };
    a._setInfo = function (b, a, c) {
        var e = [],
            d = "";
        if (0 == c.indexOf("ERROR")) d = c;
        else switch (a) {
            case "=":
                a = c.split("<dimStructure.structureId>");
                e = ["<table>"];
                for (c = 1; c < a.length; c++) e.push('<tr><td valign=top><a href="javascript:Jmol.search(' + b._id + ",'=" +
                    a[c].substring(0, 4) + "')\">" + a[c].substring(0, 4) + "</a></td>"), e.push("<td>" + a[c].split("Title>")[1].split("</")[0] + "</td></tr>");
                e.push("</table>");
                d = a.length - 1 + " matches";
                break;
            case "$":
            case ":":
                break;
            default:
                return
        }
        b._infoHeader = d;
        b._info = e.join("");
        b._showInfo(!0)
    };
    a._loadSuccess = function (b, f) {
        f && (a._ajaxDone(), f(b))
    };
    a._loadError = function (b) {
        a._ajaxDone();
        a.say("No 3D Model Found for this Compound :(");
        //a.say("say connecting to server: " + a._ajaxCall);
        null != b && b()
    };
    a._isDatabaseCall = function (b) {
        return 0 <= a.db._databasePrefixes.indexOf(b.substring(0,
            1))
    };
    a._getDirectDatabaseCall = function (b, f) {
        if (f && !a.featureDetection.supportsXhr2()) return b;
        var c = 2,
            e = b.substring(0, c),
            d = a.db._DirectDatabaseCalls[e] || a.db._DirectDatabaseCalls[e = b.substring(0, --c)];
        d && (":" == e ? (e = b.toLowerCase(), isNaN(parseInt(b.substring(1))) ? 0 == e.indexOf(":smiles:") ? (d += "?POST?smiles=" + b.substring(8), b = "smiles") : 0 == e.indexOf(":cid:") ? b = "cid/" + b.substring(5) : (0 == e.indexOf(":name:") ? b = b.substring(5) : 0 == e.indexOf(":cas:") && (b = b.substring(4)), b = "name/" + encodeURIComponent(b.substring(c))) :
            b = "cid/" + b.substring(1)) : b = encodeURIComponent(b.substring(c)), 0 <= b.indexOf(".mmtf") ? b = "https://mmtf.rcsb.org/v1.0/full/" + b.replace(/\.mmtf/, "") : 0 <= d.indexOf("FILENCI") ? (b = b.replace(/\%2F/g, "/"), b = d.replace(/\%FILENCI/, b)) : b = d.replace(/\%FILE/, b));
        return b
    };
    a._getRawDataFromServer = function (b, f, c, e, d, g) {
        b = "?call=getRawDataFromDatabase&database=" + b + (0 <= f.indexOf("?POST?") ? "?POST?" : "") + "&query=" + encodeURIComponent(f) + (d ? "&encoding=base64" : "") + (g ? "" : "&script=" + encodeURIComponent(a._getScriptForDatabase(b)));
        return a._contactServer(b, c, e)
    };
    a._checkFileName = function (b, f, c) {
        a._isDatabaseCall(f) && (c && a._setQueryTerm(b, f), f = a._getDirectDatabaseCall(f, !0), a._isDatabaseCall(f) && (f = a._getDirectDatabaseCall(f, !1), c && (c[0] = !0)));
        return f
    };
    a._checkCache = function (b, f, c) {
        if (b._cacheFiles && a._fileCache && !f.endsWith(".js")) {
            if (b = a._fileCache[f]) return System.out.println("using " + b.length + " bytes of cached data for " + f), c(b), null;
            c = function (b, f) {
                c(a._fileCache[b] = f)
            }
        }
        return c
    };
    a.playAudio = function (b) {
        a._playAudio(null,
            b)
    };
    a._playAudio = function (b, a) {
        var c = a.get ? function (b) {
            return a.get(b)
        } : null,
            e = a.put ? function (b, c) {
                return a.put(b, c)
            } : null,
            d = c ? c("audioFile") : a,
            g = c && c("audioPlayer"),
            h = document.createElement("audio");
        e && e("audioElement", h);
        var l = null;
        g && (l = function (b) {
            g.processUpdate(b)
        }, g.myClip = {
            open: function () {
                l("open")
            },
            start: function () {
                h.play();
                l("start")
            },
            loop: function (b) {
                h.loop = 0 != b
            },
            stop: function () {
                h.pause()
            },
            close: function () {
                l("close")
            },
            setMicrosecondPosition: function (b) {
                h.currentTime = b / 1E6
            }
        });
        h.controls =
            "true";
        h.src = d;
        c && c("loop") && (h.loop = "true");
        l && (h.addEventListener("pause", function () {
            l("pause")
        }), h.addEventListener("play", function () {
            l("play")
        }), h.addEventListener("playing", function () {
            l("playing")
        }), h.addEventListener("ended", function () {
            l("ended")
        }), l("open"))
    };
    a._loadFileData = function (b, f, c, e) {
        var d = [];
        f = a._checkFileName(b, f, d);
        c = a._checkCache(b, f, c);
        d[0] ? a._getRawDataFromServer("_", f, c, e) : (b = {
            type: "GET",
            dataType: "text",
            url: f,
            async: a._asynchronous,
            success: function (b) {
                a._loadSuccess(b, c)
            },
            error: function () {
                a._loadError(e)
            }
        },
            a._checkAjaxPost(b), a._ajax(b))
    };
    a._getInfoFromDatabase = function (b, f, c) {
        if ("====" == f) {
            var e = a.db._restQueryXml.replace(/QUERY/, c),
                e = {
                    dataType: "text",
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    url: a.db._restQueryUrl,
                    data: encodeURIComponent(e) + "&req=browser",
                    success: function (e) {
                        a._ajaxDone();
                        a._extractInfoFromRCSB(b, f, c, e)
                    },
                    error: function () {
                        a._loadError(null)
                    },
                    async: a._asynchronous
                };
            return a._ajax(e)
        }
        c = "?call=getInfoFromDatabase&database=" + f + "&query=" + encodeURIComponent(c);
        return a._contactServer(c,
            function (c) {
                a._setInfo(b, f, c)
            })
    };
    a._extractInfoFromRCSB = function (b, f, c, e) {
        var d = e.length / 5;
        if (0 != d && 4 == c.length && 1 != d) {
            c = c.toUpperCase();
            var g = e.indexOf(c);
            0 < g && 0 <= "123456789".indexOf(c.substring(0, 1)) && (e = c + "," + e.substring(0, g) + e.substring(g + 5));
            50 < d && (e = e.substring(0, 250));
            e = e.replace(/\n/g, ",");
            e = a._restReportUrl.replace(/IDLIST/, e);
            a._loadFileData(b, e, function (c) {
                a._setInfo(b, f, c)
            })
        }
    };
    a._checkAjaxPost = function (b) {
        var a = b.url.indexOf("?POST?");
        0 < a && (b.data = b.url.substring(a + 6), b.url = b.url.substring(0,
            a), b.type = "POST", b.contentType = "application/x-www-form-urlencoded")
    };
    a._contactServer = function (b, f, c) {
        b = {
            dataType: "text",
            type: "GET",
            url: a._serverUrl + b,
            success: function (b) {
                a._loadSuccess(b, f)
            },
            error: function () {
                a._loadError(c)
            },
            async: f ? a._asynchronous : !1
        };
        a._checkAjaxPost(b);
        return a._ajax(b)
    };
    a._setQueryTerm = function (b, f) {
        if (f && b._hasOptions && "http://" != f.substring(0, 7)) {
            if (a._isDatabaseCall(f)) {
                var c = f.substring(0, 1);
                f = f.substring(1);
                f.substring(0, 1) == c && 0 <= "=$".indexOf(c) && (f = f.substring(1));
                var e =
                    a._getElement(b, "select");
                if (e && e.options)
                    for (var d = 0; d < e.options.length; d++) e[d].value == c && (e[d].selected = !0)
            }
            a.$val(a.$(b, "query"), f)
        }
    };
    a._search = function (b, f, c) {
        1 < arguments.length || (f = null);
        a._setQueryTerm(b, f);
        f || (f = a.$val(a.$(b, "query")));
        0 == f.indexOf("!") ? b._script(f.substring(1)) : (f && (f = f.replace(/\"/g, "")), b._showInfo(!1), a._searchMol(b, f, c, !0))
    };
    a._searchMol = function (b, f, c, e) {
        var d;
        a._isDatabaseCall(f) ? (d = f.substring(0, 1), f = f.substring(1)) : d = b._hasOptions ? a.$val(a.$(b, "select")) : "$";
        "=" ==
            d && 3 == f.length && (f = "=" + f);
        var g = d + f;
        if (f && !(0 > g.indexOf("?") && g == b._thisJmolModel)) {
            b._thisJmolModel = g;
            var h;
            e && null != b._viewSet && null != (h = a.View.__findView(b._viewSet, {
                chemID: g
            })) ? a.View.__setView(h, b, !1) : ("$" == d || ":" == d ? b._jmolFileType = "MOL" : "=" == d && (b._jmolFileType = "PDB"), b._searchDatabase(f, d, c))
        }
    };
    a._searchDatabase = function (b, f, c, e) {
        b._showInfo(!1);
        return 0 <= f.indexOf("?") ? (a._getInfoFromDatabase(b, c, f.split("?")[0]), !0) : a.db._DirectDatabaseCalls[c] ? (b._loadFile(c + f, e), !0) : !1
    };
    a._syncBinaryOK =
        "?";
    a._canSyncBinary = function (b) {
        if (a._isAsync) return !0;
        if (self.VBArray) return a._syncBinaryOK = !1;
        if ("?" != a._syncBinaryOK) return a._syncBinaryOK;
        a._syncBinaryOK = !0;
        try {
            var f = new window.XMLHttpRequest;
            f.open("text", a._ajaxTestSite, !1);
            f.hasOwnProperty("responseType") ? f.responseType = "arraybuffer" : f.overrideMimeType && f.overrideMimeType("text/plain; charset=x-user-defined")
        } catch (c) {
            return System.out.println("JSmolCore.js: synchronous binary file transfer is requested but not available"), a._alertNoBinary &&
                !b, a._syncBinaryOK = !1
        }
        return !0
    };
    a._binaryTypes = "mmtf .gz .bz2 .jpg .gif .png .zip .jmol .bin .smol .spartan .pmb .mrc .map .ccp4 .dn6 .delphi .omap .pse .dcd .uk/pdbe/densities/".split(" ");
    a._isBinaryUrl = function (b) {
        for (var f = a._binaryTypes.length; 0 <= --f;)
            if (0 <= b.indexOf(a._binaryTypes[f])) return !0;
        return !1
    };
    a._getFileData = function (b, f, c) {
        var e = a._isBinaryUrl(b),
            d = 0 <= b.indexOf(".gz") && 0 <= b.indexOf("rcsb.org");
        d && (b = b.replace(/\.gz/, ""), e = !1);
        var d = e && !f && !a._canSyncBinary(d),
            g = 0 <= b.indexOf("?POST?");
        0 == b.indexOf("file:/") && 0 != b.indexOf("file:///") && (b = "file://" + b.substring(5));
        var h = 0 > b.indexOf("://") || 0 == b.indexOf(document.location.protocol) && 0 <= b.indexOf(document.location.host),
            l = "https://" == a._httpProto && 0 == b.indexOf("http://"),
            j = a._isDirectCall(b);
        !j && 0 <= b.indexOf("?ALLOWSORIGIN?") && (j = !0, b = b.replace(/\?ALLOWSORIGIN\?/, ""));
        var k = !h && a.$supportsIECrossDomainScripting(),
            m = null;
        if (l || d || !h && !j || !f &&
            k) m = a._getRawDataFromServer("_", b, f, f, d, !0);
        else {
            b = b.replace(/file:\/\/\/\//, "file://");
            var n = {
                dataType: e ? "binary" : "text",
                async: !!f
            };
            g ? (n.type = "POST", n.url = b.split("?POST?")[0], n.data = b.split("?POST?")[1]) : (n.type = "GET", n.url = b);
            f && (n.success = function () {
                f(a._xhrReturn(n.xhr))
            }, n.error = function () {
                f(n.xhr.statusText)
            });
            n.xhr = a.$ajax(n);
            f || (m = a._xhrReturn(n.xhr))
        }
        if (!c) return m;
        null == m && (m = "", e = !1);
        e && (e = a._canSyncBinary(!0));
        return e ? a._strToBytes(m) : JU.SB.newS(m)
    };
    a._xhrReturn = function (b) {
        return !b.responseText ||
            self.Clazz && Clazz.instanceOf(b.response, self.ArrayBuffer) ? b.response || b.statusText : b.responseText
    };
    a._isDirectCall = function (b) {
        if (0 <= b.indexOf("?ALLOWSORIGIN?")) return !0;
        for (var f in a.db._DirectDatabaseCalls)
            if (0 <= f.indexOf(".") && 0 <= b.indexOf(f)) return !0;
        return !1
    };
    a._cleanFileData = function (b) {
        return 0 <= b.indexOf("\r") && 0 <= b.indexOf("\n") ? b.replace(/\r\n/g, "\n") : 0 <= b.indexOf("\r") ? b.replace(/\r/g, "\n") : b
    };
    a._getFileType = function (b) {
        var a = b.substring(0, 1);
        if ("$" == a || ":" == a) return "MOL";
        if ("=" == a) return "=" ==
            b.substring(1, 2) ? "LCIF" : "PDB";
        b = b.split(".").pop().toUpperCase();
        return b.substring(0, Math.min(b.length, 3))
    };
    a._getZ = function (b, f) {
        return b && b._z && b._z[f] || a._z[f]
    };
    a._incrZ = function (b, f) {
        return b && b._z && ++b._z[f] || ++a._z[f]
    };
    a._hideLocalFileReader = function (b) {
        b._localReader && a.$setVisible(b._localReader, !1);
        b._readingLocal = !1;
        a._setCursor(b, 0)
    };
    a.loadFileFromDialog = function (b) {
        a._loadFileAsynchronously(null, b, null, null)
    };
    a._loadFileAsynchronously = function (b, f, c, e) {
        if (c && 0 != c.indexOf("?")) {
            var d =
                c;
            c = a._checkFileName(f, c);
            var g = function (g) {
                a._setData(b, c, d, g, e, f)
            },
                g = a._checkCache(f, c, g);
            0 <= c.indexOf("|") && (c = c.split("|")[0]);
            return null == g ? null : a._getFileData(c, g)
        }
        if (!a.featureDetection.hasFileReader) return b ? b.setData("Local file reading is not enabled in your browser", null, null, e, f) : '';
        f._localReader || (g = '<div id="ID" style="z-index:' + a._getZ(f, "fileOpener") + ';position:absolute;background:#E0E0E0;left:10px;top:10px"><div style="margin:5px 5px 5px 5px;"><button id="ID_loadurl">URL</button><input type="file" id="ID_files" /><button id="ID_loadfile">load</button><button id="ID_cancel">cancel</button></div><div>',
            a.$after("#" + f._id + "_appletdiv", g.replace(/ID/g, f._id + "_localReader")), f._localReader = a.$(f, "localReader"));
        a.$appEvent(f, "localReader_loadurl", "click");
        a.$appEvent(f, "localReader_loadurl", "click", function () {
            var b = prompt("Enter a URL");
            b && (a._hideLocalFileReader(f, 0), a._setData(null, b, b, null, e, f))
        });
        a.$appEvent(f, "localReader_loadfile", "click");
        a.$appEvent(f, "localReader_loadfile", "click", function () {
            var c = a.$(f, "localReader_files")[0].files[0],
                d = new FileReader;
            d.onloadend = function (d) {
                d.target.readyState ==
                    FileReader.DONE && (a._hideLocalFileReader(f, 0), a._setData(b, c.name, c.name, d.target.result, e, f))
            };
            try {
                d.readAsArrayBuffer(c)
            } catch (g) {
                
            }
        });
        a.$appEvent(f, "localReader_cancel", "click");
        a.$appEvent(f, "localReader_cancel", "click", function () {
            a._hideLocalFileReader(f);
            b && b.setData("#CANCELED#", null, null, e, f)
        });
        a.$setVisible(f._localReader, !0);
        f._readingLocal = !0
    };
    a._setData = function (b, f, c, e, d, g) {
        e && (e = a._strToBytes(e));
        null != e && (null == b || 0 <= f.indexOf(".jdx")) && a.Cache.put("cache://" +
            f, e);
        null == b ? g._applet.openFileAsyncSpecial(null == e ? f : "cache://" + f, 1) : b.setData(f, c, e, d)
    };
    a._doAjax = function (b, f, c) {
        b = b.toString();
        if (null != c) return a._saveFile(b, c);
        f && (b += "?POST?" + f);
        return a._getFileData(b, null, !0)
    };
    a._saveFile = function (b, f, c, e) {
        if (a._localFileSaveFunction && a._localFileSaveFunction(b, f)) return "OK";
        b = b.substring(b.lastIndexOf("/") + 1);
        c || (c = 0 <= b.indexOf(".pdf") ? "application/pdf" : 0 <= b.indexOf(".png") ? "image/png" : 0 <= b.indexOf(".gif") ? "image/gif" : 0 <= b.indexOf(".jpg") ? "image/jpg" : "");
        f = (JU ? JU : J.util).Base64.getBase64("string" == typeof f ? f.getBytes("UTF-8") : f).toString();
        e || (e = "base64");
        var d = a._serverUrl;
        d && 0 <= d.indexOf("your.server") && (d = "");
        a._useDataURI || !d ? (e = document.createElement("a"), e.href = "data:" + c + ";base64," + f, e.type = c || "text/plain;charset=utf-8", e.download = b, e.target = "_blank", h("body").append(e), e.click(), e.remove()) : (a._formdiv || (a.$after("body", '<div id="__jsmolformdiv__" style="display:none">\t\t\t\t\t\t<form id="__jsmolform__" method="post" target="_blank" action="">\t\t\t\t\t\t<input name="call" value="saveFile"/>\t\t\t\t\t\t<input id="__jsmolmimetype__" name="mimetype" value=""/>\t\t\t\t\t\t<input id="__jsmolencoding__" name="encoding" value=""/>\t\t\t\t\t\t<input id="__jsmolfilename__" name="filename" value=""/>\t\t\t\t\t\t<textarea id="__jsmoldata__" name="data"></textarea>\t\t\t\t\t\t</form>\t\t\t\t\t\t</div>'),
            a._formdiv = "__jsmolform__"), a.$attr(a._formdiv, "action", d + "?" + (new Date).getMilliseconds()), a.$val("__jsmoldata__", f), a.$val("__jsmolfilename__", b), a.$val("__jsmolmimetype__", c), a.$val("__jsmolencoding__", e), a.$submit("__jsmolform__"), a.$val("__jsmoldata__", ""), a.$val("__jsmolfilename__", ""));
        return "OK"
    };
    a._strToBytes = function (b) {
        if (Clazz.instanceOf(b, self.ArrayBuffer)) return Clazz.newByteArray(-1, b);
        for (var a = Clazz.newByteArray(b.length, 0), c = b.length; 0 <= --c;) a[c] = b.charCodeAt(c) & 255;
        return a
    };
    a._setConsoleDiv =
        function (b) {
            self.Clazz && Clazz.setConsoleDiv(b)
        };
    a._registerApplet = function (b, f) {
        return window[b] = a._applets[b] = a._applets[b + "__" + a._syncId + "__"] = f
    };
    a._readyCallback = function (b, f, c, e, d) {
        b = b.split("_object")[0];
        var g = a._applets[b];
        if (c = c.booleanValue ? c.booleanValue() : c) g._appletPanel = d || e, g._applet = e;
        a._track(g)._readyCallback(b, f, c)
    };
    a._getWrapper = function (b, f) {
        var c;
        if (f) {
            var e = "";
            if (b._coverImage) var e = ' onclick="Jmol.coverApplet(ID, false)" title="' + b._coverTitle + '"',
                d = '<image id="ID_coverclickgo" src="' +
                    b._makeLiveImage + '" style="width:25px;height:25px;position:absolute;bottom:10px;left:10px;z-index:' + a._getZ(b, "coverImage") + ';opacity:0.5;"' + e + " />",
                e = '<div id="ID_coverdiv" style="background-color:red;z-index:' + a._getZ(b, "coverImage") + ';width:100%;height:100%;display:inline;position:absolute;top:0px;left:0px"><image id="ID_coverimage" src="' + b._coverImage + '" style="width:100%;height:100%"' + e + "/>" + d + "</div>";
            d = b._isJava ? "" : '<image id="ID_waitimage" src="' + b._j2sPath + '/img/cursor_wait.gif" style="display:none;position:absolute;bottom:10px;left:10px;z-index:' +
                a._getZ(b, "coverImage") + ';" />';
            c = a._appletCssText.replace(/\'/g, '"');
            var g = b._getSpinner && b._getSpinner();
            b._spinner = g = !g || "none" == g ? "" : "background-image:url(" + g + "); background-repeat:no-repeat; background-position:center;";
            c = g + (0 <= c.indexOf('style="') ? c.split('style="')[1] : '" ' + c);
            c = '...<div id="ID_appletinfotablediv" style="width:Wpx;height:Hpx;position:relative;font-size:14px;text-align:left">IMG WAIT......<div id="ID_appletdiv" style="z-index:' + a._getZ(b, "header") + ";width:100%;height:100%;position:absolute;top:0px;left:0px;" +
                c + ">";
            var g = b._height,
                h = b._width;
            if ("string" !== typeof g || 0 > g.indexOf("%")) g += "px";
            if ("string" !== typeof h || 0 > h.indexOf("%")) h += "px";
            c = c.replace(/IMG/, e).replace(/WAIT/, d).replace(/Hpx/g, g).replace(/Wpx/g, h)
        } else c = '......</div>......<div id="ID_2dappletdiv" style="position:absolute;width:100%;height:100%;overflow:hidden;display:none"></div>......<div id="ID_infotablediv" style="width:100%;height:100%;position:absolute;top:0px;left:0px">.........<div id="ID_infoheaderdiv" style="height:20px;width:100%;background:yellow;display:none"><span id="ID_infoheaderspan"></span><span id="ID_infocheckboxspan" style="position:absolute;text-align:right;right:1px;"><a href="javascript:Jmol.showInfo(ID,false)">[x]</a></span></div>.........<div id="ID_infodiv" style="position:absolute;top:20px;bottom:0px;width:100%;height:100%;overflow:auto"></div>......</div>...</div>';
        return c.replace(/\.\.\./g, "").replace(/[\n\r]/g, "").replace(/ID/g, b._id)
    };
    a._hideLoadingSpinner = function (b) {
        b._spinner && a.$css(a.$(b, "appletdiv"), {
            "background-image": ""
        })
    };
    a._documentWrite = function (b) {
        if (a._document) {
            if (a._isXHTML && !a._XhtmlElement) {
                var f = document.getElementsByTagName("script");
                a._XhtmlElement = f.item(f.length - 1);
                a._XhtmlAppendChild = !1
            }
            a._XhtmlElement ? a._domWrite(b) : a._document.write(b)
        }
        return b
    };
    a._domWrite = function (b) {
        for (var f = [0]; f[0] < b.length;) {
            var c = a._getDomElement(b, f);
            if (!c) break;
            a._XhtmlAppendChild ? a._XhtmlElement.appendChild(c) : a._XhtmlElement.parentNode.insertBefore(c, _jmol.XhtmlElement)
        }
    };
    a._getDomElement = function (b, a) {
        var c = document.createElement("span");
        c.innerHTML = b;
        a[0] = b.length;
        return c
    };
    a._setObject = function (b, f, c) {
        b._id = f;
        b.__Info = {};
        c.z && c.zIndexBase && (a._z = a._getZOrders(c.zIndexBase));
        for (var e in c) b.__Info[e] = c[e];
        (b._z = c.z) || c.zIndexBase && (b._z = b.__Info.z = a._getZOrders(c.zIndexBase));
        b._width = c.width;
        b._height = c.height;
        b._noscript = !b._isJava && c.noscript;
        b._console =
            c.console;
        b._cacheFiles = !!c.cacheFiles;
        b._viewSet = null == c.viewSet || b._isJava ? null : "Set" + c.viewSet;
        null != b._viewSet && (a.View.__init(b), b._currentView = null);
        !a._fileCache && b._cacheFiles && (a._fileCache = {});
        b._console || (b._console = b._id + "_infodiv");
        "none" == b._console && (b._console = null);
        b._color = c.color ? c.color.replace(/0x/, "#") : "#FFFFFF";
        b._disableInitialConsole = c.disableInitialConsole;
        b._noMonitor = c.disableJ2SLoadMonitor;
        a._j2sPath && (c.j2sPath = a._j2sPath);
        b._j2sPath = c.j2sPath;
        b._coverImage = c.coverImage;
        b._makeLiveImage = c.makeLiveImage || c.j2sPath + "/img/play_make_live.jpg";
        b._isCovered = !!b._coverImage;
        b._deferApplet = c.deferApplet || b._isCovered && b._isJava;
        b._deferUncover = c.deferUncover && !b._isJava;
        b._coverScript = c.coverScript;
        b._coverTitle = c.coverTitle;
        b._coverTitle || (b._coverTitle = b._deferApplet ? "activate 3D model" : "3D model is loading...");
        b._containerWidth = b._width + (b._width == parseFloat(b._width) ? "px" : "");
        b._containerHeight = b._height + (b._height == parseFloat(b._height) ? "px" : "");
        b._info = "";
        b._infoHeader =
            b._jmolType + ' "' + b._id + '"';
        b._hasOptions = c.addSelectionOptions;
        b._defaultModel = c.defaultModel;
        b._readyScript = c.script ? c.script : "";
        b._readyFunction = c.readyFunction;
        b._coverImage && !b._deferApplet && (b._readyScript += ";javascript " + f + "._displayCoverImage(false)");
        b._src = c.src
    };
    a._addDefaultInfo = function (b, f) {
        for (var c in f) "undefined" == typeof b[c] && (b[c] = f[c]);
        a._use && (b.use = a._use);
        0 <= b.use.indexOf("SIGNED") && (0 > b.jarFile.indexOf("Signed") && (b.jarFile = b.jarFile.replace(/Applet/, "AppletSigned")), b.use =
            b.use.replace(/SIGNED/, "JAVA"), b.isSigned = !0)
    };
    a._syncedApplets = [];
    a._syncedCommands = [];
    a._syncedReady = [];
    a._syncReady = !1;
    a._isJmolJSVSync = !1;
    a._setReady = function (b) {
        a._syncedReady[b] = 1;
        for (var f = 0, c = 0; c < a._syncedApplets.length; c++) {
            if (a._syncedApplets[c] == b._id) a._syncedApplets[c] = b, a._syncedReady[c] = 1;
            else if (!a._syncedReady[c]) continue;
            f++
        }
        f == a._syncedApplets.length && a._setSyncReady()
    };
    a._setDestroy = function (b) {
        a.featureDetection.allowDestroy && a.$windowOn("beforeunload", function () {
            a._destroy(b)
        })
    };
    a._destroy = function (b) {
        try {
            b._appletPanel && b._appletPanel.destroy();
            b._applet = null;
            a._unsetMouse(b._canvas);
            b._canvas = null;
            for (var f = 0, c = 0; c < a._syncedApplets.length; c++) a._syncedApplets[c] == b && (a._syncedApplets[c] = null), a._syncedApplets[c] && f++;
            0 < f || a._clearVars()
        } catch (e) { }
    };
    a._setSyncReady = function () {
        a._syncReady = !0;
        for (var b = "", f = 0; f < a._syncedApplets.length; f++) a._syncedCommands[f] && (b += "Jmol.script(Jmol._syncedApplets[" + f + "], Jmol._syncedCommands[" + f + "]);");
        setTimeout(b, 50)
    };
    a._mySyncCallback =
        function (b, f) {
            app = a._applets[b];
            if (app._viewSet) a.View.updateFromSync(app, f);
            else {
                if (!a._syncReady || !a._isJmolJSVSync) return 1;
                for (var c = 0; c < a._syncedApplets.length; c++) 0 <= f.indexOf(a._syncedApplets[c]._syncKeyword) && a._syncedApplets[c]._syncScript(f);
                return 0
            }
        };
    a._getElement = function (b, a) {
        return document.getElementById(b._id + "_" + a) || {}
    };
    a._evalJSON = function (b, a) {
        b += "";
        if (!b) return [];
        if ("{" != b.charAt(0)) return 0 <= b.indexOf(" | ") && (b = b.replace(/\ \|\ /g, "\n")), b;
        var c = (new Function("return " + b))();
        return !c ? null : a && void 0 != c[a] ? c[a] : c
    };
    a._sortMessages = function (b) {
        function a(b, c) {
            return b[0] < c[0] ? 1 : b[0] > c[0] ? -1 : 0
        }
        if (!b || "object" != typeof b) return [];
        for (var c = [], e = b.length - 1; 0 <= e; e--)
            for (var d = 0, g = b[e].length; d < g; d++) c[c.length] = b[e][d];
        if (0 != c.length) return c = c.sort(a)
    };
    a._setMouseOwner = function (b, f) {
        null == b || f ? a._mouseOwner = b : a._mouseOwner == b && (a._mouseOwner = null)
    };
    a._jsGetMouseModifiers = function (b) {
        var a = 0;
        switch (b.button) {
            case 0:
                a = 16;
                break;
            case 1:
                a = 8;
                break;
            case 2:
                a = 4
        }
        b.shiftKey && (a += 1);
        b.altKey &&
            (a += 8);
        b.ctrlKey && (a += 2);
        return a
    };
    a._jsGetXY = function (b, f) {
        if (!b.applet._ready || a._touching && 0 > f.type.indexOf("touch")) return !1;
        var c = a.$offset(b.id),
            e, d = f.originalEvent;
        f.pageX || (f.pageX = d.pageX);
        f.pageY || (f.pageY = d.pageY);
        a._mousePageX = f.pageX;
        a._mousePageY = f.pageY;
        d.targetTouches && d.targetTouches[0] ? (e = d.targetTouches[0].pageX - c.left, c = d.targetTouches[0].pageY - c.top) : d.changedTouches ? (e = d.changedTouches[0].pageX - c.left, c = d.changedTouches[0].pageY - c.top) : (e = f.pageX - c.left, c = f.pageY - c.top);
        return void 0 ==
            e ? null : [Math.round(e), Math.round(c), a._jsGetMouseModifiers(f)]
    };
    a._setCursor = function (b, f) {
        if (!b._isJava && !b._readingLocal) {
            var c;
            switch (f) {
                case 1:
                    c = "crosshair";
                    break;
                case 3:
                    c = "wait";
                    a.$setVisible(a.$(b, "waitimage"), !0);
                    break;
                case 8:
                    c = "ns-resize";
                    break;
                case 12:
                    c = "grab";
                    break;
                case 13:
                    c = "move";
                    break;
                default:
                    a.$setVisible(a.$(b, "waitimage"), !1), c = "default"
            }
            b._canvas.style.cursor = c
        }
    };
    a._gestureUpdate = function (b, f) {
        f.stopPropagation();
        f.preventDefault();
        var c = f.originalEvent;
        switch (f.type) {
            case "touchstart":
                a._touching = !0;
                break;
            case "touchend":
                a._touching = !1
        }
        if (!c.touches || 2 != c.touches.length) return !1;
        switch (f.type) {
            case "touchstart":
                b._touches = [
                    [],
                    []
                ];
                break;
            case "touchmove":
                var e = a.$offset(b.id),
                    d = b._touches[0],
                    g = b._touches[1];
                d.push([c.touches[0].pageX - e.left, c.touches[0].pageY - e.top]);
                g.push([c.touches[1].pageX - e.left, c.touches[1].pageY - e.top]);
                c = d.length;
                3 < c && (d.shift(), g.shift());
                2 <= c && b.applet._processGesture(b._touches)
        }
        return !0
    };
    a._jsSetMouse = function (b) {
        var f = function (b) {
            return !b.target || 0 <= ("" + b.target.className).indexOf("swingjs-ui")
        };
        a.$bind(b, "mousedown touchstart", function (c) {
            if (f(c)) return !0;
            a._setMouseOwner(b, !0);
            c.stopPropagation();
            var e = c.target["data-UI"];
            (!e || !e.handleJSEvent(b, 501, c)) && c.preventDefault();
            b.isDragging = !0;
            if ("touchstart" == c.type && a._gestureUpdate(b, c)) return !!e;
            a._setConsoleDiv(b.applet._console);
            var d = a._jsGetXY(b, c);
            d && (2 != c.button && a.Swing.hideMenus(b.applet), b.applet._processEvent(501, d));
            return !!e
        });
        a.$bind(b, "mouseup touchend", function (c) {
            if (f(c)) return !0;
            a._setMouseOwner(null);
            c.stopPropagation();
            var e = c.target["data-UI"];
            (!e || !e.handleJSEvent(b, 502, c)) && c.preventDefault();
            b.isDragging = !1;
            if ("touchend" == c.type && a._gestureUpdate(b, c)) return !!e;
            (c = a._jsGetXY(b, c)) && b.applet._processEvent(502, c);
            return !!e
        });
        a.$bind(b, "mousemove touchmove", function (c) {
            if (f(c)) return !0;
            if (a._mouseOwner && a._mouseOwner != b && a._mouseOwner.isDragging) {
                if (!a._mouseOwner.mouseMove) return !0;
                a._mouseOwner.mouseMove(c);
                return !1
            }
            return a._drag(b, c)
        });
        a._drag = function (b, e) {
            e.stopPropagation();
            e.preventDefault();
            if ("touchmove" ==
                e.type && a._gestureUpdate(b, e)) return !1;
            var f = a._jsGetXY(b, e);
            if (!f) return !1;
            b.isDragging || (f[2] = 0);
            var d = e.target["data-UI"];
            b.isdragging && (!d || d.handleJSEvent(b, 506, e));
            b.applet._processEvent(b.isDragging ? 506 : 503, f);
            return !!d
        };
        a.$bind(b, "DOMMouseScroll mousewheel", function (c) {
            if (f(c)) return !0;
            c.stopPropagation();
            c.preventDefault();
            b.isDragging = !1;
            var e = c.originalEvent,
                e = e.detail ? e.detail : ("mac" == a.featureDetection.os ? 1 : -1) * e.wheelDelta;
            c = a._jsGetMouseModifiers(c);
            b.applet._processEvent(507, [0 > e ?
                -1 : 1, 0, c
            ]);
            return !1
        });
        a.$bind(b, "contextmenu", function () {
            return !1
        });
        a.$bind(b, "mouseout", function (c) {
            if (f(c)) return !0;
            a._mouseOwner && !a._mouseOwner.mouseMove && a._setMouseOwner(null);
            b.applet._appletPanel && b.applet._appletPanel.startHoverWatcher(!1);
            a._jsGetXY(b, c);
            return !1
        });
        a.$bind(b, "mouseenter", function (c) {
            if (f(c)) return !0;
            b.applet._appletPanel && b.applet._appletPanel.startHoverWatcher(!0);
            if (0 === c.buttons || 0 === c.which) {
                b.isDragging = !1;
                c = a._jsGetXY(b, c);
                if (!c) return !1;
                b.applet._processEvent(504,
                    c);
                b.applet._processEvent(502, c);
                return !1
            }
        });
        a.$bind(b, "mousemoveoutjsmol", function (c, e, d) {
            if (f(d)) return !0;
            if (b == a._mouseOwner && b.isDragging) return a._drag(b, d)
        });
        b.applet._is2D && a.$resize(function () {
            b.applet && b.applet._resize()
        });
        a.$bind("body", "mouseup touchend", function (c) {
            if (f(c)) return !0;
            b.applet && (b.isDragging = !1);
            a._setMouseOwner(null)
        })
    };
    a._jsUnsetMouse = function (b) {
        b.applet = null;
        a.$bind(b, "mousedown touchstart mousemove touchmove mouseup touchend DOMMouseScroll mousewheel contextmenu mouseout mouseenter",
            null);
        a._setMouseOwner(null)
    };
    a.Swing = {
        count: 0,
        menuInitialized: 0,
        menuCounter: 0,
        htDialogs: {}
    };
    var k = a.Swing;
    SwingController = k;
    k.setDraggable = function (b) {
        b = b.prototype;
        b.setContainer || (b.setContainer = function (b) {
            this.container = b;
            b.obj = this;
            this.ignoreMouse = this.isDragging = !1;
            var c = this;
            b.bind("mousedown touchstart", function (b) {
                if (c.ignoreMouse) return c.ignoreMouse = !1, !0;
                a._setMouseOwner(c, !0);
                c.isDragging = !0;
                c.pageX = b.pageX;
                c.pageY = b.pageY;
                return !1
            });
            b.bind("mousemove touchmove", function (b) {
                if (c.isDragging &&
                    a._mouseOwner == c) return c.mouseMove(b), !1
            });
            b.bind("mouseup touchend", function (b) {
                c.mouseUp(b);
                a._setMouseOwner(null)
            })
        }, b.mouseUp = function (b) {
            if (this.isDragging && a._mouseOwner == this) return this.pageX0 += b.pageX - this.pageX, this.pageY0 += b.pageY - this.pageY, this.isDragging = !1;
            a._setMouseOwner(null)
        }, b.setPosition = function () {
            if (null === a._mousePageX) {
                var b = a.$offset(this.applet._id + "_" + (this.applet._is2D ? "canvas2d" : "canvas"));
                a._mousePageX = b.left;
                a._mousePageY = b.top
            }
            this.pageX0 = a._mousePageX;
            this.pageY0 =
                a._mousePageY;
            this.container.css({
                top: a._mousePageY + "px",
                left: a._mousePageX + "px"
            })
        }, b.mouseMove = function (b) {
            if (this.isDragging && a._mouseOwner == this) {
                this.timestamp = System.currentTimeMillis();
                var c = this.pageX0 + (b.pageX - this.pageX);
                b = this.pageY0 + (b.pageY - this.pageY);
                a._mousePageX = c;
                a._mousePageY = b;
                this.container.css({
                    top: b + "px",
                    left: c + "px"
                })
            }
        }, b.dragBind = function (b) {
            this.applet._ignoreMouse = !b;
            this.container.unbind("mousemoveoutjsmol");
            this.container.unbind("touchmoveoutjsmol");
            this.container.unbind("mouseupoutjsmol");
            this.container.unbind("touchendoutjsmol");
            a._setMouseOwner(null);
            if (b) {
                var c = this;
                this.container.bind("mousemoveoutjsmol touchmoveoutjsmol", function (b, a, e) {
                    c.mouseMove(e)
                });
                this.container.bind("mouseupoutjsmol touchendoutjsmol", function (b, a, e) {
                    c.mouseUp(e)
                })
            }
        })
    };
    k.JSDialog = function () { };
    k.setDraggable(k.JSDialog);
    k.getScreenDimensions = function (b) {
        b.width = h(window).width();
        b.height = h(window).height()
    };
    k.dispose = function (b) {
        a.$remove(b.id + "_mover");
        delete k.htDialogs[b.id];
        b.container.obj.dragBind(!1)
    };
    k.register = function (b, a) {
        b.id = a + ++k.count;
        k.htDialogs[b.id] = b
    };
    k.setDialog = function (b) {
        a._setMouseOwner(null);
        a.$remove(b.id);
        var e = b.id + "_mover",
            c = a._$(e),
            d;
        c[0] ? (c.html(b.html), d = c[0].jd) : (a.$after("body", "<div id='" + e + "' style='position:absolute;left:0px;top:0px;'>" + b.html + "</div>"), d = new k.JSDialog, c = a._$(e), b.container = c, d.applet = b.manager.vwr.html5Applet, d.setContainer(c), d.dialog = b, d.setPosition(), d.dragBind(!0), c[0].jd = d);
        a.$bind("#" + b.id + " .JButton", "mousedown touchstart", function () {
            d.ignoreMouse = !0
        });
        a.$bind("#" + b.id + " .JComboBox", "mousedown touchstart", function () {
            d.ignoreMouse = !0
        });
        a.$bind("#" + b.id + " .JCheckBox", "mousedown touchstart", function () {
            d.ignoreMouse = !0
        });
        a.$bind("#" + b.id + " .JTextField", "mousedown touchstart", function () {
            d.ignoreMouse = !0
        });
        a.$bind("#" + b.id + " .JTable", "mousedown touchstart", function () {
            d.ignoreMouse = !0
        });
        a.$bind("#" + b.id + " .JScrollPane", "mousedown touchstart", function () {
            d.ignoreMouse = !0
        });
        a.$bind("#" + b.id + " .JEditorPane", "mousedown touchstart", function () {
            d.ignoreMouse = !0
        })
    };
    k.setSelected = function (b) {
        a.$prop(b.id, "checked", !!b.selected)
    };
    k.setSelectedIndex = function (b) {
        a.$prop(b.id, "selectedIndex", b.selectedIndex)
    };
    k.setText = function (b) {
        a.$prop(b.id, "value", b.text)
    };
    k.setVisible = function (b) {
        a.$setVisible(b.id, b._visible)
    };
    k.setEnabled = function (b) {
        a.$setEnabled(b.id, b.enabled)
    };
    k.click = function (b, e) {
        var c = k.htDialogs[b.id];
        if (c) {
            var d = c.toString();
            if (0 <= d.indexOf("JCheck")) c.selected = b.checked;
            else if (0 <= d.indexOf("JCombo")) c.selectedIndex = b.selectedIndex;
            else if (null !=
                c.text && (c.text = b.value, e && 13 != (e.charCode || e.keyCode))) return
        }
        d = k.htDialogs[a.$getAncestorDiv(b.id, "JDialog").id];
        d.manager.actionPerformed(c ? c.name : d.registryKey + "/" + b.id)
    };
    k.setFront = function (b) {
        var e = b.manager.vwr.html5Applet;
        b.zIndex != a._getZ(e, "dialog") && (b.zIndex = a._incrZ(e, "dialog"));
        b.container && ((b.container[0] || b.container).style.zIndex = b.zIndex)
    };
    k.hideMenus = function (b) {
        if (b = b._menus)
            for (var a in b) b[a]._visible && k.hideMenu(b[a])
    };
    k.windowClosing = function (b) {
        b = k.htDialogs[a.$getAncestorDiv(b.id,
            "JDialog").id];
        b.registryKey ? b.manager.processWindowClosing(b.registryKey) : b.dispose()
    };
    a._track = function (b) {
        if (a._tracker) {
            try {
                var e = '<iframe style="display:none" width="0" height="0" frameborder="0" tabindex="-1" src="' + (a._tracker + "&applet=" + b._jmolType + "&version=" + a._version + "&appver=" + a.___JmolVersion + "&url=" + encodeURIComponent(document.location.href)) + '"></iframe>';
                a.$after("body", e)
            } catch (c) { }
            delete a._tracker
        }
        return b
    };
    var m;
    a.getProfile = function (b) {
        if (self.Clazz && self.JSON) return m || Clazz._startProfiling(m =
            0 == arguments.length || b), Clazz.getProfile()
    };
    a._getInChIKey = function (b, a) {
        0 <= a.indexOf("MOL=") && a.split("MOL=")[1].split('"')
    };
    a._getAttr = function (b, a) {
        var e = b.indexOf(a + "=");
        return 0 <= e && 0 <= (e = b.indexOf('"', e)) ? b.substring(e + 1, b.indexOf('"', e + 1)) : null
    };
    a.User = {
        viewUpdatedCallback: null
    };
    a.View = {
        count: 0,
        applets: {},
        sets: {}
    };
    (function (b) {
        b.resetView = function (b, e) {
            debugger;
            if (e) {
                if (e._viewSet) {
                    var d = a.View.applets[e._viewSet];
                    for (b in d) b != e && a.View.resetView(b)
                }
            } else b && (b._reset(), a.View.updateView(b))
        };
        b.updateView = function (e, c) {
            if (null != e._viewSet) {
                c || (c = {});
                c.chemID || (e._searchQuery = null);
                c.data || (c.data = "N/A");
                c.type = e._viewType;
                if (null == (e._currentView = b.__findView(e._viewSet, c))) e._currentView = b.__createViewSet(e._viewSet, c.chemID, c.viewID || c.chemID);
                e._currentView[c.type].data = c.data;
                e._currentView[c.type].smiles = e._getSmiles();
                a.User.viewUpdatedCallback && a.User.viewUpdatedCallback(e, "updateView");
                b.__setView(e._currentView, e, !1)
            }
        };
        b.updateFromSync = function (e, c) {
            e._updateMsg = c;
            var d = a._getAttr(c,
                "sourceID") || a._getAttr(c, "file");
            if (d) {
                var g = b.__findView(e._viewSet, {
                    viewID: d
                });
                if (null == g) return a.updateView(e, c);
                g != e._currentView && b.__setView(g, e, !0);
                var h = (d = a._getAttr(c, "atoms")) && 0 <= c.indexOf("selectionhalos ON") ? eval("[" + d + "]") : [];
                setTimeout(function () {
                    e._currentView == g && b.updateAtomPick(e, h)
                }, 10);
                a.User.viewUpdatedCallback && a.User.viewUpdatedCallback(e, "updateFromSync")
            }
        };
        b.updateAtomPick = function (b, e) {
            var d = b._currentView;
            if (null != d) {
                for (var g in d) "info" != g && d[g].applet != b && d[g].applet._updateAtomPick(e);
                a.User.viewUpdatedCallback && a.User.viewUpdatedCallback(b, "updateAtomPick")
            }
        };
        b.dumpViews = function (a) {
            var e = b.sets[a];
            if (e) {
                var d = "View set " + a + ":\n";
                a = b.applets[a];
                for (var g in a) d += "\napplet " + a[g]._id + " currentView=" + (a[g]._currentView ? a[g]._currentView.info.viewID : null);
                for (g = e.length; 0 <= --g;) {
                    a = e[g];
                    var d = d + ("\n\n<b>view=" + g + " viewID=" + a.info.viewID + " chemID=" + a.info.chemID + "</b>\n"),
                        h, l;
                    for (l in a) "info" != l && (d += "\nview=" + g + " type=" + l + " applet=" + ((h = a[l]).applet ? h.applet._id : null) + " SMILES=" +
                        h.smiles + "\n atomMap=" + JSON.stringify(h.atomMap) + "\n data=\n" + h.data + "\n")
                }
                return d
            }
        };
        b.__init = function (a) {
            var e = a._viewSet,
                d = b.applets;
            d[e] || (d[e] = {});
            d[e][a._viewType] = a
        };
        b.__findView = function (a, e) {
            var d = b.sets[a];
            null == d && (d = b.sets[a] = []);
            for (var g = d.length; 0 <= --g;) {
                var h = d[g];
                if (e.viewID) {
                    if (h.info.viewID == e.viewID) return h
                } else {
                    if (null != e.chemID && e.chemID == h.info.chemID) return h;
                    for (var l in h)
                        if ("info" != l && (null != e.data && null != h[l].data ? e.data == h[l].data : e.type == l)) return h
                }
            }
            return null
        };
        b.__createViewSet =
            function (e, c, d) {
                b.count++;
                c = {
                    info: {
                        chemID: c,
                        viewID: d || "model_" + b.count
                    }
                };
                for (var g in a._applets) d = a._applets[g], d._viewSet == e && (c[d._viewType] = {
                    applet: d,
                    data: null
                });
                b.sets[e].push(c);
                return c
            };
        b.__setView = function (b, a, e) {
            for (var d in b)
                if ("info" != d) {
                    var g = b[d],
                        h = g.applet,
                        l = e || null != h && "<modified>" == h._molData;
                    if (!(null == h || h == a && !l)) {
                        var j = null == g.data,
                            k = null != h._currentView;
                        h._currentView = b;
                        if (!k || !(b[d].data == g.data && !j & !l))
                            if (h._loadModelFromView(b), j) break
                    }
                }
        }
    })(a.View);
    a.Cache = {
        fileCache: {}
    };
    a.Cache.get = function (b) {
        return a.Cache.fileCache[b]
    };
    a.Cache.put = function (b, e) {
        a.Cache.fileCache[b] = e
    };
    a.Cache.setDragDrop = function (b) {
        a.$appEvent(b, "appletdiv", "dragover", function (b) {
            b = b.originalEvent;
            b.stopPropagation();
            b.preventDefault();
            b.dataTransfer.dropEffect = "copy"
        });
        a.$appEvent(b, "appletdiv", "drop", function (e) {
            var c = e.originalEvent;
            c.stopPropagation();
            c.preventDefault();
            var d = c.dataTransfer.files[0];
            if (null == d) try {
                d = "" + c.dataTransfer.getData("text"), (0 == d.indexOf("file:/") || 0 == d.indexOf("http:/") ||
                    0 == d.indexOf("https:/")) && b._scriptLoad(d)
            } catch (g) { } else c = new FileReader, c.onloadend = function (c) {
                if (c.target.readyState == FileReader.DONE) {
                    var g = "cache://DROP_" + d.name;
                    c = Clazz.newByteArray(-1, c.target.result);
                    g.endsWith(".spt") || b._appletPanel.cacheFileByName("cache://DROP_*", !1);
                    "JSV" == b._viewType || g.endsWith(".jdx") ? a.Cache.put(g, c) : b._appletPanel.cachePut(g, c);
                    (c = a._jsGetXY(b._canvas, e)) && (!b._appletPanel.setStatusDragDropped || b._appletPanel.setStatusDragDropped(0, c[0], c[1], g)) && b._appletPanel.openFileAsyncSpecial(g,
                        1)
                }
            }, c.readAsArrayBuffer(d)
        })
    }
})(Jmol, jQuery);
Jmol._debugCode = !1;
Jmol._grabberOptions = [
    ["$", "NCI(small molecules)"],
    [":", "PubChem(small molecules)"]
];
Jmol.say = function (a) {
    
};
Jmol._TMApplet = function (a, h, e) {
    this._uniqueId = ("" + Math.random()).substring(3);
    this._id = a;
    this._is2D = !0;
    this._isJava = !1;
    this._ready = !0;
    this._mouseDown = !1;
    this._jmolType = "Jmol._Canvas2D (TwirlyMol)";
    if (e) return this;
    this._createCanvas(a, h);
    return this
};
Jmol._TMApplet._getApplet = function (a, h, e) {
    if (!Jmol.featureDetection.allowHTML5) return null;
    e || (e = !1);
    h || (h = {});
    Jmol._addDefaultInfo(h, {
        color: "white",
        width: 300,
        height: 300,
        addSelectionOptions: !1,
        serverURL: "http://your.server.here/jsmol.php",
        defaultModel: "",
        readyFunction: null,
        use: "HTML5",
        bondWidth: 5,
        shadeAtoms: !1,
        zoomScaling: 1.5,
        pinchScaling: 2,
        mouseDragFactor: 0.5,
        touchDragFactor: 0.15,
        multipleBondSpacing: 4,
        spinRateX: 0,
        spinRateY: 0.5,
        spinFPS: 20,
        spin: !1,
        noscript: !0,
        debug: !1
    });
    h = new Jmol._TMApplet(a, h,
        e);
    return e ? h : Jmol._registerApplet(a, h)
};
Jmol.getTMApplet = Jmol._TMApplet._getApplet;
(function (a) {
    a._CPK = "#FF1493 #F5f5f5 #D9FFFF #CC80FF #C2FF00 #FFB5B5 #909090 #3050F8 #FF0D0D #90E050 #B3E3F5 #AB5CF2 #8AFF00 #BFA6A6 #F0C8A0 #FF8000 #FFFF30 #1FF01F #80D1E3 #8F40D4 #3DFF00 #E6E6E6 #BFC2C7 #A6A6AB #8A99C7 #9C7AC7 #E06633 #F090A0 #50D050 #C88033 #7D80B0 #C28F8F #668F8F #BD80E3 #FFA100 #A62929 #5CB8D1 #702EB0 #00FF00 #94FFFF #94E0E0 #73C2C9 #54B5B5 #3B9E9E #248F8F #0A7D8C #006985 #C0C0C0 #FFD98F #A67573 #668080 #9E63B5 #D47A00 #940094 #429EB0 #57178F #00C900".split(" ");
    a._elem = "X H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es".split(" ");
    a._elemNo = {};
    var h = a.prototype;
    h.spin = function (a) {
        this.__Info.spin = a;
        this._spin(a)
    };
    h._spin = function (a) {
        this._spinThread && clearTimeout(this._spinThread);
        if (0 == this.spinFPS || 0 == this.spinRateX && 0 == this.spinRateY) a = !1;
        if (a) {
            var d = this;
            a = 1E3 / this.spinFPS;
            this._mouseDown || (this._rotate(this.spinRateY, this.spinRateX), this._draw());
            this._spinThread = setTimeout(function () {
                d._spin(!0)
            }, a)
        }
    };
    h._initParams = function () {
        this.zoom = this.__Info.defaultZoom || 100;
        this.doSpin = this.__Info.spin || !1;
        this.center2D = [this._canvas.width /
            2, this._canvas.height / 2, 0
        ];
        this._getCenterAndRadius();
        this.rotation = new a.M3;
        this.shadeAtoms = !1;
        this._setParams()
    };
    h._setParams = function () {
        this.bondWidth = this.__Info.bondWidth || 5;
        this.zoomScaling = this.__Info.zoomScaling || 1.5;
        this.pinchScaling = this.__Info.pinchScaling || 1;
        this.mouseDragFactor = this.__Info.mouseDragFactor || 0.5;
        this.touchDragFactor = this.__Info.touchDragFactor || 0.15;
        this.multipleBondSpacing = this.__Info.multipleBondSpacing || 4;
        this.spinRateX = this.__Info.spinRateX || 0;
        this.spinRateY = this.__Info.spinRateY ||
            0;
        this.spinFPS = this.__Info.spinFPS || 0;
        var a = this.shadeAtoms;
        (this.shadeAtoms = this.__Info.shadeAtoms || !1) && !a && this._setAtomShades()
    };
    h._setAtomShades = function () {
        if (this.atoms)
            for (var a = this.atoms.length; 0 <= --a;) this.atoms[a].color50 = this._getColor(this.atoms[a].color, 0.5)
    };
    h._createCanvas = function (a, d) {
        Jmol._setObject(this, a, d);
        this._color = this._color.replace(/0x/, "#");
        var g = Jmol._getWrapper(this, !0);
        Jmol._document ? (Jmol._documentWrite(g), this._createCanvas2d(!1), g = "") : g += '<script type="text/javascript">' +
            a + "._createCanvas2d(false)\x3c/script>";
        g += Jmol._getWrapper(this, !1);
        d.addSelectionOptions && (g += Jmol._getGrabberOptions(this, ""));
        Jmol._debugAlert && !Jmol._document;
        this._code = Jmol._documentWrite(g)
    };
    h._createCanvas2d = function (a) {
        var d = document.createElement("canvas"),
            g = Jmol.$(this, "appletdiv");
        a && (g[0].removeChild(this._canvas), Jmol._jsUnsetMouse(this._canvas));
        a = Math.round(g.width());
        var h = Math.round(g.height());
        d.applet = this;
        this._canvas = d;
        d.style.width = "100%";
        d.style.height = "100%";
        d.width =
            a;
        d.height = h;
        d.id = this._id + "_canvas2d";
        g.append(d);
        setTimeout(this._id + "._start()", 10)
    };
    h._start = function () {
        Jmol._jsSetMouse(this._canvas);
        this._defaultModel ? Jmol._search(this, this._defaultModel, this._readyScript ? this._readyScript : "") : this._src && this._loadFile(this._src);
        this._showInfo(!0);
        this._showInfo(!1)
    };
    h._search = function (a, d) {
        Jmol._search(this, a, d)
    };
    h._searchDatabase = function (a, d, g) {
        this._showInfo(!1);
        0 <= a.indexOf("?") ? Jmol._getInfoFromDatabase(this, d, a.split("?")[0]) : this._loadFile(d + a, g)
    };
    h.__loadModel = function (a) {
        this._spin(!1);
        "''" == a && (a = this._mol);
        a ? (this._parse(a), this._initParams(), this._draw(), this._showInfo(!1), this.doSpin && this._spin(!0)) : ''
    };
    h._showInfo = function (a) {
        Jmol.$html(Jmol.$(this, "infoheaderspan"), this._infoHeader);
        this._info && Jmol.$html(Jmol.$(this, "infodiv"), this._info);
        !this._isInfoVisible != !a && (this._isInfoVisible = a, Jmol.$setVisible(Jmol.$(this, "infotablediv"), a), Jmol.$setVisible(Jmol.$(this, "infoheaderdiv"), a), this._show(!a))
    };
    h._show = function (a) {
        Jmol.$setVisible(Jmol.$(this,
            "appletdiv"), a);
        a && this._draw()
    };
    h._resize = function () {
        var a = "__resizeTimeout_" + this._id;
        Jmol[a] && clearTimeout(Jmol[a]);
        var d = this;
        Jmol[a] = setTimeout(function () {
            d._draw();
            Jmol[a] = null
        }, 100)
    };
    h._canScript = function () {
        return !0
    };
    h._script = function (a) {
        for (var d = a.split(";"), g = 0; g < d.length; g++) a = d[g].trim(), "image" == a ? window.open(this._canvas.toDataURL("image/png")) : 0 == a.indexOf("load ") ? this._loadFile(a.substring(5).trim()) : 0 == a.indexOf("spin ") && this.spin(0 > a.toLowerCase().indexOf("off"))
    };
    h._loadFile =
        function (a) {
            this._showInfo(!1);
            this._thisJmolModel = a;
            var d = this;
            Jmol._loadFileData(this, a, function (a) {
                d.__loadModel(a)
            })
        };
    h._processEvent = function (a, d) {
        switch (a) {
            case 502:
            case 503:
                this._mouseDown = !1;
            default:
                return;
            case 501:
                this._mouseX = d[0];
                this._mouseY = d[1];
                this._mouseDown = !0;
                return;
            case 506:
                var g = d[0] - this._mouseX,
                    h = d[1] - this._mouseY,
                    g = 0 > g ? -1 : 0 < g ? 1 : 0,
                    h = 0 > h ? -1 : 0 < h ? 1 : 0;
                switch (d[2]) {
                    case 17:
                        this._zoomBy(h);
                        break;
                    case 24:
                        this.center2D[0] += g;
                        this.center2D[1] += h;
                        break;
                    default:
                        this._rotate(g, h)
                }
                this._mouseX =
                    d[0];
                this._mouseY = d[1];
                break;
            case -1:
                this._zoomBy(d[1])
        }
        this._draw()
    };
    h._processGesture = function (e) {
        if (!(2 > e[0].length)) {
            var d = e[0],
                g = e[1],
                h = d[0],
                j = d[g.length - 1];
            e = h[0];
            var k = j[0],
                h = h[1],
                j = j[1],
                m = [k - e, j - h, 0],
                b = a._length(m),
                f = g[0],
                c = g[g.length - 1],
                g = f[0],
                q = c[0],
                f = f[1],
                c = c[1],
                p = [q - g, c - f, 0],
                r = a._length(p);
            3 > b || 3 > r || (a._scale(m, 1 / b), a._scale(p, 1 / r), m = a._dot(m, p), 0.8 < m ? (e = Math.round(k - d[d.length - 2][0]), d = Math.round(j - d[d.length - 2][1]), this.center2D[0] += e, this.center2D[1] += d) : -0.8 > m && (m = [g - e, f - h, 0], p = [q -
                k, c - j, 0
            ], d = a._length(p) - a._length(m), this.zoom += (0 > d ? -1 : 1) * this.pinchScaling), this._draw())
        }
    };
    h._zoomBy = function (a) {
        this.zoom += a * this.zoomScaling;
        5 > this.zoom && (this.zoom = 5);
        500 < this.zoom && (this.zoom = 500)
    };
    h._getRotationScaling = function () {
        return [1 / Math.max(this._canvas.width, 500) * this.mouseDragFactor * a.deg_per_radian, 1 / Math.max(this._canvas.height, 500) * this.mouseDragFactor * a.deg_per_radian]
    };
    h._rotate = function (e, d) {
        var g = this._getRotationScaling();
        d && (a._m3.rotX(d * g[1]), this.rotation.mul(a._m3));
        e &&
            (a._m3.rotY(e * g[0]), this.rotation.mul(a._m3))
    };
    h._getCenterAndRadius = function () {
        Math.min(this._canvas.width, this._canvas.height);
        for (var e = [999999, 999999, 999999], d = [-999999, -999999, -999999], g = this.atoms.length; 0 <= --g;)
            for (var h = 3; 0 <= --h;) {
                var j = this.atoms[g].xyz[h];
                j < e[h] && (e[h] = j);
                j > d[h] && (d[h] = j)
            }
        j = [0, 0, 0];
        for (h = 3; 0 <= --h;) j[h] = (d[h] + e[h]) / 2;
        e = 0;
        for (g = this.atoms.length; 0 <= --g;) d = this.atoms[g], d = a._distance(d.xyz, j) + (1 == d.elemNo ? 1 : 1.5), d > e && (e = d);
        this.center = j;
        this.modelRadius = 0 == e ? 10 : e
    };
    h._setScreenCoords =
        function () {
            for (var a = this.center, d = this.rotation, g = this.center2D, h = Math.min(this._canvas.width, this._canvas.height) / 2 / this.modelRadius * this.zoom / 100, j = this.atoms.length; 0 <= --j;) {
                var k = this.atoms[j];
                this._transform(k.xyz, k.sxyz, a, d, h, g);
                k.srad = h * k.radius
            }
            for (j = this.bonds.length; 0 <= --j;) k = this.bonds[j], this._transform(k.xyz, k.sxyz, a, d, h, g), this._transform(k.pts[0], k.spts[0], a, d, h, g), this._transform(k.pts[1], k.spts[1], a, d, h, g)
        };
    h._transform = function (e, d, g, h, j, k) {
        for (var m = a._temp1, b = a._temp2, f = 3; 0 <=
            --f;) m[f] = (e[f] - g[f]) * j;
        h.transform(m, b);
        b[1] = -b[1];
        b[2] = -b[2];
        for (f = 3; 0 <= --f;) d[f] = b[f] + k[f]
    };
    h._parse = function (a) {
        this._parseSDF(a)
    };
    h._parseSDF = function (e) {
        this._mol = e;
        if (!a._elemNo.H)
            for (var d = a._elem.length; 0 <= --d;) a._elemNo[a._elem[d]] = d;
        e = e.split("\n");
        var g = 3,
            h = e[g++];
        this.nAtoms = parseFloat(h.substring(0, 3));
        this.nBonds = parseFloat(h.substring(3, 6));
        this.atoms = Array(this.nAtoms);
        this.bonds = Array(this.nBonds);
        this.elements = Array(this.nAtoms + this.nBonds);
        for (var j = 0, k, m, b, d = 0; d < this.nAtoms; d++) {
            h =
                e[g++];
            k = parseFloat(h.substring(0, 10));
            m = parseFloat(h.substring(10, 20));
            b = parseFloat(h.substring(20, 30));
            var h = h.substring(31, 34).replace(/\s+/g, ""),
                h = a._elemNo[h] || 0,
                f = 1 == h ? 0.23 : 0.35,
                c = a._CPK[h] || a._CPK[0];
            this.elements[j++] = this.atoms[d] = {
                type: 0,
                elemNo: h,
                xyz: [k, m, b],
                sxyz: [0, 0, 0],
                radius: f,
                color: c,
                color50: c
            }
        }
        for (d = 0; d < this.nBonds; d++) {
            h = e[g++];
            k = this.atoms[parseFloat(h.substring(0, 3)) - 1];
            m = this.atoms[parseFloat(h.substring(3, 6)) - 1];
            b = Math.abs(parseFloat(h.substring(6, 9)));
            switch (b) {
                case 4:
                case 5:
                case 6:
                case 8:
                    b =
                        1;
                    break;
                case 7:
                    b = 2
            }
            h = a._getPointAlong(k.xyz, m.xyz, 0.5);
            c = a._distance(k.xyz, h);
            f = k.radius < c ? a._getPointAlong(k.xyz, h, k.radius / c) : [0, 0, 99999];
            c = m.radius < c ? a._getPointAlong(m.xyz, h, m.radius / c) : [0, 0, 99999];
            this.elements[j++] = this.bonds[d] = {
                type: 1,
                atoms: [k, m],
                xyz: h,
                pts: [f, c],
                sxyz: [0, 0, 0],
                spts: [
                    [0, 0, 0],
                    [0, 0, 0]
                ],
                order: b,
                color: 0
            }
        }
    };
    h._getColor = function (a, d) {
        "#FFFFFF" == a && (a = "#D0D0D0");
        var g = parseInt("0x" + a.substring(1), 16),
            h = g >> 16 & 255,
            j = g >> 8 & 255,
            g = g & 255;
        255 != h && (h += Math.floor((255 - h) * d));
        255 != j && (j += Math.floor((255 -
            j) * d));
        255 != g && (g += Math.floor((255 - g) * d));
        h = "000000" + (h << 16 | j << 8 | g).toString(16);
        return "#" + h.substring(h.length - 6, h.length)
    };
    h._draw = function () {
        if (this.atoms) {
            this._setParams();
            this._setScreenCoords();
            var e = this.elements;
            e.sort(a._zorder);
            var d = this._canvas.getContext("2d");
            d.fillStyle = this._color;
            d.fillRect(0, 0, this._canvas.width, this._canvas.height);
            for (var g = e.length; 0 <= --g;) {
                var h = e[g];
                0 == h.type ? this._drawAtom(d, h) : this._drawBond(d, h)
            }
        }
    };
    h._drawAtom = function (e, d) {
        e.beginPath();
        if (this.shadeAtoms) {
            var g =
                d.srad / 4,
                g = e.createRadialGradient(d.sxyz[0] - g, d.sxyz[1] - g, g, d.sxyz[0], d.sxyz[1], d.srad);
            g.addColorStop(0, d.color50);
            g.addColorStop(1, "#FFFFFF" == d.color ? "#D0D0D0" : d.color);
            e.fillStyle = g;
            e.arc(d.sxyz[0], d.sxyz[1], d.srad, 0, a._pi2);
            e.fill()
        } else e.fillStyle = d.color, e.arc(d.sxyz[0], d.sxyz[1], d.srad, 0, a._pi2), e.fill(), e.strokeStyle = "#000000", e.lineWidth = 1, e.stroke()
    };
    h._drawBond = function (a, d) {
        99999 != d.pts[0][2] && this._drawBondLines(a, d, d.spts[0], d.atoms[0].color);
        99999 != d.pts[1][2] && this._drawBondLines(a,
            d, d.spts[1], d.atoms[1].color)
    };
    h._drawBondLines = function (e, d, g, h) {
        var j = a._temp;
        j.width = this.bondWidth;
        j.color = d.color ? d.color : h;
        if (1 == d.order) j.pt1 = g, j.pt2 = d.sxyz, this._drawLine(e, j);
        else {
            j.pt1 = a._temp1;
            j.pt2 = a._temp2;
            j.pta = g;
            j.ptb = d.sxyz;
            j.dx = j.ptb[0] - j.pta[0];
            j.dy = j.ptb[1] - j.pta[1];
            j.mag2d = Math.round(Math.sqrt(j.dx * j.dx + j.dy * j.dy));
            j.bondOrder = d.order;
            for (this._resetAxisCoordinates(j); 0 < j.bondOrder;) this._drawLine(e, j), j.bondOrder-- , this._stepAxisCoordinates(j)
        }
    };
    h._drawLine = function (a, d) {
        a.beginPath();
        a.strokeStyle = d.color;
        a.moveTo(d.pt1[0], d.pt1[1]);
        a.lineTo(d.pt2[0], d.pt2[1]);
        a.lineWidth = d.width;
        a.stroke()
    };
    h._resetAxisCoordinates = function (a) {
        var d = a.mag2d >> 3;
        1 != this.multipleBondSpacing && (d *= this.multipleBondSpacing);
        d = a.width + d;
        a.dxStep = Math.round(d * a.dy / a.mag2d);
        a.dyStep = Math.round(d * -a.dx / a.mag2d);
        a.pt1[0] = a.pta[0];
        a.pt1[1] = a.pta[1];
        a.pt2[0] = a.ptb[0];
        a.pt2[1] = a.ptb[1];
        d = a.bondOrder - 1;
        a.pt1[0] -= Math.round(a.dxStep * d / 2);
        a.pt1[1] -= Math.round(a.dyStep * d / 2);
        a.pt2[0] -= Math.round(a.dxStep * d / 2);
        a.pt2[1] -=
            Math.round(a.dyStep * d / 2)
    };
    h._stepAxisCoordinates = function (a) {
        a.pt1[0] += a.dxStep;
        a.pt1[1] += a.dyStep;
        a.pt2[0] += a.dxStep;
        a.pt2[1] += a.dyStep
    };
    a._distance = function (a, d) {
        for (var g = 0, h = 3; 0 <= --h;) var j = a[h] - d[h],
            g = g + j * j;
        return Math.sqrt(g)
    };
    a._dot = function (a, d) {
        for (var g = 0, h = 3; 0 <= --h;) g += a[h] * d[h];
        return g
    };
    a._setPt = function (a, d) {
        for (var g = 3; 0 <= --g;) d[g] = a[g];
        return d
    };
    a._scale = function (a, d) {
        for (var g = 3; 0 <= --g;) a[g] *= d
    };
    a._length = function (a) {
        for (var d = 0, g = 3; 0 <= --g;) d += a[g] * a[g];
        return Math.sqrt(d)
    };
    a._getPointAlong =
        function (a, d, g) {
            return [(d[0] - a[0]) * g + a[0], (d[1] - a[1]) * g + a[1], (d[2] - a[2]) * g + a[2]]
        };
    a._zorder = function (a, d) {
        var g = a.sxyz[2],
            h = d.sxyz[2];
        return g < h ? -1 : g > h ? 1 : 0
    };
    a.M3 = function () {
        this.m00 = 1;
        this.m10 = this.m02 = this.m01 = 0;
        this.m11 = 1;
        this.m21 = this.m20 = this.m12 = 0;
        this.m22 = 1
    };
    a.M3.prototype.set = function (a, d, g, h, j, k, m, b, f) {
        this.m00 = a;
        this.m01 = d;
        this.m02 = g;
        this.m10 = h;
        this.m11 = j;
        this.m12 = k;
        this.m20 = m;
        this.m21 = b;
        this.m22 = f
    };
    a.M3.prototype.transform = function (a, d) {
        d[0] = this.m00 * a[0] + this.m01 * a[1] + this.m02 * a[2];
        d[1] =
            this.m10 * a[0] + this.m11 * a[1] + this.m12 * a[2];
        d[2] = this.m20 * a[0] + this.m21 * a[1] + this.m22 * a[2]
    };
    a.M3.prototype.rotX = function (a) {
        var d = Math.cos(a);
        a = Math.sin(a);
        this.m00 = 1;
        this.m10 = this.m02 = this.m01 = 0;
        this.m11 = d;
        this.m12 = -a;
        this.m20 = 0;
        this.m21 = a;
        this.m22 = d
    };
    a.M3.prototype.rotY = function (a) {
        var d = Math.cos(a);
        a = Math.sin(a);
        this.m00 = d;
        this.m01 = 0;
        this.m02 = a;
        this.m10 = 0;
        this.m11 = 1;
        this.m12 = 0;
        this.m20 = -a;
        this.m21 = 0;
        this.m22 = d
    };
    a.M3.prototype.mul = function (a) {
        this.set(a.m00 * this.m00 + a.m01 * this.m10 + a.m02 * this.m20,
            a.m00 * this.m01 + a.m01 * this.m11 + a.m02 * this.m21, a.m00 * this.m02 + a.m01 * this.m12 + a.m02 * this.m22, a.m10 * this.m00 + a.m11 * this.m10 + a.m12 * this.m20, a.m10 * this.m01 + a.m11 * this.m11 + a.m12 * this.m21, a.m10 * this.m02 + a.m11 * this.m12 + a.m12 * this.m22, a.m20 * this.m00 + a.m21 * this.m10 + a.m22 * this.m20, a.m20 * this.m01 + a.m21 * this.m11 + a.m22 * this.m21, a.m20 * this.m02 + a.m21 * this.m12 + a.m22 * this.m22)
    };
    a._pi2 = 2 * Math.PI;
    a.deg_per_radian = 180 / Math.PI;
    a._z3 = [0, 0, 0];
    a._temp1 = [0, 0, 0];
    a._temp2 = [0, 0, 0];
    a._temp = {};
    a._m3 = new a.M3
})(Jmol._TMApplet);