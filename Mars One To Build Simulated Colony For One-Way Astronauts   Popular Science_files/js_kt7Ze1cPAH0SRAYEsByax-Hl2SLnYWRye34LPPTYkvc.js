(function ($) {

Drupal.behaviors.initModalFormsLogin = {
  attach: function (context, settings) {
    $("a[href*='/user/login'], a[href*='?q=user/login']", context).once('init-modal-forms-login', function () {
      this.href = this.href.replace(/user\/login/,'modal_forms/nojs/login');
    }).addClass('ctools-use-modal ctools-modal-modal-popup-small');
  }
};

})(jQuery);
;
var BonnierAdsCirc = {
    addAd : function (container, position) {
        if (typeof Drupal.settings.bonnier_ads_circ.ad_blocks === 'object') {
            ad = {container : container, position : position};
            Drupal.settings.bonnier_ads_circ.ad_blocks.push(ad);
        }
    }
}
jQuery(document).ready(function ($) {
	var circOptions = Drupal.settings.bonnier_ads_circ;   
    if (typeof circOptions.account === 'string' && typeof circOptions.server === 'string') {
        var data = {'acct' : circOptions.account};
        if (typeof s === 'object' && s.channel.length > 0) {
          data['channel'] = s.channel;
        }
        data['url'] = window.location.protocol + "//" + window.location.host + window.location.pathname;
        var divMatch = [];
        $.ajax({
            url: circOptions.server + '/service/index.php',
            dataType: 'jsonp',
            type: 'GET',
            data: data,
            jsonp: 'callback',
            success: function(data) {
                $.each(circOptions.ad_blocks, function(i, v) {
                	if(typeof data.positions[v.position] !== 'undefined') {
                		$('div#'+v.container).html(data.positions[v.position]);
                	}
                });
            }
        })
    }
});
;
/*!
	jQuery ColorBox v1.4.6 - 2013-03-19
	(c) 2013 Jack Moore - jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e,t,i){function o(i,o,n){var r=t.createElement(i);return o&&(r.id=et+o),n&&(r.style.cssText=n),e(r)}function n(){return i.innerHeight?i.innerHeight:e(i).height()}function r(e){var t=E.length,i=(j+e)%t;return 0>i?t+i:i}function h(e,t){return Math.round((/%/.test(e)?("x"===t?H.width():n())/100:1)*parseInt(e,10))}function s(e,t){return e.photo||e.photoRegex.test(t)}function l(e,t){return e.retinaUrl&&i.devicePixelRatio>1?t.replace(e.photoRegex,e.retinaSuffix):t}function a(e){"contains"in v[0]&&!v[0].contains(e.target)&&(e.stopPropagation(),v.focus())}function d(){var t,i=e.data(O,Z);null==i?(z=e.extend({},Y),console&&console.log&&console.log("Error: cboxElement missing settings object")):z=e.extend({},i);for(t in z)e.isFunction(z[t])&&"on"!==t.slice(0,2)&&(z[t]=z[t].call(O));z.rel=z.rel||O.rel||e(O).data("rel")||"nofollow",z.href=z.href||e(O).attr("href"),z.title=z.title||O.title,"string"==typeof z.href&&(z.href=e.trim(z.href))}function c(i,o){e(t).trigger(i),ct.trigger(i),e.isFunction(o)&&o.call(O)}function u(){var e,t,i,o,n,r=et+"Slideshow_",h="click."+et;z.slideshow&&E[1]?(t=function(){clearTimeout(e)},i=function(){(z.loop||E[j+1])&&(e=setTimeout(X.next,z.slideshowSpeed))},o=function(){F.html(z.slideshowStop).unbind(h).one(h,n),ct.bind(nt,i).bind(ot,t).bind(rt,n),v.removeClass(r+"off").addClass(r+"on")},n=function(){t(),ct.unbind(nt,i).unbind(ot,t).unbind(rt,n),F.html(z.slideshowStart).unbind(h).one(h,function(){X.next(),o()}),v.removeClass(r+"on").addClass(r+"off")},z.slideshowAuto?o():n()):v.removeClass(r+"off "+r+"on")}function f(i){G||(O=i,d(),E=e(O),j=0,"nofollow"!==z.rel&&(E=e("."+tt).filter(function(){var t,i=e.data(this,Z);return i&&(t=e(this).data("rel")||i.rel||this.rel),t===z.rel}),j=E.index(O),-1===j&&(E=E.add(O),j=E.length-1)),g.css({opacity:parseFloat(z.opacity),cursor:z.overlayClose?"pointer":"auto",visibility:"visible"}).show(),J&&v.add(g).removeClass(J),z.className&&v.add(g).addClass(z.className),J=z.className,K.html(z.close).show(),U||(U=$=!0,v.css({visibility:"hidden",display:"block"}),I=o(ut,"LoadedContent","width:0; height:0; overflow:hidden").appendTo(y),D=b.height()+k.height()+y.outerHeight(!0)-y.height(),B=C.width()+T.width()+y.outerWidth(!0)-y.width(),N=I.outerHeight(!0),A=I.outerWidth(!0),z.w=h(z.initialWidth,"x"),z.h=h(z.initialHeight,"y"),X.position(),at&&H.bind("resize."+dt+" scroll."+dt,function(){g.css({width:H.width(),height:n(),top:H.scrollTop(),left:H.scrollLeft()})}).trigger("resize."+dt),u(),c(it,z.onOpen),_.add(M).hide(),v.focus(),t.addEventListener&&(t.addEventListener("focus",a,!0),ct.one(ht,function(){t.removeEventListener("focus",a,!0)})),z.returnFocus&&ct.one(ht,function(){e(O).focus()})),w())}function p(){!v&&t.body&&(V=!1,H=e(i),v=o(ut).attr({id:Z,"class":lt?et+(at?"IE6":"IE"):"",role:"dialog",tabindex:"-1"}).hide(),g=o(ut,"Overlay",at?"position:absolute":"").hide(),W=o(ut,"LoadingOverlay").add(o(ut,"LoadingGraphic")),x=o(ut,"Wrapper"),y=o(ut,"Content").append(M=o(ut,"Title"),S=o(ut,"Current"),P=o("button","Previous"),R=o("button","Next"),F=o("button","Slideshow"),W,K=o("button","Close")),x.append(o(ut).append(o(ut,"TopLeft"),b=o(ut,"TopCenter"),o(ut,"TopRight")),o(ut,!1,"clear:left").append(C=o(ut,"MiddleLeft"),y,T=o(ut,"MiddleRight")),o(ut,!1,"clear:left").append(o(ut,"BottomLeft"),k=o(ut,"BottomCenter"),o(ut,"BottomRight"))).find("div div").css({"float":"left"}),L=o(ut,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),_=R.add(P).add(S).add(F),e(t.body).append(g,v.append(x,L)))}function m(){function i(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||(e.preventDefault(),f(this))}return v?(V||(V=!0,R.click(function(){X.next()}),P.click(function(){X.prev()}),K.click(function(){X.close()}),g.click(function(){z.overlayClose&&X.close()}),e(t).bind("keydown."+et,function(e){var t=e.keyCode;U&&z.escKey&&27===t&&(e.preventDefault(),X.close()),U&&z.arrowKey&&E[1]&&!e.altKey&&(37===t?(e.preventDefault(),P.click()):39===t&&(e.preventDefault(),R.click()))}),e.isFunction(e.fn.on)?e(t).on("click."+et,"."+tt,i):e("."+tt).live("click."+et,i)),!0):!1}function w(){var t,n,r,a=X.prep,u=++ft;$=!0,q=!1,O=E[j],d(),c(st),c(ot,z.onLoad),z.h=z.height?h(z.height,"y")-N-D:z.innerHeight&&h(z.innerHeight,"y"),z.w=z.width?h(z.width,"x")-A-B:z.innerWidth&&h(z.innerWidth,"x"),z.mw=z.w,z.mh=z.h,z.maxWidth&&(z.mw=h(z.maxWidth,"x")-A-B,z.mw=z.w&&z.w<z.mw?z.w:z.mw),z.maxHeight&&(z.mh=h(z.maxHeight,"y")-N-D,z.mh=z.h&&z.h<z.mh?z.h:z.mh),t=z.href,Q=setTimeout(function(){W.show()},100),z.inline?(r=o(ut).hide().insertBefore(e(t)[0]),ct.one(st,function(){r.replaceWith(I.children())}),a(e(t))):z.iframe?a(" "):z.html?a(z.html):s(z,t)?(t=l(z,t),e(q=new Image).addClass(et+"Photo").bind("error",function(){z.title=!1,a(o(ut,"Error").html(z.imgError))}).one("load",function(){var e;u===ft&&(z.retinaImage&&i.devicePixelRatio>1&&(q.height=q.height/i.devicePixelRatio,q.width=q.width/i.devicePixelRatio),z.scalePhotos&&(n=function(){q.height-=q.height*e,q.width-=q.width*e},z.mw&&q.width>z.mw&&(e=(q.width-z.mw)/q.width,n()),z.mh&&q.height>z.mh&&(e=(q.height-z.mh)/q.height,n())),z.h&&(q.style.marginTop=Math.max(z.mh-q.height,0)/2+"px"),E[1]&&(z.loop||E[j+1])&&(q.style.cursor="pointer",q.onclick=function(){X.next()}),lt&&(q.style.msInterpolationMode="bicubic"),setTimeout(function(){a(q)},1))}),setTimeout(function(){q.src=t},1)):t&&L.load(t,z.data,function(t,i){u===ft&&a("error"===i?o(ut,"Error").html(z.xhrError):e(this).contents())})}var g,v,x,y,b,C,T,k,E,H,I,L,W,M,S,F,R,P,K,_,z,D,B,N,A,O,j,q,U,$,G,Q,X,J,V,Y={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0},Z="colorbox",et="cbox",tt=et+"Element",it=et+"_open",ot=et+"_load",nt=et+"_complete",rt=et+"_cleanup",ht=et+"_closed",st=et+"_purge",lt=!e.support.leadingWhitespace,at=lt&&!i.XMLHttpRequest,dt=et+"_IE6",ct=e("<a/>"),ut="div",ft=0;e.colorbox||(e(p),X=e.fn[Z]=e[Z]=function(t,i){var o=this;if(t=t||{},p(),m()){if(e.isFunction(o))o=e("<a/>"),t.open=!0;else if(!o[0])return o;i&&(t.onComplete=i),o.each(function(){e.data(this,Z,e.extend({},e.data(this,Z)||Y,t))}).addClass(tt),(e.isFunction(t.open)&&t.open.call(o)||t.open)&&f(o[0])}return o},X.position=function(e,t){function i(e){b[0].style.width=k[0].style.width=y[0].style.width=parseInt(e.style.width,10)-B+"px",y[0].style.height=C[0].style.height=T[0].style.height=parseInt(e.style.height,10)-D+"px"}var o,r,s,l=0,a=0,d=v.offset();H.unbind("resize."+et),v.css({top:-9e4,left:-9e4}),r=H.scrollTop(),s=H.scrollLeft(),z.fixed&&!at?(d.top-=r,d.left-=s,v.css({position:"fixed"})):(l=r,a=s,v.css({position:"absolute"})),a+=z.right!==!1?Math.max(H.width()-z.w-A-B-h(z.right,"x"),0):z.left!==!1?h(z.left,"x"):Math.round(Math.max(H.width()-z.w-A-B,0)/2),l+=z.bottom!==!1?Math.max(n()-z.h-N-D-h(z.bottom,"y"),0):z.top!==!1?h(z.top,"y"):Math.round(Math.max(n()-z.h-N-D,0)/2),v.css({top:d.top,left:d.left,visibility:"visible"}),e=v.width()===z.w+A&&v.height()===z.h+N?0:e||0,x[0].style.width=x[0].style.height="9999px",o={width:z.w+A+B,height:z.h+N+D,top:l,left:a},0===e&&v.css(o),v.dequeue().animate(o,{duration:e,complete:function(){i(this),$=!1,x[0].style.width=z.w+A+B+"px",x[0].style.height=z.h+N+D+"px",z.reposition&&setTimeout(function(){H.bind("resize."+et,X.position)},1),t&&t()},step:function(){i(this)}})},X.resize=function(e){U&&(e=e||{},e.width&&(z.w=h(e.width,"x")-A-B),e.innerWidth&&(z.w=h(e.innerWidth,"x")),I.css({width:z.w}),e.height&&(z.h=h(e.height,"y")-N-D),e.innerHeight&&(z.h=h(e.innerHeight,"y")),e.innerHeight||e.height||(I.css({height:"auto"}),z.h=I.height()),I.css({height:z.h}),X.position("none"===z.transition?0:z.speed))},X.prep=function(t){function i(){return z.w=z.w||I.width(),z.w=z.mw&&z.mw<z.w?z.mw:z.w,z.w}function n(){return z.h=z.h||I.height(),z.h=z.mh&&z.mh<z.h?z.mh:z.h,z.h}if(U){var h,a="none"===z.transition?0:z.speed;I.empty().remove(),I=o(ut,"LoadedContent").append(t),I.hide().appendTo(L.show()).css({width:i(),overflow:z.scrolling?"auto":"hidden"}).css({height:n()}).prependTo(y),L.hide(),e(q).css({"float":"none"}),h=function(){function t(){lt&&v[0].style.removeAttribute("filter")}var i,n,h=E.length,d="frameBorder",u="allowTransparency";U&&(n=function(){clearTimeout(Q),W.hide(),c(nt,z.onComplete)},lt&&q&&I.fadeIn(100),M.html(z.title).add(I).show(),h>1?("string"==typeof z.current&&S.html(z.current.replace("{current}",j+1).replace("{total}",h)).show(),R[z.loop||h-1>j?"show":"hide"]().html(z.next),P[z.loop||j?"show":"hide"]().html(z.previous),z.slideshow&&F.show(),z.preloading&&e.each([r(-1),r(1)],function(){var t,i,o=E[this],n=e.data(o,Z);n&&n.href?(t=n.href,e.isFunction(t)&&(t=t.call(o))):t=e(o).attr("href"),t&&s(n,t)&&(t=l(n,t),i=new Image,i.src=t)})):_.hide(),z.iframe?(i=o("iframe")[0],d in i&&(i[d]=0),u in i&&(i[u]="true"),z.scrolling||(i.scrolling="no"),e(i).attr({src:z.href,name:(new Date).getTime(),"class":et+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",n).appendTo(I),ct.one(st,function(){i.src="//about:blank"}),z.fastIframe&&e(i).trigger("load")):n(),"fade"===z.transition?v.fadeTo(a,1,t):t())},"fade"===z.transition?v.fadeTo(a,0,function(){X.position(0,h)}):X.position(a,h)}},X.next=function(){!$&&E[1]&&(z.loop||E[j+1])&&(j=r(1),f(E[j]))},X.prev=function(){!$&&E[1]&&(z.loop||j)&&(j=r(-1),f(E[j]))},X.close=function(){U&&!G&&(G=!0,U=!1,c(rt,z.onCleanup),H.unbind("."+et+" ."+dt),g.fadeTo(200,0),v.stop().fadeTo(300,0,function(){v.add(g).css({opacity:1,cursor:"auto"}).hide(),c(st),I.empty().remove(),setTimeout(function(){G=!1,c(ht,z.onClosed)},1)}))},X.remove=function(){e([]).add(v).add(g).remove(),v=null,e("."+tt).removeData(Z).removeClass(tt),e(t).unbind("click."+et)},X.element=function(){return e(O)},X.settings=Y)})(jQuery,document,window);;
(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $('.colorbox', context)
      .once('init-colorbox')
      .colorbox(settings.colorbox);
  }
};

{
  $(document).bind('cbox_complete', function () {
    Drupal.attachBehaviors('#cboxLoadedContent');
  });
}

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(document).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxLoad = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $.urlParams = function (url) {
      var p = {},
          e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&=]+)=?([^&]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
          q = url.split('?');
      while (e = r.exec(q[1])) {
        e[1] = d(e[1]);
        e[2] = d(e[2]);
        switch (e[2].toLowerCase()) {
          case 'true':
          case 'yes':
            e[2] = true;
            break;
          case 'false':
          case 'no':
            e[2] = false;
            break;
        }
        if (e[1] == 'width') { e[1] = 'innerWidth'; }
        if (e[1] == 'height') { e[1] = 'innerHeight'; }
        p[e[1]] = e[2];
      }
      return p;
    };
    $('.colorbox-load', context)
      .once('init-colorbox-load', function () {
        var params = $.urlParams($(this).attr('href'));
        $(this).colorbox($.extend({}, settings.colorbox, params));
      });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxInline = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $.urlParam = function(name, url){
      if (name == 'fragment') {
        var results = new RegExp('(#[^&#]*)').exec(url);
      }
      else {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
      }
      if (!results) { return ''; }
      return results[1] || '';
    };
    $('.colorbox-inline', context).once('init-colorbox-inline').colorbox({
      transition:settings.colorbox.transition,
      speed:settings.colorbox.speed,
      opacity:settings.colorbox.opacity,
      slideshow:settings.colorbox.slideshow,
      slideshowAuto:settings.colorbox.slideshowAuto,
      slideshowSpeed:settings.colorbox.slideshowSpeed,
      slideshowStart:settings.colorbox.slideshowStart,
      slideshowStop:settings.colorbox.slideshowStop,
      current:settings.colorbox.current,
      previous:settings.colorbox.previous,
      next:settings.colorbox.next,
      close:settings.colorbox.close,
      overlayClose:settings.colorbox.overlayClose,
      maxWidth:settings.colorbox.maxWidth,
      maxHeight:settings.colorbox.maxHeight,
      innerWidth:function(){
        return $.urlParam('width', $(this).attr('href'));
      },
      innerHeight:function(){
        return $.urlParam('height', $(this).attr('href'));
      },
      title:function(){
        return decodeURIComponent($.urlParam('title', $(this).attr('href')));
      },
      iframe:function(){
        return $.urlParam('iframe', $(this).attr('href'));
      },
      inline:function(){
        return $.urlParam('inline', $(this).attr('href'));
      },
      href:function(){
        return $.urlParam('fragment', $(this).attr('href'));
      }
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 *
 * Implement a modal form.
 *
 * @see modal.inc for documentation.
 *
 * This javascript relies on the CTools ajax responder.
 */

