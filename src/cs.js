// Generated by CoffeeScript 1.7.1
(function() {
  var $, DomManager, Player, ScriptLoader, Surface, VideoFile,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  $(function() {
    var surface;
    return surface = new Surface("Nat Geo TV");
  });

  ScriptLoader = (function() {
    function ScriptLoader() {
      var callback, compressed, lib, loadCallback, options, s, version, _i;
      options = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), callback = arguments[_i++];
      this.libraries = {
        jQuery: "http://ajax.googleapis.com/ajax/libs/jquery/$version/jquery.js",
        videoJs: "vjs/video.dev.js"
      };
      lib = options[0], version = options[1], compressed = options[2];
      if (this.libraries[lib]) {
        lib = this.libraries[lib];
      }
      loadCallback = (function(_this) {
        return function() {
          if (_this.loaded) {
            return;
          }
          _this.loaded = true;
          return callback();
        };
      })(this);
      s = document.createElement('script');
      s.onload = loadCallback;
      s.onreadystatechange = function() {
        if (/loaded|complete/.test(s.readyState)) {
          return loadCallback();
        }
      };
      s.src = lib.replace('$version', version);
      if (compressed) {
        lib = lib.replace('.js', '.min.js');
      }
      document.getElementsByTagName('head')[0].appendChild(s);
    }

    return ScriptLoader;

  })();

  DomManager = (function() {
    function DomManager() {
      this.getStyle = __bind(this.getStyle, this);
      this.get = __bind(this.get, this);
      this.appendDivToParent = __bind(this.appendDivToParent, this);
      this.appendDivToBody = __bind(this.appendDivToBody, this);
      this.body = document.getElementsByTagName("body")[0];
      this.head = document.getElementsByTagName("head")[0];
    }

    DomManager.prototype.appendDivToBody = function(id) {
      var s;
      s = document.createElement("div");
      s.id = id;
      return this.body.appendChild(s);
    };

    DomManager.prototype.appendDivToParent = function(id, parent_id) {
      var parent, s;
      s = document.createElement("div");
      s.id = id;
      parent = document.getElementById(parent_id);
      return parent.appendChild(s);
    };

    DomManager.prototype.get = function(id) {
      var e;
      e = document.getElementById(id);
      return e;
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

  Player = (function() {
    function Player(id, parent_id) {
      this.dispose = __bind(this.dispose, this);
      this.showProgressBar = __bind(this.showProgressBar, this);
      this.hideProgressBar = __bind(this.hideProgressBar, this);
      this.isPlaying = __bind(this.isPlaying, this);
      this.setCurrentTime = __bind(this.setCurrentTime, this);
      this.loadedmetadata = __bind(this.loadedmetadata, this);
      this.ready = __bind(this.ready, this);
      this.onpause = __bind(this.onpause, this);
      this.onplay = __bind(this.onplay, this);
      this.ended = __bind(this.ended, this);
      this.timeUpdate = __bind(this.timeUpdate, this);
      this.one = __bind(this.one, this);
      this.on = __bind(this.on, this);
      this.isMuted = __bind(this.isMuted, this);
      this.timeRemaining = __bind(this.timeRemaining, this);
      this.currentTime = __bind(this.currentTime, this);
      this.duration = __bind(this.duration, this);
      this.loadFile = __bind(this.loadFile, this);
      this.unmute = __bind(this.unmute, this);
      this.mute = __bind(this.mute, this);
      this.pause = __bind(this.pause, this);
      this.play = __bind(this.play, this);
      var p;
      this.id = id;
      this.parent_id = parent_id;
      p = document.createElement("video");
      p.setAttribute("id", id);
      p.setAttribute("class", "video-js vjs-default-skin vjs-big-play-button");
      p.setAttribute("height", "100%");
      p.setAttribute("width", "100%");
      p.setAttribute("data-setup", "{}");
      p.setAttribute("controls", "");
      document.getElementById(parent_id).appendChild(p);
      this.elem = videojs(id);
      this.playing = false;
      this.elem.on("play", (function(_this) {
        return function() {
          return _this.playing = true;
        };
      })(this));
      this.elem.on("pause", (function(_this) {
        return function() {
          return _this.playing = false;
        };
      })(this));
    }

    Player.prototype.play = function() {
      return this.elem.play();
    };

    Player.prototype.pause = function() {
      return this.elem.pause();
    };

    Player.prototype.mute = function() {
      return this.elem.volume(0);
    };

    Player.prototype.unmute = function() {
      return this.elem.volume(1);
    };

    Player.prototype.loadFile = function(vf) {
      var s;
      console.log("load file called");
      s = vf.sources();
      this.elem.src([
        {
          type: "video/flv",
          src: s
        }
      ]);
      if (vf.poster()) {
        return this.elem.poster(vf.poster());
      }
    };

    Player.prototype.duration = function() {
      return this.elem.duration();
    };

    Player.prototype.currentTime = function() {
      return this.elem.currentTime();
    };

    Player.prototype.timeRemaining = function() {
      return this.duration() - this.currentTime();
    };

    Player.prototype.isMuted = function() {
      return this.elem.muted();
    };

    Player.prototype.on = function(callback, func) {
      return this.elem.on(callback, func);
    };

    Player.prototype.one = function(callback, func) {
      return this.elem.one(callback, func);
    };

    Player.prototype.timeUpdate = function(func) {
      return this.elem.on("timeupdate", func);
    };

    Player.prototype.ended = function(func) {
      return this.elem.on("ended", func);
    };

    Player.prototype.onplay = function(func) {
      return this.elem.on("play", func);
    };

    Player.prototype.onpause = function(func) {
      return this.elem.on("pause", func);
    };

    Player.prototype.ready = function(func) {
      return this.elem.ready(func);
    };

    Player.prototype.loadedmetadata = function(func) {
      return this.elem.on("loadedmetadata", func);
    };

    Player.prototype.setCurrentTime = function(time) {
      return this.elem.currentTime(time);
    };

    Player.prototype.isPlaying = function() {
      return this.playing;
    };

    Player.prototype.hideProgressBar = function() {
      return this.elem.controlBar.progressControl.hide();
    };

    Player.prototype.showProgressBar = function() {
      return this.elem.controlBar.progressControl.show();
    };

    Player.prototype.dispose = function() {
      return this.elem.dispose();
    };

    return Player;

  })();

  Surface = (function() {
    function Surface(site_name, delay) {
      this.site_name = site_name;
      this.remove_overlay = __bind(this.remove_overlay, this);
      this.set_blur = __bind(this.set_blur, this);
      this.update_current_time = __bind(this.update_current_time, this);
      this.hide_slug = __bind(this.hide_slug, this);
      this.maximise = __bind(this.maximise, this);
      this.minimise = __bind(this.minimise, this);
      this.play_next_video = __bind(this.play_next_video, this);
      this.create_player = __bind(this.create_player, this);
      this.load_UI = __bind(this.load_UI, this);
      this.current_video_index = parseInt(this.getCookie("gmcs-surface-current-video-index"));
      if (isNaN(this.current_video_index)) {
        this.current_video_index = 1;
      }
      this.current_time = parseInt(this.getCookie("gmcs-surface-current_time"));
      if (isNaN(this.current_time)) {
        this.current_time = 0;
      }
      this.start_minimised = parseInt(this.getCookie("gmcs-surface-minimised"));
      if (isNaN(this.start_minimised)) {
        this.start_minimised = 0;
      }
      this.minimised = false;
      this.player = null;
      this.video = null;
      this.next_video = null;
      this.dom = new DomManager();
      this.dom.getStyle("src/style.css");
      this.dom.getStyle("vjs/video-js.css");
      this.set_blur();
      new ScriptLoader("videoJs", this.load_UI);
    }

    Surface.prototype.load_UI = function() {
      var html, label, player_container, s;
      s = document.createElement("div");
      s.id = "cs-wrapper";
      html = document.getElementsByTagName("html")[0];
      html.appendChild(s);
      this.dom.appendDivToParent("cs-overlay", "cs-wrapper");
      this.dom.appendDivToParent("cs-header", "cs-wrapper");
      this.dom.appendDivToParent("cs-close", "cs-header");
      this.dom.appendDivToParent("cs-main", "cs-wrapper");
      this.dom.appendDivToParent("cs-info-wrapper", "cs-main");
      this.dom.appendDivToParent("cs-top-line", "cs-info-wrapper");
      this.dom.appendDivToParent("cs-rule", "cs-info-wrapper");
      this.dom.appendDivToParent("cs-bottom-line", "cs-info-wrapper");
      this.dom.appendDivToParent("cs-label", "cs-top-line");
      this.dom.appendDivToParent("cs-video-title", "cs-bottom-line");
      this.dom.appendDivToParent("cs-player-wrapper", "cs-main");
      this.dom.appendDivToParent("cs-player-container", "cs-player-wrapper");
      this.dom.appendDivToParent("cs-footer", "cs-player-wrapper");
      this.dom.appendDivToParent("cs-footer-text", "cs-footer");
      this.$wrapper = $("#cs-wrapper");
      this.$video_title = $("#cs-video-title");
      label = $("#cs-label");
      player_container = $("#cs-player-container");
      $("#cs-close").addClass("cs-close");
      $("#cs-close").click(this.minimise);
      $("#cs-footer-text").text("Skip");
      $("#cs-footer").click(this.play_next_video);
      $("#cs-footer").addClass("footer-enabled");
      player_container.addClass("largeVideoWrapper");
      label.html(this.site_name);
      this.create_player(false, true);
      this.dom.appendDivToBody("cs-slug-wrapper");
      this.$slugWrapper = $("#cs-slug-wrapper");
      this.$slugWrapper.click(this.maximise);
      this.hide_slug();
      if (this.start_minimised > 0) {
        this.minimise();
      }
      return void 0;
    };

    Surface.prototype.create_player = function(autoplay, resume) {
      this.player = new Player("cs-video-player", "cs-player-container");
      return this.player.ready((function(_this) {
        return function() {
          var json;
          return json = $.getJSON("http://localhost:8080/videos/" + _this.current_video_index, function(data) {
            _this.video = new VideoFile(data.src, data.title);
            _this.$video_title.html(data.title);
            _this.player.mute();
            _this.player.loadFile(_this.video);
            _this.player.ended(_this.play_next_video);
            if (autoplay) {
              _this.player.play();
            }
            if (resume) {
              _this.player.one("loadedmetadata", function() {
                return _this.player.setCurrentTime(_this.current_time);
              });
            }
            _this.player.timeUpdate(_this.update_current_time);
            return void 0;
          });
        };
      })(this), void 0);
    };

    Surface.prototype.play_next_video = function() {
      var json;
      this.current_video_index = this.current_video_index + 1;
      this.setCookie("gmcs-surface-current-video-index", this.current_video_index, 10000);
      return json = $.getJSON("http://localhost:8080/videos/" + this.current_video_index, (function(_this) {
        return function(data) {
          _this.video = new VideoFile(data.src, data.title);
          _this.$video_title.html(data.title);
          _this.player.pause();
          _this.player.loadFile(_this.video);
          return _this.player.play();
        };
      })(this));
    };

    Surface.prototype.minimise = function() {
      this.player.dispose();
      this.remove_overlay();
      this.$wrapper.hide();
      $("#cs-slug-wrapper").show("100");
      this.minimised = true;
      return this.setCookie("gmcs-surface-minimised", 1, 10000);
    };

    Surface.prototype.maximise = function() {
      if (this.minimised === true) {
        this.hide_slug();
        this.set_blur();
        this.$wrapper.show();
        this.create_player(true, true);
        this.minimised = false;
        return this.setCookie("gmcs-surface-minimised", 0, 10000);
      }
    };

    Surface.prototype.hide_slug = function() {
      return $("#cs-slug-wrapper").hide();
    };

    Surface.prototype.update_current_time = function() {
      if (this.player.playing) {
        this.current_time = this.player.currentTime();
        return this.setCookie("gmcs-surface-current_time", this.current_time, 10000);
      }
    };

    Surface.prototype.set_blur = function() {
      $("body").css("filter", "blur(15px)");
      $("body").css("filter", "url(src/blur.svg#blur)");
      $("body").css("-webkit-filter", "blur(15px)");
      $("body").css("-moz-filter", "blur(15px)");
      $("body").css("-o-filter", "blur(15px)");
      $("body").css("-ms-filter", "blur(15px)");
      return $('html, body').css({
        'overflow': 'hidden',
        'height': '100%'
      });
    };

    Surface.prototype.remove_overlay = function() {
      $("body").css("-webkit-filter", "blur(0px)");
      $("html").css("filter", "blur(0px)");
      $("body").css("filter", "url(src/blur.svg#noBlur)");
      $("body").css("-moz-filter", "blur(0px)");
      $("body").css("-o-filter", "blur(0px)");
      $("body").css("-ms-filter", "blur(0px)");
      return $('html, body').css({
        'overflow': 'auto',
        'height': 'auto'
      });
    };

    Surface.prototype.setCookie = function(name, value, days) {
      var date, expires;
      if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      } else {
        expires = "";
      }
      return document.cookie = name + "=" + value + expires + "; path=/";
    };

    Surface.prototype.getCookie = function(name) {
      var c, ca, i, nameEQ;
      nameEQ = name + "=";
      ca = document.cookie.split(";");
      i = 0;
      while (i < ca.length) {
        c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
        i++;
      }
      return null;
    };

    Surface.prototype.deleteCookie = function(name) {
      return setCookie(name, "", -1);
    };

    return Surface;

  })();

  VideoFile = (function() {
    function VideoFile(src, t) {
      this.t = t;
      this.thumbnail = __bind(this.thumbnail, this);
      this.isAd = __bind(this.isAd, this);
      this.poster = __bind(this.poster, this);
      this.url = __bind(this.url, this);
      this.title = __bind(this.title, this);
      this.setPosition = __bind(this.setPosition, this);
      this.position = __bind(this.position, this);
      this.sources = __bind(this.sources, this);
      this.file_src = src != null ? src : "";
      this.playback_position = 0;
      this.video_poster = "";
    }

    VideoFile.prototype.sources = function() {
      return this.file_src;
    };

    VideoFile.prototype.position = function() {
      return this.playback_position;
    };

    VideoFile.prototype.setPosition = function(pos) {
      return this.playback_position = pos;
    };

    VideoFile.prototype.title = function() {
      return this.t;
    };

    VideoFile.prototype.url = function() {
      return this.video_url;
    };

    VideoFile.prototype.poster = function() {
      if (this.video_poster.length > 0) {
        return this.video_poster;
      }
      return null;
    };

    VideoFile.prototype.isAd = function() {
      return this.ad;
    };

    VideoFile.prototype.thumbnail = function() {
      return this.thumb;
    };

    return VideoFile;

  })();

}).call(this);
