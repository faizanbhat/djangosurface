// Generated by CoffeeScript 1.7.1
(function() {
  var $, DomManager, Player, ScriptLoader, Surface, VideoFile,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  $(function() {
    var surface;
    window.media = [
      {
        src: {
          mp4: "src/propel.mp4",
          webm: "src/propel.webm"
        },
        poster: "src/poster.png",
        title: "Advertisement: Propel Fitness Water",
        url: "https://www.facebook.com/propel"
      }, {
        src: {
          mp4: "src/miller.mp4",
          webm: "src/miller.webm"
        },
        poster: "src/poster.png",
        title: "Marissa Miller's Shape Magazine Cover",
        url: ""
      }, {
        src: {
          mp4: "src/audrina.mp4",
          webm: "src/audrina.webm"
        },
        poster: "src/poster.png",
        title: "Audrina Patridge",
        url: ""
      }
    ];
    return surface = new Surface("ShapeTV", 0);
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
        console.log("on ready state change");
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
      this.moveToParentWithId = __bind(this.moveToParentWithId, this);
      this.ready = __bind(this.ready, this);
      this.ended = __bind(this.ended, this);
      this.timeUpdate = __bind(this.timeUpdate, this);
      this.on = __bind(this.on, this);
      this.isMuted = __bind(this.isMuted, this);
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
      this.mute();
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
      s = vf.sources();
      this.elem.src([
        {
          type: "video/mp4",
          src: s.mp4
        }, {
          type: "video/webm",
          src: s.webm
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

    Player.prototype.isMuted = function() {
      return this.elem.isPlaying();
    };

    Player.prototype.on = function(callback, func) {
      return this.elem.on(callback, func());
    };

    Player.prototype.timeUpdate = function(func) {
      return this.elem.on("timeupdate", func);
    };

    Player.prototype.ended = function(func) {
      return this.elem.on("ended", func);
    };

    Player.prototype.ready = function(func) {
      return this.elem.ready(func);
    };

    Player.prototype.moveToParentWithId = function(new_parent_id) {
      var container, new_parent, player_div;
      container = document.getElementById(this.parent_id);
      player_div = document.getElementById(this.id);
      container.removeChild(player_div);
      console.log(new_parent_id);
      new_parent = document.getElementById(new_parent_id);
      new_parent.appendChild(player_div);
      player_div.width = new_parent.width;
      player_div.height = new_parent.height;
      return this.parent_id = new_parent_id;
    };

    return Player;

  })();

  Surface = (function() {
    function Surface(site_name, delay) {
      var run;
      this.site_name = site_name;
      this.remove_overlay = __bind(this.remove_overlay, this);
      this.set_blur = __bind(this.set_blur, this);
      this.update_time_remaining = __bind(this.update_time_remaining, this);
      this.toggle_mute = __bind(this.toggle_mute, this);
      this.set_bindings = __bind(this.set_bindings, this);
      this.load_UI = __bind(this.load_UI, this);
      this.hide_slug = __bind(this.hide_slug, this);
      this.maximise = __bind(this.maximise, this);
      this.minimise = __bind(this.minimise, this);
      this.play_next_video = __bind(this.play_next_video, this);
      this.current_video = __bind(this.current_video, this);
      run = (function(_this) {
        return function() {
          var item, vf, _i, _len, _ref;
          _this.set_blur();
          _this.minimised = false;
          _this.player = null;
          _this.videos = [];
          _ref = window.media;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            vf = new VideoFile(item.src, 0, item.poster, item.title, item.url);
            _this.videos.push(vf);
          }
          _this.current_video_index = 0;
          _this.dom = new DomManager();
          _this.dom.getStyle("src/style.css");
          _this.dom.getStyle("vjs/video-js.css");
          return new ScriptLoader("videoJs", _this.load_UI);
        };
      })(this);
      setTimeout(run, delay);
    }

    Surface.prototype.current_video = function() {
      return this.videos[this.current_video_index];
    };

    Surface.prototype.play_next_video = function() {
      console.log("Playing next");
      if ((this.current_video_index + 1) < this.videos.length) {
        this.current_video_index = this.current_video_index + 1;
        this.player.loadFile(this.current_video());
        this.$video_title.html(this.current_video().title());
        return this.player.play();
      }
    };

    Surface.prototype.minimise = function() {
      this.current_video().setPosition(this.player.currentTime());
      this.remove_overlay();
      this.$wrapper.hide();
      this.player.moveToParentWithId("cs-small-player-container");
      $(".vjs-fullscreen-control").css("display", "inline");
      $(".vjs-fullscreen-control")[0].onclick = this.maximise;
      $("#cs-slug-wrapper").show();
      this.player.play();
      this.minimised = true;
      return this.player.elem.onclick = this.maximise;
    };

    Surface.prototype.maximise = function() {
      if (this.minimised === true) {
        console.log("hi");
        $(".vjs-fullscreen-control").css("display", "none");
        this.hide_slug();
        this.set_blur();
        this.player.moveToParentWithId("cs-player-container");
        this.$wrapper.show();
        this.player.play();
        return this.minimised = false;
      }
    };

    Surface.prototype.hide_slug = function() {
      this.current_video().setPosition(this.player.currentTime());
      return $("#cs-slug-wrapper").hide();
    };

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
      this.dom.appendDivToParent("cs-video-time-remaining", "cs-bottom-line");
      this.dom.appendDivToParent("cs-player-wrapper", "cs-main");
      this.dom.appendDivToParent("cs-player-container", "cs-player-wrapper");
      this.dom.appendDivToParent("cs-footer", "cs-wrapper");
      this.$wrapper = $("#cs-wrapper");
      this.$video_title = $("#cs-video-title");
      this.$video_time_remaining = $("#cs-video-time-remaining");
      label = $("#cs-label");
      player_container = $("#cs-player-container");
      player_container.addClass("largeVideoWrapper");
      label.html(this.site_name);
      this.$video_title.html(this.current_video().title());
      this.$video_time_remaining.html("");
      this.set_bindings();
      this.player = new Player("cs-video-player", "cs-player-container");
      this.player.ready((function(_this) {
        return function() {
          _this.player.timeUpdate(_this.update_time_remaining);
          _this.player.loadFile(_this.current_video());
          return _this.player.ended(_this.play_next_video);
        };
      })(this));
      console.log("reached");
      this.dom.appendDivToBody("cs-slug-wrapper");
      this.dom.appendDivToParent("cs-small-player-container", "cs-slug-wrapper");
      this.$slug_wrapper = $("#cs-slug-wrapper");
      player_container = $("#cs-small-player-container");
      player_container.addClass("smallVideoWrapper");
      return this.hide_slug();
    };

    Surface.prototype.set_bindings = function() {
      return $("#cs-close").click((function(_this) {
        return function() {
          return _this.minimise();
        };
      })(this));
    };

    Surface.prototype.toggle_mute = function() {
      if (this.player.isMuted()) {
        return this.player.unmute();
      } else {
        return this.player.mute();
      }
    };

    Surface.prototype.update_time_remaining = function() {
      var mins, mins_text, secs, secs_text, time_in_secs;
      time_in_secs = this.player.timeRemaining();
      if (typeof time_in_secs === 'number') {
        mins = Math.floor(time_in_secs / 60);
        secs = Math.ceil(time_in_secs % 60);
        if (mins > 9) {
          mins_text = '' + mins;
        } else {
          mins_text = '0' + mins;
        }
        if (secs > 9) {
          secs_text = '' + secs;
        } else {
          secs_text = '0' + secs;
        }
        return this.$video_time_remaining.html(mins_text + ":" + secs_text);
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

    return Surface;

  })();

  VideoFile = (function() {
    function VideoFile(src, position, poster, title, url) {
      this.poster = __bind(this.poster, this);
      this.url = __bind(this.url, this);
      this.title = __bind(this.title, this);
      this.setPosition = __bind(this.setPosition, this);
      this.position = __bind(this.position, this);
      this.sources = __bind(this.sources, this);
      this.file_src = src != null ? src : "";
      this.playback_position = position != null ? position : 0;
      this.video_poster = poster != null ? poster : "";
      this.video_title = title != null ? title : "";
      this.video_url = url;
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
      return this.video_title;
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

    return VideoFile;

  })();

}).call(this);
