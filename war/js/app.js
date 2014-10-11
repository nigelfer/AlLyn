// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/doc
$(document).foundation();

$(function() {
	//photo section	  	
	$.getJSON('data/photos.json', function(data) {
		var photoTemplate = $('#photoTemplate').html();	
		var folder = data.folder;
		var phototList = data.photos;

		$.each(phototList, function(i, photo) {
			var img = folder + photo.img;
			photo.img 		= img + ".jpg";
			photo.img_th 	= img + "TH.jpg";
		});
								
		html = Mustache.to_html(photoTemplate, data);
		$('#photodiv').html(html);		
		$('#photos').foundation();
	})
	.fail(function() {
		console.log("error");
	});		
	
	//build out section headers
	var template = $('#headerTemplate').html();	  	
	html = Mustache.to_html(template, {sectionName: "Welcome to our Wedding website!"});
	$('#welcome').html(html);		
	html = Mustache.to_html(template, {sectionName: "About Us"});
	$('#about').html(html);		
	html = Mustache.to_html(template, {sectionName: "Our Story"});
	$('#story').html(html);		
	html = Mustache.to_html(template, {sectionName: "Photos"});
	$('#potoshead').html(html);		
	html = Mustache.to_html(template, {sectionName: "Contact Us"});
	$('#contact').html(html);			
	
	// page smooth scrolling
	$('a.scroll').click(function(e) {
		e.preventDefault(); // prevent the "normal" behaviour which would be
		// a "hard" jump
		if ($(this).prop('back') != 'true') {
			$('a.scroll').parent().removeClass('active');
			$(this).parent().addClass('active');
		}
		scrollTo($(this));
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
	
	//msg area 
	$('#msgarea').hide();	
	
	//  SAVE -------------
	$("#msgform").submit(function(e) {
		// prevent normal submit behaviour
		console.log('submit');
		e.preventDefault();

		if (valid == false) {
			console.log('exiting');
			return;
		}

		var msgTxt = escapeHtml($('#msgtxt').val());
		var nameTxt = escapeHtml($('#nametxt').val());
		var fromEmail = escapeHtml($('#emailtxt').val());
		var posturl = '/SendMsg?fromEmail=' +fromEmail+ '&msg=' + msgTxt+ '&fromName='+nameTxt;

		serverCall(posturl, saveDone);
	});	
	
	//animate headers
	$('.sectionContainer').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated swing',
        offset: 100,
        repeat: true
	});	
	//animate body
	$('.contentDiv').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated fadeInLeft',
		offset: 100,
		repeat: false
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
			//location.hash = target; // attach the hash (#jumptarget) to the
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

function saveDone(data) {
	showMessage("Thanks for messaging us!", "success");
} 
function serverCall(url, callFunction) {
	$.ajax({
		url : url,
		data : '',
		cache : false
	}).done(function(data) {
		callFunction(data);
	}).fail(function() {
		showMessage("Oops! there was an error, please try later", "alert");
	});	
}

function showMessage(msg, type) {
	var msgTemplate = $('#msgTemplate').html();	
	var html = Mustache.to_html(msgTemplate, {msg: msg, "msg-type": type});
	$('#msgarea').html(html);	
	$('#msgarea').foundation();
	$('#msgarea').show(200);	
}