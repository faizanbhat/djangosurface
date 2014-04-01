# Copyright Genesis Media 2014 - All rights reserved.
# Author: Faizan Bhat 

$ = jQuery

$ ->
  
  # Add stylesheet
  # window.media = [{src:"src/3.mp4",poster:"src/poster.png",title:"Meet the team behind Genesis Media"}]
  window.media = [{ad:true,src:{mp4:"src/propel.mp4",webm:"src/propel.webm"},poster:"src/poster.png",title:"Advertisement",url:"https://www.facebook.com/propel"},{ad:false,src:{mp4:"src/miller.mp4",webm:"src/miller.webm"},poster:"src/poster.png",title:"Marissa Miller's Shape Magazine Cover",url:""},{ad:false,src:{mp4:"src/audrina.mp4",webm:"src/audrina.webm"},poster:"src/poster.png",title:"Audrina Patridge",url:""}]
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
            console.log "on ready state change"
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
      
  moveToParentWithId:(new_parent_id)=>
    container = document.getElementById(@parent_id)
    player_div = document.getElementById(@id)
    container.removeChild(player_div)
    console.log new_parent_id
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
    
    run = ()=>    
      @set_blur()
    
      @minimised = false
      @player = null
      # Read media files
      
      @videos = []
      for item in window.media
        vf = new VideoFile(item.src,0,item.poster,item.title,item.url,item.ad)
        @videos.push vf
      @current_video_index = 0;  
    
      # Setup Dom
      @dom = new DomManager()
    
      @dom.getStyle("src/style.css")
      @dom.getStyle("vjs/video-js.css")
    
      new ScriptLoader "videoJs", @load_UI 
    setTimeout(run,delay);
    
    
  current_video:=>
    return @videos[@current_video_index]
  
  play_next_video:=>
    console.log "Playing next"
    if (@current_video_index+1) < @videos.length
      @current_video_index=@current_video_index+1
      @player.loadFile(@current_video())
      @$video_title.html(@current_video().title())
      @player.play()
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
      console.log "it's playing"
      @player.play()

    
  maximise:=>
    if (@minimised==true)
        
        @player.disable_fullscreen()
        
        @hide_slug() # Use twice so this gets its own method

        @set_blur() # Add overlay + blur again
    
        @player.moveToParentWithId("cs-player-container") # Move player
    
        @$wrapper.show() # Show wrapper
    
        @player.play() # For some reason player stops after it's moved around
        
        @minimised = false

  disable_minimise: =>
    if @current_video().isAd()
      $("#cs-close").css("opacity","0.2")
      $("#cs-close").attr('onclick','').unbind('click')

  enable_minimise: =>
    $("#cs-close").css("opacity","1.0")
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
    @$video_time_remaining  = $("#cs-video-time-remaining")
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
      
      
    @$video_time_remaining.html("")
    
    @enable_minimise()
    
    # Video Player
    @player = new Player("cs-video-player","cs-player-container")   
    @player.ready(=>
      @player.timeUpdate(@update_time_remaining)
      @player.loadFile(@current_video())
      @player.ended(@play_next_video)
      @player.set_fullscreen_action(@maximise)
      if @current_video().isAd()
        console.log "it's ad"
        @player.onplay(@disable_minimise)
      @player.onplay(=>@$video_title.html(@current_video().title()))
    )
    
#   Load elements for slug  
    @dom.appendDivToBody("cs-slug-wrapper")
    @dom.appendDivToParent("cs-small-player-container","cs-slug-wrapper")
    @$slug_wrapper = $("#cs-slug-wrapper")

    player_container = $("#cs-small-player-container")
    player_container.addClass("smallVideoWrapper")      
    
    @hide_slug()    # Hide slug

  set_bindings:=>
    $("#cs-close").click =>
      @minimise()

  toggle_mute:=>
    if @player.isMuted()
      @player.unmute()
    else
      @player.mute()

  update_time_remaining:=>
    # Update label
    time_in_secs = @player.timeRemaining()
    if typeof time_in_secs is 'number'
      mins = Math.floor(time_in_secs / 59)
      secs = Math.ceil(time_in_secs % 59)
      if mins > 9
        mins_text = ''+ mins 
      else
        mins_text = '0'+mins
      if secs > 9
        secs_text = ''+ secs 
      else
        secs_text = '0'+secs

      @$video_time_remaining.html(mins_text+":"+secs_text)
  
  
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