(function ($) {
  // Make sure our objects are defined.
  Drupal.CTools = Drupal.CTools || {};
  Drupal.CTools.Modal = Drupal.CTools.Modal || {};

  /**
   * Display the modal
   *
   * @todo -- document the settings.
   */
  Drupal.CTools.Modal.show = function(choice) {
    var opts = {};

    if (choice && typeof choice == 'string' && Drupal.settings[choice]) {
      // This notation guarantees we are actually copying it.
      $.extend(true, opts, Drupal.settings[choice]);
    }
    else if (choice) {
      $.extend(true, opts, choice);
    }

    var defaults = {
      modalTheme: 'CToolsModalDialog',
      throbberTheme: 'CToolsModalThrobber',
      animation: 'show',
      animationSpeed: 'fast',
      modalSize: {
        type: 'scale',
        width: .8,
        height: .8,
        addWidth: 0,
        addHeight: 0,
        // How much to remove from the inner content to make space for the
        // theming.
        contentRight: 25,
        contentBottom: 45
      },
      modalOptions: {
        opacity: .55,
        background: '#fff'
      }
    };

    var settings = {};
    $.extend(true, settings, defaults, Drupal.settings.CToolsModal, opts);

    if (Drupal.CTools.Modal.currentSettings && Drupal.CTools.Modal.currentSettings != settings) {
      Drupal.CTools.Modal.modal.remove();
      Drupal.CTools.Modal.modal = null;
    }

    Drupal.CTools.Modal.currentSettings = settings;

    var resize = function(e) {
      // When creating the modal, it actually exists only in a theoretical
      // place that is not in the DOM. But once the modal exists, it is in the
      // DOM so the context must be set appropriately.
      var context = e ? document : Drupal.CTools.Modal.modal;

      if (Drupal.CTools.Modal.currentSettings.modalSize.type == 'scale') {
        var width = $(window).width() * Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = $(window).height() * Drupal.CTools.Modal.currentSettings.modalSize.height;
      }
      else {
        var width = Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = Drupal.CTools.Modal.currentSettings.modalSize.height;
      }

      // Use the additionol pixels for creating the width and height.
      $('div.ctools-modal-content', context).css({
        'width': width + Drupal.CTools.Modal.currentSettings.modalSize.addWidth + 'px',
        'height': height + Drupal.CTools.Modal.currentSettings.modalSize.addHeight + 'px'
      });
      $('div.ctools-modal-content .modal-content', context).css({
        'width': (width - Drupal.CTools.Modal.currentSettings.modalSize.contentRight) + 'px',
        'height': (height - Drupal.CTools.Modal.currentSettings.modalSize.contentBottom) + 'px'
      });
    }

    if (!Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.modal = $(Drupal.theme(settings.modalTheme));
      if (settings.modalSize.type == 'scale') {
        $(window).bind('resize', resize);
      }
    }

    resize();

    $('span.modal-title', Drupal.CTools.Modal.modal).html(Drupal.CTools.Modal.currentSettings.loadingText);
    Drupal.CTools.Modal.modalContent(Drupal.CTools.Modal.modal, settings.modalOptions, settings.animation, settings.animationSpeed);
    $('#modalContent .modal-content').html(Drupal.theme(settings.throbberTheme));
  };

  /**
   * Hide the modal
   */
  Drupal.CTools.Modal.dismiss = function() {
    if (Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.unmodalContent(Drupal.CTools.Modal.modal);
    }
  };

  /**
   * Provide the HTML to create the modal dialog.
   */
  Drupal.theme.prototype.CToolsModalDialog = function () {
    var html = ''
    html += '  <div id="ctools-modal">'
    html += '    <div class="ctools-modal-content">' // panels-modal-content
    html += '      <div class="modal-header">';
    html += '        <a class="close" href="#">';
    html +=            Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
    html += '        </a>';
    html += '        <span id="modal-title" class="modal-title">&nbsp;</span>';
    html += '      </div>';
    html += '      <div id="modal-content" class="modal-content">';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    return html;
  }

  /**
   * Provide the HTML to create the throbber.
   */
  Drupal.theme.prototype.CToolsModalThrobber = function () {
    var html = '';
    html += '  <div id="modal-throbber">';
    html += '    <div class="modal-throbber-wrapper">';
    html +=        Drupal.CTools.Modal.currentSettings.throbber;
    html += '    </div>';
    html += '  </div>';

    return html;
  };

  /**
   * Figure out what settings string to use to display a modal.
   */
  Drupal.CTools.Modal.getSettings = function (object) {
    var match = $(object).attr('class').match(/ctools-modal-(\S+)/);
    if (match) {
      return match[1];
    }
  }

  /**
   * Click function for modals that can be cached.
   */
  Drupal.CTools.Modal.clickAjaxCacheLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return Drupal.CTools.AJAX.clickAJAXCacheLink.apply(this);
  };

  /**
   * Handler to prepare the modal for the response
   */
  Drupal.CTools.Modal.clickAjaxLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return false;
  };

  /**
   * Submit responder to do an AJAX submit on all modal forms.
   */
  Drupal.CTools.Modal.submitAjaxForm = function(e) {
    var $form = $(this);
    var url = $form.attr('action');

    setTimeout(function() { Drupal.CTools.AJAX.ajaxSubmit($form, url); }, 1);
    return false;
  }

  /**
   * Bind links that will open modals to the appropriate function.
   */
  Drupal.behaviors.ZZCToolsModal = {
    attach: function(context) {
      // Bind links
      // Note that doing so in this order means that the two classes can be
      // used together safely.
      /*
       * @todo remimplement the warm caching feature
       $('a.ctools-use-modal-cache', context).once('ctools-use-modal', function() {
         $(this).click(Drupal.CTools.Modal.clickAjaxCacheLink);
         Drupal.CTools.AJAX.warmCache.apply(this);
       });
        */

      $('area.ctools-use-modal, a.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        // Create a drupal ajax object
        var element_settings = {};
        if ($this.attr('href')) {
          element_settings.url = $this.attr('href');
          element_settings.event = 'click';
          element_settings.progress = { type: 'throbber' };
        }
        var base = $this.attr('href');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
      });

      // Bind buttons
      $('input.ctools-use-modal, button.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        var button = this;
        var element_settings = {};

        // AJAX submits specified in this manner automatically submit to the
        // normal form action.
        element_settings.url = Drupal.CTools.Modal.findURL(this);
        element_settings.event = 'click';

        var base = $this.attr('id');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);

        // Make sure changes to settings are reflected in the URL.
        $('.' + $(button).attr('id') + '-url').change(function() {
          Drupal.ajax[base].options.url = Drupal.CTools.Modal.findURL(button);
        });
      });

      // Bind our custom event to the form submit
      $('#modal-content form', context).once('ctools-use-modal', function() {
        var $this = $(this);
        var element_settings = {};

        element_settings.url = $this.attr('action');
        element_settings.event = 'submit';
        element_settings.progress = { 'type': 'throbber' }
        var base = $this.attr('id');

        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        Drupal.ajax[base].form = $this;

        $('input[type=submit], button', this).click(function(event) {
          Drupal.ajax[base].element = this;
          this.form.clk = this;
          // An empty event means we were triggered via .click() and
          // in jquery 1.4 this won't trigger a submit.
          if (event.bubbles == undefined) {
            $(this.form).trigger('submit');
            return false;
          }
        });
      });

      // Bind a click handler to allow elements with the 'ctools-close-modal'
      // class to close the modal.
      $('.ctools-close-modal', context).once('ctools-close-modal')
        .click(function() {
          Drupal.CTools.Modal.dismiss();
          return false;
        });
    }
  };

  // The following are implementations of AJAX responder commands.

  /**
   * AJAX responder command to place HTML within the modal.
   */
  Drupal.CTools.Modal.modal_display = function(ajax, response, status) {
    if ($('#modalContent').length == 0) {
      Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(ajax.element));
    }
    $('#modal-title').html(response.title);
    // Simulate an actual page load by scrolling to the top after adding the
    // content. This is helpful for allowing users to see error messages at the
    // top of a form, etc.
    $('#modal-content').html(response.output).scrollTop(0);
    Drupal.attachBehaviors();
  }

  /**
   * AJAX responder command to dismiss the modal.
   */
  Drupal.CTools.Modal.modal_dismiss = function(command) {
    Drupal.CTools.Modal.dismiss();
    $('link.ctools-temporary-css').remove();
  }

  /**
   * Display loading
   */
  //Drupal.CTools.AJAX.commands.modal_loading = function(command) {
  Drupal.CTools.Modal.modal_loading = function(command) {
    Drupal.CTools.Modal.modal_display({
      output: Drupal.theme(Drupal.CTools.Modal.currentSettings.throbberTheme),
      title: Drupal.CTools.Modal.currentSettings.loadingText
    });
  }

  /**
   * Find a URL for an AJAX button.
   *
   * The URL for this gadget will be composed of the values of items by
   * taking the ID of this item and adding -url and looking for that
   * class. They need to be in the form in order since we will
   * concat them all together using '/'.
   */
  Drupal.CTools.Modal.findURL = function(item) {
    var url = '';
    var url_class = '.' + $(item).attr('id') + '-url';
    $(url_class).each(
      function() {
        var $this = $(this);
        if (url && $this.val()) {
          url += '/';
        }
        url += $this.val();
      });
    return url;
  };


  /**
   * modalContent
   * @param content string to display in the content box
   * @param css obj of css attributes
   * @param animation (fadeIn, slideDown, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   */
  Drupal.CTools.Modal.modalContent = function(content, css, animation, speed) {
    // If our animation isn't set, make it just show/pop
    if (!animation) {
      animation = 'show';
    }
    else {
      // If our animation isn't "fadeIn" or "slideDown" then it always is show
      if (animation != 'fadeIn' && animation != 'slideDown') {
        animation = 'show';
      }
    }

    if (!speed) {
      speed = 'fast';
    }

    // Build our base attributes and allow them to be overriden
    css = jQuery.extend({
      position: 'absolute',
      left: '0px',
      margin: '0px',
      background: '#000',
      opacity: '.55'
    }, css);

    // Add opacity handling for IE.
    css.filter = 'alpha(opacity=' + (100 * css.opacity) + ')';
    content.hide();

    // if we already ahve a modalContent, remove it
    if ( $('#modalBackdrop')) $('#modalBackdrop').remove();
    if ( $('#modalContent')) $('#modalContent').remove();

    // position code lifted from http://www.quirksmode.org/viewport/compatibility.html
    if (self.pageYOffset) { // all except Explorer
    var wt = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
      var wt = document.documentElement.scrollTop;
    } else if (document.body) { // all other Explorers
      var wt = document.body.scrollTop;
    }

    // Get our dimensions

    // Get the docHeight and (ugly hack) add 50 pixels to make sure we dont have a *visible* border below our div
    var docHeight = $(document).height() + 50;
    var docWidth = $(document).width();
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    if( docHeight < winHeight ) docHeight = winHeight;

    // Create our divs
    $('body').append('<div id="modalBackdrop" style="z-index: 1000; display: none;"></div><div id="modalContent" style="z-index: 1001; position: absolute;">' + $(content).html() + '</div>');

    // Keyboard and focus event handler ensures focus stays on modal elements only
    modalEventHandler = function( event ) {
      target = null;
      if ( event ) { //Mozilla
        target = event.target;
      } else { //IE
        event = window.event;
        target = event.srcElement;
      }

      var parents = $(target).parents().get();
      for (var i = 0; i < parents.length; ++i) {
        var position = $(parents[i]).css('position');
        if (position == 'absolute' || position == 'fixed') {
          return true;
        }
      }
      if( $(target).filter('*:visible').parents('#modalContent').size()) {
        // allow the event only if target is a visible child node of #modalContent
        return true;
      }
      if ( $('#modalContent')) $('#modalContent').get(0).focus();
      return false;
    };
    $('body').bind( 'focus', modalEventHandler );
    $('body').bind( 'keypress', modalEventHandler );

    // Create our content div, get the dimensions, and hide it
    var modalContent = $('#modalContent').css('top','-1000px');
    var mdcTop = wt + ( winHeight / 2 ) - (  modalContent.outerHeight() / 2);
    var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);
    $('#modalBackdrop').css(css).css('top', 0).css('height', docHeight + 'px').css('width', docWidth + 'px').show();
    // IE9 bug: modalContent may disappear due to width being auto (0px) so we set it explicitly
    modalContent.css('width', modalContent.outerWidth() + 'px');
    modalContent.css({top: mdcTop + 'px', left: mdcLeft + 'px'}).hide()[animation](speed);

    // Bind a click for closing the modalContent
    modalContentClose = function(){close(); return false;};
    $('.close').bind('click', modalContentClose);

    // Bind a keypress on escape for closing the modalContent
    modalEventEscapeCloseHandler = function(event) {
      if (event.keyCode == 27) {
        close();
        return false;
      }
    };

    $(document).bind('keydown', modalEventEscapeCloseHandler);

    // Close the open modal content and backdrop
    function close() {
      // Unbind the events
      $(window).unbind('resize',  modalContentResize);
      $('body').unbind( 'focus', modalEventHandler);
      $('body').unbind( 'keypress', modalEventHandler );
      $('.close').unbind('click', modalContentClose);
      $('body').unbind('keypress', modalEventEscapeCloseHandler);
      $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

      // Set our animation parameters and use them
      if ( animation == 'fadeIn' ) animation = 'fadeOut';
      if ( animation == 'slideDown' ) animation = 'slideUp';
      if ( animation == 'show' ) animation = 'hide';

      // Close the content
      modalContent.hide()[animation](speed);

      // Remove the content
      $('#modalContent').remove();
      $('#modalBackdrop').remove();
    };

    // Move and resize the modalBackdrop and modalContent on resize of the window
     modalContentResize = function(){
      // Get our heights
      var docHeight = $(document).height();
      var docWidth = $(document).width();
      var winHeight = $(window).height();
      var winWidth = $(window).width();
      if( docHeight < winHeight ) docHeight = winHeight;

      // Get where we should move content to
      var modalContent = $('#modalContent');
      var mdcTop =  $(document).scrollTop() + ( winHeight / 2 ) - ( modalContent.outerHeight() / 2); 
      var mdcLeft = $(document).scrollLeft() + ( winWidth / 2 ) - ( modalContent.outerWidth() / 2); 

      if(mdcLeft < 0) { mdcLeft = 0; }

      // Apply the changes
      $('#modalBackdrop').css('height', docHeight + 'px').css('width', docWidth + 'px').show();
      modalContent.css('top', mdcTop + 'px').css('left', mdcLeft + 'px').show();
    };
    $(window).bind('resize', modalContentResize);

    $('#modalContent').focus();
  };

  /**
   * unmodalContent
   * @param content (The jQuery object to remove)
   * @param animation (fadeOut, slideUp, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   */
  Drupal.CTools.Modal.unmodalContent = function(content, animation, speed)
  {
    // If our animation isn't set, make it just show/pop
    if (!animation) { var animation = 'show'; } else {
      // If our animation isn't "fade" then it always is show
      if (( animation != 'fadeOut' ) && ( animation != 'slideUp')) animation = 'show';
    }
    // Set a speed if we dont have one
    if ( !speed ) var speed = 'fast';

    // Unbind the events we bound
    $(window).unbind('resize', modalContentResize);
    $('body').unbind('focus', modalEventHandler);
    $('body').unbind('keypress', modalEventHandler);
    $('.close').unbind('click', modalContentClose);
    $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

    // jQuery magic loop through the instances and run the animations or removal.
    content.each(function(){
      if ( animation == 'fade' ) {
        $('#modalContent').fadeOut(speed, function() {
          $('#modalBackdrop').fadeOut(speed, function() {
            $(this).remove();
          });
          $(this).remove();
        });
      } else {
        if ( animation == 'slide' ) {
          $('#modalContent').slideUp(speed,function() {
            $('#modalBackdrop').slideUp(speed, function() {
              $(this).remove();
            });
            $(this).remove();
          });
        } else {
          $('#modalContent').remove();
          $('#modalBackdrop').remove();
        }
      }
    });
  };

