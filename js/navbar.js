
//copied from the book titled "Javascript & Jquery" by Jon Duckett

$(function() {
	var xhr = new XMLHttpRequest();
	
	xhr.onload = function() {
		if(xhr.status === 200) {
			document.getElementById('navbar').innerHTML = xhr.responseText;
		}
	};
	
	xhr.open('GET', 'templates/navbar.html', true);
	xhr.send(null);
});
