$ = jQuery

$ ->
  
  # Add stylesheet
  window.media = [{src:"src/3.mp4",poster:"src/poster.png",title:"Meet the team behind Genesis Media"}]
  surface = new Surface("Radar Online")

class DomManager
  constructor:()->
    @body = document.getElementsByTagName("body")[0]
    @head = document.getElementsByTagName("head")[0]
    @html = document.getElementsByTagName("html")[0]
      
  appendDivOutsideBody:(id)=>
    s = document.createElement("div")
    s.id = id
    @html.appendChild(s)
    
  appendDivToParent:(id,parent_id)=>
    s = document.createElement("div")
    s.id = id
    parent = document.getElementById(parent_id)
    parent.appendChild(s)
  
  get:(id)=>
    elem = document.getElementById(id)
    return elem
    
  getScript:(url,success)=>
    done = false
    script = document.createElement("script")
    script.src = url
    script.onload = ->
      if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete"))
        done = true
        if loaded is True and typeof success is 'function'
          success()
          
    script.onreadystatechange = script.onload
    
    @head.appendChild(script)    
    
  getStyle:(url)=>
    l = document.createElement("link")
    l.href = url
    l.rel = "stylesheet"
    l.type = "text/css"
    @head.appendChild(l)

class Surface
  constructor:(@site_name)->    
    # Read media files
    @player = null
    @videos = []
    for item in window.media
      vf = new VideoFile(item.src,0,item.poster,item.title)
      @videos.push vf
    @current_video_index = 0;  

    # Setup Dom
    @dom = new DomManager()
    @dom.getStyle("src/style.css")
    @set_overlay()
    
    # Load elements
    @load_elements()

  current_video:=>
    return @videos[@current_video_index]
  
  set_overlay:=>
    $("body").css("-webkit-filter","blur(20px)")
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
    label.html(@site_name+" TV")
    
    @$video_title = $("#cs-video-title")
    @$video_title.html(@current_video().title())
    
    @$video_time_remaining = $("#cs-video-time-remaining")
    @$video_time_remaining.html("")
    
    
    # Video Player
    p = document.createElement("video")
    p.setAttribute("id","cs-video-player")
    p.setAttribute("poster",@current_video().poster())
    p.src=@current_video().source()
    @player = @dom.get("cs-player-container").appendChild(p)   
    @player.play()
    
    @set_bindings()
    
  set_bindings:=>
    $("#cs-close").click =>
      @minimise()
    @player.addEventListener('timeupdate', @update_time_remaining);
    
  minimise: =>
    @remove_overlay()
    @hide_wrapper()

  update_time_remaining:=>
    # Update label
    time_in_secs = @player.duration-@player.currentTime
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
    
      # Update video file
      @current_video().setPosition(time_in_secs)
  
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
    
  hide_wrapper:=>
    @player.pause()
    @$wrapper.hide()
    
  maximise:=>
    # TODO:add player class to abstract player implementation details
    @player.src = @current_video().source()
    console.log @player.currentTime
    @set_overlay()
    @$wrapper.show()
    @player.play()
    
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
    return @poster