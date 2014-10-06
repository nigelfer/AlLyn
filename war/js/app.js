// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$(function() {
	
	// page smooth scrolling
	$(function() {
		$('a.scroll').click(function(e) {
			e.preventDefault(); // prevent the "normal" behaviour which would be
			// a "hard" jump
			if ($(this).prop('back') != 'true') {
				$('a.scroll').parent().removeClass('active');
				$(this).parent().addClass('active');
			}
			scrollTo($(this));
		});
	});
	
});


function scrollTo(ahref) {
	var target = ahref.attr("href"); // Get the target
	if ($(target).length != 0) {
		var top = $(target).offset().top;
		// perform animated scrolling by getting top-position of target-element
		// and set it as scroll target
		$('html, body').stop().animate({
			scrollTop : top
		}, 1000, function() {
			location.hash = target; // attach the hash (#jumptarget) to the
			// pageurl
		});
	}
	return false;
}