$(function() {
  Drupal.ajax.prototype.commands.modal_display = Drupal.CTools.Modal.modal_display;
  Drupal.ajax.prototype.commands.modal_dismiss = Drupal.CTools.Modal.modal_dismiss;
});

})(jQuery);
;
/**
* Provide the HTML to create the modal dialog.
*/
Drupal.theme.prototype.ModalFormsPopup = function () {
  var html = '';

  html += '<div id="ctools-modal" class="popups-box">';
  html += '  <div class="ctools-modal-content modal-forms-modal-content">';
  html += '    <div class="popups-container">';
  html += '      <div class="modal-header popups-title">';
  html += '        <span id="modal-title" class="modal-title"></span>';
  html += '        <span class="popups-close close">' + Drupal.CTools.Modal.currentSettings.closeText + '</span>';
  html += '        <div class="clear-block"></div>';
  html += '      </div>';
  html += '      <div class="modal-scroll"><div id="modal-content" class="modal-content popups-body"></div></div>';
  html += '    </div>';
  html += '  </div>';
  html += '</div>';

  return html;
}
;

(function ($) {
  Drupal.Panels = Drupal.Panels || {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
(function ($) {
  Drupal.viewsSlideshow = Drupal.viewsSlideshow || {};

  /**
   * Views Slideshow Controls
   */
  Drupal.viewsSlideshowControls = Drupal.viewsSlideshowControls || {};

  /**
   * Implement the play hook for controls.
   */
  Drupal.viewsSlideshowControls.play = function (options) {
    // Route the control call to the correct control type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].play == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].play(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].play == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].play(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the pause hook for controls.
   */
  Drupal.viewsSlideshowControls.pause = function (options) {
    // Route the control call to the correct control type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].pause == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].pause(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].pause == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].pause(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };


  /**
   * Views Slideshow Text Controls
   */

  // Add views slieshow api calls for views slideshow text controls.
  Drupal.behaviors.viewsSlideshowControlsText = {
    attach: function (context) {

      // Process previous link
      $('.views_slideshow_controls_text_previous:not(.views-slideshow-controls-text-previous-processed)', context).addClass('views-slideshow-controls-text-previous-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_previous_', '');
        $(this).click(function() {
          Drupal.viewsSlideshow.action({ "action": 'previousSlide', "slideshowID": uniqueID });
          return false;
        });
      });

      // Process next link
      $('.views_slideshow_controls_text_next:not(.views-slideshow-controls-text-next-processed)', context).addClass('views-slideshow-controls-text-next-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_next_', '');
        $(this).click(function() {
          Drupal.viewsSlideshow.action({ "action": 'nextSlide', "slideshowID": uniqueID });
          return false;
        });
      });

      // Process pause link
      $('.views_slideshow_controls_text_pause:not(.views-slideshow-controls-text-pause-processed)', context).addClass('views-slideshow-controls-text-pause-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_pause_', '');
        $(this).click(function() {
          if (Drupal.settings.viewsSlideshow[uniqueID].paused) {
            Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": uniqueID, "force": true });
          }
          else {
            Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": uniqueID, "force": true });
          }
          return false;
        });
      });
    }
  };

  Drupal.viewsSlideshowControlsText = Drupal.viewsSlideshowControlsText || {};

  /**
   * Implement the pause hook for text controls.
   */
  Drupal.viewsSlideshowControlsText.pause = function (options) {
    var pauseText = Drupal.theme.prototype['viewsSlideshowControlsPause'] ? Drupal.theme('viewsSlideshowControlsPause') : '';
    $('#views_slideshow_controls_text_pause_' + options.slideshowID + ' a').text(pauseText);
  };

  /**
   * Implement the play hook for text controls.
   */
  Drupal.viewsSlideshowControlsText.play = function (options) {
    var playText = Drupal.theme.prototype['viewsSlideshowControlsPlay'] ? Drupal.theme('viewsSlideshowControlsPlay') : '';
    $('#views_slideshow_controls_text_pause_' + options.slideshowID + ' a').text(playText);
  };

  // Theme the resume control.
  Drupal.theme.prototype.viewsSlideshowControlsPause = function () {
    return Drupal.t('Resume');
  };

  // Theme the pause control.
  Drupal.theme.prototype.viewsSlideshowControlsPlay = function () {
    return Drupal.t('Pause');
  };

  /**
   * Views Slideshow Pager
   */
  Drupal.viewsSlideshowPager = Drupal.viewsSlideshowPager || {};

  /**
   * Implement the transitionBegin hook for pagers.
   */
  Drupal.viewsSlideshowPager.transitionBegin = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].transitionBegin == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].transitionBegin(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].transitionBegin == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].transitionBegin(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the goToSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.goToSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].goToSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].goToSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].goToSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].goToSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the previousSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.previousSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].previousSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].previousSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].previousSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].previousSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the nextSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.nextSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].nextSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].nextSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].nextSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].nextSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };


  /**
   * Views Slideshow Pager Fields
   */

  // Add views slieshow api calls for views slideshow pager fields.
  Drupal.behaviors.viewsSlideshowPagerFields = {
    attach: function (context) {
      // Process pause on hover.
      $('.views_slideshow_pager_field:not(.views-slideshow-pager-field-processed)', context).addClass('views-slideshow-pager-field-processed').each(function() {
        // Parse out the location and unique id from the full id.
        var pagerInfo = $(this).attr('id').split('_');
        var location = pagerInfo[2];
        pagerInfo.splice(0, 3);
        var uniqueID = pagerInfo.join('_');

        // Add the activate and pause on pager hover event to each pager item.
        if (Drupal.settings.viewsSlideshowPagerFields[uniqueID][location].activatePauseOnHover) {
          $(this).children().each(function(index, pagerItem) {
            var mouseIn = function() {
              Drupal.viewsSlideshow.action({ "action": 'goToSlide', "slideshowID": uniqueID, "slideNum": index });
              Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": uniqueID });
            }
            
            var mouseOut = function() {
              Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": uniqueID });
            }
          
            if (jQuery.fn.hoverIntent) {
              $(pagerItem).hoverIntent(mouseIn, mouseOut);
            }
            else {
              $(pagerItem).hover(mouseIn, mouseOut);
            }
            
          });
        }
        else {
          $(this).children().each(function(index, pagerItem) {
            $(pagerItem).click(function() {
              Drupal.viewsSlideshow.action({ "action": 'goToSlide', "slideshowID": uniqueID, "slideNum": index });
            });
          });
        }
      });
    }
  };

  Drupal.viewsSlideshowPagerFields = Drupal.viewsSlideshowPagerFields || {};

  /**
   * Implement the transitionBegin hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.transitionBegin = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_'+ pagerLocation + '_' + options.slideshowID + '_' + options.slideNum).addClass('active');
    }

  };

  /**
   * Implement the goToSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.goToSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + options.slideNum).addClass('active');
    }
  };

  /**
   * Implement the previousSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.previousSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Get the current active pager.
      var pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"].active').attr('id').replace('views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_', '');

      // If we are on the first pager then activate the last pager.
      // Otherwise activate the previous pager.
      if (pagerNum == 0) {
        pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').length() - 1;
      }
      else {
        pagerNum--;
      }

      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + pagerNum).addClass('active');
    }
  };

  /**
   * Implement the nextSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.nextSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Get the current active pager.
      var pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"].active').attr('id').replace('views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_', '');
      var totalPagers = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').length();

      // If we are on the last pager then activate the first pager.
      // Otherwise activate the next pager.
      pagerNum++;
      if (pagerNum == totalPagers) {
        pagerNum = 0;
      }

      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + slideNum).addClass('active');
    }
  };


  /**
   * Views Slideshow Slide Counter
   */

  Drupal.viewsSlideshowSlideCounter = Drupal.viewsSlideshowSlideCounter || {};

  /**
   * Implement the transitionBegin for the slide counter.
   */
  Drupal.viewsSlideshowSlideCounter.transitionBegin = function (options) {
    $('#views_slideshow_slide_counter_' + options.slideshowID + ' .num').text(options.slideNum + 1);
  };

  /**
   * This is used as a router to process actions for the slideshow.
   */
  Drupal.viewsSlideshow.action = function (options) {
    // Set default values for our return status.
    var status = {
      'value': true,
      'text': ''
    }

    // If an action isn't specified return false.
    if (typeof options.action == 'undefined' || options.action == '') {
      status.value = false;
      status.text =  Drupal.t('There was no action specified.');
      return error;
    }

    // If we are using pause or play switch paused state accordingly.
    if (options.action == 'pause') {
      Drupal.settings.viewsSlideshow[options.slideshowID].paused = 1;
      // If the calling method is forcing a pause then mark it as such.
      if (options.force) {
        Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce = 1;
      }
    }
    else if (options.action == 'play') {
      // If the slideshow isn't forced pause or we are forcing a play then play
      // the slideshow.
      // Otherwise return telling the calling method that it was forced paused.
      if (!Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce || options.force) {
        Drupal.settings.viewsSlideshow[options.slideshowID].paused = 0;
        Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce = 0;
      }
      else {
        status.value = false;
        status.text += ' ' + Drupal.t('This slideshow is forced paused.');
        return status;
      }
    }

    // We use a switch statement here mainly just to limit the type of actions
    // that are available.
    switch (options.action) {
      case "goToSlide":
      case "transitionBegin":
      case "transitionEnd":
        // The three methods above require a slide number. Checking if it is
        // defined and it is a number that is an integer.
        if (typeof options.slideNum == 'undefined' || typeof options.slideNum !== 'number' || parseInt(options.slideNum) != (options.slideNum - 0)) {
          status.value = false;
          status.text = Drupal.t('An invalid integer was specified for slideNum.');
        }
      case "pause":
      case "play":
      case "nextSlide":
      case "previousSlide":
        // Grab our list of methods.
        var methods = Drupal.settings.viewsSlideshow[options.slideshowID]['methods'];

        // if the calling method specified methods that shouldn't be called then
        // exclude calling them.
        var excludeMethodsObj = {};
        if (typeof options.excludeMethods !== 'undefined') {
          // We need to turn the excludeMethods array into an object so we can use the in
          // function.
          for (var i=0; i < excludeMethods.length; i++) {
            excludeMethodsObj[excludeMethods[i]] = '';
          }
        }

        // Call every registered method and don't call excluded ones.
        for (i = 0; i < methods[options.action].length; i++) {
          if (Drupal[methods[options.action][i]] != undefined && typeof Drupal[methods[options.action][i]][options.action] == 'function' && !(methods[options.action][i] in excludeMethodsObj)) {
            Drupal[methods[options.action][i]][options.action](options);
          }
        }
        break;

      // If it gets here it's because it's an invalid action.
      default:
        status.value = false;
        status.text = Drupal.t('An invalid action "!action" was specified.', { "!action": options.action });
    }
    return status;
  };
})(jQuery);
;
// =======================================================================================
// MOBILE DEVICE RECOGNITION & DEVICE CAPTURE 
// =======================================================================================
var deviceRec = {
  // --------------------------------------------------------------------------------------------------
  // --- Change DisplayValues variable to Y to display all values in table in browser - for testing ---
  // --------------------------------------------------------------------------------------------------
  displayValues : true,
  userAgent : navigator.userAgent,
  output : '',
  device : '',
  deviceInfo : null,
  mobileBrowser : 0,
  storeAsVariable : false,
  trackName : '',
  trackUrl : '',
  debug : false,
  // =====================================================================================
  // --- STEP 1 - Parse User_Agent string to identify the DEVICE ---
  // --- The first three segments of the User_Agent are parsed from complete string 
  // ---    then the 'semi-colon + space' combinations are replaced with forward slashes '/'  to make
  // ---    data import into marketing database easier 
  // --- Screen resolution taken from Browser
  // =====================================================================================   
  buildDevice : function() {
    
    var screen_res = screen.width + 'x' + screen.height;
    var user_agent = this.userAgent;
    var deviceArray = new Array();
    var replaceSpace = '';
    var systemInfo = user_agent.match(/\(([^\)]+)\)/);
    if (systemInfo.length > 1) {
      var infoArray = systemInfo[1].split(';');
      if (infoArray.length > 0) {
        var count = 0;
        for (var i = 0; i < infoArray.length; i++) {
          // Just grabbing the first 3 delimiters
          if (count == 3) {
            break;
          }
          // Trim value and replace spaces with url encode space value
          replaceSpace = infoArray[i].replace(/\s+/g, '');
          // We don't want the U or I status in the string which are single character string
          if (replaceSpace.length > 1) {
            deviceArray[count] = replaceSpace;
            count++;
          } 
        }
      }
    }
    if (this.device == 'kindle-fire' || this.device == 'nook-color') {
      // Set the device to kindle fire or nook color
      deviceArray[0] = this.device;
    }
    // Pipe is not allowed in URL (RFC1738), must encode
    // Add pipe seperators in array
    var language = window.navigator.userLanguage || window.navigator.language;
    language = language.toLowerCase();

    this.setDeviceCookie('langauge', language);
    deviceArray[2] = language; 
    var DeviceStr = deviceArray.join('/');
    this.setDeviceCookie('device', this.device);
    this.setDeviceCookie('resolutions', screen_res);
   
    DeviceStr += '/' + screen_res;
    // Format as Device type/Operating System/Language/Screen Resolutions
    // eg: ipad/CPU OS 4_3_3likeMacOSX/en-us/1280x1024
    this.deviceInfo = DeviceStr;
  },
  // ======================================================================
  // --- STEP 2 - Identify if MOBILE device and what device ---
  // ======================================================================
  detectMobileDevice : function() {
    var mobile_browser = false;
    var user_agent = navigator.userAgent;
    var user_agent_lower = user_agent.toLowerCase();
    var deviceArray = ['pda','wap','palm','iphone','ipad','kindle fire','kindle','silk-accelerated','nook','android','up.browser','up.link','mmp','symbian','smartphone','midp','windows ce','mobile','mini','phone'];
    for (var x = 0; x <= deviceArray.length; x++)  { 
      if(user_agent_lower.indexOf(deviceArray[x]) > -1) {
        this.device = deviceArray[x];
        // Silk accelerted is the kindle version of cloud base browsing
        if (this.device == 'silk-accelerated' || this.device == 'kindle fire') {
          this.device = 'kindle-fire';
        }
        else if (this.device == 'rim') {
          // Set all RIM devices to blackberry
          this.device = 'blackberry';
        }
        mobile_browser = true;
        break;
      }
    }
    // Nook has some ridicolous user agent
    var nook_array = ['mozilla', 'linux', 'applewebkit', 'khtml', 'gecko', 'safari'];
    var nook_match = 0;
    if (!mobile_browser) {
      for (var x = 0; x <= nook_array.length; x++)  {
        if(user_agent_lower.indexOf(nook_array[x])> -1) {
          // Must match all in array and if there is a desktop mode(intel) or tablet mode (android)
          nook_match++;
          if (nook_match == nook_array.length && (user_agent_lower.indexOf('android')> -1 || user_agent_lower.indexOf('intel')> -1) ) {
            this.device = 'nook-color';
            mobile_browser = true;
          }
        }
        else{
          // Miss one or more keywords in the user agent
          break;
        }
      }
    }  

    if (!mobile_browser) {
      // If we are not already mobile, check the first four characters of user agent
      // against another bunch of devices.
      var mobile_ua = user_agent_lower.substring(0,4);
      var AgentsArray = [ 'w3c ','acs-','alav','alca','amoi','audi','avan','benq','bird','blac',
                    'blaz','brew','cell','cldc','cmd-','dang','doco','eric','hipt','inno',
                    'ipaq','java','jigs','kddi','keji','leno','lg-c','lg-d','lg-g','lge-',
                    'maui','maxo','midp','mits','mmef','mobi','mot-','moto','mwbp','nec-',
                    'newt','noki','oper','palm','pana','pant','phil','play','port','prox',
                    'qwap','sage','sams','sany','sch-','sec-','send','seri','sgh-','shar',
                    'sie-','siem','smal','smar','sony','sph-','symb','t-mo','teli','tim-',
                    'tosh','tsm-','upg1','upsi','vk-v','voda','wap-','wapa','wapi','wapp',
                    'vwapr','webc','winw','winw','xda ','xda-' ];

      for (x = 0; x <= AgentsArray.length; x++) { 
        if(mobile_ua.indexOf(AgentsArray[x]) > 0) {
          this.device = 'other';
          mobile_browser = true;
          break;
        }
      }
    }

    // Not sure why we switch back to non-mobile browser is user agent containsi
    // "windows". Newer Windows mobile phones will contain that string, so this
    // is probably deprecated.
    // http://wmpoweruser.com/developers-changes-to-user-agent-string-of-ie9-mobile-on-windows-phone-mango/
    //if (user_agent_lower.indexOf('windows') > 0) {
    //  mobile_browser = 0;
    //}
    this.mobileBrowser = mobile_browser;
  },
  cookies : {
    setCookie : function(name, value, exdays){
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + exdays);
      var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
      document.cookie = name + "=" + c_value;
    },
    getCookie : function(name){
      var i,x,y,ARRcookies=document.cookie.split(";");
      for (i=0;i<ARRcookies.length;i++) {
        x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x = x.replace(/^\s+|\s+$/g,"");
        if (x == name) {
          return unescape(y);
        }
      }
    },
    deleteCookie : function(name){
      this.setCookie(name, null, -1000);
    }
  },
  getAllDeviceCookie : function (name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    var data = {};
    for (i=0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x = x.replace(/^\s+|\s+$/g,"");
      var regex = new RegExp( '^' + name + "\\[([a-z]*)\\]$");
      if (regex.exec(x)) {
        data[x] = unescape(y);
      }
      else if (x == name) {
        return unescape(y);
      }
    }
    return data;
  }, 
  setDeviceCookie : function (name, value, exdays) {
    this.cookies.setCookie('deviceRecognition[' + name + ']', value, exdays);
  },
  getDeviceCookie : function (name) {
    return this.cookies.getCookie('deviceRecognition[' + name + ']');
  },
  deleteDeviceCookie : function (name) {
    var cookieData = this.getAllDeviceCookie(name);
    
    if (typeof(cookieData) != 'undefined') {
      if (typeof(cookieData) == 'object') {
        jQuery.each(cookieData, function(key, value){
          // Delete all cookies in object
          deviceRec.cookies.deleteCookie(key);
        });
      }
      else{
        // Delete a single cookie
        deviceRec.cookies.deleteCookie(name);
      }
    } 
  },
  // ====================================================================================================
  // --- STEP 3 - Create servlet string and print pixel for Silverpop Engage conversion tracking 
  // --- Calls COT servlet with parameters that were stored in a session
  // ====================================================================================================
  /**
   * Initialized value
   */
  init : function () {
    // Always run the detect mobile device code, so we can share the variable with other js that wants to access the objects
    this.detectMobileDevice();
    // Only run if no cookie is set
    if(!this.getDeviceCookie('mobile')) {
      this.buildDevice();
      // set cookies only for mobile device
      this.setDeviceCookie('mobile', true);
    }
  }
};

