// JavaScript Document
$(function(){
	
	var $images = $('.slideshowImg');
	var $leftButton = $('#slideshowPrev');
	var $rightButton = $('#slideshowNext');
	var $slideshowControls = $('#slideshowControls').removeClass('hidden');
	var $main = $('main').css('margin-bottom', '100px');
	var currentImage = 0;
	var totalImages = -1;
	var doneWaiting = true;
	
	$(window).resize(checkSize);
	
	function checkSize() {
			console.log('testboom');
		//If it's small
		if($('.mediaQueryChecker').css('float')=='none'){
			
			$images.css('width', '80%').css('margin', '-20px').css('position', 'absolute').css('left', '13%').css('top','32%');
		
			$('.sideways').css('width', '47%').css('top','37%').css('left', '31%');
			
			$slideshowControls.css('margin-top', '62%');
			
			//$slideshowControls.css('margin-top', '38%');
		//if it's 572 or less
		}else if($('.mediaQueryChecker').css('float')=='right'){
			
			$images.css('width', '80%').css('margin', '-20px').css('position', 'absolute').css('left', '15.5%').css('top','32%');
		
			$('.sideways').css('width', '47%').css('top','36%').css('left', '32%');
			
			$slideshowControls.css('margin-top', '70%');
		
		//if it's big
		}else{
			
			$images.css('width', '80%').css('margin', '-20px').css('position', 'absolute').css('left', '11%').css('top','25%');
		
			$('.sideways').css('width', '50%').css('top','35%').css('left', '27%');
			
			$slideshowControls.css('margin-top', '60%');
			
			/*$images.css('width', '50%').css('margin', '-20px').css('position', 'absolute').css('left', '27%').css('top','25%');
		
			$('.sideways').css('width', '35%').css('top','32%').css('left', '34%');
			
			$slideshowControls.css('margin-top', '35%');*/
			
			//$slideshowControls.css('margin-top', '35%');
		}
	}
	
	function startWaiting(){
		doneWaiting = true;
		console.log('ranWaiting');
	}
	
	$('table').replaceWith($images);
	
	
	
	$images.each(function(index){
			$(this).hide().css('width', '50%').css('margin', '-20px').css('position', 'absolute').css('left', '27%').css('top','25%');
		if($(this).hasClass('sideways')){
			$(this).css('width', '35%').css('left', '34%').css('top','32%');
		}
		totalImages++;
	});
	
	$images.eq(0).toggle();
	
	$rightButton.on('click', function(){
		if(doneWaiting === true){
			doneWaiting = false;
			setTimeout(function(){startWaiting();}, 800);
			$images.eq(currentImage).fadeOut(500);
			if(currentImage>=totalImages){
				currentImage = 0;
			}else {
				currentImage++;
			}
			$images.eq(currentImage).fadeIn(500);
		}
	});
	$leftButton.on('click', function(){
		if(doneWaiting === true){
			doneWaiting = false;
			setTimeout(function(){startWaiting();}, 800);
			$images.eq(currentImage).fadeOut(500);
			if(currentImage===0){
				currentImage = totalImages;
			}else {
				currentImage--;
			}
			$images.eq(currentImage).fadeIn(500);
		}
	});
	/*.animate({
		height: 1.0
	}, 3000);*/
	checkSize();
}());