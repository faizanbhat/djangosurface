$ = jQuery

$ ->
  
  # Add stylesheet
  surface = new Surface()

class DomManager
  constructor:()->
    @body = document.getElementsByTagName("body")[0]
    @head = document.getElementsByTagName("head")[0]
    @html = document.getElementsByTagName("html")[0]
    
  appendDivToBody:(id)=>
    s = document.createElement("div")
    s.id = id
    @body.appendChild(s)
    
  appendDiv:(id)=>
    s = document.createElement("div")
    s.id = id
    @html.appendChild(s)
    
  appendDivToParent:(id,parent_id)=>
    s = document.createElement("div")
    s.id = id
    parent = document.getElementById(parent_id)
    parent.appendChild(s)
  
  getScript:(url,success)=>
    done = false
    script = document.createElement("script")
    script.src = url
    script.onload = ->
      if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete"))
        done = true
        if typeof success is 'function'
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
  constructor:()->
    @dom = new DomManager()
    @dom.getStyle("src/style.css")
    @set_overlay()
    @load_elements()

  set_overlay:=>
    $("body").css("-webkit-filter","blur(20px)")
    $("body").css("filter","blur(20px)")
    # disable scroll
    $('html, body').css({
        'overflow': 'hidden',
        'height': '100%'
    })
    # TODO: Fix scrolling bug
    @dom.appendDiv("cs-wrapper")
    @dom.appendDivToParent("cs-overlay","cs-wrapper")
    @$wrapper = $("#cs-wrapper")
    
    
  load_elements:=>
    @dom.appendDivToParent("cs-header","cs-wrapper")
    @dom.appendDivToParent("cs-close","cs-header")
    @dom.appendDivToParent("cs-main","cs-wrapper")
    @dom.appendDivToParent("cs-info-wrapper","cs-wrapper")
    @dom.appendDivToParent("cs-top-line","cs-info-wrapper")
    @dom.appendDivToParent("cs-rule","cs-info-wrapper")
    @dom.appendDivToParent("cs-bottom-line","cs-info-wrapper")
    @dom.appendDivToParent("cs-label","cs-top-line")
    @dom.appendDivToParent("cs-message","cs-bottom-line")
    @dom.appendDivToParent("cs-player-wrapper","cs-wrapper")
    @dom.appendDivToParent("cs-player-container","cs-player-wrapper")
    @dom.appendDivToParent("cs-footer","cs-wrapper")
        
    

    $("#cs-close").click =>
      @remove_overlay()

    
    @$label = $("#cs-label")
    @$label.html("Trending Now")
    
    v = document.createElement("video")
    v.setAttribute("id","cs-video")
    v.setAttribute("poster","src/poster.png")
    v.src="src/3.mp4"
    document.getElementById("cs-player-container").appendChild(v)    
    
    @video = document.getElementById("cs-video")
    
    play = document.createElement("div")
    play.id ="cs-play-btn"
    @video.appendChild(play)
    @video.play()
      
    $("#cs-play-btn").click =>
      @play()
    
    message = @dom.appendDivToParent("cs-message","cs-wrapper")
    @$message = $("#cs-message")
    @$message.html("Now Playing: <span id='cs-video-title'>Meet the team behind Genesis Media</span>")
  
  play:=>
    $("#cs-play-btn").remove()
    @$message.html("Genesis Media")
    @video.play()
    
  remove_overlay:=>
    $("body").css("-webkit-filter","blur(0px)")
    $("html").css("filter","blur(0px)")
    $('html, body').css({
        'overflow': 'auto',
        'height': 'auto'
    })
    @$wrapper.remove()
    