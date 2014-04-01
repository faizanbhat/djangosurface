# Copyright Genesis Media 2014 - All rights reserved.
# Author: Faizan Bhat 

$ = jQuery

$ ->
  
  # Add stylesheet
  # window.media = [{src:"src/3.mp4",poster:"src/poster.png",title:"Meet the team behind Genesis Media"}]
  window.media = [{ad:true,src:{mp4:"src/propel.mp4",webm:"src/propel.webm"},poster:"src/poster.png",title:"Advertisement",url:"https://www.facebook.com/propel"},{ad:false,src:{mp4:"src/miller.mp4",webm:"src/miller.webm"},poster:"src/poster.png",title:"Marissa Miller's Shape Magazine Cover",url:""},{ad:false,src:{mp4:"src/audrina.mp4",webm:"src/audrina.webm"},poster:"src/audrina.png",title:"Audrina Patridge",url:""}]
  surface = new Surface("ShapeTV",0)

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
    # Todo: Remove 
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
    s = vf.sources()
    @elem.src([{type:"video/mp4", src:s.mp4},{type:"video/webm",src:s.webm}])
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
  
  isMuted:=>
    return @elem.isPlaying()
          
  on:(callback,func) =>
    @elem.on(callback,func())
  
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
      
  moveToParentWithId:(new_parent_id)=>
    container = document.getElementById(@parent_id)
    player_div = document.getElementById(@id)
    container.removeChild(player_div)
    new_parent = document.getElementById(new_parent_id)
    new_parent.appendChild(player_div)
    player_div.width = new_parent.width
    player_div.height = new_parent.height
    @parent_id = new_parent_id
  
  enable_fullscreen:()=>
    $(".vjs-fullscreen-control").css("display","inline")
  
  disable_fullscreen:()=>
    $(".vjs-fullscreen-control").css("display","none")
    
  set_fullscreen_action:(func)=>
    $(".vjs-fullscreen-control")[0].onclick = func
    
  isPlaying:=>
    return @elem.isPlaying()
    
  
  
class Surface
  constructor:(@site_name,delay)->
    
    @current_video_index = @getCookie("gmcs-surface-current-video-index")
    if @current_video_index is null
      @current_video_index = 0;  
    @current_time  = @getCookie("gmcs-surface-current_time")
    if @current_time is null
      @current_time = 0;  
    @start_minimised = @getCookie("gmcs-surface-minimised")
    if @start_minimised is null
      @start_minimised = 0
    
    console.log "start minimised = " + @start_minimised
    console.log "Current index = "+ @current_video_index
    console.log "Current time = "+ @current_time
  
    @minimised = false
    @player = null
    
    # Read media files
    @videos = []
    for item in window.media
      vf = new VideoFile(item.src,0,item.poster,item.title,item.url,item.ad)
      @videos.push vf
  
    # Setup Dom
    @dom = new DomManager()
  
    @dom.getStyle("src/style.css")
    @dom.getStyle("vjs/video-js.css")

    run_surface = ()=>   
      @set_blur()

      new ScriptLoader "videoJs", @load_UI
    
    setTimeout(run_surface,delay);
          
  current_video:=>
    return @videos[@current_video_index]
  
  play_next_video:=>
    
    if (@current_video_index+1) < @videos.length
      @current_video_index=@current_video_index+1
      @player.loadFile(@current_video())
      @$video_title.html(@current_video().title())
      @player.play()
      @setCookie("gmcs-surface-current-video-index",@current_video_index,10000)
      
    if @current_video().isAd()
      @disable_minimise()
    else
      @enable_minimise()
  
  minimise: =>
    if @player.playing 
      playing = true
    else 
      playing = false
      
    @current_video().setPosition(@player.currentTime()) # Update video file current time
    @remove_overlay()
    @$wrapper.hide()
    
    @player.moveToParentWithId("cs-small-player-container") # Move player

    @player.enable_fullscreen()
        
    $("#cs-slug-wrapper").show() # Show slug
    
    @minimised = true
    
    if playing
      @player.play()
      
    # update cookie
    @setCookie("gmcs-surface-minimised",1,10000)
    
    
  maximise:=>
    if (@minimised==true)
        
        @player.disable_fullscreen()
        
        @hide_slug() # Use twice so this gets its own method

        @set_blur() # Add overlay + blur again
    
        @player.moveToParentWithId("cs-player-container") # Move player
    
        @$wrapper.show() # Show wrapper
    
        @player.play() # For some reason player stops after it's moved around
        
        @minimised = false
        
        @setCookie("gmcs-surface-minimised",0,10000)
        
    
  disable_minimise: =>
    if @current_video().isAd()
      $("#cs-close").css("opacity","0.2")
      $("#cs-close").attr('onclick','').unbind('click')

  enable_minimise: =>
    $("#cs-close").css("opacity","0.8")
    $("#cs-close").attr('onclick','').unbind('click')    
    $("#cs-close").click =>
      @minimise()
      
  hide_slug:=>    
    @current_video().setPosition(@player.currentTime())
    $("#cs-slug-wrapper").hide()

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
    @dom.appendDivToParent("cs-video-time-remaining","cs-bottom-line")
    @dom.appendDivToParent("cs-player-wrapper","cs-main")
    @dom.appendDivToParent("cs-player-container","cs-player-wrapper")
    @dom.appendDivToParent("cs-footer","cs-wrapper")
     
    @$wrapper = $("#cs-wrapper")
    @$video_title = $("#cs-video-title")
    label = $("#cs-label")
    player_container = $("#cs-player-container")
    
    # Player style
    player_container.addClass("largeVideoWrapper")      
    
    # Messaging
    label.html(@site_name)
    if @current_video().isAd()
      @$video_title.html(@videos[@current_video_index+1].title())
      
      
    else
      @$video_title.html(@current_video().title())
    
    @enable_minimise()
    
    # Video Player
    @player = new Player("cs-video-player","cs-player-container")   
    @player.ready(=>
      @player.loadFile(@current_video())
      if @current_time > 0
        @player.loadedmetadata(=>@player.setCurrentTime(@current_time))
      @player.ended(@play_next_video)
      @player.set_fullscreen_action(@maximise)
      if @current_video().isAd()
        @player.onplay(@disable_minimise)
      @player.onplay(=>@$video_title.html(@current_video().title()))
      @player.timeUpdate(@update_current_time)
    )
    
#   Load elements for slug  
    @dom.appendDivToBody("cs-slug-wrapper")
    @dom.appendDivToParent("cs-small-player-container","cs-slug-wrapper")
    @$slug_wrapper = $("#cs-slug-wrapper")

    player_container = $("#cs-small-player-container")
    player_container.addClass("smallVideoWrapper")      
    
    @hide_slug()    # Hide slug
    
    if @start_minimised > 0
      @minimise()
      
  set_bindings:=>
    $("#cs-close").click =>
      @minimise()

  toggle_mute:=>
    if @player.isMuted()
      @player.unmute()
    else
      @player.mute()

  update_current_time:=>
    if @player.playing
      @setCookie("gmcs-surface-current_time",@player.currentTime(),10000)
  
  
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

class VideoFile
  constructor:(src,position,poster,title,@video_url,@ad)->
    @file_src = src ? ""
    @playback_position = position ? 0
    @video_poster = poster ? ""
    @video_title = title ? ""

  sources:=>
    return @file_src

  position:=>
    return @playback_position

  setPosition:(pos)=>
    @playback_position = pos
    
  title:=>
    return @video_title
  
  url:=>  
    return @video_url

  poster:=>
    if @video_poster.length > 0
      return @video_poster
    return null
    
  isAd:=>
    return @ad