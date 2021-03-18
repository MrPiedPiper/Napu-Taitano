//Script for sorting searching and filtering list.

$(function(){
	
	var $rows = $('.sortable .filterTable tr');
	var $buttons = $('#buttons');
	var tagged = {};
	
	$rows.each(function() {
		var row = this;
		var tags = $(this).data('tags');
		
		if (tags) {
			tags.split(',').forEach(function(tagName){
				if(tagged[tagName] == null){
					tagged[tagName] = [];
				}
				tagged[tagName].push(row);
			});
		}
	});
	
	$('<button/>', {
		text: 'Show All',
		class: 'active',
		click: function(){
			$(this)
			.addClass('active')
			.siblings()
			.removeClass('active');
		$rows.show();
		}
	}).appendTo($buttons);
	
	$.each(tagged, function(tagName){
		$('<button/>', {
			text: tagName + ' (' + tagged[tagName].length + ')',
			click: function() {
					$(this)
						.addClass('active')
						.siblings()
						.removeClass('active');
					$rows.hide()
					.filter(tagged[tagName])
					.show();
			}
		}).appendTo($buttons);
	});
	
	
	var compare = {
		name: function(a, b) {
			a = a.replace(/^Ukulele at the /i, "");
			a = a.replace(/^Ukulele at /i, "");
			b = b.replace(/^Ukulele at the /i, "");
			b = b.replace(/^Ukulele at /i, "");
			
			if(a<b){
				return -1;
			}else{
				return a > b ? 1 : 0;
			}
		},
		type: function(a, b){
			if(a<b){
				return -1;
			}else{
				return a > b ? 1 : 0;
			}
		}
	}
	
	var $entries = $('.sortable .searchTd');
	var $search = $('#filter-search');
	var cache = [];
	
	$entries.each(function() {
		$this = $(this);
		cache.push({
			element: this,
			text: $this.find('p').text().toLowerCase(),
			parent: this.parentNode
		});
	});
	
	console.log(cache);
	
	function filter() {
		var query = this.value.trim().toLowerCase();
		cache.forEach(function(entry) {
			var index = 0;
			if (query) {
				index = entry.text.indexOf(query);
			}
			var parent = entry.parent;
			entry.element.style.display = index === -1 ? 'none' : '';
			entry.parent.style.display = index === -1 ? 'none' : '';
		});
	}
	
	if ('oninput' in $search[0]) {
		$search.on('input', filter);
	}else{
		$search.on('keyup', filter);
	}
	
	
	$('.sortable').each(function() {
		var $table = $(this);
		var $tbody = $table.find('tbody');
		var $controls = $table.find('th');
		var rows = $tbody.find('tr').toArray();
		
		$controls.on('click', function(){
			var $header = $(this);
			var order = $header.data('sort');
			var column;
			
			if ($header.is('.ascending') || $header.is('.descending')){
				$header.toggleClass('ascending descending');
				$tbody.append(rows.reverse());
			}else {
				$header.addClass('ascending');
				$header.siblings().removeClass('ascending descending');
				if (compare.hasOwnProperty(order)){
					column = $controls.index(this);
					
					rows.sort(function(a, b) {
						a=$(a).find('td').eq(column).text();
						b=$(b).find('td').eq(column).text();
						return compare[order](a, b);
					});
					
					$tbody.append(rows);
				}
			}
			
		});
	});
});