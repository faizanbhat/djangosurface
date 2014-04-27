# Copyright Genesis Media 2014 - All rights reserved.
# Author: Faizan Bhat 

$ = jQuery

$ ->
  window.gmcs = {}
  window.gmcs.site_id = "1"
  window.gmcs.host = "http://0.0.0.0:5000"    
  window.gmcs.utils = {}
  window.gmcs.utils.domManager = new DomManager()
  window.gmcs.utils.cookieHandler = new CookieHandler()
  window.gmcs.utils.guid = ->
    chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    today = new Date()
    result = today.valueOf().toString 16
    result += chars.substr Math.floor(Math.random() * chars.length), 1
    result += chars.substr Math.floor(Math.random() * chars.length), 1
    return result
  window.gmcs.surface = new SurfaceController("Nat Geo TV")
  

class CookieHandler
  setCookie:(name, value, days) ->
    if days
      date = new Date()
      date.setTime date.getTime() + (days * 24 * 60 * 60 * 1000)
      expires = "; expires=" + date.toGMTString()
    else
      expires = ""
    document.cookie = name + "=" + value + expires + "; path=/"
  
  
  getCookie:(name) ->
    nameEQ = name + "="
    ca = document.cookie.split(";")
    i = 0
    while i < ca.length
      c = ca[i]
      c = c.substring(1, c.length)  while c.charAt(0) is " "
      return c.substring(nameEQ.length, c.length)  if c.indexOf(nameEQ) is 0
      i++
    null
  
  deleteCookie:(name) ->
    setCookie name, "", -1
  
class ScriptLoader
    constructor: (options..., callback) ->
        @libraries = {jQuery: "http://ajax.googleapis.com/ajax/libs/jquery/$version/jquery.js",videoJs: "vjs/video.dev.js"}
        [lib, version, compressed] = options
        if @libraries[lib] then lib = @libraries[lib]

        loadCallback = =>
            return if @loaded
            @loaded = true
            callback()

        s = document.createElement 'script'
        s.onload = loadCallback
        s.onreadystatechange = ->
            loadCallback() if /loaded|complete/.test(s.readyState)
        
        s.src = lib.replace('$version', version)
        
        if compressed then lib = lib.replace('.js', '.min.js')
        document.getElementsByTagName('head')[0].appendChild(s)
        
class DomManager
  constructor:()->
    @body = document.getElementsByTagName("body")[0]
    @head = document.getElementsByTagName("head")[0]
      
  appendDivToBody:(id)=>
    s = document.createElement("div")
    s.id = id
    @body.appendChild(s)

  appendDivToParent:(id,parent_id)=>
    s = document.createElement("div")
    s.id = id
    parent = document.getElementById(parent_id)
    parent.appendChild(s)
  
  get:(id)=>
    e = document.getElementById(id)
    return e
    
  getStyle:(url)=>
    l = document.createElement("link")
    l.href = url
    l.rel = "stylesheet"
    l.type = "text/css"
    @head.appendChild(l)

