$ = jQuery

$ ->
  
  # Add stylesheet
  # window.media = [{src:"src/3.mp4",poster:"src/poster.png",title:"Meet the team behind Genesis Media"}]
  window.media = [{src:"src/propel.mp4",poster:"src/poster.png",title:"Advertisement: Propel Fitness Water",url:"https://www.facebook.com/propel"},{src:"src/miller.mp4",poster:"src/poster.png",title:"Marissa Miller's Shape Magazine Cover",url:""},{src:"src/audrina.mp4",poster:"src/poster.png",title:"Audrina Patridge",url:""}]
  surface = new Surface("ShapeTV")

class ScriptLoader
    constructor: (options..., callback) ->
        @libraries = {jQuery: "http://ajax.googleapis.com/ajax/libs/jquery/$version/jquery.js",videoJs: "http://vjs.zencdn.net/$version/video.js"}
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
  constructor:(id,parent_id)->
    @parent_id = parent_id
    p = document.createElement("video")
    p.setAttribute("id",id)
    p.setAttribute("controls","true")
    document.getElementById(parent_id).appendChild(p)
    @elem = document.getElementById(id)   
    never_played = true
    # Todo: Remove 
    @mute()
    
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
    @setUrl(vf.url())
       
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
    
  onended:(func) =>
    @elem.onended = func
    
  setUrl:(url) =>
    if url.length > 0
      @elem.onclick = =>window.open(url,'_blank')
    else
      @elem.onclick = undefined
      
  moveToParentWithId:(new_parent_id)=>
    document.getElementById(@parent_id).removeChild(@elem)
    document.getElementById(new_parent_id).appendChild(@elem)
    @parent_id = new_parent_id
    
  
class Surface
  constructor:(@site_name)->    
    # Read media files
    @player = null
    @videos = []
    for item in window.media
      vf = new VideoFile(item.src,0,item.poster,item.title,item.url)
      @videos.push vf
    @current_video_index = 0;  
    
    # Setup Dom
    @dom = new DomManager()
    @set_overlay()
    
    @dom.getStyle("src/style.css")
    @load_UI()
    
  current_video:=>
    return @videos[@current_video_index]
  
  play_next_video:=>
    if (@current_video_index+1) < @videos.length
      console.log @videos.length
      @current_video_index=@current_video_index+1
      @player.loadFile(@current_video())
      @$video_title.html(@current_video().title())
      @player.play()
  
  minimise: =>
    @current_video().setPosition(@player.currentTime()) # Update video file current time
    @remove_overlay()
    @$wrapper.hide()
    
    @player.moveToParentWithId("cs-small-player-container") # Move player
        
    $("#cs-slug-wrapper").show() # Show slug
    
    @player.play() # For some reason player stops after it's moved around
    
    # TODO: Remove this after implementing proper full screen method
    @player.elem.onclick = @maximise

  maximise:=>
    @hide_slug() # Use twice so this gets its own method

    @set_overlay() # Add overlay + blur again
    
    @player.moveToParentWithId("cs-player-container") # Move player
    
    @$wrapper.show() # Show wrapper
    
    @player.play() # For some reason player stops after it's moved around

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
    @dom.appendDivToParent("cs-video-toolbar","cs-wrapper")
    @dom.appendDivToParent("cs-video-toolbar-forward","cs-video-toolbar")
    @dom.appendDivToParent("cs-video-toolbar-rewind","cs-video-toolbar")
     
    @$wrapper = $("#cs-wrapper")
    @$video_title = $("#cs-video-title")
    @$video_time_remaining  = $("#cs-video-time-remaining")
    label = $("#cs-label")
    player_container = $("#cs-player-container")
    
    # Player style
    player_container.addClass("largeVideoWrapper wideScreen")      
    
    # Messaging
    label.html(@site_name)
    @$video_title.html(@current_video().title())
    @$video_time_remaining.html("")
    
    @set_bindings()
    
    # Video Player
    @player = new Player("cs-video-player","cs-player-container")   
    @player.addEventListener('timeupdate', @update_time_remaining);
    @player.onended(@play_next_video);
    @player.loadFile(@current_video())
    @player.play()

#   Load elements for slug  
    @dom.appendDivToBody("cs-slug-wrapper")
    @dom.appendDivToParent("cs-small-player-container","cs-slug-wrapper")
    @$slug_wrapper = $("#cs-slug-wrapper")

    player_container = $("#cs-small-player-container")
    player_container.addClass("smallVideoWrapper wideScreen")      
    
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
  
  
  set_overlay:=>
    $("body").css("-webkit-filter","blur(15px)")
    $("body").css("filter","blur(20px)")
    # disable scroll
    $('html, body').css({
        'overflow': 'hidden',
        'height': '100%'
    })
    
  remove_overlay:=>
    $("body").css("-webkit-filter","blur(0px)")
    $("html").css("filter","blur(0px)")
    $('html, body').css({
        'overflow': 'auto',
        'height': 'auto'
    })    
    
class VideoFile
  constructor:(src,position,poster,title,url)->
    @file_src = src ? ""
    @playback_position = position ? 0
    @video_poster = poster ? ""
    @video_title = title ? ""
    @video_url = url
    
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
  
  url:=>  
    return @video_url

  poster:=>
    if @video_poster.length > 0
      return @video_poster
    return null