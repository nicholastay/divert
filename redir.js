;(function() {

window.nexdivert_show_links = true;

var webpath = window.location.pathname.split('/').pop();
if (window.nexdivert.hasOwnProperty(webpath))
	return (window.location.href = window.nexdivert[webpath]);

})();