class Player
  constructor:(id,parent_id)->
    @id = id
    @parent_id = parent_id
    p = document.createElement("video")
    p.setAttribute("id",id)
    p.setAttribute("class","video-js vjs-default-skin vjs-big-play-button")
    p.setAttribute("height","100%")
    p.setAttribute("width","100%")
    p.setAttribute("data-setup","{}")
    p.setAttribute("controls","")
    document.getElementById(parent_id).appendChild(p)
    @elem = videojs(id) 
    @playing = false
    @elem.on("play",=>@playing=true)
    @elem.on("pause",=>@playing=false)
    
  play:=>
    @elem.play()
    
  pause:=>
    @elem.pause()
    
  mute:=>
    @elem.volume(0)
    
  unmute:=>
    @elem.volume(1)
  
  loadFile:(vf)=>
    s = vf.src()
    @elem.src([{type:"video/flv", src:s}])
       
  duration:=>
    return @elem.duration()
    
  currentTime:=>
    return @elem.currentTime()
        
  timeRemaining:=>
    return @duration() - @currentTime()
    
  isMuted:=>
    return @elem.muted()
          
  on:(callback,func) =>
    @elem.on(callback,func)
    
  one:(callback,func) =>
    @elem.one(callback,func)
  
  timeUpdate:(func)=>
    @elem.on("timeupdate",func)
    
  ended:(func) =>
    @elem.on("ended",func)
  
  onplay:(func) =>
    @elem.on("play",func)
    
  onpause:(func) =>
    @elem.on("pause",func)
  
  ready:(func)=>
    @elem.ready(func)
  
  loadedmetadata:(func)=>
    @elem.on("loadedmetadata",func)
    
  setCurrentTime:(time)=>
    @elem.currentTime(time)
    
  isPlaying:=>
    return @playing
    
  hideProgressBar:=>
    @elem.controlBar.progressControl.hide()
  
  showProgressBar:=>
    @elem.controlBar.progressControl.show()
    
  dispose:=>
    @elem.dispose()
  
class SurfaceController
  constructor:(@site_name,delay)->
    @hostname = window.gmcs.host
    cookieHandler = window.gmcs.utils.cookieHandler
    
    @callbacks = {
      'playlist_loaded':@load_VJS
      'videojs_loaded':@load_UI
    }
    
    @user = new User(@callbacks['playlist_loaded'])
    
    @current_time  = parseInt(cookieHandler.getCookie("gmcs-surface-current_time"))
    if isNaN(@current_time)
      @current_time = 0
    @start_minimised = parseInt(cookieHandler.getCookie("gmcs-surface-minimised"))
    if isNaN(@start_minimised)
      @start_minimised = 0
    
    @minimised = false
    @player = null
        
    # Setup Dom
    @dom = window.gmcs.utils.domManager
    @dom.getStyle("src/style.css")
    @dom.getStyle("vjs/video-js.css")

  load_VJS:=>
    console.log "Loading Video JS"
    new ScriptLoader "videoJs", @callbacks['videojs_loaded']
    
  load_UI:=>        
    @video = @user.playlist.next()    
    @overlay = null 
    
    if @start_minimised > 0
     
      @minimised = true
      @create_slug()
      
    else
      @create_overlay()
      @create_slug()
      @minimised = false
      
      @player = @create_player(@video,false,false)
      
        
    undefined
    
  create_overlay:=>
    @overlay = new Overlay(@site_name)
    @overlay.onclose(@minimise)
    @overlay.onlike(@like_video)
    @overlay.set_title(@video.title())
  
    @overlay.onskip(=>
      new Pixel @user.id, "skip", @video.id
      @play_next_video()
    )
    
  create_slug:=>
    @slug = new Slug("Recommended For You")
    @slug.click(@maximise)
    @slug.set_title(@video.title())
    @slug.set_poster(@video.thumb())

  refresh_slug:=>
    @slug.set_title(@video.title())
    @slug.set_poster(@video.thumb())
  
  create_player:(video,autoplay,resume)=>
    
    player = new Player("cs-video-player","cs-player-container")   
    player.ready(=>
      player.loadFile(video)        
      player.ended(=>
        console.log "ENDED"
        new Pixel @user.id, "complete", @video.id
        @play_next_video()
        )
     
      if autoplay
        player.play()

      if resume
        player.one("loadedmetadata",=>
          player.setCurrentTime(@current_time)
            
      )
      player.timeUpdate(@update_current_time)
    )
    player
  
  play:(v)=>
     @video = v      
     @overlay.set_title(@video.title())
     @overlay.enable_like(@like_video)
     @overlay.hide_related()
     @player.loadFile(@video)
     @player.play()
    
  play_next_video:=>
    v= @user.playlist.next()
    if v != null
      @video = v      
      console.log "Surface: Play next video: " + @video.title()
      @overlay.set_title(@video.title())
      @overlay.enable_like(@like_video)
      @overlay.hide_related()
      @player.loadFile(@video)
      @player.play()
      
  like_video:=>
    @overlay.disable_like()
    new Pixel(@user.id, "like", @video.id)
    requestURI = window.gmcs.host + "/videos/" + @video.id + "/related/"
    console.log requestURI
    $.getJSON(requestURI, (videos)=>
      @overlay.show_related(videos, @play)
    )
    
  minimise:() =>      
    @player.dispose()
    @overlay.hide()    
    @slug.set_label("Resume Watching")
    @slug.set_title(@video.title())
    @slug.set_poster(@video.thumb())
    
    @slug.open()
    @slug.show()
    @minimised = true
    @cookieHandler.setCookie("gmcs-surface-minimised",1,10000)
        
  maximise:=>
    if (@minimised==true)
        debugger;
        if @overlay is null
          @create_overlay()
        @slug.hide()
        @overlay.show()
        @player = @create_player(@video,true,true)
        @minimised = false        
        @cookieHandler.setCookie("gmcs-surface-minimised",0,10000)
                                  
  update_current_time:=>
    if @player.playing
      @current_time = @player.currentTime()
      @cookieHandler.setCookie("gmcs-surface-current_time",@current_time,10000)
  

