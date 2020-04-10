// Generated by CoffeeScript 1.7.1
(function() {
  var $, CookieHandler, DomManager, Overlay, Pixel, Player, Playlist, ScriptLoader, Slug, SurfaceController, User, VideoFile,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  $(function() {
    window.gmcs = {};
    window.gmcs.site_id = "1";
    window.gmcs.host = "https://damp-ravine-5659.herokuapp.com/";
    window.gmcs.debug = true;
    window.gmcs.log = function(obj) {
      if (window.gmcs.debug) {
        return console.log(obj);
      } else {

      }
    };
    window.gmcs.utils = {};
    window.gmcs.utils.domManager = new DomManager();
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
    return window.gmcs.surface = new SurfaceController("Nat Geo TV", true);
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

  SurfaceController = (function() {
    function SurfaceController(site_name, minimised, delay) {
      var cookieHandler;
      this.site_name = site_name;
      if (minimised == null) {
        minimised = false;
      }
      if (delay == null) {
        delay = 0;
      }
      this.update_current_time = __bind(this.update_current_time, this);
      this.maximise = __bind(this.maximise, this);
      this.minimise = __bind(this.minimise, this);
      this.like_video = __bind(this.like_video, this);
      this.play_next_video = __bind(this.play_next_video, this);
      this.play = __bind(this.play, this);
      this.create_player = __bind(this.create_player, this);
      this.refresh_slug = __bind(this.refresh_slug, this);
      this.create_slug = __bind(this.create_slug, this);
      this.create_overlay = __bind(this.create_overlay, this);
      this.load_UI = __bind(this.load_UI, this);
      this.load_VJS = __bind(this.load_VJS, this);
      this.hostname = window.gmcs.host;
      cookieHandler = window.gmcs.utils.cookieHandler;
      this.callbacks = {
        'user_loaded': this.load_VJS,
        'videojs_loaded': this.load_UI
      };
      this.user = new User(this.callbacks['user_loaded']);
      this.current_time = parseInt(cookieHandler.getCookie("gmcs-surface-current_time"));
      if (isNaN(this.current_time)) {
        this.current_time = 0;
      }
      this.start_minimised = parseInt(cookieHandler.getCookie("gmcs-surface-minimised"));
      if (isNaN(this.start_minimised)) {
        if (minimised != null ? minimised : 0) {
          this.start_minimised = 1;
        }
      }
      this.minimised = false;
      this.player = null;
      this.dom = window.gmcs.utils.domManager;
      this.dom.getStyle("src/style.css");
      this.dom.getStyle("vjs/video-js.css");
    }

    SurfaceController.prototype.load_VJS = function() {
      window.gmcs.log("Loading Video JS");
      return new ScriptLoader("videoJs", this.callbacks['videojs_loaded']);
    };

    SurfaceController.prototype.load_UI = function() {
      this.user.playlist.onload = (function(_this) {
        return function() {
          _this.playlist_ready = true;
          if (_this.overlay) {
            return _this.overlay.enable_skip();
          }
        };
      })(this);
      this.user.playlist.onempty = (function(_this) {
        return function() {
          _this.playlist_ready = false;
          if (_this.overlay) {
            return _this.overlay.disable_skip();
          }
        };
      })(this);
      this.video = this.user.playlist.next();
      this.overlay = null;
      if (this.start_minimised > 0) {
        this.minimised = true;
        this.create_slug();
      } else {
        this.create_overlay();
        if (this.playlist_ready) {
          this.overlay.enable_skip();
        }
        this.create_slug();
        this.slug.hide();
        this.minimised = false;
        this.player = this.create_player(this.video, false, false);
      }
      return void 0;
    };

    SurfaceController.prototype.create_overlay = function() {
      this.overlay = new Overlay(this.site_name);
      this.overlay.controller = this;
      this.overlay.onclose(this.minimise);
      this.overlay.onlike(this.like_video);
      this.overlay.set_title(this.video.title());
      return this.overlay.onskip((function(_this) {
        return function() {
          new Pixel(_this.user.id, "skip", _this.video.id);
          return _this.play_next_video();
        };
      })(this));
    };

    SurfaceController.prototype.create_slug = function() {
      this.slug = new Slug("Recommended For You");
      this.slug.click(this.maximise);
      this.slug.set_title(this.video.title());
      return this.slug.set_poster(this.video.thumb());
    };

    SurfaceController.prototype.refresh_slug = function() {
      this.slug.set_title(this.video.title());
      return this.slug.set_poster(this.video.thumb());
    };

    SurfaceController.prototype.create_player = function(video, autoplay, resume) {
      var player;
      player = new Player("cs-video-player", "cs-player-container");
      player.ready((function(_this) {
        return function() {
          player.loadFile(video);
          player.ended(function() {
            window.gmcs.log("ENDED");
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

    SurfaceController.prototype.play = function(v) {
      this.video = v;
      this.overlay.set_title(this.video.title());
      this.overlay.enable_like(this.like_video);
      this.overlay.hide_related();
      this.player.loadFile(this.video);
      return this.player.play();
    };

    SurfaceController.prototype.play_next_video = function() {
      var v;
      v = this.user.playlist.next();
      if (v !== null) {
        this.video = v;
        window.gmcs.log("Surface: Play next video: " + this.video.title());
        this.overlay.set_title(this.video.title());
        this.overlay.enable_like(this.like_video);
        this.overlay.hide_related();
        this.player.loadFile(this.video);
        return this.player.play();
      }
    };

    SurfaceController.prototype.like_video = function() {
      var requestURI;
      this.overlay.disable_like();
      new Pixel(this.user.id, "like", this.video.id);
      requestURI = window.gmcs.host + "/videos/" + this.video.id + "/related/";
      window.gmcs.log(requestURI);
      return $.getJSON(requestURI, (function(_this) {
        return function(videos) {
          return _this.overlay.show_related(videos, _this.play, "Since you liked this, you might also like:");
        };
      })(this));
    };

    SurfaceController.prototype.minimise = function() {
      this.player.dispose();
      this.overlay.hide();
      this.slug.set_label("Resume Watching");
      this.slug.set_title(this.video.title());
      this.slug.set_poster(this.video.thumb());
      this.slug.open();
      this.slug.show();
      this.minimised = true;
      return window.gmcs.utils.cookieHandler.setCookie("gmcs-surface-minimised", 1, 10000);
    };

    SurfaceController.prototype.maximise = function() {
      if (this.minimised === true) {
        if (this.overlay === null) {
          this.create_overlay();
        }
        this.slug.hide();
        this.overlay.show();
        this.player = this.create_player(this.video, true, true);
        this.minimised = false;
        return window.gmcs.utils.cookieHandler.setCookie("gmcs-surface-minimised", 0, 10000);
      }
    };

    SurfaceController.prototype.update_current_time = function() {
      if (this.player.playing) {
        this.current_time = this.player.currentTime();
        return window.gmcs.utils.cookieHandler.setCookie("gmcs-surface-current_time", this.current_time, 10000);
      }
    };

    return SurfaceController;

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
          window.gmcs.log("Surface: User: User ID " + _this.id);
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
      this.onload = null;
      this.onempty = null;
      this.videos = [];
      if (last_played) {
        window.gmcs.log("Loading Last Played");
        this.load_video(last_played, callback);
      } else {
        this.load_playlist(callback);
      }
    }

    Playlist.prototype.add = function(vf) {
      this.videos.push(vf);
      return window.gmcs.log("Surface: User: Playlist: Add: " + vf.title());
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
      if (this.onempty) {
        this.onempty();
      }
      requestURI = window.gmcs.host + "/users/" + this.id + "/refreshplaylist/";
      window.gmcs.log("Requesting new playlist");
      return $.getJSON(requestURI, (function(_this) {
        return function(data) {
          var item, vf, _i, _len, _ref;
          _this.videos = [];
          window.gmcs.log(data.videos);
          _ref = data.videos.splice(0, 5);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            vf = new VideoFile(item.id, item.src, item.title, item.thumb_src);
            _this.add(vf);
          }
          $("#cs-footer-skip").text("Skip");
          $("#cs-footer-skip").addClass("footer-enabled");
          if (callback) {
            callback();
          }
          if (_this.onload) {
            return _this.onload();
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
        window.gmcs.log(this.videos);
        if (this.videos.length === 0) {
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
    function Pixel(user_id, action, video_id) {
      var acts, completed, liked, played, skipped;
      played = function() {
        var requestURI;
        requestURI = window.gmcs.host + "/users/" + user_id + "/played/" + video_id + "/";
        return $.getJSON(requestURI);
      };
      liked = function() {
        var requestURI;
        requestURI = window.gmcs.host + "/users/" + user_id + "/liked/" + video_id + "/";
        return $.getJSON(requestURI);
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

  Overlay = (function() {
    function Overlay(label) {
      this.remove_overlay = __bind(this.remove_overlay, this);
      this.set_blur = __bind(this.set_blur, this);
      this.hide_related = __bind(this.hide_related, this);
      this.show_related = __bind(this.show_related, this);
      this.onskip = __bind(this.onskip, this);
      this.onlike = __bind(this.onlike, this);
      this.onclose = __bind(this.onclose, this);
      this.disable_like = __bind(this.disable_like, this);
      this.enable_like = __bind(this.enable_like, this);
      this.disable_skip = __bind(this.disable_skip, this);
      this.enable_skip = __bind(this.enable_skip, this);
      this.set_title = __bind(this.set_title, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      var box, html, s;
      this.controller = null;
      this.dom = window.gmcs.utils.domManager;
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
      this.dom.appendDivToParent("cs-search", "cs-top-line");
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
      $("#cs-player-container").addClass("largeVideoWrapper");
      this.$wrapper = $("#cs-wrapper");
      this.$site_label = $("#cs-label");
      this.$title_label = $("#cs-video-title");
      this.$close_button = $("#cs-close");
      this.$like_button = $("#cs-footer-like");
      this.$skip_button = $("#cs-footer-skip");
      this.$related_container = $("#cs-related-container");
      this.$close_button.addClass("cs-close");
      this.$site_label.html(label);
      this.$like_button.text("Like");
      this.$like_button.addClass("footer-enabled");
      this.hide_related();
      this.disable_skip();
      box = document.createElement('input');
      box.type = "text";
      box.id = "cs-search-box";
      box.name = "q";
      document.getElementById("cs-search").appendChild(box);
      $("#cs-search-box").on("keyup", (function(_this) {
        return function() {
          var requestURI, text;
          text = $("#cs-search-box")[0].value;
          if (text.length > 0) {
            requestURI = window.gmcs.host + "/search/?q=" + text;
            return $.getJSON(requestURI, function(videos) {
              console.log("videos");
              return _this.show_related(videos, _this.controller.play, "Search results:");
            });
          } else {
            return _this.hide_related();
          }
        };
      })(this));
    }

    Overlay.prototype.show = function() {
      this.set_blur();
      return this.$wrapper.show();
    };

    Overlay.prototype.hide = function() {
      this.remove_overlay();
      return this.$wrapper.hide();
    };

    Overlay.prototype.set_title = function(title) {
      return this.$title_label.html(title);
    };

    Overlay.prototype.enable_skip = function() {
      this.$skip_button.text("Skip");
      return this.$skip_button.addClass("footer-enabled");
    };

    Overlay.prototype.disable_skip = function() {
      this.$skip_button.text("Optimising playlist");
      return this.$skip_button.removeClass("footer-enabled");
    };

    Overlay.prototype.enable_like = function(func) {
      this.$like_button.text("Like");
      this.$like_button.addClass("footer-enabled");
      return this.onlike(func);
    };

    Overlay.prototype.disable_like = function(func) {
      this.$like_button.text("Liked!");
      this.$like_button.unbind("click");
      return this.$like_button.removeClass("footer-enabled");
    };

    Overlay.prototype.onclose = function(func) {
      return this.$close_button.click(func);
    };

    Overlay.prototype.onlike = function(func) {
      return this.$like_button.click(func);
    };

    Overlay.prototype.onskip = function(func) {
      return this.$skip_button.click(func);
    };

    Overlay.prototype.show_related = function(videos, play_func, prompt) {
      var div, guid, parent, video, _fn, _i, _len;
      parent = this.$related_container;
      if (videos.length > 0) {
        parent.html(prompt);
        _fn = (function(_this) {
          return function(video) {
            div.onclick = function() {
              return play_func(new VideoFile(video.pk, video.fields.src, video.fields.title, video.fields.thumb_src));
            };
          };
        })(this);
        for (_i = 0, _len = videos.length; _i < _len; _i++) {
          video = videos[_i];
          guid = window.gmcs.utils.guid();
          div = document.createElement("div");
          div.className = "related-link";
          div.id = guid;
          parent[0].appendChild(div);
          div.innerHTML = " > " + video.fields.title;
          _fn(video);
        }
        parent.show();
      }
    };

    Overlay.prototype.hide_related = function() {
      return this.$related_container.hide();
    };

    Overlay.prototype.set_blur = function() {
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

    Overlay.prototype.remove_overlay = function() {
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

    return Overlay;

  })();

  Slug = (function() {
    function Slug(label) {
      this.preload = __bind(this.preload, this);
      this.open = __bind(this.open, this);
      this.close = __bind(this.close, this);
      this.set_poster = __bind(this.set_poster, this);
      this.set_title = __bind(this.set_title, this);
      this.set_label = __bind(this.set_label, this);
      this.click = __bind(this.click, this);
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      this.dom = window.gmcs.utils.domManager;
      this.dom.appendDivToBody("cs-slug-wrapper");
      this.dom.appendDivToParent("cs-slug-close", "cs-slug-wrapper");
      this.dom.appendDivToParent("cs-slug-body", "cs-slug-wrapper");
      this.dom.appendDivToParent("cs-slug-body-overlay", "cs-slug-body");
      this.dom.appendDivToParent("cs-slug-label", "cs-slug-body-overlay");
      this.dom.appendDivToParent("cs-slug-play-button", "cs-slug-body-overlay");
      this.dom.appendDivToParent("cs-slug-video-title", "cs-slug-body-overlay");
      this.$label = $("#cs-slug-label");
      this.set_label(label);
      this.$video_title = $("#cs-slug-video-title");
      this.$wrapper = $("#cs-slug-wrapper");
      this.$slug_body = $("#cs-slug-body");
      this.$close_button = $("#cs-slug-close");
      this.open();
      if (parseInt(window.gmcs.utils.cookieHandler.getCookie("gmcs-surface-slug-closed")) === 1) {
        this.close();
      }
      this.preload(["src/slug-close-active.png", "src/slug-close-inactive.png", "src/slug-open-active.png", "src/slug-open-inactive.png"]);
    }

    Slug.prototype.hide = function() {
      return this.$wrapper.hide();
    };

    Slug.prototype.show = function() {
      return this.$wrapper.show(200);
    };

    Slug.prototype.click = function(func) {
      return this.$slug_body.click(func);
    };

    Slug.prototype.set_label = function(text) {
      return this.$label.text(text);
    };

    Slug.prototype.set_title = function(text) {
      return this.$video_title.html(text);
    };

    Slug.prototype.set_poster = function(image_url) {
      var background;
      background = "url('" + image_url + "')";
      return this.$slug_body.css("background", background);
    };

    Slug.prototype.close = function() {
      this.$wrapper.addClass("slug-closed");
      this.$close_button.removeClass("slug-close-btn");
      this.$close_button.addClass("slug-open-btn");
      this.$close_button.unbind("click");
      this.$close_button.click(this.open);
      return window.gmcs.utils.cookieHandler.setCookie("gmcs-surface-slug-closed", 1, 10000);
    };

    Slug.prototype.open = function() {
      this.$wrapper.removeClass("slug-closed");
      this.$close_button.removeClass("slug-open-btn");
      this.$close_button.addClass("slug-close-btn");
      this.$close_button.unbind("click");
      this.$close_button.click(this.close);
      return window.gmcs.utils.cookieHandler.setCookie("gmcs-surface-slug-closed", 0, 10000);
    };

    Slug.prototype.preload = function(image_urls) {
      var url, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = image_urls.length; _i < _len; _i++) {
        url = image_urls[_i];
        _results.push((function(_this) {
          return function(url) {
            var img;
            img = new Image();
            return img.src = url;
          };
        })(this)(url));
      }
      return _results;
    };

    return Slug;

  })();

}).call(this);
