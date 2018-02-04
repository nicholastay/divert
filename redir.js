;(function() {

var webpath = window.location.pathname.split('/').pop();
if (window.nexdivert.hasOwnProperty(webpath))
	return (window.location.href = window.nexdivert[webpath]);

})();