class VideoFile
  constructor:(@id,@file_src,@video_title,@thumb_href)->
    @playback_position = 0

  src:=>
    return @file_src

  position:=>
    return @playback_position

  setPosition:(pos)=>
    @playback_position = pos
    
  title:=>
    return @video_title
  
  url:=>  
    return @video_url
    
  isAd:=>
    return @ad
  
  thumb:=>
    return @thumb_href

class User
  constructor:(callback)->
    @cookie_handler =  window.gmcs.utils.cookieHandler
    guid = @cookie_handler.getCookie("gmcs-surface-user-guid") ? window.gmcs.utils.guid()
    requestURI = window.gmcs.host + "/users/get?guid=" + guid + "&site_id=" + window.gmcs.site_id
    $.getJSON(requestURI, (user_data)=>
      @id = user_data.id.toString()
      @cookie_handler.setCookie("gmcs-surface-user-guid",guid,10000)
      console.log "Surface: User: User ID "+ @id
      @playlist = new Playlist(@id,callback,user_data.last_played)
      )

class Playlist
  constructor:(@id,callback,last_played)->
    @videos = []
    if last_played
      console.log "Loading Last Played"
      @load_video(last_played,callback)
    else
      @load_playlist(callback)
        
  add:(vf)=>
    @videos.push vf
    console.log "Surface: User: Playlist: Add: " + vf.title()
  
  load_video:(video_json,callback)=>
    vf = new VideoFile(video_json.id,video_json.src,video_json.title,video_json.thumb_src)
    @add(vf)
    callback() if callback
    
  load_playlist:(callback)=>
    requestURI = window.gmcs.host + "/users/" + @id + "/refreshplaylist/"
    console.log "Requesting new playlist"
    $.getJSON(requestURI, (data)=>
      @videos = []
      console.log data.videos
      for item in data.videos.splice(0,5)
        vf = new VideoFile(item.id,item.src,item.title,item.thumb_src)
        @add(vf)
      $("#cs-footer-skip").text("Skip")
      $("#cs-footer-skip").addClass("footer-enabled")
      callback() if callback
    )
            
  current:=>
    @videos[0]
    
  next:=>
    if @videos.length > 0
      v = @videos.shift()
      new Pixel @id, "play", v.id
      console.log @videos
      if @videos.length == 0
        $("#cs-footer-skip").text("Optimising playlist")
        $("#cs-footer-skip").removeClass("footer-enabled")
        @load_playlist()
      return v
    
    else
      return null
    
