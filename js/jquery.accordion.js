$(function(){
	
	//Select the accordions.
	$accordion = $(".napuAccordion");
	
	//Hide the accordion content.
	$('.accordionContent').hide();
	
	//Get the buttons
	$napuButtons = $('.napuAccordion button');
	
	$napuButtons.each(function(){
		$(this).text('▲ '+$(this).text()+' ▲');
	});
	
	//When you click on a button inside of an accordion,
	$accordion.on('click', ':button', function(e) {
		
		event.stopPropagation();
		
		//Get which button,
		$button = $(e.target);
		
		//Then set the accordionContent Variable to the '.accordionContent' in the button's parent element.
		$accordionContent = $button.parent().find('.accordionContent:first');
		
		//If the content is visible,
		if($accordionContent.is(':visible')){
			
			//Make new button text.
			buttonText = $button.text().replace('▼', '▲').replace('▼', '▲');
			
			
			//And change the text.
			$button.text(buttonText);
			
			//Slide it up.
			$accordionContent.slideUp(500);
			
		//If it's not visible,
		}else{
			
			//Make new button text.
			
			buttonText = $button.text().replace('▲', '▼').replace('▲', '▼');
			//And change the text.
			$button.text(buttonText);
			
			//Slide it down.
			$accordionContent.slideDown(1000);
		}
	});
	
});