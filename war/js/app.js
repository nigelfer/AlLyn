// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$(function() {
	
	//build out section headers
	var template = $('#headerTemplate').html();	  
	
	html = Mustache.to_html(template, {sectionName: "Welcome to our Wedding website!"});
	$('#welcome').html(html);		
	html = Mustache.to_html(template, {sectionName: "About Us"});
	$('#about').html(html);		
	html = Mustache.to_html(template, {sectionName: "Our Story"});
	$('#story').html(html);		
	html = Mustache.to_html(template, {sectionName: "Contact Us"});
	$('#contact').html(html);		
	
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
	
	//form validation n submit -----------
	var valid = false;
	$('#msgform').on('invalid', function() {
		console.log('invalid');
		valid = false;
	}).on('valid', function() {
		console.log('valid');
		valid = true;
	});	
	//  SAVE -------------
	$("#msgform").submit(function(e) {
		// prevent normal submit behaviour
		console.log('submit');
		e.preventDefault();

		if (valid == false) {
			console.log('exiting');
			return;
		}

		var msgTxt = format(escapeHtml($('#msgtxt').val()));
		var nameTxt = escapeHtml($('#nametxt').val());
		var fromEmail = escapeHtml($('#emailtxt').val());
		var posturl = '/SendMsg?fromEmail=' +fromEmail+ '&msg=' + msgTxt+ '&fromName='+nameTxt;

		serverCall(posturl, saveDone);
	});	
	
});

function saveDone(data) {
	 alert('done '+data);
}  

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

//helper methods ---------------
function format(msgTxt) {
	msgTxt = msgTxt.replace(/\n\r?/g, '<br />');
	return msgTxt;
}

var entityMap = {
	"&" : "%26",
	"+" : "%2B",
	"%" : "%25"
};

function escapeHtml(string) {
	return String(string).replace(/[&+%]/g, function(s) {
		return entityMap[s];
	});
}

function serverCall(url, callFunction) {
	$.ajax({
		url : url,
		data : '',
		cache : false
	}).done(function(data) {
		callFunction(data);
	}).fail(function() {
		$('#msgerror').show(200);
	});	
}