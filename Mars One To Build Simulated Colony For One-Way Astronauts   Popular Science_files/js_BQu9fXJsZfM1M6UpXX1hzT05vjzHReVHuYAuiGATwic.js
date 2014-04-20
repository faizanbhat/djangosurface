(function ($, Drupal, window, document, undefined) {

var trackClick = {
  'exempt' : ['atlas', 'mediaplex', 'pointroll', 'mediamind', 'eyeblaster', 'doubleclick'],
  'data' : null,
  'tracker' : null,

  // initialize  
  'init' : function(config) {
    // Get the data from the settings.
    trackClick.data = Drupal.settings.trackClick;
    // provide for custom configuration via init().
    if (config && typeof(config) == 'object') {
      $.extend(trackClick.data, config);
    }
    // Start by looking at each item and evaluating.
    if (typeof(trackClick.data) == 'object') {
      $.each(trackClick.data, function(key, value) {
        // Reset the tracker and add the data
        trackClick.tracker = [];
        trackClick.tracker.code = trackClick.data[key].c;
        trackClick.tracker.element = trackClick.data[key].s;
        // Change each of the elements on the page individually.
        $(trackClick.tracker.element).each(function(index) {
          if ($(this).attr('href') !== undefined) {
            // check the list of exempt urls and note it.
            var exemptUrl = trackClick.checkExempt(this) || false;
            // Only attach parameters to approved links.
            if (exemptUrl == false) {
              // Replace any special codes.
              trackClick.tracker.currentCode = trackClick.replaceCodes(this, index);
              // Check for an existing query string and note it.
              trackClick.tracker.start = trackClick.checkForQuery(this); 
              // Attach the tracking code to the url.
              trackClick.attachTracking(this);
            }
          }
        });
      }); 
    }
  },
  // Check for exempted urls and ignore them.
  'checkExempt' : function(elm) {
    var linkUrl = $(elm).attr('href');
    for (i=0; i < trackClick.exempt.length; i++) {
      if (linkUrl.indexOf(trackClick.exempt[i]) !== -1) {
        return true;
      } else {
        return false;
      }
    }
  },
  // Replace certain codes with dynamic content if ones are specified. 
  'replaceCodes' : function(elm, count) {
    // Replaces % with the title or tag name and replaces # with the count.
    return trackClick.tracker.code.replace('%',trackClick.getTitle(elm)).replace('#',count + 1);
  },
  // retreive the title of the link or return the tag name.
  'getTitle' : function(elm) {
    var child = $(elm).children().first();
    var name = $(elm).text().toLowerCase();
    var newName = name.replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-');
    // If the element has children tags and no name, return that instead. 
    if (child.length != 0) {
      return child[0].tagName;
    } else {
      return newName;
    }
  }, 
  // Make sure to only append links if they contain existing query strings.
  'checkForQuery' : function(elm) {
    var linkUrl = $(elm).attr('href');
    if (linkUrl.indexOf('?') === -1) {
      return '?';
    } else {
      return '&';
    }
  },
  // Attach the new tracking query to the link.
  'attachTracking' : function(element) {
    var newLink = trackClick.tracker.start + trackClick.tracker.currentCode;
    $(element).not('.track-processed').attr('href', function(i, href) {
      return href + newLink;
    }).once('track');
  },
}
// start tracking urls
$(document).ready(function() {
  trackClick.init();
});

})(jQuery, Drupal, this, this.document);
;