// Uncomment line below to always fire even after first hit.
// deviceRec.deleteDeviceCookie('deviceRecognition');
// Track page title in link
/*
deviceRec.trackName = document.title;
// Track URL in link
deviceRec.trackUrl = document.location.href;
//Change value to true to see output test value
deviceRec.displayValues = false;
// run initialized object
deviceRec.init();
*/
;
// =======================================================================================
// DEVICE CAPTURE 
// 
// Author: Mark Crone, Bonnier Corp 
// 
// Step 1 - Identify if MOBILE device
//    Algorithm is lightweight � code is mostly based on a list 
//      of about 90 well-known mobile browser User-Agent string snippets, 
//      with a couple of special cases for Opera Mini, 
//      the W3C Default Delivery Context and some other Windows browsers. 
//    The code also looks to see if the browser advertises WAP capabilities as a hint.

// Step 2-3 - Get screen resolution and device information from User_Agent

// Step 4-5 - Create servlet to and print pixel to activate Silverpop conversion tracking
// Revised (06/27/2012)
// =======================================================================================
var csTracking = {
  // --------------------------------------------------------------------------------------------------
  // --- Change DisplayValues variable to Y to display all values in table in browser - for testing ---
  // --------------------------------------------------------------------------------------------------
  displayValues : true,
  output : '',
  mobileBrowser : 0,
  storeAsVariable : false,
  trackName : '',
  trackUrl : '',
  // ====================================================================================================
  // --- STEP 3 - Read Silverpop values from Silverpop Click Thru ULR
  // ====================================================================================================

  // --- Attn: AMSTELNET 
  // --- spMailingID, spUSerID, spJobID and spReportID are NVP's passed from Silverpop in URL

  // Example of URL 
  //http://www.productdesign-biz.com/bonnier/devicerecognition_java_MASTER.php?spMailingID=4146475&spUserID=MTc4OTYwMTg4MjES1&spJobID=249958349&spReportId=MjQ5OTU4MzQ5S0
  readSilverpopNVPValues : function() {
    var parseUrl = {
      m : this.getParameterByName('spMailingID'),
      r : this.getParameterByName('spUserID'),
      j : this.getParameterByName('spJobID'),
      // --- Note small "d" on spReportId - Silverpop convention
      rj : this.getParameterByName('spReportId'),
      spPodId : this.getParameterByName('spPodID')
    };
    return parseUrl;
  },
  // ====================================================================================================
  // --- STEP 3 - Create servlet string and print pixel for Silverpop Engage conversion tracking 
  // --- Calls COT servlet with parameters that were stored in a session
  // ====================================================================================================

  // --- PARAMETER NOTES ---  
  // ---  1) 'servlet_loc' value is based on Pod2 - must be dynamic based on sending Pod
  // ---  2) 'Action' is a text to identify the detail as a Device Recognition string ---
  // ---  3) 'Detail' is the string identifying the Device, Operating System, etc
  createSilverpopServlet : function (deviceStr) {
    var servlet_loc = '';
    var img = false;
    var servlet = 'cot';
    var action = 'Device_Rec';
    var detail = deviceStr;
    var amount = '0.00';
    var conversion_post = false;
    var deviceType = 'Computer';
    var output = '';
    var url = this.readSilverpopNVPValues();
    // Grab the pod id and return the link depending on id
    servlet_loc = this.decodePodId(url.spPodId);

    var servlet_call = 
      servlet_loc + 
      servlet + 
      '?m='  + url.m + 
      '&r='   + url.r + 
      '&j='  + url.j + 
      '&rj=' + url.rj + 
      '&a='  + action +
      '&d='  + detail + 
      '&amt='+ amount;
    if (this.trackUrl != '') {
      servlet_call += '&name=' + this.trackUrl;
    }
    if (this.trackName != '') {
      servlet_call += '&s=' + this.trackName;
    }
    // --- Replacing 'spaces' with '+' 
    var new_str = servlet_call.replace(/[\s]/g,'+'); 
    servlet_call = new_str;
    if (url.m != null && url.r != null) {
      if (this.mobileBrowser > 0){
        conversion_post = true;
        deviceType =  'Mobile';
        img = document.createElement('img');
        img.setAttribute('alt', 'clickstream');
        img.setAttribute('src', servlet_call);
        img.setAttribute('height', '1');
        img.setAttribute('width', '1');
        output = '<img src="' + servlet_call + '" width="1" height="1" />';
      }
      if (this.displayValues) {
        output += '<table width="600">';
        output += '<tr><td colspan="2" width="30%" nowrap="nowrap"><strong>Conversion Tracking - Mobile Device Recognition</strong></td></tr>';
        output += '<tr><th align="right">Type of Device</th><td align=left>' + deviceType + '</td></tr>';
        output += '<tr><th align=right>Detail</th><td>' + detail + '</td></tr>';
        output += '<tr><th align=right>MailingID</th><td>' + url.m + '</td></tr>';
        output += '<tr><th align=right>UserID</th><td>' + url.r + '</td></tr>';
        output += '<tr><th align=right>JobID</th><td>' + url.j + '</td></tr>';
        output += '<tr><th align=right>ReportId</th><td>' +url.rj+ '</td></tr>';
        output += '<tr><th align=right>Did Conversion Post?</th><td>' + conversion_post + '</td></tr>';
        output += '</table>';
        output += '<p>Servlet_call = '+servlet_call+ '</p>';
      }
    }
    this.output = output;
    if (this.storeAsVariable && img) {
      // Store output as a variable
      return;
    }
    else if (img){
      // Write the output on screen
      var bodyTag = document.body;
      bodyTag.appendChild(img);
    }
  },
  decodePodId : function (id) {
    var return_link = '';
    switch (id) {
      case '010':
        return_link = 'http://sdm3.rm04.net/';
        break;
      case '01S':
        return_link = 'https://engage1.silverpop.com/';
        break;
      case '020':
        return_link = 'http://recp.rm05.net/';
        break;
      case '02S':
        return_link = 'https://engage2.silverpop.com/';
        break;
      case '030':
        return_link = 'http://recp.mkt31.net/';
        break;
      case '03S':
        return_link = 'https://engage3.silverpop.com/';
        break;
      default:
        return_link = 'http://recp.rm05.net/';
        break;
    }
    return return_link;
  },
  /**
   * http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
   * Parses query string for get values.
   */
  getParameterByName : function (name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
    .exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },
  /**
   * Initialized value
   */
  init : function () {
    if (typeof(deviceRec) == 'object' && deviceRec.deviceInfo != ''){
      deviceRec.debug = csTracking.getParameterByName('bctdebug');
      if (deviceRec.debug !== null) {
        alert(deviceRec.device);
      }
      if (!deviceRec.getDeviceCookie('spTracking')) {
        this.mobileBrowser = deviceRec.mobileBrowser;
        this.createSilverpopServlet(deviceRec.deviceInfo);
        deviceRec.setDeviceCookie('spTracking', deviceRec.deviceInfo);
      }
    }
  }
};;
function omniture_cleanup(pass) {
  // Defaults to 2 loops if none is pass
  var defaultPass = 2;
  if (typeof(pass) !== 'number') {
     pass = defaultPass;
  }
  else if (pass >= 10 && pass <= 0) {
    pass = defaultPass;
  }
  if (omnitureScodeArray != 'undefined') {
    // Number of pass it runs thru to parse undefined values in scode
    for (var i = 0; i < pass; i++) {
      for (var key in omnitureScodeArray) {
        if (omnitureScodeArray.hasOwnProperty(key)) {
          var omniValue = omnitureScodeArray[key];
          var data = key.split('.');
          // Only parse data beging with s.xxxx
          if (data.length == 2 && data[0] == 's') {
            if (s[data[1]].search('undefined') > -1) {
              // Re-evaluate the undefined value;
              s[data[1]] = eval(omniValue);
            }
            // Strip thru all the scode parameters with double colon with two pass
            s[data[1]] = s[data[1]].replace('::', ':').replace('::', ':');
          }
        }
      }
    }
  }
};
/**
 * @file
 * Get the value for SOLR and go to the search results page.
 */

