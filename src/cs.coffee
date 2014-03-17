$ = jQuery

$ ->
  
  # Add stylesheet
  # window.media = [{src:"src/3.mp4",poster:"src/poster.png",title:"Meet the team behind Genesis Media"}]
  window.media = [{src:"src/truth.mp4",poster:"src/poster.png",title:"Meet the new Kia"}]
  surface = new Surface("Advertisement")

class ScriptLoader


    constructor: (options..., callback) ->
        
        @libraries = {jQuery: "http://ajax.googleapis.com/ajax/libs/jquery/$version/jquery.js",videoJs: "http://vjs.zencdn.net/$version/video.js", videoJsLocal: "video-js/video.dev.js"}
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
        document.getElementsByTagName('body')[0].appendChild(s)
        
class DomManager
  constructor:()->
    @body = document.getElementsByTagName("body")[0]
    @head = document.getElementsByTagName("head")[0]
    @html = document.getElementsByTagName("html")[0]
      
  appendDivOutsideBody:(id)=>
    s = document.createElement("div")
    s.id = id
    @html.appendChild(s)
  
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
    elem = document.getElementById(id)
    return elem
    
  getStyle:(url)=>
    l = document.createElement("link")
    l.href = url
    l.rel = "stylesheet"
    l.type = "text/css"
    @head.appendChild(l)

class Player
  constructor:(id,parent_id,poster)->
    p = document.createElement("video")
    p.setAttribute("id",id)
    p.setAttribute("data-setup",'{ "controls": true, "autoplay": false, "preload": "true", "width": "100%"}')
    p.setAttribute("class","video-js vjs-default-skin vjs-big-play-centered")      
    document.getElementById(parent_id).appendChild(p)
    @elem = document.getElementById(id)   
    never_played = true
    
  play:=>
    @elem.play()
    never_played = false
    
  pause:=>
    @elem.pause()
    
  mute:=>
    @elem.volume=0
    
  unmute:=>
    @elem.volume=1
  
  loadFile:(vf)=>
    @elem.src = vf.source()
    if vf.poster() and @never_played
      @elem.setAttribute("poster",vf.poster())
    @elem.onloadedmetadata = =>
      @elem.currentTime = vf.position()
       
  duration:=>
    return @elem.duration
    
  currentTime:=>
    return @elem.currentTime
    
  timeRemaining:=>
    return @elem.duration - @elem.currentTime
    
  isMuted:=>
    if @elem.volume is 0 or @elem.muted
      return true
    else
      return false
      
  addEventListener:(callback, func)=>
    @elem.addEventListener(callback, func)
  
