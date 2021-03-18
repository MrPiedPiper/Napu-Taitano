$(function(){
	
	//Select and hide the button.
	$topButton = $(".backToTopButton").hide();
	
	$(function(){
		
		$(window).scroll(function(){
			if($(this).scrollTop() > 500){
				$topButton.fadeIn();
			}else{
				$topButton.fadeOut();
			}
		});
		
		$topButton.on('click', function(e) {
			console.log("clicked");
			$('body,html').animate({
				scrollTop:500
			},800);
			return false;
		});
		
	});
	
});