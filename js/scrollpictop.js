function ScrollPicTop(e, t, n, r) {
    this.scrollContId = e,
    this.arrLeftId = t,
    this.arrRightId = n,
    this.dotListId = r,
    this.dotClassName = "dotItem",
    this.dotOnClassName = "dotItemOn",
    this.dotObjArr = [],
    this.pageWidth = 0,
    this.frameWidth = 0,
    this.speed = 10,
    this.space = 10,
    this.pageIndex = 0,
    this.autoPlay = !0,
    this.autoPlayTime = 5;
    var i,
    s,
    o = "ready";
    this.stripDiv = document.createElement("DIV"),
    this.listDiv01 = document.createElement("DIV"),
    this.listDiv02 = document.createElement("DIV"),
    ScrollPicTop.childs || (ScrollPicTop.childs = []),
    this.ID = ScrollPicTop.childs.length,
    ScrollPicTop.childs.push(this),
    this.initialize = function() {
        if (!this.scrollContId) throw new Error("必须指定scrollContId.");
        this.scrollContDiv = sina.$(this.scrollContId);
        if (!this.scrollContDiv) throw new Error('scrollContId不是正确的对象.(scrollContId = "' + this.scrollContId + '")');
        this.scrollContDiv.style.width = this.frameWidth + "px",
        this.scrollContDiv.style.overflow = "hidden",
        this.listDiv01.innerHTML = this.listDiv02.innerHTML = this.scrollContDiv.innerHTML,
        this.scrollContDiv.innerHTML = "",
        this.scrollContDiv.appendChild(this.stripDiv),
        this.stripDiv.appendChild(this.listDiv01),
        this.stripDiv.appendChild(this.listDiv02),
        this.stripDiv.style.overflow = "hidden",
        this.stripDiv.style.zoom = "1",
        this.stripDiv.style.height = "32766px";
        var e = navigator.userAgent.toUpperCase().indexOf("MSIE") == -1 ? !1 : !0;
        e ? (this.listDiv01.style.styleFloat = "left", this.listDiv02.style.styleFloat = "left") : (this.listDiv01.style.cssFloat = "left", this.listDiv02.style.cssFloat = "left"),
        sina.addEvent(this.scrollContDiv, "mouseover", Function("ScrollPicTop.childs[" + this.ID + "].stop()")),
        sina.addEvent(this.scrollContDiv, "mouseout", Function("ScrollPicTop.childs[" + this.ID + "].play()")),
        this.arrLeftId && (this.arrLeftObj = sina.$(this.arrLeftId), this.arrLeftObj && (sina.addEvent(this.arrLeftObj, "mousedown", Function("ScrollPicTop.childs[" + this.ID + "].rightMouseDown()")), sina.addEvent(this.arrLeftObj, "mouseup", Function("ScrollPicTop.childs[" + this.ID + "].rightEnd()")), sina.addEvent(this.arrLeftObj, "mouseout", Function("ScrollPicTop.childs[" + this.ID + "].rightEnd()")))),
        this.arrRightId && (this.arrRightObj = sina.$(this.arrRightId), this.arrRightObj && (sina.addEvent(this.arrRightObj, "mousedown", Function("ScrollPicTop.childs[" + this.ID + "].leftMouseDown()")), sina.addEvent(this.arrRightObj, "mouseup", Function("ScrollPicTop.childs[" + this.ID + "].leftEnd()")), sina.addEvent(this.arrRightObj, "mouseout", Function("ScrollPicTop.childs[" + this.ID + "].leftEnd()"))));
        if (this.dotListId) {
            this.dotListObj = sina.$(this.dotListId);
            if (this.dotListObj) {
                var t = Math.round(this.listDiv01.offsetWidth / this.frameWidth + .4),
                n,
                r;
                for (n = 0; n < t; n++) r = document.createElement("span"),
                this.dotListObj.appendChild(r),
                this.dotObjArr.push(r),
                n == this.pageIndex ? r.className = this.dotClassName : r.className = this.dotOnClassName,
                r.title = "第" + (n + 1) + "页",
                sina.addEvent(r, "click", Function("ScrollPicTop.childs[" + this.ID + "].pageTo(" + n + ")"))
            }
        }
        this.autoPlay && this.play()
    },
    this.leftMouseDown = function() {
        if (o != "ready") return;
        o = "floating",
        s = setInterval("ScrollPicTop.childs[" + this.ID + "].moveLeft()", this.speed)
    },
    this.rightMouseDown = function() {
        if (o != "ready") return;
        o = "floating",
        s = setInterval("ScrollPicTop.childs[" + this.ID + "].moveRight()", this.speed)
    },
    this.moveLeft = function() {
        this.scrollContDiv.scrollTop + this.space >= this.listDiv01.scrollWidth ? this.scrollContDiv.scrollTop = this.scrollContDiv.scrollTop + this.space - this.listDiv01.scrollHeight : this.scrollContDiv.scrollTop += this.space,
        this.accountPageIndex()
    },
    this.moveRight = function() {
        this.scrollContDiv.scrollTop - this.space <= 0 ? this.scrollContDiv.scrollTop = this.listDiv01.scrollHeight + this.scrollContDiv.scrollTop - this.space : this.scrollContDiv.scrollTop -= this.space,
        this.accountPageIndex()
    },
    this.leftEnd = function() {
        if (o != "floating") return;
        o = "stoping",
        clearInterval(s);
        var e = this.pageWidth - this.scrollContDiv.scrollTop % this.pageWidth;
        this.move(e)
    },
    this.rightEnd = function() {
        if (o != "floating") return;
        o = "stoping",
        clearInterval(s);
        var e = -this.scrollContDiv.scrollTop % this.pageWidth;
        this.move(e)
    },
    this.move = function(e, t) {
        var n = e / 5;
        t || (n > this.space && (n = this.space), n < -this.space && (n = -this.space)),
        Math.abs(n) < 1 && n != 0 ? n = n >= 0 ? 1 : -1 : n = Math.round(n);
        var r = this.scrollContDiv.scrollTop + n;
        n > 0 ? this.scrollContDiv.scrollTop + n >= this.listDiv01.scrollHeight ? this.scrollContDiv.scrollTop = this.scrollContDiv.scrollTop + n - this.listDiv01.scrollHeight : this.scrollContDiv.scrollTop += n : this.scrollContDiv.scrollTop - n <= 0 ? this.scrollContDiv.scrollTop = this.listDiv01.scrollHeight + this.scrollContDiv.scrollTop - n : this.scrollContDiv.scrollTop += n,
        e -= n;
        if (Math.abs(e) == 0) {
            o = "ready",
            this.autoPlay && this.play(),
            this.accountPageIndex();
            return
        }
        this.accountPageIndex(),
        setTimeout("ScrollPicTop.childs[" + this.ID + "].move(" + e + "," + t + ")", this.speed)
    },
    this.next = function() {
        if (o != "ready") return;
        o = "stoping",
        this.move(this.pageWidth, !0)
    },
    this.play = function() {
        if (!this.autoPlay) return;
        clearInterval(i),
        i = setInterval("ScrollPicTop.childs[" + this.ID + "].next()", this.autoPlayTime * 1e3)
    },
    this.stop = function() {
        clearInterval(i)
    },
    this.pageTo = function(e) {
        if (o != "ready") return;
        o = "stoping";
        var t = e * this.frameWidth - this.scrollContDiv.scrollLeft;
        this.move(t, !0)
    },
    this.accountPageIndex = function() {
        this.pageIndex = Math.round(this.scrollContDiv.scrollLeft / this.frameWidth),
        this.pageIndex > Math.round(this.listDiv01.offsetWidth / this.frameWidth + .4) - 1 && (this.pageIndex = 0);
        var e;
        for (e = 0; e < this.dotObjArr.length; e++) e == this.pageIndex ? this.dotObjArr[e].className = this.dotClassName : this.dotObjArr[e].className = this.dotOnClassName
    }
}
var sina = {
    $: function(objName) {
        return document.getElementById ? eval('document.getElementById("' + objName + '")') : eval("document.all." + objName)
    },
    isIE: navigator.appVersion.indexOf("MSIE") != -1 ? !0 : !1,
    addEvent: function(e, t, n) {
        e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n, !1)
    },
    delEvent: function(e, t, n) {
        e.detachEvent ? e.detachEvent("on" + t, n) : e.removeEventListener(t, n, !1)
    },
    readCookie: function(e) {
        var t = "",
        n = e + "=";
        if (document.cookie.length > 0) {
            var r = document.cookie.indexOf(n);
            if (r != -1) {
                r += n.length;
                var i = document.cookie.indexOf(";", r);
                i == -1 && (i = document.cookie.length),
                t = unescape(document.cookie.substring(r, i))
            }
        }
        return t
    },
    writeCookie: function(e, t, n, r) {
        var i = "",
        s = "";
        n != null && (i = new Date((new Date).getTime() + n * 36e5), i = "; expires=" + i.toGMTString()),
        r != null && (s = ";domain=" + r),
        document.cookie = e + "=" + escape(t) + i + s
    },
    readStyle: function(e, t) {
        if (e.style[t]) return e.style[t];
        if (e.currentStyle) return e.currentStyle[t];
        if (document.defaultView && document.defaultView.getComputedStyle) {
            var n = document.defaultView.getComputedStyle(e, null);
            return n.getPropertyValue(t)
        }
        return null
    }
}