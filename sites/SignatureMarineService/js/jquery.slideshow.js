(function($){
	$.fn.slideshowLevi = function(numberActive){
		console.log("slideshowlevi called")
		$('.photoViewer').css('display', 'inline');
		$('.galleryHide').css('display', 'none');
		var makeThisActive = numberActive;
		//Change each thumbnail image into a link.
		var $images = this.find('img', '.thumbnails').each(function(index){
			var $this = $(this);
			var aWrapper;
			if(makeThisActive) {
				if(index == makeThisActive){
					console.log('madeactive');
					aWrapper = '<a href="' + $this.attr('src') + '" class="noFade thumb active ' + $this.attr('tallorwide') + 'ThumbA" title="' + $this.attr('alt') + '" tallorwide="' + $this.attr('tallorwide')+'"> </a>';
					$this.wrap(aWrapper); 
				}else{
					aWrapper = '<a href="' + $this.attr('src') + '" class="noFade thumb ' + $this.attr('tallorwide') + 'ThumbA" title="' + $this.attr('alt') + '" tallorwide="' + $this.attr('tallorwide')+'"> </a>';
					$this.wrap(aWrapper); 
				}
			}else{
				if(index == 0){
					aWrapper = '<a href="' + $this.attr('src') + '" class="noFade thumb active ' + $this.attr('tallorwide') + 'ThumbA" title="' + $this.attr('alt') + '" tallorwide="' + $this.attr('tallorwide')+'"> </a>';
					$this.wrap(aWrapper); 
				}else{
					aWrapper = '<a href="' + $this.attr('src') + '" class="noFade thumb ' + $this.attr('tallorwide') + 'ThumbA" title="' + $this.attr('alt') + '" tallorwide="' + $this.attr('tallorwide')+'"> </a>';
					$this.wrap(aWrapper); 
				}
			}
		});
		
		//Declare the variables
		var request;
		var $current;
		var cache = {};
		var $frame = this.find('.photoWindow');
		var $thumbs = $('.thumb');
		
		//Center when the window resizes.
		$(window).on('resize', function(){center();});
		
		//Function to center the image.
		function center(){
			console.log("resizing");
			//Set the image's margin. (Centers the image when combined with the CSS applied to the image)
			var $centerthis = $('.centerme');
			$centerthis.css({
				marginLeft: -$centerthis.width() / 2,
				marginTop: -$centerthis.height() / 2
			});
		}
		
		//Function to handle cross fading
		function crossfade($img){
			
			//If there's a current image, stop it's animation, and fade it out.
			if($current) {
				$current.stop().fadeOut('slow');
			}
			
			//Set the image's margin. (Centers the image when combined with the CSS applied to the image)
			$img.css({
				marginLeft: -$img.width() / 2,
				marginTop: -$img.height() / 2
			});
			
			//Whatever the image is doing, stop it, and fade it in.
			$img.stop().fadeTo('slow', 1);
			
			//Set the current image to the new image.
			$current = $img;
		}
		
		//Function to handle thumbnail clicks.
		$(document).on('click', '.thumb', function(e){
			var $img;
			var src = this.href;
			request = src;
			
			//Keep the link from taking you to a different page.
			e.preventDefault();
			
			//Remove the active class from each thumb, then add the active class to the one you clicked on..
			$thumbs.removeClass('active');
			$(this).addClass('active');
			
			//If the cache has the image, and it's not loading, call the crossfade function. If it doesn't have the image, make a new one, and store it in the cache.
			if(cache.hasOwnProperty(src)){
				if(cache[src].isLoading === false){
					crossfade(cache[src].$img);
				}
			}else{
				$img = $('<img/>');
				cache[src] = {
					$img: $img,
					isLoading: true
				};
				
			
				//When the image loads, hide the image, remove the "is-loading" class from the frame and append the image to it and set the image in the cache to show it's not loading. If the request is still the image, crossfade it in.
				$img.on('load', function() {
					$img.hide();
					$frame.removeClass('is-loading').append($img);
					cache[src].isLoading = false;
					//This next bit fixes the "The user requested a new image when one was already loading" problem.
					if (request === src){
						crossfade($img);
					}
				});
				
				//Gives the frame the "is-loading" class.
				$frame.addClass('is-loading');
				
				//If the image is tall, do this. Otherwise, do the other one.
				if($(this).attr('tallorwide')=='tall'){
					//Sets the image's attributes.
					$img.attr({
						'src': src,
						'alt': this.title || '',
						'class': 'tall rotate centerme'
					});
				}else{
					//Sets the image's attributes.
					$img.attr({
						'src': src,
						'alt': this.title || '',
						'class': 'wide centerme'
					});
				}
			}
		});
		
		//If a specific image is requested, make it the initial image. Otherwise, click image 0.
		if(makeThisActive){
			$('.thumb').eq(makeThisActive).click();
		}else{
			$('.thumb').eq(0).click();
		}
		
		return this;
	}
})(jQuery);