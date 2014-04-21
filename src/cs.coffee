# Copyright Genesis Media 2014 - All rights reserved.
# Author: Faizan Bhat 

$ = jQuery

$ ->
  window.gmcs = {}
  window.gmcs.site_id = "1"
  window.gmcs.host = "http://localhost:8080"    
  window.gmcs.utils = {}
  window.gmcs.utils.cookieHandler = new CookieHandler()
  window.gmcs.utils.surface = new Surface("Nat Geo TV")


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
  
class Surface
  constructor:(@site_name,delay)->
    @hostname = window.gmcs.host
    @cookieHandler = window.gmcs.utils.cookieHandler
    
    @callbacks = {
      'playlist_loaded':@load_VJS
      'videojs_loaded':@load_UI
    }
    
    @user = new User(@callbacks['playlist_loaded'])
    
    @current_time  = parseInt(@cookieHandler.getCookie("gmcs-surface-current_time"))
    if isNaN(@current_time)
      @current_time = 0
    @start_minimised = parseInt(@cookieHandler.getCookie("gmcs-surface-minimised"))
    if isNaN(@start_minimised)
      @start_minimised = 0
    
    @minimised = false
    @player = null
        
    # Setup Dom
    @dom = new DomManager()
    @dom.getStyle("src/style.css")
    @dom.getStyle("vjs/video-js.css")
    @set_blur()

  load_VJS:=>
    new ScriptLoader "videoJs", @callbacks['videojs_loaded']
    
  load_UI:=>
    # Append Surface wrapper OUTSIDE body
    s = document.createElement("div")
    s.id = "cs-wrapper"
    html = document.getElementsByTagName("html")[0]
    html.appendChild(s)

    # Create Div Structure
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
    @dom.appendDivToBody("cs-slug-wrapper")
    
    @$wrapper = $("#cs-wrapper")    
    @$slugWrapper = $("#cs-slug-wrapper")
    @$slugWrapper.click(@maximise)
    @hide_slug()
    
    $("#cs-player-container").addClass("largeVideoWrapper")      
    
    @video = @user.playlist.next()    

    @$video_title = $("#cs-video-title")
    @$video_title.html(@video.title())
    
    $("#cs-label").html(@site_name)

    $("#cs-close").addClass("cs-close")
    $("#cs-close").click(@minimise)
    
    $("#cs-footer-skip").text("Skip")
    $("#cs-footer-skip").click(=>
      new Pixel @user.id, "skip", @video.id
      @play_next_video()
      )
    $("#cs-footer-skip").addClass("footer-enabled")
    
    $("#cs-footer-like").text("Like")
    $("#cs-footer-like").click(@like_video)
    $("#cs-footer-like").addClass("footer-enabled")
    
    @player = @create_player(@video,false,true)
        
    if @start_minimised > 0
        @minimise()
        
    undefined
    
  create_player:(video,autoplay,resume)=>
    
    player = new Player("cs-video-player","cs-player-container")   
    player.ready(=>
      player.loadFile(video)        
      player.ended(@play_next_video)
      
      player.one("play", =>
        new Pixel @user.id, "play", @video.id
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
    
  play_next_video:=>
    @video = @user.playlist.next()
    console.log "Surface: Play next video: " + @video.title()
    @$video_title.html(@video.title())
    @player.pause()
    @player.loadFile(@video)
    @player.one("play", =>
      new Pixel @user.id, "play", @video.id
      )
    # @player.one("play", )
    @player.play()
    $("#cs-footer-like").text("Like")
    $("#cs-footer-like").click(@like_video)
    $("#cs-footer-like").addClass("footer-enabled")
      
  like_video:=>
    $("#cs-footer-like").unbind("click")
    $("#cs-footer-like").text("Liked!")
    $("#cs-footer-like").removeClass("footer-enabled")
    new Pixel @user.id, "like", @video.id
  
  minimise:() =>      
    @player.dispose()
    @remove_overlay()
    @$wrapper.hide()
    $("#cs-slug-wrapper").show("100") # Show slug
    @minimised = true
    @cookieHandler.setCookie("gmcs-surface-minimised",1,10000)
        
  maximise:=>
    if (@minimised==true)
        @hide_slug() # Use twice so this gets its own method
        @set_blur() # Add overlay + blur again
        @$wrapper.show() # Show wrapper
        @player = @create_player(@video,true,true)
        @minimised = false        
        @cookieHandler.setCookie("gmcs-surface-minimised",0,10000)
                      
  hide_slug:=>    
    $("#cs-slug-wrapper").hide()
            
  update_current_time:=>
    if @player.playing
      @current_time = @player.currentTime()
      @cookieHandler.setCookie("gmcs-surface-current_time",@current_time,10000)
  
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

    user_id= @cookie_handler.getCookie("gmcs-surface-current-user-id")
    if user_id is null
      requestURI = window.gmcs.host + "/create-user/" + window.gmcs.site_id + "/"
      $.getJSON(requestURI, (data)=>
        @id = data.id.toString()
        console.log "User: Model: New Surface User "+@id    
        @cookie_handler.setCookie("gmcs-surface-current-user-id",@id,10000)
        @playlist = new Playlist(data.playlist.videos, @id)
        callback()
        )
        
    else
      @id = user_id
      requestURI = window.gmcs.host + "/generate/" + @id + "/"
      $.getJSON(requestURI, (data)=>
        console.log data
        @playlist = new Playlist(data.videos, @id)
        callback()
        )
      console.log "Surface: User: Existing Surface User "+@id

class Playlist
  constructor:(playlist, @id)->
    @videos = []
    for item in playlist
      vf = new VideoFile(item.id,item.src,item.title,item.thumb)
      @add(vf)
  
  add:(vf)=>
    @videos.push vf
    console.log "Surface: User: Playlist: Add: " + vf.title()
  
  generate:=>
    console.log "Generate called"
    requestURI = window.gmcs.host + "/generate/" + @id + "/"
    $.getJSON(requestURI, (data)=>
      console.log data
      @videos = []
      for item in data.videos
        vf = new VideoFile(item.id,item.src,item.title,item.thumb)
        @add(vf)
      )
    console.log @videos 
    
  current:=>
    @videos[0]
    
  next:=>
    console.log "next"
    v = @videos.shift()
    console.log @videos
    if @videos.length < 1
      new Pixel @id, "play", v.id
      @generate()
    return v
    
class Pixel
  constructor: (user_id,action,video_id) ->
       
    played = ->
      requestURI = window.gmcs.host + "/played/" + user_id + "/" + video_id + "/"
      $.getJSON(requestURI)
    
    liked = ->
      requestURI = window.gmcs.host + "/liked/" + user_id + "/" + video_id + "/"
      $.getJSON(requestURI)
  
    skipped = ->
      requestURI = window.gmcs.host + "/skipped/" + user_id + "/" + video_id + "/"
      $.getJSON(requestURI)
    
    completed = ->
      requestURI = window.gmcs.host + "/completed/" + user_id + "/" + video_id + "/"
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
