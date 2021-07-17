$(function(){

	var openCount = 0;
	
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
		
		//Toggle accordion
		toggleAccordion($(e.target));

	});

	//Trigger press on accordion button index
	function toggleAccordion($button){

		//Then set the accordionContent Variable to the '.accordionContent' in the button's parent element.
		$accordionContent = $button.parent().find('.accordionContent:first');
		
		//Get whether it's open
		var isNapuAccordionVisible = $accordionContent.data("isNapuAccordionVisible");
		
		//If the content is visible,
		if(isNapuAccordionVisible != null && isNapuAccordionVisible == true){
			collapseAccordion($button);
		//If it's not visible,
		}else{
			expandAccordion($button);
		}
	}

	//Expand accordion 
	function expandAccordion($button){

		//Set the accordionContent Variable to the '.accordionContent' in the button's parent element.
		$accordionContent = $button.parent().find('.accordionContent:first');

		//If already open, return.
		var isNapuAccordionVisible = $accordionContent.data("isNapuAccordionVisible");
		if(isNapuAccordionVisible != null && isNapuAccordionVisible == true){
			return;
		}

		//Mark as open
		$accordionContent.data("isNapuAccordionVisible", true);
		
		//Make new button text.
		
		buttonText = $button.text().replace('▲', '▼').replace('▲', '▼');
		//And change the text.
		$button.text(buttonText);
		
		//Slide it down.
		$accordionContent.slideDown(1000);

		//Increment the openCount
		openCount += 1;
		//Refresh the "collapseAllButton"
		refreshCollapseAllButton();
	}


	//Collapse accordion 
	function collapseAccordion($button){

		//Set the accordionContent Variable to the '.accordionContent' in the button's parent element.
		$accordionContent = $button.parent().find('.accordionContent:first');

		//If already closed, return.
		var isNapuAccordionVisible = $accordionContent.data("isNapuAccordionVisible");
		if(isNapuAccordionVisible == null || isNapuAccordionVisible == false){
			return;
		}

		//Mark as closed
		$accordionContent.data("isNapuAccordionVisible", false);

		//Make new button text.
		buttonText = $button.text().replace('▼', '▲').replace('▼', '▲');
		
		
		//And change the text.
		$button.text(buttonText);
		
		//Slide it up.
		$accordionContent.slideUp(500);

		//Decrement the openCount
		openCount -= 1;
		//Refresh the "collapseAllButton"
		refreshCollapseAllButton();
	}

	//Refresh "collapseAllButton"'s disabled property depending on if any accordions are open
	function refreshCollapseAllButton(){
		$(".napuCollapseAllInParentButton").prop("disabled", openCount == 0);
	}

	//Select the "collapse all in parent" buttons.
	$napuCollapseAllInParentButton = $(".napuCollapseAllInParentButton");

	$napuCollapseAllInParentButton.on("click", function(e){
		 $napuButtons.each(function(i){
			collapseAccordion($(this));
		 });
		 refreshCollapseAllButton();
	});
	
	//Refresh the button (should disable on start)
	refreshCollapseAllButton();
});