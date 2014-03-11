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
        
  addScript:(url)=>
    s = document.createElement("script")
    s.src = url
    @head.appendChild(s)
  
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
    label = @dom.appendDivToParent("cs-label","cs-wrapper")
    @$label = $("#cs-label")
    @$label.html("Trending Now")
    
    hr = document.createElement("hr")
    hr.setAttribute("class","cs-thin-rule")
    @$label.append(hr)
    
    v = document.createElement("video")
    v.setAttribute("id","cs-video")
    v.setAttribute("poster","src/poster.png")
    v.src="/Applications/MAMP/htdocs/gm/media/3.mp4"
    @$wrapper.append(v)
    @video = document.getElementById("cs-video")
    
    message = @dom.appendDivToParent("cs-message","cs-wrapper")
    @$message = $("#cs-message")
    @$message.html("Watch: Genesis Media")
    
    play = document.createElement("img");
    play.id="cs-play"
    play.src = "src/play.png"
    $("#cs-wrapper").append(play)
    $("#cs-play").click =>
      @play()
    
    close = document.createElement("img");
    close.id="cs-close"
    close.src = "src/close.png"
    $("#cs-wrapper").append(close)
    $("#cs-close").click =>
      @remove_overlay()
      
    
  play:=>
    $("#cs-play").remove()
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
    