class Pixel
  constructor: (user_id,action,video_id) ->
    played = ->
      requestURI = window.gmcs.host + "/users/" + user_id + "/played/" + video_id + "/"
      $.getJSON(requestURI)
    
    liked = ->
      requestURI = window.gmcs.host + "/users/" + user_id + "/liked/" + video_id + "/"
      $.getJSON(requestURI)
        
    skipped = ->
      requestURI = window.gmcs.host + "/users/" + user_id + "/skipped/" + video_id + "/"
      $.getJSON(requestURI)
    
    completed = ->
      requestURI = window.gmcs.host + "/users/" + user_id + "/completed/" + video_id + "/"
      $.getJSON(requestURI)

    acts = {
      "play":played,
      "like":liked,
      "skip":skipped,
      "complete":completed
    }
    
    try
      acts[action]()
    catch
      return null
      
class Overlay
  constructor:(label)->
    @dom = window.gmcs.utils.domManager
    @set_blur()
    s = document.createElement("div")
    s.id = "cs-wrapper"
    html = document.getElementsByTagName("html")[0]
    html.appendChild(s)
    @dom.appendDivToParent("cs-overlay","cs-wrapper")
    @dom.appendDivToParent("cs-header","cs-wrapper")
    @dom.appendDivToParent("cs-close","cs-header")
    @dom.appendDivToParent("cs-main","cs-wrapper")
    @dom.appendDivToParent("cs-info-wrapper","cs-main")
    @dom.appendDivToParent("cs-top-line","cs-info-wrapper")
    @dom.appendDivToParent("cs-rule","cs-info-wrapper")
    @dom.appendDivToParent("cs-bottom-line","cs-info-wrapper")
    @dom.appendDivToParent("cs-label","cs-top-line")
    @dom.appendDivToParent("cs-video-title","cs-bottom-line")
    @dom.appendDivToParent("cs-player-wrapper","cs-main")
    @dom.appendDivToParent("cs-player-container","cs-player-wrapper")
    @dom.appendDivToParent("cs-footer","cs-player-wrapper")
    @dom.appendDivToParent("cs-footer-skip","cs-footer")
    @dom.appendDivToParent("cs-footer-like","cs-footer")
    @dom.appendDivToParent("cs-related-container","cs-player-wrapper")
    @dom.appendDivToParent("cs-related-1","cs-related-container")
    @dom.appendDivToParent("cs-related-2","cs-related-container")
    @dom.appendDivToParent("cs-related-3","cs-related-container")
    $("#cs-player-container").addClass("largeVideoWrapper") 
    
    @$wrapper = $("#cs-wrapper")
    @$site_label = $("#cs-label")
    @$title_label = $("#cs-video-title")
    @$close_button = $("#cs-close")
    @$like_button = $("#cs-footer-like")
    @$skip_button = $("#cs-footer-skip")
    @$related_container = $("#cs-related-container")
    
    @$close_button.addClass("cs-close")     
    @$site_label.html(label)
    @$like_button.text("Like")
    @$like_button.addClass("footer-enabled")
    @$related_container.html("Since you liked this, you might also like:")
    
    @hide_related()
    @enable_skip()
    
  show: =>
    @set_blur()
    @$wrapper.show()
  
  hide: =>
    @remove_overlay()
    @$wrapper.hide()
    
  set_title:(title)=>
    @$title_label.html(title)
  
  enable_skip:=>
    @$skip_button.text("Skip")
    @$skip_button.addClass("footer-enabled")
      
  disable_skip:=>
    @$skip_button.text("Optimising playlist")
    @$skip_button.removeClass("footer-enabled")

  enable_like:(func)=>
    @$like_button.text("Like")
    @$like_button.addClass("footer-enabled")
    @onlike(func)
    
  disable_like:(func)=>
    @$like_button.text("Liked!")
    @$like_button.unbind("click")
    @$like_button.removeClass("footer-enabled")
    
  onclose:(func)=>
    @$close_button.click(func)
    
  onlike:(func)=>
    @$like_button.click(func)
    
  onskip:(func)=>
    @$skip_button.click(func)
  
  show_related:(videos,play_func)=>
    parent = @$related_container  
    if videos.length > 0
  
      parent.html("Since you liked this, you might also like:")
  
      for video in videos
        guid = window.gmcs.utils.guid()
        div = document.createElement("div")
        div.className = "related-link"
        div.id = guid
        parent[0].appendChild(div)
    
        div.innerHTML = " > " + video.fields.title
        do (video) =>
          div.onclick = =>
            play_func(new VideoFile(video.pk,video.fields.src,video.fields.title,video.fields.thumb_src))
          return
      parent.show()
    return
    
  hide_related:()=>
    @$related_container.hide()
  
    
  set_blur:=>
    $("body").css("filter","blur(15px)")
    $("body").css("filter","url(src/blur.svg#blur)")
    $("body").css("-webkit-filter","blur(15px)")
    $("body").css("-moz-filter","blur(15px)")
    $("body").css("-o-filter","blur(15px)")
    $("body").css("-ms-filter","blur(15px)")
    # disable scroll
    $('html, body').css({
        'overflow': 'hidden',
        'height': '100%'
    })
    
  remove_overlay:=>
    $("body").css("-webkit-filter","blur(0px)")
    $("html").css("filter","blur(0px)")
    $("body").css("filter","url(src/blur.svg#noBlur)")
    $("body").css("-moz-filter","blur(0px)")
    $("body").css("-o-filter","blur(0px)")
    $("body").css("-ms-filter","blur(0px)")
    $('html, body').css({
        'overflow': 'auto',
        'height': 'auto'
    })
  
