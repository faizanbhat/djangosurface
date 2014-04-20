# Copyright Genesis Media 2014 - All rights reserved.
# Author: Faizan Bhat 

$ = jQuery

$ ->
  window.gmcs = {}
  window.gmcs.site_id = "1"
  window.gmcs.host = "http://localhost:8080"    
    
  surface = new Surface("Nat Geo TV")



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
    console.log "load file called"
    s = vf.sources()
    @elem.src([{type:"video/flv", src:s}])
    if vf.poster()
      @elem.poster(vf.poster())
       
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
    user = @set_or_create_user()
    
    @current_video_index = parseInt(@getCookie("gmcs-surface-current-video-index"))
    if isNaN(@current_video_index)
      @current_video_index = 1
    @current_time  = parseInt(@getCookie("gmcs-surface-current_time"))
    if isNaN(@current_time)
      @current_time = 0
    @start_minimised = parseInt(@getCookie("gmcs-surface-minimised"))
    if isNaN(@start_minimised)
      @start_minimised = 0
    
    @minimised = false
    @player = null
    @video = null
    @next_video = null
    
    # Setup Dom
    @dom = new DomManager()
    @dom.getStyle("src/style.css")
    @dom.getStyle("vjs/video-js.css")
    @set_blur()

    new ScriptLoader "videoJs", @load_UI
      
  set_or_create_user:=>
    user_id= @getCookie("gmcs-surface-current-user-id")
    if user_id is null
      requestURI = @hostname+"/csuser/create/" + window.gmcs.site_id
      $.getJSON(requestURI, (data)=>
        console.log data
        @user_id = data.id.toString()
        @setCookie("gmcs-surface-current-user-id",@user_id,10000)
        console.log @user_id
        )
    else
      @user_id = user_id
      console.log @user_id
    

      

      
    
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
    
    @$wrapper = $("#cs-wrapper")
    @$video_title = $("#cs-video-title")
    label = $("#cs-label")
    player_container = $("#cs-player-container")

    $("#cs-close").addClass("cs-close")
    $("#cs-close").click(@minimise)
    
    $("#cs-footer-skip").text("Skip")
    $("#cs-footer-skip").click(@play_next_video)
    $("#cs-footer-skip").addClass("footer-enabled")
    
    $("#cs-footer-like").text("Like")
    $("#cs-footer-like").click(@like_video)
    $("#cs-footer-like").addClass("footer-enabled")
    
    # Player style
    player_container.addClass("largeVideoWrapper")      

    # Messaging
    label.html(@site_name)
        
    # Video Player
    @create_player(false,true)
        
    @dom.appendDivToBody("cs-slug-wrapper")
    @$slugWrapper =  $("#cs-slug-wrapper")
    @$slugWrapper.click(@maximise)
    
    @hide_slug()    # Hide slug
    
    if @start_minimised > 0
        @minimise()
    
    undefined
    
  create_player:(autoplay,resume)=>
    @player = new Player("cs-video-player","cs-player-container")   
    @player.ready(=>
      $.getJSON(@hostname+"/videos/"+@current_video_index+"/", (data)=>
        @video = new VideoFile(data.src,data.title)
        @$video_title.html(data.title)
        @player.loadFile(@video)        
        @player.ended(@play_next_video)
        if autoplay
          @player.play()
        if resume
          @player.one("loadedmetadata",=>
            @player.setCurrentTime(@current_time)
        )
        @player.timeUpdate(@update_current_time)
        undefined    
        )
    undefined  
    )
    
  play_next_video:=>
    @current_video_index = @current_video_index + 1
    @setCookie("gmcs-surface-current-video-index",@current_video_index,10000)
    json  = $.getJSON("http://localhost:8080/videos/"+@current_video_index+"/", (data)=>
      @video = new VideoFile(data.src,data.title)
      @$video_title.html(data.title)
      @player.pause()
      @player.loadFile(@video)
      @player.play()
      )
      
  like_video:=>
    $("#cs-footer-like").unbind("click")
    $("#cs-footer-like").removeClass("footer-enabled")
    $("#cs-footer-like").removeClass("footer-enabled")
    
  
  minimise:() =>      
    @player.dispose()
    @remove_overlay()
    @$wrapper.hide()
    $("#cs-slug-wrapper").show("100") # Show slug
    @minimised = true
    @setCookie("gmcs-surface-minimised",1,10000)
        
  maximise:=>
    if (@minimised==true)
        @hide_slug() # Use twice so this gets its own method
        @set_blur() # Add overlay + blur again
        @$wrapper.show() # Show wrapper
        @create_player(true,true)
        @minimised = false        
        @setCookie("gmcs-surface-minimised",0,10000)
                      
  hide_slug:=>    
    $("#cs-slug-wrapper").hide()
            
  update_current_time:=>
    if @player.playing
      @current_time = @player.currentTime()
      @setCookie("gmcs-surface-current_time",@current_time,10000)
  
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
    
  # START COOKIE HANDLING
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
    
  # END COOKIE HANDLING

class VideoFile
  constructor:(src,@t)->
    @file_src = src ? ""
    @playback_position = 0
    @video_poster = ""

  sources:=>
    return @file_src

  position:=>
    return @playback_position

  setPosition:(pos)=>
    @playback_position = pos
    
  title:=>
    return @t
  
  url:=>  
    return @video_url

  poster:=>
    if @video_poster.length > 0
      return @video_poster
    return null
    
  isAd:=>
    return @ad
  
  thumbnail:=>
    return @thumb
    