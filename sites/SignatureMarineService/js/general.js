// JavaScript Document
$(function(){
	var $body = $(body);
	$body.removeClass('hide').toggle().fadeIn(1000);
	
	/*function fadeOut(){
		$body.fadeOut(1000);
		console.log("fadeOut called");
	}*/
	
	$('a').on('click', function(e){
		if(!e.currentTarget.classList.contains("noFade")){
			e.preventDefault();
			var newDestination = this.href;
			$body.fadeOut(500);
			setTimeout(function(){window.location = newDestination;}, 500);
		}
	});
	
	$('#collapseButton').on('click', function(e){
		$collapseDiv = $('#defaultNavbar1');
		if(!$collapseDiv.is(':visible')){
			$collapseDiv.slideDown();
		}else{
			$collapseDiv.slideUp(400, function() {
				var $this = $(this);
				$this.removeAttr('style').addClass('hideMobile');
			});
		}
	});
});