(function ($, Drupal, window, document, undefined) {

Drupal.behaviors.solrSearchField =  {
  attach: function (context, settings) {
    $('.solr_client_form').submit(function(event) {
      event.preventDefault();

      var field = $(this).find('input.solr_client_form_search');
      if (field.length !== 1) {
        return;
      }
      if (field.val() === '') {
        alert (field[0].title);
        return false;
      }

      var path = $(this).find('input.solr_client_path').val();
      if (typeof path === 'undefined' || path === '') { path = 'find'; }
      window.location = Drupal.settings.basePath + path + '/' + field.val();
    });
  }
}

})(jQuery, Drupal, this, this.document);

;
function _bonnier_publications_onchange_callback(el) {
  // Retrieve the url from the select box.
  if (el.options[el.selectedIndex].value != '') {
	// Used for most browsers.
	window.open(el.options[el.selectedIndex].value, '_publication')
	// If the first one does nothing, the second one will kick on (for iOS).
	var a = document.createElement('a');
	a.setAttribute("href", el.options[el.selectedIndex].value);
	a.setAttribute("target", "_blank");

	var dispatch = document.createEvent("HTMLEvents")
	dispatch.initEvent("click", true, true);
	a.dispatchEvent(dispatch);
  }
};

(function($) {
  Drupal.behaviors.CToolsJumpMenu = {
    attach: function(context) {
      $('.ctools-jump-menu-hide')
        .once('ctools-jump-menu')
        .hide();

      $('.ctools-jump-menu-change')
        .once('ctools-jump-menu')
        .change(function() {
          var loc = $(this).val();
          var urlArray = loc.split('::');
          if (urlArray[1]) {
            location.href = urlArray[1];
          }
          else {
            location.href = loc;
          }
          return false;
        });

      $('.ctools-jump-menu-button')
        .once('ctools-jump-menu')
        .click(function() {
          // Instead of submitting the form, just perform the redirect.

          // Find our sibling value.
          var $select = $(this).parents('form').find('.ctools-jump-menu-select');
          var loc = $select.val();
          var urlArray = loc.split('::');
          if (urlArray[1]) {
            location.href = urlArray[1];
          }
          else {
            location.href = loc;
          }
          return false;
        });
    }
  }
})(jQuery);
;
// ============ SOCIAL SIDE BAR ============== //
(function($) {
  var socialSideBar = function() {
  // Main Variables
  var dataSettings= null;
  var modulePath = null;
  // Misc
  var loadingIcon;
  var isAnimating = false;
  var curSelected = null;
  // Animation
  var activeNum = 0;
  var oldNum = 0;
  // Tracking
  var trackedArray = [];
  
  return {
    init: function() {
      // Get the configuration array
      dataSettings = Drupal.settings.social_plugins;
      modulePath = Drupal.settings.basePath + dataSettings.path;
      // create loading DOM
      loadingIcon = '<div class="little-load-icon"><img src="' + modulePath + '/images/loading.gif"/></div>';
      // Create initial Structure
      socialSideBar.createStructure();  
    },
    // Create the initial DOM structure
    createStructure: function() {      
      // Create an array from the order list       
      var orderArray = new Array();      
      orderArray = dataSettings.order.split(",");
      var startNum = null;
      // Run through each item and create the tabs and panels
      for (i=0; i<orderArray.length; i++) {
        var tabHtml = '<li id="' + orderArray[i] + '" class="button nav' + i + '">' + orderArray[i] + '</li>';
        var panelHtml = '<div id="ssb-' + orderArray[i] + '" class="ssb-panel"></div>';
        $('.ssb-nav UL').append(tabHtml);
        $('.ssb-panels-wrapper').append(panelHtml);  
        // Make sure the starting tab is in the array first
        if (dataSettings.init == orderArray[i]) {
          startNum = i;  
        } 
      }
      // Create Facebook first if it's enabled (because of Facebook's API)
      if (dataSettings.hasOwnProperty('facebook')){
        socialSideBar.createElement('facebook');
      }
      // Start with a selected element
      if (startNum == null) {
        socialSideBar.createElement(orderArray[0]);
        socialSideBar.selectElement(0);
      } else {
        socialSideBar.createElement(dataSettings.init);
        socialSideBar.selectElement(startNum);
      }
      // Create the DOM elements with mouse over  
      $(".ssb-nav LI").bind('mouseenter', function() {
        // index used to match up to the panel
        var numIndex = $('.ssb-nav LI').index(this);
        // current ID to get the correct feed
        var currentId = $(this).attr('id');
        socialSideBar.createElement(currentId);
        socialSideBar.selectElement(numIndex);
        socialSideBar.handleOmniture(currentId);
      });
    },
    // Create the individual elements
    createElement: function(selElement) {
      switch(selElement) {
        // FACEBOOK
        case 'facebook':
        if (!$('#ssb-facebook').hasClass('loaded')) {
          if (dataSettings.facebook.view == 'faces') {
            var faces = 'true';
            var stream = 'false';
          } else {
            var faces = 'false';
            var stream = 'true';
          }
          var facebookHtml = '<iframe src="//www.facebook.com/plugins/likebox.php?'  + ' href=https%3A%2F%2Fwww.facebook.com%2F' + dataSettings.facebook.username + '&width=300&height=405&show_faces=' + faces + '&colorscheme=light' + '&stream=' + stream + '&show_border=false&header=false"' + ' scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:370px;" allowTransparency="true"></iframe>'
          $("#ssb-facebook").html(facebookHtml);
          $('#ssb-facebook').addClass('loaded');
        }
        break;
        // TWITTER
        case 'twitter':
        if (!$('#ssb-twitter').hasClass('loaded')) {
          $("#ssb-twitter").html(dataSettings.twitter.markup);
          $('#ssb-twitter').addClass('loaded');
          $("#ssb-twitter").append(loadingIcon);
        }
        break;
        // PINTEREST
        case 'pinterest':
        if (!$('#ssb-pinterest').hasClass('loaded')) {
          var pinterestHtml = dataSettings.pinterest.feed + '<div id="pinterest_container"><a href="http://pinterest.com/' + dataSettings.pinterest.user + '/"><img src="http://passets-lt.pinterest.com/images/about/buttons/pinterest-button.png" width="80" height="28" alt="Follow Me on Pinterest" /></a></div>';
          $('#ssb-pinterest').html(pinterestHtml);
          $('#ssb-pinterest').addClass('loaded');
        }
        break;
        // INSTAGRAM
        case 'instagram':
        if (!$('#ssb-instagram').hasClass('loaded')) {
          var instagramHtml = dataSettings.instagram + '<div id="instagram_container"><img src="' + modulePath + '/images/instagram_logotype.gif" alt="instagram"></div>';
          // Since we load our instagram images server side, we need to support
          // sites that use lazy loaded images by doing the replacement for
          // them.
          $('#ssb-instagram').html(socialSideBar.handleLazyImages(instagramHtml));
          $('#ssb-instagram').addClass('loaded');
        }
        break;
        // SPOTIFY
        case 'spotify':
        if (!$('#ssb-spotify').hasClass('loaded')) {
          var spotifyHtml = '<iframe id="ssb-spotifyiFrame" src="https://embed.spotify.com/?uri=' + dataSettings.spotify + '" width="300" height="370" frameborder="0" allowtransparency="false"></iframe>';
          $('#ssb-spotify').html(spotifyHtml);
          $('#ssb-spotify').addClass('loaded');
        }
        break;
        // YOUTUBE
        case 'youtube':
        if (!$('#ssb-youtube').hasClass('loaded')) {
          var youtubeData = jQuery.parseJSON(dataSettings.youtube.data);
          var yviews = 0;
          var ylikes = 0;
          var yfavs = 0;
          // Get the video from youTube and display it
          var youtubeVideoHtml = '<iframe width="280" height="158" src="http://www.youtube.com/embed/' + dataSettings.youtube.vid + '?rel=0;showinfo=0;controls=0;wmode=transparent" frameborder="0" wmode="Opaque" allowfullscreen></iframe>';
          $('#ssb-youtube').html(youtubeVideoHtml);
          
          // Get the title, description, views, likes, and favorites
          if (youtubeData.entry.hasOwnProperty('yt$rating')) {
            ylikes = youtubeData.entry.yt$rating.numLikes;
          } 
          if (youtubeData.entry.hasOwnProperty('yt$statistics')) {
            yviews = youtubeData.entry.yt$statistics.viewCount;
            yfavs = youtubeData.entry.yt$statistics.favoriteCount;
          } 
          var youtubeDataHtml = '<div class="youtube-data"><h2>' + youtubeData.entry.title.$t + '</h2><p>' + youtubeData.entry.media$group.media$description.$t + '</p><div class="youtube-stats"><span class="views">' + yviews + ' views</span> | <span class="likes">' + ylikes + ' likes</span> | <span class="favorites">' + yfavs + ' favorites</span></div></div>';
          $('#ssb-youtube').append(youtubeDataHtml);              
          $('#ssb-youtube').addClass('loaded');
        }
        break;
        // RSS FEED
        case 'rss':
        if (!$('#ssb-rss').hasClass('loaded')) {
          var rssHtml = '<iframe id="ssb-rssiFrame" src="' + modulePath + '/templates/rss_widget.php?id=' + dataSettings.rss + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:320px; display:none;" allowTransparency="true"></iframe><span class="follow_btn"><a href="' + dataSettings.rss + '"><img src="' + modulePath + '/images/social-rss.png" style="padding-top3px;" alt="rss feed subscribe">SUBSCRIBE</a></span>';
          $('#ssb-rss').html(rssHtml);
          $('#ssb-rss').addClass('loaded');
          $("#ssb-rss").append(loadingIcon);
          
          // display loading icon until iframe is loaded
          $('#ssb-rssiFrame').load(function () {
            $("#ssb-rssiFrame").css('display','block');
            $(".little-load-icon").remove();
          });
        }
        break;
        // E-NEWSLETTER
        case 'newsletter':
        if (!$('#ssb-newsletter').hasClass('loaded')) {
          var newsletterHtml = dataSettings.newsletter.content;
          $('#ssb-newsletter').html(newsletterHtml);
          $('#ssb-newsletter').addClass('loaded');
          $("#ssb-newsletter input").each( function(i,el) {
            laserfist_add_hint(el,$(this).val());
          });
        }
        break;
        // SUBSCRIBE
        case 'subscribe':
        if (!$('#ssb-subscribe').hasClass('loaded')) {
          var subscribeHtml = dataSettings.subscribe;
          $('#ssb-subscribe').html(subscribeHtml);
          $('#ssb-subscribe').addClass('loaded');
        }
        break;
      }
    },
    // Select the correct panel
    selectElement: function(selectedNum) {
      // If the new number is not the currently selected tab and it's not animating
      if (selectedNum != curSelected) {
      $('.ssb-panel').each(function(index) {
        // get current index num
        var numIndex = $('.ssb-panel').index(this);
        
        if ($(this).hasClass('ssb-panel-old') && numIndex != selectedNum) {
          $(this).removeClass('ssb-panel-old');
        }
        if ($(this).hasClass('ssb-panel-active') && numIndex != selectedNum) {
          $(this).addClass('ssb-panel-old').removeClass('ssb-panel-active');
          oldNum = $('.ssb-panel').index(this);
        }
        if (numIndex == selectedNum) {
          $(this).removeClass('ssb-panel-old').addClass('ssb-panel-active');
          activeNum = $('.ssb-panel').index(this);  
          curSelected = activeNum;
        } 
      });
        socialSideBar.animateElement();
      }
      // Update the tabs to include active for selected
      var newTab = ".ssb-nav .nav" + activeNum;
      var oldTab = ".ssb-nav .nav" + oldNum;
      $(oldTab).removeClass('active');
      $(newTab).addClass('active');
    }, 
    // Set up the panel animations
    animateElement: function() {
      if (activeNum > oldNum) {
        $('.ssb-panel-active').css('left','300px');
        $('.ssb-panel-old').css('left','0px');
        socialSideBar.animateWrapper('-300px');  
        isAnimating = true;
      } else if (activeNum < oldNum) {
        $('.ssb-panel-active').css('left','-300px');
        $('.ssb-panel-old').css('left','0px');
        socialSideBar.animateWrapper('300px');  
        isAnimating = true;
      } else if (activeNum == oldNum) {
        $('.ssb-panel-active').css('left','0px');
        $('.ssb-panel-old').css('left','0px');  
      }
    },
    // Animate the wrapper to the correct position, then reset. 
    animateWrapper: function(num) {
      $('.ssb-panel-old').stop().animate({
        left: num,
      }, {
        duration: 300,
        specialEasing: {
        left: 'swing'
      },
      complete: function() {
        $('.ssb-panel-active').css('left','0px');
        $('.ssb-panel-old').css('left','0px');
        $(this).css('left','0px');
        isAnimating = false;
      }
      });  
      $('.ssb-panel-active').stop().animate({
        left: 0,
      }, {
        duration: 300,
        specialEasing: {
        left: 'swing'
      },
      complete: function() {
      }
      });
    },
    // Support substituting lazy loaded images.
    handleLazyImages: function(htmlString) {
      var c = jQuery(htmlString);
      // Replace all src attributes in htmlString on images with data-src.
      $('img[data-src]', c).each(function () {
        $(this).attr('src', $(this).attr('data-src'));
        $(this).removeAttr('data-src');
      });
      return c;
    },
    // Handle Omniture tracking
    handleOmniture: function(selElement) {
      // Get the ID for the site for Omniture
      if (s == undefined) {
        s = s_gi(dataSettings.rsid);
      }
      var newCall = true;
      // Check if the selected element is a new call
      for (i=0; i<trackedArray.length; i++) {
        if (selElement == trackedArray[i]) {
          newCall = false;  
        }
      }
      if (newCall) {
        // Add element to tracked array
        trackedArray.push(selElement);
        // Call Omniture
        s.tl(this, 'o', selElement);  
      }
    }
  }
}(); 
  // Init the singleton. 
  $(window).load(socialSideBar.init);
}(jQuery));
;
