// ==UserScript==
// @name           twifresh
// @namespace      http://www.strongasanox.co.uk/greasemonkey
// @description    Periodically checks for the *new tweets* bar and, if found, triggers it's onclick event to autoload the new tweets on new twitter
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function() {
	var Twifresh = function() {
		this.selector = '#new-tweets-bar';
	}
	
	Twifresh.prototype.lieInWait = function(callback) {
		var interval = 1000 * 10; // 10 seconds
		var id = setInterval(function() {
			callback();
		}, interval);
	}
	
	function GM_wait() {
		if (typeof unsafeWindow.jQuery === 'undefined') {
			window.setTimeout(GM_wait, 100);
		} else {
			unsafeWindow.jQuery(function() { 
				letsJQuery(unsafeWindow.jQuery); 
			});
		}
	      
	}

	function letsJQuery($) {
	  var refresher = new Twifresh();
		
		refresher.lieInWait(function() {
			$(refresher.selector).trigger('click');
		});
	}
	
	document.addEventListener('DOMContentLoaded', function() {
		GM_wait();
	}, true);
})();