class Surface
  constructor:(@site_name)->    
    # Read media files
    @player = null
    @small_player = null
    @videos = []
    for item in window.media
      vf = new VideoFile(item.src,0,item.poster,item.title)
      @videos.push vf
    @current_video_index = 0;  

    # Setup Dom
    @dom = new DomManager()
    @dom.getStyle("src/style.css")
    @dom.getStyle("video-js/video-js.css")
    new ScriptLoader("videoJsLocal", @player_ready)
    
  
  player_ready:=>
    console.log "ready----"
    @set_overlay()
    
    # Load elements
    @load_elements()

  current_video:=>
    return @videos[@current_video_index]
  
  set_overlay:=>
    $("body").css("-webkit-filter","blur(15px)")
    $("body").css("filter","blur(20px)")
    # disable scroll
    $('html, body').css({
        'overflow': 'hidden',
        'height': '100%'
    })
        
  load_elements:=>
    # Layout
    @dom.appendDivOutsideBody("cs-wrapper")
    @dom.appendDivToParent("cs-overlay","cs-wrapper")
    @$wrapper = $("#cs-wrapper")
    @dom.appendDivToParent("cs-header","cs-wrapper")
    @dom.appendDivToParent("cs-close","cs-header")
    @dom.appendDivToParent("cs-main","cs-wrapper")
    @dom.appendDivToParent("cs-info-wrapper","cs-wrapper")
    @dom.appendDivToParent("cs-top-line","cs-info-wrapper")
    @dom.appendDivToParent("cs-rule","cs-info-wrapper")
    @dom.appendDivToParent("cs-bottom-line","cs-info-wrapper")
    @dom.appendDivToParent("cs-label","cs-top-line")
    @dom.appendDivToParent("cs-video-title","cs-bottom-line")
    @dom.appendDivToParent("cs-video-time-remaining","cs-bottom-line")
    @dom.appendDivToParent("cs-player-wrapper","cs-wrapper")
    @dom.appendDivToParent("cs-player-container","cs-player-wrapper")
    @dom.appendDivToParent("cs-footer","cs-wrapper")
    @dom.appendDivToParent("cs-video-title","cs-wrapper")
    @dom.appendDivToParent("cs-video-toolbar","cs-wrapper")
    @dom.appendDivToParent("cs-video-toolbar-forward","cs-video-toolbar")
    @dom.appendDivToParent("cs-video-toolbar-rewind","cs-video-toolbar")
    
    
    # Messaging
    label = $("#cs-label")
    label.html(@site_name)
    
    @$video_title = $("#cs-video-title")
    @$video_title.html(@current_video().title())
    
    @$video_time_remaining = $("#cs-video-time-remaining")
    @$video_time_remaining.html("")
    
    
    # Video Player
    @player = new Player("cs-video-player","cs-player-container")   
    @player.addEventListener('timeupdate', @update_time_remaining);
    @player.loadFile(@current_video())
    # @player.play()
    
    @set_bindings()
    
    @load_elements_for_slug()

  load_elements_for_slug:=>
    @dom.appendDivToBody("cs-slug-wrapper")
    @dom.appendDivToParent("cs-slug-header","cs-slug-wrapper")
    @dom.appendDivToParent("cs-slug-header-expand-btn","cs-slug-header")
    @dom.appendDivToParent("cs-slug-header-mute-btn","cs-slug-header")
    @dom.appendDivToParent("cs-small-player-container","cs-slug-wrapper")
    @$slug_wrapper = $("#cs-slug-wrapper")

    $('#cs-slug-header-expand-btn').on("click", =>
      @maximise()
      )
    
    $('#cs-slug-header-mute-btn').on("click", =>
      @toggle_mute()
    )
      
    # Video Player
    @small_player = new Player("cs-small-video-player","cs-small-player-container")
    @hide_slug()
  
  toggle_mute:=>
    console.log "wf"
    if @small_player.isMuted()
      @small_player.unmute()
      $('#cs-slug-header-mute-btn').css("background","url('src/mute.png')")
    else
      @small_player.mute()
      $('#cs-slug-header-mute-btn').css("background","url('src/unmute.png')")


  show_slug:=>
    
    @small_player.loadFile(@current_video())
    
    # play
    @small_player.play()
              
    # show
    $("#cs-slug-wrapper").show()
    
  hide_slug:=>
    @small_player.pause()
    
    # read current time from small player and store in current video
    @current_video().setPosition(@small_player.currentTime())
    
    $("#cs-slug-wrapper").hide()
    
  set_bindings:=>
    $("#cs-close").click =>
      @minimise()
      
  minimise: =>
    # Update video file current time
   
    
    @remove_overlay()
    @hide_wrapper()
    @show_slug()

  update_time_remaining:=>
    # Update label
    time_in_secs = @player.timeRemaining()
    if typeof time_in_secs is 'number'
      mins = Math.floor(time_in_secs / 60)
      secs = Math.ceil(time_in_secs % 60)
      if mins > 9
        mins_text = ''+ mins 
      else
        mins_text = '0'+mins
      if secs > 9
        secs_text = ''+ secs 
      else
        secs_text = '0'+secs
      @$video_time_remaining.html(mins_text+":"+secs_text)
  
  remove_overlay:=>
    $("body").css("-webkit-filter","blur(0px)")
    $("html").css("filter","blur(0px)")
    $('html, body').css({
        'overflow': 'auto',
        'height': 'auto'
    })
    @hide_wrapper();
    
  remove_wrapper:=>
    @player.pause()
    @$wrapper.remove()
    
  maximise:=>
    # TODO:add player class to abstract player implementation details
    @hide_slug()
    @set_overlay()
    @show_wrapper()
    
  show_wrapper:=>
    
    @player.loadFile(@current_video())
    
    # play
    @player.play()    
    
    # show
    @$wrapper.show()
        
  hide_wrapper:=>
    @player.pause()
    
    # read current time from big player and store in current video
    @current_video().setPosition(@player.currentTime())
    
    @$wrapper.hide()
    
    
class VideoFile
  constructor:(src,position,poster,title)->
    @file_src = src ? ""
    @playback_position = position ? 0
    @video_poster = poster ? ""
    @video_title = title ? ""
    
  source:=>
    return @file_src

  position:=>
    return @playback_position

  setPosition:(pos)=>
    @playback_position = pos

  setSource:(src)=>
    @playback_position = src
    
  title:=>
    return @video_title
    
  poster:=>
    if @video_poster.length > 0
      return @video_poster
    return null