class Slug
  constructor:(label) ->
    @dom = window.gmcs.utils.domManager
    @dom.appendDivToBody("cs-slug-wrapper")
    @dom.appendDivToParent("cs-slug-close","cs-slug-wrapper")
    @dom.appendDivToParent("cs-slug-body","cs-slug-wrapper")
    @dom.appendDivToParent("cs-slug-body-overlay","cs-slug-body")
    @dom.appendDivToParent("cs-slug-label","cs-slug-body-overlay")
    @dom.appendDivToParent("cs-slug-play-button","cs-slug-body-overlay")
    @dom.appendDivToParent("cs-slug-video-title","cs-slug-body-overlay")
    @$label = $("#cs-slug-label")
    @set_label(label)
    @$video_title = $("#cs-slug-video-title")
    @$wrapper = $("#cs-slug-wrapper")
    @$slug_body = $("#cs-slug-body")
    @$close_button = $("#cs-slug-close")
    if parseInt(window.gmcs.utils.cookieHandler.getCookie("gmcs-surface-slug-closed")) is 0
      @open()
    else
      @close()
    @preload(["src/slug-close-active.png","src/slug-close-inactive.png","src/slug-open-active.png","src/slug-open-inactive.png"])
  
  hide:=>
    @$wrapper.hide()
  
  show:=>
    @$wrapper.show(200)
    
  click:(func)=>
    @$slug_body.click(func)
  
  set_label:(text)=>
    @$label.text(text)

  set_title:(text)=>
    @$video_title.text(text)
    
  set_poster:(image_url)=>
    background = "url('"+image_url+"')"
    @$slug_body.css("background",background)
  
  close:=>
    @$wrapper.addClass("slug-closed")
    @$close_button.removeClass("slug-close-btn")
    @$close_button.addClass("slug-open-btn")
    @$close_button.unbind("click")
    @$close_button.click(@open)
    cookieHandler = window.gmcs.utils.cookieHandler
    window.gmcs.utils.cookieHandler.setCookie("gmcs-surface-slug-closed",1,10000)
    
    
  open:=>
    @$wrapper.removeClass("slug-closed")
    @$close_button.removeClass("slug-open-btn")
    @$close_button.addClass("slug-close-btn")
    @$close_button.unbind("click")
    @$close_button.click(@close)
    window.gmcs.utils.cookieHandler.setCookie("gmcs-surface-slug-closed",0,10000)
    
  preload:(image_urls)=>
    for url in image_urls
      do (url) =>
        img = new Image()
        img.src = url
        
        
        
      
      
    
    
    
  
    
    
