// Generated by CoffeeScript 1.7.1
(function() {
  var $, CookieHandler, DomManager, Pixel, Player, Playlist, ScriptLoader, Surface, User, VideoFile,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  $(function() {
    window.gmcs = {};
    window.gmcs.site_id = "1";
    window.gmcs.host = "http://localhost:8080";
    window.gmcs.utils = {};
    window.gmcs.utils.cookieHandler = new CookieHandler();
    window.gmcs.utils.guid = function() {
      var chars, result, today;
      chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      today = new Date();
      result = today.valueOf().toString(16);
      result += chars.substr(Math.floor(Math.random() * chars.length), 1);
      result += chars.substr(Math.floor(Math.random() * chars.length), 1);
      return result;
    };
    return window.gmcs.surface = new Surface("Nat Geo TV");
  });

  CookieHandler = (function() {
    function CookieHandler() {}

    CookieHandler.prototype.setCookie = function(name, value, days) {
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

    CookieHandler.prototype.getCookie = function(name) {
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

    CookieHandler.prototype.deleteCookie = function(name) {
      return setCookie(name, "", -1);
    };

    return CookieHandler;

  })();

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
      s = vf.src();
      return this.elem.src([
        {
          type: "video/flv",
          src: s
        }
      ]);
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
      this.set_related_links = __bind(this.set_related_links, this);
      this.like_video = __bind(this.like_video, this);
      this.play_next_video = __bind(this.play_next_video, this);
      this.play = __bind(this.play, this);
      this.create_player = __bind(this.create_player, this);
      this.load_UI = __bind(this.load_UI, this);
      this.load_VJS = __bind(this.load_VJS, this);
      this.hostname = window.gmcs.host;
      this.cookieHandler = window.gmcs.utils.cookieHandler;
      this.callbacks = {
        'playlist_loaded': this.load_VJS,
        'videojs_loaded': this.load_UI
      };
      this.user = new User(this.callbacks['playlist_loaded']);
      this.current_time = parseInt(this.cookieHandler.getCookie("gmcs-surface-current_time"));
      if (isNaN(this.current_time)) {
        this.current_time = 0;
      }
      this.start_minimised = parseInt(this.cookieHandler.getCookie("gmcs-surface-minimised"));
      if (isNaN(this.start_minimised)) {
        this.start_minimised = 0;
      }
      this.minimised = false;
      this.player = null;
      this.dom = new DomManager();
      this.dom.getStyle("src/style.css");
      this.dom.getStyle("vjs/video-js.css");
    }

    Surface.prototype.load_VJS = function() {
      console.log("Loading Video JS");
      return new ScriptLoader("videoJs", this.callbacks['videojs_loaded']);
    };

    Surface.prototype.load_UI = function() {
      var html, s;
      console.log("Loading UI");
      this.set_blur();
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
      this.dom.appendDivToParent("cs-footer-skip", "cs-footer");
      this.dom.appendDivToParent("cs-footer-like", "cs-footer");
      this.dom.appendDivToParent("cs-related-container", "cs-player-wrapper");
      this.dom.appendDivToParent("cs-related-1", "cs-related-container");
      this.dom.appendDivToParent("cs-related-2", "cs-related-container");
      this.dom.appendDivToParent("cs-related-3", "cs-related-container");
      this.dom.appendDivToBody("cs-slug-wrapper");
      this.$wrapper = $("#cs-wrapper");
      this.$slugWrapper = $("#cs-slug-wrapper");
      this.$slugWrapper.click(this.maximise);
      this.hide_slug();
      $("#cs-player-container").addClass("largeVideoWrapper");
      $("#cs-label").html(this.site_name);
      $("#cs-close").addClass("cs-close");
      $("#cs-close").click(this.minimise);
      $("#cs-footer-skip").text("Skip");
      $("#cs-footer-skip").addClass("footer-enabled");
      this.video = this.user.playlist.next();
      this.$video_title = $("#cs-video-title");
      this.$video_title.html(this.video.title());
      $("#cs-footer-skip").click((function(_this) {
        return function() {
          new Pixel(_this.user.id, "skip", _this.video.id);
          return _this.play_next_video();
        };
      })(this));
      $("#cs-footer-like").text("Like");
      $("#cs-footer-like").click(this.like_video);
      $("#cs-footer-like").addClass("footer-enabled");
      $("#cs-related-container").html("Since you liked this, you might also like:");
      $("#cs-related-container").hide();
      this.player = this.create_player(this.video, false, false);
      if (this.start_minimised > 0) {
        this.minimise();
      }
      return void 0;
    };

    Surface.prototype.create_player = function(video, autoplay, resume) {
      var player;
      player = new Player("cs-video-player", "cs-player-container");
      player.ready((function(_this) {
        return function() {
          player.loadFile(video);
          player.ended(function() {
            console.log("ENDED");
            new Pixel(_this.user.id, "complete", _this.video.id);
            return _this.play_next_video();
          });
          if (autoplay) {
            player.play();
          }
          if (resume) {
            player.one("loadedmetadata", function() {
              return player.setCurrentTime(_this.current_time);
            });
          }
          return player.timeUpdate(_this.update_current_time);
        };
      })(this));
      return player;
    };

    Surface.prototype.play = function(v) {
      this.video = v;
      console.log(v);
      this.$video_title.html(this.video.title());
      this.player.loadFile(this.video);
      this.player.play();
      $("#cs-footer-like").text("Like");
      $("#cs-footer-like").click(this.like_video);
      $("#cs-footer-like").addClass("footer-enabled");
      return $("#cs-related-container").hide();
    };

    Surface.prototype.play_next_video = function() {
      var v;
      v = this.user.playlist.next();
      if (v !== null) {
        this.video = v;
        console.log("Surface: Play next video: " + this.video.title());
        this.$video_title.html(this.video.title());
        this.player.loadFile(this.video);
        this.player.play();
        $("#cs-footer-like").text("Like");
        $("#cs-footer-like").click(this.like_video);
        $("#cs-footer-like").addClass("footer-enabled");
        return $("#cs-related-container").hide();
      }
    };

    Surface.prototype.like_video = function() {
      $("#cs-footer-like").unbind("click");
      $("#cs-footer-like").text("Liked!");
      $("#cs-footer-like").removeClass("footer-enabled");
      return new Pixel(this.user.id, "like", this.video.id, this.set_related_links);
    };

    Surface.prototype.set_related_links = function(videos) {
      var div, guid, parent, video, _fn, _i, _len;
      parent = document.getElementById("cs-related-container");
      if (videos.length > 0) {
        $("#cs-related-container").html("Since you liked this, you might also like:");
        _fn = (function(_this) {
          return function(video) {
            div.onclick = function() {
              return _this.play(new VideoFile(video.pk, video.fields.src, video.fields.title, video.fields.thumb_src));
            };
          };
        })(this);
        for (_i = 0, _len = videos.length; _i < _len; _i++) {
          video = videos[_i];
          guid = window.gmcs.utils.guid();
          div = document.createElement("div");
          div.className = "related-link";
          div.id = guid;
          parent.appendChild(div);
          div.innerHTML = " > " + video.fields.title;
          _fn(video);
        }
        $("#cs-related-container").show();
      }
    };

    Surface.prototype.minimise = function() {
      this.player.dispose();
      this.remove_overlay();
      this.$wrapper.hide();
      $("#cs-slug-wrapper").show("100");
      this.minimised = true;
      return this.cookieHandler.setCookie("gmcs-surface-minimised", 1, 10000);
    };

    Surface.prototype.maximise = function() {
      if (this.minimised === true) {
        this.hide_slug();
        this.set_blur();
        this.$wrapper.show();
        this.player = this.create_player(this.video, true, true);
        this.minimised = false;
        return this.cookieHandler.setCookie("gmcs-surface-minimised", 0, 10000);
      }
    };

    Surface.prototype.hide_slug = function() {
      return $("#cs-slug-wrapper").hide();
    };

    Surface.prototype.update_current_time = function() {
      if (this.player.playing) {
        this.current_time = this.player.currentTime();
        return this.cookieHandler.setCookie("gmcs-surface-current_time", this.current_time, 10000);
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
    function VideoFile(id, file_src, video_title, thumb_href) {
      this.id = id;
      this.file_src = file_src;
      this.video_title = video_title;
      this.thumb_href = thumb_href;
      this.thumb = __bind(this.thumb, this);
      this.isAd = __bind(this.isAd, this);
      this.url = __bind(this.url, this);
      this.title = __bind(this.title, this);
      this.setPosition = __bind(this.setPosition, this);
      this.position = __bind(this.position, this);
      this.src = __bind(this.src, this);
      this.playback_position = 0;
    }

    VideoFile.prototype.src = function() {
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

    VideoFile.prototype.isAd = function() {
      return this.ad;
    };

    VideoFile.prototype.thumb = function() {
      return this.thumb_href;
    };

    return VideoFile;

  })();

  User = (function() {
    function User(callback) {
      var guid, requestURI, _ref;
      this.cookie_handler = window.gmcs.utils.cookieHandler;
      guid = (_ref = this.cookie_handler.getCookie("gmcs-surface-user-guid")) != null ? _ref : window.gmcs.utils.guid();
      requestURI = window.gmcs.host + "/users/get?guid=" + guid + "&site_id=" + window.gmcs.site_id;
      $.getJSON(requestURI, (function(_this) {
        return function(user_data) {
          _this.id = user_data.id.toString();
          _this.cookie_handler.setCookie("gmcs-surface-user-guid", guid, 10000);
          console.log("Surface: User: User ID " + _this.id);
          return _this.playlist = new Playlist(_this.id, callback, user_data.last_played);
        };
      })(this));
    }

    return User;

  })();

  Playlist = (function() {
    function Playlist(id, callback, last_played) {
      this.id = id;
      this.next = __bind(this.next, this);
      this.current = __bind(this.current, this);
      this.load_playlist = __bind(this.load_playlist, this);
      this.load_video = __bind(this.load_video, this);
      this.add = __bind(this.add, this);
      this.videos = [];
      if (last_played) {
        console.log("Loading Last Played");
        this.load_video(last_played, callback);
      } else {
        this.load_playlist(callback);
      }
    }

    Playlist.prototype.add = function(vf) {
      this.videos.push(vf);
      return console.log("Surface: User: Playlist: Add: " + vf.title());
    };

    Playlist.prototype.load_video = function(video_json, callback) {
      var vf;
      vf = new VideoFile(video_json.id, video_json.src, video_json.title, video_json.thumb_src);
      this.add(vf);
      if (callback) {
        return callback();
      }
    };

    Playlist.prototype.load_playlist = function(callback) {
      var requestURI;
      requestURI = window.gmcs.host + "/users/" + this.id + "/refreshplaylist/";
      console.log("Requesting new playlist");
      return $.getJSON(requestURI, (function(_this) {
        return function(data) {
          var item, vf, _i, _len, _ref;
          _this.videos = [];
          console.log(data.videos);
          _ref = data.videos.splice(0, 5);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            vf = new VideoFile(item.id, item.src, item.title, item.thumb_src);
            _this.add(vf);
          }
          $("#cs-footer-skip").text("Skip");
          $("#cs-footer-skip").addClass("footer-enabled");
          if (callback) {
            return callback();
          }
        };
      })(this));
    };

    Playlist.prototype.current = function() {
      return this.videos[0];
    };

    Playlist.prototype.next = function() {
      var v;
      if (this.videos.length > 0) {
        v = this.videos.shift();
        new Pixel(this.id, "play", v.id);
        console.log(this.videos);
        if (this.videos.length === 0) {
          $("#cs-footer-skip").text("Loading more videos");
          $("#cs-footer-skip").removeClass("footer-enabled");
          this.load_playlist();
        }
        return v;
      } else {
        return null;
      }
    };

    return Playlist;

  })();

  Pixel = (function() {
    function Pixel(user_id, action, video_id, callback) {
      var acts, completed, liked, played, skipped;
      if (callback == null) {
        callback = null;
      }
      played = function() {
        var requestURI;
        requestURI = window.gmcs.host + "/users/" + user_id + "/played/" + video_id + "/";
        return $.getJSON(requestURI);
      };
      liked = function() {
        var requestURI;
        requestURI = window.gmcs.host + "/users/" + user_id + "/liked/" + video_id + "/";
        return $.getJSON(requestURI, (function(_this) {
          return function(data) {
            console.log(data);
            return callback(data);
          };
        })(this));
      };
      skipped = function() {
        var requestURI;
        requestURI = window.gmcs.host + "/users/" + user_id + "/skipped/" + video_id + "/";
        return $.getJSON(requestURI);
      };
      completed = function() {
        var requestURI;
        requestURI = window.gmcs.host + "/users/" + user_id + "/completed/" + video_id + "/";
        return $.getJSON(requestURI);
      };
      acts = {
        "play": played,
        "like": liked,
        "skip": skipped,
        "complete": completed
      };
      try {
        acts[action]();
      } catch (_error) {
        return null;
      }
    }

    return Pixel;

  })();

}).call(this);
