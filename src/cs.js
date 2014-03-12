// Generated by CoffeeScript 1.6.3
(function() {
  var $, DomManager, Surface,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  $(function() {
    var surface;
    return surface = new Surface();
  });

  DomManager = (function() {
    function DomManager() {
      this.getStyle = __bind(this.getStyle, this);
      this.getScript = __bind(this.getScript, this);
      this.appendDivToParent = __bind(this.appendDivToParent, this);
      this.appendDiv = __bind(this.appendDiv, this);
      this.appendDivToBody = __bind(this.appendDivToBody, this);
      this.body = document.getElementsByTagName("body")[0];
      this.head = document.getElementsByTagName("head")[0];
      this.html = document.getElementsByTagName("html")[0];
    }

    DomManager.prototype.appendDivToBody = function(id) {
      var s;
      s = document.createElement("div");
      s.id = id;
      return this.body.appendChild(s);
    };

    DomManager.prototype.appendDiv = function(id) {
      var s;
      s = document.createElement("div");
      s.id = id;
      return this.html.appendChild(s);
    };

    DomManager.prototype.appendDivToParent = function(id, parent_id) {
      var parent, s;
      s = document.createElement("div");
      s.id = id;
      parent = document.getElementById(parent_id);
      return parent.appendChild(s);
    };

    DomManager.prototype.getScript = function(url, success) {
      var done, script;
      done = false;
      script = document.createElement("script");
      script.src = url;
      script.onload = function() {
        if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
          done = true;
          if (typeof success === 'function') {
            return success();
          }
        }
      };
      script.onreadystatechange = script.onload;
      return this.head.appendChild(script);
    };

    DomManager.prototype.getStyle = function(url) {
      var l;
      l = document.createElement("link");
      l.href = url;
      l.rel = "stylesheet";
      l.type = "text/css";
      return this.head.appendChild(l);
    };

    return DomManager;

  })();

  Surface = (function() {
    function Surface() {
      this.remove_overlay = __bind(this.remove_overlay, this);
      this.play = __bind(this.play, this);
      this.load_elements = __bind(this.load_elements, this);
      this.set_overlay = __bind(this.set_overlay, this);
      this.dom = new DomManager();
      this.dom.getStyle("src/style.css");
      this.set_overlay();
      this.load_elements();
    }

    Surface.prototype.set_overlay = function() {
      $("body").css("-webkit-filter", "blur(20px)");
      $("body").css("filter", "blur(20px)");
      $('html, body').css({
        'overflow': 'hidden',
        'height': '100%'
      });
      this.dom.appendDiv("cs-wrapper");
      this.dom.appendDivToParent("cs-overlay", "cs-wrapper");
      return this.$wrapper = $("#cs-wrapper");
    };

    Surface.prototype.load_elements = function() {
      var message, play, v,
        _this = this;
      this.dom.appendDivToParent("cs-header", "cs-wrapper");
      this.dom.appendDivToParent("cs-close", "cs-header");
      this.dom.appendDivToParent("cs-main", "cs-wrapper");
      this.dom.appendDivToParent("cs-info-wrapper", "cs-wrapper");
      this.dom.appendDivToParent("cs-top-line", "cs-info-wrapper");
      this.dom.appendDivToParent("cs-rule", "cs-info-wrapper");
      this.dom.appendDivToParent("cs-bottom-line", "cs-info-wrapper");
      this.dom.appendDivToParent("cs-label", "cs-top-line");
      this.dom.appendDivToParent("cs-message", "cs-bottom-line");
      this.dom.appendDivToParent("cs-player-wrapper", "cs-wrapper");
      this.dom.appendDivToParent("cs-player-container", "cs-player-wrapper");
      this.dom.appendDivToParent("cs-footer", "cs-wrapper");
      $("#cs-close").click(function() {
        return _this.remove_overlay();
      });
      this.$label = $("#cs-label");
      this.$label.html("Trending Now");
      v = document.createElement("video");
      v.setAttribute("id", "cs-video");
      v.setAttribute("poster", "src/poster.png");
      v.src = "src/3.mp4";
      document.getElementById("cs-player-container").appendChild(v);
      this.video = document.getElementById("cs-video");
      play = document.createElement("div");
      play.id = "cs-play-btn";
      this.video.appendChild(play);
      this.video.play();
      $("#cs-play-btn").click(function() {
        return _this.play();
      });
      message = this.dom.appendDivToParent("cs-message", "cs-wrapper");
      this.$message = $("#cs-message");
      return this.$message.html("Now Playing: <span id='cs-video-title'>Meet the team behind Genesis Media</span>");
    };

    Surface.prototype.play = function() {
      $("#cs-play-btn").remove();
      this.$message.html("Genesis Media");
      return this.video.play();
    };

    Surface.prototype.remove_overlay = function() {
      $("body").css("-webkit-filter", "blur(0px)");
      $("html").css("filter", "blur(0px)");
      $('html, body').css({
        'overflow': 'auto',
        'height': 'auto'
      });
      return this.$wrapper.remove();
    };

    return Surface;

  })();

}).call(this);
