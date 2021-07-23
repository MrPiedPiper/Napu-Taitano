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
	$accordion.on('click', ':button:first', function(e) {
		
		event.stopPropagation();
		
		//Toggle accordion
		toggleAccordion($(e.target));

	});

	//Function loops through parents until one is found with the class "napuAccordion"
	function getAccordionFromChild(passedChild){
		var clickedAccordion = null;
		var currItem = $(passedChild);
		while(clickedAccordion == null){
			if(currItem.hasClass("napuAccordion")){
				clickedAccordion = currItem;
			}else{
				//If none are found, return null
				if(currItem.length== 0){
					console.log("getAccordionFromChild got null");
					return null;
				}
				currItem = currItem.parent();
			}
		}
		return clickedAccordion;
	}

	//Trigger press on accordion button index
	function toggleAccordion($button){

		//Get the root Accordion
		var accordion = getAccordionFromChild($button);
		//Get the main Button
		var mainButton = accordion.find('Button:first');

		//Set the $accordionContent variable to the '.accordionContent' in the accordion.
		$accordionContent = accordion.find('.accordionContent:first');
		
		//Get whether it's open
		var isNapuAccordionVisible = $accordionContent.data("isNapuAccordionVisible");
		
		//If the content is visible,
		if(isNapuAccordionVisible != null && isNapuAccordionVisible == true){
			// collapseAccordion($button);
			collapseAllInParentAccordion($button);
		//If it's not visible,
		}else{
			expandAccordion($button);
		}
	}

	//Expand accordion 
	function expandAccordion($button){

		//Get the root Accordion
		var accordion = getAccordionFromChild($button);
		//Get the main Button
		var mainButton = accordion.find('Button:first');

		//Set the $accordionContent variable to the '.accordionContent' in the accordion.
		$accordionContent = accordion.find('.accordionContent:first');

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
		refreshCollapseAllButtons();
	}


	//Collapse accordion 
	function collapseAccordion($button){

		//Get the root Accordion
		var accordion = getAccordionFromChild($button);
		//Get the main Button
		var mainButton = accordion.find('Button:first');

		//Set the $accordionContent variable to the '.accordionContent' in the accordion.
		$accordionContent = accordion.find('.accordionContent:first');

		//If already closed, return.
		var isNapuAccordionVisible = $accordionContent.data("isNapuAccordionVisible");
		if(isNapuAccordionVisible == null || isNapuAccordionVisible == false){
			return;
		}

		//Mark as closed
		$accordionContent.data("isNapuAccordionVisible", false);

		//Make new button text.
		buttonText = mainButton.text().replace('▼', '▲').replace('▼', '▲');
		
		
		//And change the text.
		mainButton.text(buttonText);
		
		//Slide it up.
		$accordionContent.slideUp(500);

		//Decrement the openCount
		openCount -= 1;
		//Refresh the "collapseAllButton"
		refreshCollapseAllButtons();
	}

	//Refresh "collapseAllButton"'s disabled property depending on if any accordions are open
	function refreshCollapseAllButtons(){
		//For each napuCollapseAllInParentButton
		$(".napuCollapseAllInParentButton").each(function(i){
			//Loop through all accordions inside the parent
			var isDisabled = true;
			$(this).parent().find(".accordionContent").each(function(k){
				//If the accordion is visible
				if($(this).data("isNapuAccordionVisible") != null && $(this).data("isNapuAccordionVisible") == true){
					//Mark the variable as not disabled
					isDisabled = false;
					//Break from the loop
					return false;
				}
			});
			//Set the button to enabled/disabled depending on the isDisabled variable
			$(this).prop("disabled", isDisabled);
		});
	}

	//Select the "collapse all in parent" buttons
	$napuCollapseAllInParentButton = $(".napuCollapseAllInParentButton");
	//When clicked,  collapse all accordions in the parent container
	$napuCollapseAllInParentButton.on("click", function(e){
		$(this).parent().find(".napuAccordion").each(function(i){
			collapseAllInParentAccordion($(this));
		});
	});

	//Collapse all accordions in next upward accordion
	function collapseAllInParentAccordion(childElement){
		//Get accordion
		var $accordion = getAccordionFromChild(childElement);
		var $accordions = $accordion.find(".napuAccordion");
		//Collapse all matching inside the accordion
		$accordions.each(function(i){
			collapseAccordion($(this));
		});
		//Collapse the accordion
		collapseAccordion($accordion);
		refreshCollapseAllButtons();
	}
	
	//Refresh the "collapse all" buttons
	refreshCollapseAllButtons();
	
	//Add collapse button to end of each existing button
	$napuButtons.each(function(i){
		var newButton = '<Button class="napuCollapseAccordionButton"'+i+'>▲</Button>';
		$(this).parent().find(".accordionContent:first").append(newButton);
	});

	//When you click on a collapse button inside of an accordion,
	$accordion.on('click', '.napuCollapseAccordionButton', function(e) {
		
		event.stopPropagation();
		
		var clickedButton = $(this);

		//Collapse accordion
		collapseAllInParentAccordion(clickedButton);
		collapseAccordion(clickedButton);
	});

});